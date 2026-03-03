import { describe, expect, it } from 'vitest'
import app from './app.ts'

// ============================================================
// x-* vendor extension custom validation messages
// Verifies that hono-takibi generated code (src/generated.ts)
// with {error:"msg"} format produces correct error messages
// ============================================================
describe('Custom validation messages via x-* extensions', () => {
  it('accepts valid input', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        age: 20,
        tags: ['dev'],
      }),
    })
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.name).toBe('taro')
  })

  it('rejects short name with x-size-message', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'ab',
        email: 'taro@example.com',
        age: 20,
        tags: ['dev'],
      }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/name', detail: 'Name must be 3-20 characters' },
    ])
  })

  it('rejects too-long name with x-size-message', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'a'.repeat(21),
        email: 'taro@example.com',
        age: 20,
        tags: ['dev'],
      }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/name', detail: 'Name must be 3-20 characters' },
    ])
  })

  it('rejects invalid email with x-error-message', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'bad',
        age: 20,
        tags: ['dev'],
      }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/email', detail: 'Invalid email address' },
    ])
  })

  it('rejects negative age with x-minimum-message', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        age: -1,
        tags: ['dev'],
      }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/age', detail: 'Age must be >= 0' },
    ])
  })

  it('rejects age over 150 with x-maximum-message', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        age: 200,
        tags: ['dev'],
      }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/age', detail: 'Age must be <= 150' },
    ])
  })

  it('rejects weak password with x-pattern-message', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        age: 20,
        password: 'weak',
        tags: ['dev'],
      }),
    })
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
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        age: 20,
        code: 'abc',
        tags: ['dev'],
      }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/code', detail: 'Code must be exactly 5 characters' },
    ])
  })

  it('rejects empty tags array with x-size-message', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        age: 20,
        tags: [],
      }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/tags', detail: 'Must have 1-5 tags' },
    ])
  })

  it('rejects too many tags with x-size-message', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        age: 20,
        tags: ['a', 'b', 'c', 'd', 'e', 'f'],
      }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toStrictEqual([
      { pointer: '/tags', detail: 'Must have 1-5 tags' },
    ])
  })

  it('returns all custom error messages for multiple violations', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'ab',
        email: 'bad',
        age: -1,
        tags: [],
      }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'Name must be 3-20 characters' },
        { pointer: '/email', detail: 'Invalid email address' },
        { pointer: '/age', detail: 'Age must be >= 0' },
        { pointer: '/tags', detail: 'Must have 1-5 tags' },
      ],
    })
  })
})
