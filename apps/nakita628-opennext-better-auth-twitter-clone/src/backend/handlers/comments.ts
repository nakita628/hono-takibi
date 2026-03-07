import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { postCommentsRoute } from '@/backend/routes'
import * as CommentsTransaction from '@/backend/transactions/comments'
import { AuthType, DBLive } from '@/infra'

/**
 * Handle `POST /comments` — create a comment on a post.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[CommentsTransaction.create] --> B{catchTags}
 *   B --> C[200 OK]
 *   B --> D[503 DB error]
 * ```
 */
export const postCommentsRouteHandler: RouteHandler<
  typeof postCommentsRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const { postId } = c.req.valid('query')
  const { body } = c.req.valid('json')

  return Effect.runPromise(
    CommentsTransaction.create(user.id, body, postId).pipe(
      Effect.provide(DBLive),
      Effect.map((comment) => c.json(comment, 200)),
      Effect.catchTags({
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
