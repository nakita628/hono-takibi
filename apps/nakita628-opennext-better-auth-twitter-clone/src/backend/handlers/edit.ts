import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { patchEditRoute } from '@/backend/routes'
import * as EditTransaction from '@/backend/transactions/edit'
import { AuthType, DBLive } from '@/infra'

/**
 * PATCH /edit — Update the authenticated user's profile
 *
 * ||| What happens step by step |||
 *   1. Check the user is logged in (401 if not)
 *   2. Read the fields to update from the request body
 *   3. Verify the user exists in the database
 *   4. Update display name on the user table (if changed)
 *   5. Upsert profile fields (username, bio, images) on user_profile
 *   6. Return the updated user
 *
 * --- Business Logic ---
 * 1. auth: session user required (401 if missing)
 * 2. body: { name?, username?, bio?, coverImage?, profileImage? }
 * 3. EditTransaction.update(userId, body)
 *    Updates the user table (name) and upserts the user_profile table.
 *
 * ||| Tables Involved |||
 *
 *  Step 1 — Verify user exists:
 *  +------+ LEFT JOIN +--------------+
 *  | user |---------->| user_profile |  <-- SELECT WHERE user.id = :userId
 *  +------+           +--------------+
 *
 *  Step 2 — Update name (only if changed):
 *  +------+
 *  | user | <-- UPDATE SET name = :name WHERE id = :userId
 *  +------+
 *
 *  Step 3 — Upsert profile:
 *  +--------------+
 *  | user_profile | <-- INSERT ... ON CONFLICT(userId) DO UPDATE
 *  +--------------+     SET { username, bio, coverImage, profileImage }
 *
 * ||| SQL Flow |||
 *   SELECT * FROM user LEFT JOIN user_profile ON ... WHERE user.id = :userId
 *   |||
 *   UPDATE user SET name = :name WHERE id = :userId RETURNING *   -- if name changed
 *   |||
 *   INSERT INTO user_profile (userId, username, bio, coverImage, profileImage)
 *     VALUES (:userId, :username, :bio, :coverImage, :profileImage)
 *     ON CONFLICT(userId) DO UPDATE SET username=..., bio=..., coverImage=..., profileImage=...
 *     RETURNING *
 *
 * --- Response ---
 *   200: User (updated)
 *   401: Unauthorized
 *   409: Username already taken (UNIQUE constraint violation)
 *   503: Database error
 */
export const patchEditRouteHandler: RouteHandler<
  typeof patchEditRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const body = c.req.valid('json')

  return Effect.runPromise(
    EditTransaction.update(user.id, body).pipe(
      Effect.provide(DBLive),
      Effect.map((user) => c.json(user, 200)),
      Effect.catchTags({
        UnauthorizedError: (e) => Effect.succeed(c.json({ message: e.message }, 401)),
        ConflictError: (e) => Effect.succeed(c.json({ message: e.message }, 409)),
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
