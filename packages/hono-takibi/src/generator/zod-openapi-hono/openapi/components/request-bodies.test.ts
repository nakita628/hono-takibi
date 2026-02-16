import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { requestBodiesCode } from './request-bodies.js'

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

  it('should generate request body with as const for inline', () => {
    const components: Components = {
      requestBodies: {
        UserBody: {
          required: true,
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
    const result = requestBodiesCode(components, true, true)
    expect(result).toBe(
      `export const UserBodyRequestBody={content:{'application/json':{schema:z.string()}},required:true} as const`,
    )
  })

  it('should not add as const for $ref request body', () => {
    const components: Components = {
      requestBodies: {
        Alias: {
          $ref: '#/components/requestBodies/UserBody',
        },
      },
    }
    const result = requestBodiesCode(components, true, true)
    expect(result).toBe(`export const AliasRequestBody=UserBodyRequestBody`)
  })

  it('should handle mixed $ref and inline with readonly', () => {
    const components: Components = {
      requestBodies: {
        Alias: {
          $ref: '#/components/requestBodies/BaseUser',
        },
        Inline: {
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
    const result = requestBodiesCode(components, true, true)
    expect(result).toBe(
      `export const AliasRequestBody=BaseUserRequestBody\n\nexport const InlineRequestBody={content:{'application/json':{schema:z.string()}}} as const`,
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
