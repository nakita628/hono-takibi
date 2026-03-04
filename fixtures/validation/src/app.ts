import { OpenAPIHono } from '@hono/zod-openapi'
import { postUsersRoute, postValidateRoute, postMetadataRoute } from './generated.ts'

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
  const { name, email, age } = c.req.valid('json')
  return c.json({ id: 1, name, email, age }, 201)
})

app.openapi(postValidateRoute, (c) => {
  return c.json({}, 200)
})

app.openapi(postMetadataRoute, (c) => {
  return c.json({}, 200)
})

export default app
