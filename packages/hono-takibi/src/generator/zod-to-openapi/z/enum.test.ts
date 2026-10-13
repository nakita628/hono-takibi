import { describe, expect, it } from 'vite-plus/test'
import { z } from 'zod'

import type { Schema } from '../../../openapi/index.js'
import { _enum } from './enum.js'

describe('_enum', () => {
  it.concurrent.each<[Schema, string]>([
    [{ enum: ['A', 'B'] }, 'z.enum(["A","B"])'],
    [{ enum: [1, 2] }, 'z.union([z.literal(1),z.literal(2)])'],
    [{ enum: [true, false] }, 'z.union([z.literal(true),z.literal(false)])'],
    [{ enum: [null] }, 'z.literal(null)'],
    [{ enum: ['abc'] }, `z.literal('abc')`],
    [{ enum: ["it's"] }, String.raw`z.literal('it\'s')`],
    [{ enum: ['a\\'] }, String.raw`z.literal('a\\')`],
    [{ enum: [{ key: 'value' }] } as unknown as Schema, `z.custom<{"key":"value"}>()`],
    [{ type: 'array', enum: [[1, 2]] }, 'z.tuple([z.literal(1),z.literal(2)])'],
    [
      {
        type: 'array',
        enum: [
          [1, 2],
          [3, 4],
        ],
      },
      'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])])',
    ],
  ])('_enum(%o) → %s', (input, expected) => {
    expect(_enum(input)).toBe(expected)
  })

  describe('x-error-message', () => {
    it.concurrent.each<[Schema, string]>([
      // String enum (multiple) → z.enum with error
      [
        { enum: ['active', 'inactive'], 'x-error-message': '無効なステータス' },
        'z.enum(["active","inactive"],{error:"無効なステータス"})',
      ],
      // Single string value → z.literal with error
      [{ enum: ['only'], 'x-error-message': 'only必須' }, `z.literal('only',{error:"only必須"})`],
      // Number enum (multiple) → z.union with error on outer wrapper only
      [
        { enum: [1, 2], 'x-error-message': '1か2を指定' },
        'z.union([z.literal(1),z.literal(2)],{error:"1か2を指定"})',
      ],
      // Number enum (single) → z.literal with error
      [
        { type: 'number', enum: [42], 'x-error-message': '42のみ' },
        'z.literal(42,{error:"42のみ"})',
      ],
      // Integer enum (multiple) → z.union with error on outer wrapper only
      [
        { type: 'integer', enum: [1, 2, 3], 'x-error-message': '1-3の整数' },
        'z.union([z.literal(1),z.literal(2),z.literal(3)],{error:"1-3の整数"})',
      ],
      // Boolean enum → z.union with error on outer wrapper only
      [
        { type: 'boolean', enum: [true, false], 'x-error-message': 'ブール値必須' },
        'z.union([z.literal(true),z.literal(false)],{error:"ブール値必須"})',
      ],
      // Boolean enum (single) → z.literal with error
      [
        { type: 'boolean', enum: [true], 'x-error-message': 'trueのみ' },
        'z.literal(true,{error:"trueのみ"})',
      ],
      // Array enum (single tuple) → z.tuple with error on outer wrapper only
      [
        { type: 'array', enum: [[1, 2]], 'x-error-message': '[1,2]のみ' },
        'z.tuple([z.literal(1),z.literal(2)],{error:"[1,2]のみ"})',
      ],
      // Array enum (multiple tuples) → z.union with error on outermost
      // wrapper only; inner z.tuple and inner z.literal entries omit it.
      [
        {
          type: 'array',
          enum: [
            [1, 2],
            [3, 4],
          ],
          'x-error-message': '無効な配列',
        },
        'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])],{error:"無効な配列"})',
      ],
      // Mixed enum (multiple) → z.union with error on outer wrapper only
      [
        { enum: ['a', 1], 'x-error-message': '混合型エラー' },
        `z.union([z.literal('a'),z.literal(1)],{error:"混合型エラー"})`,
      ],
      // Mixed enum (single primitive) → z.literal with error via zLit
      [{ enum: [null], 'x-error-message': 'null必須' }, 'z.literal(null,{error:"null必須"})'],
    ])('_enum(%o) → %s', (input, expected) => {
      expect(_enum(input)).toBe(expected)
    })
  })

  // x-enum-error-messages was removed: the extension generated dead code
  // (per-literal `value === 'admin'` branches that can never match a
  // rejected input). Whole-enum messages now come from x-error-message;
  // per-value business rules belong in handler code.
})

