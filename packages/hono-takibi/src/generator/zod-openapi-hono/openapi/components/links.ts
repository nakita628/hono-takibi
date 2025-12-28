import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, ref, toIdentifier } from '../../../../utils/index.js'

export function links(components: Components, exportLinks: boolean) {
  const { links } = components
  if (!links) return ''

  return Object.entries(links)
    .map(([k, link]) => {
      const props = [
        'operationRef' in link ? `operationRef:${JSON.stringify(link.operationRef)}` : undefined,
        'operationId' in link ? `operationId:${JSON.stringify(link.operationId)}` : undefined,
        'parameters' in link ? `parameters:${JSON.stringify(link.parameters)}` : undefined,
        'requestBody' in link ? `requestBody:${JSON.stringify(link.requestBody)}` : undefined,
        'description' in link ? `description:${JSON.stringify(link.description)}` : undefined,
        'server' in link ? `server:${JSON.stringify(link.server)}` : undefined,
        '$ref' in link && link.$ref ? `$ref:${ref(link.$ref)}` : undefined,
        'summary' in link ? `summary:${JSON.stringify(link.summary)}` : undefined,
      ]
        .filter((v) => v !== undefined)
        .join(',')
      return `${exportLinks ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'Link'))}={${props}}`
    })
    .join('\n\n')
}
