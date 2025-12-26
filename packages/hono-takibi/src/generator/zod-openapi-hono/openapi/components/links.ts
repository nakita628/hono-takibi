import type { Components, Responses } from '../../../../openapi/index.js'
import { ensureSuffix, refSchema, toIdentifier } from '../../../../utils/index.js'

/**
 * Generates TypeScript code for OpenAPI component links.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the link variables.
 * @returns A string of TypeScript code with link definitions.
 */
export const linksPropExpr = (links: Responses['links'] | undefined): string | undefined => {
  const isRefO = (v: unknown): v is { $ref: string } =>
    typeof v === 'object' && v !== null && '$ref' in v
  if (!links) return undefined

  const entries = Object.entries(links).map(([name, link]) => {
    if (isRefO(link)) {
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
      return `${exportLinks ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(name, 'Link'))}={${props}}`
    })
    .join('\n\n')
}
