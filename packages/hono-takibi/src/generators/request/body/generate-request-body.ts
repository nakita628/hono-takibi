import type { Content } from '../../../types'

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
export function generateRequestBody(
  required: boolean,
  content: Content,
  zodSchema: string,
): string {
  const contentTypes = Object.keys(content)
  if (contentTypes.length === 0) return ''

  const contentParts = contentTypes.map((contentType) => `'${contentType}':{schema:${zodSchema}}`)

  return `body:{required:${required},content:{${contentParts.join(',')}},},`

  // if (content['application/json']) {
  //   return `body:{required:${required},content:{'application/json':{schema:${zodSchema},},},},`
  // }

  // if (content['application/xml']) {
  //   return `body:{required:${required},content:{'application/xml':{schema:${zodSchema},},},},`
  // }

  // if (content['application/x-www-form-urlencoded']) {
  //   return `body:{required:${required},content:{'application/x-www-form-urlencoded':{schema:${zodSchema},},},},`
  // }

  // if (content['application/octet-stream']) {
  //   return `body:{required:${required},content:{'application/octet-stream':{schema:${zodSchema},},},},`
  // }

  // return ''
}
