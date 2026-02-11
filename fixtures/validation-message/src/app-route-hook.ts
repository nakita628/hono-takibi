import { OpenAPIHono } from '@hono/zod-openapi'
import { createUserRoute } from './routes.ts'

// Pattern 3: Per-route hook builds RFC 9457 Problem Details, returns 422
const app = new OpenAPIHono()

app.openapi(
  createUserRoute,
  (c) => {
    const { name, email, age } = c.req.valid('json')
    return c.json({ id: 1, name, email, age }, 201)
  },
  (result, c) => {
    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        let detail = issue.message
        switch (issue.code) {
          case 'too_small':
            detail =
              issue.origin === 'string'
                ? `Must be at least ${issue.minimum} characters`
                : issue.origin === 'array'
                  ? `Must have at least ${issue.minimum} items`
                  : `Must be at least ${issue.minimum}`
            break
          case 'too_big':
            detail =
              issue.origin === 'string'
                ? `Must be at most ${issue.maximum} characters`
                : issue.origin === 'array'
                  ? `Must have at most ${issue.maximum} items`
                  : `Must be at most ${issue.maximum}`
            break
          case 'invalid_format':
            if (issue.format === 'email') detail = 'Invalid email address'
            else if (issue.format === 'uuid') detail = 'Invalid UUID'
            else if (issue.format === 'url') detail = 'Invalid URL'
            else detail = `Invalid format: ${issue.format}`
            break
          case 'invalid_type':
            detail =
              issue.input === undefined || issue.input === null
                ? 'This field is required'
                : `Expected ${issue.expected}, received ${typeof issue.input}`
            break
        }
        return { pointer: `/${issue.path.join('/')}`, detail }
      })
      return c.json(
        {
          type: 'about:blank' as const,
          title: 'Unprocessable Content',
          status: 422,
          detail: 'Request validation failed',
          errors,
        },
        422,
      )
    }
  },
)

export default app
