import { describe, expect, it } from 'vitest'
import app from './app.ts'

// ============================================================
// Comprehensive validation test: all Zod patterns with x-* extensions
// Source: main.tsp (TypeSpec) → openapi.yaml → generated.ts
// ============================================================

// ── /users endpoint ─────────────────────────────────────────
describe('POST /users', () => {
  it('accepts valid input', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(201)
    const body = (await res.json()) as { name: string }
    expect(body.name).toBe('taro')
  })

  // ── string: x-minimum-message / x-maximum-message ───────
  describe('string min/max (x-minimum/x-maximum-message)', () => {
    it('rejects short name with x-minimum-message', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'a',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/name', detail: 'Name must be at least 2 characters' },
      ])
    })

    it('rejects too-long name with x-maximum-message', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'a'.repeat(51),
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/name', detail: 'Name must be at most 50 characters' },
      ])
    })
  })

  // ── string: x-size-message (fixed length) ────────────────
  describe('string fixed length (x-size-message)', () => {
    it('rejects wrong-length code', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          code: 'abc',
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/code', detail: 'Code must be exactly 6 characters' },
      ])
    })

    it('accepts correct-length code', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          code: 'ABC123',
        }),
      })
      expect(res.status).toBe(201)
    })
  })

  // ── string: x-error-message on format ────────────────────
  describe('format validators (x-error-message)', () => {
    it('rejects invalid email', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'bad',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/email', detail: 'Invalid email address' }])
    })

    it('rejects invalid uuid', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          requestId: 'not-a-uuid',
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/requestId', detail: 'Invalid UUID format' }])
    })

    it('rejects invalid url', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          website: 'not-a-url',
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/website', detail: 'Invalid URL' }])
    })
  })

  // ── string: x-pattern-message ────────────────────────────
  describe('regex pattern (x-pattern-message)', () => {
    it('rejects weak password', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          password: 'weak',
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/password', detail: 'Password must have uppercase + number, min 8 chars' },
      ])
    })

    it('accepts strong password', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          password: 'Strong1Password',
        }),
      })
      expect(res.status).toBe(201)
    })
  })

  // ── string: x-error-message on base type ─────────────────
  describe('base string (x-error-message)', () => {
    it('rejects non-string nickname', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          nickname: 123,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/nickname', detail: 'Nickname must be a string' },
      ])
    })
  })

  // ── string: arrow function x-error-message (Zod v4) ─────
  describe('arrow function error (x-error-message)', () => {
    it('rejects non-string dynamicField with arrow function message', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          dynamicField: 999,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/dynamicField', detail: 'dynamic validation error' },
      ])
    })
  })

  // ── enum: x-error-message ────────────────────────────────
  describe('enum (x-error-message)', () => {
    it('rejects invalid role', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'superadmin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/role', detail: 'Role must be admin, user, or guest' },
      ])
    })
  })

  // ── single enum / literal: x-error-message ───────────────
  describe('literal (x-error-message)', () => {
    it('rejects wrong status', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'inactive',
          tags: ['dev'],
          score: 95.5,
          level: 50,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/status', detail: 'Status must be active' }])
    })
  })

  // ── integer: x-minimum-message / x-maximum-message ───────
  describe('integer min/max (x-minimum/x-maximum-message)', () => {
    it('rejects negative age', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          age: -1,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/age', detail: 'Age must be >= 0' }])
    })

    it('rejects age over 150', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          age: 200,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/age', detail: 'Age must be <= 150' }])
    })
  })

  // ── number: x-error-message on base type ─────────────────
  describe('number base (x-error-message)', () => {
    it('rejects non-number score', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 'abc',
          level: 50,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/score', detail: 'Score must be a number' }])
    })
  })

  // ── integer: arrow function x-error-message (Zod v4) ────
  describe('integer arrow function error (x-error-message)', () => {
    it('rejects non-integer level with arrow function message', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 'abc',
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/level', detail: 'Level must be an integer' }])
    })

    it('rejects level below minimum', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 0,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/level', detail: 'Level must be >= 1' }])
    })

    it('rejects level above maximum', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 101,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/level', detail: 'Level must be <= 100' }])
    })
  })

  // ── number: multipleOf + x-error-message ─────────────────
  describe('multipleOf (x-error-message)', () => {
    it('rejects non-multiple rating', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          rating: 3.3,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/rating', detail: 'Rating must be a multiple of 0.5' },
      ])
    })

    it('accepts valid multiple', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          rating: 4.5,
        }),
      })
      expect(res.status).toBe(201)
    })
  })

  // ── boolean: x-error-message ─────────────────────────────
  describe('boolean (x-error-message)', () => {
    it('rejects non-boolean agreed', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          agreed: 'yes',
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/agreed', detail: 'Must be a boolean' }])
    })
  })

  // ── array: x-minimum-message / x-maximum-message ─────────
  describe('array min/max (x-minimum/x-maximum-message)', () => {
    it('rejects empty tags', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: [],
          score: 95.5,
          level: 50,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/tags', detail: 'At least 1 tag required' }])
    })

    it('rejects too many tags', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
          score: 95.5,
          level: 50,
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/tags', detail: 'At most 10 tags allowed' }])
    })
  })

  // ── array: x-size-message (fixed length) ─────────────────
  describe('array fixed length (x-size-message)', () => {
    it('rejects wrong-length coordinates', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          coordinates: [1.0],
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/coordinates', detail: 'Must have exactly 2 coordinates' },
      ])
    })

    it('accepts correct-length coordinates', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          coordinates: [35.68, 139.69],
        }),
      })
      expect(res.status).toBe(201)
    })
  })

  // ── array: x-error-message on constructor ────────────────
  describe('array constructor (x-error-message)', () => {
    it('rejects non-array favoriteNumbers', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          favoriteNumbers: 'not-array',
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/favoriteNumbers', detail: 'Must be an array' },
      ])
    })
  })

  // ── null: x-error-message ────────────────────────────────
  describe('null (x-error-message)', () => {
    it('rejects non-null deletedAt', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          deletedAt: '2024-01-01',
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/deletedAt', detail: 'Must be null' }])
    })

    it('accepts null deletedAt', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'taro',
          email: 'taro@example.com',
          role: 'admin',
          status: 'active',
          tags: ['dev'],
          score: 95.5,
          level: 50,
          deletedAt: null,
        }),
      })
      expect(res.status).toBe(201)
    })
  })

  // ── multiple violations ──────────────────────────────────
  describe('multiple violations', () => {
    it('returns all errors at once', async () => {
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'a',
          email: 'bad',
          role: 'x',
          status: 'x',
          tags: [],
          score: 'x',
          level: 'x',
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors.length).toBeGreaterThanOrEqual(7)
    })
  })
})

