import type { Schema } from '../../../openapi/index.js'
import { isAllOptional } from '../../../core/validator/index.js'
import { partial } from '../z/index.js'
import { propertySchema } from './property-schema.js'
import { getToSafeIdentifier } from '../../../core/utils/index.js'

/**
 * @param { Record<string, Schema> } properties - Record of property names to their schema definitions
 * @param { string[] } required - Array of property names that are required
 * @returns { string } Generated Zod object schema string
 * @description Generates a Zod object schema with properties and their requirements
 * @example
 * // Order schema with optional fields
 * propertiesSchema(
 *   {
 *     id: { type: 'integer', format: 'int64' },
 *     status: { type: 'string', enum: ['placed', 'approved', 'delivered'] }
 *   },
 *   []
 * )
 * // Returns: 'z.object({id: z.number().int().optional(),status: z.enum(["placed","approved","delivered"]).optional()})'
 * @example
 * // Pet schema with required fields
 * propertiesSchema(
 *   {
 *     name: { type: 'string' },
 *     photoUrls: { type: 'array', items: { type: 'string' } }
 *   },
 *   ['name', 'photoUrls']
 * )
 * // Returns: 'z.object({name: z.string(),photoUrls: z.array(z.string())})'
 * @example
 * // Address schema with references
 * propertiesSchema(
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
export function propertiesSchema(properties: Record<string, Schema>, required: string[]): string {
  const objectProperties = Object.entries(properties).map(([key, schema]) => {
    const isRequired = required.includes(key)
    const safeKey = getToSafeIdentifier(key)
    return `${safeKey}:${propertySchema(schema)}${isRequired ? '' : '.optional()'}`
  })

  // Check if all properties are optional
  const allOptional = isAllOptional(objectProperties)

  // If all properties are optional and no required properties, return partial schema
  if (required.length === 0 && allOptional) {
    return partial(objectProperties)
  }

  return `z.object({${objectProperties}})`
}
