import type { Components, ResponseDefinition } from '../../../../openapi/index.js'
import { declareConst, isRef, jsonExpr, linkConstName, resolveComponentKey } from './helpers.js'

/**
 * Generates TypeScript code for OpenAPI component links.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the link variables.
 * @returns A string of TypeScript code with link definitions.
 */
export function links(components: Components, exportSchema: boolean): string {
  const { links } = components
  if (!links) return ''

  return Object.keys(links)
    .sort()
    .map((key) => declareConst(linkConstName(key), jsonExpr(links[key]), exportSchema))
    .join('\n\n')
}

/**
 * Generates a links property expression for responses.
 */
export const linksPropExpr = (
  links: ResponseDefinition['links'] | undefined,
  components: Components,
): string | undefined => {
  if (!links) return undefined

  const entries = Object.entries(links).map(([name, link]) => {
    if (isRef(link)) {
      const key = resolveComponentKey(link.$ref, '#/components/links/')
      const resolved = key ? components.links?.[key] : undefined
      if (key && resolved) return `${JSON.stringify(name)}:${linkConstName(key)}`
      return `${JSON.stringify(name)}:{$ref:${JSON.stringify(link.$ref)}}`
    }
    return `${JSON.stringify(name)}:${JSON.stringify(link)}`
  })

  return entries.length > 0 ? `links:{${entries.join(',')}}` : undefined
}
