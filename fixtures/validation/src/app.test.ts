import { describe, expect, it } from 'vitest'
import app from './app.ts'

// ============================================================
// x-* vendor extension custom validation messages
// Verifies that hono-takibi generated code (src/generated.ts)
// with {error:"msg"} format produces correct error messages
// ============================================================

const validInput = {
  name: 'taro',
  email: 'taro@example.com',
  age: 20,
  tags: ['dev'],
  priority: 5,
}

function postUsers(body: Record<string, unknown>) {
  return app.request('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function postValidate(body: Record<string, unknown>) {
  return app.request('/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function postMetadata(body: Record<string, unknown>) {
  return app.request('/metadata', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('Custom validation messages via x-* extensions', () => {
  it('accepts valid input', async () => {
    const res = await postUsers(validInput)
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.name).toBe('taro')
  })

  it('rejects short name with x-minimum-message', async () => {
    const res = await postUsers({ ...validInput, name: 'ab' })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/name', detail: 'Name must be at least 3 characters' },
    ])
  })

  it('rejects too-long name with x-maximum-message', async () => {
    const res = await postUsers({ ...validInput, name: 'a'.repeat(21) })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/name', detail: 'Name must be at most 20 characters' },
    ])
  })

  it('rejects invalid email with x-error-message', async () => {
    const res = await postUsers({ ...validInput, email: 'bad' })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/email', detail: 'Invalid email address' }])
  })

  it('rejects negative age with x-minimum-message', async () => {
    const res = await postUsers({ ...validInput, age: -1 })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/age', detail: 'Age must be >= 0' }])
  })

  it('rejects age over 150 with x-maximum-message', async () => {
    const res = await postUsers({ ...validInput, age: 200 })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/age', detail: 'Age must be <= 150' }])
  })

  it('rejects weak password with x-pattern-message', async () => {
    const res = await postUsers({ ...validInput, password: 'weak' })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      {
        pointer: '/password',
        detail: 'Password must contain uppercase and number, min 8 chars',
      },
    ])
  })

  it('rejects wrong-length code with x-size-message (fixed length)', async () => {
    const res = await postUsers({ ...validInput, code: 'abc' })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/code', detail: 'Code must be exactly 5 characters' },
    ])
  })

  it('rejects empty tags array with x-size-message', async () => {
    const res = await postUsers({ ...validInput, tags: [] })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/tags', detail: 'Must have 1-5 tags' }])
  })

  it('rejects too many tags with x-size-message', async () => {
    const res = await postUsers({ ...validInput, tags: ['a', 'b', 'c', 'd', 'e', 'f'] })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/tags', detail: 'Must have 1-5 tags' }])
  })

  // ── Arrow function error messages (Zod v4) ──────────────
  it('rejects non-string nickname with arrow function x-error-message', async () => {
    const res = await postUsers({ ...validInput, nickname: 123 })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/nickname', detail: 'Nickname is invalid' }])
  })

  it('rejects non-integer priority with arrow function x-error-message (iss arg)', async () => {
    const res = await postUsers({ ...validInput, priority: 'abc' })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/priority', detail: 'Priority must be an integer' },
    ])
  })

  it('rejects priority below minimum with x-minimum-message', async () => {
    const res = await postUsers({ ...validInput, priority: 0 })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/priority', detail: 'Priority must be >= 1' }])
  })

  it('rejects priority above maximum with x-maximum-message', async () => {
    const res = await postUsers({ ...validInput, priority: 11 })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/priority', detail: 'Priority must be <= 10' }])
  })

  // ── x-multipleOf-message ─────────────────────────────────
  it('rejects non-multiple score with x-multipleOf-message', async () => {
    const res = await postUsers({ ...validInput, score: 7 })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/score', detail: 'Score must be a multiple of 5' },
    ])
  })

  it('accepts valid multiple score', async () => {
    const res = await postUsers({ ...validInput, score: 10 })
    expect(res.status).toBe(201)
  })

  // ── x-enum-error-messages ────────────────────────────────
  it('rejects invalid role with x-enum-error-messages (union-level)', async () => {
    const res = await postUsers({ ...validInput, role: 'unknown' })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/role', detail: 'Must be a valid role' }])
  })

  it('accepts valid role', async () => {
    const res = await postUsers({ ...validInput, role: 'admin' })
    expect(res.status).toBe(201)
  })

  // ── x-dependentRequired-message ──────────────────────────
  it('rejects password without code with x-dependentRequired-message', async () => {
    const res = await postUsers({ ...validInput, password: 'StrongPass1' })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/', detail: 'Code is required when password is provided' },
    ])
  })

  it('accepts password with code', async () => {
    const res = await postUsers({ ...validInput, password: 'StrongPass1', code: 'ABCDE' })
    expect(res.status).toBe(201)
  })

  // ── x-anyOf-message ──────────────────────────────────────
  it('rejects invalid anyOf value with x-anyOf-message', async () => {
    const res = await postValidate({ value: true })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/value', detail: 'Must be a string or integer' },
    ])
  })

  it('accepts string value for anyOf', async () => {
    const res = await postValidate({ value: 'hello' })
    expect(res.status).toBe(200)
  })

  it('accepts integer value for anyOf', async () => {
    const res = await postValidate({ value: 42 })
    expect(res.status).toBe(200)
  })

  // ── x-oneOf-message ──────────────────────────────────────
  it('rejects invalid oneOf value with x-oneOf-message', async () => {
    const res = await postValidate({ value: 'ok', category: true })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/category', detail: 'Must be exactly one type' },
    ])
  })

  it('accepts string category for oneOf', async () => {
    const res = await postValidate({ value: 'ok', category: 'text' })
    expect(res.status).toBe(200)
  })

  // ── x-not-message ────────────────────────────────────────
  it('rejects string value with x-not-message', async () => {
    const res = await postValidate({ value: 'ok', forbidden: 'text' })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([{ pointer: '/forbidden', detail: 'Must not be a string' }])
  })

  it('accepts non-string value for not', async () => {
    const res = await postValidate({ value: 'ok', forbidden: 42 })
    expect(res.status).toBe(200)
  })

  // ── x-propertyNames-message ──────────────────────────────
  it('rejects invalid key names with x-propertyNames-message', async () => {
    const res = await postMetadata({ ValidKey: 'value' })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/', detail: 'Keys must be lowercase with underscores only' },
    ])
  })

  it('accepts valid lowercase keys', async () => {
    const res = await postMetadata({ valid_key: 'value', another: 'value' })
    expect(res.status).toBe(200)
  })

  // ── Multiple violations ─────────────────────────────────
  it('returns all custom error messages for multiple violations', async () => {
    const res = await postUsers({
      name: 'ab',
      email: 'bad',
      age: -1,
      tags: [],
      priority: 0,
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'Name must be at least 3 characters' },
        { pointer: '/email', detail: 'Invalid email address' },
        { pointer: '/age', detail: 'Age must be >= 0' },
        { pointer: '/tags', detail: 'Must have 1-5 tags' },
        { pointer: '/priority', detail: 'Priority must be >= 1' },
      ],
    })
  })
})
