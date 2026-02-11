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
// RFC 9457 Problem Details structure validation
// ============================================================
const expectProblemDetails = (body: Record<string, unknown>) => {
  expect(body.type).toBe('about:blank')
  expect(body.title).toBe('Unprocessable Content')
  expect(body.status).toBe(422)
  expect(body.detail).toBe('Request validation failed')
  expect(body.errors).toBeDefined()
}

// ============================================================
// Pattern 2: defaultHook builds RFC 9457 Problem Details
// ============================================================
describe('Pattern 2: defaultHook (RFC 9457 Problem Details)', () => {
  it('accepts valid input', async () => {
    const res = await appDefaultHook.request('/users', post(validUser))
    expect(res.status).toBe(201)
  })

  it('rejects short name with Problem Details', async () => {
    const res = await appDefaultHook.request('/users', post({ ...validUser, name: 'ab' }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expectProblemDetails(body)
    expect(body.errors).toEqual([
      { pointer: '/name', detail: 'Must be at least 3 characters' },
    ])
  })

  it('rejects invalid email with Problem Details', async () => {
    const res = await appDefaultHook.request('/users', post({ ...validUser, email: 'bad' }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expectProblemDetails(body)
    expect(body.errors[0]).toEqual({
      pointer: '/email',
      detail: 'Invalid email address',
    })
  })

  it('rejects negative age with Problem Details', async () => {
    const res = await appDefaultHook.request('/users', post({ ...validUser, age: -1 }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expectProblemDetails(body)
    expect(body.errors[0]).toEqual({
      pointer: '/age',
      detail: 'Must be at least 0',
    })
  })

  it('rejects too-long name with Problem Details', async () => {
    const res = await appDefaultHook.request('/users', post({ ...validUser, name: 'a'.repeat(21) }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expectProblemDetails(body)
    expect(body.errors[0]).toEqual({
      pointer: '/name',
      detail: 'Must be at most 20 characters',
    })
  })

  it('returns all errors for multiple violations', async () => {
    const res = await appDefaultHook.request('/users', post({ name: 'ab', email: 'bad', age: -1 }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expectProblemDetails(body)
    expect(body.errors).toHaveLength(3)
    const details = body.errors.map((e: { detail: string }) => e.detail)
    expect(details).toContain('Must be at least 3 characters')
    expect(details).toContain('Invalid email address')
    expect(details).toContain('Must be at least 0')
  })
})

// ============================================================
// Pattern 3: Per-route hook builds RFC 9457 Problem Details
// ============================================================
describe('Pattern 3: Per-route hook (RFC 9457 Problem Details)', () => {
  it('accepts valid input', async () => {
    const res = await appRouteHook.request('/users', post(validUser))
    expect(res.status).toBe(201)
  })

  it('rejects with 422 and Problem Details', async () => {
    const res = await appRouteHook.request('/users', post({ ...validUser, name: 'ab' }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expectProblemDetails(body)
    expect(body.errors).toEqual([
      { pointer: '/name', detail: 'Must be at least 3 characters' },
    ])
  })

  it('returns all errors for multiple violations', async () => {
    const res = await appRouteHook.request('/users', post({ name: 'ab', email: 'bad', age: -1 }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expectProblemDetails(body)
    expect(body.errors).toHaveLength(3)
    const details = body.errors.map((e: { detail: string }) => e.detail)
    expect(details).toContain('Must be at least 3 characters')
    expect(details).toContain('Invalid email address')
    expect(details).toContain('Must be at least 0')
  })
})
