import { count, desc, eq, inArray } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

/** Insert a new post row and return the created record. */
export function create(args: { body: string; userId: string }) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.posts).values(args).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

/** Find a post by its ID (no relations). */
export function findById(id: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.select().from(schema.posts).where(eq(schema.posts.id, id)).get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

/**
 * Find a post by ID with user, comments (+ their users), and likes.
 *
 * Executes three SQL queries:
 * 1. Post + author (user + profile)
 * 2. Comments + each commenter (user + profile)
 * 3. Likes
 */
export function findByIdWithRelations(id: string) {
  return Effect.gen(function* () {
    const db = yield* DB

    const postRow = yield* Effect.tryPromise({
      try: () =>
        db
          .select()
          .from(schema.posts)
          .innerJoin(schema.user, eq(schema.posts.userId, schema.user.id))
          .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
          .where(eq(schema.posts.id, id))
          .get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (!postRow) return undefined

    const [commentRows, likes] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db
            .select()
            .from(schema.comments)
            .innerJoin(schema.user, eq(schema.comments.userId, schema.user.id))
            .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
            .where(eq(schema.comments.postId, id))
            .orderBy(desc(schema.comments.createdAt))
            .all(),
          db.select().from(schema.likes).where(eq(schema.likes.postId, id)).all(),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    return {
      ...postRow.posts,
      user: { ...postRow.user, userProfile: postRow.user_profile },
      comments: commentRows.map((row) => ({
        ...row.comments,
        user: { ...row.user, userProfile: row.user_profile },
      })),
      likes,
    }
  })
}

/** Find a post by ID with its likes relation. */
export function findByIdWithLikes(id: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    const post = yield* Effect.tryPromise({
      try: () => db.select().from(schema.posts).where(eq(schema.posts.id, id)).get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (!post) return undefined

    const likes = yield* Effect.tryPromise({
      try: () => db.select().from(schema.likes).where(eq(schema.likes.postId, id)).all(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    return { ...post, likes }
  })
}

/** Fetch all posts (optionally filtered by userId) with user, comments, and likes. */
export function findAllWithRelations(userId?: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    const whereClause = userId ? eq(schema.posts.userId, userId) : undefined

    const postRows = yield* Effect.tryPromise({
      try: () =>
        db
          .select()
          .from(schema.posts)
          .innerJoin(schema.user, eq(schema.posts.userId, schema.user.id))
          .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
          .where(whereClause)
          .orderBy(desc(schema.posts.createdAt))
          .all(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    if (postRows.length === 0) return []

    const postIds = postRows.map((row) => row.posts.id)
    const [commentRows, likeRows] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db.select().from(schema.comments).where(inArray(schema.comments.postId, postIds)).all(),
          db.select().from(schema.likes).where(inArray(schema.likes.postId, postIds)).all(),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    return postRows.map((row) => ({
      ...row.posts,
      user: { ...row.user, userProfile: row.user_profile },
      comments: commentRows.filter((c) => c.postId === row.posts.id),
      likes: likeRows.filter((l) => l.postId === row.posts.id),
    }))
  })
}

/**
 * Paginated post query with aggregated comment/like counts.
 *
 * Runs parallel queries: posts with user/profile, total count,
 * then batch-fetches comment and like counts for returned post IDs.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[Build where clause] --> B[Parallel: select+join + count]
 *   B --> C{posts empty?}
 *   C -- yes --> D[Return empty]
 *   C -- no --> E[Batch: comment + like counts]
 *   E --> F[Return posts + counts]
 * ```
 */
export function findAllPaginated(args: { userId?: string; limit: number; offset: number }) {
  return Effect.gen(function* () {
    const db = yield* DB
    const whereClause = args.userId ? eq(schema.posts.userId, args.userId) : undefined

    const [postRows, [{ total }]] = yield* Effect.tryPromise({
      try: () =>
        Promise.all([
          db
            .select()
            .from(schema.posts)
            .innerJoin(schema.user, eq(schema.posts.userId, schema.user.id))
            .leftJoin(schema.userProfile, eq(schema.user.id, schema.userProfile.userId))
            .where(whereClause)
            .orderBy(desc(schema.posts.createdAt))
            .limit(args.limit)
            .offset(args.offset)
            .all(),
          db.select({ total: count() }).from(schema.posts).where(whereClause),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    const posts = postRows.map((row) => ({
      ...row.posts,
      user: { ...row.user, userProfile: row.user_profile },
    }))

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
}
