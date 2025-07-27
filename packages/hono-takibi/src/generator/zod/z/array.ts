import type { Schema } from '../../../openapi/types.js'
import { length, max, min } from '../../../utils/index.js'
import { zod } from '../index.js'

export function array(schema: Schema): string {
  // fall back to any[] if items が無い
  const z = `z.array(${schema.items ? zod(schema.items) : 'z.any()'})`

  // minItems / maxItems → .min() / .max()
  if (schema.minItems !== undefined && schema.maxItems !== undefined) {
    return schema.minItems === schema.maxItems
      ? `${z}${length(schema.minItems)}`
      : `${z}${min(schema.minItems)}${max(schema.maxItems)}`
  }

  if (schema.minItems !== undefined) return `${z}${min(schema.minItems)}`
  if (schema.maxItems !== undefined) return `${z}${max(schema.maxItems)}`

  /* legacy: minLength / maxLength on array */
  if (schema.minLength !== undefined && schema.maxLength !== undefined) {
    return schema.minLength === schema.maxLength
      ? `${z}${length(schema.minLength)}`
      : `${z}${min(schema.minLength)}${max(schema.maxLength)}`
  }
  if (schema.minLength !== undefined) return `${z}${min(schema.minLength)}`
  if (schema.maxLength !== undefined) return `${z}${max(schema.maxLength)}`

  return z
}
