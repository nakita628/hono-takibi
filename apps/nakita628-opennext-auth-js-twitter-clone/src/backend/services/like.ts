import { and, eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

export const create = (args: { userId: string; postId: string }) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.likes).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const remove = (args: { userId: string; postId: string }) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db
          .delete(schema.likes)
          .where(and(eq(schema.likes.userId, args.userId), eq(schema.likes.postId, args.postId)))
          .returning()
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
