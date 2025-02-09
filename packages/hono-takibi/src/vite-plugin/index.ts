import { getConfig } from '../config'
import type { Config } from '../config'
import { viteMode } from './vite-mode'

export default function honoTakibiPlugin() {
  return {
    name: 'hono-takibi-plugin',

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    configureServer(server: any) {
      const config: Config = getConfig()
      server.watcher.on('change', () => {
        viteMode({
          ...config,
        })
      })
    },
  }
}
