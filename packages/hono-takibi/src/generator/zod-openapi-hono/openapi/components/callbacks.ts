import { makeConst } from '../../../../helper/code.js'
import { makeCallbacks } from '../../../../helper/index.js'
import type { Callbacks, Components } from '../../../../openapi/index.js'

export function callbacksCode(components: Components, exportCallbacks: boolean): string {
  const { callbacks } = components
  if (!callbacks) return ''

  const isCallbacks = (v: unknown): v is Callbacks =>
    typeof v === 'object' && v !== null && !('$ref' in v)

  return Object.entries(callbacks)
    .map(([k, callbackOrRef]) => {
      if (!isCallbacks(callbackOrRef)) return undefined
      const callbackCode = makeCallbacks(callbackOrRef)
      return callbackCode
        ? `${makeConst(exportCallbacks, k, 'Callback')}{${callbackCode}}`
        : undefined
    })
    .filter((v) => v !== undefined)
    .join('\n\n')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/components/callbacks.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('callbacksCode', () => {
    it('should return empty string when no callbacks', () => {
      const components: Components = {}
      expect(callbacksCode(components, true)).toBe('')
    })

    it('should generate callback with export', () => {
      const components: Components = {
        callbacks: {
          onEvent: {
            '{callback}': {
              post: {
                requestBody: {
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
                responses: {
                  200: {
                    description: 'OK',
                  },
                },
              },
            },
          },
        },
      }
      const result = callbacksCode(components, true)
      expect(result).toBe(
        `export const OnEventCallback={"{callback}":{post:{requestBody:{content:{'application/json':{schema:z.object({message:z.string().exactOptional()})}}},responses:{200:{description:"OK"}}}}}`,
      )
    })

    it('should generate callback without export', () => {
      const components: Components = {
        callbacks: {
          simpleCallback: {
            '{url}': {
              get: {
                responses: {
                  200: {
                    description: 'Success',
                  },
                },
              },
            },
          },
        },
      }
      const result = callbacksCode(components, false)
      expect(result).toBe(
        `const SimpleCallback={"{url}":{get:{responses:{200:{description:"Success"}}}}}`,
      )
    })
  })
}
