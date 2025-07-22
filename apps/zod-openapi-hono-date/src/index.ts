import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { dateHandler, postIsoDateHandler, postIsoDatetimeHandler } from './handlers/dateHandler'
import { dateRoute, postIsoDateRoute, postIsoDatetimeRoute } from './routes'

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
    return c.json({ error: e instanceof Error ? e.message : String(e) }, 500)
  }
})

export const api = app
  .openapi(dateRoute, dateHandler)
  .openapi(postIsoDateRoute, postIsoDateHandler)
  .openapi(postIsoDatetimeRoute, postIsoDatetimeHandler)

app
  .doc('/doc', {
    openapi: '3.1.0',
    info: { title: 'FizzBuzz API', version: 'v1' },
  })
  .get('/ui', swaggerUI({ url: '/doc' }))

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
