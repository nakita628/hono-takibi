import { count, desc, eq, like } from 'drizzle-orm'
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
 *   C --> D[select posts + join user/profile]
 *   C --> E[SELECT count]
 *   D --> F[return posts + total]
 *   E --> F
 */
export function searchPosts(args: { query: string; limit: number; offset: number }) {
  return Effect.gen(function* () {
    const db = yield* DB
    const whereClause = like(schema.posts.body, `%${args.query}%`)

    const [postRows, [{ total }]] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db
            .select()
            .from(schema.posts)
            .innerJoin(schema.user, eq(schema.posts.userId, schema.user.id))
            .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
            .where(whereClause)
            .orderBy(desc(schema.posts.createdAt))
            .limit(args.limit)
            .offset(args.offset)
            .all(),
          db.select({ total: count() }).from(schema.posts).where(whereClause),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    const posts = postRows.map((row) => ({
      ...row.posts,
      user: { ...row.user, userProfile: row.user_profile },
    }))

    return { posts, total }
  })
}

/**
 * Search users by name using LIKE query.
 *
 * @param args - Search parameters
 * @param args.query - Search keyword
 * @param args.limit - Max results per page
 * @param args.offset - Pagination offset
 * @returns Effect yielding `{ users, total }`
 */
export function searchUsers(args: { query: string; limit: number; offset: number }) {
  return Effect.gen(function* () {
    const db = yield* DB
    const whereClause = like(schema.user.name, `%${args.query}%`)

    const [userRows, [{ total }]] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db
            .select()
            .from(schema.user)
            .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
            .where(whereClause)
            .orderBy(desc(schema.user.createdAt))
            .limit(args.limit)
            .offset(args.offset)
            .all(),
          db.select({ total: count() }).from(schema.user).where(whereClause),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    const users = userRows.map((row) => ({ ...row.user, userProfile: row.user_profile }))

    return { users, total }
  })
}
