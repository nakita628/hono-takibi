// Every parameter shape the generator supports, sent as a real request and checked for
// the JavaScript type it arrives as. HTTP carries all of them as strings, so a schema that
// forgets to coerce rejects its own input — the failure mode this matrix exists to catch.
import { describe, expect, it } from 'vite-plus/test'

import { queryParamsApp } from './app'

/** `[parameter name, a value the spec accepts, the type it must arrive as]`. */
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
  ['url', 'https://example.com', 'string'],
  ['uri', 'https://example.com', 'string'],
  ['httpurl', 'https://example.com', 'string'],
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
  ['cidrv4', '192.168.0.0/24', 'string'],
  ['cidrv6', '2001:db8::/32', 'string'],
  ['date', '2020-01-02', 'string'],
  ['time', '12:34:56', 'string'],
  ['datetime', '2020-01-02T03:04:05Z', 'string'],
  ['duration', 'P1Y2M3DT4H5M6S', 'string'],
  ['byte', 'aGVsbG8=', 'string'],
  ['strpassword', 'hunter2', 'string'],
  ['mac', '00:1a:2b:3c:4d:5e', 'string'],
  ['e164', '+14155552671', 'string'],
  ['creditcard', '4111111111111111', 'string'],
  ['iban', 'DE89370400440532013000', 'string'],
  ['currencycode', 'USD', 'string'],
  ['ksuid', '0ujsszwN8NRY24YaXiTIE2VWDTS', 'string'],
  ['xid', '9m4e2mr0ui3e8a215n4g', 'string'],
  ['guid', '0190b1f4-0000-7000-8000-000000000000', 'string'],
  ['trim', 'spaced', 'string'],
]

/**
 * `[parameter name, what is sent, the value that must arrive]` — the transform axis.
 * Unlike SHAPES these assert the value, because that is what a transform changes.
 */
const TRANSFORMS: readonly (readonly [string, string, string])[] = [
  ['tx_trim', '  spaced  ', 'spaced'],
  ['tx_lower', 'MiXeD', 'mixed'],
  ['tx_upper', 'MiXeD', 'MIXED'],
  ['tx_normalize', 'ﾊﾝｶｸ', 'ハンカク'],
  ['tx_email_trim', '  user@example.com  ', 'user@example.com'],
  [
    'tx_uuid_trim',
    '  0190b1f4-0000-7000-8000-000000000000  ',
    '0190b1f4-0000-7000-8000-000000000000',
  ],
]

/** Every parameter is required, so one request has to carry all of them. */
function query(overrides: Readonly<Record<string, string>> = {}, arity: 'one' | 'many' = 'many') {
  const parts: string[] = []
  for (const [name, value] of TRANSFORMS) {
    parts.push(`${name}=${encodeURIComponent(overrides[name] ?? value)}`)
  }
  for (const [name, value] of SHAPES) {
    const sent = overrides[name] ?? value
    parts.push(`${name}=${encodeURIComponent(sent)}`)
    const repeats = arity === 'one' ? 1 : 2
    for (let i = 0; i < repeats; i += 1) {
      parts.push(`${name}_arr=${encodeURIComponent(sent)}`)
    }
  }
  return `/params?${parts.join('&')}`
}

describe('query parameter matrix', () => {
  it('accepts every shape the generator supports', async () => {
    const res = await queryParamsApp.request(query())
    expect(res.status).toBe(200)
  })

  it.concurrent.each(SHAPES)('%s arrives as %s (scalar and array)', async (name, _value, type) => {
    const res = await queryParamsApp.request(query())
    const body = (await res.json()) as Record<string, unknown>
    expect(body[name]).toBe(type)
    expect(body[`${name}_arr`]).toStrictEqual([type, type])
  })

  // `?ids=1` is what an exploded one-element array serialises to, and it reaches the
  // handler as a bare string — a plain `z.array(...)` used to reject it.
  it.concurrent.each(SHAPES)(
    '%s accepts a single repetition as a one-element array',
    async (name, _value, type) => {
      const res = await queryParamsApp.request(query({}, 'one'))
      expect(res.status).toBe(200)
      const body = (await res.json()) as Record<string, unknown>
      expect(body[`${name}_arr`]).toStrictEqual([type])
    },
  )

  it('int64 keeps precision past Number.MAX_SAFE_INTEGER', async () => {
    const res = await queryParamsApp.request(query())
    expect((await res.json()) as { int64Value: string }).toMatchObject({
      int64Value: '9007199254740993',
    })
  })

  it.concurrent.each(SHAPES.filter(([, , type]) => type !== 'string'))(
    '%s rejects a non-%s value with 422',
    async (name, _value, _type) => {
      const res = await queryParamsApp.request(query({ [name]: 'not-a-value' }))
      expect(res.status).toBe(422)
    },
  )
})

