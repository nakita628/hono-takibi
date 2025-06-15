import { describe, it, expect } from 'vitest'
import { generateComponentsCode } from './generate-components-code'
import type { Components } from '../../../../openapi/index.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/generate-components-code.test.ts

const testComponents: Components = {
  schemas: {
    Test: {
      type: 'object',
      required: ['test'],
      properties: {
        test: {
          type: 'string',
        },
      },
    },
  },
}

describe('generateComponentsCode Test', () => {
  // 1
  // {
  //   schema: { name: 'PascalCase', export: true },
  //   type: { name: 'PascalCase', export: true }
  // },
  it.concurrent('schema name PascalCase export true type PascalCase export true', () => {
    const result = generateComponentsCode(testComponents, true, true, 'PascalCase', 'PascalCase')
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // 2
  // {
  //   schema: { name: 'PascalCase', export: true },
  //   type: { name: 'PascalCase', export: false }
  // },
  it.concurrent('schema name PascalCase export true type not output export false', () => {
    const result = generateComponentsCode(testComponents, true, false, 'PascalCase', 'PascalCase')
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 3
  // {
  //   schema: { name: 'PascalCase', export: true },
  //   type: { name: 'camelCase', export: true }
  // },
  it.concurrent('schema name PascalCase export true type camelCase export true', () => {
    const result = generateComponentsCode(testComponents, true, true, 'PascalCase', 'camelCase')
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

export type test = z.infer<typeof TestSchema>`

    expect(result).toBe(expected)
  })
  // 4
  // {
  //   schema: { name: 'PascalCase', export: true },
  //   type: { name: 'camelCase', export: false }
  // },
  it.concurrent('schema name PascalCase export true type not output export false', () => {
    const result = generateComponentsCode(testComponents, true, false, 'PascalCase', 'camelCase')
    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 5
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'PascalCase', export: true }
  // },
  it.concurrent('schema name PascalCase export false type PascalCase export true', () => {
    const result = generateComponentsCode(testComponents, false, true, 'PascalCase', 'PascalCase')
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`

    expect(result).toBe(expected)
  })
  // 6
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'PascalCase', export: false }
  // },
  it.concurrent('schema name PascalCase export false type not output export false', () => {
    const result = generateComponentsCode(testComponents, false, false, 'PascalCase', 'PascalCase')
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 7
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'camelCase', export: true }
  // },
  it.concurrent('schema name PascalCase export false type camelCase export true', () => {
    const result = generateComponentsCode(testComponents, false, true, 'PascalCase', 'camelCase')
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

export type test = z.infer<typeof TestSchema>`

    expect(result).toBe(expected)
  })
  // 8
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'camelCase', export: false }
  // },
  it.concurrent('schema name PascalCase export false type not output export false', () => {
    const result = generateComponentsCode(testComponents, false, false, 'PascalCase', 'camelCase')
    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 9
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'PascalCase', export: true }
  // },
  it.concurrent('schema name camelCase export true type PascalCase export true', () => {
    const result = generateComponentsCode(testComponents, true, true, 'camelCase', 'PascalCase')
    const expected = `export const testSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof testSchema>`

    expect(result).toBe(expected)
  })
  // 10
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'PascalCase', export: false }
  // },
  it.concurrent('schema name camelCase export true type not output export false', () => {
    const result = generateComponentsCode(testComponents, true, false, 'camelCase', 'PascalCase')
    const expected = `export const testSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 11
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'camelCase', export: true }
  // },
  it.concurrent('schema name camelCase export true type camelCase export true', () => {
    const result = generateComponentsCode(testComponents, true, true, 'camelCase', 'camelCase')
    const expected = `export const testSchema = z.object({test:z.string()}).openapi('Test')

export type test = z.infer<typeof testSchema>`

    expect(result).toBe(expected)
  })
  // 12
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'camelCase', export: false }
  // },
  it.concurrent('schema name camelCase export true type not output export false', () => {
    const result = generateComponentsCode(testComponents, true, false, 'camelCase', 'camelCase')
    const expected = `export const testSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })

  // 13
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'PascalCase', export: true }
  // },
  it.concurrent('schema name camelCase export false type PascalCase export true', () => {
    const result = generateComponentsCode(testComponents, false, true, 'camelCase', 'PascalCase')
    const expected = `const testSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof testSchema>`

    expect(result).toBe(expected)
  })

  // 14
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'PascalCase', export: false }
  // },
  it.concurrent('schema name camelCase export false type not output export false', () => {
    const result = generateComponentsCode(testComponents, false, false, 'camelCase', 'PascalCase')
    const expected = `const testSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })

  // 15
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'camelCase', export: true }
  // },
  it.concurrent('schema name camelCase export false type camelCase export true', () => {
    const result = generateComponentsCode(testComponents, false, true, 'camelCase', 'camelCase')
    const expected = `const testSchema = z.object({test:z.string()}).openapi('Test')

export type test = z.infer<typeof testSchema>`

    expect(result).toBe(expected)
  })

  // 16
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'camelCase', export: false }
  // }
  it.concurrent('schema name camelCase export false type not output export false', () => {
    const result = generateComponentsCode(testComponents, false, false, 'camelCase', 'camelCase')
    const expected = `const testSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 17
  // schema empty
  it.concurrent(`schema empty -> ''`, () => {
    const result = generateComponentsCode({}, false, false, 'PascalCase', 'PascalCase')
    const expected = ''

    expect(result).toBe(expected)
  })
})
