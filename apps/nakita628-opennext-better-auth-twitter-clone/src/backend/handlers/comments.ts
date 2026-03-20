import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'

import type { postCommentsRoute } from '@/backend/routes'
import * as CommentsTransaction from '@/backend/transactions/comments'
import { AuthType, DBLive } from '@/infra'

/**
 * POST /comments — Add a comment to a post
 *
 * ||| What happens step by step |||
 *   1. Check the user is logged in (401 if not)
 *   2. Read postId from query string and comment body from request body
 *   3. Insert the comment into the database
 *   4. Look up who owns the post, then send them a notification
 *   5. Return the created comment
 *
 * --- Business Logic ---
 * 1. auth: session user required (401 if missing)
 * 2. query: ?postId (UUID)
 * 3. body: { body: string }
 * 4. CommentsTransaction.create(userId, body, postId)
 *    After creating the comment, sends a notification to the post owner.
 *
 * ||| Tables Involved |||
 *
 *  +----------+                +--------+
 *  | comments | <-- INSERT     | posts  | <-- SELECT (find post owner)
 *  +----------+                +--------+
 *                                  |
 *                                  v  post.userId
 *                          +---------------+     +--------------+
 *                          | notifications | <-- | user_profile |
 *                          | (INSERT)      |     | (UPDATE flag)|
 *                          +---------------+     +--------------+
 *
 * ||| SQL Flow |||
 *   INSERT INTO comments (id, body, userId, postId, createdAt, updatedAt)
 *     VALUES (uuid(), :body, :userId, :postId, ...) RETURNING *
 *   |||
 *   SELECT * FROM posts WHERE id = :postId      -- find post owner
 *   |||
 *   INSERT INTO notifications (id, body, userId, createdAt)
 *     VALUES (uuid(), 'Someone replied to your tweet', :post.userId, ...)
 *   |||
 *   UPDATE user_profile SET hasNotification = true WHERE userId = :post.userId
 *
 * --- Response ---
 *   200: Comment
 *   401: Unauthorized
 *   503: Database error
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
