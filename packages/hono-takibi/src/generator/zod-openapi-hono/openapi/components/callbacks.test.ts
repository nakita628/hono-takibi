import { describe, expect, it } from 'vitest'
import { callbacks } from './callbacks.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/callbacks.test.ts

describe('callbacks', () => {
  it('callbacks exportCallbacks false', () => {
    const result = callbacks(
      {
        requestBodies: {
          B: {},
          C: {},
          A: {},
        },
        responses: {
          B: {},
          C: {},
          A: {},
        },
        callbacks: {
          B: {
            '{$request.body#/B}': {
              post: {
                requestBody: {
                  $ref: '#/components/requestBodies/B',
                },
                responses: {
                  '200': {
                    $ref: '#/components/responses/B',
                  },
                },
              },
            },
          },
          C: {
            '{$request.body#/B}': {
              post: {
                requestBody: {
                  $ref: '#/components/requestBodies/C',
                },
                responses: {
                  '200': {
                    $ref: '#/components/responses/C',
                  },
                },
              },
            },
          },
          A: {
            '{$request.body#/B}': {
              post: {
                requestBody: {
                  $ref: '#/components/requestBodies/A',
                },
                responses: {
                  '200': {
                    $ref: '#/components/responses/A',
                  },
                },
              },
            },
          },
        },
      },
      false,
    )

    const expected = `const BCallbacks = {"{$request.body#/B}":{post:{requestBody:BRequestBody,responses:{"200":BResponse}}}}

const CCallbacks = {"{$request.body#/B}":{post:{requestBody:CRequestBody,responses:{"200":CResponse}}}}

const ACallbacks = {"{$request.body#/B}":{post:{requestBody:ARequestBody,responses:{"200":AResponse}}}}`

    expect(result).toBe(expected)
  })

  it('callbacks exportCallbacks true', () => {
    const result = callbacks(
      {
        requestBodies: {
          B: {},
          C: {},
          A: {},
        },
        responses: {
          B: {},
          C: {},
          A: {},
        },
        callbacks: {
          B: {
            '{$request.body#/B}': {
              post: {
                requestBody: {
                  $ref: '#/components/requestBodies/B',
                },
                responses: {
                  '200': {
                    $ref: '#/components/responses/B',
                  },
                },
              },
            },
          },
          C: {
            '{$request.body#/B}': {
              post: {
                requestBody: {
                  $ref: '#/components/requestBodies/C',
                },
                responses: {
                  '200': {
                    $ref: '#/components/responses/C',
                  },
                },
              },
            },
          },
          A: {
            '{$request.body#/B}': {
              post: {
                requestBody: {
                  $ref: '#/components/requestBodies/A',
                },
                responses: {
                  '200': {
                    $ref: '#/components/responses/A',
                  },
                },
              },
            },
          },
        },
      },
      true,
    )

    const expected = `export const BCallbacks = {"{$request.body#/B}":{post:{requestBody:BRequestBody,responses:{"200":BResponse}}}}

export const CCallbacks = {"{$request.body#/B}":{post:{requestBody:CRequestBody,responses:{"200":CResponse}}}}

export const ACallbacks = {"{$request.body#/B}":{post:{requestBody:ARequestBody,responses:{"200":AResponse}}}}`

    expect(result).toBe(expected)
  })
})
