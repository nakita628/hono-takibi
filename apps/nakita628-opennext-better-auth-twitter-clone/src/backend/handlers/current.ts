import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { getCurrentRoute } from '@/backend/routes'
import * as CurrentTransaction from '@/backend/transactions/current'
import { AuthType, DBLive } from '@/infra'

/**
 * Handle `GET /current` — return the authenticated user's profile.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[CurrentTransaction.get] --> B{catchTags}
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
