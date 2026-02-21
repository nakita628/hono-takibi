import { eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

/** Insert a new notification row for a user. */
export function create(args: { body: string; userId: string }) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.notifications).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

/** Fetch all notifications for a user, ordered newest-first. */
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

/** Toggle the `hasNotification` flag on a user's profile. */
export function updateUserHasNotification(userId: string, hasNotification: boolean) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db
          .update(schema.userProfile)
          .set({ hasNotification })
          .where(eq(schema.userProfile.userId, userId))
          .run(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}
