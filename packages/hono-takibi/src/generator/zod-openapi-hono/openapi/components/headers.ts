import type { Components, Schema } from '../../../../openapi/index.js'
import { ensureSuffix, isRecord, toIdentifier } from '../../../../utils/index.js'
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
      const h: Record<string, unknown> = isRecord(header) ? header : {}
      const rawSchema = isRecord(h.schema) ? (h.schema as Schema) : {}
      const description = h.description as string | undefined
      const example = h.example
      const schema: Schema = {
        ...rawSchema,
        ...(description !== undefined && rawSchema.description === undefined
          ? { description }
          : {}),
        ...(example !== undefined && rawSchema.example === undefined ? { example } : {}),
      }
      const meta = {
        headers: {
          ...header,
        },
      }
      const z = zodToOpenAPI(schema, meta)
      const zInfer = exportHeadersTypes
        ? `export type ${toIdentifier(ensureSuffix(k, 'Header'))} = z.infer<typeof ${toIdentifier(ensureSuffix(k, 'HeaderSchema'))}>`
        : ''
      return `${exportSchema ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'HeaderSchema'))} = ${z}${zInfer ? `\n\n${zInfer}` : ''}`
    })
    .join('\n\n')
}
