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
export function exists(args: { email: string }) {
  return Effect.gen(function* () {
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
}

/** Find a user by email with their profile. */
export function findByEmail(email: string) {
  return Effect.gen(function* () {
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
}

/** Find a user by email with profile, followers, and following. */
export function findByEmailWithFollows(email: string) {
  return Effect.gen(function* () {
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
}

/** Find a user by ID with their profile. */
export function findById(id: string) {
  return Effect.gen(function* () {
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
}

/** Find a user by ID with profile, followers, and following lists. */
export function findByIdWithFollowCount(id: string) {
  return Effect.gen(function* () {
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
}

/** Fetch all users with profiles, ordered newest-first. */
export function findAll() {
  return Effect.gen(function* () {
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
}

/** Paginated user query returning users with profiles and total count. */
export function findAllPaginated(args: { limit: number; offset: number }) {
  return Effect.gen(function* () {
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
}

/** Create a user profile row with a username. */
export function createProfile(args: { userId: string; username: string }) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.userProfile).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

/** Update profile fields (username, bio, images) for a user. */
export function updateProfile(
  userId: string,
  data: {
    username?: string
    bio?: string | null
    coverImage?: string | null
    profileImage?: string | null
  },
) {
  return Effect.gen(function* () {
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
}

/** Update the display name on the user table. */
export function updateName(id: string, name: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.update(schema.user).set({ name }).where(eq(schema.user.id, id)).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}
