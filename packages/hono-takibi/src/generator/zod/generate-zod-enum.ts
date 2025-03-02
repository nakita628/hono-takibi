import type { Schema } from '../../types'
import { generateZodToOpenAPI } from './openapi/generate-zod-to-openapi'

/**
 * Generate Zod enum
 *
 * @function generateZodEnum
 * @param schema - Schema definition
 * @returns Zod enum string
 */
export function generateZodEnum(schema: Schema) {
  if (schema.example) {
    const openapi_example = generateZodToOpenAPI(schema.example)
    return `z.enum(${JSON.stringify(schema.enum)})${openapi_example}`
  }
  // number
  if (schema.type === 'number' && schema.enum) {
    return `z.literal(${schema.enum})`
  }
  // bigint
  if (schema.type === 'bigint' && schema.enum) {
    return `z.literal(${schema.enum}n)`
  }
  // boolean
  if (schema.type === 'boolean' && schema.enum) {
    return `z.literal(${schema.enum})`
  }
  return `z.enum(${JSON.stringify(schema.enum)})`
}
