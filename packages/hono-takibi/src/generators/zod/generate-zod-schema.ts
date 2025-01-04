import type { Schema, Type } from '../../types'
import { generateZodArray } from './generate-zod-array'
import { generateZodStringSchema } from './generate-zod-string-schema'
import { generateZodPropertiesSchema } from './generate-zod-properties-schema'
import { generateZodRecordSchema } from './generate-zod-record-schema'
import { isFormatString } from '../../core/validator/is-format-string'
import { generateZodNumberSchema } from './generate-zod-number-schema'
import { generateZodIntegerSchema } from './generate-zod-integer-schema'

/**
 * Mapping of OpenAPI/JSON Schema types to Zod schema strings
 *
 * @remarks
 * - Basic types are mapped directly to their Zod equivalents
 * - Complex types (object, string with validation, array with items) are handled separately
 * - Used as a fallback for simple type conversions
 */
const TYPE_TO_ZOD_SCHEMA: Record<Type, string> = {
  number: 'z.number()',
  integer: 'z.number().int()',
  bigint: 'z.bigint()',
  boolean: 'z.boolean()',
  date: 'z.date()',
  null: 'z.null()',
  any: 'z.any()',
  unknown: 'z.unknown()',
  string: 'z.string()',
  object: 'z.object({})',
  array: 'z.array()',
} as const

/**
 * Generates a Zod schema string from an OpenAPI/JSON Schema definition
 *
 * @function generateZodSchema
 * @param schema - The schema definition object
 * @param schema.type - The type of the schema (e.g., 'string', 'object', 'array')
 * @param schema.format - Optional format specification (e.g., 'date-time', 'email')
 * @param schema.pattern - Optional regex pattern for string validation
 * @param schema.minLength - Optional minimum length for string validation
 * @param schema.maxLength - Optional maximum length for string validation
 * @param schema.properties - Object properties definition
 * @param schema.required - Array of required property names
 * @param schema.items - Schema for array items
 * @param schema.enum - Array of enum values
 * @param schema.additionalProperties - Schema for additional properties in objects
 * @returns Generated Zod schema string
 *
 * @example
 * // Enum type
 * generateZodSchema({ enum: ['active', 'inactive'] })
 * // Returns: 'z.enum(["active","inactive"])'
 *
 * @example
 * // Object with properties
 * generateZodSchema({
 *   type: 'object',
 *   properties: {
 *     name: { type: 'string' },
 *     age: { type: 'number' }
 *   },
 *   required: ['name']
 * })
 * // Returns: 'z.object({name: z.string(), age: z.number().optional()})'
 *
 * @example
 * // String with validation
 * generateZodSchema({
 *   type: 'string',
 *   minLength: 3,
 *   maxLength: 10,
 *   pattern: '^[a-z]+$'
 * })
 * // Returns: 'z.string().min(3).max(10).regex(/^[a-z]+$/)'
 *
 * @example
 * // Array with items
 * generateZodSchema({
 *   type: 'array',
 *   items: { type: 'string' }
 * })
 * // Returns: 'z.array(z.string())'
 *
 * @remarks
 * - Handles special cases first (enum, object, string with validation, array with items)
 * - Falls back to basic type mapping for simple types
 * - Returns z.any() for unknown types with a warning
 */
export function generateZodSchema(schema: Schema, paramName?: string, isPath?: boolean): string {
  const {
    type,
    format,
    pattern,
    minLength,
    maxLength,
    minimum,
    maximum,
    default: defaultValue, // reserved word
    example,
    properties,
    required = [],
    items,
    enum: enumValues,
    additionalProperties,
  } = schema

  // enum
  if (enumValues) {
    if (example) {
      return `z.enum(${JSON.stringify(enumValues)}).openapi({example:${JSON.stringify(example)}})`
    }
    return `z.enum(${JSON.stringify(enumValues)})`
  }

  // object
  if (type === 'object') {
    if (additionalProperties) return generateZodRecordSchema(additionalProperties)
    if (!properties) return 'z.object({})'
    return generateZodPropertiesSchema(properties, required)
  }

  // string
  if (type === 'string') {
    return generateZodStringSchema({
      pattern,
      minLength,
      maxLength,
      format: format && isFormatString(format) ? format : undefined,
      default: defaultValue,
      example,
      paramName,
      isPath,
    })
  }

  // number
  if (type === 'number') {
    return generateZodNumberSchema({
      pattern,
      minLength,
      maxLength,
      minimum,
      maximum,
      default: defaultValue,
      example,
      paramName,
      isPath,
    })
  }

  // integer
  if (type === 'integer') {
    return generateZodIntegerSchema({
      minLength,
      maxLength,
      minimum,
      maximum,
      default: defaultValue,
      example,
      paramName,
      isPath,
    })
  }

  // array
  if (type === 'array' && items) return generateZodArray(generateZodSchema(items))

  // fallback
  if (type) return TYPE_TO_ZOD_SCHEMA[type]
  console.warn(`Unknown type: ${type}, falling back to z.any()`)
  return 'z.any()'
}
