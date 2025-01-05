import type { Format, Type } from '../../types'
import { generateZodSchema } from './generate-zod-schema'

/**
 * Generates a Zod record schema for objects with additional properties
 *
 * @function generateZodRecordSchema
 * @param additionalProperties - Schema definition for record values
 * @param additionalProperties.type - Type of the record values (e.g., 'string', 'number')
 * @param additionalProperties.format - Format specification for the value type (e.g., 'date-time', 'email')
 * @returns Generated Zod record schema string
 *
 * @example
 * // Basic string values
 * generateZodRecordSchema({ type: 'string', format: undefined })
 * // Returns: 'z.record(z.string(), z.string())'
 *
 * @example
 * // Email format values
 * generateZodRecordSchema({ type: 'string', format: 'email' })
 * // Returns: 'z.record(z.string(), z.string().email())'
 *
 * @example
 * // Integer values
 * generateZodRecordSchema({ type: 'integer', format: 'int64' })
 * // Returns: 'z.record(z.string(), z.number().int())'
 *
 * @remarks
 * - Always uses string keys (z.string())
 * - Value type is determined by the additionalProperties schema
 * - Supports all Zod-compatible types and formats
 */
export function generateZodRecordSchema(
  additionalProperties: {
    type: Type
    format: Format
  },
): string {
  const schema = generateZodSchema(additionalProperties)
  return `z.record(z.string(),${schema})`
}
