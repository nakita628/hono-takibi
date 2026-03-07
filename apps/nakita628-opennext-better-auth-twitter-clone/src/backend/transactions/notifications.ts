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
 *   B --> C[safeParse + return]
 * ```
 */
export function getByUserId(userId: string) {
  return NotificationService.findByUserId(userId).pipe(
    Effect.andThen((notifications) => {
      const valid = z.array(NotificationSchema).safeParse(
        notifications.map((notification) => ({
          id: notification.id,
          body: notification.body,
          userId: notification.userId,
          createdAt: notification.createdAt.toISOString(),
        })),
      )
      if (!valid.success) {
        return Effect.fail(new ContractViolationError({ message: 'Invalid notifications data' }))
      }
      return Effect.succeed(valid.data)
    }),
  )
}

/**
 * Mark all notifications as read for a user.
 *
 * @mermaid
 * ```
 * flowchart LR
 *   A[updateHasNotification false] --> B[safeParse + return]
 * ```
 */
export function markAsRead(userId: string) {
  return NotificationService.updateUserHasNotification(userId, false).pipe(
    Effect.andThen(() => {
      const valid = MessageResponseSchema.safeParse({ message: 'Notifications updated' })
      if (!valid.success) {
        return Effect.fail(new ContractViolationError({ message: 'Invalid response data' }))
      }
      return Effect.succeed(valid.data)
    }),
  )
}
