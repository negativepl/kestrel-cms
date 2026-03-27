import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

async function triggerRevalidate(): Promise<void> {
  const frontendUrls = [
    process.env.FRONTEND_URL_B2C || 'https://homescreen.pl',
    process.env.FRONTEND_URL_B2B || 'https://b2b.homescreen.pl',
  ]
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) {
    console.warn('[Revalidate] REVALIDATE_SECRET not set, skipping cache revalidation')
    return
  }

  const results = await Promise.allSettled(
    frontendUrls.map((baseUrl) =>
      fetch(`${baseUrl}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-secret': secret,
        },
        body: JSON.stringify({ paths: ['/'] }),
      })
    )
  )

  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.error(`[Revalidate] Failed to revalidate ${frontendUrls[i]}:`, result.reason)
    }
  })
}

export const revalidateAfterChange: CollectionAfterChangeHook = async () => {
  await triggerRevalidate()
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async () => {
  await triggerRevalidate()
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async () => {
  await triggerRevalidate()
}
