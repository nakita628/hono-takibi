import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { getPostsPostIdRoute, getPostsRoute, postPostsRoute } from '@/backend/routes'
import * as PostsTransaction from '@/backend/transactions/posts'
import { AuthType, DBLive } from '@/infra'

/**
 * Handle `GET /posts` — list posts with pagination.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[query params] --> B[PostsTransaction.getAll]
 *   B --> C{catchTags}
 *   C --> D[200 OK]
 *   C --> E[503 DB error]
 * ```
 */
export const getPostsRouteHandler: RouteHandler<
  typeof getPostsRoute,
  { Variables: AuthType }
> = async (c) => {
  const { userId, page, limit } = c.req.valid('query')

  return Effect.runPromise(
    PostsTransaction.getAll(page ?? 1, limit ?? 20, userId).pipe(
      Effect.provide(DBLive),
      Effect.map((posts) => c.json(posts, 200)),
      Effect.catchTags({
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}

/**
 * Handle `POST /posts` — create a new post.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[PostsTransaction.create] --> B{catchTags}
 *   B --> C[200 OK]
 *   B --> D[503 DB error]
 * ```
 */
export const postPostsRouteHandler: RouteHandler<
  typeof postPostsRoute,
  { Variables: AuthType }
> = async (c) => {
  const user = c.get('user')

  if (!user) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const { body } = c.req.valid('json')

  return Effect.runPromise(
    PostsTransaction.create(user.id, body).pipe(
      Effect.provide(DBLive),
      Effect.map((post) => c.json(post, 200)),
      Effect.catchTags({
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}

/**
 * Handle `GET /posts/:postId` — fetch a single post with relations.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[param postId] --> B[PostsTransaction.getById]
 *   B --> C{catchTags}
 *   C --> D[200 OK]
 *   C --> E[404 Not Found]
 *   C --> F[503 DB error]
 * ```
 */
export const getPostsPostIdRouteHandler: RouteHandler<
  typeof getPostsPostIdRoute,
  { Variables: AuthType }
> = async (c) => {
  const { postId } = c.req.valid('param')

  return Effect.runPromise(
    PostsTransaction.getById(postId).pipe(
      Effect.provide(DBLive),
      Effect.map((post) => c.json(post, 200)),
      Effect.catchTags({
        NotFoundError: (e) => Effect.succeed(c.json({ message: e.message }, 404)),
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
