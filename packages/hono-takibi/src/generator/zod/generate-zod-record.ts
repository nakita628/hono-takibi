import type { Config } from '../../config'
import type { Format, Type } from '../../type'
import { generateZod } from './generate-zod'

/**
 * Generates a Zod record schema for objects with additional properties
 *
 * @function generateZodRecord
 * @param additionalProperties - Schema definition for record values
 * @param additionalProperties.type - Type of the record values (e.g., 'string', 'number')
 * @param additionalProperties.format - Format specification for the value type (e.g., 'date-time', 'email')
 * @returns Generated Zod record schema string
 *
 * @example
 * // Basic string values
 * generateZodRecord({ type: 'string', format: undefined })
 * // Returns: 'z.record(z.string(), z.string())'
 *
 * @example
 * // Email format values
 * generateZodRecord({ type: 'string', format: 'email' })
 * // Returns: 'z.record(z.string(), z.string().email())'
 *
 * @example
 * // Integer values
 * generateZodRecord({ type: 'integer', format: 'int64' })
 * // Returns: 'z.record(z.string(), z.number().int())'
 *
 * @remarks
 * - Always uses string keys (z.string())
 * - Value type is determined by the additionalProperties schema
 * - Supports all Zod-compatible types and formats
 *
 * @returns string - Generated Zod record schema string
 */
export function generateZodRecord(
  additionalProperties: {
    type: Type
    format: Format
  },
  config: Config,
): string {
  const schema = generateZod(config, additionalProperties)
  return `z.record(z.string(),${schema})`
}
