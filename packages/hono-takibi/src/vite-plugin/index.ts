import fsp from 'node:fs/promises'
import path from 'node:path'
import SwaggerParser from '@apidevtools/swagger-parser'
import type { ViteDevServer } from 'vite'
import { fmt } from '../format/index.js'
import { zodOpenAPIHono } from '../generator/zod-openapi-hono/openapi/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { typeSpecToOpenAPI } from '../typespec/index.js'

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
    if (
      typeof input === 'string' &&
      ((p: `${string}.yaml` | `${string}.json` | `${string}.tsp`): p is `${string}.tsp` =>
        p.endsWith('.tsp'))(input)
    ) {
      try {
        const tsp = await typeSpecToOpenAPI(input)
        if (!tsp.ok) {
          console.error(tsp.error)
          return false
        }
        const openAPI = (await SwaggerParser.parse(tsp.value as unknown as string)) as OpenAPI
        const hono = zodOpenAPIHono(openAPI, exportSchema, exportType)
        const code = await fmt(hono)
        if (!code.ok) {
          console.error(code.error)
          return false
        }
        await fsp.mkdir(path.dirname(output), { recursive: true })
        await fsp.writeFile(output, code.value, 'utf-8')
        return true
      } catch (e) {
        throw new Error(String(e))
      }
    } else {
      try {
        const openAPI = (await SwaggerParser.parse(input)) as OpenAPI
        const hono = zodOpenAPIHono(openAPI, exportSchema, exportType)
        const code = await fmt(hono)
        if (!code.ok) {
          console.error(`${code.error}`)
          return false
        }
        await fsp.mkdir(path.dirname(output), { recursive: true })
        await fsp.writeFile(output, code.value, 'utf-8')
      } catch (e) {
        throw new Error(String(e))
      }
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
