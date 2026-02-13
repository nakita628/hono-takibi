import type { RouteHandler } from '@hono/zod-openapi'
import { drizzle } from 'drizzle-orm/d1'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/backend/domain'
import type { Bindings } from '@/backend/env'
import type { deleteFollowRoute, postFollowRoute } from '@/backend/routes'
import * as schema from '@/db/schema'
import { DB } from '@/db'
import * as FollowTransaction from '@/backend/transactions/follow'

export const postFollowRouteHandler: RouteHandler<
  typeof postFollowRoute,
  { Bindings: Bindings }
> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const { userId } = c.req.valid('json')
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    FollowTransaction.create(email, { userId }).pipe(
      Effect.provideService(DB, db),
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

export const deleteFollowRouteHandler: RouteHandler<
  typeof deleteFollowRoute,
  { Bindings: Bindings }
> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const { userId } = c.req.valid('json')
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    FollowTransaction.remove(email, { userId }).pipe(
      Effect.provideService(DB, db),
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
