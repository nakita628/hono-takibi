import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { ConflictError, ContractViolationError, DatabaseError } from '@/backend/domain'
import type { postRegisterRoute } from '@/backend/routes'
import * as UserTransaction from '@/backend/transactions/register'
import { DBLive } from '@/infra'
import type { AuthType } from '@/infra'

/**
 * Handle `POST /register` — register a new user account.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[validate body] --> B[UserTransaction.create]
 *   B --> C{match}
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
    UserTransaction.create({ email, name, username, password }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (user) => c.json(user, 201),
        onFailure: (e) => {
          if (e instanceof ConflictError) return c.json({ message: e.message }, 409)
          if (e instanceof ContractViolationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
