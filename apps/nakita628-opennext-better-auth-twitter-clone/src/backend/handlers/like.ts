import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { deleteLikeRoute, postLikeRoute } from '@/backend/routes'
import * as LikeTransaction from '@/backend/transactions/like'
import { AuthType, DBLive } from '@/infra'

/**
 * Handle `POST /like` — like a post.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[LikeTransaction.create] --> B{catchTags}
 *   B --> C[200 OK]
 *   B --> D[404 Not Found]
 *   B --> E[503 DB error]
 * ```
 */
export const postLikeRouteHandler: RouteHandler<
  typeof postLikeRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const { postId } = c.req.valid('json')

  return Effect.runPromise(
    LikeTransaction.create(user.id, postId).pipe(
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
 * Handle `DELETE /like` — unlike a post.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[LikeTransaction.remove] --> B{catchTags}
 *   B --> C[200 OK]
 *   B --> D[404 Not Found]
 *   B --> E[503 DB error]
 * ```
 */
export const deleteLikeRouteHandler: RouteHandler<
  typeof deleteLikeRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const { postId } = c.req.valid('json')

  return Effect.runPromise(
    LikeTransaction.remove(user.id, postId).pipe(
      Effect.provide(DBLive),
      Effect.map((result) => c.json(result, 200)),
      Effect.catchTags({
        NotFoundError: (e) => Effect.succeed(c.json({ message: e.message }, 404)),
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
