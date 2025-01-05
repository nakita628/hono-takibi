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

const defaultConfig: TakibiConfig = {
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
}

// 1. load config
const config = fs.existsSync('hono-takibi.json')
  ? { ...defaultConfig, ...JSON.parse(fs.readFileSync('hono-takibi.json', 'utf-8')) }
  : defaultConfig
