import type { RouteHandler } from '@hono/zod-openapi'
import { Effect, Layer } from 'effect'
import { DatabaseError, UnauthorizedError } from '@/backend/domain'
import type { getCurrentRoute } from '@/backend/routes'
import type { AppEnv } from '@/backend/types'
import { DbClient } from '@/backend/types'
import * as CurrentTransaction from '@/backend/transactions/current'

export const getCurrentRouteHandler: RouteHandler<typeof getCurrentRoute, AppEnv> = async (c) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 401)
  }

  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    CurrentTransaction.get(email as string).pipe(
      Effect.provide(layer),
      Effect.match({
        onSuccess: (user) => c.json(user, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 401)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
