import type { Schema } from '../../../openapi/index.js'
import { isAllOptional } from '../../../core/validator/is-all-optional.js'
import { partial } from '../index.js'
import { generatePropertySchema } from './generate-zod-property-schema.js'
import { getToSafeIdentifier } from '../../../core/helper/index.js'

/**
 * Generates a Zod object schema with properties and their requirements
 * @param { Record<string, Schema> } properties - Record of property names to their schema definitions
 * @param { string[] } required - Array of property names that are required
 * @returns { string } Generated Zod object schema string
 * @example
 * // Order schema with optional fields
 * generateZodPropertiesSchema(
 *   {
 *     id: { type: 'integer', format: 'int64' },
 *     status: { type: 'string', enum: ['placed', 'approved', 'delivered'] }
 *   },
 *   []
 * )
 * // Returns: 'z.object({id: z.number().int().optional(),status: z.enum(["placed","approved","delivered"]).optional()})'
 * @example
 * // Pet schema with required fields
 * generateZodPropertiesSchema(
 *   {
 *     name: { type: 'string' },
 *     photoUrls: { type: 'array', items: { type: 'string' } }
 *   },
 *   ['name', 'photoUrls']
 * )
 * // Returns: 'z.object({name: z.string(),photoUrls: z.array(z.string())})'
 * @example
 * // Address schema with references
 * generateZodPropertiesSchema(
 *   {
 *     category: { '$ref': '#/components/schemas/Category' },
 *     tags: { type: 'array', items: { '$ref': '#/components/schemas/Tag' } }
 *   },
 *   []
 * )
 * // Returns: 'z.object({category: categorySchema.optional(),tags: z.array(tagSchema).optional()})'
 * @remarks
 * - Generates Zod schema strings for object properties
 * - Handles required and optional properties
 * - Supports primitive types, arrays, and references
 * - Uses .partial() when no properties are required
 * - Maintains property order from input
 */
export function generateZodPropertiesSchema(
  properties: Record<string, Schema>,
  required: string[],
): string {
  const objectProperties = Object.entries(properties).map(([key, schema]) => {
    const isRequired = required.includes(key)
    const propertySchema = generatePropertySchema(schema)
    const safeKey = getToSafeIdentifier(key)
    return `${safeKey}:${propertySchema}${isRequired ? '' : '.optional()'}`
  })

  // Check if all properties are optional
  const allOptional = isAllOptional(objectProperties)

  // If all properties are optional and no required properties, return partial schema
  if (required.length === 0 && allOptional) {
    return partial(objectProperties)
  }

  return `z.object({${objectProperties}})`
}
