import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export async function postEvents(
  args: {
    json:
      | ({
          id: string
          eventType: string
          timestamp: string
          metadata?: { [key: string]: unknown }
        } & {
          eventType?: 'user.created' | 'user.updated' | 'user.deleted'
          userId: string
          userData?: { email?: string; name?: string }
        })
      | ({
          id: string
          eventType: string
          timestamp: string
          metadata?: { [key: string]: unknown }
        } & {
          eventType?: 'order.placed' | 'order.shipped' | 'order.delivered'
          orderId: string
          orderData?: { total?: number; items?: number }
        })
      | ({
          id: string
          eventType: string
          timestamp: string
          metadata?: { [key: string]: unknown }
        } & {
          eventType?: 'system.startup' | 'system.shutdown'
          component: string
          details?: string
        })
  },
  options?: ClientRequestOptions,
) {
  return await client.events.$post(args, options)
}

/**
 * POST /notifications
 */
export async function postNotifications(
  args: {
    json: {
      recipient:
        | { type: 'email'; email: string; name?: string }
        | { type: 'sms'; phoneNumber: string }
        | { type: 'push'; deviceToken: string; platform?: 'ios' | 'android' | 'web' }
        | {
            type: 'multi'
            recipients: (
              | { type: 'email'; email: string; name?: string }
              | { type: 'sms'; phoneNumber: string }
              | { type: 'push'; deviceToken: string; platform?: 'ios' | 'android' | 'web' }
            )[]
          }
      content: { title: string; body: string; imageUrl?: string; actionUrl?: string }
      priority?: 'low' | 'normal' | 'high' | 'urgent'
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.notifications.$post(args, options)
}

/**
 * POST /shapes
 */
export async function postShapes(
  args: {
    json:
      | { type: 'circle'; radius: number; center?: { x: number; y: number } }
      | { type: 'rectangle'; width: number; height: number; topLeft?: { x: number; y: number } }
      | { type: 'triangle'; vertices: { x: number; y: number }[] }
      | { type: 'polygon'; vertices: { x: number; y: number }[] }
  },
  options?: ClientRequestOptions,
) {
  return await client.shapes.$post(args, options)
}

/**
 * POST /documents
 */
export async function postDocuments(
  args: {
    json: { id: string; title: string; description?: string } & {
      createdAt?: string
      createdBy?: string
      updatedAt?: string
      updatedBy?: string
      version?: number
    } & { tags?: string[]; categories?: string[] } & {
      content?: string
      format?: 'markdown' | 'html' | 'plain'
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.documents.$post(args, options)
}

/**
 * POST /mixed
 */
export async function postMixed(
  args: {
    json: {
      value: string | number | boolean | unknown[] | { [key: string]: unknown }
      notNull?: unknown
      restrictedValue?: string & unknown
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.mixed.$post(args, options)
}
