import { describe, expect, it } from 'vite-plus/test'

import type { Components } from '../../../../openapi/index.js'
import { parametersCode } from './parameters.js'

// `parametersCode` delegates each parameter's schema to `makeParameterSchema` (covered in
// helper/openapi.test.ts); what is proven here is the component wrapper around it.
describe('parametersCode', () => {
  it('should return empty string when no parameters', () => {
    const components: Components = {}
    expect(parametersCode(components, true, false)).toBe('')
  })

  it('should generate path parameter with export', () => {
    const components: Components = {
      parameters: {
        userId: {
          name: 'userId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const UserIdParamsSchema=z.string().openapi({param:{"name":"userId","in":"path","required":true,"schema":{"type":"string"}}})`,
    )
  })

  it('should generate parameter without export', () => {
    const components: Components = {
      parameters: {
        page: {
          name: 'page',
          in: 'query',
          schema: { type: 'integer' },
        },
      },
    }
    const result = parametersCode(components, false, false)
    expect(result).toBe(
      `const PageParamsSchema=z.coerce.number().int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"},"required":false}})`,
    )
  })

  it('should generate parameter with export and type', () => {
    const components: Components = {
      parameters: {
        limit: {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer' },
        },
      },
    }
    const result = parametersCode(components, true, true)
    expect(result).toBe(
      `export const LimitParamsSchema=z.coerce.number().int().exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":"integer"},"required":false}})

export type LimitParams=z.infer<typeof LimitParamsSchema>`,
    )
  })

  it('should extract schema from content when schema is not provided', () => {
    const components = {
      parameters: {
        filter: {
          name: 'filter',
          in: 'query',
          content: {
            'application/json': {
              schema: { type: 'string' },
            },
          },
        },
      },
    } as unknown as Components
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const FilterParamsSchema=z.string().exactOptional().openapi({param:{"name":"filter","in":"query","content":{"application/json":{"schema":{"type":"string"}}},"required":false}})`,
    )
  })

  it('coerces a string-wire parameter through the shared parameter schema', () => {
    const components: Components = {
      parameters: {
        id: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const IdParamsSchema=z.coerce.number().int().openapi({param:{"name":"id","in":"path","required":true,"schema":{"type":"integer"}}})`,
    )
  })

  it('should add readonly modifier when readonly option is true', () => {
    const components: Components = {
      parameters: {
        userId: {
          name: 'userId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      },
    }
    const result = parametersCode(components, true, false, true)
    expect(result).toBe(
      `export const UserIdParamsSchema=z.string().openapi({param:{"name":"userId","in":"path","required":true,"schema":{"type":"string"}}}).readonly()`,
    )
  })
})
