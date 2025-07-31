import type { Schema } from '../../../openapi/index.js'
import { zod } from '../index.js'

export function array(schema: Schema): string {
  const array = `z.array(${schema.items ? zod(schema.items) : 'z.any()'})`
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
  if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
    if (schema.minItems === schema.maxItems) {
      const z = isNullable
        ? `${array}.length(${schema.minItems}).nullable()`
        : `${array}.length(${schema.minItems})`
      return schema.default ? `${z}.default(${JSON.stringify(schema.default)})` : z
    }
    const z = isNullable
      ? `${array}.min(${schema.minItems}).max(${schema.maxItems}).nullable()`
      : `${array}.min(${schema.minItems}).max(${schema.maxItems})`
    return schema.default ? `${z}.default(${JSON.stringify(schema.default)})` : z
  }
  if (typeof schema.minItems === 'number') {
    const z = isNullable
      ? `${array}.min(${schema.minItems}).nullable()`
      : `${array}.min(${schema.minItems})`
    return schema.default ? `${z}.default(${JSON.stringify(schema.default)})` : z
  }
  if (typeof schema.maxItems === 'number') {
    const z = isNullable
      ? `${array}.max(${schema.maxItems}).nullable()`
      : `${array}.max(${schema.maxItems})`
    return schema.default ? `${z}.default(${JSON.stringify(schema.default)})` : z
  }
  const z = isNullable ? `${array}.nullable()` : array
  return schema.default ? `${z}.default(${JSON.stringify(schema.default)})` : z
}
