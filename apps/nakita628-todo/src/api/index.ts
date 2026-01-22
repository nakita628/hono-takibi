import { createRoute, OpenAPIHono, RouteHandler, z } from '@hono/zod-openapi'

const app = new OpenAPIHono()

const get = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/',
  description: 'Hono🔥 React',
  responses: {
    200: {
      description: 'Hono🔥',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
})

export const getHandler: RouteHandler<typeof get> = async (c) => {
  return c.json({ message: 'Hono🔥 React' })
}

const api = app.openapi(get, getHandler)

export type AppType = typeof api

export default api
