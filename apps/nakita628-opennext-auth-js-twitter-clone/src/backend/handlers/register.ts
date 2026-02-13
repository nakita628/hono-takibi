import type { RouteHandler } from '@hono/zod-openapi'
import { drizzle } from 'drizzle-orm/d1'
import { Effect } from 'effect'
import { ConflictError, DatabaseError } from '@/backend/domain'
import type { Bindings } from '@/backend/env'
import type { postRegisterRoute } from '@/backend/routes'
import * as schema from '@/db/schema'
import { DB } from '@/db'
import * as UserTransaction from '@/backend/transactions/register'

export const postRegisterRouteHandler: RouteHandler<
  typeof postRegisterRoute,
  { Bindings: Bindings }
> = async (c) => {
  const { email, name, username, password } = c.req.valid('json')
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    UserTransaction.create({ email, name, username, password }).pipe(
      Effect.provideService(DB, db),
      Effect.match({
        onSuccess: (user) => c.json(user, 201),
        onFailure: (e) => {
          if (e instanceof ConflictError) return c.json({ message: e.message }, 409)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
