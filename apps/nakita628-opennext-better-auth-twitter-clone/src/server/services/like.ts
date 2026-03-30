import { and, eq } from 'drizzle-orm'
import { Effect } from 'effect'

import { schema } from '@/db'
import { DatabaseError } from '@/errors'
import { DB } from '@/infra'

export function create(userId: string, postId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.likes).values({ userId, postId }).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function remove(userId: string, postId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db
          .delete(schema.likes)
          .where(and(eq(schema.likes.userId, userId), eq(schema.likes.postId, postId)))
          .returning()
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}
