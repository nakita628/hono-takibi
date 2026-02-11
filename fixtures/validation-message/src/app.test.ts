import { describe, expect, it } from 'vitest'
import appDefault from './app-default.ts'
import appDefaultHook from './app-default-hook.ts'
import appRouteHook from './app-route-hook.ts'

const post = (body: unknown) => ({
  method: 'POST' as const,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

const validUser = { name: 'Tanjiro', email: 'tanjiro@example.com', age: 15 }

// ============================================================
// Pattern 1: No hook (default behavior)
// ============================================================
describe('Pattern 1: No hook (default behavior)', () => {
  it('accepts valid input', async () => {
    const res = await appDefault.request('/users', post(validUser))
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.name).toBe('Tanjiro')
  })

  it('rejects short name with raw ZodError', async () => {
    const res = await appDefault.request('/users', post({ ...validUser, name: 'ab' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
  })

  it('rejects invalid email with raw ZodError', async () => {
    const res = await appDefault.request('/users', post({ ...validUser, email: 'bad' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
  })

  it('rejects negative age with raw ZodError', async () => {
    const res = await appDefault.request('/users', post({ ...validUser, age: -1 }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
  })
})

// ============================================================
// Pattern 2: defaultHook builds messages inline
// ============================================================
describe('Pattern 2: defaultHook (inline message building)', () => {
  it('accepts valid input', async () => {
    const res = await appDefaultHook.request('/users', post(validUser))
    expect(res.status).toBe(201)
  })

  it('rejects short name', async () => {
    const res = await appDefaultHook.request('/users', post({ ...validUser, name: 'ab' }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.errors).toEqual([
      { field: 'name', message: 'Must be at least 3 characters', code: 'too_small' },
    ])
  })

  it('rejects invalid email', async () => {
    const res = await appDefaultHook.request('/users', post({ ...validUser, email: 'bad' }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors[0]).toEqual({
      field: 'email',
      message: 'Invalid email address',
      code: 'invalid_format',
    })
  })

  it('rejects negative age', async () => {
    const res = await appDefaultHook.request('/users', post({ ...validUser, age: -1 }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors[0]).toEqual({
      field: 'age',
      message: 'Must be at least 0',
      code: 'too_small',
    })
  })

  it('rejects too-long name', async () => {
    const res = await appDefaultHook.request('/users', post({ ...validUser, name: 'a'.repeat(21) }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors[0]).toEqual({
      field: 'name',
      message: 'Must be at most 20 characters',
      code: 'too_big',
    })
  })

  it('returns all messages for multiple violations', async () => {
    const res = await appDefaultHook.request('/users', post({ name: 'ab', email: 'bad', age: -1 }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.errors).toHaveLength(3)
    const messages = body.errors.map((e: { message: string }) => e.message)
    expect(messages).toContain('Must be at least 3 characters')
    expect(messages).toContain('Invalid email address')
    expect(messages).toContain('Must be at least 0')
  })
})

// ============================================================
// Pattern 3: Per-route hook builds messages inline (422)
// ============================================================
describe('Pattern 3: Per-route hook (inline message building)', () => {
  it('accepts valid input', async () => {
    const res = await appRouteHook.request('/users', post(validUser))
    expect(res.status).toBe(201)
  })

  it('rejects with 422 and formatted message', async () => {
    const res = await appRouteHook.request('/users', post({ ...validUser, name: 'ab' }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.errors).toEqual([
      { field: 'name', message: 'Must be at least 3 characters', code: 'too_small' },
    ])
  })

  it('returns all messages for multiple violations', async () => {
    const res = await appRouteHook.request('/users', post({ name: 'ab', email: 'bad', age: -1 }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.errors).toHaveLength(3)
    const messages = body.errors.map((e: { message: string }) => e.message)
    expect(messages).toContain('Must be at least 3 characters')
    expect(messages).toContain('Invalid email address')
    expect(messages).toContain('Must be at least 0')
  })
})
