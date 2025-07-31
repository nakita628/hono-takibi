import type { Schema } from '../../../openapi/index.js'

export function date(schema: Schema): string {
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
  const z = isNullable ? 'z.date().nullable()' : 'z.date()'
  return schema.default ? `${z}.default(new Date(${JSON.stringify(schema.default)}))` : z
}
