import type { OpenAPI, Parameter } from '../../../../openapi/index.js'
import { createRoute } from './create-route.js'

/**
 * Generates TypeScript code for all valid Hono routes from OpenAPI paths.
 *
 * @param openapi - OpenAPI specification object
 * @returns Generated route code as string
 */
export function routeCode(openapi: OpenAPI): string {
  const resolve = (p: Parameter | { readonly $ref?: string }): Parameter | undefined => {
    if ('name' in p && 'in' in p) return p
    const ref = '$ref' in p ? p.$ref : undefined
    if (!ref?.startsWith('#/components/parameters/')) return undefined
    return openapi.components?.parameters?.[ref.slice(ref.lastIndexOf('/') + 1)]
  }

  return Object.entries(openapi.paths)
    .flatMap(([path, pathItem]) =>
      pathItem
        ? (['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'] as const)
            .filter((m) => pathItem[m]?.responses)
            .map((method) => {
              const operation = pathItem[method]!
              const params = [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])]
                .map(resolve)
                .filter((p) => p !== undefined)
              return createRoute(
                path,
                method,
                params.length > 0 ? { ...operation, parameters: params } : operation,
              )
            })
        : [],
    )
    .filter(Boolean)
    .join('\n\n')
}