// ── /products endpoint (const/literal) ──────────────────────
describe('POST /products', () => {
  it('accepts valid product', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product', priority: 1 }),
    })
    expect(res.status).toBe(201)
  })

  it('rejects wrong const type', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'service', priority: 1 }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
    expect(body.errors).toStrictEqual([{ pointer: '/type', detail: 'Type must be "product"' }])
  })

  it('rejects wrong const priority', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product', priority: 2 }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
    expect(body.errors).toStrictEqual([{ pointer: '/priority', detail: 'Priority must be 1' }])
  })

  it('rejects wrong const enabled', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product', priority: 1, enabled: false }),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
    expect(body.errors).toStrictEqual([{ pointer: '/enabled', detail: 'Must be true' }])
  })
})

// ── /settings endpoint (object constraints) ─────────────────
describe('PUT /settings', () => {
  it('accepts valid settings', async () => {
    const res = await app.request('/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: 'dark' }),
    })
    expect(res.status).toBe(200)
  })

  it('rejects empty object with x-minimum-message', async () => {
    const res = await app.request('/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
    expect(body.errors).toStrictEqual([{ pointer: '/', detail: 'At least 1 setting required' }])
  })
})

// ── /orders endpoint (nested object / object mismatch) ──────
describe('POST /orders', () => {
  it('accepts valid order with nested address', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 3,
        address: {
          street: '1-2-3 Shibuya',
          city: 'Tokyo',
          zip: '150-0002',
        },
      }),
    })
    expect(res.status).toBe(201)
    const body = (await res.json()) as { productName: string }
    expect(body.productName).toBe('Widget')
  })

  // ── object mismatch: wrong type for nested object ────────
  describe('object mismatch', () => {
    it('rejects string instead of address object', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: 'Tokyo',
        }),
      })
      expect(res.status).toBe(422)
    })

    it('rejects number instead of address object', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: 12345,
        }),
      })
      expect(res.status).toBe(422)
    })

    it('rejects array instead of address object', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: ['Tokyo', '150-0002'],
        }),
      })
      expect(res.status).toBe(422)
    })

    it('rejects null instead of address object', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: null,
        }),
      })
      expect(res.status).toBe(422)
    })

    it('rejects empty object (missing required fields)', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: {},
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors.length).toBeGreaterThanOrEqual(3)
    })

    it('rejects partial object (missing city and zip)', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: { street: '1-2-3 Shibuya' },
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors.length).toBeGreaterThanOrEqual(2)
    })

    it('rejects object with wrong field types', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: { street: 123, city: true, zip: 1500002 },
        }),
      })
      expect(res.status).toBe(422)
    })

    it('rejects object with extra fields but invalid required fields', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: { street: '', city: '', zip: 'invalid', country: 'Japan' },
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { detail: string }[] }
      const details = body.errors.map((e) => e.detail)
      expect(details).toContain('Street is required')
      expect(details).toContain('City is required')
      expect(details).toContain('Zip code must be format: 000-0000')
    })
  })

  // ── nested object field validation ────────────────────────
  describe('nested address field validation', () => {
    it('rejects empty street with x-minimum-message', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: {
            street: '',
            city: 'Tokyo',
            zip: '150-0002',
          },
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/address/street', detail: 'Street is required' },
      ])
    })

    it('rejects empty city with x-minimum-message', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: {
            street: '1-2-3 Shibuya',
            city: '',
            zip: '150-0002',
          },
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/address/city', detail: 'City is required' }])
    })

    it('rejects invalid zip format with x-pattern-message', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: {
            street: '1-2-3 Shibuya',
            city: 'Tokyo',
            zip: '1234567',
          },
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/address/zip', detail: 'Zip code must be format: 000-0000' },
      ])
    })

    it('returns all nested errors for fully invalid address', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 3,
          address: { street: '', city: '', zip: 'bad' },
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/address/street', detail: 'Street is required' },
        { pointer: '/address/city', detail: 'City is required' },
        { pointer: '/address/zip', detail: 'Zip code must be format: 000-0000' },
      ])
    })
  })

  // ── top-level field validation ────────────────────────────
  describe('top-level field validation', () => {
    it('rejects empty productName with x-minimum-message', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: '',
          quantity: 3,
          address: {
            street: '1-2-3 Shibuya',
            city: 'Tokyo',
            zip: '150-0002',
          },
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/productName', detail: 'Product name is required' },
      ])
    })

    it('rejects too-long productName with x-maximum-message', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'a'.repeat(101),
          quantity: 3,
          address: {
            street: '1-2-3 Shibuya',
            city: 'Tokyo',
            zip: '150-0002',
          },
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/productName', detail: 'Product name must be at most 100 characters' },
      ])
    })

    it('rejects zero quantity with x-minimum-message', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'Widget',
          quantity: 0,
          address: {
            street: '1-2-3 Shibuya',
            city: 'Tokyo',
            zip: '150-0002',
          },
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([{ pointer: '/quantity', detail: 'Quantity must be >= 1' }])
    })
  })

  // ── combined: top-level + nested errors ───────────────────
  describe('combined errors (top-level + nested)', () => {
    it('returns errors from both levels', async () => {
      const res = await app.request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: '',
          quantity: 0,
          address: { street: '', city: '', zip: 'bad' },
        }),
      })
      expect(res.status).toBe(422)
      const body = (await res.json()) as { errors: { pointer: string; detail: string }[] }
      expect(body.errors).toStrictEqual([
        { pointer: '/productName', detail: 'Product name is required' },
        { pointer: '/quantity', detail: 'Quantity must be >= 1' },
        { pointer: '/address/street', detail: 'Street is required' },
        { pointer: '/address/city', detail: 'City is required' },
        { pointer: '/address/zip', detail: 'Zip code must be format: 000-0000' },
      ])
    })
  })
})
