import { describe, it, expect } from 'vitest'
import { generateParamsObject } from './generate-params-object'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/params/generate-params-object.test.ts

describe('generateRequestBody', () => {
  it.concurrent('generateParamsObject query', () => {
    const result = generateParamsObject(
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

    const expected = { query: { page: 'z.string()', rows: 'z.string()' } }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('generateParamsObject minimum 0', () => {
    const result = generateParamsObject(
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
        page: 'z.string().pipe(z.coerce.number().nonpositive())',
        rows: 'z.string().pipe(z.coerce.number().nonpositive())',
      },
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('generateParamsObject integer', () => {
    const result = generateParamsObject(
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
        page: 'z.string().pipe(z.coerce.number().int().min(0).default(1).openapi({example:1}))',
      },
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('generateParamsObject integer example 10', () => {
    const result = generateParamsObject(
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
        page: 'z.string().pipe(z.coerce.number().int().max(10).default(10).openapi({example:10}))',
      },
    }
    expect(result).toStrictEqual(expected)
  })

  it.concurrent('generateParamsObject path with example', () => {
    const result = generateParamsObject(
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
        id: 'z.string().uuid().openapi({param:{in:"path",name:"id"},example:"123e4567-e89b-12d3-a456-426614174000"})',
      },
    }
    expect(result).toStrictEqual(expected)
  })
})
