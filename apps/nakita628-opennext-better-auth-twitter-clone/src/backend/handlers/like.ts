import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'

import type { deleteLikeRoute, postLikeRoute } from '@/backend/routes'
import * as LikeTransaction from '@/backend/transactions/like'
import { AuthType, DBLive } from '@/infra'

/**
 * POST /like — Like a post
 *
 * ||| What happens step by step |||
 *   1. Check the user is logged in (401 if not)
 *   2. Read postId from the request body
 *   3. Verify the post exists (404 if not)
 *   4. Check if the user already liked this post (409 if duplicate)
 *   5. Insert the like row
 *   6. Notify the post owner ("Someone liked your tweet")
 *   7. Return the post with its updated likes array
 *
 * --- Business Logic ---
 * 1. auth: session user required (401 if missing)
 * 2. body: { postId: UUID }
 * 3. LikeTransaction.create(userId, postId)
 *    Checks post exists (404), checks duplicate like (409),
 *    inserts like, and notifies the post owner.
 *
 * ||| Tables Involved |||
 *
 *  Step 1 — Verify post + existing likes:
 *  +--------+      +-------+
 *  | posts  |      | likes | <-- SELECT WHERE postId (duplicate check)
 *  +--------+      +-------+
 *
 *  Step 2 — Insert like:
 *  +-------+
 *  | likes | <-- INSERT { userId, postId }
 *  +-------+
 *
 *  Step 3 — Notify post owner:
 *  +---------------+     +--------------+
 *  | notifications | <-- | user_profile | <-- UPDATE hasNotification = true
 *  | (INSERT)      |     +--------------+
 *  +---------------+
 *
 * ||| SQL Flow |||
 *   SELECT * FROM posts WHERE id = :postId
 *   SELECT * FROM likes WHERE postId = :postId
 *   |||
 *   INSERT INTO likes (userId, postId, createdAt) VALUES (:me, :postId, ...)
 *   |||
 *   INSERT INTO notifications (...) VALUES ('Someone liked your tweet', :post.userId, ...)
 *   UPDATE user_profile SET hasNotification = true WHERE userId = :post.userId
 *
 * --- Response ---
 *   200: PostWithLikes { post + updated likes[] }
 *   401: Unauthorized
 *   404: Post not found
 *   409: Already liked
 *   503: Database error
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
 * DELETE /like — Unlike a post
 *
 * ||| What happens step by step |||
 *   1. Check the user is logged in (401 if not)
 *   2. Read postId from the request body
 *   3. Delete the like row from the likes table
 *   4. Re-fetch the post with its updated likes array
 *   5. Return the post with updated likes
 *
 * --- Business Logic ---
 * 1. auth: session user required (401 if missing)
 * 2. body: { postId: UUID }
 * 3. LikeTransaction.remove(userId, postId)
 *    Deletes the like, then re-fetches the post with updated likes.
 *
 * ||| Tables Involved |||
 *
 *  +-------+                         +--------+
 *  | likes | <-- DELETE              | posts  | <-- SELECT (re-fetch)
 *  +-------+                         +--------+
 *                                    +-------+
 *                                    | likes | <-- SELECT (updated list)
 *                                    +-------+
 *
 * ||| SQL Flow |||
 *   DELETE FROM likes WHERE userId = :me AND postId = :postId
 *   |||
 *   SELECT * FROM posts WHERE id = :postId
 *   SELECT * FROM likes WHERE postId = :postId
 *
 * --- Response ---
 *   200: PostWithLikes { post + updated likes[] }
 *   401: Unauthorized
 *   404: Post not found
 *   503: Database error
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
