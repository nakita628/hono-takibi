declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/users': {
      $get: {
        input: {
          query: {
            status?: 'active' | 'inactive' | 'pending' | undefined
            limit?: number | undefined
            offset?: number | undefined
            filter?:
              | {
                  status?: string[] | undefined
                  createdAfter?: string | undefined
                  createdBefore?: string | undefined
                  search?: string | undefined
                }
              | undefined
          }
        }
        output: {
          data: {
            id: string
            email: string
            profile?:
              | {
                  firstName?: string | undefined
                  lastName?: string | undefined
                  avatar?: string | undefined
                  bio?: string | undefined
                  social?: { [x: string]: string } | undefined
                }
              | undefined
            settings?:
              | {
                  notifications?:
                    | {
                        email?: boolean | undefined
                        push?: boolean | undefined
                        sms?: boolean | undefined
                        channels?: { [x: string]: boolean } | undefined
                      }
                    | undefined
                  privacy?:
                    | {
                        profileVisibility?: 'public' | 'private' | 'connections' | undefined
                        showEmail?: boolean | undefined
                        showActivity?: boolean | undefined
                      }
                    | undefined
                  preferences?:
                    | {
                        language?: string | undefined
                        timezone?: string | undefined
                        theme?: 'light' | 'dark' | 'system' | undefined
                        dateFormat?: string | undefined
                      }
                    | undefined
                }
              | undefined
            metadata?:
              | {
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  version?: number | undefined
                }
              | undefined
          }[]
          pagination: {
            page: number
            limit: number
            total: number
            totalPages?: number | undefined
          }
          _links?: { self?: string | undefined; next?: string | undefined } | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/users': {
      $post: {
        input: {
          json: {
            email: string
            profile?:
              | {
                  firstName?: string | undefined
                  lastName?: string | undefined
                  avatar?: string | undefined
                  bio?: string | undefined
                  social?: Record<string, string> | undefined
                }
              | undefined
            password?: string | undefined
          } & {
            invitationCode?: string | undefined
            preferences?:
              | {
                  language?: string | undefined
                  timezone?: string | undefined
                  theme?: 'light' | 'dark' | 'system' | undefined
                  dateFormat?: string | undefined
                }
              | undefined
          }
        }
        output: {
          id: string
          email: string
          profile?:
            | {
                firstName?: string | undefined
                lastName?: string | undefined
                avatar?: string | undefined
                bio?: string | undefined
                social?: { [x: string]: string } | undefined
              }
            | undefined
          settings?:
            | {
                notifications?:
                  | {
                      email?: boolean | undefined
                      push?: boolean | undefined
                      sms?: boolean | undefined
                      channels?: { [x: string]: boolean } | undefined
                    }
                  | undefined
                privacy?:
                  | {
                      profileVisibility?: 'public' | 'private' | 'connections' | undefined
                      showEmail?: boolean | undefined
                      showActivity?: boolean | undefined
                    }
                  | undefined
                preferences?:
                  | {
                      language?: string | undefined
                      timezone?: string | undefined
                      theme?: 'light' | 'dark' | 'system' | undefined
                      dateFormat?: string | undefined
                    }
                  | undefined
              }
            | undefined
          metadata?:
            | {
                createdAt?: string | undefined
                updatedAt?: string | undefined
                version?: number | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/users/:userId': {
      $get: {
        input: { param: { userId: string } }
        output: {
          data?:
            | {
                id: string
                email: string
                profile?:
                  | {
                      firstName?: string | undefined
                      lastName?: string | undefined
                      avatar?: string | undefined
                      bio?: string | undefined
                      social?: { [x: string]: string } | undefined
                    }
                  | undefined
                settings?:
                  | {
                      notifications?:
                        | {
                            email?: boolean | undefined
                            push?: boolean | undefined
                            sms?: boolean | undefined
                            channels?: { [x: string]: boolean } | undefined
                          }
                        | undefined
                      privacy?:
                        | {
                            profileVisibility?: 'public' | 'private' | 'connections' | undefined
                            showEmail?: boolean | undefined
                            showActivity?: boolean | undefined
                          }
                        | undefined
                      preferences?:
                        | {
                            language?: string | undefined
                            timezone?: string | undefined
                            theme?: 'light' | 'dark' | 'system' | undefined
                            dateFormat?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                metadata?:
                  | {
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      version?: number | undefined
                    }
                  | undefined
              }
            | undefined
          computed?:
            | { fullName?: string | undefined; membershipDuration?: string | undefined }
            | undefined
          embedded?:
            | {
                organization?:
                  | {
                      id: string
                      name: string
                      description?: string | undefined
                      address?:
                        | {
                            street?: string | undefined
                            city?: string | undefined
                            state?: string | undefined
                            postalCode?: string | undefined
                            country?: string | undefined
                          }
                        | undefined
                      members?:
                        | {
                            user: {
                              id: string
                              email: string
                              profile?:
                                | {
                                    firstName?: string | undefined
                                    lastName?: string | undefined
                                    avatar?: string | undefined
                                    bio?: string | undefined
                                    social?: { [x: string]: string } | undefined
                                  }
                                | undefined
                              settings?:
                                | {
                                    notifications?:
                                      | {
                                          email?: boolean | undefined
                                          push?: boolean | undefined
                                          sms?: boolean | undefined
                                          channels?: { [x: string]: boolean } | undefined
                                        }
                                      | undefined
                                    privacy?:
                                      | {
                                          profileVisibility?:
                                            | 'public'
                                            | 'private'
                                            | 'connections'
                                            | undefined
                                          showEmail?: boolean | undefined
                                          showActivity?: boolean | undefined
                                        }
                                      | undefined
                                    preferences?:
                                      | {
                                          language?: string | undefined
                                          timezone?: string | undefined
                                          theme?: 'light' | 'dark' | 'system' | undefined
                                          dateFormat?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              metadata?:
                                | {
                                    createdAt?: string | undefined
                                    updatedAt?: string | undefined
                                    version?: number | undefined
                                  }
                                | undefined
                            }
                            role: 'owner' | 'admin' | 'member' | 'viewer'
                            joinedAt?: string | undefined
                          }[]
                        | undefined
                    }
                  | undefined
                teams?:
                  | {
                      id: string
                      name: string
                      members?:
                        | {
                            id: string
                            email: string
                            profile?:
                              | {
                                  firstName?: string | undefined
                                  lastName?: string | undefined
                                  avatar?: string | undefined
                                  bio?: string | undefined
                                  social?: { [x: string]: string } | undefined
                                }
                              | undefined
                            settings?:
                              | {
                                  notifications?:
                                    | {
                                        email?: boolean | undefined
                                        push?: boolean | undefined
                                        sms?: boolean | undefined
                                        channels?: { [x: string]: boolean } | undefined
                                      }
                                    | undefined
                                  privacy?:
                                    | {
                                        profileVisibility?:
                                          | 'public'
                                          | 'private'
                                          | 'connections'
                                          | undefined
                                        showEmail?: boolean | undefined
                                        showActivity?: boolean | undefined
                                      }
                                    | undefined
                                  preferences?:
                                    | {
                                        language?: string | undefined
                                        timezone?: string | undefined
                                        theme?: 'light' | 'dark' | 'system' | undefined
                                        dateFormat?: string | undefined
                                      }
                                    | undefined
                                }
                              | undefined
                            metadata?:
                              | {
                                  createdAt?: string | undefined
                                  updatedAt?: string | undefined
                                  version?: number | undefined
                                }
                              | undefined
                          }[]
                        | undefined
                    }[]
                  | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/orders': {
      $post: {
        input: {
          json: {
            items: { productId: string; variantId: string; quantity: number }[]
            shippingAddress?:
              | {
                  street?: string | undefined
                  city?: string | undefined
                  state?: string | undefined
                  postalCode?: string | undefined
                  country?: string | undefined
                }
              | undefined
            billingAddress?:
              | {
                  street?: string | undefined
                  city?: string | undefined
                  state?: string | undefined
                  postalCode?: string | undefined
                  country?: string | undefined
                }
              | undefined
            paymentMethod?:
              | { method: 'credit_card'; cardToken: string; saveCard?: boolean | undefined }
              | { method: 'bank_transfer'; bankAccount: string; routingNumber?: string | undefined }
              | undefined
          }
        }
        output: {
          order: {
            id: string
            items: {
              product: {
                id: string
                sku: string
                name: string
                attributes?: { [x: string]: string } | undefined
                price?:
                  | { amount: number; currency: string; formatted?: string | undefined }
                  | undefined
              }
              quantity: number
              price: { amount: number; currency: string; formatted?: string | undefined }
            }[]
            total: { amount: number; currency: string; formatted?: string | undefined }
            customer?:
              | {
                  id: string
                  email: string
                  profile?:
                    | {
                        firstName?: string | undefined
                        lastName?: string | undefined
                        avatar?: string | undefined
                        bio?: string | undefined
                        social?: { [x: string]: string } | undefined
                      }
                    | undefined
                  settings?:
                    | {
                        notifications?:
                          | {
                              email?: boolean | undefined
                              push?: boolean | undefined
                              sms?: boolean | undefined
                              channels?: { [x: string]: boolean } | undefined
                            }
                          | undefined
                        privacy?:
                          | {
                              profileVisibility?: 'public' | 'private' | 'connections' | undefined
                              showEmail?: boolean | undefined
                              showActivity?: boolean | undefined
                            }
                          | undefined
                        preferences?:
                          | {
                              language?: string | undefined
                              timezone?: string | undefined
                              theme?: 'light' | 'dark' | 'system' | undefined
                              dateFormat?: string | undefined
                            }
                          | undefined
                      }
                    | undefined
                  metadata?:
                    | {
                        createdAt?: string | undefined
                        updatedAt?: string | undefined
                        version?: number | undefined
                      }
                    | undefined
                }
              | undefined
            status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | undefined
            shippingAddress?:
              | {
                  street?: string | undefined
                  city?: string | undefined
                  state?: string | undefined
                  postalCode?: string | undefined
                  country?: string | undefined
                }
              | undefined
            billingAddress?:
              | {
                  street?: string | undefined
                  city?: string | undefined
                  state?: string | undefined
                  postalCode?: string | undefined
                  country?: string | undefined
                }
              | undefined
          }
          payment:
            | { method: 'credit_card'; cardToken: string; saveCard?: boolean | undefined }
            | { method: 'bank_transfer'; bankAccount: string; routingNumber?: string | undefined }
            | {
                method: 'invoice'
                invoiceAddress?:
                  | {
                      street?: string | undefined
                      city?: string | undefined
                      state?: string | undefined
                      postalCode?: string | undefined
                      country?: string | undefined
                    }
                  | undefined
                paymentTerms?: number | undefined
              }
          shipping?:
            | {
                carrier?: string | undefined
                method?: string | undefined
                trackingNumber?: string | undefined
                estimatedDelivery?:
                  | { from?: string | undefined; to?: string | undefined }
                  | undefined
                cost?:
                  | { amount: number; currency: string; formatted?: string | undefined }
                  | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/products/:productId/variants': {
      $get: {
        input: { param: { productId: string } }
        output: {
          id: string
          sku: string
          name: string
          attributes?: { [x: string]: string } | undefined
          price?: { amount: number; currency: string; formatted?: string | undefined } | undefined
          pricing?:
            | {
                amount: number
                currency: string
                formatted?: string | undefined
                discounts?:
                  | {
                      type: 'fixed' | 'percentage'
                      value: number
                      code?: string | undefined
                      validUntil?: string | undefined
                    }[]
                  | undefined
              }
            | undefined
          availability?:
            | {
                inStock?: boolean | undefined
                quantity?: number | undefined
                warehouses?:
                  | {
                      id: string
                      name: string
                      address?:
                        | {
                            street?: string | undefined
                            city?: string | undefined
                            state?: string | undefined
                            postalCode?: string | undefined
                            country?: string | undefined
                          }
                        | undefined
                      capacity?: number | undefined
                      localQuantity?: number | undefined
                      estimatedDelivery?:
                        | { from?: string | undefined; to?: string | undefined }
                        | undefined
                    }[]
                  | undefined
              }
            | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/reports/generate': {
      $post: {
        input: {
          json: {
            reportType: 'custom' | 'sales' | 'inventory' | 'users'
            parameters:
              | {
                  dateRange: { from?: string | undefined; to?: string | undefined }
                  groupBy?: 'day' | 'week' | 'month' | 'quarter' | undefined
                  metrics?: ('revenue' | 'orders' | 'avgOrderValue' | 'customers')[] | undefined
                }
              | {
                  warehouses?: string[] | undefined
                  categories?: string[] | undefined
                  lowStockThreshold?: number | undefined
                }
              | {
                  dateRange?: { from?: string | undefined; to?: string | undefined } | undefined
                  segments?: string[] | undefined
                  includeInactive?: boolean | undefined
                }
              | {
                  query?: string | undefined
                  fields?: string[] | undefined
                  filters?:
                    | Record<
                        string,
                        | string
                        | number
                        | {
                            operator?:
                              | 'in'
                              | 'eq'
                              | 'ne'
                              | 'gt'
                              | 'gte'
                              | 'lt'
                              | 'lte'
                              | 'contains'
                              | undefined
                            value?: string | number | string[] | undefined
                          }
                      >
                    | undefined
                }
            format?:
              | {
                  type?: 'json' | 'csv' | 'xlsx' | 'pdf' | undefined
                  options?: { [x: string]: unknown } | undefined
                }
              | undefined
            delivery?:
              | {
                  method?: 'email' | 'download' | 'webhook' | undefined
                  email?:
                    | {
                        recipients: string[]
                        subject?: string | undefined
                        message?: string | undefined
                      }
                    | undefined
                  webhook?:
                    | {
                        url: string
                        headers?: Record<string, string> | undefined
                        retryPolicy?:
                          | {
                              maxRetries?: number | undefined
                              backoffMultiplier?: number | undefined
                              initialDelay?: number | undefined
                              maxDelay?: number | undefined
                            }
                          | undefined
                      }
                    | undefined
                }
              | undefined
          }
        }
        output: {
          id: string
          status: 'queued' | 'processing' | 'completed' | 'failed'
          progress?: number | undefined
          result?: { url?: string | undefined; expiresAt?: string | undefined } | undefined
          error?: { code?: string | undefined; message?: string | undefined } | undefined
        }
        outputFormat: 'json'
        status: 202
      }
    }
  } & {
    '/webhooks/test': {
      $post: {
        input: {
          json: {
            endpoint: string
            payload: {
              event?: { type: string; timestamp: string; version?: string | undefined } | undefined
              data?:
                | {
                    id: string
                    email: string
                    profile?:
                      | {
                          firstName?: string | undefined
                          lastName?: string | undefined
                          avatar?: string | undefined
                          bio?: string | undefined
                          social?: Record<string, string> | undefined
                        }
                      | undefined
                    settings?:
                      | {
                          notifications?:
                            | {
                                email?: boolean | undefined
                                push?: boolean | undefined
                                sms?: boolean | undefined
                                channels?: Record<string, boolean> | undefined
                              }
                            | undefined
                          privacy?:
                            | {
                                profileVisibility?: 'public' | 'private' | 'connections' | undefined
                                showEmail?: boolean | undefined
                                showActivity?: boolean | undefined
                              }
                            | undefined
                          preferences?:
                            | {
                                language?: string | undefined
                                timezone?: string | undefined
                                theme?: 'light' | 'dark' | 'system' | undefined
                                dateFormat?: string | undefined
                              }
                            | undefined
                        }
                      | undefined
                    metadata?:
                      | {
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          version?: number | undefined
                        }
                      | undefined
                  }
                | {
                    id: string
                    name: string
                    description?: string | undefined
                    address?:
                      | {
                          street?: string | undefined
                          city?: string | undefined
                          state?: string | undefined
                          postalCode?: string | undefined
                          country?: string | undefined
                        }
                      | undefined
                    members?:
                      | {
                          user: {
                            id: string
                            email: string
                            profile?:
                              | {
                                  firstName?: string | undefined
                                  lastName?: string | undefined
                                  avatar?: string | undefined
                                  bio?: string | undefined
                                  social?: Record<string, string> | undefined
                                }
                              | undefined
                            settings?:
                              | {
                                  notifications?:
                                    | {
                                        email?: boolean | undefined
                                        push?: boolean | undefined
                                        sms?: boolean | undefined
                                        channels?: Record<string, boolean> | undefined
                                      }
                                    | undefined
                                  privacy?:
                                    | {
                                        profileVisibility?:
                                          | 'public'
                                          | 'private'
                                          | 'connections'
                                          | undefined
                                        showEmail?: boolean | undefined
                                        showActivity?: boolean | undefined
                                      }
                                    | undefined
                                  preferences?:
                                    | {
                                        language?: string | undefined
                                        timezone?: string | undefined
                                        theme?: 'light' | 'dark' | 'system' | undefined
                                        dateFormat?: string | undefined
                                      }
                                    | undefined
                                }
                              | undefined
                            metadata?:
                              | {
                                  createdAt?: string | undefined
                                  updatedAt?: string | undefined
                                  version?: number | undefined
                                }
                              | undefined
                          }
                          role: 'owner' | 'admin' | 'member' | 'viewer'
                          joinedAt?: string | undefined
                        }[]
                      | undefined
                  }
                | Record<
                    string,
                    | string
                    | number
                    | boolean
                    | {
                        id?: string | undefined
                        type?: string | undefined
                        attributes?: { [x: string]: unknown } | undefined
                      }[]
                  >
                | {
                    id: string
                    items: {
                      product: {
                        id: string
                        sku: string
                        name: string
                        attributes?: Record<string, string> | undefined
                        price?:
                          | { amount: number; currency: string; formatted?: string | undefined }
                          | undefined
                      }
                      quantity: number
                      price: { amount: number; currency: string; formatted?: string | undefined }
                    }[]
                    total: { amount: number; currency: string; formatted?: string | undefined }
                    customer?:
                      | {
                          id: string
                          email: string
                          profile?:
                            | {
                                firstName?: string | undefined
                                lastName?: string | undefined
                                avatar?: string | undefined
                                bio?: string | undefined
                                social?: Record<string, string> | undefined
                              }
                            | undefined
                          settings?:
                            | {
                                notifications?:
                                  | {
                                      email?: boolean | undefined
                                      push?: boolean | undefined
                                      sms?: boolean | undefined
                                      channels?: Record<string, boolean> | undefined
                                    }
                                  | undefined
                                privacy?:
                                  | {
                                      profileVisibility?:
                                        | 'public'
                                        | 'private'
                                        | 'connections'
                                        | undefined
                                      showEmail?: boolean | undefined
                                      showActivity?: boolean | undefined
                                    }
                                  | undefined
                                preferences?:
                                  | {
                                      language?: string | undefined
                                      timezone?: string | undefined
                                      theme?: 'light' | 'dark' | 'system' | undefined
                                      dateFormat?: string | undefined
                                    }
                                  | undefined
                              }
                            | undefined
                          metadata?:
                            | {
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                version?: number | undefined
                              }
                            | undefined
                        }
                      | undefined
                    status?:
                      | 'pending'
                      | 'confirmed'
                      | 'shipped'
                      | 'delivered'
                      | 'cancelled'
                      | undefined
                    shippingAddress?:
                      | {
                          street?: string | undefined
                          city?: string | undefined
                          state?: string | undefined
                          postalCode?: string | undefined
                          country?: string | undefined
                        }
                      | undefined
                    billingAddress?:
                      | {
                          street?: string | undefined
                          city?: string | undefined
                          state?: string | undefined
                          postalCode?: string | undefined
                          country?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              context?:
                | ({
                    requestId?: string | undefined
                    timestamp?: string | undefined
                    source?: string | undefined
                    userAgent?: string | undefined
                  } & {
                    testMode?: boolean | undefined
                    mockResponses?:
                      | { status?: number | undefined; body?: Record<string, never> | undefined }[]
                      | undefined
                  })
                | undefined
            }
            headers?: Record<string, string> | undefined
            retryPolicy?:
              | {
                  maxRetries?: number | undefined
                  backoffMultiplier?: number | undefined
                  initialDelay?: number | undefined
                  maxDelay?: number | undefined
                }
              | undefined
          }
        }
        output: {
          success: boolean
          statusCode?: number | undefined
          responseTime?: number | undefined
          response?: {} | undefined
          error?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
