import { describe, expect, it } from 'vite-plus/test'

import type { Components } from '../../../../openapi/index.js'
import { headersCode } from './headers.js'

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

  it('should handle $ref header with export', () => {
    const components: Components = {
      headers: {
        XCustom: {
          $ref: '#/components/headers/XRateLimit',
        },
      },
    }
    const result = headersCode(components, true, false)
    expect(result).toBe('export const XCustomHeaderSchema=XRateLimitHeaderSchema')
  })

  it('should handle $ref header without export', () => {
    const components: Components = {
      headers: {
        XCustom: {
          $ref: '#/components/headers/XRateLimit',
        },
      },
    }
    const result = headersCode(components, false, false)
    expect(result).toBe('const XCustomHeaderSchema=XRateLimitHeaderSchema')
  })

  it('should handle $ref header with export and type', () => {
    const components: Components = {
      headers: {
        XCustom: {
          $ref: '#/components/headers/XRateLimit',
        },
      },
    }
    const result = headersCode(components, true, true)
    expect(result).toBe(
      `export const XCustomHeaderSchema=XRateLimitHeaderSchema

export type XCustomHeader=z.infer<typeof XCustomHeaderSchema>`,
    )
  })

  it('should handle $ref header with readonly', () => {
    const components: Components = {
      headers: {
        XCustom: {
          $ref: '#/components/headers/XRateLimit',
        },
      },
    }
    const result = headersCode(components, true, false, true)
    expect(result).toBe('export const XCustomHeaderSchema=XRateLimitHeaderSchema.readonly()')
  })

  it('should handle header with content', () => {
    const components: Components = {
      headers: {
        XMeta: {
          content: {
            'application/json': {
              schema: { type: 'string' },
            },
          },
        },
      },
    }
    const result = headersCode(components, true, false)
    expect(result).toBe(`export const XMetaHeaderSchema={'application/json':{schema:z.string()}}`)
  })

  it('should handle header with content and type export', () => {
    const components: Components = {
      headers: {
        XMeta: {
          content: {
            'application/json': {
              schema: { type: 'string' },
            },
          },
        },
      },
    }
    const result = headersCode(components, true, true)
    expect(result).toBe(
      `export const XMetaHeaderSchema={'application/json':{schema:z.string()}}

export type XMetaHeader=z.infer<typeof XMetaHeaderSchema>`,
    )
  })

  it('should handle header with content and readonly', () => {
    const components: Components = {
      headers: {
        XMeta: {
          content: {
            'application/json': {
              schema: { type: 'string' },
            },
          },
        },
      },
    }
    const result = headersCode(components, true, false, true)
    expect(result).toBe(
      `export const XMetaHeaderSchema={'application/json':{schema:z.string()}}.readonly()`,
    )
  })

  it('should generate header with schema and readonly', () => {
    const components: Components = {
      headers: {
        XRequestId: {
          schema: { type: 'string' },
        },
      },
    }
    const result = headersCode(components, true, false, true)
    expect(result).toBe('export const XRequestIdHeaderSchema=z.string().exactOptional().readonly()')
  })

  it('should generate multiple headers in single call', () => {
    const components: Components = {
      headers: {
        XRequestId: {
          schema: { type: 'string' },
        },
        XRateLimit: {
          schema: { type: 'integer' },
        },
      },
    }
    const result = headersCode(components, true, false)
    expect(result).toBe(
      `export const XRequestIdHeaderSchema=z.string().exactOptional()

export const XRateLimitHeaderSchema=z.int().exactOptional()`,
    )
  })

  it('should generate multiple headers with export and type', () => {
    const components: Components = {
      headers: {
        XRequestId: {
          schema: { type: 'string' },
        },
        XRateLimit: {
          schema: { type: 'integer' },
        },
      },
    }
    const result = headersCode(components, true, true)
    expect(result).toBe(
      `export const XRequestIdHeaderSchema=z.string().exactOptional()

export type XRequestIdHeader=z.infer<typeof XRequestIdHeaderSchema>

export const XRateLimitHeaderSchema=z.int().exactOptional()

export type XRateLimitHeader=z.infer<typeof XRateLimitHeaderSchema>`,
    )
  })
})
