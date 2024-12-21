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
        schema: { type: 'integer' },
        required: true,
        name: 'page',
        in: 'query',
      },
      {
        schema: { type: 'integer' },
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
