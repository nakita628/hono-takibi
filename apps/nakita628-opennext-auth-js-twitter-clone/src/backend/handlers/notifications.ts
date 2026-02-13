import type { RouteHandler } from '@hono/zod-openapi'
import { drizzle } from 'drizzle-orm/d1'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import type { Bindings } from '@/backend/env'
import type { getNotificationsUserIdRoute, postNotificationsRoute } from '@/backend/routes'
import * as NotificationsTransaction from '@/backend/transactions/notifications'
import { DB } from '@/db'
import * as schema from '@/db/schema'

export const getNotificationsUserIdRouteHandler: RouteHandler<
  typeof getNotificationsUserIdRoute,
  { Bindings: Bindings }
> = async (c) => {
  const { userId } = c.req.valid('param')
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    NotificationsTransaction.getByUserId(userId).pipe(
      Effect.provideService(DB, db),
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
  { Bindings: Bindings }
> = async (c) => {
  const userId = await c.req.text()
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    NotificationsTransaction.markAsRead(userId).pipe(
      Effect.provideService(DB, db),
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
