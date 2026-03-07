import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { postRegisterRoute } from '@/backend/routes'
import * as UserTransaction from '@/backend/transactions/register'
import { AuthType, DBLive } from '@/infra'

/**
 * Handle `POST /register` — register a new user account.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[validate body] --> B[UserTransaction.create]
 *   B --> C{catchTags}
 *   C --> D[201 Created]
 *   C --> E[409 Conflict]
 *   C --> F[503 DB error]
 * ```
 */
export const postRegisterRouteHandler: RouteHandler<
  typeof postRegisterRoute,
  { Variables: AuthType }
> = async (c) => {
  const { email, name, username, password } = c.req.valid('json')

  return Effect.runPromise(
    UserTransaction.create(email, name, username, password).pipe(
      Effect.provide(DBLive),
      Effect.map((user) => c.json(user, 201)),
      Effect.catchTags({
        ConflictError: (e) => Effect.succeed(c.json({ message: e.message }, 409)),
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
