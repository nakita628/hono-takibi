import { makeContent } from '../../../../helper/components.js'
import type { Components, Header, Reference } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifier } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

export function headers(
  components: Components,
  exportHeaders: boolean,
  exportHeadersTypes: boolean,
) {
  const isReference = (v: unknown): v is Reference =>
    typeof v === 'object' && v !== null && '$ref' in v
  const isHeader = (v: unknown): v is Header =>
    typeof v === 'object' && v !== null && !('$ref' in v)
  const { headers } = components
  if (!headers) return ''

  return Object.entries(headers)
    .map(([k, header]) => {
      const zInfer = exportHeadersTypes
        ? `\n\nexport type ${toIdentifier(ensureSuffix(k, 'Header'))} = z.infer<typeof ${toIdentifier(ensureSuffix(k, 'Header'))}>`
        : ''

      if (isReference(header) && header.$ref) {
        const refName = header.$ref.split('/').pop() ?? k
        return `${exportHeaders ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'Header'))}=${toIdentifier(ensureSuffix(refName, 'Header'))}${zInfer}`
      }
      if (isHeader(header)) {
        if (header.schema) {
          const schema = zodToOpenAPI(header.schema, { headers: header })
          return `${exportHeaders ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'Header'))}=${schema}${zInfer}`
        }
        if (header.content) {
          const content = makeContent(header.content)
          return `${exportHeaders ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'Header'))}={${content}}${zInfer}`
        }
      }
      return ''
    })
    .filter(Boolean)
    .join('\n\n')
}
