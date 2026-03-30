import { and, count, desc, eq, inArray } from 'drizzle-orm'
import { Effect } from 'effect'

import { schema } from '@/db'
import { DatabaseError } from '@/errors'
import { DB } from '@/infra'

export function create(body: string, userId: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.insert(schema.posts).values({ body, userId }).returning().get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

export function findById(id: string) {
  return Effect.gen(function* () {
    const db = yield* DB
    return yield* Effect.tryPromise({
      try: () => db.select().from(schema.posts).where(eq(schema.posts.id, id)).get(),
      catch: () => new DatabaseError({ message: 'Database error' }),
    })
  })
}

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
