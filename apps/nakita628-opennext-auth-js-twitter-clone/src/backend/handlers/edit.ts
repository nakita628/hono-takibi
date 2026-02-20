import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, UnauthorizedError } from '@/backend/domain'
import type { AuthType } from '@/lib/auth'
import type { patchEditRoute } from '@/backend/routes'
import * as EditTransaction from '@/backend/transactions/edit'
import { DBLive } from '@/infra'

export const patchEditRouteHandler: RouteHandler<
  typeof patchEditRoute,
  { Variables: AuthType }
> = async (c) => {
  const email = c.get('user')?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 401)
  }

  const body = c.req.valid('json')

  return Effect.runPromise(
    EditTransaction.update(email, body).pipe(
      Effect.provide(DBLive),
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
