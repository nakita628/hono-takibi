import { describe, expect, it } from 'vitest'
import app from './app.ts'

// ───────────────────────────────────────────────────────────
// oneOf — exactly one branch must match
// ───────────────────────────────────────────────────────────
describe('oneOf — { value: oneOf [string, integer] }', () => {
  it('accepts string value (one branch matches)', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'hello' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  it('accepts integer value (one branch matches)', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 42 }),
    })
    expect(res.status).toBe(200)
  })

  it('rejects boolean (no branch matches → invalid_union)', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: true }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; code: string }[] }
    expect(body.errors).toStrictEqual([
      { pointer: '/value', detail: 'Invalid input', code: 'invalid_union' },
    ])
  })

  it('rejects null (no branch matches)', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: null }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; code: string }[] }
    expect(body.errors[0]?.pointer).toBe('/value')
    expect(body.errors[0]?.code).toBe('invalid_union')
  })

  it('rejects missing required field "value"', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string }[] }
    expect(body.errors[0]?.pointer).toBe('/value')
  })
})

// ───────────────────────────────────────────────────────────
// anyOf — at least one branch must match
// ───────────────────────────────────────────────────────────
describe('anyOf — { value: anyOf [string, integer] }', () => {
  it('accepts string value', async () => {
    const res = await app.request('/any-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'hello' }),
    })
    expect(res.status).toBe(200)
  })

  it('accepts integer value', async () => {
    const res = await app.request('/any-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 42 }),
    })
    expect(res.status).toBe(200)
  })

  it('rejects boolean (no branch matches)', async () => {
    const res = await app.request('/any-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: false }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; code: string }[] }
    expect(body.errors[0]?.pointer).toBe('/value')
    expect(body.errors[0]?.code).toBe('invalid_union')
  })
})

// ───────────────────────────────────────────────────────────
// allOf — every branch must succeed (object intersection)
//   schema = { name: string, minLength: 3 } & { age: integer, minimum: 0 }
// ───────────────────────────────────────────────────────────
describe('allOf — { name: string >=3 } & { age: integer >=0 }', () => {
  it('accepts when both branches succeed', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: 25 }),
    })
    expect(res.status).toBe(200)
  })

  it('rejects when first branch fails (name too short)', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: 25 }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; code: string }[] }
    expect(body.errors).toStrictEqual([
      {
        pointer: '/name',
        detail: 'Too small: expected string to have >=3 characters',
        code: 'too_small',
      },
    ])
  })

  it('rejects when second branch fails (age negative)', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: -1 }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; code: string }[] }
    expect(body.errors).toStrictEqual([
      {
        pointer: '/age',
        detail: 'Too small: expected number to be >=0',
        code: 'too_small',
      },
    ])
  })

  it('surfaces BOTH paths when both branches fail (no flattening)', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: -1 }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string }[] }
    expect(body.errors.map((e) => e.pointer).sort()).toStrictEqual(['/age', '/name'])
  })

  it('rejects empty object (both fields missing)', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string }[] }
    expect(body.errors.length).toBeGreaterThan(0)
  })
})

// ───────────────────────────────────────────────────────────
// not — value must NOT match the negated schema
//   schema = { forbidden: not { type: string } }
//   → forbidden accepts anything EXCEPT a string
// ───────────────────────────────────────────────────────────
describe('not — { forbidden: not(string) }', () => {
  it('accepts integer (not a string)', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 42 }),
    })
    expect(res.status).toBe(200)
  })

  it('accepts boolean (not a string)', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: true }),
    })
    expect(res.status).toBe(200)
  })

  it('accepts null (not a string)', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: null }),
    })
    expect(res.status).toBe(200)
  })

  it('accepts object (not a string)', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: { nested: true } }),
    })
    expect(res.status).toBe(200)
  })

  it('rejects string (matches the negated type)', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 'hello' }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; code: string }[] }
    expect(body.errors[0]?.pointer).toBe('/forbidden')
    expect(body.errors[0]?.code).toBe('custom')
  })

  it('rejects empty string (still a string)', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: '' }),
    })
    expect(res.status).toBe(422)
  })
})

