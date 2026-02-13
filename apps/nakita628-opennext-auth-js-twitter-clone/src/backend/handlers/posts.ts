import type { RouteHandler } from '@hono/zod-openapi'
import { drizzle } from 'drizzle-orm/d1'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/backend/domain'
import type { Bindings } from '@/backend/env'
import type { getPostsPostIdRoute, getPostsRoute, postPostsRoute } from '@/backend/routes'
import * as PostsTransaction from '@/backend/transactions/posts'
import { DB } from '@/db'
import * as schema from '@/db/schema'

export const getPostsRouteHandler: RouteHandler<
  typeof getPostsRoute,
  { Bindings: Bindings }
> = async (c) => {
  const { userId } = c.req.valid('query')
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    PostsTransaction.getAll(userId).pipe(
      Effect.provideService(DB, db),
      Effect.match({
        onSuccess: (posts) => c.json(posts, 200),
        onFailure: (e) => {
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}

export const postPostsRouteHandler: RouteHandler<
  typeof postPostsRoute,
  { Bindings: Bindings }
> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const { body } = c.req.valid('json')
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    PostsTransaction.create(email, { body }).pipe(
      Effect.provideService(DB, db),
      Effect.match({
        onSuccess: (post) => c.json(post, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}

export const getPostsPostIdRouteHandler: RouteHandler<
  typeof getPostsPostIdRoute,
  { Bindings: Bindings }
> = async (c) => {
  const { postId } = c.req.valid('param')
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    PostsTransaction.getById(postId).pipe(
      Effect.provideService(DB, db),
      Effect.match({
        onSuccess: (post) => c.json(post, 200),
        onFailure: (e) => {
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
