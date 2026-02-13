import type { RouteHandler } from '@hono/zod-openapi'
import { drizzle } from 'drizzle-orm/d1'
import { Effect } from 'effect'
import { DatabaseError, UnauthorizedError } from '@/backend/domain'
import type { Bindings } from '@/backend/env'
import type { getCurrentRoute } from '@/backend/routes'
import * as CurrentTransaction from '@/backend/transactions/current'
import { DB } from '@/db'
import * as schema from '@/db/schema'

export const getCurrentRouteHandler: RouteHandler<
  typeof getCurrentRoute,
  { Bindings: Bindings }
> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 401)
  }

  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    CurrentTransaction.get(email).pipe(
      Effect.provideService(DB, db),
      Effect.match({
        onSuccess: (user) => c.json(user, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 401)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
