import { Effect } from 'effect'
import { ConflictError, ContractViolationError, makeFormatPostWithLikes, NotFoundError } from '@/backend/domain'
import { PostWithLikesSchema } from '@/backend/routes'
import * as LikeService from '@/backend/services/like'
import * as NotificationService from '@/backend/services/notification'
import * as PostService from '@/backend/services/post'

/**
 * Like a post (with duplicate check + notification)
 *
 * --- Flow ---
 * 1. PostService.findByIdWithLikes(postId)
 *    ||| SELECT * FROM posts WHERE id = :postId
 *    ||| SELECT * FROM likes WHERE postId = :postId
 *    → null → NotFoundError
 * 2. likes.some(l => l.userId === userId) → ConflictError "Already liked"
 * 3. LikeService.create(userId, postId)
 *    ||| INSERT INTO likes (userId, postId, createdAt) VALUES (:me, :postId, ...)
 * 4. NotificationService.createAndNotify("Someone liked your tweet", post.userId)
 *    ||| INSERT INTO notifications + UPDATE user_profile SET hasNotification = true
 * 5. Append new like to existing likes and validate via PostWithLikesSchema.safeParse()
 */
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

/**
 * Unlike a post
 *
 * --- Flow ---
 * 1. LikeService.remove(userId, postId)
 *    ||| DELETE FROM likes WHERE userId = :me AND postId = :postId
 * 2. PostService.findByIdWithLikes(postId) → re-fetch updated state
 *    ||| SELECT * FROM posts WHERE id = :postId
 *    ||| SELECT * FROM likes WHERE postId = :postId
 *    → null → NotFoundError
 * 3. Validate via PostWithLikesSchema.safeParse(updated)
 */
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
