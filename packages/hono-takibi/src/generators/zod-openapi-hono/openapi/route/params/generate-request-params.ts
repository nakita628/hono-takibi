/**
 * Generates a request object with parameters and optional request body
 *
 * @function generateRequestParams
 * @param required - Whether the request body is required
 * @param zodSchema - Zod schema string for request body validation
 * @returns string
 */
export function generateRequestParams(requestBodyCode: string): string {
  return `request:{${requestBodyCode}},`
}
