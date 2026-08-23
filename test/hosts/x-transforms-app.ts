import { OpenAPIHono } from '@hono/zod-openapi'

import {
  postCoerceRoute,
  postCustomRoute,
  postFormatsRoute,
  postP2Route,
  postStringsRoute,
  postV25Route,
  postV26Route,
} from '../__generated__/x-transforms/generated'

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
    return undefined
  },
})

app.openapi(postStringsRoute, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 200)
})

app.openapi(postCoerceRoute, (c) => {
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

app.openapi(postFormatsRoute, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 200)
})

app.openapi(postP2Route, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 200)
})

app.openapi(postCustomRoute, (c) => {
  const body = c.req.valid('json')
  // updatedAt is parsed as a Date instance — no need to call .toISOString().
  // The output schema's codec re-encodes it to an ISO string on response.
  return c.json(body, 200)
})

app.openapi(postV25Route, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 200)
})

app.openapi(postV26Route, (c) => {
  const body = c.req.valid('json')
  // The contentEncoding pipeline decodes settings into an object during
  // validation; cast for the response (which expects the encoded string shape).
  // biome-ignore lint/suspicious/noExplicitAny: response shape mismatch with decoded body
  return c.json(body as any, 200)
})

export default app
