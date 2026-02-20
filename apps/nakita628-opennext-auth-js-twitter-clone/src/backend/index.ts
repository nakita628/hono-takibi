import { OpenAPIHono } from '@hono/zod-openapi'
import { auth, AuthType } from '@/lib/auth'
import {
  deleteFollowRouteHandler,
  deleteLikeRouteHandler,
  getCurrentRouteHandler,
  getNotificationsUserIdRouteHandler,
  getPostsPostIdRouteHandler,
  getPostsRouteHandler,
  getUsersRouteHandler,
  getUsersUserIdRouteHandler,
  patchEditRouteHandler,
  postCommentsRouteHandler,
  postFollowRouteHandler,
  postLikeRouteHandler,
  postNotificationsRouteHandler,
  postPostsRouteHandler,
  postRegisterRouteHandler,
} from '@/backend/handlers'
import { formatZodErrors } from '@/backend/lib/error'
import {
  deleteFollowRoute,
  deleteLikeRoute,
  getCurrentRoute,
  getNotificationsUserIdRoute,
  getPostsPostIdRoute,
  getPostsRoute,
  getUsersRoute,
  getUsersUserIdRoute,
  patchEditRoute,
  postCommentsRoute,
  postFollowRoute,
  postLikeRoute,
  postNotificationsRoute,
  postPostsRoute,
  postRegisterRoute,
} from '@/backend/routes'

const app = new OpenAPIHono<{ Variables: AuthType }>({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(formatZodErrors(result), 422, {
        'Content-Type': 'application/problem+json',
      })
    }
  },
}).basePath('/api')

// Better Auth route handler
app.on(['GET', 'POST'], '/auth/**', async (c) => {
  return auth().handler(c.req.raw)
})

// Session resolution + auth guard middleware
app.use('*', async (c, next) => {
  const session = await auth().api.getSession({
    headers: c.req.raw.headers,
  })

  if (session) {
    c.set('user', session.user)
    c.set('session', session.session)
  } else {
    c.set('user', null)
    c.set('session', null)
  }

  const path = c.req.path.replace(/^\/api/, '')

  // Skip auth for public routes
  if (path.startsWith('/auth/') || path.startsWith('/register')) {
    return next()
  }

  // Require auth
  if (!session) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  return next()
})

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
