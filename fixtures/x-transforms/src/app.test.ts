import { describe, expect, it } from 'vitest'
import app from './app.ts'

const post = (path: string) => (body: unknown) =>
  app.request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

const postStrings = post('/strings')
const postCoerce = post('/coerce')
const postFormats = post('/formats')
const postP2 = post('/p2')
const postCustom = post('/custom')
const postV25 = post('/v25')
const postV26 = post('/v26')

describe('x-trim / x-toLowerCase / x-toUpperCase / x-normalize (P1 transforms)', () => {
  it('trims whitespace from x-trim fields', async () => {
    const res = await postStrings({
      trimmed: '  hello  ',
      lowered: 'World',
      uppered: 'world',
      normalized: 'café',
      emailNormalized: '  Foo@Bar.COM ',
      allChained: '  Café ',
    })
    expect(res.status).toBe(200)
    const body = (await res.json()) as Record<string, string>
    expect(body.trimmed).toBe('hello')
  })

  it('lowercases x-toLowerCase fields', async () => {
    const res = await postStrings({
      trimmed: 'x',
      lowered: 'HELLO',
      uppered: 'world',
      normalized: 'x',
      emailNormalized: 'a@b.com',
      allChained: 'x',
    })
    const body = (await res.json()) as Record<string, string>
    expect(body.lowered).toBe('hello')
  })

  it('uppercases x-toUpperCase fields', async () => {
    const res = await postStrings({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'hello',
      normalized: 'x',
      emailNormalized: 'a@b.com',
      allChained: 'x',
    })
    const body = (await res.json()) as Record<string, string>
    expect(body.uppered).toBe('HELLO')
  })

  it('NFC-normalizes x-normalize fields', async () => {
    // "café" via NFD: e + combining acute accent → must compose to single codepoint
    const decomposed = 'café'
    const composed = 'café'
    const res = await postStrings({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'X',
      normalized: decomposed,
      emailNormalized: 'a@b.com',
      allChained: 'x',
    })
    const body = (await res.json()) as Record<string, string>
    expect(body.normalized).toBe(composed)
  })

  it('chains trim → lowercase on email format', async () => {
    const res = await postStrings({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'X',
      normalized: 'x',
      emailNormalized: '  Foo@Example.COM  ',
      allChained: 'x',
    })
    const body = (await res.json()) as Record<string, string>
    expect(body.emailNormalized).toBe('foo@example.com')
  })

  it('chains trim → lowercase → NFC normalize', async () => {
    const res = await postStrings({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'X',
      normalized: 'x',
      emailNormalized: 'a@b.com',
      allChained: '  CAFÉ ',
    })
    const body = (await res.json()) as Record<string, string>
    expect(body.allChained).toBe('café')
  })
})

describe('x-coerce (P1)', () => {
  it('coerces string/number/boolean/date inputs', async () => {
    const res = await postCoerce({
      asString: 123,
      asDate: '2026-05-10T12:34:56.000Z',
      asNumber: '42.5',
      asInt: '7',
      asBool: 'true',
    })
    expect(res.status).toBe(200)
    const body = (await res.json()) as Record<string, unknown>
    expect(body.asString).toBe('123')
    expect(body.asNumber).toBe(42.5)
    expect(body.asInt).toBe(7)
    expect(body.asBool).toBe(true)
    expect(body.asDate).toBe('2026-05-10T12:34:56.000Z')
  })

  it('rejects negative integers when minimum:0 is set', async () => {
    const res = await postCoerce({
      asString: 'x',
      asDate: '2026-05-10T00:00:00.000Z',
      asNumber: 0,
      asInt: '-5',
      asBool: 'false',
    })
    expect(res.status).toBe(422)
  })
})

