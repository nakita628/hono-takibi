import { client } from '../clients/17-mixed-inline-refs'

/**
 * GET /users
 */
export async function getUsers(arg: {
  query: {
    status?: 'active' | 'inactive' | 'pending'
    limit?: number
    offset?: number
    filter?: { status?: string[]; createdAfter?: string; createdBefore?: string; search?: string }
  }
}) {
  return await client.users.$get(arg)
}

/**
 * POST /users
 */
export async function postUsers(arg: {
  json: {
    email: string
    profile?: {
      firstName?: string
      lastName?: string
      avatar?: string
      bio?: string
      social?: { [key: string]: string }
    }
    password?: string
  } & {
    invitationCode?: string
    preferences?: {
      language?: string
      timezone?: string
      theme?: 'light' | 'dark' | 'system'
      dateFormat?: string
    }
  }
}) {
  return await client.users.$post(arg)
}

/**
 * GET /users/{userId}
 */
export async function getUsersUserId(arg: { param: { userId: string } }) {
  return await client['users'][':userId']['$get'](arg)
}

/**
 * POST /orders
 */
export async function postOrders(arg: {
  json: {
    items: { productId: string; variantId: string; quantity: number }[]
    shippingAddress?: {
      street?: string
      city?: string
      state?: string
      postalCode?: string
      country?: string
    }
    billingAddress?: {
      street?: string
      city?: string
      state?: string
      postalCode?: string
      country?: string
    }
    paymentMethod?:
      | { method: 'credit_card'; cardToken: string; saveCard?: boolean }
      | { method: 'bank_transfer'; bankAccount: string; routingNumber?: string }
  }
}) {
  return await client.orders.$post(arg)
}

/**
 * GET /products/{productId}/variants
 */
export async function getProductsProductIdVariants(arg: { param: { productId: string } }) {
  return await client['products'][':productId']['variants']['$get'](arg)
}

/**
 * POST /reports/generate
 */
export async function postReportsGenerate(arg: {
  json: {
    reportType: 'sales' | 'inventory' | 'users' | 'custom'
    parameters:
      | {
          dateRange: { from?: string; to?: string }
          groupBy?: 'day' | 'week' | 'month' | 'quarter'
          metrics?: ('revenue' | 'orders' | 'avgOrderValue' | 'customers')[]
        }
      | { warehouses?: string[]; categories?: string[]; lowStockThreshold?: number }
      | {
          dateRange?: { from?: string; to?: string }
          segments?: string[]
          includeInactive?: boolean
        }
      | {
          query?: string
          fields?: string[]
          filters?: {
            [key: string]:
              | string
              | number
              | {
                  operator?: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains'
                  value?: string | number | string[]
                }
          }
        }
    format?: { type?: 'json' | 'csv' | 'xlsx' | 'pdf'; options?: { [key: string]: unknown } }
    delivery?: {
      method?: 'download' | 'email' | 'webhook'
      email?: { recipients: string[]; subject?: string; message?: string }
      webhook?: {
        url: string
        headers?: { [key: string]: string }
        retryPolicy?: {
          maxRetries?: number
          backoffMultiplier?: number
          initialDelay?: number
          maxDelay?: number
        }
      }
    }
  }
}) {
  return await client['reports']['generate']['$post'](arg)
}

/**
 * POST /webhooks/test
 */
export async function postWebhooksTest(arg: {
  json: {
    endpoint: string
    headers?: { [key: string]: string }
    payload: {
      event?: { type: string; timestamp: string; version?: string }
      data?:
        | {
            id: string
            email: string
            profile?: {
              firstName?: string
              lastName?: string
              avatar?: string
              bio?: string
              social?: { [key: string]: string }
            }
            settings?: {
              notifications?: {
                email?: boolean
                push?: boolean
                sms?: boolean
                channels?: { [key: string]: boolean }
              }
              privacy?: {
                profileVisibility?: 'public' | 'private' | 'connections'
                showEmail?: boolean
                showActivity?: boolean
              }
              preferences?: {
                language?: string
                timezone?: string
                theme?: 'light' | 'dark' | 'system'
                dateFormat?: string
              }
            }
            metadata?: { createdAt?: string; updatedAt?: string; version?: number }
          }
        | {
            id: string
            customer?: {
              id: string
              email: string
              profile?: {
                firstName?: string
                lastName?: string
                avatar?: string
                bio?: string
                social?: { [key: string]: string }
              }
              settings?: {
                notifications?: {
                  email?: boolean
                  push?: boolean
                  sms?: boolean
                  channels?: { [key: string]: boolean }
                }
                privacy?: {
                  profileVisibility?: 'public' | 'private' | 'connections'
                  showEmail?: boolean
                  showActivity?: boolean
                }
                preferences?: {
                  language?: string
                  timezone?: string
                  theme?: 'light' | 'dark' | 'system'
                  dateFormat?: string
                }
              }
              metadata?: { createdAt?: string; updatedAt?: string; version?: number }
            }
            items: {
              product: {
                id: string
                sku: string
                name: string
                attributes?: { [key: string]: string }
                price?: { amount: number; currency: string; formatted?: string }
              }
              quantity: number
              price: { amount: number; currency: string; formatted?: string }
            }[]
            total: { amount: number; currency: string; formatted?: string }
            status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
            shippingAddress?: {
              street?: string
              city?: string
              state?: string
              postalCode?: string
              country?: string
            }
            billingAddress?: {
              street?: string
              city?: string
              state?: string
              postalCode?: string
              country?: string
            }
          }
        | {
            id: string
            name: string
            description?: string
            address?: {
              street?: string
              city?: string
              state?: string
              postalCode?: string
              country?: string
            }
            members?: {
              user: {
                id: string
                email: string
                profile?: {
                  firstName?: string
                  lastName?: string
                  avatar?: string
                  bio?: string
                  social?: { [key: string]: string }
                }
                settings?: {
                  notifications?: {
                    email?: boolean
                    push?: boolean
                    sms?: boolean
                    channels?: { [key: string]: boolean }
                  }
                  privacy?: {
                    profileVisibility?: 'public' | 'private' | 'connections'
                    showEmail?: boolean
                    showActivity?: boolean
                  }
                  preferences?: {
                    language?: string
                    timezone?: string
                    theme?: 'light' | 'dark' | 'system'
                    dateFormat?: string
                  }
                }
                metadata?: { createdAt?: string; updatedAt?: string; version?: number }
              }
              role: 'owner' | 'admin' | 'member' | 'viewer'
              joinedAt?: string
            }[]
          }
        | {
            [key: string]:
              | string
              | number
              | boolean
              | { id?: string; type?: string; attributes?: { [key: string]: unknown } }[]
          }
      context?: { requestId?: string; timestamp?: string; source?: string; userAgent?: string } & {
        testMode?: boolean
        mockResponses?: { status?: number; body?: {} }[]
      }
    }
    retryPolicy?: {
      maxRetries?: number
      backoffMultiplier?: number
      initialDelay?: number
      maxDelay?: number
    }
  }
}) {
  return await client['webhooks']['test']['$post'](arg)
}
