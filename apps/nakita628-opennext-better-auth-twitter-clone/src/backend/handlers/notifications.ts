import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'

import type { getNotificationsUserIdRoute, postNotificationsRoute } from '@/backend/routes'
import * as NotificationsTransaction from '@/backend/transactions/notifications'
import { AuthType, DBLive } from '@/infra'

/**
 * GET /notifications/:userId — Fetch notifications for a user
 *
 * ||| What happens step by step |||
 *   1. Check the user is logged in (401 if not)
 *   2. Verify the requested userId matches the logged-in user (401 if not)
 *   3. Query all notifications for this user, newest first
 *   4. Return the notification list
 *
 * --- Business Logic ---
 * 1. auth: session user required (401 if missing)
 * 2. param: userId (UUID) — only the user's own ID is allowed (401 for others)
 * 3. NotificationsTransaction.getByUserId(userId)
 *
 * ||| Tables Involved |||
 *
 *  +---------------+
 *  | notifications | <-- SELECT WHERE userId = :userId ORDER BY createdAt DESC
 *  +---------------+
 *
 * ||| SQL |||
 *   SELECT * FROM notifications
 *     WHERE userId = :userId
 *     ORDER BY createdAt DESC
 *
 * --- Response ---
 *   200: Notification[]
 *   401: Unauthorized (not authenticated or mismatched userId)
 *   503: Database error
 */
export const getNotificationsUserIdRouteHandler: RouteHandler<
  typeof getNotificationsUserIdRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const { userId } = c.req.valid('param')

  if (user.id !== userId) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  return Effect.runPromise(
    NotificationsTransaction.getByUserId(userId).pipe(
      Effect.provide(DBLive),
      Effect.map((notifications) => c.json(notifications, 200)),
      Effect.catchTags({
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}

/**
 * POST /notifications — Mark notifications as read
 *
 * ||| What happens step by step |||
 *   1. Check the user is logged in (401 if not)
 *   2. Set hasNotification = false on the user's profile
 *   3. Return a success message
 *
 * --- Business Logic ---
 * 1. auth: session user required (401 if missing)
 * 2. NotificationsTransaction.markAsRead(userId)
 *    Resets the hasNotification flag to false on user_profile.
 *
 * ||| Tables Involved |||
 *
 *  +--------------+
 *  | user_profile | <-- UPDATE SET hasNotification = false
 *  +--------------+
 *
 * ||| SQL |||
 *   UPDATE user_profile SET hasNotification = false WHERE userId = :userId
 *
 * --- Response ---
 *   200: { message: "Notifications updated" }
 *   401: Unauthorized
 *   503: Database error
 */
export const postNotificationsRouteHandler: RouteHandler<
  typeof postNotificationsRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  return Effect.runPromise(
    NotificationsTransaction.markAsRead(user.id).pipe(
      Effect.provide(DBLive),
      Effect.map((result) => c.json(result, 200)),
      Effect.catchTags({
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
