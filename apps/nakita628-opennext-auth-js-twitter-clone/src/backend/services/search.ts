import { count, like } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

/**
 * Search posts by body content using LIKE query.
 *
 * @param args - Search parameters
 * @param args.query - Search keyword
 * @param args.limit - Max results per page
 * @param args.offset - Pagination offset
 * @returns Effect yielding `{ posts, total }`
 *
 * @mermaid
 * graph TD
 *   A[searchPosts] --> B[Build LIKE clause]
 *   B --> C[Promise.all]
 *   C --> D[findMany posts with user]
 *   C --> E[SELECT count]
 *   D --> F[return posts + total]
 *   E --> F
 */
export const searchPosts = (args: { query: string; limit: number; offset: number }) =>
  Effect.gen(function* () {
    const db = yield* DB
    const whereClause = like(schema.posts.body, `%${args.query}%`)

    const [posts, [{ total }]] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db.query.posts.findMany({
            where: whereClause,
            with: {
              user: {
                with: { userProfile: true },
              },
            },
            orderBy: (posts, { desc }) => [desc(posts.createdAt)],
            limit: args.limit,
            offset: args.offset,
          }),
          db.select({ total: count() }).from(schema.posts).where(whereClause),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    return { posts, total }
  })

/**
 * Search users by name using LIKE query.
 *
 * @param args - Search parameters
 * @param args.query - Search keyword
 * @param args.limit - Max results per page
 * @param args.offset - Pagination offset
 * @returns Effect yielding `{ users, total }`
 */
export const searchUsers = (args: { query: string; limit: number; offset: number }) =>
  Effect.gen(function* () {
    const db = yield* DB
    const whereClause = like(schema.user.name, `%${args.query}%`)

    const [users, [{ total }]] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db.query.user.findMany({
            where: whereClause,
            with: { userProfile: true },
            orderBy: (user, { desc }) => [desc(user.createdAt)],
            limit: args.limit,
            offset: args.offset,
          }),
          db.select({ total: count() }).from(schema.user).where(whereClause),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    return { users, total }
  })
