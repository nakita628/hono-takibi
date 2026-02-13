import type { RouteHandler } from '@hono/zod-openapi'
import { Effect, Layer } from 'effect'
import { ConflictError, DatabaseError } from '@/backend/domain'
import type { postRegisterRoute } from '@/backend/routes'
import type { AppEnv } from '@/backend/types'
import { DbClient } from '@/backend/types'
import * as UserTransaction from '@/backend/transactions/register'

export const postRegisterRouteHandler: RouteHandler<typeof postRegisterRoute, AppEnv> = async (
  c,
) => {
  const { email, name, username, password } = c.req.valid('json')
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    UserTransaction.create({ email, name, username, password }).pipe(
      Effect.provide(layer),
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
