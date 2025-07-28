import type { Schema } from '../../../openapi/types.js'
import { zod } from '../index.js'

export function array(schema: Schema): string {
  const z = `z.array(${schema.items ? zod(schema.items) : 'z.any()'})`
  // minItems / maxItems → .min() / .max()
  if (schema.minItems !== undefined && schema.maxItems !== undefined) {
    return schema.minItems === schema.maxItems
      ? `${z}${`.length(${schema.minItems})`}`
      : `${z}${`.min(${schema.minItems})`}${`.max(${schema.maxItems})`}`
  }
  if (schema.minItems !== undefined) return `${z}${`.min(${schema.minItems})`}`
  if (schema.maxItems !== undefined) return `${z}${`.max(${schema.maxItems})`}`
  return z
}
