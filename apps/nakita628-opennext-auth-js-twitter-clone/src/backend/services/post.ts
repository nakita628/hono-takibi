import { count, eq, inArray } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

/** Insert a new post row and return the created record. */
export const create = (args: { body: string; userId: string }) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.posts).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

/** Find a post by its ID (no relations). */
export const findById = (id: string) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.posts.findFirst({
          where: eq(schema.posts.id, id),
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

/** Find a post by ID with user, comments (+ their users), and likes. */
export const findByIdWithRelations = (id: string) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.posts.findFirst({
          where: eq(schema.posts.id, id),
          with: {
            user: {
              with: { userProfile: true },
            },
            comments: {
              with: {
                user: {
                  with: { userProfile: true },
                },
              },
              orderBy: (comments, { desc }) => [desc(comments.createdAt)],
            },
            likes: true,
          },
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

/** Find a post by ID with its likes relation. */
export const findByIdWithLikes = (id: string) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.posts.findFirst({
          where: eq(schema.posts.id, id),
          with: { likes: true },
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

/** Fetch all posts (optionally filtered by userId) with user, comments, and likes. */
export const findAllWithRelations = (userId?: string) =>
  Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () =>
        db.query.posts.findMany({
          where: userId ? eq(schema.posts.userId, userId) : undefined,
          with: {
            user: {
              with: { userProfile: true },
            },
            comments: true,
            likes: true,
          },
          orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        }),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })

/**
 * Paginated post query with aggregated comment/like counts.
 *
 * Runs two parallel queries: one for the page of posts (with user)
 * and one for the total count, then batch-fetches comment and like
 * counts for the returned post IDs.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[Build where clause] --> B[Parallel: findMany + count]
 *   B --> C{posts empty?}
 *   C -- yes --> D[Return empty]
 *   C -- no --> E[Batch: comment + like counts]
 *   E --> F[Return posts + counts]
 * ```
 */
export const findAllPaginated = (args: { userId?: string; limit: number; offset: number }) =>
  Effect.gen(function* () {
    const db = yield* DB
    const whereClause = args.userId ? eq(schema.posts.userId, args.userId) : undefined

    const [posts, [{ total }]] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db.query.posts.findMany({
            where: whereClause,
            with: {
              user: {
                with: { userProfile: true },
              },
            },
            orderBy: (posts, { desc }) => [desc(posts.createdAt)],
            limit: args.limit,
            offset: args.offset,
          }),
          db.select({ total: count() }).from(schema.posts).where(whereClause),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    if (posts.length === 0) {
      return { posts, total, commentCounts: {}, likeCounts: {} }
    }

    const postIds = posts.map((post) => post.id)

    const [commentRows, likeRows] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db
            .select({ postId: schema.comments.postId, count: count() })
            .from(schema.comments)
            .where(inArray(schema.comments.postId, postIds))
            .groupBy(schema.comments.postId),
          db
            .select({ postId: schema.likes.postId, count: count() })
            .from(schema.likes)
            .where(inArray(schema.likes.postId, postIds))
            .groupBy(schema.likes.postId),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    const commentCounts: Record<string, number> = {}
    for (const row of commentRows) {
      commentCounts[row.postId] = row.count
    }

    const likeCounts: Record<string, number> = {}
    for (const row of likeRows) {
      likeCounts[row.postId] = row.count
    }

    return { posts, total, commentCounts, likeCounts }
  })
