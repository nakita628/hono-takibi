import { describe, expect, it } from 'vitest'
import app from './app.ts'

const post = (body: unknown) => ({
  method: 'POST' as const,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

// ============================================================
// propertyNames.pattern
// Generated: .refine((o) => Object.keys(o).every((k) => new RegExp("^[a-z_]+$").test(k)))
// Rejection: ZodError code:"custom", path:["keys"], message:"Invalid input"
// ============================================================
describe('propertyNames.pattern — GET /settings', () => {
  it('returns 200 for static response with valid keys', async () => {
    const res = await app.request('/settings')
    expect(res.status).toBe(200)
  })
})

describe('propertyNames.pattern — POST /config (keys field)', () => {
  it('accepts keys matching ^[a-z_]+$', async () => {
    const res = await app.request(
      '/config',
      post({ data: { hello: 'world' }, keys: { valid_key: 'value' } }),
    )
    expect(res.status).toBe(201)
  })

  it('rejects uppercase key with custom ZodError on path ["keys"]', async () => {
    const res = await app.request(
      '/config',
      post({ data: { hello: 'world' }, keys: { InvalidKey: 'value' } }),
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "custom"')
    expect(body.error.message).toContain('"keys"')
    expect(body.error.message).toContain('"message": "Invalid input"')
  })

  it('rejects hyphenated key with custom ZodError on path ["keys"]', async () => {
    const res = await app.request(
      '/config',
      post({ data: { hello: 'world' }, keys: { 'my-key': 'value' } }),
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "custom"')
    expect(body.error.message).toContain('"keys"')
    expect(body.error.message).toContain('"message": "Invalid input"')
  })

  it('rejects number-prefixed key with custom ZodError on path ["keys"]', async () => {
    const res = await app.request(
      '/config',
      post({ data: { hello: 'world' }, keys: { '123abc': 'value' } }),
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "custom"')
    expect(body.error.message).toContain('"keys"')
  })

  it('accepts empty object (no keys to violate pattern)', async () => {
    const res = await app.request('/config', post({ data: { hello: 'world' }, keys: {} }))
    expect(res.status).toBe(201)
  })
})

// ============================================================
// patternProperties on z.record(z.string(), z.string())
// Generated: .refine((o) => Object.entries(o).every(
//   ([k, v]) => !new RegExp("^x-").test(k) || z.string().safeParse(v).success))
//
// The record base schema enforces all values are strings.
// Non-string values are rejected by the record BEFORE the refine runs.
// Rejection: ZodError code:"invalid_type", path:["data","<key>"],
//            message:"Invalid input: expected string, received <type>"
// ============================================================
describe('patternProperties on record — POST /config (data field)', () => {
  it('accepts x- prefixed key with string value', async () => {
    const res = await app.request('/config', post({ data: { 'x-custom': 'string-value' } }))
    expect(res.status).toBe(201)
  })

  it('accepts non x- key with string value (pattern not matched, skip)', async () => {
    const res = await app.request('/config', post({ data: { normal: 'value' } }))
    expect(res.status).toBe(201)
  })

  it('rejects x- key with number — record rejects with invalid_type before refine', async () => {
    const res = await app.request('/config', post({ data: { 'x-num': 123 } }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "invalid_type"')
    expect(body.error.message).toContain('"x-num"')
    expect(body.error.message).toContain('expected string, received number')
  })

  it('accepts mixed x- and non-x- keys when all values are strings', async () => {
    const res = await app.request(
      '/config',
      post({ data: { 'x-vendor': 'ext', normal: 'value', 'x-version': '2' } }),
    )
    expect(res.status).toBe(201)
  })

  it('accepts empty data object', async () => {
    const res = await app.request('/config', post({ data: {} }))
    expect(res.status).toBe(201)
  })
})

// ============================================================
// patternProperties on z.looseObject({})
// Generated: .refine((o) => Object.entries(o).every(
//   ([k, v]) => !new RegExp("^X-Custom-").test(k) || z.string().safeParse(v).success))
//
// looseObject allows any extra properties with any type.
// The .refine() with .safeParse() is the ONLY validation for pattern-matched keys.
// Rejection: ZodError code:"custom", path:["headers"], message:"Invalid input"
// ============================================================
describe('patternProperties on looseObject — POST /config (headers field)', () => {
  it('accepts X-Custom- key with string value — safeParse succeeds', async () => {
    const res = await app.request(
      '/config',
      post({ data: { a: 'b' }, headers: { 'X-Custom-Id': 'abc123' } }),
    )
    expect(res.status).toBe(201)
  })

  it('rejects X-Custom- key with number — safeParse fails', async () => {
    const res = await app.request(
      '/config',
      post({ data: { a: 'b' }, headers: { 'X-Custom-Id': 42 } }),
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "custom"')
    expect(body.error.message).toContain('"headers"')
    expect(body.error.message).toContain('"message": "Invalid input"')
  })

  it('rejects X-Custom- key with boolean — safeParse fails', async () => {
    const res = await app.request(
      '/config',
      post({ data: { a: 'b' }, headers: { 'X-Custom-Flag': true } }),
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "custom"')
    expect(body.error.message).toContain('"headers"')
  })

  it('rejects X-Custom- key with null — safeParse fails', async () => {
    const res = await app.request(
      '/config',
      post({ data: { a: 'b' }, headers: { 'X-Custom-Data': null } }),
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "custom"')
    expect(body.error.message).toContain('"headers"')
  })

  it('rejects X-Custom- key with array — safeParse fails', async () => {
    const res = await app.request(
      '/config',
      post({ data: { a: 'b' }, headers: { 'X-Custom-List': [1, 2, 3] } }),
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "custom"')
    expect(body.error.message).toContain('"headers"')
  })

  it('rejects X-Custom- key with nested object — safeParse fails', async () => {
    const res = await app.request(
      '/config',
      post({ data: { a: 'b' }, headers: { 'X-Custom-Meta': { nested: true } } }),
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "custom"')
    expect(body.error.message).toContain('"headers"')
  })

  it('accepts non X-Custom- key with any value — pattern not matched, skip', async () => {
    const res = await app.request(
      '/config',
      post({ data: { a: 'b' }, headers: { 'Other-Header': 999 } }),
    )
    expect(res.status).toBe(201)
  })

  it('rejects when one X-Custom- key is valid string but another is number', async () => {
    const res = await app.request(
      '/config',
      post({
        data: { a: 'b' },
        headers: { 'X-Custom-Name': 'ok', 'X-Custom-Count': 42 },
      }),
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "custom"')
    expect(body.error.message).toContain('"headers"')
  })

  it('accepts empty headers object', async () => {
    const res = await app.request('/config', post({ data: { a: 'b' }, headers: {} }))
    expect(res.status).toBe(201)
  })

  it('accepts when headers is omitted (exactOptional)', async () => {
    const res = await app.request('/config', post({ data: { a: 'b' } }))
    expect(res.status).toBe(201)
  })
})

// ============================================================
// dependentRequired
// Generated: .refine((o) => !('creditCard' in o) || 'billingAddress' in o)
// Rejection: ZodError code:"custom", path:[], message:"Invalid input"
// ============================================================
describe('dependentRequired — POST /payment', () => {
  it('accepts when creditCard and billingAddress are both present', async () => {
    const res = await app.request(
      '/payment',
      post({ creditCard: '4111111111111111', billingAddress: '123 Main St' }),
    )
    expect(res.status).toBe(201)
  })

  it('accepts when creditCard is absent — dependency not triggered', async () => {
    const res = await app.request('/payment', post({ email: 'test@example.com' }))
    expect(res.status).toBe(201)
  })

  it('rejects creditCard without billingAddress — refine on root path', async () => {
    const res = await app.request('/payment', post({ creditCard: '4111111111111111' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "custom"')
    expect(body.error.message).toContain('"path": []')
    expect(body.error.message).toContain('"message": "Invalid input"')
  })

  it('accepts empty object', async () => {
    const res = await app.request('/payment', post({}))
    expect(res.status).toBe(201)
  })
})

// ============================================================
// minProperties / maxProperties
// Generated: .refine((o) => Object.keys(o).length >= 1)
//            .refine((o) => Object.keys(o).length <= 10)
// Rejection: ZodError code:"custom", path:["metadata"], message:"Invalid input"
// ============================================================
describe('minProperties / maxProperties — POST /tags', () => {
  it('accepts metadata with 1 key (meets minProperties >= 1)', async () => {
    const res = await app.request('/tags', post({ metadata: { key: 'value' } }))
    expect(res.status).toBe(201)
  })

  it('rejects metadata with 0 keys — violates minProperties', async () => {
    const res = await app.request('/tags', post({ metadata: {} }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(body.error.message).toContain('"code": "custom"')
    expect(body.error.message).toContain('"metadata"')
    expect(body.error.message).toContain('"message": "Invalid input"')
  })
})
