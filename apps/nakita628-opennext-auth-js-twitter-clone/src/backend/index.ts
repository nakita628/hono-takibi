import Credentials from '@auth/core/providers/credentials'
import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js'
import { OpenAPIHono, z } from '@hono/zod-openapi'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
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
import { db, users } from '@/db'

const app = new OpenAPIHono().basePath('/api')

app.use(
  '*',
  initAuthConfig((c) => ({
    secret: c.env.AUTH_SECRET,
    providers: [
      Credentials({
        credentials: {
          email: { type: 'email' },
          password: { type: 'password' },
        },
        async authorize(credentials) {
          const CredentialsSchema = z.object({
            email: z.string().email(),
            password: z.string().min(8).max(72),
          })

          const valid = CredentialsSchema.safeParse(credentials)

          if (!valid.success) return null

          const { email, password } = valid.data

          const user = await db.select().from(users).where(eq(users.email, email)).get()

          if (!user?.hashedPassword) return null

          const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword)
          if (!isCorrectPassword) return null

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }
        },
      }),
    ],
    session: { strategy: 'jwt' },
  })),
)

app.use('/auth/*', authHandler())

app.use('*', async (c, next) => {
  const path = c.req.path.replace(/^\/api/, '')
  if (path.startsWith('/auth/') || path === '/register') {
    return next()
  }
  return verifyAuth()(c, next)
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
