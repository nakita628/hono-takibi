import fs from 'node:fs'

export type Config = {
  schema: {
    name: 'PascalCase' | 'camelCase'
    export: boolean
  }
  type: {
    name: 'PascalCase' | 'camelCase'
    export: boolean
  }
  app?: {
    output?: boolean
    test?: boolean
    basePath?: string
    isDev?: string
  }
  input?: string
  output?: string
}

export const DEFAULT_CONFIG: Config = {
  schema: {
    name: 'PascalCase',
    export: false,
  },
  type: {
    name: 'PascalCase',
    export: false,
  },
  app: {
    output: false,
    test: false,
  },
} as const

/**
 * Loads the configuration from the `hono-takibi.json` file or returns the default configuration.
 *
 * @returns The configuration object.
 */
export function getConfig(): Config {
  const config: Config = fs.existsSync('hono-takibi.json')
    ? { ...DEFAULT_CONFIG, ...JSON.parse(fs.readFileSync('hono-takibi.json', 'utf-8')) }
    : DEFAULT_CONFIG
  return config
}
