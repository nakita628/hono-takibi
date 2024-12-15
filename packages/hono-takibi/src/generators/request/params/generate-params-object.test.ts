import { describe, expect, it } from 'vitest'
import { generateParamsObject } from './generate-params-object'
import { ParamsObject, PathParameters } from '../../../types'

const generateParamsObjectTestCases: {
  input: PathParameters[]
  expected: ParamsObject
}[] = [
  {
    input: [
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
    input: [
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
    input: [
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
    input: [
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
    input: [
      {
        schema: { type: 'string', format: 'uuid' },
        required: true,
        name: 'id',
        in: 'path',
      },
    ],
    expected: { query: {}, params: { id: 'z.string().uuid()' }, headers: {}, body: {} },
  },
]

describe('generateRequestBody', () => {
  it.concurrent.each(generateParamsObjectTestCases)(
    'generateParamsObject($input) -> $expected',
    async ({ input, expected }) => {
      const result = generateParamsObject(input)
      expect(result).toEqual(expected)
    },
  )
})
