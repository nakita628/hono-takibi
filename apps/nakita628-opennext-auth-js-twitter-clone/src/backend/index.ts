import Credentials from '@auth/core/providers/credentials'
import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { OpenAPIHono, z } from '@hono/zod-openapi'
import bcrypt from 'bcryptjs'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import type { Bindings } from '@/backend/env'
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
import * as schema from '@/db/schema'

const app = new OpenAPIHono<{ Bindings: Bindings }>({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(formatZodErrors(result), 422, {
        'Content-Type': 'application/problem+json',
      })
    }
  },
}).basePath('/api')

app.use(
  '*',
  initAuthConfig((c) => ({
    secret: c.env.AUTH_SECRET,
    adapter: DrizzleAdapter(drizzle(c.env.DB)),
    basePath: '/api/auth',
    providers: [
      Credentials({
        credentials: {
          email: { type: 'email' },
          password: { type: 'password' },
        },
        async authorize(credentials) {
          const CredentialsSchema = z.object({
            email: z.email(),
            password: z.string().min(8).max(72),
          })

          const valid = CredentialsSchema.safeParse(credentials)

          if (!valid.success) return null

          const { email, password } = valid.data

          const db = drizzle(c.env.DB)
          const user = await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, email))
            .get()

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
  if (path.startsWith('/auth/') || path.startsWith('/register')) {
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
