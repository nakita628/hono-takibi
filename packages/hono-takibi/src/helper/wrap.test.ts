import { describe, expect, it } from 'vitest'
import type { Header, Parameter, Schema } from '../openapi/index.js'
import { wrap } from './wrap.js'

describe('wrap', () => {
  describe('string', () => {
    it.concurrent('adds .default and .nullable for z.string() when default and nullable=true', () => {
      expect(
        wrap('z.string()', {
          type: 'string',
          default: 'test',
          nullable: true,
        }),
      ).toBe('z.string().default("test").nullable()')
    })

    it.concurrent('marks schema as nullable and adds default when type includes null', () => {
      expect(
        wrap('z.string()', {
          type: ['string', 'null'],
          default: 'test',
        }),
      ).toBe('z.string().default("test").nullable()')
    })
  })

  describe('number', () => {
    it.concurrent('adds .default and .nullable for z.number() when default and nullable=true', () => {
      expect(
        wrap('z.number()', {
          type: 'number',
          default: 0,
          nullable: true,
        }),
      ).toBe('z.number().default(0).nullable()')
    })

    it.concurrent('marks schema as nullable and adds default when type includes null', () => {
      expect(
        wrap('z.number()', {
          type: ['number', 'null'],
          default: 0,
        }),
      ).toBe('z.number().default(0).nullable()')
    })
  })

  describe('int32', () => {
    it.concurrent('adds .default and .nullable for z.int32() with format int32 when default and nullable=true', () => {
      expect(
        wrap('z.int32()', {
          type: 'integer',
          format: 'int32',
          default: 0,
          nullable: true,
        }),
      ).toBe('z.int32().default(0).nullable()')
    })

    it.concurrent('marks schema as nullable and adds default for z.int32() when type includes null', () => {
      expect(
        wrap('z.int32()', {
          type: ['integer', 'null'],
          format: 'int32',
          default: 0,
        }),
      ).toBe('z.int32().default(0).nullable()')
    })
  })

  describe('int64', () => {
    it.concurrent('converts default number to BigInt and adds .nullable for z.int64()', () => {
      expect(
        wrap('z.int64()', {
          type: 'integer',
          format: 'int64',
          default: 0,
          nullable: true,
        }),
      ).toBe('z.int64().default(0n).nullable()')
    })

    it.concurrent('handles default number and marks schema nullable when type includes null', () => {
      expect(
        wrap('z.int64()', {
          type: ['integer', 'null'],
          format: 'int64',
          default: 0,
        }),
      ).toBe('z.int64().default(0n).nullable()')
    })

    it.concurrent('uses BigInt default and adds .nullable for z.int64()', () => {
      expect(
        wrap('z.int64()', {
          type: 'integer',
          format: 'int64',
          default: 0,
          nullable: true,
        }),
      ).toBe('z.int64().default(0n).nullable()')
    })

    it.concurrent('uses BigInt default and marks schema nullable when type includes null', () => {
      expect(
        wrap('z.int64()', {
          type: ['integer', 'null'],
          format: 'int64',
          default: 0,
        }),
      ).toBe('z.int64().default(0n).nullable()')
    })
  })

  describe('bigint', () => {
    it.concurrent('adds .default with BigInt and .nullable for z.bigint()', () => {
      expect(
        wrap('z.bigint()', {
          type: 'integer',
          format: 'bigint',
          default: 0,
          nullable: true,
        }),
      ).toBe('z.bigint().default(BigInt(0)).nullable()')
    })

    it.concurrent('handles BigInt default and marks schema nullable when type includes null', () => {
      expect(
        wrap('z.bigint()', {
          type: ['integer', 'null'],
          format: 'bigint',
          default: 0,
        }),
      ).toBe('z.bigint().default(BigInt(0)).nullable()')
    })
  })

  describe('boolean', () => {
    it.concurrent('adds .default and .nullable for z.boolean() when default and nullable=true', () => {
      expect(
        wrap('z.boolean()', {
          type: 'boolean',
          default: true,
          nullable: true,
        }),
      ).toBe('z.boolean().default(true).nullable()')
    })

    it.concurrent('marks schema as nullable and adds default when type includes null', () => {
      expect(
        wrap('z.boolean()', {
          type: ['boolean', 'null'],
          default: true,
        }),
      ).toBe('z.boolean().default(true).nullable()')
    })
  })

  it('zodToOpenAPI not exists openapi()', () => {
    const result = wrap('z.string()', { type: 'string' })
    const expected = 'z.string()'
    expect(result).toBe(expected)
  })

  it('should include only example and description in order', () => {
    const result = wrap('z.string()', {
      type: 'string',
      example: 'hello',
      description: 'Example string',
    })
    const expected = 'z.string().openapi({"example":"hello","description":"Example string"})'
    expect(result).toBe(expected)
  })

  it('should insert param first when param info is provided', () => {
    const result = wrap(
      'z.string()',
      {
        type: 'string',
        example: 'uuid-example',
        description: 'UUID parameter',
      },
      {
        parameters: {
          name: 'id',
          in: 'path',
          // biome-ignore lint: test
        } as any,
      },
    )
    const expected =
      'z.string().exactOptional().openapi({param:{"name":"id","in":"path"},"example":"uuid-example","description":"UUID parameter"})'
    expect(result).toBe(expected)
  })

  it('should handle non-required query param correctly', () => {
    const result = wrap(
      'z.string()',
      {
        type: 'string',
        example: 'query-value',
        description: 'Optional query parameter',
      },
      {
        parameters: {
          name: 'q',
          in: 'query',
          // biome-ignore lint: test
        } as any,
      },
    )
    const expected =
      'z.string().exactOptional().openapi({param:{"name":"q","in":"query"},"example":"query-value","description":"Optional query parameter"})'
    expect(result).toBe(expected)
  })

  it('should handle non-required query param correctly when required is true', () => {
    const result = wrap(
      'z.string()',
      {
        type: 'string',
        example: 'query-value',
        description: 'Optional query parameter',
      },
      {
        parameters: {
          name: 'q',
          in: 'query',
          required: true,
          // biome-ignore lint: test
        } as any,
      },
    )
    const expected =
      'z.string().openapi({param:{"name":"q","in":"query","required":true},"example":"query-value","description":"Optional query parameter"})'
    expect(result).toBe(expected)
  })

  it('should insert only param if no example or description is given', () => {
    const result = wrap(
      'z.string()',
      { type: 'string' },
      // biome-ignore lint: test
      { parameters: { name: 'x', in: 'header' } as any },
    )
    const expected = 'z.string().exactOptional().openapi({param:{"name":"x","in":"header"}})'
    expect(result).toBe(expected)
  })

  it('should return examples', () => {
    const result = wrap(
      'z.string()',
      // biome-ignore lint/suspicious/noExplicitAny: test data
      { type: 'string', examples: ['example1', 'example2'] } as any,
    )
    const expected = 'z.string().openapi({"examples":["example1","example2"]})'
    expect(result).toBe(expected)
  })

  it('should resolve $ref in parameter examples', () => {
    const testParameter: Parameter = {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      examples: {
        laptop: { $ref: '#/components/examples/LaptopId' },
        tshirt: { value: 'tshirt-123' },
      },
    }
    const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
    const expected =
      'z.string().openapi({param:{"name":"id","in":"path","required":true,"schema":{"type":"string"},"examples":{"laptop":LaptopIdExample,"tshirt":{value:"tshirt-123"}}}})'
    expect(result).toBe(expected)
  })

  it('should handle Unicode characters in parameter examples', () => {
    const testParameter: Parameter = {
      name: 'filter',
      in: 'query',
      required: false,
      schema: { type: 'string' },
      examples: {
        japanese: { value: '日本語テスト' },
        emoji: { value: '🔥炎のテスト🔥' },
      },
    }
    const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
    const expected =
      'z.string().exactOptional().openapi({param:{"name":"filter","in":"query","required":false,"schema":{"type":"string"},"examples":{"japanese":{value:"日本語テスト"},"emoji":{value:"🔥炎のテスト🔥"}}}})'
    expect(result).toBe(expected)
  })

  it('should handle content with examples containing Unicode', () => {
    const testParameter: Parameter = {
      name: 'filter',
      in: 'query',
      required: false,
      schema: { type: 'object' },
      content: {
        'application/json': {
          schema: { type: 'object' },
          examples: {
            japanese: { value: { name: '田中太郎', description: '参照地獄テスト' } },
          },
        },
      },
    }
    const result = wrap('z.object({})', { type: 'object' }, { parameters: testParameter })
    const expected =
      'z.object({}).exactOptional().openapi({param:{"name":"filter","in":"query","required":false,"schema":{"type":"object"},"content":{"application/json":{"schema":{"type":"object"},"examples":{"japanese":{value:{"name":"田中太郎","description":"参照地獄テスト"}}}}}}})'
    expect(result).toBe(expected)
  })

  describe('headers with required', () => {
    it.concurrent('should not add .exactOptional() when header required is true', () => {
      const testHeader: Header = {
        description: 'Authorization header',
        required: true,
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().openapi({description:"Authorization header"})')
    })

    it.concurrent('should add .exactOptional() when header required is false', () => {
      const testHeader: Header = {
        description: 'Optional header',
        required: false,
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().exactOptional().openapi({description:"Optional header"})')
    })

    it.concurrent('should add .exactOptional() when header required is undefined', () => {
      const testHeader: Header = {
        description: 'Header without required',
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe(
        'z.string().exactOptional().openapi({description:"Header without required"})',
      )
    })

    it.concurrent('should handle header with deprecated', () => {
      const testHeader: Header = {
        description: 'Deprecated header',
        required: true,
        deprecated: true,
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().openapi({description:"Deprecated header",deprecated:true})')
    })

    it.concurrent('should handle header with example', () => {
      const testHeader: Header = {
        description: 'Header with example',
        required: false,
        example: 'Bearer token123',
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe(
        'z.string().exactOptional().openapi({description:"Header with example",example:"Bearer token123"})',
      )
    })

    it.concurrent('should handle header with no openapi props when required is true', () => {
      const testHeader: Header = {
        required: true,
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string()')
    })

    it.concurrent('should handle header with no openapi props when required is false', () => {
      const testHeader: Header = {
        required: false,
      }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().exactOptional()')
    })
  })

  describe('isOptional', () => {
    it.concurrent('should add .exactOptional() when isOptional is true', () => {
      const result = wrap('z.string()', { type: 'string' }, { isOptional: true })
      expect(result).toBe('z.string().exactOptional()')
    })

    it.concurrent('should add .exactOptional() with openapi props when isOptional is true', () => {
      const result = wrap(
        'z.string()',
        { type: 'string', description: 'Optional field' },
        { isOptional: true },
      )
      expect(result).toBe('z.string().exactOptional().openapi({"description":"Optional field"})')
    })

    it.concurrent('should not add .exactOptional() when isOptional is false', () => {
      const result = wrap('z.string()', { type: 'string' }, { isOptional: false })
      expect(result).toBe('z.string()')
    })

    it.concurrent('should not add .exactOptional() when isOptional is undefined', () => {
      const result = wrap('z.string()', { type: 'string' }, {})
      expect(result).toBe('z.string()')
    })

    it.concurrent('should handle isOptional with default value', () => {
      const result = wrap(
        'z.string()',
        { type: 'string', default: 'default-value' },
        { isOptional: true },
      )
      expect(result).toBe('z.string().default("default-value").exactOptional()')
    })

    it.concurrent('should handle isOptional with nullable', () => {
      const result = wrap('z.string()', { type: 'string', nullable: true }, { isOptional: true })
      expect(result).toBe('z.string().nullable().exactOptional()')
    })
  })

  describe('schema.required array', () => {
    it.concurrent('should pass through required array of strings', () => {
      const schema: Schema = {
        type: 'object',
        required: ['name', 'email'],
        description: 'User object',
      }
      const result = wrap('z.object({})', schema)
      expect(result).toBe(
        'z.object({}).openapi({"required":["name","email"],"description":"User object"})',
      )
    })

    it.concurrent('should convert non-string values in required array to strings', () => {
      const schema = {
        type: 'object',
        // YAML may parse `null`, `true`, `false` as literal values in required array
        required: ['name', null, true, false, 'email'],
        description: 'Schema with mixed required values',
      } as unknown as Schema
      const result = wrap('z.object({})', schema)
      expect(result).toBe(
        'z.object({}).openapi({"required":["name","null","true","false","email"],"description":"Schema with mixed required values"})',
      )
    })

    it.concurrent('should handle empty required array', () => {
      const schema: Schema = {
        type: 'object',
        required: [],
        description: 'Object with empty required',
      }
      const result = wrap('z.object({})', schema)
      expect(result).toBe(
        'z.object({}).openapi({"required":[],"description":"Object with empty required"})',
      )
    })

    it.concurrent('should exclude boolean required from baseArgs', () => {
      const schema = {
        type: 'string',
        required: true,
        description: 'Field with boolean required',
      } as unknown as Schema
      const result = wrap('z.string()', schema)
      // Boolean required should be filtered out, only description remains
      expect(result).toBe('z.string().openapi({"description":"Field with boolean required"})')
    })
  })

  describe('parameters required combinations', () => {
    it.concurrent('should handle path parameter (always required implicitly)', () => {
      const testParameter: Parameter = {
        name: 'userId',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      }
      const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
      expect(result).toBe(
        'z.string().openapi({param:{"name":"userId","in":"path","required":true,"schema":{"type":"string"}}})',
      )
    })

    it.concurrent('should handle query parameter with required true', () => {
      const testParameter: Parameter = {
        name: 'page',
        in: 'query',
        required: true,
        schema: { type: 'integer' },
      }
      const result = wrap('z.number()', { type: 'integer' }, { parameters: testParameter })
      expect(result).toBe(
        'z.number().openapi({param:{"name":"page","in":"query","required":true,"schema":{"type":"integer"}}})',
      )
    })

    it.concurrent('should handle query parameter with required false', () => {
      const testParameter: Parameter = {
        name: 'limit',
        in: 'query',
        required: false,
        schema: { type: 'integer' },
      }
      const result = wrap('z.number()', { type: 'integer' }, { parameters: testParameter })
      expect(result).toBe(
        'z.number().exactOptional().openapi({param:{"name":"limit","in":"query","required":false,"schema":{"type":"integer"}}})',
      )
    })

    it.concurrent('should handle cookie parameter without required', () => {
      const testParameter: Parameter = {
        name: 'sessionId',
        in: 'cookie',
        schema: { type: 'string' },
      }
      const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
      expect(result).toBe(
        'z.string().exactOptional().openapi({param:{"name":"sessionId","in":"cookie","schema":{"type":"string"}}})',
      )
    })

    it.concurrent('should handle header parameter with required true', () => {
      const testParameter: Parameter = {
        name: 'X-Request-ID',
        in: 'header',
        required: true,
        schema: { type: 'string' },
      }
      const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
      expect(result).toBe(
        'z.string().openapi({param:{"name":"X-Request-ID","in":"header","required":true,"schema":{"type":"string"}}})',
      )
    })
  })
})
