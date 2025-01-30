import fs from 'node:fs'

export type Config = {
  schema: {
    name: 'camelCase' | 'PascalCase'
    export: boolean
  }
  type: {
    name: 'camelCase' | 'PascalCase'
    export: boolean
  }
  app?: {
    output?: boolean
  }
  handler?: {
    output?: boolean
    test?: boolean
  }
  input?: string
  output?: string
}

export const DEFAULT_CONFIG: Config = {
  schema: {
    name: 'camelCase',
    export: false,
  },
  type: {
    name: 'PascalCase',
    export: false,
  },
  app: {
    output: false,
  },
  handler: {
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
