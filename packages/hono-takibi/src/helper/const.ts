import type { Schema } from '../openapi/index.js'

export function _const(schema: Schema) {
  const z = `z.literal(${JSON.stringify(schema.const)})`
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
  if (isNullable) {
    return `${z}.nullable()`
  }
  return z
}
