import type { Schema } from '../../../openapi/index.js'
import { refSchema } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'

export function array(schema: Schema): string {
  const array = `z.array(${schema.items ? zodToOpenAPI(schema.items) : 'z.any()'})`
  if (schema.items?.$ref) {
    const ref = refSchema(schema.items?.$ref)
    return `z.array(${ref})`
  }
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
