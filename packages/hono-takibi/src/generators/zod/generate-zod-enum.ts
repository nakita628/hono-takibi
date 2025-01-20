import type { Schema } from '../../types'
import { generateZodToOpenAPI } from './openapi/generate-zod-to-openapi'

export function generateZodEnum(schema: Schema) {
  if (schema.example) {
    const openapi_example = generateZodToOpenAPI(schema.example)
    return `z.enum(${JSON.stringify(schema.enum)})${openapi_example}`
  }
  return `z.enum(${JSON.stringify(schema.enum)})`
}
