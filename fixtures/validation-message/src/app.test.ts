import { describe, expect, it } from 'vitest'
import appDefault from './app-default.ts'
import appDefaultHook from './app-default-hook.ts'
import appRouteHook from './app-route-hook.ts'

// ============================================================
// Pattern 1: No hook (default behavior)
// ============================================================
describe('Pattern 1: No hook (default behavior)', () => {
  it('accepts valid input', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.name).toBe('taro')
  })

  it('rejects short name with raw ZodError', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ab', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
  })

  it('rejects invalid email with raw ZodError', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'bad', age: 20 }),
    })
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
  })

  it('rejects negative age with raw ZodError', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: -1 }),
    })
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
  })
})

// ============================================================
// Pattern 2: defaultHook builds RFC 9457 Problem Details
// ============================================================
describe('Pattern 2: defaultHook (RFC 9457 Problem Details)', () => {
  it('accepts valid input', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(201)
  })

  it('rejects short name with Problem Details', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ab', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Must be at least 3 characters' }],
    })
  })

  it('rejects invalid email with Problem Details', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'bad', age: 20 }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'Invalid email address' }],
    })
  })

  it('rejects negative age with Problem Details', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: -1 }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Must be at least 0' }],
    })
  })

  it('rejects too-long name with Problem Details', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a'.repeat(21), email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Must be at most 20 characters' }],
    })
  })

  it('returns all errors for multiple violations', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ab', email: 'bad', age: -1 }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'Must be at least 3 characters' },
        { pointer: '/email', detail: 'Invalid email address' },
        { pointer: '/age', detail: 'Must be at least 0' },
      ],
    })
  })
})

// ============================================================
// Pattern 3: Per-route hook builds RFC 9457 Problem Details
// ============================================================
describe('Pattern 3: Per-route hook (RFC 9457 Problem Details)', () => {
  it('accepts valid input', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(201)
  })

  it('rejects with 422 and Problem Details', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ab', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Must be at least 3 characters' }],
    })
  })

  it('returns all errors for multiple violations', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'ab', email: 'bad', age: -1 }),
    })
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'Must be at least 3 characters' },
        { pointer: '/email', detail: 'Invalid email address' },
        { pointer: '/age', detail: 'Must be at least 0' },
      ],
    })
  })
})
