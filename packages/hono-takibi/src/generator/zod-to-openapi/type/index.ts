import { makeTypeString } from '../../../helper/type.js'
import type { Schema } from '../../../openapi/index.js'

/**
 * Generates a TypeScript type definition from an OpenAPI schema.
 *
 *
 * @example
 * ```ts
 * zodType({ type: 'array', items: { type: 'string' } }, 'Tags')
 * // → 'type TagsType=string[]'
 *
 * zodType({ type: 'array', items: { type: 'string' } }, 'Tags', undefined, true)
 * // → 'type TagsType=readonly string[]'
 * ```
 */
export function zodType(
  schema: Schema,
  typeName: string,
  cyclicGroup?: ReadonlySet<string>,
  readonly?: boolean,
): string {
  const typeIsObject = Array.isArray(schema.type)
    ? schema.type.includes('object')
    : schema.type === 'object'
  const isRecordLike =
    typeIsObject &&
    schema.additionalProperties &&
    (!schema.properties || Object.keys(schema.properties).length === 0)
  // Use inline index signature for record-like types in cyclic groups to avoid TS2456
  // TypeScript doesn't allow Record<string,T> in cyclic type references
  if (cyclicGroup && cyclicGroup.size > 0 && isRecordLike) {
    const valueSchema =
      typeof schema.additionalProperties === 'object' ? schema.additionalProperties : {}
    const valueType = makeTypeString(valueSchema, typeName, cyclicGroup, readonly)
    return `type ${typeName}Type = {[key:string]:${valueType}}`
  }
  return `type ${typeName}Type=${makeTypeString(schema, typeName, cyclicGroup, readonly)}`
}
