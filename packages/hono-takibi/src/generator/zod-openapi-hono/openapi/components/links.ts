import { makeConst } from '../../../../helper/code.js'
import { makeLinkOrReference } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component links.
 *
 * Converts link definitions to JavaScript object constants
 * containing the link configuration for response linking.
 *
 *
 * @example
 * ```ts
 * linksCode(components, true)
 * // → 'export const GetUserByIdLink = { operationId: "getUser", parameters: { userId: "$response.body#/id" } }'
 *
 * linksCode(components, true, true)
 * // → 'export const GetUserByIdLink = { operationId: "getUser", parameters: { userId: "$response.body#/id" } } as const'
 * ```
 */
export function linksCode(components: Components, exportLinks: boolean, readonly?: boolean) {
  const { links } = components
  if (!links) return ''
  const asConst = readonly ? ' as const' : ''
  return Object.entries(links)
    .map(
      ([k, link]) => `${makeConst(exportLinks, k, 'Link')}${makeLinkOrReference(link)}${asConst}`,
    )
    .join('\n\n')
}
