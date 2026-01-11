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

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/components/headers.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('headersCode', () => {
    it('should return empty string when no headers', () => {
      const components: Components = {}
      expect(headersCode(components, true, false)).toBe('')
    })

    it('should generate header with schema and export', () => {
      const components: Components = {
        headers: {
          XRequestId: {
            schema: { type: 'string' },
          },
        },
      }
      const result = headersCode(components, true, false)
      expect(result).toBe('export const XRequestIdHeaderSchema=z.string().exactOptional()')
    })

    it('should generate header without export', () => {
      const components: Components = {
        headers: {
          XRateLimit: {
            schema: { type: 'integer' },
          },
        },
      }
      const result = headersCode(components, false, false)
      expect(result).toBe('const XRateLimitHeaderSchema=z.int().exactOptional()')
    })

    it('should generate header with export and type', () => {
      const components: Components = {
        headers: {
          XToken: {
            schema: { type: 'string' },
          },
        },
      }
      const result = headersCode(components, true, true)
      expect(result).toBe(
        `export const XTokenHeaderSchema=z.string().exactOptional()

export type XTokenHeader=z.infer<typeof XTokenHeaderSchema>`,
      )
    })
  })
}
