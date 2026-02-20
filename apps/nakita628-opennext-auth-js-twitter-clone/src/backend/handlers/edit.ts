import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, UnauthorizedError, ValidationError } from '@/backend/domain'
import type { patchEditRoute } from '@/backend/routes'
import * as EditTransaction from '@/backend/transactions/edit'
import { DBLive } from '@/infra'
import type { AuthType } from '@/lib/auth'

export const patchEditRouteHandler: RouteHandler<
  typeof patchEditRoute,
  { Variables: AuthType }
> = async (c) => {
  const email = c.get('user')?.email
  if (!email) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const body = c.req.valid('json')

  return Effect.runPromise(
    EditTransaction.update(email, body).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (user) => c.json(user, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 401)
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
