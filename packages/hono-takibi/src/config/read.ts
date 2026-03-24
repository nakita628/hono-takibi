import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { register } from 'tsx/esm/api'

import { type Config, parseConfig } from './index.js'

/**
 * Reads and validates the hono-takibi configuration from hono-takibi.config.ts.
 *
 * Separated from config/index.ts so that the dynamic `import()` call
 * (which is CLI-only) does not trigger Vite's SSR static-analysis warning
 * when the vite-plugin loads config/index.js.
 */
export async function readConfig(): Promise<
  { readonly ok: true; readonly value: Config } | { readonly ok: false; readonly error: string }
> {
  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')
  if (!existsSync(abs)) return { ok: false, error: `Config not found: ${abs}` }

  try {
    register()
    const url = pathToFileURL(abs).href
    const mod: { readonly default: unknown } = await import(/* @vite-ignore */ url)
    if (!('default' in mod) || mod.default === undefined)
      return { ok: false, error: 'Config must export default object' }

    return parseConfig(mod.default)
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}