describe('transform extensions', () => {
  it.concurrent.each(TRANSFORMS)('%s sends %j and receives %j', async (name, _sent, arrived) => {
    const res = await queryParamsApp.request(query())
    expect(res.status).toBe(200)
    expect((await res.json()) as Record<string, unknown>).toMatchObject({ [name]: arrived })
  })
})

// `uint32` and `uint64` are the unsigned halves of the pair: they have to reject a
// negative, and `uint64` has to carry its full range, whose maximum is past what a
// double can hold — the two things a plain integer schema gets wrong in both directions.
describe('unsigned integer bounds', () => {
  const BOUNDS: readonly (readonly [string, string, 'accept' | 'reject'])[] = [
    ['uint32', '0', 'accept'],
    ['uint32', '4294967295', 'accept'],
    ['uint32', '4294967296', 'reject'],
    ['uint32', '-1', 'reject'],
    ['uint32', '1.5', 'reject'],
    ['uint64', '0', 'accept'],
    ['uint64', '18446744073709551615', 'accept'],
    ['uint64', '18446744073709551616', 'reject'],
    ['uint64', '-1', 'reject'],
    ['uint64', '1.5', 'reject'],
  ]

  it.concurrent.each(BOUNDS)('%s=%s is %sed', async (name, value, outcome) => {
    const res = await queryParamsApp.request(query({ [name]: value }))
    expect(res.status).toBe(outcome === 'accept' ? 200 : 422)
  })

  it('uint64 keeps its maximum verbatim', async () => {
    const res = await queryParamsApp.request(query({ uint64: '18446744073709551615' }))
    expect(res.status).toBe(200)
    expect((await res.json()) as { uint64: string }).toMatchObject({ uint64: 'bigint' })
  })
})

// A numeric or boolean `enum` / `const` names a typed value, and the wire delivers text:
// the literal used to be matched against the raw string, so every such request 422'd.
describe('literal parameters', () => {
  const LITERALS = 'ienum=2&nenum=2.5&benum=true&iconst=7&inull=3&ioneof=4&ienum_arr=1&ienum_arr=3'

  it('coerces each literal to the value it names', async () => {
    const res = await queryParamsApp.request(`/literals?${LITERALS}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ienum: 2,
      nenum: 2.5,
      benum: true,
      iconst: 7,
      inull: 3,
      ioneof: 4,
      ienum_arr: [1, 3],
      tagsText: '[]',
    })
  })

  it('takes the string branch of a oneOf when the integer branch does not match', async () => {
    const res = await queryParamsApp.request(
      `/literals?${LITERALS.replace('ioneof=4', 'ioneof=all')}`,
    )
    expect(res.status).toBe(200)
    expect((await res.json()) as { ioneof: unknown }).toMatchObject({ ioneof: 'all' })
  })

  it('applies an array default when the parameter is absent, and keeps a sent value', async () => {
    const res = await queryParamsApp.request(`/literals?${LITERALS}&tags=a`)
    expect(res.status).toBe(200)
    expect((await res.json()) as { tagsText: string }).toMatchObject({ tagsText: '["a"]' })
  })

  it.concurrent.each([
    ['ienum', '4'],
    ['nenum', '3.5'],
    ['benum', 'false'],
    ['iconst', '8'],
    ['ienum_arr', '9'],
  ])('%s still rejects a value outside its literals with 422', async (name, value) => {
    const sent = [
      ...LITERALS.split('&').filter((part) => !part.startsWith(`${name}=`)),
      `${name}=${value}`,
    ].join('&')
    const res = await queryParamsApp.request(`/literals?${sent}`)
    expect(res.status).toBe(422)
  })
})
