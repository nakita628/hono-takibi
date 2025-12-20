import { describe, expect, it } from 'vitest'
import { callbacks } from './callbacks.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/callbacks.test.ts

describe('callbacks', () => {
  it('callbacks exportCallbacks false', () => {
    const result = callbacks(
      {
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

    const expected = `const BCallback = {"{$request.body#/B}":{"post":{"requestBody":{"$ref":"#/components/requestBodies/B"},"responses":{"200":{"$ref":"#/components/responses/B"}}}}}

const CCallback = {"{$request.body#/B}":{"post":{"requestBody":{"$ref":"#/components/requestBodies/C"},"responses":{"200":{"$ref":"#/components/responses/C"}}}}}

const ACallback = {"{$request.body#/B}":{"post":{"requestBody":{"$ref":"#/components/requestBodies/A"},"responses":{"200":{"$ref":"#/components/responses/A"}}}}}`

    expect(result).toBe(expected)
  })

  it('callbacks exportCallbacks true', () => {
    const result = callbacks(
      {
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

    const expected = `export const BCallback = {"{$request.body#/B}":{"post":{"requestBody":{"$ref":"#/components/requestBodies/B"},"responses":{"200":{"$ref":"#/components/responses/B"}}}}}

export const CCallback = {"{$request.body#/B}":{"post":{"requestBody":{"$ref":"#/components/requestBodies/C"},"responses":{"200":{"$ref":"#/components/responses/C"}}}}}

export const ACallback = {"{$request.body#/B}":{"post":{"requestBody":{"$ref":"#/components/requestBodies/A"},"responses":{"200":{"$ref":"#/components/responses/A"}}}}}`

    expect(result).toBe(expected)
  })
})
