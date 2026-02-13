import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { DbClient } from '@/backend/types'
import * as schema from '@/db/schema'

export const create = (args: { body: string; userId: string; postId: string }) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.comments).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
