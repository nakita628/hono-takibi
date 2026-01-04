import type { Parameter, Reference, RequestBody } from '../../../../../openapi/index.js'
import { makeRequest } from '../../../../../helper/openapi.js'

/**
 * Generates a `request:{ ... }` string for Hono route validation from OpenAPI parameters and request body.
 *
 * @param parameters - OpenAPI `parameters` array (query, path, header).
 * @param body - OpenAPI `requestBody` object (can be Reference or inline RequestBody).
 * @returns A formatted `request:{ ... }` string or empty string if neither is defined.
 */
export function request(
  parameters: readonly Parameter[] | undefined,
  body: RequestBody | Reference | undefined,
): string {
  return makeRequest(parameters, body)
}
