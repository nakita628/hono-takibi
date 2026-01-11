import type { OpenAPI, Operation, Parameter, Ref } from '../../../../openapi/index.js'
import { createRoute } from './create-route.js'

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'] as const

const isParameter = (p: unknown): p is Parameter => {
  if (typeof p !== 'object' || p === null) return false
  if (!('name' in p) || !('in' in p) || !('schema' in p)) return false
  const { in: inValue } = p
  return inValue === 'path' || inValue === 'query' || inValue === 'header' || inValue === 'cookie'
}

const isParameterRef = (ref: string): ref is `#/components/parameters/${string}` =>
  ref.startsWith('#/components/parameters/')

const resolveParameter = (
  p: Parameter | { readonly $ref?: string },
  components: OpenAPI['components'],
): Parameter | undefined => {
  if (isParameter(p)) return p
  if ('$ref' in p && p.$ref && isParameterRef(p.$ref) && components?.parameters) {
    const key = p.$ref.slice(p.$ref.lastIndexOf('/') + 1)
    const resolved = components.parameters[key]
    return resolved ? { ...resolved, $ref: p.$ref } : undefined
  }
  return undefined
}

/**
 * Generates TypeScript code for all valid Hono routes from OpenAPI paths.
 */
export function routeCode(openapi: OpenAPI): string {
  const routes = Object.entries(openapi.paths).flatMap(([path, pathItem]) => {
    if (!pathItem) return []

    return HTTP_METHODS.flatMap((method) => {
      const operation = pathItem[method]
      if (!operation?.responses) return []

      const allParams = [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])]
      const params = allParams
        .map((p) => resolveParameter(p, openapi.components))
        .filter((p): p is Parameter => p !== undefined)

      const op: Operation = params.length > 0 ? { ...operation, parameters: params } : operation
      return createRoute(path, method, op)
    })
  })

  return routes.filter(Boolean).join('\n\n')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/routes/index.ts
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest

  describe('routeCode', () => {
    it.concurrent('routeCode Test', () => {
      const result = routeCode({
        openapi: '3.0.0',
        info: { title: 'Test', version: '1.0.0' },
        tags: [{ name: 'Hono' }],
        paths: {
          '/hono': {
            get: {
              tags: ['Hono'],
              summary: 'Hono',
              description: 'Hono',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          message: {
                            type: 'string',
                            example: 'Hono',
                          },
                        },
                        required: ['message'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
      const expected = `export const getHonoRoute=createRoute({method:'get',path:'/hono',tags:["Hono"],summary:"Hono",description:"Hono",responses:{200:{description:"OK",content:{'application/json':{schema:z.object({message:z.string().openapi({"example":"Hono"})}).openapi({"required":["message"]})}}}}})`
      expect(result).toBe(expected)
    })
  })
}
