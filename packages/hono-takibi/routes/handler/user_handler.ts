import type { RouteHandler } from '@hono/zod-openapi'
import type {
  postUserRoute,
  postUserCreateWithListRoute,
  getUserLoginRoute,
  getUserLogoutRoute,
  getUserUsernameRoute,
  putUserUsernameRoute,
  deleteUserUsernameRoute,
} from '../petstore.ts'

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {}

export const postUserCreateWithListRouteHandler: RouteHandler<
  typeof postUserCreateWithListRoute
> = async (c) => {}

export const getUserLoginRouteHandler: RouteHandler<typeof getUserLoginRoute> = async (c) => {}

export const getUserLogoutRouteHandler: RouteHandler<typeof getUserLogoutRoute> = async (c) => {}

export const getUserUsernameRouteHandler: RouteHandler<typeof getUserUsernameRoute> = async (
  c,
) => {}

export const putUserUsernameRouteHandler: RouteHandler<typeof putUserUsernameRoute> = async (
  c,
) => {}

export const deleteUserUsernameRouteHandler: RouteHandler<typeof deleteUserUsernameRoute> = async (
  c,
) => {}
