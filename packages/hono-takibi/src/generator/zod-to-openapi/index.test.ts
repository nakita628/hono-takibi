import { describe, expect, it } from 'vite-plus/test'
import { z } from 'zod'

import { JSON_BIGINT } from '../../helper/wire.js'
import type { Schema } from '../../openapi/index.js'
import { zodToOpenAPI } from './index.js'

// The `z.preprocess` wrapper `withRawCheck` emits around a schema for a check
// on the raw input (#479). For `unevaluatedProperties` the check itself
// only reports when the union succeeds — it counts the branch matches its
// own branch-match `safeParse` calls already decide (`mA` for anyOf, `mO`
// for oneOf) — and the pipe stops once it adds an issue, so no issue
// forwarding is needed. There is no separate success-gate parse: one would
// re-parse the whole value, which on a recursive schema costs ~3^depth
// (#480). The callback parameter is typed as the union's input type, so
// `z.input` of the wrapped schema stays that type.
const withCheck = (union: string, check: string) =>
  `(()=>{const Schema=${union};return z.preprocess((val: z.input<typeof Schema>,ctx)=>{(${check})(ctx);return val},Schema)})()`

// The wrapper of a check that parses a schema of the document: `safeParse`
// throws when that schema has an asynchronous refinement, so the check is run
// again with `safeParseAsync` — what it had reported is taken back first — and
// the callback answers with a promise. `declarations` come before `Schema`: an
// operand the check parses is declared once and named in both.
const withAsyncCheck = (schema: string, sync: string, async: string, declarations = '') =>
  `(()=>{${declarations}const Schema=${schema};return z.preprocess((val: z.input<typeof Schema>,ctx)=>{const reported=ctx.issues.length;try{(${sync})(ctx)}catch(error){if(!(error instanceof z.core.$ZodAsyncError))throw error;ctx.issues.length=reported;return (${async})(ctx).then(()=>val)}return val},Schema)})()`

// The same wrapper around statements that read `ctx` and `Schema` themselves:
// the message and the `unevaluatedProperties` of an `allOf`.
const withStatements = (schema: string, statements: string) =>
  `(()=>{const Schema=${schema};return z.preprocess((val: z.input<typeof Schema>,ctx)=>{${statements};return val},Schema)})()`

// What `x-catch` emits where the schema states no `type` the document could
// be told (#492): a `z.preprocess` that replaces a value the schema does not
// take by the fallback, which `@hono/zod-openapi` renders by the schema
// inside it. A schema with a type keeps `.catch()` and states itself in
// `.openapi()`.
const caught = (schema: string, fallback: string) =>
  `(()=>{const Schema=${schema};return z.preprocess((val: z.input<typeof Schema>)=>Schema.safeParse(val).success?val:${fallback},Schema)})()`

// The same, by hand, for the runtime checks.
const catching = <T extends z.ZodType>(Schema: T, fallback: z.input<T>) =>
  z.preprocess((val: z.input<T>) => (Schema.safeParse(val).success ? val : fallback), Schema)

describe('zodToOpenAPI', () => {
  describe('ref', () => {
    it.concurrent('codegen: bare $ref → ReferencedSchema identifier', () => {
      expect(zodToOpenAPI({ $ref: '#/components/schemas/Test' })).toBe('TestSchema')
    })
    it.concurrent('runtime: a $ref-equivalent schema accepts an object matching its shape', () => {
      const TestSchema = z.object({ name: z.string() })
      expect(TestSchema.safeParse({ name: 'foo' }).success).toBe(true)
    })
    it.concurrent('runtime: a $ref-equivalent schema rejects an object with the wrong field type', () => {
      const TestSchema = z.object({ name: z.string() })
      const result = TestSchema.safeParse({ name: 123 })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['name'],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
    it.concurrent('codegen: array items=$ref → z.array(ReferencedSchema)', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { $ref: '#/components/schemas/Test' },
        }),
      ).toBe('z.array(TestSchema)')
    })
    it.concurrent('runtime: z.array of a $ref-equivalent accepts an array of matching objects', () => {
      const ArrayOfTest = z.array(z.object({ name: z.string() }))
      expect(ArrayOfTest.safeParse([{ name: 'foo' }, { name: 'bar' }]).success).toBe(true)
    })
    it.concurrent('runtime: z.array of a $ref-equivalent rejects an array containing a bad element', () => {
      const ArrayOfTest = z.array(z.object({ name: z.string() }))
      const result = ArrayOfTest.safeParse([{ name: 'foo' }, { name: 123 }])
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [1, 'name'],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
    it.concurrent('runtime: z.array of a $ref-equivalent rejects a non-array input', () => {
      const ArrayOfTest = z.array(z.object({ name: z.string() }))
      const result = ArrayOfTest.safeParse('not an array')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'array',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected array, received string',
          },
        ])
      }
    })
  })

  describe('prefixItems (tuple)', () => {
    it.concurrent('codegen: basic [string, number, boolean] → array+superRefine', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
        }),
      ).toBe(
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number(),z.boolean()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]})}}}})',
      )
    })
    it.concurrent('runtime: a tuple matching every prefix slot is accepted', () => {
      // Hand-rolled equivalent of the emitted code so safeParse can be exercised.
      const PrefixSchema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const prefix = [z.string(), z.number(), z.boolean()]
        for (const [i, Schema] of prefix.slice(0, arr.length).entries()) {
          const valid = Schema.safeParse(arr[i])
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
            }
          }
        }
      })
      expect(PrefixSchema.safeParse(['foo', 1, true]).success).toBe(true)
    })
    it.concurrent('runtime: an empty array is accepted — length is not constrained (§10.3.1.1)', () => {
      const PrefixSchema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const prefix = [z.string(), z.number(), z.boolean()]
        for (const [i, Schema] of prefix.slice(0, arr.length).entries()) {
          const valid = Schema.safeParse(arr[i])
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
            }
          }
        }
      })
      expect(PrefixSchema.safeParse([]).success).toBe(true)
    })
    it.concurrent('runtime: a longer array is accepted — extra items are unconstrained', () => {
      const PrefixSchema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const prefix = [z.string(), z.number(), z.boolean()]
        for (const [i, Schema] of prefix.slice(0, arr.length).entries()) {
          const valid = Schema.safeParse(arr[i])
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
            }
          }
        }
      })
      expect(PrefixSchema.safeParse(['foo', 1, true, 'extra', 99]).success).toBe(true)
    })
    it.concurrent('runtime: a mismatched prefix slot causes rejection', () => {
      const PrefixSchema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const prefix = [z.string(), z.number(), z.boolean()]
        for (const [i, Schema] of prefix.slice(0, arr.length).entries()) {
          const valid = Schema.safeParse(arr[i])
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
            }
          }
        }
      })
      const result = PrefixSchema.safeParse(['foo', 'not-a-number', true])
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: [1],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
    it.concurrent('runtime: a non-array input is rejected', () => {
      const PrefixSchema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const prefix = [z.string(), z.number(), z.boolean()]
        for (const [i, Schema] of prefix.slice(0, arr.length).entries()) {
          const valid = Schema.safeParse(arr[i])
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
            }
          }
        }
      })
      const result = PrefixSchema.safeParse('not array')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'array',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected array, received string',
          },
        ])
      }
    })

    it.concurrent('codegen: [$ref, number] preserves the identifier as a Prefix entry', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          prefixItems: [{ $ref: '#/components/schemas/Name' }, { type: 'number' }],
        }),
      ).toBe(
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[NameSchema,z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]})}}}})',
      )
    })
    it.concurrent('runtime: a [$ref-equivalent, number] tuple accepts a matching pair', () => {
      const NameSchema = z.string().min(1)
      const PrefixSchema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const prefix = [NameSchema, z.number()]
        for (const [i, Schema] of prefix.slice(0, arr.length).entries()) {
          const valid = Schema.safeParse(arr[i])
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
            }
          }
        }
      })
      expect(PrefixSchema.safeParse(['foo', 42]).success).toBe(true)
    })
    it.concurrent('runtime: a [$ref-equivalent, number] tuple rejects a violation of the $ref slot', () => {
      // The $ref-equivalent requires a non-empty string — an empty string fails.
      const NameSchema = z.string().min(1)
      const PrefixSchema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const prefix = [NameSchema, z.number()]
        for (const [i, Schema] of prefix.slice(0, arr.length).entries()) {
          const valid = Schema.safeParse(arr[i])
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
            }
          }
        }
      })
      const result = PrefixSchema.safeParse(['', 42])
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_small',
            minimum: 1,
            inclusive: true,
            path: [0],
            message: 'Too small: expected string to have >=1 characters',
          },
        ])
      }
    })

    it.concurrent('codegen: prefixItems with description appends .openapi({description})', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }],
          description: 'A tuple of name and age',
        }),
      ).toBe(
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]})}}}}).openapi({"description":"A tuple of name and age"})',
      )
    })
  })

  describe('oneOf', () => {
    it.concurrent('codegen: type:object + inline-const branches + nullable → z.xor with superRefine + .nullable()', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          oneOf: [
            { properties: { kind: { const: 'A' } }, required: ['kind'] },
            { properties: { kind: { const: 'B' } }, required: ['kind'] },
          ],
          nullable: true,
        }),
      ).toBe(
        'z.xor([z.object({kind:z.literal("A")}).openapi({"required":["kind"]}),z.object({kind:z.literal("B")}).openapi({"required":["kind"]})]).nullable()',
      )
    })

    it.concurrent('codegen: oneOf of $ref pair → z.xor of identifiers', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        }),
      ).toBe('z.xor([ASchema,BSchema])')
    })
    it.concurrent('runtime: xor of two object $ref-equivalents accepts an input matching exactly one branch', () => {
      const ASchema = z.object({ kind: z.literal('a') })
      const BSchema = z.object({ kind: z.literal('b') })
      const OneOf = z.xor([ASchema, BSchema])
      expect(OneOf.safeParse({ kind: 'a' }).success).toBe(true)
      expect(OneOf.safeParse({ kind: 'b' }).success).toBe(true)
    })
    it.concurrent('runtime: xor of two object $ref-equivalents rejects an input matching neither branch', () => {
      const ASchema = z.object({ kind: z.literal('a') })
      const BSchema = z.object({ kind: z.literal('b') })
      const OneOf = z.xor([ASchema, BSchema])
      const result = OneOf.safeParse({ kind: 'c' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [
              [
                {
                  code: 'invalid_value',
                  values: ['a'],
                  path: ['kind'],
                  message: 'Invalid input: expected "a"',
                },
              ],
              [
                {
                  code: 'invalid_value',
                  values: ['b'],
                  path: ['kind'],
                  message: 'Invalid input: expected "b"',
                },
              ],
            ],
            path: [],
            message: 'Invalid input',
          },
        ])
      }
    })

    it.concurrent('codegen: oneOf of $ref pair + nullable=true → appends .nullable()', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          nullable: true,
        }),
      ).toBe('z.xor([ASchema,BSchema]).nullable()')
    })
    it.concurrent('runtime: xor + .nullable() accepts null in addition to matching branches', () => {
      const ASchema = z.object({ kind: z.literal('a') })
      const BSchema = z.object({ kind: z.literal('b') })
      const OneOf = z.xor([ASchema, BSchema]).nullable()
      expect(OneOf.safeParse(null).success).toBe(true)
      expect(OneOf.safeParse({ kind: 'a' }).success).toBe(true)
    })

    it.concurrent('codegen: type:["object","null"] + oneOf-$ref pair → same .nullable() output as nullable:true', () => {
      expect(
        zodToOpenAPI({
          type: ['object', 'null'],
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        }),
      ).toBe('z.xor([ASchema,BSchema]).nullable()')
    })

    it.concurrent('codegen: x-oneOf-message on primitive xor attaches error option', () => {
      expect(
        zodToOpenAPI({
          oneOf: [{ type: 'string' }, { type: 'number' }],
          'x-oneOf-message': 'いずれか1つを指定',
        }),
      ).toBe('z.xor([z.string(),z.number()],{error:"いずれか1つを指定"})')
    })
    it.concurrent('runtime: x-oneOf-message variant rejects an input matching no branch', () => {
      const OneOf = z.xor([z.string(), z.number()], { error: 'いずれか1つを指定' })
      const result = OneOf.safeParse(true)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [
              [
                {
                  expected: 'string',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected string, received boolean',
                },
              ],
              [
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received boolean',
                },
              ],
            ],
            path: [],
            message: 'いずれか1つを指定',
          },
        ])
      }
    })

    it.concurrent('codegen: x-oneOf-message with $ref pair attaches error option to z.xor of identifiers', () => {
      expect(
        zodToOpenAPI({
          oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          'x-oneOf-message': 'AかBのいずれか',
        }),
      ).toBe('z.xor([ASchema,BSchema],{error:"AかBのいずれか"})')
    })

    // discriminatedUnion
    describe('discriminatedUnion', () => {
      it.concurrent('codegen: inline-object branches + discriminator → z.discriminatedUnion(...) with metadata', () => {
        expect(
          zodToOpenAPI({
            oneOf: [
              {
                type: 'object',
                properties: { status: { const: 'success' }, data: { type: 'string' } },
                required: ['status', 'data'],
              },
              {
                type: 'object',
                properties: { status: { const: 'failed' }, error: { type: 'string' } },
                required: ['status', 'error'],
              },
            ],
            discriminator: { propertyName: 'status' },
          }),
        ).toBe(
          `z.discriminatedUnion('status',[z.object({status:z.literal("success"),data:z.string()}).openapi({"required":["status","data"]}),z.object({status:z.literal("failed"),error:z.string()}).openapi({"required":["status","error"]})]).openapi({"discriminator":{"propertyName":"status"}})`,
        )
      })
      it.concurrent('codegen: escapes a quote in the discriminator property name', () => {
        expect(
          zodToOpenAPI({
            oneOf: [
              { type: 'object', properties: { "it's": { const: 'a' } }, required: ["it's"] },
              { type: 'object', properties: { "it's": { const: 'b' } }, required: ["it's"] },
            ],
            discriminator: { propertyName: "it's" },
          }),
        ).toMatch(/^z\.discriminatedUnion\('it\\'s',/u)
      })
      it.concurrent('codegen: escapes backslash + quote in the discriminator property name (no literal breakout)', () => {
        const name = "a\\'b"
        const out = zodToOpenAPI({
          oneOf: [
            { type: 'object', properties: { [name]: { const: 'x' } }, required: [name] },
            { type: 'object', properties: { [name]: { const: 'y' } }, required: [name] },
          ],
          discriminator: { propertyName: name },
        })
        // `\\` then `\'`: the backslash is doubled first so it cannot eat the escape on the quote.
        expect(out.startsWith(String.raw`z.discriminatedUnion('a\\\'b',[`)).toBe(true)
        expect(out).toBe(
          String.raw`z.discriminatedUnion('a\\\'b',[z.object({'a\\\'b':z.literal("x")}).openapi({"required":["a\\'b"]}),z.object({'a\\\'b':z.literal("y")}).openapi({"required":["a\\'b"]})]).openapi({"discriminator":{"propertyName":"a\\'b"}})`,
        )
      })

      // Semantics (see the comment block above `literalsPerBranch` in index.ts):
      // discriminator is an OpenAPI hint that MUST NOT change the validation outcome,
      // so z.discriminatedUnion is emitted only when it is provably the same as the
      // strict oneOf xor, mapping never drives routing, and anyOf ignores it entirely.
      describe('discriminator is a hint, never a validation rule', () => {
        const Cat: Schema = {
          type: 'object',
          required: ['kind'],
          properties: { kind: { const: 'cat' }, meow: { type: 'string' } },
        }
        const Dog: Schema = {
          type: 'object',
          required: ['kind'],
          properties: { kind: { const: 'dog' }, bark: { type: 'string' } },
        }

        it.concurrent('codegen: discriminator.mapping is passed through as metadata and does not drive routing', () => {
          // Mapping keys (c / d) deliberately differ from the branch literals (cat / dog):
          // routing must still come from the branches' own `const`.
          expect(
            zodToOpenAPI({
              oneOf: [Cat, Dog],
              discriminator: {
                propertyName: 'kind',
                mapping: { c: '#/components/schemas/Cat', d: '#/components/schemas/Dog' },
              },
            }),
          ).toBe(
            'z.discriminatedUnion(\'kind\',[z.object({kind:z.literal("cat"),meow:z.string().exactOptional()}).openapi({"required":["kind"]}),z.object({kind:z.literal("dog"),bark:z.string().exactOptional()}).openapi({"required":["kind"]})]).openapi({"discriminator":{"propertyName":"kind","mapping":{"c":"#/components/schemas/Cat","d":"#/components/schemas/Dog"}}})',
          )
        })

        it.concurrent('runtime: with a mapping, the branch literal decides — mapping keys are not accepted values', () => {
          const schema = z.discriminatedUnion('kind', [
            z.object({ kind: z.literal('cat'), meow: z.string().optional() }),
            z.object({ kind: z.literal('dog'), bark: z.string().optional() }),
          ])
          expect(schema.safeParse({ kind: 'cat' }).success).toBe(true)
          expect(schema.safeParse({ kind: 'c' }).success).toBe(false)
        })

        it.concurrent('codegen: anyOf + discriminator → z.union (at least one), discriminator kept only as metadata', () => {
          expect(zodToOpenAPI({ anyOf: [Cat, Dog], discriminator: { propertyName: 'kind' } })).toBe(
            'z.union([z.object({kind:z.literal("cat"),meow:z.string().exactOptional()}).openapi({"required":["kind"]}),z.object({kind:z.literal("dog"),bark:z.string().exactOptional()}).openapi({"required":["kind"]})]).openapi({"discriminator":{"propertyName":"kind"}})',
          )
        })

        it.concurrent('runtime: discriminatedUnion and xor accept and reject the same payloads when the guard holds', () => {
          const CatZ = z.object({ kind: z.literal('cat'), meow: z.string().optional() })
          const DogZ = z.object({ kind: z.literal('dog'), bark: z.string().optional() })
          const du = z.discriminatedUnion('kind', [CatZ, DogZ])
          const xor = z.xor([CatZ, DogZ])
          const payloads: readonly unknown[] = [
            { kind: 'cat' },
            { kind: 'dog', bark: 'w' },
            { kind: 'cow' },
            {},
            'cat',
            null,
            { kind: 'cat', bark: 1 },
            { kind: 'cat', extra: true },
          ]
          for (const p of payloads) {
            expect(du.safeParse(p).success).toBe(xor.safeParse(p).success)
          }
        })

        it('codegen: OpenAPI 3.0-style branches that never declare the discriminator → z.xor', () => {
          expect(
            zodToOpenAPI({
              oneOf: [
                { type: 'object', properties: { meow: { type: 'string' } } },
                { type: 'object', properties: { bark: { type: 'string' } } },
              ],
              discriminator: { propertyName: 'kind' },
            }),
          ).toBe(
            'z.xor([z.object({meow:z.string().exactOptional()}).openapi({"required":[]}),z.object({bark:z.string().exactOptional()}).openapi({"required":[]})]).openapi({"discriminator":{"propertyName":"kind"}})',
          )
        })

        it.concurrent('runtime: the 3.0-style xor rejects a payload both branches accept — strict oneOf, not discriminator routing', () => {
          const xor = z.xor([
            z.object({ meow: z.string().optional() }),
            z.object({ bark: z.string().optional() }),
          ])
          // Both branches accept {kind:"cat"} (unknown keys are stripped), so "exactly one" fails.
          expect(xor.safeParse({ kind: 'cat' }).success).toBe(false)
          expect(xor.safeParse({ kind: 'cat', meow: 'm' }).success).toBe(false)
        })
      })
      it.concurrent('runtime: inline-object discriminatedUnion routes by discriminator', () => {
        const DU = z.discriminatedUnion('status', [
          z.object({ status: z.literal('success'), data: z.string() }),
          z.object({ status: z.literal('failed'), error: z.string() }),
        ])
        expect(DU.safeParse({ status: 'success', data: 'foo' }).success).toBe(true)
        expect(DU.safeParse({ status: 'failed', error: 'bar' }).success).toBe(true)
      })
      it.concurrent('runtime: inline-object discriminatedUnion rejects mismatched payload for the routed branch', () => {
        const DU = z.discriminatedUnion('status', [
          z.object({ status: z.literal('success'), data: z.string() }),
          z.object({ status: z.literal('failed'), error: z.string() }),
        ])
        // success branch requires `data`, not `error`.
        const result = DU.safeParse({ status: 'success', error: 'bar' })
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              expected: 'string',
              code: 'invalid_type',
              path: ['data'],
              message: 'Invalid input: expected string, received undefined',
            },
          ])
        }
      })
      it.concurrent('runtime: inline-object discriminatedUnion rejects an unknown discriminator value', () => {
        const DU = z.discriminatedUnion('status', [
          z.object({ status: z.literal('success'), data: z.string() }),
          z.object({ status: z.literal('failed'), error: z.string() }),
        ])
        const result = DU.safeParse({ status: 'pending' })
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [],
              note: 'No matching discriminator',
              discriminator: 'status',
              options: ['success', 'failed'],
              path: ['status'],
              message: "Invalid discriminator value. Expected 'success' | 'failed'",
            },
          ])
        }
      })

      it('emits z.xor when oneOf branches all accept {}, as the document says', () => {
        expect(
          zodToOpenAPI({
            oneOf: [
              { type: 'object', properties: { goal: { type: 'number' } } },
              { type: 'object', properties: { limit: { type: 'number' } } },
            ],
          }),
        ).toBe(
          'z.xor([z.object({goal:z.number().exactOptional()}).openapi({"required":[]}),z.object({limit:z.number().exactOptional()}).openapi({"required":[]})])',
        )
      })

      it.concurrent('codegen: $ref branches + discriminator, no component map → falls back to z.xor', () => {
        // Without `schemas` a $ref is opaque and might resolve to an allOf
        // (ZodIntersection), which makes z.discriminatedUnion throw on first parse.
        expect(
          zodToOpenAPI({
            oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
            discriminator: { propertyName: 'type' },
          }),
        ).toBe(`z.xor([ASchema,BSchema]).openapi({"discriminator":{"propertyName":"type"}})`)
      })

      it.concurrent('codegen: $ref branches resolving to plain objects with distinct literals → z.discriminatedUnion', () => {
        // OpenAPI 3.2 §4.25: `discriminator` MUST NOT change the validation
        // outcome; distinct literals make the branches mutually exclusive, so
        // `exactly one` (oneOf) and `the routed one` (discriminatedUnion) agree.
        expect(
          zodToOpenAPI(
            {
              oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
              discriminator: { propertyName: 'type' },
            },
            undefined,
            {
              schemas: {
                A: {
                  type: 'object',
                  properties: { type: { enum: ['a'] }, value: { type: 'string' } },
                  required: ['type'],
                },
                B: {
                  type: 'object',
                  properties: { type: { enum: ['b'] }, count: { type: 'number' } },
                  required: ['type'],
                },
              },
            },
          ),
        ).toBe(
          `z.discriminatedUnion('type',[ASchema,BSchema]).openapi({"discriminator":{"propertyName":"type"}})`,
        )
      })

      it.concurrent('codegen: $ref branch resolving to an allOf → falls back to z.xor', () => {
        expect(
          zodToOpenAPI(
            {
              oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
              discriminator: { propertyName: 'type' },
            },
            undefined,
            {
              schemas: {
                A: {
                  type: 'object',
                  properties: { type: { enum: ['a'] } },
                  required: ['type'],
                },
                B: { allOf: [{ $ref: '#/components/schemas/A' }, { type: 'object' }] },
              },
            },
          ),
        ).toBe(`z.xor([ASchema,BSchema]).openapi({"discriminator":{"propertyName":"type"}})`)
      })

      it.concurrent('codegen: $ref branch that does not pin the discriminator → falls back to z.xor', () => {
        expect(
          zodToOpenAPI(
            {
              oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
              discriminator: { propertyName: 'type' },
            },
            undefined,
            {
              schemas: {
                A: {
                  type: 'object',
                  properties: { type: { enum: ['a'] } },
                  required: ['type'],
                },
                B: { type: 'object', properties: { other: { type: 'string' } } },
              },
            },
          ),
        ).toBe(`z.xor([ASchema,BSchema]).openapi({"discriminator":{"propertyName":"type"}})`)
      })

      it.concurrent('codegen: $ref branches sharing a discriminator value → falls back to z.xor', () => {
        // Duplicate values make z.discriminatedUnion throw at construction, and
        // oneOf would reject a payload both branches accept anyway.
        expect(
          zodToOpenAPI(
            {
              oneOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
              discriminator: { propertyName: 'type' },
            },
            undefined,
            {
              schemas: {
                A: {
                  type: 'object',
                  properties: { type: { enum: ['same'] }, a: { type: 'string' } },
                  required: ['type'],
                },
                B: {
                  type: 'object',
                  properties: { type: { enum: ['same'] }, b: { type: 'string' } },
                  required: ['type'],
                },
              },
            },
          ),
        ).toBe(`z.xor([ASchema,BSchema]).openapi({"discriminator":{"propertyName":"type"}})`)
      })

      it.concurrent('runtime: discriminatedUnion over $ref branches agrees with xor and reports the offending field', () => {
        const A = z.object({ type: z.literal('a'), value: z.string().optional() })
        const B = z.object({ type: z.literal('b'), count: z.number().optional() })
        const DU = z.discriminatedUnion('type', [A, B])
        const XOR = z.xor([A, B])
        expect(DU.safeParse({ type: 'b', count: 1 }).success).toBe(
          XOR.safeParse({ type: 'b', count: 1 }).success,
        )
        expect(DU.safeParse({ type: 'nope' }).success).toBe(XOR.safeParse({ type: 'nope' }).success)
        const failed = DU.safeParse({ type: 'b', count: 'x' })
        expect(failed.success).toBe(false)
        expect(failed.error?.issues.map((i) => i.path.join('.'))).toStrictEqual(['count'])
      })

      it.concurrent('codegen: x-oneOf-message on discriminatedUnion attaches error option', () => {
        expect(
          zodToOpenAPI({
            oneOf: [
              {
                type: 'object',
                properties: { type: { const: 'a' }, value: { type: 'string' } },
                required: ['type', 'value'],
              },
              {
                type: 'object',
                properties: { type: { const: 'b' }, count: { type: 'number' } },
                required: ['type', 'count'],
              },
            ],
            discriminator: { propertyName: 'type' },
            'x-oneOf-message': '型が不正',
          }),
        ).toBe(
          `z.discriminatedUnion('type',[z.object({type:z.literal("a"),value:z.string()}).openapi({"required":["type","value"]}),z.object({type:z.literal("b"),count:z.number()}).openapi({"required":["type","count"]})],{error:"型が不正"}).openapi({"discriminator":{"propertyName":"type"}})`,
        )
      })
      it.concurrent('runtime: discriminatedUnion with x-oneOf-message rejects an unknown discriminator', () => {
        const DU = z.discriminatedUnion(
          'type',
          [
            z.object({ type: z.literal('a'), value: z.string() }),
            z.object({ type: z.literal('b'), count: z.number() }),
          ],
          { error: '型が不正' },
        )
        const result = DU.safeParse({ type: 'c' })
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [],
              note: 'No matching discriminator',
              discriminator: 'type',
              options: ['a', 'b'],
              path: ['type'],
              message: '型が不正',
            },
          ])
        }
      })
    })

    // anyOf
    describe('anyOf', () => {
      it.concurrent('anyOf: discriminated by const kind A|B, nullable (superRefine variants)', () => {
        const input: Schema = {
          type: 'object',
          anyOf: [
            {
              properties: { kind: { const: 'A' } },
              required: ['kind'],
            },
            {
              properties: { kind: { const: 'B' } },
              required: ['kind'],
            },
          ],
          nullable: true,
        }
        const expected =
          'z.union([z.object({kind:z.literal("A")}).openapi({"required":["kind"]}),z.object({kind:z.literal("B")}).openapi({"required":["kind"]})]).nullable()'
        expect(zodToOpenAPI(input)).toBe(expected)
        // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
      })
      it.concurrent('anyOf: $ref union of A|B (object type)', () => {
        const input: Schema = {
          type: 'object',
          anyOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        }
        const expected = 'z.union([ASchema,BSchema])'
        expect(zodToOpenAPI(input)).toBe(expected)
        const runtime = z.union([z.string(), z.number()])
        expect(runtime.safeParse('x').success).toBe(true)
        const result = runtime.safeParse(true)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    expected: 'string',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected string, received boolean',
                  },
                ],
                [
                  {
                    expected: 'number',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected number, received boolean',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('anyOf: $ref union nullable via `nullable: true`', () => {
        const input: Schema = {
          type: 'object',
          anyOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
          nullable: true,
        }
        const expected = 'z.union([ASchema,BSchema]).nullable()'
        expect(zodToOpenAPI(input)).toBe(expected)
        const runtime = z.union([z.string(), z.number()]).nullable()
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse(true)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    expected: 'string',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected string, received boolean',
                  },
                ],
                [
                  {
                    expected: 'number',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected number, received boolean',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('anyOf: $ref union nullable via `type: [object,null]`', () => {
        const input: Schema = {
          type: ['object', 'null'],
          anyOf: [{ $ref: '#/components/schemas/A' }, { $ref: '#/components/schemas/B' }],
        }
        const expected = 'z.union([ASchema,BSchema]).nullable()'
        expect(zodToOpenAPI(input)).toBe(expected)
        const runtime = z.union([z.string(), z.number()]).nullable()
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse(true)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    expected: 'string',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected string, received boolean',
                  },
                ],
                [
                  {
                    expected: 'number',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected number, received boolean',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('anyOf: 3-type union of string|number|boolean', () => {
        const input: Schema = {
          anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
        }
        const expected = 'z.union([z.string(),z.number(),z.boolean()])'
        expect(zodToOpenAPI(input)).toBe(expected)
        const runtime = z.union([z.string(), z.number(), z.boolean()])
        expect(runtime.safeParse('abc').success).toBe(true)
        expect(runtime.safeParse(1).success).toBe(true)
        expect(runtime.safeParse(true).success).toBe(true)
        const result = runtime.safeParse(null)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    expected: 'string',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected string, received null',
                  },
                ],
                [
                  {
                    expected: 'number',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected number, received null',
                  },
                ],
                [
                  {
                    expected: 'boolean',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected boolean, received null',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('anyOf: $ref union of Cat|Dog', () => {
        const input: Schema = {
          anyOf: [{ $ref: '#/components/schemas/Cat' }, { $ref: '#/components/schemas/Dog' }],
        }
        const expected = 'z.union([CatSchema,DogSchema])'
        expect(zodToOpenAPI(input)).toBe(expected)
        const runtime = z.union([z.string(), z.number()])
        expect(runtime.safeParse('x').success).toBe(true)
        const result = runtime.safeParse(true)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    expected: 'string',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected string, received boolean',
                  },
                ],
                [
                  {
                    expected: 'number',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected number, received boolean',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('anyOf: nullable union of string|number', () => {
        const input: Schema = {
          anyOf: [{ type: 'string' }, { type: 'number' }],
          nullable: true,
        }
        const expected = 'z.union([z.string(),z.number()]).nullable()'
        expect(zodToOpenAPI(input)).toBe(expected)
        const runtime = z.union([z.string(), z.number()]).nullable()
        expect(runtime.safeParse('abc').success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse(true)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    expected: 'string',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected string, received boolean',
                  },
                ],
                [
                  {
                    expected: 'number',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected number, received boolean',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('anyOf: x-anyOf-message attaches custom error to union', () => {
        const input: Schema = {
          anyOf: [{ type: 'string' }, { type: 'number' }],
          'x-anyOf-message': '文字列か数値を指定',
        }
        const expected = 'z.union([z.string(),z.number()],{error:"文字列か数値を指定"})'
        expect(zodToOpenAPI(input)).toBe(expected)
        const runtime = z.union([z.string(), z.number()], { error: '文字列か数値を指定' })
        expect(runtime.safeParse('abc').success).toBe(true)
        const result = runtime.safeParse(true)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    expected: 'string',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected string, received boolean',
                  },
                ],
                [
                  {
                    expected: 'number',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected number, received boolean',
                  },
                ],
              ],
              path: [],
              message: '文字列か数値を指定',
            },
          ])
        }
      })
      it.concurrent('anyOf: x-anyOf-message attaches error to $ref union', () => {
        const input: Schema = {
          anyOf: [{ $ref: '#/components/schemas/Cat' }, { $ref: '#/components/schemas/Dog' }],
          'x-anyOf-message': '猫か犬を指定',
        }
        const expected = 'z.union([CatSchema,DogSchema],{error:"猫か犬を指定"})'
        expect(zodToOpenAPI(input)).toBe(expected)
        const runtime = z.union([z.string(), z.number()], { error: '猫か犬を指定' })
        expect(runtime.safeParse('x').success).toBe(true)
        const result = runtime.safeParse(true)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    expected: 'string',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected string, received boolean',
                  },
                ],
                [
                  {
                    expected: 'number',
                    code: 'invalid_type',
                    path: [],
                    message: 'Invalid input: expected number, received boolean',
                  },
                ],
              ],
              path: [],
              message: '猫か犬を指定',
            },
          ])
        }
      })
    })

    // allOf
    // not support zod-to-openapi
    describe('allOf', () => {
      it.concurrent('regression: bare allOf [{$ref}] with sibling description preserves description via wrap', () => {
        expect(
          zodToOpenAPI({
            description: 'wrap me',
            allOf: [{ $ref: '#/components/schemas/User' }],
          }),
        ).toBe('UserSchema.openapi({"description":"wrap me"})')
      })
      it.concurrent('regression: bare allOf [{$ref}] with sibling x-brand emits .brand and description', () => {
        expect(
          zodToOpenAPI({
            description: 'branded',
            'x-brand': 'UserId',
            allOf: [{ $ref: '#/components/schemas/User' }],
          }),
        ).toBe('UserSchema.brand<"UserId">().openapi({"description":"branded"})')
      })
      // #420: a member of annotations alone would be `z.any()`, and `X.and(z.any())` is `any`
      it.concurrent('allOf: a description-only member says it of the reference, not of z.any()', () => {
        expect(
          zodToOpenAPI({
            allOf: [
              { $ref: '#/components/schemas/SourceLanguage' },
              { description: 'Language of the source audio.' },
            ],
          }),
        ).toBe('SourceLanguageSchema.openapi({"description":"Language of the source audio."})')
      })
      it.concurrent("allOf: the schema's own annotations come before a member's", () => {
        expect(
          zodToOpenAPI({
            description: 'own',
            allOf: [{ $ref: '#/components/schemas/A' }, { description: 'member', title: 'T' }],
          }),
        ).toBe('ASchema.openapi({"description":"own","title":"T"})')
      })
      it.concurrent('allOf: a description-only member beside two references keeps the intersection', () => {
        expect(
          zodToOpenAPI({
            allOf: [
              { $ref: '#/components/schemas/A' },
              { $ref: '#/components/schemas/B' },
              { description: 'both' },
            ],
          }),
        ).toBe('ASchema.and(BSchema).openapi({"description":"both"})')
      })
      it.concurrent('allOf: members of annotations alone are z.any() with the annotations', () => {
        expect(zodToOpenAPI({ allOf: [{ description: 'free' }] })).toBe(
          'z.any().openapi({"description":"free"})',
        )
      })
      it.concurrent('allOf: a nullable member with a description makes the reference nullable', () => {
        expect(
          zodToOpenAPI({
            allOf: [{ $ref: '#/components/schemas/A' }, { nullable: true, description: 'maybe' }],
          }),
        ).toBe('ASchema.nullable().openapi({"description":"maybe"})')
      })
      it.concurrent('allOf: a default-only member is the default of the reference', () => {
        expect(
          zodToOpenAPI({ allOf: [{ $ref: '#/components/schemas/A' }, { default: 'en' }] }),
        ).toBe('ASchema.default("en")')
      })
      it.concurrent('allOf: GeoJsonObject + object with type enum (discriminator) + description/externalDocs', () => {
        const input: Schema = {
          description:
            'Abstract type for all GeoJSon object except Feature and FeatureCollection\n',
          externalDocs: {
            url: 'https://tools.ietf.org/html/rfc7946#section-3',
          },
          allOf: [
            {
              $ref: '#/components/schemas/GeoJsonObject',
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: [
                    'Point',
                    'MultiPoint',
                    'LineString',
                    'MultiLineString',
                    'Polygon',
                    'MultiPolygon',
                    'GeometryCollection',
                  ],
                },
              },
              required: ['type'],
              discriminator: {
                propertyName: 'type',
              },
            },
          ],
        }
        const expected =
          'GeoJsonObjectSchema.and(z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])}).openapi({"required":["type"],"discriminator":{"propertyName":"type"}})).openapi({"description":"Abstract type for all GeoJSon object except Feature and FeatureCollection\\n","externalDocs":{"url":"https://tools.ietf.org/html/rfc7946#section-3"}})'
        expect(zodToOpenAPI(input)).toBe(expected)
        // runtime skipped: external $ref `GeoJsonObjectSchema` unresolved without spec context
      })
      it.concurrent('allOf: Feature object with nested allOf/oneOf inside properties', () => {
        const input: Schema = {
          description: "GeoJSon 'Feature' object",
          externalDocs: {
            url: 'https://tools.ietf.org/html/rfc7946#section-3.2',
          },
          allOf: [
            {
              $ref: '#/components/schemas/GeoJsonObject',
            },
            {
              type: 'object',
              required: ['geometry', 'properties'],
              properties: {
                geometry: {
                  allOf: [
                    {
                      nullable: true,
                    },
                    {
                      $ref: '#/components/schemas/Geometry',
                    },
                  ],
                },
                properties: {
                  type: 'object',
                  nullable: true,
                },
                id: {
                  oneOf: [
                    {
                      type: 'number',
                    },
                    {
                      type: 'string',
                    },
                  ],
                },
              },
            },
          ],
        }
        const expected = `GeoJsonObjectSchema.and(z.object({geometry:GeometrySchema.nullable(),properties:z.looseObject({}).nullable(),id:z.xor([z.number(),z.string()]).exactOptional()}).openapi({"required":["geometry","properties"]})).openapi({"description":"GeoJSon 'Feature' object","externalDocs":{"url":"https://tools.ietf.org/html/rfc7946#section-3.2"}})`
        expect(zodToOpenAPI(input)).toBe(expected)
        // runtime skipped: external $ref `GeoJsonObjectSchema` / `GeometrySchema` unresolved
      })
      it.concurrent('allOf: two object schemas intersection {a:string} & {b:string}', () => {
        const input: Schema = {
          allOf: [
            {
              type: 'object',
              required: ['a'],
              properties: {
                a: {
                  type: 'string',
                },
              },
            },
            {
              type: 'object',
              required: ['b'],
              properties: {
                b: {
                  type: 'string',
                },
              },
            },
          ],
        }
        const expected =
          'z.object({a:z.string()}).openapi({"required":["a"]}).and(z.object({b:z.string()}).openapi({"required":["b"]}))'
        expect(zodToOpenAPI(input)).toBe(expected)
        // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
      })
      it.concurrent('allOf: intersection nullable via `nullable: true`', () => {
        const input: Schema = {
          allOf: [
            {
              type: 'object',
              required: ['a'],
              properties: {
                a: {
                  type: 'string',
                },
              },
            },
            {
              type: 'object',
              required: ['b'],
              properties: {
                b: {
                  type: 'string',
                },
              },
            },
          ],
          nullable: true,
        }
        const expected =
          'z.object({a:z.string()}).openapi({"required":["a"]}).and(z.object({b:z.string()}).openapi({"required":["b"]})).nullable()'
        expect(zodToOpenAPI(input)).toBe(expected)
        // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
      })
      it.concurrent('allOf: intersection nullable via `type: [null]`', () => {
        const input: Schema = {
          allOf: [
            {
              type: 'object',
              required: ['a'],
              properties: {
                a: {
                  type: 'string',
                },
              },
            },
            {
              type: 'object',
              required: ['b'],
              properties: {
                b: {
                  type: 'string',
                },
              },
            },
          ],
          type: ['null'],
        }
        const expected =
          'z.object({a:z.string()}).openapi({"required":["a"]}).and(z.object({b:z.string()}).openapi({"required":["b"]})).nullable()'
        expect(zodToOpenAPI(input)).toBe(expected)
        // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
      })

      // x-allOf-message: per-issue dispatch overrides each sub-issue's message
      // while preserving its discriminant (code/path). Covers the
      // `x-allOf-message > x-error-message > default` precedence chain.
      describe('x-allOf-message (runtime precedence)', () => {
        it.concurrent('runtime: x-allOf-message overrides sub-issue message verbatim', () => {
          const Schema = z.object({ a: z.string() }).and(z.object({ b: z.string() }))
          const wrapped = z
            .unknown()
            .check((ctx) => {
              const result = Schema.safeParse(ctx.value)
              if (!result.success) {
                for (const issue of result.error.issues) {
                  if (issue.code === 'invalid_type') {
                    ctx.issues.push({ ...issue, input: issue.input, message: 'allOf failed' })
                  }
                }
              }
            })
            .pipe(Schema)
          const result = wrapped.safeParse({ a: 1, b: 'x' })
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues[0]?.message).toBe('allOf failed')
            expect(result.error.issues[0]?.code).toBe('invalid_type')
            expect(result.error.issues[0]?.path).toStrictEqual(['a'])
          }
        })
        it.concurrent('runtime: x-error-message fallback fires when x-allOf-message is absent', () => {
          const Schema = z.object({ a: z.string() }).and(z.object({ b: z.string() }))
          const wrapped = z
            .unknown()
            .check((ctx) => {
              const result = Schema.safeParse(ctx.value)
              if (!result.success) {
                for (const issue of result.error.issues) {
                  if (issue.code === 'invalid_type') {
                    ctx.issues.push({ ...issue, input: issue.input, message: 'shared error' })
                  }
                }
              }
            })
            .pipe(Schema)
          const result = wrapped.safeParse({ a: 1, b: 'x' })
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues[0]?.message).toBe('shared error')
          }
        })
      })
    })

    // not
    describe('not', () => {
      describe('not.type (single)', () => {
        it.concurrent('not.type: excludes string', () => {
          expect(zodToOpenAPI({ not: { type: 'string' } })).toBe(
            `z.any().refine((val) => typeof val !== 'string').openapi({"not":{"type":"string"}})`,
          )
          const runtime = z.any().refine((val) => typeof val !== 'string')
          expect(runtime.safeParse(123).success).toBe(true)
          const result = runtime.safeParse('abc')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
        it.concurrent('not.type: excludes number', () => {
          expect(zodToOpenAPI({ not: { type: 'number' } })).toBe(
            `z.any().refine((val) => typeof val !== 'number').openapi({"not":{"type":"number"}})`,
          )
          const runtime = z.any().refine((val) => typeof val !== 'number')
          expect(runtime.safeParse('abc').success).toBe(true)
          const result = runtime.safeParse(1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
        it.concurrent('not.type: excludes integer (Number.isInteger)', () => {
          expect(zodToOpenAPI({ not: { type: 'integer' } })).toBe(
            `z.any().refine((val) => typeof val !== 'number' || !Number.isInteger(val)).openapi({"not":{"type":"integer"}})`,
          )
          const runtime = z.any().refine((val) => typeof val !== 'number' || !Number.isInteger(val))
          expect(runtime.safeParse('abc').success).toBe(true)
          expect(runtime.safeParse(1.5).success).toBe(true)
          const result = runtime.safeParse(1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
        it.concurrent('not.type: excludes boolean', () => {
          expect(zodToOpenAPI({ not: { type: 'boolean' } })).toBe(
            `z.any().refine((val) => typeof val !== 'boolean').openapi({"not":{"type":"boolean"}})`,
          )
          const runtime = z.any().refine((val) => typeof val !== 'boolean')
          expect(runtime.safeParse('abc').success).toBe(true)
          const result = runtime.safeParse(true)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
        it.concurrent('not.type: excludes array', () => {
          expect(zodToOpenAPI({ not: { type: 'array' } })).toBe(
            'z.any().refine((val) => !Array.isArray(val)).openapi({"not":{"type":"array"}})',
          )
          const runtime = z.any().refine((val) => !Array.isArray(val))
          expect(runtime.safeParse('abc').success).toBe(true)
          const result = runtime.safeParse([1, 2])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
        it.concurrent('not.type: excludes object (but allows arrays/null)', () => {
          expect(zodToOpenAPI({ not: { type: 'object' } })).toBe(
            `z.any().refine((val) => typeof val !== 'object' || val === null || Array.isArray(val)).openapi({"not":{"type":"object"}})`,
          )
          const runtime = z
            .any()
            .refine((val) => typeof val !== 'object' || val === null || Array.isArray(val))
          expect(runtime.safeParse('abc').success).toBe(true)
          expect(runtime.safeParse([1]).success).toBe(true)
          expect(runtime.safeParse(null).success).toBe(true)
          const result = runtime.safeParse({ a: 1 })
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
        it.concurrent('not.type: excludes null', () => {
          expect(zodToOpenAPI({ not: { type: 'null' } })).toBe(
            'z.any().refine((val) => val !== null).openapi({"not":{"type":"null"}})',
          )
          const runtime = z.any().refine((val) => val !== null)
          expect(runtime.safeParse('abc').success).toBe(true)
          const result = runtime.safeParse(null)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
      })

      describe('not.const', () => {
        it.concurrent('not.const: excludes literal "admin"', () => {
          expect(zodToOpenAPI({ not: { const: 'admin' } })).toBe(
            `z.any().refine((val) => val !== "admin").openapi({"not":{"const":"admin"}})`,
          )
          const runtime = z.any().refine((val) => val !== 'admin')
          expect(runtime.safeParse('user').success).toBe(true)
          const result = runtime.safeParse('admin')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
        it.concurrent('not.const: excludes literal 42', () => {
          expect(zodToOpenAPI({ not: { const: 42 } })).toBe(
            'z.any().refine((val) => val !== 42).openapi({"not":{"const":42}})',
          )
          const runtime = z.any().refine((val) => val !== 42)
          expect(runtime.safeParse(7).success).toBe(true)
          const result = runtime.safeParse(42)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
      })

      describe('not.enum', () => {
        it.concurrent('not.enum: excludes ["a","b","c"]', () => {
          expect(zodToOpenAPI({ not: { enum: ['a', 'b', 'c'] } })).toBe(
            `z.any().refine((val) => !["a","b","c"].includes(val)).openapi({"not":{"enum":["a","b","c"]}})`,
          )
          const runtime = z.any().refine((val) => !['a', 'b', 'c'].includes(val))
          expect(runtime.safeParse('d').success).toBe(true)
          const r1 = runtime.safeParse('a')
          expect(r1.success).toBe(false)
          if (!r1.success) {
            expect(r1.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
          const r2 = runtime.safeParse('c')
          expect(r2.success).toBe(false)
          if (!r2.success) {
            expect(r2.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
      })

      describe('not.$ref', () => {
        it.concurrent('not.$ref: excludes ForbiddenSchema', () => {
          expect(
            zodToOpenAPI({
              not: { $ref: '#/components/schemas/Forbidden' },
            }),
          ).toBe(
            'z.any().refine((val) => !ForbiddenSchema.safeParse(val).success).openapi({"not":{"$ref":"#/components/schemas/Forbidden"}})',
          )
          const ForbiddenSchema = z.string()
          const runtime = z.any().refine((val) => !ForbiddenSchema.safeParse(val).success)
          expect(runtime.safeParse(123).success).toBe(true)
          const result = runtime.safeParse('abc')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
      })

      describe('not.type (array)', () => {
        it.concurrent('not.type (array): excludes string and number', () => {
          expect(zodToOpenAPI({ not: { type: ['string', 'number'] } })).toBe(
            `z.any().refine((val) => (typeof val !== 'string') && (typeof val !== 'number')).openapi({"not":{"type":["string","number"]}})`,
          )
          const runtime = z
            .any()
            .refine((val) => typeof val !== 'string' && typeof val !== 'number')
          expect(runtime.safeParse(true).success).toBe(true)
          const r1 = runtime.safeParse('abc')
          expect(r1.success).toBe(false)
          if (!r1.success) {
            expect(r1.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
          const r2 = runtime.safeParse(1)
          expect(r2.success).toBe(false)
          if (!r2.success) {
            expect(r2.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
      })

      describe('not + composition', () => {
        it.concurrent('not + anyOf: excludes string|number union', () => {
          expect(
            zodToOpenAPI({
              not: { anyOf: [{ type: 'string' }, { type: 'number' }] },
            }),
          ).toBe(
            'z.any().refine((val) => !z.union([z.string(),z.number()]).safeParse(val).success).openapi({"not":{"anyOf":[{"type":"string"},{"type":"number"}]}})',
          )
          const runtime = z
            .any()
            .refine((val) => !z.union([z.string(), z.number()]).safeParse(val).success)
          expect(runtime.safeParse(true).success).toBe(true)
          const r1 = runtime.safeParse('abc')
          expect(r1.success).toBe(false)
          if (!r1.success) {
            expect(r1.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
          const r2 = runtime.safeParse(1)
          expect(r2.success).toBe(false)
          if (!r2.success) {
            expect(r2.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Invalid input' },
            ])
          }
        })
      })

      describe('not fallback', () => {
        it.concurrent('not: empty schema falls back to z.never()', () => {
          expect(zodToOpenAPI({ not: {} })).toBe('z.never().openapi({"not":{}})')
          const runtime = z.never()
          // z.never() rejects all inputs — no valid sample exists
          const r1 = runtime.safeParse('abc')
          expect(r1.success).toBe(false)
          if (!r1.success) {
            expect(r1.error.issues).toStrictEqual([
              {
                expected: 'never',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected never, received string',
              },
            ])
          }
          const r2 = runtime.safeParse(123)
          expect(r2.success).toBe(false)
          if (!r2.success) {
            expect(r2.error.issues).toStrictEqual([
              {
                expected: 'never',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected never, received number',
              },
            ])
          }
        })
      })

      describe('x-not-message', () => {
        it.concurrent('x-not-message: not.type:string carries custom error', () => {
          expect(
            zodToOpenAPI({
              not: { type: 'string' },
              'x-not-message': '文字列は不可',
            }),
          ).toBe(
            `z.any().refine((val) => typeof val !== 'string',{error:"文字列は不可"}).openapi({"not":{"type":"string"}})`,
          )
          const runtime = z
            .any()
            .refine((val) => typeof val !== 'string', { error: '文字列は不可' })
          expect(runtime.safeParse(123).success).toBe(true)
          const result = runtime.safeParse('abc')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: '文字列は不可' },
            ])
          }
        })
        it.concurrent('x-not-message: not.const:42 carries custom error', () => {
          expect(
            zodToOpenAPI({
              not: { const: 42 },
              'x-not-message': '42は不可',
            }),
          ).toBe(
            'z.any().refine((val) => val !== 42,{error:"42は不可"}).openapi({"not":{"const":42}})',
          )
          const runtime = z.any().refine((val) => val !== 42, { error: '42は不可' })
          expect(runtime.safeParse(7).success).toBe(true)
          const result = runtime.safeParse(42)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: '42は不可' },
            ])
          }
        })
        it.concurrent('x-not-message: not.enum:[1,2,3] carries custom error', () => {
          expect(
            zodToOpenAPI({
              not: { enum: [1, 2, 3] },
              'x-not-message': '1,2,3は不可',
            }),
          ).toBe(
            'z.any().refine((val) => ![1,2,3].includes(val),{error:"1,2,3は不可"}).openapi({"not":{"enum":[1,2,3]}})',
          )
          const runtime = z
            .any()
            .refine((val) => ![1, 2, 3].includes(val), { error: '1,2,3は不可' })
          expect(runtime.safeParse(4).success).toBe(true)
          const result = runtime.safeParse(2)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: '1,2,3は不可' },
            ])
          }
        })
        it.concurrent('x-not-message: not.$ref carries custom error', () => {
          expect(
            zodToOpenAPI({
              not: { $ref: '#/components/schemas/Forbidden' },
              'x-not-message': '禁止スキーマ不可',
            }),
          ).toBe(
            'z.any().refine((val) => !ForbiddenSchema.safeParse(val).success,{error:"禁止スキーマ不可"}).openapi({"not":{"$ref":"#/components/schemas/Forbidden"}})',
          )
          const ForbiddenSchema = z.string()
          const runtime = z.any().refine((val) => !ForbiddenSchema.safeParse(val).success, {
            error: '禁止スキーマ不可',
          })
          expect(runtime.safeParse(123).success).toBe(true)
          const result = runtime.safeParse('abc')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: '禁止スキーマ不可' },
            ])
          }
        })
        it.concurrent('x-not-message: not.type:[string,number] carries custom error', () => {
          expect(
            zodToOpenAPI({
              not: { type: ['string', 'number'] },
              'x-not-message': '文字列・数値は不可',
            }),
          ).toBe(
            `z.any().refine((val) => (typeof val !== 'string') && (typeof val !== 'number'),{error:"文字列・数値は不可"}).openapi({"not":{"type":["string","number"]}})`,
          )
          const runtime = z
            .any()
            .refine((val) => typeof val !== 'string' && typeof val !== 'number', {
              error: '文字列・数値は不可',
            })
          expect(runtime.safeParse(true).success).toBe(true)
          const r1 = runtime.safeParse('abc')
          expect(r1.success).toBe(false)
          if (!r1.success) {
            expect(r1.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: '文字列・数値は不可' },
            ])
          }
          const r2 = runtime.safeParse(1)
          expect(r2.success).toBe(false)
          if (!r2.success) {
            expect(r2.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: '文字列・数値は不可' },
            ])
          }
        })
        it.concurrent('x-not-message: not + anyOf composition carries custom error', () => {
          expect(
            zodToOpenAPI({
              not: { anyOf: [{ type: 'string' }, { type: 'number' }] },
              'x-not-message': 'union不可',
            }),
          ).toBe(
            'z.any().refine((val) => !z.union([z.string(),z.number()]).safeParse(val).success,{error:"union不可"}).openapi({"not":{"anyOf":[{"type":"string"},{"type":"number"}]}})',
          )
          const runtime = z
            .any()
            .refine((val) => !z.union([z.string(), z.number()]).safeParse(val).success, {
              error: 'union不可',
            })
          expect(runtime.safeParse(true).success).toBe(true)
          const result = runtime.safeParse('abc')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'union不可' },
            ])
          }
        })
      })
    })

    describe('const', () => {
      it.concurrent('const: literal "fixed"', () => {
        expect(zodToOpenAPI({ const: 'fixed' })).toBe('z.literal("fixed")')
        const runtime = z.literal('fixed')
        expect(runtime.safeParse('fixed').success).toBe(true)
        const result = runtime.safeParse('other')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: ['fixed'],
              path: [],
              message: 'Invalid input: expected "fixed"',
            },
          ])
        }
      })
      it.concurrent('const: literal "fixed" nullable via `nullable: true`', () => {
        expect(zodToOpenAPI({ const: 'fixed', nullable: true })).toBe(
          'z.literal("fixed").nullable()',
        )
        const runtime = z.literal('fixed').nullable()
        expect(runtime.safeParse('fixed').success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse('other')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: ['fixed'],
              path: [],
              message: 'Invalid input: expected "fixed"',
            },
          ])
        }
      })
      it.concurrent('const: literal "fixed" nullable via `type: [null]`', () => {
        expect(zodToOpenAPI({ type: ['null'], const: 'fixed' })).toBe(
          'z.literal("fixed").nullable()',
        )
        const runtime = z.literal('fixed').nullable()
        expect(runtime.safeParse('fixed').success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse('other')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: ['fixed'],
              path: [],
              message: 'Invalid input: expected "fixed"',
            },
          ])
        }
      })
    })

    // enum
    describe('enum', () => {
      it.concurrent('enum: ["A","B"] string enum', () => {
        expect(zodToOpenAPI({ enum: ['A', 'B'] })).toBe('z.enum(["A","B"])')
        const runtime = z.enum(['A', 'B'])
        expect(runtime.safeParse('A').success).toBe(true)
        const result = runtime.safeParse('C')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: ['A', 'B'],
              path: [],
              message: 'Invalid option: expected one of "A"|"B"',
            },
          ])
        }
      })
      it.concurrent('enum: ["A","B"] nullable via `nullable: true`', () => {
        expect(
          zodToOpenAPI({
            enum: ['A', 'B'],
            type: ['string'],
            nullable: true,
          }),
        ).toBe('z.enum(["A","B"]).nullable()')
        const runtime = z.enum(['A', 'B']).nullable()
        expect(runtime.safeParse('A').success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse('C')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: ['A', 'B'],
              path: [],
              message: 'Invalid option: expected one of "A"|"B"',
            },
          ])
        }
      })
      it.concurrent('enum: ["A","B"] nullable via `type: [string,null]`', () => {
        expect(zodToOpenAPI({ enum: ['A', 'B'], type: ['string', 'null'] })).toBe(
          'z.enum(["A","B"]).nullable()',
        )
        const runtime = z.enum(['A', 'B']).nullable()
        expect(runtime.safeParse('A').success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse('C')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: ['A', 'B'],
              path: [],
              message: 'Invalid option: expected one of "A"|"B"',
            },
          ])
        }
      })
      it.concurrent('enum: [1,2] numeric enum (z.union of literals)', () => {
        expect(zodToOpenAPI({ enum: [1, 2] })).toBe('z.union([z.literal(1),z.literal(2)])')
        const runtime = z.union([z.literal(1), z.literal(2)])
        expect(runtime.safeParse(1).success).toBe(true)
        const result = runtime.safeParse(3)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    code: 'invalid_value',
                    values: [1],
                    path: [],
                    message: 'Invalid input: expected 1',
                  },
                ],
                [
                  {
                    code: 'invalid_value',
                    values: [2],
                    path: [],
                    message: 'Invalid input: expected 2',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('enum: [1,2] nullable via `nullable: true`', () => {
        expect(
          zodToOpenAPI({
            enum: [1, 2],
            type: ['number'],
            nullable: true,
          }),
        ).toBe('z.union([z.literal(1),z.literal(2)]).nullable()')
        const runtime = z.union([z.literal(1), z.literal(2)]).nullable()
        expect(runtime.safeParse(2).success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse(3)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    code: 'invalid_value',
                    values: [1],
                    path: [],
                    message: 'Invalid input: expected 1',
                  },
                ],
                [
                  {
                    code: 'invalid_value',
                    values: [2],
                    path: [],
                    message: 'Invalid input: expected 2',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('enum: [1,2] nullable via `type: [number,null]`', () => {
        expect(zodToOpenAPI({ enum: [1, 2], type: ['number', 'null'] })).toBe(
          'z.union([z.literal(1),z.literal(2)]).nullable()',
        )
        const runtime = z.union([z.literal(1), z.literal(2)]).nullable()
        expect(runtime.safeParse(2).success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse(3)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    code: 'invalid_value',
                    values: [1],
                    path: [],
                    message: 'Invalid input: expected 1',
                  },
                ],
                [
                  {
                    code: 'invalid_value',
                    values: [2],
                    path: [],
                    message: 'Invalid input: expected 2',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('enum: [true,false] boolean enum (z.union of literals)', () => {
        expect(zodToOpenAPI({ enum: [true, false] })).toBe(
          'z.union([z.literal(true),z.literal(false)])',
        )
        const runtime = z.union([z.literal(true), z.literal(false)])
        expect(runtime.safeParse(true).success).toBe(true)
        expect(runtime.safeParse(false).success).toBe(true)
        const result = runtime.safeParse('a')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    code: 'invalid_value',
                    values: [true],
                    path: [],
                    message: 'Invalid input: expected true',
                  },
                ],
                [
                  {
                    code: 'invalid_value',
                    values: [false],
                    path: [],
                    message: 'Invalid input: expected false',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('enum: [true,false] nullable via `nullable: true`', () => {
        expect(
          zodToOpenAPI({
            enum: [true, false],
            type: ['boolean'],
            nullable: true,
          }),
        ).toBe('z.union([z.literal(true),z.literal(false)]).nullable()')
        const runtime = z.union([z.literal(true), z.literal(false)]).nullable()
        expect(runtime.safeParse(true).success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse('a')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    code: 'invalid_value',
                    values: [true],
                    path: [],
                    message: 'Invalid input: expected true',
                  },
                ],
                [
                  {
                    code: 'invalid_value',
                    values: [false],
                    path: [],
                    message: 'Invalid input: expected false',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('enum: [true,false] nullable via `type: [boolean,null]`', () => {
        expect(
          zodToOpenAPI({
            enum: [true, false],
            type: ['boolean', 'null'],
          }),
        ).toBe('z.union([z.literal(true),z.literal(false)]).nullable()')
        const runtime = z.union([z.literal(true), z.literal(false)]).nullable()
        expect(runtime.safeParse(false).success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse('a')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    code: 'invalid_value',
                    values: [true],
                    path: [],
                    message: 'Invalid input: expected true',
                  },
                ],
                [
                  {
                    code: 'invalid_value',
                    values: [false],
                    path: [],
                    message: 'Invalid input: expected false',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('enum: [null] only-null collapses to z.literal(null)', () => {
        expect(zodToOpenAPI({ enum: [null] })).toBe('z.literal(null)')
        const runtime = z.literal(null)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse(0)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: [null],
              path: [],
              message: 'Invalid input: expected null',
            },
          ])
        }
      })
      it.concurrent('enum: [null] with type:[null] → z.literal(null).nullable()', () => {
        expect(zodToOpenAPI({ enum: [null], type: ['null'] })).toBe('z.literal(null).nullable()')
        const runtime = z.literal(null).nullable()
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse(0)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: [null],
              path: [],
              message: 'Invalid input: expected null',
            },
          ])
        }
      })
      it.concurrent('enum: single string ["abc"] becomes z.literal', () => {
        expect(zodToOpenAPI({ enum: ['abc'] })).toBe(`z.literal('abc')`)
        const runtime = z.literal('abc')
        expect(runtime.safeParse('abc').success).toBe(true)
        const result = runtime.safeParse('xyz')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: ['abc'],
              path: [],
              message: 'Invalid input: expected "abc"',
            },
          ])
        }
      })
      it.concurrent('enum: single string ["abc"] nullable via `nullable: true`', () => {
        expect(
          zodToOpenAPI({
            enum: ['abc'],
            type: ['string'],
            nullable: true,
          }),
        ).toBe(`z.literal('abc').nullable()`)
        const runtime = z.literal('abc').nullable()
        expect(runtime.safeParse('abc').success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse('xyz')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: ['abc'],
              path: [],
              message: 'Invalid input: expected "abc"',
            },
          ])
        }
      })
      it.concurrent('enum: single string ["abc"] nullable via `type: [string,null]`', () => {
        expect(zodToOpenAPI({ enum: ['abc'], type: ['string', 'null'] })).toBe(
          `z.literal('abc').nullable()`,
        )
        const runtime = z.literal('abc').nullable()
        expect(runtime.safeParse('abc').success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse('xyz')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: ['abc'],
              path: [],
              message: 'Invalid input: expected "abc"',
            },
          ])
        }
      })
      it.concurrent('enum: type:array with single tuple [[1,2]] → tuple literal', () => {
        expect(zodToOpenAPI({ type: 'array', enum: [[1, 2]] })).toBe(
          'z.tuple([z.literal(1),z.literal(2)])',
        )
        const runtime = z.tuple([z.literal(1), z.literal(2)])
        expect(runtime.safeParse([1, 2]).success).toBe(true)
        const result = runtime.safeParse([1, 3])
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: [2],
              path: [1],
              message: 'Invalid input: expected 2',
            },
          ])
        }
      })
      it.concurrent('enum: array with single tuple, nullable via `nullable: true`', () => {
        expect(
          zodToOpenAPI({
            type: 'array',
            nullable: true,
            enum: [[1, 2]],
          }),
        ).toBe('z.tuple([z.literal(1),z.literal(2)]).nullable()')
        const runtime = z.tuple([z.literal(1), z.literal(2)]).nullable()
        expect(runtime.safeParse([1, 2]).success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse([1, 3])
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: [2],
              path: [1],
              message: 'Invalid input: expected 2',
            },
          ])
        }
      })
      it.concurrent('enum: array with single tuple, nullable via `type: [array,null]`', () => {
        expect(zodToOpenAPI({ type: ['array', 'null'], enum: [[1, 2]] })).toBe(
          'z.tuple([z.literal(1),z.literal(2)]).nullable()',
        )
        const runtime = z.tuple([z.literal(1), z.literal(2)]).nullable()
        expect(runtime.safeParse([1, 2]).success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse([1, 3])
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_value',
              values: [2],
              path: [1],
              message: 'Invalid input: expected 2',
            },
          ])
        }
      })
      it.concurrent('enum: array with two tuples → z.union of tuples', () => {
        expect(
          zodToOpenAPI({
            type: 'array',
            enum: [
              [1, 2],
              [3, 4],
            ],
          }),
        ).toBe(
          'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])])',
        )
        const runtime = z.union([
          z.tuple([z.literal(1), z.literal(2)]),
          z.tuple([z.literal(3), z.literal(4)]),
        ])
        expect(runtime.safeParse([1, 2]).success).toBe(true)
        expect(runtime.safeParse([3, 4]).success).toBe(true)
        const result = runtime.safeParse([1, 3])
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    code: 'invalid_value',
                    values: [2],
                    path: [1],
                    message: 'Invalid input: expected 2',
                  },
                ],
                [
                  {
                    code: 'invalid_value',
                    values: [3],
                    path: [0],
                    message: 'Invalid input: expected 3',
                  },
                  {
                    code: 'invalid_value',
                    values: [4],
                    path: [1],
                    message: 'Invalid input: expected 4',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('enum: array with two tuples, nullable via `nullable: true`', () => {
        expect(
          zodToOpenAPI({
            type: 'array',
            nullable: true,
            enum: [
              [1, 2],
              [3, 4],
            ],
          }),
        ).toBe(
          'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])]).nullable()',
        )
        const runtime = z
          .union([z.tuple([z.literal(1), z.literal(2)]), z.tuple([z.literal(3), z.literal(4)])])
          .nullable()
        expect(runtime.safeParse([3, 4]).success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse([1, 3])
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    code: 'invalid_value',
                    values: [2],
                    path: [1],
                    message: 'Invalid input: expected 2',
                  },
                ],
                [
                  {
                    code: 'invalid_value',
                    values: [3],
                    path: [0],
                    message: 'Invalid input: expected 3',
                  },
                  {
                    code: 'invalid_value',
                    values: [4],
                    path: [1],
                    message: 'Invalid input: expected 4',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
      it.concurrent('enum: array with two tuples, nullable via `type: [array,null]`', () => {
        expect(
          zodToOpenAPI({
            type: ['array', 'null'],
            enum: [
              [1, 2],
              [3, 4],
            ],
          }),
        ).toBe(
          'z.union([z.tuple([z.literal(1),z.literal(2)]),z.tuple([z.literal(3),z.literal(4)])]).nullable()',
        )
        const runtime = z
          .union([z.tuple([z.literal(1), z.literal(2)]), z.tuple([z.literal(3), z.literal(4)])])
          .nullable()
        expect(runtime.safeParse([3, 4]).success).toBe(true)
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse([1, 3])
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_union',
              errors: [
                [
                  {
                    code: 'invalid_value',
                    values: [2],
                    path: [1],
                    message: 'Invalid input: expected 2',
                  },
                ],
                [
                  {
                    code: 'invalid_value',
                    values: [3],
                    path: [0],
                    message: 'Invalid input: expected 3',
                  },
                  {
                    code: 'invalid_value',
                    values: [4],
                    path: [1],
                    message: 'Invalid input: expected 4',
                  },
                ],
              ],
              path: [],
              message: 'Invalid input',
            },
          ])
        }
      })
    })

    // string
    describe('string', () => {
      it.concurrent('string: bare type → z.string() (accepts "abc" / rejects 123)', () => {
        expect(zodToOpenAPI({ type: 'string' })).toBe('z.string()')
        const runtime = z.string()
        expect(runtime.safeParse('abc').success).toBe(true)
        const result = runtime.safeParse(123)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              expected: 'string',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected string, received number',
            },
          ])
        }
      })

      it.concurrent('string: type:[string] + nullable → z.string().nullable() (accepts null / rejects 123)', () => {
        expect(zodToOpenAPI({ type: ['string'], nullable: true })).toBe('z.string().nullable()')
        const runtime = z.string().nullable()
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse(123)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              expected: 'string',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected string, received number',
            },
          ])
        }
      })

      it.concurrent('string: type:[string,null] → z.string().nullable() (accepts null / rejects 123)', () => {
        expect(zodToOpenAPI({ type: ['string', 'null'] })).toBe('z.string().nullable()')
        const runtime = z.string().nullable()
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse(123)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              expected: 'string',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected string, received number',
            },
          ])
        }
      })

      it.concurrent('string: minLength/maxLength → z.string().min(1).max(10) (accepts "abc" / rejects "")', () => {
        expect(zodToOpenAPI({ type: 'string', minLength: 1, maxLength: 10 })).toBe(
          'z.string().min(1).max(10)',
        )
        const runtime = z.string().min(1).max(10)
        expect(runtime.safeParse('abc').success).toBe(true)
        const result = runtime.safeParse('')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'too_small',
              minimum: 1,
              inclusive: true,
              path: [],
              message: 'Too small: expected string to have >=1 characters',
            },
          ])
        }
      })

      it.concurrent('string: pattern → z.string().regex(/^\\w+$/) (accepts "abc" / rejects "!@#")', () => {
        expect(zodToOpenAPI({ type: 'string', pattern: '^\\w+$' })).toBe(
          'z.string().regex(/^\\w+$/)',
        )
        // oxlint-disable-next-line require-unicode-regexp -- mirrors the regex literal the generator emits
        const runtime = z.string().regex(/^\w+$/)
        expect(runtime.safeParse('abc').success).toBe(true)
        const result = runtime.safeParse('!@#')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'regex',
              pattern: '/^\\w+$/',
              path: [],
              message: 'Invalid string: must match pattern /^\\w+$/',
            },
          ])
        }
      })

      it.concurrent('string: default → z.string().default("test") (accepts "abc" / rejects 123)', () => {
        expect(zodToOpenAPI({ type: 'string', default: 'test' })).toBe('z.string().default("test")')
        const runtime = z.string().default('test')
        expect(runtime.safeParse('abc').success).toBe(true)
        const result = runtime.safeParse(123)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              expected: 'string',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected string, received number',
            },
          ])
        }
      })

      it.concurrent('string: default + nullable → z.string().nullable().default("test") (accepts null / rejects 123)', () => {
        expect(
          zodToOpenAPI({
            type: 'string',
            default: 'test',
            nullable: true,
          }),
        ).toBe('z.string().nullable().default("test")')
        const runtime = z.string().nullable().default('test')
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse(123)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              expected: 'string',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected string, received number',
            },
          ])
        }
      })

      it.concurrent('string: type:[string,null] + default → z.string().nullable().default("test") (accepts null / rejects 123)', () => {
        expect(
          zodToOpenAPI({
            type: ['string', 'null'],
            default: 'test',
          }),
        ).toBe('z.string().nullable().default("test")')
        const runtime = z.string().nullable().default('test')
        expect(runtime.safeParse(null).success).toBe(true)
        const result = runtime.safeParse(123)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              expected: 'string',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected string, received number',
            },
          ])
        }
      })

      it.concurrent('string format: email → z.email() (accepts "a@b.com" / rejects "notmail")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'email' })).toBe('z.email()')
        const runtime = z.email()
        expect(runtime.safeParse('a@b.com').success).toBe(true)
        const result = runtime.safeParse('notmail')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'email',
              pattern:
                "/^(?:[A-Za-z0-9_'+\\-]+\\.)*[A-Za-z0-9_'+\\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
              path: [],
              message: 'Invalid email address',
            },
          ])
        }
      })

      it.concurrent('string format: uuid → z.uuid() (accepts canonical uuid / rejects "not-uuid")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'uuid' })).toBe('z.uuid()')
        const runtime = z.uuid()
        expect(runtime.safeParse('550e8400-e29b-41d4-a716-446655440000').success).toBe(true)
        const result = runtime.safeParse('not-uuid')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'uuid',
              pattern:
                '/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/',
              path: [],
              message: 'Invalid UUID',
            },
          ])
        }
      })

      it.concurrent('string format: uuidv4 → z.uuidv4() (accepts a v4 uuid / rejects "not-uuid")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'uuidv4' })).toBe('z.uuidv4()')
        const runtime = z.uuidv4()
        expect(runtime.safeParse('550e8400-e29b-41d4-a716-446655440000').success).toBe(true)
        const result = runtime.safeParse('not-uuid')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'uuid',
              pattern:
                '/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/',
              path: [],
              message: 'Invalid UUID',
            },
          ])
        }
      })

      it.concurrent('string format: uuidv7 → z.uuidv7() (accepts a v7 uuid / rejects "not-uuid")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'uuidv7' })).toBe('z.uuidv7()')
        const runtime = z.uuidv7()
        expect(runtime.safeParse('018f4d1b-3b8c-7000-8000-000000000000').success).toBe(true)
        const result = runtime.safeParse('not-uuid')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'uuid',
              pattern:
                '/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/',
              path: [],
              message: 'Invalid UUID',
            },
          ])
        }
      })

      it.concurrent('string format: uri → z.url() (accepts "https://example.com" / rejects "not a url")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'uri' })).toBe('z.url()')
        const runtime = z.url()
        expect(runtime.safeParse('https://example.com').success).toBe(true)
        const result = runtime.safeParse('not a url')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_format',
              format: 'url',
              path: [],
              message: 'Invalid URL',
            },
          ])
        }
      })

      it.concurrent('string format: emoji → z.emoji() (accepts emoji / rejects plain ascii)', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'emoji' })).toBe('z.emoji()')
        const runtime = z.emoji()
        expect(runtime.safeParse('🎉').success).toBe(true)
        const result = runtime.safeParse('abc')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'emoji',
              pattern:
                '/^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$/u',
              path: [],
              message: 'Invalid emoji',
            },
          ])
        }
      })

      it.concurrent('string format: base64 → z.base64() (accepts "aGVsbG8=" / rejects "!!!not-base64!!!")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'base64' })).toBe('z.base64()')
        const runtime = z.base64()
        expect(runtime.safeParse('aGVsbG8=').success).toBe(true)
        const result = runtime.safeParse('!!!not-base64!!!')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_format',
              format: 'base64',
              path: [],
              message: 'Invalid base64-encoded string',
            },
          ])
        }
      })

      it.concurrent('string format: nanoid → z.nanoid() (accepts 21-char nanoid / rejects "short")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'nanoid' })).toBe('z.nanoid()')
        const runtime = z.nanoid()
        expect(runtime.safeParse('V1StGXR8_Z5jdHi6B-myT').success).toBe(true)
        const result = runtime.safeParse('short')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'nanoid',
              pattern: '/^[a-zA-Z0-9_-]{21}$/',
              path: [],
              message: 'Invalid nanoid',
            },
          ])
        }
      })

      it.concurrent('string format: cuid → z.cuid() (accepts a cuid / rejects "not-cuid")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'cuid' })).toBe('z.cuid()')
        // oxlint-disable-next-line typescript/no-deprecated -- asserts the emitter's own `z.cuid()` output still parses
        const runtime = z.cuid()
        expect(runtime.safeParse('cjld2cjxh0000qzrmn831i7rn').success).toBe(true)
        const result = runtime.safeParse('not-cuid')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'cuid',
              pattern: '/^[cC][0-9a-z]{6,}$/',
              path: [],
              message: 'Invalid cuid',
            },
          ])
        }
      })

      it.concurrent('string format: cuid2 → z.cuid2() (accepts a cuid2 / rejects "NOT_CUID2")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'cuid2' })).toBe('z.cuid2()')
        const runtime = z.cuid2()
        expect(runtime.safeParse('tz4a98xxat96iws9zmbrgj3a').success).toBe(true)
        const result = runtime.safeParse('NOT_CUID2')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'cuid2',
              pattern: '/^[0-9a-z]+$/',
              path: [],
              message: 'Invalid cuid2',
            },
          ])
        }
      })

      it.concurrent('string format: ulid → z.ulid() (accepts a ULID / rejects "not-ulid")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'ulid' })).toBe('z.ulid()')
        const runtime = z.ulid()
        expect(runtime.safeParse('01HXY0RQXKQZ8JK4F1J6Y2W3VZ').success).toBe(true)
        const result = runtime.safeParse('not-ulid')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'ulid',
              pattern: '/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/',
              path: [],
              message: 'Invalid ULID',
            },
          ])
        }
      })

      it.concurrent('string format: ipv4 → z.ipv4() (accepts "127.0.0.1" / rejects "999.999.999.999")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'ipv4' })).toBe('z.ipv4()')
        const runtime = z.ipv4()
        expect(runtime.safeParse('127.0.0.1').success).toBe(true)
        const result = runtime.safeParse('999.999.999.999')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'ipv4',
              pattern:
                '/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/',
              path: [],
              message: 'Invalid IPv4 address',
            },
          ])
        }
      })

      it.concurrent('string format: ipv6 → z.ipv6() (accepts "::1" / rejects "not-ipv6")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'ipv6' })).toBe('z.ipv6()')
        const runtime = z.ipv6()
        expect(runtime.safeParse('::1').success).toBe(true)
        const result = runtime.safeParse('not-ipv6')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_format',
              format: 'ipv6',
              path: [],
              message: 'Invalid IPv6 address',
            },
          ])
        }
      })

      it.concurrent('string format: cidrv4 → z.cidrv4() (accepts "10.0.0.0/8" / rejects "not-cidr")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'cidrv4' })).toBe('z.cidrv4()')
        const runtime = z.cidrv4()
        expect(runtime.safeParse('10.0.0.0/8').success).toBe(true)
        const result = runtime.safeParse('not-cidr')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'cidrv4',
              pattern:
                '/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\/([0-9]|[1-2][0-9]|3[0-2])$/',
              path: [],
              message: 'Invalid IPv4 range',
            },
          ])
        }
      })

      it.concurrent('string format: cidrv6 → z.cidrv6() (accepts "::/0" / rejects "not-cidr")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'cidrv6' })).toBe('z.cidrv6()')
        const runtime = z.cidrv6()
        expect(runtime.safeParse('::/0').success).toBe(true)
        const result = runtime.safeParse('not-cidr')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_format',
              format: 'cidrv6',
              path: [],
              message: 'Invalid IPv6 range',
            },
          ])
        }
      })

      it.concurrent('string format: date → z.iso.date() (accepts "2024-01-01" / rejects "not-date")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'date' })).toBe('z.iso.date()')
        const runtime = z.iso.date()
        expect(runtime.safeParse('2024-01-01').success).toBe(true)
        const result = runtime.safeParse('not-date')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'date',
              pattern:
                '/^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$/',
              path: [],
              message: 'Invalid ISO date',
            },
          ])
        }
      })

      it.concurrent('string format: time → a string matched against a time with an offset (accepts "12:34:56" / rejects "not-time")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'time' })).toBe(
          'z.string().regex(/^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?(?:Z|[+-](?:[01]\\d|2[0-3]):[0-5]\\d)?$/).openapi({format:"time"})',
        )
        const runtime = z.string().regex(
          // oxlint-disable-next-line require-unicode-regexp -- mirrors the regex literal the generator emits
          /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)?$/,
        )
        expect(runtime.safeParse('12:34:56').success).toBe(true)
        expect(runtime.safeParse('12:34:56Z').success).toBe(true)
        expect(runtime.safeParse('12:34:56+09:00').success).toBe(true)
        const result = runtime.safeParse('not-time')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'regex',
              pattern:
                '/^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?(?:Z|[+-](?:[01]\\d|2[0-3]):[0-5]\\d)?$/',
              path: [],
              message:
                'Invalid string: must match pattern /^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?(?:Z|[+-](?:[01]\\d|2[0-3]):[0-5]\\d)?$/',
            },
          ])
        }
      })

      it.concurrent('string format: date-time → z.iso.datetime({offset:true}) (accepts ISO datetime / rejects "not-datetime")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'date-time' })).toBe(
          'z.iso.datetime({offset:true})',
        )
        const runtime = z.iso.datetime({ offset: true })
        expect(runtime.safeParse('2024-01-01T00:00:00Z').success).toBe(true)
        expect(runtime.safeParse('2024-01-01T00:00:00+09:00').success).toBe(true)
        const result = runtime.safeParse('not-datetime')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'datetime',
              pattern:
                '/^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d)))$/',
              path: [],
              message: 'Invalid ISO datetime',
            },
          ])
        }
      })

      it.concurrent('string format: duration → z.iso.duration() (accepts "P1Y" / rejects "not-duration")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'duration' })).toBe('z.iso.duration()')
        const runtime = z.iso.duration()
        expect(runtime.safeParse('P1Y').success).toBe(true)
        const result = runtime.safeParse('not-duration')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              origin: 'string',
              code: 'invalid_format',
              format: 'duration',
              pattern:
                '/^P(?:(\\d+W)|(?!.*W)(?=\\d|T\\d)(\\d+Y)?(\\d+M)?(\\d+D)?(T(?=\\d)(\\d+H)?(\\d+M)?(\\d+([.,]\\d+)?S)?)?)$/',
              path: [],
              message: 'Invalid ISO duration',
            },
          ])
        }
      })

      // A `z.file()` as `z.toJSONSchema()` writes it comes back as the same `z.file()`, and
      // the document states what the chain checks.
      it.concurrent('string format: binary with size and MIME type → z.file().min().max().mime(), all stated', () => {
        expect(
          zodToOpenAPI({
            type: 'string',
            format: 'binary',
            contentEncoding: 'binary',
            minLength: 1,
            maxLength: 1_048_576,
            contentMediaType: 'image/png',
          }),
        ).toBe(
          'z.file().min(1).max(1048576).mime("image/png").openapi({type:"string",format:"binary",minLength:1,maxLength:1048576,anyOf:[{"contentMediaType":"image/png"}]})',
        )
        const runtime = z.file().min(1).max(1_048_576).mime('image/png')
        expect(runtime.safeParse(new File(['x'], 'a.png', { type: 'image/png' })).success).toBe(
          true,
        )
        expect(runtime.safeParse(new File(['x'], 'a.txt', { type: 'text/plain' })).success).toBe(
          false,
        )
        expect(runtime.safeParse(new File([], 'a.png', { type: 'image/png' })).success).toBe(false)
      })
      it.concurrent('string format: binary with an anyOf of MIME types → z.file().mime([...])', () => {
        expect(
          zodToOpenAPI({
            type: 'string',
            format: 'binary',
            anyOf: [{ contentMediaType: 'image/png' }, { contentMediaType: 'image/jpeg' }],
          }),
        ).toBe(
          'z.file().mime(["image/png","image/jpeg"]).openapi({type:"string",format:"binary",anyOf:[{"contentMediaType":"image/png"},{"contentMediaType":"image/jpeg"}]})',
        )
        const runtime = z.file().mime(['image/png', 'image/jpeg'])
        expect(runtime.safeParse(new File(['x'], 'a.jpg', { type: 'image/jpeg' })).success).toBe(
          true,
        )
        expect(runtime.safeParse(new File(['x'], 'a.gif', { type: 'image/gif' })).success).toBe(
          false,
        )
      })
      it.concurrent('string format: binary → z.file().openapi({type,format}) (rejects non-File "plain string"; valid File omitted for Node test env)', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'binary' })).toBe(
          'z.file().openapi({type:"string",format:"binary"})',
        )
        const runtime = z.file()
        const result = runtime.safeParse('plain string')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              expected: 'file',
              code: 'invalid_type',
              path: [],
              message: 'Invalid input: expected file, received string',
            },
          ])
        }
      })

      it.concurrent('string format: jwt → z.jwt() (accepts a sample HS256 JWT / rejects "not-jwt")', () => {
        expect(zodToOpenAPI({ type: 'string', format: 'jwt' })).toBe('z.jwt()')
        const runtime = z.jwt()
        expect(
          runtime.safeParse(
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          ).success,
        ).toBe(true)
        const result = runtime.safeParse('not-jwt')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toStrictEqual([
            {
              code: 'invalid_format',
              format: 'jwt',
              path: [],
              message: 'Invalid JWT',
            },
          ])
        }
      })

      // number
      describe('number', () => {
        describe('type: number', () => {
          it.concurrent('number: bare type → z.number()', () => {
            expect(zodToOpenAPI({ type: 'number' })).toBe('z.number()')
            const runtime = z.number()
            expect(runtime.safeParse(1.5).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('number: type=[number] + nullable=true → nullable()', () => {
            expect(zodToOpenAPI({ type: ['number'], nullable: true })).toBe('z.number().nullable()')
            const runtime = z.number().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('number: type=[number, null] → nullable()', () => {
            expect(zodToOpenAPI({ type: ['number', 'null'] })).toBe('z.number().nullable()')
            const runtime = z.number().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('number: minimum=0 + exclusiveMinimum=true → positive()', () => {
            expect(
              zodToOpenAPI({
                type: 'number',
                minimum: 0,
                exclusiveMinimum: true,
              }),
            ).toBe('z.number().positive()')
            const runtime = z.number().positive()
            expect(runtime.safeParse(1).success).toBe(true)
            const result = runtime.safeParse(0)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 0,
                  inclusive: false,
                  path: [],
                  message: 'Too small: expected number to be >0',
                },
              ])
            }
          })
          it.concurrent('number: minimum=0 + exclusiveMinimum=false → nonnegative()', () => {
            expect(
              zodToOpenAPI({
                type: 'number',
                minimum: 0,
                exclusiveMinimum: false,
              }),
            ).toBe('z.number().nonnegative()')
            const runtime = z.number().nonnegative()
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(-1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected number to be >=0',
                },
              ])
            }
          })
          it.concurrent('number: maximum=0 + exclusiveMaximum=true → negative()', () => {
            expect(
              zodToOpenAPI({
                type: 'number',
                maximum: 0,
                exclusiveMaximum: true,
              }),
            ).toBe('z.number().negative()')
            const runtime = z.number().negative()
            expect(runtime.safeParse(-1).success).toBe(true)
            const result = runtime.safeParse(0)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 0,
                  inclusive: false,
                  path: [],
                  message: 'Too big: expected number to be <0',
                },
              ])
            }
          })
          it.concurrent('number: maximum=0 + exclusiveMaximum=false → nonpositive()', () => {
            expect(
              zodToOpenAPI({
                type: 'number',
                maximum: 0,
                exclusiveMaximum: false,
              }),
            ).toBe('z.number().nonpositive()')
            const runtime = z.number().nonpositive()
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected number to be <=0',
                },
              ])
            }
          })
          it.concurrent('number: minimum=100 → min(100)', () => {
            expect(zodToOpenAPI({ type: 'number', minimum: 100 })).toBe('z.number().min(100)')
            const runtime = z.number().min(100)
            expect(runtime.safeParse(200).success).toBe(true)
            const result = runtime.safeParse(99)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 100,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected number to be >=100',
                },
              ])
            }
          })
          it.concurrent('number: minimum=0 (no exclusive) → min(0)', () => {
            expect(zodToOpenAPI({ type: 'number', minimum: 0 })).toBe('z.number().min(0)')
            const runtime = z.number().min(0)
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(-1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected number to be >=0',
                },
              ])
            }
          })
          it.concurrent('number: minimum=100 + exclusiveMinimum=true → gt(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'number',
                minimum: 100,
                exclusiveMinimum: true,
              }),
            ).toBe('z.number().gt(100)')
            const runtime = z.number().gt(100)
            expect(runtime.safeParse(101).success).toBe(true)
            const result = runtime.safeParse(100)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 100,
                  inclusive: false,
                  path: [],
                  message: 'Too small: expected number to be >100',
                },
              ])
            }
          })
          it.concurrent('number: maximum=100 → max(100)', () => {
            expect(zodToOpenAPI({ type: 'number', maximum: 100 })).toBe('z.number().max(100)')
            const runtime = z.number().max(100)
            expect(runtime.safeParse(50).success).toBe(true)
            const result = runtime.safeParse(101)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 100,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected number to be <=100',
                },
              ])
            }
          })
          it.concurrent('number: maximum=0 (no exclusive) → max(0)', () => {
            expect(zodToOpenAPI({ type: 'number', maximum: 0 })).toBe('z.number().max(0)')
            const runtime = z.number().max(0)
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected number to be <=0',
                },
              ])
            }
          })
          it.concurrent('number: maximum=100 + exclusiveMaximum=true → lt(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'number',
                maximum: 100,
                exclusiveMaximum: true,
              }),
            ).toBe('z.number().lt(100)')
            const runtime = z.number().lt(100)
            expect(runtime.safeParse(99).success).toBe(true)
            const result = runtime.safeParse(100)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 100,
                  inclusive: false,
                  path: [],
                  message: 'Too big: expected number to be <100',
                },
              ])
            }
          })
          it.concurrent('number: multipleOf(2)', () => {
            expect(zodToOpenAPI({ type: 'number', multipleOf: 2 })).toBe('z.number().multipleOf(2)')
            const runtime = z.number().multipleOf(2)
            expect(runtime.safeParse(4).success).toBe(true)
            const result = runtime.safeParse(3)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'not_multiple_of',
                  divisor: 2,
                  path: [],
                  message: 'Invalid number: must be a multiple of 2',
                },
              ])
            }
          })
          it.concurrent('number: default(100)', () => {
            expect(zodToOpenAPI({ type: 'number', default: 100 })).toBe('z.number().default(100)')
            const runtime = z.number().default(100)
            expect(runtime.safeParse(1).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('number: nullable + default(100) → nullable().default(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'number',
                default: 100,
                nullable: true,
              }),
            ).toBe('z.number().nullable().default(100)')
            const runtime = z.number().nullable().default(100)
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('number: type=[number, null] + default → nullable().default(100)', () => {
            expect(
              zodToOpenAPI({
                type: ['number', 'null'],
                default: 100,
              }),
            ).toBe('z.number().nullable().default(100)')
            const runtime = z.number().nullable().default(100)
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
        })

        describe('type: number, format: float', () => {
          it.concurrent('number: format=float → z.float32()', () => {
            expect(zodToOpenAPI({ type: 'number', format: 'float' })).toBe('z.float32()')
            const runtime = z.float32()
            expect(runtime.safeParse(1.5).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('number: format=float + nullable → z.float32().nullable()', () => {
            expect(
              zodToOpenAPI({
                type: 'number',
                format: 'float',
                nullable: true,
              }),
            ).toBe('z.float32().nullable()')
            const runtime = z.float32().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('number: type=[number, null] + format=float → z.float32().nullable()', () => {
            expect(
              zodToOpenAPI({
                type: ['number', 'null'],
                format: 'float',
                nullable: true,
              }),
            ).toBe('z.float32().nullable()')
            const runtime = z.float32().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('number: format=float64 → z.float64()', () => {
            expect(zodToOpenAPI({ type: 'number', format: 'float64' })).toBe('z.float64()')
            const runtime = z.float64()
            expect(runtime.safeParse(1.5).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('number: format=float64 + nullable → z.float64().nullable()', () => {
            expect(
              zodToOpenAPI({
                type: 'number',
                format: 'float64',
                nullable: true,
              }),
            ).toBe('z.float64().nullable()')
            const runtime = z.float64().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('number: type=[number, null] + format=float64 → z.float64().nullable()', () => {
            expect(
              zodToOpenAPI({
                type: ['number', 'null'],
                format: 'float64',
                nullable: true,
              }),
            ).toBe('z.float64().nullable()')
            const runtime = z.float64().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
        })
      })

      // integer
      describe('integer', () => {
        describe('type: integer', () => {
          it.concurrent('integer: bare type → z.int()', () => {
            expect(zodToOpenAPI({ type: 'integer' })).toBe('z.int()')
            const runtime = z.int()
            expect(runtime.safeParse(1).success).toBe(true)
            const result = runtime.safeParse(1.5)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'int',
                  format: 'safeint',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected int, received number',
                },
              ])
            }
          })
          it.concurrent('integer: type=[integer] + nullable=true → nullable()', () => {
            expect(zodToOpenAPI({ type: ['integer'], nullable: true })).toBe('z.int().nullable()')
            const runtime = z.int().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('integer: type=[integer, null] → nullable()', () => {
            expect(zodToOpenAPI({ type: ['integer', 'null'] })).toBe('z.int().nullable()')
            const runtime = z.int().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('integer: minimum=0 + exclusiveMinimum=true → positive()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                minimum: 0,
                exclusiveMinimum: true,
              }),
            ).toBe('z.int().positive()')
            const runtime = z.int().positive()
            expect(runtime.safeParse(1).success).toBe(true)
            const result = runtime.safeParse(0)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 0,
                  inclusive: false,
                  path: [],
                  message: 'Too small: expected number to be >0',
                },
              ])
            }
          })
          it.concurrent('integer: minimum=0 + exclusiveMinimum=false → nonnegative()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                minimum: 0,
                exclusiveMinimum: false,
              }),
            ).toBe('z.int().nonnegative()')
            const runtime = z.int().nonnegative()
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(-1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected number to be >=0',
                },
              ])
            }
          })
          it.concurrent('integer: maximum=0 + exclusiveMaximum=true → negative()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                maximum: 0,
                exclusiveMaximum: true,
              }),
            ).toBe('z.int().negative()')
            const runtime = z.int().negative()
            expect(runtime.safeParse(-1).success).toBe(true)
            const result = runtime.safeParse(0)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 0,
                  inclusive: false,
                  path: [],
                  message: 'Too big: expected number to be <0',
                },
              ])
            }
          })
          it.concurrent('integer: maximum=0 + exclusiveMaximum=false → nonpositive()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                maximum: 0,
                exclusiveMaximum: false,
              }),
            ).toBe('z.int().nonpositive()')
            const runtime = z.int().nonpositive()
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected number to be <=0',
                },
              ])
            }
          })
          it.concurrent('integer: minimum=100 → min(100)', () => {
            expect(zodToOpenAPI({ type: 'integer', minimum: 100 })).toBe('z.int().min(100)')
            const runtime = z.int().min(100)
            expect(runtime.safeParse(200).success).toBe(true)
            const result = runtime.safeParse(99)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 100,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected number to be >=100',
                },
              ])
            }
          })
          it.concurrent('integer: minimum=0 (no exclusive) → min(0)', () => {
            expect(zodToOpenAPI({ type: 'integer', minimum: 0 })).toBe('z.int().min(0)')
            const runtime = z.int().min(0)
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(-1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected number to be >=0',
                },
              ])
            }
          })
          it.concurrent('integer: minimum=100 + exclusiveMinimum=true → gt(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                minimum: 100,
                exclusiveMinimum: true,
              }),
            ).toBe('z.int().gt(100)')
            const runtime = z.int().gt(100)
            expect(runtime.safeParse(101).success).toBe(true)
            const result = runtime.safeParse(100)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 100,
                  inclusive: false,
                  path: [],
                  message: 'Too small: expected number to be >100',
                },
              ])
            }
          })
          it.concurrent('integer: maximum=100 → max(100)', () => {
            expect(zodToOpenAPI({ type: 'integer', maximum: 100 })).toBe('z.int().max(100)')
            const runtime = z.int().max(100)
            expect(runtime.safeParse(50).success).toBe(true)
            const result = runtime.safeParse(101)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 100,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected number to be <=100',
                },
              ])
            }
          })
          it.concurrent('integer: maximum=0 (no exclusive) → max(0)', () => {
            expect(zodToOpenAPI({ type: 'integer', maximum: 0 })).toBe('z.int().max(0)')
            const runtime = z.int().max(0)
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected number to be <=0',
                },
              ])
            }
          })
          it.concurrent('integer: maximum=100 + exclusiveMaximum=true → lt(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                maximum: 100,
                exclusiveMaximum: true,
              }),
            ).toBe('z.int().lt(100)')
            const runtime = z.int().lt(100)
            expect(runtime.safeParse(99).success).toBe(true)
            const result = runtime.safeParse(100)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 100,
                  inclusive: false,
                  path: [],
                  message: 'Too big: expected number to be <100',
                },
              ])
            }
          })
          it.concurrent('integer: exclusiveMaximum=100 (numeric form) → lt(100)', () => {
            expect(zodToOpenAPI({ type: 'integer', exclusiveMaximum: 100 })).toBe('z.int().lt(100)')
            const runtime = z.int().lt(100)
            expect(runtime.safeParse(99).success).toBe(true)
            const result = runtime.safeParse(100)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 100,
                  inclusive: false,
                  path: [],
                  message: 'Too big: expected number to be <100',
                },
              ])
            }
          })
          it.concurrent('integer: multipleOf(2)', () => {
            expect(zodToOpenAPI({ type: 'integer', multipleOf: 2 })).toBe('z.int().multipleOf(2)')
            const runtime = z.int().multipleOf(2)
            expect(runtime.safeParse(4).success).toBe(true)
            const result = runtime.safeParse(3)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'not_multiple_of',
                  divisor: 2,
                  path: [],
                  message: 'Invalid number: must be a multiple of 2',
                },
              ])
            }
          })
          it.concurrent('integer: default(100)', () => {
            expect(zodToOpenAPI({ type: 'integer', default: 100 })).toBe('z.int().default(100)')
            const runtime = z.int().default(100)
            expect(runtime.safeParse(1).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('integer: nullable + default(100) → nullable().default(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                default: 100,
                nullable: true,
              }),
            ).toBe('z.int().nullable().default(100)')
            const runtime = z.int().nullable().default(100)
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('integer: type=[integer, null] + default → nullable().default(100)', () => {
            expect(
              zodToOpenAPI({
                type: ['integer', 'null'],
                default: 100,
              }),
            ).toBe('z.int().nullable().default(100)')
            const runtime = z.int().nullable().default(100)
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
        })

        describe('type: integer, format: int32', () => {
          it.concurrent('int32: bare → z.int32()', () => {
            expect(zodToOpenAPI({ type: 'integer', format: 'int32' })).toBe('z.int32()')
            const runtime = z.int32()
            expect(runtime.safeParse(1).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('int32: nullable=true → nullable()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                nullable: true,
              }),
            ).toBe('z.int32().nullable()')
            const runtime = z.int32().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('int32: type=[integer, null] → nullable()', () => {
            expect(
              zodToOpenAPI({
                type: ['integer', 'null'],
                format: 'int32',
              }),
            ).toBe('z.int32().nullable()')
            const runtime = z.int32().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('int32: minimum=0 + exclusiveMinimum=true → positive()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                minimum: 0,
                exclusiveMinimum: true,
              }),
            ).toBe('z.int32().positive()')
            const runtime = z.int32().positive()
            expect(runtime.safeParse(1).success).toBe(true)
            const result = runtime.safeParse(0)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 0,
                  inclusive: false,
                  path: [],
                  message: 'Too small: expected number to be >0',
                },
              ])
            }
          })
          it.concurrent('int32: minimum=0 + exclusiveMinimum=false → nonnegative()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                minimum: 0,
                exclusiveMinimum: false,
              }),
            ).toBe('z.int32().nonnegative()')
            const runtime = z.int32().nonnegative()
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(-1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected number to be >=0',
                },
              ])
            }
          })
          it.concurrent('int32: maximum=0 + exclusiveMaximum=true → negative()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                maximum: 0,
                exclusiveMaximum: true,
              }),
            ).toBe('z.int32().negative()')
            const runtime = z.int32().negative()
            expect(runtime.safeParse(-1).success).toBe(true)
            const result = runtime.safeParse(0)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 0,
                  inclusive: false,
                  path: [],
                  message: 'Too big: expected number to be <0',
                },
              ])
            }
          })
          it.concurrent('int32: maximum=0 + exclusiveMaximum=false → nonpositive()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                maximum: 0,
                exclusiveMaximum: false,
              }),
            ).toBe('z.int32().nonpositive()')
            const runtime = z.int32().nonpositive()
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected number to be <=0',
                },
              ])
            }
          })
          it.concurrent('int32: minimum=100 → min(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                minimum: 100,
              }),
            ).toBe('z.int32().min(100)')
            const runtime = z.int32().min(100)
            expect(runtime.safeParse(200).success).toBe(true)
            const result = runtime.safeParse(99)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 100,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected number to be >=100',
                },
              ])
            }
          })
          it.concurrent('int32: minimum=0 (no exclusive) → min(0)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                minimum: 0,
              }),
            ).toBe('z.int32().min(0)')
            const runtime = z.int32().min(0)
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(-1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected number to be >=0',
                },
              ])
            }
          })
          it.concurrent('int32: minimum=100 + exclusiveMinimum=true → gt(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                minimum: 100,
                exclusiveMinimum: true,
              }),
            ).toBe('z.int32().gt(100)')
            const runtime = z.int32().gt(100)
            expect(runtime.safeParse(101).success).toBe(true)
            const result = runtime.safeParse(100)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_small',
                  minimum: 100,
                  inclusive: false,
                  path: [],
                  message: 'Too small: expected number to be >100',
                },
              ])
            }
          })
          it.concurrent('int32: maximum=100 → max(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                maximum: 100,
              }),
            ).toBe('z.int32().max(100)')
            const runtime = z.int32().max(100)
            expect(runtime.safeParse(50).success).toBe(true)
            const result = runtime.safeParse(101)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 100,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected number to be <=100',
                },
              ])
            }
          })
          it.concurrent('int32: maximum=0 (no exclusive) → max(0)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                maximum: 0,
              }),
            ).toBe('z.int32().max(0)')
            const runtime = z.int32().max(0)
            expect(runtime.safeParse(0).success).toBe(true)
            const result = runtime.safeParse(1)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 0,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected number to be <=0',
                },
              ])
            }
          })
          it.concurrent('int32: maximum=100 + exclusiveMaximum=true → lt(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                maximum: 100,
                exclusiveMaximum: true,
              }),
            ).toBe('z.int32().lt(100)')
            const runtime = z.int32().lt(100)
            expect(runtime.safeParse(99).success).toBe(true)
            const result = runtime.safeParse(100)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 100,
                  inclusive: false,
                  path: [],
                  message: 'Too big: expected number to be <100',
                },
              ])
            }
          })
          it.concurrent('int32: exclusiveMaximum=100 (numeric) → lt(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                exclusiveMaximum: 100,
              }),
            ).toBe('z.int32().lt(100)')
            const runtime = z.int32().lt(100)
            expect(runtime.safeParse(99).success).toBe(true)
            const result = runtime.safeParse(100)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'too_big',
                  maximum: 100,
                  inclusive: false,
                  path: [],
                  message: 'Too big: expected number to be <100',
                },
              ])
            }
          })
          it.concurrent('int32: multipleOf(2)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                multipleOf: 2,
              }),
            ).toBe('z.int32().multipleOf(2)')
            const runtime = z.int32().multipleOf(2)
            expect(runtime.safeParse(4).success).toBe(true)
            const result = runtime.safeParse(3)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'number',
                  code: 'not_multiple_of',
                  divisor: 2,
                  path: [],
                  message: 'Invalid number: must be a multiple of 2',
                },
              ])
            }
          })
          it.concurrent('int32: default(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                default: 100,
              }),
            ).toBe('z.int32().default(100)')
            const runtime = z.int32().default(100)
            expect(runtime.safeParse(1).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('int32: nullable + default(100) → nullable().default(100)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int32',
                default: 100,
                nullable: true,
              }),
            ).toBe('z.int32().nullable().default(100)')
            const runtime = z.int32().nullable().default(100)
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
          it.concurrent('int32: type=[integer, null] + default → nullable().default(100)', () => {
            expect(
              zodToOpenAPI({
                type: ['integer', 'null'],
                format: 'int32',
                default: 100,
              }),
            ).toBe('z.int32().nullable().default(100)')
            const runtime = z.int32().nullable().default(100)
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received string',
                },
              ])
            }
          })
        })

        describe('type: integer, format: int64', () => {
          it.concurrent('int64: bare → z.int64()', () => {
            expect(zodToOpenAPI({ type: 'integer', format: 'int64' })).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64()).openapi({type:"integer",format:"int64"})`,
            )
            const runtime = z.int64()
            expect(runtime.safeParse(1n).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'bigint',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected bigint, received string',
                },
              ])
            }
          })
          it.concurrent('int64: nullable=true → nullable()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                nullable: true,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64()).nullable().openapi({type:["integer","null"],format:"int64"})`,
            )
            const runtime = z.int64().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'bigint',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected bigint, received string',
                },
              ])
            }
          })
          it.concurrent('int64: type=[integer, null] → nullable()', () => {
            expect(
              zodToOpenAPI({
                type: ['integer', 'null'],
                format: 'int64',
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64()).nullable().openapi({type:["integer","null"],format:"int64"})`,
            )
            const runtime = z.int64().nullable()
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'bigint',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected bigint, received string',
                },
              ])
            }
          })
          it.concurrent('int64: minimum=0 + exclusiveMinimum=true → positive()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                minimum: 0,
                exclusiveMinimum: true,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().positive()).openapi({type:"integer",format:"int64",minimum:0,exclusiveMinimum:true})`,
            )
            const runtime = z.int64().positive()
            expect(runtime.safeParse(1n).success).toBe(true)
            const result = runtime.safeParse(0n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'too_small',
                  minimum: 0n,
                  inclusive: false,
                  path: [],
                  message: 'Too small: expected bigint to be >0',
                },
              ])
            }
          })
          it.concurrent('int64: minimum=0 + exclusiveMinimum=false → nonnegative()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                minimum: 0,
                exclusiveMinimum: false,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().nonnegative()).openapi({type:"integer",format:"int64",minimum:0,exclusiveMinimum:false})`,
            )
            const runtime = z.int64().nonnegative()
            expect(runtime.safeParse(0n).success).toBe(true)
            const result = runtime.safeParse(-1n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'too_small',
                  minimum: 0n,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected bigint to be >=0',
                },
              ])
            }
          })
          it.concurrent('int64: maximum=0 + exclusiveMaximum=true → negative()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                maximum: 0,
                exclusiveMaximum: true,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().negative()).openapi({type:"integer",format:"int64",maximum:0,exclusiveMaximum:true})`,
            )
            const runtime = z.int64().negative()
            expect(runtime.safeParse(-1n).success).toBe(true)
            const result = runtime.safeParse(0n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'too_big',
                  maximum: 0n,
                  inclusive: false,
                  path: [],
                  message: 'Too big: expected bigint to be <0',
                },
              ])
            }
          })
          it.concurrent('int64: maximum=0 + exclusiveMaximum=false → nonpositive()', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                maximum: 0,
                exclusiveMaximum: false,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().nonpositive()).openapi({type:"integer",format:"int64",maximum:0,exclusiveMaximum:false})`,
            )
            const runtime = z.int64().nonpositive()
            expect(runtime.safeParse(0n).success).toBe(true)
            const result = runtime.safeParse(1n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'too_big',
                  maximum: 0n,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected bigint to be <=0',
                },
              ])
            }
          })
          it.concurrent('int64: minimum=100 → min(100n)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                minimum: 100,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().min(100n)).openapi({type:"integer",format:"int64",minimum:100})`,
            )
            const runtime = z.int64().min(100n)
            expect(runtime.safeParse(200n).success).toBe(true)
            const result = runtime.safeParse(99n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'too_small',
                  minimum: 100n,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected bigint to be >=100',
                },
              ])
            }
          })
          it.concurrent('int64: minimum=0 (no exclusive) → min(0n)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                minimum: 0,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().min(0n)).openapi({type:"integer",format:"int64",minimum:0})`,
            )
            const runtime = z.int64().min(0n)
            expect(runtime.safeParse(0n).success).toBe(true)
            const result = runtime.safeParse(-1n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'too_small',
                  minimum: 0n,
                  inclusive: true,
                  path: [],
                  message: 'Too small: expected bigint to be >=0',
                },
              ])
            }
          })
          it.concurrent('int64: minimum=100 + exclusiveMinimum=true → gt(100n)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                minimum: 100,
                exclusiveMinimum: true,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().gt(100n)).openapi({type:"integer",format:"int64",minimum:100,exclusiveMinimum:true})`,
            )
            const runtime = z.int64().gt(100n)
            expect(runtime.safeParse(101n).success).toBe(true)
            const result = runtime.safeParse(100n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'too_small',
                  minimum: 100n,
                  inclusive: false,
                  path: [],
                  message: 'Too small: expected bigint to be >100',
                },
              ])
            }
          })
          it.concurrent('int64: maximum=100 → max(100n)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                maximum: 100,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().max(100n)).openapi({type:"integer",format:"int64",maximum:100})`,
            )
            const runtime = z.int64().max(100n)
            expect(runtime.safeParse(50n).success).toBe(true)
            const result = runtime.safeParse(101n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'too_big',
                  maximum: 100n,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected bigint to be <=100',
                },
              ])
            }
          })
          it.concurrent('int64: maximum=0 (no exclusive) → max(0n)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                maximum: 0,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().max(0n)).openapi({type:"integer",format:"int64",maximum:0})`,
            )
            const runtime = z.int64().max(0n)
            expect(runtime.safeParse(0n).success).toBe(true)
            const result = runtime.safeParse(1n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'too_big',
                  maximum: 0n,
                  inclusive: true,
                  path: [],
                  message: 'Too big: expected bigint to be <=0',
                },
              ])
            }
          })
          it.concurrent('int64: maximum=100 + exclusiveMaximum=true → lt(100n)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                maximum: 100,
                exclusiveMaximum: true,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().lt(100n)).openapi({type:"integer",format:"int64",maximum:100,exclusiveMaximum:true})`,
            )
            const runtime = z.int64().lt(100n)
            expect(runtime.safeParse(99n).success).toBe(true)
            const result = runtime.safeParse(100n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'too_big',
                  maximum: 100n,
                  inclusive: false,
                  path: [],
                  message: 'Too big: expected bigint to be <100',
                },
              ])
            }
          })
          it.concurrent('int64: exclusiveMaximum=100 (numeric) → lt(100n)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                exclusiveMaximum: 100,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().lt(100n)).openapi({type:"integer",format:"int64",exclusiveMaximum:100})`,
            )
            const runtime = z.int64().lt(100n)
            expect(runtime.safeParse(99n).success).toBe(true)
            const result = runtime.safeParse(100n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'too_big',
                  maximum: 100n,
                  inclusive: false,
                  path: [],
                  message: 'Too big: expected bigint to be <100',
                },
              ])
            }
          })
          it.concurrent('int64: multipleOf(2n)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                multipleOf: 2,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().multipleOf(2n)).openapi({type:"integer",format:"int64",multipleOf:2})`,
            )
            const runtime = z.int64().multipleOf(2n)
            expect(runtime.safeParse(4n).success).toBe(true)
            const result = runtime.safeParse(3n)
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  origin: 'bigint',
                  code: 'not_multiple_of',
                  divisor: 2n,
                  path: [],
                  message: 'Invalid number: must be a multiple of 2',
                },
              ])
            }
          })
          it.concurrent('int64: default(100n)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                default: 100,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64()).default(100n).openapi({type:"integer",format:"int64",default:100})`,
            )
            const runtime = z.int64().default(100n)
            expect(runtime.safeParse(1n).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'bigint',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected bigint, received string',
                },
              ])
            }
          })
          it.concurrent('int64: nullable + default → nullable().default(100n)', () => {
            expect(
              zodToOpenAPI({
                type: 'integer',
                format: 'int64',
                default: 100,
                nullable: true,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64()).nullable().default(100n).openapi({type:["integer","null"],format:"int64",default:100})`,
            )
            const runtime = z.int64().nullable().default(100n)
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'bigint',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected bigint, received string',
                },
              ])
            }
          })
          it.concurrent('int64: type=[integer, null] + default → nullable().default(100n)', () => {
            expect(
              zodToOpenAPI({
                type: ['integer', 'null'],
                format: 'int64',
                default: 100,
              }),
            ).toBe(
              String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64()).nullable().default(100n).openapi({type:["integer","null"],format:"int64",default:100})`,
            )
            const runtime = z.int64().nullable().default(100n)
            expect(runtime.safeParse(null).success).toBe(true)
            const result = runtime.safeParse('a')
            expect(result.success).toBe(false)
            if (!result.success) {
              expect(result.error.issues).toStrictEqual([
                {
                  expected: 'bigint',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected bigint, received string',
                },
              ])
            }
          })
        })
      })

      // boolean
      describe('boolean', () => {
        // ----- Core boolean cases -----
        it.concurrent('boolean: bare type → z.boolean()', () => {
          expect(zodToOpenAPI({ type: 'boolean' })).toBe('z.boolean()')
          const runtime = z.boolean()
          expect(runtime.safeParse(true).success).toBe(true)
          const result = runtime.safeParse('a')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'boolean',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected boolean, received string',
              },
            ])
          }
        })
        it.concurrent('boolean: type=[boolean] + nullable=true → nullable()', () => {
          expect(zodToOpenAPI({ type: ['boolean'], nullable: true })).toBe('z.boolean().nullable()')
          const runtime = z.boolean().nullable()
          expect(runtime.safeParse(null).success).toBe(true)
          const result = runtime.safeParse('a')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'boolean',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected boolean, received string',
              },
            ])
          }
        })
        it.concurrent('boolean: type=[boolean, null] → nullable()', () => {
          expect(zodToOpenAPI({ type: ['boolean', 'null'] })).toBe('z.boolean().nullable()')
          const runtime = z.boolean().nullable()
          expect(runtime.safeParse(null).success).toBe(true)
          const result = runtime.safeParse('a')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'boolean',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected boolean, received string',
              },
            ])
          }
        })
        it.concurrent('boolean: default(true)', () => {
          expect(zodToOpenAPI({ type: 'boolean', default: true })).toBe('z.boolean().default(true)')
          const runtime = z.boolean().default(true)
          expect(runtime.safeParse(false).success).toBe(true)
          const result = runtime.safeParse('a')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'boolean',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected boolean, received string',
              },
            ])
          }
        })
        it.concurrent('boolean: nullable + default(true) → nullable().default(true)', () => {
          expect(
            zodToOpenAPI({
              type: 'boolean',
              default: true,
              nullable: true,
            }),
          ).toBe('z.boolean().nullable().default(true)')
          const runtime = z.boolean().nullable().default(true)
          expect(runtime.safeParse(null).success).toBe(true)
          const result = runtime.safeParse('a')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'boolean',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected boolean, received string',
              },
            ])
          }
        })
        it.concurrent('boolean: type=[boolean, null] + default(true) → nullable().default(true)', () => {
          expect(
            zodToOpenAPI({
              type: ['boolean', 'null'],
              default: true,
            }),
          ).toBe('z.boolean().nullable().default(true)')
          const runtime = z.boolean().nullable().default(true)
          expect(runtime.safeParse(null).success).toBe(true)
          const result = runtime.safeParse('a')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'boolean',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected boolean, received string',
              },
            ])
          }
        })
        // ----- P1: x-coerce -----
        it.concurrent('boolean: x-coerce=true → z.coerce.boolean()', () => {
          expect(zodToOpenAPI({ type: 'boolean', 'x-coerce': true })).toBe('z.coerce.boolean()')
          const runtime = z.coerce.boolean()
          expect(runtime.safeParse('anything-truthy').success).toBe(true)
          expect(runtime.safeParse('').success).toBe(true) // coerce: empty string coerces to false
        })
        it.concurrent('boolean: x-coerce=true + x-error-message → coerce.boolean({error:...})', () => {
          const generated = zodToOpenAPI({
            type: 'boolean',
            'x-coerce': true,
            'x-error-message': 'ブール必須',
          })
          expect(generated).toBe('z.coerce.boolean({error:"ブール必須"})')
        })
        it.concurrent('boolean: x-coerce=true + x-required-message → requiredMessage dropped (unreachable)', () => {
          const generated = zodToOpenAPI({
            type: 'boolean',
            'x-coerce': true,
            'x-required-message': '必須です',
            'x-error-message': 'ブール必須',
          })
          expect(generated).toBe('z.coerce.boolean({error:"ブール必須"})')
        })
        it.concurrent('boolean: x-coerce=true + x-required-message only → requiredMessage dropped', () => {
          const generated = zodToOpenAPI({
            type: 'boolean',
            'x-coerce': true,
            'x-required-message': '必須です',
          })
          expect(generated).toBe('z.coerce.boolean()')
        })
        it.concurrent('regression: z.coerce.boolean(undefined) succeeds with false — all error handlers unreachable', () => {
          const Schema = z.coerce.boolean({ error: 'ブール必須' })
          const result = Schema.safeParse(undefined)
          expect(result.success).toBe(true)
          if (result.success) {
            expect(result.data).toBe(false)
          }
        })
        // ----- P2: x-catch / x-prefault / x-readonly -----
        it.concurrent('boolean: x-catch=false → z.boolean().catch(false)', () => {
          expect(zodToOpenAPI({ type: 'boolean', 'x-catch': false })).toBe(
            'z.boolean().catch(false).openapi({"type":"boolean"})',
          )
          const runtime = z.boolean().catch(false)
          expect(runtime.safeParse(true)).toStrictEqual({ success: true, data: true })
          // The type error is answered with false, as `.catch(false)` would.
          expect(runtime.safeParse('a')).toStrictEqual({ success: true, data: false })
        })
        it.concurrent('boolean: x-prefault=true → z.boolean().prefault(true)', () => {
          expect(zodToOpenAPI({ type: 'boolean', 'x-prefault': true })).toBe(
            'z.boolean().prefault(true)',
          )
          const runtime = z.boolean().prefault(true)
          expect(runtime.safeParse(undefined).success).toBe(true)
          const result = runtime.safeParse('a')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'boolean',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected boolean, received string',
              },
            ])
          }
        })
        it.concurrent('boolean: default(true) + x-catch=false', () => {
          expect(
            zodToOpenAPI({
              type: 'boolean',
              default: true,
              'x-catch': false,
            }),
          ).toBe(
            'z.boolean().default(true).catch(false).openapi({"type":"boolean","default":true})',
          )
          const runtime = z.boolean().default(true).catch(false)
          expect(runtime.safeParse(undefined)).toStrictEqual({ success: true, data: true })
          expect(runtime.safeParse('a')).toStrictEqual({ success: true, data: false })
        })
        it.concurrent('boolean: x-prefault=true + x-catch=false', () => {
          expect(
            zodToOpenAPI({
              type: 'boolean',
              'x-prefault': true,
              'x-catch': false,
            }),
          ).toBe('z.boolean().prefault(true).catch(false).openapi({"type":"boolean"})')
          const runtime = z.boolean().prefault(true).catch(false)
          expect(runtime.safeParse(undefined)).toStrictEqual({ success: true, data: true })
          expect(runtime.safeParse('a')).toStrictEqual({ success: true, data: false })
        })
        it.concurrent('object: x-readonly=true → z.looseObject({}).readonly()', () => {
          expect(zodToOpenAPI({ type: 'object', 'x-readonly': true })).toBe(
            'z.looseObject({}).readonly()',
          )
          const runtime = z.looseObject({}).readonly()
          expect(runtime.safeParse({}).success).toBe(true)
        })
        it.concurrent('string: x-readonly=true → z.string().readonly()', () => {
          expect(zodToOpenAPI({ type: 'string', 'x-readonly': true })).toBe('z.string().readonly()')
          const runtime = z.string().readonly()
          expect(runtime.safeParse('ok').success).toBe(true)
        })
        it.concurrent('string: x-catch + x-brand → catch("fallback").brand<"Tag">()', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            'x-catch': 'fallback',
            'x-brand': 'Tag',
          })
          expect(generated).toBe(
            'z.string().catch("fallback").brand<"Tag">().openapi({"type":"string"})',
          )
          // runtime skipped: TS-only brand<> generic carries no runtime constraint
        })
        // ----- x-refine / x-superRefine -----
        it.concurrent('string: x-refine (single) → .refine(fn,{message})', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              'x-refine': '.refine((val) => val.length > 5,{message:"Too short"})',
            }),
          ).toBe('z.string().refine((val) => val.length > 5,{message:"Too short"})')
          const runtime = z.string().refine((val) => val.length > 5, { message: 'Too short' })
          expect(runtime.safeParse('hello!').success).toBe(true)
          const result = runtime.safeParse('hi')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Too short' },
            ])
          }
        })
        it.concurrent('string: x-refine (multiple) → chained refines', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              'x-refine':
                '.refine((val) => val.length > 5,{message:"Too short"}).refine((val) => /^[a-z]/.test(val),{message:"Lowercase start"})',
            }),
          ).toBe(
            'z.string().refine((val) => val.length > 5,{message:"Too short"}).refine((val) => /^[a-z]/.test(val),{message:"Lowercase start"})',
          )
          const runtime = z
            .string()
            .refine((val) => val.length > 5, { message: 'Too short' })
            .refine((val) => /^[a-z]/u.test(val), { message: 'Lowercase start' })
          expect(runtime.safeParse('hello!').success).toBe(true)
          const result = runtime.safeParse('Hello!')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [], message: 'Lowercase start' },
            ])
          }
        })
        it.concurrent('string: x-refine with path → .refine(fn,{path:[...]})', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              'x-refine': '.refine((val) => val !== "x",{path:["name"]})',
            }),
          ).toBe('z.string().refine((val) => val !== "x",{path:["name"]})')
          const runtime = z.string().refine((val) => val !== 'x', { path: ['name'] })
          expect(runtime.safeParse('y').success).toBe(true)
          const result = runtime.safeParse('x')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: ['name'], message: 'Invalid input' },
            ])
          }
        })
        it.concurrent('string: x-superRefine → .superRefine(fn)', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              'x-superRefine':
                ".superRefine((val, ctx) => { if (val === 'forbidden') ctx.addIssue({code:'custom',message:'no'}) })",
            }),
          ).toBe(
            "z.string().superRefine((val, ctx) => { if (val === 'forbidden') ctx.addIssue({code:'custom',message:'no'}) })",
          )
          const runtime = z.string().superRefine((val, ctx) => {
            if (val === 'forbidden') ctx.addIssue({ code: 'custom', message: 'no' })
          })
          expect(runtime.safeParse('ok').success).toBe(true)
          const result = runtime.safeParse('forbidden')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([{ code: 'custom', message: 'no', path: [] }])
          }
        })
        // ----- x-codec for date -----
        it.concurrent('string: format=date-time + x-codec=date → z.codec(...)', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            format: 'date-time',
            'x-codec': 'date',
          })
          expect(generated).toBe('date')
          // runtime skipped: z.codec API surface evaluation can be brittle
        })
        // x-codec on non-string types: applied verbatim via wrap chain.
        // Author owns correctness of the codec expression; the generator
        // does not introspect or validate the replacement.
        it.concurrent('number: x-codec replaces base verbatim', () => {
          expect(
            zodToOpenAPI({
              type: 'number',
              'x-codec':
                'z.codec(z.number(),z.date(),{decode:(n)=>new Date(n),encode:(d)=>d.getTime()})',
            }),
          ).toBe('z.codec(z.number(),z.date(),{decode:(n)=>new Date(n),encode:(d)=>d.getTime()})')
        })
        it.concurrent('object: x-codec replaces base verbatim', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              properties: { a: { type: 'string' } },
              'x-codec': 'CUSTOM_CODEC',
            }),
          ).toBe('CUSTOM_CODEC.openapi({"required":[]})')
        })
        it.concurrent('array: x-codec replaces base verbatim', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              'x-codec': 'CUSTOM_CODEC',
            }),
          ).toBe('CUSTOM_CODEC')
        })
        it.concurrent('precedence: x-preprocess wins over x-codec', () => {
          expect(
            zodToOpenAPI({
              type: 'number',
              'x-preprocess': 'PRE',
              'x-codec': 'CODEC',
            }),
          ).toBe('PRE')
        })
        it.concurrent('precedence: x-pipe wins over x-codec', () => {
          expect(
            zodToOpenAPI({
              type: 'number',
              'x-pipe': 'PIPE',
              'x-codec': 'CODEC',
            }),
          ).toBe('PIPE')
        })
        // ----- x-required-message / x-error-message / x-const-message -----
        it.concurrent('string: x-error-message + x-required-message → custom error fn', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              'x-error-message': 'Type wrong',
              'x-required-message': 'Required',
            }),
          ).toBe('z.string({error:(issue)=>issue.input===undefined?"Required":"Type wrong"})')
          const runtime = z.string({
            error: (issue) => (issue.input === undefined ? 'Required' : 'Type wrong'),
          })
          expect(runtime.safeParse('ok').success).toBe(true)
          const result = runtime.safeParse(undefined)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: [],
                message: 'Required',
              },
            ])
          }
        })
        it.concurrent('string: x-required-message only → custom error fn (undefined fallback)', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              'x-required-message': 'Required only',
            }),
          ).toBe('z.string({error:(issue)=>issue.input===undefined?"Required only":undefined})')
          const runtime = z.string({
            error: (issue) => (issue.input === undefined ? 'Required only' : undefined),
          })
          expect(runtime.safeParse('ok').success).toBe(true)
          const result = runtime.safeParse(undefined)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: [],
                message: 'Required only',
              },
            ])
          }
        })
        it.concurrent('const + x-const-message → z.literal(...,{error})', () => {
          expect(
            zodToOpenAPI({
              const: 'fixed',
              'x-const-message': 'Must be "fixed"',
            }),
          ).toBe('z.literal("fixed",{error:"Must be \\"fixed\\""})')
          const runtime = z.literal('fixed', { error: 'Must be "fixed"' })
          expect(runtime.safeParse('fixed').success).toBe(true)
          const result = runtime.safeParse('other')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'invalid_value',
                values: ['fixed'],
                path: [],
                message: 'Must be "fixed"',
              },
            ])
          }
        })
        // ----- contains -----
        it.concurrent('array: contains const=5 (default minContains=1)', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'number' },
              contains: { const: 5 },
            }),
          ).toBe(
            'z.array(z.number()).superRefine((arr,ctx)=>{const Schema=z.literal(5);const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<1){ctx.addIssue({code:"custom"})}})',
          )
          const runtime = z.array(z.number()).superRefine((arr, ctx) => {
            const Schema = z.literal(5)
            const matched = arr.filter((i) => Schema.safeParse(i).success).length
            if (matched < 1) {
              ctx.addIssue({
                code: 'custom',
                message: `Expected at least 1 item matching contains schema, got ${matched}`,
              })
            }
          })
          expect(runtime.safeParse([1, 5]).success).toBe(true)
          const result = runtime.safeParse([1, 2])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'custom',
                message: 'Expected at least 1 item matching contains schema, got 0',
                path: [],
              },
            ])
          }
        })
        it.concurrent('array: contains + minContains + maxContains → 2 refines', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'number' },
              contains: { type: 'number', minimum: 0 },
              minContains: 2,
              maxContains: 5,
            }),
          ).toBe(
            'z.array(z.number()).superRefine((arr,ctx)=>{const Schema=z.number().min(0);const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<2){ctx.addIssue({code:"custom"})};if(matched>5){ctx.addIssue({code:"custom"})}})',
          )
          const runtime = z.array(z.number()).superRefine((arr, ctx) => {
            const Schema = z.number().min(0)
            const matched = arr.filter((i) => Schema.safeParse(i).success).length
            if (matched < 2) {
              ctx.addIssue({
                code: 'custom',
                message: `Expected at least 2 matching items, got ${matched}`,
              })
            }
            if (matched > 5) {
              ctx.addIssue({
                code: 'custom',
                message: `Expected at most 5 matching items, got ${matched}`,
              })
            }
          })
          expect(runtime.safeParse([0, 1]).success).toBe(true)
          const result = runtime.safeParse([0])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'custom',
                message: 'Expected at least 2 matching items, got 1',
                path: [],
              },
            ])
          }
        })
        // ----- x-uniqueItems-message -----
        it.concurrent('array: uniqueItems + x-uniqueItems-message → superRefine with custom message', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              uniqueItems: true,
              'x-uniqueItems-message': 'Duplicates not allowed',
            }),
          ).toBe(
            'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"Duplicates not allowed"});else seen.set(key,i)}})',
          )
          const runtime = z.array(z.string()).superRefine((items, ctx) => {
            const seen = new Map()
            for (const [i, val] of items.entries()) {
              const key = JSON.stringify(val)
              if (seen.has(key)) {
                ctx.addIssue({ code: 'custom', path: [i], message: 'Duplicates not allowed' })
              } else seen.set(key, i)
            }
          })
          expect(runtime.safeParse(['a', 'b']).success).toBe(true)
          const result = runtime.safeParse(['a', 'a'])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [1], message: 'Duplicates not allowed' },
            ])
          }
        })
        // ----- x-additionalProperties-message -----
        it.concurrent('object: additionalProperties=false + x-additionalProperties-message → strictObject(...,error)', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            properties: { name: { type: 'string' } },
            required: ['name'],
            additionalProperties: false,
            'x-additionalProperties-message': 'No extra fields',
          })
          expect(generated).toBe(
            `z.strictObject({name:z.string()},{error:(issue)=>issue.code==='unrecognized_keys'?"No extra fields":undefined}).openapi({"required":["name"]})`,
          )
          // runtime skipped: generated code uses .openapi(...) (zod-openapi extension), not callable on bare z
        })
        // ----- $comment is silently dropped -----
        it.concurrent('string: $comment is silently dropped → z.string()', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              $comment: 'this is a note',
            }),
          ).toBe('z.string()')
          const runtime = z.string()
          expect(runtime.safeParse('ok').success).toBe(true)
          const result = runtime.safeParse(1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected string, received number',
              },
            ])
          }
        })
        // ----- contentEncoding base64 (no media type) -----
        it.concurrent('string: contentEncoding=base64 → z.base64().transform(...)', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            contentEncoding: 'base64',
          })
          expect(generated).toBe(
            'z.base64().transform((val)=>new TextDecoder().decode(Uint8Array.from(atob(val),(char)=>char.charCodeAt(0))))',
          )
          // runtime skipped: codegen-only verification (runtime decode covered elsewhere)
        })
        // ----- base64 + JSON + contentSchema -----
        it.concurrent('string: base64 + application/json + contentSchema(object) → transform + pipe(z.object(...))', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            contentEncoding: 'base64',
            contentMediaType: 'application/json',
            contentSchema: {
              type: 'object',
              properties: { name: { type: 'string' } },
              required: ['name'],
            },
          })
          expect(generated).toBe(
            'z.base64().transform((val,ctx)=>{try{return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(val),(char)=>char.charCodeAt(0))))}catch(err){ctx.addIssue({code:"custom",params:{cause:err instanceof Error?err.message:String(err)}});return z.NEVER}}).pipe(z.object({name:z.string()}).openapi({"required":["name"]}))',
          )
          // runtime skipped: codegen-only verification (runtime decode covered elsewhere)
        })
        // ----- dependentSchemas -----
        it.concurrent('object: dependentSchemas → superRefine with closure-captured Schema', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            properties: { creditCard: { type: 'string' } },
            dependentSchemas: {
              creditCard: {
                properties: { billingAddress: { type: 'string' } },
                required: ['billingAddress'],
              },
            },
          })
          expect(generated).toBe(
            'z.object({creditCard:z.string().exactOptional()}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"creditCard")){return}const Schema=z.object({billingAddress:z.string()}).openapi({"required":["billingAddress"]});const result=Schema.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}).openapi({"required":[]})',
          )
          // runtime skipped: generated code uses .openapi(...) (zod-openapi extension), not callable on bare z
        })
        // ----- if / then / else -----
        /* eslint-disable unicorn/no-thenable -- testing JSON Schema then keyword */
        // biome-ignore lint/suspicious/noThenProperty: testing JSON Schema if-then-else
        it.concurrent('object: if/then/else (type-less) → superRefine closure-captured branch', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            if: { properties: { type: { const: 'premium' } }, required: ['type'] },
            then: { required: ['premiumFeature'] },
            else: { required: ['basicFeature'] },
          })
          expect(generated).toBe(
            'z.looseObject({}).superRefine((o,ctx)=>{const If=z.object({type:z.literal("premium")}).openapi({"required":["type"]});const ifOk=If.safeParse(o).success;const Branch=ifOk?z.unknown().superRefine((val,ctx)=>{if(typeof val===\'object\'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"premiumFeature")){ctx.addIssue({code:\'custom\'})}}}).openapi({"required":["premiumFeature"]}):z.unknown().superRefine((val,ctx)=>{if(typeof val===\'object\'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"basicFeature")){ctx.addIssue({code:\'custom\'})}}}).openapi({"required":["basicFeature"]});if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}})',
          )
          // runtime skipped: generated code uses .openapi(...) (zod-openapi extension), not callable on bare z
        })
        /* eslint-enable unicorn/no-thenable */
        // ----- unevaluatedProperties: false -----
        it.concurrent('object: unevaluatedProperties=false → looseObject + superRefine annotation track', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              properties: { name: { type: 'string' } },
              unevaluatedProperties: false,
            }),
          ).toBe(
            'z.looseObject({name:z.string().exactOptional()}).superRefine((o,ctx)=>{const e=new Set();for(const k of ["name"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}}).openapi({"required":[]})',
          )
          const runtime = z
            .looseObject({ name: z.string().exactOptional() })
            .superRefine((o, ctx) => {
              const e = new Set()
              for (const k of ['name']) e.add(k)
              for (const k of Object.keys(o)) {
                if (!e.has(k)) {
                  ctx.addIssue({ code: 'custom', path: [k], message: `Unknown property: ${k}` })
                }
              }
            })
          expect(runtime.safeParse({ name: 'foo' }).success).toBe(true)
          const result = runtime.safeParse({ name: 'foo', extra: 1 })
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: ['extra'], message: 'Unknown property: extra' },
            ])
          }
        })
        // ----- unevaluatedProperties: false + additionalProperties (#462) -----
        // JSON Schema 2020-12: a key `additionalProperties` applies to counts as
        // evaluated, so `unevaluatedProperties` at the same level must not reject it.
        it.concurrent('object: additionalProperties schema + unevaluatedProperties=false → additional keys evaluated', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              additionalProperties: { type: 'string' },
              unevaluatedProperties: false,
            }),
          ).toBe(
            'z.record(z.string(),z.string()).superRefine((o,ctx)=>{const e=new Set();for(const k of Object.keys(o)){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})',
          )
          const runtime = z.record(z.string(), z.string()).superRefine((o, ctx) => {
            const e = new Set<string>()
            for (const k of Object.keys(o)) e.add(k)
            for (const k of Object.keys(o)) {
              if (!e.has(k)) {
                ctx.addIssue({ code: 'custom', path: [k], message: `Unknown property: ${k}` })
              }
            }
          })
          expect(runtime.safeParse({ b: 'x' }).success).toBe(true)
          const result = runtime.safeParse({ b: 1 })
          expect(result.success).toBe(false)
        })
        it.concurrent('object: additionalProperties: true + unevaluatedProperties=false → additional keys evaluated', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              additionalProperties: true,
              unevaluatedProperties: false,
            }),
          ).toBe(
            'z.looseObject({}).superRefine((o,ctx)=>{const e=new Set();for(const k of Object.keys(o)){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})',
          )
          const runtime = z.looseObject({}).superRefine((o, ctx) => {
            const e = new Set<string>()
            for (const k of Object.keys(o)) e.add(k)
            for (const k of Object.keys(o)) {
              if (!e.has(k)) {
                ctx.addIssue({ code: 'custom', path: [k], message: `Unknown property: ${k}` })
              }
            }
          })
          expect(runtime.safeParse({ b: 'x' }).success).toBe(true)
        })
        it.concurrent('object: properties + additionalProperties schema + unevaluatedProperties=false → declared and additional keys evaluated', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              properties: { a: { type: 'string' } },
              additionalProperties: { type: 'string' },
              unevaluatedProperties: false,
            }),
          ).toBe(
            'z.object({a:z.string().exactOptional()}).catchall(z.string()).superRefine((o,ctx)=>{const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of Object.keys(o)){if(!["a"].includes(k)){e.add(k)}};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}}).openapi({"required":[]})',
          )
          const runtime = z
            .object({ a: z.string().exactOptional() })
            .catchall(z.string())
            .superRefine((o, ctx) => {
              const e = new Set<string>()
              for (const k of ['a']) e.add(k)
              for (const k of Object.keys(o)) {
                if (!['a'].includes(k)) e.add(k)
              }
              for (const k of Object.keys(o)) {
                if (!e.has(k)) {
                  ctx.addIssue({ code: 'custom', path: [k], message: `Unknown property: ${k}` })
                }
              }
            })
          expect(runtime.safeParse({ a: 'x' }).success).toBe(true)
          expect(runtime.safeParse({ b: 'x' }).success).toBe(true)
          expect(runtime.safeParse({ b: 1 }).success).toBe(false)
        })
        it.concurrent('no-type: additionalProperties schema + unevaluatedProperties=false → additional keys evaluated', () => {
          expect(
            zodToOpenAPI({
              additionalProperties: { type: 'string' },
              unevaluatedProperties: false,
            }),
          ).toBe(
            'z.record(z.string(),z.string()).superRefine((o,ctx)=>{const e=new Set();for(const k of Object.keys(o)){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})',
          )
        })
        it.concurrent('object: additionalProperties: false + unevaluatedProperties=false → additional keys still rejected', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              additionalProperties: false,
              unevaluatedProperties: false,
            }),
          ).toBe(
            'z.strictObject({}).superRefine((o,ctx)=>{const e=new Set();for(const k of Object.keys(o)){if(!e.has(k)){ctx.addIssue({code:"custom",path:[k]})}}})',
          )
          expect(z.strictObject({}).safeParse({ b: 'x' }).success).toBe(false)
        })
        it.concurrent('typeless: additionalProperties schema + unevaluatedProperties=false beside minLength → no unevaluated rejection', () => {
          expect(
            zodToOpenAPI({
              additionalProperties: { type: 'string' },
              unevaluatedProperties: false,
              minLength: 1,
            }),
          ).toBe(
            `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){{const Schema=z.string();for(const k of Object.keys(val)){if(!Schema.safeParse(Reflect.get(val,k)).success){ctx.addIssue({code:'custom'})}}}};if(typeof val==='string'){if([...val].length<1){ctx.addIssue({code:'custom'})}}})`,
          )
          const runtime = z.unknown().superRefine((val, ctx) => {
            if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
              const Schema = z.string()
              for (const k of Object.keys(val)) {
                if (!Schema.safeParse(Reflect.get(val, k)).success) {
                  ctx.addIssue({ code: 'custom' })
                }
              }
            }
            if (typeof val === 'string') {
              // oxlint-disable-next-line typescript/no-misused-spread -- code-point iteration is intended
              if ([...val].length === 0) {
                ctx.addIssue({ code: 'custom' })
              }
            }
          })
          expect(runtime.safeParse({ b: 'x' }).success).toBe(true)
          expect(runtime.safeParse({ b: 1 }).success).toBe(false)
        })
        // ----- unevaluatedItems: false -----
        it.concurrent('array: prefixItems + unevaluatedItems=false → length-cap inside superRefine', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              prefixItems: [{ type: 'string' }, { type: 'number' }],
              unevaluatedItems: false,
            }),
          ).toBe(
            'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]})}}};for(let i=Prefix.length;i<arr.length;i++){ctx.addIssue({code:"custom",path:[i]})}})',
          )
          const runtime = z.array(z.unknown()).superRefine((arr, ctx) => {
            const Prefix = [z.string(), z.number()]
            for (const [i, Schema] of Prefix.slice(0, arr.length).entries()) {
              const valid = Schema.safeParse(arr[i])
              if (!valid.success) {
                for (const issue of valid.error.issues) {
                  ctx.addIssue({ ...issue, path: [i, ...issue.path] })
                }
              }
            }
            for (let i = Prefix.length; i < arr.length; i += 1) {
              ctx.addIssue({
                code: 'custom',
                path: [i],
                message: `Unevaluated item at index ${i}`,
              })
            }
          })
          expect(runtime.safeParse(['a', 1]).success).toBe(true)
          const result = runtime.safeParse(['a', 1, 'extra'])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [2], message: 'Unevaluated item at index 2' },
            ])
          }
        })
        // ----- JSON Schema 2020-12 Core meta keywords: not Schema Object keys (#393) -----
        it.concurrent('string: $schema is not written into the metadata', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              $schema: 'https://json-schema.org/draft/2020-12/schema',
            }),
          ).toBe('z.string()')
        })
        it.concurrent('string: $id, $anchor, $dynamicAnchor, $dynamicRef, $vocabulary are not written', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              $id: 'https://example.com/schemas/user.json',
              $anchor: 'user-name',
              $dynamicAnchor: 'meta',
              $dynamicRef: '#meta',
              $vocabulary: { 'https://json-schema.org/draft/2020-12/vocab/core': true },
              description: 'kept',
            }),
          ).toBe('z.string().openapi({"description":"kept"})')
        })
        // #393: ajv-errors' `errorMessage` is no Schema Object key either
        it.concurrent('string: errorMessage is not written into the metadata', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string', errorMessage: 'by items should be target or branch' },
            } as unknown as Schema),
          ).toBe('z.array(z.string())')
        })
        // ----- $defs: schemas, not metadata (#377) -----
        it.concurrent('string: $defs is not written into the metadata', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            $defs: { Email: { type: 'string', format: 'email' } },
          })
          expect(generated).toBe('z.string()')
          // runtime skipped: generated code uses .openapi(...) (zod-openapi extension), not callable on bare z
        })
        // ----- contentEncoding additional variants -----
        it.concurrent('string: contentEncoding=base64url → z.base64url().transform(...)', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            contentEncoding: 'base64url',
          })
          expect(generated).toBe(
            'z.base64url().transform((val)=>new TextDecoder().decode(Uint8Array.from(atob(val.replace(/-/g,"+").replace(/_/g,"/")),(char)=>char.charCodeAt(0))))',
          )
          // runtime skipped: codegen-only verification (runtime decode covered elsewhere)
        })
        it.concurrent('string: contentEncoding=binary → z.string() (no decode)', () => {
          expect(zodToOpenAPI({ type: 'string', contentEncoding: 'binary' })).toBe('z.string()')
          const runtime = z.string()
          expect(runtime.safeParse('anything').success).toBe(true)
          const result = runtime.safeParse(1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected string, received number',
              },
            ])
          }
        })
        it.concurrent('string: contentEncoding=7bit → z.string() (no decode)', () => {
          expect(zodToOpenAPI({ type: 'string', contentEncoding: '7bit' })).toBe('z.string()')
          const runtime = z.string()
          expect(runtime.safeParse('anything').success).toBe(true)
          const result = runtime.safeParse(1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected string, received number',
              },
            ])
          }
        })
        // ----- contentSchema with $ref -----
        it.concurrent('string: base64 + application/json + contentSchema($ref) → transform + pipe(InnerSchema)', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            contentEncoding: 'base64',
            contentMediaType: 'application/json',
            contentSchema: { $ref: '#/components/schemas/Inner' },
          })
          expect(generated).toBe(
            'z.base64().transform((val,ctx)=>{try{return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(val),(char)=>char.charCodeAt(0))))}catch(err){ctx.addIssue({code:"custom",params:{cause:err instanceof Error?err.message:String(err)}});return z.NEVER}}).pipe(InnerSchema)',
          )
          // runtime skipped: InnerSchema is external identifier
        })
        // ----- unevaluatedProperties: Schema form -----
        it.concurrent('object: unevaluatedProperties: schema → looseObject + per-prop refine', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              properties: { name: { type: 'string' } },
              unevaluatedProperties: { type: 'string' },
            }),
          ).toBe(
            'z.looseObject({name:z.string().exactOptional()}).superRefine((o,ctx)=>{const e=new Set();for(const k of ["name"]){e.add(k)};const Schema=z.string();for(const [k,val] of Object.entries(o)){if(e.has(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]})}}}}).openapi({"required":[]})',
          )
          const runtime = z
            .looseObject({ name: z.string().exactOptional() })
            .superRefine((o, ctx) => {
              const e = new Set()
              for (const k of ['name']) e.add(k)
              const Schema = z.string()
              for (const [k, val] of Object.entries(o)) {
                if (e.has(k)) continue
                const valid = Schema.safeParse(val)
                if (!valid.success) {
                  for (const issue of valid.error.issues) {
                    ctx.addIssue({ ...issue, path: [k, ...issue.path] })
                  }
                }
              }
            })
          expect(runtime.safeParse({ name: 'foo', extra: 'str' }).success).toBe(true)
          const result = runtime.safeParse({ name: 'foo', extra: 1 })
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: ['extra'],
                message: 'Invalid input: expected string, received number',
              },
            ])
          }
        })
        // ----- unevaluatedItems: Schema form -----
        it.concurrent('array: prefixItems + unevaluatedItems: schema → superRefine rest validation', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              prefixItems: [{ type: 'string' }],
              unevaluatedItems: { type: 'number' },
            }),
          ).toBe(
            'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]})}}};const Rest=z.number();for(const [i,val] of arr.slice(Prefix.length).entries()){const result=Rest.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[Prefix.length+i,...issue.path]})}}}})',
          )
          const runtime = z.array(z.unknown()).superRefine((arr, ctx) => {
            const Prefix = [z.string()]
            for (const [i, Schema] of Prefix.slice(0, arr.length).entries()) {
              const valid = Schema.safeParse(arr[i])
              if (!valid.success) {
                for (const issue of valid.error.issues) {
                  ctx.addIssue({ ...issue, path: [i, ...issue.path] })
                }
              }
            }
            const Rest = z.number()
            for (const [i, val] of arr.slice(Prefix.length).entries()) {
              const valid = Rest.safeParse(val)
              if (!valid.success) {
                for (const issue of valid.error.issues) {
                  ctx.addIssue({ ...issue, path: [Prefix.length + i, ...issue.path] })
                }
              }
            }
          })
          expect(runtime.safeParse(['a', 1, 2]).success).toBe(true)
          const result = runtime.safeParse(['a', 'b'])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'number',
                code: 'invalid_type',
                path: [1],
                message: 'Invalid input: expected number, received string',
              },
            ])
          }
        })
        // ----- dependentSchemas: multiple keys -----
        it.concurrent('object: dependentSchemas multiple keys → 2 chained superRefines', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            properties: { a: { type: 'string' }, b: { type: 'string' } },
            dependentSchemas: {
              a: { type: 'object', required: ['b'], properties: { b: { type: 'string' } } },
              b: { type: 'object', required: ['a'], properties: { a: { type: 'string' } } },
            },
          })
          expect(generated).toBe(
            'z.object({a:z.string().exactOptional(),b:z.string().exactOptional()}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"a")){return}const Schema=z.object({b:z.string()}).openapi({"required":["b"]});const result=Schema.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"b")){return}const Schema=z.object({a:z.string()}).openapi({"required":["a"]});const result=Schema.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}).openapi({"required":[]})',
          )
          // runtime skipped: generated code uses .openapi(...) (zod-openapi extension), not callable on bare z
        })
        // ----- if-then only (no else) -----
        // biome-ignore lint/suspicious/noThenProperty: testing JSON Schema if-then
        it.concurrent('object: if-then only (no else) → Branch undefined for false', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            properties: { kind: { type: 'string' }, x: { type: 'string' } },
            if: { type: 'object', properties: { kind: { const: 'a' } }, required: ['kind'] },
            // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
            then: { type: 'object', required: ['x'], properties: { x: { type: 'string' } } },
          })
          expect(generated).toBe(
            'z.object({kind:z.string().exactOptional(),x:z.string().exactOptional()}).superRefine((o,ctx)=>{const If=z.object({kind:z.literal("a")}).openapi({"required":["kind"]});const ifOk=If.safeParse(o).success;const Branch=ifOk?z.object({x:z.string()}).openapi({"required":["x"]}):undefined;if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}).openapi({"required":[]})',
          )
          // runtime skipped: generated code uses .openapi(...) (zod-openapi extension), not callable on bare z
        })
        // ----- if-else only (no then) -----
        it.concurrent('object: if-else only (no then) → Branch undefined for true', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            properties: { kind: { type: 'string' }, x: { type: 'string' } },
            if: { type: 'object', properties: { kind: { const: 'a' } }, required: ['kind'] },
            else: { type: 'object', required: ['x'], properties: { x: { type: 'string' } } },
          })
          expect(generated).toBe(
            'z.object({kind:z.string().exactOptional(),x:z.string().exactOptional()}).superRefine((o,ctx)=>{const If=z.object({kind:z.literal("a")}).openapi({"required":["kind"]});const ifOk=If.safeParse(o).success;const Branch=ifOk?undefined:z.object({x:z.string()}).openapi({"required":["x"]});if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}).openapi({"required":[]})',
          )
          // runtime skipped: generated code uses .openapi(...) (zod-openapi extension), not callable on bare z
        })
        // ----- contentEncoding fallback cases -----
        it.concurrent('string: contentEncoding=8bit → z.string() (fallback)', () => {
          expect(zodToOpenAPI({ type: 'string', contentEncoding: '8bit' })).toBe('z.string()')
          const runtime = z.string()
          expect(runtime.safeParse('anything').success).toBe(true)
          const result = runtime.safeParse(1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected string, received number',
              },
            ])
          }
        })
        it.concurrent('string: contentEncoding=quoted-printable → z.string() (fallback)', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              contentEncoding: 'quoted-printable',
            }),
          ).toBe('z.string()')
          const runtime = z.string()
          expect(runtime.safeParse('anything').success).toBe(true)
          const result = runtime.safeParse(1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected string, received number',
              },
            ])
          }
        })
        // ----- base64url + JSON + contentSchema(array) -----
        it.concurrent('string: base64url + application/json + contentSchema(array<number>) → pipe(z.array(z.number()))', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            contentEncoding: 'base64url',
            contentMediaType: 'application/json',
            contentSchema: { type: 'array', items: { type: 'number' } },
          })
          expect(generated).toBe(
            'z.base64url().transform((val,ctx)=>{try{return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(val.replace(/-/g,"+").replace(/_/g,"/")),(char)=>char.charCodeAt(0))))}catch(err){ctx.addIssue({code:"custom",params:{cause:err instanceof Error?err.message:String(err)}});return z.NEVER}}).pipe(z.array(z.number()))',
          )
          // runtime skipped: codegen-only verification (runtime decode covered elsewhere)
        })
        // ----- contentMediaType text/plain (no JSON parse) -----
        it.concurrent('string: base64 + text/plain → UTF-8 decode (no JSON parse)', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            contentEncoding: 'base64',
            contentMediaType: 'text/plain',
          })
          expect(generated).toBe(
            'z.base64().transform((val)=>new TextDecoder().decode(Uint8Array.from(atob(val),(char)=>char.charCodeAt(0))))',
          )
          // runtime skipped: codegen-only verification (runtime decode covered elsewhere)
        })
        // ----- binary MIME → Uint8Array -----
        it.concurrent('string: base64 + image/png → Uint8Array.from(atob(...))', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            contentEncoding: 'base64',
            contentMediaType: 'image/png',
          })
          expect(generated).toBe(
            'z.base64().transform((val)=>Uint8Array.from(atob(val),(char)=>char.charCodeAt(0)))',
          )
          // runtime skipped: codegen-only verification (runtime decode covered elsewhere)
        })
        it.concurrent('string: base64 + audio/mpeg → Uint8Array binary handling', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            contentEncoding: 'base64',
            contentMediaType: 'audio/mpeg',
          })
          expect(generated).toBe(
            'z.base64().transform((val)=>Uint8Array.from(atob(val),(char)=>char.charCodeAt(0)))',
          )
          // runtime skipped: codegen-only verification (runtime decode covered elsewhere)
        })
        it.concurrent('string: base64 + video/mp4 → Uint8Array binary handling', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            contentEncoding: 'base64',
            contentMediaType: 'video/mp4',
          })
          expect(generated).toBe(
            'z.base64().transform((val)=>Uint8Array.from(atob(val),(char)=>char.charCodeAt(0)))',
          )
          // runtime skipped: codegen-only verification (runtime decode covered elsewhere)
        })
        it.concurrent('string: base64 + application/octet-stream → Uint8Array binary handling', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            contentEncoding: 'base64',
            contentMediaType: 'application/octet-stream',
          })
          expect(generated).toBe(
            'z.base64().transform((val)=>Uint8Array.from(atob(val),(char)=>char.charCodeAt(0)))',
          )
          // runtime skipped: codegen-only verification (runtime decode covered elsewhere)
        })
        // ----- base64url + binary MIME -----
        it.concurrent('string: base64url + image/jpeg → Uint8Array binary handling', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            contentEncoding: 'base64url',
            contentMediaType: 'image/jpeg',
          })
          expect(generated).toBe(
            'z.base64url().transform((val)=>Uint8Array.from(atob(val.replace(/-/g,"+").replace(/_/g,"/")),(char)=>char.charCodeAt(0)))',
          )
          // runtime skipped: codegen-only verification (runtime decode covered elsewhere)
        })
      })

      // object
      describe('object', () => {
        it.concurrent('object: empty schema', () => {
          expect(zodToOpenAPI({ type: 'object' })).toBe('z.looseObject({})')
          const runtime = z.looseObject({})
          expect(runtime.safeParse({}).success).toBe(true)
          const result = runtime.safeParse('string')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'object',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected object, received string',
              },
            ])
          }
        })
        it.concurrent('object: nullable via nullable:true', () => {
          expect(zodToOpenAPI({ type: ['object'], nullable: true })).toBe(
            'z.looseObject({}).nullable()',
          )
          const runtime = z.looseObject({}).nullable()
          expect(runtime.safeParse({}).success).toBe(true)
          expect(runtime.safeParse(null).success).toBe(true)
          const result = runtime.safeParse('string')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'object',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected object, received string',
              },
            ])
          }
        })
        it.concurrent('object: nullable via type tuple', () => {
          expect(zodToOpenAPI({ type: ['object', 'null'] })).toBe('z.looseObject({}).nullable()')
          const runtime = z.looseObject({}).nullable()
          expect(runtime.safeParse({}).success).toBe(true)
          expect(runtime.safeParse(null).success).toBe(true)
        })
        it.concurrent('object: with required field', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            properties: { name: { type: 'string' } },
            required: ['name'],
          })
          expect(generated).toBe('z.object({name:z.string()}).openapi({"required":["name"]})')
          // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
        })
        it.concurrent('object: optional property (no required)', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              properties: { name: { type: 'string' } },
            }),
          ).toBe('z.object({name:z.string().exactOptional()}).openapi({"required":[]})')
          const runtime = z.object({ name: z.string().exactOptional() })
          expect(runtime.safeParse({ name: 'foo' }).success).toBe(true)
          expect(runtime.safeParse({}).success).toBe(true)
        })
        it.concurrent('object: mixed required and optional properties', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            properties: { name: { type: 'string' }, age: { type: 'integer' } },
            required: ['name'],
          })
          expect(generated).toBe(
            'z.object({name:z.string(),age:z.int().exactOptional()}).openapi({"required":["name"]})',
          )
          // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
        })
        it.concurrent('object: additionalProperties:true → looseObject', () => {
          expect(zodToOpenAPI({ type: 'object', additionalProperties: true })).toBe(
            'z.looseObject({})',
          )
          const runtime = z.looseObject({})
          expect(runtime.safeParse({ extra: 1 }).success).toBe(true)
        })
        it.concurrent('object: additionalProperties as schema → z.record', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              additionalProperties: { type: 'string' },
            }),
          ).toBe('z.record(z.string(),z.string())')
          const runtime = z.record(z.string(), z.string())
          expect(runtime.safeParse({ a: 'foo' }).success).toBe(true)
          const result = runtime.safeParse({ a: 1 })
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: ['a'],
                message: 'Invalid input: expected string, received number',
              },
            ])
          }
        })
        it.concurrent('object: with default', () => {
          expect(zodToOpenAPI({ type: 'object', default: {} })).toBe(
            'z.looseObject({}).default({})',
          )
          const runtime = z.looseObject({}).default({})
          expect(runtime.safeParse(undefined).success).toBe(true)
        })
        it.concurrent('object: nullable + default', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              default: {},
              nullable: true,
            }),
          ).toBe('z.looseObject({}).nullable().default({})')
          const runtime = z.looseObject({}).nullable().default({})
          expect(runtime.safeParse(undefined).success).toBe(true)
          expect(runtime.safeParse(null).success).toBe(true)
        })
        it.concurrent('object: nullable via type tuple + default', () => {
          expect(zodToOpenAPI({ type: ['object', 'null'], default: {} })).toBe(
            'z.looseObject({}).nullable().default({})',
          )
          const runtime = z.looseObject({}).nullable().default({})
          expect(runtime.safeParse(undefined).success).toBe(true)
          expect(runtime.safeParse(null).success).toBe(true)
        })
      })

      // array
      describe('array', () => {
        it.concurrent('array: of strings', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
            }),
          ).toBe('z.array(z.string())')
          const runtime = z.array(z.string())
          expect(runtime.safeParse(['a']).success).toBe(true)
          const result = runtime.safeParse([1])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: [0],
                message: 'Invalid input: expected string, received number',
              },
            ])
          }
        })
        it.concurrent('array: of numbers', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'number' },
            }),
          ).toBe('z.array(z.number())')
          const runtime = z.array(z.number())
          expect(runtime.safeParse([1, 2]).success).toBe(true)
          const result = runtime.safeParse(['a'])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'number',
                code: 'invalid_type',
                path: [0],
                message: 'Invalid input: expected number, received string',
              },
            ])
          }
        })
        it.concurrent('array: of integers', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'integer' },
            }),
          ).toBe('z.array(z.int())')
          const runtime = z.array(z.int())
          expect(runtime.safeParse([1]).success).toBe(true)
          const result = runtime.safeParse([1.5])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'int',
                format: 'safeint',
                code: 'invalid_type',
                path: [0],
                message: 'Invalid input: expected int, received number',
              },
            ])
          }
        })
        it.concurrent('array: of booleans', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'boolean' },
            }),
          ).toBe('z.array(z.boolean())')
          const runtime = z.array(z.boolean())
          expect(runtime.safeParse([true]).success).toBe(true)
          const result = runtime.safeParse([1])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'boolean',
                code: 'invalid_type',
                path: [0],
                message: 'Invalid input: expected boolean, received number',
              },
            ])
          }
        })
        it.concurrent('array: of objects', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'object' },
            }),
          ).toBe('z.array(z.looseObject({}))')
          const runtime = z.array(z.looseObject({}))
          expect(runtime.safeParse([{}]).success).toBe(true)
          const result = runtime.safeParse(['a'])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'object',
                code: 'invalid_type',
                path: [0],
                message: 'Invalid input: expected object, received string',
              },
            ])
          }
        })
        it.concurrent('array: nullable via nullable:true', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              nullable: true,
            }),
          ).toBe('z.array(z.string()).nullable()')
          const runtime = z.array(z.string()).nullable()
          expect(runtime.safeParse(['a']).success).toBe(true)
          expect(runtime.safeParse(null).success).toBe(true)
        })
        it.concurrent('array: nullable via type tuple', () => {
          expect(
            zodToOpenAPI({
              type: ['array', 'null'],
              items: { type: 'string' },
            }),
          ).toBe('z.array(z.string()).nullable()')
          const runtime = z.array(z.string()).nullable()
          expect(runtime.safeParse(['a']).success).toBe(true)
          expect(runtime.safeParse(null).success).toBe(true)
        })
        it.concurrent('array: minItems(1)', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
            }),
          ).toBe('z.array(z.string()).min(1)')
          const runtime = z.array(z.string()).min(1)
          expect(runtime.safeParse(['a']).success).toBe(true)
          const result = runtime.safeParse([])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'array',
                code: 'too_small',
                minimum: 1,
                inclusive: true,
                path: [],
                message: 'Too small: expected array to have >=1 items',
              },
            ])
          }
        })
        it.concurrent('array: maxItems(10)', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              maxItems: 10,
            }),
          ).toBe('z.array(z.string()).max(10)')
          const runtime = z.array(z.string()).max(10)
          expect(runtime.safeParse(['a']).success).toBe(true)
          const result = runtime.safeParse(Array.from({ length: 11 }, () => 'a'))
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'array',
                code: 'too_big',
                maximum: 10,
                inclusive: true,
                path: [],
                message: 'Too big: expected array to have <=10 items',
              },
            ])
          }
        })
        it.concurrent('array: minItems + maxItems', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
              maxItems: 10,
            }),
          ).toBe('z.array(z.string()).min(1).max(10)')
          const runtime = z.array(z.string()).min(1).max(10)
          expect(runtime.safeParse(['a']).success).toBe(true)
          const result = runtime.safeParse([])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'array',
                code: 'too_small',
                minimum: 1,
                inclusive: true,
                path: [],
                message: 'Too small: expected array to have >=1 items',
              },
            ])
          }
        })
        it.concurrent('array: uniqueItems true → superRefine', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              uniqueItems: true,
            }),
          ).toBe(
            'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i]});else seen.set(key,i)}})',
          )
          const runtime = z.array(z.string()).superRefine((items, ctx) => {
            const seen = new Map()
            for (const [i, val] of items.entries()) {
              const key = JSON.stringify(val)
              if (seen.has(key)) {
                ctx.addIssue({
                  code: 'custom',
                  path: [i],
                  message: `Duplicate of index ${seen.get(key)}`,
                })
              } else seen.set(key, i)
            }
          })
          expect(runtime.safeParse(['a', 'b']).success).toBe(true)
          const result = runtime.safeParse(['a', 'a'])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [1], message: 'Duplicate of index 0' },
            ])
          }
        })
        it.concurrent('array: with default', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              default: [],
            }),
          ).toBe('z.array(z.string()).default([])')
          const runtime = z.array(z.string()).default([])
          expect(runtime.safeParse(undefined).success).toBe(true)
        })
        it.concurrent('array: nullable + default', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              default: [],
              nullable: true,
            }),
          ).toBe('z.array(z.string()).nullable().default([])')
          const runtime = z.array(z.string()).nullable().default([])
          expect(runtime.safeParse(undefined).success).toBe(true)
          expect(runtime.safeParse(null).success).toBe(true)
        })
        it.concurrent('array: nullable via type tuple + default', () => {
          expect(
            zodToOpenAPI({
              type: ['array', 'null'],
              items: { type: 'string' },
              default: [],
            }),
          ).toBe('z.array(z.string()).nullable().default([])')
          const runtime = z.array(z.string()).nullable().default([])
          expect(runtime.safeParse(undefined).success).toBe(true)
          expect(runtime.safeParse(null).success).toBe(true)
        })
      })

      // any
      describe('any', () => {
        it.concurrent('any: bare', () => {
          expect(zodToOpenAPI({ type: 'any' } as any)).toBe('z.any()')
          const runtime = z.any()
          expect(runtime.safeParse(42).success).toBe(true)
          expect(runtime.safeParse('foo').success).toBe(true)
        })
        it.concurrent('any: nullable via nullable:true', () => {
          expect(zodToOpenAPI({ type: 'any', nullable: true } as any)).toBe('z.any().nullable()')
          const runtime = z.any().nullable()
          expect(runtime.safeParse(null).success).toBe(true)
          expect(runtime.safeParse(42).success).toBe(true)
        })
        it.concurrent('any: nullable via type tuple', () => {
          expect(zodToOpenAPI({ type: ['any', 'null'] } as any)).toBe('z.any().nullable()')
          const runtime = z.any().nullable()
          expect(runtime.safeParse(null).success).toBe(true)
        })
        it.concurrent('any: with default', () => {
          expect(zodToOpenAPI({ type: 'any', default: 'test' } as any)).toBe(
            'z.any().default("test")',
          )
          const runtime = z.any().default('test')
          expect(runtime.safeParse(undefined).success).toBe(true)
        })
        it.concurrent('any: nullable + default', () => {
          expect(
            zodToOpenAPI({
              type: 'any',
              nullable: true,
              default: 'test',
            } as any),
          ).toBe('z.any().nullable().default("test")')
          const runtime = z.any().nullable().default('test')
          expect(runtime.safeParse(undefined).success).toBe(true)
          expect(runtime.safeParse(null).success).toBe(true)
        })
        it.concurrent('any: nullable via type tuple + default', () => {
          expect(zodToOpenAPI({ type: ['any', 'null'], default: 'test' } as any)).toBe(
            'z.any().nullable().default("test")',
          )
          const runtime = z.any().nullable().default('test')
          expect(runtime.safeParse(undefined).success).toBe(true)
          expect(runtime.safeParse(null).success).toBe(true)
        })
      })

      // null
      describe('null', () => {
        it.concurrent('null: bare', () => {
          expect(zodToOpenAPI({ type: 'null' })).toBe('z.null().nullable()')
          const runtime = z.null().nullable()
          expect(runtime.safeParse(null).success).toBe(true)
          const result = runtime.safeParse(123)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'null',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected null, received number',
              },
            ])
          }
        })
        it.concurrent('null: via type tuple', () => {
          expect(zodToOpenAPI({ type: ['null'] })).toBe('z.null().nullable()')
          const runtime = z.null().nullable()
          expect(runtime.safeParse(null).success).toBe(true)
          const result = runtime.safeParse(123)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'null',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected null, received number',
              },
            ])
          }
        })
      })

      // x-* vendor extensions for custom validation messages
      describe('x-* vendor extensions', () => {
        it.concurrent('x-error-message on format email', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              format: 'email',
              'x-error-message': 'Invalid email',
            }),
          ).toBe('z.email({error:"Invalid email"})')
          const runtime = z.email({ error: 'Invalid email' })
          expect(runtime.safeParse('a@b.co').success).toBe(true)
          const result = runtime.safeParse('not-email')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'string',
                code: 'invalid_format',
                format: 'email',
                pattern:
                  "/^(?:[A-Za-z0-9_'+\\-]+\\.)*[A-Za-z0-9_'+\\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
                path: [],
                message: 'Invalid email',
              },
            ])
          }
        })
        it.concurrent('x-minLength-message / x-maxLength-message on string', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              minLength: 3,
              maxLength: 20,
              'x-minLength-message': '3文字以上',
              'x-maxLength-message': '20文字以下',
            }),
          ).toBe('z.string().min(3,{error:"3文字以上"}).max(20,{error:"20文字以下"})')
          const runtime = z.string().min(3, { error: '3文字以上' }).max(20, { error: '20文字以下' })
          expect(runtime.safeParse('abc').success).toBe(true)
          const result = runtime.safeParse('ab')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'string',
                code: 'too_small',
                minimum: 3,
                inclusive: true,
                path: [],
                message: '3文字以上',
              },
            ])
          }
        })
        it.concurrent('x-pattern-message on string', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              pattern: '^[a-z]+$',
              'x-pattern-message': 'lowercase only',
            }),
          ).toBe('z.string().regex(/^[a-z]+$/,{error:"lowercase only"})')
          // oxlint-disable-next-line require-unicode-regexp -- mirrors the regex literal the generator emits
          const runtime = z.string().regex(/^[a-z]+$/, { error: 'lowercase only' })
          expect(runtime.safeParse('abc').success).toBe(true)
          const result = runtime.safeParse('ABC')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'string',
                code: 'invalid_format',
                format: 'regex',
                pattern: '/^[a-z]+$/',
                path: [],
                message: 'lowercase only',
              },
            ])
          }
        })
        it.concurrent('x-minimum-message on number', () => {
          expect(
            zodToOpenAPI({
              type: 'number',
              minimum: 0,
              'x-minimum-message': 'Must be >= 0',
            }),
          ).toBe('z.number().min(0,{error:"Must be >= 0"})')
          const runtime = z.number().min(0, { error: 'Must be >= 0' })
          expect(runtime.safeParse(1).success).toBe(true)
          const result = runtime.safeParse(-1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'number',
                code: 'too_small',
                minimum: 0,
                inclusive: true,
                path: [],
                message: 'Must be >= 0',
              },
            ])
          }
        })
        it.concurrent('x-maximum-message on number', () => {
          expect(
            zodToOpenAPI({
              type: 'number',
              maximum: 100,
              'x-maximum-message': 'Must be <= 100',
            }),
          ).toBe('z.number().max(100,{error:"Must be <= 100"})')
          const runtime = z.number().max(100, { error: 'Must be <= 100' })
          expect(runtime.safeParse(50).success).toBe(true)
          const result = runtime.safeParse(101)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'number',
                code: 'too_big',
                maximum: 100,
                inclusive: true,
                path: [],
                message: 'Must be <= 100',
              },
            ])
          }
        })
        it.concurrent('x-minimum-message on integer', () => {
          expect(
            zodToOpenAPI({
              type: 'integer',
              minimum: 1,
              'x-minimum-message': '1以上',
            }),
          ).toBe('z.int().min(1,{error:"1以上"})')
          const runtime = z.int().min(1, { error: '1以上' })
          expect(runtime.safeParse(1).success).toBe(true)
          const result = runtime.safeParse(0)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'number',
                code: 'too_small',
                minimum: 1,
                inclusive: true,
                path: [],
                message: '1以上',
              },
            ])
          }
        })
        it.concurrent('x-maximum-message on int64', () => {
          expect(
            zodToOpenAPI({
              type: 'integer',
              format: 'int64',
              maximum: 100,
              'x-maximum-message': '100以下',
            }),
          ).toBe(
            String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64().max(100n,{error:"100以下"})).openapi({type:"integer",format:"int64",maximum:100})`,
          )
          const runtime = z.int64().max(100n, { error: '100以下' })
          expect(runtime.safeParse(50n).success).toBe(true)
          const result = runtime.safeParse(101n)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'bigint',
                code: 'too_big',
                maximum: 100n,
                inclusive: true,
                path: [],
                message: '100以下',
              },
            ])
          }
        })
        it.concurrent('x-error-message with description', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            format: 'email',
            'x-error-message': 'メール不正',
            description: 'User email',
          })
          expect(generated).toBe(
            'z.email({error:"メール不正"}).openapi({"description":"User email"})',
          )
          // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
        })
        it.concurrent('x-size-message with fixed length', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              minLength: 5,
              maxLength: 5,
              'x-size-message': 'Exactly 5',
            } as Schema),
          ).toBe('z.string().length(5).openapi({"x-size-message":"Exactly 5"})')
          const runtime = z.string().length(5, { error: 'Exactly 5' })
          expect(runtime.safeParse('abcde').success).toBe(true)
          const result = runtime.safeParse('abcd')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'string',
                code: 'too_small',
                minimum: 5,
                inclusive: true,
                exact: true,
                path: [],
                message: 'Exactly 5',
              },
            ])
          }
        })
        it.concurrent('x-error-message on base z.string() (no format)', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              'x-error-message': '文字列必須',
            }),
          ).toBe('z.string({error:"文字列必須"})')
          const runtime = z.string({ error: '文字列必須' })
          expect(runtime.safeParse('x').success).toBe(true)
          const result = runtime.safeParse(1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: [],
                message: '文字列必須',
              },
            ])
          }
        })
        it.concurrent('x-error-message on z.number()', () => {
          expect(
            zodToOpenAPI({
              type: 'number',
              'x-error-message': '数値必須',
            }),
          ).toBe('z.number({error:"数値必須"})')
          const runtime = z.number({ error: '数値必須' })
          expect(runtime.safeParse(1).success).toBe(true)
          const result = runtime.safeParse('x')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'number',
                code: 'invalid_type',
                path: [],
                message: '数値必須',
              },
            ])
          }
        })
        it.concurrent('x-error-message on z.number() with format', () => {
          expect(
            zodToOpenAPI({
              type: 'number',
              format: 'float',
              'x-error-message': 'float必須',
            }),
          ).toBe('z.float32({error:"float必須"})')
          const runtime = z.float32({ error: 'float必須' })
          expect(runtime.safeParse(1.5).success).toBe(true)
          const result = runtime.safeParse('x')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'number',
                code: 'invalid_type',
                path: [],
                message: 'float必須',
              },
            ])
          }
        })
        it.concurrent('x-error-message on z.int()', () => {
          expect(
            zodToOpenAPI({
              type: 'integer',
              'x-error-message': '整数必須',
            }),
          ).toBe('z.int({error:"整数必須"})')
          const runtime = z.int({ error: '整数必須' })
          expect(runtime.safeParse(1).success).toBe(true)
          const result = runtime.safeParse(1.5)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'int',
                format: 'safeint',
                code: 'invalid_type',
                path: [],
                message: '整数必須',
              },
            ])
          }
        })
        it.concurrent('x-error-message on z.boolean()', () => {
          expect(
            zodToOpenAPI({
              type: 'boolean',
              'x-error-message': 'ブール必須',
            }),
          ).toBe('z.boolean({error:"ブール必須"})')
          const runtime = z.boolean({ error: 'ブール必須' })
          expect(runtime.safeParse(true).success).toBe(true)
          const result = runtime.safeParse('x')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'boolean',
                code: 'invalid_type',
                path: [],
                message: 'ブール必須',
              },
            ])
          }
        })
        it.concurrent('array: x-error-message fallback to .min() (no x-minItems-message)', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              minItems: 2,
              'x-error-message': 'common',
            }),
          ).toBe('z.array(z.string(),{error:"common"}).min(2,{error:"common"})')
        })
        it.concurrent('array: x-minItems-message wins over x-error-message', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              minItems: 2,
              'x-error-message': 'common',
              'x-minItems-message': 'min wins',
            }),
          ).toBe('z.array(z.string(),{error:"common"}).min(2,{error:"min wins"})')
        })
        it.concurrent('array: x-error-message fallback to .max()', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              maxItems: 5,
              'x-error-message': 'common',
            }),
          ).toBe('z.array(z.string(),{error:"common"}).max(5,{error:"common"})')
        })
        it.concurrent('array: x-error-message fallback to .length() (minItems === maxItems)', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              minItems: 3,
              maxItems: 3,
              'x-error-message': 'common',
            }),
          ).toBe('z.array(z.string(),{error:"common"}).length(3,{error:"common"})')
        })
        it.concurrent('array: x-error-message fallback to uniqueItems superRefine', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              uniqueItems: true,
              'x-error-message': 'common',
            }),
          ).toBe(
            'z.array(z.string(),{error:"common"}).superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"common"});else seen.set(key,i)}})',
          )
        })
        it.concurrent('array: no x-error-message and no slot → bare chain', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              minItems: 2,
            }),
          ).toBe('z.array(z.string()).min(2)')
        })
        // Symmetric coverage for the remaining array slots so every chain
        // method shows both `per-keyword wins` and `keyword-only` paths.
        it.concurrent('array: x-maxItems-message wins over x-error-message', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              maxItems: 5,
              'x-error-message': 'common',
              'x-maxItems-message': 'max wins',
            }),
          ).toBe('z.array(z.string(),{error:"common"}).max(5,{error:"max wins"})')
        })
        it.concurrent('array: x-length-message wins over x-error-message (fixed length)', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              minItems: 3,
              maxItems: 3,
              'x-error-message': 'common',
              'x-length-message': 'len wins',
            }),
          ).toBe('z.array(z.string(),{error:"common"}).length(3,{error:"len wins"})')
        })
        it.concurrent('array: x-uniqueItems-message wins over x-error-message', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              uniqueItems: true,
              'x-error-message': 'common',
              'x-uniqueItems-message': 'uniq wins',
            }),
          ).toBe(
            'z.array(z.string(),{error:"common"}).superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"uniq wins"});else seen.set(key,i)}})',
          )
        })
        it.concurrent('x-error-message on z.array()', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              'x-error-message': '配列必須',
            }),
          ).toBe('z.array(z.string(),{error:"配列必須"})')
          const runtime = z.array(z.string(), { error: '配列必須' })
          expect(runtime.safeParse(['x']).success).toBe(true)
          const result = runtime.safeParse('x')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'array',
                code: 'invalid_type',
                path: [],
                message: '配列必須',
              },
            ])
          }
        })
        it.concurrent('x-error-message on z.null()', () => {
          expect(
            zodToOpenAPI({
              type: 'null',
              'x-error-message': 'null必須',
            }),
          ).toBe('z.null({error:"null必須"}).nullable()')
          const runtime = z.null({ error: 'null必須' }).nullable()
          expect(runtime.safeParse(null).success).toBe(true)
          const result = runtime.safeParse(1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'null',
                code: 'invalid_type',
                path: [],
                message: 'null必須',
              },
            ])
          }
        })
        it.concurrent('x-error-message on z.enum()', () => {
          expect(
            zodToOpenAPI({
              enum: ['A', 'B'],
              'x-error-message': '無効な値',
            }),
          ).toBe('z.enum(["A","B"],{error:"無効な値"})')
          const runtime = z.enum(['A', 'B'], { error: '無効な値' })
          expect(runtime.safeParse('A').success).toBe(true)
          const result = runtime.safeParse('C')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'invalid_value',
                values: ['A', 'B'],
                path: [],
                message: '無効な値',
              },
            ])
          }
        })
        it.concurrent('x-error-message on single string enum → z.literal', () => {
          expect(
            zodToOpenAPI({
              enum: ['only'],
              'x-error-message': 'onlyのみ',
            }),
          ).toBe(`z.literal('only',{error:"onlyのみ"})`)
          const runtime = z.literal('only', { error: 'onlyのみ' })
          expect(runtime.safeParse('only').success).toBe(true)
          const result = runtime.safeParse('other')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'invalid_value',
                values: ['only'],
                path: [],
                message: 'onlyのみ',
              },
            ])
          }
        })
        it.concurrent('x-error-message on number enum → z.union of z.literal', () => {
          expect(
            zodToOpenAPI({
              enum: [1, 2, 3],
              'x-error-message': '1-3のみ',
            }),
          ).toBe('z.union([z.literal(1),z.literal(2),z.literal(3)],{error:"1-3のみ"})')
          const runtime = z.union([z.literal(1), z.literal(2), z.literal(3)], { error: '1-3のみ' })
          expect(runtime.safeParse(1).success).toBe(true)
          const result = runtime.safeParse(4)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'invalid_union',
                errors: [
                  [
                    {
                      code: 'invalid_value',
                      values: [1],
                      path: [],
                      message: 'Invalid input: expected 1',
                    },
                  ],
                  [
                    {
                      code: 'invalid_value',
                      values: [2],
                      path: [],
                      message: 'Invalid input: expected 2',
                    },
                  ],
                  [
                    {
                      code: 'invalid_value',
                      values: [3],
                      path: [],
                      message: 'Invalid input: expected 3',
                    },
                  ],
                ],
                path: [],
                message: '1-3のみ',
              },
            ])
          }
        })
        it.concurrent('x-error-message on single number enum → z.literal', () => {
          expect(
            zodToOpenAPI({
              type: 'number',
              enum: [42],
              'x-error-message': '42のみ',
            }),
          ).toBe('z.literal(42,{error:"42のみ"})')
          const runtime = z.literal(42, { error: '42のみ' })
          expect(runtime.safeParse(42).success).toBe(true)
          const result = runtime.safeParse(43)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'invalid_value',
                values: [42],
                path: [],
                message: '42のみ',
              },
            ])
          }
        })
        it.concurrent('x-error-message on boolean enum → z.union of z.literal', () => {
          expect(
            zodToOpenAPI({
              type: 'boolean',
              enum: [true, false],
              'x-error-message': 'ブール値',
            }),
          ).toBe('z.union([z.literal(true),z.literal(false)],{error:"ブール値"})')
          const runtime = z.union([z.literal(true), z.literal(false)], { error: 'ブール値' })
          expect(runtime.safeParse(true).success).toBe(true)
          const result = runtime.safeParse('x')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'invalid_union',
                errors: [
                  [
                    {
                      code: 'invalid_value',
                      values: [true],
                      path: [],
                      message: 'Invalid input: expected true',
                    },
                  ],
                  [
                    {
                      code: 'invalid_value',
                      values: [false],
                      path: [],
                      message: 'Invalid input: expected false',
                    },
                  ],
                ],
                path: [],
                message: 'ブール値',
              },
            ])
          }
        })
        it.concurrent('x-error-message with arrow function (no args)', () => {
          expect(
            zodToOpenAPI({
              type: 'string',
              'x-error-message': '()=>"required"',
            }),
          ).toBe('z.string({error:()=>"required"})')
          const runtime = z.string({ error: () => 'required' })
          expect(runtime.safeParse('x').success).toBe(true)
          const result = runtime.safeParse(1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: [],
                message: 'required',
              },
            ])
          }
        })
        it.concurrent('x-minimum-message with arrow function (issue arg)', () => {
          expect(
            zodToOpenAPI({
              type: 'number',
              minimum: 0,
              'x-minimum-message': '(iss)=>iss.input===undefined?"required":"invalid"',
            }),
          ).toBe('z.number().min(0,{error:(iss)=>iss.input===undefined?"required":"invalid"})')
          const runtime = z
            .number()
            .min(0, { error: (iss) => (iss.input === undefined ? 'required' : 'invalid') })
          expect(runtime.safeParse(1).success).toBe(true)
          const result = runtime.safeParse(-1)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'number',
                code: 'too_small',
                minimum: 0,
                inclusive: true,
                path: [],
                message: 'invalid',
              },
            ])
          }
        })
      })

      // x-*-message on array — split from numeric/string umbrellas
      describe('x-*-message on array', () => {
        it.concurrent('x-minItems-message on .min()', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'number' },
              minItems: 1,
              'x-minItems-message': 'At least 1',
            }),
          ).toBe('z.array(z.number()).min(1,{error:"At least 1"})')
          const runtime = z.array(z.number()).min(1, { error: 'At least 1' })
          expect(runtime.safeParse([1]).success).toBe(true)
          const result = runtime.safeParse([])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'array',
                code: 'too_small',
                minimum: 1,
                inclusive: true,
                path: [],
                message: 'At least 1',
              },
            ])
          }
        })
        it.concurrent('x-maxItems-message on .max()', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'number' },
              maxItems: 5,
              'x-maxItems-message': 'At most 5',
            }),
          ).toBe('z.array(z.number()).max(5,{error:"At most 5"})')
          const runtime = z.array(z.number()).max(5, { error: 'At most 5' })
          expect(runtime.safeParse([1, 2]).success).toBe(true)
          const result = runtime.safeParse([1, 2, 3, 4, 5, 6])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'array',
                code: 'too_big',
                maximum: 5,
                inclusive: true,
                path: [],
                message: 'At most 5',
              },
            ])
          }
        })
        it.concurrent('x-minItems-message + x-maxItems-message', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
              maxItems: 10,
              'x-minItems-message': '1個以上',
              'x-maxItems-message': '10個以下',
            }),
          ).toBe('z.array(z.string()).min(1,{error:"1個以上"}).max(10,{error:"10個以下"})')
          const runtime = z
            .array(z.string())
            .min(1, { error: '1個以上' })
            .max(10, { error: '10個以下' })
          expect(runtime.safeParse(['a']).success).toBe(true)
          const result = runtime.safeParse([])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'array',
                code: 'too_small',
                minimum: 1,
                inclusive: true,
                path: [],
                message: '1個以上',
              },
            ])
          }
        })
        it.concurrent('x-size-message on .length() (minItems === maxItems)', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              minItems: 3,
              maxItems: 3,
              'x-size-message': 'Exactly 3',
            } as Schema),
          ).toBe('z.array(z.string()).length(3).openapi({"x-size-message":"Exactly 3"})')
          const runtime = z.array(z.string()).length(3, { error: 'Exactly 3' })
          expect(runtime.safeParse(['a', 'b', 'c']).success).toBe(true)
          const result = runtime.safeParse(['a'])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'array',
                code: 'too_small',
                minimum: 3,
                inclusive: true,
                exact: true,
                path: [],
                message: 'Exactly 3',
              },
            ])
          }
        })
        it.concurrent('x-uniqueItems-message on uniqueItems superRefine', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              uniqueItems: true,
              'x-uniqueItems-message': '重複不可',
            }),
          ).toBe(
            'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"重複不可"});else seen.set(key,i)}})',
          )
          const runtime = z.array(z.string()).superRefine((items, ctx) => {
            const seen = new Map()
            for (const [i, val] of items.entries()) {
              const key = JSON.stringify(val)
              if (seen.has(key)) ctx.addIssue({ code: 'custom', path: [i], message: '重複不可' })
              else seen.set(key, i)
            }
          })
          expect(runtime.safeParse(['a', 'b']).success).toBe(true)
          const result = runtime.safeParse(['a', 'a'])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: [1], message: '重複不可' },
            ])
          }
        })
        it.concurrent('x-error-message on z.array() constructor', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              'x-error-message': '配列必須',
            }),
          ).toBe('z.array(z.string(),{error:"配列必須"})')
          const runtime = z.array(z.string(), { error: '配列必須' })
          expect(runtime.safeParse(['a']).success).toBe(true)
          const result = runtime.safeParse('not array')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'array',
                code: 'invalid_type',
                path: [],
                message: '配列必須',
              },
            ])
          }
        })
        it.concurrent('x-error-message on prefixItems → propagates to outer z.array(z.unknown())', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              prefixItems: [{ type: 'string' }, { type: 'number' }],
              'x-error-message': 'タプル不正',
            }),
          ).toBe(
            'z.array(z.unknown(),{error:"タプル不正"}).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path],message:"タプル不正"})}}}})',
          )
          const runtime = z.array(z.unknown(), { error: 'タプル不正' }).superRefine((arr, ctx) => {
            const Prefix = [z.string(), z.number()]
            for (const [i, Schema] of Prefix.slice(0, arr.length).entries()) {
              const valid = Schema.safeParse(arr[i])
              if (!valid.success) {
                for (const issue of valid.error.issues) {
                  ctx.addIssue({ ...issue, path: [i, ...issue.path] })
                }
              }
            }
          })
          expect(runtime.safeParse(['a', 1]).success).toBe(true)
          const result = runtime.safeParse([1, 'a'])
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: [0],
                message: 'Invalid input: expected string, received number',
              },
              {
                expected: 'number',
                code: 'invalid_type',
                path: [1],
                message: 'Invalid input: expected number, received string',
              },
            ])
          }
        })
        it.concurrent('x-*-message all combined: separate messages per keyword', () => {
          expect(
            zodToOpenAPI({
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
              maxItems: 5,
              uniqueItems: true,
              'x-error-message': '配列必須',
              'x-minItems-message': '1個以上',
              'x-maxItems-message': '5個以下',
              'x-uniqueItems-message': '重複不可',
            }),
          ).toBe(
            'z.array(z.string(),{error:"配列必須"}).min(1,{error:"1個以上"}).max(5,{error:"5個以下"}).superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"重複不可"});else seen.set(key,i)}})',
          )
          const runtime = z
            .array(z.string(), { error: '配列必須' })
            .min(1, { error: '1個以上' })
            .max(5, { error: '5個以下' })
            .superRefine((items, ctx) => {
              const seen = new Map()
              for (const [i, val] of items.entries()) {
                const key = JSON.stringify(val)
                if (seen.has(key)) ctx.addIssue({ code: 'custom', path: [i], message: '重複不可' })
                else seen.set(key, i)
              }
            })
          expect(runtime.safeParse(['a']).success).toBe(true)
          const rEmpty = runtime.safeParse([])
          expect(rEmpty.success).toBe(false)
          if (!rEmpty.success) {
            expect(rEmpty.error.issues).toStrictEqual([
              {
                origin: 'array',
                code: 'too_small',
                minimum: 1,
                inclusive: true,
                path: [],
                message: '1個以上',
              },
            ])
          }
          const rDup = runtime.safeParse(['a', 'a'])
          expect(rDup.success).toBe(false)
          if (!rDup.success) {
            expect(rDup.error.issues).toStrictEqual([
              { code: 'custom', path: [1], message: '重複不可' },
            ])
          }
        })
      })

      // x-minProperties-message / x-maxProperties-message on object
      describe('x-minProperties/maxProperties-message on object', () => {
        it.concurrent('x-minProperties-message on .refine() with size >= 1', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            minProperties: 1,
            'x-minProperties-message': 'At least 1',
          })
          expect(generated).toBe(
            'z.looseObject({}).refine((val)=>Object.keys(val).length>=1,{error:"At least 1"})',
          )
          // skip runtime: z.looseObject({}) strips unknown keys before .refine() runs, so
          // valid input shapes can't be exercised here without redefining the schema
        })
        it.concurrent('x-maxProperties-message on .refine() with size <= 5', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            maxProperties: 5,
            'x-maxProperties-message': 'At most 5',
          })
          expect(generated).toBe(
            'z.looseObject({}).refine((val)=>Object.keys(val).length<=5,{error:"At most 5"})',
          )
          // skip runtime: z.looseObject({}) strips unknown keys before .refine() runs
        })
        it.concurrent('x-minProperties + x-maxProperties-message combined', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            minProperties: 2,
            maxProperties: 10,
            'x-minProperties-message': '2個以上',
            'x-maxProperties-message': '10個以下',
          })
          expect(generated).toBe(
            'z.looseObject({}).refine((val)=>Object.keys(val).length>=2,{error:"2個以上"}).refine((val)=>Object.keys(val).length<=10,{error:"10個以下"})',
          )
          // skip runtime: z.looseObject({}) strips unknown keys before .refine() runs
        })
        it.concurrent('dependentRequired → x-error-message fallback (superRefine)', () => {
          const generated = zodToOpenAPI({
            type: 'object',
            dependentRequired: { foo: ['bar'] },
            'x-error-message': 'fooにはbarが必要',
          })
          expect(generated).toBe(
            `z.looseObject({}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"foo")){return}if(!Object.hasOwn(o,"bar")){ctx.addIssue({code:'custom',message:"fooにはbarが必要",path:["bar"]})}})`,
          )
          // skip runtime: z.looseObject({}) strips unknown keys (foo/bar) before superRefine
        })
      })

      // x-propertyNames-message / x-patternProperties-message on object
      describe('x-propertyNames-message / x-patternProperties-message on object', () => {
        it.concurrent('x-propertyNames-message on superRefine', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              propertyNames: { pattern: '^[a-z]+$' },
              'x-propertyNames-message': 'lowercase keys',
            }),
          ).toBe(
            'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k],message:"lowercase keys"})}}})',
          )
          const runtime = z.looseObject({}).superRefine((o, ctx) => {
            // oxlint-disable-next-line require-unicode-regexp, prefer-regex-literals -- mirrors the regex the generator emits
            const regex = new RegExp('^[a-z]+$')
            for (const k of Object.keys(o)) {
              if (!regex.test(k)) {
                ctx.addIssue({ code: 'custom', path: [k], message: 'lowercase keys' })
              }
            }
          })
          expect(runtime.safeParse({ foo: 1 }).success).toBe(true)
          const result = runtime.safeParse({ FOO: 1 })
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              { code: 'custom', path: ['FOO'], message: 'lowercase keys' },
            ])
          }
        })
        it.concurrent('x-patternProperties-message on superRefine', () => {
          expect(
            zodToOpenAPI({
              type: 'object',
              patternProperties: { '^S_': { type: 'string' } },
              'x-patternProperties-message': 'S_ keys must be strings',
            }),
          ).toBe(
            'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^S_");const Schema=z.string();for(const [k,val] of Object.entries(o)){if(!regex.test(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path],message:"S_ keys must be strings"})}}}}).openapi({...{patternProperties:{"^S_":{"type":"string"}}}})',
          )
          const runtime = z.looseObject({}).superRefine((o, ctx) => {
            // oxlint-disable-next-line require-unicode-regexp, prefer-regex-literals -- mirrors the regex the generator emits
            const regex = new RegExp('^S_')
            const Schema = z.string()
            for (const [k, val] of Object.entries(o)) {
              // oxlint-disable-next-line typescript/prefer-string-starts-ends-with -- mirrors the emitted code verbatim
              if (!regex.test(k)) continue
              const valid = Schema.safeParse(val)
              if (!valid.success) {
                for (const issue of valid.error.issues) {
                  ctx.addIssue({
                    ...issue,
                    path: [k, ...issue.path],
                    message: 'S_ keys must be strings',
                  })
                }
              }
            }
          })
          expect(runtime.safeParse({ S_foo: 'bar' }).success).toBe(true)
          const result = runtime.safeParse({ S_foo: 1 })
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'string',
                code: 'invalid_type',
                path: ['S_foo'],
                message: 'S_ keys must be strings',
              },
            ])
          }
        })
      })

      // x-error-message on const (z.literal)
      describe('x-error-message on const', () => {
        it.concurrent('x-error-message on string const', () => {
          expect(
            zodToOpenAPI({
              const: 'fixed',
              'x-error-message': 'fixedのみ',
            }),
          ).toBe(`z.literal("fixed",{error:"fixedのみ"})`)
          const runtime = z.literal('fixed', { error: 'fixedのみ' })
          expect(runtime.safeParse('fixed').success).toBe(true)
          const result = runtime.safeParse('other')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'invalid_value',
                values: ['fixed'],
                path: [],
                message: 'fixedのみ',
              },
            ])
          }
        })
        it.concurrent('x-error-message on number const', () => {
          expect(zodToOpenAPI({ const: 42, 'x-error-message': '42のみ' })).toBe(
            'z.literal(42,{error:"42のみ"})',
          )
          const runtime = z.literal(42, { error: '42のみ' })
          expect(runtime.safeParse(42).success).toBe(true)
          const result = runtime.safeParse(0)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'invalid_value',
                values: [42],
                path: [],
                message: '42のみ',
              },
            ])
          }
        })
        it.concurrent('x-error-message on boolean const', () => {
          expect(zodToOpenAPI({ const: true, 'x-error-message': 'trueのみ' })).toBe(
            'z.literal(true,{error:"trueのみ"})',
          )
          const runtime = z.literal(true, { error: 'trueのみ' })
          expect(runtime.safeParse(true).success).toBe(true)
          const result = runtime.safeParse(false)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'invalid_value',
                values: [true],
                path: [],
                message: 'trueのみ',
              },
            ])
          }
        })
        it.concurrent('const without x-error-message → existing behavior', () => {
          expect(zodToOpenAPI({ const: 'fixed' })).toBe(`z.literal("fixed")`)
          const runtime = z.literal('fixed')
          expect(runtime.safeParse('fixed').success).toBe(true)
          const result = runtime.safeParse('other')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                code: 'invalid_value',
                values: ['fixed'],
                path: [],
                message: 'Invalid input: expected "fixed"',
              },
            ])
          }
        })
      })

      // x-error-message on multipleOf
      describe('x-error-message on multipleOf', () => {
        it.concurrent('x-error-message on number multipleOf', () => {
          expect(
            zodToOpenAPI({
              type: 'number',
              multipleOf: 2,
              'x-error-message': '偶数のみ',
            }),
          ).toBe('z.number({error:"偶数のみ"}).multipleOf(2,{error:"偶数のみ"})')
          const runtime = z.number({ error: '偶数のみ' }).multipleOf(2, { error: '偶数のみ' })
          expect(runtime.safeParse(4).success).toBe(true)
          const result = runtime.safeParse(3)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'number',
                code: 'not_multiple_of',
                divisor: 2,
                path: [],
                message: '偶数のみ',
              },
            ])
          }
        })
        it.concurrent('x-error-message on integer multipleOf', () => {
          expect(
            zodToOpenAPI({
              type: 'integer',
              multipleOf: 3,
              'x-error-message': '3の倍数',
            }),
          ).toBe('z.int({error:"3の倍数"}).multipleOf(3,{error:"3の倍数"})')
          const runtime = z.int({ error: '3の倍数' }).multipleOf(3, { error: '3の倍数' })
          expect(runtime.safeParse(9).success).toBe(true)
          const result = runtime.safeParse(4)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'number',
                code: 'not_multiple_of',
                divisor: 3,
                path: [],
                message: '3の倍数',
              },
            ])
          }
        })
        it.concurrent('x-error-message on int64 multipleOf (bigint)', () => {
          expect(
            zodToOpenAPI({
              type: 'integer',
              format: 'int64',
              multipleOf: 5,
              'x-error-message': '5の倍数',
            }),
          ).toBe(
            String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64({error:"5の倍数"}).multipleOf(5n,{error:"5の倍数"})).openapi({type:"integer",format:"int64",multipleOf:5})`,
          )
          const runtime = z.int64({ error: '5の倍数' }).multipleOf(5n, { error: '5の倍数' })
          expect(runtime.safeParse(10n).success).toBe(true)
          const result = runtime.safeParse(3n)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                origin: 'bigint',
                code: 'not_multiple_of',
                divisor: 5n,
                path: [],
                message: '5の倍数',
              },
            ])
          }
        })
      })

      // x-error-message on date
      describe('x-error-message on date', () => {
        it.concurrent('x-error-message on date', () => {
          expect(
            zodToOpenAPI({
              type: 'date',
              'x-error-message': '日付必須',
            }),
          ).toBe('z.date({error:"日付必須"})')
          const runtime = z.date({ error: '日付必須' })
          expect(runtime.safeParse(new Date()).success).toBe(true)
          const result = runtime.safeParse('not date')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'date',
                code: 'invalid_type',
                path: [],
                message: '日付必須',
              },
            ])
          }
        })
        it.concurrent('date without x-error-message → existing behavior', () => {
          expect(zodToOpenAPI({ type: 'date' })).toBe('z.date()')
          const runtime = z.date()
          expect(runtime.safeParse(new Date()).success).toBe(true)
          const result = runtime.safeParse('not date')
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues).toStrictEqual([
              {
                expected: 'date',
                code: 'invalid_type',
                path: [],
                message: 'Invalid input: expected date, received string',
              },
            ])
          }
        })
      })

      // with description and example
      describe('with meta info', () => {
        it.concurrent('string: description preserved', () => {
          const generated = zodToOpenAPI({ type: 'string', description: 'A string' })
          expect(generated).toBe('z.string().openapi({"description":"A string"})')
          // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
        })
        it.concurrent('string: example preserved', () => {
          const generated = zodToOpenAPI({ type: 'string', example: 'hello' })
          expect(generated).toBe('z.string().openapi({"example":"hello"})')
          // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
        })
        it.concurrent('string: description + example preserved', () => {
          const generated = zodToOpenAPI({
            type: 'string',
            description: 'A string',
            example: 'hello',
          })
          expect(generated).toBe('z.string().openapi({"description":"A string","example":"hello"})')
          // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
        })
        it.concurrent('number: description preserved', () => {
          const generated = zodToOpenAPI({ type: 'number', description: 'A number' })
          expect(generated).toBe('z.number().openapi({"description":"A number"})')
          // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
        })
        it.concurrent('integer: description preserved', () => {
          const generated = zodToOpenAPI({ type: 'integer', description: 'An integer' })
          expect(generated).toBe('z.int().openapi({"description":"An integer"})')
          // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
        })
        it.concurrent('boolean: description preserved', () => {
          const generated = zodToOpenAPI({ type: 'boolean', description: 'A boolean' })
          expect(generated).toBe('z.boolean().openapi({"description":"A boolean"})')
          // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
        })
      })
    })
  })

  describe('readonly parameter', () => {
    it.concurrent('readonly: array of strings', () => {
      expect(
        zodToOpenAPI({ type: 'array', items: { type: 'string' } }, undefined, {
          readonly: true,
        }),
      ).toBe('z.array(z.string()).readonly()')
      const runtime = z.array(z.string()).readonly()
      expect(runtime.safeParse(['a']).success).toBe(true)
      const result = runtime.safeParse([1])
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [0],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
    it.concurrent('readonly: array of numbers', () => {
      expect(
        zodToOpenAPI({ type: 'array', items: { type: 'number' } }, undefined, {
          readonly: true,
        }),
      ).toBe('z.array(z.number()).readonly()')
      const runtime = z.array(z.number()).readonly()
      expect(runtime.safeParse([1, 2]).success).toBe(true)
      const result = runtime.safeParse(['a'])
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: [0],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
    it.concurrent('readonly: array of $ref', () => {
      const generated = zodToOpenAPI(
        { type: 'array', items: { $ref: '#/components/schemas/Item' } },
        undefined,
        { readonly: true },
      )
      expect(generated).toBe('z.array(ItemSchema).readonly()')
      // skip runtime: generated code references ItemSchema (external identifier)
    })
    it.concurrent('readonly: prefixItems tuple', () => {
      expect(
        zodToOpenAPI(
          {
            type: 'array',
            prefixItems: [{ type: 'string' }, { type: 'number' }],
          },
          undefined,
          { readonly: true },
        ),
      ).toBe(
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]})}}}}).readonly()',
      )
      const runtime = z
        .array(z.unknown())
        .superRefine((arr, ctx) => {
          const Prefix = [z.string(), z.number()]
          for (const [i, Schema] of Prefix.slice(0, arr.length).entries()) {
            const valid = Schema.safeParse(arr[i])
            if (!valid.success) {
              for (const issue of valid.error.issues) {
                ctx.addIssue({ ...issue, path: [i, ...issue.path] })
              }
            }
          }
        })
        .readonly()
      expect(runtime.safeParse(['a', 1]).success).toBe(true)
      const result = runtime.safeParse([1, 'a'])
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [0],
            message: 'Invalid input: expected string, received number',
          },
          {
            expected: 'number',
            code: 'invalid_type',
            path: [1],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
    it.concurrent('readonly: object with required field', () => {
      const generated = zodToOpenAPI(
        {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
        },
        undefined,
        { readonly: true },
      )
      expect(generated).toBe(
        'z.object({name:z.string()}).readonly().openapi({"required":["name"]})',
      )
      // runtime skipped: generated code uses `.openapi(...)` (zod-openapi extension), not callable on bare z
    })
    it.concurrent('readonly: string primitive — readonly omitted', () => {
      expect(zodToOpenAPI({ type: 'string' }, undefined, { readonly: true })).toBe('z.string()')
      const runtime = z.string()
      expect(runtime.safeParse('foo').success).toBe(true)
      const result = runtime.safeParse(1)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
    it.concurrent('readonly: number primitive — readonly omitted', () => {
      expect(zodToOpenAPI({ type: 'number' }, undefined, { readonly: true })).toBe('z.number()')
      const runtime = z.number()
      expect(runtime.safeParse(1).success).toBe(true)
      const result = runtime.safeParse('x')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
    it.concurrent('readonly: boolean primitive — readonly omitted', () => {
      expect(zodToOpenAPI({ type: 'boolean' }, undefined, { readonly: true })).toBe('z.boolean()')
      const runtime = z.boolean()
      expect(runtime.safeParse(true).success).toBe(true)
      const result = runtime.safeParse('x')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'boolean',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected boolean, received string',
          },
        ])
      }
    })
  })

  describe('options.isOptional', () => {
    it.concurrent('passes isOptional to wrap', () => {
      const result = zodToOpenAPI({ type: 'string' }, undefined, { isOptional: true })
      expect(result).toBe('z.string().exactOptional()')
    })

    it.concurrent('isOptional does not affect nested schemas', () => {
      const result = zodToOpenAPI(
        {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
          required: ['name'],
        },
        undefined,
        { isOptional: true },
      )
      expect(result).toBe(
        'z.object({name:z.string()}).exactOptional().openapi({"required":["name"]})',
      )
    })

    it.concurrent('ref with isOptional', () => {
      const result = zodToOpenAPI({ $ref: '#/components/schemas/User' }, undefined, {
        isOptional: true,
      })
      expect(result).toBe('UserSchema.exactOptional()')
    })
  })

  describe('edge cases', () => {
    it.concurrent('empty oneOf returns z.any()', () => {
      expect(zodToOpenAPI({ oneOf: [] })).toBe('z.any()')
    })

    // `decodeURIComponent` would throw a URIError on `%ZZ`; the generator keeps the
    // segment as it is and emits a reference to that name instead.
    it.concurrent('a $ref with malformed percent-encoding does not throw', () => {
      expect(zodToOpenAPI({ $ref: '#/components/schemas/Foo%ZZ' })).toBe('FooZZSchema')
      expect(
        zodToOpenAPI(
          { oneOf: [{ $ref: '#/components/schemas/Foo%ZZ' }, { type: 'string' }] },
          undefined,
          { schemas: { Foo: { type: 'number' } } },
        ),
      ).toBe('z.xor([FooZZSchema,z.string()])')
    })

    it.concurrent('empty anyOf returns z.any()', () => {
      expect(zodToOpenAPI({ anyOf: [] })).toBe('z.any()')
    })

    it.concurrent('const with object value (v3.0: typeless-refine for deep equality)', () => {
      const result = zodToOpenAPI({ const: { key: 'value' } })
      expect(result).toBe(
        'z.unknown().superRefine((val,ctx)=>{if(JSON.stringify({"key":"value"})!==JSON.stringify(val)){ctx.addIssue({code:\'custom\'})}})',
      )
    })

    it.concurrent('const with array value (v3.0: typeless-refine for deep equality)', () => {
      const result = zodToOpenAPI({ const: [1, 2, 3] })
      expect(result).toBe(
        "z.unknown().superRefine((val,ctx)=>{if(JSON.stringify([1,2,3])!==JSON.stringify(val)){ctx.addIssue({code:'custom'})}})",
      )
    })

    it.concurrent('typeless enum with object value falls back to typeless-refine', () => {
      const result = zodToOpenAPI({ enum: [{ key: 'value' }] } as unknown as Schema)
      expect(result).toBe(
        'z.unknown().superRefine((val,ctx)=>{if(![{"key":"value"}].some((e)=>JSON.stringify(e)===JSON.stringify(val))){ctx.addIssue({code:\'custom\'})}})',
      )
    })

    it.concurrent('const with string value', () => {
      expect(zodToOpenAPI({ const: 'hello' })).toBe('z.literal("hello")')
    })

    it.concurrent('const with boolean value', () => {
      expect(zodToOpenAPI({ const: true })).toBe('z.literal(true)')
    })

    it.concurrent('const with null value', () => {
      expect(zodToOpenAPI({ const: null })).toBe('z.literal(null)')
    })

    it.concurrent('array with minItems and maxItems', () => {
      expect(
        zodToOpenAPI({ type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 10 }),
      ).toBe('z.array(z.string()).min(1).max(10)')
    })

    it.concurrent('array with uniqueItems', () => {
      expect(zodToOpenAPI({ type: 'array', items: { type: 'number' }, uniqueItems: true })).toBe(
        'z.array(z.number()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i]});else seen.set(key,i)}})',
      )
    })

    it.concurrent('readonly array with minItems', () => {
      expect(
        zodToOpenAPI({ type: 'array', items: { type: 'string' }, minItems: 1 }, undefined, {
          readonly: true,
        }),
      ).toBe('z.array(z.string()).min(1).readonly()')
    })

    it.concurrent('type null', () => {
      expect(zodToOpenAPI({ type: 'null' })).toBe('z.null().nullable()')
    })
  })

  describe('x-brand', () => {
    it.concurrent('string with format uuid and x-brand', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'uuid', 'x-brand': 'UserId' })).toBe(
        'z.uuid().brand<"UserId">()',
      )
    })

    it.concurrent('number with x-brand', () => {
      expect(zodToOpenAPI({ type: 'number', 'x-brand': 'Price' })).toBe(
        'z.number().brand<"Price">()',
      )
    })

    it.concurrent('integer with x-brand', () => {
      expect(zodToOpenAPI({ type: 'integer', 'x-brand': 'Count' })).toBe('z.int().brand<"Count">()')
    })

    it.concurrent('string with email format, min/max and x-brand', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'email',
          minLength: 5,
          maxLength: 100,
          'x-brand': 'Email',
        }),
      ).toBe('z.email().min(5).max(100).brand<"Email">()')
    })

    it.concurrent('string with x-brand and description (openapi metadata)', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          'x-brand': 'UserId',
          description: 'Unique user identifier',
        }),
      ).toBe('z.string().brand<"UserId">().openapi({"description":"Unique user identifier"})')
    })

    it.concurrent('nullable string with x-brand', () => {
      expect(zodToOpenAPI({ type: 'string', nullable: true, 'x-brand': 'UserId' })).toBe(
        'z.string().nullable().brand<"UserId">()',
      )
    })

    it.concurrent('boolean with x-brand', () => {
      expect(zodToOpenAPI({ type: 'boolean', 'x-brand': 'Flag' })).toBe(
        'z.boolean().brand<"Flag">()',
      )
    })

    it.concurrent('array with x-brand', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'string' },
          'x-brand': 'Tags',
        }),
      ).toBe('z.array(z.string()).brand<"Tags">()')
    })

    it.concurrent('object with x-brand', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            street: { type: 'string' },
            city: { type: 'string' },
          },
          required: ['street', 'city'],
          'x-brand': 'Address',
        }),
      ).toBe(
        'z.object({street:z.string(),city:z.string()}).brand<"Address">().openapi({"required":["street","city"]})',
      )
    })

    it.concurrent('object with x-brand and optional property', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
          },
          required: ['id'],
          'x-brand': 'User',
        }),
      ).toBe(
        'z.object({id:z.string(),name:z.string().exactOptional()}).brand<"User">().openapi({"required":["id"]})',
      )
    })

    it.concurrent('array with minItems and x-brand', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'number' },
          minItems: 1,
          'x-brand': 'Scores',
        }),
      ).toBe('z.array(z.number()).min(1).brand<"Scores">()')
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // user-reported sample schemas — codegen snapshot + runtime
  //       safeParse behavior (path / code / message) paired per case.
  //       JSON Schema 2020-12 spec compliance verified end-to-end.
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 sample #1: prefixItems + unevaluatedItems (Schema rest)', () => {
    // ── codegen ──
    it.concurrent('codegen: superRefine + index-based path', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'boolean' }],
          unevaluatedItems: { type: 'integer' },
        }),
      ).toBe(
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.boolean()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]})}}};const Rest=z.int();for(const [i,val] of arr.slice(Prefix.length).entries()){const result=Rest.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[Prefix.length+i,...issue.path]})}}}})',
      )
    })

    // ── runtime: each test re-defines the Zod schema by hand to mirror codegen ──
    it.concurrent('runtime: empty array PASSES (spec §10.3.1.1: no length constraint)', () => {
      const Schema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const Prefix = [z.string(), z.boolean()]
        for (const [i, PrefixSchema] of Prefix.slice(0, arr.length).entries()) {
          const valid = PrefixSchema.safeParse(arr[i])
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
            }
          }
        }
        const Rest = z.int()
        for (const [i, val] of arr.slice(Prefix.length).entries()) {
          const valid = Rest.safeParse(val)
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [Prefix.length + i, ...issue.path] })
            }
          }
        }
      })
      expect(Schema.safeParse([]).success).toBe(true)
      expect(Schema.safeParse(['a']).success).toBe(true)
      expect(Schema.safeParse(['a', true]).success).toBe(true)
      expect(Schema.safeParse(['a', true, 1, 2]).success).toBe(true)
    })
    it.concurrent('runtime: rest type violation → path[2], invalid_type', () => {
      const Schema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const Prefix = [z.string(), z.boolean()]
        for (const [i, PrefixSchema] of Prefix.slice(0, arr.length).entries()) {
          const valid = PrefixSchema.safeParse(arr[i])
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
            }
          }
        }
        const Rest = z.int()
        for (const [i, val] of arr.slice(Prefix.length).entries()) {
          const valid = Rest.safeParse(val)
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [Prefix.length + i, ...issue.path] })
            }
          }
        }
      })
      const valid = Schema.safeParse(['a', true, 'x'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].path).toStrictEqual([2])
        expect(valid.error.issues[0].code).toBe('invalid_type')
        expect(valid.error.issues[0].message).toBe(
          'Invalid input: expected number, received string',
        )
      }
    })
    it.concurrent('runtime: prefix[0] type violation → full issue toStrictEqual', () => {
      const Schema = z.array(z.unknown()).superRefine((arr, ctx) => {
        const Prefix = [z.string(), z.boolean()]
        for (const [i, PrefixSchema] of Prefix.slice(0, arr.length).entries()) {
          const valid = PrefixSchema.safeParse(arr[i])
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [i, ...issue.path] })
            }
          }
        }
        const Rest = z.int()
        for (const [i, val] of arr.slice(Prefix.length).entries()) {
          const valid = Rest.safeParse(val)
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [Prefix.length + i, ...issue.path] })
            }
          }
        }
      })
      const valid = Schema.safeParse([1, false])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [0],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 sample #2: contains + minContains + maxContains (dynamic message)', () => {
    // Hand-defined schema mirroring codegen output (used by runtime tests below).
    const ContainsSchema = z.array(z.any()).superRefine((arr, ctx) => {
      const Inner = z.int()
      const matched = arr.filter((i) => Inner.safeParse(i).success).length
      if (matched < 2) {
        ctx.addIssue({
          code: 'custom',
          message: `Expected at least 2 matching items, got ${matched}`,
        })
      }
      if (matched > 3) {
        ctx.addIssue({
          code: 'custom',
          message: `Expected at most 3 matching items, got ${matched}`,
        })
      }
    })

    // ── codegen ──
    it.concurrent('codegen: superRefine + dynamic ${matched} message', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          contains: { type: 'integer' },
          minContains: 2,
          maxContains: 3,
        }),
      ).toBe(
        'z.array(z.any()).superRefine((arr,ctx)=>{const Schema=z.int();const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<2){ctx.addIssue({code:"custom"})};if(matched>3){ctx.addIssue({code:"custom"})}})',
      )
    })

    // ── runtime ──
    it.concurrent('runtime: 2 matches PASS', () => {
      expect(ContainsSchema.safeParse([1, 2]).success).toBe(true)
    })
    it.concurrent('runtime: 3 matches (boundary) PASS', () => {
      expect(ContainsSchema.safeParse([1, 2, 3]).success).toBe(true)
    })
    it.concurrent('runtime: 0 matches → "got 0" dynamic message, path:[]', () => {
      const valid = ContainsSchema.safeParse([])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].path).toStrictEqual([])
        expect(valid.error.issues[0].message).toBe('Expected at least 2 matching items, got 0')
      }
    })
    it.concurrent('runtime: 1 match → "got 1" dynamic message', () => {
      const valid = ContainsSchema.safeParse([1, 'x'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].message).toBe('Expected at least 2 matching items, got 1')
      }
    })
    it.concurrent('runtime: 4 matches → "got 4" max violation', () => {
      const valid = ContainsSchema.safeParse([1, 2, 3, 4])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].message).toBe('Expected at most 3 matching items, got 4')
      }
    })
    it.concurrent('runtime: matches counted ignoring non-integer items', () => {
      // 2 ints + 1 string = matched=2, satisfies minContains
      expect(ContainsSchema.safeParse([1, 'x', 2]).success).toBe(true)
    })
  })

  describe('v3.2 sample #3: patternProperties (multiple patterns, superRefine)', () => {
    const PatternPropsSchema = z
      .looseObject({})
      .superRefine((o, ctx) => {
        const regex = /^S:/u
        const Inner = z.string()
        for (const [k, val] of Object.entries(o)) {
          // oxlint-disable-next-line typescript/prefer-string-starts-ends-with -- mirrors the emitted code verbatim
          if (!regex.test(k)) continue
          const valid = Inner.safeParse(val)
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [k, ...issue.path] })
            }
          }
        }
      })
      .superRefine((o, ctx) => {
        const regex = /^I:/u
        const Inner = z.int()
        for (const [k, val] of Object.entries(o)) {
          // oxlint-disable-next-line typescript/prefer-string-starts-ends-with -- mirrors the emitted code verbatim
          if (!regex.test(k)) continue
          const valid = Inner.safeParse(val)
          if (!valid.success) {
            for (const issue of valid.error.issues) {
              ctx.addIssue({ ...issue, path: [k, ...issue.path] })
            }
          }
        }
      })

    it.concurrent('codegen: superRefine per pattern, closure-captured regex', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          patternProperties: {
            '^S:': { type: 'string' },
            '^I:': { type: 'integer' },
          },
        }),
      ).toBe(
        'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^S:");const Schema=z.string();for(const [k,val] of Object.entries(o)){if(!regex.test(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]})}}}}).superRefine((o,ctx)=>{const regex=new RegExp("^I:");const Schema=z.int();for(const [k,val] of Object.entries(o)){if(!regex.test(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]})}}}}).openapi({...{patternProperties:{"^S:":{"type":"string"},"^I:":{"type":"integer"}}}})',
      )
    })

    it.concurrent('runtime: empty object PASSES', () => {
      expect(PatternPropsSchema.safeParse({}).success).toBe(true)
    })
    it.concurrent('runtime: pattern matches with correct types PASS', () => {
      expect(PatternPropsSchema.safeParse({ 'S:a': 'x', 'I:b': 1 }).success).toBe(true)
    })
    it.concurrent('runtime: ^S: with number → full issue toStrictEqual', () => {
      const valid = PatternPropsSchema.safeParse({ 'S:a': 1 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['S:a'],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
    it.concurrent('runtime: pattern non-match keys are silently allowed', () => {
      expect(PatternPropsSchema.safeParse({ other: 'anything' }).success).toBe(true)
    })
    it.concurrent('runtime: multiple violations → full issues array toStrictEqual', () => {
      const valid = PatternPropsSchema.safeParse({ 'S:a': 1, 'I:b': 'x' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['S:a'],
            message: 'Invalid input: expected string, received number',
          },
          {
            expected: 'number',
            code: 'invalid_type',
            path: ['I:b'],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
  })

  describe('v3.2 sample #4: writeOnly (OAS metadata, no parse impact)', () => {
    // writeOnly is OAS-only metadata; the Zod runtime is identical to a plain
    // optional string. .openapi({writeOnly:true}) is omitted in this hand
    // definition because it requires extendZod() which is not loaded here.
    const WriteOnlySchema = z.object({
      name: z.string().exactOptional(),
      password: z.string().exactOptional(),
    })

    it.concurrent('codegen: writeOnly survives via .openapi({writeOnly:true})', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            name: { type: 'string' },
            password: { type: 'string', writeOnly: true },
          },
        }),
      ).toBe(
        'z.object({name:z.string().exactOptional(),password:z.string().exactOptional().openapi({"writeOnly":true})}).openapi({"required":[]})',
      )
    })

    it.concurrent('runtime: empty object PASSES (both fields optional)', () => {
      expect(WriteOnlySchema.safeParse({}).success).toBe(true)
    })
    it.concurrent('runtime: password-only PASSES (writeOnly does NOT enforce write-only at parse)', () => {
      expect(WriteOnlySchema.safeParse({ password: 'p' }).success).toBe(true)
    })
    it.concurrent('runtime: full object PASSES', () => {
      expect(WriteOnlySchema.safeParse({ name: 'a', password: 'p' }).success).toBe(true)
    })
  })

  describe('v3.2 sample #5: contentEncoding base64 + contentMediaType image/png (binary)', () => {
    const ImageSchema = z.object({
      image: z
        .base64()
        .transform((b64) => Uint8Array.from(atob(b64), (char) => char.charCodeAt(0)))
        .exactOptional(),
    })

    it.concurrent('codegen: binary MIME emits Uint8Array.from(atob) — NOT toString("utf8")', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            image: {
              type: 'string',
              contentEncoding: 'base64',
              contentMediaType: 'image/png',
            },
          },
        }),
      ).toBe(
        'z.object({image:z.base64().transform((val)=>Uint8Array.from(atob(val),(char)=>char.charCodeAt(0))).exactOptional()}).openapi({"required":[]})',
      )
    })

    it.concurrent('runtime: PNG magic bytes round-trip preserved (no UTF-8 corruption)', () => {
      const pngBytes = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
      const b64 = Buffer.from(pngBytes).toString('base64')
      const valid = ImageSchema.safeParse({ image: b64 })
      expect(valid.success).toBe(true)
      if (valid.success) {
        const decoded = (valid.data as { image: Uint8Array }).image
        expect(decoded).toBeInstanceOf(Uint8Array)
        expect([...decoded]).toStrictEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
      }
    })
    it.concurrent('runtime: missing image key PASSES (exactOptional)', () => {
      expect(ImageSchema.safeParse({}).success).toBe(true)
    })
  })

  describe('v3.2 sample #7: contentSchema + JSON (nested validation via .pipe)', () => {
    const ContentSchemaSchema = z.object({
      style: z
        .base64()
        .transform((b64, ctx) => {
          try {
            return JSON.parse(
              new TextDecoder().decode(Uint8Array.from(atob(b64), (char) => char.charCodeAt(0))),
            )
          } catch (error) {
            ctx.addIssue({
              code: 'custom',
              message: `invalid base64-json: ${error instanceof Error ? error.message : String(error)}`,
            })
            return z.NEVER
          }
        })
        .pipe(z.object({ name: z.string().exactOptional() }))
        .exactOptional(),
    })

    it.concurrent('codegen: JSON parse guarded by ctx.addIssue, piped to inner schema', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            style: {
              type: 'string',
              contentEncoding: 'base64',
              contentMediaType: 'application/json',
              contentSchema: {
                type: 'object',
                properties: { name: { type: 'string' } },
              },
            },
          },
        }),
      ).toBe(
        'z.object({style:z.base64().transform((val,ctx)=>{try{return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(val),(char)=>char.charCodeAt(0))))}catch(err){ctx.addIssue({code:"custom",params:{cause:err instanceof Error?err.message:String(err)}});return z.NEVER}}).pipe(z.object({name:z.string().exactOptional()}).openapi({"required":[]})).exactOptional()}).openapi({"required":[]})',
      )
    })

    it.concurrent('runtime: valid base64-encoded JSON PASSES', () => {
      const b64 = Buffer.from(JSON.stringify({ name: 'taro' })).toString('base64')
      expect(ContentSchemaSchema.safeParse({ style: b64 }).success).toBe(true)
    })
    it.concurrent('runtime: invalid JSON inside b64 → no uncaught throw, path:["style"]', () => {
      const b64 = Buffer.from('not-json').toString('base64')
      let threw = false
      let result: { success: boolean; path?: PropertyKey[]; code?: string; message?: string } = {
        success: true,
      }
      try {
        const valid = ContentSchemaSchema.safeParse({ style: b64 })
        result = valid.success
          ? { success: true }
          : {
              success: false,
              path: valid.error.issues[0].path,
              code: valid.error.issues[0].code,
              message: valid.error.issues[0].message,
            }
      } catch {
        threw = true
      }
      expect(threw).toBe(false)
      expect(result).toStrictEqual({
        success: false,
        path: ['style'],
        code: 'custom',
        message: 'invalid base64-json: Unexpected token \'o\', "not-json" is not valid JSON',
      })
    })
    it.concurrent('runtime: garbage non-base64 → full issue toStrictEqual (invalid_format)', () => {
      const valid = ContentSchemaSchema.safeParse({ style: '!!!not-b64!!!' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        // .transform's pre-validation drops origin/pattern from the inner
        // base64 issue but preserves code/format/message/path.
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'base64',
            path: ['style'],
            message: 'Invalid base64-encoded string',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // refine vs superRefine usage discriminator probes
  //       (path-based superRefine wins, count-only refine wins)
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 superRefine demo: uniqueItems (per-duplicate path)', () => {
    const UniqueItemsSchema = z.array(z.string()).superRefine((items, ctx) => {
      const seen = new Map<string, number>()
      for (const [i, val] of items.entries()) {
        const key = JSON.stringify(val)
        if (seen.has(key)) {
          ctx.addIssue({
            code: 'custom',
            path: [i],
            message: `Duplicate of index ${seen.get(key)}`,
          })
        } else seen.set(key, i)
      }
    })

    it.concurrent('codegen: superRefine with Map-based duplicate index tracking', () => {
      expect(zodToOpenAPI({ type: 'array', items: { type: 'string' }, uniqueItems: true })).toBe(
        'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i]});else seen.set(key,i)}})',
      )
    })
    it.concurrent('runtime: unique array PASS', () => {
      expect(UniqueItemsSchema.safeParse(['a', 'b', 'c']).success).toBe(true)
    })
    it.concurrent('runtime: duplicate at index 2 → path:[2], dynamic msg "of index 0"', () => {
      const valid = UniqueItemsSchema.safeParse(['a', 'b', 'a'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].path).toStrictEqual([2])
        expect(valid.error.issues[0].message).toBe('Duplicate of index 0')
      }
    })
    it.concurrent('runtime: multiple duplicates each get their own issue', () => {
      const valid = UniqueItemsSchema.safeParse(['a', 'b', 'a', 'c', 'b'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        const paths = valid.error.issues.map((i) => i.path)
        expect(paths).toStrictEqual([[2], [4]])
        const messages = valid.error.issues.map((i) => i.message)
        expect(messages).toStrictEqual(['Duplicate of index 0', 'Duplicate of index 1'])
      }
    })
  })

  describe('v3.2 superRefine demo: propertyNames (per-violating-key path)', () => {
    const PropertyNamesSchema = z.looseObject({}).superRefine((o, ctx) => {
      const regex = /^[a-z]+$/u
      for (const k of Object.keys(o)) {
        if (!regex.test(k)) {
          ctx.addIssue({
            code: 'custom',
            path: [k],
            message: `Property name '${k}' does not match pattern ^[a-z]+$`,
          })
        }
      }
    })

    it.concurrent('codegen: superRefine with key-level path injection', () => {
      expect(zodToOpenAPI({ type: 'object', propertyNames: { pattern: '^[a-z]+$' } })).toBe(
        'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^[a-z]+$");for(const k of Object.keys(o)){if(!regex.test(k)){ctx.addIssue({code:"custom",path:[k]})}}})',
      )
    })
    it.concurrent('runtime: all-lowercase keys PASS', () => {
      expect(PropertyNamesSchema.safeParse({ a: 1, b: 2 }).success).toBe(true)
    })
    it.concurrent('runtime: mixed-case key → path:["BadKey"], dynamic message', () => {
      const valid = PropertyNamesSchema.safeParse({ valid: 1, BadKey: 2 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toHaveLength(1)
        expect(valid.error.issues[0].path).toStrictEqual(['BadKey'])
        expect(valid.error.issues[0].message).toBe(
          "Property name 'BadKey' does not match pattern ^[a-z]+$",
        )
      }
    })
  })

  describe('v3.2 refine demo: minProperties / maxProperties (path-free, slot-driven)', () => {
    // Why refine, not superRefine:
    //   - path is necessarily [] (object-cardinality, no per-element location)
    //   - threshold is static (schema-defined, no runtime-only value to embed)
    //   - x-min/maxProperties-message slot already overrides for i18n
    //   - 1 issue is sufficient (min and max cannot fail simultaneously)
    // additionalProperties: true → looseObject so extra keys survive.
    const MinMaxPropsSchema = z
      .looseObject({ a: z.string().exactOptional() })
      .refine((o) => Object.keys(o).length >= 3, { error: '最低3つのプロパティが必要です' })
      .refine((o) => Object.keys(o).length <= 10, { error: '最大10つまでです' })

    it.concurrent('codegen: two refines (min + max) with x-* slot overrides', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          additionalProperties: true,
          minProperties: 3,
          maxProperties: 10,
          'x-minProperties-message': '最低3つのプロパティが必要です',
          'x-maxProperties-message': '最大10つまでです',
          properties: { a: { type: 'string' } },
        }),
      ).toBe(
        'z.looseObject({a:z.string().exactOptional()}).refine((val)=>Object.keys(val).length>=3,{error:"最低3つのプロパティが必要です"}).refine((val)=>Object.keys(val).length<=10,{error:"最大10つまでです"}).openapi({"required":[]})',
      )
    })
    it.concurrent('runtime: 1 property → min violation, custom message reflected', () => {
      const valid = MinMaxPropsSchema.safeParse({ a: 'x' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].path).toStrictEqual([])
        expect(valid.error.issues[0].message).toBe('最低3つのプロパティが必要です')
      }
    })
    it.concurrent('runtime: 11 properties → max violation, custom message reflected', () => {
      const valid = MinMaxPropsSchema.safeParse({
        a: '1',
        b: '2',
        c: '3',
        d: '4',
        e: '5',
        f: '6',
        g: '7',
        h: '8',
        i: '9',
        j: '10',
        k: '11',
      })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].message).toBe('最大10つまでです')
      }
    })
    it.concurrent('runtime: 5 properties (within bounds) PASSES', () => {
      expect(MinMaxPropsSchema.safeParse({ a: '1', b: '2', c: '3', d: '4', e: '5' }).success).toBe(
        true,
      )
    })
  })

  // An optional property is `.exactOptional()`, which fails the `safeParse(undefined)` probe
  // the document derives `required` from: an object that omits `required` states
  // `required: []`. A schema-valued additionalProperties was left out of that, so its
  // optional properties were documented as required.
  describe('required omitted beside a schema-valued additionalProperties', () => {
    it.concurrent('catchall: states required: []', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { name: { type: 'string' } },
          additionalProperties: { type: 'string' },
        }),
      ).toBe(
        'z.object({name:z.string().exactOptional()}).catchall(z.string()).openapi({"required":[]})',
      )
    })

    it.concurrent('beside patternProperties: states required: [] too', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { name: { type: 'string' } },
          patternProperties: { '^x-': { type: 'integer' } },
          additionalProperties: { type: 'string' },
        }),
      ).toBe(
        'z.looseObject({name:z.string().exactOptional()}).superRefine((o,ctx)=>{const Schema=z.string();for(const [k,val] of Object.entries(o)){if(!["name"].includes(k)&&!["^x-"].some((p)=>new RegExp(p).test(k))){const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]})}}}}}).superRefine((o,ctx)=>{const regex=new RegExp("^x-");const Schema=z.int();for(const [k,val] of Object.entries(o)){if(!regex.test(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]})}}}}).openapi({...{patternProperties:{"^x-":{"type":"integer"}}},additionalProperties:{"type":"string"},"required":[]})',
      )
    })

    it.concurrent('a required list the source has is kept as it is', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          required: ['name'],
          properties: { name: { type: 'string' }, age: { type: 'integer' } },
          additionalProperties: { type: 'string' },
        }),
      ).toBe(
        'z.object({name:z.string(),age:z.int().exactOptional()}).catchall(z.string()).openapi({"required":["name"]})',
      )
    })

    it.concurrent('no properties: a record states nothing', () => {
      expect(zodToOpenAPI({ type: 'object', additionalProperties: { type: 'string' } })).toBe(
        'z.record(z.string(),z.string())',
      )
    })
  })

  describe('v3.2 refine vs superRefine summary (full codegen toBe)', () => {
    // Documents the API choice for each constraint family with full codegen
    // string toBe completeness (not includes-substring). Each it() pins the
    // exact emitted Zod chain — any drift from the intended API surfaces here.
    it.concurrent('refine: minProperties emits .refine without superRefine', () => {
      expect(zodToOpenAPI({ type: 'object', minProperties: 1 })).toBe(
        'z.looseObject({}).refine((val)=>Object.keys(val).length>=1)',
      )
    })
    it.concurrent('superRefine: uniqueItems emits .superRefine with seen Map', () => {
      expect(zodToOpenAPI({ type: 'array', items: { type: 'string' }, uniqueItems: true })).toBe(
        'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i]});else seen.set(key,i)}})',
      )
    })
    it.concurrent('superRefine: contains emits .superRefine with matched count', () => {
      expect(zodToOpenAPI({ type: 'array', contains: { type: 'integer' }, minContains: 1 })).toBe(
        'z.array(z.any()).superRefine((arr,ctx)=>{const Schema=z.int();const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<1){ctx.addIssue({code:"custom"})}})',
      )
    })
    it.concurrent('superRefine: patternProperties emits .superRefine with key-path', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          patternProperties: { '^x_': { type: 'string' } },
        }),
      ).toBe(
        'z.looseObject({}).superRefine((o,ctx)=>{const regex=new RegExp("^x_");const Schema=z.string();for(const [k,val] of Object.entries(o)){if(!regex.test(k)){continue}const result=Schema.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[k,...issue.path]})}}}}).openapi({...{patternProperties:{"^x_":{"type":"string"}}}})',
      )
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // string format codegen + runtime pairs
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 string format: email', () => {
    it.concurrent('codegen: z.email()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'email' })).toBe('z.email()')
    })
    it.concurrent('runtime: "taro@example.com" PASSES', () => {
      expect(z.email().safeParse('taro@example.com').success).toBe(true)
    })
    it.concurrent('runtime: "not-an-email" FAILS', () => {
      const result = z.email().safeParse('not-an-email')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'email',
            pattern:
              "/^(?:[A-Za-z0-9_'+\\-]+\\.)*[A-Za-z0-9_'+\\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
            path: [],
            message: 'Invalid email address',
          },
        ])
      }
    })
  })

  describe('v3.2 string format: uuid', () => {
    it.concurrent('codegen: z.uuid()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'uuid' })).toBe('z.uuid()')
    })
    it.concurrent('runtime: valid uuid PASSES', () => {
      expect(z.uuid().safeParse('123e4567-e89b-12d3-a456-426614174000').success).toBe(true)
    })
    it.concurrent('runtime: non-uuid FAILS', () => {
      const result = z.uuid().safeParse('abc')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'uuid',
            pattern:
              '/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/',
            path: [],
            message: 'Invalid UUID',
          },
        ])
      }
    })
  })

  describe('v3.2 string format: date-time (ISO 8601)', () => {
    it.concurrent('codegen: z.iso.datetime({offset:true})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date-time' })).toBe(
        'z.iso.datetime({offset:true})',
      )
    })
    it.concurrent('codegen: x-isoOffset: false → z.iso.datetime()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date-time', 'x-isoOffset': false })).toBe(
        'z.iso.datetime()',
      )
    })
    it.concurrent('runtime: "2026-05-12T10:30:00Z" PASSES', () => {
      expect(z.iso.datetime({ offset: true }).safeParse('2026-05-12T10:30:00Z').success).toBe(true)
    })
    it.concurrent('runtime: "2026-05-12T10:30:00+09:00" PASSES (RFC 3339 offset)', () => {
      expect(z.iso.datetime({ offset: true }).safeParse('2026-05-12T10:30:00+09:00').success).toBe(
        true,
      )
    })
    it.concurrent('runtime: "2026/05/12" FAILS (not ISO)', () => {
      const result = z.iso.datetime({ offset: true }).safeParse('2026/05/12')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'datetime',
            pattern:
              '/^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d)))$/',
            path: [],
            message: 'Invalid ISO datetime',
          },
        ])
      }
    })
  })

  describe('v3.2 string format: date', () => {
    it.concurrent('codegen: z.iso.date()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date' })).toBe('z.iso.date()')
    })
    it.concurrent('runtime: "2026-05-12" PASSES', () => {
      expect(z.iso.date().safeParse('2026-05-12').success).toBe(true)
    })
    it.concurrent('runtime: "2026-13-01" FAILS (invalid month)', () => {
      const result = z.iso.date().safeParse('2026-13-01')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'date',
            pattern:
              '/^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$/',
            path: [],
            message: 'Invalid ISO date',
          },
        ])
      }
    })
  })

  describe('v3.2 string format: ipv4', () => {
    it.concurrent('codegen: z.ipv4()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'ipv4' })).toBe('z.ipv4()')
    })
    it.concurrent('runtime: "192.168.0.1" PASSES', () => {
      expect(z.ipv4().safeParse('192.168.0.1').success).toBe(true)
    })
    it.concurrent('runtime: "999.999.999.999" FAILS', () => {
      const result = z.ipv4().safeParse('999.999.999.999')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'ipv4',
            pattern:
              '/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/',
            path: [],
            message: 'Invalid IPv4 address',
          },
        ])
      }
    })
  })

  describe('v3.2 string format: url', () => {
    it.concurrent('codegen: z.url()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'url' })).toBe('z.url()')
    })
    it.concurrent('runtime: "https://example.com" PASSES', () => {
      expect(z.url().safeParse('https://example.com').success).toBe(true)
    })
    it.concurrent('runtime: "not a url" FAILS', () => {
      const result = z.url().safeParse('not a url')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'url',
            path: [],
            message: 'Invalid URL',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // string length / pattern codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 string: minLength + maxLength', () => {
    it.concurrent('codegen: z.string().min(3).max(10)', () => {
      expect(zodToOpenAPI({ type: 'string', minLength: 3, maxLength: 10 })).toBe(
        'z.string().min(3).max(10)',
      )
    })
    it.concurrent('runtime: "abc" (boundary low) PASSES', () => {
      expect(z.string().min(3).max(10).safeParse('abc').success).toBe(true)
    })
    it.concurrent('runtime: "1234567890" (boundary high) PASSES', () => {
      expect(z.string().min(3).max(10).safeParse('1234567890').success).toBe(true)
    })
    it.concurrent('runtime: "ab" (too short) → full issue toStrictEqual', () => {
      const valid = z.string().min(3).max(10).safeParse('ab')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_small',
            minimum: 3,
            inclusive: true,
            path: [],
            message: 'Too small: expected string to have >=3 characters',
          },
        ])
      }
    })
    it.concurrent('runtime: "12345678901" (too long) → full issue toStrictEqual', () => {
      const valid = z.string().min(3).max(10).safeParse('12345678901')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_big',
            maximum: 10,
            inclusive: true,
            path: [],
            message: 'Too big: expected string to have <=10 characters',
          },
        ])
      }
    })
  })

  describe('v3.2 string: pattern (regex)', () => {
    it.concurrent('codegen: z.string().regex(/^[A-Z]{3}-\\d{3}$/)', () => {
      expect(zodToOpenAPI({ type: 'string', pattern: '^[A-Z]{3}-\\d{3}$' })).toBe(
        'z.string().regex(/^[A-Z]{3}-\\d{3}$/)',
      )
    })
    it.concurrent('runtime: "ABC-123" PASSES', () => {
      expect(
        z
          .string()
          // oxlint-disable-next-line require-unicode-regexp -- mirrors the regex literal the generator emits
          .regex(/^[A-Z]{3}-\d{3}$/)
          .safeParse('ABC-123').success,
      ).toBe(true)
    })
    it.concurrent('runtime: "abc-123" FAILS (lowercase)', () => {
      expect(
        z
          .string()
          // oxlint-disable-next-line require-unicode-regexp -- mirrors the regex literal the generator emits
          .regex(/^[A-Z]{3}-\d{3}$/)
          .safeParse('abc-123').success,
      ).toBe(false)
    })
  })

  describe('v3.2 string: fixed length (minLength == maxLength)', () => {
    it.concurrent('codegen: z.string().length(5)', () => {
      expect(zodToOpenAPI({ type: 'string', minLength: 5, maxLength: 5 })).toBe(
        'z.string().length(5)',
      )
    })
    it.concurrent('runtime: "12345" PASSES', () => {
      expect(z.string().length(5).safeParse('12345').success).toBe(true)
    })
    it.concurrent('runtime: "1234" FAILS (too short)', () => {
      const result = z.string().length(5).safeParse('1234')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_small',
            minimum: 5,
            inclusive: true,
            exact: true,
            path: [],
            message: 'Too small: expected string to have exactly 5 characters',
          },
        ])
      }
    })
    it.concurrent('runtime: "123456" FAILS (too long)', () => {
      const result = z.string().length(5).safeParse('123456')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_big',
            maximum: 5,
            inclusive: true,
            exact: true,
            path: [],
            message: 'Too big: expected string to have exactly 5 characters',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // number constraints codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 number: minimum + maximum', () => {
    it.concurrent('codegen: z.number().min(0).max(100)', () => {
      expect(zodToOpenAPI({ type: 'number', minimum: 0, maximum: 100 })).toBe(
        'z.number().min(0).max(100)',
      )
    })
    it.concurrent('runtime: 50 PASSES', () => {
      expect(z.number().min(0).max(100).safeParse(50).success).toBe(true)
    })
    it.concurrent('runtime: 0 (boundary) PASSES', () => {
      expect(z.number().min(0).max(100).safeParse(0).success).toBe(true)
    })
    it.concurrent('runtime: 100 (boundary) PASSES', () => {
      expect(z.number().min(0).max(100).safeParse(100).success).toBe(true)
    })
    it.concurrent('runtime: -1 FAILS', () => {
      const result = z.number().min(0).max(100).safeParse(-1)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'number',
            code: 'too_small',
            minimum: 0,
            inclusive: true,
            path: [],
            message: 'Too small: expected number to be >=0',
          },
        ])
      }
    })
    it.concurrent('runtime: 101 FAILS', () => {
      const result = z.number().min(0).max(100).safeParse(101)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'number',
            code: 'too_big',
            maximum: 100,
            inclusive: true,
            path: [],
            message: 'Too big: expected number to be <=100',
          },
        ])
      }
    })
  })

  describe('v3.2 number: multipleOf', () => {
    it.concurrent('codegen: z.number().multipleOf(0.5)', () => {
      expect(zodToOpenAPI({ type: 'number', multipleOf: 0.5 })).toBe('z.number().multipleOf(0.5)')
    })
    it.concurrent('runtime: 1.5 PASSES', () => {
      expect(z.number().multipleOf(0.5).safeParse(1.5).success).toBe(true)
    })
    it.concurrent('runtime: 1.3 FAILS', () => {
      const result = z.number().multipleOf(0.5).safeParse(1.3)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'number',
            code: 'not_multiple_of',
            divisor: 0.5,
            path: [],
            message: 'Invalid number: must be a multiple of 0.5',
          },
        ])
      }
    })
  })

  describe('v3.2 integer: exclusiveMinimum (number form, JSON Schema 2020-12)', () => {
    it.concurrent('codegen: z.int().gt(0)', () => {
      expect(zodToOpenAPI({ type: 'integer', exclusiveMinimum: 0 })).toBe('z.int().gt(0)')
    })
    it.concurrent('runtime: 1 PASSES', () => {
      expect(z.int().gt(0).safeParse(1).success).toBe(true)
    })
    it.concurrent('runtime: 0 FAILS (exclusive)', () => {
      const result = z.int().gt(0).safeParse(0)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            origin: 'number',
            code: 'too_small',
            minimum: 0,
            inclusive: false,
            path: [],
            message: 'Too small: expected number to be >0',
          },
        ])
      }
    })
    it.concurrent('runtime: 1.5 FAILS (not integer)', () => {
      const result = z.int().gt(0).safeParse(1.5)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'int',
            format: 'safeint',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected int, received number',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // enum / const codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 enum: string enum', () => {
    it.concurrent('codegen: z.enum(["red","green","blue"])', () => {
      expect(zodToOpenAPI({ type: 'string', enum: ['red', 'green', 'blue'] })).toBe(
        'z.enum(["red","green","blue"])',
      )
    })
    it.concurrent('runtime: "red" PASSES', () => {
      expect(z.enum(['red', 'green', 'blue']).safeParse('red').success).toBe(true)
    })
    it.concurrent('runtime: "yellow" FAILS', () => {
      const result = z.enum(['red', 'green', 'blue']).safeParse('yellow')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            code: 'invalid_value',
            values: ['red', 'green', 'blue'],
            path: [],
            message: 'Invalid option: expected one of "red"|"green"|"blue"',
          },
        ])
      }
    })
  })

  describe('v3.2 const: literal value', () => {
    it.concurrent('codegen: z.literal("fixed")', () => {
      expect(zodToOpenAPI({ const: 'fixed' })).toBe('z.literal("fixed")')
    })
    it.concurrent('runtime: "fixed" PASSES', () => {
      expect(z.literal('fixed').safeParse('fixed').success).toBe(true)
    })
    it.concurrent('runtime: "other" FAILS', () => {
      const result = z.literal('fixed').safeParse('other')
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            code: 'invalid_value',
            values: ['fixed'],
            path: [],
            message: 'Invalid input: expected "fixed"',
          },
        ])
      }
    })
  })

  describe('v3.2 const: numeric literal', () => {
    it.concurrent('codegen: z.literal(42)', () => {
      expect(zodToOpenAPI({ const: 42 })).toBe('z.literal(42)')
    })
    it.concurrent('runtime: 42 PASSES', () => {
      expect(z.literal(42).safeParse(42).success).toBe(true)
    })
    it.concurrent('runtime: 43 FAILS', () => {
      const result = z.literal(42).safeParse(43)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            code: 'invalid_value',
            values: [42],
            path: [],
            message: 'Invalid input: expected 42',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // allOf / anyOf / oneOf codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 allOf: intersection of two object schemas', () => {
    const AllOfSchema = z.object({ a: z.string() }).and(z.object({ b: z.number() }))

    it.concurrent('codegen: .and() chain with required metadata', () => {
      expect(
        zodToOpenAPI({
          allOf: [
            { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
            { type: 'object', properties: { b: { type: 'number' } }, required: ['b'] },
          ],
        }),
      ).toBe(
        'z.object({a:z.string()}).openapi({"required":["a"]}).and(z.object({b:z.number()}).openapi({"required":["b"]}))',
      )
    })
    it.concurrent('runtime: {a:"x", b:1} PASSES', () => {
      expect(AllOfSchema.safeParse({ a: 'x', b: 1 }).success).toBe(true)
    })
    it.concurrent('runtime: {a:"x"} FAILS (b missing)', () => {
      const result = AllOfSchema.safeParse({ a: 'x' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: ['b'],
            message: 'Invalid input: expected number, received undefined',
          },
        ])
      }
    })
    it.concurrent('runtime: {b:1} FAILS (a missing)', () => {
      const result = AllOfSchema.safeParse({ b: 1 })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['a'],
            message: 'Invalid input: expected string, received undefined',
          },
        ])
      }
    })
  })

  describe('v3.2 anyOf: union of string or number', () => {
    const AnyOfSchema = z.union([z.string(), z.number()])

    it.concurrent('codegen: z.union([z.string(), z.number()])', () => {
      expect(zodToOpenAPI({ anyOf: [{ type: 'string' }, { type: 'number' }] })).toBe(
        'z.union([z.string(),z.number()])',
      )
    })
    it.concurrent('runtime: "x" PASSES', () => {
      expect(AnyOfSchema.safeParse('x').success).toBe(true)
    })
    it.concurrent('runtime: 1 PASSES', () => {
      expect(AnyOfSchema.safeParse(1).success).toBe(true)
    })
    it.concurrent('runtime: true FAILS (neither string nor number)', () => {
      const result = AnyOfSchema.safeParse(true)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [
              [
                {
                  expected: 'string',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected string, received boolean',
                },
              ],
              [
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received boolean',
                },
              ],
            ],
            path: [],
            message: 'Invalid input',
          },
        ])
      }
    })
  })

  describe('v3.2 oneOf: discriminatedUnion via discriminator', () => {
    const OneOfSchema = z.discriminatedUnion('kind', [
      z.object({ kind: z.literal('cat'), meow: z.boolean() }),
      z.object({ kind: z.literal('dog'), bark: z.boolean() }),
    ])

    it.concurrent('codegen: z.discriminatedUnion("kind", [...]) with metadata', () => {
      expect(
        zodToOpenAPI({
          oneOf: [
            {
              type: 'object',
              properties: { kind: { const: 'cat' }, meow: { type: 'boolean' } },
              required: ['kind', 'meow'],
            },
            {
              type: 'object',
              properties: { kind: { const: 'dog' }, bark: { type: 'boolean' } },
              required: ['kind', 'bark'],
            },
          ],
          discriminator: { propertyName: 'kind' },
        }),
      ).toBe(
        'z.discriminatedUnion(\'kind\',[z.object({kind:z.literal("cat"),meow:z.boolean()}).openapi({"required":["kind","meow"]}),z.object({kind:z.literal("dog"),bark:z.boolean()}).openapi({"required":["kind","bark"]})]).openapi({"discriminator":{"propertyName":"kind"}})',
      )
    })
    it.concurrent('runtime: {kind:"cat", meow:true} PASSES', () => {
      expect(OneOfSchema.safeParse({ kind: 'cat', meow: true }).success).toBe(true)
    })
    it.concurrent('runtime: {kind:"dog", bark:true} PASSES', () => {
      expect(OneOfSchema.safeParse({ kind: 'dog', bark: true }).success).toBe(true)
    })
    it.concurrent('runtime: {kind:"cat", bark:true} FAILS (wrong shape for cat)', () => {
      const result = OneOfSchema.safeParse({ kind: 'cat', bark: true })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'boolean',
            code: 'invalid_type',
            path: ['meow'],
            message: 'Invalid input: expected boolean, received undefined',
          },
        ])
      }
    })
    it.concurrent('runtime: {kind:"fish"} FAILS (unknown discriminator)', () => {
      const result = OneOfSchema.safeParse({ kind: 'fish' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [],
            note: 'No matching discriminator',
            discriminator: 'kind',
            options: ['cat', 'dog'],
            path: ['kind'],
            message: "Invalid discriminator value. Expected 'cat' | 'dog'",
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // Japanese-language mirror of the preceding allOf / anyOf / oneOf section. Codegen is pinned
  // by exact string match; each runtime case declares an equivalent Zod schema and safeParses it.
  // ────────────────────────────────────────────────────────────────────

  describe('v3.2 allOf — すべてのサブデータモデル条件を同時に満たす必要がある (JSON Schema §10.2.1.1)', () => {
    it.concurrent('コード生成: 各サブスキーマを `.and()` で連結する', () => {
      expect(
        zodToOpenAPI({
          allOf: [
            { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
            { type: 'object', properties: { age: { type: 'integer' } }, required: ['age'] },
          ],
        }),
      ).toBe(
        'z.object({name:z.string()}).openapi({"required":["name"]}).and(z.object({age:z.int()}).openapi({"required":["age"]}))',
      )
    })
    it.concurrent('実行時: 全サブスキーマを満たす入力は受理される', () => {
      const AllOfSchema = z.object({ name: z.string() }).and(z.object({ age: z.int() }))
      expect(AllOfSchema.safeParse({ name: 'foo', age: 30 }).success).toBe(true)
    })
    it.concurrent('実行時: いずれかのサブスキーマで required を欠く入力は弾かれる', () => {
      const AllOfSchema = z.object({ name: z.string() }).and(z.object({ age: z.int() }))
      const r1 = AllOfSchema.safeParse({ name: 'foo' })
      expect(r1.success).toBe(false)
      if (!r1.success) {
        expect(r1.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: ['age'],
            message: 'Invalid input: expected number, received undefined',
          },
        ])
      }
      const r2 = AllOfSchema.safeParse({ age: 30 })
      expect(r2.success).toBe(false)
      if (!r2.success) {
        expect(r2.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['name'],
            message: 'Invalid input: expected string, received undefined',
          },
        ])
      }
    })
    it.concurrent('実行時: いずれかのサブスキーマと型が矛盾する入力は弾かれる', () => {
      const AllOfSchema = z.object({ name: z.string() }).and(z.object({ age: z.int() }))
      const result = AllOfSchema.safeParse({ name: 'foo', age: 'bar' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: ['age'],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
    it.concurrent('コード生成: 空の allOf は z.any() に縮退する', () => {
      expect(zodToOpenAPI({ allOf: [] })).toBe('z.any()')
    })
  })

  describe('v3.2 anyOf — いずれか1つ以上のサブデータモデル条件を満たせばよい (JSON Schema §10.2.1.2)', () => {
    it.concurrent('コード生成: z.union([...]) で全サブスキーマを列挙する', () => {
      expect(zodToOpenAPI({ anyOf: [{ type: 'string' }, { type: 'number' }] })).toBe(
        'z.union([z.string(),z.number()])',
      )
    })
    it.concurrent('実行時: 最初のサブスキーマに一致する入力は受理される', () => {
      const AnyOfSchema = z.union([z.string(), z.number()])
      expect(AnyOfSchema.safeParse('foo').success).toBe(true)
    })
    it.concurrent('実行時: 後方のサブスキーマに一致する入力も受理される', () => {
      const AnyOfSchema = z.union([z.string(), z.number()])
      expect(AnyOfSchema.safeParse(42).success).toBe(true)
    })
    it.concurrent('実行時: どのサブスキーマにも一致しない入力は弾かれる', () => {
      const AnyOfSchema = z.union([z.string(), z.number()])
      const r1 = AnyOfSchema.safeParse(true)
      expect(r1.success).toBe(false)
      if (!r1.success) {
        expect(r1.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [
              [
                {
                  expected: 'string',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected string, received boolean',
                },
              ],
              [
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received boolean',
                },
              ],
            ],
            path: [],
            message: 'Invalid input',
          },
        ])
      }
      const r2 = AnyOfSchema.safeParse({})
      expect(r2.success).toBe(false)
      if (!r2.success) {
        expect(r2.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [
              [
                {
                  expected: 'string',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected string, received object',
                },
              ],
              [
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received object',
                },
              ],
            ],
            path: [],
            message: 'Invalid input',
          },
        ])
      }
    })
    it.concurrent('実行時: 複数のサブスキーマを同時に満たす入力も受理される (oneOf との違い)', () => {
      // {type:"integer"} and {type:"number"} both accept 7, which anyOf allows.
      const Overlap = z.union([z.int(), z.number()])
      expect(Overlap.safeParse(7).success).toBe(true)
    })
    it.concurrent('コード生成: x-anyOf-message でカスタムエラーを付与できる', () => {
      expect(
        zodToOpenAPI({
          anyOf: [{ type: 'string' }, { type: 'number' }],
          'x-anyOf-message': '文字列か数値を指定してください',
        }),
      ).toBe('z.union([z.string(),z.number()],{error:"文字列か数値を指定してください"})')
    })
  })

  describe('v3.2 oneOf — ちょうど1つのサブデータモデル条件のみを満たす必要がある (JSON Schema §10.2.1.3)', () => {
    it.concurrent('コード生成 (discriminator なし): z.xor([...]) を出力する', () => {
      expect(zodToOpenAPI({ oneOf: [{ type: 'string' }, { type: 'number' }] })).toBe(
        'z.xor([z.string(),z.number()])',
      )
    })
    it.concurrent('コード生成 (discriminator + inline object): z.discriminatedUnion(...) を出力する', () => {
      expect(
        zodToOpenAPI({
          oneOf: [
            {
              type: 'object',
              properties: { kind: { const: 'a' }, foo: { type: 'string' } },
              required: ['kind', 'foo'],
            },
            {
              type: 'object',
              properties: { kind: { const: 'b' }, bar: { type: 'number' } },
              required: ['kind', 'bar'],
            },
          ],
          discriminator: { propertyName: 'kind' },
        }),
      ).toBe(
        'z.discriminatedUnion(\'kind\',[z.object({kind:z.literal("a"),foo:z.string()}).openapi({"required":["kind","foo"]}),z.object({kind:z.literal("b"),bar:z.number()}).openapi({"required":["kind","bar"]})]).openapi({"discriminator":{"propertyName":"kind"}})',
      )
    })
    it.concurrent('実行時 (xor): ちょうど1つのブランチに一致する入力は受理される', () => {
      const OneOfXor = z.xor([z.string(), z.number()])
      expect(OneOfXor.safeParse('foo').success).toBe(true)
      expect(OneOfXor.safeParse(42).success).toBe(true)
    })
    it.concurrent('実行時 (xor): どのブランチにも一致しない入力は弾かれる', () => {
      const OneOfXor = z.xor([z.string(), z.number()])
      const r1 = OneOfXor.safeParse(true)
      expect(r1.success).toBe(false)
      if (!r1.success) {
        expect(r1.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [
              [
                {
                  expected: 'string',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected string, received boolean',
                },
              ],
              [
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received boolean',
                },
              ],
            ],
            path: [],
            message: 'Invalid input',
          },
        ])
      }
      const r2 = OneOfXor.safeParse({})
      expect(r2.success).toBe(false)
      if (!r2.success) {
        expect(r2.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [
              [
                {
                  expected: 'string',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected string, received object',
                },
              ],
              [
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received object',
                },
              ],
            ],
            path: [],
            message: 'Invalid input',
          },
        ])
      }
    })
    it.concurrent('実行時 (xor): 2つ以上のブランチに一致する入力は弾かれる — 「ちょうど1つ」の核心', () => {
      // {type:"integer"} and {type:"number"} both accept 7. Under oneOf, matching two branches is
      // invalid and must be rejected; anyOf would have accepted it. That is the essential difference.
      const Overlap = z.xor([z.int(), z.number()])
      const result = Overlap.safeParse(7)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [],
            inclusive: false,
            matches: [0, 1],
            path: [],
            message: 'Invalid input: more than one option matched',
          },
        ])
      }
    })
    it.concurrent('実行時 (discriminatedUnion): discriminator 値で一致するブランチが選択される', () => {
      const OneOfDiscriminated = z.discriminatedUnion('kind', [
        z.object({ kind: z.literal('a'), foo: z.string() }),
        z.object({ kind: z.literal('b'), bar: z.number() }),
      ])
      expect(OneOfDiscriminated.safeParse({ kind: 'a', foo: 'hello' }).success).toBe(true)
      expect(OneOfDiscriminated.safeParse({ kind: 'b', bar: 123 }).success).toBe(true)
      // The discriminator value matches no branch → rejected.
      const r1 = OneOfDiscriminated.safeParse({ kind: 'c' })
      expect(r1.success).toBe(false)
      if (!r1.success) {
        expect(r1.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [],
            note: 'No matching discriminator',
            discriminator: 'kind',
            options: ['a', 'b'],
            path: ['kind'],
            message: "Invalid discriminator value. Expected 'a' | 'b'",
          },
        ])
      }
      // Conflicts with the shape of the branch the discriminator selected → rejected.
      const r2 = OneOfDiscriminated.safeParse({ kind: 'a', bar: 123 })
      expect(r2.success).toBe(false)
      if (!r2.success) {
        expect(r2.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['foo'],
            message: 'Invalid input: expected string, received undefined',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // nullable / default / type-array codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 nullable: type:["string","null"] (JSON Schema 2020-12)', () => {
    it.concurrent('codegen: z.string().nullable()', () => {
      expect(zodToOpenAPI({ type: ['string', 'null'] })).toBe('z.string().nullable()')
    })
    it.concurrent('runtime: "x" PASSES', () => {
      expect(z.string().nullable().safeParse('x').success).toBe(true)
    })
    it.concurrent('runtime: null PASSES', () => {
      expect(z.string().nullable().safeParse(null).success).toBe(true)
    })
    it.concurrent('runtime: 1 FAILS', () => {
      const result = z.string().nullable().safeParse(1)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 default: numeric default value', () => {
    it.concurrent('codegen: z.number().default(42)', () => {
      expect(zodToOpenAPI({ type: 'number', default: 42 })).toBe('z.number().default(42)')
    })
    it.concurrent('runtime: undefined → fills with 42', () => {
      const valid = z.number().default(42).safeParse(undefined)
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe(42)
      }
    })
    it.concurrent('runtime: explicit 7 → keeps 7', () => {
      const valid = z.number().default(42).safeParse(7)
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe(7)
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // x-error-message / x-required-message slot codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-required-message: differentiates undefined vs type mismatch', () => {
    const RequiredMessageSchema = z.object({
      email: z.string({
        error: (issue) =>
          issue.input === undefined ? 'Email is required' : 'Email format invalid',
      }),
    })

    it.concurrent('codegen: error function differentiates undefined, with required metadata', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            email: {
              type: 'string',
              'x-error-message': 'Email format invalid',
              'x-required-message': 'Email is required',
            },
          },
          required: ['email'],
        }),
      ).toBe(
        'z.object({email:z.string({error:(issue)=>issue.input===undefined?"Email is required":"Email format invalid"})}).openapi({"required":["email"]})',
      )
    })
    it.concurrent('runtime: missing email → required message', () => {
      const valid = RequiredMessageSchema.safeParse({})
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].message).toBe('Email is required')
      }
    })
    it.concurrent('runtime: wrong type email → error message', () => {
      const valid = RequiredMessageSchema.safeParse({ email: 123 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues[0].message).toBe('Email format invalid')
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // x-coerce / x-prefault / x-catch / x-brand codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-coerce: string coercion at parse', () => {
    it.concurrent('codegen: z.coerce.string()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-coerce': true })).toBe('z.coerce.string()')
    })
    it.concurrent('runtime: 123 → "123" (coerced)', () => {
      const valid = z.coerce.string().safeParse(123)
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe('123')
      }
    })
  })

  describe('v3.2 x-catch: fallback on validation failure', () => {
    it.concurrent('codegen: z.number().catch(0), with the type stated for the document (#492)', () => {
      expect(zodToOpenAPI({ type: 'number', 'x-catch': 0 })).toBe(
        'z.number().catch(0).openapi({"type":"number"})',
      )
    })
    it.concurrent('runtime: invalid input "x" → returns 0', () => {
      const valid = z.number().catch(0).safeParse('x')
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe(0)
      }
    })
    it.concurrent('runtime: valid 5 → returns 5', () => {
      const valid = z.number().catch(0).safeParse(5)
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe(5)
      }
    })
  })

  describe('v3.2 x-brand: branded types for nominal typing', () => {
    it.concurrent('codegen: z.string().brand<"UserId">()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-brand': 'UserId' })).toBe(
        'z.string().brand<"UserId">()',
      )
    })
    it.concurrent('runtime: "abc" PASSES (brand is type-only at runtime)', () => {
      // .brand<"X">() is compile-time only; runtime behavior identical to z.string().
      const valid = z.string().brand<'UserId'>().safeParse('abc')
      expect(valid.success).toBe(true)
      if (valid.success) {
        expect(valid.data).toBe('abc')
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // complex nested object codegen + runtime
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 nested object: User { name, email, address: { city } }', () => {
    const NestedSchema = z.object({
      name: z.string().min(1),
      email: z.email(),
      address: z
        .object({
          city: z.string(),
          zip: z
            .string()
            // oxlint-disable-next-line require-unicode-regexp -- mirrors the regex literal the generator emits
            .regex(/^\d{3}-\d{4}$/)
            .exactOptional(),
        })
        .exactOptional(),
    })

    it.concurrent('codegen: nested z.object with deep properties + nested required metadata', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            name: { type: 'string', minLength: 1 },
            email: { type: 'string', format: 'email' },
            address: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                zip: { type: 'string', pattern: '^\\d{3}-\\d{4}$' },
              },
              required: ['city'],
            },
          },
          required: ['name', 'email'],
        }),
      ).toBe(
        'z.object({name:z.string().min(1),email:z.email(),address:z.object({city:z.string(),zip:z.string().regex(/^\\d{3}-\\d{4}$/).exactOptional()}).exactOptional().openapi({"required":["city"]})}).openapi({"required":["name","email"]})',
      )
    })
    it.concurrent('runtime: full valid object PASSES', () => {
      expect(
        NestedSchema.safeParse({
          name: 'taro',
          email: 'taro@example.com',
          address: { city: 'Tokyo', zip: '100-0001' },
        }).success,
      ).toBe(true)
    })
    it.concurrent('runtime: minimal valid (no address) PASSES', () => {
      expect(NestedSchema.safeParse({ name: 'taro', email: 'taro@example.com' }).success).toBe(true)
    })
    it.concurrent('runtime: invalid zip → full issue toStrictEqual', () => {
      const valid = NestedSchema.safeParse({
        name: 'taro',
        email: 'taro@example.com',
        address: { city: 'Tokyo', zip: 'invalid' },
      })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'regex',
            pattern: '/^\\d{3}-\\d{4}$/',
            path: ['address', 'zip'],
            message: 'Invalid string: must match pattern /^\\d{3}-\\d{4}$/',
          },
        ])
      }
    })
    it.concurrent('runtime: missing name → full issue toStrictEqual', () => {
      const valid = NestedSchema.safeParse({ email: 'taro@example.com' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['name'],
            message: 'Invalid input: expected string, received undefined',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // x-refine — user-supplied refine chains
  //   spec: x-refine: [{ fn: string, message?: string, path?: string[] }]
  //   codegen wraps each entry as `.refine(fn, {message, path})`
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-refine: single predicate (English message)', () => {
    const RefineSingle = z.number().refine((val) => val > 0, { message: 'must be positive' })

    it.concurrent('codegen: emits .refine(fn, {message})', () => {
      expect(
        zodToOpenAPI({
          type: 'number',
          'x-refine': '.refine((val) => val > 0,{message:"must be positive"})',
        }),
      ).toBe('z.number().refine((val) => val > 0,{message:"must be positive"})')
    })
    it.concurrent('runtime: 5 PASSES', () => {
      expect(RefineSingle.safeParse(5).success).toBe(true)
    })
    it.concurrent('runtime: -1 FAILS → full issue toStrictEqual', () => {
      const valid = RefineSingle.safeParse(-1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: 'must be positive' },
        ])
      }
    })
  })

  describe('v3.2 x-refine: single predicate (日本語 message)', () => {
    const RefineJp = z.number().refine((val) => val > 0, { message: '正の数でなければなりません' })

    it.concurrent('codegen: emits .refine with 日本語 message', () => {
      expect(
        zodToOpenAPI({
          type: 'number',
          'x-refine': '.refine((val) => val > 0,{message:"正の数でなければなりません"})',
        }),
      ).toBe('z.number().refine((val) => val > 0,{message:"正の数でなければなりません"})')
    })
    it.concurrent('runtime: 1 PASSES', () => {
      expect(RefineJp.safeParse(1).success).toBe(true)
    })
    it.concurrent('runtime: 0 FAILS with 日本語 message', () => {
      const valid = RefineJp.safeParse(0)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '正の数でなければなりません' },
        ])
      }
    })
  })

  describe('v3.2 x-refine: with path scoping', () => {
    const RefineWithPath = z
      .object({
        password: z.string(),
        confirmPassword: z.string(),
      })
      .refine(
        (v: { password: string; confirmPassword: string }) => v.password === v.confirmPassword,
        {
          message: 'パスワードが一致しません',
          path: ['confirmPassword'],
        },
      )

    it.concurrent('codegen: emits .refine with {message, path}', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            password: { type: 'string' },
            confirmPassword: { type: 'string' },
          },
          required: ['password', 'confirmPassword'],
          'x-refine':
            '.refine((val) => val.password === val.confirmPassword,{message:"パスワードが一致しません",path:["confirmPassword"]})',
        }),
      ).toBe(
        'z.object({password:z.string(),confirmPassword:z.string()}).refine((val) => val.password === val.confirmPassword,{message:"パスワードが一致しません",path:["confirmPassword"]}).openapi({"required":["password","confirmPassword"]})',
      )
    })
    it.concurrent('runtime: matching passwords PASS', () => {
      expect(
        RefineWithPath.safeParse({ password: 'secret', confirmPassword: 'secret' }).success,
      ).toBe(true)
    })
    it.concurrent('runtime: mismatched → path:["confirmPassword"], 日本語 message', () => {
      const valid = RefineWithPath.safeParse({
        password: 'secret',
        confirmPassword: 'wrong',
      })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: ['confirmPassword'], message: 'パスワードが一致しません' },
        ])
      }
    })
  })

  describe('v3.2 x-refine: chain of multiple refines', () => {
    const RefineChain = z
      .number()
      .refine((v: number) => v > 0, { message: '正の数で必要です' })
      .refine((v: number) => v < 100, { message: '100未満で必要です' })

    it.concurrent('codegen: chains .refine().refine() in array order', () => {
      expect(
        zodToOpenAPI({
          type: 'number',
          'x-refine':
            '.refine((val) => val > 0,{message:"正の数で必要です"}).refine((val) => val < 100,{message:"100未満で必要です"})',
        }),
      ).toBe(
        'z.number().refine((val) => val > 0,{message:"正の数で必要です"}).refine((val) => val < 100,{message:"100未満で必要です"})',
      )
    })
    it.concurrent('runtime: 50 PASSES', () => {
      expect(RefineChain.safeParse(50).success).toBe(true)
    })
    it.concurrent('runtime: -1 FAILS first refine only', () => {
      const valid = RefineChain.safeParse(-1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '正の数で必要です' },
        ])
      }
    })
    it.concurrent('runtime: 200 FAILS second refine only', () => {
      const valid = RefineChain.safeParse(200)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '100未満で必要です' },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // x-superRefine — user-supplied superRefine functions
  //   spec: x-superRefine: string[]   (each entry is the full lambda body)
  //   codegen wraps each entry as `.superRefine(fn)`
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-superRefine: single function with custom code+path', () => {
    const SuperRefineSingle = z.string().superRefine((val: string, ctx) => {
      if (val.includes(' ')) {
        ctx.addIssue({ code: 'custom', path: [], message: 'スペースは含められません' })
      }
    })

    it.concurrent('codegen: emits .superRefine(fn)', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          'x-superRefine':
            '.superRefine((val, ctx) => { if (val.includes(\' \')) ctx.addIssue({ code: "custom", path: [], message: "スペースは含められません" }) })',
        }),
      ).toBe(
        'z.string().superRefine((val, ctx) => { if (val.includes(\' \')) ctx.addIssue({ code: "custom", path: [], message: "スペースは含められません" }) })',
      )
    })
    it.concurrent('runtime: "hello" PASSES (no spaces)', () => {
      expect(SuperRefineSingle.safeParse('hello').success).toBe(true)
    })
    it.concurrent('runtime: "hello world" FAILS with 日本語 message', () => {
      const valid = SuperRefineSingle.safeParse('hello world')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: 'スペースは含められません' },
        ])
      }
    })
  })

  describe('v3.2 x-superRefine: emits multiple issues from one function', () => {
    const SuperRefineMulti = z
      .object({ password: z.string() })
      .superRefine((val: { password: string }, ctx) => {
        if (val.password.length < 8) {
          ctx.addIssue({
            code: 'custom',
            path: ['password'],
            message: 'パスワードは8文字以上で必要です',
          })
        }
        if (!/[0-9]/u.test(val.password)) {
          ctx.addIssue({
            code: 'custom',
            path: ['password'],
            message: 'パスワードに数字を含めてください',
          })
        }
      })

    it.concurrent('codegen: emits .superRefine with multi-addIssue body', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { password: { type: 'string' } },
          required: ['password'],
          'x-superRefine':
            '.superRefine((val, ctx) => { if (val.password.length < 8) ctx.addIssue({ code: "custom", path: ["password"], message: "パスワードは8文字以上で必要です" }); if (!/[0-9]/.test(val.password)) ctx.addIssue({ code: "custom", path: ["password"], message: "パスワードに数字を含めてください" }) })',
        }),
      ).toBe(
        'z.object({password:z.string()}).superRefine((val, ctx) => { if (val.password.length < 8) ctx.addIssue({ code: "custom", path: ["password"], message: "パスワードは8文字以上で必要です" }); if (!/[0-9]/.test(val.password)) ctx.addIssue({ code: "custom", path: ["password"], message: "パスワードに数字を含めてください" }) }).openapi({"required":["password"]})',
      )
    })
    it.concurrent('runtime: valid password ("password123") PASSES', () => {
      expect(SuperRefineMulti.safeParse({ password: 'password123' }).success).toBe(true)
    })
    it.concurrent('runtime: short + no-digit password → 2 issues, both 日本語', () => {
      const valid = SuperRefineMulti.safeParse({ password: 'short' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: ['password'],
            message: 'パスワードは8文字以上で必要です',
          },
          {
            code: 'custom',
            path: ['password'],
            message: 'パスワードに数字を含めてください',
          },
        ])
      }
    })
  })

  describe('v3.2 x-superRefine: chain of multiple superRefine functions', () => {
    const SuperRefineChain = z
      .string()
      .superRefine((val: string, ctx) => {
        if (val.length < 3) ctx.addIssue({ code: 'custom', path: [], message: '3文字以上必要です' })
      })
      .superRefine((val: string, ctx) => {
        if (!/^[a-z]/u.test(val)) {
          ctx.addIssue({ code: 'custom', path: [], message: '小文字で始めてください' })
        }
      })

    it.concurrent('codegen: chains .superRefine().superRefine() in array order', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          'x-superRefine':
            '.superRefine((val, ctx) => { if (val.length < 3) ctx.addIssue({ code: "custom", path: [], message: "3文字以上必要です" }) }).superRefine((val, ctx) => { if (!/^[a-z]/.test(val)) ctx.addIssue({ code: "custom", path: [], message: "小文字で始めてください" }) })',
        }),
      ).toBe(
        'z.string().superRefine((val, ctx) => { if (val.length < 3) ctx.addIssue({ code: "custom", path: [], message: "3文字以上必要です" }) }).superRefine((val, ctx) => { if (!/^[a-z]/.test(val)) ctx.addIssue({ code: "custom", path: [], message: "小文字で始めてください" }) })',
      )
    })
    it.concurrent('runtime: "hello" PASSES both', () => {
      expect(SuperRefineChain.safeParse('hello').success).toBe(true)
    })
    it.concurrent('runtime: "AB" FAILS both → 2 issues with 日本語', () => {
      const valid = SuperRefineChain.safeParse('AB')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '3文字以上必要です' },
          { code: 'custom', path: [], message: '小文字で始めてください' },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // Japanese messages — broad coverage of x-*-message slots
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 日本語: x-error-message on string base', () => {
    const JpStringSchema = z.string({ error: '文字列で入力してください' })

    it.concurrent('codegen: z.string with 日本語 error', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          'x-error-message': '文字列で入力してください',
        }),
      ).toBe('z.string({error:"文字列で入力してください"})')
    })
    it.concurrent('runtime: 123 FAILS with 日本語 message', () => {
      const valid = JpStringSchema.safeParse(123)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [],
            message: '文字列で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-pattern-message overrides regex error', () => {
    const JpPatternSchema = z
      .string()
      // oxlint-disable-next-line require-unicode-regexp -- mirrors the regex literal the generator emits
      .regex(/^\d{3}-\d{4}$/, { error: '郵便番号は123-4567の形式で入力してください' })

    it.concurrent('codegen: z.string().regex(/.../, {error:"日本語"})', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          pattern: '^\\d{3}-\\d{4}$',
          'x-pattern-message': '郵便番号は123-4567の形式で入力してください',
        }),
      ).toBe(
        'z.string().regex(/^\\d{3}-\\d{4}$/,{error:"郵便番号は123-4567の形式で入力してください"})',
      )
    })
    it.concurrent('runtime: "100-0001" PASSES', () => {
      expect(JpPatternSchema.safeParse('100-0001').success).toBe(true)
    })
    it.concurrent('runtime: "invalid" FAILS with 日本語 pattern message', () => {
      const valid = JpPatternSchema.safeParse('invalid')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'regex',
            pattern: '/^\\d{3}-\\d{4}$/',
            path: [],
            message: '郵便番号は123-4567の形式で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-minLength-message + x-maxLength-message', () => {
    const JpLenSchema = z
      .string()
      .min(3, { error: '3文字以上で入力してください' })
      .max(10, { error: '10文字以内で入力してください' })

    it.concurrent('codegen: z.string().min().max() with 日本語 errors', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          minLength: 3,
          maxLength: 10,
          'x-minLength-message': '3文字以上で入力してください',
          'x-maxLength-message': '10文字以内で入力してください',
        }),
      ).toBe(
        'z.string().min(3,{error:"3文字以上で入力してください"}).max(10,{error:"10文字以内で入力してください"})',
      )
    })
    it.concurrent('runtime: "hello" PASSES', () => {
      expect(JpLenSchema.safeParse('hello').success).toBe(true)
    })
    it.concurrent('runtime: "ab" → 日本語 too_small', () => {
      const valid = JpLenSchema.safeParse('ab')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_small',
            minimum: 3,
            inclusive: true,
            path: [],
            message: '3文字以上で入力してください',
          },
        ])
      }
    })
    it.concurrent('runtime: "12345678901" → 日本語 too_big', () => {
      const valid = JpLenSchema.safeParse('12345678901')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_big',
            maximum: 10,
            inclusive: true,
            path: [],
            message: '10文字以内で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-enum-message overrides Zod stock enum error', () => {
    const JpEnumSchema = z.enum(['赤', '緑', '青'], {
      error: '色は赤・緑・青のいずれかで指定してください',
    })

    it.concurrent('codegen: z.enum with 日本語 enum + 日本語 error', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          enum: ['赤', '緑', '青'],
          'x-enum-message': '色は赤・緑・青のいずれかで指定してください',
        }),
      ).toBe('z.enum(["赤","緑","青"],{error:"色は赤・緑・青のいずれかで指定してください"})')
    })
    it.concurrent('runtime: "赤" PASSES', () => {
      expect(JpEnumSchema.safeParse('赤').success).toBe(true)
    })
    it.concurrent('runtime: "黄" FAILS with 日本語 message', () => {
      const valid = JpEnumSchema.safeParse('黄')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_value',
            values: ['赤', '緑', '青'],
            path: [],
            message: '色は赤・緑・青のいずれかで指定してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-error-message + x-required-message in object property', () => {
    const JpFormSchema = z.object({
      name: z.string({
        error: (issue) => (issue.input === undefined ? 'お名前は必須です' : 'お名前は文字列です'),
      }),
    })

    it.concurrent('codegen: error function with 日本語 differentiation', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            name: {
              type: 'string',
              'x-error-message': 'お名前は文字列です',
              'x-required-message': 'お名前は必須です',
            },
          },
          required: ['name'],
        }),
      ).toBe(
        'z.object({name:z.string({error:(issue)=>issue.input===undefined?"お名前は必須です":"お名前は文字列です"})}).openapi({"required":["name"]})',
      )
    })
    it.concurrent('runtime: missing name → 日本語 required message', () => {
      const valid = JpFormSchema.safeParse({})
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['name'],
            message: 'お名前は必須です',
          },
        ])
      }
    })
    it.concurrent('runtime: name as number → 日本語 type message', () => {
      const valid = JpFormSchema.safeParse({ name: 42 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['name'],
            message: 'お名前は文字列です',
          },
        ])
      }
    })
    it.concurrent('runtime: valid name PASSES', () => {
      expect(JpFormSchema.safeParse({ name: 'たろう' }).success).toBe(true)
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // x-refine — additional applied patterns
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-refine: applied to array (every-element predicate)', () => {
    const RefineArrayEvery = z
      .array(z.number())
      .refine((arr: number[]) => arr.every((v) => v > 0), {
        message: 'すべての要素は正の数で必要です',
      })

    it.concurrent('codegen: array + .refine(every)', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'number' },
          'x-refine':
            '.refine((arr) => arr.every((v) => v > 0),{message:"すべての要素は正の数で必要です"})',
        }),
      ).toBe(
        'z.array(z.number()).refine((arr) => arr.every((v) => v > 0),{message:"すべての要素は正の数で必要です"})',
      )
    })
    it.concurrent('runtime: [1,2,3] PASSES', () => {
      expect(RefineArrayEvery.safeParse([1, 2, 3]).success).toBe(true)
    })
    it.concurrent('runtime: [1,-2,3] FAILS with 日本語 issue', () => {
      const valid = RefineArrayEvery.safeParse([1, -2, 3])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: 'すべての要素は正の数で必要です' },
        ])
      }
    })
  })

  describe('v3.2 x-refine: with deep nested path', () => {
    const RefineDeepPath = z
      .object({
        user: z.object({ profile: z.object({ age: z.number() }) }),
      })
      .refine((v: { user: { profile: { age: number } } }) => v.user.profile.age >= 18, {
        message: '18歳以上で必要です',
        path: ['user', 'profile', 'age'],
      })

    it.concurrent('codegen: refine with deep path array', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                profile: {
                  type: 'object',
                  properties: { age: { type: 'number' } },
                  required: ['age'],
                },
              },
              required: ['profile'],
            },
          },
          required: ['user'],
          'x-refine':
            '.refine((val) => val.user.profile.age >= 18,{message:"18歳以上で必要です",path:["user","profile","age"]})',
        }),
      ).toBe(
        'z.object({user:z.object({profile:z.object({age:z.number()}).openapi({"required":["age"]})}).openapi({"required":["profile"]})}).refine((val) => val.user.profile.age >= 18,{message:"18歳以上で必要です",path:["user","profile","age"]}).openapi({"required":["user"]})',
      )
    })
    it.concurrent('runtime: 18 (boundary) PASSES', () => {
      expect(RefineDeepPath.safeParse({ user: { profile: { age: 18 } } }).success).toBe(true)
    })
    it.concurrent('runtime: 17 FAILS → path:["user","profile","age"]', () => {
      const valid = RefineDeepPath.safeParse({ user: { profile: { age: 17 } } })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: ['user', 'profile', 'age'],
            message: '18歳以上で必要です',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // x-superRefine — additional applied patterns
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 x-superRefine: per-element issue with index path', () => {
    const SuperRefinePerElement = z.array(z.string()).superRefine((arr: string[], ctx) => {
      for (const [i, val] of arr.entries()) {
        if (val.length === 0) {
          ctx.addIssue({
            code: 'custom',
            path: [i],
            message: `${i}番目の要素は空文字列にできません`,
          })
        }
      }
    })

    it.concurrent('codegen: emits .superRefine on array', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'string' },
          'x-superRefine':
            '.superRefine((arr, ctx) => { for (const [i, val] of arr.entries()) { if (val.length === 0) ctx.addIssue({ code: "custom", path: [i], message: `${i}番目の要素は空文字列にできません` }) } })',
        }),
      ).toBe(
        'z.array(z.string()).superRefine((arr, ctx) => { for (const [i, val] of arr.entries()) { if (val.length === 0) ctx.addIssue({ code: "custom", path: [i], message: `${i}番目の要素は空文字列にできません` }) } })',
      )
    })
    it.concurrent('runtime: ["a","b","c"] PASSES', () => {
      expect(SuperRefinePerElement.safeParse(['a', 'b', 'c']).success).toBe(true)
    })
    it.concurrent('runtime: ["a","",""] → 2 per-index issues with 日本語', () => {
      const valid = SuperRefinePerElement.safeParse(['a', '', ''])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [1], message: '1番目の要素は空文字列にできません' },
          { code: 'custom', path: [2], message: '2番目の要素は空文字列にできません' },
        ])
      }
    })
  })

  describe('v3.2 x-superRefine: cross-field validation with multiple paths', () => {
    const SuperRefineCrossField = z
      .object({
        startDate: z.string(),
        endDate: z.string(),
      })
      .superRefine((val: { startDate: string; endDate: string }, ctx) => {
        if (val.startDate > val.endDate) {
          ctx.addIssue({
            code: 'custom',
            path: ['startDate'],
            message: '開始日は終了日より前である必要があります',
          })
          ctx.addIssue({
            code: 'custom',
            path: ['endDate'],
            message: '終了日は開始日より後である必要があります',
          })
        }
      })

    it.concurrent('codegen: emits .superRefine with multi-path addIssue', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            startDate: { type: 'string' },
            endDate: { type: 'string' },
          },
          required: ['startDate', 'endDate'],
          'x-superRefine':
            '.superRefine((val, ctx) => { if (val.startDate > val.endDate) { ctx.addIssue({ code: "custom", path: ["startDate"], message: "開始日は終了日より前である必要があります" }); ctx.addIssue({ code: "custom", path: ["endDate"], message: "終了日は開始日より後である必要があります" }) } })',
        }),
      ).toBe(
        'z.object({startDate:z.string(),endDate:z.string()}).superRefine((val, ctx) => { if (val.startDate > val.endDate) { ctx.addIssue({ code: "custom", path: ["startDate"], message: "開始日は終了日より前である必要があります" }); ctx.addIssue({ code: "custom", path: ["endDate"], message: "終了日は開始日より後である必要があります" }) } }).openapi({"required":["startDate","endDate"]})',
      )
    })
    it.concurrent('runtime: valid range PASSES', () => {
      expect(
        SuperRefineCrossField.safeParse({
          startDate: '2026-01-01',
          endDate: '2026-12-31',
        }).success,
      ).toBe(true)
    })
    it.concurrent('runtime: reversed dates → 2 issues on different paths', () => {
      const valid = SuperRefineCrossField.safeParse({
        startDate: '2026-12-31',
        endDate: '2026-01-01',
      })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: ['startDate'],
            message: '開始日は終了日より前である必要があります',
          },
          {
            code: 'custom',
            path: ['endDate'],
            message: '終了日は開始日より後である必要があります',
          },
        ])
      }
    })
  })

  // ────────────────────────────────────────────────────────────────────
  // Japanese x-*-message broad coverage (numeric / array / object slots)
  // ────────────────────────────────────────────────────────────────────
  describe('v3.2 日本語: x-multipleOf-message', () => {
    const JpMultipleOf = z.number().multipleOf(0.5, { error: '0.5の倍数で入力してください' })

    it.concurrent('codegen: z.number().multipleOf with 日本語 error', () => {
      expect(
        zodToOpenAPI({
          type: 'number',
          multipleOf: 0.5,
          'x-multipleOf-message': '0.5の倍数で入力してください',
        }),
      ).toBe('z.number().multipleOf(0.5,{error:"0.5の倍数で入力してください"})')
    })
    it.concurrent('runtime: 1.5 PASSES', () => {
      expect(JpMultipleOf.safeParse(1.5).success).toBe(true)
    })
    it.concurrent('runtime: 1.3 FAILS with 日本語', () => {
      const valid = JpMultipleOf.safeParse(1.3)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'number',
            code: 'not_multiple_of',
            divisor: 0.5,
            path: [],
            message: '0.5の倍数で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-minimum-message / x-maximum-message', () => {
    const JpRange = z
      .number()
      .min(0, { error: '0以上で入力してください' })
      .max(100, { error: '100以下で入力してください' })

    it.concurrent('codegen: z.number().min().max() with 日本語 errors', () => {
      expect(
        zodToOpenAPI({
          type: 'number',
          minimum: 0,
          maximum: 100,
          'x-minimum-message': '0以上で入力してください',
          'x-maximum-message': '100以下で入力してください',
        }),
      ).toBe(
        'z.number().min(0,{error:"0以上で入力してください"}).max(100,{error:"100以下で入力してください"})',
      )
    })
    it.concurrent('runtime: 50 PASSES', () => {
      expect(JpRange.safeParse(50).success).toBe(true)
    })
    it.concurrent('runtime: -1 → 日本語 too_small', () => {
      const valid = JpRange.safeParse(-1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'number',
            code: 'too_small',
            minimum: 0,
            inclusive: true,
            path: [],
            message: '0以上で入力してください',
          },
        ])
      }
    })
    it.concurrent('runtime: 101 → 日本語 too_big', () => {
      const valid = JpRange.safeParse(101)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'number',
            code: 'too_big',
            maximum: 100,
            inclusive: true,
            path: [],
            message: '100以下で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-uniqueItems-message override', () => {
    const JpUnique = z.array(z.string()).superRefine((items: string[], ctx) => {
      const seen = new Map<string, number>()
      for (const [i, val] of items.entries()) {
        const key = JSON.stringify(val)
        if (seen.has(key)) {
          ctx.addIssue({
            code: 'custom',
            path: [i],
            message: '配列に重複する要素は許可されていません',
          })
        } else seen.set(key, i)
      }
    })

    it.concurrent('codegen: uniqueItems with 日本語 override (slot wins over dynamic)', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'string' },
          uniqueItems: true,
          'x-uniqueItems-message': '配列に重複する要素は許可されていません',
        }),
      ).toBe(
        'z.array(z.string()).superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i],message:"配列に重複する要素は許可されていません"});else seen.set(key,i)}})',
      )
    })
    it.concurrent('runtime: ["a","b","c"] PASSES', () => {
      expect(JpUnique.safeParse(['a', 'b', 'c']).success).toBe(true)
    })
    it.concurrent('runtime: ["a","b","a"] → path:[2], 日本語 override', () => {
      const valid = JpUnique.safeParse(['a', 'b', 'a'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [2], message: '配列に重複する要素は許可されていません' },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-not-message', () => {
    const JpNot = z.any().refine((val) => typeof val !== 'string', {
      error: '文字列以外で入力してください',
    })

    it.concurrent('codegen: z.any().refine with 日本語 not message', () => {
      expect(
        zodToOpenAPI({
          not: { type: 'string' },
          'x-not-message': '文字列以外で入力してください',
        }),
      ).toBe(
        'z.any().refine((val) => typeof val !== \'string\',{error:"文字列以外で入力してください"}).openapi({"not":{"type":"string"}})',
      )
    })
    it.concurrent('runtime: 42 PASSES (not a string)', () => {
      expect(JpNot.safeParse(42).success).toBe(true)
    })
    it.concurrent('runtime: "hello" FAILS with 日本語 not message', () => {
      const valid = JpNot.safeParse('hello')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '文字列以外で入力してください' },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-anyOf-message', () => {
    const JpAnyOf = z.union([z.string(), z.number()], {
      error: '文字列または数値で入力してください',
    })

    it.concurrent('codegen: z.union with 日本語 anyOf error', () => {
      expect(
        zodToOpenAPI({
          anyOf: [{ type: 'string' }, { type: 'number' }],
          'x-anyOf-message': '文字列または数値で入力してください',
        }),
      ).toBe('z.union([z.string(),z.number()],{error:"文字列または数値で入力してください"})')
    })
    it.concurrent('runtime: "abc" PASSES', () => {
      expect(JpAnyOf.safeParse('abc').success).toBe(true)
    })
    it.concurrent('runtime: 42 PASSES', () => {
      expect(JpAnyOf.safeParse(42).success).toBe(true)
    })
    it.concurrent('runtime: true → invalid_union with 日本語 message', () => {
      const valid = JpAnyOf.safeParse(true)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [
              [
                {
                  expected: 'string',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected string, received boolean',
                },
              ],
              [
                {
                  expected: 'number',
                  code: 'invalid_type',
                  path: [],
                  message: 'Invalid input: expected number, received boolean',
                },
              ],
            ],
            path: [],
            message: '文字列または数値で入力してください',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-const-message override', () => {
    const JpConst = z.literal('管理者', { error: '値は「管理者」で必要です' })

    it.concurrent('codegen: z.literal with 日本語 const error', () => {
      expect(
        zodToOpenAPI({
          const: '管理者',
          'x-const-message': '値は「管理者」で必要です',
        }),
      ).toBe('z.literal("管理者",{error:"値は「管理者」で必要です"})')
    })
    it.concurrent('runtime: "管理者" PASSES', () => {
      expect(JpConst.safeParse('管理者').success).toBe(true)
    })
    it.concurrent('runtime: "ユーザー" FAILS with 日本語 const message', () => {
      const valid = JpConst.safeParse('ユーザー')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_value',
            values: ['管理者'],
            path: [],
            message: '値は「管理者」で必要です',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-contains-message + dynamic count message overridden', () => {
    const JpContains = z.array(z.any()).superRefine((arr: unknown[], ctx) => {
      const Inner = z.int()
      const matched = arr.filter((i) => Inner.safeParse(i).success).length
      if (matched < 1) {
        ctx.addIssue({
          code: 'custom',
          path: [],
          message: '配列に整数を1つ以上含めてください',
        })
      }
    })

    it.concurrent('codegen: contains with 日本語 x-contains-message override', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          contains: { type: 'integer' },
          'x-contains-message': '配列に整数を1つ以上含めてください',
        }),
      ).toBe(
        'z.array(z.any()).superRefine((arr,ctx)=>{const Schema=z.int();const matched=arr.filter((i)=>Schema.safeParse(i).success).length;if(matched<1){ctx.addIssue({code:"custom",message:"配列に整数を1つ以上含めてください"})}})',
      )
    })
    it.concurrent('runtime: [1] PASSES', () => {
      expect(JpContains.safeParse([1]).success).toBe(true)
    })
    it.concurrent('runtime: [] FAILS with 日本語 (slot overrides dynamic)', () => {
      const valid = JpContains.safeParse([])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          { code: 'custom', path: [], message: '配列に整数を1つ以上含めてください' },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-dependentRequired-message', () => {
    const JpDepRequired = z
      .object({
        creditCard: z.string().exactOptional(),
        cvv: z.string().exactOptional(),
      })
      .superRefine((o: { creditCard?: string; cvv?: string }, ctx) => {
        if (Object.hasOwn(o, 'creditCard')) {
          if (!Object.hasOwn(o, 'cvv')) {
            ctx.addIssue({
              code: 'custom',
              path: ['cvv'],
              message: 'creditCardを使う場合はcvvが必須です',
            })
          }
        }
      })

    it.concurrent('codegen: dependentRequired with 日本語 message', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: {
            creditCard: { type: 'string' },
            cvv: { type: 'string' },
          },
          dependentRequired: { creditCard: ['cvv'] },
          'x-dependentRequired-message': 'creditCardを使う場合はcvvが必須です',
        }),
      ).toBe(
        'z.object({creditCard:z.string().exactOptional(),cvv:z.string().exactOptional()}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"creditCard")){return}if(!Object.hasOwn(o,"cvv")){ctx.addIssue({code:\'custom\',message:"creditCardを使う場合はcvvが必須です",path:["cvv"]})}}).openapi({"required":[]})',
      )
    })
    it.concurrent('runtime: {} PASSES (no creditCard)', () => {
      expect(JpDepRequired.safeParse({}).success).toBe(true)
    })
    it.concurrent('runtime: {creditCard, cvv} PASSES', () => {
      expect(JpDepRequired.safeParse({ creditCard: '1234', cvv: '123' }).success).toBe(true)
    })
    it.concurrent('runtime: {creditCard} only → path:["cvv"], 日本語 message', () => {
      const valid = JpDepRequired.safeParse({ creditCard: '1234' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: ['cvv'],
            message: 'creditCardを使う場合はcvvが必須です',
          },
        ])
      }
    })
  })

  describe('v3.2 日本語: x-additionalProperties-message (strictObject)', () => {
    const JpStrict = z.strictObject(
      { name: z.string() },
      {
        error: (issue) =>
          issue.code === 'unrecognized_keys' ? '想定外のフィールドが含まれています' : undefined,
      },
    )

    it.concurrent('codegen: strictObject with 日本語 unrecognized_keys override', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
          additionalProperties: false,
          'x-additionalProperties-message': '想定外のフィールドが含まれています',
        }),
      ).toBe(
        'z.strictObject({name:z.string()},{error:(issue)=>issue.code===\'unrecognized_keys\'?"想定外のフィールドが含まれています":undefined}).openapi({"required":["name"]})',
      )
    })
    it.concurrent('runtime: {name:"taro"} PASSES', () => {
      expect(JpStrict.safeParse({ name: 'taro' }).success).toBe(true)
    })
    it.concurrent('runtime: {name:"taro", extra:"x"} → 日本語 unrecognized_keys', () => {
      const valid = JpStrict.safeParse({ name: 'taro', extra: 'x' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'unrecognized_keys',
            keys: ['extra'],
            path: [],
            message: '想定外のフィールドが含まれています',
          },
        ])
      }
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // format option x-* extensions (codegen + runtime pairs)
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 x-emailPattern: html5 preset', () => {
    const EmailHtml5 = z.email({ pattern: z.regexes.html5Email })
    it.concurrent('codegen: z.email({pattern:z.regexes.html5Email})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'email', 'x-emailPattern': 'html5' })).toBe(
        'z.email({pattern:z.regexes.html5Email})',
      )
    })
    it.concurrent('runtime: "alice@example.com" PASSES', () => {
      expect(EmailHtml5.safeParse('alice@example.com').success).toBe(true)
    })
    it.concurrent('runtime: "not-an-email" FAILS', () => {
      const valid = EmailHtml5.safeParse('not-an-email')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'email',
            pattern: z.regexes.html5Email.toString(),
            path: [],
            message: 'Invalid email address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-emailPattern: rfc5322 preset', () => {
    const EmailRfc = z.email({ pattern: z.regexes.rfc5322Email })
    it.concurrent('codegen: z.email({pattern:z.regexes.rfc5322Email})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'email', 'x-emailPattern': 'rfc5322' })).toBe(
        'z.email({pattern:z.regexes.rfc5322Email})',
      )
    })
    it.concurrent('runtime: "user@host.com" PASSES', () => {
      expect(EmailRfc.safeParse('user@host.com').success).toBe(true)
    })
    it.concurrent('runtime: "no-at-sign" FAILS', () => {
      const valid = EmailRfc.safeParse('no-at-sign')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'email',
            pattern: z.regexes.rfc5322Email.toString(),
            path: [],
            message: 'Invalid email address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-emailPattern: unicode preset', () => {
    const EmailUni = z.email({ pattern: z.regexes.unicodeEmail })
    it.concurrent('codegen: z.email({pattern:z.regexes.unicodeEmail})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'email', 'x-emailPattern': 'unicode' })).toBe(
        'z.email({pattern:z.regexes.unicodeEmail})',
      )
    })
    it.concurrent('runtime: "山田@例え.jp" PASSES', () => {
      expect(EmailUni.safeParse('山田@例え.jp').success).toBe(true)
    })
    it.concurrent('runtime: "bad" FAILS', () => {
      const valid = EmailUni.safeParse('bad')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'email',
            pattern: z.regexes.unicodeEmail.toString(),
            path: [],
            message: 'Invalid email address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-emailRegex: custom regex overrides preset', () => {
    const regex = /^[a-z]+@example\.com$/u
    const EmailReg = z.email({ pattern: regex })
    it.concurrent('codegen: z.email({pattern:/^[a-z]+@example\\.com$/})', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'email',
          'x-emailRegex': '^[a-z]+@example\\.com$',
        }),
      ).toBe('z.email({pattern:/^[a-z]+@example\\.com$/})')
    })
    it.concurrent('runtime: "alice@example.com" PASSES', () => {
      expect(EmailReg.safeParse('alice@example.com').success).toBe(true)
    })
    it.concurrent('runtime: "alice@other.com" FAILS', () => {
      const valid = EmailReg.safeParse('alice@other.com')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'email',
            pattern: regex.toString(),
            path: [],
            message: 'Invalid email address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-uuidVersion: v4', () => {
    const UuidV4 = z.uuid({ version: 'v4' })
    it.concurrent('codegen: z.uuid({version:"v4"})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'uuid', 'x-uuidVersion': 'v4' })).toBe(
        'z.uuid({version:"v4"})',
      )
    })
    it.concurrent('runtime: v4 UUID PASSES', () => {
      expect(UuidV4.safeParse('f47ac10b-58cc-4372-a567-0e02b2c3d479').success).toBe(true)
    })
    it.concurrent('runtime: v7 UUID FAILS (wrong version)', () => {
      const valid = UuidV4.safeParse('01890b13-0000-7000-8000-000000000000')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'uuid',
            pattern:
              '/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/',
            path: [],
            message: 'Invalid UUID',
          },
        ])
      }
    })
  })

  describe('v3.2 x-uuidVersion: v7', () => {
    const UuidV7 = z.uuid({ version: 'v7' })
    it.concurrent('codegen: z.uuid({version:"v7"})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'uuid', 'x-uuidVersion': 'v7' })).toBe(
        'z.uuid({version:"v7"})',
      )
    })
    it.concurrent('runtime: v7 UUID PASSES', () => {
      expect(UuidV7.safeParse('01890b13-0000-7000-8000-000000000000').success).toBe(true)
    })
    it.concurrent('runtime: v4 UUID FAILS', () => {
      const valid = UuidV7.safeParse('f47ac10b-58cc-4372-a567-0e02b2c3d479')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'uuid',
            pattern:
              '/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/',
            path: [],
            message: 'Invalid UUID',
          },
        ])
      }
    })
  })

  describe('v3.2 x-isoPrecision: 0 (no fractional seconds)', () => {
    const Dt0 = z.iso.datetime({ precision: 0, offset: true })
    it.concurrent('codegen: z.iso.datetime({precision:0,offset:true})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date-time', 'x-isoPrecision': 0 })).toBe(
        'z.iso.datetime({precision:0,offset:true})',
      )
    })
    it.concurrent('runtime: "2024-01-02T03:04:05Z" PASSES', () => {
      expect(Dt0.safeParse('2024-01-02T03:04:05Z').success).toBe(true)
    })
    it.concurrent('runtime: "2024-01-02T03:04:05.123Z" FAILS', () => {
      const valid = Dt0.safeParse('2024-01-02T03:04:05.123Z')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'datetime',
            pattern:
              '/^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d)))$/',
            path: [],
            message: 'Invalid ISO datetime',
          },
        ])
      }
    })
  })

  describe('v3.2 x-isoPrecision: 3 (millisecond precision required)', () => {
    const Dt3 = z.iso.datetime({ precision: 3, offset: true })
    it.concurrent('codegen: z.iso.datetime({precision:3,offset:true})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date-time', 'x-isoPrecision': 3 })).toBe(
        'z.iso.datetime({precision:3,offset:true})',
      )
    })
    it.concurrent('runtime: "2024-01-02T03:04:05.123Z" PASSES', () => {
      expect(Dt3.safeParse('2024-01-02T03:04:05.123Z').success).toBe(true)
    })
    it.concurrent('runtime: "2024-01-02T03:04:05Z" FAILS', () => {
      const valid = Dt3.safeParse('2024-01-02T03:04:05Z')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'datetime',
            pattern:
              '/^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{3}(?:Z|([+-](?:[01]\\d|2[0-3]):[0-5]\\d)))$/',
            path: [],
            message: 'Invalid ISO datetime',
          },
        ])
      }
    })
  })

  describe('v3.2 x-isoOffset: true (timezone offset allowed)', () => {
    const DtOff = z.iso.datetime({ offset: true })
    it.concurrent('codegen: z.iso.datetime({offset:true})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date-time', 'x-isoOffset': true })).toBe(
        'z.iso.datetime({offset:true})',
      )
    })
    it.concurrent('runtime: "2024-01-02T03:04:05+09:00" PASSES', () => {
      expect(DtOff.safeParse('2024-01-02T03:04:05+09:00').success).toBe(true)
    })
    it.concurrent('runtime: "not-a-date" FAILS', () => {
      const valid = DtOff.safeParse('not-a-date')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toHaveLength(1)
        expect(valid.error.issues[0].code).toBe('invalid_format')
        expect(valid.error.issues[0].message).toBe('Invalid ISO datetime')
      }
    })
  })

  describe('v3.2 x-isoLocal: true (no Z required)', () => {
    const DtLocal = z.iso.datetime({ offset: true, local: true })
    it.concurrent('codegen: z.iso.datetime({offset:true,local:true})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date-time', 'x-isoLocal': true })).toBe(
        'z.iso.datetime({offset:true,local:true})',
      )
    })
    it.concurrent('runtime: "2024-01-02T03:04:05" PASSES (no Z)', () => {
      expect(DtLocal.safeParse('2024-01-02T03:04:05').success).toBe(true)
    })
    it.concurrent('runtime: "no-date" FAILS', () => {
      const valid = DtLocal.safeParse('no-date')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toHaveLength(1)
        expect(valid.error.issues[0].code).toBe('invalid_format')
      }
    })
  })

  describe('v3.2 x-urlProtocol: https only', () => {
    const UrlHttps = z.url({ protocol: /^https$/u })
    it.concurrent('codegen: z.url({protocol:/^https$/})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'url', 'x-urlProtocol': '^https$' })).toBe(
        'z.url({protocol:/^https$/})',
      )
    })
    it.concurrent('runtime: "https://example.com" PASSES', () => {
      expect(UrlHttps.safeParse('https://example.com').success).toBe(true)
    })
    it.concurrent('runtime: "http://example.com" FAILS', () => {
      const valid = UrlHttps.safeParse('http://example.com')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'url',
            note: 'Invalid protocol',
            pattern: '^https$',
            path: [],
            message: 'Invalid URL',
          },
        ])
      }
    })
  })

  describe('v3.2 x-urlHostname: limit hostname', () => {
    const UrlHost = z.url({ hostname: /^example\.com$/u })
    it.concurrent('codegen: z.url({hostname:/^example\\.com$/})', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'url',
          'x-urlHostname': '^example\\.com$',
        }),
      ).toBe('z.url({hostname:/^example\\.com$/})')
    })
    it.concurrent('runtime: "https://example.com/x" PASSES', () => {
      expect(UrlHost.safeParse('https://example.com/x').success).toBe(true)
    })
    it.concurrent('runtime: "https://other.com" FAILS', () => {
      const valid = UrlHost.safeParse('https://other.com')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'url',
            note: 'Invalid hostname',
            pattern: '^example\\.com$',
            path: [],
            message: 'Invalid URL',
          },
        ])
      }
    })
  })

  describe('v3.2 x-macDelimiter: colon', () => {
    const MacColon = z.mac({ delimiter: ':' })
    it.concurrent('codegen: z.mac({delimiter:":"})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'mac', 'x-macDelimiter': ':' })).toBe(
        'z.mac({delimiter:":"})',
      )
    })
    it.concurrent('runtime: "00:11:22:33:44:55" PASSES', () => {
      expect(MacColon.safeParse('00:11:22:33:44:55').success).toBe(true)
    })
    it.concurrent('runtime: "00-11-22-33-44-55" FAILS', () => {
      const valid = MacColon.safeParse('00-11-22-33-44-55')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'mac',
            pattern: '/^(?:[0-9A-F]{2}:){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}$/',
            path: [],
            message: 'Invalid MAC address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-macDelimiter: dash', () => {
    const MacDash = z.mac({ delimiter: '-' })
    it.concurrent('codegen: z.mac({delimiter:"-"})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'mac', 'x-macDelimiter': '-' })).toBe(
        'z.mac({delimiter:"-"})',
      )
    })
    it.concurrent('runtime: "00-11-22-33-44-55" PASSES', () => {
      expect(MacDash.safeParse('00-11-22-33-44-55').success).toBe(true)
    })
    it.concurrent('runtime: "00:11:22:33:44:55" FAILS', () => {
      const valid = MacDash.safeParse('00:11:22:33:44:55')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'mac',
            pattern: '/^(?:[0-9A-F]{2}-){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}-){5}[0-9a-f]{2}$/',
            path: [],
            message: 'Invalid MAC address',
          },
        ])
      }
    })
  })

  describe('v3.2 x-jwtAlg: HS256', () => {
    const Jwt = z.jwt({ alg: 'HS256' })
    it.concurrent('codegen: z.jwt({alg:"HS256"})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'jwt', 'x-jwtAlg': 'HS256' })).toBe(
        'z.jwt({alg:"HS256"})',
      )
    })
    it.concurrent('runtime: "not.a.jwt" FAILS', () => {
      const valid = Jwt.safeParse('not.a.jwt')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'jwt',
            path: [],
            message: 'Invalid JWT',
          },
        ])
      }
    })
  })

  describe('v3.2 x-hashAlg + x-hashEnc: sha256 hex', () => {
    const HashHex = z.hash('sha256', { enc: 'hex' })
    it.concurrent('codegen: z.hash("sha256",{enc:"hex"})', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'hash',
          'x-hashAlg': 'sha256',
          'x-hashEnc': 'hex',
        }),
      ).toBe('z.hash("sha256",{enc:"hex"})')
    })
    it.concurrent('runtime: 64-char hex PASSES', () => {
      expect(HashHex.safeParse('a'.repeat(64)).success).toBe(true)
    })
    it.concurrent('runtime: "short" FAILS', () => {
      const valid = HashHex.safeParse('short')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'sha256_hex',
            path: [],
            message: 'Invalid sha256_hex',
          },
        ])
      }
    })
  })

  describe('v3.2 x-hashAlg: sha1 (no enc → default hex)', () => {
    const HashSha1 = z.hash('sha1')
    it.concurrent('codegen: z.hash("sha1")', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'hash', 'x-hashAlg': 'sha1' })).toBe(
        'z.hash("sha1")',
      )
    })
    it.concurrent('runtime: 40-char hex PASSES', () => {
      expect(HashSha1.safeParse('a'.repeat(40)).success).toBe(true)
    })
    it.concurrent('runtime: "short" FAILS', () => {
      const valid = HashSha1.safeParse('short')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_format',
            format: 'sha1_hex',
            path: [],
            message: 'Invalid sha1_hex',
          },
        ])
      }
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // transform x-* extensions
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 x-trim: trim whitespace', () => {
    const Trim = z.string().trim()
    it.concurrent('codegen: z.string().trim()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-trim': true })).toBe('z.string().trim()')
    })
    it.concurrent('runtime: "  hi  " → "hi"', () => {
      const valid = Trim.safeParse('  hi  ')
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe('hi')
    })
  })

  describe('v3.2 x-toLowerCase: transform to lowercase', () => {
    const Lower = z.string().toLowerCase()
    it.concurrent('codegen: z.string().toLowerCase()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-toLowerCase': true })).toBe(
        'z.string().toLowerCase()',
      )
    })
    it.concurrent('runtime: "AbC" → "abc"', () => {
      const valid = Lower.safeParse('AbC')
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe('abc')
    })
  })

  describe('v3.2 x-toUpperCase: transform to uppercase', () => {
    const Upper = z.string().toUpperCase()
    it.concurrent('codegen: z.string().toUpperCase()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-toUpperCase': true })).toBe(
        'z.string().toUpperCase()',
      )
    })
    it.concurrent('runtime: "AbC" → "ABC"', () => {
      const valid = Upper.safeParse('AbC')
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe('ABC')
    })
  })

  describe('v3.2 x-normalize: NFC Unicode normalization', () => {
    const Nfc = z.string().normalize('NFC')
    it.concurrent('codegen: z.string().normalize("NFC")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-normalize': 'NFC' })).toBe(
        'z.string().normalize("NFC")',
      )
    })
    it.concurrent('runtime: NFD form normalized to NFC', () => {
      // "が" can be NFD (か + combining ゛) or NFC (single char)
      const nfd = 'が'
      const nfc = 'が'
      const valid = Nfc.safeParse(nfd)
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe(nfc)
    })
  })

  describe('v3.2 x-normalize: NFKC normalization', () => {
    const Nfkc = z.string().normalize('NFKC')
    it.concurrent('codegen: z.string().normalize("NFKC")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-normalize': 'NFKC' })).toBe(
        'z.string().normalize("NFKC")',
      )
    })
    it.concurrent('runtime: full-width digits → ASCII', () => {
      const valid = Nfkc.safeParse('１２３')
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe('123')
    })
  })

  describe('v3.2 x-lowercase: validate lowercase only', () => {
    const LowerCheck = z.string().lowercase()
    it.concurrent('codegen: z.string().lowercase()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-lowercase': true })).toBe('z.string().lowercase()')
    })
    it.concurrent('runtime: "abc" PASSES', () => {
      expect(LowerCheck.safeParse('abc').success).toBe(true)
    })
    it.concurrent('runtime: "ABC" FAILS', () => {
      const valid = LowerCheck.safeParse('ABC')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'lowercase',
            pattern: '/^[^A-Z]*$/',
            path: [],
            message: 'Invalid lowercase',
          },
        ])
      }
    })
  })

  describe('v3.2 x-uppercase: validate uppercase only', () => {
    const UpperCheck = z.string().uppercase()
    it.concurrent('codegen: z.string().uppercase()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-uppercase': true })).toBe('z.string().uppercase()')
    })
    it.concurrent('runtime: "ABC" PASSES', () => {
      expect(UpperCheck.safeParse('ABC').success).toBe(true)
    })
    it.concurrent('runtime: "abc" FAILS', () => {
      const valid = UpperCheck.safeParse('abc')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'uppercase',
            pattern: '/^[^a-z]*$/',
            path: [],
            message: 'Invalid uppercase',
          },
        ])
      }
    })
  })

  describe('v3.2 x-coerce: z.coerce.string()', () => {
    const CS = z.coerce.string()
    it.concurrent('codegen: z.coerce.string()', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-coerce': true })).toBe('z.coerce.string()')
    })
    it.concurrent('runtime: 123 → "123"', () => {
      const valid = CS.safeParse(123)
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe('123')
    })
  })

  describe('v3.2 x-coerce: z.coerce.number()', () => {
    const CN = z.coerce.number()
    it.concurrent('codegen: z.coerce.number()', () => {
      expect(zodToOpenAPI({ type: 'number', 'x-coerce': true })).toBe('z.coerce.number()')
    })
    it.concurrent('runtime: "42" → 42', () => {
      const valid = CN.safeParse('42')
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe(42)
    })
    it.concurrent('runtime: "abc" → NaN FAILS', () => {
      const valid = CN.safeParse('abc')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            received: 'NaN',
            path: [],
            message: 'Invalid input: expected number, received NaN',
          },
        ])
      }
    })
  })

  describe('v3.2 x-coerce: z.coerce.boolean()', () => {
    const CB = z.coerce.boolean()
    it.concurrent('codegen: z.coerce.boolean()', () => {
      expect(zodToOpenAPI({ type: 'boolean', 'x-coerce': true })).toBe('z.coerce.boolean()')
    })
    it.concurrent('runtime: "truthy" → true', () => {
      const valid = CB.safeParse('truthy')
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe(true)
    })
    it.concurrent('runtime: "" → false', () => {
      const valid = CB.safeParse('')
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe(false)
    })
  })

  describe('x-stringbool: z.stringbool()', () => {
    it.concurrent('codegen: x-stringbool=true → z.stringbool()', () => {
      expect(zodToOpenAPI({ type: 'boolean', 'x-stringbool': true })).toBe('z.stringbool()')
    })

    it.concurrent('codegen: x-stringbool with truthy/falsy → z.stringbool({...})', () => {
      expect(
        zodToOpenAPI({
          type: 'boolean',
          'x-stringbool': { truthy: ['yes', 'on'], falsy: ['no', 'off'] },
        }),
      ).toBe('z.stringbool({"truthy":["yes","on"],"falsy":["no","off"]})')
    })

    it.concurrent('codegen: x-stringbool with case=sensitive → z.stringbool({...})', () => {
      expect(
        zodToOpenAPI({
          type: 'boolean',
          'x-stringbool': { case: 'sensitive' },
        }),
      ).toBe('z.stringbool({"case":"sensitive"})')
    })

    it.concurrent('codegen: x-stringbool=true + x-error-message → z.stringbool({error})', () => {
      expect(
        zodToOpenAPI({
          type: 'boolean',
          'x-stringbool': true,
          'x-error-message': 'must be bool-ish',
        }),
      ).toBe('z.stringbool({error:"must be bool-ish"})')
    })

    it.concurrent('codegen: x-stringbool with truthy + x-error-message merges arg', () => {
      expect(
        zodToOpenAPI({
          type: 'boolean',
          'x-stringbool': { truthy: ['yes'] },
          'x-error-message': 'bad bool',
        }),
      ).toBe('z.stringbool({"truthy":["yes"],error:"bad bool"})')
    })

    it.concurrent('codegen: x-coerce + x-stringbool → z.stringbool() (x-stringbool wins)', () => {
      expect(
        zodToOpenAPI({
          type: 'boolean',
          'x-coerce': true,
          'x-stringbool': true,
        }),
      ).toBe('z.stringbool()')
    })

    it.concurrent('codegen: x-coerce + x-stringbool keeps x-required-message', () => {
      expect(
        zodToOpenAPI({
          type: 'boolean',
          'x-coerce': true,
          'x-stringbool': { truthy: ['yes'] },
          'x-required-message': 'needed',
        }),
      ).toBe(
        zodToOpenAPI({
          type: 'boolean',
          'x-stringbool': { truthy: ['yes'] },
          'x-required-message': 'needed',
        }),
      )
    })

    it.concurrent('runtime: "yes" → true with custom truthy', () => {
      const S = z.stringbool({ truthy: ['yes'], falsy: ['no'] })
      const valid = S.safeParse('yes')
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe(true)
    })

    it.concurrent('runtime: "false" → false with default falsy', () => {
      const S = z.stringbool()
      const valid = S.safeParse('false')
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe(false)
    })

    describe('x-stringbool: codegen — single option', () => {
      it.concurrent('codegen: truthy only', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': { truthy: ['yes'] },
          }),
        ).toBe('z.stringbool({"truthy":["yes"]})')
      })
      it.concurrent('codegen: falsy only', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': { falsy: ['no'] },
          }),
        ).toBe('z.stringbool({"falsy":["no"]})')
      })
      it.concurrent('codegen: case=insensitive only', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': { case: 'insensitive' },
          }),
        ).toBe('z.stringbool({"case":"insensitive"})')
      })
      it.concurrent('codegen: all three options (truthy + falsy + case=sensitive)', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': {
              truthy: ['Y', 'yes', '1'],
              falsy: ['N', 'no', '0'],
              case: 'sensitive',
            },
          }),
        ).toBe('z.stringbool({"truthy":["Y","yes","1"],"falsy":["N","no","0"],"case":"sensitive"})')
      })
      it.concurrent('codegen: empty options object → z.stringbool() (no empty options arg emitted)', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': {},
          }),
        ).toBe('z.stringbool()')
      })
      it.concurrent('codegen: empty truthy array preserved', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': { truthy: [] },
          }),
        ).toBe('z.stringbool({"truthy":[]})')
      })
      it.concurrent('codegen: empty falsy array preserved', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': { falsy: [] },
          }),
        ).toBe('z.stringbool({"falsy":[]})')
      })
      it.concurrent('codegen: unicode strings in truthy/falsy', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': { truthy: ['はい', 'oui'], falsy: ['いいえ', 'non'] },
          }),
        ).toBe('z.stringbool({"truthy":["はい","oui"],"falsy":["いいえ","non"]})')
      })
      it.concurrent('codegen: special chars (quotes, backslash) JSON-encoded', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': { truthy: ['a"b', 'c\\d'] },
          }),
        ).toBe('z.stringbool({"truthy":["a\\"b","c\\\\d"]})')
      })
    })

    describe('x-stringbool: codegen — error message composition', () => {
      it.concurrent('codegen: x-stringbool=true + x-required-message only → custom error fn', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': true,
            'x-required-message': 'Required',
          }),
        ).toBe('z.stringbool({error:(issue)=>issue.input===undefined?"Required":undefined})')
      })
      it.concurrent('codegen: x-stringbool=true + both messages → required+type fn', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': true,
            'x-error-message': 'Bad',
            'x-required-message': 'Need',
          }),
        ).toBe('z.stringbool({error:(issue)=>issue.input===undefined?"Need":"Bad"})')
      })
      it.concurrent('codegen: x-stringbool with options + both messages → merged arg', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': { truthy: ['yes'], falsy: ['no'] },
            'x-error-message': 'Bad',
            'x-required-message': 'Need',
          }),
        ).toBe(
          'z.stringbool({"truthy":["yes"],"falsy":["no"],error:(issue)=>issue.input===undefined?"Need":"Bad"})',
        )
      })
      it.concurrent('codegen: x-stringbool with case + x-error-message → merged', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': { case: 'sensitive' },
            'x-error-message': 'strict',
          }),
        ).toBe('z.stringbool({"case":"sensitive",error:"strict"})')
      })
      it.concurrent('codegen: empty x-stringbool object + x-error-message → no leading comma in arg', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': {},
            'x-error-message': 'bad',
          }),
        ).toBe('z.stringbool({error:"bad"})')
      })
      it.concurrent('codegen: empty x-stringbool object + x-required-message → no leading comma in arg', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': {},
            'x-required-message': 'need',
          }),
        ).toBe('z.stringbool({error:(issue)=>issue.input===undefined?"need":undefined})')
      })
    })

    describe('x-stringbool: codegen — composition with wrapping extensions', () => {
      it.concurrent('codegen: x-stringbool=true + default=true → .default(true)', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            default: true,
            'x-stringbool': true,
          }),
        ).toBe('z.stringbool().default(true)')
      })
      it.concurrent('codegen: x-stringbool=true + nullable=true → .nullable()', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            nullable: true,
            'x-stringbool': true,
          }),
        ).toBe('z.stringbool().nullable()')
      })
      it.concurrent('codegen: x-stringbool=true + type=[boolean,null] → .nullable()', () => {
        expect(
          zodToOpenAPI({
            type: ['boolean', 'null'],
            'x-stringbool': true,
          }),
        ).toBe('z.stringbool().nullable()')
      })
      it.concurrent('codegen: x-stringbool=true + nullable + default → nullable().default()', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            nullable: true,
            default: false,
            'x-stringbool': true,
          }),
        ).toBe('z.stringbool().nullable().default(false)')
      })
      it.concurrent('codegen: x-stringbool=true + x-brand → .brand<"Flag">()', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': true,
            'x-brand': 'Flag',
          }),
        ).toBe('z.stringbool().brand<"Flag">()')
      })
      it.concurrent('codegen: x-stringbool=true + x-catch=false → .catch(false)', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': true,
            'x-catch': false,
          }),
        ).toBe('z.stringbool().catch(false).openapi({"type":"boolean"})')
      })
      it.concurrent('codegen: x-stringbool=true + x-prefault=true → .prefault(true)', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': true,
            'x-prefault': true,
          }),
        ).toBe('z.stringbool().prefault(true)')
      })
      it.concurrent('codegen: x-stringbool=true + x-readonly=true → .readonly()', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': true,
            'x-readonly': true,
          }),
        ).toBe('z.stringbool().readonly()')
      })
      it.concurrent('codegen: x-stringbool=true + x-refine appends verbatim', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': true,
            'x-refine': '.refine((v)=>v===true)',
          }),
        ).toBe('z.stringbool().refine((v)=>v===true)')
      })
    })

    describe('x-stringbool: codegen — precedence with replacing extensions', () => {
      it.concurrent('codegen: x-preprocess wins over x-stringbool', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': true,
            'x-preprocess': 'PRE',
          }),
        ).toBe('PRE')
      })
      it.concurrent('codegen: x-transform wins over x-stringbool', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': true,
            'x-transform': 'TRANSFORM',
          }),
        ).toBe('TRANSFORM')
      })
      it.concurrent('codegen: x-pipe wins over x-stringbool', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': true,
            'x-pipe': 'PIPE',
          }),
        ).toBe('PIPE')
      })
      it.concurrent('codegen: x-codec wins over x-stringbool', () => {
        expect(
          zodToOpenAPI({
            type: 'boolean',
            'x-stringbool': true,
            'x-codec': 'CODEC',
          }),
        ).toBe('CODEC')
      })
    })

    describe('x-stringbool: codegen — silently ignored on non-boolean types', () => {
      it.concurrent('codegen: x-stringbool on type=string → plain z.string()', () => {
        expect(
          zodToOpenAPI({
            type: 'string',
            'x-stringbool': true,
          }),
        ).toBe('z.string()')
      })
      it.concurrent('codegen: x-stringbool on type=number → plain z.number()', () => {
        expect(
          zodToOpenAPI({
            type: 'number',
            'x-stringbool': true,
          }),
        ).toBe('z.number()')
      })
    })

    describe('x-stringbool: runtime — default truthy/falsy lists', () => {
      const S = z.stringbool()
      it.concurrent('runtime default: "true" → true', () => {
        const result = S.safeParse('true')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(true)
      })
      it.concurrent('runtime default: "1" → true', () => {
        const result = S.safeParse('1')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(true)
      })
      it.concurrent('runtime default: "yes" → true', () => {
        const result = S.safeParse('yes')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(true)
      })
      it.concurrent('runtime default: "on" → true', () => {
        const result = S.safeParse('on')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(true)
      })
      it.concurrent('runtime default: "y" → true', () => {
        const result = S.safeParse('y')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(true)
      })
      it.concurrent('runtime default: "enabled" → true', () => {
        const result = S.safeParse('enabled')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(true)
      })
      it.concurrent('runtime default: "0" → false', () => {
        const result = S.safeParse('0')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(false)
      })
      it.concurrent('runtime default: "no" → false', () => {
        const result = S.safeParse('no')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(false)
      })
      it.concurrent('runtime default: "off" → false', () => {
        const result = S.safeParse('off')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(false)
      })
      it.concurrent('runtime default: "disabled" → false', () => {
        const result = S.safeParse('disabled')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(false)
      })
      it.concurrent('runtime default: case-insensitive "TRUE" → true', () => {
        const result = S.safeParse('TRUE')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(true)
      })
      it.concurrent('runtime default: case-insensitive "Yes" → true', () => {
        const result = S.safeParse('Yes')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(true)
      })
      it.concurrent('runtime default: unknown string fails', () => {
        const result = S.safeParse('maybe')
        expect(result.success).toBe(false)
      })
      it.concurrent('runtime default: non-string (boolean) fails', () => {
        const result = S.safeParse(true)
        expect(result.success).toBe(false)
      })
    })

    describe('x-stringbool: runtime — custom truthy/falsy override defaults', () => {
      const S = z.stringbool({ truthy: ['oui'], falsy: ['non'] })
      it.concurrent('runtime custom: "oui" → true', () => {
        const result = S.safeParse('oui')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(true)
      })
      it.concurrent('runtime custom: "non" → false', () => {
        const result = S.safeParse('non')
        expect(result.success).toBe(true)
        if (result) expect(result.data).toBe(false)
      })
      it.concurrent('runtime custom: default "true" no longer accepted', () => {
        const result = S.safeParse('true')
        expect(result.success).toBe(false)
      })
      it.concurrent('runtime custom: default "false" no longer accepted', () => {
        const result = S.safeParse('false')
        expect(result.success).toBe(false)
      })
    })

    describe('x-stringbool: runtime — case sensitivity', () => {
      it.concurrent('runtime case=sensitive: "true" → true, "TRUE" → fail', () => {
        const S = z.stringbool({ case: 'sensitive' })
        expect(S.safeParse('true').success).toBe(true)
        expect(S.safeParse('TRUE').success).toBe(false)
      })
      it.concurrent('runtime case=insensitive (default): "TRUE" → true', () => {
        const S = z.stringbool({ case: 'insensitive' })
        expect(S.safeParse('TRUE').success).toBe(true)
      })
      it.concurrent('runtime case=sensitive custom: matches exact only', () => {
        const S = z.stringbool({ truthy: ['Y'], falsy: ['N'], case: 'sensitive' })
        expect(S.safeParse('Y').success).toBe(true)
        expect(S.safeParse('y').success).toBe(false)
        expect(S.safeParse('N').success).toBe(true)
        expect(S.safeParse('n').success).toBe(false)
      })
    })

    describe('x-stringbool: runtime — custom error message', () => {
      it.concurrent('runtime: x-error-message surfaces on invalid input', () => {
        const S = z.stringbool({ error: 'must be bool-ish' })
        const result = S.safeParse('garbage')
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('must be bool-ish')
        }
      })
      it.concurrent('runtime: x-required-message via fn for undefined input', () => {
        const S = z.stringbool({
          error: (issue) => (issue.input === undefined ? 'Required' : undefined),
        })
        const result = S.safeParse(undefined)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues[0]?.message).toBe('Required')
        }
      })
    })
  })

  describe('v3.2 x-coerce: z.coerce.date() for date format', () => {
    const CD = z.coerce.date()
    it.concurrent('codegen: z.coerce.date()', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date', 'x-coerce': true })).toBe(
        'z.coerce.date()',
      )
    })
    it.concurrent('runtime: "2024-01-02" → Date PASSES', () => {
      const valid = CD.safeParse('2024-01-02')
      expect(valid.success).toBe(true)
    })
    it.concurrent('runtime: "not-a-date" FAILS', () => {
      const valid = CD.safeParse('not-a-date')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'date',
            code: 'invalid_type',
            received: 'Invalid Date',
            path: [],
            message: 'Invalid input: expected date, received Date',
          },
        ])
      }
    })
  })

  describe('v3.2 x-includes: substring presence', () => {
    const Inc = z.string().includes('foo')
    it.concurrent('codegen: z.string().includes("foo")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-includes': 'foo' })).toBe(
        'z.string().includes("foo")',
      )
    })
    it.concurrent('runtime: "barfoo" PASSES', () => {
      expect(Inc.safeParse('barfoo').success).toBe(true)
    })
    it.concurrent('runtime: "bar" FAILS', () => {
      const valid = Inc.safeParse('bar')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'includes',
            includes: 'foo',
            path: [],
            message: 'Invalid string: must include "foo"',
          },
        ])
      }
    })
  })

  describe('v3.2 x-startsWith: prefix check', () => {
    const Sw = z.string().startsWith('http')
    it.concurrent('codegen: z.string().startsWith("http")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-startsWith': 'http' })).toBe(
        'z.string().startsWith("http")',
      )
    })
    it.concurrent('runtime: "http://x" PASSES', () => {
      expect(Sw.safeParse('http://x').success).toBe(true)
    })
    it.concurrent('runtime: "ftp://x" FAILS', () => {
      const valid = Sw.safeParse('ftp://x')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'starts_with',
            prefix: 'http',
            path: [],
            message: 'Invalid string: must start with "http"',
          },
        ])
      }
    })
  })

  describe('v3.2 x-endsWith: suffix check', () => {
    const Ew = z.string().endsWith('.com')
    it.concurrent('codegen: z.string().endsWith(".com")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-endsWith': '.com' })).toBe(
        'z.string().endsWith(".com")',
      )
    })
    it.concurrent('runtime: "x.com" PASSES', () => {
      expect(Ew.safeParse('x.com').success).toBe(true)
    })
    it.concurrent('runtime: "x.org" FAILS', () => {
      const valid = Ew.safeParse('x.org')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'ends_with',
            suffix: '.com',
            path: [],
            message: 'Invalid string: must end with ".com"',
          },
        ])
      }
    })
  })

  describe('v3.2 x-trim + x-toLowerCase + email format (pre-validation pipe)', () => {
    const Pipe = z.string().trim().toLowerCase().pipe(z.email())
    it.concurrent('codegen: z.string().trim().toLowerCase().pipe(z.email())', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'email',
          'x-trim': true,
          'x-toLowerCase': true,
        }),
      ).toBe('z.string().trim().toLowerCase().pipe(z.email())')
    })
    it.concurrent('runtime: "  Foo@Example.com  " → "foo@example.com"', () => {
      const valid = Pipe.safeParse('  Foo@Example.com  ')
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe('foo@example.com')
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // extension x-* (prefault / readonly / codec)
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 x-prefault: input default', () => {
    const Pf = z.string().prefault('def')
    it.concurrent('codegen: z.string().prefault("def")', () => {
      expect(zodToOpenAPI({ type: 'string', 'x-prefault': 'def' })).toBe(
        'z.string().prefault("def")',
      )
    })
    it.concurrent('runtime: undefined → "def"', () => {
      const valid = Pf.safeParse(undefined)
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe('def')
    })
    it.concurrent('runtime: 1 → invalid_type', () => {
      const valid = Pf.safeParse(1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 x-readonly: .readonly() (Object.freeze on output)', () => {
    const Fr = z.object({ a: z.string() }).readonly()
    it.concurrent('codegen: z.object({a:z.string()}).readonly().openapi(...)', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { a: { type: 'string' } },
          required: ['a'],
          'x-readonly': true,
        }),
      ).toBe('z.object({a:z.string()}).readonly().openapi({"required":["a"]})')
    })
    it.concurrent('runtime: {a:"x"} PASSES (frozen)', () => {
      const valid = Fr.safeParse({ a: 'x' })
      expect(valid.success).toBe(true)
      if (valid) expect(Object.isFrozen(valid.data)).toBe(true)
    })
    it.concurrent('runtime: {a:1} FAILS', () => {
      const valid = Fr.safeParse({ a: 1 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: ['a'],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 x-codec: date (string ⇄ Date)', () => {
    const Codec = z.codec(z.iso.date(), z.date(), {
      decode: (isoString: string) => new Date(isoString),
      encode: (date: Date) => date.toISOString(),
    })
    it.concurrent('codegen: z.codec(z.iso.date(),z.date(),{decode,encode})', () => {
      expect(zodToOpenAPI({ type: 'string', format: 'date', 'x-codec': 'date' })).toBe('date')
    })
    it.concurrent('runtime: "2024-01-02" → Date instance PASSES', () => {
      const valid = Codec.safeParse('2024-01-02')
      expect(valid.success).toBe(true)
    })
    it.concurrent('runtime: "not-a-date" FAILS', () => {
      const valid = Codec.safeParse('not-a-date')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'invalid_format',
            format: 'date',
            pattern:
              '/^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))$/',
            path: [],
            message: 'Invalid ISO date',
          },
        ])
      }
    })
  })

  describe('v3.2 x-codec: date for date-time format', () => {
    const CodecDt = z.codec(z.iso.datetime(), z.date(), {
      decode: (isoString: string) => new Date(isoString),
      encode: (date: Date) => date.toISOString(),
    })
    it.concurrent('codegen: z.codec(z.iso.datetime(),z.date(),{decode,encode})', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          format: 'date-time',
          'x-codec': 'date',
        }),
      ).toBe('date')
    })
    it.concurrent('runtime: "2024-01-02T03:04:05Z" PASSES', () => {
      const valid = CodecDt.safeParse('2024-01-02T03:04:05Z')
      expect(valid.success).toBe(true)
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // numeric format extensions
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 integer format: bigint', () => {
    const Bi = z.bigint()
    it.concurrent('codegen: z.bigint()', () => {
      expect(zodToOpenAPI({ type: 'integer', format: 'bigint' })).toBe(
        String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.bigint()).openapi({type:"integer",format:"bigint"})`,
      )
    })
    it.concurrent('runtime: BigInt(1) PASSES', () => {
      expect(Bi.safeParse(1n).success).toBe(true)
    })
    it.concurrent('runtime: 1 (number) FAILS', () => {
      const valid = Bi.safeParse(1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'bigint',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected bigint, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 integer format: int64', () => {
    const I64 = z.int64()
    it.concurrent('codegen: z.int64()', () => {
      expect(zodToOpenAPI({ type: 'integer', format: 'int64' })).toBe(
        String.raw`z.preprocess((val)=>(typeof val==='number'&&Number.isSafeInteger(val)?BigInt(val):typeof val==='string'&&/^-?\d+$/.test(val)?BigInt(val):val),z.int64()).openapi({type:"integer",format:"int64"})`,
      )
    })
    it.concurrent('runtime: BigInt(1) PASSES', () => {
      expect(I64.safeParse(1n).success).toBe(true)
    })
    it.concurrent('runtime: 1 (number) FAILS', () => {
      const valid = I64.safeParse(1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'bigint',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected bigint, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 number format: float32', () => {
    const F32 = z.float32()
    it.concurrent('codegen: z.float32()', () => {
      expect(zodToOpenAPI({ type: 'number', format: 'float32' })).toBe('z.float32()')
    })
    it.concurrent('runtime: 1.5 PASSES', () => {
      expect(F32.safeParse(1.5).success).toBe(true)
    })
    it.concurrent('runtime: "x" FAILS', () => {
      const valid = F32.safeParse('x')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
  })

  describe('v3.2 number format: float64', () => {
    const F64 = z.float64()
    it.concurrent('codegen: z.float64()', () => {
      expect(zodToOpenAPI({ type: 'number', format: 'float64' })).toBe('z.float64()')
    })
    it.concurrent('runtime: 1.5 PASSES', () => {
      expect(F64.safeParse(1.5).success).toBe(true)
    })
    it.concurrent('runtime: "x" FAILS', () => {
      const valid = F64.safeParse('x')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: [],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // array applications
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 array: prefixItems + items:false (length cap)', () => {
    const PrefixCap = z.array(z.unknown()).superRefine((arr, ctx) => {
      const Prefix = [z.string(), z.number()]
      for (const [i, Schema] of Prefix.slice(0, arr.length).entries()) {
        const valid = Schema.safeParse(arr[i])
        if (!valid.success) {
          for (const issue of valid.error.issues) {
            ctx.addIssue({ ...issue, path: [i, ...issue.path] })
          }
        }
      }
      for (let i = Prefix.length; i < arr.length; i += 1) {
        ctx.addIssue({ code: 'custom', path: [i], message: `Unevaluated item at index ${i}` })
      }
    })
    it.concurrent('codegen: superRefine with prefix + length cap', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          prefixItems: [{ type: 'string' }, { type: 'number' }],
          items: false,
        } as unknown as Schema),
      ).toBe(
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string(),z.number()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]})}}};for(let i=Prefix.length;i<arr.length;i++){ctx.addIssue({code:"custom",path:[i]})}})',
      )
    })
    it.concurrent('runtime: ["a"] PASSES (incomplete prefix)', () => {
      expect(PrefixCap.safeParse(['a']).success).toBe(true)
    })
    it.concurrent('runtime: ["a", 1] PASSES (full prefix)', () => {
      expect(PrefixCap.safeParse(['a', 1]).success).toBe(true)
    })
    it.concurrent('runtime: ["a", 1, "extra"] FAILS (cap exceeded at index 2)', () => {
      const valid = PrefixCap.safeParse(['a', 1, 'extra'])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: [2],
            message: 'Unevaluated item at index 2',
          },
        ])
      }
    })
  })

  describe('v3.2 array: prefixItems alone (no rest) — trailing items allowed', () => {
    const PrefixOnly = z.array(z.unknown()).superRefine((arr, ctx) => {
      const Prefix = [z.string()]
      for (const [i, Schema] of Prefix.slice(0, arr.length).entries()) {
        const valid = Schema.safeParse(arr[i])
        if (!valid.success) {
          for (const issue of valid.error.issues) {
            ctx.addIssue({ ...issue, path: [i, ...issue.path] })
          }
        }
      }
    })
    it.concurrent('codegen: superRefine with prefix only', () => {
      expect(zodToOpenAPI({ type: 'array', prefixItems: [{ type: 'string' }] })).toBe(
        'z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.string()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]})}}}})',
      )
    })
    it.concurrent('runtime: ["a", 1, true] PASSES (extras allowed)', () => {
      expect(PrefixOnly.safeParse(['a', 1, true]).success).toBe(true)
    })
    it.concurrent('runtime: [1] FAILS (prefix mismatch at index 0)', () => {
      const valid = PrefixOnly.safeParse([1])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [0],
            message: 'Invalid input: expected string, received number',
          },
        ])
      }
    })
  })

  describe('v3.2 array: uniqueItems on object array (deep equal)', () => {
    const Uniq = z.array(z.object({ id: z.string() })).superRefine((items, ctx) => {
      const seen = new Map<string, number>()
      for (const [i, val] of items.entries()) {
        const key = JSON.stringify(val)
        if (seen.has(key)) {
          ctx.addIssue({
            code: 'custom',
            path: [i],
            message: `Duplicate of index ${seen.get(key)}`,
          })
        } else seen.set(key, i)
      }
    })
    it.concurrent('codegen: object array with uniqueItems superRefine', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
          uniqueItems: true,
        }),
      ).toBe(
        'z.array(z.object({id:z.string()}).openapi({"required":["id"]})).superRefine((items,ctx)=>{const seen=new Map();for(const [i,val] of items.entries()){const key=JSON.stringify(val);if(seen.has(key))ctx.addIssue({code:"custom",path:[i]});else seen.set(key,i)}})',
      )
    })
    it.concurrent('runtime: [{id:"a"},{id:"b"}] PASSES', () => {
      expect(Uniq.safeParse([{ id: 'a' }, { id: 'b' }]).success).toBe(true)
    })
    it.concurrent('runtime: [{id:"a"},{id:"a"}] FAILS at index 1', () => {
      const valid = Uniq.safeParse([{ id: 'a' }, { id: 'a' }])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            path: [1],
            message: 'Duplicate of index 0',
          },
        ])
      }
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // object applications
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 object: additionalProperties Schema → z.record', () => {
    const Rec = z.record(z.string(), z.number())
    it.concurrent('codegen: z.record(z.string(),z.number())', () => {
      expect(zodToOpenAPI({ type: 'object', additionalProperties: { type: 'number' } })).toBe(
        'z.record(z.string(),z.number())',
      )
    })
    it.concurrent('runtime: {a:1,b:2} PASSES', () => {
      expect(Rec.safeParse({ a: 1, b: 2 }).success).toBe(true)
    })
    it.concurrent('runtime: {a:"x"} FAILS at .a', () => {
      const valid = Rec.safeParse({ a: 'x' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'number',
            code: 'invalid_type',
            path: ['a'],
            message: 'Invalid input: expected number, received string',
          },
        ])
      }
    })
  })

  describe('v3.2 object: looseObject (additionalProperties: true)', () => {
    const Loose = z.looseObject({ a: z.string().exactOptional() })
    it.concurrent('codegen: z.looseObject({a:z.string().exactOptional()})', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { a: { type: 'string' } },
          additionalProperties: true,
        }),
      ).toBe('z.looseObject({a:z.string().exactOptional()}).openapi({"required":[]})')
    })
    it.concurrent('runtime: {a:"x", extra:1} PASSES (extras kept)', () => {
      const valid = Loose.safeParse({ a: 'x', extra: 1 })
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toStrictEqual({ a: 'x', extra: 1 })
    })
  })

  describe('v3.2 object: strictObject (additionalProperties: false)', () => {
    const Strict = z.strictObject({ a: z.string().exactOptional() })
    it.concurrent('codegen: z.strictObject({a:z.string().exactOptional()})', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { a: { type: 'string' } },
          additionalProperties: false,
        }),
      ).toBe('z.strictObject({a:z.string().exactOptional()}).openapi({"required":[]})')
    })
    it.concurrent('runtime: {a:"x"} PASSES', () => {
      expect(Strict.safeParse({ a: 'x' }).success).toBe(true)
    })
    it.concurrent('runtime: {a:"x", extra:1} FAILS unrecognized_keys', () => {
      const valid = Strict.safeParse({ a: 'x', extra: 1 })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'unrecognized_keys',
            keys: ['extra'],
            path: [],
            message: 'Unrecognized key: "extra"',
          },
        ])
      }
    })
  })

  describe('v3.2 object: plain z.object strips unknown keys', () => {
    const Plain = z.object({ a: z.string().exactOptional() })
    it.concurrent('codegen: z.object({a:z.string().exactOptional()})', () => {
      expect(zodToOpenAPI({ type: 'object', properties: { a: { type: 'string' } } })).toBe(
        'z.object({a:z.string().exactOptional()}).openapi({"required":[]})',
      )
    })
    it.concurrent('runtime: {a:"x", extra:1} → {a:"x"} (stripped)', () => {
      const valid = Plain.safeParse({ a: 'x', extra: 1 })
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toStrictEqual({ a: 'x' })
    })
  })

  describe('v3.2 object: dependentSchemas (name present → enforces shape)', () => {
    const Dep = z.object({ name: z.string().exactOptional() }).superRefine((o, ctx) => {
      if (!Object.hasOwn(o, 'name')) return
      const Schema = z.unknown().superRefine((val, innerCtx) => {
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          if (!Object.hasOwn(val, 'age')) {
            innerCtx.addIssue({ code: 'custom', message: 'missing required: age' })
          }
          if (Object.hasOwn(val, 'age')) {
            const AgeSchema = z.int()
            if (!AgeSchema.safeParse(Reflect.get(val, 'age')).success) {
              innerCtx.addIssue({ code: 'custom', message: 'invalid property' })
            }
          }
        }
      })
      const valid = Schema.safeParse(o)
      if (!valid.success) {
        for (const issue of valid.error.issues) ctx.addIssue({ ...issue, path: issue.path })
      }
    })
    it.concurrent('codegen: object + dependentSchemas superRefine chain', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { name: { type: 'string' } },
          dependentSchemas: {
            name: { properties: { age: { type: 'integer' } }, required: ['age'] },
          },
        }),
      ).toBe(
        'z.object({name:z.string().exactOptional()}).superRefine((o,ctx)=>{if(!Object.hasOwn(o,"name")){return}const Schema=z.object({age:z.int()}).openapi({"required":["age"]});const result=Schema.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}).openapi({"required":[]})',
      )
    })
    it.concurrent('runtime: {} PASSES (no name → dep skipped)', () => {
      expect(Dep.safeParse({}).success).toBe(true)
    })
    it.concurrent('runtime: {name:"taro"} FAILS (age stripped, dep triggers)', () => {
      const valid = Dep.safeParse({ name: 'taro' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            message: 'missing required: age',
            path: [],
          },
        ])
      }
    })
  })

  describe('v3.2 object: if/then/else conditional shape (country → postalCode pattern)', () => {
    const IfThen = z
      .object({ country: z.string(), postalCode: z.string().exactOptional() })
      .superRefine((o, ctx) => {
        const If = z.unknown().superRefine((val, innerCtx) => {
          if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            if (Object.hasOwn(val, 'country')) {
              const Schema = z.literal('JP')
              if (!Schema.safeParse(Reflect.get(val, 'country')).success) {
                innerCtx.addIssue({ code: 'custom', message: 'invalid property' })
              }
            }
          }
        })
        const ifOk = If.safeParse(o).success
        const Branch = ifOk
          ? z.unknown().superRefine((val, innerCtx) => {
              if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                if (Object.hasOwn(val, 'postalCode')) {
                  // oxlint-disable-next-line require-unicode-regexp -- mirrors the regex literal the generator emits
                  const Schema = z.string().regex(/^\d{3}-\d{4}$/)
                  if (!Schema.safeParse(Reflect.get(val, 'postalCode')).success) {
                    innerCtx.addIssue({ code: 'custom', message: 'invalid property' })
                  }
                }
              }
            })
          : z.unknown().superRefine((val, innerCtx) => {
              if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                if (Object.hasOwn(val, 'postalCode')) {
                  const Schema = z.string().min(1)
                  if (!Schema.safeParse(Reflect.get(val, 'postalCode')).success) {
                    innerCtx.addIssue({ code: 'custom', message: 'invalid property' })
                  }
                }
              }
            })
        if (!Branch) return
        const valid = Branch.safeParse(o)
        if (!valid.success) {
          for (const issue of valid.error.issues) ctx.addIssue({ ...issue, path: issue.path })
        }
      })
    it.concurrent('codegen: if/then/else superRefine emission', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          properties: { country: { type: 'string' }, postalCode: { type: 'string' } },
          required: ['country'],
          if: { properties: { country: { const: 'JP' } } },
          // oxlint-disable-next-line no-thenable -- JSON Schema `then` keyword as property name (essential)
          then: {
            properties: { postalCode: { type: 'string', pattern: '^\\d{3}-\\d{4}$' } },
          },
          else: { properties: { postalCode: { type: 'string', minLength: 1 } } },
        }),
      ).toBe(
        'z.object({country:z.string(),postalCode:z.string().exactOptional()}).superRefine((o,ctx)=>{const If=z.object({country:z.literal("JP").exactOptional()}).openapi({"required":[]});const ifOk=If.safeParse(o).success;const Branch=ifOk?z.object({postalCode:z.string().regex(/^\\d{3}-\\d{4}$/).exactOptional()}).openapi({"required":[]}):z.object({postalCode:z.string().min(1).exactOptional()}).openapi({"required":[]});if(!Branch){return}const result=Branch.safeParse(o);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:issue.path})}}}).openapi({"required":["country"]})',
      )
    })
    it.concurrent('runtime: {country:"JP", postalCode:"123-4567"} PASSES', () => {
      expect(IfThen.safeParse({ country: 'JP', postalCode: '123-4567' }).success).toBe(true)
    })
    it.concurrent('runtime: {country:"JP", postalCode:"oops"} FAILS', () => {
      const valid = IfThen.safeParse({ country: 'JP', postalCode: 'oops' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            message: 'invalid property',
            path: [],
          },
        ])
      }
    })
    it.concurrent('runtime: {country:"US", postalCode:"X"} PASSES (else branch)', () => {
      expect(IfThen.safeParse({ country: 'US', postalCode: 'X' }).success).toBe(true)
    })
    it.concurrent('runtime: {country:"US", postalCode:""} FAILS (else branch min)', () => {
      const valid = IfThen.safeParse({ country: 'US', postalCode: '' })
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'custom',
            message: 'invalid property',
            path: [],
          },
        ])
      }
    })
  })

  // ───────────────────────────────────────────────────────────────────
  // combination cases
  // ───────────────────────────────────────────────────────────────────

  describe('v3.2 nullable + default (type:["string","null"])', () => {
    const ND = z.string().nullable().default('x')
    it.concurrent('codegen: z.string().nullable().default("x")', () => {
      expect(zodToOpenAPI({ type: ['string', 'null'], default: 'x' })).toBe(
        'z.string().nullable().default("x")',
      )
    })
    it.concurrent('runtime: undefined → "x"', () => {
      const valid = ND.safeParse(undefined)
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe('x')
    })
    it.concurrent('runtime: null → null', () => {
      const valid = ND.safeParse(null)
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBeNull()
    })
  })

  describe('v3.2 default + nullable + x-error-message', () => {
    const NDE = z.string({ error: 'NG' }).nullable().default('d')
    it.concurrent('codegen: z.string({error:"NG"}).nullable().default("d")', () => {
      expect(
        zodToOpenAPI({
          type: 'string',
          default: 'd',
          nullable: true,
          'x-error-message': 'NG',
        }),
      ).toBe('z.string({error:"NG"}).nullable().default("d")')
    })
    it.concurrent('runtime: undefined → "d"', () => {
      const valid = NDE.safeParse(undefined)
      expect(valid.success).toBe(true)
      if (valid) expect(valid.data).toBe('d')
    })
    it.concurrent('runtime: 1 (number) FAILS with custom message', () => {
      const valid = NDE.safeParse(1)
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            expected: 'string',
            code: 'invalid_type',
            path: [],
            message: 'NG',
          },
        ])
      }
    })
  })

  describe('v3.2 enum + x-coerce: number enum (coerce ignored on enum codegen)', () => {
    const Enum = z.union([z.literal(1), z.literal(2), z.literal(3)])
    it.concurrent('codegen: z.union([z.literal(1),z.literal(2),z.literal(3)])', () => {
      expect(zodToOpenAPI({ type: 'number', enum: [1, 2, 3], 'x-coerce': true })).toBe(
        'z.union([z.literal(1),z.literal(2),z.literal(3)])',
      )
    })
    it.concurrent('runtime: 2 PASSES', () => {
      expect(Enum.safeParse(2).success).toBe(true)
    })
    it.concurrent('runtime: "2" (string) FAILS — no coerce on union of literals', () => {
      const valid = Enum.safeParse('2')
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            code: 'invalid_union',
            errors: [
              [
                {
                  code: 'invalid_value',
                  values: [1],
                  path: [],
                  message: 'Invalid input: expected 1',
                },
              ],
              [
                {
                  code: 'invalid_value',
                  values: [2],
                  path: [],
                  message: 'Invalid input: expected 2',
                },
              ],
              [
                {
                  code: 'invalid_value',
                  values: [3],
                  path: [],
                  message: 'Invalid input: expected 3',
                },
              ],
            ],
            path: [],
            message: 'Invalid input',
          },
        ])
      }
    })
  })

  describe('v3.2 array of object with nested validation', () => {
    const Nested = z.array(z.object({ id: z.string().min(1) })).min(1)
    it.concurrent('codegen: z.array(z.object({id:z.string().min(1)}).openapi(...)).min(1)', () => {
      expect(
        zodToOpenAPI({
          type: 'array',
          items: {
            type: 'object',
            properties: { id: { type: 'string', minLength: 1 } },
            required: ['id'],
          },
          minItems: 1,
        }),
      ).toBe('z.array(z.object({id:z.string().min(1)}).openapi({"required":["id"]})).min(1)')
    })
    it.concurrent('runtime: [{id:"a"}] PASSES', () => {
      expect(Nested.safeParse([{ id: 'a' }]).success).toBe(true)
    })
    it.concurrent('runtime: [] FAILS too_small', () => {
      const valid = Nested.safeParse([])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'array',
            code: 'too_small',
            minimum: 1,
            inclusive: true,
            path: [],
            message: 'Too small: expected array to have >=1 items',
          },
        ])
      }
    })
    it.concurrent('runtime: [{id:""}] FAILS at .[0].id (nested too_small)', () => {
      const valid = Nested.safeParse([{ id: '' }])
      expect(valid.success).toBe(false)
      if (!valid.success) {
        expect(valid.error.issues).toStrictEqual([
          {
            origin: 'string',
            code: 'too_small',
            minimum: 1,
            inclusive: true,
            path: [0, 'id'],
            message: 'Too small: expected string to have >=1 characters',
          },
        ])
      }
    })
  })
  describe('allOf + unevaluatedProperties without a custom message', () => {
    it.concurrent('re-pushes sub-issues via per-code dispatch (assignable to the raw-issue union)', () => {
      expect(
        zodToOpenAPI({
          allOf: [
            { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
            { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
          ],
          unevaluatedProperties: false,
        }),
      ).toBe(
        `(()=>{const Schema=z.object({id:z.string()}).openapi({"required":["id"]}).and(z.object({name:z.string()}).openapi({"required":["name"]}));return z.preprocess((val: z.input<typeof Schema>,ctx)=>{const result=Schema.safeParse(ctx.value);if(!result.success){for(const issue of result.error.issues){if(issue.code==='invalid_type'){ctx.issues.push({...issue,input:issue.input})}else if(issue.code==='too_big'){ctx.issues.push({...issue,input:issue.input})}else if(issue.code==='too_small'){ctx.issues.push({...issue,input:issue.input})}else if(issue.code==='invalid_format'){ctx.issues.push({...issue,input:issue.input})}else if(issue.code==='not_multiple_of'){ctx.issues.push({...issue,input:issue.input})}else if(issue.code==='unrecognized_keys'){ctx.issues.push({...issue,input:issue.input})}else if(issue.code==='invalid_union'){ctx.issues.push({...issue,input:issue.input})}else if(issue.code==='invalid_key'){ctx.issues.push({...issue,input:issue.input})}else if(issue.code==='invalid_element'){ctx.issues.push({...issue,input:issue.input})}else if(issue.code==='invalid_value'){ctx.issues.push({...issue,input:issue.input})}else if(issue.code==='custom'){ctx.issues.push({...issue,input:issue.input})}}};((ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;const e=new Set();for(const k of ["id"]){e.add(k)};for(const k of ["name"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}})(ctx);return val},Schema)})()`,
      )
    })
  })
  // `unevaluatedProperties` beside `anyOf` / `oneOf` (#466): the union / xor
  // used to drop the check entirely, so a key no branch evaluates was
  // accepted. The check now runs on the raw input, piped into the union,
  // the same pattern the `allOf` path uses.
  describe('anyOf / oneOf + unevaluatedProperties (#466)', () => {
    const branch: Schema = { type: 'object', properties: { a: { type: 'string' } } }
    // The unevaluated check for the plain `branch` case.
    const branchCheck =
      '(ctx)=>{const o=ctx.value;if(typeof o!==\'object\'||o===null||Array.isArray(o))return;let mA=0;const e=new Set();if(z.object({a:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success){mA++;for(const k of ["a"]){e.add(k)}};if(mA>0){for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}'
    // The same check for `oneOf`: the final statement runs only when exactly
    // one branch matched (`mO===1`), so two matching branches report only
    // the xor error.
    const branchCheckOneOf =
      '(ctx)=>{const o=ctx.value;if(typeof o!==\'object\'||o===null||Array.isArray(o))return;let mO=0;const e=new Set();if(z.object({a:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success){mO++;for(const k of ["a"]){e.add(k)}};if(mO===1){for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}'
    // The check for the nested-`anyOf` distributed case: the `z.string()`
    // branch evaluates no keys, but its match still counts (`mA++` alone),
    // so a string value reports nothing while an object value reports its
    // unevaluated keys.
    const branchCheckWithString =
      '(ctx)=>{const o=ctx.value;if(typeof o!==\'object\'||o===null||Array.isArray(o))return;let mA=0;const e=new Set();if(z.object({a:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success){mA++;for(const k of ["a"]){e.add(k)}};if(z.string().safeParse(o).success){mA++;};if(mA>0){for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}'
    it.concurrent('codegen: anyOf + unevaluatedProperties=false → preprocess wraps z.union', () => {
      expect(zodToOpenAPI({ type: 'object', anyOf: [branch], unevaluatedProperties: false })).toBe(
        withCheck(
          'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]})])',
          branchCheck,
        ),
      )
    })
    it.concurrent('codegen: oneOf + unevaluatedProperties=false → preprocess wraps z.xor', () => {
      expect(zodToOpenAPI({ type: 'object', oneOf: [branch], unevaluatedProperties: false })).toBe(
        withCheck(
          'z.xor([z.object({a:z.string().exactOptional()}).openapi({"required":[]})])',
          branchCheckOneOf,
        ),
      )
    })
    it.concurrent('codegen: anyOf without type + unevaluatedProperties=false → same check', () => {
      expect(zodToOpenAPI({ anyOf: [branch], unevaluatedProperties: false })).toBe(
        withCheck(
          'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]})])',
          branchCheck,
        ),
      )
    })
    it.concurrent('codegen: anyOf + unevaluatedProperties=true → plain union, no check', () => {
      expect(zodToOpenAPI({ type: 'object', anyOf: [branch], unevaluatedProperties: true })).toBe(
        'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]})])',
      )
    })
    it.concurrent('codegen: anyOf + sibling properties + unevaluatedProperties=false → preprocess wraps the intersection', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          anyOf: [branch],
          properties: { b: { type: 'number' } },
          unevaluatedProperties: false,
        }),
      ).toBe(
        withCheck(
          'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]})]).and(z.object({b:z.number().exactOptional()}).openapi({"required":[]}))',
          '(ctx)=>{const o=ctx.value;if(typeof o!==\'object\'||o===null||Array.isArray(o))return;let mA=0;const e=new Set();for(const k of ["b"]){e.add(k)};if(z.object({a:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success){mA++;for(const k of ["a"]){e.add(k)}};if(mA>0){for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}',
        ),
      )
    })
    it.concurrent('codegen: anyOf + $ref branch → the component keys count as evaluated', () => {
      expect(
        zodToOpenAPI(
          {
            type: 'object',
            anyOf: [{ $ref: '#/components/schemas/A' }],
            unevaluatedProperties: false,
          },
          undefined,
          { schemas: { A: branch } },
        ),
      ).toBe(
        withCheck(
          'z.union([ASchema])',
          '(ctx)=>{const o=ctx.value;if(typeof o!==\'object\'||o===null||Array.isArray(o))return;let mA=0;const e=new Set();if(ASchema.safeParse(o).success){mA++;for(const k of ["a"]){e.add(k)}};if(mA>0){for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}',
        ),
      )
    })
    it.concurrent('codegen: anyOf + nested anyOf branch → the nested matching branch keys count', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          anyOf: [{ anyOf: [branch, { type: 'object', properties: { d: { type: 'boolean' } } }] }],
          unevaluatedProperties: false,
        }),
      ).toBe(
        withCheck(
          'z.union([z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}),z.object({d:z.boolean().exactOptional()}).openapi({"required":[]})])])',
          '(ctx)=>{const o=ctx.value;if(typeof o!==\'object\'||o===null||Array.isArray(o))return;let mA=0;const e=new Set();if(z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}),z.object({d:z.boolean().exactOptional()}).openapi({"required":[]})]).safeParse(o).success){mA++;if(z.object({a:z.string().exactOptional()}).openapi({"required":[]}).safeParse(o).success){for(const k of ["a"]){e.add(k)}};if(z.object({d:z.boolean().exactOptional()}).openapi({"required":[]}).safeParse(o).success){for(const k of ["d"]){e.add(k)}}};if(mA>0){for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}',
        ),
      )
    })
    it.concurrent('codegen: anyOf + allOf branch → the member keys count as evaluated', () => {
      expect(
        zodToOpenAPI({
          type: 'object',
          anyOf: [
            {
              allOf: [
                { type: 'object', properties: { a: { type: 'string' } } },
                { type: 'object', properties: { b: { type: 'number' } } },
              ],
            },
          ],
          unevaluatedProperties: false,
        }),
      ).toBe(
        withCheck(
          'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({b:z.number().exactOptional()}).openapi({"required":[]}))])',
          '(ctx)=>{const o=ctx.value;if(typeof o!==\'object\'||o===null||Array.isArray(o))return;let mA=0;const e=new Set();if(z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({b:z.number().exactOptional()}).openapi({"required":[]})).safeParse(o).success){mA++;for(const k of ["a"]){e.add(k)};for(const k of ["b"]){e.add(k)}};if(mA>0){for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}',
        ),
      )
    })
    it.concurrent('codegen: a nested anyOf branch keeps its own check when a shape is distributed into it', () => {
      expect(
        zodToOpenAPI({
          anyOf: [{ anyOf: [branch, { type: 'string' }], unevaluatedProperties: false }],
          properties: { b: { type: 'number' } },
        }),
      ).toBe(
        `z.union([${withCheck(
          'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({b:z.number().exactOptional()}).openapi({"required":[]})),z.string()])',
          branchCheckWithString,
        )}])`,
      )
    })
    it.concurrent('codegen: a nested oneOf branch keeps its own check when a shape is distributed into it', () => {
      expect(
        zodToOpenAPI({
          oneOf: [
            {
              oneOf: [
                { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
                { type: 'object', properties: { d: { type: 'boolean' } }, required: ['d'] },
              ],
              unevaluatedProperties: false,
            },
          ],
          properties: { b: { type: 'number' } },
        }),
      ).toBe(
        `z.xor([${withCheck(
          'z.xor([z.object({a:z.string()}).openapi({"required":["a"]}),z.object({d:z.boolean()}).openapi({"required":["d"]})])',
          '(ctx)=>{const o=ctx.value;if(typeof o!==\'object\'||o===null||Array.isArray(o))return;let mO=0;const e=new Set();if(z.object({a:z.string()}).openapi({"required":["a"]}).safeParse(o).success){mO++;for(const k of ["a"]){e.add(k)}};if(z.object({d:z.boolean()}).openapi({"required":["d"]}).safeParse(o).success){mO++;for(const k of ["d"]){e.add(k)}};if(mO===1){for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}',
        )}]).and(z.object({b:z.number().exactOptional()}).openapi({"required":[]}))`,
      )
    })
    // Runtime checks: the equivalent Zod schemas are mirrored by hand in TS rather
    // than evaluated from the generated string, so no `new Function` / `eval` is
    // introduced here (repo convention, see string.test.ts). The mirrors use the
    // same `z.preprocess` shape the emitter produces, with the unevaluated check
    // inlined in the callback — hence the object guard instead of the early
    // `return` the emitted standalone check function uses, and the branch-match
    // counters (`mA` / `mO`) instead of a separate success-gate parse (#480).
    it.concurrent('runtime: anyOf rejects an unevaluated key, accepts a branch key', () => {
      const Schema = z.union([z.object({ a: z.string().exactOptional() })])
      const AnyOf = (() =>
        z.preprocess((val, ctx) => {
          const o = ctx.value
          if (typeof o === 'object' && o !== null && !Array.isArray(o)) {
            let mA = 0
            const e = new Set<string>()
            if (z.object({ a: z.string().exactOptional() }).safeParse(o).success) {
              mA += 1
              e.add('a')
            }
            if (mA > 0) {
              for (const k of Object.keys(o)) {
                if (!e.has(k)) ctx.issues.push({ code: 'custom', path: [k], input: o })
              }
            }
          }
          return val
        }, Schema))()
      expect(AnyOf.safeParse({ a: 'x' }).success).toBe(true)
      const bad = AnyOf.safeParse({ a: 'x', c: 1 })
      expect(bad.success).toBe(false)
      if (!bad.success) {
        expect(bad.error.issues[0]?.code).toBe('custom')
        expect(bad.error.issues[0]?.path).toStrictEqual(['c'])
      }
    })
    it.concurrent('runtime: oneOf rejects an unevaluated key, accepts a branch key', () => {
      const Schema = z.xor([z.object({ a: z.string().exactOptional() })])
      const OneOf = (() =>
        z.preprocess((val, ctx) => {
          const o = ctx.value
          if (typeof o === 'object' && o !== null && !Array.isArray(o)) {
            let mO = 0
            const e = new Set<string>()
            if (z.object({ a: z.string().exactOptional() }).safeParse(o).success) {
              mO += 1
              e.add('a')
            }
            if (mO === 1) {
              for (const k of Object.keys(o)) {
                if (!e.has(k)) ctx.issues.push({ code: 'custom', path: [k], input: o })
              }
            }
          }
          return val
        }, Schema))()
      expect(OneOf.safeParse({ a: 'x' }).success).toBe(true)
      expect(OneOf.safeParse({ a: 'x', c: 1 }).success).toBe(false)
    })
    it.concurrent('runtime: a wrong-typed declared key reports only its type error beside anyOf', () => {
      const Schema = z.union([z.object({ a: z.string().exactOptional() })])
      const AnyOf = (() =>
        z.preprocess((val, ctx) => {
          const o = ctx.value
          if (typeof o === 'object' && o !== null && !Array.isArray(o)) {
            let mA = 0
            const e = new Set<string>()
            if (z.object({ a: z.string().exactOptional() }).safeParse(o).success) {
              mA += 1
              e.add('a')
            }
            if (mA > 0) {
              for (const k of Object.keys(o)) {
                if (!e.has(k)) ctx.issues.push({ code: 'custom', path: [k], input: o })
              }
            }
          }
          return val
        }, Schema))()
      // The unevaluated check runs only when the union succeeds, so a key no
      // branch matched is not also reported as unevaluated: the value is
      // already invalid, and only the real type error is reported.
      const wrongType = AnyOf.safeParse({ a: 1 })
      expect(wrongType.success).toBe(false)
      if (!wrongType.success) {
        expect(wrongType.error.issues).toHaveLength(1)
        expect(wrongType.error.issues[0]?.code).toBe('invalid_type')
        expect(wrongType.error.issues[0]?.path).toStrictEqual(['a'])
      }
      const both = AnyOf.safeParse({ a: 1, c: 1 })
      expect(both.success).toBe(false)
      if (!both.success) {
        expect(both.error.issues).toHaveLength(1)
        expect(both.error.issues[0]?.code).toBe('invalid_type')
        expect(both.error.issues[0]?.path).toStrictEqual(['a'])
      }
      const unevaluatedOnly = AnyOf.safeParse({ a: 'x', c: 1 })
      expect(unevaluatedOnly.success).toBe(false)
      if (!unevaluatedOnly.success) {
        expect(unevaluatedOnly.error.issues.every((issue) => issue.code === 'custom')).toBe(true)
      }
    })
    it.concurrent('runtime: a nested anyOf branch keeps its check when a shape is distributed into it', () => {
      const Schema = z.union([
        z
          .object({ a: z.string().exactOptional() })
          .and(z.object({ b: z.number().exactOptional() })),
        z.string(),
      ])
      const Inner = (() =>
        z.preprocess((val, ctx) => {
          const o = ctx.value
          if (typeof o === 'object' && o !== null && !Array.isArray(o)) {
            let mA = 0
            const e = new Set<string>()
            if (z.object({ a: z.string().exactOptional() }).safeParse(o).success) {
              mA += 1
              e.add('a')
            }
            // The `z.string()` branch evaluates no keys, but its match still
            // counts, so a string value reports nothing.
            if (z.string().safeParse(o).success) mA += 1
            if (mA > 0) {
              for (const k of Object.keys(o)) {
                if (!e.has(k)) ctx.issues.push({ code: 'custom', path: [k], input: o })
              }
            }
          }
          return val
        }, Schema))()
      const AnyOf = z.union([Inner])
      // `b` belongs to the outer schema object, so it is unevaluated w.r.t.
      // the nested branch — the distributed shape must not make it pass.
      expect(AnyOf.safeParse({ a: 'x', b: 1 }).success).toBe(false)
      expect(AnyOf.safeParse({ a: 'x', b: 1, c: 2 }).success).toBe(false)
      expect(AnyOf.safeParse('hello').success).toBe(true)
    })
    it.concurrent('runtime: sibling properties count as evaluated beside anyOf', () => {
      const Schema = z
        .union([z.object({ a: z.string().exactOptional() })])
        .and(z.object({ b: z.number().exactOptional() }))
      const AnyOf = z.preprocess((val, ctx) => {
        const o = ctx.value
        if (typeof o === 'object' && o !== null && !Array.isArray(o)) {
          let mA = 0
          const e = new Set<string>(['b'])
          if (z.object({ a: z.string().exactOptional() }).safeParse(o).success) {
            mA += 1
            e.add('a')
          }
          if (mA > 0) {
            for (const k of Object.keys(o)) {
              if (!e.has(k)) ctx.issues.push({ code: 'custom', path: [k], input: o })
            }
          }
        }
        return val
      }, Schema)
      expect(AnyOf.safeParse({ a: 'x', b: 1 }).success).toBe(true)
      expect(AnyOf.safeParse({ a: 'x' }).success).toBe(true)
      expect(AnyOf.safeParse({ a: 'x', b: 1, c: 2 }).success).toBe(false)
      expect(AnyOf.safeParse({ a: 'x', b: 'nope' }).success).toBe(false)
      // Edge (#480): when the distributed shape fails AND an extra key is
      // present, the check runs — the original branch matched — so the extra
      // key is reported as unevaluated and the pipe stops before the shape
      // error: the value is invalid either way, but only the unevaluated
      // issue is reported. (With the old success-gate parse, only the shape
      // error was reported here.)
      const shapeFailsExtra = AnyOf.safeParse({ a: 'x', b: 'nope', c: 2 })
      expect(shapeFailsExtra.success).toBe(false)
      if (!shapeFailsExtra.success) {
        expect(shapeFailsExtra.error.issues).toHaveLength(1)
        expect(shapeFailsExtra.error.issues[0]?.code).toBe('custom')
        expect(shapeFailsExtra.error.issues[0]?.path).toStrictEqual(['c'])
      }
    })
    it.concurrent('runtime: schema-form unevaluatedProperties validates the unevaluated value', () => {
      const Schema = z.union([z.object({ a: z.string().exactOptional() })])
      // Early returns keep the nesting within the lint's max depth; the
      // other mirrors use the nested form because their bodies are shallower.
      const AnyOf = z.preprocess((val, ctx) => {
        const o = ctx.value
        if (typeof o !== 'object' || o === null || Array.isArray(o)) return val
        let mA = 0
        const e = new Set<string>()
        if (z.object({ a: z.string().exactOptional() }).safeParse(o).success) {
          mA += 1
          e.add('a')
        }
        if (mA === 0) return val
        const ValueSchema = z.string()
        for (const [k, val2] of Object.entries(o)) {
          if (e.has(k)) continue
          const result = ValueSchema.safeParse(val2)
          if (!result.success) {
            for (const issue of result.error.issues) {
              // `z.string()` on a number only raises `invalid_type`; narrowing
              // keeps the re-push assignable to the raw-issue union (same
              // per-code dispatch the emitter generates).
              if (issue.code === 'invalid_type') {
                ctx.issues.push({ ...issue, path: [k, ...issue.path], input: issue.input })
              }
            }
          }
        }
        return val
      }, Schema)
      expect(AnyOf.safeParse({ a: 'x', c: 's' }).success).toBe(true)
      expect(AnyOf.safeParse({ a: 'x', c: 1 }).success).toBe(false)
    })
    it.concurrent('runtime: a $ref branch counts its component keys as evaluated', () => {
      const ASchema = z.object({ a: z.string().exactOptional() })
      const Schema = z.union([ASchema])
      const AnyOf = z.preprocess((val, ctx) => {
        const o = ctx.value
        if (typeof o === 'object' && o !== null && !Array.isArray(o)) {
          let mA = 0
          const e = new Set<string>()
          if (ASchema.safeParse(o).success) {
            mA += 1
            e.add('a')
          }
          if (mA > 0) {
            for (const k of Object.keys(o)) {
              if (!e.has(k)) ctx.issues.push({ code: 'custom', path: [k], input: o })
            }
          }
        }
        return val
      }, Schema)
      expect(AnyOf.safeParse({ a: 'x' }).success).toBe(true)
      expect(AnyOf.safeParse({ a: 'x', c: 1 }).success).toBe(false)
    })
    it.concurrent('runtime: a nested anyOf branch counts only its matching branch keys', () => {
      const Schema = z.union([
        z.union([
          z.object({ a: z.string().exactOptional() }),
          z.object({ d: z.boolean().exactOptional() }),
        ]),
      ])
      const AnyOf = z.preprocess((val, ctx) => {
        const o = ctx.value
        if (typeof o === 'object' && o !== null && !Array.isArray(o)) {
          let mA = 0
          const e = new Set<string>()
          const nested = z.union([
            z.object({ a: z.string().exactOptional() }),
            z.object({ d: z.boolean().exactOptional() }),
          ])
          if (nested.safeParse(o).success) {
            mA += 1
            if (z.object({ a: z.string().exactOptional() }).safeParse(o).success) e.add('a')
            if (z.object({ d: z.boolean().exactOptional() }).safeParse(o).success) e.add('d')
          }
          if (mA > 0) {
            for (const k of Object.keys(o)) {
              if (!e.has(k)) ctx.issues.push({ code: 'custom', path: [k], input: o })
            }
          }
        }
        return val
      }, Schema)
      expect(AnyOf.safeParse({ a: 'x' }).success).toBe(true)
      expect(AnyOf.safeParse({ d: true }).success).toBe(true)
      expect(AnyOf.safeParse({ a: 'x', c: 1 }).success).toBe(false)
      expect(AnyOf.safeParse({ d: true, c: 1 }).success).toBe(false)
    })
    // #480: the wrapper no longer pays a separate success-gate parse — on a
    // recursive schema each level paid gate + pipe + branch-match, ~3^depth.
    // The codegen pins the gate-free shape for the issue's Node schema, and
    // the runtime tests pin the two places where the counting guard must be
    // exact rather than "any branch matched".
    it.concurrent('codegen: recursive anyOf + unevaluatedProperties=false → no gate parse (#480)', () => {
      const node: Schema = {
        type: 'object',
        anyOf: [
          {
            type: 'object',
            properties: {
              name: { type: 'string' },
              children: { type: 'array', items: { $ref: '#/components/schemas/Node' } },
            },
          },
        ],
        unevaluatedProperties: false,
      }
      const code = zodToOpenAPI(node, undefined, { schemas: { Node: node } })
      expect(code).not.toContain('Schema.safeParse(val)')
      expect(code).toBe(
        withCheck(
          'z.union([z.object({name:z.string().exactOptional(),children:z.array(NodeSchema).exactOptional()}).openapi({"required":[]})])',
          '(ctx)=>{const o=ctx.value;if(typeof o!==\'object\'||o===null||Array.isArray(o))return;let mA=0;const e=new Set();if(z.object({name:z.string().exactOptional(),children:z.array(NodeSchema).exactOptional()}).openapi({"required":[]}).safeParse(o).success){mA++;for(const k of ["name","children"]){e.add(k)}};if(mA>0){for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}',
        ),
      )
    })
    it.concurrent('codegen: anyOf + empty branch → the match still counts, keys still unevaluated (#480)', () => {
      // The empty branch takes the declared `type: object` (#468).
      expect(zodToOpenAPI({ type: 'object', anyOf: [{}], unevaluatedProperties: false })).toBe(
        withCheck(
          'z.union([z.looseObject({})])',
          '(ctx)=>{const o=ctx.value;if(typeof o!==\'object\'||o===null||Array.isArray(o))return;let mA=0;const e=new Set();if(z.looseObject({}).safeParse(o).success){mA++;};if(mA>0){for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}',
        ),
      )
    })
    it.concurrent('runtime: oneOf with two matching branches reports only the xor error (#480)', () => {
      const Schema = z.xor([
        z.object({ a: z.string().exactOptional() }),
        z.object({ a: z.string().exactOptional() }),
      ])
      const OneOf = (() =>
        z.preprocess((val, ctx) => {
          const o = ctx.value
          if (typeof o === 'object' && o !== null && !Array.isArray(o)) {
            let mO = 0
            const e = new Set<string>()
            if (z.object({ a: z.string().exactOptional() }).safeParse(o).success) {
              mO += 1
              e.add('a')
            }
            if (z.object({ a: z.string().exactOptional() }).safeParse(o).success) {
              mO += 1
              e.add('a')
            }
            if (mO === 1) {
              for (const k of Object.keys(o)) {
                if (!e.has(k)) ctx.issues.push({ code: 'custom', path: [k], input: o })
              }
            }
          }
          return val
        }, Schema))()
      // Both branches match, so the xor fails; the check must not add an
      // unevaluated issue for `c` on top of it (a naive `mO > 0` guard would).
      for (const value of [{ a: 'x' }, { a: 'x', c: 1 }]) {
        const result = OneOf.safeParse(value)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues).toHaveLength(1)
          expect(result.error.issues[0]?.code).toBe('invalid_union')
        }
      }
    })
    it.concurrent('runtime: a branch that matches but evaluates no keys still counts (#480)', () => {
      const Schema = z.union([z.any()])
      const AnyOf = (() =>
        z.preprocess((val, ctx) => {
          const o = ctx.value
          if (typeof o === 'object' && o !== null && !Array.isArray(o)) {
            let mA = 0
            const e = new Set<string>()
            if (z.any().safeParse(o).success) mA += 1
            if (mA > 0) {
              for (const k of Object.keys(o)) {
                if (!e.has(k)) ctx.issues.push({ code: 'custom', path: [k], input: o })
              }
            }
          }
          return val
        }, Schema))()
      // The `{}` branch matches every object but evaluates no keys, so every
      // key is unevaluated — the counting-only `if` is what makes this report.
      const result = AnyOf.safeParse({ c: 1 })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1)
        expect(result.error.issues[0]?.code).toBe('custom')
        expect(result.error.issues[0]?.path).toStrictEqual(['c'])
      }
    })
  })
})

// `not` excludes values from what the rest of the schema accepts, so the keywords beside it
// still apply. This holds for a request body as much as for a parameter.
// `not` は、スキーマの残りの部分が受理する値から一部を除外するものである。そのため、
// 並んで書かれたキーワードも適用される。これはパラメータだけでなく、リクエストボディでも
// 同じである。
describe('zodToOpenAPI: keywords beside not', () => {
  // `type: integer, not: { const: 0 }` is an integer other than 0, not anything other than 0.
  // `type: integer, not: { const: 0 }` は「0 以外の整数」であり、「0 以外の任意の値」ではない。
  it.concurrent('validates the type beside not', () => {
    expect(zodToOpenAPI({ type: 'integer', not: { const: 0 } })).toBe(
      'z.int().refine((val) => val !== 0).openapi({"not":{"const":0}})',
    )
  })

  // The constraints beside not are kept as well.
  // not と並ぶ制約も、同様に保持される。
  it.concurrent('validates the constraints beside not', () => {
    expect(zodToOpenAPI({ type: 'string', minLength: 2, not: { enum: ['ab'] } })).toBe(
      'z.string().min(2).refine((val) => !["ab"].includes(val)).openapi({"not":{"enum":["ab"]}})',
    )
  })

  // An int64 hands out a bigint, so what `not` excludes is written as a bigint too:
  // `[0].includes(val)` does not type-check against a bigint, and `0n` is not `0`.
  // int64 は bigint を返すので、not が除外する値も bigint で書く:
  // `[0].includes(val)` は bigint に対して型エラーになり、実行時も `0n` は `0` ではない。
  it.concurrent('writes the excluded enum members of an int64 as bigints', () => {
    expect(zodToOpenAPI({ type: 'integer', format: 'int64', not: { enum: [0] } })).toBe(
      `z.preprocess(${JSON_BIGINT},z.int64()).openapi({type:"integer",format:"int64"}).refine((val) => ![0n].includes(val)).openapi({type:"integer",format:"int64","not":{"enum":[0]}})`,
    )
    const runtime = z.int64().refine((val) => ![0n].includes(val))
    expect(runtime.safeParse(1n).success).toBe(true)
    expect(runtime.safeParse(0n).success).toBe(false)
  })

  it.concurrent('writes the excluded const of an int64 as a bigint', () => {
    expect(zodToOpenAPI({ type: 'integer', format: 'int64', not: { const: 0 } })).toBe(
      `z.preprocess(${JSON_BIGINT},z.int64()).openapi({type:"integer",format:"int64"}).refine((val) => val !== 0n).openapi({type:"integer",format:"int64","not":{"const":0}})`,
    )
    const runtime = z.int64().refine((val) => val !== 0n)
    expect(runtime.safeParse(1n).success).toBe(true)
    expect(runtime.safeParse(0n).success).toBe(false)
  })

  // `format: bigint` spells its literals as `BigInt(n)`, like its bounds do.
  // `format: bigint` のリテラルは、境界値と同じく `BigInt(n)` で書く。
  it.concurrent('writes the excluded enum members of a bigint as BigInt(n)', () => {
    expect(zodToOpenAPI({ type: 'integer', format: 'bigint', not: { enum: [0, 1] } })).toBe(
      `z.preprocess(${JSON_BIGINT},z.bigint()).openapi({type:"integer",format:"bigint"}).refine((val) => ![BigInt(0),BigInt(1)].includes(val)).openapi({type:"integer",format:"bigint","not":{"enum":[0,1]}})`,
    )
  })

  // The same with `x-coerce`: the coerced value handed to the refine is still a bigint.
  // `x-coerce` でも同様: refine に渡る値は変換後の bigint である。
  it.concurrent('writes the excluded enum members of a coerced int64 as bigints', () => {
    expect(
      zodToOpenAPI({ type: 'integer', format: 'int64', 'x-coerce': true, not: { enum: [0] } }),
    ).toBe(
      'z.coerce.bigint().pipe(z.int64()).openapi({type:"integer",format:"int64"}).refine((val) => ![0n].includes(val)).openapi({type:"integer",format:"int64","not":{"enum":[0]}})',
    )
  })

  // A fraction can never be a bigint, so it excludes nothing and is dropped from the list.
  // 小数は bigint になり得ないので何も除外せず、リストから落とす。
  it.concurrent('drops a fractional member from the excluded enum of an int64', () => {
    expect(zodToOpenAPI({ type: 'integer', format: 'int64', not: { enum: [1.5] } })).toBe(
      `z.preprocess(${JSON_BIGINT},z.int64()).openapi({type:"integer",format:"int64"}).openapi({type:"integer",format:"int64","not":{"enum":[1.5]}})`,
    )
    expect(zodToOpenAPI({ type: 'integer', format: 'int64', not: { enum: [1.5, 2] } })).toBe(
      `z.preprocess(${JSON_BIGINT},z.int64()).openapi({type:"integer",format:"int64"}).refine((val) => ![2n].includes(val)).openapi({type:"integer",format:"int64","not":{"enum":[1.5,2]}})`,
    )
  })

  // The same when what is excluded is a component.
  // 除外対象がコンポーネントである場合も同様である。
  it.concurrent('validates the type beside not with a reference', () => {
    expect(zodToOpenAPI({ type: 'integer', not: { $ref: '#/components/schemas/Count' } })).toBe(
      'z.int().refine((val) => !CountSchema.safeParse(val).success).openapi({"not":{"$ref":"#/components/schemas/Count"}})',
    )
  })

  // `nullable`, `default` and the metadata go around the whole schema, once.
  // `nullable`・`default`・メタデータは、スキーマ全体の外側に1度だけ付く。
  it.concurrent('adds nullable, default and metadata once, around the refinement', () => {
    expect(
      zodToOpenAPI({
        type: ['integer', 'null'],
        not: { const: 0 },
        default: 1,
        description: 'd',
      }),
    ).toBe(
      'z.int().refine((val) => val !== 0).nullable().default(1).openapi({"description":"d","not":{"const":0}})',
    )
  })

  // With no type beside it, not starts from any value.
  // 並んで書かれた type がなければ、not は任意の値を起点とする。
  it.concurrent('starts from z.any() without a type', () => {
    expect(zodToOpenAPI({ not: { const: 0 } })).toBe(
      'z.any().refine((val) => val !== 0).openapi({"not":{"const":0}})',
    )
  })
})

// The options that say how the value arrives.
// 値がどのように届くかを指定するオプション。
describe('zodToOpenAPI: how the value arrives', () => {
  // A request body arrives typed: nothing is read from text.
  // リクエストボディは型付きで届く。文字列から読み取るものはない。
  it.concurrent('emits a typed schema without options', () => {
    expect(zodToOpenAPI({ type: 'integer', minimum: 1 })).toBe('z.int().min(1)')
  })

  // `coerce` says the value arrives as text. The constraints stay on the typed schema, inside
  // the converter.
  // `coerce` は、値が文字列で届くことを示す。制約は、変換関数の内側にある型付きスキーマに
  // 付いたままである。
  it.concurrent('reads text with the coerce option', () => {
    expect(zodToOpenAPI({ type: 'integer', minimum: 1 }, undefined, { coerce: true })).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int().min(1))`,
    )
  })

  // A reference is emitted as its identifier for a typed value, whatever the component is.
  // 型付きの値に対しては、コンポーネントの内容にかかわらず、参照は識別子として出力される。
  it.concurrent('leaves a reference alone without the coerce option', () => {
    expect(
      zodToOpenAPI({ $ref: '#/components/schemas/Count' }, undefined, {
        schemas: { Count: { type: 'integer' } },
      }),
    ).toBe('CountSchema')
  })

  // `json` says the value arrives as one JSON document, which is parsed and then validated as
  // typed.
  // `json` は、値が1つの JSON 文書として届くことを示す。文書はパースされ、
  // 型付きの値として検証される。
  it.concurrent('parses a document with the json option', () => {
    expect(
      zodToOpenAPI({ type: 'array', items: { type: 'integer' } }, undefined, { json: true }),
    ).toBe(
      "z.preprocess((val)=>{if(typeof val!=='string')return val;try{return JSON.parse(val)}catch{return val}},z.array(z.int()))",
    )
  })
})

// `type` may list several types, and a value of any of them is accepted.
// `type` には複数の型を列挙でき、そのいずれの型の値も受理される。
describe('zodToOpenAPI: a list of types', () => {
  // Each type emits its own schema, and the list is their union.
  // 各型がそれぞれのスキーマを出力し、型のリストはそれらの union になる。
  it.concurrent('emits a union of the listed types', () => {
    expect(zodToOpenAPI({ type: ['integer', 'string'] })).toBe('z.union([z.int(),z.string()])')
  })

  // `null` is not a branch: it makes the union nullable.
  // `null` は分岐にはならず、union を nullable にする。
  it.concurrent('makes the union nullable for null', () => {
    expect(zodToOpenAPI({ type: ['integer', 'boolean', 'null'] })).toBe(
      'z.union([z.int(),z.boolean()]).nullable()',
    )
  })

  // One type beside null is that type, nullable, as before.
  // null と並ぶ型が1つだけの場合は、従来どおり、その型の nullable になる。
  it.concurrent('emits a single type beside null without a union', () => {
    expect(zodToOpenAPI({ type: ['integer', 'null'] })).toBe('z.int().nullable()')
  })

  // Every branch is handed the keywords and reads the ones of its type: `minimum` bounds
  // the integer and `minLength` the string.
  // すべての分岐にキーワードが渡され、各分岐は自身の型に関するものだけを読み取る。
  // `minimum` は integer を、`minLength` は string を制約する。
  it.concurrent('gives each branch the keywords of its type', () => {
    expect(zodToOpenAPI({ type: ['integer', 'string'], minimum: 1, minLength: 2 })).toBe(
      'z.union([z.int().min(1),z.string().min(2)])',
    )
  })

  // The default and the metadata are written once, around the union.
  // デフォルト値とメタデータは、union の外側に1度だけ付く。
  it.concurrent('adds the default and the metadata once, around the union', () => {
    expect(zodToOpenAPI({ type: ['integer', 'string'], default: 1, description: 'd' })).toBe(
      'z.union([z.int(),z.string()]).default(1).openapi({"description":"d"})',
    )
  })

  // On the wire the text is read once, around the union, as any of the listed types.
  // ワイヤ上では、文字列は union の外側で1度だけ、列挙された型のいずれかとして読み取られる。
  it.concurrent('reads the text once around the union', () => {
    expect(zodToOpenAPI({ type: ['integer', 'string'] }, undefined, { coerce: true })).toBe(
      String.raw`((schema)=>z.union([z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),schema),schema]))(z.union([z.int(),z.string()]))`,
    )
  })
})

// #375: an allOf member of `additionalProperties` alone declares no key, so there is no list to guard by
describe('allOf member with only additionalProperties', () => {
  it('holds every key to the value schema without an empty includes()', () => {
    const code = zodToOpenAPI({
      type: 'object',
      allOf: [
        { properties: { $id: { type: 'string' } } },
        { additionalProperties: { type: 'string' } },
      ],
    })
    expect(code).not.toContain('[].includes(k)')
    expect(code).not.toContain('[].some(')
    // the member is an object in all but name (#385): a record of its value schema
    expect(code).toBe(
      'z.object({$id:z.string().exactOptional()}).openapi({"required":[]}).and(z.record(z.string(),z.string()))',
    )
  })
})

// #385: a schema with `properties` and no `type` is an object, as the type writer takes it
describe('untyped object', () => {
  it.concurrent('emits z.object() for properties without a type', () => {
    expect(
      zodToOpenAPI({
        description: 'Bank details',
        properties: {
          BankAccountNumber: { type: 'string' },
          Code: { type: 'string', maxLength: 12 },
        },
      }),
    ).toBe(
      'z.object({BankAccountNumber:z.string().exactOptional(),Code:z.string().max(12).exactOptional()}).openapi({"description":"Bank details","required":[]})',
    )
    expect(zodToOpenAPI({ properties: { id: { type: 'integer' } }, required: ['id'] })).toBe(
      'z.object({id:z.int()}).openapi({"required":["id"]})',
    )
  })

  it.concurrent('emits a record for additionalProperties without a type', () => {
    expect(zodToOpenAPI({ additionalProperties: { type: 'string' } })).toBe(
      'z.record(z.string(),z.string())',
    )
    expect(
      zodToOpenAPI({ properties: { a: { type: 'string' } }, additionalProperties: false }),
    ).toBe('z.strictObject({a:z.string().exactOptional()}).openapi({"required":[]})')
  })

  it.concurrent('keeps the hand-written checks where a keyword of another kind stands beside', () => {
    expect(zodToOpenAPI({ properties: { a: { type: 'string' } }, minLength: 1 })).toBe(
      "z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,\"a\")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,\"a\")).success){ctx.addIssue({code:'custom'})}}};if(typeof val==='string'){if([...val].length<1){ctx.addIssue({code:'custom'})}}})",
    )
    // `required` alone declares no key to type: it stays a check on any value
    expect(zodToOpenAPI({ required: ['a'] })).toBe(
      'z.unknown().superRefine((val,ctx)=>{if(typeof val===\'object\'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"a")){ctx.addIssue({code:\'custom\'})}}}).openapi({"required":["a"]})',
    )
  })
})

// #444: `properties` beside a declared non-object type does not make an object: in JSON
// Schema `properties` and `required` only apply to object values, so `type: string` with
// `properties` is a string schema and its default is a string default
describe('string type with properties', () => {
  it.concurrent('codegen: type: string with properties emits z.string() with its default', () => {
    expect(
      zodToOpenAPI({
        type: 'string',
        properties: { link: { type: 'string' } },
        required: ['page'],
        default: '0',
      }),
    ).toBe('z.string().default("0").openapi({"required":["page"]})')
  })
})

// The shape check and refine of #461, mirrored by hand for the runtime checks
// below. The shape is distributed into the branches that accept objects (see
// `distribute`): an object-only branch gets it as an intersection member, a
// branch that also accepts other values gets it as a guarded refine on the
// branch itself — safe only when the branch passes objects through unchanged.
// A `.superRefine` on the combinator result would see the parsed output, and a
// stripping object branch would have dropped the sibling keys before the refine
// runs. The check form is kept for the fallback (an opaque `$ref` the shape
// cannot be distributed into), where it runs on the raw input, piped into the
// combinator.
const shapeRefine461 = (val: unknown, ctx: { addIssue: (issue: { code: 'custom' }) => void }) => {
  if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
    if (Object.hasOwn(val, 'link')) {
      if (!z.string().safeParse(Reflect.get(val, 'link')).success) {
        ctx.addIssue({ code: 'custom' })
      }
    }
  }
}

const requiredRefine461 = (
  val: unknown,
  ctx: { addIssue: (issue: { code: 'custom' }) => void },
) => {
  if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
    if (!Object.hasOwn(val, 'link')) {
      ctx.addIssue({ code: 'custom' })
    }
  }
}

// The `a`-property shape for the untyped-parent runtime test below.
const shapeA461 = (val: unknown, ctx: { addIssue: (issue: { code: 'custom' }) => void }) => {
  if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
    if (Object.hasOwn(val, 'a')) {
      if (!z.string().safeParse(Reflect.get(val, 'a')).success) {
        ctx.addIssue({ code: 'custom' })
      }
    }
  }
}

const shapeCheck461 = (ctx: { value: unknown; issues: { code: string; input?: unknown }[] }) => {
  const val = ctx.value
  if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
    if (Object.hasOwn(val, 'link')) {
      if (!z.string().safeParse(Reflect.get(val, 'link')).success) {
        ctx.issues.push({ code: 'custom', input: val })
      }
    }
  }
}

const requiredCheck461 = (ctx: { value: unknown; issues: { code: string; input?: unknown }[] }) => {
  const val = ctx.value
  if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
    if (!Object.hasOwn(val, 'link')) {
      ctx.issues.push({ code: 'custom', input: val })
    }
  }
}

// The raw-input check of #479 by hand: a `z.preprocess` that runs the check
// and hands the value on, as `withRawCheck` emits it.
const checked = <T extends z.ZodType>(
  Schema: T,
  check: (ctx: { value: unknown; issues: { code: string; input?: unknown }[] }) => void,
) =>
  z.preprocess((val: z.input<T>, ctx) => {
    check(ctx)
    return val
  }, Schema)

// #461: `properties` beside `allOf` / `anyOf` or a multi-type is read as an object,
// rejecting non-object values the schema accepts. In JSON Schema `properties` and
// `required` only apply to object values, so the shape is distributed into the
// branches that accept objects: an object-only branch gets it as an intersection
// member (which keeps the sibling properties in the parsed output, the inferred
// type and the document), a branch that also accepts other values gets it as a
// guarded refine on the branch itself. Only when the shape cannot be distributed
// into some branch does it fall back to a check on the raw input, piped into
// the combinator.
describe('properties beside combinators', () => {
  const shape = `(val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"link")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"link")).success){ctx.addIssue({code:'custom'})}}}}`
  const shapeCheck = `(ctx)=>{const val=ctx.value;if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"link")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"link")).success){ctx.issues.push({...{code:'custom'},input:val})}}}}`
  const requiredCheck = `(ctx)=>{const val=ctx.value;if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"link")){ctx.issues.push({...{code:'custom'},input:val})}}}`
  const requiredShapeCheck = `(ctx)=>{const val=ctx.value;if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"link")){ctx.issues.push({...{code:'custom'},input:val})};if(Object.hasOwn(val,"link")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"link")).success){ctx.issues.push({...{code:'custom'},input:val})}}}}`
  const requiredRefine = `(val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"link")){ctx.addIssue({code:'custom'})}}}`
  const minLengthCheck = `(val,ctx)=>{if(typeof val==='string'){if([...val].length<1){ctx.addIssue({code:'custom'})}}}`

  it.concurrent('codegen: anyOf string|object + properties distributes the shape into the object branch', () => {
    // The loose object branch only accepts objects, so the shape is an
    // intersection member on it: the sibling stays in the output and the type.
    expect(
      zodToOpenAPI({
        anyOf: [{ type: 'string' }, { type: 'object' }],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.string(),z.looseObject({}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]}))])',
    )
  })

  it.concurrent('codegen: allOf [string] + properties drops the shape — no member accepts an object', () => {
    // No object value passes the intersection, so the shape constrains
    // nothing: there is no branch to distribute it into and no check to run.
    expect(
      zodToOpenAPI({
        allOf: [{ type: 'string' }],
        properties: { link: { type: 'string' } },
      }),
    ).toBe('z.string()')
  })

  it.concurrent('codegen: type string + allOf [minLength] + properties keeps a string default', () => {
    // The member takes the declared type (#468), so it accepts no object and
    // the shape constrains nothing — and the default stays a string.
    expect(
      zodToOpenAPI({
        type: 'string',
        allOf: [{ minLength: 1 }],
        properties: { link: { type: 'string' } },
        default: '0',
      }),
    ).toBe('z.string().min(1).default("0")')
  })

  it.concurrent('codegen: type string + anyOf [minLength, maxLength] + properties keeps a string default', () => {
    // Both branches take the declared type (#468), so neither accepts an
    // object and the shape constrains nothing.
    expect(
      zodToOpenAPI({
        type: 'string',
        anyOf: [{ minLength: 1 }, { maxLength: 5 }],
        properties: { link: { type: 'string' } },
        default: '0',
      }),
    ).toBe('z.union([z.string().min(1),z.string().max(5)]).default("0")')
  })

  it.concurrent('codegen: type [object, string] + properties unions the types', () => {
    expect(
      zodToOpenAPI({
        type: ['object', 'string'],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.object({link:z.string().exactOptional()}).openapi({"required":[]}),z.string()])',
    )
  })

  it.concurrent('codegen: type [object, string] + properties + required keeps the key required', () => {
    expect(
      zodToOpenAPI({
        type: ['object', 'string'],
        properties: { link: { type: 'string' } },
        required: ['link'],
      }),
    ).toBe(
      // The string branch no longer carries `.openapi({required: [...]})`: a
      // string can never have the key, so the required belongs to the object
      // branch (and to the union as a whole) only.
      'z.union([z.object({link:z.string()}).openapi({"required":["link"]}),z.string()]).openapi({"required":["link"]})',
    )
  })

  it.concurrent('codegen: allOf [] + properties refines z.any()', () => {
    expect(zodToOpenAPI({ allOf: [], properties: { link: { type: 'string' } } })).toBe(
      `z.any().superRefine(${shape})`,
    )
  })

  it.concurrent('codegen: allOf [string] + empty properties constrains nothing', () => {
    expect(zodToOpenAPI({ allOf: [{ type: 'string' }], properties: {} })).toBe('z.string()')
  })

  it.concurrent('codegen: type object + anyOf + properties still intersects with z.object()', () => {
    // A declared object type means the value is an object, so the shape stays an
    // intersection: that is what checks each property's type, with its path.
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: { link: { type: 'string' } },
        anyOf: [{ type: 'string' }, { type: 'object' }],
      }),
    ).toBe(
      'z.union([z.string(),z.looseObject({})]).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]}))',
    )
  })

  it.concurrent('codegen: type object + allOf + properties still intersects with z.object()', () => {
    expect(
      zodToOpenAPI({
        type: 'object',
        allOf: [{ minLength: 1 }],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      "z.unknown().superRefine((val,ctx)=>{if(typeof val==='string'){if([...val].length<1){ctx.addIssue({code:'custom'})}}}).and(z.object({link:z.string().exactOptional()}).openapi({\"required\":[]}))",
    )
  })

  it.concurrent('codegen: allOf [object member] + properties keeps the shape a member', () => {
    // A member that only accepts objects already rejects every non-object, so
    // the shape member rejects nothing the rest accepts — and keeping it is
    // what merges the sibling properties into the inferred type.
    expect(
      zodToOpenAPI({
        allOf: [
          {
            type: 'object',
            properties: { id: { type: 'integer' } },
            required: ['id'],
          },
        ],
        properties: { label: { type: 'string' } },
      }),
    ).toBe(
      'z.object({id:z.int()}).openapi({"required":["id"]}).and(z.object({label:z.string().exactOptional()}).openapi({"required":[]}))',
    )
  })

  it.concurrent('codegen: allOf [$ref object] + properties keeps the shape a member', () => {
    expect(
      zodToOpenAPI(
        {
          allOf: [{ $ref: '#/components/schemas/BaseEntity' }],
          properties: { label: { type: 'string' } },
          required: ['label'],
        },
        undefined,
        {
          schemas: {
            BaseEntity: {
              type: 'object',
              properties: { id: { type: 'integer' }, createdAt: { type: 'string' } },
              required: ['id', 'createdAt'],
            },
          },
        },
      ),
    ).toBe(
      'BaseEntitySchema.and(z.object({label:z.string()}).openapi({"required":["label"]})).openapi({"required":["label"]})',
    )
  })

  it.concurrent('codegen: anyOf all-object branches + properties still intersects', () => {
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: 'object', properties: { a: { type: 'string' } } },
          { type: 'object', properties: { b: { type: 'string' } } },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}),z.object({b:z.string().exactOptional()}).openapi({"required":[]})]).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]}))',
    )
  })

  it.concurrent('codegen: oneOf string|object + properties distributes the shape into the object branch', () => {
    // The shape was dropped entirely beside oneOf: an object with a
    // wrong-typed property passed. Same rule as anyOf now.
    expect(
      zodToOpenAPI({
        oneOf: [{ type: 'string' }, { type: 'object' }],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.xor([z.string(),z.looseObject({}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]}))])',
    )
  })

  it.concurrent('codegen: oneOf all-object branches + properties still intersects', () => {
    expect(
      zodToOpenAPI({
        oneOf: [
          { type: 'object', properties: { a: { type: 'string' } } },
          { type: 'object', properties: { b: { type: 'string' } } },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.xor([z.object({a:z.string().exactOptional()}).openapi({"required":[]}),z.object({b:z.string().exactOptional()}).openapi({"required":[]})]).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]}))',
    )
  })

  it.concurrent('codegen: type object + oneOf + properties still intersects', () => {
    expect(
      zodToOpenAPI({
        type: 'object',
        oneOf: [{ type: 'string' }, { type: 'object' }],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.xor([z.string(),z.looseObject({})]).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]}))',
    )
  })

  it.concurrent('codegen: allOf [annotation-only member] + properties refines z.any()', () => {
    expect(
      zodToOpenAPI({ allOf: [{ description: 'x' }], properties: { link: { type: 'string' } } }),
    ).toBe(`z.any().superRefine(${shape}).openapi({"description":"x"})`)
  })

  it.concurrent('codegen: required beside combinators without properties is distributed into the object branch', () => {
    // A required-only shape emits as a loose object, which enforces nothing,
    // so the intersection member is followed by the required refine: the loose
    // object passes every key through, so the merged output still has the key.
    expect(
      zodToOpenAPI({ anyOf: [{ type: 'string' }, { type: 'object' }], required: ['link'] }),
    ).toBe(
      `z.union([z.string(),z.looseObject({}).and(z.looseObject({}).openapi({"required":["link"]})).superRefine(${requiredRefine})]).openapi({"required":["link"]})`,
    )
    expect(zodToOpenAPI({ allOf: [{ type: 'string' }], required: ['link'] })).toBe(
      'z.string().openapi({"required":["link"]})',
    )
    expect(
      zodToOpenAPI({ oneOf: [{ type: 'string' }, { type: 'object' }], required: ['link'] }),
    ).toBe(
      `z.xor([z.string(),z.looseObject({}).and(z.looseObject({}).openapi({"required":["link"]})).superRefine(${requiredRefine})]).openapi({"required":["link"]})`,
    )
  })

  it.concurrent('codegen: type object + combinators + required only is distributed, or checked on top of the intersection', () => {
    // No member settles `type: object`, so it becomes a member of its own
    // (#468) — the object member the required-only shape is distributed into.
    expect(zodToOpenAPI({ type: 'object', allOf: [{ minLength: 1 }], required: ['link'] })).toBe(
      `z.looseObject({}).and(z.looseObject({}).openapi({"required":["link"]})).superRefine(${requiredRefine}).and(z.unknown().superRefine(${minLengthCheck})).openapi({"required":["link"]})`,
    )
    expect(
      zodToOpenAPI({
        type: 'object',
        anyOf: [{ type: 'string' }, { type: 'object' }],
        required: ['link'],
      }),
    ).toBe(
      `${withCheck('z.union([z.string(),z.looseObject({})]).and(z.looseObject({}).openapi({"required":["link"]}))', requiredCheck)}.openapi({"required":["link"]})`,
    )
  })

  it.concurrent('codegen: a stripping object branch does not hide the sibling shape', () => {
    // A `.superRefine` on the union would see the parsed output, and the
    // `z.object({a})` branch strips `link` before the refine runs — so a
    // wrong-typed `link` passed and a present one read as missing. The shape
    // is an intersection member on the object branch instead: the merge keeps
    // `link` in the output, and the union stays a union in the document.
    expect(
      zodToOpenAPI({
        anyOf: [{ type: 'object', properties: { a: { type: 'string' } } }, { type: 'string' }],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})),z.string()])',
    )
    expect(
      zodToOpenAPI({
        oneOf: [{ type: 'object', properties: { a: { type: 'string' } } }, { type: 'string' }],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.xor([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})),z.string()])',
    )
    expect(
      zodToOpenAPI({
        allOf: [
          {
            anyOf: [{ type: 'object', properties: { a: { type: 'string' } } }, { type: 'string' }],
          },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})),z.string()])',
    )
    expect(
      zodToOpenAPI(
        {
          anyOf: [{ $ref: '#/components/schemas/Foo' }, { type: 'string' }],
          properties: { link: { type: 'string' } },
        },
        undefined,
        {
          schemas: {
            Foo: { type: 'object', properties: { a: { type: 'string' } } },
          },
        },
      ),
    ).toBe(
      'z.union([FooSchema.and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})),z.string()])',
    )
  })

  it.concurrent('codegen: a stripping object branch keeps the sibling in the output and the union in the document', () => {
    // Maintainer regression on #467: with a check piped around the union, the
    // raw-input check validated `link` but the piped union stripped it, and the
    // document lost the anyOf (a pipe renders as its input side). Distributed,
    // the object branch is `Obj.and(shape)`: the merge keeps `link` in the
    // output, and the union — not a pipe — is what the document renders.
    expect(
      zodToOpenAPI({
        anyOf: [{ type: 'string' }, { type: 'object', properties: { id: { type: 'string' } } }],
        properties: { link: { type: 'string' } },
        required: ['link'],
      }),
    ).toBe(
      'z.union([z.string(),z.object({id:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string()}).openapi({"required":["link"]}))]).openapi({"required":["link"]})',
    )
  })

  it.concurrent('codegen: an untyped object branch is distributed, not checked', () => {
    // Maintainer regression on #467 (round 2): an object branch with no `type`
    // (the #385 form) still fell back to the check-pipe, dropping `link` from
    // the output and the shape from the document. The branch is emitted as
    // `z.object(...)`, which admits neither `null` nor `undefined` — so the
    // null-guard must not treat it as possibly nullable (see
    // `canAdmitNullOrUndefined`), and the shape distributes as `.and()` just
    // like a typed object branch. Same for a `$ref` to such a component.
    expect(
      zodToOpenAPI({
        anyOf: [{ type: 'string' }, { properties: { id: { type: 'string' } } }],
        properties: { link: { type: 'string' } },
        required: ['link'],
      }),
    ).toBe(
      'z.union([z.string(),z.object({id:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string()}).openapi({"required":["link"]}))]).openapi({"required":["link"]})',
    )
    expect(
      zodToOpenAPI(
        {
          anyOf: [{ type: 'string' }, { $ref: '#/components/schemas/UntypedObj' }],
          properties: { link: { type: 'string' } },
          required: ['link'],
        },
        undefined,
        {
          schemas: {
            UntypedObj: { properties: { id: { type: 'string' } } },
          },
        },
      ),
    ).toBe(
      'z.union([z.string(),UntypedObjSchema.and(z.object({link:z.string()}).openapi({"required":["link"]}))]).openapi({"required":["link"]})',
    )
  })

  it.concurrent('codegen: an opaque $ref the shape cannot be distributed into falls back to the check', () => {
    // A `$ref` to a multi-type component is a stripping union the distribution
    // cannot reach into (the component is shared): the check-pipe is kept for
    // the whole combinator, which is always correct — the document just loses
    // the structure for that shape, as before.
    expect(
      zodToOpenAPI(
        {
          anyOf: [{ $ref: '#/components/schemas/Multi' }, { type: 'string' }],
          properties: { link: { type: 'string' } },
        },
        undefined,
        {
          schemas: {
            Multi: { type: ['object', 'string'], properties: { a: { type: 'string' } } },
          },
        },
      ),
    ).toBe(withCheck('z.union([MultiSchema,z.string()])', shapeCheck))
    expect(
      zodToOpenAPI(
        {
          anyOf: [{ type: ['object', 'string'] }, { type: 'number' }],
          properties: { link: { type: 'string' } },
        },
        undefined,
        undefined,
      ),
    ).toBe(withCheck('z.union([z.union([z.looseObject({}),z.string()]),z.number()])', shapeCheck))
  })

  it.concurrent('codegen: an untyped parent with properties + anyOf stays spec-correct, not #385-object', () => {
    // Minor on #467: `properties` + `anyOf: [{required:[a]}, {required:[b]}]`
    // without `type`. #385 reads an untyped schema with `properties` as an
    // object — but that reading keys off `properties` (or `additionalProperties`),
    // and these branches have only `required`, so they accept non-objects: the
    // union accepts non-objects, the shape cannot be a member, and the inferred
    // type stays unknown-like. The decision is the spec's, not #385's, for the
    // combinator case; #385 still governs a plain untyped schema with properties.
    expect(
      zodToOpenAPI({
        properties: { a: { type: 'string' } },
        anyOf: [{ required: ['a'] }, { type: 'string' }],
      }),
    ).toBe(
      'z.union([z.unknown().superRefine((val,ctx)=>{if(typeof val===\'object\'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"a")){ctx.addIssue({code:\'custom\'})}}}).openapi({"required":["a"]}).superRefine((val,ctx)=>{if(typeof val===\'object\'&&val!==null&&!Array.isArray(val)){if(Object.hasOwn(val,"a")){const Schema=z.string();if(!Schema.safeParse(Reflect.get(val,"a")).success){ctx.addIssue({code:\'custom\'})}}}}),z.string()])',
    )
  })

  it.concurrent("codegen: objectOnly with type 'null' alone does not keep the shape a member", () => {
    // `type: 'null'` satisfies the old `every(type === 'object' || type === 'null')`
    // check, but it accepts no object: the shape is distributed into the member
    // instead, and `null` still passes via `.nullable()`.
    expect(
      zodToOpenAPI({
        type: 'null',
        allOf: [{ minLength: 1 }],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(`z.unknown().superRefine(${minLengthCheck}).superRefine(${shape}).nullable()`)
  })

  it.concurrent('codegen: a nested anyOf distributes into its own object branch', () => {
    expect(
      zodToOpenAPI({
        anyOf: [
          {
            anyOf: [{ type: 'object', properties: { a: { type: 'string' } } }, { type: 'string' }],
          },
          { type: 'number' },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})),z.string()]),z.number()])',
    )
  })

  it.concurrent('codegen: an empty allOf accepts objects, so the shape is refined on it', () => {
    // An empty `allOf` is a vacuous intersection: it accepts everything, so the
    // shape cannot be dropped (it must still constrain object values) and cannot
    // be a member (it must still admit non-objects) — a guarded refine on the
    // pass-through branch is the sound form.
    expect(
      zodToOpenAPI({
        allOf: [{ allOf: [] }, { minLength: 1 }],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(`z.any().superRefine(${shape}).and(z.unknown().superRefine(${minLengthCheck}))`)
    expect(
      zodToOpenAPI({
        anyOf: [{ allOf: [] }, { type: 'string' }],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(`z.union([z.any().superRefine(${shape}),z.string()])`)
  })

  it.concurrent('codegen: a nullable or defaulted branch distributes inside the wrapping (#471)', () => {
    // The intersection passes the RAW input to both sides, so `.and(shapeZ)`
    // after `.nullable()` / `.default()` would reject the `null` / `undefined`
    // the wrapping exists to admit. The shape goes INSIDE the wrapping
    // instead — `core.and(shape).nullable()` / `.default(...)` — so the
    // sibling keys stay in the output, the inferred type and the document,
    // while `null` / the default is still admitted.
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: ['object', 'null'], properties: { a: { type: 'string' } } },
          { type: 'string' },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})).nullable(),z.string()])',
    )
    expect(
      zodToOpenAPI({
        oneOf: [
          { type: ['object', 'null'], properties: { a: { type: 'string' } } },
          { type: 'string' },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.xor([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})).nullable(),z.string()])',
    )
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: 'object', properties: { a: { type: 'string' } }, default: { a: 'd' } },
          { type: 'string' },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})).default({"a":"d"}),z.string()])',
    )
    // An opaque `$ref` the shape cannot be distributed into still falls back
    // to the check: the component is shared, and its target admits `null`
    // itself — the wrapping cannot be re-applied around the identifier.
    expect(
      zodToOpenAPI(
        {
          anyOf: [{ $ref: '#/components/schemas/NullObj' }, { type: 'string' }],
          properties: { link: { type: 'string' } },
        },
        undefined,
        {
          schemas: {
            NullObj: { type: ['object', 'null'], properties: { a: { type: 'string' } } },
          },
        },
      ),
    ).toBe(withCheck('z.union([NullObjSchema,z.string()])', shapeCheck))
    // A `$ref` branch with its OWN wrapping distributes: the wrapping is on
    // the branch, not the target — `canAdmitNullOrUndefined` follows the
    // `$ref` and never sees it, so the branch's own wrapping is checked
    // beside it.
    expect(
      zodToOpenAPI(
        {
          anyOf: [{ $ref: '#/components/schemas/PlainObj', nullable: true }, { type: 'string' }],
          properties: { link: { type: 'string' } },
        },
        undefined,
        {
          schemas: {
            PlainObj: { type: 'object', properties: { a: { type: 'string' } } },
          },
        },
      ),
    ).toBe(
      'z.union([PlainObjSchema.and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})).nullable(),z.string()])',
    )
    // The member path is still skipped when a branch admits `null` — the
    // shape must not sit after the whole union — but the branches distribute
    // now instead of falling back to the check.
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: ['object', 'null'], properties: { a: { type: 'string' } } },
          { type: 'object', properties: { b: { type: 'string' } } },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})).nullable(),z.object({b:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]}))])',
    )
    // An `x-catch` branch keeps the check on the raw input, like a user
    // chain: the catch would swallow violations of the parent's sibling
    // properties (`{a: 'x', link: 123}` would answer `{a: 'c'}`). The check
    // rejects those before the branch runs, and the catch still answers the
    // branch's own failures inside the pipe.
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: 'object', properties: { a: { type: 'string' } }, 'x-catch': { a: 'c' } },
          { type: 'string' },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      withCheck(
        'z.union([z.object({a:z.string().exactOptional()}).catch({"a":"c"}).openapi({"type":"object","properties":{"a":{"type":"string"}},"required":[]}),z.string()])',
        shapeCheck,
      ),
    )
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: 'object', properties: { a: { type: 'string' } }, 'x-catch': { a: 'c' } },
          { type: 'string' },
        ],
        properties: { link: { type: 'string' } },
        required: ['link'],
      }),
    ).toBe(
      `${withCheck(
        'z.union([z.object({a:z.string().exactOptional()}).catch({"a":"c"}).openapi({"type":"object","properties":{"a":{"type":"string"}},"required":[]}),z.string()])',
        requiredShapeCheck,
      )}.openapi({"required":["link"]})`,
    )
    // A shape with `required` but no `properties` is a refine on the
    // distributed branch, as in the plain-object case.
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: ['object', 'null'], properties: { a: { type: 'string' } } },
          { type: 'string' },
        ],
        required: ['link'],
      }),
    ).toBe(
      `z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.looseObject({}).openapi({"required":["link"]})).superRefine(${requiredRefine}).nullable(),z.string()]).openapi({"required":["link"]})`,
    )
    // `.prefault()` feeds its value through the merged schema, so the value
    // is checked against the merged shape by the runtime itself. A prefault
    // that is not a value of the merged shape is dropped, like a default.
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: 'object', properties: { a: { type: 'string' } }, 'x-prefault': { a: 'p' } },
          { type: 'string' },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})).prefault({"a":"p"}),z.string()])',
    )
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: 'object', properties: { a: { type: 'string' } }, 'x-prefault': { a: 'p' } },
          { type: 'string' },
        ],
        properties: { link: { type: 'string' } },
        required: ['link'],
      }),
    ).toBe(
      'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string()}).openapi({"required":["link"]})),z.string()]).openapi({"required":["link"]})',
    )
    // Nullable and default compose in `wrap` order, and `default: null`
    // keeps its `.nullable()` before `.default(null)`.
    expect(
      zodToOpenAPI({
        anyOf: [
          {
            type: 'object',
            properties: { a: { type: 'string' } },
            nullable: true,
            default: { a: 'd' },
          },
          { type: 'string' },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})).nullable().default({"a":"d"}),z.string()])',
    )
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: 'object', properties: { a: { type: 'string' } }, default: null },
          { type: 'string' },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})).nullable().default(null),z.string()])',
    )
    // What cannot be distributed safely keeps the check-pipe: a user chain
    // replaces the chain wholesale, and a refine is written against the
    // branch's own output.
    expect(
      zodToOpenAPI({
        anyOf: [
          {
            type: 'object',
            properties: { a: { type: 'string' } },
            nullable: true,
            'x-preprocess': '(val) => val',
          },
          { type: 'string' },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(withCheck('z.union([(val) => val.openapi({"required":[]}),z.string()])', shapeCheck))
    expect(
      zodToOpenAPI({
        anyOf: [
          {
            type: 'object',
            properties: { a: { type: 'string' } },
            nullable: true,
            'x-refine': ".refine((val) => typeof val === 'object')",
          },
          { type: 'string' },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      withCheck(
        `z.union([z.object({a:z.string().exactOptional()}).nullable().refine((val) => typeof val === 'object').openapi({"required":[]}),z.string()])`,
        shapeCheck,
      ),
    )
  })

  it.concurrent('codegen: #471 — the issue table distributes nullable and defaulted branches', () => {
    // The repro table from the issue, with sibling `properties: {link}`,
    // `required: [link]`, and `safeParse({"id":"a","link":"x"})`.
    expect(
      zodToOpenAPI({
        anyOf: [{ type: 'string' }, { type: 'object', properties: { id: { type: 'string' } } }],
        properties: { link: { type: 'string' } },
        required: ['link'],
      }),
    ).toBe(
      'z.union([z.string(),z.object({id:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string()}).openapi({"required":["link"]}))]).openapi({"required":["link"]})',
    )
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: 'string' },
          { type: 'object', properties: { id: { type: 'string' } }, nullable: true },
        ],
        properties: { link: { type: 'string' } },
        required: ['link'],
      }),
    ).toBe(
      'z.union([z.string(),z.object({id:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string()}).openapi({"required":["link"]})).nullable()]).openapi({"required":["link"]})',
    )
    // The default `{}` is not a value of the merged shape (`link` is
    // required), so no `.default()` is written on the merged branch — the
    // same drop `wrap` applies to a default that is not a value of its
    // schema — instead of a `.default({})` that would not type-check
    // against the merged output type.
    expect(
      zodToOpenAPI({
        anyOf: [
          { type: 'string' },
          { type: 'object', properties: { id: { type: 'string' } }, default: {} },
        ],
        properties: { link: { type: 'string' } },
        required: ['link'],
      }),
    ).toBe(
      'z.union([z.string(),z.object({id:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string()}).openapi({"required":["link"]}))]).openapi({"required":["link"]})',
    )
  })

  it.concurrent('codegen: allOf with all-nullable members distributes into the members (#471)', () => {
    // A shape member after the whole intersection would reject the `null`
    // every member admits, so the member path gives way and the shape is
    // distributed into the members, inside their own wrapping.
    expect(
      zodToOpenAPI({
        allOf: [
          { type: 'object', properties: { a: { type: 'string' } }, nullable: true },
          { type: 'object', properties: { b: { type: 'string' } }, nullable: true },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})).nullable().and(z.object({b:z.string().exactOptional()}).nullable().openapi({"required":[]}))',
    )
  })

  it.concurrent('codegen: allOf with $ref members carrying their own nullable distributes (#471)', () => {
    // The same class as the `anyOf` / `oneOf` fix: a `$ref` member with its
    // own `.nullable()` admits `null` through its wrapping, not through its
    // target — `canAdmitNullOrUndefined` follows the `$ref` and never sees
    // it — so the member path would emit `A.nullable().and(B.nullable())`
    // followed by the shape, rejecting the `null` the intersection admits.
    // The shape distributes into the members instead, inside their wrapping.
    expect(
      zodToOpenAPI(
        {
          allOf: [
            { $ref: '#/components/schemas/A', nullable: true },
            { $ref: '#/components/schemas/B', nullable: true },
          ],
          properties: { link: { type: 'string' } },
        },
        undefined,
        {
          schemas: {
            A: { type: 'object', properties: { a: { type: 'string' } } },
            B: { type: 'object', properties: { b: { type: 'string' } } },
          },
        },
      ),
    ).toBe(
      'ASchema.and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})).nullable().and(BSchema.nullable())',
    )
  })

  it.concurrent('codegen: the member path stands when the parent type rejects null', () => {
    // A declared object-only type already rejects `null`, so a nullable or
    // defaulted branch cannot smuggle one past the member path — and the member
    // path is the only form that keeps the shape's per-property type errors
    // (with their paths): a refine on each branch fails every branch, so the
    // union reports its own message instead. This is the x-implication-message
    // case: a wrong-typed `hasLicense` must surface as its boolean type error,
    // not as "licenseNumber is required when hasLicense is true".
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: {
          hasLicense: { type: 'boolean' },
          licenseNumber: { type: 'string' },
        },
        anyOf: [
          { not: { required: ['hasLicense'], properties: { hasLicense: { const: true } } } },
          { required: ['licenseNumber'] },
        ],
        'x-implication-message': 'licenseNumber is required when hasLicense is true',
      }),
    ).toBe(
      `z.union([z.any().refine((val) => !z.object({hasLicense:z.literal(true)}).openapi({"required":["hasLicense"]}).safeParse(val).success).openapi({"not":{"required":["hasLicense"],"properties":{"hasLicense":{"const":true}}}}),z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"licenseNumber")){ctx.addIssue({code:'custom'})}}}).openapi({"required":["licenseNumber"]})],{error:"licenseNumber is required when hasLicense is true"}).and(z.object({hasLicense:z.boolean().exactOptional(),licenseNumber:z.string().exactOptional()}).openapi({"required":[]})).openapi({"x-implication-message":"licenseNumber is required when hasLicense is true"})`,
    )
    // But when the parent type itself allows `null`, the member path must give
    // way: `null` is valid here, and the shape would reject it. The branches
    // distribute instead (#471) — the shape inside the nullable branch's
    // wrapping, as a member on the plain one — and the parent's own
    // `.nullable()` still admits `null` around the union.
    expect(
      zodToOpenAPI({
        type: ['object', 'null'],
        anyOf: [
          { type: ['object', 'null'], properties: { a: { type: 'string' } } },
          { type: 'object', properties: { b: { type: 'string' } } },
        ],
        properties: { link: { type: 'string' } },
      }),
    ).toBe(
      'z.union([z.object({a:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]})).nullable(),z.object({b:z.string().exactOptional()}).openapi({"required":[]}).and(z.object({link:z.string().exactOptional()}).openapi({"required":[]}))]).nullable()',
    )
  })

  // Runtime checks: the equivalent Zod schemas are mirrored by hand in TS rather
  // than evaluated from the generated string, so no `new Function` / `eval` is
  // introduced here (repo convention, see string.test.ts).
  it.concurrent('runtime: a non-object value passes the shape, an object must match it', () => {
    const AnyOf = z.union([
      z.string(),
      z.looseObject({}).and(z.object({ link: z.string().exactOptional() })),
    ])
    expect(AnyOf.safeParse('0').success).toBe(true)
    expect(AnyOf.safeParse({ link: 'x' }).success).toBe(true)
    expect(AnyOf.safeParse({ link: 123 }).success).toBe(false)
    const Multi = z.union([z.object({ link: z.string().exactOptional() }), z.string()])
    expect(Multi.safeParse('0').success).toBe(true)
    expect(Multi.safeParse({ link: 'x' }).success).toBe(true)
    expect(Multi.safeParse({ link: 123 }).success).toBe(false)
    expect(Multi.safeParse({}).success).toBe(true)
    // No member accepts an object, so the shape is dropped: the value is
    // whatever the string member accepts.
    const AllOf = z.string()
    expect(AllOf.safeParse('0').success).toBe(true)
    expect(AllOf.safeParse({ link: 'x' }).success).toBe(false)
    // A declared object type keeps the intersection: the property's type is checked
    // with its path, so a wrong-typed property fails at that property.
    const ObjectAnyOf = z
      .union([z.string(), z.looseObject({})])
      .and(z.object({ link: z.string().exactOptional() }))
    expect(ObjectAnyOf.safeParse('0').success).toBe(false)
    expect(ObjectAnyOf.safeParse({ link: 'x' }).success).toBe(true)
    const badLink = ObjectAnyOf.safeParse({ link: 123 })
    expect(badLink.success).toBe(false)
    expect(badLink.error?.issues[0]?.path).toStrictEqual(['link'])
  })

  it.concurrent('runtime: a stripping object branch does not hide the sibling shape', () => {
    // The branch `z.object({a})` strips `link` before a refine would see it;
    // the shape is an intersection member on the branch instead, so the merge
    // keeps `link` in the parsed output.
    const Stripping = z.union([
      z
        .object({ a: z.string().exactOptional() })
        .and(z.object({ link: z.string().exactOptional() })),
      z.string(),
    ])
    expect(Stripping.safeParse({ a: 'x', link: 123 }).success).toBe(false)
    // No `a` at all still passes: the branch's `a` is optional, as emitted.
    expect(Stripping.safeParse({ link: 'x' }).success).toBe(true)
    const kept = Stripping.safeParse({ a: 'x', link: 'y' })
    expect(kept.success).toBe(true)
    expect(kept.data).toStrictEqual({ a: 'x', link: 'y' })
    expect(Stripping.safeParse('0').success).toBe(true)
    const StrippingOneOf = z.xor([
      z
        .object({ a: z.string().exactOptional() })
        .and(z.object({ link: z.string().exactOptional() })),
      z.string(),
    ])
    expect(StrippingOneOf.safeParse({ a: 'x', link: 123 }).success).toBe(false)
    expect(StrippingOneOf.safeParse({ a: 'x', link: 'y' }).success).toBe(true)
    // Required-only: a present sibling must pass — the loose object in the
    // intersection passes every key through, so the merged output still has
    // the key for the required refine to see.
    const Required = z.union([
      z
        .object({ a: z.string().exactOptional() })
        .and(z.looseObject({}))
        .superRefine(requiredRefine461),
      z.string(),
    ])
    expect(Required.safeParse({ a: 'x', link: 'y' }).success).toBe(true)
    expect(Required.safeParse({ a: 'x' }).success).toBe(false)
    // A value failing both the shape and the base matches no branch, so the
    // union reports a single `invalid_union`: the per-branch issues are nested
    // in its `errors` field — the shape's failure is still visible there (the
    // object branch reports both `a` and `link`), just not as the top issue.
    // Accept/reject is unchanged; only the reported issue differs from the
    // check-pipe form.
    const doubly = Stripping.safeParse({ a: 123, link: 123 })
    expect(doubly.success).toBe(false)
    expect(doubly.error?.issues).toStrictEqual([
      {
        code: 'invalid_union',
        errors: [
          [
            {
              code: 'invalid_type',
              expected: 'string',
              message: 'Invalid input: expected string, received number',
              path: ['a'],
            },
            {
              code: 'invalid_type',
              expected: 'string',
              message: 'Invalid input: expected string, received number',
              path: ['link'],
            },
          ],
          [
            {
              code: 'invalid_type',
              expected: 'string',
              message: 'Invalid input: expected string, received object',
              path: [],
            },
          ],
        ],
        message: 'Invalid input',
        path: [],
      },
    ])
  })

  it.concurrent('runtime: oneOf beside properties now constrains objects, and the member case keeps the type merge', () => {
    const OneOf = z.xor([
      z.string(),
      z.looseObject({}).and(z.object({ link: z.string().exactOptional() })),
    ])
    expect(OneOf.safeParse('0').success).toBe(true)
    expect(OneOf.safeParse({ link: 'x' }).success).toBe(true)
    expect(OneOf.safeParse({ link: 123 }).success).toBe(false)
    // The shape member merges the sibling property into the inferred type:
    // a value missing the required sibling key fails, with the key's path.
    const Merged = z.object({ id: z.int() }).and(z.object({ label: z.string() }))
    expect(Merged.safeParse({ id: 1, label: 'x' }).success).toBe(true)
    expect(Merged.safeParse({ id: 1 }).success).toBe(false)
    const badLabel = Merged.safeParse({ id: 1, label: 123 })
    expect(badLabel.success).toBe(false)
    expect(badLabel.error?.issues[0]?.path).toStrictEqual(['label'])
  })

  it.concurrent('runtime: a string default survives on the distributed member', () => {
    const Defaulted = z
      .unknown()
      .superRefine((val, ctx) => {
        // oxlint-disable-next-line typescript/no-misused-spread -- code-point iteration is intended
        if (typeof val === 'string' && [...val].length === 0) {
          ctx.addIssue({ code: 'custom' })
        }
      })
      .superRefine(shapeRefine461)
      .default('0')
    expect(Defaulted.safeParse('0').success).toBe(true)
    expect(Defaulted.safeParse('').success).toBe(false)
    expect(Defaulted.safeParse(undefined).success).toBe(true)
    expect(Defaulted.safeParse(undefined).data).toBe('0')
  })

  it.concurrent('runtime: an opaque $ref falls back to the check on the raw input', () => {
    // A `$ref` to a multi-type component cannot be distributed into, so the
    // check runs on the raw input, piped into the union. Validation is still
    // correct — only the document (and, for this shape, the sibling key in the
    // output) is lost, as before.
    const MultiSchema = z.union([z.object({ a: z.string().exactOptional() }), z.string()])
    const Fallback = checked(z.union([MultiSchema, z.string()]), shapeCheck461)
    expect(Fallback.safeParse('0').success).toBe(true)
    expect(Fallback.safeParse({ a: 'x', link: 'y' }).success).toBe(true)
    expect(Fallback.safeParse({ a: 'x', link: 123 }).success).toBe(false)
    const FallbackRequired = checked(z.union([MultiSchema, z.string()]), requiredCheck461)
    expect(FallbackRequired.safeParse({ a: 'x', link: 'y' }).success).toBe(true)
    expect(FallbackRequired.safeParse({ a: 'x' }).success).toBe(false)
  })

  it.concurrent('runtime: an empty allOf still enforces the shape', () => {
    // A vacuous intersection accepts everything, so the shape is a guarded
    // refine on the pass-through branch: objects are constrained, other values
    // pass.
    const EmptyAllOf = z
      .any()
      .superRefine(shapeRefine461)
      .and(
        z.unknown().superRefine((val, ctx) => {
          // oxlint-disable-next-line typescript/no-misused-spread -- code-point iteration is intended
          if (typeof val === 'string' && [...val].length === 0) {
            ctx.addIssue({ code: 'custom' })
          }
        }),
      )
    expect(EmptyAllOf.safeParse('0').success).toBe(true)
    expect(EmptyAllOf.safeParse({ link: 'x' }).success).toBe(true)
    expect(EmptyAllOf.safeParse({ link: 123 }).success).toBe(false)
    const EmptyAnyOf = z.union([z.any().superRefine(shapeRefine461), z.string()])
    expect(EmptyAnyOf.safeParse('0').success).toBe(true)
    expect(EmptyAnyOf.safeParse({ link: 123 }).success).toBe(false)
  })

  it.concurrent('runtime: a nullable or defaulted branch still admits null and undefined', () => {
    // The distributed form (#471): the shape is inside the wrapping, so the
    // sibling key stays in the output — and `null` / the default is still
    // admitted, because the wrapping sits outside the intersection.
    const Nullable = z.union([
      z
        .object({ a: z.string().exactOptional() })
        .and(z.object({ link: z.string().exactOptional() }))
        .nullable(),
      z.string(),
    ])
    expect(Nullable.safeParse(null).success).toBe(true)
    expect(Nullable.safeParse('0').success).toBe(true)
    expect(Nullable.safeParse({ a: 'x', link: 123 }).success).toBe(false)
    expect(Nullable.safeParse({ a: 'x', link: 'y' })).toStrictEqual({
      success: true,
      data: { a: 'x', link: 'y' },
    })
    const Defaulted = z.union([
      z
        .object({ a: z.string().exactOptional() })
        .and(z.object({ link: z.string().exactOptional() }))
        .default({ a: 'd' }),
      z.string(),
    ])
    const substituted = Defaulted.safeParse(undefined)
    expect(substituted.success).toBe(true)
    expect(substituted.data).toStrictEqual({ a: 'd' })
    expect(Defaulted.safeParse({ a: 'x', link: 123 }).success).toBe(false)
    expect(Defaulted.safeParse({ a: 'x', link: 'y' })).toStrictEqual({
      success: true,
      data: { a: 'x', link: 'y' },
    })
    // An `x-catch` branch keeps the check on the raw input: it rejects a
    // wrong-typed sibling before the branch runs, so the catch never sees
    // it. The catch still answers the branch's own failures inside the pipe,
    // as before.
    const Caught = checked(
      z.union([z.object({ a: z.string().exactOptional() }).catch({ a: 'c' }), z.string()]),
      shapeCheck461,
    )
    expect(Caught.safeParse(null).success).toBe(true)
    expect(Caught.safeParse(null).data).toStrictEqual({ a: 'c' })
    expect(Caught.safeParse({ a: 'x', link: 123 }).success).toBe(false)
    expect(Caught.safeParse({ a: 'x', link: 'y' }).success).toBe(true)
    const RequiredNullable = z.union([
      z
        .object({ a: z.string().exactOptional() })
        .and(z.looseObject({}))
        .superRefine((val, ctx) => {
          if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            if (!Object.hasOwn(val, 'link')) ctx.addIssue({ code: 'custom' })
          }
        })
        .nullable(),
      z.string(),
    ])
    expect(RequiredNullable.safeParse(null).success).toBe(true)
    expect(RequiredNullable.safeParse({ a: 'x' }).success).toBe(false)
    expect(RequiredNullable.safeParse({ a: 'x', link: 'y' })).toStrictEqual({
      success: true,
      data: { a: 'x', link: 'y' },
    })
  })

  it.concurrent('runtime: #471 — the issue table keeps the sibling key', () => {
    // `safeParse({"id":"a","link":"x"})` on the three rows of the issue
    // table: the plain branch (#467) and the nullable and defaulted ones.
    const Nullable = z.union([
      z
        .object({ id: z.string().exactOptional() })
        .and(z.object({ link: z.string() }))
        .nullable(),
      z.string(),
    ])
    expect(Nullable.safeParse({ id: 'a', link: 'x' })).toStrictEqual({
      success: true,
      data: { id: 'a', link: 'x' },
    })
    expect(Nullable.safeParse(null).success).toBe(true)
    // The default `{}` is not a value of the merged shape (`link` is
    // required), so `.default()` is dropped — an absent value now fails,
    // the way a dropped default fails on a plain schema — while an object
    // input keeps `link`.
    const Defaulted = z.union([
      z.object({ id: z.string().exactOptional() }).and(z.object({ link: z.string() })),
      z.string(),
    ])
    expect(Defaulted.safeParse({ id: 'a', link: 'x' })).toStrictEqual({
      success: true,
      data: { id: 'a', link: 'x' },
    })
    expect(Defaulted.safeParse(undefined).success).toBe(false)
  })

  it.concurrent('runtime: allOf with $ref members carrying their own nullable still admits null (#471)', () => {
    // The distributed form, mirrored by hand: the shape sits inside the
    // first member's wrapping, and the second member keeps its own.
    const Distributed = z
      .object({ a: z.string().exactOptional() })
      .and(z.object({ link: z.string().exactOptional() }))
      .nullable()
      .and(z.object({ b: z.string().exactOptional() }).nullable())
    expect(Distributed.safeParse(null).success).toBe(true)
    expect(Distributed.safeParse({ a: 'x', b: 'y', link: 'z' })).toStrictEqual({
      success: true,
      data: { a: 'x', b: 'y', link: 'z' },
    })
    expect(Distributed.safeParse({ a: 'x', b: 'y', link: 123 }).success).toBe(false)
  })

  it.concurrent('runtime: the member path keeps the property type error', () => {
    // The implication shape from the repo's own suite: `anyOf [not {hasLicense:
    // true}, required: licenseNumber]` beside sibling properties, under a
    // declared object type. A wrong-typed `hasLicense` must fail with its
    // boolean type error at `/hasLicense` — not with the union's implication
    // message, which is what a per-branch refine would report.
    const Implication = z
      .union(
        [
          z
            .any()
            .refine((val) => !z.object({ hasLicense: z.literal(true) }).safeParse(val).success),
          z.unknown().superRefine((val, ctx) => {
            if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
              if (!Object.hasOwn(val, 'licenseNumber')) {
                ctx.addIssue({ code: 'custom' })
              }
            }
          }),
        ],
        { error: 'licenseNumber is required when hasLicense is true' },
      )
      .and(
        z.object({
          hasLicense: z.boolean().exactOptional(),
          licenseNumber: z.string().exactOptional(),
        }),
      )
    const noNumber = Implication.safeParse({ hasLicense: true })
    expect(noNumber.success).toBe(false)
    if (!noNumber.success) {
      expect(noNumber.error.issues[0]?.message).toBe(
        'licenseNumber is required when hasLicense is true',
      )
    }
    const wrongType = Implication.safeParse({ hasLicense: 'not-a-bool', licenseNumber: 'L-001' })
    expect(wrongType.success).toBe(false)
    if (!wrongType.success) {
      expect(wrongType.error.issues[0]?.code).toBe('invalid_type')
      expect(wrongType.error.issues[0]?.path).toStrictEqual(['hasLicense'])
    }
    expect(Implication.safeParse({ hasLicense: true, licenseNumber: 'L-1' }).success).toBe(true)
    expect(Implication.safeParse({ hasLicense: false }).success).toBe(true)
    expect(Implication.safeParse(null).success).toBe(false)
    const NullableParent = checked(
      z.union([
        z.object({ a: z.string().exactOptional() }).nullable(),
        z.object({ b: z.string().exactOptional() }),
      ]),
      shapeCheck461,
    ).nullable()
    expect(NullableParent.safeParse(null).success).toBe(true)
    expect(NullableParent.safeParse({ a: 'x', link: 'y' }).success).toBe(true)
    expect(NullableParent.safeParse({ b: 'x', link: 123 }).success).toBe(false)
    expect(NullableParent.safeParse('0').success).toBe(false)
  })

  it.concurrent('runtime: an untyped object branch keeps the sibling in the output', () => {
    // Same regression as the codegen test above, as runtime mirrors: the
    // object branch is a plain `z.object` (#385), so the shape distributes
    // as `.and()` and the merge keeps `link`.
    const UntypedInline = z.union([
      z.string(),
      z.object({ id: z.string().exactOptional() }).and(z.object({ link: z.string() })),
    ])
    expect(UntypedInline.safeParse('0').success).toBe(true)
    const kept = UntypedInline.safeParse({ id: 'a', link: 'x' })
    expect(kept.success).toBe(true)
    expect(kept.data).toStrictEqual({ id: 'a', link: 'x' })
    expect(UntypedInline.safeParse({ id: 'a', link: 123 }).success).toBe(false)
    expect(UntypedInline.safeParse({ id: 'a' }).success).toBe(false)
    expect(UntypedInline.safeParse(null).success).toBe(false)
    const UntypedObjSchema = z.object({ id: z.string().exactOptional() })
    const UntypedRef = z.union([z.string(), UntypedObjSchema.and(z.object({ link: z.string() }))])
    expect(UntypedRef.safeParse('0').success).toBe(true)
    const keptRef = UntypedRef.safeParse({ id: 'a', link: 'x' })
    expect(keptRef.success).toBe(true)
    expect(keptRef.data).toStrictEqual({ id: 'a', link: 'x' })
    expect(UntypedRef.safeParse({ id: 'a', link: 123 }).success).toBe(false)
    expect(UntypedRef.safeParse({ id: 'a' }).success).toBe(false)
  })

  it.concurrent('runtime: an untyped parent with properties + anyOf stays spec-correct', () => {
    // No `type`, so the branches accept non-objects and the shape cannot be a
    // member: a string passes, an object must satisfy a branch and the shape
    // (here the shape is the `a` property itself).
    const Untyped = z.union([
      z
        .unknown()
        .superRefine((val, ctx) => {
          if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            if (!Object.hasOwn(val, 'a')) {
              ctx.addIssue({ code: 'custom' })
            }
          }
        })
        .superRefine(shapeA461),
      z.string(),
    ])
    expect(Untyped.safeParse('x').success).toBe(true)
    expect(Untyped.safeParse({ a: '1' }).success).toBe(true)
    expect(Untyped.safeParse({ a: 1 }).success).toBe(false)
    expect(Untyped.safeParse({}).success).toBe(false)
  })

  it.concurrent("runtime: type 'null' beside allOf still accepts null", () => {
    const Nulled = z
      .unknown()
      .superRefine((val, ctx) => {
        // oxlint-disable-next-line typescript/no-misused-spread -- code-point iteration is intended
        if (typeof val === 'string' && [...val].length === 0) {
          ctx.addIssue({ code: 'custom' })
        }
      })
      .superRefine(shapeRefine461)
      .nullable()
    expect(Nulled.safeParse(null).success).toBe(true)
    expect(Nulled.safeParse('0').success).toBe(true)
    expect(Nulled.safeParse({ link: 123 }).success).toBe(false)
    expect(Nulled.safeParse({ link: 'x' }).success).toBe(true)
  })
})

// #387: an object default keeps the keys its schema declares
describe('object default', () => {
  it.concurrent('drops the keys the schema does not declare', () => {
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: { a: { type: 'string' } },
        default: { a: 'x', b: 1 },
      }),
    ).toBe('z.object({a:z.string().exactOptional()}).default({"a":"x"}).openapi({"required":[]})')
    // a loose object takes any key
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: { a: { type: 'string' } },
        additionalProperties: true,
        default: { a: 'x', b: 1 },
      }),
    ).toBe(
      'z.looseObject({a:z.string().exactOptional()}).default({"a":"x","b":1}).openapi({"required":[]})',
    )
  })

  it.concurrent('leaves to the document a default that misses a required key', () => {
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: { a: { type: 'string' } },
        required: ['a'],
        default: { b: 1 },
      }),
    ).toBe('z.object({a:z.string()}).openapi({"required":["a"],"default":{"b":1}})')
  })

  it.concurrent('reads a default on a reference against the component it names', () => {
    const schemas = {
      Filters: {
        type: 'object',
        properties: { active: { type: 'boolean' }, secrets: { type: 'boolean' } },
      },
    } as const
    expect(
      zodToOpenAPI(
        {
          type: 'object',
          properties: {
            filters: {
              $ref: '#/components/schemas/Filters',
              default: { secrets: 'false', other: 1 },
            },
          },
        },
        undefined,
        { schemas },
      ),
    ).toBe(
      'z.object({filters:FiltersSchema.default({"secrets":false}).exactOptional()}).openapi({"required":[]})',
    )
    // without the components the default is written as it is, as before
    expect(zodToOpenAPI({ $ref: '#/components/schemas/Filters', default: { other: 1 } })).toBe(
      'FiltersSchema.default({"other":1})',
    )
  })
})

const ref = (name: string): Schema => ({ $ref: `#/components/schemas/${name}` })

describe('a declared type beside combinators (#468)', () => {
  const minLengthCheck = `(val,ctx)=>{if(typeof val==='string'){if([...val].length<1){ctx.addIssue({code:'custom'})}}}`
  const requiredA = `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"a")){ctx.addIssue({code:'custom'})}}}).openapi({"required":["a"]})`
  const schemas = {
    Obj: { type: 'object', properties: { x: { type: 'string' } } },
    Num: { type: 'number' },
    Typeless: { minLength: 1 },
  } as const

  it.concurrent('codegen: typeless members of the declared type take the type', () => {
    expect(zodToOpenAPI({ type: 'string', allOf: [{ minLength: 1 }] })).toBe('z.string().min(1)')
    expect(zodToOpenAPI({ type: 'string', allOf: [{ minLength: 1 }, { maxLength: 5 }] })).toBe(
      'z.string().min(1).and(z.string().max(5))',
    )
    expect(zodToOpenAPI({ type: 'string', anyOf: [{ minLength: 1 }, { maxLength: 5 }] })).toBe(
      'z.union([z.string().min(1),z.string().max(5)])',
    )
    expect(zodToOpenAPI({ type: 'integer', allOf: [{ minimum: 1 }] })).toBe('z.int().min(1)')
    expect(zodToOpenAPI({ type: 'string', oneOf: [{ minLength: 3 }, { maxLength: 1 }] })).toBe(
      'z.xor([z.string().min(3),z.string().max(1)])',
    )
    expect(zodToOpenAPI({ type: 'array', anyOf: [{ minItems: 1 }, { maxItems: 0 }] })).toBe(
      'z.union([z.array(z.any()).min(1),z.array(z.any()).max(0)])',
    )
  })

  it.concurrent('codegen: null stays with the outer handling', () => {
    expect(
      zodToOpenAPI({ type: ['string', 'null'], anyOf: [{ minLength: 1 }, { maxLength: 5 }] }),
    ).toBe('z.union([z.string().min(1),z.string().max(5)]).nullable()')
    expect(zodToOpenAPI({ type: 'string', nullable: true, allOf: [{ minLength: 1 }] })).toBe(
      'z.string().min(1).nullable()',
    )
    // `type: null` alone declares no type to narrow to
    expect(zodToOpenAPI({ type: 'null', anyOf: [{ minLength: 1 }] })).toBe(
      zodToOpenAPI({ anyOf: [{ minLength: 1 }], nullable: true }),
    )
  })

  it.concurrent('codegen: members that already settle the type are left as they are', () => {
    expect(zodToOpenAPI({ type: 'string', anyOf: [{ type: 'string' }, { const: 'a' }] })).toBe(
      'z.union([z.string(),z.literal("a")])',
    )
    // an integer is a number
    expect(zodToOpenAPI({ type: 'number', anyOf: [{ type: 'integer' }, { minimum: 0.5 }] })).toBe(
      'z.union([z.int(),z.number().min(0.5)])',
    )
    // one settled member settles an intersection
    expect(zodToOpenAPI({ type: 'string', allOf: [{ type: 'string' }, { pattern: '^a' }] })).toBe(
      zodToOpenAPI({ allOf: [{ type: 'string' }, { type: 'string', pattern: '^a' }] }),
    )
    // an untyped object is read as an object already (#385)
    expect(
      zodToOpenAPI({ type: 'object', oneOf: [{ properties: { a: { type: 'number' } } }] }),
    ).toBe(zodToOpenAPI({ oneOf: [{ properties: { a: { type: 'number' } } }] }))
  })

  it.concurrent('codegen: a reference is followed, and taken as conforming when it cannot be', () => {
    expect(zodToOpenAPI({ type: 'object', allOf: [ref('Obj')] }, undefined, { schemas })).toBe(
      'ObjSchema',
    )
    expect(zodToOpenAPI({ type: 'object', allOf: [ref('Obj')] })).toBe('ObjSchema')
    expect(zodToOpenAPI({ type: 'string', allOf: [ref('Num')] }, undefined, { schemas })).toBe(
      'z.string().and(NumSchema)',
    )
    expect(zodToOpenAPI({ type: 'string', allOf: [ref('Typeless')] }, undefined, { schemas })).toBe(
      'z.string().and(TypelessSchema)',
    )
    expect(
      zodToOpenAPI({ type: 'string', anyOf: [ref('Typeless'), { maxLength: 0 }] }, undefined, {
        schemas,
      }),
    ).toBe('z.union([z.string().and(TypelessSchema),z.string().max(0)])')
  })

  it.concurrent('codegen: a branch that cannot take the type is intersected with it', () => {
    // a typed object emits its shape from `properties`, so `required` alone
    // stays a guarded refine beside the object
    expect(zodToOpenAPI({ type: 'object', anyOf: [{ required: ['a'] }] })).toBe(
      `z.union([z.looseObject({}).and(${requiredA})])`,
    )
    expect(zodToOpenAPI({ type: 'object', allOf: [{ required: ['a'] }] })).toBe(
      `z.looseObject({}).and(${requiredA})`,
    )
    // a value of another type among the enum members
    expect(zodToOpenAPI({ type: 'string', anyOf: [{ const: 'a' }, { enum: ['b', 5] }] })).toBe(
      `z.union([z.literal("a"),z.string().and(z.union([z.literal('b'),z.literal(5)]))])`,
    )
    // a wider type on the branch
    expect(zodToOpenAPI({ type: 'integer', oneOf: [{ type: 'number', minimum: 1 }] })).toBe(
      'z.xor([z.int().and(z.number().min(1))])',
    )
    // several declared types
    expect(zodToOpenAPI({ type: ['string', 'number'], allOf: [{ minLength: 1 }] })).toBe(
      `z.union([z.string(),z.number()]).and(z.unknown().superRefine(${minLengthCheck}))`,
    )
  })

  it.concurrent('codegen: nested combinators and not take the type', () => {
    expect(
      zodToOpenAPI({ type: 'string', allOf: [{ anyOf: [{ minLength: 4 }, { maxLength: 1 }] }] }),
    ).toBe('z.union([z.string().min(4),z.string().max(1)])')
    expect(zodToOpenAPI({ type: 'string', allOf: [{ not: { const: 'x' } }] })).toBe(
      'z.string().refine((val) => val !== "x").openapi({"not":{"const":"x"}})',
    )
  })

  it.concurrent('codegen: an annotation-only member takes the type as a branch, not as an allOf member', () => {
    expect(zodToOpenAPI({ type: 'string', anyOf: [{ description: 'x' }, { minLength: 1 }] })).toBe(
      'z.union([z.string().openapi({"description":"x"}),z.string().min(1)])',
    )
    expect(zodToOpenAPI({ type: 'string', allOf: [{ description: 'x' }] })).toBe(
      'z.string().openapi({"description":"x"})',
    )
  })

  it.concurrent('codegen: type object with a sibling shape is settled by the shape', () => {
    const shaped = { properties: { a: { type: 'number' } } } as const
    expect(zodToOpenAPI({ type: 'object', ...shaped, anyOf: [{ required: ['a'] }] })).toBe(
      `z.union([${requiredA}]).and(z.object({a:z.number().exactOptional()}).openapi({"required":[]}))`,
    )
    expect(zodToOpenAPI({ type: 'object', ...shaped, allOf: [{ required: ['a'] }] })).toBe(
      `${requiredA}.and(z.object({a:z.number().exactOptional()}).openapi({"required":[]}))`,
    )
  })

  it.concurrent('runtime: the issue table — values of another type are rejected', () => {
    const allOfString = z.string().min(1)
    expect(allOfString.safeParse('a').success).toBe(true)
    expect(allOfString.safeParse('').success).toBe(false)
    expect(allOfString.safeParse(5).success).toBe(false)
    expect(allOfString.safeParse({ a: 1 }).success).toBe(false)

    const anyOfString = z.union([z.string().min(1), z.string().max(5)])
    expect(anyOfString.safeParse('').success).toBe(true)
    expect(anyOfString.safeParse('abcdefg').success).toBe(true)
    expect(anyOfString.safeParse(5).success).toBe(false)
    expect(anyOfString.safeParse({ a: 1 }).success).toBe(false)

    const allOfInteger = z.int().min(1)
    expect(allOfInteger.safeParse(5).success).toBe(true)
    expect(allOfInteger.safeParse('x').success).toBe(false)
    expect(allOfInteger.safeParse(1.5).success).toBe(false)
    expect(allOfInteger.safeParse(0).success).toBe(false)

    const oneOfString = z.xor([z.string().min(3), z.string().max(1)])
    expect(oneOfString.safeParse('abc').success).toBe(true)
    expect(oneOfString.safeParse('').success).toBe(true)
    expect(oneOfString.safeParse('ab').success).toBe(false)
    // both branches reject on the type now, not because both match
    const result = oneOfString.safeParse(5)
    expect(result.success).toBe(false)
    expect(JSON.stringify(result.error?.issues)).toContain('"expected":"string"')
  })

  it.concurrent('runtime: the typed schema intersected with a typeless branch', () => {
    const required = z.unknown().superRefine((val, ctx) => {
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        if (!Object.hasOwn(val, 'a')) ctx.addIssue({ code: 'custom' })
      }
    })
    const Schema = z.union([z.looseObject({}).and(required)])
    expect(Schema.safeParse({ a: 1, b: 2 })).toStrictEqual({ success: true, data: { a: 1, b: 2 } })
    expect(Schema.safeParse({ b: 2 }).success).toBe(false)
    expect(Schema.safeParse(5).success).toBe(false)
    expect(Schema.safeParse([]).success).toBe(false)
  })
})

// #492: `.catch()` is a `ZodCatch`, which `@hono/zod-openapi` cannot render —
// `getOpenAPIDocument()` throws as soon as a route uses the schema, unless the
// schema states its own `type`, which is then all the document reads. So the
// catch stays a `.catch()`, exactly what it was at runtime, and `.openapi()`
// states the schema the source declares. Where no type can be stated (a
// combinator, a schema of any type) the catch is a `z.preprocess`, which the
// document renders by the schema inside it (see `caught` above).
// test/runtime/x-transforms.valid.test.ts generates the document.
describe('x-catch states its schema for the document (#492)', () => {
  it.concurrent('codegen: the issue table', () => {
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: { a: { type: 'string' } },
        'x-catch': { a: 'c' },
      }),
    ).toBe(
      'z.object({a:z.string().exactOptional()}).catch({"a":"c"}).openapi({"type":"object","properties":{"a":{"type":"string"}},"required":[]})',
    )
    expect(zodToOpenAPI({ type: 'string', 'x-catch': 'fallback' })).toBe(
      'z.string().catch("fallback").openapi({"type":"string"})',
    )
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: { name: { type: 'string', 'x-catch': 'anon' } },
      }),
    ).toBe(
      'z.object({name:z.string().catch("anon").exactOptional().openapi({"type":"string"})}).openapi({"required":[]})',
    )
  })

  it.concurrent('codegen: what the chain would have said is stated as the source has it', () => {
    // The keywords the chain expresses, the default, and what is not a keyword of Zod.
    expect(
      zodToOpenAPI({
        type: 'string',
        minLength: 3,
        default: 'abc',
        description: 'd',
        'x-catch': 'xyz',
        'x-error-message': 'bad',
      }),
    ).toBe(
      'z.string({error:"bad"}).min(3,{error:"bad"}).default("abc").catch("xyz").openapi({"type":"string","minLength":3,"default":"abc","description":"d"})',
    )
    // A bigint: the bounds as JSON numbers, the fallback as a bigint.
    expect(zodToOpenAPI({ type: 'integer', format: 'int64', minimum: 0, 'x-catch': 0 })).toBe(
      `z.preprocess(${JSON_BIGINT},z.int64().min(0n)).catch(0n).openapi({"type":"integer","format":"int64","minimum":0})`,
    )
    // The emitter's own extensions are not the document's, at any level.
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: { f: { type: 'boolean', 'x-stringbool': true } },
        'x-catch': { f: false },
      }),
    ).toBe(
      'z.object({f:z.stringbool().exactOptional()}).catch({"f":false}).openapi({"type":"object","properties":{"f":{"type":"boolean"}},"required":[]})',
    )
  })

  it.concurrent('codegen: a reference is stated as the component it names', () => {
    const schemas = { A: { type: 'object', properties: { a: { type: 'string' } } } } as const
    expect(
      zodToOpenAPI({ $ref: '#/components/schemas/A', 'x-catch': {} }, undefined, { schemas }),
    ).toBe('ASchema.catch({}).openapi({"type":"object","properties":{"a":{"type":"string"}}})')
  })

  it.concurrent('codegen: no type to state → a preprocess the document renders', () => {
    expect(zodToOpenAPI({ anyOf: [{ type: 'string' }, { type: 'number' }], 'x-catch': 'x' })).toBe(
      caught('z.union([z.string(),z.number()])', '"x"'),
    )
    // A reference that cannot be read has no type either.
    expect(zodToOpenAPI({ $ref: '#/components/schemas/A', 'x-catch': {} })).toBe(
      caught('ASchema', '{}'),
    )
  })

  it.concurrent('codegen: the catch stays where it was in the chain', () => {
    // After `.nullable()`, `.default()` and `.prefault()`, before `.readonly()`.
    expect(
      zodToOpenAPI({
        type: 'string',
        nullable: true,
        default: 'd',
        'x-catch': 'c',
        'x-readonly': true,
      }),
    ).toBe(
      'z.string().nullable().default("d").catch("c").readonly().openapi({"type":["string","null"],"default":"d"})',
    )
  })

  it.concurrent('runtime: the preprocess answers every failure with the fallback', () => {
    const Caught = catching(z.union([z.string(), z.number()]), 'x')
    expect(Caught.safeParse(true)).toStrictEqual({ success: true, data: 'x' })
    expect(Caught.safeParse(null)).toStrictEqual({ success: true, data: 'x' })
    expect(Caught.safeParse(undefined)).toStrictEqual({ success: true, data: 'x' })
    expect(Caught.safeParse(5)).toStrictEqual({ success: true, data: 5 })
  })
})

// #490: `default: null` already made the schema nullable; `x-catch: null` and
// `x-prefault: null` did not, so `.catch(null)` / `.prefault(null)` did not
// type-check and `.prefault(null)` failed at runtime.
describe('x-catch: null / x-prefault: null make the schema nullable (#490)', () => {
  it.concurrent('codegen: the issue table', () => {
    expect(
      zodToOpenAPI({ type: 'object', properties: { a: { type: 'string' } }, 'x-catch': null }),
    ).toBe(
      'z.object({a:z.string().exactOptional()}).nullable().catch(null).openapi({"type":["object","null"],"properties":{"a":{"type":"string"}},"required":[]})',
    )
    expect(
      zodToOpenAPI({ type: 'object', properties: { a: { type: 'string' } }, 'x-prefault': null }),
    ).toBe(
      'z.object({a:z.string().exactOptional()}).nullable().prefault(null).openapi({"required":[]})',
    )
    expect(zodToOpenAPI({ type: 'string', 'x-catch': null })).toBe(
      'z.string().nullable().catch(null).openapi({"type":["string","null"]})',
    )
  })

  it.concurrent('codegen: a schema that is nullable already is not made so twice', () => {
    expect(zodToOpenAPI({ type: ['string', 'null'], 'x-catch': null })).toBe(
      'z.string().nullable().catch(null).openapi({"type":["string","null"]})',
    )
    expect(zodToOpenAPI({ type: 'string', nullable: true, 'x-prefault': null })).toBe(
      'z.string().nullable().prefault(null)',
    )
    expect(zodToOpenAPI({ $ref: '#/components/schemas/A', 'x-prefault': null })).toBe(
      'ASchema.nullable().prefault(null)',
    )
  })

  it.concurrent('runtime: null is a value the schema answers with', () => {
    const Caught = z.object({ a: z.string().exactOptional() }).nullable().catch(null)
    expect(Caught.safeParse(1)).toStrictEqual({ success: true, data: null })
    const Prefaulted = z.object({ a: z.string().exactOptional() }).nullable().prefault(null)
    expect(Prefaulted.safeParse(undefined)).toStrictEqual({ success: true, data: null })
    expect(Prefaulted.safeParse({ a: 'x' })).toStrictEqual({ success: true, data: { a: 'x' } })
  })
})

// #491: `.default(1n)` was written for an int64 at the top level only; inside
// an object or an array the number stayed a number, beside a `z.int64()` field.
describe('an int64 inside an object / array default is a bigint (#491)', () => {
  const int64 = `z.preprocess(${JSON_BIGINT},z.int64())`
  const int64Meta = '.openapi({type:"integer",format:"int64"})'

  it.concurrent('codegen: the issue table', () => {
    expect(zodToOpenAPI({ type: 'integer', format: 'int64', default: 1 })).toBe(
      `${int64}.default(1n).openapi({type:"integer",format:"int64",default:1})`,
    )
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: { n: { type: 'integer', format: 'int64' } },
        default: { n: 1 },
      }),
    ).toBe(
      `z.object({n:${int64}.exactOptional()${int64Meta}}).default({"n":1n}).openapi({"required":[],"default":{"n":1}})`,
    )
    expect(
      zodToOpenAPI({
        type: 'array',
        items: { type: 'integer', format: 'int64' },
        default: [1, 2],
      }),
    ).toBe(`z.array(${int64}${int64Meta}).default([1n,2n]).openapi({"default":[1,2]})`)
  })

  it.concurrent('codegen: x-prefault and x-catch values are written the same way', () => {
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: { n: { type: 'integer', format: 'int64' } },
        'x-prefault': { n: 1 },
      }),
    ).toBe(
      `z.object({n:${int64}.exactOptional()${int64Meta}}).prefault({"n":1n}).openapi({"required":[],"default":{"n":1}})`,
    )
    expect(
      zodToOpenAPI({
        type: 'array',
        items: { type: 'integer', format: 'int64' },
        'x-catch': [1],
      }),
    ).toBe(
      `z.array(${int64}${int64Meta}).catch([1n]).openapi({"type":"array","items":{"type":"integer","format":"int64"}})`,
    )
  })

  it.concurrent('codegen: each member is the literal of its own schema', () => {
    // `format: bigint` is `BigInt(n)`; a reference, an `allOf` and
    // `additionalProperties` are read through; what is not an int64 stays as it is.
    const schemas = {
      Big: { type: 'object', properties: { n: { type: 'integer', format: 'int64' } } },
    } as const
    expect(
      zodToOpenAPI(
        {
          type: 'object',
          properties: { n: { type: 'integer', format: 'bigint' }, s: { type: 'string' } },
          default: { n: 1, s: 'x' },
        },
        undefined,
        { schemas },
      ),
    ).toBe(
      `z.object({n:z.preprocess(${JSON_BIGINT},z.bigint()).exactOptional().openapi({type:"integer",format:"bigint"}),s:z.string().exactOptional()}).default({"n":BigInt(1),"s":"x"}).openapi({"required":[],"default":{"n":1,"s":"x"}})`,
    )
    expect(
      zodToOpenAPI({ $ref: '#/components/schemas/Big', default: { n: 1 } }, undefined, {
        schemas,
      }),
    ).toBe('BigSchema.default({"n":1n}).openapi({"default":{"n":1}})')
    expect(
      zodToOpenAPI(
        { allOf: [{ $ref: '#/components/schemas/Big' }], default: { n: 2 } },
        undefined,
        { schemas },
      ),
    ).toBe('BigSchema.default({"n":2n}).openapi({"default":{"n":2}})')
    expect(
      zodToOpenAPI({
        type: 'object',
        additionalProperties: { type: 'integer', format: 'int64' },
        default: { a: 1 },
      }),
    ).toBe(
      `z.record(z.string(),${int64}${int64Meta}).default({"a":1n}).openapi({"default":{"a":1}})`,
    )
    // `type: number` with `format: int64` is `z.number()` (#412): a number.
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: { n: { type: 'number', format: 'int64' } },
        default: { n: 1 },
      }),
    ).toBe('z.object({n:z.number().exactOptional()}).default({"n":1}).openapi({"required":[]})')
  })

  it.concurrent('runtime: the substituted default has the type the schema infers', () => {
    const Schema = z.object({ n: z.int64().exactOptional() }).default({ n: 1n })
    expect(Schema.parse(undefined)).toStrictEqual({ n: 1n })
    const List = z.array(z.int64()).default([1n, 2n])
    expect(List.parse(undefined)).toStrictEqual([1n, 2n])
  })
})

// The statements that parse an `allOf` and report its issues again, each narrowed by its
// code, with the message when there is one.
const forwarding479 = (message: string) =>
  (
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
    ] as const
  )
    .map(
      (code, index) =>
        `${index === 0 ? '' : 'else '}if(issue.code==='${code}'){ctx.issues.push({...issue,input:issue.input${message}})}`,
    )
    .join('')
const gate479 = (message: string) =>
  `const result=Schema.safeParse(ctx.value);if(!result.success){for(const issue of result.error.issues){${forwarding479(message)}}}`

// #479: a check on the raw input used to be `z.unknown().check(...).pipe(Schema)`,
// which `@hono/zod-openapi` renders by its input side — `{}` — and which types
// `z.input` as `unknown`. It is a `z.preprocess` now (see `withCheck` above),
// rendered by the schema, as #472 did for `unevaluatedProperties` beside a union.
describe('a raw-input check is a preprocess, not a check-pipe (#479)', () => {
  const a = 'z.object({a:z.string().exactOptional()}).openapi({"required":[]})'
  const b = 'z.object({b:z.string().exactOptional()}).openapi({"required":[]})'
  const A = { type: 'object', properties: { a: { type: 'string' } } } as const
  const B = { type: 'object', properties: { b: { type: 'string' } } } as const
  it.concurrent('codegen: nothing emits z.unknown().check().pipe() any more', () => {
    const emitted = [
      zodToOpenAPI({ allOf: [A, B], 'x-error-message': 'bad' }),
      zodToOpenAPI({ allOf: [A, B], 'x-allOf-message': 'bad' }),
      zodToOpenAPI({ allOf: [A, B], unevaluatedProperties: false }),
      zodToOpenAPI({ type: 'object', anyOf: [A, B], required: ['a'] }),
      zodToOpenAPI({ type: 'object', oneOf: [A, B], required: ['a'] }),
      zodToOpenAPI({
        anyOf: [{ type: 'string' }, { ...A, 'x-transform': '(val) => val' }],
        properties: { link: { type: 'string' } },
      }),
      zodToOpenAPI({
        oneOf: [{ type: 'string' }, { ...A, 'x-transform': '(val) => val' }],
        properties: { link: { type: 'string' } },
      }),
    ]
    for (const code of emitted) {
      expect(code).not.toContain('z.unknown().check(')
      expect(code).toContain('z.preprocess((val: z.input<typeof Schema>,ctx)=>{')
    }
  })

  it.concurrent('codegen: the message and unevaluatedProperties of an allOf', () => {
    expect(zodToOpenAPI({ allOf: [A, B], 'x-error-message': 'bad' })).toBe(
      withStatements(`${a}.and(${b})`, gate479(',message:"bad"')),
    )
    expect(zodToOpenAPI({ allOf: [A, B], 'x-allOf-message': 'bad' })).toBe(
      withStatements(`${a}.and(${b})`, gate479(',message:"bad"')),
    )
    expect(zodToOpenAPI({ allOf: [A, B], unevaluatedProperties: false })).toBe(
      withStatements(
        `${a}.and(${b})`,
        `${gate479('')};((ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;const e=new Set();for(const k of ["a"]){e.add(k)};for(const k of ["b"]){e.add(k)};for(const k of Object.keys(o)){if(!e.has(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}})(ctx)`,
      ),
    )
  })

  it.concurrent('codegen: a required-only shape beside a union keeps the union (#467)', () => {
    const requiredA = `(ctx)=>{const val=ctx.value;if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"a")){ctx.issues.push({...{code:'custom'},input:val})}}}`
    expect(zodToOpenAPI({ type: 'object', anyOf: [A, B], required: ['a'] })).toBe(
      `${withCheck(`z.union([${a},${b}]).and(z.looseObject({}).openapi({"required":["a"]}))`, requiredA)}.openapi({"required":["a"]})`,
    )
    expect(zodToOpenAPI({ type: 'object', oneOf: [A, B], required: ['a'] })).toBe(
      `${withCheck(`z.xor([${a},${b}]).and(z.looseObject({}).openapi({"required":["a"]}))`, requiredA)}.openapi({"required":["a"]})`,
    )
  })

  it.concurrent('runtime: the preprocess rejects and accepts what the check-pipe did', () => {
    const Schema = z
      .object({ a: z.string().exactOptional() })
      .and(z.object({ b: z.string().exactOptional() }))
    // The message path: the intersection's issues, each with the message.
    const Messaged = z.preprocess((val: z.input<typeof Schema>, ctx) => {
      const result = Schema.safeParse(ctx.value)
      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.issues.push({ code: 'custom', path: issue.path, input: ctx.value, message: 'bad' })
        }
      }
      return val
    }, Schema)
    expect(Messaged.safeParse({ a: 'x', b: 'y' })).toStrictEqual({
      success: true,
      data: { a: 'x', b: 'y' },
    })
    const rejected = Messaged.safeParse({ a: 1 })
    expect(rejected.success).toBe(false)
    // Once: the pipe stops when the callback reports, so the intersection does
    // not report the same issue again.
    expect(rejected.error?.issues.map((issue) => [issue.path, issue.message])).toStrictEqual([
      [['a'], 'bad'],
    ])
  })
})

// The check of a strict member that declares `keys`.
const strictOperandCheck470 = (keys: string, message = '') =>
  `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;for(const k of Object.keys(o)){if(!${keys}.includes(k)){ctx.issues.push({code:"custom",path:[k],input:o${message}})}}}`
// The check of an operand that can only hand a strict branch's issue on.
const handOnSource470 = (parsed: string) =>
  `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;{const result=${parsed};if(!result.success&&result.error.issues.every((issue)=>issue.code==='unrecognized_keys'&&issue.path.length===0)){for(const issue of result.error.issues){if(issue.code==='unrecognized_keys'){for(const k of issue.keys){ctx.issues.push({code:"custom",path:[k],input:o,message:issue.message})}}}}}}`
// An operand the check asks, intersected with `other`: declared once as `name`.
const asked470 = (name: string, operand: string, other: string) =>
  withAsyncCheck(
    `${name}.and(${other})`,
    handOnSource470(`${name}.safeParse(o)`),
    `async${handOnSource470(`(await ${name}.safeParseAsync(o))`)}`,
    `const ${name}=${operand};`,
  )
// The check of an operand that can only hand a strict branch's issue on, by hand.
const handOn470 =
  (Operand: z.ZodType) =>
  (ctx: {
    value: unknown
    issues: { code: string; path?: string[]; input?: unknown; message?: string }[]
  }) => {
    const o = ctx.value
    if (typeof o !== 'object' || o === null || Array.isArray(o)) return
    const result = Operand.safeParse(o)
    if (
      !result.success &&
      result.error.issues.every(
        (issue) => issue.code === 'unrecognized_keys' && issue.path.length === 0,
      )
    ) {
      for (const issue of result.error.issues) {
        if (issue.code === 'unrecognized_keys') {
          for (const k of issue.keys) {
            ctx.issues.push({ code: 'custom', path: [k], input: o, message: issue.message })
          }
        }
      }
    }
  }

const rejectUndeclared470 =
  (keys: readonly string[]) =>
  (ctx: { value: unknown; issues: { code: string; path?: string[]; input?: unknown }[] }) => {
    const o = ctx.value
    if (typeof o !== 'object' || o === null || Array.isArray(o)) return
    for (const k of Object.keys(o)) {
      if (!keys.includes(k)) ctx.issues.push({ code: 'custom', path: [k], input: o })
    }
  }
// #470: Zod's intersection reports an undeclared key only when BOTH sides
// reject it, so `z.strictObject(...)` beside a plain `z.object(...)` — which
// strips the key — rejected nothing. `additionalProperties: false` applies to
// its own member alone (JSON Schema 2020-12), so the member's undeclared keys
// are checked on the raw input, around the intersection.
describe('additionalProperties: false in an intersection member (#470)', () => {
  const str = { type: 'string' } as const
  const strict = { type: 'object', properties: { id: str }, additionalProperties: false } as const
  const link = { type: 'object', properties: { link: str } } as const
  const strictZ = 'z.strictObject({id:z.string().exactOptional()}).openapi({"required":[]})'
  const linkZ = 'z.object({link:z.string().exactOptional()}).openapi({"required":[]})'
  const schemas = {
    Strict: strict,
    Link: link,
    Cat: {
      type: 'object',
      properties: { kind: { const: 'cat' } },
      required: ['kind'],
      additionalProperties: false,
    },
    Dog: {
      type: 'object',
      properties: { kind: { const: 'dog' } },
      required: ['kind'],
      additionalProperties: false,
    },
    Pet: {
      oneOf: [{ $ref: '#/components/schemas/Cat' }, { $ref: '#/components/schemas/Dog' }],
      discriminator: { propertyName: 'kind' },
    },
  } as const

  it.concurrent('codegen: the issue table', () => {
    const expected = withCheck(`${strictZ}.and(${linkZ})`, strictOperandCheck470('["id"]'))
    expect(zodToOpenAPI({ allOf: [strict, link] })).toBe(expected)
    // The shape beside the `allOf` is the other member.
    expect(zodToOpenAPI({ type: 'object', properties: { link: str }, allOf: [strict] })).toBe(
      expected,
    )
  })

  it.concurrent('codegen: a member that names a strict component', () => {
    expect(
      zodToOpenAPI(
        { allOf: [{ $ref: '#/components/schemas/Strict' }, { $ref: '#/components/schemas/Link' }] },
        undefined,
        { schemas },
      ),
    ).toBe(withCheck('StrictSchema.and(LinkSchema)', strictOperandCheck470('["id"]')))
  })

  it.concurrent('codegen: the keys a member declares, and its message', () => {
    // No property at all: every key is undeclared.
    expect(zodToOpenAPI({ allOf: [{ type: 'object', additionalProperties: false }, link] })).toBe(
      withCheck(
        `z.strictObject({}).and(${linkZ})`,
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;for(const k of Object.keys(o)){ctx.issues.push({code:"custom",path:[k],input:o})}}`,
      ),
    )
    // `x-additionalProperties-message` is the message of the member's keys.
    expect(
      zodToOpenAPI({
        allOf: [{ ...strict, 'x-additionalProperties-message': 'no extras' }, link],
      }),
    ).toBe(
      withCheck(
        `z.strictObject({id:z.string().exactOptional()},{error:(issue)=>issue.code==='unrecognized_keys'?"no extras":undefined}).openapi({"required":[]}).and(${linkZ})`,
        strictOperandCheck470('["id"]', ',message:"no extras"'),
      ),
    )
    // A key a pattern matches is declared (#447).
    expect(
      zodToOpenAPI({ allOf: [{ ...strict, patternProperties: { '^x-': str } }, link] }),
    ).toContain(
      `if(!["id"].includes(k)&&!["^x-"].some((p)=>new RegExp(p).test(k))){ctx.issues.push({code:"custom",path:[k],input:o})}`,
    )
  })

  it.concurrent('codegen: a branch the sibling shape is distributed into', () => {
    expect(zodToOpenAPI({ anyOf: [strict, str], properties: { link: str } })).toBe(
      `z.union([${withCheck(`${strictZ}.and(${linkZ})`, strictOperandCheck470('["id"]'))},z.string()])`,
    )
    expect(
      zodToOpenAPI({ anyOf: [{ ...strict, nullable: true }, str], properties: { link: str } }),
    ).toBe(
      `z.union([${withCheck(`${strictZ}.and(${linkZ})`, strictOperandCheck470('["id"]'))}.nullable(),z.string()])`,
    )
  })

  it.concurrent('codegen: a union or a discriminated union with a strict branch', () => {
    // A `z.union` hands on the `unrecognized_keys` of the one branch that
    // failed on nothing else, and a `z.discriminatedUnion` those of the branch
    // it routes to: the intersection would reconcile either away.
    const unionZ = `z.union([${strictZ},z.string()])`
    expect(zodToOpenAPI({ allOf: [{ anyOf: [strict, str] }, link] })).toBe(
      asked470('Member0', unionZ, linkZ),
    )
    expect(
      zodToOpenAPI({ allOf: [{ $ref: '#/components/schemas/Pet' }, link] }, undefined, {
        schemas,
      }),
    ).toBe(
      withCheck(
        `PetSchema.and(${linkZ})`,
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;{const own:{readonly [k:string]:readonly string[]}={"cat":["kind"],"dog":["kind"]};const d=String(Reflect.get(o,"kind"));const keys=Object.hasOwn(own,d)?own[d]:undefined;if(keys!==undefined){for(const k of Object.keys(o)){if(!keys.includes(k)){ctx.issues.push({code:"custom",path:[k],input:o})}}}}}`,
      ),
    )
    const a = 'z.object({a:z.string().exactOptional()}).openapi({"required":[]})'
    const memberUnion = `z.union([${strictZ},${a}])`
    expect(
      zodToOpenAPI({
        type: 'object',
        anyOf: [strict, { type: 'object', properties: { a: str } }],
        properties: { link: str },
      }),
    ).toBe(asked470('Operand', memberUnion, linkZ))
  })

  it.concurrent('codegen: an intersection without a strict member is as it was', () => {
    const plain = { type: 'object', properties: { id: str } } as const
    expect(zodToOpenAPI({ allOf: [plain, link] })).toBe(
      `z.object({id:z.string().exactOptional()}).openapi({"required":[]}).and(${linkZ})`,
    )
    // One member and nothing beside it is no intersection: the strict object
    // rejects its undeclared keys on its own.
    expect(zodToOpenAPI({ allOf: [strict] })).toBe(strictZ)
    // `z.xor` reports a branch that failed as `invalid_union`: nothing to hand on.
    expect(zodToOpenAPI({ allOf: [{ oneOf: [strict, str] }, link] })).toBe(
      `z.xor([${strictZ},z.string()]).and(${linkZ})`,
    )
    // `additionalProperties: true` and a schema evaluate every key.
    expect(zodToOpenAPI({ allOf: [{ ...plain, additionalProperties: true }, link] })).toBe(
      `z.looseObject({id:z.string().exactOptional()}).openapi({"required":[]}).and(${linkZ})`,
    )
  })

  it.concurrent('codegen: the allOf message is piped inside the check', () => {
    const code = zodToOpenAPI({ allOf: [strict, link], 'x-allOf-message': 'bad' })
    // The strict check is the outermost preprocess: it runs first, and the pipe
    // stops when it reports, so a key the member rejects is reported once.
    expect(code.startsWith('(()=>{const Schema=(()=>{const Schema=')).toBe(true)
    expect(
      code.endsWith(`{(${strictOperandCheck470('["id"]')})(ctx);return val},Schema)})()`),
    ).toBe(true)
  })

  it.concurrent('runtime: the issue table', () => {
    const Intersection = z
      .strictObject({ id: z.string().exactOptional() })
      .and(z.object({ link: z.string().exactOptional() }))
    // What was emitted: the strict member rejects nothing.
    expect(Intersection.safeParse({ id: 'a', link: 'x' }).success).toBe(true)
    expect(Intersection.safeParse({ id: 'a', extra: 1 }).success).toBe(true)
    // What is emitted now.
    const Schema = checked(Intersection, rejectUndeclared470(['id']))
    const withLink = Schema.safeParse({ id: 'a', link: 'x' })
    expect(withLink.success).toBe(false)
    expect(withLink.error?.issues.map((issue) => [issue.code, issue.path])).toStrictEqual([
      ['custom', ['link']],
    ])
    expect(Schema.safeParse({ id: 'a', extra: 1 }).success).toBe(false)
    expect(Schema.safeParse({ id: 'a' })).toStrictEqual({ success: true, data: { id: 'a' } })
    expect(Schema.safeParse({})).toStrictEqual({ success: true, data: {} })
    // A value that is not an object is the intersection's to reject.
    expect(Schema.safeParse('x').error?.issues[0]?.code).toBe('invalid_type')
  })

  it.concurrent('runtime: a branch the shape is distributed into', () => {
    const Schema = z.union([
      checked(
        z
          .strictObject({ id: z.string().exactOptional() })
          .and(z.object({ link: z.string().exactOptional() })),
        rejectUndeclared470(['id']),
      ),
      z.string(),
    ])
    expect(Schema.safeParse({ id: 'a', link: 'x' }).success).toBe(false)
    expect(Schema.safeParse({ id: 'a' })).toStrictEqual({ success: true, data: { id: 'a' } })
    expect(Schema.safeParse('s')).toStrictEqual({ success: true, data: 's' })
  })

  it.concurrent('runtime: a union and a discriminated union hand the issue on', () => {
    const linkShape = z.object({ link: z.string().exactOptional() })
    const Union = z.union([z.strictObject({ id: z.string().exactOptional() }), z.string()])
    // What was emitted: the union's one failing branch is reconciled away.
    expect(Union.and(linkShape).safeParse({ id: 'a', link: 'x' }).success).toBe(true)
    const CheckedUnion = checked(Union.and(linkShape), handOn470(Union))
    expect(CheckedUnion.safeParse({ id: 'a', link: 'x' }).success).toBe(false)
    expect(CheckedUnion.safeParse({ id: 'a' })).toStrictEqual({ success: true, data: { id: 'a' } })
    const Pet = z.discriminatedUnion('kind', [
      z.strictObject({ kind: z.literal('cat') }),
      z.strictObject({ kind: z.literal('dog') }),
    ])
    expect(Pet.and(linkShape).safeParse({ kind: 'cat', link: 'x' }).success).toBe(true)
    const CheckedPet = checked(Pet.and(linkShape), handOn470(Pet))
    const rejected = CheckedPet.safeParse({ kind: 'cat', link: 'x' })
    expect(rejected.success).toBe(false)
    expect(rejected.error?.issues.map((issue) => [issue.code, issue.path])).toStrictEqual([
      ['custom', ['link']],
    ])
    expect(CheckedPet.safeParse({ kind: 'cat' })).toStrictEqual({
      success: true,
      data: { kind: 'cat' },
    })
    // A failure that is not about keys alone is left to the intersection, with its own issues.
    expect(CheckedPet.safeParse({ kind: 'bird' }).error?.issues[0]?.code).toBe('invalid_union')
  })
})

const minLengthRefine469 = (n: number) =>
  `z.unknown().superRefine((val,ctx)=>{if(typeof val==='string'){if([...val].length<${n}){ctx.addIssue({code:'custom'})}}})`
const maxLengthRefine469 = (n: number) =>
  `z.unknown().superRefine((val,ctx)=>{if(typeof val==='string'){if([...val].length>${n}){ctx.addIssue({code:'custom'})}}})`
const tooLong469 = (n: number) =>
  z.unknown().superRefine((val, ctx) => {
    if (typeof val === 'string' && val.length > n) ctx.addIssue({ code: 'custom' })
  })
const tooShort469 = (n: number) =>
  z.unknown().superRefine((val, ctx) => {
    if (typeof val === 'string' && val.length < n) ctx.addIssue({ code: 'custom' })
  })
// The statements of the check `makeSiblingCombinatorCheck` emits, one per combinator.
type Parse469 = (zod: string) => string
const anyOf469 =
  (branches: readonly string[], message = '') =>
  (parse: Parse469) =>
    `if(!(${branches.map((branch) => `${parse(branch)}.success`).join('||')})){ctx.issues.push({code:"custom",input:val${message}})}`
const oneOf469 =
  (branches: readonly string[], message = '') =>
  (parse: Parse469) =>
    `if((${branches.map((branch) => `(${parse(branch)}.success?1:0)`).join('+')})!==1){ctx.issues.push({code:"custom",input:val${message}})}`
const not469 =
  (excluded: string, message = '') =>
  (parse: Parse469) =>
    `if(${parse(excluded)}.success){ctx.issues.push({code:"custom",input:val${message}})}`
const siblings469 = (schema: string, statements: readonly ((parse: Parse469) => string)[]) =>
  withAsyncCheck(
    schema,
    `(ctx)=>{const val=ctx.value;${statements.map((statement) => statement((zod) => `${zod}.safeParse(val)`)).join(';')}}`,
    `async(ctx)=>{const val=ctx.value;${statements.map((statement) => statement((zod) => `(await ${zod}.safeParseAsync(val))`)).join(';')}}`,
  )
// The same by hand: the value is asked as it arrives, before the schema reads it.
const asked469 = <T extends z.ZodType>(Schema: T, accepts: (val: unknown) => boolean) =>
  checked(Schema, (ctx) => {
    if (!accepts(ctx.value)) ctx.issues.push({ code: 'custom', input: ctx.value })
  })

// Exactly one of "at least 3 characters" and "at most 1": the `oneOf` of the issue table.
const oneOf469Matches = (val: unknown) =>
  (tooShort469(3).safeParse(val).success ? 1 : 0) +
    (tooLong469(1).safeParse(val).success ? 1 : 0) ===
  1
const notX469 = (val: unknown) => !z.literal('x').safeParse(val).success
const hasKey469 = (key: string) => (val: unknown) =>
  typeof val === 'object' && val !== null && Object.hasOwn(val, key)

// #469: JSON Schema ANDs sibling keywords, so `allOf` / `anyOf` / `oneOf` /
// `not` at the same level all have to hold. Only the first one the emitter
// checked was emitted, and the others were dropped without a word. The paths
// still emit one combinator each; the others are checked on the raw input,
// around it, and the `anyOf` / `oneOf` among them are stated in the document.
// They are not intersected with it: `A.and(z.union([...]))` cannot merge a
// value one side has transformed (a bigint, a trimmed string) with the raw one
// the other hands back, and brings back the keys an object has stripped.
describe('several combinators at the same level (#469)', () => {
  const str = { type: 'string' } as const
  const A = { type: 'object', properties: { a: str } } as const
  const B = { type: 'object', properties: { b: str } } as const
  const a = 'z.object({a:z.string().exactOptional()}).openapi({"required":[]})'
  const b = 'z.object({b:z.string().exactOptional()}).openapi({"required":[]})'

  it.concurrent('codegen: the issue table', () => {
    expect(
      zodToOpenAPI({ allOf: [{ type: 'string', minLength: 1 }], anyOf: [{ maxLength: 3 }] }),
    ).toBe(
      `${siblings469('z.string().min(1)', [anyOf469([maxLengthRefine469(3)])])}.openapi({anyOf:[{"maxLength":3}]})`,
    )
    expect(zodToOpenAPI({ allOf: [str], oneOf: [{ minLength: 3 }, { maxLength: 1 }] })).toBe(
      `${siblings469('z.string()', [oneOf469([minLengthRefine469(3), maxLengthRefine469(1)])])}.openapi({oneOf:[{"minLength":3},{"maxLength":1}]})`,
    )
    expect(zodToOpenAPI({ anyOf: [str], oneOf: [{ minLength: 3 }, { maxLength: 1 }] })).toBe(
      `${siblings469('z.union([z.string()])', [oneOf469([minLengthRefine469(3), maxLengthRefine469(1)])])}.openapi({oneOf:[{"minLength":3},{"maxLength":1}]})`,
    )
    expect(zodToOpenAPI({ allOf: [str], not: { const: 'x' } })).toBe(
      `${siblings469('z.string()', [not469('z.literal("x")')])}.openapi({"not":{"const":"x"}})`,
    )
    expect(zodToOpenAPI({ anyOf: [str], not: { const: 'x' } })).toBe(
      `${siblings469('z.union([z.string()])', [not469('z.literal("x")')])}.openapi({"not":{"const":"x"}})`,
    )
  })

  it.concurrent('codegen: all of them at once are one check', () => {
    expect(
      zodToOpenAPI({
        allOf: [str],
        anyOf: [{ minLength: 1 }],
        oneOf: [{ maxLength: 3 }, { minLength: 5 }],
        not: { const: 'x' },
      }),
    ).toBe(
      `${siblings469('z.string()', [
        anyOf469([minLengthRefine469(1)]),
        oneOf469([maxLengthRefine469(3), minLengthRefine469(5)]),
        not469('z.literal("x")'),
      ])}.openapi({anyOf:[{"minLength":1}],oneOf:[{"maxLength":3},{"minLength":5}]}).openapi({"not":{"const":"x"}})`,
    )
  })

  it.concurrent('codegen: each combinator has the message that is its own', () => {
    expect(
      zodToOpenAPI({
        anyOf: [str],
        oneOf: [{ minLength: 3 }, { maxLength: 1 }],
        not: { const: 'x' },
        'x-anyOf-message': 'any',
        'x-oneOf-message': 'one',
        'x-not-message': '(iss) => `no ${String(iss.input)}`',
      }),
    ).toBe(
      `${siblings469('z.union([z.string()],{error:"any"})', [
        oneOf469([minLengthRefine469(3), maxLengthRefine469(1)], ',message:"one"'),
        not469(
          'z.literal("x")',
          ",message:((iss) => `no ${String(iss.input)}`)({code:'custom',path:[],input:val})",
        ),
      ])}.openapi({oneOf:[{"minLength":3},{"maxLength":1}]}).openapi({"not":{"const":"x"}})`,
    )
    // `x-error-message` is the message of a combinator that has none of its own.
    expect(zodToOpenAPI({ anyOf: [str], not: { const: 'x' }, 'x-error-message': 'bad' })).toBe(
      `${siblings469('z.union([z.string()],{error:"bad"})', [
        not469('z.literal("x")', ',message:"bad"'),
      ])}.openapi({"not":{"const":"x"}})`,
    )
  })

  it.concurrent('codegen: what is beside the combinators still applies', () => {
    // `required` beside the emitted `anyOf` is enforced as it is without a `not`.
    const requiredA = `(ctx)=>{const val=ctx.value;if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"a")){ctx.issues.push({...{code:'custom'},input:val})}}}`
    const notZ = `z.unknown().superRefine((val,ctx)=>{if(typeof val==='object'&&val!==null&&!Array.isArray(val)){if(!Object.hasOwn(val,"z")){ctx.addIssue({code:'custom'})}}}).openapi({"required":["z"]})`
    expect(zodToOpenAPI({ anyOf: [A, B], required: ['a'], not: { required: ['z'] } })).toBe(
      `${siblings469(
        withCheck(
          `z.union([${a},${b}]).and(z.looseObject({}).openapi({"required":["a"]}))`,
          requiredA,
        ),
        [not469(notZ)],
      )}.openapi({"required":["a"],"not":{"required":["z"]}})`,
    )
    // A discriminated `oneOf` stays one beside a `not`.
    const cat = {
      type: 'object',
      properties: { kind: { const: 'cat' } },
      required: ['kind'],
    } as const
    const dog = {
      type: 'object',
      properties: { kind: { const: 'dog' } },
      required: ['kind'],
    } as const
    expect(
      zodToOpenAPI({
        oneOf: [cat, dog],
        discriminator: { propertyName: 'kind' },
        not: { required: ['z'] },
      }),
    ).toContain(`const Schema=z.discriminatedUnion('kind',[`)
    // `nullable` is the outer handling's, after the check.
    expect(zodToOpenAPI({ anyOf: [str], not: { const: 'x' }, nullable: true })).toBe(
      `${siblings469('z.union([z.string()])', [not469('z.literal("x")')])}.nullable().openapi({"not":{"const":"x"}})`,
    )
    // A reference in the check is the component; in the document it is written out.
    expect(
      zodToOpenAPI({ allOf: [A], anyOf: [{ $ref: '#/components/schemas/B' }] }, undefined, {
        schemas: { B },
      }),
    ).toBe(
      `${siblings469(a, [anyOf469(['BSchema'])])}.openapi({anyOf:[{"type":"object","properties":{"b":{"type":"string"}}}]})`,
    )
  })

  it.concurrent('codegen: a schema with one combinator is as it was', () => {
    expect(zodToOpenAPI({ allOf: [str, { type: 'string', minLength: 1 }] })).toBe(
      'z.string().and(z.string().min(1))',
    )
    expect(zodToOpenAPI({ anyOf: [str] })).toBe('z.union([z.string()])')
    // An empty combinator beside another accepts everything: nothing to check.
    expect(zodToOpenAPI({ allOf: [str], anyOf: [] })).toBe('z.string()')
    expect(zodToOpenAPI({ anyOf: [str], oneOf: [] })).toBe('z.union([z.string()])')
    // A `not` beside a type alone is the `not` path's.
    expect(zodToOpenAPI({ type: 'string', not: { const: 'x' } })).toBe(
      'z.string().refine((val) => val !== "x").openapi({"not":{"const":"x"}})',
    )
    // Nothing is read beside a `$ref`.
    expect(zodToOpenAPI({ $ref: '#/components/schemas/A', not: { const: 'x' } })).toBe('ASchema')
  })

  it.concurrent('codegen: an empty allOf leaves the others to decide', () => {
    expect(zodToOpenAPI({ allOf: [], not: { const: 'x' } })).toBe(
      `${siblings469('z.any()', [not469('z.literal("x")')])}.openapi({"not":{"const":"x"}})`,
    )
  })

  it.concurrent('runtime: the issue table', () => {
    const allOfAnyOf = asked469(z.string().min(1), (val) => tooLong469(3).safeParse(val).success)
    expect(allOfAnyOf.safeParse('abcdef').success).toBe(false)
    expect(allOfAnyOf.safeParse('ab')).toStrictEqual({ success: true, data: 'ab' })
    expect(allOfAnyOf.safeParse('').success).toBe(false)

    const allOfOneOf = asked469(z.string(), oneOf469Matches)
    expect(allOfOneOf.safeParse('ab').success).toBe(false)
    expect(allOfOneOf.safeParse('abc')).toStrictEqual({ success: true, data: 'abc' })
    expect(allOfOneOf.safeParse('a')).toStrictEqual({ success: true, data: 'a' })
    expect(allOfOneOf.safeParse(5).success).toBe(false)

    const anyOfOneOf = asked469(z.union([z.string()]), oneOf469Matches)
    expect(anyOfOneOf.safeParse('ab').success).toBe(false)
    expect(anyOfOneOf.safeParse('abc')).toStrictEqual({ success: true, data: 'abc' })

    const allOfNot = asked469(z.string(), notX469)
    expect(allOfNot.safeParse('x').success).toBe(false)
    expect(allOfNot.safeParse('y')).toStrictEqual({ success: true, data: 'y' })
    expect(allOfNot.safeParse(5).success).toBe(false)

    const anyOfNot = asked469(z.union([z.string()]), notX469)
    expect(anyOfNot.safeParse('x').success).toBe(false)
    expect(anyOfNot.safeParse('y')).toStrictEqual({ success: true, data: 'y' })
  })

  it.concurrent('runtime: the emitted schema keeps what it hands out', () => {
    // A sibling `anyOf` of typeless branches beside an object that hands out a
    // bigint and strips undeclared keys. As an intersection member it threw
    // `Unmergable intersection` on `{id: 1}` and brought `extra` back.
    const Base = z.object({
      id: z
        .preprocess((val) => (typeof val === 'number' ? BigInt(val) : val), z.int64())
        .optional(),
      name: z.string().optional(),
    })
    const Schema = asked469(Base, (val) => hasKey469('id')(val) || hasKey469('name')(val))
    expect(Schema.safeParse({ id: 1 })).toStrictEqual({ success: true, data: { id: 1n } })
    expect(Schema.safeParse({ name: 'a', extra: 1 })).toStrictEqual({
      success: true,
      data: { name: 'a' },
    })
    expect(Schema.safeParse({}).success).toBe(false)
    // A `not` about a key the object strips still sees the key.
    const NotZ = asked469(z.object({ a: z.string().optional() }), (val) => !hasKey469('z')(val))
    expect(NotZ.safeParse({ a: 'x', z: 1 }).success).toBe(false)
    expect(NotZ.safeParse({ a: 'x' })).toStrictEqual({ success: true, data: { a: 'x' } })
    // A `not` beside an int64 is asked about the number that arrived.
    const NotFive = asked469(
      z.preprocess((val) => (typeof val === 'number' ? BigInt(val) : val), z.int64()),
      (val) => !z.literal(5).safeParse(val).success,
    )
    expect(NotFive.safeParse(5).success).toBe(false)
    expect(NotFive.safeParse(6)).toStrictEqual({ success: true, data: 6n })
  })
})

// `additionalProperties: false` beside a combinator applies to the keys the
// schema itself declares (JSON Schema 2020-12 §10.3.2.3): it does not see what
// the `allOf` members or the union branches declare. No combinator path emits
// it — the sibling shape is a plain `z.object` — so it was dropped; it is
// checked on the raw input now, and stated in the document.
describe('additionalProperties: false beside a combinator', () => {
  const str = { type: 'string' } as const
  const A = { type: 'object', properties: { a: str } } as const
  const a = 'z.object({a:z.string().exactOptional()}).openapi({"required":[]})'
  const linkZ = 'z.object({link:z.string().exactOptional()}).openapi({"required":[]})'

  it.concurrent('codegen: the keys the parent declares, around the combinator', () => {
    expect(
      zodToOpenAPI({
        type: 'object',
        properties: { link: str },
        additionalProperties: false,
        allOf: [A],
      }),
    ).toBe(
      `${withCheck(`${a}.and(${linkZ})`, strictOperandCheck470('["link"]'))}.openapi({additionalProperties:false})`,
    )
    // No property of its own: every key is undeclared.
    expect(zodToOpenAPI({ additionalProperties: false, anyOf: [A, str] })).toBe(
      `${withCheck(
        `z.union([${a},z.string()])`,
        `(ctx)=>{const o=ctx.value;if(typeof o!=='object'||o===null||Array.isArray(o))return;for(const k of Object.keys(o)){ctx.issues.push({code:"custom",path:[k],input:o})}}`,
      )}.openapi({additionalProperties:false})`,
    )
  })

  it.concurrent('codegen: nothing changes without the keyword, or beside a $ref', () => {
    expect(zodToOpenAPI({ type: 'object', properties: { link: str }, allOf: [A] })).toBe(
      `${a}.and(${linkZ})`,
    )
    expect(zodToOpenAPI({ additionalProperties: true, anyOf: [A, str] })).toBe(
      `z.union([${a},z.string()])`,
    )
    expect(zodToOpenAPI({ $ref: '#/components/schemas/A', additionalProperties: false })).toBe(
      'ASchema',
    )
    // An object that is no combinator is strict by itself.
    expect(
      zodToOpenAPI({ type: 'object', properties: { link: str }, additionalProperties: false }),
    ).toBe('z.strictObject({link:z.string().exactOptional()}).openapi({"required":[]})')
  })

  it.concurrent('runtime: a key only a member declares fails the parent', () => {
    const Schema = checked(
      z
        .object({ a: z.string().exactOptional() })
        .and(z.object({ link: z.string().exactOptional() })),
      rejectUndeclared470(['link']),
    )
    expect(Schema.safeParse({ link: 'y' })).toStrictEqual({ success: true, data: { link: 'y' } })
    const rejected = Schema.safeParse({ a: 'x', link: 'y' })
    expect(rejected.success).toBe(false)
    expect(rejected.error?.issues.map((issue) => [issue.code, issue.path])).toStrictEqual([
      ['custom', ['a']],
    ])
    expect(Schema.safeParse({ link: 'y', extra: 1 }).success).toBe(false)
  })
})

// `not` is checked in a refinement, or on the raw input beside a combinator,
// and the document derives nothing from either: it is stated in `.openapi()`.
describe('not is stated in the document', () => {
  it.concurrent('codegen: as the source has it, every reference written out', () => {
    expect(zodToOpenAPI({ type: 'string', not: { const: 'x' } })).toBe(
      'z.string().refine((val) => val !== "x").openapi({"not":{"const":"x"}})',
    )
    expect(
      zodToOpenAPI({ type: 'string', not: { $ref: '#/components/schemas/A' } }, undefined, {
        schemas: { A: { type: 'string', minLength: 3, 'x-error-message': 'bad' } },
      }),
    ).toBe(
      'z.string().refine((val) => !ASchema.safeParse(val).success).openapi({"not":{"type":"string","minLength":3}})',
    )
  })

  it.concurrent('codegen: not beside a $ref is not emitted, so it is not stated', () => {
    expect(zodToOpenAPI({ $ref: '#/components/schemas/A', not: { const: 'x' } })).toBe('ASchema')
  })
})

// Reports one `custom` issue unless the check passed.
const reportUnless = (
  issues: { code: string; input?: unknown }[],
  input: unknown,
  isAccepted: boolean,
) => {
  if (!isAccepted) issues.push({ code: 'custom', input })
}

// A check that parses a schema of the document (`safeParse`) throws when that
// schema has an asynchronous refinement. The check is then run again with
// `safeParseAsync`, and the callback answers with a promise.
describe('a raw-input check that parses a schema has an asynchronous form', () => {
  it.concurrent('runtime: sync when it can, async when a branch is', async () => {
    const Branch = z.string().refine((val) => Promise.resolve(val !== 'bad'))
    const Schema = z.string()
    const Checked = z.preprocess((val: z.input<typeof Schema>, ctx) => {
      const reported = ctx.issues.length
      try {
        reportUnless(ctx.issues, ctx.value, Branch.safeParse(ctx.value).success)
      } catch (error) {
        if (!(error instanceof z.core.$ZodAsyncError)) throw error
        // What the synchronous run had reported is taken back before it runs again.
        ctx.issues.splice(reported)
        return Branch.safeParseAsync(ctx.value).then((result) => {
          reportUnless(ctx.issues, ctx.value, result.success)
          return val
        })
      }
      return val
    }, Schema)
    await expect(Checked.safeParseAsync('ok')).resolves.toStrictEqual({
      success: true,
      data: 'ok',
    })
    const rejected = await Checked.safeParseAsync('bad')
    expect(rejected.success).toBe(false)
    expect(rejected.error?.issues.map((issue) => issue.code)).toStrictEqual(['custom'])
    // A branch that is synchronous never leaves the synchronous path.
    const Sync = checked(Schema, (ctx) => {
      if (!z.string().min(2).safeParse(ctx.value).success) {
        ctx.issues.push({ code: 'custom', input: ctx.value })
      }
    })
    expect(Sync.safeParse('ok')).toStrictEqual({ success: true, data: 'ok' })
    expect(Sync.safeParse('x').success).toBe(false)
  })
})

// #510: every reference in a stated sibling list is written out as the component it
// names, a copy for each reference at each level. A list that only repeats a reference
// of the emitted `allOf` (NestJS Swagger's `oneOf: [{ $ref: X }]` beside
// `allOf: [{ $ref: X }]`) says nothing the emitted schema does not, and is not stated.
describe('a sibling list that repeats a reference of the emitted allOf (#510)', () => {
  const str = { type: 'string' } as const
  const schemas = {
    L0: {
      type: 'object',
      properties: {
        a: { $ref: '#/components/schemas/L1' },
        b: { $ref: '#/components/schemas/L1' },
      },
    },
    L1: { type: 'object', properties: { a: str, b: str } },
    Other: { type: 'object', properties: { c: str } },
  } as const
  const L0 = { $ref: '#/components/schemas/L0' } as const
  const Other = { $ref: '#/components/schemas/Other' } as const

  it.concurrent('does not state a oneOf of that one reference', () => {
    const code = zodToOpenAPI({ allOf: [L0], oneOf: [{ ...L0, title: 'Plan' }] }, undefined, {
      schemas,
    })
    expect(code).not.toContain('.openapi({oneOf')
    expect(code).not.toContain('"properties"')
  })

  it.concurrent('does not state an anyOf that has the reference', () => {
    const code = zodToOpenAPI({ allOf: [L0], anyOf: [L0, Other] }, undefined, { schemas })
    expect(code).not.toContain('.openapi({anyOf')
  })

  it.concurrent('states a oneOf with another branch, or of another component', () => {
    expect(
      zodToOpenAPI(
        {
          allOf: [L0],
          oneOf: [L0, Other],
        },
        undefined,
        { schemas },
      ),
    ).toContain('.openapi({oneOf:[{"type":"object"')
    expect(
      zodToOpenAPI({ allOf: [L0], oneOf: [Other] }, undefined, { schemas }).endsWith(
        '.openapi({oneOf:[{"type":"object","properties":{"c":{"type":"string"}}}]})',
      ),
    ).toBe(true)
  })
})
