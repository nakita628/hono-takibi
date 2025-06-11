import { describe, it, expect } from 'vitest'
import { requestParamsArray } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/params/request-params-array.test.ts

describe('generateRequestParamsArray', () => {
  it.concurrent(
    `requestParamsArray({
      query: { id: 'z.string()' },
      params: { id: 'z.string()' },
    },) -> ['query:z.object({id:z.string()})', 'params:z.object({id:z.string()})']`,
    () => {
      const result = requestParamsArray({
        query: { id: 'z.string()' },
        params: { id: 'z.string()' },
      })
      const expected = ['query:z.object({id:z.string()})', 'params:z.object({id:z.string()})']
      expect(result).toStrictEqual(expected)
    },
  )

  it.concurrent(
    `requestParamsArray({ path: { petId: 'z.number().int()' } }) -> ['params:z.object({petId:z.number().int()})']`,
    () => {
      const result = requestParamsArray({ path: { petId: 'z.number().int()' } })
      const expected = ['params:z.object({petId:z.number().int()})']
      expect(result).toStrictEqual(expected)
    },
  )
})
