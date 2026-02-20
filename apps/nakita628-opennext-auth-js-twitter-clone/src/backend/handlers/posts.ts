import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from '@/backend/domain'
import type { getPostsPostIdRoute, getPostsRoute, postPostsRoute } from '@/backend/routes'
import * as PostsTransaction from '@/backend/transactions/posts'
import { DBLive } from '@/infra'
import type { AuthType } from '@/lib/auth'

export const getPostsRouteHandler: RouteHandler<
  typeof getPostsRoute,
  { Variables: AuthType }
> = async (c) => {
  const { userId, page, limit } = c.req.valid('query')

  return Effect.runPromise(
    PostsTransaction.getAll({
      ...(userId !== undefined ? { userId } : {}),
      page: page ?? 1,
      limit: limit ?? 20,
    }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (posts) => c.json(posts, 200),
        onFailure: (e) => {
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
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
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const { body } = c.req.valid('json')

  return Effect.runPromise(
    PostsTransaction.create(email, { body }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (post) => c.json(post, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 401)
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
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
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 404)
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
