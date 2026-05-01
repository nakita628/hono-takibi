import { describe, expect, it } from 'vite-plus/test'

import type { Components } from '../../../../openapi/index.js'
import { securitySchemesCode } from './securitySchemes.js'

describe('securitySchemesCode', () => {
  it.concurrent('should return empty string when no securitySchemes', () => {
    const components: Components = {}
    expect(securitySchemesCode(components, true)).toBe('')
  })

  it.concurrent('should return empty string when securitySchemes is empty object', () => {
    const components: Components = { securitySchemes: {} }
    expect(securitySchemesCode(components, true)).toBe('')
  })

  it.concurrent('should generate bearer auth security scheme with export', () => {
    const components: Components = {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer' },
      },
    }
    expect(securitySchemesCode(components, true)).toBe(
      `export const BearerAuthSecurityScheme={"type":"http","scheme":"bearer"}`,
    )
  })

  it.concurrent('should generate security scheme without export', () => {
    const components: Components = {
      securitySchemes: {
        apiKey: { type: 'apiKey', name: 'X-API-Key', in: 'header' },
      },
    }
    expect(securitySchemesCode(components, false)).toBe(
      `const ApiKeySecurityScheme={"type":"apiKey","name":"X-API-Key","in":"header"}`,
    )
  })

  it.concurrent('should append "as const" when readonly is true', () => {
    const components: Components = {
      securitySchemes: { bearer: { type: 'http', scheme: 'bearer' } },
    }
    expect(securitySchemesCode(components, true, true)).toBe(
      `export const BearerSecurityScheme={"type":"http","scheme":"bearer"} as const`,
    )
  })

  it.concurrent('should generate multiple schemes separated by double newline', () => {
    const components: Components = {
      securitySchemes: {
        bearer: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        apiKey: { type: 'apiKey', name: 'X-API-Key', in: 'header' },
      },
    }
    expect(securitySchemesCode(components, true)).toBe(
      `export const BearerSecurityScheme={"type":"http","scheme":"bearer","bearerFormat":"JWT"}\n\nexport const ApiKeySecurityScheme={"type":"apiKey","name":"X-API-Key","in":"header"}`,
    )
  })

  it.concurrent('should preserve oauth2 flows with scopes', () => {
    const components: Components = {
      securitySchemes: {
        oauth2Auth: {
          type: 'oauth2',
          flows: {
            implicit: {
              authorizationUrl: 'https://example.com/oauth/authorize',
              scopes: { read: 'Read', write: 'Write' },
            },
          },
        },
      },
    }
    expect(securitySchemesCode(components, true)).toBe(
      `export const Oauth2AuthSecurityScheme={"type":"oauth2","flows":{"implicit":{"authorizationUrl":"https://example.com/oauth/authorize","scopes":{"read":"Read","write":"Write"}}}}`,
    )
  })

  it.concurrent('should preserve openIdConnect scheme', () => {
    const components: Components = {
      securitySchemes: {
        oidc: {
          type: 'openIdConnect',
          openIdConnectUrl: 'https://example.com/.well-known/openid-configuration',
        },
      },
    }
    expect(securitySchemesCode(components, true)).toBe(
      `export const OidcSecurityScheme={"type":"openIdConnect","openIdConnectUrl":"https://example.com/.well-known/openid-configuration"}`,
    )
  })

  it.concurrent('should preserve mutualTLS scheme with description', () => {
    const components: Components = {
      securitySchemes: {
        mtls: { type: 'mutualTLS', description: 'mTLS auth' },
      },
    }
    expect(securitySchemesCode(components, true)).toBe(
      `export const MtlsSecurityScheme={"type":"mutualTLS","description":"mTLS auth"}`,
    )
  })

  it.concurrent('should preserve description on http basic scheme', () => {
    const components: Components = {
      securitySchemes: {
        basic: { type: 'http', scheme: 'basic', description: 'Basic auth required' },
      },
    }
    expect(securitySchemesCode(components, true)).toBe(
      `export const BasicSecurityScheme={"type":"http","scheme":"basic","description":"Basic auth required"}`,
    )
  })
})
