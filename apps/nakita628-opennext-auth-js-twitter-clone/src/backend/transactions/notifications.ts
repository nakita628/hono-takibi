import { Effect } from 'effect'
import { ValidationError } from '@/backend/domain'
import { MessageResponseSchema, NotificationSchema } from '@/backend/routes'
import * as NotificationService from '@/backend/services/notification'
import { z } from '@hono/zod-openapi'

export const getByUserId = (userId: string) =>
  Effect.gen(function* () {
    const notifications = yield* NotificationService.findByUserId(userId)

    const data = notifications.map((n) => ({
      id: n.id,
      body: n.body,
      userId: n.userId,
      createdAt: n.createdAt.toISOString(),
    }))

    const valid = z.array(NotificationSchema).safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid notifications data' }))
    }
    return valid.data
  })

export const markAsRead = (userId: string) =>
  Effect.gen(function* () {
    yield* NotificationService.updateUserHasNotification(userId, false)

    const data = { message: 'Notifications updated' }
    const valid = MessageResponseSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid response data' }))
    }
    return valid.data
  })
