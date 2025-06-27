import type { Schema } from '../../openapi/index.js'
import { zodToOpenAPI } from '../zod-to-openapi/index.js'

/**
 * Generates a Zod record schema for objects with additional properties
 * @param { Schema } additionalProperties - Schema definition for record values
 * @param { Schema } additionalProperties.type - Type of the record values (e.g., 'string', 'number')
 * @param { Schema } additionalProperties.format - Format specification for the value type (e.g., 'date-time', 'email')
 * @returns { string } Generated Zod record schema string
 */
export function record(additionalProperties: Schema): string {
  const schema = zodToOpenAPI(additionalProperties)
  return `z.record(z.string(),${schema})`
}
