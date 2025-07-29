import type { Schema } from '../../../openapi/index.js'
import { zod } from '../index.js'

export function array(schema: Schema): string {
  const z = `z.array(${schema.items ? zod(schema.items) : 'z.any()'})`

  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

  if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
    if (schema.minItems === schema.maxItems) {
      return isNullable
        ? `${z}.length(${schema.minItems}).nullable()`
        : `${z}.length(${schema.minItems})`
    }
    return isNullable
      ? `${z}.min(${schema.minItems}).max(${schema.maxItems}).nullable()`
      : `${z}.min(${schema.minItems}).max(${schema.maxItems})`
  }

  if (typeof schema.minItems === 'number') {
    return isNullable ? `${z}.min(${schema.minItems}).nullable()` : `${z}.min(${schema.minItems})`
  }

  if (typeof schema.maxItems === 'number') {
    return isNullable ? `${z}.max(${schema.maxItems}).nullable()` : `${z}.max(${schema.maxItems})`
  }

  return isNullable ? `${z}.nullable()` : z
}
