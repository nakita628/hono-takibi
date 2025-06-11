/**
 * Generates a request object with parameters and optional request body
 * @param { string } requestBodyCode - Zod schema string for request body validation
 * @returns { string } string
 */
export function requestParams(requestBodyCode: string): string {
  return `request:{${requestBodyCode}},`
}
