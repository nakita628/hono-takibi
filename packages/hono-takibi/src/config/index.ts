import fs from 'node:fs'
import { ok } from '../result/ok.js'
import { err } from '../result/err.js'
import type { Result } from '../result/types.js'

export type Config = {
  schema: {
    name: 'PascalCase' | 'camelCase'
    export: boolean
  }
  type: {
    name: 'PascalCase' | 'camelCase'
    export: boolean
  }
  input?: `${string}.yaml` | `${string}.json`
  output?: `${string}.ts`
}

export const DEFAULT_CONFIG = {
  schema: {
    name: 'PascalCase',
    export: false,
  },
  type: {
    name: 'PascalCase',
    export: false,
  },
} as const

/**
 * Loads the configuration from the `hono-takibi.json` file or returns the default configuration.
 * @returns { Result<Config, string> } - A Result containing the configuration or an error message.
 */
export function getConfig(): Result<Config, string> {
  try {
    const config: Config = fs.existsSync('hono-takibi.json')
      ? { ...DEFAULT_CONFIG, ...JSON.parse(fs.readFileSync('hono-takibi.json', 'utf-8')) }
      : DEFAULT_CONFIG
    return ok(config)
  } catch (e) {
    return err(e instanceof Error ? e.message : String(e))
  }
}
