import { Effect } from 'effect'
import { ContractViolationError, makeFormatPublicUser, NotFoundError } from '@/backend/domain'
import { PaginatedPostsSchema, PostDetailSchema, PostSchema } from '@/backend/routes'
import * as PostService from '@/backend/services/post'

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

export function getAll(page: number, limit: number, userId?: string) {
  return Effect.gen(function* () {
    const offset = (page - 1) * limit
    const result = yield* PostService.findAllPaginated(limit, offset, userId)
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
