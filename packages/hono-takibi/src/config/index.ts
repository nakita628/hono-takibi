import fs from 'node:fs'

type TakibiConfig = {
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
  }
}

export const DEFAULT_CONFIG: TakibiConfig = {
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
  },
} as const

/**
 * Loads the configuration from the `hono-takibi.json` file or returns the default configuration.
 *
 * @returns The configuration object.
 */
export function getConfig(): TakibiConfig {
  const config: TakibiConfig = fs.existsSync('hono-takibi.json')
    ? { ...DEFAULT_CONFIG, ...JSON.parse(fs.readFileSync('hono-takibi.json', 'utf-8')) }
    : DEFAULT_CONFIG
  return config
}
