// Verifies wire-format coercion in generated routes (cases/validation, specs/coercion.yaml):
// int64 path params become exact bigints, query integers/booleans/arrays arrive typed,
// defaults apply, and garbage is rejected via the host's 422 defaultHook.
// For WHY these coercions are necessary, see query-coercion-why.test.ts.
import { describe, expect, it } from 'vite-plus/test'

import { coercionApp } from '../hosts/coercion-app'

describe('path param coercion (generated zod-openapi routes)', () => {
  it('int64 path param is coerced to bigint beyond MAX_SAFE_INTEGER', async () => {
    const res = await coercionApp.request('/coerce/9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      idType: 'bigint',
      idValue: '9007199254740993',
    })
  })

  it('non-numeric path param is rejected with 422', async () => {
    const res = await coercionApp.request('/coerce/abc')
    expect(res.status).toBe(422)
  })
})

describe('query param coercion (generated zod-openapi routes)', () => {
  it('integer default is applied and boolean is coerced', async () => {
    const res = await coercionApp.request('/search?active=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: 10,
      limitType: 'number',
      activeType: 'boolean',
      idsTypes: [],
      bigType: 'undefined',
      bigValue: 'undefined',
      bigsTypes: [],
      ratioType: 'undefined',
    })
  })

  it('explicit limit and exploded array are coerced to numbers', async () => {
    const res = await coercionApp.request('/search?active=false&limit=5&ids=1&ids=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: 5,
      limitType: 'number',
      activeType: 'boolean',
      idsTypes: ['number', 'number'],
      bigType: 'undefined',
      bigValue: 'undefined',
      bigsTypes: [],
      ratioType: 'undefined',
    })
  })

  it('int64 query param is a bigint and keeps precision past MAX_SAFE_INTEGER', async () => {
    const res = await coercionApp.request('/search?active=true&big=9223372036854775807')
    expect(res.status).toBe(200)
    const body = (await res.json()) as { bigType: string; bigValue: string }
    expect(body.bigType).toBe('bigint')
    expect(body.bigValue).toBe('9223372036854775807')
  })

  // Regression: the array branch coerced items with `z.coerce.number()` before piping
  // them into `z.int64()`, which is a bigint schema — every request 422'd on arrival.
  it('array of int64 query params arrives as bigints', async () => {
    const res = await coercionApp.request('/search?active=true&bigs=10&bigs=9007199254740993')
    expect(res.status).toBe(200)
    const body = (await res.json()) as { bigsTypes: string[] }
    expect(body.bigsTypes).toStrictEqual(['bigint', 'bigint'])
  })

  it('double query param is coerced to a number', async () => {
    const res = await coercionApp.request('/search?active=true&ratio=1.5')
    expect(res.status).toBe(200)
    expect((await res.json()) as { ratioType: string }).toMatchObject({ ratioType: 'number' })
  })

  it('non-numeric int64 query param is rejected with 422', async () => {
    const res = await coercionApp.request('/search?active=true&big=abc')
    expect(res.status).toBe(422)
  })

  it('non-boolean active is rejected with 422', async () => {
    const res = await coercionApp.request('/search?active=maybe')
    expect(res.status).toBe(422)
    const body = (await res.json()) as { issues: { path: string }[] }
    expect(body.issues.map((issue) => issue.path)).toStrictEqual(['active'])
  })
})

// Regression: `header` and `cookie` were not counted as string wires, so every numeric or
// boolean header schema rejected its own input; and the array coercion covered `int*`
// only, leaving `z.float64()` items uncoerced. Both 422'd on every request.
describe('header param coercion (generated zod-openapi routes)', () => {
  const headers = { 'x-count': '42', 'x-flag': 'true', 'x-big': '9007199254740993' }

  it('integer, boolean and int64 headers arrive typed', async () => {
    const res = await coercionApp.request('/headers', { headers })
    expect(res.status).toBe(200)
    expect(await res.json()).toMatchObject({
      countType: 'number',
      flagType: 'boolean',
      bigType: 'bigint',
      bigValue: '9007199254740993',
    })
  })

  it('array of double query params arrives as numbers', async () => {
    const res = await coercionApp.request('/headers?ratios=1.5&ratios=2.5', { headers })
    expect(res.status).toBe(200)
    expect((await res.json()) as { ratiosTypes: string[] }).toMatchObject({
      ratiosTypes: ['number', 'number'],
    })
  })

  it('non-numeric integer header is rejected with 422', async () => {
    const res = await coercionApp.request('/headers', { headers: { ...headers, 'x-count': 'abc' } })
    expect(res.status).toBe(422)
  })
})
