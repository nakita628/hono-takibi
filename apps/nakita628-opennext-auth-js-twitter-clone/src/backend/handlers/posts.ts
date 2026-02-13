import type { RouteHandler } from '@hono/zod-openapi'
import { Effect, Layer } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/backend/domain'
import type { getPostsPostIdRoute, getPostsRoute, postPostsRoute } from '@/backend/routes'
import type { AppEnv } from '@/backend/types'
import { DbClient } from '@/backend/types'
import * as PostsTransaction from '@/backend/transactions/posts'

export const getPostsRouteHandler: RouteHandler<typeof getPostsRoute, AppEnv> = async (c) => {
  const { userId } = c.req.valid('query')
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    PostsTransaction.getAll(userId).pipe(
      Effect.provide(layer),
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

export const postPostsRouteHandler: RouteHandler<typeof postPostsRoute, AppEnv> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const { body } = c.req.valid('json')
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    PostsTransaction.create(email as string, { body }).pipe(
      Effect.provide(layer),
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

export const getPostsPostIdRouteHandler: RouteHandler<typeof getPostsPostIdRoute, AppEnv> = async (
  c,
) => {
  const { postId } = c.req.valid('param')
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    PostsTransaction.getById(postId).pipe(
      Effect.provide(layer),
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
