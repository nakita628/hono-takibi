import type { OpenAPI, Parameter, PathItem } from '../../../../openapi/index.js'
import { createRoute } from './create-route.js'

/**
 * Generates TypeScript code for all valid Hono routes from OpenAPI paths.
 *
 * @param openapi - OpenAPI specification object
 * @param readonly - Whether to add `as const` to route definitions
 * @returns Generated route code as string
 *
 * @example
 * ```ts
 * routeCode(openapi, false)
 * // → 'export const getUsersRoute = createRoute({...})'
 *
 * routeCode(openapi, true)
 * // → 'export const getUsersRoute = createRoute({...} as const)'
 * ```
 */
export function routeCode(openapi: OpenAPI, readonly?: boolean): string {
  const isParameterRef = (r: string): r is `#/components/parameters/${string}` =>
    r.startsWith('#/components/parameters/')
  const isPathItemRef = (r: string): r is `#/components/pathItems/${string}` =>
    r.startsWith('#/components/pathItems/')

  const resolveParameter = (p: Parameter | { readonly $ref?: string }): Parameter | undefined => {
    if ('name' in p && 'in' in p) return p
    const ref = '$ref' in p ? p.$ref : undefined
    if (!ref || !isParameterRef(ref)) return undefined
    const resolved = openapi.components?.parameters?.[ref.slice(ref.lastIndexOf('/') + 1)]
    if (!resolved) return undefined
    // Preserve original $ref in resolved parameter for schema reference generation
    return { ...resolved, $ref: ref }
  }

  const resolvePathItem = (pathItem: PathItem): PathItem => {
    // If pathItem has $ref to components/pathItems, resolve it
    if (pathItem.$ref && isPathItemRef(pathItem.$ref)) {
      const name = pathItem.$ref.slice(pathItem.$ref.lastIndexOf('/') + 1)
      const resolved = openapi.components?.pathItems?.[name]
      if (resolved) {
        // Merge resolved pathItem with any sibling properties (OpenAPI 3.1 allows this)
        const { $ref: _, ...siblings } = pathItem
        return { ...resolved, ...siblings }
      }
    }
    return pathItem
  }

  return Object.entries(openapi.paths)
    .flatMap(([path, pathItem]) => {
      if (!pathItem) return []
      const resolved = resolvePathItem(pathItem)
      return (['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'] as const)
        .filter((m) => resolved[m]?.responses)
        .map((method) => {
          const operation = resolved[method]!
          const params = [...(resolved.parameters ?? []), ...(operation.parameters ?? [])]
            .map(resolveParameter)
            .filter((p) => p !== undefined)
          return createRoute(
            path,
            method,
            params.length > 0 ? { ...operation, parameters: params } : operation,
            readonly,
          )
        })
    })
    .filter(Boolean)
    .join('\n\n')
}
