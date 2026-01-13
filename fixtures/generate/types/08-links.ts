declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/orders': {
      $post: {
        input: { json: { customerId: string; items: { productId: string; quantity: number }[] } }
        output: {
          id: string
          customerId: string
          paymentId?: string | undefined
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          total: number
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
          paymentId?: string | undefined
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          createdAt?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
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
          productName?: string | undefined
          quantity: number
          price: number
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
          paymentId?: string | undefined
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          total: number
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
  },
  '/'
>
export default routes
