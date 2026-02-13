import type { RouteHandler } from '@hono/zod-openapi'
import { Effect, Layer } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/backend/domain'
import type { deleteLikeRoute, postLikeRoute } from '@/backend/routes'
import type { AppEnv } from '@/backend/types'
import { DbClient } from '@/backend/types'
import * as LikeTransaction from '@/backend/transactions/like'

export const postLikeRouteHandler: RouteHandler<typeof postLikeRoute, AppEnv> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const { postId } = c.req.valid('json')
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    LikeTransaction.create(email, { postId }).pipe(
      Effect.provide(layer),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 500)
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}

export const deleteLikeRouteHandler: RouteHandler<typeof deleteLikeRoute, AppEnv> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const { postId } = c.req.valid('json')
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    LikeTransaction.remove(email, { postId }).pipe(
      Effect.provide(layer),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 500)
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
