import { exec } from 'node:child_process'

type HonoTakibiPluginOptions = {
  input: string
  output: string
  packageManager: 'pnpm' | 'npm' | 'yarn' | 'bun'
}

export default function honoTakibiPlugin(options: HonoTakibiPluginOptions) {
  return {
    name: 'hono-takibi-plugin',

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    configureServer(server: any) {
      server.watcher.add(options.input)
      server.watcher.on('change', () => {
        const commandPrefixMap: Record<'pnpm' | 'npm' | 'yarn' | 'bun', string> = {
          pnpm: 'pnpm',
          npm: 'npx',
          yarn: 'yarn',
          bun: 'bun run',
        }

        const commandPrefix = commandPrefixMap[options.packageManager]
        const command = `${commandPrefix} hono-takibi ${options.input} -o ${options.output}`

        exec(command, (error) => {
          if (error) {
            console.error(`[hono-takibi-plugin] error: ${error.message}`)
            return
          }
          // reload
          server.ws.send({ type: 'full-reload' })
        })
      })
    },
  }
}
