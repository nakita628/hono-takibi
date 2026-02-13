import type { RouteHandler } from '@hono/zod-openapi'
import { Effect, Layer } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/backend/domain'
import type { deleteFollowRoute, postFollowRoute } from '@/backend/routes'
import type { AppEnv } from '@/backend/types'
import { DbClient } from '@/backend/types'
import * as FollowTransaction from '@/backend/transactions/follow'

export const postFollowRouteHandler: RouteHandler<typeof postFollowRoute, AppEnv> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const { userId } = c.req.valid('json')
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    FollowTransaction.create(email as string, { userId }).pipe(
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

export const deleteFollowRouteHandler: RouteHandler<typeof deleteFollowRoute, AppEnv> = async (
  c,
) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const { userId } = c.req.valid('json')
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    FollowTransaction.remove(email as string, { userId }).pipe(
      Effect.provide(layer),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
