import { Effect } from 'effect'
import { ConflictError, ContractViolationError, NotFoundError } from '@/backend/domain'
import * as PostDomain from '@/backend/domain/post'
import { PostWithLikesSchema } from '@/backend/routes'
import * as LikeService from '@/backend/services/like'
import * as NotificationService from '@/backend/services/notification'
import * as PostService from '@/backend/services/post'

/**
 * Like a post (with duplicate check) and notify the post owner.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[findPostWithLikes] --> B{post?}
 *   B -- no --> C[fail NotFound]
 *   B -- yes --> D{already liked?}
 *   D -- yes --> E[fail Validation]
 *   D -- no --> F[createLike]
 *   F --> G[notify owner]
 *   G --> H[refetch post]
 *   H --> I[validate + return]
 * ```
 */
export function create(userId: string, args: { postId: string }) {
  return Effect.gen(function* () {
    const post = yield* PostService.findByIdWithLikes(args.postId)
    if (!post) {
      return yield* Effect.fail(new NotFoundError({ message: 'Post not found' }))
    }

    if (post.likes.some((like) => like.userId === userId)) {
      return yield* Effect.fail(new ConflictError({ message: 'Already liked' }))
    }

    yield* LikeService.create({ userId, postId: args.postId })

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

    const data = PostDomain.makeFormatPostWithLikes(updated)
    const valid = PostWithLikesSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ContractViolationError({ message: 'Invalid post data' }))
    }
    return valid.data
  })
}

/**
 * Unlike a post and return the updated post with likes.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[removeLike] --> B[refetch post]
 *   B --> C[validate + return]
 * ```
 */
export function remove(userId: string, args: { postId: string }) {
  return Effect.gen(function* () {
    yield* LikeService.remove({ userId, postId: args.postId })

    const updated = yield* PostService.findByIdWithLikes(args.postId)
    if (!updated) {
      return yield* Effect.fail(new NotFoundError({ message: 'Post not found' }))
    }

    const data = PostDomain.makeFormatPostWithLikes(updated)
    const valid = PostWithLikesSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ContractViolationError({ message: 'Invalid post data' }))
    }
    return valid.data
  })
}
