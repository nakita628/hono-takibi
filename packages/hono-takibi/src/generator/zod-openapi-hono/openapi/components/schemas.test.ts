import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { schemasCode } from './schemas.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/schemas.test.ts

describe('schemasCode', () => {
  it('should return empty string when no schemas', () => {
    const components: Components = {}
    expect(schemasCode(components, true, true)).toBe('')
  })

  it('should return empty string when schemas is empty object', () => {
    const components: Components = { schemas: {} }
    expect(schemasCode(components, true, true)).toBe('')
  })

  it('should generate schema with export and type', () => {
    const components: Components = {
      schemas: {
        User: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
          },
        },
      },
    }
    const result = schemasCode(components, true, true)
    expect(result).toBe(
      `export const UserSchema=z.object({id:z.int(),name:z.string()}).openapi({"required":["id","name"]}).openapi('User')

export type User = z.infer<typeof UserSchema>`,
    )
  })

  it('should generate schema with export only', () => {
    const components: Components = {
      schemas: {
        User: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'integer' },
          },
        },
      },
    }
    const result = schemasCode(components, true, false)
    expect(result).toBe(
      `export const UserSchema=z.object({id:z.int()}).openapi({"required":["id"]}).openapi('User')`,
    )
  })

  it('should generate schema without export', () => {
    const components: Components = {
      schemas: {
        Test: {
          type: 'string',
        },
      },
    }
    const result = schemasCode(components, false, false)
    expect(result).toBe(`const TestSchema=z.string().openapi('Test')`)
  })

  it('should generate schema without export but with type', () => {
    const components: Components = {
      schemas: {
        Test: {
          type: 'string',
        },
      },
    }
    const result = schemasCode(components, false, true)
    expect(result).toBe(
      `const TestSchema=z.string().openapi('Test')

export type Test = z.infer<typeof TestSchema>`,
    )
  })
})
