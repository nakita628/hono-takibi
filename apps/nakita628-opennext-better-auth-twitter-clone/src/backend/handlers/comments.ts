import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, ValidationError } from '@/backend/domain'
import type { postCommentsRoute } from '@/backend/routes'
import * as CommentsTransaction from '@/backend/transactions/comments'
import { DBLive } from '@/infra'
import { auth, type AuthType } from '@/lib/auth'

/**
 * Handle `POST /comments` — create a comment on a post.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[CommentsTransaction.create] --> B{match}
 *   B --> C[200 OK]
 *   B --> D[503 DB error]
 * ```
 */
export const postCommentsRouteHandler: RouteHandler<
  typeof postCommentsRoute,
  { Variables: AuthType }
> = async (c) => {
  const session = await auth().api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const userId = session?.user?.id

  const { postId } = c.req.valid('query')
  const { body } = c.req.valid('json')

  return Effect.runPromise(
    CommentsTransaction.create(userId, { body, postId }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (comment) => c.json(comment, 200),
        onFailure: (e) => {
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
