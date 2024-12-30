import { describe, expect, it } from 'vitest'
import { generateParamsObject } from './generate-params-object'
import type { ParamsObject, Parameters } from '../../../types'

const generateParamsObjectTestCases: {
  parameters: Parameters[]
  expected: ParamsObject
}[] = [
  {
    parameters: [
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
    expected: {
      query: { page: 'z.string()', rows: 'z.string()' },
      params: {},
      headers: {},
      body: {},
    },
  },
  {
    parameters: [
      {
        schema: { type: 'string', format: 'uuid' },
        required: true,
        name: 'id',
        in: 'path',
      },
    ],
    expected: {
      query: {},
      params: { id: 'z.string().uuid()' },
      headers: {},
      body: {},
    },
  },
  {
    parameters: [
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
    expected: {
      query: { page: 'z.string()', rows: 'z.string()' },
      params: {},
      headers: {},
      body: {},
    },
  },
  {
    parameters: [
      {
        schema: { type: 'string', format: 'uuid' },
        required: true,
        name: 'id',
        in: 'path',
      },
    ],
    expected: { query: {}, params: { id: 'z.string().uuid()' }, headers: {}, body: {} },
  },
  {
    parameters: [
      {
        schema: { type: 'string', format: 'uuid' },
        required: true,
        name: 'id',
        in: 'path',
      },
    ],
    expected: { query: {}, params: { id: 'z.string().uuid()' }, headers: {}, body: {} },
  },
  {
    parameters: [
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
    expected: {
      query: {
        page: 'z.string().pipe(z.coerce.number().min(0))',
        rows: 'z.string().pipe(z.coerce.number().min(0))',
      },
      params: {},
      headers: {},
      body: {},
    },
  },
  {
    parameters: [
      {
        schema: { type: 'integer', minimum: 0 },
        required: true,
        name: 'page',
        in: 'query',
      },
      {
        schema: { type: 'integer', minimum: 0 },
        required: true,
        name: 'rows',
        in: 'query',
      },
    ],
    expected: {
      query: {
        page: 'z.string().pipe(z.coerce.number().int().min(0))',
        rows: 'z.string().pipe(z.coerce.number().int().min(0))',
      },
      params: {},
      headers: {},
      body: {},
    },
  },

  // coerce with example
  {
    parameters: [
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
    expected: {
      query: {
        page: 'z.string().pipe(z.coerce.number().int().min(0).default(1).openapi({example:1}))',
      },
      params: {},
      headers: {},
      body: {},
    },
  },
  {
    parameters: [
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
    expected: {
      query: {
        page: 'z.string().pipe(z.coerce.number().int().max(10).default(10).openapi({example:10}))',
      },
      params: {},
      headers: {},
      body: {},
    },
  },
]

describe('generateRequestBody', () => {
  it.concurrent.each(generateParamsObjectTestCases)(
    'generateParamsObject($parameters) -> $expected',
    async ({ parameters, expected }) => {
      const result = generateParamsObject(parameters)
      expect(result).toEqual(expected)
    },
  )
})
