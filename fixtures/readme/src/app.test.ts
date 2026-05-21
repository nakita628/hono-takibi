/**
 * README executable documentation tests.
 *
 * Every schema in `openapi.yaml` corresponds to a code block in
 * `packages/hono-takibi/README.md`. This file proves the documented
 * behavior is correct: validation messages match README text exactly,
 * transforms run in the documented order, codecs round-trip, etc.
 */
import { describe, expect, it } from 'vitest'
import app from './app.ts'

describe('README — Custom Validation Error Messages', () => {
  it('x-error-message: rejects non-string name', async () => {
    const res = await app.request('/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 42 }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/name', detail: 'Name must be a string' }])
  })

  it('x-minLength-message: rejects empty string', async () => {
    const res = await app.request('/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: '' }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/name', detail: 'Name cannot be empty' }])
  })

  it('x-maxLength-message: rejects 51-char string', async () => {
    const res = await app.request('/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'a'.repeat(51) }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/name', detail: 'Name must be at most 50 characters' }])
  })

  it('accepts a valid name', async () => {
    const res = await app.request('/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'taro' }),
    })
    expect(res.status).toBe(200)
  })
})

describe('README — String Pre-validation Transforms', () => {
  it('x-trim: whitespace stripped before email validation', async () => {
    const res = await app.request('/transforms', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: '  user@example.com  ',
        slug: 'abc',
        country: 'jp',
        text: 'ok',
      }),
    })
    expect(res.status).toBe(200)
  })

  it('x-toLowerCase: input is lowercased before regex check', async () => {
    const res = await app.request('/transforms', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'a@b.co',
        slug: 'HELLO-WORLD', // becomes 'hello-world' → matches ^[a-z0-9-]+$
        country: 'jp',
        text: 'ok',
      }),
    })
    expect(res.status).toBe(200)
  })

  it('x-toUpperCase + x-normalize: both run as pre-transforms', async () => {
    const res = await app.request('/transforms', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'a@b.co',
        slug: 'abc',
        country: 'jp',
        text: 'café',
      }),
    })
    expect(res.status).toBe(200)
  })
})

describe('README — Type Coercion (x-coerce)', () => {
  it('coerces stringified inputs to numbers / int / bool / date', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        asNumber: '3.14',
        asInt: '42',
        asBool: 'true',
        asDate: '2024-01-01T00:00:00Z',
      }),
    })
    expect(res.status).toBe(200)
  })

  it('rejects when stringified int is below minimum', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        asNumber: '0',
        asInt: '-1',
        asBool: 'false',
        asDate: '2024-01-01T00:00:00Z',
      }),
    })
    expect(res.status).toBe(422)
  })
})

describe('README — Codec (x-codec: date)', () => {
  it('decodes ISO string into Date in the parsed result', async () => {
    const res = await app.request('/codec', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ updatedAt: '2024-01-01T00:00:00Z' }),
    })
    expect(res.status).toBe(200)
  })

  it('rejects non-ISO input', async () => {
    const res = await app.request('/codec', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ updatedAt: 'not-iso' }),
    })
    expect(res.status).toBe(422)
  })
})

describe('README — Custom Validation', () => {
  it('x-refine: short password fires the first refine message', async () => {
    const res = await app.request('/custom-validation', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        password: 'abc',
        normalizedEmail: 'a@b.co',
      }),
    })
    const body = (await res.json()) as { errors?: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors?.some((e) => e.detail === 'Password must be at least 8 characters')).toBe(true)
  })

  it('x-refine: missing uppercase fires the second refine message', async () => {
    const res = await app.request('/custom-validation', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        password: 'abcdefgh',
        normalizedEmail: 'a@b.co',
      }),
    })
    const body = (await res.json()) as { errors?: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors?.some((e) => e.detail === 'Password must contain an uppercase letter')).toBe(true)
  })

  it('x-superRefine: ctx.addIssue from custom function', async () => {
    const res = await app.request('/custom-validation', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        password: 'Abcdefgh',
        normalizedEmail: 'evil@blocked.example',
      }),
    })
    const body = (await res.json()) as { errors?: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors?.some((e) => e.detail === 'Blocked domain')).toBe(true)
  })

  it('accepts valid input', async () => {
    const res = await app.request('/custom-validation', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        password: 'Abcdefgh',
        normalizedEmail: '  USER@example.com  ', // trim + toLowerCase pre-applied
      }),
    })
    expect(res.status).toBe(200)
  })
})

