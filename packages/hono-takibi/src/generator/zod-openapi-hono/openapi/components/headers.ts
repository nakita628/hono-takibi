import { makeContent, makeRef } from '../../../../helper/index.js'
import type { Components, Header } from '../../../../openapi/index.js'
import {
  ensureSuffix,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

export function headersCode(
  components: Components,
  exportHeaders: boolean,
  exportHeadersTypes: boolean,
) {
  const { headers } = components
  if (!headers) return ''

  const isHeader = (v: unknown): v is Header =>
    typeof v === 'object' && v !== null && !('$ref' in v)

  return Object.entries(headers)
    .map(([k, header]) => {
      const schemaName = toIdentifierPascalCase(ensureSuffix(k, 'HeaderSchema'))

      if ('$ref' in header) {
        const refName = makeRef(header.$ref)
        return zodToOpenAPISchema(schemaName, refName, exportHeaders, exportHeadersTypes, true)
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
