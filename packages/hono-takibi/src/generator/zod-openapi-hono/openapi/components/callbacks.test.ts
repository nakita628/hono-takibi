import { describe, expect, it } from 'vite-plus/test'

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
      `const SimpleCallbackCallback={"{url}":{get:{responses:{200:{description:"Success"}}}}}`,
    )
  })

  it('should generate callback with readonly (as const)', () => {
    const components: Components = {
      callbacks: {
        onData: {
          '{callback}': {
            post: {
              responses: { 200: { description: 'OK' } },
            },
          },
        },
      },
    }
    const result = callbacksCode(components, true, true)
    expect(result).toBe(
      `export const OnDataCallback={"{callback}":{post:{responses:{200:{description:"OK"}}}}} as const`,
    )
  })

  it('should skip $ref entries', () => {
    const components: Components = {
      callbacks: {
        refCallback: { $ref: '#/components/callbacks/Shared' },
      },
    }
    const result = callbacksCode(components, true)
    expect(result).toBe('')
  })

  it('should handle mix of $ref and real callbacks', () => {
    const components: Components = {
      callbacks: {
        refCallback: { $ref: '#/components/callbacks/Shared' },
        onData: {
          '{callback}': {
            post: {
              responses: { 200: { description: 'OK' } },
            },
          },
        },
      },
    }
    const result = callbacksCode(components, true)
    expect(result.includes('OnDataCallback')).toBe(true)
    expect(result.includes('refCallback')).toBe(false)
  })
})
