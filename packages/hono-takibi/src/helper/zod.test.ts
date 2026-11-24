import { describe, expect, it } from 'vite-plus/test'

import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import type { Schema } from '../openapi/index.js'
import {
  isAskedOperand,
  emitTypelessRefine,
  makeConditionalCheck,
  makeParentStrictCheck,
  makeSiblingKeywordCheck,
  makeUnevaluatedItemsCheck,
  makeSiblingCombinatorCheck,
  makeStrictOperandCheck,
  makeUnevaluatedProperties,
  makeUnevaluatedPropertiesCheck,
  isShapeMember,
  makeIssueForwarding,
  narrowToDeclaredType,
} from './zod.js'

const recurse = zodToOpenAPI

// Unit tests for the internal helpers that zodToOpenAPI calls. Where
// zod-to-openapi/index.test.ts pins the *combinations* along the typeless path, this file covers
// the branches of helper/zod.ts alone with minimal reproductions. Runtime behaviour that depends
// on Zod lives in zod-to-openapi/index.test.ts, so this file only asserts the emitted string.

describe('helper/zod', () => {
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
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"a")).success){ctx.addIssue({code:'custom'})}};for(const k of Object.keys(val)){if(!["a"].includes(k)){ctx.addIssue({code:'custom'})}}}})`,
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
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"a")).success){ctx.addIssue({code:'custom'})}};{const Schema=z.number();for(const k of Object.keys(val)){if(!["a"].includes(k)){if(!Schema.safeParse(Reflect.get(val,k)).success){ctx.addIssue({code:'custom'})}}}}}})`,
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
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.object({b:z.string().exactOptional()}).openapi({"required":[]});const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}}})`,
      )
    })

    // #601: the message is encoded once — `messageFor` already returns the literal.
    it('writes x-dependentSchemas-message as one string literal', () => {
      expect(
        emitTypelessRefine(
          {
            dependentSchemas: { a: { required: ['b'] } },
            'x-dependentSchemas-message': 'dep failed',
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"b")){ctx.addIssue({code:'custom'})}}}).openapi({"required":["b"]});const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path,message:"dep failed"})}}}}})`,
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

    it('falls back from x-minContains-message / x-maxContains-message to x-contains-message, then x-error-message (#601)', () => {
      expect(
        emitTypelessRefine(
          {
            contains: { type: 'string' },
            minContains: 2,
            maxContains: 3,
            'x-contains-message': 'contains',
            'x-maxContains-message': 'max',
            'x-error-message': 'error',
          },
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(Array.isArray(val)){{const m=val.filter((i)=>z.string().safeParse(i).success).length;if(m<2){ctx.addIssue({code:'custom',message:"contains"})};if(m>3){ctx.addIssue({code:'custom',message:"max"})}}}})`,
      )
    })

    it('calls an arrow-function message with the issue it answers for (#601)', () => {
      expect(
        emitTypelessRefine(
          {
            dependentSchemas: { a: { required: ['b'] } },
            minProperties: 1,
            'x-dependentSchemas-message': '(issue) => `dep ${issue.code}`',
            'x-minProperties-message': '(issue) => `min ${issue.code}`',
          },
          () => 'S',
        ),
      ).toBe(
        "z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.keys(val).length<1){ctx.addIssue({code:'custom',message:((issue) => `min ${issue.code}`)({code:'custom',path:[],input:val})})};if(Object.hasOwn(val,\"a\")){const Schema=S;const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path,message:((issue) => `dep ${issue.code}`)(issue)})}}}}})",
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
        `z.unknown().superRefine((val,ctx)=>{{const Schema=z.object({a:z.string().exactOptional()}).openapi({"required":[]});const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}};{const Schema=z.object({b:z.number().exactOptional()}).openapi({"required":[]});const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}})`,
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
        `z.unknown().superRefine((val,ctx)=>{{const ifOk=z.object({kind:z.literal("A").exactOptional()}).openapi({"required":[]}).safeParse(val).success;if(ifOk){const Schema=z.looseObject({}).openapi({"required":["x"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom',message:"err"})}};if(!ifOk){const Schema=z.looseObject({}).openapi({"required":["y"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom',message:"err"})}}}})`,
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
        `z.unknown().superRefine((val,ctx)=>{{const ifOk=z.object({kind:z.literal("a").exactOptional()}).openapi({"required":[]}).safeParse(val).success;if(ifOk){const Schema=z.object({x:z.string()}).openapi({"required":["x"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom'})}};if(!ifOk){const Schema=z.object({y:z.int()}).openapi({"required":["y"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom'})}}}})`,
      )
    })
  })

  describe('makeUnevaluatedProperties', () => {
    it('returns empty string when unevaluatedProperties is undefined', () => {
      expect(makeUnevaluatedProperties({ type: 'object' }, recurse)).toBe('')
    })

    it('returns empty string when unevaluatedProperties is true', () => {
      expect(
        makeUnevaluatedProperties({ type: 'object', unevaluatedProperties: true }, recurse),
      ).toBe('')
    })

    it('emits .superRefine for unevaluatedProperties: false with own properties', () => {
      expect(
        makeUnevaluatedProperties(
          {
            properties: { a: { type: 'string' } },
            unevaluatedProperties: false,
          },
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
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){for(const p of ["^x_"]){if(new RegExp(p).test(k)){e.add(k)}}};for(const k of ["b"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('counts additionalProperties keys as evaluated (#462)', () => {
      expect(
        makeUnevaluatedProperties(
          {
            additionalProperties: { type: 'string' },
            unevaluatedProperties: false,
          },
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of Object.keys(o)){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('counts additionalProperties: true keys as evaluated (#462)', () => {
      expect(
        makeUnevaluatedProperties(
          {
            additionalProperties: true,
            unevaluatedProperties: false,
          },
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of Object.keys(o)){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('excludes declared properties from the additionalProperties stmt (#462)', () => {
      expect(
        makeUnevaluatedProperties(
          {
            properties: { a: { type: 'string' } },
            additionalProperties: { type: 'string' },
            unevaluatedProperties: false,
          },
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){if(!["a"].includes(k)){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('does not count additionalProperties: false keys as evaluated (#462)', () => {
      expect(
        makeUnevaluatedProperties(
          {
            additionalProperties: false,
            unevaluatedProperties: false,
          },
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('excludes pattern-matched keys from the additionalProperties stmt (#462)', () => {
      expect(
        makeUnevaluatedProperties(
          {
            patternProperties: { '^x_': { type: 'string' } },
            additionalProperties: { type: 'string' },
            unevaluatedProperties: false,
          },
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of Object.keys(o)){for(const p of ["^x_"]){if(new RegExp(p).test(k)){e.add(k)}}};for(const k of Object.keys(o)){if(!["^x_"].some((p)=>new RegExp(p).test(k))){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('counts additionalProperties inside allOf / anyOf / oneOf branches (#462)', () => {
      expect(
        makeUnevaluatedProperties(
          {
            allOf: [{ additionalProperties: { type: 'string' } }],
            anyOf: [{ type: 'object', additionalProperties: { type: 'string' } }],
            oneOf: [{ type: 'object', additionalProperties: true }],
            unevaluatedProperties: false,
          },
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of Object.keys(o)){e.add(k)};if(z.record(z.string(),z.string()).safeParse(o).success){for(const k of Object.keys(o)){e.add(k)}};if(z.looseObject({}).safeParse(o).success){for(const k of Object.keys(o)){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('counts additionalProperties inside if / then / else (#462)', () => {
      expect(
        makeUnevaluatedProperties(
          {
            if: { type: 'object', additionalProperties: { type: 'string' } },
            // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
            then: { type: 'object', additionalProperties: true },
            else: { type: 'object', properties: { c: { type: 'string' } } },
            unevaluatedProperties: false,
          },
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();const ifOk=z.record(z.string(),z.string()).safeParse(o).success;if(ifOk){for(const k of Object.keys(o)){e.add(k)}};if(ifOk){for(const k of Object.keys(o)){e.add(k)}};if(!ifOk){for(const k of ["c"]){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('counts additionalProperties inside dependentSchemas (#462)', () => {
      expect(
        makeUnevaluatedProperties(
          {
            dependentSchemas: {
              e: { type: 'object', additionalProperties: { type: 'string' } },
            },
            unevaluatedProperties: false,
          },
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();if("e" in o){for(const k of Object.keys(o)){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('skips additionalProperties keys for the unevaluatedProperties schema form (#462)', () => {
      expect(
        makeUnevaluatedProperties(
          {
            additionalProperties: { type: 'string' },
            unevaluatedProperties: { type: 'number' },
          },
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of Object.keys(o)){e.add(k)};const Schema=z.number();for(const [k,val] of Object.entries(o)){if(e.has(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]})}}}})`,
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
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();if(z.object({c:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success){for(const k of ["c"]){e.add(k)}};if(z.object({d:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success){for(const k of ["d"]){e.add(k)}};if("e" in o){for(const k of ["f"]){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
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
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();const ifOk=z.object({a:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success;if(ifOk){for(const k of ["a"]){e.add(k)}};if(ifOk){for(const k of ["b"]){e.add(k)}};if(!ifOk){for(const k of ["c"]){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
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
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;const e=new Set();for(const k of ["a"]){e.add(k)};const Schema=z.number();for(const [k,val] of Object.entries(o)){if(e.has(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){${makeIssueForwarding('{...issue,path:[k,...issue.path],input:issue.input}')}}}}}`,
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
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;let mA=0;let mO=0;const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){for(const p of ["^x_"]){if(new RegExp(p).test(k)){e.add(k)}}};for(const k of ["b"]){e.add(k)};if(z.object({c:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success){mA++;for(const k of ["c"]){e.add(k)}};if(z.object({d:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success){mO++;for(const k of ["d"]){e.add(k)}};const ifOk=z.object({x:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success;if(ifOk){for(const k of ["x"]){e.add(k)}};if(ifOk){for(const k of ["y"]){e.add(k)}};if(!ifOk){for(const k of ["z"]){e.add(k)}};if("e" in o){for(const k of ["f"]){e.add(k)}};if(mA>0&&mO===1){for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o,message:"unevaluated"})}}}}`,
      )
    })

    // #480: with a schema-form `unevaluatedProperties`, the per-key validation
    // is gated on the union succeeding too — here the `anyOf` guard only,
    // because the caller passes `{ anyOf: true }`.
    it('gates the schema-form final statement on the anyOf union succeeding', () => {
      expect(
        makeUnevaluatedPropertiesCheck(
          {
            properties: { a: { type: 'string' } },
            anyOf: [{ type: 'object', properties: { c: { type: 'string' } } }],
            unevaluatedProperties: { type: 'number' },
          },
          recurse,
          undefined,
          undefined,
          { anyOf: true },
        ),
      ).toBe(
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;let mA=0;const e=new Set();for(const k of ["a"]){e.add(k)};if(z.object({c:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success){mA++;for(const k of ["c"]){e.add(k)}};if(mA>0){const Schema=z.number();for(const [k,val] of Object.entries(o)){if(e.has(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){${makeIssueForwarding('{...issue,path:[k,...issue.path],input:issue.input}')}}}}}}`,
      )
    })

    // #405: the keys a `$ref` member of the allOf declares are evaluated too, and an issue
    // of the unevaluated-properties schema is forwarded by its code
    it('evaluates the keys of a referenced allOf member, and forwards issues by code', () => {
      const schemas = {
        Base: { type: 'object', properties: { meta: { type: 'string' } } },
        Deep: { allOf: [{ $ref: '#/components/schemas/Base' }], properties: { d: {} } },
        Loop: { allOf: [{ $ref: '#/components/schemas/Loop' }], properties: { l: {} } },
      } as const
      const code = makeUnevaluatedPropertiesCheck(
        {
          allOf: [
            { $ref: '#/components/schemas/Base' },
            { $ref: '#/components/schemas/Deep' },
            { $ref: '#/components/schemas/Loop' },
            { $ref: '#/components/schemas/Nope' },
            { type: 'object', properties: { doc_count: { type: 'integer' } } },
          ],
          unevaluatedProperties: { $ref: '#/components/schemas/Base' },
        },
        recurse,
        undefined,
        schemas,
      )
      expect(code).toBe(
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;const e=new Set();for(const k of ["meta"]){e.add(k)};for(const k of ["d"]){e.add(k)};for(const k of ["meta"]){e.add(k)};for(const k of ["l"]){e.add(k)};for(const k of ["doc_count"]){e.add(k)};const Schema=BaseSchema;for(const [k,val] of Object.entries(o)){if(e.has(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){if(issue.code==='invalid_type'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}else if(issue.code==='too_big'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}else if(issue.code==='too_small'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}else if(issue.code==='invalid_format'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}else if(issue.code==='not_multiple_of'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}else if(issue.code==='unrecognized_keys'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}else if(issue.code==='invalid_union'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}else if(issue.code==='invalid_key'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}else if(issue.code==='invalid_element'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}else if(issue.code==='invalid_value'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}else if(issue.code==='custom'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input})}}}}}`,
      )
    })

    // #462: the keys a referenced allOf member's `additionalProperties` applies to
    // are evaluated too, excluding the keys its own `properties` declares
    it('evaluates the additionalProperties keys of a referenced allOf member', () => {
      const schemas = {
        Base: {
          type: 'object',
          properties: { meta: { type: 'string' } },
          additionalProperties: { type: 'string' },
        },
      } as const
      const code = makeUnevaluatedPropertiesCheck(
        {
          allOf: [{ $ref: '#/components/schemas/Base' }],
          unevaluatedProperties: false,
        },
        recurse,
        undefined,
        schemas,
      )
      expect(code).toBe(
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;const e=new Set();for(const k of ["meta"]){e.add(k)};for(const k of Object.keys(o)){if(!["meta"].includes(k)){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}`,
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

describe('helper/zod: narrowToDeclaredType (#468)', () => {
  it.concurrent('returns the schema itself when nothing has to change', () => {
    const untyped: Schema = { anyOf: [{ minLength: 1 }] }
    expect(narrowToDeclaredType(untyped)).toBe(untyped)
    const noCombinator: Schema = { type: 'string', minLength: 1 }
    expect(narrowToDeclaredType(noCombinator)).toBe(noCombinator)
    const nullOnly: Schema = { type: 'null', anyOf: [{ minLength: 1 }] }
    expect(narrowToDeclaredType(nullOnly)).toBe(nullOnly)
    const settled: Schema = { type: 'number', oneOf: [{ type: 'integer' }, { const: 1.5 }] }
    expect(narrowToDeclaredType(settled)).toBe(settled)
    const unresolved: Schema = { type: 'object', allOf: [{ $ref: '#/components/schemas/A' }] }
    expect(narrowToDeclaredType(unresolved)).toBe(unresolved)
    const emptyUnion: Schema = { type: 'string', anyOf: [] }
    expect(narrowToDeclaredType(emptyUnion)).toBe(emptyUnion)
    const shaped: Schema = {
      type: 'object',
      properties: { a: { type: 'string' } },
      anyOf: [{ required: ['a'] }],
    }
    expect(narrowToDeclaredType(shaped)).toBe(shaped)
  })

  it.concurrent('writes the type into the members that can take it', () => {
    expect(
      narrowToDeclaredType({ type: 'string', anyOf: [{ minLength: 1 }, { type: 'string' }] }),
    ).toStrictEqual({
      type: 'string',
      anyOf: [{ minLength: 1, type: 'string' }, { type: 'string' }],
    })
    expect(
      narrowToDeclaredType({ type: 'integer', allOf: [{ minimum: 1 }, { description: 'x' }] }),
    ).toStrictEqual({
      type: 'integer',
      allOf: [{ minimum: 1, type: 'integer' }, { description: 'x' }],
    })
  })

  it.concurrent('intersects the type with what cannot take it', () => {
    expect(
      narrowToDeclaredType({ type: ['string', 'null'], oneOf: [{ minimum: 1 }] }),
    ).toStrictEqual({
      type: ['string', 'null'],
      oneOf: [{ allOf: [{ type: 'string' }, { minimum: 1 }] }],
    })
    expect(narrowToDeclaredType({ type: 'object', allOf: [{ required: ['a'] }] })).toStrictEqual({
      type: 'object',
      allOf: [{ type: 'object' }, { required: ['a'] }],
    })
    // a resolved reference that admits other types; a cycle is taken as conforming
    const schemas: { readonly [k: string]: Schema } = {
      Any: { minLength: 1 },
      Loop: { allOf: [{ $ref: '#/components/schemas/Loop' }] },
    }
    expect(
      narrowToDeclaredType(
        { type: 'string', allOf: [{ $ref: '#/components/schemas/Any' }] },
        schemas,
      ),
    ).toStrictEqual({
      type: 'string',
      allOf: [{ type: 'string' }, { $ref: '#/components/schemas/Any' }],
    })
    const loop: Schema = { type: 'string', allOf: [{ $ref: '#/components/schemas/Loop' }] }
    expect(narrowToDeclaredType(loop, schemas)).toBe(loop)
  })

  it.concurrent('a narrowed schema comes back unchanged', () => {
    const cases: readonly Schema[] = [
      { type: 'string', anyOf: [{ minLength: 1 }, { enum: ['a', 1] }] },
      { type: 'object', allOf: [{ required: ['a'] }] },
      { type: ['string', 'number'], oneOf: [{ minLength: 1 }] },
    ]
    for (const schema of cases) {
      const narrowed = narrowToDeclaredType(schema)
      expect(narrowed).not.toBe(schema)
      expect(narrowToDeclaredType(narrowed)).toBe(narrowed)
    }
  })
})

// The pieces of the check `makeStrictOperandCheck` emits.
const strictGuard = `const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;`
const undeclaredKeys = (list: string, message = '') =>
  `for(const k of Object.keys(o)){if(!${list}.includes(k)){ctx.issues.push({code:"custom",path:[k],input:o${message}})}}`
const handOn = (parsed: string) =>
  `{const result=${parsed};if(!result.success&&result.error.issues.every((issue)=>issue.code==='unrecognized_keys'&&issue.path.length===0)){for(const issue of result.error.issues){if(issue.code==='unrecognized_keys'){for(const k of issue.keys){ctx.issues.push({code:"custom",path:[k],input:o,message:issue.message})}}}}}`
// A check that reports from the schema alone, and one that parses the operand `zod`.
const told = (...statements: readonly string[]) => ({
  sync: `(ctx)=>{${strictGuard}${statements.join(';')}}`,
})
const asked = (zod: string) => ({
  sync: `(ctx)=>{${strictGuard}${handOn(`${zod}.safeParse(o)`)}}`,
  async: `async(ctx)=>{${strictGuard}${handOn(`(await ${zod}.safeParseAsync(o))`)}}`,
})

describe('helper/zod: makeStrictOperandCheck (#470)', () => {
  const str = { type: 'string' } as const
  const strict = { type: 'object', properties: { id: str }, additionalProperties: false } as const

  it('returns undefined when no operand is strict', () => {
    expect(makeStrictOperandCheck([])).toBeUndefined()
    expect(
      makeStrictOperandCheck([
        { schema: { type: 'object', properties: { id: str } }, zod: 'A' },
        { schema: { type: 'object', additionalProperties: true }, zod: 'B' },
        { schema: { type: 'object', additionalProperties: str }, zod: 'C' },
        { schema: { type: 'string' }, zod: 'D' },
      ]),
    ).toBeUndefined()
  })

  it('reports the keys a strict object does not declare', () => {
    expect(makeStrictOperandCheck([{ schema: strict, zod: 'A' }])).toStrictEqual(
      told(undeclaredKeys('["id"]')),
    )
  })

  it('checks every strict operand, each against its own keys', () => {
    expect(
      makeStrictOperandCheck([
        { schema: strict, zod: 'A' },
        { schema: { type: 'object', properties: { link: str } }, zod: 'B' },
        {
          schema: { type: 'object', properties: { x: str, y: str }, additionalProperties: false },
          zod: 'C',
        },
      ]),
    ).toStrictEqual(told(undeclaredKeys('["id"]'), undeclaredKeys('["x","y"]')))
  })

  it('reads a reference as the component it names, not what is written beside it', () => {
    const schemas = { Strict: strict, Open: { type: 'object', properties: { id: str } } } as const
    expect(
      makeStrictOperandCheck(
        [{ schema: { $ref: '#/components/schemas/Strict' }, zod: 'StrictSchema' }],
        schemas,
      ),
    ).toStrictEqual(told(undeclaredKeys('["id"]')))
    // A keyword beside a `$ref` is not emitted — the operand is the component — so it
    // neither adds to the keys the component declares nor makes an open one strict.
    expect(
      makeStrictOperandCheck(
        [
          {
            schema: { $ref: '#/components/schemas/Strict', properties: { extra: str } },
            zod: 'StrictSchema',
          },
        ],
        schemas,
      ),
    ).toStrictEqual(told(undeclaredKeys('["id"]')))
    expect(
      makeStrictOperandCheck(
        [
          {
            schema: { $ref: '#/components/schemas/Open', additionalProperties: false },
            zod: 'OpenSchema',
          },
        ],
        schemas,
      ),
    ).toBeUndefined()
    // The wrapping beside it is emitted: a catch answers the failure.
    expect(
      makeStrictOperandCheck(
        [{ schema: { $ref: '#/components/schemas/Strict', 'x-catch': {} }, zod: 'S' }],
        schemas,
      ),
    ).toBeUndefined()
    // A reference that cannot be resolved says nothing about its keys.
    expect(
      makeStrictOperandCheck([{ schema: { $ref: '#/components/schemas/Strict' }, zod: 'S' }]),
    ).toBeUndefined()
  })

  it('uses x-additionalProperties-message as the message of the keys', () => {
    expect(
      makeStrictOperandCheck([
        { schema: { ...strict, 'x-additionalProperties-message': 'no extras' }, zod: 'A' },
      ]),
    ).toStrictEqual(told(undeclaredKeys('["id"]', ',message:"no extras"')))
  })

  it('takes an untyped object, and one of no property', () => {
    expect(
      makeStrictOperandCheck([
        { schema: { properties: { id: str }, additionalProperties: false }, zod: 'A' },
      ]),
    ).toStrictEqual(told(undeclaredKeys('["id"]')))
    expect(
      makeStrictOperandCheck([
        { schema: { type: 'object', additionalProperties: false }, zod: 'A' },
      ]),
    ).toStrictEqual(
      told(`for(const k of Object.keys(o)){ctx.issues.push({code:"custom",path:[k],input:o})}`),
    )
  })

  it('leaves alone what reports nothing: a user chain, a catch', () => {
    expect(
      makeStrictOperandCheck([
        { schema: { ...strict, 'x-transform': '(val) => val' }, zod: 'A' },
        { schema: { ...strict, 'x-catch': {} }, zod: 'B' },
      ]),
    ).toBeUndefined()
  })

  it('asks an operand that can only hand the issue on, sync and async', () => {
    // A union, a multi-type, and an `allOf` of one member, which is emitted as the member.
    const union = { anyOf: [strict, str] }
    expect(makeStrictOperandCheck([{ schema: union, zod: 'U' }])).toStrictEqual(asked('U'))
    expect(isAskedOperand(union)).toBe(true)
    expect(
      makeStrictOperandCheck([
        {
          schema: {
            type: ['object', 'string'],
            properties: { id: str },
            additionalProperties: false,
          },
          zod: 'M',
        },
      ]),
    ).toStrictEqual(asked('M'))
    expect(makeStrictOperandCheck([{ schema: { allOf: [union] }, zod: 'S' }])).toStrictEqual(
      asked('S'),
    )
    // What the schema alone tells is not asked.
    expect(isAskedOperand(strict)).toBe(false)
    expect(isAskedOperand({ type: 'string' })).toBe(false)
  })

  const cat = {
    type: 'object',
    properties: { kind: { const: 'cat' }, meow: str },
    required: ['kind'],
    additionalProperties: false,
  } as const
  const dog = {
    type: 'object',
    properties: { kind: { enum: ['dog', 'puppy'] } },
    required: ['kind'],
    additionalProperties: false,
  } as const
  const bird = {
    type: 'object',
    properties: { kind: { const: 'bird' } },
    required: ['kind'],
  } as const
  const pet = { oneOf: [cat, dog, bird], discriminator: { propertyName: 'kind' } } as const

  it('looks up the keys of a discriminated union by its discriminator, parsing nothing', () => {
    // A branch that is not strict has no entry: every key is its own to take.
    expect(makeStrictOperandCheck([{ schema: pet, zod: 'Pet' }])).toStrictEqual(
      told(
        `{const own:{readonly [k:string]:readonly string[]}={"cat":["kind","meow"],"dog":["kind"],"puppy":["kind"]};const d=String(Reflect.get(o,"kind"));const keys=Object.hasOwn(own,d)?own[d]:undefined;if(keys!==undefined){for(const k of Object.keys(o)){if(!keys.includes(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}`,
      ),
    )
    expect(isAskedOperand(pet)).toBe(false)
    // `z.xor` reports a branch that failed as `invalid_union`: nothing to hand on.
    expect(makeStrictOperandCheck([{ schema: { oneOf: [cat, dog] }, zod: 'Xor' }])).toBeUndefined()
    // No strict branch, nothing to check.
    expect(
      makeStrictOperandCheck([
        {
          schema: {
            oneOf: [bird, { ...bird, properties: { kind: { const: 'fish' } } }],
            discriminator: { propertyName: 'kind' },
          },
          zod: 'P',
        },
      ]),
    ).toBeUndefined()
  })

  it('asks a discriminated union whose strict branch needs more than its keys', () => {
    const patterned = { ...cat, patternProperties: { '^x-': str } }
    const union = { oneOf: [patterned, dog], discriminator: { propertyName: 'kind' } } as const
    expect(makeStrictOperandCheck([{ schema: union, zod: 'Pet' }])).toStrictEqual(asked('Pet'))
    expect(isAskedOperand(union)).toBe(true)
  })

  it('leaves an allOf of several members to its own check', () => {
    expect(
      makeStrictOperandCheck([
        { schema: { allOf: [strict, { type: 'object', properties: { link: str } }] }, zod: 'I' },
      ]),
    ).toBeUndefined()
  })
})

// What a branch is emitted as, for the checks below.
const emitBranch = (schema: Schema) => (schema.type === 'string' ? 'S' : 'N')

const forwardedUnderKey = (message = '') =>
  [
    'invalid_type',
    'too_big',
    'too_small',
    'invalid_format',
    'not_multiple_of',
    'unrecognized_keys',
    'invalid_union',
    'invalid_key',
    'invalid_element',
    'invalid_value',
    'custom',
  ]
    .map(
      (code, index) =>
        `${index === 0 ? '' : 'else '}if(issue.code==='${code}'){ctx.issues.push({...issue,path:[k,...issue.path],input:issue.input${message}})}`,
    )
    .join('')

const additionalBody = (skip: string, parsed: string, message = '') =>
  `(ctx)=>{${strictGuard}const Schema=S;for(const k of Object.keys(o)){${skip}const result=${parsed};if(!result.success){for(const issue of result.error.issues){${forwardedUnderKey(message)}}}}}`

describe('helper/zod: makeParentStrictCheck', () => {
  const str = { type: 'string' } as const

  it('returns undefined unless additionalProperties is false or a schema', () => {
    expect(makeParentStrictCheck({ properties: { a: str } }, emitBranch)).toBeUndefined()
    expect(makeParentStrictCheck({ additionalProperties: true }, emitBranch)).toBeUndefined()
  })

  it('parses the keys the schema does not declare with a schema-valued one (#647)', () => {
    expect(makeParentStrictCheck({ additionalProperties: str }, emitBranch)).toStrictEqual({
      sync: additionalBody('', 'Schema.safeParse(Reflect.get(o,k))'),
      async: `async${additionalBody('', '(await Schema.safeParseAsync(Reflect.get(o,k)))')}`,
    })
    const skip = `if(["a"].includes(k)||["^x-"].some((p)=>new RegExp(p).test(k))){continue}`
    expect(
      makeParentStrictCheck(
        {
          properties: { a: str },
          patternProperties: { '^x-': str },
          additionalProperties: str,
          'x-additionalProperties-message': 'text only',
        },
        emitBranch,
      ),
    ).toStrictEqual({
      sync: additionalBody(skip, 'Schema.safeParse(Reflect.get(o,k))', ',message:"text only"'),
      async: `async${additionalBody(skip, '(await Schema.safeParseAsync(Reflect.get(o,k)))', ',message:"text only"')}`,
    })
  })

  it('reports the keys the schema itself neither declares nor matches with a pattern', () => {
    expect(
      makeParentStrictCheck({ properties: { a: str }, additionalProperties: false }, emitBranch),
    ).toStrictEqual(told(undeclaredKeys('["a"]')))
    expect(
      makeParentStrictCheck(
        {
          properties: { a: str },
          patternProperties: { '^x-': str },
          additionalProperties: false,
          'x-additionalProperties-message': 'no extras',
        },
        emitBranch,
      ),
    ).toStrictEqual(
      told(
        `for(const k of Object.keys(o)){if(!["a"].includes(k)&&!["^x-"].some((p)=>new RegExp(p).test(k))){ctx.issues.push({code:"custom",path:[k],input:o,message:"no extras"})}}`,
      ),
    )
    // No property of its own: every key is undeclared.
    expect(makeParentStrictCheck({ additionalProperties: false }, emitBranch)).toStrictEqual(
      told(`for(const k of Object.keys(o)){ctx.issues.push({code:"custom",path:[k],input:o})}`),
    )
  })
})

// The check of sibling combinators, with each schema parsed synchronously and awaited.
const siblingCheck = (statements: (parse: (zod: string) => string) => string) => ({
  sync: `(ctx)=>{const val=ctx.value;${statements((zod) => `${zod}.safeParse(val)`)}}`,
  async: `async(ctx)=>{const val=ctx.value;${statements((zod) => `(await ${zod}.safeParseAsync(val))`)}}`,
})

describe('helper/zod: makeSiblingCombinatorCheck (#469)', () => {
  const schema = {
    anyOf: [{ type: 'string' }, { type: 'number' }],
    oneOf: [{ type: 'string' }, { type: 'number' }],
    not: { type: 'string' },
  } as const

  it('returns undefined when there is nothing to check', () => {
    expect(makeSiblingCombinatorCheck(schema, [], emitBranch)).toBeUndefined()
    expect(
      makeSiblingCombinatorCheck({ anyOf: [], oneOf: [] }, ['anyOf', 'oneOf'], emitBranch),
    ).toBeUndefined()
    expect(makeSiblingCombinatorCheck({}, ['not'], emitBranch)).toBeUndefined()
  })

  it('asks at least one anyOf branch, exactly one oneOf branch, and no not', () => {
    expect(makeSiblingCombinatorCheck(schema, ['anyOf'], emitBranch)).toStrictEqual(
      siblingCheck(
        (parse) =>
          `if(!(${parse('S')}.success||${parse('N')}.success)){ctx.issues.push({code:"custom",input:val})}`,
      ),
    )
    expect(makeSiblingCombinatorCheck(schema, ['oneOf'], emitBranch)).toStrictEqual(
      siblingCheck(
        (parse) =>
          `if(((${parse('S')}.success?1:0)+(${parse('N')}.success?1:0))!==1){ctx.issues.push({code:"custom",input:val})}`,
      ),
    )
    expect(makeSiblingCombinatorCheck(schema, ['not'], emitBranch)).toStrictEqual(
      siblingCheck(
        (parse) => `if(${parse('S')}.success){ctx.issues.push({code:"custom",input:val})}`,
      ),
    )
  })

  it('checks only the combinators it is asked about, in one callback', () => {
    expect(makeSiblingCombinatorCheck(schema, ['oneOf', 'not'], emitBranch)).toStrictEqual(
      siblingCheck(
        (parse) =>
          `if(((${parse('S')}.success?1:0)+(${parse('N')}.success?1:0))!==1){ctx.issues.push({code:"custom",input:val})};if(${parse('S')}.success){ctx.issues.push({code:"custom",input:val})}`,
      ),
    )
  })

  it('takes the message of each keyword, x-error-message otherwise', () => {
    expect(
      makeSiblingCombinatorCheck(
        { ...schema, 'x-anyOf-message': 'any', 'x-error-message': 'bad' },
        ['anyOf', 'not'],
        emitBranch,
      ),
    ).toStrictEqual(
      siblingCheck(
        (parse) =>
          `if(!(${parse('S')}.success||${parse('N')}.success)){ctx.issues.push({code:"custom",input:val,message:"any"})};if(${parse('S')}.success){ctx.issues.push({code:"custom",input:val,message:"bad"})}`,
      ),
    )
    // An arrow function is called with the issue it is the message of.
    expect(
      makeSiblingCombinatorCheck(
        { ...schema, 'x-not-message': '(iss) => iss.code' },
        ['not'],
        emitBranch,
      ),
    ).toStrictEqual(
      siblingCheck(
        (parse) =>
          `if(${parse('S')}.success){ctx.issues.push({code:"custom",input:val,message:((iss) => iss.code)({code:'custom',path:[],input:val})})}`,
      ),
    )
  })
})

describe('helper/zod: makeUnevaluatedItemsCheck (#647)', () => {
  const guard = 'const a=ctx.value;if(!Array.isArray(a))return;'
  const reportRest =
    'for(let i=n;i<a.length;i++){ctx.issues.push({code:"custom",path:[i],input:a})}'

  it('returns undefined when nothing is left to it', () => {
    expect(makeUnevaluatedItemsCheck({ allOf: [{ type: 'array' }] }, emitBranch)).toBeUndefined()
    expect(
      makeUnevaluatedItemsCheck({ allOf: [{ type: 'array' }], unevaluatedItems: true }, emitBranch),
    ).toBeUndefined()
    // `items` evaluates every element.
    expect(
      makeUnevaluatedItemsCheck(
        { allOf: [{ type: 'array' }], items: { type: 'string' }, unevaluatedItems: false },
        emitBranch,
      ),
    ).toBeUndefined()
  })

  it('counts what the members of an allOf and a referenced component evaluate', () => {
    expect(
      makeUnevaluatedItemsCheck(
        {
          prefixItems: [{ type: 'string' }],
          allOf: [{ $ref: '#/components/schemas/Pair' }, { minItems: 1 }],
          unevaluatedItems: false,
        },
        emitBranch,
        { Pair: { prefixItems: [{ type: 'string' }, { type: 'number' }] } },
      ),
    ).toStrictEqual({
      sync: `(ctx)=>{${guard}let n=0;n=Math.max(n,1);n=Math.max(n,2);${reportRest}}`,
    })
    // A member with `items`, or an `unevaluatedItems` of its own, evaluates every element.
    expect(
      makeUnevaluatedItemsCheck(
        { allOf: [{ items: { type: 'string' } }], unevaluatedItems: false },
        emitBranch,
      ),
    ).toStrictEqual({ sync: `(ctx)=>{${guard}let n=0;n=Infinity;${reportRest}}` })
    expect(
      makeUnevaluatedItemsCheck(
        { allOf: [{ unevaluatedItems: { type: 'string' } }], unevaluatedItems: false },
        emitBranch,
      ),
    ).toStrictEqual({ sync: `(ctx)=>{${guard}let n=0;n=Infinity;${reportRest}}` })
  })

  it('counts the branches that match, and reports only when the union has a match', () => {
    const body = (parse: (zod: string) => string) =>
      `(ctx)=>{${guard}let n=0,mA=0;if(${parse('N')}.success){mA++;n=Math.max(n,1)};if(${parse('S')}.success){mA++};if(mA>0){${reportRest}}}`
    expect(
      makeUnevaluatedItemsCheck(
        {
          anyOf: [{ prefixItems: [{ type: 'string' }] }, { type: 'string' }],
          unevaluatedItems: false,
        },
        emitBranch,
      ),
    ).toStrictEqual({
      sync: body((zod) => `${zod}.safeParse(a)`),
      async: `async${body((zod) => `(await ${zod}.safeParseAsync(a))`)}`,
    })
    expect(
      makeUnevaluatedItemsCheck(
        { oneOf: [{ prefixItems: [{ type: 'string' }] }], unevaluatedItems: false },
        emitBranch,
      )?.sync,
    ).toBe(
      `(ctx)=>{${guard}let n=0,mO=0;if(N.safeParse(a).success){mO++;n=Math.max(n,1)};if(mO===1){${reportRest}}}`,
    )
  })

  it('counts what if / then / else select, and a nested branch only when it evaluates', () => {
    expect(
      makeUnevaluatedItemsCheck(
        {
          allOf: [{ anyOf: [{ type: 'string' }, { prefixItems: [{ type: 'string' }] }] }],
          if: { type: 'string' },
          // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
          then: { prefixItems: [{}, {}] },
          else: { items: true },
          unevaluatedItems: false,
        },
        emitBranch,
      )?.sync,
    ).toBe(
      `(ctx)=>{${guard}let n=0;if(N.safeParse(a).success){n=Math.max(n,1)};if(S.safeParse(a).success){n=Math.max(n,2)}else{n=Infinity};${reportRest}}`,
    )
  })

  it('parses the unevaluated elements with a schema, under their index', () => {
    const forwarded = makeIssueForwarding(
      '{...issue,path:[i,...issue.path],input:issue.input,message:"no more"}',
    )
    const body = (parsed: string) =>
      `(ctx)=>{${guard}let n=0;n=Math.max(n,1);const Schema=S;for(let i=n;i<a.length;i++){const result=${parsed};if(!result.success){for(const issue of result.error.issues){${forwarded}}}}}`
    expect(
      makeUnevaluatedItemsCheck(
        {
          allOf: [{ prefixItems: [{ type: 'number' }] }],
          unevaluatedItems: { type: 'string' },
          'x-unevaluatedItems-message': 'no more',
        },
        emitBranch,
      ),
    ).toStrictEqual({
      sync: body('Schema.safeParse(a[i])'),
      async: `async${body('(await Schema.safeParseAsync(a[i]))')}`,
    })
  })
})

const conditionalStmt = (parse: (zod: string) => string, report: string) =>
  `{const ifOk=${parse('N')}.success;if(ifOk){const Schema=S;if(!${parse('Schema')}.success){${report}}};}`

const parsedSync = (zod: string) => `${zod}.safeParse(val)`

const parsedAwaited = (zod: string) => `(await ${zod}.safeParseAsync(val))`

describe('helper/zod: makeConditionalCheck', () => {
  const conditional = {
    type: 'integer',
    if: { type: 'number' },
    // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
    then: { type: 'string' },
  } as const
  const pushed = "ctx.issues.push({...{code:'custom'},input:val})"
  const added = "ctx.addIssue({code:'custom'})"

  it('returns undefined without if, or without then and else', () => {
    expect(makeConditionalCheck({ type: 'integer' }, emitBranch)).toBeUndefined()
    expect(
      makeConditionalCheck({ type: 'integer', if: { type: 'number' } }, emitBranch),
    ).toBeUndefined()
  })

  it('is a check on the raw input, with an awaited form (#645)', () => {
    expect(makeConditionalCheck(conditional, emitBranch)).toStrictEqual({
      sync: `(ctx)=>{const val=ctx.value;${conditionalStmt(parsedSync, pushed)}}`,
      async: `async(ctx)=>{const val=ctx.value;${conditionalStmt(parsedAwaited, pushed)}}`,
    })
  })

  it('is a refinement of the output where the emitter converts its input (#646)', () => {
    expect(makeConditionalCheck(conditional, emitBranch, true)).toStrictEqual({
      sync: `(val,ctx)=>{${conditionalStmt(parsedSync, added)}}`,
      async: `async(val,ctx)=>{${conditionalStmt(parsedAwaited, added)}}`,
    })
    // A bigint is compared as the number it was read from.
    const asNumber = "const val=typeof output==='bigint'?Number(output):output;"
    expect(
      makeConditionalCheck({ ...conditional, format: 'int64' }, emitBranch, true),
    ).toStrictEqual({
      sync: `(output,ctx)=>{${asNumber}${conditionalStmt(parsedSync, added)}}`,
      async: `async(output,ctx)=>{${asNumber}${conditionalStmt(parsedAwaited, added)}}`,
    })
  })
})

describe('helper/zod: makeSiblingKeywordCheck', () => {
  const pushed = "ctx.issues.push({...{code:'custom'},input:val})"
  const required = `if(!Object.hasOwn(val,"b")){${pushed}}`
  const objectGuard = "typeof val==='object'&&val!==null&&!Array.isArray(val)"

  it('leaves the shape and the unevaluated keywords to the combinator paths', () => {
    expect(
      makeSiblingKeywordCheck(
        {
          anyOf: [{ type: 'string' }],
          properties: { b: { type: 'string' } },
          required: ['b'],
          additionalProperties: false,
          unevaluatedProperties: false,
          unevaluatedItems: false,
        },
        emitBranch,
      ),
    ).toBeUndefined()
    expect(
      makeSiblingKeywordCheck({ anyOf: [{ type: 'string' }], maxLength: 2 }, emitBranch),
    ).toStrictEqual({
      sync: `(ctx)=>{const val=ctx.value;if(typeof val==='string'){if([...val].length>2){${pushed}}}}`,
    })
  })

  it('keeps them beside a not alone, which is emitted on z.any() (#647)', () => {
    expect(
      makeSiblingKeywordCheck(
        { not: { type: 'number' }, required: ['b'], unevaluatedItems: false },
        emitBranch,
        true,
      ),
    ).toStrictEqual({
      sync: `(ctx)=>{const val=ctx.value;if(${objectGuard}){${required}};if(Array.isArray(val)){if(val.length>0){${pushed}}}}`,
    })
  })

  const awaitedBody = (parsed: string, count: string) =>
    `(ctx)=>{const val=ctx.value;if(Array.isArray(val)){{const Schema=S;for(let i=0;i<val.length;i++){if(!${parsed}.success){${pushed}}}};{${count};if(m<1){${pushed}}}}}`

  it('comes with an awaited form when it parses a schema (#645)', () => {
    expect(
      makeSiblingKeywordCheck(
        { anyOf: [{ type: 'array' }], items: { type: 'string' }, contains: { type: 'number' } },
        emitBranch,
      ),
    ).toStrictEqual({
      sync: awaitedBody(
        'Schema.safeParse(val[i])',
        'const m=val.filter((i)=>N.safeParse(i).success).length',
      ),
      async: `async${awaitedBody(
        '(await Schema.safeParseAsync(val[i]))',
        'const Schema=N;let m=0;for(const i of val){if((await Schema.safeParseAsync(i)).success){m++}}',
      )}`,
    })
  })
})

describe('helper/zod: isShapeMember (#634)', () => {
  const P: Schema = { type: 'object', required: ['p'], properties: { p: { type: 'string' } } }
  const ref: Schema = { $ref: '#/components/schemas/P' }
  const properties: Schema['properties'] = { a: { type: 'string' } }

  it('is true beside a declared object type', () => {
    expect(isShapeMember({ type: 'object', allOf: [ref], properties })).toBe(true)
    expect(isShapeMember({ type: 'object', allOf: [{ minLength: 1 }], properties })).toBe(true)
  })

  it('is true when a member only accepts objects', () => {
    expect(isShapeMember({ allOf: [{ type: 'object' }], properties })).toBe(true)
    expect(isShapeMember({ allOf: [ref], properties }, { P })).toBe(true)
  })

  it('is false when nothing rejects a non-object', () => {
    expect(isShapeMember({ allOf: [{ minLength: 1 }], properties })).toBe(false)
    // The target of the `$ref` is not known.
    expect(isShapeMember({ allOf: [ref], properties })).toBe(false)
  })

  it('is false without properties, and without allOf', () => {
    expect(isShapeMember({ type: 'object', allOf: [ref], required: ['p'] }, { P })).toBe(false)
    expect(isShapeMember({ type: 'object', properties })).toBe(false)
  })

  it('is false when the intersection admits a null the shape would reject (#471)', () => {
    expect(isShapeMember({ allOf: [{ ...ref, nullable: true }], properties }, { P })).toBe(false)
    // The parent admits it again, around the whole intersection.
    expect(
      isShapeMember({ nullable: true, allOf: [{ ...ref, nullable: true }], properties }, { P }),
    ).toBe(true)
  })
})
