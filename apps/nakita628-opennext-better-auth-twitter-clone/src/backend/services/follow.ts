import { and, eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

/** Insert a follow relationship between two users. */
export function create(followerId: string, followingId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.follows).values({ followerId, followingId }).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

/** Delete a follow relationship between two users. */
export function remove(followerId: string, followingId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db
          .delete(schema.follows)
          .where(
            and(
              eq(schema.follows.followerId, followerId),
              eq(schema.follows.followingId, followingId),
            ),
          )
          .returning()
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}
