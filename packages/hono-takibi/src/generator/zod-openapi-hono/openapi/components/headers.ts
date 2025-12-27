import type { Components, Schema } from '../../../../openapi/index.js'
import { ensureSuffix, isRecord, toIdentifier } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

type HeaderComponent = NonNullable<Components['headers']>[string]

const headerSchema = (header: unknown): Schema => {
  if (!isRecord(header)) return {}
  const raw = header.schema
  return isRecord(raw) ? (raw as Schema) : {}
}

const mergeHeaderSchema = (header: HeaderComponent): Schema => {
  const base = headerSchema(header)
  if (!isRecord(header)) return base
  const h = header as Record<string, unknown>
  const description = h.description as string | undefined
  const example = h.example
  return {
    ...base,
    ...(description !== undefined && base.description === undefined ? { description } : {}),
    ...(example !== undefined && base.example === undefined ? { example } : {}),
  }
}

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
      const schema = mergeHeaderSchema(header)
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
