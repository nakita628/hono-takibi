import { eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { ConflictError, DatabaseError } from '@/backend/domain'
import { DbClient } from '@/backend/types'
import * as schema from '@/db/schema'

export const exists = (args: { email: string }) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    const user = yield* Effect.tryPromise({
      try: () => db.select().from(schema.users).where(eq(schema.users.email, args.email)).get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (user) {
      return yield* Effect.fail(new ConflictError({ message: 'Email already exists' }))
    }
    return null
  })

export const create = (args: {
  email: string
  name: string
  username: string
  hashedPassword: string
}) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.users).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findByEmail = (email: string) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () =>
        db.query.users.findFirst({
          where: eq(schema.users.email, email),
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findByEmailWithFollows = (email: string) =>
  Effect.gen(function* () {
    const db = yield* DbClient
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

export const findById = (id: string) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () =>
        db.query.users.findFirst({
          where: eq(schema.users.id, id),
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findByIdWithFollowCount = (id: string) =>
  Effect.gen(function* () {
    const db = yield* DbClient
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

export const findAll = () =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () =>
        db.query.users.findMany({
          orderBy: (users, { desc }) => [desc(users.createdAt)],
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const update = (
  id: string,
  data: {
    name?: string
    username?: string
    bio?: string | null
    coverImage?: string | null
    profileImage?: string | null
  },
) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () => db.update(schema.users).set(data).where(eq(schema.users.id, id)).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
