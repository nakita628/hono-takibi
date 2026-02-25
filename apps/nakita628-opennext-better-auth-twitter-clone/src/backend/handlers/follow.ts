import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import {
  ConflictError,
  ContractViolationError,
  DatabaseError,
  NotFoundError,
} from '@/backend/domain'
import type { deleteFollowRoute, postFollowRoute } from '@/backend/routes'
import * as FollowTransaction from '@/backend/transactions/follow'
import { AuthType, DBLive } from '@/infra'

/**
 * Handle `POST /follow` — follow a user.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[FollowTransaction.create] --> B{match}
 *   B --> C[200 OK]
 *   B --> D[404 Not Found]
 *   B --> E[503 DB error]
 * ```
 */
export const postFollowRouteHandler: RouteHandler<
  typeof postFollowRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const userId = user.id
  const body = c.req.valid('json')

  return Effect.runPromise(
    FollowTransaction.create(userId, body).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof ConflictError) return c.json({ message: e.message }, 409)
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 404)
          if (e instanceof ContractViolationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}

/**
 * Handle `DELETE /follow` — unfollow a user.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[FollowTransaction.remove] --> B{match}
 *   B --> C[200 OK]
 *   B --> D[503 DB error]
 * ```
 */
export const deleteFollowRouteHandler: RouteHandler<
  typeof deleteFollowRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const userId = user.id
  const body = c.req.valid('json')

  return Effect.runPromise(
    FollowTransaction.remove(userId, body).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof ContractViolationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
