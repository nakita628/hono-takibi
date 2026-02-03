import type { OpenAPI, Parameter } from '../../../../openapi/index.js'
import { createWebhook } from './create-webhook.js'

/**
 * Generates TypeScript code for all webhooks from OpenAPI specification.
 *
 * @param openapi - OpenAPI specification object
 * @param readonly - Whether to add `as const` to webhook definitions
 * @returns Generated webhook code as string
 *
 * @example
 * ```ts
 * webhookCode(openapi, false)
 * // → 'export const orderStatusPostWebhook={...}'
 *
 * webhookCode(openapi, true)
 * // → 'export const orderStatusPostWebhook={...} as const'
 * ```
 */
export function webhookCode(openapi: OpenAPI, readonly?: boolean): string {
  if (!openapi.webhooks) return ''

  const isParameterRef = (r: string): r is `#/components/parameters/${string}` =>
    r.startsWith('#/components/parameters/')
  const resolve = (p: Parameter | { readonly $ref?: string }): Parameter | undefined => {
    if ('name' in p && 'in' in p) return p
    const ref = '$ref' in p ? p.$ref : undefined
    if (!(ref && isParameterRef(ref))) return undefined
    const resolved = openapi.components?.parameters?.[ref.slice(ref.lastIndexOf('/') + 1)]
    if (!resolved) return undefined
    // Preserve original $ref in resolved parameter for schema reference generation
    return { ...resolved, $ref: ref }
  }

  return Object.entries(openapi.webhooks)
    .flatMap(([name, pathItem]) =>
      pathItem
        ? (['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'] as const)
            .filter((m) => pathItem[m]?.responses)
            .map((method) => {
              const operation = pathItem[method]!
              const params = [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])]
                .map(resolve)
                .filter((p) => p !== undefined)
              return createWebhook(
                name,
                method,
                params.length > 0 ? { ...operation, parameters: params } : operation,
                readonly,
              )
            })
        : [],
    )
    .filter(Boolean)
    .join('\n\n')
}
