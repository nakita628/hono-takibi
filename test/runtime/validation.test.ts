import { describe, expect, it } from 'vitest'

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
    })
  })

  it('non-boolean active is rejected with 422', async () => {
    const res = await coercionApp.request('/search?active=maybe')
    expect(res.status).toBe(422)
    const body = (await res.json()) as { issues: { path: string }[] }
    expect(body.issues.map((issue) => issue.path)).toStrictEqual(['active'])
  })
})
