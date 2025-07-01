import { describe, it, expect } from 'vitest'
import { parseOpenAPI } from '.'

// Test run
// pnpm vitest run ./src/openapi/parse-openapi.test.ts

describe('safeParseOpenAPI', () => {
  it.concurrent('should return ok for a valid OpenAPI YAML string', async () => {
    const result = await parseOpenAPI({
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      components: {
        schemas: {
          Test: {
            type: 'object',
            required: ['test'],
            properties: {
              test: {
                type: 'string',
              },
            },
          },
        },
      },
      paths: {
        '/test': {
          post: {
            summary: 'Test endpoint',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Test',
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'Successful test',
              },
            },
          },
        },
      },
    } as unknown as string)
    expect(result.ok).toBe(true)
  })

  it.concurrent('should return err for a completely invalid input', async () => {
    const result = await parseOpenAPI('not yaml nor json')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(typeof result.error).toBe('string')
    }
  })
})
