import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

// Safe-by-default response headers. A full Content-Security-Policy is
// intentionally omitted: it needs per-request nonces to work with Next.js.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  // Anti-clickjacking: the modern directive plus its legacy equivalent.
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'X-Frame-Options', value: 'DENY' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

// Lets `content/notes/*.mdx` be imported as React components.
const withMDX = createMDX()

export default withMDX(nextConfig)
