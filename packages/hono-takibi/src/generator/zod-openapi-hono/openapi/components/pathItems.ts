import { makeConst } from '../../../../helper/code.js'
import { makePathItem } from '../../../../helper/openapi.js'
import type { Components, PathItem } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../../../../utils/index.js'

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
  readonly?: boolean,
): string {
  const pathItemsEntries = (
    components: Components,
    exportPathItems: boolean,
    readonly?: boolean,
  ): readonly { readonly name: string; readonly code: string }[] => {
    const { pathItems } = components
    if (!pathItems) return []
    const asConst = readonly ? ' as const' : ''
    const isPathItem = (v: unknown): v is PathItem =>
      typeof v === 'object' && v !== null && !('$ref' in v)
    return Object.entries(pathItems).flatMap(([k, pathItemOrRef]) =>
      isPathItem(pathItemOrRef)
        ? [
            {
              name: toIdentifierPascalCase(ensureSuffix(k, 'PathItem')),
              code: `${makeConst(exportPathItems, k, 'PathItem')}${makePathItem(pathItemOrRef)}${asConst}`,
            },
          ]
        : [],
    )
  }
  return pathItemsEntries(components, exportPathItems, readonly)
    .map((e) => e.code)
    .join('\n\n')
}
