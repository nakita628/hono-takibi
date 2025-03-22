import type { Config } from '../src/config'

export const DEFAULT_CONFIG: Config = {
  schema: {
    name: 'camelCase',
    export: false,
  },
  type: {
    name: 'PascalCase',
    export: false,
  },
} as const

export const CAMEL_CASE_CONFIG: Config = {
  schema: {
    name: 'camelCase',
    export: false,
  },
  type: {
    name: 'camelCase',
    export: true,
  },
} as const

export const PASCAL_CASE_CONFIG: Config = {
  schema: {
    name: 'PascalCase',
    export: false,
  },
  type: {
    name: 'PascalCase',
    export: true,
  },
} as const
