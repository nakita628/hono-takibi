import { describe, expect, it } from 'vitest'
import { generateRequestParamsArray } from './generate-request-params-array'
import type { ParamsObject } from '../../../../..type'

const generateRequestParamsArrayTestCases: {
  paramsObject: ParamsObject
  expected: string[]
}[] = [
  {
    paramsObject: {
      query: { id: 'z.string()' },
      params: { id: 'z.string()' },
    },
    expected: ['query:z.object({id:z.string()})', 'params:z.object({id:z.string()})'],
  },
  {
    paramsObject: { path: { petId: 'z.number().int()' } },
    expected: ['params:z.object({petId:z.number().int()})'],
  },
  {
    paramsObject: {
      header: { api_key: 'z.string().optional()' },
      path: { petId: 'z.number().int()' },
    },
    expected: [
      'header:z.object({api_key:z.string().optional()})',
      'params:z.object({petId:z.number().int()})',
    ],
  },
]

describe('generateRequestParamsArray', () => {
  it.concurrent.each(generateRequestParamsArrayTestCases)(
    'generateRequestParamsArray($paramsObject) -> $expected',
    async ({ paramsObject, expected }) => {
      const result = generateRequestParamsArray(paramsObject)
      expect(result).toEqual(expected)
    },
  )
})
