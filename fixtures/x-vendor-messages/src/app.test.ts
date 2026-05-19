import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import app from './app.ts'

describe('x-* vendor extension messages — exhaustive variants', () => {
  it('accepts a fully valid form', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
            }),
    })
    expect(res.status).toBe(200)
  })

  // ─────────────────────────────────────────────────────────
  // x-error-message — schema constructors
  // ─────────────────────────────────────────────────────────
  describe('x-error-message (schema constructor)', () => {
    it('string: rejects non-string username', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 42,
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
              }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/username', detail: 'username must be a string' },
      ])
    })

    it('integer: rejects non-integer age', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: 'thirty',
                score: 1.5,
                count: 10,
                active: true,
                tags: ['dev'],
                pin: [1, 2, 3, 4],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/age', detail: 'age must be an integer' },
      ])
    })

    it('number: rejects non-number score', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: 25,
                score: 'one',
                count: 10,
                active: true,
                tags: ['dev'],
                pin: [1, 2, 3, 4],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/score', detail: 'score must be a number' },
      ])
    })

    it('boolean: rejects non-boolean active', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: 25,
                score: 1.5,
                count: 10,
                active: 'yes',
                tags: ['dev'],
                pin: [1, 2, 3, 4],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/active', detail: 'active must be a boolean' },
      ])
    })

    it('array: rejects non-array tags', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: 25,
                score: 1.5,
                count: 10,
                active: true,
                tags: 'dev',
                pin: [1, 2, 3, 4],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/tags', detail: 'tags must be an array' },
      ])
    })

    it('string enum: rejects value outside enum (union top-level)', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: 25,
                score: 1.5,
                count: 10,
                active: true,
                tags: ['dev'],
                pin: [1, 2, 3, 4],
                role: 'guest',
                priority: 1,
                quota: 5,
              }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/role', detail: 'role must be one of admin, editor, viewer' },
      ])
    })

    it('integer enum: rejects value outside enum (union top-level)', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
                priority: 99,
                quota: 5,
              }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/priority', detail: 'priority must be 1, 2, or 3' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // v3.0: 1 keyword = 1 message (split from previous shared umbrellas)
  // x-minLength-message (string), x-minItems-message (array), x-minimum-message (numeric)
  // ─────────────────────────────────────────────────────────
  describe('x-minLength-message / x-minItems-message / x-minimum-message', () => {
    it('x-minLength-message: rejects short username (string)', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'ab',
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
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/username', detail: 'username must be at least 3 characters' },
      ])
    })

    it('x-minItems-message: rejects empty tags array', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: 25,
                score: 1.5,
                count: 10,
                active: true,
                tags: [],
                pin: [1, 2, 3, 4],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/tags', detail: 'tags must contain at least 1 item' },
      ])
    })

    it('x-minimum-message: rejects negative age (integer)', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: -1,
                score: 1.5,
                count: 10,
                active: true,
                tags: ['dev'],
                pin: [1, 2, 3, 4],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/age', detail: 'age must be >= 0' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-maxLength-message / x-maxItems-message / x-maximum-message
  // ─────────────────────────────────────────────────────────
  describe('x-maxLength-message / x-maxItems-message / x-maximum-message', () => {
    it('x-maxLength-message: rejects too-long username (string)', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'a'.repeat(17),
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
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/username', detail: 'username must be at most 16 characters' },
      ])
    })

    it('x-maxItems-message: rejects too many tags', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: 25,
                score: 1.5,
                count: 10,
                active: true,
                tags: ['a', 'b', 'c', 'd', 'e', 'f'],
                pin: [1, 2, 3, 4],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/tags', detail: 'tags must contain at most 5 items' },
      ])
    })

    it('x-maximum-message: rejects age above maximum (integer)', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: 200,
                score: 1.5,
                count: 10,
                active: true,
                tags: ['dev'],
                pin: [1, 2, 3, 4],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/age', detail: 'age must be <= 120' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-size-message — .length()
  // ─────────────────────────────────────────────────────────
  describe('x-size-message', () => {
    it('string .length(): rejects wrong-length code', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC',
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
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/code', detail: 'code must be exactly 6 characters' },
      ])
    })

    it('array .length(): rejects wrong-length pin', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: 25,
                score: 1.5,
                count: 10,
                active: true,
                tags: ['dev'],
                pin: [1, 2, 3],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/pin', detail: 'pin must contain exactly 4 digits' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-pattern-message — .regex()
  // ─────────────────────────────────────────────────────────
  describe('x-pattern-message', () => {
    it('rejects slug with uppercase characters', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'NotASlug',
                age: 25,
                score: 1.5,
                count: 10,
                active: true,
                tags: ['dev'],
                pin: [1, 2, 3, 4],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/slug', detail: 'slug must be lowercase alphanumeric with hyphens' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-multipleOf-message — .multipleOf()
  // ─────────────────────────────────────────────────────────
  describe('x-multipleOf-message', () => {
    it('number .multipleOf(): rejects score that is not a multiple of 0.5', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: 25,
                score: 0.3,
                count: 10,
                active: true,
                tags: ['dev'],
                pin: [1, 2, 3, 4],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/score', detail: 'score must be a multiple of 0.5' },
      ])
    })

    it('integer .multipleOf(): rejects count that is not a multiple of 5', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'hello-world',
                age: 25,
                score: 1.5,
                count: 7,
                active: true,
                tags: ['dev'],
                pin: [1, 2, 3, 4],
                role: 'admin',
                priority: 1,
                quota: 5,
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/count', detail: 'count must be a multiple of 5' },
      ])
    })
  })

  // ─────────────────────────────────────────────────────────
  // enum acceptance — `role` and `priority` use `enum` with a single
  // whole-enum `x-error-message`. (The previous `x-enum-error-messages`
  // extension was removed: per-literal `value === 'admin'` branches were
  // dead code because a value either matches an enum entry — validation
  // passes — or it doesn't, in which case it's some other value and the
  // per-value lookup can't fire.)
  // ─────────────────────────────────────────────────────────
  describe('enum acceptance', () => {
    it('accepts each valid string enum value', async () => {
      for (const role of ['admin', 'editor', 'viewer']) {
        const res = await app.request('/form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'taro',
            code: 'ABC123',
            slug: 'hello-world',
            age: 25,
            score: 1.5,
            count: 10,
            active: true,
            tags: ['dev'],
            pin: [1, 2, 3, 4],
            role,
            priority: 1,
            quota: 5,
          }),
        })
        expect(res.status).toBe(200)
      }
    })

    it('accepts each valid integer enum value', async () => {
      for (const priority of [1, 2, 3]) {
        const res = await app.request('/form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
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
            priority,
            quota: 5,
          }),
        })
        expect(res.status).toBe(200)
      }
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-anyOf-message
  // ─────────────────────────────────────────────────────────
  describe('x-anyOf-message', () => {
    it('rejects boolean for anyValue', async () => {
      const res = await app.request('/composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anyValue: true }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/anyValue', detail: 'anyValue must be a string or integer' },
      ])
    })

    it('accepts string for anyValue', async () => {
      const res = await app.request('/composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anyValue: 'hello' }),
      })
      expect(res.status).toBe(200)
    })

    it('accepts integer for anyValue', async () => {
      const res = await app.request('/composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anyValue: 42 }),
      })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-oneOf-message
  // ─────────────────────────────────────────────────────────
  describe('x-oneOf-message', () => {
    it('rejects boolean for oneValue (zero matches)', async () => {
      const res = await app.request('/composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anyValue: 'ok', oneValue: true }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/oneValue', detail: 'oneValue must match exactly one type' },
      ])
    })

    it('accepts string for oneValue', async () => {
      const res = await app.request('/composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anyValue: 'ok', oneValue: 'text' }),
      })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-not-message
  // ─────────────────────────────────────────────────────────
  describe('x-not-message', () => {
    it('rejects string for notString', async () => {
      const res = await app.request('/composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anyValue: 'ok', notString: 'forbidden' }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/notString', detail: 'notString must not be a string' },
      ])
    })

    it('accepts non-string for notString', async () => {
      const res = await app.request('/composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anyValue: 'ok', notString: 42 }),
      })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-propertyNames-message
  // ─────────────────────────────────────────────────────────
  describe('x-propertyNames-message', () => {
    it('rejects keys violating the pattern', async () => {
      const res = await app.request('/dictionary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ BadKey: 'x' }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        {
          pointer: '/BadKey',
          detail: 'keys must start with a lowercase letter and contain only [a-z0-9_]',
        },
      ])
    })

    it('accepts compliant keys', async () => {
      const res = await app.request('/dictionary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok_key: 'x', another1: 'y' }),
      })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-dependentRequired-message
  // ─────────────────────────────────────────────────────────
  describe('x-dependentRequired-message', () => {
    // v3.1: dependentRequired emits per-dep issues with `path:[d]` so the
    // JSON pointer locates the missing key (was `/` in earlier versions).
    it('rejects token without tokenLabel', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
                token: 't',
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/tokenLabel', detail: 'tokenLabel is required when token is provided' },
      ])
    })

    it('accepts token paired with tokenLabel', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
                token: 't',
                tokenLabel: 'lbl',
              }),
      })
      expect(res.status).toBe(200)
    })

    it('accepts neither token nor tokenLabel', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
              }),
      })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-dependentSchemas-message — distinct from x-dependentRequired-message.
  // dependentRequired: missing required dep key. dependentSchemas: sub-schema
  // validation failed (e.g. wrong format for the dep-gated key itself).
  // ─────────────────────────────────────────────────────────
  describe('x-dependentSchemas-message', () => {
    // v3.1: dependentRequired now reports `/billing_zip` (the missing dep)
    // rather than `/` — per-dep issue at path:[d]. x-dependentRequired-message
    // still overrides the default text.
    it('rejects credit_card without billing_zip via x-dependentRequired-message', async () => {
      const res = await app.request('/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'cc', credit_card: '4111111111111111' }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/billing_zip', detail: 'billing_zip is required when credit_card is provided' },
      ])
    })

    // x-dependentSchemas-message is now applied via override semantics:
    // inner sub-schema issues retain `code` / `path` / `expected`, only
    // `message` is replaced (aligned with `x-allOf-message` and related
    // applicator slots). The slot value flows through from the OpenAPI
    // spec to the generated validator.
    it('rejects malformed credit_card with override message from x-dependentSchemas-message', async () => {
      const res = await app.request('/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                      method: 'cc',
                      credit_card: '123',
                      billing_zip: '00000',
                    }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/', detail: 'credit_card must be 16 digits when provided' },
      ])
    })

    it('accepts well-formed credit_card with billing_zip', async () => {
      const res = await app.request('/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                      method: 'cc',
                      credit_card: '4111111111111111',
                      billing_zip: '00000',
                    }),
      })
      expect(res.status).toBe(200)
    })

    it('accepts payment without credit_card', async () => {
      const res = await app.request('/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'cash' }),
      })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-exclusiveMinimum-message / x-exclusiveMaximum-message —
  // distinct from inclusive min/max. Silent bug fix.
  // ─────────────────────────────────────────────────────────
  describe('x-exclusiveMinimum-message / x-exclusiveMaximum-message', () => {
    it('x-minimum-message fires for inclusive lower bound (score < 0)', async () => {
      const res = await app.request('/bounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: -1, ratio: 0.5 }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/score', detail: 'score must be >= 0' },
      ])
    })

    it('x-exclusiveMaximum-message fires for exclusive upper bound (score = 100)', async () => {
      const res = await app.request('/bounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: 100, ratio: 0.5 }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/score', detail: 'score must be < 100' },
      ])
    })

    it('x-exclusiveMinimum-message fires for exclusive lower bound (ratio = 0)', async () => {
      const res = await app.request('/bounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: 50, ratio: 0 }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/ratio', detail: 'ratio must be > 0' },
      ])
    })

    it('x-maximum-message fires for inclusive upper bound (ratio > 1)', async () => {
      const res = await app.request('/bounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: 50, ratio: 1.5 }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/ratio', detail: 'ratio must be <= 1' },
      ])
    })

    it('accepts boundary-valid values', async () => {
      const res = await app.request('/bounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: 0, ratio: 1 }),
      })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-minContains-message / x-maxContains-message —
  // distinct from x-contains-message. v3.0 silent-bug fix.
  // ─────────────────────────────────────────────────────────
  describe('x-minContains-message / x-maxContains-message', () => {
    const item = (kind: string) => ({ kind })

    it('x-minContains-message fires when fewer than 2 premium items', async () => {
      const res = await app.request('/basket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                      items: [item('premium'), item('basic'), item('basic')],
                    }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/items', detail: 'must include at least 2 premium items' },
      ])
    })

    it('x-maxContains-message fires when more than 5 premium items', async () => {
      const res = await app.request('/basket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                      items: [
                        item('premium'),
                        item('premium'),
                        item('premium'),
                        item('premium'),
                        item('premium'),
                        item('premium'),
                      ],
                    }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/items', detail: 'must include at most 5 premium items' },
      ])
    })

    it('accepts basket within bounds (2-5 premium items)', async () => {
      const res = await app.request('/basket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                      items: [item('premium'), item('premium'), item('basic')],
                    }),
      })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // v3.5 (2026-05-14): contains / minContains / maxContains の x-* 未指定時は
  // message を完全に省略し、Zod の built-in default ('Invalid input') に委ねる。
  // 動的な matched カウント表示は廃止 (loid/yuri/yusukebe 合議)。
  // ─────────────────────────────────────────────────────────
  describe('contains default messages (no x-* slot) — falls back to Zod default', () => {
    it('accepts a fully valid body', async () => {
      const res = await app.request('/contains-default', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tags: ['special', 'a', 'b'],
          scores: [95, 99, 80],
          ints: [1, 2, 3],
        }),
      })
      expect(res.status).toBe(200)
    })

    it('contains alone — Zod default "Invalid input" on /tags', async () => {
      const res = await app.request('/contains-default', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tags: ['a', 'b'],
          scores: [95, 99, 80],
          ints: [1, 2, 3],
        }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toContainEqual({
        pointer: '/tags',
        detail: 'Invalid input',
      })
    })

    it('minContains: 2 — Zod default "Invalid input" on /scores', async () => {
      const res = await app.request('/contains-default', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tags: ['special', 'a', 'b'],
          scores: [95, 50],
          ints: [1, 2, 3],
        }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toContainEqual({
        pointer: '/scores',
        detail: 'Invalid input',
      })
    })

    it('maxContains: 3 — Zod default "Invalid input" on /ints', async () => {
      const res = await app.request('/contains-default', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tags: ['special', 'a', 'b'],
          scores: [95, 99, 80],
          ints: [1, 2, 3, 4],
        }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toContainEqual({
        pointer: '/ints',
        detail: 'Invalid input',
      })
    })

    it('minContains: 2 — empty array reports Zod default', async () => {
      const res = await app.request('/contains-default', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tags: ['special', 'a', 'b'],
          scores: [],
          ints: [1, 2, 3],
        }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toContainEqual({
        pointer: '/scores',
        detail: 'Invalid input',
      })
    })
  })

  // ─────────────────────────────────────────────────────────
  // v3.2: writeOnly OAS YAML propagation snapshot
  // (verifies .openapi({writeOnly: true}) survives into the OpenAPI document)
  // ─────────────────────────────────────────────────────────
  describe('writeOnly OAS metadata propagation', () => {
    const getDoc = () =>
      app.getOpenAPI31Document({
        openapi: '3.1.0',
        info: { title: 'x-vendor-messages', version: '1.0.0' },
      })
    const getWriteOnlyComponent = () => {
      const doc = getDoc()
      const schemas = doc.components?.schemas as
        | { WriteOnly?: { properties?: Record<string, { writeOnly?: boolean }> } }
        | undefined
      return schemas?.WriteOnly
    }

    it('writeOnly: true survives into generated OpenAPI document', () => {
      const writeOnly = getWriteOnlyComponent()
      expect(writeOnly).toBeDefined()
      expect(writeOnly?.properties?.password?.writeOnly).toBe(true)
    })

    it('non-writeOnly properties do NOT carry the flag', () => {
      const writeOnly = getWriteOnlyComponent()
      expect(writeOnly?.properties?.name?.writeOnly).toBeUndefined()
    })

    it('runtime parse accepts password (writeOnly does not affect parse)', async () => {
      const res = await app.request('/write-only', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'taro', password: 'secret' }),
      })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // Coverage backfill — runtime tests for x-*-message extensions
  // that were previously codegen-only (yuri-検問 batch).
  // ─────────────────────────────────────────────────────────
  describe('coverage backfill (Misc)', () => {
    it('x-enum-message: rejects color not in enum', async () => {
      const res = await app.request('/misc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                color: 'purple',
                kind: 'admin',
                tags: ['a', 'b'],
                sized: ['premium', 'basic'],
                namespaced: { a: '1' },
                prefixed: { x_one: 'ok' },
                payload: 'ok',
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/color', detail: 'color must be one of red, green, blue' },
      ])
    })

    // Zod v4's `z.enum` emits the same issue code (invalid_value) for both
    // type and value mismatches, so x-enum-message dominates for both.
    it('x-enum-message also fires for non-string color (Zod treats it as invalid_value)', async () => {
      const res = await app.request('/misc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                color: 42,
                kind: 'admin',
                tags: ['a', 'b'],
                sized: ['premium', 'basic'],
                namespaced: { a: '1' },
                prefixed: { x_one: 'ok' },
                payload: 'ok',
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/color', detail: 'color must be one of red, green, blue' },
      ])
    })

    it('x-const-message: rejects wrong literal value', async () => {
      const res = await app.request('/misc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                color: 'red',
                kind: 'user',
                tags: ['a', 'b'],
                sized: ['premium', 'basic'],
                namespaced: { a: '1' },
                prefixed: { x_one: 'ok' },
                payload: 'ok',
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/kind', detail: 'kind must be exactly "admin"' },
      ])
    })

    it('x-uniqueItems-message: rejects duplicate elements with index pointer', async () => {
      const res = await app.request('/misc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                color: 'red',
                kind: 'admin',
                tags: ['a', 'a'],
                sized: ['premium', 'basic'],
                namespaced: { a: '1' },
                prefixed: { x_one: 'ok' },
                payload: 'ok',
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/tags/1', detail: 'tags must contain unique values' },
      ])
    })

    it('x-contains-message (alone): rejects array without premium tag', async () => {
      const res = await app.request('/misc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                color: 'red',
                kind: 'admin',
                tags: ['a', 'b'],
                sized: ['basic', 'standard'],
                namespaced: { a: '1' },
                prefixed: { x_one: 'ok' },
                payload: 'ok',
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/sized', detail: 'sized must contain at least one premium tag' },
      ])
    })

    it('x-minProperties-message: rejects empty namespaced', async () => {
      const res = await app.request('/misc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                color: 'red',
                kind: 'admin',
                tags: ['a', 'b'],
                sized: ['premium', 'basic'],
                namespaced: {},
                prefixed: { x_one: 'ok' },
                payload: 'ok',
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/namespaced', detail: 'namespaced must have at least 1 property' },
      ])
    })

    it('x-additionalProperties-message: rejects unknown key', async () => {
      const res = await app.request('/misc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                color: 'red',
                kind: 'admin',
                tags: ['a', 'b'],
                sized: ['premium', 'basic'],
                namespaced: { a: '1', b: '2', c: '3', d: '4' },
                prefixed: { x_one: 'ok' },
                payload: 'ok',
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors.some((e) => e.detail === 'namespaced contains an unrecognized key')).toBe(true)
    })

    // x-maxProperties-message — verified via schema source round-trip
    // only; runtime dispatch is unreachable in this fixture by design.
    // `namespaced` declares only `{a, b, c}` with `additionalProperties:
    // false` and `maxProperties: 3`, so any 4-key payload trips the
    // unrecognized_keys branch FIRST (only 3 declared properties exist).
    // The keyword survives in `generated.ts`; verify there.
    it('x-maxProperties-message: keyword survives in generated schema source', () => {
      const here = fileURLToPath(new URL('./generated.ts', import.meta.url))
      const src = readFileSync(here, 'utf-8')
      expect(src.includes('namespaced must have at most 3 properties')).toBe(true)
    })

    // v3.1: patternProperties uses superRefine + closure-captured Schema and
    // propagates the path with the matched KEY appended (was `/prefixed` in
    // earlier versions; now `/prefixed/x_one` — the actual offender). The
    // x-patternProperties-message OVERRIDES the inner issue's message while
    // keeping the precise path/code intact.
    it('x-patternProperties-message: rejects wrong-typed x_ key (path includes key)', async () => {
      const res = await app.request('/misc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                color: 'red',
                kind: 'admin',
                tags: ['a', 'b'],
                sized: ['premium', 'basic'],
                namespaced: { a: '1' },
                prefixed: { x_one: 42 },
                payload: 'ok',
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/prefixed/x_one', detail: 'x_ keys must be strings' },
      ])
    })

    it('x-required-message: distinct message for missing payload', async () => {
      const res = await app.request('/misc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                color: 'red',
                kind: 'admin',
                tags: ['a', 'b'],
                sized: ['premium', 'basic'],
                namespaced: { a: '1' },
                prefixed: { x_one: 'ok' },
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/payload', detail: 'payload is required' },
      ])
    })

    it('x-error-message (string field): distinct message for non-string payload', async () => {
      const res = await app.request('/misc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                color: 'red',
                kind: 'admin',
                tags: ['a', 'b'],
                sized: ['premium', 'basic'],
                namespaced: { a: '1' },
                prefixed: { x_one: 'ok' },
                payload: 42,
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/payload', detail: 'payload must be a string' },
      ])
    })

    it('accepts a fully valid Misc payload', async () => {
      const res = await app.request('/misc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                color: 'red',
                kind: 'admin',
                tags: ['a', 'b'],
                sized: ['premium', 'basic'],
                namespaced: { a: '1' },
                prefixed: { x_one: 'ok' },
                payload: 'ok',
              }),
      })
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
      // Template-literal form (no `+ String(...) +` concat) — the YAML
      // expresses this with backtick strings; the generator emits the
      // arrow source verbatim.
      expect(generatedSrc).toContain(
        'error: (iss) => `quota must be >= 0 (received: ${iss.input})`',
      )
    })

    it('no-arg arrow: rejects non-string nickname with custom message', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
                nickname: 123,
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/nickname', detail: 'nickname is invalid' },
      ])
    })

    it('(iss)-arg arrow: distinguishes "missing" from "wrong type" via iss.input', async () => {
      const missing = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        }),
      })
      const body = (await missing.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/quota', detail: 'quota is required' },
      ])

      const wrongType = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
                quota: 'abc',
              }),
      })
      const body2 = (await wrongType.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body2.errors).toStrictEqual([
        { pointer: '/quota', detail: 'quota must be an integer' },
      ])
    })

    it('(iss)-arg arrow: interpolates iss.input into the .min() message', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
                quota: -7,
              }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
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
      expect(generatedSrc).toContain('.pipe(Schema)')
      expect(generatedSrc).toContain("message: 'merged validation failed'")
    })

    // The per-issue.code if/else dispatch is intentional: ctx.issues expects a
    // discriminated union narrowed by `code`. A generic spread without the
    // discriminant triggers TS errors at the call site. Assert the full set of
    // 11 Zod v4 codes is enumerated so the generated source compiles.
    it('emits per-issue.code if/else dispatch over all 11 Zod v4 codes', () => {
      const codes = [
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
      for (const c of codes) {
        expect(generatedSrc).toContain(`issue.code === '${c}'`)
      }
    })

    // For the arrow form (`x-allOf-message` is a function source),
    // generator wraps the arrow inline as `(arrow)(issue)` per branch.
    it('emits arrow form inline as (arrow)(issue)', () => {
      expect(generatedSrc).toContain(
        "((issue) => 'merged failed at ' + issue.path.join('.'))(issue)",
      )
    })

    it('accepts a fully valid merged payload', async () => {
      const res = await app.request('/merged', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'taro', age: 25 }),
      })
      expect(res.status).toBe(200)
    })

    it('replaces sub-issue messages with x-allOf-message (string form, single failure)', async () => {
      const res = await app.request('/merged', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'a', age: 25 }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/name', detail: 'merged validation failed' },
      ])
    })

    it('preserves multiple sub-paths with x-allOf-message (string form, both fail)', async () => {
      const res = await app.request('/merged', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'a', age: -1 }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/name', detail: 'merged validation failed' },
        { pointer: '/age', detail: 'merged validation failed' },
      ])
    })

    it('preserves required-field path when sub-property missing', async () => {
      const res = await app.request('/merged', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age: 25 }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/name', detail: 'merged validation failed' },
      ])
    })

    it('arrow form: dynamic message based on issue.path', async () => {
      const res = await app.request('/merged-arrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'a', age: -1 }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/name', detail: 'merged failed at name' },
        { pointer: '/age', detail: 'merged failed at age' },
      ])
    })

    it('arrow form: accepts valid payload', async () => {
      const res = await app.request('/merged-arrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'taro', age: 25 }),
      })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // Aggregate: all custom messages surface together
  // ─────────────────────────────────────────────────────────
  it('aggregates all custom messages on multi-field failure', async () => {
    const res = await app.request('/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
                }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
    expect(body.errors).toStrictEqual([
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

  // ─────────────────────────────────────────────────────────
  // allOf + unevaluatedProperties:false — JSON Schema 2020-12 §11.2.
  // Previously a silent dead path: the allOf branch in zod-to-openapi/
  // index.ts emitted z.and(...) without wiring `unevaluatedProperties` at
  // all, so extra keys passed through unchallenged. Fixed by wrapping the
  // composed schema in z.unknown().check(ctx => ...).pipe(Schema), where
  // the check evaluates raw input keys against the union of evaluated
  // properties from every allOf branch.
  // ─────────────────────────────────────────────────────────
  describe('allOf + unevaluatedProperties:false', () => {
    it('rejects an unknown property with the configured override message', async () => {
      const res = await app.request('/strict-allof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'a', name: 'b', stray: 'x' }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/stray', detail: 'Unknown field — only id and name are allowed.' },
      ])
    })

    it('accepts a payload covered entirely by allOf branches', async () => {
      const res = await app.request('/strict-allof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'a', name: 'b' }),
      })
      expect(res.status).toBe(200)
    })
  })

  // ─────────────────────────────────────────────────────────
  // x-implication-message — semantic alias for the implication pattern
  // (A → B) encoded as anyOf:[{not:A},{required:B}]. Takes precedence over
  // x-anyOf-message on the anyOf code path and surfaces the author's
  // intent verbatim when the implication is violated.
  // ─────────────────────────────────────────────────────────
  describe('x-implication-message (anyOf + not + required)', () => {
    it('rejects hasLicense=true without licenseNumber with the implication message', async () => {
      const res = await app.request('/implication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hasLicense: true }),
      })
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/', detail: 'licenseNumber is required when hasLicense is true' },
      ])
    })

    it('accepts hasLicense=true with licenseNumber', async () => {
      const res = await app.request('/implication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hasLicense: true, licenseNumber: 'L-001' }),
      })
      expect(res.status).toBe(200)
    })

    it('accepts hasLicense=false (antecedent is false, implication trivially holds)', async () => {
      const res = await app.request('/implication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hasLicense: false }),
      })
      expect(res.status).toBe(200)
    })
  })
})
