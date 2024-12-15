/**
 * Generates a request object with parameters and optional request body
 *
 * @function generateRequestParams
 * @param required - Whether the request body is required
 * @param zodSchema - Zod schema string for request body validation
 * @returns Generated request body configuration string
 *
 * @example
 * // Required request body with user schema
 * generateRequestBody(true, 'z.object({ name: z.string() })')
 * // Returns:
 * // body:{
 * //   required:true,
 * //   content:{
 * //     'application/json':{
 * //       schema:z.object({ name: z.string() }),
 * //     },
 * //   },
 * // },
 *
 * // Optional request body with post schema
 * generateRequestBody(false, 'z.object({ title: z.string() })')
 * // Returns:
 * // body:{
 * //   required:false,
 * //   content:{
 * //     'application/json':{
 * //       schema:z.object({ title: z.string() }),
 * //     },
 * //   },
 * // },
 */
export function generateRequestParams(requestBodyCode: string): string {
  return `request:{${requestBodyCode}},`
}
