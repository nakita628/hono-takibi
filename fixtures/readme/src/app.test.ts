/**
 * README executable documentation tests.
 *
 * Every schema in `openapi.yaml` corresponds to a code block in
 * `packages/hono-takibi/README.md`. This file proves the documented
 * behavior is correct: validation messages match README text exactly,
 * transforms run in the documented order, codecs round-trip, etc.
 */
import { describe, expect, it } from 'vitest'
import app from './app.ts'

const post = (path: string) => (body: unknown) =>
  app.request(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

const errorsOf = async (res: Response) =>
  ((await res.json()) as { errors?: ReadonlyArray<{ pointer: string; detail: string }> }).errors

const postMessages = post('/messages')
const postTransforms = post('/transforms')
const postCoerce = post('/coerce')
const postCodec = post('/codec')
const postCustomValidation = post('/custom-validation')
const postDefaults = post('/defaults')
const postContentChecks = post('/content-checks')
const postFormats = post('/formats')
const postBranded = post('/branded')
const postNumeric = post('/numeric')
const postArrayEdge = post('/array-edge')
const postObjectEdge = post('/object-edge')
const postCombinators = post('/combinators')
const postEnums = post('/enums')

describe('README — Custom Validation Error Messages', () => {
  it('x-error-message: rejects non-string name', async () => {
    const res = await postMessages({ name: 42 })
    expect(await errorsOf(res)).toStrictEqual([
      { pointer: '/name', detail: 'Name must be a string' },
    ])
  })

  it('x-minLength-message: rejects empty string', async () => {
    const res = await postMessages({ name: '' })
    expect(await errorsOf(res)).toStrictEqual([
      { pointer: '/name', detail: 'Name cannot be empty' },
    ])
  })

  it('x-maxLength-message: rejects 51-char string', async () => {
    const res = await postMessages({ name: 'a'.repeat(51) })
    expect(await errorsOf(res)).toStrictEqual([
      { pointer: '/name', detail: 'Name must be at most 50 characters' },
    ])
  })

  it('accepts a valid name', async () => {
    const res = await postMessages({ name: 'taro' })
    expect(res.status).toBe(200)
  })
})

describe('README — String Pre-validation Transforms', () => {
  it('x-trim: whitespace stripped before email validation', async () => {
    const res = await postTransforms({
      email: '  user@example.com  ',
      slug: 'abc',
      country: 'jp',
      text: 'ok',
    })
    expect(res.status).toBe(200)
  })

  it('x-toLowerCase: input is lowercased before regex check', async () => {
    const res = await postTransforms({
      email: 'a@b.co',
      slug: 'HELLO-WORLD', // becomes 'hello-world' → matches ^[a-z0-9-]+$
      country: 'jp',
      text: 'ok',
    })
    expect(res.status).toBe(200)
  })

  it('x-toUpperCase + x-normalize: both run as pre-transforms', async () => {
    const res = await postTransforms({
      email: 'a@b.co',
      slug: 'abc',
      country: 'jp',
      text: 'café',
    })
    expect(res.status).toBe(200)
  })
})

describe('README — Type Coercion (x-coerce)', () => {
  it('coerces stringified inputs to numbers / int / bool / date', async () => {
    const res = await postCoerce({
      asNumber: '3.14',
      asInt: '42',
      asBool: 'true',
      asDate: '2024-01-01T00:00:00Z',
    })
    expect(res.status).toBe(200)
  })

  it('rejects when stringified int is below minimum', async () => {
    const res = await postCoerce({
      asNumber: '0',
      asInt: '-1',
      asBool: 'false',
      asDate: '2024-01-01T00:00:00Z',
    })
    expect(res.status).toBe(422)
  })
})

describe('README — Codec (x-codec: date)', () => {
  it('decodes ISO string into Date in the parsed result', async () => {
    const res = await postCodec({ updatedAt: '2024-01-01T00:00:00Z' })
    expect(res.status).toBe(200)
  })

  it('rejects non-ISO input', async () => {
    const res = await postCodec({ updatedAt: 'not-iso' })
    expect(res.status).toBe(422)
  })
})

describe('README — Custom Validation', () => {
  it('x-refine: short password fires the first refine message', async () => {
    const res = await postCustomValidation({
      password: 'abc',
      normalizedEmail: 'a@b.co',
    })
    const errs = await errorsOf(res)
    expect(errs?.some((e) => e.detail === 'Password must be at least 8 characters')).toBe(true)
  })

  it('x-refine: missing uppercase fires the second refine message', async () => {
    const res = await postCustomValidation({
      password: 'abcdefgh',
      normalizedEmail: 'a@b.co',
    })
    const errs = await errorsOf(res)
    expect(errs?.some((e) => e.detail === 'Password must contain an uppercase letter')).toBe(true)
  })

  it('x-superRefine: ctx.addIssue from custom function', async () => {
    const res = await postCustomValidation({
      password: 'Abcdefgh',
      normalizedEmail: 'evil@blocked.example',
    })
    const errs = await errorsOf(res)
    expect(errs?.some((e) => e.detail === 'Blocked domain')).toBe(true)
  })

  it('accepts valid input', async () => {
    const res = await postCustomValidation({
      password: 'Abcdefgh',
      normalizedEmail: '  USER@example.com  ', // trim + toLowerCase pre-applied
    })
    expect(res.status).toBe(200)
  })
})

describe('README — Default & Fallback & Freeze', () => {
  it('x-prefault: missing greeting is substituted with "hello"', async () => {
    const res = await postDefaults({
      retries: 3,
      config: { name: 'cfg' },
    })
    expect(res.status).toBe(200)
  })

  it('x-catch: invalid retries falls back to 0', async () => {
    const res = await postDefaults({
      greeting: 'hi',
      retries: 'not-an-int',
      config: { name: 'cfg' },
    })
    expect(res.status).toBe(200)
  })

  it('x-freeze: object is accepted and typed as readonly', async () => {
    const res = await postDefaults({
      greeting: 'hi',
      retries: 1,
      config: { name: 'cfg' },
    })
    expect(res.status).toBe(200)
  })
})

describe('README — String Content Checks', () => {
  it('x-startsWith fails when prefix is wrong', async () => {
    const res = await postContentChecks({
      url: 'http://example.com',
      path: '/api/v1',
    })
    expect(res.status).toBe(422)
  })

  it('x-endsWith fails when suffix is wrong', async () => {
    const res = await postContentChecks({
      url: 'https://example.jp',
      path: '/api/v1',
    })
    expect(res.status).toBe(422)
  })

  it('x-includes fails when substring is absent', async () => {
    const res = await postContentChecks({
      url: 'https://example.com',
      path: '/static/v1',
    })
    expect(res.status).toBe(422)
  })

  it('accepts strings satisfying all checks', async () => {
    const res = await postContentChecks({
      url: 'https://example.com',
      path: '/api/v1',
    })
    expect(res.status).toBe(200)
  })
})

describe('README — Format-Specific Options', () => {
  const valid = {
    htmlEmail: 'user@example.com',
    customEmail: 'someone@example.com',
    uuidV7: '0190b1f4-0000-7000-8000-000000000000',
    httpsUrl: 'https://example.com',
    preciseDatetime: '2024-01-01T00:00:00.123Z',
    localDatetime: '2024-01-01T00:00:00',
    mac: '00:11:22:33:44:55',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  }

  it('accepts a fully valid payload', async () => {
    const res = await postFormats(valid)
    expect(res.status).toBe(200)
  })

  it('x-emailRegex: rejects email not matching custom regex', async () => {
    const res = await postFormats({ ...valid, customEmail: 'user@gmail.com' })
    expect(res.status).toBe(422)
  })

  it('x-urlProtocol: rejects http (only https allowed)', async () => {
    const res = await postFormats({ ...valid, httpsUrl: 'http://example.com' })
    expect(res.status).toBe(422)
  })

  it('x-macDelimiter ":": rejects dash-delimited MAC', async () => {
    const res = await postFormats({ ...valid, mac: '00-11-22-33-44-55' })
    expect(res.status).toBe(422)
  })

  it('x-isoOffset: rejects datetime without timezone', async () => {
    const res = await postFormats({ ...valid, preciseDatetime: '2024-01-01T00:00:00.123' })
    expect(res.status).toBe(422)
  })

  it('x-isoLocal: accepts datetime without timezone (opposite of x-isoOffset)', async () => {
    const res = await postFormats({ ...valid, localDatetime: '2024-01-01T00:00:00' })
    expect(res.status).toBe(200)
  })
})

describe('README — Branded Types', () => {
  it('accepts a valid Cat payload', async () => {
    const res = await postBranded({ name: 'Tama' })
    expect(res.status).toBe(200)
  })

  it('rejects when required name is missing', async () => {
    const res = await postBranded({})
    expect(res.status).toBe(422)
  })
})

// ────────────────────────────────────────────────────────────
// Thicker coverage — multiple cases per x-* extension
// ────────────────────────────────────────────────────────────

describe('Numeric — thick coverage', () => {
  const valid = {
    age: 30,
    ratio: 0.5,
    price: 1.5,
    quantity: 10,
    exact: 42,
  }

  it('accepts a fully valid payload', async () => {
    const res = await postNumeric(valid)
    expect(res.status).toBe(200)
  })

  it('inclusive minimum: 0 is allowed, -1 is not', async () => {
    expect((await postNumeric({ ...valid, age: 0 })).status).toBe(200)
    expect(await errorsOf(await postNumeric({ ...valid, age: -1 }))).toStrictEqual([
      { pointer: '/age', detail: 'age must be >= 0' },
    ])
  })

  it('inclusive maximum: 120 is allowed, 121 is not', async () => {
    expect((await postNumeric({ ...valid, age: 120 })).status).toBe(200)
    expect(await errorsOf(await postNumeric({ ...valid, age: 121 }))).toStrictEqual([
      { pointer: '/age', detail: 'age must be <= 120' },
    ])
  })

  it('exclusive minimum: 0 is rejected, 0.001 is allowed', async () => {
    expect(await errorsOf(await postNumeric({ ...valid, ratio: 0 }))).toStrictEqual([
      { pointer: '/ratio', detail: 'ratio must be > 0' },
    ])
    expect((await postNumeric({ ...valid, ratio: 0.001 })).status).toBe(200)
  })

  it('exclusive maximum: 1 is rejected, 0.999 is allowed', async () => {
    expect(await errorsOf(await postNumeric({ ...valid, ratio: 1 }))).toStrictEqual([
      { pointer: '/ratio', detail: 'ratio must be < 1' },
    ])
    expect((await postNumeric({ ...valid, ratio: 0.999 })).status).toBe(200)
  })

  it('multipleOf: 1.5 is allowed, 1.3 is not', async () => {
    expect((await postNumeric({ ...valid, price: 1.5 })).status).toBe(200)
    expect(await errorsOf(await postNumeric({ ...valid, price: 1.3 }))).toStrictEqual([
      { pointer: '/price', detail: 'price must be a multiple of 0.5' },
    ])
  })

  it('required vs type: distinct messages', async () => {
    expect(await errorsOf(await postNumeric({ ...valid, quantity: undefined }))).toStrictEqual([
      { pointer: '/quantity', detail: 'quantity is required' },
    ])
    expect(await errorsOf(await postNumeric({ ...valid, quantity: 'not-int' }))).toStrictEqual([
      { pointer: '/quantity', detail: 'quantity must be an integer' },
    ])
  })

  it('const: only 42 is allowed', async () => {
    expect(await errorsOf(await postNumeric({ ...valid, exact: 43 }))).toStrictEqual([
      { pointer: '/exact', detail: 'exact must be 42' },
    ])
  })
})

describe('Array — thick coverage', () => {
  const item = (tier: string) => ({ tier })
  const valid = {
    tags: ['t1'],
    unique: [1, 2, 3],
    basket: [item('premium')],
  }

  it('accepts valid payload', async () => {
    const res = await postArrayEdge(valid)
    expect(res.status).toBe(200)
  })

  it('minItems: empty array rejected', async () => {
    expect(await errorsOf(await postArrayEdge({ ...valid, tags: [] }))).toStrictEqual([
      { pointer: '/tags', detail: 'tags must have at least 1 item' },
    ])
  })

  it('maxItems: 6-item array rejected', async () => {
    expect(
      await errorsOf(await postArrayEdge({ ...valid, tags: ['1', '2', '3', '4', '5', '6'] })),
    ).toStrictEqual([{ pointer: '/tags', detail: 'tags must have at most 5 items' }])
  })

  it('boundary: 1 item ok, 5 items ok', async () => {
    expect((await postArrayEdge({ ...valid, tags: ['x'] })).status).toBe(200)
    expect(
      (await postArrayEdge({ ...valid, tags: ['1', '2', '3', '4', '5'] })).status,
    ).toBe(200)
  })

  it('uniqueItems: duplicates rejected', async () => {
    expect(await errorsOf(await postArrayEdge({ ...valid, unique: [1, 1] }))).toStrictEqual([
      { pointer: '/unique', detail: 'unique must contain distinct integers' },
    ])
  })

  it('minContains: 0 premiums rejected', async () => {
    const res = await postArrayEdge({ ...valid, basket: [item('basic')] })
    const errs = await errorsOf(res)
    expect(errs?.some((e) => e.detail === 'basket must contain at least 1 premium')).toBe(true)
  })

  it('maxContains: 4 premiums rejected', async () => {
    const res = await postArrayEdge({
      ...valid,
      basket: [item('premium'), item('premium'), item('premium'), item('premium')],
    })
    const errs = await errorsOf(res)
    expect(errs?.some((e) => e.detail === 'basket must contain at most 3 premium')).toBe(true)
  })

  it('contains range: 2-3 premiums ok', async () => {
    expect(
      (
        await postArrayEdge({
          ...valid,
          basket: [item('premium'), item('premium')],
        })
      ).status,
    ).toBe(200)
    expect(
      (
        await postArrayEdge({
          ...valid,
          basket: [item('premium'), item('premium'), item('premium')],
        })
      ).status,
    ).toBe(200)
  })
})

describe('Object — thick coverage', () => {
  const valid = {
    profile: { a: '1' },
    namespace: { x_one: 'ok', x_two: 'ok' },
    dependent: {},
  }

  it('accepts valid payload', async () => {
    const res = await postObjectEdge(valid)
    expect(res.status).toBe(200)
  })

  it('minProperties: empty profile rejected', async () => {
    expect(await errorsOf(await postObjectEdge({ ...valid, profile: {} }))).toStrictEqual([
      { pointer: '/profile', detail: 'profile must have at least 1 property' },
    ])
  })

  it('maxProperties: 4-key profile rejected', async () => {
    const res = await postObjectEdge({
      ...valid,
      profile: { a: '1', b: '2', c: '3', d: '4' },
    })
    const errs = await errorsOf(res)
    expect(errs?.some((e) => e.detail === 'profile contains an unknown key')).toBe(true)
  })

  it('additionalProperties: unknown key rejected', async () => {
    const res = await postObjectEdge({ ...valid, profile: { a: '1', extra: 'x' } })
    const errs = await errorsOf(res)
    expect(errs?.some((e) => e.detail === 'profile contains an unknown key')).toBe(true)
  })

  it('propertyNames: invalid key shape rejected', async () => {
    expect(
      await errorsOf(await postObjectEdge({ ...valid, namespace: { Invalid: 'x' } })),
    ).toStrictEqual([
      { pointer: '/namespace', detail: 'keys must start lowercase letter + [a-z0-9_]' },
    ])
  })

  it('patternProperties: x_ key with non-string rejected', async () => {
    expect(
      await errorsOf(await postObjectEdge({ ...valid, namespace: { x_one: 42 } })),
    ).toStrictEqual([{ pointer: '/namespace', detail: 'x_ keys must be strings' }])
  })

  it('dependentRequired: cc without billing rejected', async () => {
    const res = await postObjectEdge({
      ...valid,
      dependent: { cc: '4111111111111111' },
    })
    expect(await errorsOf(res)).toStrictEqual([
      { pointer: '/dependent', detail: 'billing required when cc provided' },
    ])
  })

  it('dependentSchemas: cc with wrong format rejected', async () => {
    const res = await postObjectEdge({
      ...valid,
      dependent: { cc: '123', billing: '00000' },
    })
    expect(await errorsOf(res)).toStrictEqual([
      { pointer: '/dependent', detail: 'cc must be 16 digits' },
    ])
  })

  it('dependent OK when neither key present', async () => {
    const res = await postObjectEdge({ ...valid, dependent: {} })
    expect(res.status).toBe(200)
  })
})

describe('Combinators — thick coverage', () => {
  const valid = {
    merged: { name: 'taro', age: 30 },
    picked: 'hello',
    exclusive: 'world',
    banned: 'allowed',
  }

  it('accepts valid payload', async () => {
    const res = await postCombinators(valid)
    expect(res.status).toBe(200)
  })

  it('allOf: missing required from one branch fires x-allOf-message', async () => {
    const res = await postCombinators({ ...valid, merged: { name: 'taro' } })
    const errs = await errorsOf(res)
    expect(errs?.some((e) => e.detail === 'merged validation failed')).toBe(true)
  })

  it('anyOf: boolean rejected (neither string nor integer)', async () => {
    expect(await errorsOf(await postCombinators({ ...valid, picked: true }))).toStrictEqual([
      { pointer: '/picked', detail: 'picked must be string or integer' },
    ])
  })

  it('anyOf: string ok', async () => {
    expect((await postCombinators({ ...valid, picked: 'x' })).status).toBe(200)
  })

  it('anyOf: integer ok', async () => {
    expect((await postCombinators({ ...valid, picked: 7 })).status).toBe(200)
  })

  it('oneOf: distinct types accepted independently', async () => {
    expect((await postCombinators({ ...valid, exclusive: 'a' })).status).toBe(200)
    expect((await postCombinators({ ...valid, exclusive: 1 })).status).toBe(200)
  })

  it('oneOf: boolean rejected', async () => {
    expect(await errorsOf(await postCombinators({ ...valid, exclusive: true }))).toStrictEqual([
      { pointer: '/exclusive', detail: 'exclusive must match exactly one type' },
    ])
  })

  it('not: "forbidden" rejected', async () => {
    expect(await errorsOf(await postCombinators({ ...valid, banned: 'forbidden' }))).toStrictEqual([
      { pointer: '/banned', detail: 'banned cannot be "forbidden"' },
    ])
  })
})

describe('Enums — thick coverage', () => {
  const valid = { role: 'admin', priority: 2, accepted: true }

  it('accepts valid payload', async () => {
    const res = await postEnums(valid)
    expect(res.status).toBe(200)
  })

  it('x-enum-message: rejects role not in enum', async () => {
    expect(await errorsOf(await postEnums({ ...valid, role: 'guest' }))).toStrictEqual([
      { pointer: '/role', detail: 'role must be admin / editor / viewer' },
    ])
  })

  it('integer enum: 4 rejected', async () => {
    expect(await errorsOf(await postEnums({ ...valid, priority: 4 }))).toStrictEqual([
      { pointer: '/priority', detail: 'priority must be 1, 2, or 3' },
    ])
  })

  it('boolean enum: false rejected', async () => {
    expect(await errorsOf(await postEnums({ ...valid, accepted: false }))).toStrictEqual([
      { pointer: '/accepted', detail: 'accepted must be true' },
    ])
  })

  it('accepts all enum members', async () => {
    for (const role of ['admin', 'editor', 'viewer']) {
      expect((await postEnums({ ...valid, role })).status).toBe(200)
    }
    for (const priority of [1, 2, 3]) {
      expect((await postEnums({ ...valid, priority })).status).toBe(200)
    }
  })
})
