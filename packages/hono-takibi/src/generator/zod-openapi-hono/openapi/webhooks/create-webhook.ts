import {
  makeCallbacks,
  makeOperationResponses,
  makeRequest,
} from '../../../../helper/index.js'
import type { Operation } from '../../../../openapi/index.js'
import { toIdentifierPascalCase } from '../../../../utils/index.js'

/**
 * Generates a webhook variable name from webhook name and HTTP method.
 *
 * @param name - The webhook name (e.g., 'orderStatus', 'payment-completed').
 * @param method - The HTTP method (e.g., 'post').
 * @returns A variable name string (e.g., 'orderStatusPostWebhook').
 *
 * @example
 * webhookName('orderStatus', 'post') // 'orderStatusPostWebhook'
 * webhookName('payment-completed', 'post') // 'paymentCompletedPostWebhook'
 */
export function webhookName(name: string, method: string): string {
  const pascalName = toIdentifierPascalCase(name)
  // First character lowercase for camelCase
  const camelName = pascalName.charAt(0).toLowerCase() + pascalName.slice(1)
  return `${camelName}${method.charAt(0).toUpperCase()}${method.slice(1)}Webhook`
}

/**
 * Generates TypeScript code for a webhook definition from OpenAPI operation details.
 *
 * @param name - The webhook name (e.g., 'orderStatus').
 * @param method - The HTTP method (e.g., 'post').
 * @param operation - The OpenAPI Operation object.
 * @param readonly - Whether to add `as const` to the webhook definition.
 * @returns A TypeScript code string defining the webhook.
 *
 * @remarks
 * - Webhooks in OpenAPI 3.1 use the same structure as routes.
 * - The generated code uses the same format as createRoute but with webhook naming.
 *
 * @example
 * ```ts
 * createWebhook('orderStatus', 'post', operation, false)
 * // → 'export const orderStatusPostWebhook={...}'
 *
 * createWebhook('orderStatus', 'post', operation, true)
 * // → 'export const orderStatusPostWebhook={...} as const'
 * ```
 */
export function createWebhook(
  name: string,
  method: string,
  operation: Operation,
  readonly?: boolean,
): string {
  const properties = [
    `method:'${method}'`,
    `path:'/${name}'`,
    operation.tags ? `tags:${JSON.stringify(operation.tags)}` : undefined,
    operation.summary ? `summary:${JSON.stringify(operation.summary)}` : undefined,
    operation.description ? `description:${JSON.stringify(operation.description)}` : undefined,
    operation.externalDocs ? `externalDocs:${JSON.stringify(operation.externalDocs)}` : undefined,
    operation.operationId ? `operationId:'${operation.operationId}'` : undefined,
    makeRequest(operation.parameters, operation.requestBody)
      ? `request:${makeRequest(operation.parameters, operation.requestBody)}`
      : undefined,
    operation.responses ? `responses:${makeOperationResponses(operation.responses)}` : undefined,
    operation.callbacks ? makeCallbacks(operation.callbacks) : undefined,
    operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)}` : undefined,
    operation.security ? `security:${JSON.stringify(operation.security)}` : undefined,
    operation.servers ? `servers:${JSON.stringify(operation.servers)}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')

  const asConst = readonly ? ' as const' : ''
  return `export const ${webhookName(name, method)}={${properties}}${asConst}`
}
