import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'

const app = new OpenAPIHono().basePath('/api')

export const getApiRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Health'],
  summary: 'Health Check',
  operationId: 'Health_list',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } },
    },
  },
})

app.openapi(getApiRoute, async (c) => {
  return c.json({ message: 'Hono🔥' })
})

export default app
