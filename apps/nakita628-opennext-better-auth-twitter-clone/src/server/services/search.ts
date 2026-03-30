import { count, desc, eq, like } from 'drizzle-orm'
import { Effect } from 'effect'

import { schema } from '@/db'
import { DatabaseError } from '@/errors'
import { DB } from '@/infra'

export function searchPosts(query: string, limit: number, offset: number) {
  const whereClause = like(schema.posts.body, `%${query}%`)

  return Effect.gen(function* () {
    const db = yield* DB
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
    return {
      posts: postRows.map((row) => ({
        ...row.posts,
        user: { ...row.user, userProfile: row.user_profile },
      })),
      total,
    }
  })
}

export function searchUsers(query: string, limit: number, offset: number) {
  const whereClause = like(schema.user.name, `%${query}%`)

  return Effect.gen(function* () {
    const db = yield* DB
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
    return {
      users: userRows.map((row) => ({ ...row.user, userProfile: row.user_profile })),
      total,
    }
  })
}
