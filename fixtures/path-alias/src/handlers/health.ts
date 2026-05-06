import app from '@'
import { getHealthRoute } from '@/routes'
import { OpenAPIHono } from '@hono/zod-openapi'

export const healthHandler = app.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
