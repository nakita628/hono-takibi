import { z } from '@hono/zod-openapi'
import { describe, expect, it } from 'vitest'
import { formatZodErrors } from './format-zod-errors'

describe('formatZodErrors', () => {
  it('should format a single validation error', () => {
    const schema = z.object({
      email: z.email({ error: 'Must be a valid email address' }),
    })
    const result = schema.safeParse({ email: 'invalid' })
    if (result.success) throw new Error('Expected validation to fail')

    const formatted = formatZodErrors(result)

    expect(formatted).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'Must be a valid email address' }],
    })
  })

  it('should format multiple validation errors', () => {
    const schema = z.object({
      email: z.email({ error: 'Must be a valid email address' }),
      userId: z.uuid({ error: 'Must be a valid UUID' }),
    })
    const result = schema.safeParse({ email: 'invalid', userId: 'not-uuid' })
    if (result.success) throw new Error('Expected validation to fail')

    const formatted = formatZodErrors(result)

    expect(formatted).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/email', detail: 'Must be a valid email address' },
        { pointer: '/userId', detail: 'Must be a valid UUID' },
      ],
    })
  })

  it('should use "/body" as pointer for root-level errors', () => {
    const schema = z.string().min(1, { error: 'Must not be empty' })
    const result = schema.safeParse('')
    if (result.success) throw new Error('Expected validation to fail')

    const formatted = formatZodErrors(result)

    expect(formatted).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/body', detail: 'Must not be empty' }],
    })
  })

  it('should format nested paths as JSON Pointer', () => {
    const schema = z.object({
      user: z.object({
        email: z.email({ error: 'Must be a valid email address' }),
      }),
    })
    const result = schema.safeParse({ user: { email: 'invalid' } })
    if (result.success) throw new Error('Expected validation to fail')

    const formatted = formatZodErrors(result)

    expect(formatted).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/user/email', detail: 'Must be a valid email address' }],
    })
  })

  it('should use x-message custom error messages from Zod schema', () => {
    const schema = z.object({
      postId: z.uuid({ error: 'Must be a valid UUID' }),
    })
    const result = schema.safeParse({ postId: 'abc' })
    if (result.success) throw new Error('Expected validation to fail')

    const formatted = formatZodErrors(result)

    expect(formatted.errors[0]).toStrictEqual({
      pointer: '/postId',
      detail: 'Must be a valid UUID',
    })
  })
})
