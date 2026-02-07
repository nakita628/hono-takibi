import { OpenAPIHono } from '@hono/zod-openapi'
import { getSettingsRoute, postConfigRoute, postPaymentRoute, postTagsRoute } from './routes.ts'

const app = new OpenAPIHono()

// propertyNames.pattern: ^[a-z_]+$
app.openapi(getSettingsRoute, (c) => {
  return c.json({ theme: 'dark', language: 'ja' }, 200)
})

// patternProperties + propertyNames.pattern
app.openapi(postConfigRoute, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 201)
})

// dependentRequired
app.openapi(postPaymentRoute, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 201)
})

// uniqueItems + minProperties + maxProperties
app.openapi(postTagsRoute, (c) => {
  const body = c.req.valid('json')
  return c.json(body, 201)
})

export default app
