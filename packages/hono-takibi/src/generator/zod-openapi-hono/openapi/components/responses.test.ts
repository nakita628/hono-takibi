import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { responsesCode } from './responses.js'

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

  it('should generate response with as const for inline', () => {
    const components: Components = {
      responses: {
        NotFound: {
          description: 'Not found',
        },
      },
    }
    const result = responsesCode(components, true, true)
    expect(result).toBe(`export const NotFoundResponse={description:"Not found"} as const`)
  })

  it('should not add as const for $ref response', () => {
    const components: Components = {
      responses: {
        Alias: {
          $ref: '#/components/responses/NotFound',
        },
      },
    }
    const result = responsesCode(components, true, true)
    expect(result).toBe('export const AliasResponse=NotFoundResponse')
  })

  it('should handle mixed $ref and inline with readonly', () => {
    const components: Components = {
      responses: {
        Alias: {
          $ref: '#/components/responses/BaseNotFound',
        },
        Success: {
          description: 'OK',
        },
      },
    }
    const result = responsesCode(components, true, true)
    expect(result).toBe(
      `export const AliasResponse=BaseNotFoundResponse\n\nexport const SuccessResponse={description:"OK"} as const`,
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
