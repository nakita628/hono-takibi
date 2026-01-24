import { z } from '@hono/zod-openapi'

/**
 * RFC 7807 Problem Details error response structure.
 */
type ProblemDetails = {
  type: string
  title: string
  status: number
  detail: string
  errors?: ValidationError[]
}

/**
 * Individual field validation error.
 */
type ValidationError = {
  field: string
  message: string
}

/**
 * Converts Zod error to RFC 7807 Problem Details format.
 *
 * @param error - Zod validation error
 * @returns Array of validation errors with field paths and messages
 */
export function makeZodErrors(error: z.ZodError): ValidationError[] {
  return error.issues.map((issue) => ({
    field: issue.path.join('.') || 'body',
    message: issue.message,
  }))
}

/**
 * Creates a RFC 7807 Problem Details response for validation errors.
 *
 * @param errors - Array of validation errors
 * @returns Problem Details object
 */
export function makeProblemDetails(errors: ValidationError[]): ProblemDetails {
  return {
    type: 'about:blank',
    title: 'Unprocessable Entity',
    status: 422,
    detail: 'The request contains invalid parameters',
    errors,
  }
}

/**
 * Configures custom error messages for Zod validation.
 *
 * @remarks
 * Sets up user-friendly error messages for common validation failures.
 * Messages follow REST API best practices for clarity and actionability.
 */
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
