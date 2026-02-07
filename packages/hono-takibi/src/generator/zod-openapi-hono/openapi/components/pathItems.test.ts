import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { pathItemsCode } from './pathItems.js'

describe('pathItemsCode', () => {
  it('returns empty string when no pathItems', () => {
    const components: Components = {}
    const result = pathItemsCode(components, true)
    expect(result).toBe('')
  })

  it('generates pathItem with export', () => {
    const components: Components = {
      pathItems: {
        UserOperations: {
          get: {
            operationId: 'getUser',
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    }
    const result = pathItemsCode(components, true)
    expect(result).toBe(
      'export const UserOperationsPathItem={get:{operationId:"getUser",responses:{200:{description:"OK"}}}}',
    )
  })

  it('generates pathItem without export', () => {
    const components: Components = {
      pathItems: {
        UserOperations: {
          get: {
            operationId: 'getUser',
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    }
    const result = pathItemsCode(components, false)
    expect(result).toBe(
      'const UserOperationsPathItem={get:{operationId:"getUser",responses:{200:{description:"OK"}}}}',
    )
  })

  it('generates pathItem with as const when readonly', () => {
    const components: Components = {
      pathItems: {
        UserOperations: {
          get: {
            operationId: 'getUser',
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    }
    const result = pathItemsCode(components, true, true)
    expect(result).toBe(
      'export const UserOperationsPathItem={get:{operationId:"getUser",responses:{200:{description:"OK"}}}} as const',
    )
  })

  it('resolves $ref to schema variable names', () => {
    const components: Components = {
      schemas: {
        User: {
          type: 'object',
          properties: { id: { type: 'string' } },
        },
      },
      pathItems: {
        UserOperations: {
          get: {
            operationId: 'getUser',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
        },
      },
    }
    const result = pathItemsCode(components, true)
    // $ref should be replaced with schema variable name
    expect(result).toContain('UserSchema')
    expect(result).not.toContain('$ref')
  })

  it('resolves multiple $refs in nested structure', () => {
    const components: Components = {
      schemas: {
        User: { type: 'object' },
        UserUpdate: { type: 'object' },
      },
      pathItems: {
        UserCrud: {
          get: {
            operationId: 'getUser',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          put: {
            operationId: 'updateUser',
            requestBody: {
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UserUpdate' },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
        },
      },
    }
    const result = pathItemsCode(components, true)
    // All $refs should be replaced
    expect(result).toContain('UserSchema')
    expect(result).toContain('UserUpdateSchema')
    expect(result).not.toContain('$ref')
  })
})
