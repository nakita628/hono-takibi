// Every parameter shape the generator supports, sent as a real cookie. A cookie reaches
// the handler as a string just like a query or header value, but it took the branch that
// used to skip coercion entirely, so every numeric or boolean cookie rejected its own
// input.
import { describe, expect, it } from 'vite-plus/test'

import { cookieParamsApp } from './app'

/** `[cookie name, a value the spec accepts, the type it must arrive as]`. */
const SHAPES: readonly (readonly [string, string, string])[] = [
  ['integer', '42', 'number'],
  ['int32', '42', 'number'],
  ['int64', '9007199254740993', 'bigint'],
  ['bigint', '9007199254740993', 'bigint'],
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
  ['url', 'https://example.com', 'string'],
  ['uri', 'https://example.com', 'string'],
  ['httpurl', 'https://example.com', 'string'],
  ['hostname', 'example.com', 'string'],
  ['hex', 'deadbeef', 'string'],
  ['base64', 'aGVsbG8=', 'string'],
  ['base64url', 'aGVsbG8', 'string'],
  ['nanoid', 'V1StGXR8_Z5jdHi6B-myT', 'string'],
  ['cuid2', 'tz4a98xxat96iws9zmbrgj3a', 'string'],
  ['ulid', '01ARZ3NDEKTSV4RRFFQ69G5FAV', 'string'],
  ['ipv4', '192.168.0.1', 'string'],
  ['ipv6', '2001:db8::1', 'string'],
  ['cidrv4', '192.168.0.0/24', 'string'],
  ['cidrv6', '2001:db8::/32', 'string'],
  ['date', '2020-01-02', 'string'],
  ['time', '12:34:56', 'string'],
  ['datetime', '2020-01-02T03:04:05Z', 'string'],
  ['duration', 'P1Y2M3DT4H5M6S', 'string'],
  ['byte', 'aGVsbG8=', 'string'],
  ['strpassword', 'hunter2', 'string'],
  ['e164', '+14155552671', 'string'],
  ['guid', '0190b1f4-0000-7000-8000-000000000000', 'string'],
  ['trim', 'spaced', 'string'],
]

/** Every cookie is required, so one request has to carry all of them. */
function cookie(overrides: Readonly<Record<string, string>> = {}) {
  const pairs = SHAPES.map(([name, value]) => `${name}=${overrides[name] ?? value}`)
  // A cookie name appears once, so `ids` always arrives as a single value — the arity the
  // generated array schema has to accept.
  pairs.push('ids=7')
  return { Cookie: pairs.join('; ') }
}

describe('cookie parameter matrix', () => {
  it('accepts every shape the generator supports', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: cookie() })
    expect(res.status).toBe(200)
  })

  it.concurrent.each(SHAPES)('%s arrives as %s', async (name, _value, type) => {
    const res = await cookieParamsApp.request('/cookies', { headers: cookie() })
    expect((await res.json()) as Record<string, unknown>).toMatchObject({ [name]: type })
  })

  it('int64 keeps precision past Number.MAX_SAFE_INTEGER', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: cookie() })
    expect((await res.json()) as { int64Value: string }).toMatchObject({
      int64Value: '9007199254740993',
    })
  })

  it('a single-valued array cookie arrives as a one-element array', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: cookie() })
    expect((await res.json()) as { idsTypes: string[] }).toMatchObject({ idsTypes: ['number'] })
  })

  it.concurrent.each(SHAPES.filter(([, , type]) => type !== 'string'))(
    '%s rejects a non-%s value with 422',
    async (name) => {
      const res = await cookieParamsApp.request('/cookies', {
        headers: cookie({ [name]: 'not-a-value' }),
      })
      expect(res.status).toBe(422)
    },
  )
})
