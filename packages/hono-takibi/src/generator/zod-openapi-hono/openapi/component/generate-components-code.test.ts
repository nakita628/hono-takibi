import { describe, test, expect } from 'vitest'
import { generateComponentsCode } from './generate-components-code'
import type { Components } from '../../../../types'

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
  test.concurrent('schema name PascalCase export true type PascalCase export true', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'PascalCase', export: true },
    })

    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`
    expect(result).toBe(expected)
  })
  // 2
  // {
  //   schema: { name: 'PascalCase', export: true },
  //   type: { name: 'PascalCase', export: false }
  // },
  test.concurrent('schema name PascalCase export true type not output export false', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'PascalCase', export: false },
    })

    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 3
  // {
  //   schema: { name: 'PascalCase', export: true },
  //   type: { name: 'camelCase', export: true }
  // },
  test.concurrent('schema name PascalCase export true type camelCase export true', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'camelCase', export: true },
    })

    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

export type test = z.infer<typeof TestSchema>`

    expect(result).toBe(expected)
  })
  // 4
  // {
  //   schema: { name: 'PascalCase', export: true },
  //   type: { name: 'camelCase', export: false }
  // },
  test.concurrent('schema name PascalCase export true type not output export false', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'camelCase', export: false },
    })

    const expected = `export const TestSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 5
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'PascalCase', export: true }
  // },
  test.concurrent('schema name PascalCase export false type PascalCase export true', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: true },
    })

    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof TestSchema>`

    expect(result).toBe(expected)
  })
  // 6
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'PascalCase', export: false }
  // },
  test.concurrent('schema name PascalCase export false type not output export false', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: false },
    })

    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 7
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'camelCase', export: true }
  // },
  test.concurrent('schema name PascalCase export false type camelCase export true', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'camelCase', export: true },
    })

    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

export type test = z.infer<typeof TestSchema>`

    expect(result).toBe(expected)
  })
  // 8
  // {
  //   schema: { name: 'PascalCase', export: false },
  //   type: { name: 'camelCase', export: false }
  // },
  test.concurrent('schema name PascalCase export false type not output export false', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'camelCase', export: false },
    })

    const expected = `const TestSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 9
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'PascalCase', export: true }
  // },
  test.concurrent('schema name camelCase export true type PascalCase export true', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'camelCase', export: true },
      type: { name: 'PascalCase', export: true },
    })

    const expected = `export const testSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof testSchema>`

    expect(result).toBe(expected)
  })
  // 10
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'PascalCase', export: false }
  // },
  test.concurrent('schema name camelCase export true type not output export false', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'camelCase', export: true },
      type: { name: 'PascalCase', export: false },
    })

    const expected = `export const testSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 11
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'camelCase', export: true }
  // },
  test.concurrent('schema name camelCase export true type camelCase export true', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'camelCase', export: true },
      type: { name: 'camelCase', export: true },
    })

    const expected = `export const testSchema = z.object({test:z.string()}).openapi('Test')

export type test = z.infer<typeof testSchema>`

    expect(result).toBe(expected)
  })
  // 12
  // {
  //   schema: { name: 'camelCase', export: true },
  //   type: { name: 'camelCase', export: false }
  // },
  test.concurrent('schema name camelCase export true type not output export false', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'camelCase', export: true },
      type: { name: 'camelCase', export: false },
    })

    const expected = `export const testSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 13
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'PascalCase', export: true }
  // },
  test.concurrent('schema name camelCase export false type PascalCase export true', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'camelCase', export: false },
      type: { name: 'PascalCase', export: true },
    })

    const expected = `const testSchema = z.object({test:z.string()}).openapi('Test')

export type Test = z.infer<typeof testSchema>`

    expect(result).toBe(expected)
  })

  // 14
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'PascalCase', export: false }
  // },
  test.concurrent('schema name camelCase export false type not output export false', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'camelCase', export: false },
      type: { name: 'PascalCase', export: false },
    })

    const expected = `const testSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 15
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'camelCase', export: true }
  // },
  test.concurrent('schema name camelCase export false type camelCase export true', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'camelCase', export: false },
      type: { name: 'camelCase', export: true },
    })

    const expected = `const testSchema = z.object({test:z.string()}).openapi('Test')

export type test = z.infer<typeof testSchema>`

    expect(result).toBe(expected)
  })
  // 16
  // {
  //   schema: { name: 'camelCase', export: false },
  //   type: { name: 'camelCase', export: false }
  // }
  test.concurrent('schema name camelCase export false type not output export false', () => {
    const result = generateComponentsCode(testComponents, {
      schema: { name: 'camelCase', export: false },
      type: { name: 'camelCase', export: false },
    })

    const expected = `const testSchema = z.object({test:z.string()}).openapi('Test')

`

    expect(result).toBe(expected)
  })
  // 17
  // schema empty
  test.concurrent(`schema empty -> ''`, () => {
    const result = generateComponentsCode(
      {},
      {
        schema: {
          name: 'PascalCase',
          export: false,
        },
        type: {
          name: 'PascalCase',
          export: false,
        },
      },
    )

    const expected = ''

    expect(result).toBe(expected)
  })
})
