import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'

export const getHealthRoute = defineOpenAPIRoute({
  route: createRoute({
    method: 'get',
    path: '/health',
    responses: {
      200: {
        description: 'ok',
        content: {
          'application/json': {
            schema: z.object({ status: z.string() }).openapi({ required: ['status'] }),
          },
        },
      },
    },
  }),
  handler: async (c) => c.json({ status: 'up' }, 200),
  addRoute: true,
})
