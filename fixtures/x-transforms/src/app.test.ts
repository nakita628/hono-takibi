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
})
