import { z } from '@hono/zod-openapi'
import { Effect } from 'effect'

import { ContractViolationError } from '@/errors'
import { MessageResponseSchema, NotificationSchema } from '@/server/routes'
import * as NotificationService from '@/server/services/notification'

export function getByUserId(userId: string) {
  return Effect.gen(function* () {
    const notifications = yield* NotificationService.findByUserId(userId)
    const valid = z.array(NotificationSchema).safeParse(
      notifications.map((notification) => ({
        id: notification.id,
        body: notification.body,
        userId: notification.userId,
        createdAt: notification.createdAt.toISOString(),
      })),
    )
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid notifications data' })
    }
    return valid.data
  })
}

export function markAsRead(userId: string) {
  return Effect.gen(function* () {
    yield* NotificationService.updateUserHasNotification(userId, false)
    const valid = MessageResponseSchema.safeParse({ message: 'Notifications updated' })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid response data' })
    }
    return valid.data
  })
}
