import fs from 'node:fs'

export type Config = {
  openapiInput: {
    file: string
  }
  generatedOutput: {
    directory: string
    file: string
  }
  schemaOptions: {
    namingCase: 'camelCase' | 'PascalCase'
    exportEnabled: boolean
  }
  typeOptions: {
    namingCase: 'camelCase' | 'PascalCase'
    exportEnabled: boolean
  }
}

export const DEFAULT_CONFIG: Config = {
  openapiInput: {
    file: 'openapi.yaml',
  },
  generatedOutput: {
    directory: 'routes',
    file: 'index.ts',
  },
  schemaOptions: {
    namingCase: 'camelCase',
    exportEnabled: false,
  },
  typeOptions: {
    namingCase: 'camelCase',
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
