import type { RouteHandler } from '@hono/zod-openapi'
import type { getHealthRoute, getHealthTestRoute } from '../routes'

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {}

export const getHealthTestRouteHandler: RouteHandler<typeof getHealthTestRoute> = async (c) => {}
