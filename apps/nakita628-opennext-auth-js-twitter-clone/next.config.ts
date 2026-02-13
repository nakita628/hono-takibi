import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['cloudflare:workers'],
}

export default nextConfig
