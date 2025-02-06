import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import type { RouteHandler } from '@hono/zod-openapi'

const app = new OpenAPIHono()

const get = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/',
  description: 'Hono🔥 Vite',
  responses: {
    200: {
      description: 'Hono🔥 Vite',
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
  return c.json({ message: 'Hono🔥 Vite' })
}

const api = app.openapi(get, getHandler)

api.use('*', async (c, next) => {
  try {
    await next()
  } catch (e) {
    return c.json({ error: (e as Error).message }, 500)
  }
})

export default app