describe('README — Default & Fallback & Freeze', () => {
  it('x-prefault: missing greeting is substituted with "hello"', async () => {
    const res = await app.request('/defaults', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        retries: 3,
        config: { name: 'cfg' },
      }),
    })
    expect(res.status).toBe(200)
  })

  it('x-catch: invalid retries falls back to 0', async () => {
    const res = await app.request('/defaults', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        greeting: 'hi',
        retries: 'not-an-int',
        config: { name: 'cfg' },
      }),
    })
    expect(res.status).toBe(200)
  })

  it('x-readonly: object is accepted and typed as readonly', async () => {
    const res = await app.request('/defaults', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        greeting: 'hi',
        retries: 1,
        config: { name: 'cfg' },
      }),
    })
    expect(res.status).toBe(200)
  })
})

describe('README — String Content Checks', () => {
  it('x-startsWith fails when prefix is wrong', async () => {
    const res = await app.request('/content-checks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        url: 'http://example.com',
        path: '/api/v1',
      }),
    })
    expect(res.status).toBe(422)
  })

  it('x-endsWith fails when suffix is wrong', async () => {
    const res = await app.request('/content-checks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        url: 'https://example.jp',
        path: '/api/v1',
      }),
    })
    expect(res.status).toBe(422)
  })

  it('x-includes fails when substring is absent', async () => {
    const res = await app.request('/content-checks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        url: 'https://example.com',
        path: '/static/v1',
      }),
    })
    expect(res.status).toBe(422)
  })

  it('accepts strings satisfying all checks', async () => {
    const res = await app.request('/content-checks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        url: 'https://example.com',
        path: '/api/v1',
      }),
    })
    expect(res.status).toBe(200)
  })
})

describe('README — Format-Specific Options', () => {
  it('accepts a fully valid payload', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(200)
  })

  it('x-emailRegex: rejects email not matching custom regex', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'user@gmail.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(422)
  })

  it('x-urlProtocol: rejects http (only https allowed)', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'http://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(422)
  })

  it('x-macDelimiter ":": rejects dash-delimited MAC', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00-11-22-33-44-55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(422)
  })

  it('x-isoOffset: rejects datetime without timezone', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(422)
  })

  it('x-isoLocal: accepts datetime without timezone (opposite of x-isoOffset)', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(200)
  })
})

describe('README — Branded Types', () => {
  it('accepts a valid Cat payload', async () => {
    const res = await app.request('/branded', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Tama' }),
    })
    expect(res.status).toBe(200)
  })

  it('rejects when required name is missing', async () => {
    const res = await app.request('/branded', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
  })
})

// ────────────────────────────────────────────────────────────
// Thicker coverage — multiple cases per x-* extension
// ────────────────────────────────────────────────────────────

