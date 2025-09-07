import type { RouteHandler } from '@hono/zod-openapi'
import type {
  deleteUsersIdRoute,
  getHonoRoute,
  getHonoXRoute,
  getUsersIdRoute,
  getUsersRoute,
  getZodOpenapiHonoRoute,
  patchUsersIdRoute,
  postUsersRoute,
  putUsersIdRoute,
} from '../routes'

export const deleteUsersIdRouteHandler: RouteHandler<typeof deleteUsersIdRoute> = async (c) => {}

export const getHonoRouteHandler: RouteHandler<typeof getHonoRoute> = async (c) => {}

export const getHonoXRouteHandler: RouteHandler<typeof getHonoXRoute> = async (c) => {}

export const getUsersIdRouteHandler: RouteHandler<typeof getUsersIdRoute> = async (c) => {}

export const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {}

export const getZodOpenapiHonoRouteHandler: RouteHandler<typeof getZodOpenapiHonoRoute> = async (
  c,
) => {}

export const patchUsersIdRouteHandler: RouteHandler<typeof patchUsersIdRoute> = async (c) => {}

export const postUsersRouteHandler: RouteHandler<typeof postUsersRoute> = async (c) => {}

export const putUsersIdRouteHandler: RouteHandler<typeof putUsersIdRoute> = async (c) => {}
