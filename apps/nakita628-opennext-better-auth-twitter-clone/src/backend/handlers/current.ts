import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, UnauthorizedError, ValidationError } from '@/backend/domain'
import type { getCurrentRoute } from '@/backend/routes'
import * as CurrentTransaction from '@/backend/transactions/current'
import { DBLive } from '@/infra'
import type { AuthType } from '@/lib/auth'

/**
 * Handle `GET /current` — return the authenticated user's profile.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[CurrentTransaction.get] --> B{match}
 *   B --> C[200 OK]
 *   B --> D[401 Unauthorized]
 *   B --> E[503 DB error]
 * ```
 */
export const getCurrentRouteHandler: RouteHandler<
  typeof getCurrentRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const userId = user.id

  return Effect.runPromise(
    CurrentTransaction.get(userId).pipe(
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
