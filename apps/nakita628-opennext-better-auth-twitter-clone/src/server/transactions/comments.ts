import { Effect } from 'effect'

import { ContractViolationError } from '@/errors'
import { CommentSchema } from '@/server/routes'
import * as CommentService from '@/server/services/comment'
import * as NotificationService from '@/server/services/notification'
import * as PostService from '@/server/services/post'

export function create(userId: string, body: string, postId: string) {
  return Effect.gen(function* () {
    const comment = yield* CommentService.create(body, userId, postId)

    const post = yield* PostService.findById(postId)
    if (post?.userId && post.userId !== userId) {
      yield* NotificationService.createAndNotify('Someone replied to your tweet', post.userId)
    }

    const valid = CommentSchema.safeParse({
      id: comment.id,
      body: comment.body,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
      userId: comment.userId,
      postId: comment.postId,
    })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid comment data' })
    }
    return valid.data
  })
}
