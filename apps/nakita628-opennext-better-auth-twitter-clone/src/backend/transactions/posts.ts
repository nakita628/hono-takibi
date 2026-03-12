import { Effect } from 'effect'
import { ContractViolationError, makeFormatPublicUser, NotFoundError } from '@/backend/domain'
import { PaginatedPostsSchema, PostDetailSchema, PostSchema } from '@/backend/routes'
import * as PostService from '@/backend/services/post'

/**
 * Create a new post (tweet).
 *
 * ||| Flow |||
 *   1. PostService.create(body, userId) → INSERT INTO posts
 *   2. Validate via PostSchema.safeParse()
 *
 * ||| Returns |||
 *   { id, body, createdAt, updatedAt, userId }
 */
export function create(userId: string, body: string) {
  return Effect.gen(function* () {
    const post = yield* PostService.create(body, userId)
    const valid = PostSchema.safeParse({
      id: post.id,
      body: post.body,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      userId: post.userId,
    })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid post data' })
    }
    return valid.data
  })
}

/**
 * Get paginated post feed with author info and comment/like counts.
 *
 * ||| Flow |||
 *   1. Calculate offset from page number
 *   2. PostService.findAllPaginated(limit, offset, userId?)
 *      → posts with user/profile JOINs + total count
 *      → batch comment/like counts for all returned post IDs
 *   3. Format each post with makeFormatPublicUser() (strips email from author)
 *   4. Validate via PaginatedPostsSchema.safeParse()
 *
 * ||| Returns |||
 *   { data: PostSummary[], meta: { page, limit, total, totalPages } }
 */
export function getAll(page: number, limit: number, userId?: string, currentUserId?: string) {
  return Effect.gen(function* () {
    const offset = (page - 1) * limit
    const result = yield* PostService.findAllPaginated(limit, offset, userId)

    const postIds = result.posts.map((post) => post.id)
    const likedPostIds = currentUserId
      ? yield* PostService.getLikedPostIds(currentUserId, postIds)
      : new Set<string>()

    const valid = PaginatedPostsSchema.safeParse({
      data: result.posts.map((post) => ({
        id: post.id,
        body: post.body,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        userId: post.userId,
        user: makeFormatPublicUser(post.user),
        commentCount: result.commentCounts[post.id] ?? 0,
        likeCount: result.likeCounts[post.id] ?? 0,
        hasLiked: likedPostIds.has(post.id),
      })),
      meta: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid posts data' })
    }
    return valid.data
  })
}

/**
 * Get a single post with full details (author, comments, likes).
 *
 * ||| Flow |||
 *   1. PostService.findByIdWithRelations(postId)
 *      → post + author + comments + likes (3 SQL queries)
 *   2. If not found → NotFoundError
 *   3. Format author and commenter users with makeFormatPublicUser()
 *   4. Validate via PostDetailSchema.safeParse()
 *
 * ||| Returns |||
 *   { ...post, user, comments[{ ...comment, user }], likes[{ userId }], _count }
 */
export function getById(postId: string) {
  return Effect.gen(function* () {
    const post = yield* PostService.findByIdWithRelations(postId)
    if (!post) {
      return yield* new NotFoundError({ message: 'Post not found' })
    }
    const valid = PostDetailSchema.safeParse({
      id: post.id,
      body: post.body,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      userId: post.userId,
      user: makeFormatPublicUser(post.user),
      comments: post.comments.map((comment) => ({
        id: comment.id,
        body: comment.body,
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString(),
        userId: comment.userId,
        postId: comment.postId,
        user: makeFormatPublicUser(comment.user),
      })),
      likes: post.likes.map((like) => ({ userId: like.userId })),
      _count: { likes: post.likes.length },
    })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid post data' })
    }
    return valid.data
  })
}
