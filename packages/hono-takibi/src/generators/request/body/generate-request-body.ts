/**
 * Generates a request body configuration for OpenAPI schema
 *
 * @function generateRequestBody
 * @param required - Whether the request body is required
 * @param zodSchema - Zod schema string for request body validation
 * @returns Generated request body configuration string
 *
 * @example
 * // Required request body
 * generateRequestBody(true, 'z.object({ name: z.string() })')
 * // Returns: 'body:{required:true,content:{'application/json':{schema:z.object({ name: z.string() }),},},},'
 *
 * // Optional request body
 * generateRequestBody(false, 'z.object({ age: z.number() })')
 * // Returns: 'body:{required:false,content:{'application/json':{schema:z.object({ age: z.number() }),},},},'
 */
export function generateRequestBody(required: boolean, zodSchema: string): string {
  return `body:{required:${required},content:{'application/json':{schema:${zodSchema},},},},`
}
