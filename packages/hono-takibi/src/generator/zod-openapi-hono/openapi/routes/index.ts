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
