import { describe, expect, it } from 'vite-plus/test'

import type { Schema } from '../../openapi/index.js'
import { buildUnevaluatedProperties } from './unevaluated.js'

// Stub `recurse` callback — returns a deterministic sentinel that includes
// the schema's `type` so each branch's emitted call is identifiable in the
// asserted output without dragging the full zod-to-openapi pipeline into
// these unit tests.
const recurse = (s: Schema) => `__rec(${s.type ?? 'any'})`

describe('buildUnevaluatedProperties', () => {
  describe('no-op cases', () => {
    it('returns empty string when unevaluatedProperties is undefined', () => {
      expect(buildUnevaluatedProperties({ type: 'object' }, ',{error:"x"}', recurse)).toBe('')
    })

    it('returns empty string when unevaluatedProperties is true (default-allow)', () => {
      expect(
        buildUnevaluatedProperties(
          { type: 'object', unevaluatedProperties: true },
          ',{error:"x"}',
          recurse,
        ),
      ).toBe('')
    })
  })

  describe('unevaluatedProperties: false', () => {
    it('emits a refine that checks own properties only', () => {
      const out = buildUnevaluatedProperties(
        {
          type: 'object',
          unevaluatedProperties: false,
          properties: { a: { type: 'string' }, b: { type: 'number' } },
        },
        ',{error:"unknown key"}',
        recurse,
      )
      expect(out).toBe(
        `.refine((o)=>{const e=new Set();for(const k of ["a","b"])e.add(k);return Object.keys(o).every((k)=>e.has(k))},{error:"unknown key"})`,
      )
    })

    it('skips the for-loop when own properties is an empty object', () => {
      // Empty `properties: {}` shouldn't emit `for(const k of [])e.add(k)`
      // dead code — the prelude only adds the loop when keys.length > 0.
      const out = buildUnevaluatedProperties(
        { type: 'object', unevaluatedProperties: false, properties: {} },
        ',{error:"x"}',
        recurse,
      )
      expect(out.includes('for(const k of [])')).toBe(false)
      expect(out).toBe(
        `.refine((o)=>{const e=new Set();return Object.keys(o).every((k)=>e.has(k))},{error:"x"})`,
      )
    })

    it('emits a pattern-keys loop when patternProperties is set', () => {
      const out = buildUnevaluatedProperties(
        {
          type: 'object',
          unevaluatedProperties: false,
          patternProperties: { '^x-': { type: 'string' } },
        },
        ',{error:"x"}',
        recurse,
      )
      expect(out.includes('for(const p of ["^x-"])if(new RegExp(p).test(k))e.add(k)')).toBe(true)
    })

    it('walks allOf branches recursively to pre-populate evaluated keys', () => {
      const out = buildUnevaluatedProperties(
        {
          type: 'object',
          unevaluatedProperties: false,
          allOf: [
            { type: 'object', properties: { a: { type: 'string' } } },
            {
              type: 'object',
              allOf: [{ type: 'object', properties: { b: { type: 'number' } } }],
            },
            { type: 'object', patternProperties: { '^z': { type: 'string' } } },
          ],
        },
        ',{error:"x"}',
        recurse,
      )
      // Both `a` from the first branch and `b` from the nested allOf branch
      // get pre-added unconditionally; the patternProperties branch walks at
      // runtime against the data's actual keys.
      expect(out.includes('for(const k of ["a"])e.add(k)')).toBe(true)
      expect(out.includes('for(const k of ["b"])e.add(k)')).toBe(true)
      expect(out.includes('for(const p of ["^z"])if(new RegExp(p).test(k))e.add(k)')).toBe(true)
    })

    it('emits conditional branches for anyOf using safeParse(o).success', () => {
      const out = buildUnevaluatedProperties(
        {
          type: 'object',
          unevaluatedProperties: false,
          anyOf: [
            { type: 'object', properties: { variantA: { type: 'string' } } },
            { type: 'object', properties: { variantB: { type: 'number' } } },
          ],
        },
        ',{error:"x"}',
        recurse,
      )
      expect(
        out.includes(
          `if(__rec(object).safeParse(o).success){for(const k of ["variantA"])e.add(k)}`,
        ),
      ).toBe(true)
      expect(
        out.includes(
          `if(__rec(object).safeParse(o).success){for(const k of ["variantB"])e.add(k)}`,
        ),
      ).toBe(true)
    })

    it('emits the same conditional shape for oneOf branches', () => {
      const out = buildUnevaluatedProperties(
        {
          type: 'object',
          unevaluatedProperties: false,
          oneOf: [{ type: 'object', properties: { only: { type: 'string' } } }],
        },
        ',{error:"x"}',
        recurse,
      )
      expect(
        out.includes(`if(__rec(object).safeParse(o).success){for(const k of ["only"])e.add(k)}`),
      ).toBe(true)
    })

    it('skips anyOf branches that have neither properties nor patternProperties', () => {
      // Pure type guards (e.g. `{type:'string'}` in a discriminated union)
      // contribute nothing to the evaluated-keys set — emitting an empty
      // safeParse call would be dead code.
      const out = buildUnevaluatedProperties(
        {
          type: 'object',
          unevaluatedProperties: false,
          anyOf: [{ type: 'string' }, { type: 'object', properties: { a: { type: 'string' } } }],
        },
        ',{error:"x"}',
        recurse,
      )
      // Only the second branch (with properties) should produce a safeParse line.
      const matches = out.match(/safeParse\(o\)\.success/g) ?? []
      expect(matches.length).toBe(1)
    })

    it('routes if/then/else through ifOk and pre-adds keys per branch', () => {
      const out = buildUnevaluatedProperties(
        {
          type: 'object',
          unevaluatedProperties: false,
          if: { type: 'object', properties: { trigger: { type: 'string' } } },
          then: { type: 'object', properties: { thenKey: { type: 'string' } } },
          else: { type: 'object', properties: { elseKey: { type: 'string' } } },
        },
        ',{error:"x"}',
        recurse,
      )
      expect(out.includes('const ifOk=__rec(object).safeParse(o).success')).toBe(true)
      expect(out.includes('if(ifOk)for(const k of ["trigger"])e.add(k)')).toBe(true)
      expect(out.includes('if(ifOk)for(const k of ["thenKey"])e.add(k)')).toBe(true)
      // `else` branch is only added when `ifOk` is FALSE.
      expect(out.includes('if(!ifOk)for(const k of ["elseKey"])e.add(k)')).toBe(true)
    })

    it('gates dependentSchemas keys on the dependency key being present in data', () => {
      const out = buildUnevaluatedProperties(
        {
          type: 'object',
          unevaluatedProperties: false,
          dependentSchemas: {
            credit_card: {
              type: 'object',
              properties: { billing_address: { type: 'string' } },
            },
          },
        },
        ',{error:"x"}',
        recurse,
      )
      expect(
        out.includes(`if("credit_card" in o)for(const k of ["billing_address"])e.add(k)`),
      ).toBe(true)
    })

    it('skips dependentSchemas entries whose sub-schema has no properties', () => {
      // A bare `{required: ['x']}` sub-schema doesn't list properties,
      // so there are no keys to pre-add — the entry is silently dropped.
      const out = buildUnevaluatedProperties(
        {
          type: 'object',
          unevaluatedProperties: false,
          dependentSchemas: { credit_card: { type: 'object', required: ['billing_address'] } },
        },
        ',{error:"x"}',
        recurse,
      )
      expect(out.includes('"credit_card" in o')).toBe(false)
    })
  })

  describe('unevaluatedProperties: <Schema>', () => {
    it('emits a per-key safeParse against the sub-schema for the unknown branch', () => {
      // unevaluatedProperties as a Schema validates UNKNOWN keys' values
      // against the sub-schema instead of rejecting them outright.
      const out = buildUnevaluatedProperties(
        {
          type: 'object',
          properties: { id: { type: 'string' } },
          unevaluatedProperties: { type: 'string' },
        },
        ',{error:"x"}',
        recurse,
      )
      expect(
        out.endsWith(
          `return Object.entries(o).every(([k,v])=>e.has(k)||__rec(string).safeParse(v).success)},{error:"x"})`,
        ),
      ).toBe(true)
    })
  })
})
