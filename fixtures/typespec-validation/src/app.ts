import { OpenAPIHono } from '@hono/zod-openapi'
import {
  postOrdersRoute,
  postProductsRoute,
  postUsersRoute,
  putSettingsRoute,
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

app.openapi(postUsersRoute, (c) => {
  const body = c.req.valid('json')
  return c.json({ id: 1, name: body.name, email: body.email }, 201)
})

app.openapi(postProductsRoute, (c) => {
  const body = c.req.valid('json')
  return c.json({ id: 1, type: body.type }, 201)
})

app.openapi(putSettingsRoute, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 200)
})

app.openapi(postOrdersRoute, (c) => {
  const body = c.req.valid('json')
  return c.json({ id: 1, productName: body.productName, quantity: body.quantity }, 201)
})

export default app
