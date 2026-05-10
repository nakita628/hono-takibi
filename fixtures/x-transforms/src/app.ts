import { OpenAPIHono } from '@hono/zod-openapi'
import {
  postCoerceRoute,
  postFormatsRoute,
  postStringsRoute,
} from './generated.ts'

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        pointer: `/${issue.path.join('/')}`,
        detail: issue.message,
      }))
      return c.json(
        {
          type: 'about:blank',
          title: 'Unprocessable Content',
          status: 422,
          detail: 'Request validation failed',
          errors,
        },
        422,
      )
    }
  },
})

app.openapi(postStringsRoute, async (c) => {
  const body = c.req.valid('json')
  return c.json(body, 200)
})

app.openapi(postCoerceRoute, async (c) => {
  const body = c.req.valid('json')
  // Re-serialize dates as ISO strings so the JSON response is stable.
  return c.json(
    {
      ...body,
      asDate: body.asDate.toISOString(),
    } as unknown as typeof body,
    200,
  )
})

app.openapi(postFormatsRoute, async (c) => {
  const body = c.req.valid('json')
  return c.json(body, 200)
})

export default app
