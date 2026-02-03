import { makeConst } from '../../../../helper/code.js'
import { makeRef } from '../../../../helper/openapi.js'
import type { Components, PathItem } from '../../../../openapi/index.js'

/**
 * Serializes a value to JavaScript code, replacing $ref objects with variable references.
 *
 * @param value - The value to serialize
 * @returns JavaScript code string
 */
function serializeWithRefs(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return JSON.stringify(value)
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)

  if (Array.isArray(value)) {
    return `[${value.map(serializeWithRefs).join(',')}]`
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>
    // Check if this is a $ref object - replace with schema variable reference
    if ('$ref' in obj && typeof obj.$ref === 'string' && Object.keys(obj).length === 1) {
      return makeRef(obj.$ref)
    }
    const entries = Object.entries(obj)
      .map(([k, v]) => `${JSON.stringify(k)}:${serializeWithRefs(v)}`)
      .join(',')
    return `{${entries}}`
  }

  return JSON.stringify(value)
}

/**
 * Generates TypeScript code for OpenAPI component pathItems.
 *
 * Converts pathItem definitions to JavaScript object constants with
 * resolved schema references.
 *
 * @param components - The OpenAPI components object.
 * @param exportPathItems - Whether to export the pathItem constants.
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns A string of TypeScript code with pathItem definitions.
 *
 * @example
 * ```ts
 * pathItemsCode(components, true)
 * // → 'export const UserOperationsPathItem = { get: { responses: { "200": { content: { "application/json": { schema: ResourceSchema } } } } } }'
 *
 * pathItemsCode(components, true, true)
 * // → 'export const UserOperationsPathItem = { ... } as const'
 * ```
 */
export function pathItemsCode(
  components: Components,
  exportPathItems: boolean,
  readonly?: boolean | undefined,
): string {
  const { pathItems } = components
  if (!pathItems) return ''

  const asConst = readonly ? ' as const' : ''
  const isPathItem = (v: unknown): v is PathItem =>
    typeof v === 'object' && v !== null && !('$ref' in v)

  return Object.entries(pathItems)
    .map(([k, pathItemOrRef]) => {
      if (!isPathItem(pathItemOrRef)) return undefined
      return `${makeConst(exportPathItems, k, 'PathItem')}${serializeWithRefs(pathItemOrRef)}${asConst}`
    })
    .filter((v) => v !== undefined)
    .join('\n\n')
}
