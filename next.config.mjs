import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.presta.trkhspl.com',
      },
      {
        protocol: 'https',
        hostname: 'presta.trkhspl.com',
      },
    ],
  },
}

export default withPayload(nextConfig)