// ───────────────────────────────────────────────────────────
// x-oneOf-message — replaces default union error message
// ───────────────────────────────────────────────────────────
describe('x-oneOf-message customization', () => {
  it('rejects boolean with the configured custom message', async () => {
    const res = await app.request('/one-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: true }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/value',
          detail: 'value must match exactly one of: string | integer',
          code: 'invalid_union',
        },
      ],
    })
  })

  it('still accepts valid input', async () => {
    const res = await app.request('/one-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'ok' }),
    })
    expect(res.status).toBe(200)
  })
})

// ───────────────────────────────────────────────────────────
// x-anyOf-message — replaces default union error message
// ───────────────────────────────────────────────────────────
describe('x-anyOf-message customization', () => {
  it('rejects boolean with the configured custom message', async () => {
    const res = await app.request('/any-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: true }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
    expect(body.errors).toStrictEqual([
      {
        pointer: '/value',
        detail: 'value must be a string or integer',
        code: 'invalid_union',
      },
    ])
  })
})

// ───────────────────────────────────────────────────────────
// x-allOf-message — Pattern C wrap; replaces sub-issue messages
//   while preserving each sub-failure's path.
// ───────────────────────────────────────────────────────────
describe('x-allOf-message customization', () => {
  it('rewrites each sub-issue message but keeps the original path', async () => {
    const res = await app.request('/all-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: -1 }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      errors: { pointer: string; detail: string; code: string }[]
    }
    expect(body.errors).toStrictEqual([
      { pointer: '/name', detail: 'allOf composition failed', code: 'too_small' },
      { pointer: '/age', detail: 'allOf composition failed', code: 'too_small' },
    ])
  })

  it('accepts valid input through the wrap (.pipe preserves type)', async () => {
    const res = await app.request('/all-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: 25 }),
    })
    expect(res.status).toBe(200)
  })
})

// ───────────────────────────────────────────────────────────
// x-not-message — replaces .refine() default message
// ───────────────────────────────────────────────────────────
describe('x-not-message customization', () => {
  it('rejects string with the configured custom message', async () => {
    const res = await app.request('/not-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 'hello' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/forbidden',
          detail: 'forbidden must not be a string',
          code: 'custom',
        },
      ],
    })
  })

  it('still accepts non-string', async () => {
    const res = await app.request('/not-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 42 }),
    })
    expect(res.status).toBe(200)
  })
})

// ───────────────────────────────────────────────────────────
// Semantic correctness — discriminated oneOf
//   payload: oneOf
//     - { kind: 'dog', dog: string }
//     - { kind: 'cat', cat: string }
//   discriminator: { propertyName: 'kind' }
// ───────────────────────────────────────────────────────────
describe('oneOf with discriminator (semantic)', () => {
  it('accepts dog payload', async () => {
    const res = await app.request('/one-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { kind: 'dog', dog: 'Pochi' } }),
    })
    expect(res.status).toBe(200)
  })

  it('accepts cat payload', async () => {
    const res = await app.request('/one-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { kind: 'cat', cat: 'Tama' } }),
    })
    expect(res.status).toBe(200)
  })

  it('rejects unknown discriminator value "bird"', async () => {
    const res = await app.request('/one-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { kind: 'bird', bird: 'Tweety' } }),
    })
    expect(res.status).toBe(422)
  })

  it('rejects when discriminator matches but required field is missing', async () => {
    const res = await app.request('/one-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { kind: 'dog' } }),
    })
    expect(res.status).toBe(422)
  })
})

