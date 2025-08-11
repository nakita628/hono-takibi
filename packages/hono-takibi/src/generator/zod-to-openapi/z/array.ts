import type { Schema } from '../../../openapi/index.js'
import { refSchema } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'

export function array(schema: Schema): string {
  const item =
    schema.items?.$ref
      ? refSchema(schema.items.$ref)
      : schema.items
        ? zodToOpenAPI(schema.items)
        : 'z.any()'

  const z = `z.array(${item})`

  if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
    return schema.minItems === schema.maxItems
      ? `${z}.length(${schema.minItems})`
      : `${z}.min(${schema.minItems}).max(${schema.maxItems})`
  }
  if (typeof schema.minItems === 'number') return `${z}.min(${schema.minItems})`
  if (typeof schema.maxItems === 'number') return `${z}.max(${schema.maxItems})`
  return z
}
