import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export async function postEvents(
  body:
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
      }),
) {
  return await client.events.$post({ json: body })
}

/**
 * POST /notifications
 */
export async function postNotifications(body: {
  recipient:
    | { type: string; email: string; name?: string }
    | { type: string; phoneNumber: string }
    | { type: string; deviceToken: string; platform?: 'ios' | 'android' | 'web' }
    | {
        type: string
        recipients: (
          | { type: string; email: string; name?: string }
          | { type: string; phoneNumber: string }
          | { type: string; deviceToken: string; platform?: 'ios' | 'android' | 'web' }
        )[]
      }
  content: { title: string; body: string; imageUrl?: string; actionUrl?: string }
  priority?: 'low' | 'normal' | 'high' | 'urgent'
}) {
  return await client.notifications.$post({ json: body })
}

/**
 * POST /shapes
 */
export async function postShapes(
  body:
    | { type: string; radius: number; center?: { x: number; y: number } }
    | { type: string; width: number; height: number; topLeft?: { x: number; y: number } }
    | { type: string; vertices: { x: number; y: number }[] }
    | { type: string; vertices: { x: number; y: number }[] },
) {
  return await client.shapes.$post({ json: body })
}

/**
 * POST /documents
 */
export async function postDocuments(
  body: { id: string; title: string; description?: string } & {
    createdAt?: string
    createdBy?: string
    updatedAt?: string
    updatedBy?: string
    version?: number
  } & { tags?: string[]; categories?: string[] } & {
    content?: string
    format?: 'markdown' | 'html' | 'plain'
  },
) {
  return await client.documents.$post({ json: body })
}

/**
 * POST /mixed
 */
export async function postMixed(body: {
  value: string | number | boolean | unknown[] | { [key: string]: unknown }
  notNull?: unknown
  restrictedValue?: string & unknown
}) {
  return await client.mixed.$post({ json: body })
}
