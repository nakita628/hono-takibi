import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'

import { AuthType, DBLive } from '@/infra'
import type { getPostsPostIdRoute, getPostsRoute, postPostsRoute } from '@/server/routes'
import * as PostsTransaction from '@/server/transactions/posts'

/**
 * GET /posts — Retrieve paginated post feed
 *
 * ||| What happens step by step |||
 *   1. Read optional userId filter, page, and limit from the query string
 *   2. Fetch a page of posts with their authors (JOIN user + profile)
 *   3. Count total posts for pagination metadata
 *   4. Batch-count comments and likes for all returned posts
 *   5. Return posts with author info, comment/like counts, and pagination meta
 *
 * --- Business Logic ---
 * 1. query: ?userId (optional) &page &limit
 * 2. PostsTransaction.getAll(page, limit, userId?)
 *
 * ||| Tables Involved |||
 *
 *  +--------+ INNER JOIN +------+ LEFT JOIN +--------------+
 *  | posts  |----------->| user |---------->| user_profile |
 *  +--------+            +------+           +--------------+
 *       |
 *       | post IDs collected, then batch-aggregated:
 *       v
 *  +----------+  SELECT postId, COUNT(*) ... GROUP BY postId
 *  | comments |
 *  +----------+
 *  +----------+  SELECT postId, COUNT(*) ... GROUP BY postId
 *  |  likes   |
 *  +----------+
 *
 * ||| SQL Flow |||
 *   SELECT posts.*, user.*, user_profile.*
 *     FROM posts
 *     INNER JOIN user ON posts.userId = user.id
 *     LEFT  JOIN user_profile ON user.id = user_profile.userId
 *     [WHERE posts.userId = :userId]   -- optional filter
 *     ORDER BY posts.createdAt DESC
 *     LIMIT :limit OFFSET :offset
 *   |||
 *   SELECT COUNT(*) FROM posts [WHERE userId = :userId]
 *   |||
 *   SELECT postId, COUNT(*) FROM comments WHERE postId IN (:ids) GROUP BY postId
 *   SELECT postId, COUNT(*) FROM likes    WHERE postId IN (:ids) GROUP BY postId
 *
 * --- Response ---
 *   200: { data: PostSummary[], meta: { page, limit, total, totalPages } }
 *   503: Database error
 */
export const getPostsRouteHandler: RouteHandler<
  typeof getPostsRoute,
  { Variables: AuthType }
> = async (c) => {
  const { userId, page, limit } = c.req.valid('query')
  const currentUser = c.get('user')

  return Effect.runPromise(
    PostsTransaction.getAll(page ?? 1, limit ?? 20, userId, currentUser?.id).pipe(
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
 * POST /posts — Create a new post (tweet)
 *
 * ||| What happens step by step |||
 *   1. Check the user is logged in (401 if not)
 *   2. Read the post body from the request
 *   3. Insert the post into the database
 *   4. Return the created post
 *
 * --- Business Logic ---
 * 1. auth: session user required (401 if missing)
 * 2. body: { body: string }
 * 3. PostsTransaction.create(userId, body)
 *
 * ||| Tables Involved |||
 *
 *  +--------+
 *  | posts  | <--- INSERT { body, userId } RETURNING *
 *  +--------+
 *
 * ||| SQL |||
 *   INSERT INTO posts (id, body, userId, createdAt, updatedAt)
 *     VALUES (uuid(), :body, :userId, unixepoch(), unixepoch())
 *     RETURNING *
 *
 * --- Response ---
 *   200: Post (created record)
 *   401: Unauthorized
 *   503: Database error
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
 * GET /posts/:postId — Fetch a single post with full details
 *
 * ||| What happens step by step |||
 *   1. Read postId from the URL parameter
 *   2. Load the post with its author (user + profile)
 *   3. Load all comments with their authors (in parallel with likes)
 *   4. Load all likes for this post
 *   5. If post not found, return 404
 *   6. Return the assembled post detail object
 *
 * --- Business Logic ---
 * 1. param: postId (UUID)
 * 2. PostsTransaction.getById(postId)
 *
 * ||| Tables Involved |||
 *
 *  Step 1 — Post + Author:
 *  +--------+ INNER JOIN +------+ LEFT JOIN +--------------+
 *  | posts  |----------->| user |---------->| user_profile |
 *  +--------+            +------+           +--------------+
 *
 *  Step 2 — Comments + Commenters (parallel with Step 3):
 *  +----------+ INNER JOIN +------+ LEFT JOIN +--------------+
 *  | comments |----------->| user |---------->| user_profile |
 *  +----------+            +------+           +--------------+
 *
 *  Step 3 — Likes:
 *  +-------+
 *  | likes | <--- SELECT WHERE postId = :postId
 *  +-------+
 *
 * ||| SQL Flow |||
 *   -- Step 1: Post + Author
 *   SELECT * FROM posts
 *     INNER JOIN user ON posts.userId = user.id
 *     LEFT  JOIN user_profile ON user.id = user_profile.userId
 *     WHERE posts.id = :postId
 *   |||
 *   -- Step 2 & 3 (parallel):
 *   SELECT * FROM comments
 *     INNER JOIN user ON comments.userId = user.id
 *     LEFT  JOIN user_profile ON user.id = user_profile.userId
 *     WHERE comments.postId = :postId
 *     ORDER BY comments.createdAt DESC
 *   |||
 *   SELECT * FROM likes WHERE postId = :postId
 *
 * --- Response ---
 *   200: PostDetail { post, user, comments[], likes[], _count }
 *   404: Post not found
 *   503: Database error
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
