import type { OpenAPI, Operation, Parameter } from '../../../../openapi/index.js'
import { createRoute } from './create-route.js'

/**
 * Generates TypeScript code for all valid Hono routes from OpenAPI paths.
 */
export function routeCode(openapi: OpenAPI): string {
  const isParameter = (p: unknown): p is Parameter => {
    if (typeof p !== 'object' || p === null) return false
    if (!('name' in p) || !('in' in p) || !('schema' in p)) return false
    const { in: inValue } = p
    return inValue === 'path' || inValue === 'query' || inValue === 'header' || inValue === 'cookie'
  }
  const routes: string[] = []
  for (const path in openapi.paths) {
    const pathItem = openapi.paths[path]
    if (!pathItem) continue

    for (const method of ['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'] as const) {
      const operation = pathItem[method]
      if (!operation?.responses) continue

      // Merge path-level and operation-level parameters, resolving $ref
      const params: Parameter[] = []
      for (const p of [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])]) {
        // Parameter object (has name and in)
        if (isParameter(p)) {
          params.push(p)
          continue
        }
        // Reference object ($ref to components/parameters)
        if ('$ref' in p && p.$ref?.startsWith('#/components/parameters/') && openapi.components?.parameters) {
          const key = p.$ref.slice(p.$ref.lastIndexOf('/') + 1)
          const resolved = openapi.components.parameters[key]
          if (resolved) params.push({ ...resolved, $ref: p.$ref })
        }
      }

      const op: Operation = params.length > 0 ? { ...operation, parameters: params } : operation
      routes.push(createRoute(path, method, op))
    }
  }
  return routes.filter(Boolean).join('\n\n')
}
