import type { OpenAPIHono } from '@hono/zod-openapi'

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K]
}

declare const routes: OpenAPIHono<
  Env,
  RemoveIndexSignature<
    {
      '/orders': {
        $post: {
          input: { json: { customerId: string; items: { productId: string; quantity: number }[] } }
          output: {
            id: string
            customerId: string
            status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
            total: number
            paymentId?: string | undefined
            createdAt?: string | undefined
          }
          outputFormat: 'json'
          status: 201
        }
      }
    } & {
      '/orders/:orderId': {
        $get: {
          input: { param: { orderId: string } }
          output: {
            id: string
            customerId: string
            status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
            total: number
            paymentId?: string | undefined
            createdAt?: string | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/orders/:orderId': {
        $delete: {
          input: { param: { orderId: string } }
          output: {}
          outputFormat: string
          status: 200
        }
      }
    } & {
      '/orders/:orderId/items': {
        $get: {
          input: { param: { orderId: string } }
          output: {
            id: string
            productId: string
            quantity: number
            price: number
            productName?: string | undefined
          }[]
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/customers/:customerId': {
        $get: {
          input: { param: { customerId: string } }
          output: { id: string; email: string; name?: string | undefined }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/customers/:customerId/orders': {
        $get: {
          input: { param: { customerId: string } }
          output: {
            id: string
            customerId: string
            status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
            total: number
            paymentId?: string | undefined
            createdAt?: string | undefined
          }[]
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/payments/:paymentId': {
        $get: {
          input: { param: { paymentId: string } }
          output: {
            id: string
            orderId: string
            amount: number
            status: 'pending' | 'completed' | 'failed' | 'refunded'
            method?: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    }
  >,
  '/'
>
export default routes
