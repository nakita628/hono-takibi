import type { Schema } from '../../type'
import { generateZodToOpenAPI } from './openapi/generate-zod-to-openapi'

/**
 * Generates a Zod enum string
 * @param { Schema } schema - The schema definition
 * @returns { string } Generated Zod enum string
 */
export function generateZodEnum(schema: Schema): string {
  if (!schema.enum) {
    throw new Error('enum is not found')
  }
  // example
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
