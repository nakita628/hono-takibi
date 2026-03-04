import { count, desc, eq, like } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

/**
 * Search posts by body content using LIKE query.
 *
 * @param query - Search keyword
 * @param limit - Max results per page
 * @param offset - Pagination offset
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
export function searchPosts(query: string, limit: number, offset: number) {
  return Effect.gen(function* () {
    const db = yield* DB
    const whereClause = like(schema.posts.body, `%${query}%`)

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
            .limit(limit)
            .offset(offset)
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
 * @param query - Search keyword
 * @param limit - Max results per page
 * @param offset - Pagination offset
 * @returns Effect yielding `{ users, total }`
 */
export function searchUsers(query: string, limit: number, offset: number) {
  return Effect.gen(function* () {
    const db = yield* DB
    const whereClause = like(schema.user.name, `%${query}%`)

    const [userRows, [{ total }]] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db
            .select()
            .from(schema.user)
            .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
            .where(whereClause)
            .orderBy(desc(schema.user.createdAt))
            .limit(limit)
            .offset(offset)
            .all(),
          db.select({ total: count() }).from(schema.user).where(whereClause),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    const users = userRows.map((row) => ({ ...row.user, userProfile: row.user_profile }))

    return { users, total }
  })
}