// Regression guard for the literal-breakout bug (fixed in favour of makeStringLiteral):
// the previous emitter escaped `'` only, so a value ending in `\'` produced `\\'` and
// closed the literal early, letting the rest of the value run as code at import time.
describe('_enum string literal escaping (document-supplied values are code)', () => {
  // Reads one single-quoted JS string literal starting at `start` following the
  // ECMAScript escape rules the emitter relies on, and returns the decoded value plus
  // the index just past the closing quote. Returns undefined when the literal never
  // closes. This is a structural syntax check that needs no eval / new Function.
  const readSingleQuoted = (code: string, start: number) => {
    if (code[start] !== "'") return undefined
    const simple: { readonly [k: string]: string } = {
      n: '\n',
      r: '\r',
      t: '\t',
      "'": "'",
      '\\': '\\',
    }
    let out = ''
    let i = start + 1
    while (i < code.length) {
      const c = code[i]
      if (c === "'") return { value: out, end: i + 1 }
      if (c === '\n' || c === '\r') return undefined
      if (c === '\\') {
        const next = code[i + 1]
        if (next === undefined || simple[next] === undefined) return undefined
        out += simple[next]
        i += 2
      } else {
        out += c
        i += 1
      }
    }
    return undefined
  }

  const payloads: readonly string[] = [
    'a\\',
    "\\'",
    "it's\\",
    'line\nbreak',
    'cr\rtab\t',
    // A breakout attempt tuned to the old emitter: closes the literal, injects an
    // assignment, balances the wrapper's brackets, then comments out the remainder.
    "x\\',globalThis.pwned=1)])//",
    "x'); evil(); ('",
  ]

  it.concurrent.each(payloads.map((v) => [v] as const))(
    'single-value enum %j → one well-formed literal that decodes back to the value',
    (v) => {
      const code = _enum({ enum: [v] })
      expect(code.startsWith("z.literal('")).toBe(true)
      const lit = readSingleQuoted(code, 'z.literal('.length)
      expect(lit).toBeDefined()
      expect(lit?.value).toBe(v)
      // Nothing of the payload leaks past the closing quote.
      expect(code.slice(lit?.end)).toBe(')')
    },
  )

  it.concurrent.each(payloads.map((v) => [v] as const))(
    'mixed enum [%j, 1] → z.union whose string literal decodes back to the value',
    (v) => {
      const code = _enum({ enum: [v, 1] })
      const head = "z.union([z.literal('"
      expect(code.startsWith(head)).toBe(true)
      const lit = readSingleQuoted(code, head.length - 1)
      expect(lit?.value).toBe(v)
      expect(code.slice(lit?.end)).toBe('),z.literal(1)])')
    },
  )

  it.concurrent('exact output: backslash + quote and newline are escaped, not spliced', () => {
    expect(_enum({ enum: ["\\'"] })).toBe(String.raw`z.literal('\\\'')`)
    expect(_enum({ enum: ['a\nb'] })).toBe(String.raw`z.literal('a\nb')`)
    expect(_enum({ enum: ["x\\',globalThis.pwned=1)])//"] })).toBe(
      String.raw`z.literal('x\\\',globalThis.pwned=1)])//')`,
    )
  })

  it.concurrent('x-error-message keeps the escaped literal intact', () => {
    expect(_enum({ enum: ["\\'"], 'x-error-message': 'bad' })).toBe(
      String.raw`z.literal('\\\'',{error:"bad"})`,
    )
  })

  it.concurrent('runtime: mirrored z.literal of a breakout payload only accepts that exact string', () => {
    const v = "x\\',globalThis.pwned=1)])//"
    const schema = z.literal(v)
    expect(schema.safeParse(v).success).toBe(true)
    expect(schema.safeParse("x\\'").success).toBe(false)
    expect((globalThis as { pwned?: unknown }).pwned).toBeUndefined()
  })
})

describe('_enum number/boolean literals (String(v) emit path)', () => {
  it.concurrent.each<[Schema, string]>([
    [{ type: 'integer', enum: [1] }, 'z.literal(1)'],
    [{ type: 'number', enum: [3.14] }, 'z.literal(3.14)'],
    [{ type: 'boolean', enum: [true] }, 'z.literal(true)'],
    [{ type: 'boolean', enum: [false] }, 'z.literal(false)'],
  ])('_enum(%o) → %s', (input, expected) => {
    expect(_enum(input)).toBe(expected)
  })
})
