import { z } from '@hono/zod-openapi'
import { describe, expect, it } from 'vitest'
import { formatZodErrors } from './error'

describe('formatZodErrors', () => {
  it('should format a single validation error', () => {
    const schema = z.object({
      email: z.string().email(),
    })
    const result = schema.safeParse({ email: 'invalid' })
    if (result.success) throw new Error('Expected validation to fail')

    const formatted = formatZodErrors(result)

    expect(formatted.type).toBe('https://datatracker.ietf.org/doc/html/rfc9110#section-15.5.21')
    expect(formatted.title).toBe('Unprocessable Content')
    expect(formatted.status).toBe(422)
    expect(formatted.detail).toBe('The request contains invalid parameters')
    expect(formatted.errors).toHaveLength(1)
    expect(formatted.errors[0].field).toBe('email')
  })

  it('should format multiple validation errors', () => {
    const schema = z.object({
      email: z.string().email(),
      name: z.string().min(1),
    })
    const result = schema.safeParse({ email: 'invalid', name: '' })
    if (result.success) throw new Error('Expected validation to fail')

    const formatted = formatZodErrors(result)

    expect(formatted.errors.length).toBeGreaterThanOrEqual(2)
  })

  it('should use "body" as field name for root-level errors', () => {
    const schema = z.string().min(1)
    const result = schema.safeParse('')
    if (result.success) throw new Error('Expected validation to fail')

    const formatted = formatZodErrors(result)

    expect(formatted.errors[0].field).toBe('body')
  })

  it('should join nested paths with dots', () => {
    const schema = z.object({
      user: z.object({
        email: z.string().email(),
      }),
    })
    const result = schema.safeParse({ user: { email: 'invalid' } })
    if (result.success) throw new Error('Expected validation to fail')

    const formatted = formatZodErrors(result)

    expect(formatted.errors[0].field).toBe('user.email')
  })
})
