import { count, desc, eq } from 'drizzle-orm'
import { Effect } from 'effect'

import { schema } from '@/db'
import { ConflictError, DatabaseError } from '@/errors'
import { DB } from '@/infra'

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

export function createProfile(userId: string, username: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.userProfile).values({ userId, username }).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

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
