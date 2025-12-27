import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifier } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

export function headers(
  components: Components,
  exportSchema: boolean,
  exportHeadersTypes: boolean,
) {
  const { headers } = components
  if (!headers) return ''

  return Object.keys(headers)
    .map((k) => {
      const header = headers[k]
      const meta = {
        headers: {
          ...header,
        },
      }
      const z = zodToOpenAPI(header, meta)
      const zInfer = exportHeadersTypes
        ? `export type ${toIdentifier(ensureSuffix(k, 'Header'))} = z.infer<typeof ${toIdentifier(ensureSuffix(k, 'HeaderSchema'))}>`
        : ''
      return `${exportSchema ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'HeaderSchema'))} = ${z}${zInfer ? `\n\n${zInfer}` : ''}`
    })
    .join('\n\n')
}
