import { eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { ConflictError, DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

export const exists = (args: { email: string }) =>
  Effect.gen(function* () {
    const db = yield* DB
    const u = yield* Effect.tryPromise({
      try: () => db.select().from(schema.user).where(eq(schema.user.email, args.email)).get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (u) {
      return yield* Effect.fail(new ConflictError({ message: 'Email already exists' }))
    }
    return null
  })

export const findByEmail = (email: string) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.user.findFirst({
          where: eq(schema.user.email, email),
          with: { userProfile: true },
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findByEmailWithFollows = (email: string) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.user.findFirst({
          where: eq(schema.user.email, email),
          with: {
            userProfile: true,
            followers: true,
            following: true,
          },
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findById = (id: string) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.user.findFirst({
          where: eq(schema.user.id, id),
          with: { userProfile: true },
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findByIdWithFollowCount = (id: string) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.user.findFirst({
          where: eq(schema.user.id, id),
          with: {
            userProfile: true,
            followers: true,
            following: true,
          },
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findAll = () =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.user.findMany({
          with: { userProfile: true },
          orderBy: (user, { desc }) => [desc(user.createdAt)],
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const createProfile = (args: { userId: string; username: string }) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.userProfile).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const updateProfile = (
  userId: string,
  data: {
    username?: string
    bio?: string | null
    coverImage?: string | null
    profileImage?: string | null
  },
) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db
          .update(schema.userProfile)
          .set(data)
          .where(eq(schema.userProfile.userId, userId))
          .returning()
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const updateName = (id: string, name: string) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.update(schema.user).set({ name }).where(eq(schema.user.id, id)).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
