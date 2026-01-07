import { makeTypeString } from '../../../helper/index.js'
import type { Schema } from '../../../openapi/index.js'

export function zodType(
  schema: Schema,
  typeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  const typeIsObject = Array.isArray(schema.type)
    ? schema.type.includes('object')
    : schema.type === 'object'
  const isRecordLike =
    typeIsObject &&
    schema.additionalProperties &&
    (!schema.properties || Object.keys(schema.properties).length === 0)

  // Use interface for record-like types in cyclic groups to allow circular references
  if (cyclicGroup && cyclicGroup.size > 0 && isRecordLike) {
    const valueSchema =
      typeof schema.additionalProperties === 'object' ? schema.additionalProperties : {}
    const valueType = makeTypeString(valueSchema, typeName, cyclicGroup)
    return `interface ${typeName}Type{[key:string]:${valueType}}`
  }

  return `type ${typeName}Type=${makeTypeString(schema, typeName, cyclicGroup)}`
}
