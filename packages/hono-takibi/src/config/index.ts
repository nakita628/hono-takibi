import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { register } from 'tsx/esm/api'

type Config = {
  readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
  readonly 'zod-openapi'?: {
    readonly output: `${string}.ts`
    readonly exportType?: boolean
    readonly exportSchema?: boolean
    readonly schema?: {
      readonly output: string | `${string}.ts`
      readonly exportType?: boolean
      readonly split?: boolean
    }
    readonly route?: {
      readonly output: string | `${string}.ts`
      readonly import: string
      readonly split?: boolean
    }
  }
  readonly rpc?: {
    readonly output: `${string}.ts`
    readonly import: string
  }
}

const isYamlOrJsonOrTsp = (
  i: unknown,
): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
  typeof i === 'string' && (i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp'))

const isTs = (o: unknown): o is `${string}.ts` => typeof o === 'string' && o.endsWith('.ts')

export async function config(): Promise<
  | {
      readonly ok: true
      readonly value: Config
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')
  if (!existsSync(abs)) return { ok: false, error: `Config not found: ${abs}` }

  try {
    register()
    const mod: { readonly default: Config } = await import(pathToFileURL(abs).href)

    if (!('default' in mod)) {
      return { ok: false, error: 'Config must export default object' }
    }

    if (mod.default) {
      // input
      if (!isYamlOrJsonOrTsp(mod.default.input)) {
        return {
          ok: false,
          error: `Invalid input format for zod-openapi: ${String(mod.default.input)}`,
        }
      }

      // zod-openapi
      const zo = mod.default['zod-openapi']
      if (zo) {
        // boolean flags
        if (zo.exportSchema !== undefined && typeof zo.exportSchema !== 'boolean') {
          return {
            ok: false,
            error: `Invalid exportSchema format for zod-openapi: ${String(zo.exportSchema)}`,
          }
        }
        if (zo.exportType !== undefined && typeof zo.exportType !== 'boolean') {
          return {
            ok: false,
            error: `Invalid exportType format for zod-openapi: ${String(zo.exportType)}`,
          }
        }

        const hasSchema = zo.schema !== undefined
        const hasRoute = zo.route !== undefined

        if (hasSchema || hasRoute) {
          if (Object.hasOwn(zo, 'output')) {
            return {
              ok: false,
              error:
                "Invalid config: When using 'zod-openapi.schema' or 'zod-openapi.route', do NOT set 'zod-openapi.output'.",
            }
          }
        } else {
          if (!isTs(zo.output)) {
            return {
              ok: false,
              error: `Invalid output format for zod-openapi: ${String(zo.output)}`,
            }
          }
        }

        if (hasSchema) {
          const s = zo.schema
          if (!s) return { ok: false, error: 'Invalid config: zod-openapi.schema is undefined' }

          if (s.split !== undefined && typeof s.split !== 'boolean') {
            return {
              ok: false,
              error: `Invalid schema split format for zod-openapi: ${String(s.split)}`,
            }
          }
          if (typeof s.output !== 'string') {
            return { ok: false, error: `Invalid schema output path: ${String(s.output)}` }
          }

          if (s.split === true) {
            if (isTs(s.output)) {
              return {
                ok: false,
                error: `Invalid schema output path for split mode (must be a directory, not .ts): ${s.output}`,
              }
            }
          } else {
            if (!isTs(s.output)) {
              return {
                ok: false,
                error: `Invalid schema output path for non-split mode (must be .ts file): ${s.output}`,
              }
            }
          }

          if (s.exportType !== undefined && typeof s.exportType !== 'boolean') {
            return {
              ok: false,
              error: `Invalid schema exportType format for zod-openapi: ${String(s.exportType)}`,
            }
          }
        }

        if (hasRoute) {
          const r = zo.route
          if (!r) return { ok: false, error: 'Invalid config: zod-openapi.route is undefined' }

          if (typeof r.import !== 'string') {
            return {
              ok: false,
              error: `Invalid route import format for zod-openapi: ${String(r.import)}`,
            }
          }
          if (r.split !== undefined && typeof r.split !== 'boolean') {
            return {
              ok: false,
              error: `Invalid route split format for zod-openapi: ${String(r.split)}`,
            }
          }
          if (typeof r.output !== 'string') {
            return { ok: false, error: `Invalid route output path: ${String(r.output)}` }
          }

          if (r.split === true) {
            if (isTs(r.output)) {
              return {
                ok: false,
                error: `Invalid route output path for split mode (must be a directory, not .ts): ${r.output}`,
              }
            }
          } else {
            if (!isTs(r.output)) {
              return {
                ok: false,
                error: `Invalid route output path for non-split mode (must be .ts file): ${r.output}`,
              }
            }
          }
        }
      }

      const rpc = mod.default.rpc
      if (rpc) {
        if (!isTs(rpc.output)) {
          return { ok: false, error: `Invalid output format for rpc: ${String(rpc.output)}` }
        }
        if (typeof rpc.import !== 'string') {
          return { ok: false, error: `Invalid import format for rpc: ${String(rpc.import)}` }
        }
      }
    }

    return { ok: true, value: mod.default }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

export function defineConfig(c: Config): Config {
  return c
}