describe('x-* format options (P1)', () => {
  const validBody = {
    emailHtml5: 'user@example.com',
    uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
    httpsUrl: 'https://example.com/path',
    preciseDatetime: '2026-05-10T12:34:56.000+09:00',
    localDatetime: '2026-05-10T12:34:56',
    colonMac: '01:23:45:67:89:ab',
    hs256Jwt:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    sha256Hash: 'a'.repeat(64),
    phone: '+819012345678',
    customEmail: 'foo@example.com',
    guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
    httpOnlyUrl: 'https://example.com/api',
    host: 'example.com',
    dotMac: '01.23.45.67.89.ab',
  }

  it('accepts a fully valid format-options payload', async () => {
    const res = await postFormats(validBody)
    expect(res.status).toBe(200)
  })

  it('rejects non-https URL when x-urlProtocol=^https$ is set', async () => {
    const res = await postFormats({ ...validBody, httpsUrl: 'http://example.com/' })
    expect(res.status).toBe(422)
  })

  it('rejects non-E.164 phone numbers', async () => {
    const res = await postFormats({ ...validBody, phone: '090-1234-5678' })
    expect(res.status).toBe(422)
  })

  it('rejects MAC addresses with the wrong delimiter', async () => {
    const res = await postFormats({ ...validBody, colonMac: '01-23-45-67-89-ab' })
    expect(res.status).toBe(422)
  })

  it('rejects sha256 hash strings of the wrong length', async () => {
    const res = await postFormats({ ...validBody, sha256Hash: 'a'.repeat(32) })
    expect(res.status).toBe(422)
  })

  it('rejects emails that do not match x-emailRegex', async () => {
    const res = await postFormats({ ...validBody, customEmail: 'foo@other.com' })
    expect(res.status).toBe(422)
  })

  it('rejects non-HTTP/HTTPS URLs for httpUrl format', async () => {
    const res = await postFormats({ ...validBody, httpOnlyUrl: 'ftp://example.com/' })
    expect(res.status).toBe(422)
  })

  it('rejects MAC addresses with the wrong delimiter when x-macDelimiter is "."', async () => {
    const res = await postFormats({ ...validBody, dotMac: '01:23:45:67:89:ab' })
    expect(res.status).toBe(422)
  })
})

describe('P2: x-includes / x-startsWith / x-endsWith / x-catch / x-prefault', () => {
  const validBody = {
    includesSlug: 'GET /api/users',
    startsWithHttps: 'https://example.com',
    endsWithTest: 'something.test',
    withCatch: 5,
    withPrefault: 'hello',
  }

  it('accepts a fully valid P2 payload', async () => {
    const res = await postP2(validBody)
    expect(res.status).toBe(200)
  })

  it('rejects strings missing the x-includes substring', async () => {
    const res = await postP2({ ...validBody, includesSlug: 'GET /v2/users' })
    expect(res.status).toBe(422)
  })

  it('rejects strings without the x-startsWith prefix', async () => {
    const res = await postP2({ ...validBody, startsWithHttps: 'http://example.com' })
    expect(res.status).toBe(422)
  })

  it('rejects strings without the x-endsWith suffix', async () => {
    const res = await postP2({ ...validBody, endsWithTest: 'foo.tst' })
    expect(res.status).toBe(422)
  })

  it('uses the .catch fallback when validation would fail', async () => {
    const res = await postP2({ ...validBody, withCatch: 'not-an-integer' })
    expect(res.status).toBe(200)
    const body = (await res.json()) as Record<string, unknown>
    expect(body.withCatch).toBe(0)
  })

  it('uses the .prefault value when the field is undefined', async () => {
    const { withPrefault: _omitted, ...rest } = validBody
    const res = await postP2(rest)
    expect(res.status).toBe(200)
    const body = (await res.json()) as Record<string, unknown>
    expect(body.withPrefault).toBe('default-value')
  })
})

describe('v2.4: x-refine / x-superRefine / x-codec', () => {
  const validBody = {
    password: 'Hunter2pw',
    confirmPassword: 'Hunter2pw',
    normalizedEmail: '  USER@Example.COM  ',
    updatedAt: '2026-05-10T12:34:56.000Z',
  }

  it('accepts a valid custom payload', async () => {
    const res = await postCustom(validBody)
    expect(res.status).toBe(200)
    const body = (await res.json()) as Record<string, unknown>
    expect(body.normalizedEmail).toBe('user@example.com')
    // updatedAt is re-encoded to ISO string by the codec on response.
    expect(body.updatedAt).toBe('2026-05-10T12:34:56.000Z')
  })

  it('rejects passwords shorter than 8 chars (x-refine #1)', async () => {
    const res = await postCustom({ ...validBody, password: 'Aaaaaaa' })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { detail: string }[] }
    expect(body.errors[0].detail).toBe('Password must be at least 8 characters')
  })

  it('rejects passwords without an uppercase letter (x-refine #2)', async () => {
    const res = await postCustom({ ...validBody, password: 'hunter2pw' })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { detail: string }[] }
    expect(body.errors[0].detail).toBe('Password must contain an uppercase letter')
  })

  it('rejects blocked email domains (x-superRefine)', async () => {
    const res = await postCustom({ ...validBody, normalizedEmail: 'bad@blocked.example' })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { detail: string }[] }
    expect(body.errors[0].detail).toBe('Blocked domain')
  })

  it('x-codec: date — invalid date strings are rejected', async () => {
    const res = await postCustom({ ...validBody, updatedAt: 'not-a-date' })
    expect(res.status).toBe(422)
  })
})

