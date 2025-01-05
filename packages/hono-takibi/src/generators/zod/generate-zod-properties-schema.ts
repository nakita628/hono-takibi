import type { Schema } from '../../types'
import { generatePropertySchema } from './generate-zod-property-schema'

/**
 * Generates a Zod object schema with properties and their requirements
 *
 * @function generateZodPropertiesSchema
 * @param properties - Record of property names to their schema definitions
 * @param required - Array of property names that are required
 * @returns Generated Zod object schema string
 *
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
 *
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
 *
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
 *
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
  namingCase: 'camelCase' | 'PascalCase' = 'camelCase',
): string {
  const objectProperties = Object.entries(properties).map(([key, schema]) => {
    const isRequired = required.includes(key)
    const propertySchema = generatePropertySchema(schema, namingCase)
    return `${key}:${propertySchema}${isRequired ? '' : '.optional()'}`
  })
  // Maybe you don't need to use .partial().
  return `z.object({${objectProperties}})${required ? '' : '.partial()'}`
  // return `z.object({${objectProperties}})${required.length === 0 ? '.partial()' : ''}`
}


