import type { RouteHandler } from '@hono/zod-openapi'
import type {
  getHealthIdRoute,
  getHealthRoute,
  getHealthTestRoute,
  postHealthTest2Route,
} from '../routes'

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  return c.json({ status: 'ok' }, 200)
}

export const getHealthTestRouteHandler: RouteHandler<typeof getHealthTestRoute> = async (c) => {
  return c.json({ status: 'ok' }, 200)
}

export const postHealthTest2RouteHandler: RouteHandler<typeof postHealthTest2Route> = async (c) => {
  return c.json({ status: 'ok' }, 200)
}

export const getHealthIdRouteHandler: RouteHandler<typeof getHealthIdRoute> = async (c) => {
  return c.json({ status: 'ok' }, 200)
}
