import { describe, expect, it } from 'vitest'
import { wrap } from './wrap'

// Test run
// pnpm vitest run ./src/helper/wrap.test.ts

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
    // biome-ignore lint: test
    const result = wrap('z.string()', { type: 'string', examples: ['example1', 'example2'] } as any)
    const expected = 'z.string().openapi({"examples":["example1","example2"]})'
    expect(result).toBe(expected)
  })
})
