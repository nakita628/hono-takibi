import { eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { DB } from '@/db'
import * as schema from '@/db/schema'

export function create(args: { body: string; userId: string }) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.notifications).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function findByUserId(userId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.notifications.findMany({
          where: eq(schema.notifications.userId, userId),
          orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function updateUserHasNotification(userId: string, hasNotification: boolean) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.update(schema.users).set({ hasNotification }).where(eq(schema.users.id, userId)).run(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}
