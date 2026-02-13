import { eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { ConflictError, DatabaseError } from '@/backend/domain'
import { DB } from '@/db'
import * as schema from '@/db/schema'

export function exists(args: { email: string }) {
  return Effect.gen(function* () {
    const db = yield* DB
    const user = yield* Effect.tryPromise({
      try: () => db.select().from(schema.users).where(eq(schema.users.email, args.email)).get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (user) {
      return yield* Effect.fail(new ConflictError({ message: 'Email already exists' }))
    }
    return null
  })
}

export function create(args: {
  email: string
  name: string
  username: string
  hashedPassword: string
}) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.users).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function findByEmail(email: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.users.findFirst({
          where: eq(schema.users.email, email),
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function findByEmailWithFollows(email: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.users.findFirst({
          where: eq(schema.users.email, email),
          with: {
            followers: true,
            following: true,
          },
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function findById(id: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.users.findFirst({
          where: eq(schema.users.id, id),
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function findByIdWithFollowCount(id: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.users.findFirst({
          where: eq(schema.users.id, id),
          with: {
            followers: true,
            following: true,
          },
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function findAll() {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.users.findMany({
          orderBy: (users, { desc }) => [desc(users.createdAt)],
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function update(
  id: string,
  data: {
    name?: string
    username?: string
    bio?: string | null
    coverImage?: string | null
    profileImage?: string | null
  },
) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.update(schema.users).set(data).where(eq(schema.users.id, id)).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}
