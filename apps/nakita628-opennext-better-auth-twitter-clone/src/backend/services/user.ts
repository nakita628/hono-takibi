import { count, desc, eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { ConflictError, DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

/**
 * Check if a user with this email already exists.
 *
 * ||| What It Does |||
 *   Looks up a user by email. If found, fails with ConflictError.
 *   If not found, returns null (meaning "OK, this email is available").
 *
 * ||| SQL |||
 *   SELECT * FROM user WHERE email = :email
 *
 * ||| Used By |||
 *   register transaction — prevents duplicate email registration
 */
export function exists(email: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    const u = yield* Effect.tryPromise({
      try: () => db.select().from(schema.user).where(eq(schema.user.email, email)).get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (u) {
      return yield* Effect.fail(new ConflictError({ message: 'Email already exists' }))
    }
    return null
  })
}

/**
 * Find a user by email, including their profile.
 *
 * ||| SQL |||
 *   SELECT * FROM user
 *     LEFT JOIN user_profile ON user.id = user_profile.userId
 *     WHERE user.email = :email
 *
 * ||| Returns |||
 *   { ...user, userProfile } or undefined if not found
 */
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
    return row ? { ...row.user, userProfile: row.user_profile } : undefined
  })
}

/**
 * Find a user by email with profile + followers + following lists.
 *
 * ||| SQL (2 queries) |||
 *   Query 1: user + profile
 *     SELECT * FROM user LEFT JOIN user_profile WHERE email = :email
 *
 *   Query 2: followers + following (parallel)
 *     SELECT * FROM follows WHERE followingId = :userId  → followers
 *     SELECT * FROM follows WHERE followerId  = :userId  → following
 *
 * ||| Returns |||
 *   { ...user, userProfile, followers[], following[] } or undefined
 */
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

/**
 * Find a user by ID, including their profile.
 *
 * ||| SQL |||
 *   SELECT * FROM user
 *     LEFT JOIN user_profile ON user.id = user_profile.userId
 *     WHERE user.id = :id
 *
 * ||| Returns |||
 *   { ...user, userProfile } or undefined if not found
 */
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
    return row ? { ...row.user, userProfile: row.user_profile } : undefined
  })
}

/**
 * Find a user by ID with profile + follower/following COUNTS.
 * Uses COUNT(*) instead of fetching all follow rows (more efficient).
 *
 * ||| SQL (3 queries) |||
 *   Query 1: user + profile
 *     SELECT * FROM user LEFT JOIN user_profile WHERE id = :id
 *
 *   Query 2 & 3 (parallel): count followers and following
 *     SELECT COUNT(*) FROM follows WHERE followingId = :id  → followersCount
 *     SELECT COUNT(*) FROM follows WHERE followerId  = :id  → followingCount
 *
 * ||| Returns |||
 *   { ...user, userProfile, followersCount, followingCount } or undefined
 *
 * ||| Used By |||
 *   GET /users/:userId — user profile page
 */
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

/**
 * Find a user by ID with profile + full followers/following ARRAYS.
 * Returns the actual follow records (not just counts).
 *
 * ||| SQL (2 queries) |||
 *   Query 1: user + profile
 *     SELECT * FROM user LEFT JOIN user_profile WHERE id = :id
 *
 *   Query 2: followers + following (parallel)
 *     SELECT * FROM follows WHERE followingId = :id  → followers[]
 *     SELECT * FROM follows WHERE followerId  = :id  → following[]
 *
 * ||| Returns |||
 *   { ...user, userProfile, followers[], following[] } or undefined
 *
 * ||| Used By |||
 *   GET /current — authenticated user's full profile
 */
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

/**
 * Fetch all users with profiles, ordered newest-first.
 *
 * ||| SQL |||
 *   SELECT * FROM user
 *     LEFT JOIN user_profile ON user.id = user_profile.userId
 *     ORDER BY user.createdAt DESC
 *
 * ||| Returns |||
 *   Array of { ...user, userProfile }
 */
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

/**
 * Paginated user list with total count.
 *
 * ||| SQL (2 queries in parallel) |||
 *   Query 1: paginated users
 *     SELECT * FROM user LEFT JOIN user_profile
 *       ORDER BY createdAt DESC LIMIT :limit OFFSET :offset
 *
 *   Query 2: total count
 *     SELECT COUNT(*) FROM user
 *
 * ||| Returns |||
 *   { users: [{ ...user, userProfile }], total: number }
 *
 * ||| Used By |||
 *   GET /users — user list with pagination
 */
export function findAllPaginated(limit: number, offset: number) {
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
            .limit(limit)
            .offset(offset)
            .all(),
          db.select({ total: count() }).from(schema.user),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    return {
      users: rows.map((row) => ({ ...row.user, userProfile: row.user_profile })),
      total,
    }
  })
}

/**
 * Create a new user profile row.
 *
 * ||| SQL |||
 *   INSERT INTO user_profile (userId, username) VALUES (:userId, :username)
 *     RETURNING *
 *
 * ||| Used By |||
 *   POST /register — creates profile after user account creation
 */
export function createProfile(userId: string, username: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.userProfile).values({ userId, username }).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

/**
 * Upsert (insert or update) a user's profile.
 * If profile exists → updates the provided fields.
 * If profile doesn't exist → creates a new one.
 *
 * ||| SQL |||
 *   INSERT INTO user_profile (userId, username, bio, coverImage, profileImage)
 *     VALUES (:userId, ...)
 *     ON CONFLICT (userId) DO UPDATE SET ...
 *     RETURNING *
 *
 * ||| Error Handling |||
 *   UNIQUE constraint on username → ConflictError "Username already taken"
 *
 * ||| Used By |||
 *   PATCH /edit — profile editing
 */
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
          .insert(schema.userProfile)
          .values({ userId, ...data })
          .onConflictDoUpdate({
            target: schema.userProfile.userId,
            set: data,
          })
          .returning()
          .get(),
      catch: (error) => {
        if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
          return new ConflictError({ message: 'Username already taken' })
        }
        return new DatabaseError({ message: 'Database error' })
      },
    })
  })
}

/**
 * Update the display name on the user table.
 *
 * ||| SQL |||
 *   UPDATE user SET name = :name WHERE id = :id RETURNING *
 *
 * ||| Used By |||
 *   PATCH /edit — profile editing (name is on user table, not user_profile)
 */
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
