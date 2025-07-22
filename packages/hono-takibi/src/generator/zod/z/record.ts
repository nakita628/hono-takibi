import type { Schema } from '../../../openapi/index.js'
import { zodToOpenAPI } from '../../zod-to-openapi/index.js'

/**
 * Generates a Zod record schema for objects with additional properties.
 * 
 * @param additionalProperties - Schema definition for the record values.
 * @returns The generated Zod record schema string.
 */
export function record(additionalProperties: Schema): string {
  const schema = zodToOpenAPI(additionalProperties)
  return `z.record(z.string(),${schema})`
}
