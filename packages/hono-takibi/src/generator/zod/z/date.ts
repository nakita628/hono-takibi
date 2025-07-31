import type { Schema } from '../../../openapi/index.js'

export function date(schema: Schema): string {
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
  if (isNullable) {
    return 'z.date().nullable()'
  }
  return 'z.date()'
}
