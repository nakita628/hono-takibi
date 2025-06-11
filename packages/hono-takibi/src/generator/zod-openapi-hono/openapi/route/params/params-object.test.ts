import { describe, it, expect } from 'vitest'
import { paramsObject } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/params/params-object.test.ts

describe('paramsObject', () => {
  it.concurrent('paramsObject query', () => {
    const result = paramsObject(
      [
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
      ],
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

    const expected = {
      query: {
        page: 'z.string().openapi({param:{in:"query",name:"page",required:false}})',
        rows: 'z.string().openapi({param:{in:"query",name:"rows",required:false}})',
      },
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('paramsObject minimum 0', () => {
    const result = paramsObject(
      [
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
      ],
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

    const expected = {
      query: {
        page: 'z.string().pipe(z.coerce.number().nonpositive().openapi({param:{in:"query",name:"page",required:false}}))',
        rows: 'z.string().pipe(z.coerce.number().nonpositive().openapi({param:{in:"query",name:"rows",required:false}}))',
      },
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('paramsObject integer', () => {
    const result = paramsObject(
      [
        {
          schema: {
            type: 'integer',
            minimum: 0,
            default: 1,
            example: 1,
          },
          required: true,
          name: 'page',
          in: 'query',
        },
      ],
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

    const expected = {
      query: {
        page: 'z.string().pipe(z.coerce.number().int().min(0).default(1).openapi({param:{in:"query",name:"page",required:false},example:1}))',
      },
    }

    expect(result).toStrictEqual(expected)
  })

  it.concurrent('paramsObject integer example 10', () => {
    const result = paramsObject(
      [
        {
          schema: {
            type: 'integer',
            maximum: 10,
            default: 10,
            example: 10,
          },
          required: true,
          name: 'page',
          in: 'query',
        },
      ],
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

    const expected = {
      query: {
        page: 'z.string().pipe(z.coerce.number().int().max(10).default(10).openapi({param:{in:"query",name:"page",required:false},example:10}))',
      },
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('paramsObject path with example', () => {
    const result = paramsObject(
      [
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
      ],
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

    const expected = {
      path: {
        id: 'z.string().uuid().openapi({param:{in:"path",name:"id",required:true},example:"123e4567-e89b-12d3-a456-426614174000"})',
      },
    }
    expect(result).toStrictEqual(expected)
  })
})
