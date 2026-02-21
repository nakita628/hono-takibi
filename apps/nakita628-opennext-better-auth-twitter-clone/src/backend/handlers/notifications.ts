import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, ValidationError } from '@/backend/domain'
import type { getNotificationsUserIdRoute, postNotificationsRoute } from '@/backend/routes'
import * as NotificationsTransaction from '@/backend/transactions/notifications'
import { DBLive } from '@/infra'
import { auth, type AuthType } from '@/lib/auth'

/**
 * Handle `GET /notifications/:userId` — fetch notifications for a user.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[param userId] --> B[NotificationsTransaction.getByUserId]
 *   B --> C{match}
 *   C --> D[200 OK]
 *   C --> E[503 DB error]
 * ```
 */
export const getNotificationsUserIdRouteHandler: RouteHandler<
  typeof getNotificationsUserIdRoute,
  { Variables: AuthType }
> = async (c) => {
  const session = await auth().api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const { userId } = c.req.valid('param')

  return Effect.runPromise(
    NotificationsTransaction.getByUserId(userId).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (notifications) => c.json(notifications, 200),
        onFailure: (e) => {
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}

/**
 * Handle `POST /notifications` — mark notifications as read.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[body userId] --> B[NotificationsTransaction.markAsRead]
 *   B --> C{match}
 *   C --> D[200 OK]
 *   C --> E[503 DB error]
 * ```
 */
export const postNotificationsRouteHandler: RouteHandler<
  typeof postNotificationsRoute,
  { Variables: AuthType }
> = async (c) => {
  const session = await auth().api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const userId = await c.req.text()

  return Effect.runPromise(
    NotificationsTransaction.markAsRead(userId).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
