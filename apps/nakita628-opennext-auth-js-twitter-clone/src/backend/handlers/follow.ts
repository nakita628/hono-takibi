import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from '@/backend/domain'
import type { deleteFollowRoute, postFollowRoute } from '@/backend/routes'
import * as FollowTransaction from '@/backend/transactions/follow'
import { DBLive } from '@/infra'
import type { AuthType } from '@/lib/auth'

export const postFollowRouteHandler: RouteHandler<
  typeof postFollowRoute,
  { Variables: AuthType }
> = async (c) => {
  const email = c.get('user')?.email
  if (!email) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const { userId } = c.req.valid('json')

  return Effect.runPromise(
    FollowTransaction.create(email, { userId }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 401)
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 404)
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}

export const deleteFollowRouteHandler: RouteHandler<
  typeof deleteFollowRoute,
  { Variables: AuthType }
> = async (c) => {
  const email = c.get('user')?.email
  if (!email) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const { userId } = c.req.valid('json')

  return Effect.runPromise(
    FollowTransaction.remove(email, { userId }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 401)
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
