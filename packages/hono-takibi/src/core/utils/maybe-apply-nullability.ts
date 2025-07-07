import type { Schema } from '../../openapi/types.js'

export function maybeApplyNullability(expr: string, schema: Schema): string {
  const types =
    schema.type === undefined ? [] : Array.isArray(schema.type) ? schema.type : [schema.type]
  return schema.nullable || types.includes('null') ? `${expr}.nullable()` : expr
}
