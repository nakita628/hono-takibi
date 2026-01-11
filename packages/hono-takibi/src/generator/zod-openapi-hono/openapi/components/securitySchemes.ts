import { makeConst } from '../../../../helper/code.js'
import type { Components } from '../../../../openapi/index.js'

export function securitySchemesCode(
  components: Components,
  exportSecuritySchemes: boolean,
): string {
  const { securitySchemes } = components
  if (!securitySchemes) return ''

  return Object.keys(securitySchemes)
    .map((k) => {
      return `${makeConst(exportSecuritySchemes, k, 'SecurityScheme')}${JSON.stringify(securitySchemes[k])}`
    })
    .join('\n\n')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/components/securitySchemes.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('securitySchemesCode', () => {
    it('should return empty string when no securitySchemes', () => {
      const components: Components = {}
      expect(securitySchemesCode(components, true)).toBe('')
    })

    it('should generate bearer auth security scheme with export', () => {
      const components: Components = {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      }
      const result = securitySchemesCode(components, true)
      expect(result).toBe(`export const BearerAuthSecurityScheme={"type":"http","scheme":"bearer"}`)
    })

    it('should generate security scheme without export', () => {
      const components: Components = {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'X-API-Key',
            in: 'header',
          },
        },
      }
      const result = securitySchemesCode(components, false)
      expect(result).toBe(
        `const ApiKeySecurityScheme={"type":"apiKey","name":"X-API-Key","in":"header"}`,
      )
    })
  })
}
