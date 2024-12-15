import { Schema } from '../../types'
import { getRefName } from '../../core/schema/references/get-ref-name'
import { generateZodArray } from './generate-zod-array'
import { generateZodSchema } from './generate-zod-schema'

/**
 * Generates a Zod schema string for a given OpenAPI schema definition
 *
 * @function generatePropertySchema
 * @param schema - OpenAPI schema definition
 * @returns Generated Zod schema string
 *
 * @example
 * // Reference type
 * generatePropertySchema({ $ref: '#/components/schemas/User' })
 * // Returns: 'User'
 *
 * // Array with reference type
 * generatePropertySchema({
 *   type: 'array',
 *   items: { $ref: '#/components/schemas/Post' }
 * })
 * // Returns: 'z.array(Post)'
 *
 * // Basic type
 * generatePropertySchema({ type: 'string' })
 * // Returns: 'z.string()'
 */
export function generatePropertySchema(schema: Schema): string {
  if (schema.$ref) {
    return getRefName(schema.$ref) || 'z.any()'
  }
  if (schema.type === 'array' && schema.items?.$ref) {
    const refName = getRefName(schema.items.$ref)
    if (refName) {
      return generateZodArray(refName)
    }
  }
  return generateZodSchema(schema)
}
