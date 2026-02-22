import { z } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { ContractViolationError } from '@/backend/domain'
import { MessageResponseSchema, NotificationSchema } from '@/backend/routes'
import * as NotificationService from '@/backend/services/notification'

/**
 * Fetch all notifications for a user.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[findByUserId] --> B[format dates]
 *   B --> C[validate + return]
 * ```
 */
export function getByUserId(userId: string) {
  return Effect.gen(function* () {
    const notifications = yield* NotificationService.findByUserId(userId)

    const data = notifications.map((notification) => ({
      id: notification.id,
      body: notification.body,
      userId: notification.userId,
      createdAt: notification.createdAt.toISOString(),
    }))

    const valid = z.array(NotificationSchema).safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(
        new ContractViolationError({ message: 'Invalid notifications data' }),
      )
    }
    return valid.data
  })
}

/**
 * Mark all notifications as read for a user.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[updateHasNotification false] --> B[validate + return]
 * ```
 */
export function markAsRead(userId: string) {
  return Effect.gen(function* () {
    yield* NotificationService.updateUserHasNotification(userId, false)

    const data = { message: 'Notifications updated' }
    const valid = MessageResponseSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ContractViolationError({ message: 'Invalid response data' }))
    }
    return valid.data
  })
}
