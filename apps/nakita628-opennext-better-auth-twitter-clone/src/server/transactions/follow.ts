import { Effect } from 'effect'

import { ConflictError, ContractViolationError, NotFoundError } from '@/errors'
import { MessageResponseSchema } from '@/server/routes'
import * as FollowService from '@/server/services/follow'
import * as NotificationService from '@/server/services/notification'
import * as UserService from '@/server/services/user'

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
