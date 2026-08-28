import { describe, expect, it } from 'vite-plus/test'

import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import type { Schema } from '../openapi/index.js'
import {
  emitTypelessRefine,
  hasTypelessConstraint,
  makeUnevaluatedProperties,
  makeUnevaluatedPropertiesCheck,
} from './zod.js'

const recurse = zodToOpenAPI

// Unit tests for the internal helpers that zodToOpenAPI calls. Where
// zod-to-openapi/index.test.ts pins the *combinations* along the typeless path, this file covers
// the branches of helper/zod.ts alone with minimal reproductions. Runtime behaviour that depends
// on Zod lives in zod-to-openapi/index.test.ts, so this file only asserts the emitted string.

describe('helper/zod', () => {
  describe('hasTypelessConstraint', () => {
    it('returns false for empty schema', () => {
      expect(hasTypelessConstraint({})).toBe(false)
    })
    it('returns false for schema with only `type`', () => {
      expect(hasTypelessConstraint({ type: 'string' })).toBe(false)
    })
    it('returns true for schema with `required`', () => {
      expect(hasTypelessConstraint({ required: ['x'] })).toBe(true)
    })
    it('returns true for schema with `if`', () => {
      expect(hasTypelessConstraint({ if: { type: 'object' } })).toBe(true)
    })
    it('returns true for schema with `contains`', () => {
      expect(hasTypelessConstraint({ contains: { type: 'string' } })).toBe(true)
    })
  })

  describe('emitTypelessRefine', () => {
    it('returns z.any() for empty schema (blocks.length === 0 branch)', () => {
      expect(emitTypelessRefine({}, recurse)).toBe('z.any()')
    })

    it('emits additionalProperties: false guard (typeless)', () => {
      expect(
        emitTypelessRefine(
          {
            properties: { a: { type: 'string' } },
            additionalProperties: false,
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"a")).success){ctx.addIssue({code:'custom'})}};for(const k of Object.keys(val)){if(!["a"].includes(k)&&![].some((p)=>new RegExp(p).test(k))){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits additionalProperties: <schema> guard (typeless)', () => {
      expect(
        emitTypelessRefine(
          {
            properties: { a: { type: 'string' } },
            additionalProperties: { type: 'number' },
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"a")).success){ctx.addIssue({code:'custom'})}};{const Schema=z.number();for(const k of Object.keys(val)){if(!["a"].includes(k)&&![].some((p)=>new RegExp(p).test(k))){if(!Schema.safeParse(Reflect.get(val,k)).success){ctx.addIssue({code:'custom'})}}}}}})`,
      )
    })

    it('emits patternProperties guard (typeless)', () => {
      expect(
        emitTypelessRefine(
          {
            patternProperties: { '^x_': { type: 'string' } },
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){{const Schema=z.string();for(const k of Object.keys(val)){if(new RegExp("^x_").test(k)){if(!Schema.safeParse(Reflect.get(val,k)).success){ctx.addIssue({code:'custom'})}}}}}})`,
      )
    })

    it('emits dependentRequired guard (typeless)', () => {
      expect(
        emitTypelessRefine(
          {
            dependentRequired: { a: ['b', 'c'] },
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){if(!(Object.hasOwn(val,"b")&&Object.hasOwn(val,"c"))){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits dependentSchemas guard (typeless, propagates sub-issues)', () => {
      expect(
        emitTypelessRefine(
          {
            dependentSchemas: { a: { properties: { b: { type: 'string' } } } },
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"b")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"b")).success){ctx.addIssue({code:'custom'})}}}});const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}}})`,
      )
    })

    it('emits contains + minContains + maxContains (typeless)', () => {
      expect(
        emitTypelessRefine(
          {
            contains: { type: 'string' },
            minContains: 1,
            maxContains: 3,
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(Array.isArray(val)){{const m=val.filter((i)=>z.string().safeParse(i).success).length;if(m<1){ctx.addIssue({code:'custom'})};if(m>3){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits contains with explicit minContains only (lowerBoundMessage ← x-minContains-message)', () => {
      // With schema.minContains set, lowerBoundMessage uses x-minContains-message;
      // without it, containsMessage (x-contains-message) is used instead.
      expect(
        emitTypelessRefine(
          {
            contains: { type: 'string' },
            minContains: 2,
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(Array.isArray(val)){{const m=val.filter((i)=>z.string().safeParse(i).success).length;if(m<2){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits allOf checks (typeless) — override semantics, inner issues propagate', () => {
      expect(
        emitTypelessRefine(
          {
            allOf: [
              { type: 'object', properties: { a: { type: 'string' } } },
              { type: 'object', properties: { b: { type: 'number' } } },
            ],
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{{const Schema=z.object({a:z.string().exactOptional()});const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}};{const Schema=z.object({b:z.number().exactOptional()});const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}})`,
      )
    })

    it('emits anyOf check (typeless)', () => {
      expect(
        emitTypelessRefine(
          {
            anyOf: [{ type: 'string' }, { type: 'number' }],
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(!(z.string().safeParse(val).success||z.number().safeParse(val).success)){ctx.addIssue({code:'custom'})}})`,
      )
    })

    it('emits oneOf check (typeless)', () => {
      expect(
        emitTypelessRefine(
          {
            oneOf: [{ type: 'string' }, { type: 'number' }],
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(((z.string().safeParse(val).success?1:0)+(z.number().safeParse(val).success?1:0))!==1){ctx.addIssue({code:'custom'})}})`,
      )
    })

    it('emits not check (typeless)', () => {
      expect(
        emitTypelessRefine(
          {
            not: { type: 'string' },
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(z.string().safeParse(val).success){ctx.addIssue({code:'custom'})}})`,
      )
    })

    it('emits items: false length cap with x-items-message slot picked', () => {
      expect(
        emitTypelessRefine(
          {
            prefixItems: [{ type: 'string' }],
            items: false,
            'x-items-message': 'cap',
          } as unknown as Schema,
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(Array.isArray(val)){if(val.length>0){const Schema=z.string();if(!Schema.safeParse(val[0]).success){ctx.addIssue({code:'custom'})}};if(val.length>1){ctx.addIssue({code:'custom',message:"cap"})}}})`,
      )
    })

    it('falls back to x-error-message when keyword-specific slot is absent (root-level)', () => {
      // messageFor falls back to x-error-message when the keyword-specific slot is undefined, so
      // the property check carries x-error-message here.
      expect(
        emitTypelessRefine(
          {
            properties: { a: { type: 'string' } },
            'x-error-message': 'fallback',
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"a")).success){ctx.addIssue({code:'custom',message:"fallback"})}}}})`,
      )
    })

    it('then/else fallback chain: x-error-message reaches then/else via x-if-message', () => {
      // The `key === 'then' || key === 'else'` guard in messageFor suppresses the *direct*
      // x-error-message fallback, but thenMessage/elseMessage chain through
      // `messageFor(s, 'then') ?? ifMessage`, and ifMessage itself falls back via
      // messageFor(s, 'if'). So with only x-error-message set, both branches still carry it.
      expect(
        emitTypelessRefine(
          {
            if: { type: 'object', properties: { kind: { const: 'A' } } },
            // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
            then: { type: 'object', required: ['x'] },
            else: { type: 'object', required: ['y'] },
            'x-error-message': 'err',
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{{const ifOk=z.object({kind:z.literal("A").exactOptional()}).safeParse(val).success;if(ifOk){const Schema=z.object({}).openapi({"required":["x"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom',message:"err"})}};if(!ifOk){const Schema=z.object({}).openapi({"required":["y"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom',message:"err"})}}}})`,
      )
    })

    it('pickMessage ignores non-string slot values (boolean) and falls through to undefined', () => {
      // A boolean x-properties-message is dropped, covering pickMessage's
      // `typeof value !== 'string'` branch.
      expect(
        emitTypelessRefine(
          {
            properties: { a: { type: 'string' } },
            // biome-ignore lint/suspicious/noExplicitAny: testing non-string slot value
            'x-properties-message': true as unknown as string,
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"a")).success){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits typeless string constraints (minLength/maxLength/pattern)', () => {
      expect(emitTypelessRefine({ minLength: 3, maxLength: 10, pattern: '^x' }, recurse)).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='string'){if([...val].length<3){ctx.addIssue({code:'custom'})};if([...val].length>10){ctx.addIssue({code:'custom'})};if(!new RegExp("^x").test(val)){ctx.addIssue({code:'custom'})}}})`,
      )
    })

    it('emits typeless number constraints (min/max/exclusive/multipleOf)', () => {
      expect(
        emitTypelessRefine(
          {
            minimum: 0,
            maximum: 100,
            exclusiveMinimum: 0,
            exclusiveMaximum: 100,
            multipleOf: 5,
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='number'){if(val<0){ctx.addIssue({code:'custom'})};if(val<=0){ctx.addIssue({code:'custom'})};if(val>100){ctx.addIssue({code:'custom'})};if(val>=100){ctx.addIssue({code:'custom'})};{const mod=Math.abs(val/5-Math.round(val/5));if(mod>1e-10){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits typeless array constraints (minItems/maxItems/uniqueItems)', () => {
      expect(emitTypelessRefine({ minItems: 1, maxItems: 5, uniqueItems: true }, recurse)).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(Array.isArray(val)){if(val.length<1){ctx.addIssue({code:'custom'})};if(val.length>5){ctx.addIssue({code:'custom'})};{const seen=new Set();for(const item of val){const key=JSON.stringify(item);if(seen.has(key)){ctx.addIssue({code:'custom'});break}seen.add(key)}}}})`,
      )
    })

    it('emits typeless object constraints with patternProperties + propertyNames', () => {
      expect(
        emitTypelessRefine(
          {
            minProperties: 1,
            maxProperties: 5,
            propertyNames: { pattern: '^x' },
            patternProperties: { '^x_': { type: 'string' } },
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.keys(val).length<1){ctx.addIssue({code:'custom'})};if(Object.keys(val).length>5){ctx.addIssue({code:'custom'})};{const Schema=z.string();for(const k of Object.keys(val)){if(new RegExp("^x_").test(k)){if(!Schema.safeParse(Reflect.get(val,k)).success){ctx.addIssue({code:'custom'})}}}};for(const k of Object.keys(val)){if(!new RegExp("^x").test(k)){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits typeless dependentRequired check', () => {
      expect(emitTypelessRefine({ dependentRequired: { a: ['b', 'c'] } }, recurse)).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){if(!(Object.hasOwn(val,"b")&&Object.hasOwn(val,"c"))){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits typeless const check (any-type)', () => {
      expect(emitTypelessRefine({ const: 'fixed' }, recurse)).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(JSON.stringify("fixed")!==JSON.stringify(val)){ctx.addIssue({code:'custom'})}})`,
      )
    })

    it('emits typeless enum check (any-type)', () => {
      expect(emitTypelessRefine({ enum: ['a', 'b', 'c'] }, recurse)).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(!["a","b","c"].some((e)=>JSON.stringify(e)===JSON.stringify(val))){ctx.addIssue({code:'custom'})}})`,
      )
    })

    it('emits typeless if/then/else with proper safeParse branching', () => {
      expect(
        emitTypelessRefine(
          {
            if: { type: 'object', properties: { kind: { const: 'a' } } },
            // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
            then: {
              type: 'object',
              properties: { x: { type: 'string' } },
              required: ['x'],
            },
            else: {
              type: 'object',
              properties: { y: { type: 'integer' } },
              required: ['y'],
            },
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{{const ifOk=z.object({kind:z.literal("a").exactOptional()}).safeParse(val).success;if(ifOk){const Schema=z.object({x:z.string()}).openapi({"required":["x"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom'})}};if(!ifOk){const Schema=z.object({y:z.int()}).openapi({"required":["y"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom'})}}}})`,
      )
    })
  })

  describe('makeUnevaluatedProperties', () => {
    it('returns empty string when unevaluatedProperties is undefined', () => {
      expect(makeUnevaluatedProperties({ type: 'object' }, 'err', recurse)).toBe('')
    })

    it('returns empty string when unevaluatedProperties is true', () => {
      expect(
        makeUnevaluatedProperties({ type: 'object', unevaluatedProperties: true }, 'err', recurse),
      ).toBe('')
    })

    it('emits .superRefine for unevaluatedProperties: false with own properties', () => {
      expect(
        makeUnevaluatedProperties(
          {
            properties: { a: { type: 'string' } },
            unevaluatedProperties: false,
          },
          'err',
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('emits .superRefine for unevaluatedProperties: <schema> branch', () => {
      expect(
        makeUnevaluatedProperties(
          {
            properties: { a: { type: 'string' } },
            unevaluatedProperties: { type: 'number' },
          },
          'err',
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of ["a"]){e.add(k)};const Schema=z.number();for(const [k,val] of Object.entries(o)){if(e.has(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]})}}}})`,
      )
    })

    it('emits patternProperties stmts and allOf branches into evaluated key set', () => {
      expect(
        makeUnevaluatedProperties(
          {
            properties: { a: { type: 'string' } },
            patternProperties: { '^x_': { type: 'string' } },
            allOf: [{ properties: { b: { type: 'string' } } }],
            unevaluatedProperties: false,
          },
          'err',
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){for(const p of ["^x_"]){if(new RegExp(p).test(k)){e.add(k)}}};for(const k of ["b"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('emits anyOf / oneOf conditional branches and dependentSchemas', () => {
      expect(
        makeUnevaluatedProperties(
          {
            // Without an explicit type: 'object', anyOf/oneOf/if sub-schemas expand along the
            // typeless path into z.unknown().superRefine(...). The type keeps this case on the
            // object path so conditionalBranchStmt and dependentSchemas can be checked together.
            anyOf: [{ type: 'object', properties: { c: { type: 'string' } } }],
            oneOf: [{ type: 'object', properties: { d: { type: 'string' } } }],
            dependentSchemas: { e: { type: 'object', properties: { f: { type: 'string' } } } },
            unevaluatedProperties: false,
          },
          'err',
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();if(z.object({c:z.string().exactOptional()}).safeParse(o).success){for(const k of ["c"]){e.add(k)}};if(z.object({d:z.string().exactOptional()}).safeParse(o).success){for(const k of ["d"]){e.add(k)}};if("e" in o){for(const k of ["f"]){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('skips anyOf branch when sub has neither properties nor patternProperties (early return)', () => {
      // conditionalBranchStmt's `!sub.properties && !sub.patternProperties` early return: an anyOf
      // sub with only `type: 'object'` contributes no evaluated keys, so it is skipped and no
      // evaluator is pushed onto evalStmts (only the known keys are allowed).
      expect(
        makeUnevaluatedProperties(
          {
            properties: { a: { type: 'string' } },
            anyOf: [{ type: 'object' }],
            unevaluatedProperties: false,
          },
          'err',
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('emits if/then/else conditional branches into evaluated key set', () => {
      // Without an explicit type:'object' the if subschema expands along the typeless path, so the
      // type is set to keep ifZod stable. Same for then/else.
      expect(
        makeUnevaluatedProperties(
          {
            if: { type: 'object', properties: { a: { type: 'string' } } },
            // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
            then: { type: 'object', properties: { b: { type: 'string' } } },
            else: { type: 'object', properties: { c: { type: 'string' } } },
            unevaluatedProperties: false,
          },
          'err',
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();const ifOk=z.object({a:z.string().exactOptional()}).safeParse(o).success;if(ifOk){for(const k of ["a"]){e.add(k)}};if(ifOk){for(const k of ["b"]){e.add(k)}};if(!ifOk){for(const k of ["c"]){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('honors x-unevaluatedProperties-message slot (precedence over messageOverride)', () => {
      expect(
        makeUnevaluatedProperties(
          {
            properties: { a: { type: 'string' } },
            unevaluatedProperties: false,
            'x-unevaluatedProperties-message': 'unevaluated',
          },
          'err',
          recurse,
          'override',
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k],message:"unevaluated"})}}})`,
      )
    })

    it('uses messageOverride when slot is absent', () => {
      expect(
        makeUnevaluatedProperties(
          {
            properties: { a: { type: 'string' } },
            unevaluatedProperties: false,
          },
          'err',
          recurse,
          'override',
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k],message:"override"})}}})`,
      )
    })
  })

  describe('makeUnevaluatedPropertiesCheck (typeless wrapper)', () => {
    it('returns empty string when unevaluatedProperties is undefined', () => {
      expect(
        makeUnevaluatedPropertiesCheck({ properties: { a: { type: 'string' } } }, recurse),
      ).toBe('')
    })

    it('returns empty string when unevaluatedProperties is true', () => {
      expect(
        makeUnevaluatedPropertiesCheck(
          {
            properties: { a: { type: 'string' } },
            unevaluatedProperties: true,
          },
          recurse,
        ),
      ).toBe('')
    })

    it('emits ctx.value-based check for unevaluatedProperties: false with own properties', () => {
      expect(
        makeUnevaluatedPropertiesCheck(
          {
            properties: { a: { type: 'string' } },
            unevaluatedProperties: false,
          },
          recurse,
        ),
      ).toBe(
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}`,
      )
    })

    it('emits sub-schema check when unevaluatedProperties is a schema', () => {
      expect(
        makeUnevaluatedPropertiesCheck(
          {
            properties: { a: { type: 'string' } },
            unevaluatedProperties: { type: 'number' },
          },
          recurse,
        ),
      ).toBe(
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;const e=new Set();for(const k of ["a"]){e.add(k)};const Schema=z.number();for(const [k,val] of Object.entries(o)){if(e.has(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}}}}`,
      )
    })

    it('emits combined evaluators with x-unevaluatedProperties-message taking precedence', () => {
      expect(
        makeUnevaluatedPropertiesCheck(
          {
            properties: { a: { type: 'string' } },
            patternProperties: { '^x_': { type: 'string' } },
            allOf: [{ properties: { b: { type: 'string' } } }],
            anyOf: [{ type: 'object', properties: { c: { type: 'string' } } }],
            oneOf: [{ type: 'object', properties: { d: { type: 'string' } } }],
            if: { type: 'object', properties: { x: { type: 'string' } } },
            // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
            then: { type: 'object', properties: { y: { type: 'string' } } },
            else: { type: 'object', properties: { z: { type: 'string' } } },
            dependentSchemas: { e: { type: 'object', properties: { f: { type: 'string' } } } },
            unevaluatedProperties: false,
            'x-unevaluatedProperties-message': 'unevaluated',
          },
          recurse,
        ),
      ).toBe(
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){for(const p of ["^x_"]){if(new RegExp(p).test(k)){e.add(k)}}};for(const k of ["b"]){e.add(k)};if(z.object({c:z.string().exactOptional()}).safeParse(o).success){for(const k of ["c"]){e.add(k)}};if(z.object({d:z.string().exactOptional()}).safeParse(o).success){for(const k of ["d"]){e.add(k)}};const ifOk=z.object({x:z.string().exactOptional()}).safeParse(o).success;if(ifOk){for(const k of ["x"]){e.add(k)}};if(ifOk){for(const k of ["y"]){e.add(k)}};if(!ifOk){for(const k of ["z"]){e.add(k)}};if("e" in o){for(const k of ["f"]){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o,message:"unevaluated"})}}}`,
      )
    })

    it('uses messageOverride when slot is absent', () => {
      expect(
        makeUnevaluatedPropertiesCheck(
          {
            properties: { a: { type: 'string' } },
            unevaluatedProperties: false,
          },
          recurse,
          'override',
        ),
      ).toBe(
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o,message:"override"})}}}`,
      )
    })
  })
})

describe('emitTypelessRefine array constraints', () => {
  it('emits contains/minContains count guard', () => {
    expect(emitTypelessRefine({ contains: { type: 'string' }, minContains: 1 }, recurse)).toBe(
      `z.unknown().superRefine((val,ctx)=>{if(Array.isArray(val)){{const m=val.filter((i)=>z.string().safeParse(i).success).length;if(m<1){ctx.addIssue({code:'custom'})}}}})`,
    )
  })

  it('emits prefixItems positional guard plus trailing items guard', () => {
    expect(
      emitTypelessRefine({ prefixItems: [{ type: 'string' }], items: { type: 'number' } }, recurse),
    ).toBe(
      `z.unknown().superRefine((val,ctx)=>{if(Array.isArray(val)){if(val.length>0){const Schema=z.string();if(!Schema.safeParse(val[0]).success){ctx.addIssue({code:'custom'})}};{const Schema=z.number();for(let i=1;i<val.length;i++){if(!Schema.safeParse(val[i]).success){ctx.addIssue({code:'custom'})}}}}})`,
    )
  })

  it('emits minItems guard plus full-array items guard (no prefix)', () => {
    expect(emitTypelessRefine({ items: { type: 'string' }, minItems: 2 }, recurse)).toBe(
      `z.unknown().superRefine((val,ctx)=>{if(Array.isArray(val)){if(val.length<2){ctx.addIssue({code:'custom'})};{const Schema=z.string();for(let i=0;i<val.length;i++){if(!Schema.safeParse(val[i]).success){ctx.addIssue({code:'custom'})}}}}})`,
    )
  })
})
