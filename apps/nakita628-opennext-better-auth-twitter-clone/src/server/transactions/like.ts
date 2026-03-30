import { Effect } from 'effect'

import { ConflictError, ContractViolationError, NotFoundError } from '@/errors'
import { makeFormatPostWithLikes } from '@/server/domain'
import { PostWithLikesSchema } from '@/server/routes'
import * as LikeService from '@/server/services/like'
import * as NotificationService from '@/server/services/notification'
import * as PostService from '@/server/services/post'

export function create(userId: string, postId: string) {
  return Effect.gen(function* () {
    const post = yield* PostService.findByIdWithLikes(postId)
    if (post == null) {
      return yield* new NotFoundError({ message: 'Post not found' })
    }

    if (post.likes.some((like) => like.userId === userId)) {
      return yield* new ConflictError({ message: 'Already liked' })
    }

    yield* LikeService.create(userId, postId)

    if (post.userId && post.userId !== userId) {
      yield* NotificationService.createAndNotify('Someone liked your tweet', post.userId)
    }

    const updatedLikes = [...post.likes, { userId, postId, createdAt: new Date() }]

    const valid = PostWithLikesSchema.safeParse(
      makeFormatPostWithLikes({ ...post, likes: updatedLikes }),
    )
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid post data' })
    }
    return valid.data
  })
}

export function remove(userId: string, postId: string) {
  return Effect.gen(function* () {
    yield* LikeService.remove(userId, postId)

    const updated = yield* PostService.findByIdWithLikes(postId)
    if (updated == null) {
      return yield* new NotFoundError({ message: 'Post not found' })
    }

    const valid = PostWithLikesSchema.safeParse(makeFormatPostWithLikes(updated))
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid post data' })
    }
    return valid.data
  })
}
