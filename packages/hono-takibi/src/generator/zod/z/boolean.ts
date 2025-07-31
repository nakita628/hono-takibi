import type { Schema } from '../../../openapi/index.js'

export function boolean(schema: Schema): string {
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
  const z = isNullable ? 'z.boolean().nullable()' : 'z.boolean()'
  return schema.default ? `${z}.default(${JSON.stringify(schema.default)})` : z
}
