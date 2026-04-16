/**
 * Production server wrapper for standalone Next.js build.
 *
 * Handles uncaught exceptions from the pg connection pool so that transient
 * database connection drops (e.g. "Connection terminated unexpectedly") do not
 * crash the entire process. The pg pool reconnects automatically — we just
 * need to keep the process alive.
 */

process.on('uncaughtException', (err) => {
  const isDbDrop =
    err.message === 'Connection terminated unexpectedly' ||
    err.message === 'Connection terminated' ||
    err.code === 'ECONNRESET' ||
    err.code === 'EPIPE'

  if (isDbDrop) {
    console.error('[Server] DB connection drop (pg will reconnect):', err.message)
    return // Keep the process alive — do NOT exit
  }

  console.error('[Server] Uncaught exception — exiting:', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  console.error('[Server] Unhandled promise rejection:', reason)
})

// Start the standalone Next.js server
await import('../.next/standalone/server.js')
