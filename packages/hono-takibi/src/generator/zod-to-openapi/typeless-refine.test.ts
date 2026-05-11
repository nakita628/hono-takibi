import { describe, expect, it } from 'vite-plus/test'

import type { Schema } from '../../openapi/index.js'
import { emitTypelessRefine, hasTypelessConstraint } from './typeless-refine.js'

// Stub recurse callback — emits a deterministic sentinel including type
// so each branch's emitted call is identifiable in the asserted output.
const recurse = (s: Schema) => `__rec(${s.type ?? (s.const !== undefined ? 'const' : 'any')})`

describe('hasTypelessConstraint', () => {
  it('returns false for an empty schema', () => {
    expect(hasTypelessConstraint({})).toBe(false)
  })

  it('returns false when the only fields are non-typeless metadata', () => {
    expect(hasTypelessConstraint({ description: 'x', deprecated: true })).toBe(false)
  })

  it('returns true for object-shape keywords (required, properties, ...)', () => {
    expect(hasTypelessConstraint({ required: ['x'] })).toBe(true)
    expect(hasTypelessConstraint({ properties: { x: {} } })).toBe(true)
    expect(hasTypelessConstraint({ minProperties: 1 })).toBe(true)
    expect(hasTypelessConstraint({ dependentRequired: { x: ['y'] } })).toBe(true)
  })

  it('returns true for array-shape keywords (minItems, contains, ...)', () => {
    expect(hasTypelessConstraint({ minItems: 1 })).toBe(true)
    expect(hasTypelessConstraint({ uniqueItems: true })).toBe(true)
    expect(hasTypelessConstraint({ contains: { type: 'string' } })).toBe(true)
  })

  it('returns true for string keywords (minLength, pattern)', () => {
    expect(hasTypelessConstraint({ minLength: 1 })).toBe(true)
    expect(hasTypelessConstraint({ pattern: '^x' })).toBe(true)
  })

  it('returns true for numeric keywords (minimum, multipleOf, exclusiveMinimum)', () => {
    expect(hasTypelessConstraint({ minimum: 0 })).toBe(true)
    expect(hasTypelessConstraint({ multipleOf: 2 })).toBe(true)
    expect(hasTypelessConstraint({ exclusiveMinimum: 0 })).toBe(true)
  })

  it('returns true for generic keywords (enum, const, allOf, anyOf, oneOf, not, if/then/else)', () => {
    expect(hasTypelessConstraint({ enum: ['a'] })).toBe(true)
    expect(hasTypelessConstraint({ const: 'fixed' })).toBe(true)
    expect(hasTypelessConstraint({ allOf: [{ type: 'string' }] })).toBe(true)
    expect(hasTypelessConstraint({ anyOf: [{ type: 'string' }] })).toBe(true)
    expect(hasTypelessConstraint({ oneOf: [{ type: 'string' }] })).toBe(true)
    expect(hasTypelessConstraint({ not: { type: 'string' } })).toBe(true)
    expect(hasTypelessConstraint({ if: { type: 'string' } })).toBe(true)
  })
})

