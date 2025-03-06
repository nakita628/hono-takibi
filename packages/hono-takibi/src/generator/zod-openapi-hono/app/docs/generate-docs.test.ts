import { describe, expect, it } from 'vitest'
import type { OpenAPISpec } from '../../../..type'
import { honoRestOpenAPI } from '../../../../data/hono-rest-openapi'
import { generateDocs } from './generate-docs'

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
