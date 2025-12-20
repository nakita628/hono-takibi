import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { register } from 'tsx/esm/api'
import { parseConfig } from '../utils/index.js'

type Config = {
  readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
  readonly 'zod-openapi'?: {
    readonly output?: `${string}.ts`
    readonly exportTypes?: boolean
    readonly exportSchemas?: boolean
    readonly routes?: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
    }
    readonly components?: {
      // # Reusable schemas (data models)
      readonly schemas?: {
        readonly output: string | `${string}.ts`
        readonly exportType?: boolean
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable path, query, header and cookie parameters
      readonly parameters?: {
        readonly output: string | `${string}.ts`
        readonly exportTypes?: boolean
        readonly split?: boolean
        readonly import?: string
      }
      // # Security scheme definitions (see Authentication)
      readonly securitySchemes?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable request bodies
      readonly requestBodies?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable responses, such as 401 Unauthorized or 400 Bad Request
      readonly responses?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable response headers
      readonly headers?: {
        readonly output: string | `${string}.ts`
        readonly exportTypes?: boolean
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable examples
      readonly examples?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable links
      readonly links?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable callbacks
      readonly callbacks?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
    }
  }
  readonly type?: {
    readonly output: `${string}.ts`
  }
  readonly rpc?: {
    readonly output: string | `${string}.ts`
    readonly import: string
    readonly split?: boolean
  }
}

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
    const url = pathToFileURL(abs).href
    const mod: { readonly default: Config } = await import(/* @vite-ignore */ url)
    if (!('default' in mod) || mod.default === undefined)
      return { ok: false, error: 'Config must export default object' }
    const result = parseConfig(mod.default)
    if (!result.ok) return { ok: false, error: result.error }
    return { ok: true, value: result.value }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/**
 * Helper to define a config with full type completion.
 *
 * @see config
 */
export function defineConfig(c: Config): Config {
  return c
}
