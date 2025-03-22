/**
 * @function generateInsertRequestBody
 * @description Generates a request validation string by inserting request body validation code into existing request parameters
 * @param requestParams - Existing request parameters string
 * @param requestBodyCode - Request body validation code to insert
 * @returns Combined request validation string
 */
export function generateInsertRequestBody(requestParams: string, requestBodyCode: string): string {
  return requestParams.replace('request:{', `request:{${requestBodyCode}`)
}
