import { eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { DbClient } from '@/backend/types'
import * as schema from '@/db/schema'

export const create = (args: { body: string; userId: string }) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.notifications).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findByUserId = (userId: string) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () =>
        db.query.notifications.findMany({
          where: eq(schema.notifications.userId, userId),
          orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const updateUserHasNotification = (userId: string, hasNotification: boolean) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () =>
        db
          .update(schema.users)
          .set({ hasNotification })
          .where(eq(schema.users.id, userId))
          .run(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
