import { describe, expect, it } from 'vitest'
import app from './app.ts'

// ============================================================
// Comprehensive validation test: all Zod patterns with x-* extensions
// Source: main.tsp (TypeSpec) → openapi.yaml → generated.ts
// ============================================================

const validUser = {
  name: 'taro',
  email: 'taro@example.com',
  role: 'admin' as const,
  status: 'active' as const,
  tags: ['dev'],
  score: 95.5,
  level: 50,
}

function postUsers(body: Record<string, unknown>) {
  return app.request('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function postProducts(body: Record<string, unknown>) {
  return app.request('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function putSettings(body: Record<string, unknown>) {
  return app.request('/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function postOrders(body: Record<string, unknown>) {
  return app.request('/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

// ── /users endpoint ─────────────────────────────────────────
describe('POST /users', () => {
  it('accepts valid input', async () => {
    const res = await postUsers(validUser)
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.name).toBe('taro')
  })

  // ── string: x-minimum-message / x-maximum-message ───────
  describe('string min/max (x-minimum/x-maximum-message)', () => {
    it('rejects short name with x-minimum-message', async () => {
      const res = await postUsers({ ...validUser, name: 'a' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/name', detail: 'Name must be at least 2 characters' },
      ])
    })

    it('rejects too-long name with x-maximum-message', async () => {
      const res = await postUsers({ ...validUser, name: 'a'.repeat(51) })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/name', detail: 'Name must be at most 50 characters' },
      ])
    })
  })

  // ── string: x-size-message (fixed length) ────────────────
  describe('string fixed length (x-size-message)', () => {
    it('rejects wrong-length code', async () => {
      const res = await postUsers({ ...validUser, code: 'abc' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/code', detail: 'Code must be exactly 6 characters' },
      ])
    })

    it('accepts correct-length code', async () => {
      const res = await postUsers({ ...validUser, code: 'ABC123' })
      expect(res.status).toBe(201)
    })
  })

  // ── string: x-error-message on format ────────────────────
  describe('format validators (x-error-message)', () => {
    it('rejects invalid email', async () => {
      const res = await postUsers({ ...validUser, email: 'bad' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/email', detail: 'Invalid email address' }])
    })

    it('rejects invalid uuid', async () => {
      const res = await postUsers({ ...validUser, requestId: 'not-a-uuid' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/requestId', detail: 'Invalid UUID format' }])
    })

    it('rejects invalid url', async () => {
      const res = await postUsers({ ...validUser, website: 'not-a-url' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/website', detail: 'Invalid URL' }])
    })
  })

  // ── string: x-pattern-message ────────────────────────────
  describe('regex pattern (x-pattern-message)', () => {
    it('rejects weak password', async () => {
      const res = await postUsers({ ...validUser, password: 'weak' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/password', detail: 'Password must have uppercase + number, min 8 chars' },
      ])
    })

    it('accepts strong password', async () => {
      const res = await postUsers({ ...validUser, password: 'Strong1Password' })
      expect(res.status).toBe(201)
    })
  })

  // ── string: x-error-message on base type ─────────────────
  describe('base string (x-error-message)', () => {
    it('rejects non-string nickname', async () => {
      const res = await postUsers({ ...validUser, nickname: 123 })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/nickname', detail: 'Nickname must be a string' },
      ])
    })
  })

  // ── string: arrow function x-error-message (Zod v4) ─────
  describe('arrow function error (x-error-message)', () => {
    it('rejects non-string dynamicField with arrow function message', async () => {
      const res = await postUsers({ ...validUser, dynamicField: 999 })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/dynamicField', detail: 'dynamic validation error' },
      ])
    })
  })

  // ── enum: x-error-message ────────────────────────────────
  describe('enum (x-error-message)', () => {
    it('rejects invalid role', async () => {
      const res = await postUsers({ ...validUser, role: 'superadmin' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/role', detail: 'Role must be admin, user, or guest' },
      ])
    })
  })

  // ── single enum / literal: x-error-message ───────────────
  describe('literal (x-error-message)', () => {
    it('rejects wrong status', async () => {
      const res = await postUsers({ ...validUser, status: 'inactive' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/status', detail: 'Status must be active' }])
    })
  })

  // ── integer: x-minimum-message / x-maximum-message ───────
  describe('integer min/max (x-minimum/x-maximum-message)', () => {
    it('rejects negative age', async () => {
      const res = await postUsers({ ...validUser, age: -1 })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/age', detail: 'Age must be >= 0' }])
    })

    it('rejects age over 150', async () => {
      const res = await postUsers({ ...validUser, age: 200 })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/age', detail: 'Age must be <= 150' }])
    })
  })

  // ── number: x-error-message on base type ─────────────────
  describe('number base (x-error-message)', () => {
    it('rejects non-number score', async () => {
      const res = await postUsers({ ...validUser, score: 'abc' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/score', detail: 'Score must be a number' }])
    })
  })

  // ── integer: arrow function x-error-message (Zod v4) ────
  describe('integer arrow function error (x-error-message)', () => {
    it('rejects non-integer level with arrow function message', async () => {
      const res = await postUsers({ ...validUser, level: 'abc' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/level', detail: 'Level must be an integer' }])
    })

    it('rejects level below minimum', async () => {
      const res = await postUsers({ ...validUser, level: 0 })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/level', detail: 'Level must be >= 1' }])
    })

    it('rejects level above maximum', async () => {
      const res = await postUsers({ ...validUser, level: 101 })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/level', detail: 'Level must be <= 100' }])
    })
  })

  // ── number: multipleOf + x-error-message ─────────────────
  describe('multipleOf (x-error-message)', () => {
    it('rejects non-multiple rating', async () => {
      const res = await postUsers({ ...validUser, rating: 3.3 })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/rating', detail: 'Rating must be a multiple of 0.5' },
      ])
    })

    it('accepts valid multiple', async () => {
      const res = await postUsers({ ...validUser, rating: 4.5 })
      expect(res.status).toBe(201)
    })
  })

  // ── boolean: x-error-message ─────────────────────────────
  describe('boolean (x-error-message)', () => {
    it('rejects non-boolean agreed', async () => {
      const res = await postUsers({ ...validUser, agreed: 'yes' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/agreed', detail: 'Must be a boolean' }])
    })
  })

  // ── array: x-minimum-message / x-maximum-message ─────────
  describe('array min/max (x-minimum/x-maximum-message)', () => {
    it('rejects empty tags', async () => {
      const res = await postUsers({ ...validUser, tags: [] })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/tags', detail: 'At least 1 tag required' }])
    })

    it('rejects too many tags', async () => {
      const res = await postUsers({
        ...validUser,
        tags: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
      })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/tags', detail: 'At most 10 tags allowed' }])
    })
  })

  // ── array: x-size-message (fixed length) ─────────────────
  describe('array fixed length (x-size-message)', () => {
    it('rejects wrong-length coordinates', async () => {
      const res = await postUsers({ ...validUser, coordinates: [1.0] })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/coordinates', detail: 'Must have exactly 2 coordinates' },
      ])
    })

    it('accepts correct-length coordinates', async () => {
      const res = await postUsers({ ...validUser, coordinates: [35.68, 139.69] })
      expect(res.status).toBe(201)
    })
  })

  // ── array: x-error-message on constructor ────────────────
  describe('array constructor (x-error-message)', () => {
    it('rejects non-array favoriteNumbers', async () => {
      const res = await postUsers({ ...validUser, favoriteNumbers: 'not-array' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/favoriteNumbers', detail: 'Must be an array' },
      ])
    })
  })

  // ── null: x-error-message ────────────────────────────────
  describe('null (x-error-message)', () => {
    it('rejects non-null deletedAt', async () => {
      const res = await postUsers({ ...validUser, deletedAt: '2024-01-01' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/deletedAt', detail: 'Must be null' }])
    })

    it('accepts null deletedAt', async () => {
      const res = await postUsers({ ...validUser, deletedAt: null })
      expect(res.status).toBe(201)
    })
  })

  // ── multiple violations ──────────────────────────────────
  describe('multiple violations', () => {
    it('returns all errors at once', async () => {
      const res = await postUsers({
        name: 'a',
        email: 'bad',
        role: 'x',
        status: 'x',
        tags: [],
        score: 'x',
        level: 'x',
      })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors.length).toBeGreaterThanOrEqual(7)
    })
  })
})

// ── /products endpoint (const/literal) ──────────────────────
describe('POST /products', () => {
  it('accepts valid product', async () => {
    const res = await postProducts({ type: 'product', priority: 1 })
    expect(res.status).toBe(201)
  })

  it('rejects wrong const type', async () => {
    const res = await postProducts({ type: 'service', priority: 1 })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/type', detail: 'Type must be "product"' }])
  })

  it('rejects wrong const priority', async () => {
    const res = await postProducts({ type: 'product', priority: 2 })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/priority', detail: 'Priority must be 1' }])
  })

  it('rejects wrong const enabled', async () => {
    const res = await postProducts({ type: 'product', priority: 1, enabled: false })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/enabled', detail: 'Must be true' }])
  })
})

// ── /settings endpoint (object constraints) ─────────────────
describe('PUT /settings', () => {
  it('accepts valid settings', async () => {
    const res = await putSettings({ theme: 'dark' })
    expect(res.status).toBe(200)
  })

  it('rejects empty object with x-minimum-message', async () => {
    const res = await putSettings({})
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/', detail: 'At least 1 setting required' }])
  })
})

// ── /orders endpoint (nested object / object mismatch) ──────
describe('POST /orders', () => {
  const validOrder = {
    productName: 'Widget',
    quantity: 3,
    address: {
      street: '1-2-3 Shibuya',
      city: 'Tokyo',
      zip: '150-0002',
    },
  }

  it('accepts valid order with nested address', async () => {
    const res = await postOrders(validOrder)
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.productName).toBe('Widget')
  })

  // ── object mismatch: wrong type for nested object ────────
  describe('object mismatch', () => {
    it('rejects string instead of address object', async () => {
      const res = await postOrders({ ...validOrder, address: 'Tokyo' })
      expect(res.status).toBe(422)
    })

    it('rejects number instead of address object', async () => {
      const res = await postOrders({ ...validOrder, address: 12345 })
      expect(res.status).toBe(422)
    })

    it('rejects array instead of address object', async () => {
      const res = await postOrders({ ...validOrder, address: ['Tokyo', '150-0002'] })
      expect(res.status).toBe(422)
    })

    it('rejects null instead of address object', async () => {
      const res = await postOrders({ ...validOrder, address: null })
      expect(res.status).toBe(422)
    })

    it('rejects empty object (missing required fields)', async () => {
      const res = await postOrders({ ...validOrder, address: {} })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors.length).toBeGreaterThanOrEqual(3)
    })

    it('rejects partial object (missing city and zip)', async () => {
      const res = await postOrders({
        ...validOrder,
        address: { street: '1-2-3 Shibuya' },
      })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors.length).toBeGreaterThanOrEqual(2)
    })

    it('rejects object with wrong field types', async () => {
      const res = await postOrders({
        ...validOrder,
        address: { street: 123, city: true, zip: 1500002 },
      })
      expect(res.status).toBe(422)
    })

    it('rejects object with extra fields but invalid required fields', async () => {
      const res = await postOrders({
        ...validOrder,
        address: { street: '', city: '', zip: 'invalid', country: 'Japan' },
      })
      expect(res.status).toBe(422)
      const body = await res.json()
      const details = body.errors.map((e: { detail: string }) => e.detail)
      expect(details).toContain('Street is required')
      expect(details).toContain('City is required')
      expect(details).toContain('Zip code must be format: 000-0000')
    })
  })

  // ── nested object field validation ────────────────────────
  describe('nested address field validation', () => {
    it('rejects empty street with x-minimum-message', async () => {
      const res = await postOrders({
        ...validOrder,
        address: { ...validOrder.address, street: '' },
      })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/address/street', detail: 'Street is required' },
      ])
    })

    it('rejects empty city with x-minimum-message', async () => {
      const res = await postOrders({
        ...validOrder,
        address: { ...validOrder.address, city: '' },
      })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/address/city', detail: 'City is required' }])
    })

    it('rejects invalid zip format with x-pattern-message', async () => {
      const res = await postOrders({
        ...validOrder,
        address: { ...validOrder.address, zip: '1234567' },
      })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/address/zip', detail: 'Zip code must be format: 000-0000' },
      ])
    })

    it('returns all nested errors for fully invalid address', async () => {
      const res = await postOrders({
        ...validOrder,
        address: { street: '', city: '', zip: 'bad' },
      })
      expect(res.status).toBe(422)
      const body = await res.json()
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
      const res = await postOrders({ ...validOrder, productName: '' })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/productName', detail: 'Product name is required' },
      ])
    })

    it('rejects too-long productName with x-maximum-message', async () => {
      const res = await postOrders({ ...validOrder, productName: 'a'.repeat(101) })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([
        { pointer: '/productName', detail: 'Product name must be at most 100 characters' },
      ])
    })

    it('rejects zero quantity with x-minimum-message', async () => {
      const res = await postOrders({ ...validOrder, quantity: 0 })
      expect(res.status).toBe(422)
      const body = await res.json()
      expect(body.errors).toStrictEqual([{ pointer: '/quantity', detail: 'Quantity must be >= 1' }])
    })
  })

  // ── combined: top-level + nested errors ───────────────────
  describe('combined errors (top-level + nested)', () => {
    it('returns errors from both levels', async () => {
      const res = await postOrders({
        productName: '',
        quantity: 0,
        address: { street: '', city: '', zip: 'bad' },
      })
      expect(res.status).toBe(422)
      const body = await res.json()
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
