import { makeConst } from '../../../../helper/code.js'
import { makePathItem } from '../../../../helper/openapi.js'
import type { Components, PathItem } from '../../../../openapi/index.js'

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
      return `${makeConst(exportPathItems, k, 'PathItem')}${makePathItem(pathItemOrRef)}${asConst}`
    })
    .filter((v) => v !== undefined)
    .join('\n\n')
}
