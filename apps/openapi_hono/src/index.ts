import { serve } from '@hono/node-server'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'

const app = new OpenAPIHono()

const honoTakibiSchema = z.object({
  message: z.string().openapi({
    example: 'Hono Takibi🔥',
  }),
})

const getRoute = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: honoTakibiSchema,
        },
      },
      description: 'Hono Takibi🔥',
    },
  },
})

app.openapi(getRoute, (c) => {
  return c.json({ message: 'Hono Takibi🔥' })
})

app
  .doc('/doc', {
    info: {
      title: 'Hono API',
      version: 'v1',
    },
    openapi: '3.0.0',
    tags: [
      {
        name: 'Hono',
        description: 'Hono API',
      },
    ],
  })
  .get('/ui', swaggerUI({ url: '/doc' }))

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
