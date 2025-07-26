import { zodToOpenAPI } from '../../../helper/zod-to-openapi.js'
import type { Schema } from '../../../openapi/types.js'
import { zod } from '../index.js'

/**
 * Generates a Zod record schema for objects with additional properties.
 *
 * @param additionalProperties - Schema definition for the record values.
 * @returns The generated Zod record schema string.
 */
export function record(additionalProperties: Schema): string {
  const schema = zodToOpenAPI(zod(additionalProperties), additionalProperties)
  return `z.record(z.string(),${schema})`
}
