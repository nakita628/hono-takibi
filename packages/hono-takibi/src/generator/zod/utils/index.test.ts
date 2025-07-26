import { describe, expect, it } from 'vitest'
import {
  _default,
  array,
  coerce,
  gt,
  intersection,
  length,
  lt,
  max,
  min,
  partial,
  regex,
  schema,
  stringbool,
  stripMaxIfLtExist,
  stripMinIfgtExist,
  stripMinMaxExist,
  union,
} from '.'

// Test run
// pnpm vitest run ./src/generator/zod/pure/index.test.ts

describe('utils', () => {
  // stripMaxIfLtExist
  describe('stripMaxIfLtExist', () => {
    it.concurrent(`stripMaxIfLtExist('z.number().max(1).lt(1)', 1) -> 'z.number().lt(1)'`, () => {
      const result = stripMaxIfLtExist('z.number().max(1).lt(1)', 1)
      const expected = 'z.number().lt(1)'
      expect(result).toBe(expected)
    })
  })

  // stripMinIfgtExist
  describe('stripMinIfgtExist', () => {
    it.concurrent(`stripMinIfgtExist('z.number().min(1).gt(1)', 1) -> 'z.number().gt(1)'`, () => {
      const result = stripMinIfgtExist('z.number().min(1).gt(1)', 1)
      const expected = 'z.number().gt(1)'
      expect(result).toBe(expected)
    })
  })

  // stripMinMaxExist
  describe('stripMinMaxExist', () => {
    it.concurrent(`stripMinMaxExist('z.string().min(1).max(1)', 1, 1) -> 'z.string()'`, () => {
      const result = stripMinMaxExist('z.string().min(1).max(1)', 1, 1)
      const expected = 'z.string()'
      expect(result).toBe(expected)
    })
  })

  // array
  describe('array', () => {
    it.concurrent(`array('Test') -> z.array(Test)`, () => {
      const result = array('Test')
      const expected = 'z.array(Test)'
      expect(result).toBe(expected)
    })

    it.concurrent(`array('z.string()') -> z.array(z.string())`, () => {
      const result = array('z.string()')
      const expected = 'z.array(z.string())'
      expect(result).toBe(expected)
    })

    it.concurrent(
      `array('z.object({ name: z.string() })') -> z.array(z.object({ name: z.string() }))`,
      () => {
        const result = array('z.object({ name: z.string() })')
        const expected = 'z.array(z.object({ name: z.string() }))'
        expect(result).toBe(expected)
      },
    )
  })

  // coerce
  describe('coerce', () => {
    it.concurrent(`coerce('z.number()') -> z.coerce.number())`, () => {
      const result = coerce('z.number()')
      const expected = 'z.coerce.number()'
      expect(result).toBe(expected)
    })

    it.concurrent(`coerce('z.number().min(1)') -> z.coerce.number().min(1))`, () => {
      const result = coerce('z.number().min(1)')
      const expected = 'z.coerce.number().min(1)'
      expect(result).toBe(expected)
    })

    it.concurrent(`coerce('z.number().max(10)') -> z.coerce.number().max(10))`, () => {
      const result = coerce('z.number().max(10)')
      const expected = 'z.coerce.number().max(10)'
      expect(result).toBe(expected)
    })
  })

  // _default
  describe('_default Test', () => {
    it.concurrent('_default(1) -> .default(1)', () => {
      const result = _default(1)
      const expected = '.default(1)'
      expect(result).toBe(expected)
    })

    it.concurrent('_default(10) -> .default(10)', () => {
      const result = _default(10)
      const expected = '.default(10)'
      expect(result).toBe(expected)
    })
  })

  // gt
  describe('gt', () => {
    it.concurrent('gt(0) -> .gt(0)', () => {
      const result = gt(0)
      const expected = '.gt(0)'
      expect(result).toBe(expected)
    })

    it.concurrent('gt(10) -> .gt(10)', () => {
      const result = gt(10)
      const expected = '.gt(10)'
      expect(result).toBe(expected)
    })

    it.concurrent('gt(100) -> .gt(100)', () => {
      const result = gt(100)
      const expected = '.gt(100)'
      expect(result).toBe(expected)
    })
  })

  // intersection
  describe('intersection', () => {
    it.concurrent(
      `intersection(['TestSchema', 'z.object({type:z.enum(["A","B","C"])})']) -> z.intersection(TestSchema,z.object({type:z.enum(["A","B","C"])}))`,
      () => {
        const result = intersection(['TestSchema', 'z.object({type:z.enum(["A","B","C"])})'])
        const expected = 'z.intersection(TestSchema,z.object({type:z.enum(["A","B","C"])}))'
        expect(result).toBe(expected)
      },
    )
  })

  // length
  describe('length', () => {
    it.concurrent('length(1) -> .length(1)', () => {
      const result = length(1)
      const expected = '.length(1)'
      expect(result).toBe(expected)
    })

    it.concurrent('length(10) -> .length(10)', () => {
      const result = length(10)
      const expected = '.length(10)'
      expect(result).toBe(expected)
    })

    it.concurrent('length(100) -> .length(100)', () => {
      const result = length(100)
      const expected = '.length(100)'
      expect(result).toBe(expected)
    })
  })

  // lt
  describe('lt', () => {
    it.concurrent('lt(1) -> .lt(1)', () => {
      const result = lt(1)
      const expected = '.lt(1)'
      expect(result).toBe(expected)
    })

    it.concurrent('lt(10) -> .lt(10)', () => {
      const result = lt(10)
      const expected = '.lt(10)'
      expect(result).toBe(expected)
    })
  })

  // max
  describe('max', () => {
    it.concurrent('max(1) -> .max(1)', () => {
      const result = max(1)
      const expected = '.max(1)'
      expect(result).toBe(expected)
    })

    it.concurrent('max(10) -> .max(10)', () => {
      const result = max(10)
      const expected = '.max(10)'
      expect(result).toBe(expected)
    })
  })

  // min
  describe('min', () => {
    it.concurrent('min(1) -> .min(1)', () => {
      const result = min(1)
      const expected = '.min(1)'
      expect(result).toBe(expected)
    })

    it.concurrent('min(10) -> .min(10)', () => {
      const result = min(10)
      const expected = '.min(10)'
      expect(result).toBe(expected)
    })
  })

  // partial
  describe('partial', () => {
    it.concurrent(
      `partial(['test:z.string().optional()']) -> z.object({test:z.string()}).partial()`,
      () => {
        const result = partial(['test:z.string().optional()'])
        const expected = 'z.object({test:z.string()}).partial()'
        expect(result).toBe(expected)
      },
    )
  })

  // regex
  describe('regex', () => {
    it.concurrent(`regex('^[a-z]+$') -> .regex(/^[a-z]+$/)`, () => {
      const result = regex('^[a-z]+$')
      const expected = '.regex(/^[a-z]+$/)'
      expect(result).toBe(expected)
    })

    it.concurrent(`regex('^\\d{4}-\\d{2}-\\d{2}$') -> .regex(/^\\d{4}-\\d{2}-\\d{2}$/)`, () => {
      const result = regex('^\\d{4}-\\d{2}-\\d{2}$')
      const expected = '.regex(/^\\d{4}-\\d{2}-\\d{2}$/)'
      expect(result).toBe(expected)
    })

    it.concurrent(
      `regex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$') -> .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/)`,
      () => {
        const result = regex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$')
        const expected = '.regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/)'
        expect(result).toBe(expected)
      },
    )

    it.concurrent(`regex('^#[0-9a-fA-F]{6}$') -> .regex(/^#[0-9a-fA-F]{6}$/)`, () => {
      const result = regex('^#[0-9a-fA-F]{6}$')
      const expected = '.regex(/^#[0-9a-fA-F]{6}$/)'
      expect(result).toBe(expected)
    })

    it.concurrent(
      `regex('^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$') -> .regex(/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/)`,
      () => {
        const result = regex('^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$')
        const expected = '.regex(/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/)'
        expect(result).toBe(expected)
      },
    )

    it.concurrent(`regex('^\\d{2}/\\d{2}$') -> '.regex(/^\\d{2}\\/\\d{2}$/)'`, () => {
      const result = regex('^\\d{2}/\\d{2}$')
      const expected = '.regex(/^\\d{2}\\/\\d{2}$/)'
      expect(result).toBe(expected)
    })

    it(`regex('^/api/users$') → '.regex(/^\\/api\\/users$/)'`, () => {
      const result = regex('^/api/users$')
      const expected = '.regex(/^\\/api\\/users$/)'
      expect(result).toBe(expected)
    })
  })

  describe('schema', () => {
    it.concurrent('schema -> z.object({name:string})', () => {
      const result = schema({
        name: 'string',
      })
      const expected = 'z.object({name:string})'
      expect(result).toBe(expected)
    })

    it.concurrent('schema -> z.object({name:string,age:number})', () => {
      const result = schema({
        name: 'string',
        age: 'number',
      })
      const expected = 'z.object({name:string,age:number})'
      expect(result).toBe(expected)
    })
  })

  // stringBool
  describe('stringBool', () => {
    it.concurrent(`stringbool('z.boolean().optional()') -> 'z.stringbool().optional()'`, () => {
      const result = stringbool('z.boolean().optional()')
      const expected = 'z.stringbool().optional()'
      expect(result).toBe(expected)
    })
  })

  describe('union Test', () => {
    it.concurrent(`union(['A', 'B']) -> z.union([A,B])`, () => {
      const result = union(['A', 'B'])
      const expected = 'z.union([A,B])'
      expect(result).toBe(expected)
    })
  })
})
