import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from '@/backend/domain'
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
 *   A[Auth check] --> B[LikeTransaction.create]
 *   B --> C{match}
 *   C --> D[200 OK]
 *   C --> E[401 Unauthorized]
 *   C --> F[404 Not Found]
 *   C --> G[503 DB error]
 * ```
 */
export const postLikeRouteHandler: RouteHandler<
  typeof postLikeRoute,
  { Variables: AuthType }
> = async (c) => {
  const email = c.get('user')?.email
  if (!email) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const { postId } = c.req.valid('json')

  return Effect.runPromise(
    LikeTransaction.create(email, { postId }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 401)
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
 *   A[Auth check] --> B[LikeTransaction.remove]
 *   B --> C{match}
 *   C --> D[200 OK]
 *   C --> E[401 Unauthorized]
 *   C --> F[404 Not Found]
 *   C --> G[503 DB error]
 * ```
 */
export const deleteLikeRouteHandler: RouteHandler<
  typeof deleteLikeRoute,
  { Variables: AuthType }
> = async (c) => {
  const email = c.get('user')?.email
  if (!email) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const { postId } = c.req.valid('json')

  return Effect.runPromise(
    LikeTransaction.remove(email, { postId }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 401)
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 404)
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
