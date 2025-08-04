import type { Schema } from '../../../openapi/index.js'
import zod from '../index.js'

export function array(schema: Schema): string {
  const array = `z.array(${schema.items ? zod(schema.items) : 'z.any()'})`
  if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
    if (schema.minItems === schema.maxItems) {
      return `${array}.length(${schema.minItems})`
    }
    return `${array}.min(${schema.minItems}).max(${schema.maxItems})`
  }
  if (typeof schema.minItems === 'number') {
    return `${array}.min(${schema.minItems})`
  }
  if (typeof schema.maxItems === 'number') {
    return `${array}.max(${schema.maxItems})`
  }
  return array
}
