/**
 * Generates a request validation string by inserting request body validation code into existing request parameters
 * @param { string } requestParams - Existing request parameters string
 * @param { string } requestBodyCode - Request body validation code to insert
 * @returns { string } Combined request validation string
 */
export function generateInsertRequestBody(requestParams: string, requestBodyCode: string): string {
  return requestParams.replace('request:{', `request:{${requestBodyCode}`)
}
