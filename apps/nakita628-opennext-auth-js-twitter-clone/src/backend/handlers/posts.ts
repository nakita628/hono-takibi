import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/backend/domain'
import type { AuthType } from '@/lib/auth'
import type { getPostsPostIdRoute, getPostsRoute, postPostsRoute } from '@/backend/routes'
import * as PostsTransaction from '@/backend/transactions/posts'
import { DBLive } from '@/infra'

export const getPostsRouteHandler: RouteHandler<
  typeof getPostsRoute,
  { Variables: AuthType }
> = async (c) => {
  const { userId } = c.req.valid('query')

  return Effect.runPromise(
    PostsTransaction.getAll(userId).pipe(
      Effect.provide(DBLive),
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
  { Variables: AuthType }
> = async (c) => {
  const email = c.get('user')?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 401)
  }

  const { body } = c.req.valid('json')

  return Effect.runPromise(
    PostsTransaction.create(email, { body }).pipe(
      Effect.provide(DBLive),
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
  { Variables: AuthType }
> = async (c) => {
  const { postId } = c.req.valid('param')

  return Effect.runPromise(
    PostsTransaction.getById(postId).pipe(
      Effect.provide(DBLive),
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
