import type { Schema } from '../../types'

export function generateZodEnum(schema: Schema) {
  if (schema.example) {
    return `z.enum(${JSON.stringify(schema.enum)}).openapi({example:${JSON.stringify(schema.example)}})`
  }
  return `z.enum(${JSON.stringify(schema.enum)})`
}
