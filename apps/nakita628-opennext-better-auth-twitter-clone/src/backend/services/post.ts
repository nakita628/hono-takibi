import { and, count, desc, eq, inArray } from 'drizzle-orm'
import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { schema } from '@/db'
import { DB } from '@/infra'

/**
 * Insert a new post and return the created record.
 *
 * ||| SQL |||
 *   INSERT INTO posts (id, body, userId, createdAt, updatedAt)
 *     VALUES (uuid(), :body, :userId, now(), now())
 *     RETURNING *
 *
 * ||| Used By |||
 *   POST /posts — create a tweet
 */
export function create(body: string, userId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.posts).values({ body, userId }).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

/**
 * Find a single post by ID (no joins, no relations).
 *
 * ||| SQL |||
 *   SELECT * FROM posts WHERE id = :id
 *
 * ||| Used By |||
 *   POST /comments — to verify the post exists before commenting
 *   POST /like     — to get the post owner for notification
 */
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
 * Find a post by ID with all related data: author, comments, and likes.
 * Executes 3 SQL queries to assemble the full picture.
 *
 * ||| Query 1 — Post + Author |||
 *
 *   +--------+ INNER JOIN +------+ LEFT JOIN +--------------+
 *   | posts  |----------->| user |---------->| user_profile |
 *   +--------+            +------+           +--------------+
 *   WHERE posts.id = :id
 *
 * ||| Query 2 — Comments + Commenters (parallel with Query 3) |||
 *
 *   +----------+ INNER JOIN +------+ LEFT JOIN +--------------+
 *   | comments |----------->| user |---------->| user_profile |
 *   +----------+            +------+           +--------------+
 *   WHERE comments.postId = :id ORDER BY createdAt DESC
 *
 * ||| Query 3 — Likes |||
 *
 *   +-------+
 *   | likes | WHERE postId = :id
 *   +-------+
 *
 * ||| Returns |||
 *   { ...post, user: { ...user, userProfile }, comments[], likes[] }
 *   or undefined if post not found
 *
 * ||| Used By |||
 *   GET /posts/:postId — post detail page
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

/**
 * Find a post by ID with its likes (but no comments or author).
 *
 * ||| SQL (2 queries) |||
 *   Query 1: SELECT * FROM posts WHERE id = :id
 *   Query 2: SELECT * FROM likes WHERE postId = :id
 *
 * ||| Returns |||
 *   { ...post, likes[] } or undefined if post not found
 *
 * ||| Used By |||
 *   DELETE /like — to get updated likes after removing one
 */
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

/**
 * Fetch all posts with author, comments, and likes.
 * Optionally filtered by userId (to show only one user's posts).
 *
 * ||| SQL (2 queries) |||
 *   Query 1: posts + author + profile
 *     SELECT * FROM posts
 *       INNER JOIN user ON posts.userId = user.id
 *       LEFT JOIN user_profile ON user.id = user_profile.userId
 *       [WHERE posts.userId = :userId]
 *       ORDER BY posts.createdAt DESC
 *
 *   Query 2: batch-fetch comments + likes for all post IDs
 *     SELECT * FROM comments WHERE postId IN (:ids)
 *     SELECT * FROM likes    WHERE postId IN (:ids)
 *
 * ||| Returns |||
 *   Array of { ...post, user, comments[], likes[] }
 */
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
 * Batch-count comments and likes for multiple posts at once.
 * Much more efficient than counting per-post (N+1 → 2 queries).
 *
 * ||| SQL (2 queries in parallel) |||
 *   SELECT postId, COUNT(*) FROM comments WHERE postId IN (:ids) GROUP BY postId
 *   SELECT postId, COUNT(*) FROM likes    WHERE postId IN (:ids) GROUP BY postId
 *
 * ||| Returns |||
 *   { commentCounts: { [postId]: number }, likeCounts: { [postId]: number } }
 *
 * ||| Used By |||
 *   GET /posts — paginated feed (shows count badges, not full arrays)
 */
export function getCountsForPostIds(postIds: string[]) {
  if (postIds.length === 0) {
    return Effect.succeed({
      commentCounts: {} as Record<string, number>,
      likeCounts: {} as Record<string, number>,
    })
  }

  return Effect.gen(function* () {
    const db = yield* DB
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
    return {
      commentCounts: Object.fromEntries(commentRows.map((r) => [r.postId, r.count])),
      likeCounts: Object.fromEntries(likeRows.map((r) => [r.postId, r.count])),
    }
  })
}

/**
 * Batch-check which posts a user has liked.
 * Returns a Set of postIds that the user has liked.
 *
 * ||| SQL |||
 *   SELECT postId FROM likes WHERE userId = :userId AND postId IN (:ids)
 *
 * ||| Returns |||
 *   Set<string> of liked postIds
 *
 * ||| Used By |||
 *   GET /posts — to populate hasLiked in PostSummary
 */
export function getLikedPostIds(currentUserId: string, postIds: string[]) {
  if (postIds.length === 0) {
    return Effect.succeed(new Set<string>())
  }

  return Effect.gen(function* () {
    const db = yield* DB
    const rows = yield* Effect.tryPromise({
      try: () =>
        db
          .select({ postId: schema.likes.postId })
          .from(schema.likes)
          .where(
            and(eq(schema.likes.userId, currentUserId), inArray(schema.likes.postId, postIds)),
          ),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
    return new Set(rows.map((r) => r.postId))
  })
}

/**
 * Paginated post query with author info and aggregated counts.
 * This is the main query for the post feed.
 *
 * ||| Step 1 — Fetch posts + authors (parallel with total count) |||
 *
 *   +--------+ INNER JOIN +------+ LEFT JOIN +--------------+
 *   | posts  |----------->| user |---------->| user_profile |
 *   +--------+            +------+           +--------------+
 *   [WHERE posts.userId = :userId] ORDER BY createdAt DESC
 *   LIMIT :limit OFFSET :offset
 *
 *   + SELECT COUNT(*) FROM posts [WHERE userId = :userId]
 *
 * ||| Step 2 — Batch-count comments and likes |||
 *   (only runs if Step 1 returned any posts)
 *
 *   getCountsForPostIds(postIds) → { commentCounts, likeCounts }
 *
 * ||| Returns |||
 *   { posts: [{ ...post, user }], total, commentCounts, likeCounts }
 *
 * ||| Used By |||
 *   GET /posts — paginated post feed
 */
export function findAllPaginated(limit: number, offset: number, userId?: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    const whereClause = userId ? eq(schema.posts.userId, userId) : undefined

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
            .limit(limit)
            .offset(offset)
            .all(),
          db.select({ total: count() }).from(schema.posts).where(whereClause),
        ]),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })

    const posts = postRows.map((row) => ({
      ...row.posts,
      user: { ...row.user, userProfile: row.user_profile },
    }))

    const postIds = posts.map((post) => post.id)
    const { commentCounts, likeCounts } = yield* getCountsForPostIds(postIds)

    return { posts, total, commentCounts, likeCounts }
  })
}
