declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/notifications': {
      $get:
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                read?: boolean | undefined
                type?: 'info' | 'success' | 'warning' | 'error' | 'system' | undefined
              }
            }
            output: {
              data: {
                id: string
                title: string
                body?: string | undefined
                type: 'info' | 'success' | 'warning' | 'error' | 'system'
                read: boolean
                data?: { [x: string]: unknown } | undefined
                actionUrl?: string | undefined
                imageUrl?: string | undefined
                createdAt: string
                readAt?: string | undefined
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                read?: boolean | undefined
                type?: 'info' | 'success' | 'warning' | 'error' | 'system' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/notifications/:notificationId': {
      $get:
        | {
            input: { param: { notificationId: string } }
            output: {
              id: string
              title: string
              body?: string | undefined
              type: 'info' | 'success' | 'warning' | 'error' | 'system'
              read: boolean
              data?: { [x: string]: unknown } | undefined
              actionUrl?: string | undefined
              imageUrl?: string | undefined
              createdAt: string
              readAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { notificationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { notificationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
      $delete:
        | {
            input: { param: { notificationId: string } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { param: { notificationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/notifications/:notificationId/read': {
      $post:
        | {
            input: { param: { notificationId: string } }
            output: {
              id: string
              title: string
              body?: string | undefined
              type: 'info' | 'success' | 'warning' | 'error' | 'system'
              read: boolean
              data?: { [x: string]: unknown } | undefined
              actionUrl?: string | undefined
              imageUrl?: string | undefined
              createdAt: string
              readAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { notificationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/notifications/read-all': {
      $post:
        | {
            input: {}
            output: { updatedCount?: number | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/notifications/unread-count': {
      $get:
        | { input: {}; output: { count?: number | undefined }; outputFormat: 'json'; status: 200 }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/messages/send': {
      $post:
        | {
            input: {
              json: {
                channel: 'email' | 'sms' | 'push' | 'in_app'
                to: string | string[]
                templateId?: string | undefined
                subject?: string | undefined
                body?: string | undefined
                html?: string | undefined
                variables?: { [x: string]: string } | undefined
                data?: { [x: string]: unknown } | undefined
                priority?: 'low' | 'normal' | 'high' | undefined
                scheduledAt?: string | undefined
              }
            }
            output: {
              messageId: string
              status: 'queued' | 'sending' | 'sent' | 'delivered' | 'failed'
              scheduledAt?: string | undefined
            }
            outputFormat: 'json'
            status: 202
          }
        | {
            input: {
              json: {
                channel: 'email' | 'sms' | 'push' | 'in_app'
                to: string | string[]
                templateId?: string | undefined
                subject?: string | undefined
                body?: string | undefined
                html?: string | undefined
                variables?: { [x: string]: string } | undefined
                data?: { [x: string]: unknown } | undefined
                priority?: 'low' | 'normal' | 'high' | undefined
                scheduledAt?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                channel: 'email' | 'sms' | 'push' | 'in_app'
                to: string | string[]
                templateId?: string | undefined
                subject?: string | undefined
                body?: string | undefined
                html?: string | undefined
                variables?: { [x: string]: string } | undefined
                data?: { [x: string]: unknown } | undefined
                priority?: 'low' | 'normal' | 'high' | undefined
                scheduledAt?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/messages/send-batch': {
      $post:
        | {
            input: {
              json: {
                messages: {
                  channel: 'email' | 'sms' | 'push' | 'in_app'
                  to: string | string[]
                  templateId?: string | undefined
                  subject?: string | undefined
                  body?: string | undefined
                  html?: string | undefined
                  variables?: { [x: string]: string } | undefined
                  data?: { [x: string]: unknown } | undefined
                  priority?: 'low' | 'normal' | 'high' | undefined
                  scheduledAt?: string | undefined
                }[]
              }
            }
            output: {
              batchId: string
              total: number
              queued: number
              failed: number
              errors?: { index?: number | undefined; error?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 202
          }
        | {
            input: {
              json: {
                messages: {
                  channel: 'email' | 'sms' | 'push' | 'in_app'
                  to: string | string[]
                  templateId?: string | undefined
                  subject?: string | undefined
                  body?: string | undefined
                  html?: string | undefined
                  variables?: { [x: string]: string } | undefined
                  data?: { [x: string]: unknown } | undefined
                  priority?: 'low' | 'normal' | 'high' | undefined
                  scheduledAt?: string | undefined
                }[]
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                messages: {
                  channel: 'email' | 'sms' | 'push' | 'in_app'
                  to: string | string[]
                  templateId?: string | undefined
                  subject?: string | undefined
                  body?: string | undefined
                  html?: string | undefined
                  variables?: { [x: string]: string } | undefined
                  data?: { [x: string]: unknown } | undefined
                  priority?: 'low' | 'normal' | 'high' | undefined
                  scheduledAt?: string | undefined
                }[]
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/messages/:messageId': {
      $get:
        | {
            input: { param: { messageId: string } }
            output: {
              id: string
              channel: 'email' | 'sms' | 'push' | 'in_app'
              to?: string | undefined
              status:
                | 'queued'
                | 'sending'
                | 'sent'
                | 'delivered'
                | 'opened'
                | 'clicked'
                | 'bounced'
                | 'failed'
              error?: string | undefined
              createdAt: string
              sentAt?: string | undefined
              deliveredAt?: string | undefined
              openedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { messageId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { messageId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/templates': {
      $get:
        | {
            input: {
              query: {
                channel?: 'email' | 'sms' | 'push' | 'in_app' | undefined
                search?: string | undefined
              }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              channel: 'email' | 'sms' | 'push' | 'in_app'
              subject?: string | undefined
              body?: string | undefined
              html?: string | undefined
              variables?:
                | {
                    name?: string | undefined
                    required?: boolean | undefined
                    default?: string | undefined
                  }[]
                | undefined
              active?: boolean | undefined
              createdAt: string
              updatedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                channel?: 'email' | 'sms' | 'push' | 'in_app' | undefined
                search?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $post:
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                channel: 'email' | 'sms' | 'push' | 'in_app'
                subject?: string | undefined
                body: string
                html?: string | undefined
                variables?:
                  | { name: string; required?: boolean | undefined; default?: string | undefined }[]
                  | undefined
              }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              channel: 'email' | 'sms' | 'push' | 'in_app'
              subject?: string | undefined
              body?: string | undefined
              html?: string | undefined
              variables?:
                | {
                    name?: string | undefined
                    required?: boolean | undefined
                    default?: string | undefined
                  }[]
                | undefined
              active?: boolean | undefined
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                channel: 'email' | 'sms' | 'push' | 'in_app'
                subject?: string | undefined
                body: string
                html?: string | undefined
                variables?:
                  | { name: string; required?: boolean | undefined; default?: string | undefined }[]
                  | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                channel: 'email' | 'sms' | 'push' | 'in_app'
                subject?: string | undefined
                body: string
                html?: string | undefined
                variables?:
                  | { name: string; required?: boolean | undefined; default?: string | undefined }[]
                  | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/templates/:templateId': {
      $get:
        | {
            input: { param: { templateId: string } }
            output: {
              id: string
              name: string
              description?: string | undefined
              channel: 'email' | 'sms' | 'push' | 'in_app'
              subject?: string | undefined
              body?: string | undefined
              html?: string | undefined
              variables?:
                | {
                    name?: string | undefined
                    required?: boolean | undefined
                    default?: string | undefined
                  }[]
                | undefined
              active?: boolean | undefined
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { templateId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { templateId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
      $put:
        | {
            input: { param: { templateId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                subject?: string | undefined
                body?: string | undefined
                html?: string | undefined
                variables?:
                  | { name: string; required?: boolean | undefined; default?: string | undefined }[]
                  | undefined
                active?: boolean | undefined
              }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              channel: 'email' | 'sms' | 'push' | 'in_app'
              subject?: string | undefined
              body?: string | undefined
              html?: string | undefined
              variables?:
                | {
                    name?: string | undefined
                    required?: boolean | undefined
                    default?: string | undefined
                  }[]
                | undefined
              active?: boolean | undefined
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { templateId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                subject?: string | undefined
                body?: string | undefined
                html?: string | undefined
                variables?:
                  | { name: string; required?: boolean | undefined; default?: string | undefined }[]
                  | undefined
                active?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | {
            input: { param: { templateId: string } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { param: { templateId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/templates/:templateId/preview': {
      $post:
        | {
            input: { param: { templateId: string } } & {
              json: { variables?: { [x: string]: string } | undefined }
            }
            output: {
              subject?: string | undefined
              body?: string | undefined
              html?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { templateId: string } } & {
              json: { variables?: { [x: string]: string } | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/channels/preferences': {
      $get:
        | {
            input: {}
            output: {
              email?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              sms?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              push?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              inApp?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $put:
        | {
            input: {
              json: {
                email?:
                  | {
                      enabled?: boolean | undefined
                      categories?: { [x: string]: boolean } | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                sms?:
                  | {
                      enabled?: boolean | undefined
                      categories?: { [x: string]: boolean } | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                push?:
                  | {
                      enabled?: boolean | undefined
                      categories?: { [x: string]: boolean } | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                inApp?:
                  | {
                      enabled?: boolean | undefined
                      categories?: { [x: string]: boolean } | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            }
            output: {
              email?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              sms?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              push?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              inApp?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                email?:
                  | {
                      enabled?: boolean | undefined
                      categories?: { [x: string]: boolean } | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                sms?:
                  | {
                      enabled?: boolean | undefined
                      categories?: { [x: string]: boolean } | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                push?:
                  | {
                      enabled?: boolean | undefined
                      categories?: { [x: string]: boolean } | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                inApp?:
                  | {
                      enabled?: boolean | undefined
                      categories?: { [x: string]: boolean } | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/channels/devices': {
      $get:
        | {
            input: {}
            output: {
              id: string
              platform: 'ios' | 'android' | 'web'
              token: string
              name?: string | undefined
              model?: string | undefined
              osVersion?: string | undefined
              appVersion?: string | undefined
              lastActiveAt?: string | undefined
              createdAt: string
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $post:
        | {
            input: {
              json: {
                platform: 'ios' | 'android' | 'web'
                token: string
                name?: string | undefined
                model?: string | undefined
                osVersion?: string | undefined
                appVersion?: string | undefined
              }
            }
            output: {
              id: string
              platform: 'ios' | 'android' | 'web'
              token: string
              name?: string | undefined
              model?: string | undefined
              osVersion?: string | undefined
              appVersion?: string | undefined
              lastActiveAt?: string | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                platform: 'ios' | 'android' | 'web'
                token: string
                name?: string | undefined
                model?: string | undefined
                osVersion?: string | undefined
                appVersion?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/channels/devices/:deviceId': {
      $delete:
        | { input: { param: { deviceId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { deviceId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/webhooks': {
      $get:
        | {
            input: {}
            output: {
              id: string
              name?: string | undefined
              url: string
              events: (
                | 'message.sent'
                | 'message.delivered'
                | 'message.failed'
                | 'message.opened'
                | 'message.clicked'
                | 'message.bounced'
              )[]
              secret?: string | undefined
              active: boolean
              headers?: { [x: string]: string } | undefined
              createdAt: string
              updatedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $post:
        | {
            input: {
              json: {
                name?: string | undefined
                url: string
                events: (
                  | 'message.sent'
                  | 'message.delivered'
                  | 'message.failed'
                  | 'message.opened'
                  | 'message.clicked'
                  | 'message.bounced'
                )[]
                headers?: { [x: string]: string } | undefined
              }
            }
            output: {
              id: string
              name?: string | undefined
              url: string
              events: (
                | 'message.sent'
                | 'message.delivered'
                | 'message.failed'
                | 'message.opened'
                | 'message.clicked'
                | 'message.bounced'
              )[]
              secret?: string | undefined
              active: boolean
              headers?: { [x: string]: string } | undefined
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                name?: string | undefined
                url: string
                events: (
                  | 'message.sent'
                  | 'message.delivered'
                  | 'message.failed'
                  | 'message.opened'
                  | 'message.clicked'
                  | 'message.bounced'
                )[]
                headers?: { [x: string]: string } | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/webhooks/:webhookId': {
      $get:
        | {
            input: { param: { webhookId: string } }
            output: {
              id: string
              name?: string | undefined
              url: string
              events: (
                | 'message.sent'
                | 'message.delivered'
                | 'message.failed'
                | 'message.opened'
                | 'message.clicked'
                | 'message.bounced'
              )[]
              secret?: string | undefined
              active: boolean
              headers?: { [x: string]: string } | undefined
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { webhookId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { webhookId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
      $put:
        | {
            input: { param: { webhookId: string } } & {
              json: {
                name?: string | undefined
                url?: string | undefined
                events?:
                  | (
                      | 'message.sent'
                      | 'message.delivered'
                      | 'message.failed'
                      | 'message.opened'
                      | 'message.clicked'
                      | 'message.bounced'
                    )[]
                  | undefined
                active?: boolean | undefined
                headers?: { [x: string]: string } | undefined
              }
            }
            output: {
              id: string
              name?: string | undefined
              url: string
              events: (
                | 'message.sent'
                | 'message.delivered'
                | 'message.failed'
                | 'message.opened'
                | 'message.clicked'
                | 'message.bounced'
              )[]
              secret?: string | undefined
              active: boolean
              headers?: { [x: string]: string } | undefined
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { webhookId: string } } & {
              json: {
                name?: string | undefined
                url?: string | undefined
                events?:
                  | (
                      | 'message.sent'
                      | 'message.delivered'
                      | 'message.failed'
                      | 'message.opened'
                      | 'message.clicked'
                      | 'message.bounced'
                    )[]
                  | undefined
                active?: boolean | undefined
                headers?: { [x: string]: string } | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | { input: { param: { webhookId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { webhookId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/webhooks/:webhookId/test': {
      $post:
        | {
            input: { param: { webhookId: string } }
            output: {
              success?: boolean | undefined
              statusCode?: number | undefined
              responseTime?: number | undefined
              error?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { webhookId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  },
  '/'
>
export default routes
