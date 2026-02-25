import { Effect } from 'effect'
import { ContractViolationError } from '@/backend/domain'
import { CommentSchema } from '@/backend/routes'
import * as CommentService from '@/backend/services/comment'
import * as NotificationService from '@/backend/services/notification'
import * as PostService from '@/backend/services/post'

/**
 * Create a comment and notify the post owner.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[createComment] --> B[findPost]
 *   B --> C[createNotification]
 *   C --> D[updateHasNotification]
 *   D --> E[validate + return]
 * ```
 */
export function create(userId: string, args: { body: string; postId: string }) {
  return Effect.gen(function* () {
    const comment = yield* CommentService.create({
      body: args.body,
      userId,
      postId: args.postId,
    })

    const post = yield* PostService.findById(args.postId)
    if (post?.userId) {
      yield* NotificationService.createAndNotify({
        body: 'Someone replied to your tweet',
        userId: post.userId,
      })
    }

    const data = {
      id: comment.id,
      body: comment.body,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
      userId: comment.userId,
      postId: comment.postId,
    }

    const valid = CommentSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ContractViolationError({ message: 'Invalid comment data' }))
    }
    return valid.data
  })
}
