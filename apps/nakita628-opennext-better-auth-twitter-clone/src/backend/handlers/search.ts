import type { RouteHandler } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { getSearchRoute } from '@/backend/routes'
import * as SearchTransaction from '@/backend/transactions/search'
import { AuthType, DBLive } from '@/infra'

/**
 * GET /search — Full-text search across posts and users
 *
 * ||| What happens step by step |||
 *   1. Read the search query (q), page, and limit from the query string
 *   2. Search posts (by body text) and users (by name/username) in parallel
 *   3. For matched posts, batch-count comments and likes
 *   4. Return both post results and user results
 *
 * --- Business Logic ---
 * 1. query: ?q (search string, required) &page &limit
 * 2. SearchTransaction.search(q, page, limit)
 *    Searches posts and users in parallel using LIKE,
 *    then aggregates comment/like counts for matched posts.
 *
 * ||| Tables Involved |||
 *
 *  Parallel query 1 — Post search:
 *  +--------+ INNER JOIN +------+ LEFT JOIN +--------------+
 *  | posts  |----------->| user |---------->| user_profile |
 *  +--------+            +------+           +--------------+
 *  WHERE posts.body LIKE '%q%'
 *
 *  Parallel query 2 — User search:
 *  +------+ LEFT JOIN +--------------+
 *  | user |---------->| user_profile |
 *  +------+           +--------------+
 *  WHERE user.name LIKE '%q%' OR user_profile.username LIKE '%q%'
 *
 *  Aggregation (for matched post IDs):
 *  +----------+  COUNT GROUP BY postId
 *  | comments |
 *  +----------+
 *  +-------+    COUNT GROUP BY postId
 *  | likes |
 *  +-------+
 *
 * ||| SQL Flow |||
 *   -- Parallel:
 *   SELECT * FROM posts INNER JOIN user LEFT JOIN user_profile
 *     WHERE posts.body LIKE '%:q%'
 *     ORDER BY posts.createdAt DESC LIMIT :limit OFFSET :offset
 *   |||
 *   SELECT * FROM user LEFT JOIN user_profile
 *     WHERE user.name LIKE '%:q%' OR user_profile.username LIKE '%:q%'
 *     LIMIT :limit OFFSET :offset
 *   |||
 *   SELECT postId, COUNT(*) FROM comments WHERE postId IN (:ids) GROUP BY postId
 *   SELECT postId, COUNT(*) FROM likes    WHERE postId IN (:ids) GROUP BY postId
 *
 * --- Response ---
 *   200: { posts: PostSummary[], users: PublicUser[] }
 *   503: Database error
 */
export const getSearchRouteHandler: RouteHandler<
  typeof getSearchRoute,
  { Variables: AuthType }
> = async (c) => {
  const { q, page, limit } = c.req.valid('query')
  const currentUser = c.get('user')

  return Effect.runPromise(
    SearchTransaction.search(q, page ?? 1, limit ?? 20, currentUser?.id).pipe(
      Effect.provide(DBLive),
      Effect.map((results) => c.json(results, 200)),
      Effect.catchTags({
        ContractViolationError: (e) => Effect.succeed(c.json({ message: e.message }, 500)),
        DatabaseError: (e) => Effect.succeed(c.json({ message: e.message }, 503)),
      }),
    ),
  )
}
