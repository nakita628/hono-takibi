import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { ContractViolationError, DatabaseError, UnauthorizedError } from '@/errors'
import { AuthType, DBLive } from '@/infra'
import type { getCurrentRoute } from '@/server/routes'
import * as CurrentTransaction from '@/server/transactions/current'

export const getCurrentRouteHandler: RouteHandler<
  typeof getCurrentRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  return Effect.runPromise(
    CurrentTransaction.get(user.id).pipe(
      Effect.provide(DBLive),
      Effect.map((user) => c.json(user, 200)),
      Effect.catchTags({
        UnauthorizedError: (e) => Effect.succeed(c.json({ message: e.message }, 401)),
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
