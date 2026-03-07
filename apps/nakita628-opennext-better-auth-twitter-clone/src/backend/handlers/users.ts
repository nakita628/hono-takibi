import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { getUsersRoute, getUsersUserIdRoute } from '@/backend/routes'
import * as UsersTransaction from '@/backend/transactions/users'
import { AuthType, DBLive } from '@/infra'

/**
 * Handle `GET /users/:userId` — fetch a user by ID with follow counts.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[param userId] --> B[UsersTransaction.getById]
 *   B --> C{catchTags}
 *   C --> D[200 OK]
 *   C --> E[404 Not Found]
 *   C --> F[503 DB error]
 * ```
 */
export const getUsersUserIdRouteHandler: RouteHandler<
  typeof getUsersUserIdRoute,
  { Variables: AuthType }
> = async (c) => {
  const { userId } = c.req.valid('param')

  return Effect.runPromise(
    UsersTransaction.getById(userId).pipe(
      Effect.provide(DBLive),
      Effect.map((user) => c.json(user, 200)),
      Effect.catchTags({
        NotFoundError: (e) => Effect.succeed(c.json({ message: e.message }, 404)),
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}

/**
 * Handle `GET /users` — list all users with pagination.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[query params] --> B[UsersTransaction.getAll]
 *   B --> C{catchTags}
 *   C --> D[200 OK]
 *   C --> E[503 DB error]
 * ```
 */
export const getUsersRouteHandler: RouteHandler<
  typeof getUsersRoute,
  { Variables: AuthType }
> = async (c) => {
  const { page, limit } = c.req.valid('query')

  return Effect.runPromise(
    UsersTransaction.getAll(page ?? 1, limit ?? 20).pipe(
      Effect.provide(DBLive),
      Effect.map((users) => c.json(users, 200)),
      Effect.catchTags({
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
