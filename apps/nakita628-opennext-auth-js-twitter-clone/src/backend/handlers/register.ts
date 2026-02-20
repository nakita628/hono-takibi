import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { ConflictError, DatabaseError, ValidationError } from '@/backend/domain'
import type { AuthType } from '@/lib/auth'
import type { postRegisterRoute } from '@/backend/routes'
import * as UserTransaction from '@/backend/transactions/register'
import { DBLive } from '@/infra'

export const postRegisterRouteHandler: RouteHandler<
  typeof postRegisterRoute,
  { Variables: AuthType }
> = async (c) => {
  const { email, name, username, password } = c.req.valid('json')

  return Effect.runPromise(
    UserTransaction.create({ email, name, username, password }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (user) => c.json(user, 201),
        onFailure: (e) => {
          if (e instanceof ConflictError) return c.json({ message: e.message }, 409)
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
