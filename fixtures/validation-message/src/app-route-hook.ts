import { OpenAPIHono } from '@hono/zod-openapi'
import { createUserRoute } from './routes.ts'

// Pattern 3: Per-route hook builds messages inline, returns 422
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
        let message = issue.message
        switch (issue.code) {
          case 'too_small':
            message =
              issue.origin === 'string'
                ? `Must be at least ${issue.minimum} characters`
                : issue.origin === 'array'
                  ? `Must have at least ${issue.minimum} items`
                  : `Must be at least ${issue.minimum}`
            break
          case 'too_big':
            message =
              issue.origin === 'string'
                ? `Must be at most ${issue.maximum} characters`
                : issue.origin === 'array'
                  ? `Must have at most ${issue.maximum} items`
                  : `Must be at most ${issue.maximum}`
            break
          case 'invalid_format':
            if (issue.format === 'email') message = 'Invalid email address'
            else if (issue.format === 'uuid') message = 'Invalid UUID'
            else if (issue.format === 'url') message = 'Invalid URL'
            else message = `Invalid format: ${issue.format}`
            break
          case 'invalid_type':
            message =
              issue.input === undefined || issue.input === null
                ? 'This field is required'
                : `Expected ${issue.expected}, received ${typeof issue.input}`
            break
        }
        return { field: issue.path.join('.'), message, code: issue.code }
      })
      return c.json({ success: false as const, errors }, 422)
    }
  },
)

export default app
