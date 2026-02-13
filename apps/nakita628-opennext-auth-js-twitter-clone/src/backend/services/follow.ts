import { and, eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { DbClient } from '@/backend/types'
import * as schema from '@/db/schema'

export const create = (args: { followerId: string; followingId: string }) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.follows).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const remove = (args: { followerId: string; followingId: string }) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () =>
        db
          .delete(schema.follows)
          .where(
            and(
              eq(schema.follows.followerId, args.followerId),
              eq(schema.follows.followingId, args.followingId),
            ),
          )
          .returning()
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
