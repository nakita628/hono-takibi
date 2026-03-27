import { OpenAPIHono } from '@hono/zod-openapi'
import { auth, type AuthType } from '@/infra'
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
} from '@/server/handlers'
import { rateLimit } from '@/server/middleware/rateLimit'
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
} from '@/server/routes'

const app = new OpenAPIHono<{ Variables: AuthType }>({
  defaultHook: (result, c) => {
    if (!result.success) {
      const formatZodErrors = () =>
        ({
          type: 'about:blank',
          title: 'Unprocessable Content',
          status: 422,
          detail: 'Request validation failed',
          instance: c.req.path,
          errors: result.error.issues.map((issue) => ({
            pointer: `/${issue.path.join('/')}`,
            detail: issue.message,
          })),
        }) as const
      return c.json(formatZodErrors(), 422, {
        'Content-Type': 'application/problem+json',
      })
    }
  },
}).basePath('/api')

app.use('/auth/sign-in/*', rateLimit({ windowMs: 60_000, max: 10 }))
app.use('/auth/sign-up/*', rateLimit({ windowMs: 60_000, max: 5 }))
app.use('/auth/change-password', rateLimit({ windowMs: 60_000, max: 5 }))

app.on(['GET', 'POST'], '/auth/*', async (c) => {
  return auth().handler(c.req.raw)
})

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

  if (path.startsWith('/auth/') || path.startsWith('/search')) {
    return next()
  }

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
  .openapi(getSearchRoute, getSearchRouteHandler)
  .openapi(getUsersUserIdRoute, getUsersUserIdRouteHandler)
  .openapi(getUsersRoute, getUsersRouteHandler)

export default app
