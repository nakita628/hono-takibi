import { describe, expect, it } from 'vitest'
import { callbacks } from './callbacks.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/callbacks.test.ts

describe('callbacks', () => {
  it('should return the correct callbacks', () => {
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
})
