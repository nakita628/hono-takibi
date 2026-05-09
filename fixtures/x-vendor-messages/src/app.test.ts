import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import app from './app.ts'

const validForm = {
  username: 'taro',
  code: 'ABC123',
  slug: 'hello-world',
  age: 25,
  score: 1.5,
  count: 10,
  active: true,
  tags: ['dev'],
  pin: [1, 2, 3, 4],
  role: 'admin',
  priority: 1,
  quota: 5,
}

const post = (path: string) => (body: Record<string, unknown>) =>
  app.request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

const postForm = post('/form')
const postComposition = post('/composition')
const postDictionary = post('/dictionary')
const postMerged = post('/merged')
const postMergedArrow = post('/merged-arrow')

const errorsOf = async (res: Response) =>
  ((await res.json()) as { errors: { pointer: string; detail: string }[] }).errors

describe('x-* vendor extension messages — exhaustive variants', () => {
  it('accepts a fully valid form', async () => {
    const res = await postForm(validForm)
    expect(res.status).toBe(200)
  })

  // ─────────────────────────────────────────────────────────
  // x-error-message — schema constructors
  // ─────────────────────────────────────────────────────────
  describe('x-error-message (schema constructor)', () => {
    it('string: rejects non-string username', async () => {
      const res = await postForm({ ...validForm, username: 42 })
      expect(res.status).toBe(422)
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/username', detail: 'username must be a string' },
      ])
    })

    it('integer: rejects non-integer age', async () => {
      const res = await postForm({ ...validForm, age: 'thirty' })
      expect(res.status).toBe(422)
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/age', detail: 'age must be an integer' },
      ])
    })

    it('number: rejects non-number score', async () => {
      const res = await postForm({ ...validForm, score: 'one' })
      expect(res.status).toBe(422)
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/score', detail: 'score must be a number' },
      ])
    })

    it('boolean: rejects non-boolean active', async () => {
      const res = await postForm({ ...validForm, active: 'yes' })
      expect(res.status).toBe(422)
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/active', detail: 'active must be a boolean' },
      ])
    })

    it('array: rejects non-array tags', async () => {
      const res = await postForm({ ...validForm, tags: 'dev' })
      expect(res.status).toBe(422)
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/tags', detail: 'tags must be an array' },
      ])
    })

    it('string enum: rejects value outside enum (union top-level)', async () => {
      const res = await postForm({ ...validForm, role: 'guest' })
      expect(res.status).toBe(422)
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/role', detail: 'role must be one of admin, editor, viewer' },
      ])
    })

    it('integer enum: rejects value outside enum (union top-level)', async () => {
      const res = await postForm({ ...validForm, priority: 99 })
      expect(res.status).toBe(422)
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/priority', detail: 'priority must be 1, 2, or 3' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-minimum-message — .min() / .gte()
  // ─────────────────────────────────────────────────────────
  describe('x-minimum-message', () => {
    it('string .min(): rejects short username', async () => {
      const res = await postForm({ ...validForm, username: 'ab' })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/username', detail: 'username must be at least 3 characters' },
      ])
    })

    it('array .min(): rejects empty tags array', async () => {
      const res = await postForm({ ...validForm, tags: [] })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/tags', detail: 'tags must contain at least 1 item' },
      ])
    })

    it('integer .gte(): rejects negative age', async () => {
      const res = await postForm({ ...validForm, age: -1 })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/age', detail: 'age must be >= 0' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-maximum-message — .max() / .lte()
  // ─────────────────────────────────────────────────────────
  describe('x-maximum-message', () => {
    it('string .max(): rejects too-long username', async () => {
      const res = await postForm({ ...validForm, username: 'a'.repeat(17) })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/username', detail: 'username must be at most 16 characters' },
      ])
    })

    it('array .max(): rejects too many tags', async () => {
      const res = await postForm({ ...validForm, tags: ['a', 'b', 'c', 'd', 'e', 'f'] })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/tags', detail: 'tags must contain at most 5 items' },
      ])
    })

    it('integer .lte(): rejects age above maximum', async () => {
      const res = await postForm({ ...validForm, age: 200 })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/age', detail: 'age must be <= 120' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-size-message — .length()
  // ─────────────────────────────────────────────────────────
  describe('x-size-message', () => {
    it('string .length(): rejects wrong-length code', async () => {
      const res = await postForm({ ...validForm, code: 'ABC' })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/code', detail: 'code must be exactly 6 characters' },
      ])
    })

    it('array .length(): rejects wrong-length pin', async () => {
      const res = await postForm({ ...validForm, pin: [1, 2, 3] })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/pin', detail: 'pin must contain exactly 4 digits' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-pattern-message — .regex()
  // ─────────────────────────────────────────────────────────
  describe('x-pattern-message', () => {
    it('rejects slug with uppercase characters', async () => {
      const res = await postForm({ ...validForm, slug: 'NotASlug' })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/slug', detail: 'slug must be lowercase alphanumeric with hyphens' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-multipleOf-message — .multipleOf()
  // ─────────────────────────────────────────────────────────
  describe('x-multipleOf-message', () => {
    it('number .multipleOf(): rejects score that is not a multiple of 0.5', async () => {
      const res = await postForm({ ...validForm, score: 0.3 })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/score', detail: 'score must be a multiple of 0.5' },
      ])
    })

    it('integer .multipleOf(): rejects count that is not a multiple of 5', async () => {
      const res = await postForm({ ...validForm, count: 7 })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/count', detail: 'count must be a multiple of 5' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-enum-error-messages — per-value
  // ─────────────────────────────────────────────────────────
  describe('x-enum-error-messages', () => {
    const generatedSrc = readFileSync(
      fileURLToPath(new URL('./generated.ts', import.meta.url)),
      'utf8',
    )

    it('emits per-value literal messages for string enum', () => {
      expect(generatedSrc).toContain("z.literal('admin', { error: 'role cannot be admin' })")
      expect(generatedSrc).toContain("z.literal('editor', { error: 'role cannot be editor' })")
      expect(generatedSrc).toContain("z.literal('viewer', { error: 'role cannot be viewer' })")
    })

    it('emits per-value literal messages for integer enum', () => {
      expect(generatedSrc).toContain('z.literal(1, { error: \'priority cannot be 1\' })')
      expect(generatedSrc).toContain('z.literal(2, { error: \'priority cannot be 2\' })')
      expect(generatedSrc).toContain('z.literal(3, { error: \'priority cannot be 3\' })')
    })

    it('accepts each valid string enum value', async () => {
      for (const role of ['admin', 'editor', 'viewer']) {
        const res = await postForm({ ...validForm, role })
        expect(res.status).toBe(200)
      }
    })

    it('accepts each valid integer enum value', async () => {
      for (const priority of [1, 2, 3]) {
        const res = await postForm({ ...validForm, priority })
        expect(res.status).toBe(200)
      }
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-anyOf-message
  // ─────────────────────────────────────────────────────────
  describe('x-anyOf-message', () => {
    it('rejects boolean for anyValue', async () => {
      const res = await postComposition({ anyValue: true })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/anyValue', detail: 'anyValue must be a string or integer' },
      ])
    })

    it('accepts string for anyValue', async () => {
      const res = await postComposition({ anyValue: 'hello' })
      expect(res.status).toBe(200)
    })

    it('accepts integer for anyValue', async () => {
      const res = await postComposition({ anyValue: 42 })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-oneOf-message
  // ─────────────────────────────────────────────────────────
  describe('x-oneOf-message', () => {
    it('rejects boolean for oneValue (zero matches)', async () => {
      const res = await postComposition({ anyValue: 'ok', oneValue: true })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/oneValue', detail: 'oneValue must match exactly one type' },
      ])
    })

    it('accepts string for oneValue', async () => {
      const res = await postComposition({ anyValue: 'ok', oneValue: 'text' })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-not-message
  // ─────────────────────────────────────────────────────────
  describe('x-not-message', () => {
    it('rejects string for notString', async () => {
      const res = await postComposition({ anyValue: 'ok', notString: 'forbidden' })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/notString', detail: 'notString must not be a string' },
      ])
    })

    it('accepts non-string for notString', async () => {
      const res = await postComposition({ anyValue: 'ok', notString: 42 })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-propertyNames-message
  // ─────────────────────────────────────────────────────────
  describe('x-propertyNames-message', () => {
    it('rejects keys violating the pattern', async () => {
      const res = await postDictionary({ BadKey: 'x' })
      expect(await errorsOf(res)).toStrictEqual([
        {
          pointer: '/',
          detail: 'keys must start with a lowercase letter and contain only [a-z0-9_]',
        },
      ])
    })

    it('accepts compliant keys', async () => {
      const res = await postDictionary({ ok_key: 'x', another1: 'y' })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-dependentRequired-message
  // ─────────────────────────────────────────────────────────
  describe('x-dependentRequired-message', () => {
    it('rejects token without tokenLabel', async () => {
      const res = await postForm({ ...validForm, token: 't' })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/', detail: 'tokenLabel is required when token is provided' },
      ])
    })

    it('accepts token paired with tokenLabel', async () => {
      const res = await postForm({ ...validForm, token: 't', tokenLabel: 'lbl' })
      expect(res.status).toBe(200)
    })

    it('accepts neither token nor tokenLabel', async () => {
      const res = await postForm(validForm)
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // Arrow-function messages — issue-aware customization
  //   `error()` helper detects /^\s*\(.*?\)\s*=>/ and emits the
  //   arrow function as-is, so users can branch on `iss.input`,
  //   `iss.code`, etc. at runtime.
  // ─────────────────────────────────────────────────────────
  describe('arrow-function error messages', () => {
    const generatedSrc = readFileSync(
      fileURLToPath(new URL('./generated.ts', import.meta.url)),
      'utf8',
    )

    it('emits no-arg arrow function as-is in the generated code', () => {
      expect(generatedSrc).toContain("z.string({ error: () => 'nickname is invalid' })")
    })

    it('emits (iss)-arg arrow function as-is in the generated code', () => {
      expect(generatedSrc).toContain(
        "iss.input === undefined ? 'quota is required' : 'quota must be an integer'",
      )
      expect(generatedSrc).toContain(
        "error: (iss) => 'quota must be >= 0 (received: ' + String(iss.input) + ')'",
      )
    })

    it('no-arg arrow: rejects non-string nickname with custom message', async () => {
      const res = await postForm({ ...validForm, nickname: 123 })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/nickname', detail: 'nickname is invalid' },
      ])
    })

    it('(iss)-arg arrow: distinguishes "missing" from "wrong type" via iss.input', async () => {
      const { quota: _omit, ...withoutQuota } = validForm
      const missing = await postForm(withoutQuota)
      expect(await errorsOf(missing)).toStrictEqual([
        { pointer: '/quota', detail: 'quota is required' },
      ])

      const wrongType = await postForm({ ...validForm, quota: 'abc' })
      expect(await errorsOf(wrongType)).toStrictEqual([
        { pointer: '/quota', detail: 'quota must be an integer' },
      ])
    })

    it('(iss)-arg arrow: interpolates iss.input into the .min() message', async () => {
      const res = await postForm({ ...validForm, quota: -7 })
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/quota', detail: 'quota must be >= 0 (received: -7)' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-allOf-message — Pattern C wrap (.check().pipe()) replaces sub-issue
  //   messages with the configured top-level message while preserving path.
  // ─────────────────────────────────────────────────────────
  describe('x-allOf-message', () => {
    const generatedSrc = readFileSync(
      fileURLToPath(new URL('./generated.ts', import.meta.url)),
      'utf8',
    )

    it('emits IIFE wrap with shared Schema const for string form', () => {
      expect(generatedSrc).toContain('const MergedSchema = (() =>')
      expect(generatedSrc).toContain('const Schema = z')
      expect(generatedSrc).toContain('.check((ctx) =>')
      expect(generatedSrc).toContain('Schema.safeParse(ctx.value)')
      expect(generatedSrc).toContain(".pipe(Schema)")
      expect(generatedSrc).toContain("message: 'merged validation failed'")
    })

    it('emits 11 code branches in Zod v4 official order', () => {
      const order = [
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
      const positions = order.map((c) => generatedSrc.indexOf(`issue.code === '${c}'`))
      expect(positions.every((p) => p > -1)).toBe(true)
      const sorted = [...positions].sort((a, b) => a - b)
      expect(positions).toStrictEqual(sorted)
    })

    it('emits arrow-function call for arrow form', () => {
      expect(generatedSrc).toContain(
        "((issue) => 'merged failed at ' + issue.path.join('.'))(issue)",
      )
    })

    it('accepts a fully valid merged payload', async () => {
      const res = await postMerged({ name: 'taro', age: 25 })
      expect(res.status).toBe(200)
    })

    it('replaces sub-issue messages with x-allOf-message (string form, single failure)', async () => {
      const res = await postMerged({ name: 'a', age: 25 })
      expect(res.status).toBe(422)
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/name', detail: 'merged validation failed' },
      ])
    })

    it('preserves multiple sub-paths with x-allOf-message (string form, both fail)', async () => {
      const res = await postMerged({ name: 'a', age: -1 })
      expect(res.status).toBe(422)
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/name', detail: 'merged validation failed' },
        { pointer: '/age', detail: 'merged validation failed' },
      ])
    })

    it('preserves required-field path when sub-property missing', async () => {
      const res = await postMerged({ age: 25 })
      expect(res.status).toBe(422)
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/name', detail: 'merged validation failed' },
      ])
    })

    it('arrow form: dynamic message based on issue.path', async () => {
      const res = await postMergedArrow({ name: 'a', age: -1 })
      expect(res.status).toBe(422)
      expect(await errorsOf(res)).toStrictEqual([
        { pointer: '/name', detail: 'merged failed at name' },
        { pointer: '/age', detail: 'merged failed at age' },
      ])
    })

    it('arrow form: accepts valid payload', async () => {
      const res = await postMergedArrow({ name: 'taro', age: 25 })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // Aggregate: all custom messages surface together
  // ─────────────────────────────────────────────────────────
  it('aggregates all custom messages on multi-field failure', async () => {
    const res = await postForm({
      username: 'ab',
      code: 'ABC',
      slug: 'BAD',
      age: -1,
      score: 0.3,
      count: 7,
      active: 'yes',
      tags: [],
      pin: [1, 2, 3],
      role: 'guest',
      priority: 99,
      // quota omitted → arrow-function "is required" branch
    })
    expect(res.status).toBe(422)
    expect(await errorsOf(res)).toStrictEqual([
      { pointer: '/username', detail: 'username must be at least 3 characters' },
      { pointer: '/code', detail: 'code must be exactly 6 characters' },
      { pointer: '/slug', detail: 'slug must be lowercase alphanumeric with hyphens' },
      { pointer: '/age', detail: 'age must be >= 0' },
      { pointer: '/score', detail: 'score must be a multiple of 0.5' },
      { pointer: '/count', detail: 'count must be a multiple of 5' },
      { pointer: '/active', detail: 'active must be a boolean' },
      { pointer: '/tags', detail: 'tags must contain at least 1 item' },
      { pointer: '/pin', detail: 'pin must contain exactly 4 digits' },
      { pointer: '/role', detail: 'role must be one of admin, editor, viewer' },
      { pointer: '/priority', detail: 'priority must be 1, 2, or 3' },
      { pointer: '/quota', detail: 'quota is required' },
    ])
  })
})
