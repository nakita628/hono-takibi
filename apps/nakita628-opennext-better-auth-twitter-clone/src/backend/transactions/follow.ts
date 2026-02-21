import { Effect } from 'effect'
import { NotFoundError, ValidationError } from '@/backend/domain'
import { MessageResponseSchema } from '@/backend/routes'
import * as FollowService from '@/backend/services/follow'
import * as NotificationService from '@/backend/services/notification'
import * as UserService from '@/backend/services/user'

/**
 * Follow a user and send a notification to the target.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[findTargetUser] --> B{exists?}
 *   B -- no --> C[fail NotFound]
 *   B -- yes --> D[createFollow]
 *   D --> E[createNotification]
 *   E --> F[validate + return]
 * ```
 */
export function create(userId: string, args: { userId: string }) {
  return Effect.gen(function* () {
    const targetUser = yield* UserService.findById(args.userId)
    if (!targetUser) {
      return yield* Effect.fail(new NotFoundError({ message: 'User not found' }))
    }

    yield* FollowService.create({
      followerId: userId,
      followingId: args.userId,
    })

    yield* NotificationService.create({
      body: 'Someone followed you!',
      userId: args.userId,
    })
    yield* NotificationService.updateUserHasNotification(args.userId, true)

    const data = { message: 'Success' }
    const valid = MessageResponseSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid response data' }))
    }
    return valid.data
  })
}

/**
 * Unfollow a user.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[removeFollow] --> B[validate + return]
 * ```
 */
export function remove(userId: string, args: { userId: string }) {
  return Effect.gen(function* () {
    yield* FollowService.remove({
      followerId: userId,
      followingId: args.userId,
    })

    const data = { message: 'Success' }
    const valid = MessageResponseSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid response data' }))
    }
    return valid.data
  })
}
