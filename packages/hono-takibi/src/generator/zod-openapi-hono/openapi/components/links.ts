import { isRefObject } from '../../../../guard/index.js'
import { ast, makeConst, makeLinkOrReference, makeRef } from '../../../../helper/index.js'
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
  // A `$ref` link is its target's constant, as an example and a media type are (#607); the
  // sort puts the target first.
  return ast(
    Object.entries(links)
      .map(([k, link]) =>
        isRefObject(link)
          ? `${makeConst(exportLinks, k, 'Link')}${makeRef(link.$ref)}`
          : `${makeConst(exportLinks, k, 'Link')}${makeLinkOrReference(link)}${asConst}`,
      )
      .join('\n\n'),
  )
}