describe('Numeric — thick coverage', () => {
  it('accepts a fully valid payload', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 30,
        ratio: 0.5,
        price: 1.5,
        quantity: 10,
        exact: 42,
      }),
    })
    expect(res.status).toBe(200)
  })

  it('inclusive minimum: 0 is allowed, -1 is not', async () => {
    const ok = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 0,
        ratio: 0.5,
        price: 1.5,
        quantity: 10,
        exact: 42,
      }),
    })
    expect(ok.status).toBe(200)
    const bad = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: -1,
        ratio: 0.5,
        price: 1.5,
        quantity: 10,
        exact: 42,
      }),
    })
    const body = (await bad.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/age', detail: 'age must be >= 0' }])
  })

  it('inclusive maximum: 120 is allowed, 121 is not', async () => {
    const ok = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 120,
        ratio: 0.5,
        price: 1.5,
        quantity: 10,
        exact: 42,
      }),
    })
    expect(ok.status).toBe(200)
    const bad = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 121,
        ratio: 0.5,
        price: 1.5,
        quantity: 10,
        exact: 42,
      }),
    })
    const body = (await bad.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/age', detail: 'age must be <= 120' }])
  })

  it('exclusive minimum: 0 is rejected, 0.001 is allowed', async () => {
    const bad = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 30,
        ratio: 0,
        price: 1.5,
        quantity: 10,
        exact: 42,
      }),
    })
    const body = (await bad.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/ratio', detail: 'ratio must be > 0' }])
    const ok = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 30,
        ratio: 0.001,
        price: 1.5,
        quantity: 10,
        exact: 42,
      }),
    })
    expect(ok.status).toBe(200)
  })

  it('exclusive maximum: 1 is rejected, 0.999 is allowed', async () => {
    const bad = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 30,
        ratio: 1,
        price: 1.5,
        quantity: 10,
        exact: 42,
      }),
    })
    const body = (await bad.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/ratio', detail: 'ratio must be < 1' }])
    const ok = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 30,
        ratio: 0.999,
        price: 1.5,
        quantity: 10,
        exact: 42,
      }),
    })
    expect(ok.status).toBe(200)
  })

  it('multipleOf: 1.5 is allowed, 1.3 is not', async () => {
    const ok = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 30,
        ratio: 0.5,
        price: 1.5,
        quantity: 10,
        exact: 42,
      }),
    })
    expect(ok.status).toBe(200)
    const bad = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 30,
        ratio: 0.5,
        price: 1.3,
        quantity: 10,
        exact: 42,
      }),
    })
    const body = (await bad.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/price', detail: 'price must be a multiple of 0.5' }])
  })

  it('required vs type: distinct messages', async () => {
    const missing = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 30,
        ratio: 0.5,
        price: 1.5,
        quantity: undefined,
        exact: 42,
      }),
    })
    const missingBody = (await missing.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(missingBody.errors).toStrictEqual([{ pointer: '/quantity', detail: 'quantity is required' }])
    const wrong = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 30,
        ratio: 0.5,
        price: 1.5,
        quantity: 'not-int',
        exact: 42,
      }),
    })
    const wrongBody = (await wrong.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(wrongBody.errors).toStrictEqual([{ pointer: '/quantity', detail: 'quantity must be an integer' }])
  })

  it('const: only 42 is allowed', async () => {
    const bad = await app.request('/numeric', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        age: 30,
        ratio: 0.5,
        price: 1.5,
        quantity: 10,
        exact: 43,
      }),
    })
    const body = (await bad.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/exact', detail: 'exact must be 42' }])
  })
})

describe('Array — thick coverage', () => {
  it('accepts valid payload', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        tags: ['t1'],
        unique: [1, 2, 3],
        basket: [{ tier: 'premium' }],
      }),
    })
    expect(res.status).toBe(200)
  })

  it('minItems: empty array rejected', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        tags: [],
        unique: [1, 2, 3],
        basket: [{ tier: 'premium' }],
      }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/tags', detail: 'tags must have at least 1 item' }])
  })

  it('maxItems: 6-item array rejected', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        tags: ['1', '2', '3', '4', '5', '6'],
        unique: [1, 2, 3],
        basket: [{ tier: 'premium' }],
      }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/tags', detail: 'tags must have at most 5 items' }])
  })

  it('boundary: 1 item ok, 5 items ok', async () => {
    const one = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        tags: ['x'],
        unique: [1, 2, 3],
        basket: [{ tier: 'premium' }],
      }),
    })
    expect(one.status).toBe(200)
    const five = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        tags: ['1', '2', '3', '4', '5'],
        unique: [1, 2, 3],
        basket: [{ tier: 'premium' }],
      }),
    })
    expect(five.status).toBe(200)
  })

  it('uniqueItems: duplicates rejected', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        tags: ['t1'],
        unique: [1, 1],
        basket: [{ tier: 'premium' }],
      }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/unique', detail: 'unique must contain distinct integers' }])
  })

  it('minContains: 0 premiums rejected', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        tags: ['t1'],
        unique: [1, 2, 3],
        basket: [{ tier: 'basic' }],
      }),
    })
    const body = (await res.json()) as { errors?: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors?.some((e) => e.detail === 'basket must contain at least 1 premium')).toBe(true)
  })

  it('maxContains: 4 premiums rejected', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        tags: ['t1'],
        unique: [1, 2, 3],
        basket: [
          { tier: 'premium' },
          { tier: 'premium' },
          { tier: 'premium' },
          { tier: 'premium' },
        ],
      }),
    })
    const body = (await res.json()) as { errors?: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors?.some((e) => e.detail === 'basket must contain at most 3 premium')).toBe(true)
  })

  it('contains range: 2-3 premiums ok', async () => {
    const two = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        tags: ['t1'],
        unique: [1, 2, 3],
        basket: [{ tier: 'premium' }, { tier: 'premium' }],
      }),
    })
    expect(two.status).toBe(200)
    const three = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        tags: ['t1'],
        unique: [1, 2, 3],
        basket: [{ tier: 'premium' }, { tier: 'premium' }, { tier: 'premium' }],
      }),
    })
    expect(three.status).toBe(200)
  })
})

