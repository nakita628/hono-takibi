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
      `const PageParamsSchema=z.coerce.number().int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})`,
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
      `export const LimitParamsSchema=z.coerce.number().int().exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":"integer"}}})

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
      `export const PaginationParamsSchema=z.object({page:z.coerce.number().int().min(1).default(1).exactOptional(),limit:z.coerce.number().int().min(1).max(100).default(20).exactOptional(),cursor:z.string().exactOptional()}).exactOptional().openapi({param:{"name":"pagination","in":"query","schema":{"type":"object","properties":{"page":{"type":"integer","minimum":1,"default":1},"limit":{"type":"integer","minimum":1,"maximum":100,"default":20},"cursor":{"type":"string"}}}}})`,
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

  it('preserves z.coerce.boolean() for query boolean with x-coerce: true (no z.coerce.stringbool() crash)', () => {
    const components: Components = {
      parameters: {
        flag: {
          name: 'flag',
          in: 'query',
          schema: { type: 'boolean', 'x-coerce': true },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const FlagParamsSchema=z.coerce.boolean().exactOptional().openapi({param:{"name":"flag","in":"query","schema":{"type":"boolean","x-coerce":true}}})`,
    )
  })

  it('preserves z.coerce.boolean() for path boolean with x-coerce: true', () => {
    const components: Components = {
      parameters: {
        active: {
          name: 'active',
          in: 'path',
          required: true,
          schema: { type: 'boolean', 'x-coerce': true },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const ActiveParamsSchema=z.coerce.boolean().openapi({param:{"name":"active","in":"path","required":true,"schema":{"type":"boolean","x-coerce":true}}})`,
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
      `export const IdsParamsSchema=z.array(z.coerce.number().int()).exactOptional().openapi({param:{"name":"ids","in":"query","schema":{"type":"array","items":{"type":"integer"}}}})`,
    )
  })

  it('should extract schema from content when schema is not provided', () => {
    const components = {
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
    } as unknown as Components
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const FilterParamsSchema=z.string().exactOptional().openapi({param:{"name":"filter","in":"query","content":{"application/json":{"schema":{"type":"string"}}}}})`,
    )
  })

  it('should fall back to z.any() when neither schema nor content is provided', () => {
    const components = {
      parameters: {
        unknown: {
          name: 'unknown',
          in: 'query',
        },
      },
    } as unknown as Components
    const result = parametersCode(components, true, false)
    expect(result).toBe(`export const UnknownParamsSchema=z.any()`)
  })

  it('should apply coercion to path integer parameter', () => {
    const components: Components = {
      parameters: {
        id: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const IdParamsSchema=z.coerce.number().int().openapi({param:{"name":"id","in":"path","required":true,"schema":{"type":"integer"}}})`,
    )
  })

  it('should apply coercion to path int64 parameter', () => {
    const components: Components = {
      parameters: {
        id: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer', format: 'int64' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const IdParamsSchema=z.coerce.bigint().pipe(z.int64()).openapi({param:{"name":"id","in":"path","required":true,"schema":{"type":"integer","format":"int64"}}})`,
    )
  })

  it('should apply coercion to path number parameter', () => {
    const components: Components = {
      parameters: {
        value: {
          name: 'value',
          in: 'path',
          required: true,
          schema: { type: 'number' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const ValueParamsSchema=z.coerce.number().openapi({param:{"name":"value","in":"path","required":true,"schema":{"type":"number"}}})`,
    )
  })

  it('should apply stringbool to path boolean parameter', () => {
    const components: Components = {
      parameters: {
        flag: {
          name: 'flag',
          in: 'path',
          required: true,
          schema: { type: 'boolean' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const FlagParamsSchema=z.stringbool().openapi({param:{"name":"flag","in":"path","required":true,"schema":{"type":"boolean"}}})`,
    )
  })

  it('should apply coercion with x-error-message to query integer parameter', () => {
    const components: Components = {
      parameters: {
        page: {
          name: 'page',
          in: 'query',
          schema: { type: 'integer', 'x-error-message': 'ページ番号は整数です' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const PageParamsSchema=z.coerce.number({error:"ページ番号は整数です"}).int({error:"ページ番号は整数です"}).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer","x-error-message":"ページ番号は整数です"}}})`,
    )
  })

  it('should apply coercion with x-error-message to path integer parameter', () => {
    const components: Components = {
      parameters: {
        id: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer', 'x-error-message': 'IDは整数です' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const IdParamsSchema=z.coerce.number({error:"IDは整数です"}).int({error:"IDは整数です"}).openapi({param:{"name":"id","in":"path","required":true,"schema":{"type":"integer","x-error-message":"IDは整数です"}}})`,
    )
  })

  it('should apply coercion with x-error-message to path number parameter', () => {
    const components: Components = {
      parameters: {
        value: {
          name: 'value',
          in: 'path',
          required: true,
          schema: { type: 'number', 'x-error-message': '数値必須' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const ValueParamsSchema=z.coerce.number({error:"数値必須"}).openapi({param:{"name":"value","in":"path","required":true,"schema":{"type":"number","x-error-message":"数値必須"}}})`,
    )
  })

  it('should apply coercion with x-error-message to query int32 parameter', () => {
    const components: Components = {
      parameters: {
        offset: {
          name: 'offset',
          in: 'query',
          schema: { type: 'integer', format: 'int32', 'x-error-message': 'int32必須' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const OffsetParamsSchema=z.coerce.number({error:"int32必須"}).pipe(z.int32({error:"int32必須"})).exactOptional().openapi({param:{"name":"offset","in":"query","schema":{"type":"integer","format":"int32","x-error-message":"int32必須"}}})`,
    )
  })

  it('should apply coercion with x-error-message and constraints to query integer parameter', () => {
    const components: Components = {
      parameters: {
        page: {
          name: 'page',
          in: 'query',
          schema: { type: 'integer', minimum: 1, 'x-error-message': 'ページ番号が不正です' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const PageParamsSchema=z.coerce.number({error:"ページ番号が不正です"}).int({error:"ページ番号が不正です"}).min(1,{error:"ページ番号が不正です"}).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer","minimum":1,"x-error-message":"ページ番号が不正です"}}})`,
    )
  })

  it('should drop x-required-message for query integer (coerce makes it unreachable)', () => {
    const components: Components = {
      parameters: {
        page: {
          name: 'page',
          in: 'query',
          schema: {
            type: 'integer',
            'x-required-message': '必須です',
            'x-error-message': 'ページ番号は整数です',
          },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const PageParamsSchema=z.coerce.number({error:"ページ番号は整数です"}).int({error:"ページ番号は整数です"}).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer","x-required-message":"必須です","x-error-message":"ページ番号は整数です"}}})`,
    )
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
