import { OpenAPIHono } from '@hono/zod-openapi'
import {
  postCommentsRoute,
  getCurrentRoute,
  patchEditRoute,
  deleteFollowRoute,
  postFollowRoute,
  deleteLikeRoute,
  postLikeRoute,
  getNotificationsUserIdRoute,
  postNotificationsRoute,
  getPostsRoute,
  postPostsRoute,
  getPostsPostIdRoute,
  postRegisterRoute,
  getUsersUserIdRoute,
  getUsersRoute,
} from '@/backend/routes'
import {
  postCommentsRouteHandler,
  getCurrentRouteHandler,
  patchEditRouteHandler,
  deleteFollowRouteHandler,
  postFollowRouteHandler,
  deleteLikeRouteHandler,
  postLikeRouteHandler,
  getNotificationsUserIdRouteHandler,
  postNotificationsRouteHandler,
  getPostsRouteHandler,
  postPostsRouteHandler,
  getPostsPostIdRouteHandler,
  postRegisterRouteHandler,
  getUsersUserIdRouteHandler,
  getUsersRouteHandler,
} from '@/backend/handlers'

const app = new OpenAPIHono()

export const api = app
  .openapi(postCommentsRoute, postCommentsRouteHandler)
  .openapi(getCurrentRoute, getCurrentRouteHandler)
  .openapi(patchEditRoute, patchEditRouteHandler)
  .openapi(deleteFollowRoute, deleteFollowRouteHandler)
  .openapi(postFollowRoute, postFollowRouteHandler)
  .openapi(deleteLikeRoute, deleteLikeRouteHandler)
  .openapi(postLikeRoute, postLikeRouteHandler)
  .openapi(getNotificationsUserIdRoute, getNotificationsUserIdRouteHandler)
  .openapi(postNotificationsRoute, postNotificationsRouteHandler)
  .openapi(getPostsRoute, getPostsRouteHandler)
  .openapi(postPostsRoute, postPostsRouteHandler)
  .openapi(getPostsPostIdRoute, getPostsPostIdRouteHandler)
  .openapi(postRegisterRoute, postRegisterRouteHandler)
  .openapi(getUsersUserIdRoute, getUsersUserIdRouteHandler)
  .openapi(getUsersRoute, getUsersRouteHandler)

export default app
