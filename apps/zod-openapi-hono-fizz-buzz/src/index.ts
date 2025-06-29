import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { hc } from 'hono/client'
import { logger } from 'hono/logger'
import { serve } from '@hono/node-server'
import { getFizzbuzzRouteHandler } from './handler/fizzbuzzHandler'
import { getFizzbuzzRoute } from './route'

const app = new OpenAPIHono()

app.use('*', logger())
app.use('*', (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  return next()
})

app.use('*', async (c, next) => {
  try {
    await next()
  } catch (e) {
    return c.json({ error: (e as Error).message }, 500)
  }
})

export const api = app.openapi(getFizzbuzzRoute, getFizzbuzzRouteHandler)

export const apiClient = hc<typeof api>('http://localhost:3000')

app
  .doc('/doc', {
    openapi: '3.1.0',
    info: { title: 'FizzBuzz API', version: 'v1' },
  })
  .get('/ui', swaggerUI({ url: '/doc' }))

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

if (process.env.NODE_ENV !== 'test') {
  serve({
    fetch: app.fetch,
    port,
  })
}
