import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import type { AuthType } from '@/lib/auth'
import type { getNotificationsUserIdRoute, postNotificationsRoute } from '@/backend/routes'
import * as NotificationsTransaction from '@/backend/transactions/notifications'
import { DBLive } from '@/infra'

export const getNotificationsUserIdRouteHandler: RouteHandler<
  typeof getNotificationsUserIdRoute,
  { Variables: AuthType }
> = async (c) => {
  const { userId } = c.req.valid('param')

  return Effect.runPromise(
    NotificationsTransaction.getByUserId(userId).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (notifications) => c.json(notifications, 200),
        onFailure: (e) => {
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}

export const postNotificationsRouteHandler: RouteHandler<
  typeof postNotificationsRoute,
  { Variables: AuthType }
> = async (c) => {
  const userId = await c.req.text()

  return Effect.runPromise(
    NotificationsTransaction.markAsRead(userId).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
