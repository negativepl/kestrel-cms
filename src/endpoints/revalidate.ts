import type { Endpoint } from 'payload'

// Revalidate cache on frontend (Kestrel)
export const revalidateEndpoint: Endpoint = {
  path: '/revalidate',
  method: 'post',
  handler: async (req) => {
    try {
      const frontendUrls = [
        process.env.FRONTEND_URL_B2C || 'https://dev.trkhspl.com',
        process.env.FRONTEND_URL_B2B || 'https://b2b.dev.trkhspl.com',
      ]

      const revalidateSecret = process.env.REVALIDATE_SECRET || 'kestrel-revalidate-secret'

      const results = await Promise.allSettled(
        frontendUrls.map(async (baseUrl) => {
          const response = await fetch(`${baseUrl}/api/revalidate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-revalidate-secret': revalidateSecret,
            },
            body: JSON.stringify({ paths: ['/'] }),
          })

          if (!response.ok) {
            throw new Error(`${baseUrl}: ${response.status}`)
          }

          return { url: baseUrl, success: true }
        })
      )

      const successes = results.filter((r) => r.status === 'fulfilled').length
      const failures = results.filter((r) => r.status === 'rejected').length

      return Response.json({
        success: true,
        message: `Cache cleared on ${successes} frontend(s)${failures > 0 ? `, ${failures} failed` : ''}`,
        results: results.map((r, i) => ({
          url: frontendUrls[i],
          status: r.status,
          error: r.status === 'rejected' ? (r as PromiseRejectedResult).reason?.message : undefined,
        })),
      })
    } catch (error) {
      console.error('Revalidate error:', error)
      return Response.json(
        { success: false, error: 'Failed to clear cache' },
        { status: 500 }
      )
    }
  },
}
