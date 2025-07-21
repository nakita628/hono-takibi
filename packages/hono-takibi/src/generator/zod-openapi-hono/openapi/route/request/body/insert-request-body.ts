/**
 * Inserts request body validation code into an existing request parameter string.
 *
 * @param requestParams - The existing request parameter string (e.g., 'request:{...}').
 * @param requestBodyCode - The request body code to insert.
 * @returns The combined request validation string with the body inserted.
 */

export function insertRequestBody(requestParams: string, requestBodyCode: string): string {
  return requestParams.replace('request:{', `request:{${requestBodyCode}`)
}
