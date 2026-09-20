// Every parameter shape the generator supports, sent as a real path segment. A path value
// is always single and always required, so each shape gets its own route and fails alone.
import { describe, expect, it } from 'vite-plus/test'

import { pathParamsApp } from './app'

/** `[route prefix, a value the spec accepts, the type it must arrive as]`. */
const SHAPES: readonly (readonly [string, string, string])[] = [
  ['integer', '42', 'number'],
  ['int32', '42', 'number'],
  ['int64', '9007199254740993', 'bigint'],
  ['bigint', '9007199254740993', 'bigint'],
  ['uint32', '4294967295', 'number'],
  ['uint64', '18446744073709551615', 'bigint'],
  ['number', '1.5', 'number'],
  ['float', '1.5', 'number'],
  ['float32', '1.5', 'number'],
  ['float64', '1.5', 'number'],
  ['double', '1.5', 'number'],
  ['numpassword', '1.5', 'number'],
  ['boolean', 'true', 'boolean'],
  ['string', 'plain', 'string'],
  ['email', 'user@example.com', 'string'],
  ['uuid', '0190b1f4-0000-7000-8000-000000000000', 'string'],
  ['uuidv4', 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'string'],
  ['uuidv7', '0190b1f4-0000-7000-8000-000000000000', 'string'],
  ['url', 'https:%2F%2Fexample.com', 'string'],
  ['uri', 'https:%2F%2Fexample.com', 'string'],
  ['httpurl', 'https:%2F%2Fexample.com', 'string'],
  ['hostname', 'example.com', 'string'],
  ['hex', 'deadbeef', 'string'],
  ['emoji', '🔥', 'string'],
  ['base64', 'aGVsbG8=', 'string'],
  ['base64url', 'aGVsbG8', 'string'],
  ['nanoid', 'V1StGXR8_Z5jdHi6B-myT', 'string'],
  ['cuid2', 'tz4a98xxat96iws9zmbrgj3a', 'string'],
  ['ulid', '01ARZ3NDEKTSV4RRFFQ69G5FAV', 'string'],
  ['ipv4', '192.168.0.1', 'string'],
  ['ipv6', '2001:db8::1', 'string'],
  ['cidrv4', '192.168.0.0%2F24', 'string'],
  ['cidrv6', '2001:db8::%2F32', 'string'],
  ['date', '2020-01-02', 'string'],
  ['time', '12:34:56', 'string'],
  ['datetime', '2020-01-02T03:04:05Z', 'string'],
  ['duration', 'P1Y2M3DT4H5M6S', 'string'],
  ['byte', 'aGVsbG8=', 'string'],
  ['strpassword', 'hunter2', 'string'],
  ['mac', '00:1a:2b:3c:4d:5e', 'string'],
  ['e164', '+14155552671', 'string'],
  ['guid', '0190b1f4-0000-7000-8000-000000000000', 'string'],
  ['trim', 'spaced', 'string'],
]

describe('path parameter matrix', () => {
  it.concurrent.each(SHAPES)('%s arrives as %s', async (name, value, type) => {
    const res = await pathParamsApp.request(`/${name}/${value}`)
    expect(res.status).toBe(200)
    expect((await res.json()) as { valueType: string }).toMatchObject({ valueType: type })
  })

  it('int64 keeps precision past Number.MAX_SAFE_INTEGER', async () => {
    const res = await pathParamsApp.request('/int64/9007199254740993')
    expect((await res.json()) as { valueText: string }).toMatchObject({
      valueText: '9007199254740993',
    })
  })

  it.concurrent.each(SHAPES.filter(([, , type]) => type !== 'string'))(
    '%s rejects a non-%s value with 422',
    async (name) => {
      const res = await pathParamsApp.request(`/${name}/not-a-value`)
      expect(res.status).toBe(422)
    },
  )
})

/** `[route prefix, what is sent, the value that must arrive]` — the transform axis. */
const TRANSFORMS: readonly (readonly [string, string, string])[] = [
  ['txlower', 'MiXeD', 'mixed'],
  ['txupper', 'MiXeD', 'MIXED'],
  ['txnormalize', 'ﾊﾝｶｸ', 'ハンカク'],
  ['txemail', 'USER@EXAMPLE.COM', 'user@example.com'],
]

describe('transform extensions', () => {
  it.concurrent.each(TRANSFORMS)('%s sends %j and receives %j', async (name, sent, arrived) => {
    const res = await pathParamsApp.request(`/${name}/${encodeURIComponent(sent)}`)
    expect(res.status).toBe(200)
    expect((await res.json()) as { valueText: string }).toMatchObject({ valueText: arrived })
  })
})
