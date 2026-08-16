// Why hono-takibi coerces query/path params — a comparison against naive Zod schemas.
//
// HTTP has no types: every query/path value reaches the validator as a string
// ("10", "true", "9007199254740993"). Each route definition below is followed by
// the tests that exercise it:
//   1. naive schemas (z.number(), z.boolean(), z.bigint())
//        → reject requests that are perfectly valid per the OpenAPI spec
//   2. naive coercion (z.coerce.boolean(), z.coerce.number())
//        → accept but silently produce WRONG values ("false" → true, int64 precision loss)
//   3. what hono-takibi generates — embedded VERBATIM from
//      __generated__/validation/routes.ts (generated from specs/coercion.yaml)
//        → accept and produce correct values, and still reject garbage
//   4. the embedded copies are held against the imported generated artifact:
//      identical requests must yield identical responses, so the code you read
//      in section 3 cannot drift from what the generator emits today.

import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { describe, expect, it } from 'vite-plus/test'

import {
  getCoerceIdRoute as generatedCoerceIdRoute,
  getSearchRoute as generatedSearchRoute,
} from '../__generated__/validation/routes'

// ─────────────────────────────────────────────────────────────
// 1. Naive schemas: z.number() / z.boolean() / z.bigint()
// ─────────────────────────────────────────────────────────────

const naiveSearchRoute = createRoute({
  method: 'get',
  path: '/search',
  request: {
    query: z.object({
      limit: z.number().int(),
      active: z.boolean(),
    }),
  },
  responses: { 200: { description: 'ok' } },
})

const naiveSearchApp = new OpenAPIHono().openapi(naiveSearchRoute, (c) => {
  const { limit, active } = c.req.valid('query')
  return c.json({ limit, active })
})

describe('1a. naive z.number() / z.boolean() query params reject valid requests', () => {
  it('a spec-valid request is rejected with 400 because query values are strings', async () => {
    const res = await naiveSearchApp.request('/search?limit=10&active=true')
    expect(res.status).toBe(400)
    const body = (await res.json()) as { error: { message: string } }
    const issues = JSON.parse(body.error.message) as {
      path: readonly string[]
      code: string
      expected: string
    }[]
    expect(
      issues.map((issue) => `${issue.path.join('.')}: ${issue.code} (expected ${issue.expected})`),
    ).toStrictEqual([
      'limit: invalid_type (expected number)',
      'active: invalid_type (expected boolean)',
    ])
  })
})

const naiveIdRoute = createRoute({
  method: 'get',
  path: '/coerce/{id}',
  request: {
    params: z.object({
      id: z.bigint(),
    }),
  },
  responses: { 200: { description: 'ok' } },
})

const naiveIdApp = new OpenAPIHono().openapi(naiveIdRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ idValue: String(id) })
})

describe('1b. naive z.bigint() path param rejects valid requests', () => {
  it('a numeric path segment is rejected with 400 because it arrives as a string', async () => {
    const res = await naiveIdApp.request('/coerce/1')
    expect(res.status).toBe(400)
    const body = (await res.json()) as { error: { message: string } }
    const issues = JSON.parse(body.error.message) as { path: readonly string[]; code: string }[]
    expect(issues.map((issue) => `${issue.path.join('.')}: ${issue.code}`)).toStrictEqual([
      'id: invalid_type',
    ])
  })
})

// ─────────────────────────────────────────────────────────────
// 2. Naive coercion: z.coerce.boolean() / z.coerce.number()
// ─────────────────────────────────────────────────────────────

const coerceBoolRoute = createRoute({
  method: 'get',
  path: '/search',
  request: {
    query: z.object({
      active: z.coerce.boolean(),
    }),
  },
  responses: { 200: { description: 'ok' } },
})

const coerceBoolApp = new OpenAPIHono().openapi(coerceBoolRoute, (c) => {
  const { active } = c.req.valid('query')
  return c.json({ active })
})

describe('2a. z.coerce.boolean() accepts but silently corrupts', () => {
  it('turns "false" into true (Boolean("false") is truthy)', async () => {
    const res = await coerceBoolApp.request('/search?active=false')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ active: true })
  })
})

const coerceNumberIdRoute = createRoute({
  method: 'get',
  path: '/coerce/{id}',
  request: {
    params: z.object({
      // No .int(): zod v4's .int() rejects values outside the safe-integer range,
      // which would mask the precision-loss failure mode shown below.
      id: z.coerce.number(),
    }),
  },
  responses: { 200: { description: 'ok' } },
})

const coerceNumberIdApp = new OpenAPIHono().openapi(coerceNumberIdRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ id })
})

describe('2b. z.coerce.number() accepts int64 but silently loses precision', () => {
  it('2^53 + 1 comes out as 2^53 — off by one, no error', async () => {
    const res = await coerceNumberIdApp.request('/coerce/9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ id: 2 ** 53 })
  })
})

// ─────────────────────────────────────────────────────────────
// 3. What hono-takibi generates.
// The two route definitions below are embedded VERBATIM from
// __generated__/validation/routes.ts; section 4 pins them against
// the imported artifact so this copy cannot silently drift.
// ─────────────────────────────────────────────────────────────

const getCoerceIdRoute = createRoute({
  method: 'get',
  path: '/coerce/{id}',
  operationId: 'coercePathId',
  request: {
    params: z.object({
      id: z.coerce
        .bigint()
        .pipe(z.int64())
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'Coerced path param echo',
      content: {
        'application/json': {
          schema: z
            .object({ idType: z.string(), idValue: z.string() })
            .openapi({ required: ['idType', 'idValue'] }),
        },
      },
    },
  },
})

const embeddedCoerceIdApp = new OpenAPIHono().openapi(getCoerceIdRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ idType: typeof id, idValue: String(id) })
})

