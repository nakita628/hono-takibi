// Verifies the generated mock against its own route schemas (cases/mock-edge, cases/mock-seed):
// non-identifier property/component names, property-name hints that disagree with the
// declared type, OpenAPI 3.1 type arrays, arrayMin clamped by maxItems, maps, schema-level
// examples (`useExamples: 'all'`) and every zod string format are sampled repeatedly with
// the real faker and parsed by the response schema the route declares. `seed` must make
// each route answer the same body regardless of request order, on a locale faker instance.
import { describe, expect, it } from 'vite-plus/test'

import app, { getFormatsRoute, getUsersUserIdRoute } from '../__generated__/mock-edge/mock'
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
