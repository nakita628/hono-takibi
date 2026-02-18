import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { mediaTypesCode } from './mediaTypes.js'

describe('mediaTypesCode', () => {
  it('should return empty string when no mediaTypes', () => {
    const components: Components = {}
    expect(mediaTypesCode(components, true, false)).toBe('')
  })

  it('should return empty string when mediaTypes is empty object', () => {
    const components: Components = { mediaTypes: {} }
    expect(mediaTypesCode(components, true, false)).toBe('')
  })

  it('should generate media type schema with export', () => {
    const components: Components = {
      mediaTypes: {
        JsonMedia: {
          schema: { type: 'object', properties: { id: { type: 'integer' } } },
        },
      },
    }
    const result = mediaTypesCode(components, true, false)
    expect(result).toBe(
      'export const JsonMediaMediaTypeSchema=z.object({id:z.int().exactOptional()})',
    )
  })

  it('should generate media type schema without export', () => {
    const components: Components = {
      mediaTypes: {
        JsonMedia: {
          schema: { type: 'object', properties: { id: { type: 'integer' } } },
        },
      },
    }
    const result = mediaTypesCode(components, false, false)
    expect(result).toBe(
      'const JsonMediaMediaTypeSchema=z.object({id:z.int().exactOptional()})',
    )
  })

  it('should generate media type schema with type export', () => {
    const components: Components = {
      mediaTypes: {
        JsonMedia: {
          schema: { type: 'object', properties: { id: { type: 'integer' } } },
        },
      },
    }
    const result = mediaTypesCode(components, true, true)
    expect(result).toBe(
      `export const JsonMediaMediaTypeSchema=z.object({id:z.int().exactOptional()})\n\nexport type JsonMediaMediaType=z.infer<typeof JsonMediaMediaTypeSchema>`,
    )
  })

  it('should generate media type schema with readonly', () => {
    const components: Components = {
      mediaTypes: {
        JsonMedia: {
          schema: { type: 'object', properties: { id: { type: 'integer' } } },
        },
      },
    }
    const result = mediaTypesCode(components, true, false, true)
    expect(result).toBe(
      'export const JsonMediaMediaTypeSchema=z.object({id:z.int().exactOptional()}).readonly()',
    )
  })

  it('should generate multiple media type schemas', () => {
    const components: Components = {
      mediaTypes: {
        JsonMedia: {
          schema: { type: 'object', properties: { id: { type: 'integer' } } },
        },
        XmlMedia: {
          schema: { type: 'string' },
        },
      },
    }
    const result = mediaTypesCode(components, true, false)
    expect(result).toBe(
      `export const JsonMediaMediaTypeSchema=z.object({id:z.int().exactOptional()})\n\nexport const XmlMediaMediaTypeSchema=z.string()`,
    )
  })

  it('should skip non-media entries', () => {
    const components: Components = {
      mediaTypes: {
        NoSchema: { encoding: {} },
      },
    }
    const result = mediaTypesCode(components, true, false)
    expect(result).toBe('')
  })
})
