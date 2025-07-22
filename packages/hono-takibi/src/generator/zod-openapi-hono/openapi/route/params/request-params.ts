/**
 * Wraps the request body code in a `request:{...}` block.
 *
 * @param requestBodyCode - Zod schema string for the request body.
 * @returns A string representing the wrapped request object.
 */
export function requestParams(requestBodyCode: string): string {
  return `request:{${requestBodyCode}},`
}
