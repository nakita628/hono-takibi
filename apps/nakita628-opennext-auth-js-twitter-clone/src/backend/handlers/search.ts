import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { DatabaseError, ValidationError } from '@/backend/domain'
import type { getSearchRoute } from '@/backend/routes'
import * as SearchTransaction from '@/backend/transactions/search'
import { DBLive } from '@/infra'
import type { AuthType } from '@/lib/auth'

export const getSearchRouteHandler: RouteHandler<
  typeof getSearchRoute,
  { Variables: AuthType }
> = async (c) => {
  const { q, page, limit } = c.req.valid('query')

  return Effect.runPromise(
    SearchTransaction.search({ query: q, page: page ?? 1, limit: limit ?? 20 }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (results) => c.json(results, 200),
        onFailure: (e) => {
          if (e instanceof ValidationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
