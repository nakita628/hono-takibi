import { describe, expect, it } from 'vitest'
import { wrap } from './wrap'

// Test run
// pnpm vitest run ./src/helper/wrap.test.ts

describe('wrap', () => {
  describe('string', () => {
    it.concurrent(
      'adds .default and .nullable for z.string() when default and nullable=true',
      () => {
        expect(
          wrap('z.string()', {
            type: 'string',
            default: 'test',
            nullable: true,
          }),
        ).toBe(`z.string().default("test").nullable()`)
      },
    )

    it.concurrent('marks schema as nullable and adds default when type includes null', () => {
      expect(
        wrap('z.string()', {
          type: ['string', 'null'],
          default: 'test',
        }),
      ).toBe(`z.string().default("test").nullable()`)
    })
  })

  describe('number', () => {
    it.concurrent(
      'adds .default and .nullable for z.number() when default and nullable=true',
      () => {
        expect(
          wrap('z.number()', {
            type: 'number',
            default: 0,
            nullable: true,
          }),
        ).toBe('z.number().default(0).nullable()')
      },
    )

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
    it.concurrent(
      'adds .default and .nullable for z.int32() with format int32 when default and nullable=true',
      () => {
        expect(
          wrap('z.int32()', {
            type: 'integer',
            format: 'int32',
            default: 0,
            nullable: true,
          }),
        ).toBe('z.int32().default(0).nullable()')
      },
    )

    it.concurrent(
      'marks schema as nullable and adds default for z.int32() when type includes null',
      () => {
        expect(
          wrap('z.int32()', {
            type: ['integer', 'null'],
            format: 'int32',
            default: 0,
          }),
        ).toBe('z.int32().default(0).nullable()')
      },
    )
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

    it.concurrent(
      'handles default number and marks schema nullable when type includes null',
      () => {
        expect(
          wrap('z.int64()', {
            type: ['integer', 'null'],
            format: 'int64',
            default: 0,
          }),
        ).toBe('z.int64().default(0n).nullable()')
      },
    )

    it.concurrent('uses BigInt default and adds .nullable for z.int64()', () => {
      expect(
        wrap('z.int64()', {
          type: 'integer',
          format: 'int64',
          default: 0n,
          nullable: true,
        }),
      ).toBe('z.int64().default(0n).nullable()')
    })

    it.concurrent('uses BigInt default and marks schema nullable when type includes null', () => {
      expect(
        wrap('z.int64()', {
          type: ['integer', 'null'],
          format: 'int64',
          default: 0n,
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
          default: 0n,
          nullable: true,
        }),
      ).toBe('z.bigint().default(0n).nullable()')
    })

    it.concurrent(
      'handles BigInt default and marks schema nullable when type includes null',
      () => {
        expect(
          wrap('z.bigint()', {
            type: ['integer', 'null'],
            format: 'bigint',
            default: 0n,
          }),
        ).toBe('z.bigint().default(0n).nullable()')
      },
    )
  })

  describe('boolean', () => {
    it.concurrent(
      'adds .default and .nullable for z.boolean() when default and nullable=true',
      () => {
        expect(
          wrap('z.boolean()', {
            type: 'boolean',
            default: true,
            nullable: true,
          }),
        ).toBe('z.boolean().default(true).nullable()')
      },
    )

    it.concurrent('marks schema as nullable and adds default when type includes null', () => {
      expect(
        wrap('z.boolean()', {
          type: ['boolean', 'null'],
          default: true,
        }),
      ).toBe('z.boolean().default(true).nullable()')
    })
  })
})
