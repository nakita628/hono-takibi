import type { OpenAPI } from '../../../../openapi'
import { describe, it, expect } from 'vitest'
import { docs } from '.'
import { honoRestOpenAPI } from '../../../../../data/hono-rest-openapi'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/generator/docs.test.ts

const generateDocsTestCases: {
  openapi: OpenAPI
  expected: {
    openapi: string
    info: OpenAPI['info']
    servers?: OpenAPI['servers']
    externalDocs: OpenAPI['externalDocs']
    tags: OpenAPI['tags']
  }
}[] = [
  {
    openapi: honoRestOpenAPI,
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

describe('docs', () => {
  it.concurrent.each(generateDocsTestCases)(
    'docs($openapi) -> $expected',
    ({ openapi, expected }) => {
      const result = docs(openapi)
      expect(result).toEqual(expected)
    },
  )
})
