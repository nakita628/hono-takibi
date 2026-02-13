import type { RouteHandler } from '@hono/zod-openapi'
import { Effect, Layer } from 'effect'
import { DatabaseError, NotFoundError } from '@/backend/domain'
import type { getUsersRoute, getUsersUserIdRoute } from '@/backend/routes'
import type { AppEnv } from '@/backend/types'
import { DbClient } from '@/backend/types'
import * as UsersTransaction from '@/backend/transactions/users'

export const getUsersUserIdRouteHandler: RouteHandler<
  typeof getUsersUserIdRoute,
  AppEnv
> = async (c) => {
  const { userId } = c.req.valid('param')
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    UsersTransaction.getById(userId).pipe(
      Effect.provide(layer),
      Effect.match({
        onSuccess: (user) => c.json(user, 200),
        onFailure: (e) => {
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 404)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}

export const getUsersRouteHandler: RouteHandler<typeof getUsersRoute, AppEnv> = async (c) => {
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    UsersTransaction.getAll().pipe(
      Effect.provide(layer),
      Effect.match({
        onSuccess: (users) => c.json(users, 200),
        onFailure: (e) => {
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
