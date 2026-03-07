import { Effect } from 'effect'
import { ConflictError, ContractViolationError, makeFormatPostWithLikes, NotFoundError } from '@/backend/domain'
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
 *   D -- yes --> E[fail Conflict]
 *   D -- no --> F[createLike]
 *   F --> G[notify owner]
 *   G --> H[safeParse + return]
 * ```
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

    if (post.userId) {
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
 * Unlike a post and return the updated post with likes.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[removeLike] --> B[refetch post]
 *   B --> C[safeParse + return]
 * ```
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