describe('v2.5: x-required-message / contains / x-const-message / errorMessage', () => {
  const validBody = {
    name: 'Alice',
    tags: ['important', 'normal'],
    status: 'active',
  }

  it('accepts a valid v2.5 payload', async () => {
    const res = await postV25(validBody)
    expect(res.status).toBe(200)
  })

  it('uses x-required-message when name is missing', async () => {
    const { name: _, ...rest } = validBody
    const res = await postV25(rest)
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { detail: string }[] }
    expect(body.errors[0].detail).toBe('名前は必須です')
  })

  it('uses x-error-message when name has wrong type', async () => {
    const res = await postV25({ ...validBody, name: 42 })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { detail: string }[] }
    expect(body.errors[0].detail).toBe('名前は文字列である必要があります')
  })

  it('rejects when tags do not contain "important"', async () => {
    const res = await postV25({ ...validBody, tags: ['a', 'b', 'c'] })
    expect(res.status).toBe(422)
  })

  it('rejects when too many "important" tags (maxContains exceeded)', async () => {
    const res = await postV25({
      ...validBody,
      tags: ['important', 'important', 'important', 'important'],
    })
    expect(res.status).toBe(422)
  })

  it('uses x-const-message for status mismatch', async () => {
    const res = await postV25({ ...validBody, status: 'inactive' })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { detail: string }[] }
    expect(body.errors[0].detail).toBe('ステータスは active のみ')
  })

  it('uses errorMessage.additionalProperties for extra fields (strictObject)', async () => {
    const res = await postV25({ ...validBody, extra: 'not allowed' })
    expect(res.status).toBe(422)
    const body = (await res.json()) as { errors: { detail: string }[] }
    expect(body.errors[0].detail).toBe('未知のフィールドは許可されません')
  })
})

describe('v2.6: contentEncoding / dependentSchemas / if-then-else', () => {
  // base64-encoded JSON: {"theme":"dark"}
  const validSettings = Buffer.from(JSON.stringify({ theme: 'dark' })).toString('base64')

  it('accepts a valid premium payload (if=premium → then requires feature)', async () => {
    const res = await postV26({
      kind: 'premium',
      feature: 'pro-mode',
      settings: validSettings,
    })
    expect(res.status).toBe(200)
  })

  it('accepts a valid basic payload (if=basic → else, no feature required)', async () => {
    const res = await postV26({
      kind: 'basic',
      settings: validSettings,
    })
    expect(res.status).toBe(200)
  })

  it('rejects premium without feature (then requires feature)', async () => {
    const res = await postV26({
      kind: 'premium',
      settings: validSettings,
    })
    expect(res.status).toBe(422)
  })

  it('rejects when settings has invalid theme value (contentSchema validation)', async () => {
    const badSettings = Buffer.from(JSON.stringify({ theme: 'rainbow' })).toString('base64')
    const res = await postV26({
      kind: 'basic',
      settings: badSettings,
    })
    expect(res.status).toBe(422)
  })

  it('rejects when settings is not valid base64', async () => {
    const res = await postV26({
      kind: 'basic',
      settings: '!!!not-base64!!!',
    })
    expect(res.status).toBe(422)
  })

  // Review-driven negative tests (loid B / yusukebe 1 / yuri 2.4):
  // Verify that if/then/else actually rejects missing required keys, not just
  // the .openapi({required:[...]}) metadata pass-through.

  it('if-then: rejects when then-required key is missing (semantic verification)', async () => {
    // kind=premium triggers then which requires "feature"
    const res = await postV26({
      kind: 'premium',
      settings: validSettings,
      // feature intentionally omitted
    })
    expect(res.status).toBe(422)
  })

  it('if-else: basic does NOT trigger then-required, so missing feature is OK', async () => {
    const res = await postV26({
      kind: 'basic',
      settings: validSettings,
      // feature intentionally omitted — should pass because if=premium is false
    })
    expect(res.status).toBe(200)
  })

  it('if-else: premium WITH feature passes (the canonical happy path)', async () => {
    const res = await postV26({
      kind: 'premium',
      feature: 'pro-mode',
      settings: validSettings,
    })
    expect(res.status).toBe(200)
  })
})
