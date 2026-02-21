import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError, ValidationError } from '@/backend/domain'
import type { deleteLikeRoute, postLikeRoute } from '@/backend/routes'
import * as LikeTransaction from '@/backend/transactions/like'
import { DBLive } from '@/infra'
import type { AuthType } from '@/lib/auth'

/**
 * Handle `POST /like` — like a post.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[LikeTransaction.create] --> B{match}
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

  const userId = user.id
  const { postId } = c.req.valid('json')

  return Effect.runPromise(
    LikeTransaction.create(userId, { postId }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 404)
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
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
 *   A[LikeTransaction.remove] --> B{match}
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

  const userId = user.id
  const { postId } = c.req.valid('json')

  return Effect.runPromise(
    LikeTransaction.remove(userId, { postId }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 404)
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
