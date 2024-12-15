/**
 * Generates a request validation string by inserting request body validation code into existing request parameters
 * 
 * @function generateInsertRequestBody
 * @param requestParams - Existing request parameters string
 * @param requestBodyCode - Request body validation code to insert
 * @returns Combined request validation string
 *
 * @example
 * // Adding body validation to query parameters
 * const params = 'request:{query:z.object({id:z.string()})}'
 * const body = 'body:{content:{"application/json":{schema:z.object({name:z.string()})}}}'
 *
 * generateInsertRequestBody(params, body)
 * // Returns:
 * // 'request:{
 * //   body:{
 * //     content:{
 * //       "application/json":{
 * //         schema:z.object({name:z.string()})
 * //       }
 * //     }
 * //   },
 * //   query:z.object({id:z.string()})
 * // }'
 *
 * @example
 * // Adding body to empty request
 * generateInsertRequestBody('request:{}', 'body:{...}')
 * // Returns: 'request:{body:{...}}'
 */
export function generateInsertRequestBody(requestParams: string, requestBodyCode: string): string {
  return requestParams.replace('request:{', `request:{${requestBodyCode}`)
}
