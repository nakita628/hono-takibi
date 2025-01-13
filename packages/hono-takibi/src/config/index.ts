import fs from 'node:fs'

export type Config = {
  schemaOptions: {
    namingCase: 'camelCase' | 'PascalCase'
    exportEnabled: boolean
  }
  typeOptions: {
    namingCase: 'camelCase' | 'PascalCase'
    exportEnabled: boolean
  }
  input?: string
  output?: string
}

export const DEFAULT_CONFIG: Config = {
  schemaOptions: {
    namingCase: 'camelCase',
    exportEnabled: false,
  },
  typeOptions: {
    namingCase: 'PascalCase',
    exportEnabled: false,
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
