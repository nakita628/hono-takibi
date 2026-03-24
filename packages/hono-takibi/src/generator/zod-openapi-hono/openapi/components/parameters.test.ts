import { describe, expect, it } from 'vite-plus/test'

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
      `const PageParamsSchema=z.coerce.number().pipe(z.int()).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})`,
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
      `export const LimitParamsSchema=z.coerce.number().pipe(z.int()).exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":"integer"}}})

export type LimitParams=z.infer<typeof LimitParamsSchema>`,
    )
  })

  it('should apply coercion to date query parameter', () => {
    const components: Components = {
      parameters: {
        createdAfter: {
          name: 'createdAfter',
          in: 'query',
          schema: { type: 'date' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const CreatedAfterParamsSchema=z.coerce.date().exactOptional().openapi({param:{"name":"createdAfter","in":"query","schema":{"type":"date"}}})`,
    )
  })

  it('should apply coercion to integer properties inside object query parameter', () => {
    const components: Components = {
      parameters: {
        pagination: {
          name: 'pagination',
          in: 'query',
          schema: {
            type: 'object',
            properties: {
              page: { type: 'integer', minimum: 1, default: 1 },
              limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
              cursor: { type: 'string' },
            },
          },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const PaginationParamsSchema=z.object({page:z.coerce.number().pipe(z.int().min(1)).default(1).exactOptional(),limit:z.coerce.number().pipe(z.int().min(1).max(100)).default(20).exactOptional(),cursor:z.string().exactOptional()}).exactOptional().openapi({param:{"name":"pagination","in":"query","schema":{"type":"object","properties":{"page":{"type":"integer","minimum":1,"default":1},"limit":{"type":"integer","minimum":1,"maximum":100,"default":20},"cursor":{"type":"string"}}}}})`,
    )
  })

  it('should apply coercion to number properties inside object query parameter', () => {
    const components: Components = {
      parameters: {
        range: {
          name: 'range',
          in: 'query',
          schema: {
            type: 'object',
            properties: {
              min: { type: 'number' },
              max: { type: 'number' },
            },
          },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const RangeParamsSchema=z.object({min:z.coerce.number().exactOptional(),max:z.coerce.number().exactOptional()}).exactOptional().openapi({param:{"name":"range","in":"query","schema":{"type":"object","properties":{"min":{"type":"number"},"max":{"type":"number"}}}}})`,
    )
  })

  it('should generate header location parameter', () => {
    const components: Components = {
      parameters: {
        xRequestId: {
          name: 'X-Request-Id',
          in: 'header',
          required: true,
          schema: { type: 'string' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const XRequestIdParamsSchema=z.string().openapi({param:{"name":"X-Request-Id","in":"header","required":true,"schema":{"type":"string"}}})`,
    )
  })

  it('should generate cookie location parameter', () => {
    const components: Components = {
      parameters: {
        sessionId: {
          name: 'session_id',
          in: 'cookie',
          schema: { type: 'string' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const SessionIdParamsSchema=z.string().exactOptional().openapi({param:{"name":"session_id","in":"cookie","schema":{"type":"string"}}})`,
    )
  })

  it('should apply stringbool coercion to boolean query parameter', () => {
    const components: Components = {
      parameters: {
        includeDeleted: {
          name: 'includeDeleted',
          in: 'query',
          schema: { type: 'boolean' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const IncludeDeletedParamsSchema=z.stringbool().exactOptional().openapi({param:{"name":"includeDeleted","in":"query","schema":{"type":"boolean"}}})`,
    )
  })

  it('should handle array query parameter with item coercion', () => {
    const components: Components = {
      parameters: {
        ids: {
          name: 'ids',
          in: 'query',
          schema: {
            type: 'array',
            items: { type: 'integer' },
          },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const IdsParamsSchema=z.array(z.coerce.number().pipe(z.int()).exactOptional().openapi({param:{"name":"ids","in":"query","schema":{"type":"array","items":{"type":"integer"}}}})).exactOptional().openapi({param:{"name":"ids","in":"query","schema":{"type":"array","items":{"type":"integer"}}}})`,
    )
  })

  it('should extract schema from content when schema is not provided', () => {
    const components: Components = {
      parameters: {
        filter: {
          name: 'filter',
          in: 'query',
          content: {
            'application/json': {
              schema: { type: 'string' },
            },
          },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const FilterParamsSchema=z.string().exactOptional().openapi({param:{"name":"filter","in":"query","content":{"application/json":{"schema":{"type":"string"}}}}})`,
    )
  })

  it('should fall back to z.any() when neither schema nor content is provided', () => {
    const components: Components = {
      parameters: {
        unknown: {
          name: 'unknown',
          in: 'query',
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(`export const UnknownParamsSchema=z.any()`)
  })

  it('should add readonly modifier when readonly option is true', () => {
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
    const result = parametersCode(components, true, false, true)
    expect(result).toBe(
      `export const UserIdParamsSchema=z.string().openapi({param:{"name":"userId","in":"path","required":true,"schema":{"type":"string"}}}).readonly()`,
    )
  })
})
