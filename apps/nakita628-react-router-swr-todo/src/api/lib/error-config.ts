import { z } from '@hono/zod-openapi'

type ProblemDetails = {
  type: string
  title: string
  status: number
  detail: string
  errors?: ValidationError[]
}

type ValidationError = {
  field: string
  message: string
}

export function formatZodErrors(result: { error: z.ZodError }): ProblemDetails {
  const errors = result.error.issues.map((issue) => ({
    field: issue.path.join('.') || 'body',
    message: issue.message,
  }))
  return {
    type: 'about:blank',
    title: 'Unprocessable Entity',
    status: 422,
    detail: 'The request contains invalid parameters',
    errors,
  }
}

export function configureCustomErrors(): void {
  z.config({
    customError: (issue) => {
      if (issue.code === 'invalid_format') {
        if (issue.format === 'uuid') {
          return 'Must be a valid UUID'
        }
        if (issue.format === 'email') {
          return 'Must be a valid email address'
        }
        if (issue.format === 'url') {
          return 'Must be a valid URL'
        }
        return issue.message
      }
      if (issue.code === 'too_small') {
        if (issue.minimum === 1) {
          return 'This field is required'
        }
        return `Must be at least ${issue.minimum} characters`
      }
      if (issue.code === 'too_big') {
        return `Must be at most ${issue.maximum} characters`
      }
      if (issue.code === 'invalid_type') {
        if (issue.expected === 'string') {
          return 'Must be a string'
        }
        if (issue.expected === 'number') {
          return 'Must be a number'
        }
        return issue.message
      }
      return issue.message
    },
  })
}
