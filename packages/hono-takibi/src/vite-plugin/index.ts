import { getConfig, type Config } from '../config/index.js'

import { vite } from './vite.js'
import type { ViteDevServer } from 'vite'

export default function HonoTakibiVite(settings?: Config) {
  const configResult = getConfig()
  if (!configResult.ok) {
    throw new Error(`Failed to load configuration: ${configResult.error}`)
  }
  const config: Config = settings ?? configResult.value
  return {
    name: 'hono-takibi-vite',
    configureServer(server: ViteDevServer) {
      server.watcher.on('change', () => {
        vite({
          ...config,
        })
      })
    },
  }
}
