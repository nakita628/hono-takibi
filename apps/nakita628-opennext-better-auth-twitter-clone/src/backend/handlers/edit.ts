import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { ContractViolationError, DatabaseError, UnauthorizedError } from '@/backend/domain'
import type { patchEditRoute } from '@/backend/routes'
import * as EditTransaction from '@/backend/transactions/edit'
import { DBLive } from '@/infra'
import type { AuthType } from '@/infra'

/**
 * Handle `PATCH /edit` — update the authenticated user's profile.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[EditTransaction.update] --> B{match}
 *   B --> C[200 OK]
 *   B --> D[401 Unauthorized]
 *   B --> E[503 DB error]
 * ```
 */
export const patchEditRouteHandler: RouteHandler<
  typeof patchEditRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const userId = user.id

  const body = c.req.valid('json')

  return Effect.runPromise(
    EditTransaction.update(userId, body).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (user) => c.json(user, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 401)
          if (e instanceof ContractViolationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
