import { Effect } from 'effect'
import { UnauthorizedError, ValidationError } from '@/backend/domain'
import { CommentSchema } from '@/backend/routes'
import * as CommentService from '@/backend/services/comment'
import * as NotificationService from '@/backend/services/notification'
import * as PostService from '@/backend/services/post'
import * as UserService from '@/backend/services/user'

/**
 * Create a comment and notify the post owner.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[findByEmail] --> B{user?}
 *   B -- no --> C[fail Unauthorized]
 *   B -- yes --> D[createComment]
 *   D --> E[findPost]
 *   E --> F[createNotification]
 *   F --> G[updateHasNotification]
 *   G --> H[validate + return]
 * ```
 */
export const create = (email: string, args: { body: string; postId: string }) =>
  Effect.gen(function* () {
    const user = yield* UserService.findByEmail(email)
    if (!user) {
      return yield* Effect.fail(new UnauthorizedError({ message: 'Not signed in' }))
    }

    const comment = yield* CommentService.create({
      body: args.body,
      userId: user.id,
      postId: args.postId,
    })

    const post = yield* PostService.findById(args.postId)
    if (post?.userId) {
      yield* NotificationService.create({
        body: 'Someone replied to your tweet',
        userId: post.userId,
      })
      yield* NotificationService.updateUserHasNotification(post.userId, true)
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
      return yield* Effect.fail(new ValidationError({ message: 'Invalid comment data' }))
    }
    return valid.data
  })
