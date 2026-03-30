import { Effect } from 'effect'

import { schema } from '@/db'
import { DatabaseError } from '@/errors'
import { DB } from '@/infra'

export function create(body: string, userId: string, postId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.comments).values({ body, userId, postId }).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}
