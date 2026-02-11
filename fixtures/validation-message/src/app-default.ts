import { OpenAPIHono } from '@hono/zod-openapi'
import { createUserRoute } from './routes.ts'

// Pattern 1: No hook (default behavior)
// Returns raw ZodError as-is
const app = new OpenAPIHono()

app.openapi(createUserRoute, (c) => {
  const { name, email, age } = c.req.valid('json')
  return c.json({ id: 1, name, email, age }, 201)
})

export default app
