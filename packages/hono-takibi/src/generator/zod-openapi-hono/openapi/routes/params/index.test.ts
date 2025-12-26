import { describe, expect, it } from 'vitest'
import { params } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/routes/params/index.test.ts

describe('params', () => {
  it.concurrent('params query', () => {
    const result = params([
      {
        schema: { type: 'string' },
        required: true,
        name: 'page',
        in: 'query',
      },
      {
        schema: { type: 'string' },
        required: true,
        name: 'rows',
        in: 'query',
      },
    ])

    const expected = {
      query: {
        page: 'z.string().openapi({param:{"name":"page","in":"query","required":true},"type":"string"})',
        rows: 'z.string().openapi({param:{"name":"rows","in":"query","required":true},"type":"string"})'
      }
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('params minimum 0', () => {
    const result = params([
      {
        schema: { type: 'number', minimum: 0 },
        required: true,
        name: 'page',
        in: 'query',
      },
      {
        schema: { type: 'number', minimum: 0 },
        required: true,
        name: 'rows',
        in: 'query',
      },
    ])
    const expected = {
      query: {
        page: 'z.coerce.number().min(0).openapi({param:{"name":"page","in":"query","required":true},"type":"number","minimum":0})',
        rows: 'z.coerce.number().min(0).openapi({param:{"name":"rows","in":"query","required":true},"type":"number","minimum":0})'
      }
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('params number', () => {
    const result = params([
      {
        schema: {
          type: 'number',
          minimum: 0,
          default: 1,
          example: 1,
        },
        required: true,
        name: 'page',
        in: 'query',
      },
    ])
    const expected = {
      query: {
        page: 'z.coerce.number().min(0).default(1).openapi({param:{"name":"page","in":"query","required":true},"type":"number","minimum":0,"default":1,"example":1})'
      }
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('paramsObject number example 10', () => {
    const result = params([
      {
        schema: {
          type: 'number',
          maximum: 10,
          default: 10,
          example: 10,
        },
        required: true,
        name: 'page',
        in: 'query',
      },
    ])

    const expected = {
      query: {
        page: 'z.coerce.number().max(10).default(10).openapi({param:{"name":"page","in":"query","required":true},"type":"number","maximum":10,"default":10,"example":10})'
      }
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('paramsObject boolean', () => {
    const result = params([
      {
        schema: { type: 'boolean' },
        required: true,
        name: 'active',
        in: 'query',
      },
    ])
    const expected = {
      query: {
        active: 'z.stringbool().openapi({param:{"name":"active","in":"query","required":true},"type":"boolean"})'
      }
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('params date', () => {
    const result = params([
      {
        schema: { type: 'date' },
        required: true,
        name: 'createdAt',
        in: 'query',
      },
    ])
    const expected = {
      query: {
        createdAt: 'z.coerce.date().openapi({param:{"name":"createdAt","in":"query","required":true},"type":"date"})'
      }
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('paramsObject path with example', () => {
    const result = params([
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
        description: 'Unique identifier of the post.',
      },
    ])
    const expected = {
      path: {
        id: 'z.uuid().openapi({param:{"name":"id","in":"path","required":true},"type":"string","format":"uuid","example":"123e4567-e89b-12d3-a456-426614174000"})'
      }
    }
    expect(result).toStrictEqual(expected)
  })
})
