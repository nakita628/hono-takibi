import { makeConst, makeResponses } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

export function responsesCode(components: Components, exportResponses: boolean): string {
  const { responses } = components
  if (!responses) return ''

  return Object.keys(responses)
    .map((k) => `${makeConst(exportResponses, k, 'Response')}${makeResponses(responses[k])}`)
    .join('\n\n')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/components/responses.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

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
}
