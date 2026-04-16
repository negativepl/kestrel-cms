/**
 * Startup migration runner.
 * Runs pending SQL migrations before the Next.js server starts.
 * Uses pg directly so it works in the standalone Docker build without Payload CLI.
 */
const { Pool } = require('pg')

const pool = new Pool({ connectionString: process.env.DATABASE_URI })

const MIGRATIONS = [
  {
    name: '20260416_120000_blog_banners_visibility_dates',
    up: `
      ALTER TABLE "blog_banners"
        ADD COLUMN IF NOT EXISTS "visible_from" timestamp(3) with time zone,
        ADD COLUMN IF NOT EXISTS "visible_to"   timestamp(3) with time zone;
    `,
  },
]

async function run() {
  const client = await pool.connect()
  try {
    for (const migration of MIGRATIONS) {
      const { rows } = await client.query(
        `SELECT name FROM payload_migrations WHERE name = $1`,
        [migration.name]
      )
      if (rows.length > 0) {
        console.log(`[migrate] skip (already applied): ${migration.name}`)
        continue
      }

      await client.query(migration.up)

      await client.query(
        `INSERT INTO payload_migrations (name, batch)
         VALUES ($1, (SELECT COALESCE(MAX(CASE WHEN batch > 0 THEN batch END), 0) + 1 FROM payload_migrations))`,
        [migration.name]
      )
      console.log(`[migrate] applied: ${migration.name}`)
    }
  } finally {
    client.release()
    await pool.end()
  }
}

run().catch((err) => {
  console.error('[migrate] fatal:', err.message)
  process.exit(1)
})
