// Verifies the generated mock against its own route schemas (cases/mock-edge, cases/mock-seed):
// non-identifier property/component names, property-name hints that disagree with the
// declared type, OpenAPI 3.1 type arrays, arrayMin clamped by maxItems, maps, schema-level
// examples (`useExamples: 'all'`) and every zod string format are sampled repeatedly with
// the real faker and parsed by the response schema the route declares. `seed` must make
// each route answer the same body regardless of request order, on a locale faker instance.
import { describe, expect, it } from 'vite-plus/test'

import app, {
  getFormatsRoute,
  getOrdersOrderIdRoute,
  getUsersUserIdRoute,
} from '../__generated__/mock-edge/mock'
import seededApp from '../__generated__/mock-seed/mock'

const SAMPLES = 50
const auth = { headers: { 'X-API-Key': 'key' } }
const userSchema = getUsersUserIdRoute.responses[200].content['application/json'].schema
const problemSchema = getUsersUserIdRoute.responses[404].content['application/json'].schema
const formatsSchema = getFormatsRoute.responses[200].content['application/json'].schema

async function seededText(path: string) {
  const res = await seededApp.request(path, auth)
  return res.text()
}

describe('mock responses satisfy the route schema', () => {
  it('answers GET /users/{userId} with a body its response schema accepts', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/users/1', auth)
      expect(res.status).toBe(200)
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body: unknown = await res.json()
      const parsed = userSchema.safeParse(body)
      expect(parsed.error).toBeUndefined()
    }
  })

  it('answers GET /formats with a value every zod string format accepts', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/formats')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body: unknown = await res.json()
      const parsed = formatsSchema.safeParse(body)
      expect(parsed.error).toBeUndefined()
    }
  })

  it('answers the 404 sentinel with a problem body whose status is an integer', async () => {
    const res = await app.request('/users/-1', auth)
    expect(res.status).toBe(404)
    const parsed = problemSchema.safeParse(await res.json())
    expect(parsed.error).toBeUndefined()
  })

  it('answers 401 without the apiKey header', async () => {
    const res = await app.request('/users/1')
    expect(res.status).toBe(401)
  })
})

describe('mock option semantics', () => {
  it('clamps arrayMin to maxItems and fills a map, using schema-level examples', async () => {
    const res = await app.request('/users/1', auth)
    const user = userSchema.parse(await res.json())
    expect(user.tags).toHaveLength(3)
    expect(Object.keys(user.labels).length).toBeGreaterThan(0)
    expect(user.role).toBe('admin')
    expect(user.bio).toBe('Hello')
  })

  it('answers the same body for a route regardless of request order when seeded', async () => {
    const first = await seededText('/users/1')
    await seededText('/formats')
    await seededText('/formats')
    expect(await seededText('/users/1')).toBe(first)
    const formats = await seededText('/formats')
    expect(await seededText('/formats')).toBe(formats)
  })

  it('stays deterministic under concurrent requests when seeded', async () => {
    const bodies = await Promise.all(
      Array.from({ length: 10 }, (_, i) => seededText(i % 2 === 0 ? '/users/1' : '/formats')),
    )
    const users = bodies.filter((_, i) => i % 2 === 0)
    const formats = bodies.filter((_, i) => i % 2 === 1)
    expect(new Set(users).size).toBe(1)
    expect(new Set(formats).size).toBe(1)
  })
})

async function order(prefer?: string, query = '') {
  const res = await app.request(
    `/orders/o-1${query}`,
    prefer ? { headers: { Prefer: prefer } } : {},
  )
  const text = await res.text()
  return { status: res.status, type: res.headers.get('Content-Type'), text }
}

// Prism-compatible selection: `Prefer: code=<status>, example=<name>` (or `__code` /
// `__example`) picks any declared response or named example; anything undeclared
// answers 500 problem+json.
describe('Prefer header selects a declared response', () => {
  const orderSchema = getOrdersOrderIdRoute.responses[200].content['application/json'].schema
  const problemJsonSchema =
    getOrdersOrderIdRoute.responses[404].content['application/problem+json'].schema

  it('answers the first example of the success response by default', async () => {
    const res = await order()
    expect(res.status).toBe(200)
    expect(JSON.parse(res.text)).toStrictEqual({ id: 'o-1', state: 'shipped' })
  })

  it('selects a named example of the success response', async () => {
    const res = await order('example=pending')
    expect(res.status).toBe(200)
    expect(orderSchema.parse(JSON.parse(res.text))).toStrictEqual({ id: 'o-2', state: 'pending' })
  })

  it('selects a declared error status and keeps its problem+json media type', async () => {
    const res = await order('code=404')
    expect(res.status).toBe(404)
    expect(res.type).toBe('application/problem+json')
    expect(problemJsonSchema.parse(JSON.parse(res.text))).toStrictEqual({
      title: 'Order deleted',
      status: 404,
    })
  })

  it('combines code and a quoted example name', async () => {
    const res = await order('code=404, example="gone"')
    expect(res.status).toBe(404)
  })

  it('answers a response without content with an empty body', async () => {
    const res = await order('code=503')
    expect(res.status).toBe(503)
    expect(res.text).toBe('')
  })

  it('falls back to the 4XX range with the requested status', async () => {
    const res = await order('code=409')
    expect(res.status).toBe(409)
    expect(problemJsonSchema.safeParse(JSON.parse(res.text)).error).toBeUndefined()
  })

  it('falls back to default with the requested status', async () => {
    const res = await order('code=502')
    expect(res.status).toBe(502)
    expect(problemJsonSchema.safeParse(JSON.parse(res.text)).error).toBeUndefined()
  })

  it('reads __code / __example from the query as well', async () => {
    const byCode = await order(undefined, '?__code=503')
    expect(byCode.status).toBe(503)
    const res = await order(undefined, '?__example=pending')
    expect(JSON.parse(res.text)).toStrictEqual({ id: 'o-2', state: 'pending' })
  })

  it('lets an explicit Prefer win over the 404 sentinel', async () => {
    const res = await app.request('/orders/__non_existent__', {
      headers: { Prefer: 'code=200' },
    })
    expect(res.status).toBe(200)
  })

  it.each([
    ['example=missing', 'No example named "missing" is declared for the 200 response.'],
    ['code=404, example=pending', 'No example named "pending" is declared for the 404 response.'],
    ['code=abc', 'Prefer code=abc is not a status code between 200 and 599.'],
  ])('answers 500 problem+json for the undeclared %s', async (prefer, detail) => {
    const res = await order(prefer)
    expect(res.status).toBe(500)
    expect(res.type).toBe('application/problem+json')
    expect(JSON.parse(res.text)).toMatchObject({ status: 500, detail })
  })

  it('answers 500 problem+json for a status a route without default does not declare', async () => {
    const res = await app.request('/formats', { headers: { Prefer: 'code=500' } })
    expect(res.status).toBe(500)
    const body: unknown = await res.json()
    expect(body).toMatchObject({ detail: 'No 500 response is declared for this operation.' })
  })

  it('still rejects an invalid request before honoring Prefer', async () => {
    const res = await app.request('/users/abc', {
      headers: { 'X-API-Key': 'key', Prefer: 'code=404' },
    })
    expect(res.status).toBe(400)
  })
})
