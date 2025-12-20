import type { Components, ResponseDefinition } from '../../../../openapi/index.js'
import { ensureSuffix, isRecord, toIdentifier } from '../../../../utils/index.js'

const jsonExpr = (value: unknown): string => JSON.stringify(value) ?? 'undefined'

const declareConst = (name: string, expr: string, exportSchema: boolean): string =>
  `${exportSchema ? 'export const' : 'const'} ${name} = ${expr}`

const linkConstName = (key: string): string => toIdentifier(ensureSuffix(key, 'Link'))

const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'

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
    .map((key) => declareConst(linkConstName(key), jsonExpr(links[key]), exportSchema))
    .join('\n\n')
}

/**
 * Generates a links property expression for responses.
 */
export const linksPropExpr = (
  links: ResponseDefinition['links'] | undefined,
): string | undefined => {
  if (!links) return undefined

  const entries = Object.entries(links).map(([name, link]) => {
    if (isRef(link)) {
      return `${JSON.stringify(name)}:{$ref:${JSON.stringify(link.$ref)}}`
    }
    return `${JSON.stringify(name)}:${JSON.stringify(link)}`
  })

  return entries.length > 0 ? `links:{${entries.join(',')}}` : undefined
}
