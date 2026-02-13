import { eq } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { DbClient } from '@/backend/types'
import * as schema from '@/db/schema'

export const create = (args: { body: string; userId: string }) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.posts).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findById = (id: string) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () =>
        db.query.posts.findFirst({
          where: eq(schema.posts.id, id),
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findByIdWithRelations = (id: string) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () =>
        db.query.posts.findFirst({
          where: eq(schema.posts.id, id),
          with: {
            user: true,
            comments: {
              with: { user: true },
              orderBy: (comments, { desc }) => [desc(comments.createdAt)],
            },
            likes: true,
          },
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findByIdWithLikes = (id: string) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () =>
        db.query.posts.findFirst({
          where: eq(schema.posts.id, id),
          with: { likes: true },
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

export const findAllWithRelations = (userId?: string) =>
  Effect.gen(function* () {
    const db = yield* DbClient
    return yield* Effect.tryPromise({
      try: () =>
        db.query.posts.findMany({
          where: userId ? eq(schema.posts.userId, userId) : undefined,
          with: {
            user: true,
            comments: true,
            likes: true,
          },
          orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
