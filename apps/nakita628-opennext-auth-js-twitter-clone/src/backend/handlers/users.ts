import type { RouteHandler } from '@hono/zod-openapi'
import { drizzle } from 'drizzle-orm/d1'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError } from '@/backend/domain'
import type { Bindings } from '@/backend/env'
import type { getUsersRoute, getUsersUserIdRoute } from '@/backend/routes'
import * as schema from '@/db/schema'
import { DB } from '@/db'
import * as UsersTransaction from '@/backend/transactions/users'

export const getUsersUserIdRouteHandler: RouteHandler<
  typeof getUsersUserIdRoute,
  { Bindings: Bindings }
> = async (c) => {
  const { userId } = c.req.valid('param')
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    UsersTransaction.getById(userId).pipe(
      Effect.provideService(DB, db),
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
  { Bindings: Bindings }
> = async (c) => {
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    UsersTransaction.getAll().pipe(
      Effect.provideService(DB, db),
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
