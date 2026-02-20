import { count, like } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

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
