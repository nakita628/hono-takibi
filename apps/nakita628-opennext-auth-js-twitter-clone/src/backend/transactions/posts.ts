import { Effect } from 'effect'
import * as UserDomain from '@/backend/domain'
import { NotFoundError, UnauthorizedError, ValidationError } from '@/backend/domain'
import { PaginatedPostsSchema, PostDetailSchema, PostSchema } from '@/backend/routes'
import * as PostService from '@/backend/services/post'
import * as UserService from '@/backend/services/user'

export function create(email: string, args: { body: string }) {
  return Effect.gen(function* () {
    const user = yield* UserService.findByEmail(email)
    if (!user) {
      return yield* Effect.fail(new UnauthorizedError({ message: 'Unauthorized' }))
    }

    const post = yield* PostService.create({ body: args.body, userId: user.id })

    const data = {
      id: post.id,
      body: post.body,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      userId: post.userId,
    }

    const valid = PostSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid post data' }))
    }
    return valid.data
  })
}

export function getAll(args: { userId?: string; page: number; limit: number }) {
  return Effect.gen(function* () {
    const offset = (args.page - 1) * args.limit
    const result = yield* PostService.findAllPaginated({
      ...(args.userId !== undefined ? { userId: args.userId } : {}),
      limit: args.limit,
      offset,
    })

    const data = {
      data: result.posts.map((post) => ({
        id: post.id,
        body: post.body,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        userId: post.userId,
        user: UserDomain.makeFormatUser(post.user),
        commentCount: result.commentCounts[post.id] ?? 0,
        likeCount: result.likeCounts[post.id] ?? 0,
      })),
      meta: {
        page: args.page,
        limit: args.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / args.limit),
      },
    }

    const valid = PaginatedPostsSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid posts data' }))
    }
    return valid.data
  })
}

export function getById(postId: string) {
  return Effect.gen(function* () {
    const post = yield* PostService.findByIdWithRelations(postId)
    if (!post) {
      return yield* Effect.fail(new NotFoundError({ message: 'Post not found' }))
    }

    const data = {
      id: post.id,
      body: post.body,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      userId: post.userId,
      user: UserDomain.makeFormatUser(post.user),
      comments: post.comments.map((comment) => ({
        id: comment.id,
        body: comment.body,
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString(),
        userId: comment.userId,
        postId: comment.postId,
        user: UserDomain.makeFormatUser(comment.user),
      })),
      likes: post.likes.map((l) => ({ userId: l.userId })),
      _count: { likes: post.likes.length },
    }

    const valid = PostDetailSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid post data' }))
    }
    return valid.data
  })
}
