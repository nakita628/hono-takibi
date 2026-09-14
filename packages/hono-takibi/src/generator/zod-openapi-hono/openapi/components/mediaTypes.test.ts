import { describe, expect, it } from 'vite-plus/test'

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
      'export const JsonMediaMediaTypeSchema=z.object({id:z.int().exactOptional()}).openapi({"required":[]})',
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
      'const JsonMediaMediaTypeSchema=z.object({id:z.int().exactOptional()}).openapi({"required":[]})',
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
      'export const JsonMediaMediaTypeSchema=z.object({id:z.int().exactOptional()}).openapi({"required":[]})\n\nexport type JsonMediaMediaType=z.infer<typeof JsonMediaMediaTypeSchema>',
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
      'export const JsonMediaMediaTypeSchema=z.object({id:z.int().exactOptional()}).openapi({"required":[]}).readonly()',
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
      'export const JsonMediaMediaTypeSchema=z.object({id:z.int().exactOptional()}).openapi({"required":[]})\n\nexport const XmlMediaMediaTypeSchema=z.string()',
    )
  })

  it('should alias a $ref entry to the media type it names', () => {
    const components: Components = {
      mediaTypes: {
        LegacyMedia: { $ref: '#/components/mediaTypes/JsonMedia' },
      },
    }
    const result = mediaTypesCode(components, true, true)
    expect(result).toBe(
      'export const LegacyMediaMediaTypeSchema=JsonMediaMediaTypeSchema\n\nexport type LegacyMediaMediaType=z.infer<typeof LegacyMediaMediaTypeSchema>',
    )
  })

  it('should emit z.unknown() for an entry without a body schema', () => {
    const components: Components = {
      mediaTypes: {
        EventStream: { itemSchema: { type: 'string' } } as any,
        NoSchema: { encoding: {} } as any,
      },
    }
    const result = mediaTypesCode(components, true, false)
    expect(result).toBe(
      'export const EventStreamMediaTypeSchema=z.unknown()\n\nexport const NoSchemaMediaTypeSchema=z.unknown()',
    )
  })
})
