import type { RouteHandler } from '@hono/zod-openapi'
import type {
  getStoreInventoryRoute,
  postStoreOrderRoute,
  getStoreOrderOrderIdRoute,
  deleteStoreOrderOrderIdRoute,
} from '../petstore.ts'

export const getStoreInventoryRouteHandler: RouteHandler<typeof getStoreInventoryRoute> = async (
  c,
) => {}

export const postStoreOrderRouteHandler: RouteHandler<typeof postStoreOrderRoute> = async (c) => {}

export const getStoreOrderOrderIdRouteHandler: RouteHandler<
  typeof getStoreOrderOrderIdRoute
> = async (c) => {}

export const deleteStoreOrderOrderIdRouteHandler: RouteHandler<
  typeof deleteStoreOrderOrderIdRoute
> = async (c) => {}
