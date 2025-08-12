import fsp from 'node:fs/promises'
import path from 'node:path'
import type { ViteDevServer } from 'vite'
import { fmt } from '../format/index.js'
import zodOpenAPIHono from '../generator/zod-openapi-hono/openapi/index.js'
import { parseOpenAPI } from '../openapi/index.js'

/**
 * Vite plugin to generate Hono routes from an OpenAPI or TypeSpec file.
 *
 * - On `buildStart`, parses the input spec and generates TypeScript route code.
 * - Supports `.yaml`, `.json`, and `.tsp` inputs.
 * - Watches the input file in dev mode and regenerates on change (debounced).
 *
 * ```mermaid
 * flowchart TD
 *   A["HonoTakibiVite()"] --> B["buildStart()"]
 *   B --> C["run()"]
 *   C --> D{"input endsWith .tsp/.yaml/.json?"}
 *   D -->|Yes| E["parseOpenAPI(input)"]
 *   E --> F{"spec.ok?"}
 *   F -->|No| G["console.error(spec.error)"]
 *   F -->|Yes| H["zodOpenAPIHono(spec.value, exportSchema, exportType)"]
 *   H --> I["fmt(hono)"]
 *   I --> J{"code.ok?"}
 *   J -->|No| K["console.error(code.error)"]
 *   J -->|Yes| L["mkdir output dir & writeFile(output, code.value)"]
 *   A --> M["configureServer(server)"]
 *   M --> N["watch absInput & on change runDebounced()"]
 * ```
 *
 * @param input - Path to `.yaml`, `.json`, or `.tsp` spec file.
 * @param output - Path to the generated `.ts` file.
 * @param exportType - Whether to export TypeScript types.
 * @param exportSchema - Whether to export Zod schemas.
 * @returns A Vite plugin object.
 */
export default async function HonoTakibiVite({
  input,
  output,
  exportType = true,
  exportSchema = true,
}: {
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
  output: `${string}.ts`
  exportType?: boolean
  exportSchema?: boolean
}) {
  const run = async () => {
    const isYamlOrJsonOrTsp = (
      i: string,
    ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
      i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')

    if (!isYamlOrJsonOrTsp(input)) {
      console.error(`Invalid input file type: ${input}`)
      return
    }

    const spec = await parseOpenAPI(input)
    if (!spec.ok) {
      console.error(spec.error)
      return
    }

    try {
      const hono = zodOpenAPIHono(spec.value, exportSchema, exportType)
      const code = await fmt(hono)
      if (!code.ok) {
        console.error(`${code.error}`)
        return
      }
      await fsp.mkdir(path.dirname(output), { recursive: true })
      await fsp.writeFile(output, code.value, 'utf-8')
    } catch (e) {
      console.error(String(e))
      throw e
    }
  }

  const debounce = (ms: number, fn: () => void): (() => void) => {
    const pool = new WeakMap<() => void, NodeJS.Timeout>()
    const wrapped = (): void => {
      const prev = pool.get(wrapped)
      if (prev !== undefined) clearTimeout(prev)
      pool.set(wrapped, setTimeout(fn, ms))
    }
    return wrapped
  }
  const runDebounced = debounce(200, () => {
    void run()
  })
  const absInput = path.resolve(input)
  return {
    name: 'hono-takibi-vite',
    async buildStart() {
      await run()
    },
    configureServer(server: ViteDevServer) {
      server.watcher.add(absInput)

      server.watcher.on('change', (file) => {
        if (path.resolve(file) === absInput) runDebounced()
      })
    },
  }
}
