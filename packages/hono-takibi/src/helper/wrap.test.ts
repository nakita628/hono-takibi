import { describe, expect, it } from 'vite-plus/test'

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
      ).toBe('z.string().nullable().default("test")')
    })

    it.concurrent('marks schema as nullable and adds default when type includes null', () => {
      expect(
        wrap('z.string()', {
          type: ['string', 'null'],
          default: 'test',
        }),
      ).toBe('z.string().nullable().default("test")')
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
      ).toBe('z.number().nullable().default(0)')
    })

    it.concurrent('marks schema as nullable and adds default when type includes null', () => {
      expect(
        wrap('z.number()', {
          type: ['number', 'null'],
          default: 0,
        }),
      ).toBe('z.number().nullable().default(0)')
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
      ).toBe('z.int32().nullable().default(0)')
    })

    it.concurrent('marks schema as nullable and adds default for z.int32() when type includes null', () => {
      expect(
        wrap('z.int32()', {
          type: ['integer', 'null'],
          format: 'int32',
          default: 0,
        }),
      ).toBe('z.int32().nullable().default(0)')
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
      ).toBe('z.int64().nullable().default(0n)')
    })

    it.concurrent('handles default number and marks schema nullable when type includes null', () => {
      expect(
        wrap('z.int64()', {
          type: ['integer', 'null'],
          format: 'int64',
          default: 0,
        }),
      ).toBe('z.int64().nullable().default(0n)')
    })

    it.concurrent('uses BigInt default and adds .nullable for z.int64()', () => {
      expect(
        wrap('z.int64()', {
          type: 'integer',
          format: 'int64',
          default: 0,
          nullable: true,
        }),
      ).toBe('z.int64().nullable().default(0n)')
    })

    it.concurrent('uses BigInt default and marks schema nullable when type includes null', () => {
      expect(
        wrap('z.int64()', {
          type: ['integer', 'null'],
          format: 'int64',
          default: 0,
        }),
      ).toBe('z.int64().nullable().default(0n)')
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
      ).toBe('z.bigint().nullable().default(BigInt(0))')
    })

    it.concurrent('handles BigInt default and marks schema nullable when type includes null', () => {
      expect(
        wrap('z.bigint()', {
          type: ['integer', 'null'],
          format: 'bigint',
          default: 0,
        }),
      ).toBe('z.bigint().nullable().default(BigInt(0))')
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
      ).toBe('z.boolean().nullable().default(true)')
    })

    it.concurrent('marks schema as nullable and adds default when type includes null', () => {
      expect(
        wrap('z.boolean()', {
          type: ['boolean', 'null'],
          default: true,
        }),
      ).toBe('z.boolean().nullable().default(true)')
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
      { parameters: { name: 'x', in: 'header' } as any },
    )
    const expected = 'z.string().exactOptional().openapi({param:{"name":"x","in":"header"}})'
    expect(result).toBe(expected)
  })

  it('should return examples', () => {
    const result = wrap('z.string()', { type: 'string', examples: ['example1', 'example2'] } as any)
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

  describe('x-* vendor extensions excluded from .openapi()', () => {
    it.concurrent('should not include x-error-message in openapi()', () => {
      const result = wrap('z.email({error:"メール不正"})', {
        type: 'string',
        format: 'email',
        'x-error-message': 'メール不正',
        description: 'Email field',
      })
      expect(result).toBe('z.email({error:"メール不正"}).openapi({"description":"Email field"})')
    })

    it.concurrent('should not include x-size-message in openapi()', () => {
      const result = wrap('z.string().min(3,{error:"3-20文字"}).max(20,{error:"3-20文字"})', {
        type: 'string',
        minLength: 3,
        maxLength: 20,
        'x-size-message': '3-20文字',
      })
      expect(result).toBe('z.string().min(3,{error:"3-20文字"}).max(20,{error:"3-20文字"})')
    })

    it.concurrent('should not include x-pattern-message in openapi()', () => {
      const result = wrap('z.string().regex(/^[a-z]+$/,{error:"小文字のみ"})', {
        type: 'string',
        pattern: '^[a-z]+$',
        'x-pattern-message': '小文字のみ',
      })
      expect(result).toBe('z.string().regex(/^[a-z]+$/,{error:"小文字のみ"})')
    })

    it.concurrent('should not include x-minimum-message in openapi()', () => {
      const result = wrap('z.number().min(0,{error:"0以上"})', {
        type: 'number',
        minimum: 0,
        'x-minimum-message': '0以上',
      })
      expect(result).toBe('z.number().min(0,{error:"0以上"})')
    })

    it.concurrent('should not include x-maximum-message in openapi()', () => {
      const result = wrap('z.number().max(100,{error:"100以下"})', {
        type: 'number',
        maximum: 100,
        'x-maximum-message': '100以下',
      })
      expect(result).toBe('z.number().max(100,{error:"100以下"})')
    })

    it.concurrent('should not include any x-* messages in openapi() with description', () => {
      const result = wrap('z.number().min(0,{error:"0以上"}).max(100,{error:"100以下"})', {
        type: 'number',
        minimum: 0,
        maximum: 100,
        'x-minimum-message': '0以上',
        'x-maximum-message': '100以下',
        description: 'A number field',
      })
      expect(result).toBe(
        'z.number().min(0,{error:"0以上"}).max(100,{error:"100以下"}).openapi({"description":"A number field"})',
      )
    })
  })

  describe('unsupported properties filtering', () => {
    it.concurrent('should filter out contains property', () => {
      const schema = {
        type: 'array',
        items: { type: 'string' },
        contains: { type: 'number' },
        description: 'arr',
      } as unknown as Schema
      const result = wrap('z.array(z.string())', schema)
      expect(result).toBe('z.array(z.string()).openapi({"description":"arr"})')
    })

    it.concurrent('should filter out $schema property', () => {
      const schema = {
        type: 'string',
        $schema: 'http://json-schema.org/draft-07/schema#',
        description: 'test',
      } as unknown as Schema
      const result = wrap('z.string()', schema)
      expect(result).toBe('z.string().openapi({"description":"test"})')
    })

    it.concurrent('should filter out contentEncoding property', () => {
      const schema = {
        type: 'string',
        contentEncoding: 'base64',
        description: 'encoded',
      } as unknown as Schema
      const result = wrap('z.string()', schema)
      expect(result).toBe('z.string().openapi({"description":"encoded"})')
    })

    it.concurrent('should filter out if/then/else properties', () => {
      const schema = {
        type: 'object',
        if: { type: 'string' },
        // eslint-disable-next-line unicorn/no-thenable -- testing JSON Schema if/then/else filtering
        then: { minLength: 1 },
        else: { maxLength: 0 },
        description: 'conditional',
      } as unknown as Schema
      const result = wrap('z.object({})', schema)
      expect(result).toBe('z.object({}).openapi({"description":"conditional"})')
    })
  })

  describe('date type default', () => {
    it.concurrent('formats date default with new Date()', () => {
      const schema = { type: 'date', default: '2024-01-01' } as unknown as Schema
      expect(wrap('z.date()', schema)).toBe('z.date().default(new Date("2024-01-01"))')
    })
  })

  describe('header with style, explode, allowReserved', () => {
    it.concurrent('should handle header with style property', () => {
      const testHeader = { description: 'Styled header', required: true, style: 'simple' }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().openapi({description:"Styled header",style:"simple"})')
    })

    it.concurrent('should handle header with explode property', () => {
      const testHeader = { description: 'Exploded header', required: true, explode: true }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().openapi({description:"Exploded header",explode:true})')
    })

    it.concurrent('should handle header with allowReserved property', () => {
      const testHeader = { description: 'Reserved header', required: true, allowReserved: true }
      const result = wrap('z.string()', { type: 'string' }, { headers: testHeader })
      expect(result).toBe('z.string().openapi({description:"Reserved header",allowReserved:true})')
    })
  })

  describe('nullable with type null', () => {
    it.concurrent('should handle type null as standalone', () => {
      expect(wrap('z.null()', { type: 'null' })).toBe('z.null().nullable()')
    })
  })

  describe('items filtering', () => {
    it.concurrent('should filter out boolean items schema', () => {
      const schema = {
        type: 'array',
        items: true,
        description: 'Array with boolean items',
      } as unknown as Schema
      const result = wrap('z.array(z.string())', schema)
      expect(result).toBe('z.array(z.string()).openapi({"description":"Array with boolean items"})')
    })

    it.concurrent('should filter out array-type items (tuple items)', () => {
      const schema = {
        type: 'array',
        items: [{ type: 'string' }, { type: 'number' }],
        description: 'Tuple array',
      } as unknown as Schema
      const result = wrap('z.array(z.string())', schema)
      expect(result).toBe('z.array(z.string()).openapi({"description":"Tuple array"})')
    })
  })

  describe('not.not filtering', () => {
    it.concurrent('should filter out nested not.not with boolean value', () => {
      const schema = {
        type: 'string',
        not: { not: true },
        description: 'Schema with nested not',
      } as unknown as Schema
      const result = wrap('z.string()', schema)
      expect(result).toBe('z.string().openapi({"description":"Schema with nested not"})')
    })

    it.concurrent('should keep not.not when inner not is object (not boolean)', () => {
      // not is in zodExpressedProps so it's excluded from .openapi() args,
      // but the filterUnsupportedProps function still needs to handle non-boolean not.not
      const schema = {
        type: 'string',
        not: { not: { type: 'number' } },
        description: 'Schema with non-boolean nested not',
      } as unknown as Schema
      const result = wrap('z.string()', schema)
      // not is filtered by zodExpressedProps, only description remains
      expect(result).toBe(
        'z.string().openapi({"description":"Schema with non-boolean nested not"})',
      )
    })
  })

  describe('no openapi() when empty after filtering', () => {
    it.concurrent('should not add openapi() when all props are zodExpressed', () => {
      expect(
        wrap('z.string().min(1).max(10)', { type: 'string', minLength: 1, maxLength: 10 }),
      ).toBe('z.string().min(1).max(10)')
    })
  })

  describe('combined nullable + default + isOptional', () => {
    it.concurrent('should handle nullable + default + isOptional combined', () => {
      expect(
        wrap('z.string()', { type: 'string', nullable: true, default: 'hi' }, { isOptional: true }),
      ).toBe('z.string().nullable().default("hi").exactOptional()')
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
