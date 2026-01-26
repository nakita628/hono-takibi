import { createRoute, OpenAPIHono, RouteHandler } from '@hono/zod-openapi'

const app = new OpenAPIHono()

const getHealthRoute = createRoute({
  method: 'get',
  path: '/',
  operationId: 'getHealth',
  responses: { 200: { description: 'OK' } },
})

const getHealthHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  return c.json({ message: 'Hono🔥 React' }, 200)
}

const api = app.basePath('/api').openapi(getHealthRoute, getHealthHandler)

export type AppType = typeof api

export default app
