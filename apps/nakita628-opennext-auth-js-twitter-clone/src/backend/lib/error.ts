import { z } from '@hono/zod-openapi'

/**
 * Format Zod validation errors into RFC 7807 Problem Details
 * @see https://datatracker.ietf.org/doc/html/rfc7807
 */
export function formatZodErrors(result: { error: z.ZodError }) {
  return {
    type: 'https://datatracker.ietf.org/doc/html/rfc9110#section-15.5.21',
    title: 'Unprocessable Content',
    status: 422,
    detail: 'The request contains invalid parameters',
    errors: result.error.issues.map((issue) => ({
      field: issue.path.join('.') || 'body',
      message: issue.message,
    })),
  }
}

/**
 * Configure custom error messages for Zod validation
 */
export function configureCustomErrors(): void {
  z.config({
    customError: (issue) => {
      switch (issue.code) {
        case 'invalid_format':
          switch (issue.format) {
            case 'uuid':
              return 'Must be a valid UUID (RFC 4122)'
            case 'email':
              return 'Must be a valid email address (RFC 5321)'
            case 'url':
            case 'uri':
              return 'Must be a valid URI (RFC 3986)'
            case 'datetime':
              return 'Must be a valid date-time (ISO 8601)'
            case 'date':
              return 'Must be a valid date (ISO 8601)'
            case 'time':
              return 'Must be a valid time (ISO 8601)'
            case 'ipv4':
              return 'Must be a valid IPv4 address (RFC 791)'
            case 'ipv6':
              return 'Must be a valid IPv6 address (RFC 4291)'
            default:
              return issue.message
          }

        case 'too_small':
          return `Must be at least ${issue.minimum} characters`

        case 'too_big':
          return `Must be at most ${issue.maximum} characters`

        case 'invalid_type':
          switch (issue.expected) {
            case 'string':
              return 'Must be a string'
            case 'number':
              return 'Must be a number'
            case 'integer':
              return 'Must be an integer'
            case 'boolean':
              return 'Must be a boolean'
            case 'array':
              return 'Must be an array'
            case 'object':
              return 'Must be an object'
            default:
              return issue.message
          }

        default:
          return issue.message
      }
    },
  })
}
