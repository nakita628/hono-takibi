import { Effect } from 'effect'
import { NotFoundError, UnauthorizedError, ValidationError } from '@/backend/domain'
import { MessageResponseSchema } from '@/backend/routes'
import * as FollowService from '@/backend/services/follow'
import * as NotificationService from '@/backend/services/notification'
import * as UserService from '@/backend/services/user'

export const create = (email: string, args: { userId: string }) =>
  Effect.gen(function* () {
    const currentUser = yield* UserService.findByEmail(email)
    if (!currentUser) {
      return yield* Effect.fail(new UnauthorizedError({ message: 'Not signed in' }))
    }

    const targetUser = yield* UserService.findById(args.userId)
    if (!targetUser) {
      return yield* Effect.fail(new NotFoundError({ message: 'User not found' }))
    }

    yield* FollowService.create({
      followerId: currentUser.id,
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

export const remove = (email: string, args: { userId: string }) =>
  Effect.gen(function* () {
    const currentUser = yield* UserService.findByEmail(email)
    if (!currentUser) {
      return yield* Effect.fail(new UnauthorizedError({ message: 'Not signed in' }))
    }

    yield* FollowService.remove({
      followerId: currentUser.id,
      followingId: args.userId,
    })

    const data = { message: 'Success' }
    const valid = MessageResponseSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid response data' }))
    }
    return valid.data
  })
