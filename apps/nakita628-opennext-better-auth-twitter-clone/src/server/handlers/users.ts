import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'

import { AuthType, DBLive } from '@/infra'
import type { getUsersRoute, getUsersUserIdRoute } from '@/server/routes'
import * as UsersTransaction from '@/server/transactions/users'

/**
 * GET /users/:userId — Fetch a user profile with follow counts
 *
 * ||| What happens step by step |||
 *   1. Read userId from the URL parameter
 *   2. Load the user's row + profile from the database
 *   3. Count their followers and following (in parallel)
 *   4. Return the user profile with follower/following counts
 *
 * --- Business Logic ---
 * 1. param: userId (UUID)
 * 2. UsersTransaction.getById(userId)
 *    Fetches user info + profile + follower/following counts via COUNT.
 *
 * ||| Tables Involved |||
 *
 *  +------+ LEFT JOIN +--------------+
 *  | user |---------->| user_profile |
 *  +------+           +--------------+
 *     |
 *     v  (parallel COUNT queries)
 *  +---------+  COUNT(*) WHERE followingId = :userId  --> followers
 *  | follows |
 *  +---------+  COUNT(*) WHERE followerId  = :userId  --> following
 *
 * ||| SQL Flow |||
 *   SELECT * FROM user
 *     LEFT JOIN user_profile ON user.id = user_profile.userId
 *     WHERE user.id = :userId
 *   |||
 *   -- Parallel: count followers and following
 *   SELECT COUNT(*) FROM follows WHERE followingId = :userId
 *   SELECT COUNT(*) FROM follows WHERE followerId  = :userId
 *
 * --- Response ---
 *   200: UserWithFollowCount { user + _count: { followers, following } }
 *   404: User not found
 *   503: Database error
 */
export const getUsersUserIdRouteHandler: RouteHandler<
  typeof getUsersUserIdRoute,
  { Variables: AuthType }
> = async (c) => {
  const { userId } = c.req.valid('param')

  return Effect.runPromise(
    UsersTransaction.getById(userId).pipe(
      Effect.provide(DBLive),
      Effect.map((user) => c.json(user, 200)),
      Effect.catchTags({
        NotFoundError: (e) => Effect.succeed(c.json({ message: e.message }, 404)),
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}

/**
 * GET /users — List all users with pagination
 *
 * ||| What happens step by step |||
 *   1. Read page and limit from the query string (defaults: page=1, limit=20)
 *   2. Fetch a page of users with their profiles, newest first
 *   3. Count total users for pagination metadata
 *   4. Strip emails and return public-safe user objects
 *
 * --- Business Logic ---
 * 1. query: ?page &limit
 * 2. UsersTransaction.getAll(page, limit)
 *
 * ||| Tables Involved |||
 *
 *  +------+ LEFT JOIN +--------------+
 *  | user |---------->| user_profile |  <-- paginated, ORDER BY createdAt DESC
 *  +------+           +--------------+
 *
 * ||| SQL Flow |||
 *   -- Parallel: fetch users + total count
 *   SELECT * FROM user
 *     LEFT JOIN user_profile ON user.id = user_profile.userId
 *     ORDER BY user.createdAt DESC
 *     LIMIT :limit OFFSET :offset
 *   |||
 *   SELECT COUNT(*) FROM user
 *
 * --- Response ---
 *   200: { data: PublicUser[], meta: { page, limit, total, totalPages } }
 *   503: Database error
 */
export const getUsersRouteHandler: RouteHandler<
  typeof getUsersRoute,
  { Variables: AuthType }
> = async (c) => {
  const { page, limit } = c.req.valid('query')

  return Effect.runPromise(
    UsersTransaction.getAll(page ?? 1, limit ?? 20).pipe(
      Effect.provide(DBLive),
      Effect.map((users) => c.json(users, 200)),
      Effect.catchTags({
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
