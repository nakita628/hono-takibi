import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'

export const getRoute = defineOpenAPIRoute({
  route: createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'ok',
        content: {
          'application/json': {
            schema: z.object({ ok: z.boolean() }).openapi({ required: ['ok'] }),
          },
        },
      },
    },
  }),
  handler: async (c) => c.json({ ok: true }, 200),
  addRoute: true,
})
