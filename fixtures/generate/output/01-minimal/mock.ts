import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

export const getHealthRoute = createRoute({
  method: 'get',
  path: '/health',
  operationId: 'getHealth',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ status: z.string() }).openapi({ required: ['status'] }),
        },
      },
    },
  },
})

const getHealthRouteHandler = async (c: any) => {
  return c.json(
    {
      status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
    },
    200,
  )
}

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export type AppType = typeof api

export default app
