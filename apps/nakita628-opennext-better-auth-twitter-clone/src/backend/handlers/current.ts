import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'

import type { getCurrentRoute } from '@/backend/routes'
import * as CurrentTransaction from '@/backend/transactions/current'
import { AuthType, DBLive } from '@/infra'

/**
 * GET /current — Retrieve the authenticated user's full profile
 *
 * ||| What happens step by step |||
 *   1. Check the user is logged in (401 if not)
 *   2. Load the user's row + profile from the database
 *   3. Load their followers and following lists (in parallel)
 *   4. Map database columns to response fields and return
 *
 * --- Business Logic ---
 * 1. auth: session user required (401 if missing)
 * 2. CurrentTransaction.get(userId)
 *    Fetches user info + profile + follower/following lists.
 *
 * ||| Tables Involved |||
 *
 *  +------+ LEFT JOIN +--------------+
 *  | user |---------->| user_profile |
 *  +------+           +--------------+
 *     |
 *     v  (parallel queries)
 *  +---------+  WHERE followingId = :userId  --> followers[]
 *  | follows |
 *  +---------+  WHERE followerId  = :userId  --> following[]
 *
 * ||| SQL Flow |||
 *   SELECT * FROM user
 *     LEFT JOIN user_profile ON user.id = user_profile.userId
 *     WHERE user.id = :userId
 *   |||
 *   -- Parallel: fetch followers and following simultaneously
 *   SELECT * FROM follows WHERE followingId = :userId   -- people who follow me
 *   SELECT * FROM follows WHERE followerId  = :userId   -- people I follow
 *
 * --- Response ---
 *   200: CurrentUser { id, name, username, email, followers[], following[], hasNotification }
 *   401: Unauthorized
 *   503: Database error
 */
export const getCurrentRouteHandler: RouteHandler<
  typeof getCurrentRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  return Effect.runPromise(
    CurrentTransaction.get(user.id).pipe(
      Effect.provide(DBLive),
      Effect.map((user) => c.json(user, 200)),
      Effect.catchTags({
        UnauthorizedError: (e) => Effect.succeed(c.json({ message: e.message }, 401)),
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
