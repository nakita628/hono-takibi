import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { postRegisterRoute } from '@/backend/routes'
import * as UserTransaction from '@/backend/transactions/register'
import { AuthType, DBLive } from '@/infra'

/**
 * POST /register — Register a new user account
 *
 * ||| What happens step by step |||
 *   1. Read email, name, username, password from the request body
 *   2. Check that the email is not already taken (409 if it is)
 *   3. Create the auth account via Better Auth (hashes password)
 *   4. Create the application profile (user_profile row)
 *   5. Return the created user
 *
 * --- Business Logic ---
 * 1. body: { email, name, username, password }
 * 2. UserTransaction.create(email, name, username, password)
 *    Checks email uniqueness, creates auth account via Better Auth,
 *    then creates the application profile.
 *
 * ||| Tables Involved |||
 *
 *  Step 1 — Duplicate check:
 *  +------+
 *  | user | <-- SELECT WHERE email = :email (409 if found)
 *  +------+
 *
 *  Step 2 — Better Auth creates internally:
 *  +------+     +---------+
 *  | user | <-- | account |  (credential provider, hashed password)
 *  +------+     +---------+
 *
 *  Step 3 — Create app profile:
 *  +--------------+
 *  | user_profile | <-- INSERT { userId, username }
 *  +--------------+
 *
 * ||| SQL Flow |||
 *   SELECT * FROM user WHERE email = :email          -- duplicate check
 *   |||
 *   -- Better Auth internally INSERTs into user + account tables
 *   |||
 *   INSERT INTO user_profile (userId, username, createdAt, updatedAt)
 *     VALUES (:userId, :username, ...) RETURNING *
 *
 * --- Response ---
 *   201: User (created)
 *   409: Email already exists
 *   503: Database error
 */
export const postRegisterRouteHandler: RouteHandler<
  typeof postRegisterRoute,
  { Variables: AuthType }
> = async (c) => {
  const { email, name, username, password } = c.req.valid('json')

  return Effect.runPromise(
    UserTransaction.create(email, name, username, password).pipe(
      Effect.provide(DBLive),
      Effect.map((user) => c.json(user, 201)),
      Effect.catchTags({
        ConflictError: (e) => Effect.succeed(c.json({ message: e.message }, 409)),
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
