import { ref } from 'node:process'
import { makeContent } from '../../../../helper/components.js'
import type { Components, Reference, Schema } from '../../../../openapi/index.js'
import { buildExamples, ensureSuffix, isRecord, toIdentifier } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

export function headers(
  components: Components,
  exportHeaders: boolean,
  exportHeadersTypes: boolean,
) {
  const isReference = (v: unknown): v is Reference =>
    typeof v === 'object' && v !== null && '$ref' in v
  const { headers } = components
  if (!headers) return ''

  return Object.entries(headers)
    .map(([k, header]) => {
      const zInfer = exportHeadersTypes
        ? `\n\nexport type ${toIdentifier(ensureSuffix(k, 'Header'))} = z.infer<typeof ${toIdentifier(ensureSuffix(k, 'Header'))}>`
        : ''

      if (isReference(header)) {
        const schema = ref(header.$ref)
        return `${exportHeaders ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'Header'))}=${schema}${zInfer}`
      }
      if (header.schema) {
        const schema = zodToOpenAPI(header.schema, { headers })
        return `${exportHeaders ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'Header'))}=${schema}${zInfer}`
      }
      if (header.content) {
        const content = makeContent(header.content)
        return `${exportHeaders ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'Header'))}={${content}}${zInfer}`
      }
    })
    .join('\n\n')
}
