import { z } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { ContractViolationError } from '@/backend/domain'
import { MessageResponseSchema, NotificationSchema } from '@/backend/routes'
import * as NotificationService from '@/backend/services/notification'

/**
 * Fetch all notifications for a user.
 *
 * ||| What It Does |||
 *   Retrieves the user's notification list, newest first.
 *
 * ||| Flow |||
 *   1. NotificationService.findByUserId(userId)
 *      → SELECT * FROM notifications WHERE userId = :userId ORDER BY createdAt DESC
 *   2. Convert each notification's createdAt to ISO string
 *   3. Validate via z.array(NotificationSchema).safeParse()
 *
 * ||| Returns |||
 *   Notification[] — array of { id, body, userId, createdAt }
 */
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

/**
 * Mark notifications as read.
 *
 * ||| What It Does |||
 *   Clears the "new notification" badge for this user by setting
 *   hasNotification = false on their profile.
 *
 * ||| Flow |||
 *   1. NotificationService.updateUserHasNotification(userId, false)
 *      → UPDATE user_profile SET hasNotification = false WHERE userId = :userId
 *   2. Validate response via MessageResponseSchema.safeParse()
 *
 * ||| Returns |||
 *   { message: "Notifications updated" }
 */
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
