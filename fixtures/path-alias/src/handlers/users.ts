import app from '@'
import { getUsersRoute } from '@/routes'
import { OpenAPIHono } from '@hono/zod-openapi'

export const usersHandler = app.openapi(getUsersRoute, (c) => {
  return c.json(
    [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ],
    200,
  )
})
