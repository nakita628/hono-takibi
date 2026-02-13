import type { RouteHandler } from '@hono/zod-openapi'
import { drizzle } from 'drizzle-orm/d1'
import { Effect } from 'effect'
import { DatabaseError, UnauthorizedError } from '@/backend/domain'
import type { Bindings } from '@/backend/env'
import type { patchEditRoute } from '@/backend/routes'
import * as schema from '@/db/schema'
import { DB } from '@/db'
import * as EditTransaction from '@/backend/transactions/edit'

export const patchEditRouteHandler: RouteHandler<
  typeof patchEditRoute,
  { Bindings: Bindings }
> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const body = c.req.valid('json')
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    EditTransaction.update(email, body).pipe(
      Effect.provideService(DB, db),
      Effect.match({
        onSuccess: (user) => c.json(user, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
