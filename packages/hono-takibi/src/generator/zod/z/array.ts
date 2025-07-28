import type { Schema } from '../../../openapi/types.js'
import { zod } from '../index.js'

export function array(schema: Schema): string {
  const z = `z.array(${schema.items ? zod(schema.items) : 'z.any()'})`
  // minItems / maxItems → .length() / .min() / .max()
  if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
    // minItems === maxItems → .length(n)
    if (schema.minItems === schema.maxItems) {
      return `${z}.length(${schema.minItems})`
    }
    // minItems ≠ maxItems → .min(n).max(n)
    return `${z}.min(${schema.minItems}).max(${schema.maxItems})`
  }
  if (typeof schema.minItems === 'number') {
    return `${z}.min(${schema.minItems})`
  }
  if (typeof schema.maxItems === 'number') {
    return `${z}.max(${schema.maxItems})`
  }
  return z
}
