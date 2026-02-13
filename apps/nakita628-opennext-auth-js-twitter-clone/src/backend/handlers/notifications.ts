import type { RouteHandler } from '@hono/zod-openapi'
import { Effect, Layer } from 'effect'
import { DatabaseError } from '@/backend/domain'
import type { getNotificationsUserIdRoute, postNotificationsRoute } from '@/backend/routes'
import type { AppEnv } from '@/backend/types'
import { DbClient } from '@/backend/types'
import * as NotificationsTransaction from '@/backend/transactions/notifications'

export const getNotificationsUserIdRouteHandler: RouteHandler<
  typeof getNotificationsUserIdRoute,
  AppEnv
> = async (c) => {
  const { userId } = c.req.valid('param')
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    NotificationsTransaction.getByUserId(userId).pipe(
      Effect.provide(layer),
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
  AppEnv
> = async (c) => {
  const userId = await c.req.text()
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    NotificationsTransaction.markAsRead(userId).pipe(
      Effect.provide(layer),
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
