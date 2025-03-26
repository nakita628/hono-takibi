/**
 * Generates a formatted request object string for request validation
 * @param { string[] } requestParamsArray - Array of Zod schema strings for request validation
 * @returns { string } Formatted request validator object string
 * @example
 * // Single parameter
 * generateFormatRequestObject(['query:z.object({page:z.string()})'])
 * // Returns: 'request:{query:z.object({page:z.string()})}'
 *
 * @example
 * // Multiple parameters
 * generateFormatRequestObject([
 *   'query:z.object({page:z.string(),rows:z.string()})',
 *   'params:z.object({id:z.string()})'
 * ])
 * // Returns: 'request:{
 * //   query:z.object({page:z.string(),rows:z.string()}),
 * //   params:z.object({id:z.string()})
 * // }'
 * @example
 * // Empty array
 * generateFormatRequestObject([])
 * // Returns: 'request:{}'
 */
export function generateFormatRequestObject(requestParamsArray: string[]): string {
  return `request:{${requestParamsArray.join(',')}},`
}
