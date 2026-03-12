import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { deleteFollowRoute, postFollowRoute } from '@/backend/routes'
import * as FollowTransaction from '@/backend/transactions/follow'
import { AuthType, DBLive } from '@/infra'

/**
 * POST /follow — Follow a user
 *
 * ||| What happens step by step |||
 *   1. Check the user is logged in (401 if not)
 *   2. Read the target userId from the request body
 *   3. Prevent self-follow (409)
 *   4. Verify the target user exists (404 if not)
 *   5. Insert a follow relationship into the follows table
 *   6. Send a notification to the target user
 *   7. Return success message
 *
 * --- Business Logic ---
 * 1. auth: session user required (401 if missing)
 * 2. body: { userId: UUID } — target user to follow
 * 3. FollowTransaction.create(currentUserId, targetUserId)
 *    Self-follow returns 409. Target must exist (404 if not).
 *    Creates follow relationship + sends notification to target.
 *
 * ||| Tables Involved |||
 *
 *  +------+ LEFT JOIN +--------------+
 *  | user |---------->| user_profile |  <-- SELECT (verify target exists)
 *  +------+           +--------------+
 *                          |
 *     +---------+          |  +-----------------+
 *     | follows | <-INSERT |  | notifications   | <-- INSERT
 *     +---------+          |  +-----------------+
 *                          |  +--------------+
 *                          +->| user_profile | <-- UPDATE hasNotification=true
 *                             +--------------+
 *
 * ||| SQL Flow |||
 *   SELECT * FROM user LEFT JOIN user_profile ON ... WHERE user.id = :targetUserId
 *   |||
 *   INSERT INTO follows (followerId, followingId, createdAt) VALUES (:me, :target, ...)
 *   |||
 *   INSERT INTO notifications (...) VALUES ('Someone followed you!', :target, ...)
 *   UPDATE user_profile SET hasNotification = true WHERE userId = :target
 *
 * --- Response ---
 *   200: { message: "Success" }
 *   401: Unauthorized
 *   404: User not found
 *   409: Cannot follow yourself / Already following
 *   503: Database error
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
 * DELETE /follow — Unfollow a user
 *
 * ||| What happens step by step |||
 *   1. Check the user is logged in (401 if not)
 *   2. Read the target userId from the request body
 *   3. Delete the follow row from the follows table
 *   4. Return success message
 *
 * --- Business Logic ---
 * 1. auth: session user required (401 if missing)
 * 2. body: { userId: UUID } — target user to unfollow
 * 3. FollowTransaction.remove(currentUserId, targetUserId)
 *
 * ||| Tables Involved |||
 *
 *  +---------+
 *  | follows | <-- DELETE WHERE followerId = :me AND followingId = :target
 *  +---------+
 *
 * ||| SQL |||
 *   DELETE FROM follows WHERE followerId = :me AND followingId = :target
 *
 * --- Response ---
 *   200: { message: "Success" }
 *   401: Unauthorized
 *   503: Database error
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
