import type { OpenAPISpec } from '../../../../types'
import { describe, expect, it } from 'vitest'
import { generateDocs } from './generate-docs'
import { honoRestOpenAPI } from '../../../../../data/hono-rest-openapi'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/docs/generate-docs.test.ts

const generateDocsTestCases: {
  openAPISpec: OpenAPISpec
  expected: {
    openapi: string
    info: OpenAPISpec['info']
    servers?: OpenAPISpec['servers']
    externalDocs: OpenAPISpec['externalDocs']
    tags: OpenAPISpec['tags']
  }
}[] = [
  {
    openAPISpec: honoRestOpenAPI,
    expected: {
      openapi: '3.1.0',
      info: { title: 'Hono API', version: 'v1' },
      servers: undefined,
      externalDocs: undefined,
      tags: [
        {
          name: 'Hono',
          description: 'Endpoints related to general Hono operations',
        },
        {
          name: 'Post',
          description: 'Endpoints for creating, retrieving, updating, and deleting posts',
        },
      ],
    },
  },
]

describe('generateDocs', () => {
  it.concurrent.each(generateDocsTestCases)(
    'generateDocs($openAPISpec) -> $expected',
    ({ openAPISpec, expected }) => {
      const result = generateDocs(openAPISpec)
      expect(result).toEqual(expected)
    },
  )
})
