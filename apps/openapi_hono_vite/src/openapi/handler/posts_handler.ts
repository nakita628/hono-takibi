import type { RouteHandler } from '@hono/zod-openapi'
import type {
  postPostsRoute,
  getPostsRoute,
  putPostsIdRoute,
  deletePostsIdRoute,
} from '../index.ts'

export const postPostsRouteHandler: RouteHandler<typeof postPostsRoute> = async (c) => {}

export const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {}

export const putPostsIdRouteHandler: RouteHandler<typeof putPostsIdRoute> = async (c) => {}

export const deletePostsIdRouteHandler: RouteHandler<typeof deletePostsIdRoute> = async (c) => {}
