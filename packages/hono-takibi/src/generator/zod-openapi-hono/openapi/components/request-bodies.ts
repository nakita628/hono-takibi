import { makeConst } from '../../../../helper/code.js'
import { makeRequestBody } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

export function requestBodiesCode(components: Components, exportRequestBodies: boolean): string {
  const requestBodies = components.requestBodies
  if (!requestBodies) return ''

  return Object.entries(requestBodies)
    .map(([k, body]) => {
      return `${makeConst(exportRequestBodies, k, 'RequestBody')}${makeRequestBody(body)}`
    })
    .join('\n\n')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/components/request-bodies.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('requestBodiesCode', () => {
    it('should return empty string when no requestBodies', () => {
      const components: Components = {}
      expect(requestBodiesCode(components, true)).toBe('')
    })

    it('should generate request body with export', () => {
      const components: Components = {
        requestBodies: {
          UserBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      }
      const result = requestBodiesCode(components, true)
      expect(result).toBe(
        `export const UserBodyRequestBody={content:{'application/json':{schema:z.object({name:z.string().exactOptional()})}},required:true}`,
      )
    })

    it('should generate request body without export', () => {
      const components: Components = {
        requestBodies: {
          SimpleBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      }
      const result = requestBodiesCode(components, false)
      expect(result).toBe(
        `const SimpleBodyRequestBody={content:{'application/json':{schema:z.string()}}}`,
      )
    })
  })
}
