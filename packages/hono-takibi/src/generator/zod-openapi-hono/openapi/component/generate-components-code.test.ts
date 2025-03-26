import { describe, expect, it } from 'vitest'
import { generateComponentsCode } from './generate-components-code'
import { DEFAULT_CONFIG } from '../../../../../data/test-config'
import type { Components } from '../../../../type'
import type { Config } from '../../../../config'

const testComponents: Components = {
  schemas: {
    A: {
      type: 'object',
      required: ['a'],
      properties: {
        a: {
          type: 'string',
          example: 'a',
        },
      },
    },
    B: {
      type: 'object',
      required: ['b'],
      properties: {
        b: {
          type: 'string',
          example: 'b',
        },
      },
    },
    C: {
      type: 'object',
      required: ['c'],
      properties: {
        c: {
          type: 'string',
          example: 'c',
        },
      },
    },
    D: {
      type: 'object',
      required: ['d'],
      properties: {
        d: {
          type: 'string',
          example: 'd',
        },
      },
    },
    E: {
      type: 'object',
      required: ['e'],
      properties: {
        e: {
          type: 'string',
          example: 'e',
        },
      },
    },
  },
}

const generateComponentsCodeTestCases: {
  components: Components
  config: Config
  expected: string
}[] = [
  {
    components: {
      schemas: {},
    },
    config: DEFAULT_CONFIG,
    expected: '',
  },
  {
    components: testComponents,
    config: {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
    expected: `const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

`,
  },
  // PascalCase: schema export true, type export false
  {
    components: testComponents,
    config: {
      schema: {
        name: 'PascalCase',
        export: true,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
    expected: `export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



export const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



export const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



export const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



export const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

`,
  },
  // PascalCase: schema export false, type export true
  {
    components: testComponents,
    config: {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: true,
      },
    },
    expected: `const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type A = z.infer<typeof ASchema>

const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type B = z.infer<typeof BSchema>

const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type C = z.infer<typeof CSchema>

const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type D = z.infer<typeof DSchema>

const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type E = z.infer<typeof ESchema>`,
  },
  // PascalCase: schema export true, type export true
  {
    components: testComponents,
    config: {
      schema: {
        name: 'PascalCase',
        export: true,
      },
      type: {
        name: 'PascalCase',
        export: true,
      },
    },
    expected: `export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type A = z.infer<typeof ASchema>

export const BSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type B = z.infer<typeof BSchema>

export const CSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type C = z.infer<typeof CSchema>

export const DSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type D = z.infer<typeof DSchema>

export const ESchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type E = z.infer<typeof ESchema>`,
  },
  // camelCase: schema, type 共に export false
  {
    components: testComponents,
    config: {
      schema: {
        name: 'camelCase',
        export: false,
      },
      type: {
        name: 'camelCase',
        export: false,
      },
    },
    expected: `const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

`,
  },
  // camelCase: schema export true, type export false
  {
    components: testComponents,
    config: {
      schema: {
        name: 'camelCase',
        export: true,
      },
      type: {
        name: 'camelCase',
        export: false,
      },
    },
    expected: `export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')



export const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')



export const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')



export const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')



export const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

`,
  },
  // camelCase: schema export false, type export true
  {
    components: testComponents,
    config: {
      schema: {
        name: 'camelCase',
        export: false,
      },
      type: {
        name: 'camelCase',
        export: true,
      },
    },
    expected: `const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type a = z.infer<typeof aSchema>

const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type b = z.infer<typeof bSchema>

const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type c = z.infer<typeof cSchema>

const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type d = z.infer<typeof dSchema>

const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type e = z.infer<typeof eSchema>`,
  },
  // camelCase: schema export true, type export true
  {
    components: testComponents,
    config: {
      schema: {
        name: 'camelCase',
        export: true,
      },
      type: {
        name: 'camelCase',
        export: true,
      },
    },
    expected: `export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type a = z.infer<typeof aSchema>

export const bSchema = z.object({b:z.string().openapi({example:"b"})}).openapi('B')

export type b = z.infer<typeof bSchema>

export const cSchema = z.object({c:z.string().openapi({example:"c"})}).openapi('C')

export type c = z.infer<typeof cSchema>

export const dSchema = z.object({d:z.string().openapi({example:"d"})}).openapi('D')

export type d = z.infer<typeof dSchema>

export const eSchema = z.object({e:z.string().openapi({example:"e"})}).openapi('E')

export type e = z.infer<typeof eSchema>`,
  },
]

describe('generateComponentsCode', () => {
  it.concurrent.each(generateComponentsCodeTestCases)(
    'generateComponentsCode($components, $config) -> $expected',
    async ({ components, config, expected }) => {
      const result = generateComponentsCode(components, config)
      expect(result).toBe(expected)
    },
  )
})