describe('Object — thick coverage', () => {
  it('accepts valid payload', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: {},
      }),
    })
    expect(res.status).toBe(200)
  })

  it('minProperties: empty profile rejected', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        profile: {},
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: {},
      }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/profile', detail: 'profile must have at least 1 property' }])
  })

  it('maxProperties: 4-key profile rejected', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1', b: '2', c: '3', d: '4' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: {},
      }),
    })
    const body = (await res.json()) as { errors?: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors?.some((e) => e.detail === 'profile contains an unknown key')).toBe(true)
  })

  it('additionalProperties: unknown key rejected', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1', extra: 'x' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: {},
      }),
    })
    const body = (await res.json()) as { errors?: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors?.some((e) => e.detail === 'profile contains an unknown key')).toBe(true)
  })

  it('propertyNames: invalid key shape rejected', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1' },
        namespace: { Invalid: 'x' },
        dependent: {},
      }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([
      { pointer: '/namespace', detail: 'keys must start lowercase letter + [a-z0-9_]' },
    ])
  })

  it('patternProperties: x_ key with non-string rejected', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1' },
        namespace: { x_one: 42 },
        dependent: {},
      }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/namespace', detail: 'x_ keys must be strings' }])
  })

  it('dependentRequired: cc without billing rejected', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: { cc: '4111111111111111' },
      }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/dependent', detail: 'billing required when cc provided' }])
  })

  it('dependentSchemas: cc with wrong format rejected', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: { cc: '123', billing: '00000' },
      }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/dependent', detail: 'cc must be 16 digits' }])
  })

  it('dependent OK when neither key present', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: {},
      }),
    })
    expect(res.status).toBe(200)
  })
})

describe('Combinators — thick coverage', () => {
  it('accepts valid payload', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'hello',
        exclusive: 'world',
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(200)
  })

  it('allOf: missing required from one branch fires x-allOf-message', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro' },
        picked: 'hello',
        exclusive: 'world',
        banned: 'allowed',
      }),
    })
    const body = (await res.json()) as { errors?: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors?.some((e) => e.detail === 'merged validation failed')).toBe(true)
  })

  it('anyOf: boolean rejected (neither string nor integer)', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: true,
        exclusive: 'world',
        banned: 'allowed',
      }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/picked', detail: 'picked must be string or integer' }])
  })

  it('anyOf: string ok', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'x',
        exclusive: 'world',
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(200)
  })

  it('anyOf: integer ok', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 7,
        exclusive: 'world',
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(200)
  })

  it('oneOf: distinct types accepted independently', async () => {
    const str = await app.request('/combinators', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'hello',
        exclusive: 'a',
        banned: 'allowed',
      }),
    })
    expect(str.status).toBe(200)
    const num = await app.request('/combinators', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'hello',
        exclusive: 1,
        banned: 'allowed',
      }),
    })
    expect(num.status).toBe(200)
  })

  it('oneOf: boolean rejected', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'hello',
        exclusive: true,
        banned: 'allowed',
      }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/exclusive', detail: 'exclusive must match exactly one type' }])
  })

  it('not: "forbidden" rejected', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'hello',
        exclusive: 'world',
        banned: 'forbidden',
      }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/banned', detail: 'banned cannot be "forbidden"' }])
  })
})

describe('Enums — thick coverage', () => {
  it('accepts valid payload', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ role: 'admin', priority: 2, accepted: true }),
    })
    expect(res.status).toBe(200)
  })

  it('x-enum-message: rejects role not in enum', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ role: 'guest', priority: 2, accepted: true }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/role', detail: 'role must be admin / editor / viewer' }])
  })

  it('integer enum: 4 rejected', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ role: 'admin', priority: 4, accepted: true }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/priority', detail: 'priority must be 1, 2, or 3' }])
  })

  it('boolean enum: false rejected', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ role: 'admin', priority: 2, accepted: false }),
    })
    const body = (await res.json()) as { errors: ReadonlyArray<{ pointer: string; detail: string }> }
    expect(body.errors).toStrictEqual([{ pointer: '/accepted', detail: 'accepted must be true' }])
  })

  it('accepts all enum members', async () => {
    for (const role of ['admin', 'editor', 'viewer']) {
      const res = await app.request('/enums', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ role, priority: 2, accepted: true }),
      })
      expect(res.status).toBe(200)
    }
    for (const priority of [1, 2, 3]) {
      const res = await app.request('/enums', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ role: 'admin', priority, accepted: true }),
      })
      expect(res.status).toBe(200)
    }
  })
})
