import { makeCallbacks, makeOperationResponses, makeRequest } from '../../../../helper/openapi.js'
import type { OpenAPI, Operation, Parameter } from '../../../../openapi/index.js'
import { toIdentifierPascalCase } from '../../../../utils/index.js'

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
  const makeWebHook = (name: string, method: string, operation: Operation, readonly?: boolean) => {
    const webhookName = (name: string, method: string) => {
      const pascalName = toIdentifierPascalCase(name)
      const camelName = pascalName.charAt(0).toLowerCase() + pascalName.slice(1)
      return `${camelName}${method.charAt(0).toUpperCase()}${method.slice(1)}Webhook`
    }
    const properties = [
      `method:'${method}'`,
      `path:'/${name}'`,
      operation.tags ? `tags:${JSON.stringify(operation.tags)}` : undefined,
      operation.summary ? `summary:${JSON.stringify(operation.summary)}` : undefined,
      operation.description ? `description:${JSON.stringify(operation.description)}` : undefined,
      operation.externalDocs ? `externalDocs:${JSON.stringify(operation.externalDocs)}` : undefined,
      operation.operationId ? `operationId:'${operation.operationId}'` : undefined,
      makeRequest(operation.parameters, operation.requestBody, readonly)
        ? `request:${makeRequest(operation.parameters, operation.requestBody, readonly)}`
        : undefined,
      operation.responses
        ? `responses:${makeOperationResponses(operation.responses, readonly)}`
        : undefined,
      operation.callbacks ? makeCallbacks(operation.callbacks, readonly) : undefined,
      operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)}` : undefined,
      operation.security ? `security:${JSON.stringify(operation.security)}` : undefined,
      operation.servers ? `servers:${JSON.stringify(operation.servers)}` : undefined,
    ]
      .filter((v) => v !== undefined)
      .join(',')
    const asConst = readonly ? ' as const' : ''
    return `export const ${webhookName(name, method)}={${properties}}${asConst}`
  }
  if (!openapi.webhooks) return ''
  const isParameterRef = (ref: string): ref is `#/components/parameters/${string}` =>
    ref.startsWith('#/components/parameters/')
  const resolve = (parameter: Parameter | { readonly $ref?: string }): Parameter | undefined => {
    if ('name' in parameter && 'in' in parameter) return parameter
    const ref = '$ref' in parameter ? parameter.$ref : undefined
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
              const operation = pathItem[method]
              if (!operation) return undefined
              const params = [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])]
                .map(resolve)
                .filter((p) => p !== undefined)
              return makeWebHook(
                name,
                method,
                params.length > 0 ? { ...operation, parameters: params } : operation,
                readonly,
              )
            })
            .filter((v) => v !== undefined)
        : [],
    )
    .filter(Boolean)
    .join('\n\n')
}
