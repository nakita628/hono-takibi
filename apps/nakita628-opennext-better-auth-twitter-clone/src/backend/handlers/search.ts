import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { getSearchRoute } from '@/backend/routes'
import * as SearchTransaction from '@/backend/transactions/search'
import { AuthType, DBLive } from '@/infra'

/**
 * Handle `GET /search` — full-text search across posts.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[query params] --> B[SearchTransaction.search]
 *   B --> C{catchTags}
 *   C --> D[200 OK]
 *   C --> E[503 DB error]
 * ```
 */
export const getSearchRouteHandler: RouteHandler<
  typeof getSearchRoute,
  { Variables: AuthType }
> = async (c) => {
  const { q, page, limit } = c.req.valid('query')

  return Effect.runPromise(
    SearchTransaction.search(q, page ?? 1, limit ?? 20).pipe(
      Effect.provide(DBLive),
      Effect.map((results) => c.json(results, 200)),
      Effect.catchTags({
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
