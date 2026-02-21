import { count, eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { ConflictError, DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

/**
 * Assert that no user with the given email exists.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[SELECT by email] --> B{found?}
 *   B -- yes --> C[fail ConflictError]
 *   B -- no --> D[return null]
 * ```
 */
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

/** Find a user by email with their profile. */
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

/** Find a user by email with profile, followers, and following. */
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

/** Find a user by ID with their profile. */
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

/** Find a user by ID with profile, followers, and following lists. */
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

/** Fetch all users with profiles, ordered newest-first. */
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

/** Paginated user query returning users with profiles and total count. */
export const findAllPaginated = (args: { limit: number; offset: number }) =>
  Effect.gen(function* () {
    const db = yield* DB
    const [users, [{ total }]] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db.query.user.findMany({
            with: { userProfile: true },
            orderBy: (user, { desc }) => [desc(user.createdAt)],
            limit: args.limit,
            offset: args.offset,
          }),
          db.select({ total: count() }).from(schema.user),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    return { users, total }
  })

/** Create a user profile row with a username. */
export const createProfile = (args: { userId: string; username: string }) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.userProfile).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

/** Update profile fields (username, bio, images) for a user. */
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

/** Update the display name on the user table. */
export const updateName = (id: string, name: string) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.update(schema.user).set({ name }).where(eq(schema.user.id, id)).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
