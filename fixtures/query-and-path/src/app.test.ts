import { describe, expect, it } from 'vitest'
import app from './app.ts'

// ============================================================
// Verifies that hono-takibi generated code coerces wire-format
// strings (path params, query params) into the schema-declared
// types: integer / number / boolean / arrays thereof.
//
// Wire reality:
//   GET /items/integer/42       → "42"   (string on the wire)
//   GET /search?limit=10&active=true → "10", "true"
//
// Schema expectation:
//   id     : number
//   limit  : number
//   active : boolean
//   ids[]  : number[]
//
// Each handler echoes back the value AND `typeof value`, so the
// test asserts BOTH the parsed value and the runtime type.
// ============================================================

const get = (path: string) => app.request(path)

// ── Query parameters ────────────────────────────────────────
// Query is the documented happy path: hono-takibi inserts
// z.coerce.number() / z.stringbool() so values arrive coerced.
describe('Query parameter coercion', () => {
  it('coerces ?limit=10&price=3.14&active=true into number/number/boolean', async () => {
    const res = await get('/search?q=hello&limit=10&price=3.14&active=true')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toStrictEqual({
      q: 'hello',
      qType: 'string',
      limit: 10,
      limitType: 'number',
      price: 3.14,
      priceType: 'number',
      active: true,
      activeType: 'boolean',
    })
  })

  it('coerces active=false to boolean false', async () => {
    const res = await get('/search?q=x&limit=1&price=0&active=false')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.active).toBe(false)
    expect(body.activeType).toBe('boolean')
  })

  it('rejects non-numeric limit with 422', async () => {
    const res = await get('/search?q=x&limit=abc&price=0&active=true')
    expect(res.status).toBe(422)
  })

  it('rejects non-boolean active with 422', async () => {
    const res = await get('/search?q=x&limit=1&price=0&active=maybe')
    expect(res.status).toBe(422)
  })

  it('applies defaults when optional query is omitted', async () => {
    const res = await get('/search/optional')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toStrictEqual({
      limit: 10,
      limitType: 'number',
      active: true,
      activeType: 'boolean',
    })
  })

  it('coerces explode-array ?ids=1&ids=2 into number[]', async () => {
    const res = await get('/search/array?ids=1&ids=2&ids=3&flags=true&flags=false')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toStrictEqual({
      ids: [1, 2, 3],
      idsTypes: ['number', 'number', 'number'],
      flags: [true, false],
      flagsTypes: ['boolean', 'boolean'],
    })
  })
})

// ── Path parameters ─────────────────────────────────────────
// Path params arrive as strings on the wire just like query params.
// hono-takibi wraps in:path schemas in z.coerce / z.stringbool the
// same way it does for in:query, so values arrive coerced.
describe('Path parameter coercion', () => {
  it('coerces /items/integer/42 into number', async () => {
    const res = await get('/items/integer/42')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toStrictEqual({ id: 42, type: 'number' })
  })

  it('coerces /items/int32/2147483647 into number', async () => {
    const res = await get('/items/int32/2147483647')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toStrictEqual({ id: 2147483647, type: 'number' })
  })

  it('coerces /items/int64/9007199254740993 into bigint', async () => {
    const res = await get('/items/int64/9007199254740993')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toStrictEqual({ id: '9007199254740993', type: 'bigint' })
  })

  it('coerces /items/number/3.14 into number', async () => {
    const res = await get('/items/number/3.14')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toStrictEqual({ value: 3.14, type: 'number' })
  })

  it('coerces /items/boolean/true into boolean', async () => {
    const res = await get('/items/boolean/true')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toStrictEqual({ flag: true, type: 'boolean' })
  })

  it('coerces /items/boolean/false into boolean', async () => {
    const res = await get('/items/boolean/false')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toStrictEqual({ flag: false, type: 'boolean' })
  })

  it('coerces multiple path segments /items/mixed/7/sub/true', async () => {
    const res = await get('/items/mixed/7/sub/true')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toStrictEqual({ id: 7, idType: 'number', flag: true, flagType: 'boolean' })
  })

  it('rejects /items/integer/abc with 422', async () => {
    const res = await get('/items/integer/abc')
    expect(res.status).toBe(422)
  })

  it('rejects /items/boolean/maybe with 422', async () => {
    const res = await get('/items/boolean/maybe')
    expect(res.status).toBe(422)
  })
})