describe('3a. generated z.coerce.bigint().pipe(z.int64()) path param', () => {
  it('preserves int64 exactly where 2b lost precision', async () => {
    const res = await embeddedCoerceIdApp.request('/coerce/9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      idType: 'bigint',
      idValue: '9007199254740993',
    })
  })

  it('rejects non-numeric garbage with 400', async () => {
    const res = await embeddedCoerceIdApp.request('/coerce/abc')
    expect(res.status).toBe(400)
  })
})

const getSearchRoute = createRoute({
  method: 'get',
  path: '/search',
  operationId: 'search',
  request: {
    query: z.object({
      limit: z.coerce
        .number()
        .int()
        .default(10)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', default: 10 },
          },
        }),
      active: z.stringbool().openapi({
        param: { name: 'active', in: 'query', required: true, schema: { type: 'boolean' } },
      }),
      ids: z
        .array(z.coerce.number().int())
        .exactOptional()
        .openapi({
          param: {
            name: 'ids',
            in: 'query',
            required: false,
            schema: { type: 'array', items: { type: 'integer' } },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'Coerced query echo',
      content: {
        'application/json': {
          schema: z
            .object({
              limit: z.number(),
              limitType: z.string(),
              activeType: z.string(),
              idsTypes: z.array(z.string()),
            })
            .openapi({ required: ['limit', 'limitType', 'activeType', 'idsTypes'] }),
        },
      },
    },
  },
})

// The generated route also declares the 200 echo schema (limit/limitType/activeType/
// idsTypes), so the handler must return that exact shape — value-level proof for the
// boolean is asserted directly against the route's query schema below.
const embeddedSearchApp = new OpenAPIHono().openapi(getSearchRoute, (c) => {
  const { limit, active, ids } = c.req.valid('query')
  return c.json({
    limit: limit ?? -1,
    limitType: typeof limit,
    activeType: typeof active,
    idsTypes: (ids ?? []).map((value) => typeof value),
  })
})

describe('3b. generated z.coerce.number().int() / z.stringbool() query params', () => {
  it('the query schema parses "false" to false — the value 2a corrupted', () => {
    expect(getSearchRoute.request.query.parse({ active: 'false' })).toStrictEqual({
      limit: 10,
      active: false,
    })
  })

  it('the query schema parses explicit values: "5" → 5, "true" → true, ids → [1, 2]', () => {
    expect(
      getSearchRoute.request.query.parse({ active: 'true', limit: '5', ids: ['1', '2'] }),
    ).toStrictEqual({ limit: 5, active: true, ids: [1, 2] })
  })

  it('over HTTP: default applies and every param arrives with its schema-declared type', async () => {
    const res = await embeddedSearchApp.request('/search?limit=5&active=true&ids=1&ids=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: 5,
      limitType: 'number',
      activeType: 'boolean',
      idsTypes: ['number', 'number'],
    })
  })

  it('z.stringbool() rejects non-boolean garbage instead of truthy-coercing it', async () => {
    const res = await embeddedSearchApp.request('/search?active=maybe')
    expect(res.status).toBe(400)
  })

  it('z.coerce.number().int() rejects a non-numeric limit', async () => {
    const res = await embeddedSearchApp.request('/search?active=true&limit=abc')
    expect(res.status).toBe(400)
  })
})

// ─────────────────────────────────────────────────────────────
// 4. Drift guard: the embedded section-3 routes behave identically
// to the artifact imported from __generated__/validation/routes.ts.
// ─────────────────────────────────────────────────────────────

const generatedCoerceIdApp = new OpenAPIHono().openapi(generatedCoerceIdRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ idType: typeof id, idValue: String(id) })
})

const generatedSearchApp = new OpenAPIHono().openapi(generatedSearchRoute, (c) => {
  const { limit, active, ids } = c.req.valid('query')
  return c.json({
    limit: limit ?? -1,
    limitType: typeof limit,
    activeType: typeof active,
    idsTypes: (ids ?? []).map((value) => typeof value),
  })
})

describe('4. embedded copies match the imported generated artifact', () => {
  it('path route: identical status and body for exact, garbage, and overflow inputs', async () => {
    for (const url of ['/coerce/9007199254740993', '/coerce/abc', '/coerce/1']) {
      const embedded = await embeddedCoerceIdApp.request(url)
      const generated = await generatedCoerceIdApp.request(url)
      expect(generated.status).toBe(embedded.status)
      expect(await generated.json()).toStrictEqual(await embedded.json())
    }
  })

  it('search route: identical status and body for defaults, explicit values, and garbage', async () => {
    for (const url of [
      '/search?active=true',
      '/search?active=false',
      '/search?limit=5&active=true&ids=1&ids=2',
      '/search?active=maybe',
      '/search?active=true&limit=abc',
    ]) {
      const embedded = await embeddedSearchApp.request(url)
      const generated = await generatedSearchApp.request(url)
      expect(generated.status).toBe(embedded.status)
      expect(await generated.json()).toStrictEqual(await embedded.json())
    }
  })
})
