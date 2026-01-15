import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { securitySchemesCode } from './securitySchemes.js'

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
