import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError, ValidationError } from '@/backend/domain'
import type { getUsersRoute, getUsersUserIdRoute } from '@/backend/routes'
import * as UsersTransaction from '@/backend/transactions/users'
import { DBLive } from '@/infra'
import type { AuthType } from '@/lib/auth'

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
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
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
  const { page, limit } = c.req.valid('query')

  return Effect.runPromise(
    UsersTransaction.getAll({ page: page ?? 1, limit: limit ?? 20 }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (users) => c.json(users, 200),
        onFailure: (e) => {
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