// ───────────────────────────────────────────────────────────
// Semantic correctness — anyOf with overlapping schemas
//   payload: anyOf
//     - { a: integer }     ← branch A
//     - { b: integer }     ← branch B
//   anyOf accepts when AT LEAST ONE matches (including BOTH).
// ───────────────────────────────────────────────────────────
describe('anyOf with overlap (semantic — distinguishes from oneOf)', () => {
  it('accepts when only branch A matches: { a: 1 }', async () => {
    const res = await app.request('/any-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { a: 1 } }),
    })
    expect(res.status).toBe(200)
  })

  it('accepts when only branch B matches: { b: 1 }', async () => {
    const res = await app.request('/any-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { b: 1 } }),
    })
    expect(res.status).toBe(200)
  })

  it('accepts when BOTH branches match: { a: 1, b: 2 } (anyOf is OK with multi-match)', async () => {
    const res = await app.request('/any-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { a: 1, b: 2 } }),
    })
    expect(res.status).toBe(200)
  })
})

// ───────────────────────────────────────────────────────────
// Semantic correctness — allOf with 3 branches (verifies
//   that the chain doesn't short-circuit at branch 2)
//   schema = { a: string } & { b: integer } & { c: boolean }
// ───────────────────────────────────────────────────────────
describe('allOf with 3 branches (semantic)', () => {
  it('accepts when all 3 branches succeed', async () => {
    const res = await app.request('/all-of-chain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 'x', b: 1, c: true }),
    })
    expect(res.status).toBe(200)
  })

  it('rejects when 1st branch fails (a is number, not string)', async () => {
    const res = await app.request('/all-of-chain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 42, b: 1, c: true }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string }[] }
    expect(body.errors.some((e) => e.pointer === '/a')).toBe(true)
  })

  it('rejects when 2nd branch fails (b is string, not integer)', async () => {
    const res = await app.request('/all-of-chain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 'x', b: 'wrong', c: true }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string }[] }
    expect(body.errors.some((e) => e.pointer === '/b')).toBe(true)
  })

  it('rejects when 3rd branch fails (c is string, not boolean) — proves chain runs full length', async () => {
    const res = await app.request('/all-of-chain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 'x', b: 1, c: 'wrong' }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string }[] }
    expect(body.errors.some((e) => e.pointer === '/c')).toBe(true)
  })
})

// ───────────────────────────────────────────────────────────
// Semantic correctness — not with const
//   value: not { const: 'forbidden-value' }
//   → accepts anything EXCEPT exactly that string literal.
// ───────────────────────────────────────────────────────────
describe('not with const (semantic)', () => {
  it('accepts a different string', async () => {
    const res = await app.request('/not-const', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'allowed-value' }),
    })
    expect(res.status).toBe(200)
  })

  it('accepts an integer (different type entirely)', async () => {
    const res = await app.request('/not-const', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 42 }),
    })
    expect(res.status).toBe(200)
  })

  it('rejects exactly the forbidden const string', async () => {
    const res = await app.request('/not-const', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'forbidden-value' }),
    })
    expect(res.status).toBe(422)
  })
})

// ───────────────────────────────────────────────────────────
// Arrow-function message customization
//   The error() helper detects /^\s*\(.*?\)\s*=>/ and emits the
//   arrow as-is, so users can read iss.input / iss.path / etc.
// ───────────────────────────────────────────────────────────
describe('arrow-function message customization', () => {
  it('x-allOf-message arrow: each issue gets a path-specific message', async () => {
    // YAML: x-allOf-message: '(issue) => "allOf failed at /" + issue.path.join("/")'
    const res = await app.request('/all-of-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: -1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'allOf failed at /name', code: 'too_small' },
        { pointer: '/age', detail: 'allOf failed at /age', code: 'too_small' },
      ],
    })
  })

  it('x-oneOf-message arrow: reads typeof iss.input', async () => {
    // YAML: x-oneOf-message: '(iss) => `value type incompatible (got ${typeof iss.input})`'
    const res = await app.request('/one-of-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: true }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { detail: string }[] }
    expect(body.errors[0]?.detail).toBe('value type incompatible (got boolean)')
  })

  it('x-not-message arrow: interpolates JSON-stringified input', async () => {
    // YAML: x-not-message: '(iss) => `forbidden cannot be string, got ${JSON.stringify(iss.input)}`'
    const res = await app.request('/not-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 'leaked' }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { detail: string }[] }
    expect(body.errors[0]?.detail).toBe('forbidden cannot be string, got "leaked"')
  })
})
