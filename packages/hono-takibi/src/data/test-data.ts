import type { Config } from '../config'

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

export const CAMEL_CASE_CONFIG: Config = {
  schemaOptions: {
    namingCase: 'camelCase',
    exportEnabled: false,
  },
  typeOptions: {
    namingCase: 'camelCase',
    exportEnabled: true,
  },
} as const

export const PASCAL_CASE_CONFIG: Config = {
  schemaOptions: {
    namingCase: 'PascalCase',
    exportEnabled: false,
  },
  typeOptions: {
    namingCase: 'PascalCase',
    exportEnabled: true,
  },
} as const
