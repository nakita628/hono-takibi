import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export async function postEvents(arg: {
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
      } & { eventType?: 'system.startup' | 'system.shutdown'; component: string; details?: string })
}) {
  return await client.events.$post(arg)
}

/**
 * POST /notifications
 */
export async function postNotifications(arg: {
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
}) {
  return await client.notifications.$post(arg)
}

/**
 * POST /shapes
 */
export async function postShapes(arg: {
  json:
    | { type: 'circle'; radius: number; center?: { x: number; y: number } }
    | { type: 'rectangle'; width: number; height: number; topLeft?: { x: number; y: number } }
    | { type: 'triangle'; vertices: { x: number; y: number }[] }
    | { type: 'polygon'; vertices: { x: number; y: number }[] }
}) {
  return await client.shapes.$post(arg)
}

/**
 * POST /documents
 */
export async function postDocuments(arg: {
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
}) {
  return await client.documents.$post(arg)
}

/**
 * POST /mixed
 */
export async function postMixed(arg: {
  json: {
    value: string | number | boolean | unknown[] | { [key: string]: unknown }
    notNull?: unknown
    restrictedValue?: string & unknown
  }
}) {
  return await client.mixed.$post(arg)
}
