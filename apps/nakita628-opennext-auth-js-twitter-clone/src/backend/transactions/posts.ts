import { z } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { NotFoundError, UnauthorizedError, ValidationError } from '@/backend/domain'
import * as UserDomain from '@/backend/domain'
import { PostDetailSchema, PostSchema, PostWithDetailsSchema } from '@/backend/routes'
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

export function getAll(userId?: string) {
  return Effect.gen(function* () {
    const posts = yield* PostService.findAllWithRelations(userId)

    const data = posts.map((post) => ({
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
      })),
      likes: post.likes.map((like) => ({
        userId: like.userId,
        postId: like.postId,
        createdAt: like.createdAt.toISOString(),
      })),
    }))

    const valid = z.array(PostWithDetailsSchema).safeParse(data)
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
