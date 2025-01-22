import { describe, expect, it } from 'vitest'
import { generateZodOpenapiHonoHandler } from './generate-zod-openapi-hono-handler'
import type { OpenAPISpec } from '../../../types'
import { honoRestOpenAPI } from '../../../data/hono-rest-openapi'
import type { Config } from '../../../config'
import { DEFAULT_CONFIG } from '../../../config'

const generateZodOpenapiHonoHandlerTestCases: {
  openapi: OpenAPISpec
  config: Config
  expected: string
}[] = [
  {
    openapi: honoRestOpenAPI,
    config: DEFAULT_CONFIG,
    expected: '',
  },
]

describe('generateZodOpenapiHonoHandler', () => {
  it.concurrent.each(generateZodOpenapiHonoHandlerTestCases)(
    'generateZodOpenapiHonoHandler($openapi) -> $expected',
    async ({ openapi, config, expected }) => {
      const result = generateZodOpenapiHonoHandler(openapi, config)

      console.log(result)
      //   expect(result).toBe(expected)
    },
  )
})
