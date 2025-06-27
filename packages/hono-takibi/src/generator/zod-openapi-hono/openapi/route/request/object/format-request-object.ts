/**
 * Generates a formatted request object string for request validation
 * @param { string[] } requestParamsArray - Array of Zod schema strings for request validation
 * @returns { string } Formatted request validator object string
 * @example
 * // Single parameter
 * formatRequestObject(['query:z.object({page:z.string()})'])
 * // Returns: 'request:{query:z.object({page:z.string()})}'
 *
 * @example
 * // Multiple parameters
 * formatRequestObject([
 *   'query:z.object({page:z.string(),rows:z.string()})',
 *   'params:z.object({id:z.string()})'
 * ])
 * // Returns: 'request:{
 * //   query:z.object({page:z.string(),rows:z.string()}),
 * //   params:z.object({id:z.string()})
 * // }'
 * @example
 * // Empty array
 * formatRequestObject([])
 * // Returns: 'request:{}'
 */
export function formatRequestObject(requestParamsArray: string[]): string {
  return `request:{${requestParamsArray.join(',')}},`
}
