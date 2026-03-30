import { desc, eq } from 'drizzle-orm'
import { Effect } from 'effect'

import { schema } from '@/db'
import { DatabaseError } from '@/errors'
import { DB } from '@/infra'

export function create(body: string, userId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.notifications).values({ body, userId }).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function findByUserId(userId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db
          .select()
          .from(schema.notifications)
          .where(eq(schema.notifications.userId, userId))
          .orderBy(desc(schema.notifications.createdAt))
          .all(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function createAndNotify(body: string, userId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    const [notification] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db.insert(schema.notifications).values({ body, userId }).returning().get(),
          db
            .update(schema.userProfile)
            .set({ hasNotification: true })
            .where(eq(schema.userProfile.userId, userId))
            .run(),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    return notification
  })
}

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
