import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError } from '@/backend/domain'
import type { AuthType } from '@/lib/auth'
import type { getUsersRoute, getUsersUserIdRoute } from '@/backend/routes'
import * as UsersTransaction from '@/backend/transactions/users'
import { DBLive } from '@/infra'

export const getUsersUserIdRouteHandler: RouteHandler<
  typeof getUsersUserIdRoute,
  { Variables: AuthType }
> = async (c) => {
  const { userId } = c.req.valid('param')

  return Effect.runPromise(
    UsersTransaction.getById(userId).pipe(
      Effect.provide(DBLive),
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

export const getUsersRouteHandler: RouteHandler<
  typeof getUsersRoute,
  { Variables: AuthType }
> = async (c) => {
  return Effect.runPromise(
    UsersTransaction.getAll().pipe(
      Effect.provide(DBLive),
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
