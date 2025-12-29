import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import type { Schema } from '../openapi/index.js'
import { getToSafeIdentifier } from '../utils/index.js'

/**
 * Generates a Zod object schema string from a set of OpenAPI properties.
 *
 * - Handles required and optional fields
 * - Supports primitive types, arrays, and `$ref`-based references
 * - Automatically wraps in `.partial()` if all properties are optional
 *
 * @param properties - Object mapping property names to their schema definitions
 * @param required - List of required property names
 * @returns A Zod schema string representing the object
 *
 * @example
 * // 1. All fields optional
 * propertiesSchema(
 *   {
 *     id: { type: 'integer' },
 *     status: { type: 'string', enum: ['active', 'inactive'] },
 *   },
 *   []
 * )
 * // → 'z.object({id:z.number().int().optional(),status:z.enum(["active","inactive"]).optional()}).partial()'
 *
 * @example
 * // 2. All fields required
 * propertiesSchema(
 *   {
 *     name: { type: 'string' },
 *     items: { type: 'array', items: { type: 'string' } },
 *   },
 *   ['name', 'items']
 * )
 * // → 'z.object({name:z.string(),items:z.array(z.string())})'
 *
 * @example
 * // 3. With schema references
 * propertiesSchema(
 *   {
 *     user: { $ref: '#/components/schemas/User' },
 *     tags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
 *   },
 *   []
 * )
 * // → 'z.object({user:userSchema.optional(),tags:z.array(tagSchema).optional()}).partial()'
 */
export function propertiesSchema(
  properties: { readonly [k: string]: Schema },
  required: readonly string[],
): string {
  const objectProperties = Object.entries(properties).map(([k, schema]) => {
    const isRequired = required.includes(k)
    const z = zodToOpenAPI(schema)
    const safeKey = getToSafeIdentifier(k)
    return isRequired ? `${safeKey}:${z.replace('.optional()', '')}` : `${safeKey}:${z}`
  })
  // Check if all properties are optional
  const allOptional = objectProperties.every((v) => v.includes('.optional()'))
  // If all properties are optional and no required properties, return partial schema
  if (required.length === 0 && allOptional) {
    const cleanProperties = objectProperties.map((v) => v.replace('.optional()', ''))
    return `z.object({${cleanProperties}}).partial()`
  }
  return `z.object({${objectProperties}})`
}
