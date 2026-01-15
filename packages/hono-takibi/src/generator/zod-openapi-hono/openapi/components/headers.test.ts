import { describe, expect, it } from 'vitest'
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
})
