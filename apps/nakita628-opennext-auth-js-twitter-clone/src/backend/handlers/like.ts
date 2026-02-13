import type { RouteHandler } from '@hono/zod-openapi'
import { drizzle } from 'drizzle-orm/d1'
import { Effect } from 'effect'
import { DatabaseError, NotFoundError, UnauthorizedError } from '@/backend/domain'
import type { Bindings } from '@/backend/env'
import type { deleteLikeRoute, postLikeRoute } from '@/backend/routes'
import * as LikeTransaction from '@/backend/transactions/like'
import { DB } from '@/db'
import * as schema from '@/db/schema'

export const postLikeRouteHandler: RouteHandler<
  typeof postLikeRoute,
  { Bindings: Bindings }
> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const { postId } = c.req.valid('json')
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    LikeTransaction.create(email, { postId }).pipe(
      Effect.provideService(DB, db),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 500)
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}

export const deleteLikeRouteHandler: RouteHandler<
  typeof deleteLikeRoute,
  { Bindings: Bindings }
> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const { postId } = c.req.valid('json')
  const db = drizzle(c.env.DB, { schema })

  return Effect.runPromise(
    LikeTransaction.remove(email, { postId }).pipe(
      Effect.provideService(DB, db),
      Effect.match({
        onSuccess: (result) => c.json(result, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 500)
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
