import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { patchEditRoute } from '@/backend/routes'
import * as EditTransaction from '@/backend/transactions/edit'
import { AuthType, DBLive } from '@/infra'

/**
 * Handle `PATCH /edit` — update the authenticated user's profile.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[EditTransaction.update] --> B{catchTags}
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

  const body = c.req.valid('json')

  return Effect.runPromise(
    EditTransaction.update(user.id, body).pipe(
      Effect.provide(DBLive),
      Effect.map((user) => c.json(user, 200)),
      Effect.catchTags({
        UnauthorizedError: (e) => Effect.succeed(c.json({ message: e.message }, 401)),
        ConflictError: (e) => Effect.succeed(c.json({ message: e.message }, 409)),
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
