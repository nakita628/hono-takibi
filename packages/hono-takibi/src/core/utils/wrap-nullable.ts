import type { Schema } from '../../openapi/types.js'
import { pickTypes } from './index.js'

// Apply .nullable() when nullable flag or "null" exists in type list
export function wrapNullable(expr: string, schema: Schema) {
  return schema.nullable || pickTypes(schema.type).includes('null') ? `${expr}.nullable()` : expr
}
