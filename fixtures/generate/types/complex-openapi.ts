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
      '/users': {
        $get: {
          input: {}
          output: {
            id: string
            name: string
            email: string
            address?:
              | { street: string; city: string; state: string; postalCode: string; country: string }
              | undefined
            profile?:
              | {
                  bio?: string | undefined
                  social?:
                    | { twitter?: string | undefined; linkedin?: string | undefined }
                    | undefined
                }
              | undefined
          }[]
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/users': {
        $post: {
          input: {
            json: {
              name: string
              email: string
              address?:
                | {
                    street: string
                    city: string
                    state: string
                    postalCode: string
                    country: string
                  }
                | undefined
              profile?:
                | {
                    bio?: string | undefined
                    social?:
                      | { twitter?: string | undefined; linkedin?: string | undefined }
                      | undefined
                  }
                | undefined
            }
          }
          output: {
            id: string
            name: string
            email: string
            address?:
              | { street: string; city: string; state: string; postalCode: string; country: string }
              | undefined
            profile?:
              | {
                  bio?: string | undefined
                  social?:
                    | { twitter?: string | undefined; linkedin?: string | undefined }
                    | undefined
                }
              | undefined
          }
          outputFormat: 'json'
          status: 201
        }
      }
    } & {
      '/users/:userId': {
        $get:
          | {
              input: { param: { userId: string } }
              output: {
                id: string
                name: string
                email: string
                address?:
                  | {
                      street: string
                      city: string
                      state: string
                      postalCode: string
                      country: string
                    }
                  | undefined
                profile?:
                  | {
                      bio?: string | undefined
                      social?:
                        | { twitter?: string | undefined; linkedin?: string | undefined }
                        | undefined
                    }
                  | undefined
              }
              outputFormat: 'json'
              status: 200
            }
          | { input: { param: { userId: string } }; output: {}; outputFormat: string; status: 404 }
      }
    } & {
      '/users/:userId': {
        $put:
          | {
              input: { param: { userId: string } } & {
                json: {
                  name?: string | undefined
                  email?: string | undefined
                  address?:
                    | {
                        street: string
                        city: string
                        state: string
                        postalCode: string
                        country: string
                      }
                    | undefined
                  profile?:
                    | {
                        bio?: string | undefined
                        social?:
                          | { twitter?: string | undefined; linkedin?: string | undefined }
                          | undefined
                      }
                    | undefined
                }
              }
              output: {
                id: string
                name: string
                email: string
                address?:
                  | {
                      street: string
                      city: string
                      state: string
                      postalCode: string
                      country: string
                    }
                  | undefined
                profile?:
                  | {
                      bio?: string | undefined
                      social?:
                        | { twitter?: string | undefined; linkedin?: string | undefined }
                        | undefined
                    }
                  | undefined
              }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: { param: { userId: string } } & {
                json: {
                  name?: string | undefined
                  email?: string | undefined
                  address?:
                    | {
                        street: string
                        city: string
                        state: string
                        postalCode: string
                        country: string
                      }
                    | undefined
                  profile?:
                    | {
                        bio?: string | undefined
                        social?:
                          | { twitter?: string | undefined; linkedin?: string | undefined }
                          | undefined
                      }
                    | undefined
                }
              }
              output: {}
              outputFormat: string
              status: 404
            }
      }
    } & {
      '/users/:userId': {
        $delete:
          | { input: { param: { userId: string } }; output: {}; outputFormat: string; status: 404 }
          | { input: { param: { userId: string } }; output: {}; outputFormat: string; status: 204 }
      }
    } & {
      '/orders': {
        $get: {
          input: {}
          output: {
            orderId: string
            user: {
              id: string
              name: string
              email: string
              address?:
                | {
                    street: string
                    city: string
                    state: string
                    postalCode: string
                    country: string
                  }
                | undefined
              profile?:
                | {
                    bio?: string | undefined
                    social?:
                      | { twitter?: string | undefined; linkedin?: string | undefined }
                      | undefined
                  }
                | undefined
            }
            items: { productId: string; quantity: number; price: number }[]
            total: number
            status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
            paymentMethod?:
              | {
                  method: 'credit_card'
                  cardNumber: string
                  cardHolder: string
                  expirationDate: string
                }
              | { method: 'paypal'; email: string }
              | undefined
          }[]
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/orders': {
        $post: {
          input: {
            json: {
              userId: string
              items: { productId: string; quantity: number; price: number }[]
              paymentMethod?:
                | {
                    cardNumber: string
                    cardHolder: string
                    expirationDate: string
                    method?: 'credit_card' | undefined
                  }
                | { email: string; method?: 'paypal' | undefined }
                | undefined
            }
          }
          output: {
            orderId: string
            user: {
              id: string
              name: string
              email: string
              address?:
                | {
                    street: string
                    city: string
                    state: string
                    postalCode: string
                    country: string
                  }
                | undefined
              profile?:
                | {
                    bio?: string | undefined
                    social?:
                      | { twitter?: string | undefined; linkedin?: string | undefined }
                      | undefined
                  }
                | undefined
            }
            items: { productId: string; quantity: number; price: number }[]
            total: number
            status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
            paymentMethod?:
              | {
                  method: 'credit_card'
                  cardNumber: string
                  cardHolder: string
                  expirationDate: string
                }
              | { method: 'paypal'; email: string }
              | undefined
          }
          outputFormat: 'json'
          status: 201
        }
      }
    }
  >,
  '/'
>
export default routes
