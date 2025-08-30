import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import type { RouteHandler } from '@hono/zod-openapi'
import { hc } from 'hono/client'
import { swaggerUI } from '@hono/swagger-ui'
import { renderToString } from 'react-dom/server'

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

export const api = app.basePath('/api').openapi(get, getHandler)

// Swagger
api
  .doc('/doc', {
    info: {
      title: 'Hono API',
      version: 'v1',
    },
    openapi: '3.1.0',
    tags: [
      {
        name: 'Hono',
        description: 'Hono API',
      },
    ],
  })
  .get('/ui', swaggerUI({ url: '/api/doc' }))

type AddType = typeof api

export const client = hc<AddType>('/').api

app.get('*', (c) => {
  return c.html(
    renderToString(
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta content='width=device-width, initial-scale=1' name='viewport' />
          <title>Hono🔥 React</title>
          {import.meta.env.PROD ? (
            <script type='module' src='/static/main.js'></script>
          ) : (
            <script type='module' src='/src/main.tsx'></script>
          )}
        </head>
        <body>
          <div id='root' />
        </body>
      </html>,
    ),
  )
})

export default app