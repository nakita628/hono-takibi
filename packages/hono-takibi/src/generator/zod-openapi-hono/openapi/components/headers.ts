import { makeContent } from '../../../../helper/components.js'
import type { Components, Header, Reference } from '../../../../openapi/index.js'
import {
  ensureSuffix,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

const isReference = (v: unknown): v is Reference =>
  typeof v === 'object' && v !== null && '$ref' in v

const isHeader = (v: unknown): v is Header =>
  typeof v === 'object' && v !== null && !('$ref' in v)

export function headers(
  components: Components,
  exportHeaders: boolean,
  exportHeadersTypes: boolean,
) {
  const { headers } = components
  if (!headers) return ''

  return Object.entries(headers)
    .map(([k, header]) => {
      const schemaName = toIdentifierPascalCase(ensureSuffix(k, 'Header'))

      if (isReference(header) && header.$ref) {
        const refName = header.$ref.split('/').pop() ?? k
        const refSchema = toIdentifierPascalCase(ensureSuffix(refName, 'Header'))
        return zodToOpenAPISchema(schemaName, refSchema, exportHeaders, exportHeadersTypes, true)
      }
      if (isHeader(header)) {
        if (header.schema) {
          const schema = zodToOpenAPI(header.schema, { headers: header })
          return zodToOpenAPISchema(schemaName, schema, exportHeaders, exportHeadersTypes, true)
        }
        if (header.content) {
          const content = makeContent(header.content)
          return zodToOpenAPISchema(
            schemaName,
            `{${content}}`,
            exportHeaders,
            exportHeadersTypes,
            true,
          )
        }
      }
      return ''
    })
    .filter(Boolean)
    .join('\n\n')
}
