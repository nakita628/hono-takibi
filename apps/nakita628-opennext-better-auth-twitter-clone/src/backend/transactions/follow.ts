import { Effect } from 'effect'

import { ConflictError, ContractViolationError, NotFoundError } from '@/backend/domain'
import { MessageResponseSchema } from '@/backend/routes'
import * as FollowService from '@/backend/services/follow'
import * as NotificationService from '@/backend/services/notification'
import * as UserService from '@/backend/services/user'

/**
 * Follow a user + send notification
 *
 * --- Flow ---
 * 1. Self-follow → ConflictError
 * 2. UserService.findById(targetUserId) → verify exists (null → NotFoundError)
 * 3. FollowService.create(userId, targetUserId)
 *    ||| INSERT INTO follows (followerId, followingId, createdAt) VALUES (:me, :target, ...)
 * 4. NotificationService.createAndNotify("Someone followed you!", targetUserId)
 *    ||| INSERT INTO notifications + UPDATE user_profile SET hasNotification = true
 * 5. MessageResponseSchema.safeParse({ message: "Success" })
 */
export function create(userId: string, targetUserId: string) {
  return Effect.gen(function* () {
    if (userId === targetUserId) {
      return yield* new ConflictError({ message: 'Cannot follow yourself' })
    }

    const targetUser = yield* UserService.findById(targetUserId)
    if (targetUser == null) {
      return yield* new NotFoundError({ message: 'User not found' })
    }

    const existing = yield* FollowService.findByUsers(userId, targetUserId)
    if (existing) {
      return yield* new ConflictError({ message: 'Already following' })
    }

    yield* FollowService.create(userId, targetUserId)
    yield* NotificationService.createAndNotify('Someone followed you!', targetUserId)

    const valid = MessageResponseSchema.safeParse({ message: 'Success' })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid response data' })
    }
    return valid.data
  })
}

/**
 * Unfollow a user
 *
 * --- Flow ---
 * 1. FollowService.remove(userId, targetUserId)
 *    ||| DELETE FROM follows WHERE followerId = :me AND followingId = :target
 * 2. MessageResponseSchema.safeParse({ message: "Success" })
 */
export function remove(userId: string, targetUserId: string) {
  return Effect.gen(function* () {
    yield* FollowService.remove(userId, targetUserId)

    const valid = MessageResponseSchema.safeParse({ message: 'Success' })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid response data' })
    }
    return valid.data
  })
}
