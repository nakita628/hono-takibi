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

// helper/zod.ts は zodToOpenAPI から呼び出される非公開ヘルパ群を
// 直接ユニットテストする。zod-to-openapi/index.test.ts が typeless 経路の
// 「組み合わせ」を完全一致で固定するのに対し、本ファイルは
// **helper/zod.ts 単独で未カバーだったブランチ** を最小再現で網羅する。
//
// 期待値はすべて実出力を確認した上で toBe で固定。Zod の挙動に依存する
// runtime 試験は zod-to-openapi/index.test.ts 側に集約してあるため、
// 本ファイルは emit 結果 (= 生成コード文字列) の構造保証のみを行う。

describe('helper/zod', () => {
  describe('hasTypelessConstraint', () => {
    it('returns false for empty schema', () => {
      expect(hasTypelessConstraint({} as Schema)).toBe(false)
    })
    it('returns false for schema with only `type`', () => {
      expect(hasTypelessConstraint({ type: 'string' } as Schema)).toBe(false)
    })
    it('returns true for schema with `required`', () => {
      expect(hasTypelessConstraint({ required: ['x'] } as Schema)).toBe(true)
    })
    it('returns true for schema with `if`', () => {
      expect(hasTypelessConstraint({ if: { type: 'object' } } as Schema)).toBe(true)
    })
    it('returns true for schema with `contains`', () => {
      expect(hasTypelessConstraint({ contains: { type: 'string' } } as Schema)).toBe(true)
    })
  })

  describe('emitTypelessRefine', () => {
    it('returns z.any() for empty schema (blocks.length === 0 branch)', () => {
      expect(emitTypelessRefine({} as Schema, recurse)).toBe('z.any()')
    })

    it('emits additionalProperties: false guard (typeless)', () => {
      expect(
        emitTypelessRefine(
          {
            properties: { a: { type: 'string' } },
            additionalProperties: false,
          } as Schema,
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
          } as Schema,
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
          } as Schema,
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
          } as Schema,
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
          } as Schema,
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
          } as Schema,
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(Array.isArray(val)){{const m=val.filter((i)=>z.string().safeParse(i).success).length;if(m<1){ctx.addIssue({code:'custom'})};if(m>3){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits contains with explicit minContains only (lowerMsg ← x-minContains-message)', () => {
      // schema.minContains が指定されているので lowerMsg は x-minContains-message を使う。
      // 未指定だと containsMsg (x-contains-message) を使う。
      expect(
        emitTypelessRefine(
          {
            contains: { type: 'string' },
            minContains: 2,
          } as Schema,
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
          } as Schema,
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
          } as Schema,
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
          } as Schema,
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
          } as Schema,
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
      // messageFor は個別 slot が undefined のとき x-error-message を fallback として返す。
      // 個別 properties slot 未指定 + x-error-message 指定 → property check の message に
      // x-error-message が出る。
      expect(
        emitTypelessRefine(
          {
            properties: { a: { type: 'string' } },
            'x-error-message': 'fallback',
          } as Schema,
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"a")).success){ctx.addIssue({code:'custom',message:"fallback"})}}}})`,
      )
    })

    it('then/else fallback chain: x-error-message reaches then/else via x-if-message', () => {
      // messageFor の `key === 'then' || key === 'else'` ガードは
      // **直接** の x-error-message fallback を抑制する。が、`thenMsg / elseMsg` は
      // `messageFor(s, 'then') ?? ifMsg` のチェーンで、ifMsg 自体は messageFor(s, 'if')
      // 経由で x-error-message に fallback する。
      // → 結果として x-then-message / x-else-message / x-if-message いずれも
      //   未指定で x-error-message のみ指定された場合、then/else 両分岐で
      //   x-error-message が message として発火する。
      expect(
        emitTypelessRefine(
          {
            if: { type: 'object', properties: { kind: { const: 'A' } } },
            // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
            then: { type: 'object', required: ['x'] },
            else: { type: 'object', required: ['y'] },
            'x-error-message': 'err',
          } as Schema,
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{{const ifOk=z.object({kind:z.literal("A").exactOptional()}).safeParse(val).success;if(ifOk){const Schema=z.object({}).openapi({"required":["x"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom',message:"err"})}};if(!ifOk){const Schema=z.object({}).openapi({"required":["y"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom',message:"err"})}}}})`,
      )
    })

    it('pickMessage ignores non-string slot values (boolean) and falls through to undefined', () => {
      // x-properties-message に boolean を渡しても message は省略される。
      // pickMessage の `typeof value !== 'string'` 分岐をカバー。
      expect(
        emitTypelessRefine(
          {
            properties: { a: { type: 'string' } },
            // biome-ignore lint/suspicious/noExplicitAny: testing non-string slot value
            'x-properties-message': true as unknown as string,
          } as Schema,
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"a")).success){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits typeless string constraints (minLength/maxLength/pattern)', () => {
      expect(
        emitTypelessRefine(
          { minLength: 3, maxLength: 10, pattern: '^x' } as Schema,
          recurse,
        ),
      ).toBe(
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
          } as Schema,
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='number'){if(val<0){ctx.addIssue({code:'custom'})};if(val<=0){ctx.addIssue({code:'custom'})};if(val>100){ctx.addIssue({code:'custom'})};if(val>=100){ctx.addIssue({code:'custom'})};{const mod=Math.abs(val/5-Math.round(val/5));if(mod>1e-10){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits typeless array constraints (minItems/maxItems/uniqueItems)', () => {
      expect(
        emitTypelessRefine({ minItems: 1, maxItems: 5, uniqueItems: true } as Schema, recurse),
      ).toBe(
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
          } as Schema,
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.keys(val).length<1){ctx.addIssue({code:'custom'})};if(Object.keys(val).length>5){ctx.addIssue({code:'custom'})};{const Schema=z.string();for(const k of Object.keys(val)){if(new RegExp("^x_").test(k)){if(!Schema.safeParse(Reflect.get(val,k)).success){ctx.addIssue({code:'custom'})}}}};for(const k of Object.keys(val)){if(!new RegExp("^x").test(k)){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits typeless dependentRequired check', () => {
      expect(
        emitTypelessRefine({ dependentRequired: { a: ['b', 'c'] } } as Schema, recurse),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){if(!(Object.hasOwn(val,"b")&&Object.hasOwn(val,"c"))){ctx.addIssue({code:'custom'})}}}})`,
      )
    })

    it('emits typeless const check (any-type)', () => {
      expect(emitTypelessRefine({ const: 'fixed' } as Schema, recurse)).toBe(
        `z.unknown().superRefine((val,ctx)=>{if(JSON.stringify("fixed")!==JSON.stringify(val)){ctx.addIssue({code:'custom'})}})`,
      )
    })

    it('emits typeless enum check (any-type)', () => {
      expect(
        emitTypelessRefine({ enum: ['a', 'b', 'c'] } as Schema, recurse),
      ).toBe(
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
          } as Schema,
          recurse,
        ),
      ).toBe(
        `z.unknown().superRefine((val,ctx)=>{{const ifOk=z.object({kind:z.literal("a").exactOptional()}).safeParse(val).success;if(ifOk){const Schema=z.object({x:z.string()}).openapi({"required":["x"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom'})}};if(!ifOk){const Schema=z.object({y:z.int()}).openapi({"required":["y"]});if(!Schema.safeParse(val).success){ctx.addIssue({code:'custom'})}}}})`,
      )
    })
  })

  describe('makeUnevaluatedProperties', () => {
    it('returns empty string when unevaluatedProperties is undefined', () => {
      expect(makeUnevaluatedProperties({ type: 'object' } as Schema, 'err', recurse)).toBe('')
    })

    it('returns empty string when unevaluatedProperties is true', () => {
      expect(
        makeUnevaluatedProperties(
          { type: 'object', unevaluatedProperties: true } as Schema,
          'err',
          recurse,
        ),
      ).toBe('')
    })

    it('emits .superRefine for unevaluatedProperties: false with own properties', () => {
      expect(
        makeUnevaluatedProperties(
          {
            properties: { a: { type: 'string' } },
            unevaluatedProperties: false,
          } as Schema,
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
          } as Schema,
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
          } as Schema,
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
            // type: 'object' を明示しないと anyOf/oneOf/if の sub-schema は typeless 経路で
            // z.unknown().superRefine(...) に展開される。本テストは object 経路で安定させたい
            // ので type を付与し、conditionalBranchStmt と dependentSchemas の合流を確認する。
            anyOf: [{ type: 'object', properties: { c: { type: 'string' } } }],
            oneOf: [{ type: 'object', properties: { d: { type: 'string' } } }],
            dependentSchemas: { e: { type: 'object', properties: { f: { type: 'string' } } } },
            unevaluatedProperties: false,
          } as Schema,
          'err',
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();if(z.object({c:z.string().exactOptional()}).safeParse(o).success){for(const k of ["c"]){e.add(k)}};if(z.object({d:z.string().exactOptional()}).safeParse(o).success){for(const k of ["d"]){e.add(k)}};if("e" in o){for(const k of ["f"]){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('skips anyOf branch when sub has neither properties nor patternProperties (early return)', () => {
      // conditionalBranchStmt の `!sub.properties && !sub.patternProperties` 早期 return 分岐。
      // `type: 'object'` だけ持つ anyOf sub は evaluated key を提供しないので skip され、
      // evalStmts には evaluator が積まれない (= 既知 key だけが許される)。
      expect(
        makeUnevaluatedProperties(
          {
            properties: { a: { type: 'string' } },
            anyOf: [{ type: 'object' }],
            unevaluatedProperties: false,
          } as Schema,
          'err',
          recurse,
        ),
      ).toBe(
        `.superRefine((o,ctx)=>{const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})`,
      )
    })

    it('emits if/then/else conditional branches into evaluated key set', () => {
      // type:'object' を明示しないと if subschema は typeless 経路で展開されるので、
      // ifZod の安定化のため if のみ type 指定。then/else も同様。
      expect(
        makeUnevaluatedProperties(
          {
            if: { type: 'object', properties: { a: { type: 'string' } } },
            // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
            then: { type: 'object', properties: { b: { type: 'string' } } },
            else: { type: 'object', properties: { c: { type: 'string' } } },
            unevaluatedProperties: false,
          } as Schema,
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
          } as Schema,
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
          } as Schema,
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
        makeUnevaluatedPropertiesCheck(
          { properties: { a: { type: 'string' } } } as Schema,
          recurse,
        ),
      ).toBe('')
    })

    it('returns empty string when unevaluatedProperties is true', () => {
      expect(
        makeUnevaluatedPropertiesCheck(
          {
            properties: { a: { type: 'string' } },
            unevaluatedProperties: true,
          } as Schema,
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
          } as Schema,
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
          } as Schema,
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
          } as Schema,
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
          } as Schema,
          recurse,
          'override',
        ),
      ).toBe(
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o,message:"override"})}}}`,
      )
    })
  })
})
