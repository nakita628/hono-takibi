import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { deleteFollowRoute, postFollowRoute } from '@/backend/routes'
import * as FollowTransaction from '@/backend/transactions/follow'
import { AuthType, DBLive } from '@/infra'

/**
 * Handle `POST /follow` — follow a user.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[FollowTransaction.create] --> B{catchTags}
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

  const { userId: targetUserId } = c.req.valid('json')

  return Effect.runPromise(
    FollowTransaction.create(user.id, targetUserId).pipe(
      Effect.provide(DBLive),
      Effect.map((result) => c.json(result, 200)),
      Effect.catchTags({
        ConflictError: (e) => Effect.succeed(c.json({ message: e.message }, 409)),
        NotFoundError: (e) => Effect.succeed(c.json({ message: e.message }, 404)),
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
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
 *   A[FollowTransaction.remove] --> B{catchTags}
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

  const { userId: targetUserId } = c.req.valid('json')

  return Effect.runPromise(
    FollowTransaction.remove(user.id, targetUserId).pipe(
      Effect.provide(DBLive),
      Effect.map((result) => c.json(result, 200)),
      Effect.catchTags({
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
