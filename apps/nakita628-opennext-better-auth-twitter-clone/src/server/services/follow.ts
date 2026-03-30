import { and, eq } from 'drizzle-orm'
import { Effect } from 'effect'

import { schema } from '@/db'
import { DatabaseError } from '@/errors'
import { DB } from '@/infra'

export function findByUsers(followerId: string, followingId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db
          .select()
          .from(schema.follows)
          .where(
            and(
              eq(schema.follows.followerId, followerId),
              eq(schema.follows.followingId, followingId),
            ),
          )
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function create(followerId: string, followingId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.follows).values({ followerId, followingId }).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

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
