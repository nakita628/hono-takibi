declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/events': {
      $post: {
        input: {
          json:
            | {
                id: string
                eventType?: 'user.created' | 'user.updated' | 'user.deleted' | undefined
                timestamp: string
                metadata?: { [x: string]: unknown } | undefined
                userId: string
                userData?: { email?: string | undefined; name?: string | undefined } | undefined
              }
            | {
                id: string
                eventType?: 'order.placed' | 'order.shipped' | 'order.delivered' | undefined
                timestamp: string
                metadata?: { [x: string]: unknown } | undefined
                orderId: string
                orderData?: { total?: number | undefined; items?: number | undefined } | undefined
              }
            | {
                id: string
                eventType?: 'system.startup' | 'system.shutdown' | undefined
                timestamp: string
                metadata?: { [x: string]: unknown } | undefined
                component: string
                details?: string | undefined
              }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  } & {
    '/notifications': {
      $post: {
        input: {
          json: {
            recipient:
              | { type: 'email'; email: string; name?: string | undefined }
              | { type: 'sms'; phoneNumber: string }
              | {
                  type: 'push'
                  deviceToken: string
                  platform?: 'ios' | 'android' | 'web' | undefined
                }
              | {
                  type: 'multi'
                  recipients: (
                    | { type: 'email'; email: string; name?: string | undefined }
                    | { type: 'sms'; phoneNumber: string }
                    | {
                        type: 'push'
                        deviceToken: string
                        platform?: 'ios' | 'android' | 'web' | undefined
                      }
                  )[]
                }
            content: {
              title: string
              body: string
              imageUrl?: string | undefined
              actionUrl?: string | undefined
            }
            priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/shapes': {
      $post: {
        input: {
          json:
            | { type: 'circle'; radius: number; center?: { x: number; y: number } | undefined }
            | {
                type: 'rectangle'
                width: number
                height: number
                topLeft?: { x: number; y: number } | undefined
              }
            | { type: 'triangle'; vertices: { x: number; y: number }[] }
            | { type: 'polygon'; vertices: { x: number; y: number }[] }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  } & {
    '/documents': {
      $post: {
        input: {
          json: {
            id: string
            title: string
            description?: string | undefined
            createdAt?: string | undefined
            createdBy?: string | undefined
            updatedAt?: string | undefined
            updatedBy?: string | undefined
            version?: number | undefined
            tags?: string[] | undefined
            categories?: string[] | undefined
            content?: string | undefined
            format?: 'markdown' | 'html' | 'plain' | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  } & {
    '/mixed': {
      $post: {
        input: {
          json: {
            value: string | number | boolean | unknown[] | { [x: string]: unknown }
            notNull?: { [x: string]: unknown } | undefined
            restrictedValue?: {} | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  },
  '/'
>
export default routes
