import type { Components, Responses } from '../../../../openapi/index.js'
import { ensureSuffix, isRecord, refSchema, toIdentifier } from '../../../../utils/index.js'

const linkConstName = (key: string): string => toIdentifier(ensureSuffix(key, 'Link'))

const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'

/**
 * Generates TypeScript code for OpenAPI component links.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the link variables.
 * @returns A string of TypeScript code with link definitions.
 */
// export function links(components: Components, exportSchema: boolean): string {
//   const { links } = components
//   if (!links) return ''

//   return Object.keys(links)
//     .map((key) => declareConst(linkConstName(key), jsonExpr(links[key]), exportSchema))
//     .join('\n\n')
// }

// /**
//  * Generates a links property expression for responses.
//  */
export const linksPropExpr = (links: Responses['links'] | undefined): string | undefined => {
  if (!links) return undefined

  const entries = Object.entries(links).map(([name, link]) => {
    if (isRef(link)) {
      return `${JSON.stringify(name)}:{$ref:${JSON.stringify(link.$ref)}}`
    }
    return `${JSON.stringify(name)}:${JSON.stringify(link)}`
  })

  return entries.length > 0 ? `links:{${entries.join(',')}}` : undefined
}

export function links(components: Components, exportLinks: boolean) {
  const { links } = components
  if (!links) return ''

  return Object.entries(links)
    .flatMap(([name, link]) => {
      const props = [
        'operationRef' in link ? `operationRef:${JSON.stringify(link.operationRef)}` : undefined,
        'operationId' in link ? `operationId:${JSON.stringify(link.operationId)}` : undefined,
        'parameters' in link ? `parameters:${JSON.stringify(link.parameters)}` : undefined,
        'requestBody' in link ? `requestBody:${JSON.stringify(link.requestBody)}` : undefined,
        'description' in link ? `description:${JSON.stringify(link.description)}` : undefined,
        'server' in link ? `server:${JSON.stringify(link.server)}` : undefined,
        '$ref' in link && link.$ref ? `$ref:${refSchema(link.$ref)}` : undefined,
        'summary' in link ? `summary:${JSON.stringify(link.summary)}` : undefined,
      ]
        .filter((v) => v !== undefined)
        .join(',')
      return `${exportLinks ? 'export const' : 'const'} ${linkConstName(name)}={${props}}`
    })
    .join('\n\n')
}
