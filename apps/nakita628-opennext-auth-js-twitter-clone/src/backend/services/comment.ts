import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

/** Insert a new comment row and return the created record. */
export const create = (args: { body: string; userId: string; postId: string }) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.comments).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