describe('emitTypelessRefine', () => {
  describe('empty schema fallback', () => {
    it('returns z.any() when no typeless constraints are present', () => {
      expect(emitTypelessRefine({}, recurse)).toBe('z.any()')
    })

    it('returns z.any() when only non-typeless metadata is present', () => {
      expect(emitTypelessRefine({ description: 'hello' }, recurse)).toBe('z.any()')
    })
  })

  describe('object-shape checks (gated on typeof === "object" && !Array)', () => {
    it('emits a required check using Object.hasOwn (not `in`, to honor own-property semantics)', () => {
      const out = emitTypelessRefine({ required: ['id'] }, recurse)
      expect(out.startsWith(`z.unknown().superRefine((v,ctx)=>{`)).toBe(true)
      expect(out.includes(`if(typeof v==='object'&&v!==null&&!Array.isArray(v)){`)).toBe(true)
      expect(out.includes(`if(!Object.hasOwn(v,"id"))`)).toBe(true)
      expect(out.includes(`message:'missing required: id'`)).toBe(true)
    })

    it('emits min/maxProperties checks against Object.keys length', () => {
      const out = emitTypelessRefine({ minProperties: 2, maxProperties: 5 }, recurse)
      expect(out.includes(`Object.keys(v).length<2`)).toBe(true)
      expect(out.includes(`Object.keys(v).length>5`)).toBe(true)
    })

    it('emits per-property safeParse using Reflect.get (no `as` cast on v[k])', () => {
      const out = emitTypelessRefine({ properties: { age: { type: 'number' } } }, recurse)
      expect(out.includes(`Object.hasOwn(v,"age")`)).toBe(true)
      expect(out.includes(`Reflect.get(v,"age")`)).toBe(true)
      expect(out.includes(`__rec(number)`)).toBe(true)
    })

    it('rejects unknown keys when additionalProperties:false', () => {
      const out = emitTypelessRefine(
        { properties: { a: {} }, additionalProperties: false },
        recurse,
      )
      expect(out.includes(`!["a"].includes(k)`)).toBe(true)
      expect(out.includes(`additional property not allowed: '+k`)).toBe(true)
    })

    it('validates unknown keys against the sub-schema when additionalProperties is a Schema', () => {
      const out = emitTypelessRefine(
        { properties: { a: {} }, additionalProperties: { type: 'string' } },
        recurse,
      )
      expect(out.includes(`__rec(string)`)).toBe(true)
      expect(out.includes(`invalid additional property: '+k`)).toBe(true)
    })

    it('emits a per-pattern loop for patternProperties', () => {
      const out = emitTypelessRefine(
        { patternProperties: { '^x-': { type: 'string' } } },
        recurse,
      )
      expect(out.includes(`new RegExp("^x-").test(k)`)).toBe(true)
      expect(out.includes(`pattern property invalid: '+k`)).toBe(true)
    })

    it('enforces propertyNames.pattern as a per-key regex check', () => {
      const out = emitTypelessRefine({ propertyNames: { pattern: '^[a-z]+$' } }, recurse)
      expect(out.includes(`new RegExp("^[a-z]+$").test(k)`)).toBe(true)
      expect(out.includes(`invalid property name: '+k`)).toBe(true)
    })

    it('emits dependentRequired as `if (key in v) require all deps`', () => {
      const out = emitTypelessRefine({ dependentRequired: { a: ['b', 'c'] } }, recurse)
      expect(out.includes(`Object.hasOwn(v,"a")`)).toBe(true)
      expect(out.includes(`Object.hasOwn(v,"b")&&Object.hasOwn(v,"c")`)).toBe(true)
      expect(out.includes(`message:'dependentRequired'`)).toBe(true)
    })

    it('skips dependentRequired entries with empty dep arrays', () => {
      const out = emitTypelessRefine({ dependentRequired: { a: [] } }, recurse)
      // Empty deps array → no condition to emit → silently dropped (not asserted as error).
      expect(out.includes(`message:'dependentRequired'`)).toBe(false)
    })

    it('emits dependentSchemas as `if (key in v) safeParse(v) against sub-schema`', () => {
      const out = emitTypelessRefine(
        { dependentSchemas: { credit: { type: 'object', required: ['billing'] } } },
        recurse,
      )
      expect(out.includes(`Object.hasOwn(v,"credit")`)).toBe(true)
      // Sub-schema is bound via `const Schema = ...` then invoked as
      // `Schema.safeParse(v)` (same shape as the per-property check
      // above — keeps the emitted code shape consistent).
      expect(out.includes(`Schema=__rec(object)`)).toBe(true)
      expect(out.includes(`Schema.safeParse(v).success`)).toBe(true)
      expect(out.includes(`message:'dependentSchemas'`)).toBe(true)
    })

    it('rejects unevaluated keys when unevaluatedProperties:false', () => {
      const out = emitTypelessRefine(
        { properties: { a: {} }, unevaluatedProperties: false },
        recurse,
      )
      expect(out.includes(`unevaluated property: '+k`)).toBe(true)
    })
  })

  describe('array-shape checks (gated on Array.isArray)', () => {
    it('emits min/maxItems against v.length', () => {
      const out = emitTypelessRefine({ minItems: 1, maxItems: 3 }, recurse)
      expect(out.includes(`if(Array.isArray(v)){`)).toBe(true)
      expect(out.includes(`v.length<1`)).toBe(true)
      expect(out.includes(`v.length>3`)).toBe(true)
    })

    it('uniqueItems uses JSON.stringify-keyed Set with early break', () => {
      const out = emitTypelessRefine({ uniqueItems: true }, recurse)
      expect(out.includes(`const seen=new Set()`)).toBe(true)
      expect(out.includes(`JSON.stringify(item)`)).toBe(true)
      expect(out.includes(`message:'duplicate items'`)).toBe(true)
      expect(out.includes(`break`)).toBe(true)
    })

    it('prefixItems checks each index against its sub-schema', () => {
      const out = emitTypelessRefine(
        { prefixItems: [{ type: 'string' }, { type: 'number' }] },
        recurse,
      )
      expect(out.includes(`v.length>0`)).toBe(true)
      expect(out.includes(`v.length>1`)).toBe(true)
      expect(out.includes(`__rec(string).safeParse(v[0]).success`)).toBe(false)
      // Sub-schemas wrapped via `Schema` const — check the pattern.
      expect(out.includes(`Schema=__rec(string)`)).toBe(true)
      expect(out.includes(`Schema=__rec(number)`)).toBe(true)
    })

    it('items:false rejects any item beyond prefixItems', () => {
      const out = emitTypelessRefine(
        { prefixItems: [{ type: 'string' }], items: false } as Schema,
        recurse,
      )
      expect(out.includes(`v.length>1`)).toBe(true)
      expect(out.includes(`no items allowed beyond prefixItems`)).toBe(true)
    })

    it('items:Schema validates trailing items past prefixItems', () => {
      const out = emitTypelessRefine(
        { prefixItems: [{ type: 'string' }], items: { type: 'number' } },
        recurse,
      )
      expect(out.includes(`for(let i=1;i<v.length;i++)`)).toBe(true)
      expect(out.includes(`invalid item at '+i`)).toBe(true)
    })

    it('contains with min/max emits a count-and-bound check', () => {
      const out = emitTypelessRefine(
        { contains: { type: 'string' }, minContains: 2, maxContains: 4 },
        recurse,
      )
      expect(out.includes(`v.filter((i)=>__rec(string).safeParse(i).success).length`)).toBe(true)
      expect(out.includes(`m<2`)).toBe(true)
      expect(out.includes(`m>4`)).toBe(true)
    })

    it('contains alone defaults to minContains=1, no max check', () => {
      const out = emitTypelessRefine({ contains: { type: 'string' } }, recurse)
      expect(out.includes(`m<1`)).toBe(true)
      expect(out.includes(`contains max exceeded`)).toBe(false)
    })

    it('unevaluatedItems:false rejects items past prefixItems', () => {
      const out = emitTypelessRefine(
        { prefixItems: [{ type: 'string' }], unevaluatedItems: false },
        recurse,
      )
      expect(out.includes(`unevaluated items`)).toBe(true)
    })
  })

  describe('string checks (gated on typeof === "string")', () => {
    it('uses [...v].length so multi-byte chars count as 1 (Zod parity)', () => {
      const out = emitTypelessRefine({ minLength: 3, maxLength: 8 }, recurse)
      expect(out.includes(`if(typeof v==='string'){`)).toBe(true)
      expect(out.includes(`[...v].length<3`)).toBe(true)
      expect(out.includes(`[...v].length>8`)).toBe(true)
    })

    it('pattern uses new RegExp(...).test(v)', () => {
      const out = emitTypelessRefine({ pattern: '^[a-z]+$' }, recurse)
      expect(out.includes(`new RegExp("^[a-z]+$").test(v)`)).toBe(true)
      expect(out.includes(`pattern mismatch`)).toBe(true)
    })
  })

  describe('numeric checks (gated on typeof === "number")', () => {
    it('emits minimum / maximum / multipleOf as inline comparisons', () => {
      const out = emitTypelessRefine({ minimum: 0, maximum: 100, multipleOf: 5 }, recurse)
      expect(out.includes(`if(typeof v==='number'){`)).toBe(true)
      expect(out.includes(`v<0`)).toBe(true)
      expect(out.includes(`v>100`)).toBe(true)
      // multipleOf uses an epsilon-based check to avoid float drift.
      expect(out.includes(`Math.abs(v/5-Math.round(v/5))`)).toBe(true)
      expect(out.includes(`r>1e-10`)).toBe(true)
    })

    it('exclusiveMinimum (number form, draft 2020-12) emits v <= bound', () => {
      const out = emitTypelessRefine({ exclusiveMinimum: 0 }, recurse)
      expect(out.includes(`v<=0`)).toBe(true)
      expect(out.includes(`<= exclusiveMinimum`)).toBe(true)
    })

    it('exclusiveMinimum:true (Draft 4 form) replaces the inclusive minimum check', () => {
      // Draft 4: `minimum: 0, exclusiveMinimum: true` means strict-greater-than.
      // The implementation pops the inclusive check and pushes the strict one.
      const out = emitTypelessRefine({ minimum: 0, exclusiveMinimum: true }, recurse)
      expect(out.includes(`v<0`)).toBe(false)
      expect(out.includes(`v<=0`)).toBe(true)
    })

    it('exclusiveMaximum:true (Draft 4) replaces the inclusive maximum check', () => {
      const out = emitTypelessRefine({ maximum: 100, exclusiveMaximum: true }, recurse)
      expect(out.includes(`v>100`)).toBe(false)
      expect(out.includes(`v>=100`)).toBe(true)
    })
  })

  describe('generic checks (apply to any type, ungated)', () => {
    it('enum uses JSON.stringify-deep-equal across values', () => {
      const out = emitTypelessRefine({ enum: ['a', { x: 1 }] }, recurse)
      expect(out.includes(`JSON.stringify(e)===JSON.stringify(v)`)).toBe(true)
    })

    it('const uses JSON.stringify deep-equal', () => {
      const out = emitTypelessRefine({ const: 'fixed' }, recurse)
      expect(out.includes(`JSON.stringify("fixed")!==JSON.stringify(v)`)).toBe(true)
      expect(out.includes(`const mismatch`)).toBe(true)
    })

    it('allOf emits one safeParse per branch', () => {
      const out = emitTypelessRefine(
        { allOf: [{ type: 'string' }, { type: 'number' }] },
        recurse,
      )
      const matches = out.match(/allOf branch failed/g) ?? []
      expect(matches.length).toBe(2)
    })

    it('anyOf collapses to a single OR-chain', () => {
      const out = emitTypelessRefine(
        { anyOf: [{ type: 'string' }, { type: 'number' }] },
        recurse,
      )
      expect(out.includes(`__rec(string).safeParse(v).success||__rec(number).safeParse(v).success`)).toBe(
        true,
      )
      expect(out.includes(`anyOf failed`)).toBe(true)
    })

    it('oneOf sums success-flags and asserts === 1 (exclusive match)', () => {
      const out = emitTypelessRefine(
        { oneOf: [{ type: 'string' }, { type: 'number' }] },
        recurse,
      )
      expect(out.includes(`(__rec(string).safeParse(v).success?1:0)+(__rec(number).safeParse(v).success?1:0)`)).toBe(
        true,
      )
      expect(out.includes(`oneOf must match exactly one`)).toBe(true)
    })

    it('not: emits an inverted safeParse check', () => {
      const out = emitTypelessRefine({ not: { type: 'string' } }, recurse)
      expect(out.includes(`if(__rec(string).safeParse(v).success)`)).toBe(true)
      expect(out.includes(`not predicate matched`)).toBe(true)
    })

    it('if/then/else routes through ifOk and runs only the matching branch', () => {
      const out = emitTypelessRefine(
        {
          if: { type: 'string' },
          then: { type: 'number' },
          else: { type: 'boolean' },
        },
        recurse,
      )
      expect(out.includes(`const ifOk=__rec(string).safeParse(v).success`)).toBe(true)
      expect(out.includes(`if(ifOk)`)).toBe(true)
      expect(out.includes(`then failed`)).toBe(true)
      expect(out.includes(`if(!ifOk)`)).toBe(true)
      expect(out.includes(`else failed`)).toBe(true)
    })

    it('if without then/else emits no block (no-op)', () => {
      const out = emitTypelessRefine({ if: { type: 'string' } }, recurse)
      expect(out.includes(`then failed`)).toBe(false)
      expect(out.includes(`else failed`)).toBe(false)
    })
  })
})
