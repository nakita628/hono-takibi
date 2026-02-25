import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { ContractViolationError, DatabaseError, NotFoundError } from '@/backend/domain'
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
 *   B --> C{match}
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
    PostsTransaction.getAll({
      ...(userId !== undefined ? { userId } : {}),
      page: page ?? 1,
      limit: limit ?? 20,
    }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (posts) => c.json(posts, 200),
        onFailure: (e) => {
          if (e instanceof ContractViolationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
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
 *   A[PostsTransaction.create] --> B{match}
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

  const userId = user.id

  const { body } = c.req.valid('json')

  return Effect.runPromise(
    PostsTransaction.create(userId, { body }).pipe(
      Effect.provide(DBLive),
      Effect.match({
        onSuccess: (post) => c.json(post, 200),
        onFailure: (e) => {
          if (e instanceof ContractViolationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
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
 *   B --> C{match}
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
      Effect.match({
        onSuccess: (post) => c.json(post, 200),
        onFailure: (e) => {
          if (e instanceof NotFoundError) return c.json({ message: e.message }, 404)
          if (e instanceof ContractViolationError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
