import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { callbacksCode } from './callbacks.js'

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
      `export const OnEventCallback={"{callback}":{"post":{"requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string"}}}}}},"responses":{"200":{"description":"OK"}}}}}`,
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
      `const SimpleCallback={"{url}":{"get":{"responses":{"200":{"description":"Success"}}}}}`,
    )
  })
})
