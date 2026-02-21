import { OpenAPIHono } from '@hono/zod-openapi'
import {
  deleteFollowRouteHandler,
  deleteLikeRouteHandler,
  getCurrentRouteHandler,
  getNotificationsUserIdRouteHandler,
  getPostsPostIdRouteHandler,
  getPostsRouteHandler,
  getSearchRouteHandler,
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
import { rateLimit } from '@/backend/middleware/rateLimit'
import {
  deleteFollowRoute,
  deleteLikeRoute,
  getCurrentRoute,
  getNotificationsUserIdRoute,
  getPostsPostIdRoute,
  getPostsRoute,
  getSearchRoute,
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
import { auth, AuthType } from '@/lib/auth'

const app = new OpenAPIHono<{ Variables: AuthType }>({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(formatZodErrors(result), 422, {
        'Content-Type': 'application/problem+json',
      })
    }
  },
}).basePath('/api')

// Rate limiting for auth endpoints
app.use('/auth/sign-in/*', rateLimit({ windowMs: 60_000, max: 10 }))
app.use('/auth/sign-up/*', rateLimit({ windowMs: 60_000, max: 5 }))
app.use('/auth/change-password', rateLimit({ windowMs: 60_000, max: 5 }))
app.use('/register', rateLimit({ windowMs: 60_000, max: 5 }))

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
  if (path.startsWith('/auth/') || path.startsWith('/register') || path.startsWith('/search')) {
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
  .openapi(getSearchRoute, getSearchRouteHandler)
  .openapi(getUsersUserIdRoute, getUsersUserIdRouteHandler)
  .openapi(getUsersRoute, getUsersRouteHandler)

export default app
