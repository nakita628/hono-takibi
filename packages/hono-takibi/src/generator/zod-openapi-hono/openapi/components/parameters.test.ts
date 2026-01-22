import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { parametersCode } from './parameters.js'

describe('parametersCode', () => {
  it('should return empty string when no parameters', () => {
    const components: Components = {}
    expect(parametersCode(components, true, false)).toBe('')
  })

  it('should generate path parameter with export', () => {
    const components: Components = {
      parameters: {
        userId: {
          name: 'userId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const UserIdParamsSchema=z.string().openapi({param:{"name":"userId","in":"path","required":true,"schema":{"type":"string"}}})`,
    )
  })

  it('should generate parameter without export', () => {
    const components: Components = {
      parameters: {
        page: {
          name: 'page',
          in: 'query',
          schema: { type: 'integer' },
        },
      },
    }
    const result = parametersCode(components, false, false)
    expect(result).toBe(
      `const PageParamsSchema=z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})`,
    )
  })

  it('should generate parameter with export and type', () => {
    const components: Components = {
      parameters: {
        limit: {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer' },
        },
      },
    }
    const result = parametersCode(components, true, true)
    expect(result).toBe(
      `export const LimitParamsSchema=z.int().exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":"integer"}}})

export type LimitParams=z.infer<typeof LimitParamsSchema>`,
    )
  })
})
