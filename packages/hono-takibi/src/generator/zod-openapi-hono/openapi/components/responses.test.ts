import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { responsesCode } from './responses.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/responses.test.ts

describe('responsesCode', () => {
  it('should return empty string when no responses', () => {
    const components: Components = {}
    expect(responsesCode(components, true)).toBe('')
  })

  it('should generate response with export', () => {
    const components: Components = {
      responses: {
        NotFound: {
          description: 'Not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    }
    const result = responsesCode(components, true)
    expect(result).toBe(
      `export const NotFoundResponse={description:"Not found",content:{'application/json':{schema:z.object({message:z.string().exactOptional()})}}}`,
    )
  })

  it('should generate response without export', () => {
    const components: Components = {
      responses: {
        Success: {
          description: 'Success',
        },
      },
    }
    const result = responsesCode(components, false)
    expect(result).toBe(`const SuccessResponse={description:"Success"}`)
  })
})
