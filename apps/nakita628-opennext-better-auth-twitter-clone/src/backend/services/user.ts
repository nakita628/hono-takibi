import { count, desc, eq } from 'drizzle-orm'
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
    const row = yield* Effect.tryPromise({
      try: () =>
        db
          .select()
          .from(schema.user)
          .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
          .where(eq(schema.user.email, email))
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (!row) return undefined
    return { ...row.user, userProfile: row.user_profile }
  })
}

/** Find a user by email with profile, followers, and following. */
export function findByEmailWithFollows(email: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    const row = yield* Effect.tryPromise({
      try: () =>
        db
          .select()
          .from(schema.user)
          .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
          .where(eq(schema.user.email, email))
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (!row) return undefined

    const [followers, following] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db.select().from(schema.follows).where(eq(schema.follows.followingId, row.user.id)).all(),
          db.select().from(schema.follows).where(eq(schema.follows.followerId, row.user.id)).all(),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    return { ...row.user, userProfile: row.user_profile, followers, following }
  })
}

/** Find a user by ID with their profile. */
export function findById(id: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    const row = yield* Effect.tryPromise({
      try: () =>
        db
          .select()
          .from(schema.user)
          .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
          .where(eq(schema.user.id, id))
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (!row) return undefined
    return { ...row.user, userProfile: row.user_profile }
  })
}

/** Find a user by ID with profile and follower/following counts using SQL COUNT. */
export function findByIdWithFollowCount(id: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    const row = yield* Effect.tryPromise({
      try: () =>
        db
          .select()
          .from(schema.user)
          .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
          .where(eq(schema.user.id, id))
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (!row) return undefined

    const [followersResult, followingResult] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db
            .select({ count: count() })
            .from(schema.follows)
            .where(eq(schema.follows.followingId, id))
            .get(),
          db
            .select({ count: count() })
            .from(schema.follows)
            .where(eq(schema.follows.followerId, id))
            .get(),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    return {
      ...row.user,
      userProfile: row.user_profile,
      followersCount: followersResult?.count ?? 0,
      followingCount: followingResult?.count ?? 0,
    }
  })
}

/** Find a user by ID with profile, followers, and following arrays. */
export function findByIdWithFollows(id: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    const row = yield* Effect.tryPromise({
      try: () =>
        db
          .select()
          .from(schema.user)
          .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
          .where(eq(schema.user.id, id))
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (!row) return undefined

    const [followers, following] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db.select().from(schema.follows).where(eq(schema.follows.followingId, id)).all(),
          db.select().from(schema.follows).where(eq(schema.follows.followerId, id)).all(),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    return { ...row.user, userProfile: row.user_profile, followers, following }
  })
}

/** Fetch all users with profiles, ordered newest-first. */
export function findAll() {
  return Effect.gen(function* () {
    const db = yield* DB
    const rows = yield* Effect.tryPromise({
      try: () =>
        db
          .select()
          .from(schema.user)
          .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
          .orderBy(desc(schema.user.createdAt))
          .all(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    return rows.map((row) => ({ ...row.user, userProfile: row.user_profile }))
  })
}

/** Paginated user query returning users with profiles and total count. */
export function findAllPaginated(args: { limit: number; offset: number }) {
  return Effect.gen(function* () {
    const db = yield* DB
    const [rows, [{ total }]] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db
            .select()
            .from(schema.user)
            .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
            .orderBy(desc(schema.user.createdAt))
            .limit(args.limit)
            .offset(args.offset)
            .all(),
          db.select({ total: count() }).from(schema.user),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    const users = rows.map((row) => ({ ...row.user, userProfile: row.user_profile }))
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
    username?: string | undefined
    bio?: string | null | undefined
    coverImage?: string | null | undefined
    profileImage?: string | null | undefined
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
