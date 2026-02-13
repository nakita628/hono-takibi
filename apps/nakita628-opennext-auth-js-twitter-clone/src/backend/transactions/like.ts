import { Effect } from 'effect'
import { NotFoundError, UnauthorizedError, ValidationError } from '@/backend/domain'
import { PostWithLikesSchema } from '@/backend/routes'
import * as LikeService from '@/backend/services/like'
import * as NotificationService from '@/backend/services/notification'
import * as PostService from '@/backend/services/post'
import * as UserService from '@/backend/services/user'

function formatPostWithLikes(post: {
  id: string
  body: string
  createdAt: Date
  updatedAt: Date
  userId: string
  likes: { userId: string; postId: string; createdAt: Date }[]
}) {
  return {
    id: post.id,
    body: post.body,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    userId: post.userId,
    likes: post.likes.map((l) => ({
      userId: l.userId,
      postId: l.postId,
      createdAt: l.createdAt.toISOString(),
    })),
  }
}

export const create = (email: string, args: { postId: string }) =>
  Effect.gen(function* () {
    const user = yield* UserService.findByEmail(email)
    if (!user) {
      return yield* Effect.fail(new UnauthorizedError({ message: 'Not signed in' }))
    }

    const post = yield* PostService.findByIdWithLikes(args.postId)
    if (!post) {
      return yield* Effect.fail(new NotFoundError({ message: 'Post not found' }))
    }

    if (post.likes.some((l) => l.userId === user.id)) {
      return yield* Effect.fail(new ValidationError({ message: 'Already liked' }))
    }

    yield* LikeService.create({ userId: user.id, postId: args.postId })

    if (post.userId) {
      yield* NotificationService.create({
        body: 'Someone liked your tweet',
        userId: post.userId,
      })
      yield* NotificationService.updateUserHasNotification(post.userId, true)
    }

    const updated = yield* PostService.findByIdWithLikes(args.postId)
    if (!updated) {
      return yield* Effect.fail(new NotFoundError({ message: 'Post not found' }))
    }

    const data = formatPostWithLikes(updated)
    const valid = PostWithLikesSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid post data' }))
    }
    return valid.data
  })

export const remove = (email: string, args: { postId: string }) =>
  Effect.gen(function* () {
    const user = yield* UserService.findByEmail(email)
    if (!user) {
      return yield* Effect.fail(new UnauthorizedError({ message: 'Not signed in' }))
    }

    yield* LikeService.remove({ userId: user.id, postId: args.postId })

    const updated = yield* PostService.findByIdWithLikes(args.postId)
    if (!updated) {
      return yield* Effect.fail(new NotFoundError({ message: 'Post not found' }))
    }

    const data = formatPostWithLikes(updated)
    const valid = PostWithLikesSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid post data' }))
    }
    return valid.data
  })
