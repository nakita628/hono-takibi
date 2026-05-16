import { describe, expect, it } from 'vitest'
import app from './app-default.ts'

// Default-behavior fixture: no defaultHook, no per-route hook.
// @hono/zod-openapi serializes failed validations to a 400 response body shaped:
//   { success: false, error: { name: 'ZodError', message: '<JSON-stringified issues array>' } }
// Each handler echoes c.req.valid('json') so success-path tests exercise the
// parsed payload by toStrictEqual against the request input.
describe('x-vendor-messages — default behavior (no hook, raw ZodError, status 400)', () => {
  // ─────────────────────────────────────────────────────────
  // Success path: c.req.valid('json') echoes the parsed payload.
  // One success per route confirms request body validation accepts the input
  // and the value flows through Zod to the handler unchanged.
  // ─────────────────────────────────────────────────────────
  describe('success path: c.req.valid echoes parsed value', () => {
    it('POST /form echoes a valid payload', async () => {
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
      expect(await res.json()).toStrictEqual({
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
      })
    })

    it('POST /composition echoes a valid payload', async () => {
      const body = { anyValue: 'hello' }
      const res = await app.request('/composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual(body)
    })

    it('POST /dictionary echoes a valid payload', async () => {
      const body = { ok_key: 'x' }
      const res = await app.request('/dictionary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual(body)
    })

    it('POST /merged echoes a valid payload', async () => {
      const body = { name: 'taro', age: 25 }
      const res = await app.request('/merged', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual(body)
    })

    it('POST /merged-arrow echoes a valid payload', async () => {
      const body = { name: 'taro', age: 25 }
      const res = await app.request('/merged-arrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual(body)
    })

    it('POST /payment echoes a valid payload', async () => {
      const body = { method: 'cc', credit_card: '4111111111111111', billing_zip: '00000' }
      const res = await app.request('/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual(body)
    })

    it('POST /bounds echoes a valid payload', async () => {
      const body = { score: 50, ratio: 0.5 }
      const res = await app.request('/bounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual(body)
    })

    it('POST /basket echoes a valid payload', async () => {
      const body = { items: [{ kind: 'premium' }, { kind: 'premium' }, { kind: 'basic' }] }
      const res = await app.request('/basket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual(body)
    })

    it('POST /contains-default echoes a valid payload', async () => {
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
      expect(await res.json()).toStrictEqual({
        tags: ['special', 'a', 'b'],
        scores: [95, 99, 80],
        ints: [1, 2, 3],
      })
    })

    it('POST /write-only echoes a valid payload', async () => {
      const body = { name: 'taro', password: 'secret' }
      const res = await app.request('/write-only', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual(body)
    })

    it('POST /misc echoes a valid payload', async () => {
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
      expect(await res.json()).toStrictEqual({
        color: 'red',
        kind: 'admin',
        tags: ['a', 'b'],
        sized: ['premium', 'basic'],
        namespaced: { a: '1' },
        prefixed: { x_one: 'ok' },
        payload: 'ok',
      })
    })
  })

  // ─────────────────────────────────────────────────────────
  // Common (4): x-error-message / x-required-message / x-const-message / x-enum-message
  // ─────────────────────────────────────────────────────────
  describe('Common — x-error-message / x-required-message / x-const-message / x-enum-message', () => {
    it('x-error-message: non-string username surfaces the configured message verbatim', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "expected": "string",\n    "code": "invalid_type",\n    "path": [\n      "username"\n    ],\n    "message": "username must be a string"\n  }\n]',
        },
      })
    })

    it('x-required-message: missing payload routes through (iss.input === undefined) branch', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "expected": "string",\n    "code": "invalid_type",\n    "path": [\n      "payload"\n    ],\n    "message": "payload is required"\n  }\n]',
        },
      })
    })

    it('x-const-message: wrong literal value surfaces the configured message', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "invalid_value",\n    "values": [\n      "admin"\n    ],\n    "path": [\n      "kind"\n    ],\n    "message": "kind must be exactly \\"admin\\""\n  }\n]',
        },
      })
    })

    it('x-enum-message: value outside enum surfaces the configured message', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "invalid_value",\n    "values": [\n      "red",\n      "green",\n      "blue"\n    ],\n    "path": [\n      "color"\n    ],\n    "message": "color must be one of red, green, blue"\n  }\n]',
        },
      })
    })
  })

  // ─────────────────────────────────────────────────────────
  // Numeric (5): x-minimum / x-maximum / x-exclusiveMinimum / x-exclusiveMaximum / x-multipleOf
  // ─────────────────────────────────────────────────────────
  describe('Numeric — x-minimum / x-maximum / x-exclusiveMinimum / x-exclusiveMaximum / x-multipleOf', () => {
    it('x-minimum-message: inclusive lower-bound violation', async () => {
      const res = await app.request('/bounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: -1, ratio: 0.5 }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "number",\n    "code": "too_small",\n    "minimum": 0,\n    "inclusive": true,\n    "path": [\n      "score"\n    ],\n    "message": "score must be >= 0"\n  }\n]',
        },
      })
    })

    it('x-maximum-message: inclusive upper-bound violation', async () => {
      const res = await app.request('/bounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: 50, ratio: 1.5 }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "number",\n    "code": "too_big",\n    "maximum": 1,\n    "inclusive": true,\n    "path": [\n      "ratio"\n    ],\n    "message": "ratio must be <= 1"\n  }\n]',
        },
      })
    })

    it('x-exclusiveMinimum-message: exclusive lower-bound violation (inclusive: false)', async () => {
      const res = await app.request('/bounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: 50, ratio: 0 }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "number",\n    "code": "too_small",\n    "minimum": 0,\n    "inclusive": false,\n    "path": [\n      "ratio"\n    ],\n    "message": "ratio must be > 0"\n  }\n]',
        },
      })
    })

    it('x-exclusiveMaximum-message: exclusive upper-bound violation (inclusive: false)', async () => {
      const res = await app.request('/bounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: 100, ratio: 0.5 }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "number",\n    "code": "too_big",\n    "maximum": 100,\n    "inclusive": false,\n    "path": [\n      "score"\n    ],\n    "message": "score must be < 100"\n  }\n]',
        },
      })
    })

    it('x-multipleOf-message: not a multiple of the divisor', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "number",\n    "code": "not_multiple_of",\n    "divisor": 0.5,\n    "path": [\n      "score"\n    ],\n    "message": "score must be a multiple of 0.5"\n  }\n]',
        },
      })
    })
  })

  // ─────────────────────────────────────────────────────────
  // String (4): x-minLength / x-maxLength / x-pattern / x-size
  // ─────────────────────────────────────────────────────────
  describe('String — x-minLength / x-maxLength / x-pattern / x-size', () => {
    it('x-minLength-message: string shorter than minLength', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "string",\n    "code": "too_small",\n    "minimum": 3,\n    "inclusive": true,\n    "path": [\n      "username"\n    ],\n    "message": "username must be at least 3 characters"\n  }\n]',
        },
      })
    })

    it('x-maxLength-message: string longer than maxLength', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "string",\n    "code": "too_big",\n    "maximum": 16,\n    "inclusive": true,\n    "path": [\n      "username"\n    ],\n    "message": "username must be at most 16 characters"\n  }\n]',
        },
      })
    })

    it('x-pattern-message: string fails regex', async () => {
      const res = await app.request('/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: 'taro',
                code: 'ABC123',
                slug: 'BAD',
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "string",\n    "code": "invalid_format",\n    "format": "regex",\n    "pattern": "/^[a-z0-9-]+$/",\n    "path": [\n      "slug"\n    ],\n    "message": "slug must be lowercase alphanumeric with hyphens"\n  }\n]',
        },
      })
    })

    it('x-size-message: exact-length string violation (Zod emits too_small with exact: true)', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "string",\n    "code": "too_small",\n    "minimum": 6,\n    "inclusive": true,\n    "exact": true,\n    "path": [\n      "code"\n    ],\n    "message": "code must be exactly 6 characters"\n  }\n]',
        },
      })
    })
  })

  // ─────────────────────────────────────────────────────────
  // Array (6): x-minItems / x-maxItems / x-uniqueItems / x-contains / x-minContains / x-maxContains
  // ─────────────────────────────────────────────────────────
  describe('Array — x-minItems / x-maxItems / x-uniqueItems / x-contains / x-minContains / x-maxContains', () => {
    it('x-minItems-message: array shorter than minItems', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "array",\n    "code": "too_small",\n    "minimum": 1,\n    "inclusive": true,\n    "path": [\n      "tags"\n    ],\n    "message": "tags must contain at least 1 item"\n  }\n]',
        },
      })
    })

    it('x-maxItems-message: array longer than maxItems', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "array",\n    "code": "too_big",\n    "maximum": 5,\n    "inclusive": true,\n    "path": [\n      "tags"\n    ],\n    "message": "tags must contain at most 5 items"\n  }\n]',
        },
      })
    })

    it('x-uniqueItems-message: duplicate elements violate uniqueness (path includes index of dup)', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "custom",\n    "path": [\n      "tags",\n      1\n    ],\n    "message": "tags must contain unique values"\n  }\n]',
        },
      })
    })

    it('x-contains-message: array missing required premium tag', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "custom",\n    "message": "sized must contain at least one premium tag",\n    "path": [\n      "sized"\n    ]\n  }\n]',
        },
      })
    })

    it('x-minContains-message: fewer than minContains matches', async () => {
      const res = await app.request('/basket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                      items: [{ kind: 'premium' }, { kind: 'basic' }, { kind: 'basic' }],
                    }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "custom",\n    "message": "must include at least 2 premium items",\n    "path": [\n      "items"\n    ]\n  }\n]',
        },
      })
    })

    it('x-maxContains-message: more than maxContains matches', async () => {
      const res = await app.request('/basket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                      items: [
                        { kind: 'premium' },
                        { kind: 'premium' },
                        { kind: 'premium' },
                        { kind: 'premium' },
                        { kind: 'premium' },
                        { kind: 'premium' },
                      ],
                    }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "custom",\n    "message": "must include at most 5 premium items",\n    "path": [\n      "items"\n    ]\n  }\n]',
        },
      })
    })
  })

  // ─────────────────────────────────────────────────────────
  // Object (7): x-minProperties / x-maxProperties / x-additionalProperties /
  //             x-propertyNames / x-patternProperties /
  //             x-dependentRequired / x-dependentSchemas
  // ─────────────────────────────────────────────────────────
  describe('Object — minProperties / maxProperties / additionalProperties / propertyNames / patternProperties / dependentRequired / dependentSchemas', () => {
    it('x-minProperties-message: object below the property-count floor', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "custom",\n    "path": [\n      "namespaced"\n    ],\n    "message": "namespaced must have at least 1 property"\n  }\n]',
        },
      })
    })

    // x-maxProperties-message — runtime dispatch unreachable: namespaced
    // declares only {a, b, c} with additionalProperties: false and
    // maxProperties: 3, so any 4-key payload trips unrecognized_keys first.
    // x-additionalProperties-message covers that branch instead. This case
    // confirms the additionalProperties path; x-maxProperties source survival
    // is asserted by the existing app.test.ts via the generated.ts read.
    it('x-additionalProperties-message: unknown key trips the strictObject error route', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "unrecognized_keys",\n    "keys": [\n      "d"\n    ],\n    "path": [\n      "namespaced"\n    ],\n    "message": "namespaced contains an unrecognized key"\n  }\n]',
        },
      })
    })

    it('x-propertyNames-message: key violates the propertyNames pattern', async () => {
      const res = await app.request('/dictionary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ BadKey: 'x' }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "custom",\n    "path": [\n      "BadKey"\n    ],\n    "message": "keys must start with a lowercase letter and contain only [a-z0-9_]"\n  }\n]',
        },
      })
    })

    it('x-patternProperties-message: matched key has wrong-typed value (path keeps the offending key)', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "expected": "string",\n    "code": "invalid_type",\n    "path": [\n      "prefixed",\n      "x_one"\n    ],\n    "message": "x_ keys must be strings"\n  }\n]',
        },
      })
    })

    it('x-dependentRequired-message: dep key present but required dependent is missing', async () => {
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
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "custom",\n    "message": "tokenLabel is required when token is provided",\n    "path": [\n      "tokenLabel"\n    ]\n  }\n]',
        },
      })
    })

    // v3.1: dependentSchemas now PROPAGATES the inner sub-schema's issue
    // verbatim instead of overriding with x-dependentSchemas-message. The
    // emitTypelessRefine path omits `message` (no x-* slot) → Zod's built-in
    // default 'Invalid input' flows through.
    it('x-dependentSchemas-message: malformed dep value emits the propagated inner sub-issue', async () => {
      const res = await app.request('/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                      method: 'cc',
                      credit_card: '123',
                      billing_zip: '00000',
                    }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "custom",\n    "path": [],\n    "message": "Invalid input"\n  }\n]',
        },
      })
    })
  })

  // ─────────────────────────────────────────────────────────
  // Combinators (4): x-allOf / x-anyOf / x-oneOf / x-not
  // ─────────────────────────────────────────────────────────
  describe('Combinators — x-allOf / x-anyOf / x-oneOf / x-not', () => {
    it('x-allOf-message (string form): replaces sub-issue messages with the configured top-level string', async () => {
      const res = await app.request('/merged', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'a', age: 25 }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "string",\n    "code": "too_small",\n    "minimum": 3,\n    "inclusive": true,\n    "path": [\n      "name"\n    ],\n    "message": "merged validation failed"\n  }\n]',
        },
      })
    })

    it('x-allOf-message (arrow form): per-issue message is computed from issue.path', async () => {
      const res = await app.request('/merged-arrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'a', age: -1 }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "origin": "string",\n    "code": "too_small",\n    "minimum": 3,\n    "inclusive": true,\n    "path": [\n      "name"\n    ],\n    "message": "merged failed at name"\n  },\n  {\n    "origin": "number",\n    "code": "too_small",\n    "minimum": 0,\n    "inclusive": true,\n    "path": [\n      "age"\n    ],\n    "message": "merged failed at age"\n  }\n]',
        },
      })
    })

    it('x-anyOf-message: union mismatch surfaces the configured message at the union node', async () => {
      const res = await app.request('/composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anyValue: true }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "invalid_union",\n    "errors": [\n      [\n        {\n          "expected": "string",\n          "code": "invalid_type",\n          "path": [],\n          "message": "Invalid input: expected string, received boolean"\n        }\n      ],\n      [\n        {\n          "expected": "number",\n          "code": "invalid_type",\n          "path": [],\n          "message": "Invalid input: expected number, received boolean"\n        }\n      ]\n    ],\n    "path": [\n      "anyValue"\n    ],\n    "message": "anyValue must be a string or integer"\n  }\n]',
        },
      })
    })

    it('x-oneOf-message: zero matches across xor branches surfaces the configured message', async () => {
      const res = await app.request('/composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anyValue: 'ok', oneValue: true }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "invalid_union",\n    "errors": [\n      [\n        {\n          "expected": "string",\n          "code": "invalid_type",\n          "path": [],\n          "message": "Invalid input: expected string, received boolean"\n        }\n      ],\n      [\n        {\n          "expected": "number",\n          "code": "invalid_type",\n          "path": [],\n          "message": "Invalid input: expected number, received boolean"\n        }\n      ]\n    ],\n    "path": [\n      "oneValue"\n    ],\n    "message": "oneValue must match exactly one type"\n  }\n]',
        },
      })
    })

    it('x-not-message: forbidden type matches the negated subschema and emits the message', async () => {
      const res = await app.request('/composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anyValue: 'ok', notString: 'forbidden' }),
      })
      expect(res.status).toBe(400)
      expect(await res.json()).toStrictEqual({
        success: false,
        error: {
          name: 'ZodError',
          message:
            '[\n  {\n    "code": "custom",\n    "path": [\n      "notString"\n    ],\n    "message": "notString must not be a string"\n  }\n]',
        },
      })
    })
  })
})
