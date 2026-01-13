declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/messages': {
      $post: {
        input: {
          json:
            | {
                id: string
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?: string | undefined
                updatedBy?: string | undefined
                version?: number | undefined
                etag?: string | undefined
                type: 'text'
                sender: { id: string; name: string; avatar?: string | undefined }
                recipient: { id: string; name: string; avatar?: string | undefined }
                metadata?:
                  | {
                      priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                      expiresAt?: string | undefined
                      replyTo?: unknown | undefined
                    }
                  | undefined
                content: string
                formatting?:
                  | {
                      bold?: { start: number; end: number }[] | undefined
                      italic?: { start: number; end: number }[] | undefined
                      links?: { start: number; end: number; url: string }[] | undefined
                    }
                  | undefined
              }
            | {
                id: string
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?: string | undefined
                updatedBy?: string | undefined
                version?: number | undefined
                etag?: string | undefined
                type: 'image'
                sender: { id: string; name: string; avatar?: string | undefined }
                recipient: { id: string; name: string; avatar?: string | undefined }
                metadata?:
                  | {
                      priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                      expiresAt?: string | undefined
                      replyTo?: unknown | undefined
                    }
                  | undefined
                url: string
                mimeType: string
                size: number
                checksum?: string | undefined
                dimensions?: { width: number; height: number } | undefined
                alt?: string | undefined
              }
            | {
                id: string
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?: string | undefined
                updatedBy?: string | undefined
                version?: number | undefined
                etag?: string | undefined
                type: 'video'
                sender: { id: string; name: string; avatar?: string | undefined }
                recipient: { id: string; name: string; avatar?: string | undefined }
                metadata?:
                  | {
                      priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                      expiresAt?: string | undefined
                      replyTo?: unknown | undefined
                    }
                  | undefined
                url: string
                mimeType: string
                size: number
                checksum?: string | undefined
                duration?: number | undefined
                thumbnail?:
                  | {
                      id: string
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      createdBy?: string | undefined
                      updatedBy?: string | undefined
                      version?: number | undefined
                      etag?: string | undefined
                      type: 'image'
                      sender: { id: string; name: string; avatar?: string | undefined }
                      recipient: { id: string; name: string; avatar?: string | undefined }
                      metadata?:
                        | {
                            priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                            expiresAt?: string | undefined
                            replyTo?: unknown | undefined
                          }
                        | undefined
                      url: string
                      mimeType: string
                      size: number
                      checksum?: string | undefined
                      dimensions?: { width: number; height: number } | undefined
                      alt?: string | undefined
                    }
                  | undefined
              }
            | {
                id: string
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?: string | undefined
                updatedBy?: string | undefined
                version?: number | undefined
                etag?: string | undefined
                type: 'document'
                sender: { id: string; name: string; avatar?: string | undefined }
                recipient: { id: string; name: string; avatar?: string | undefined }
                metadata?:
                  | {
                      priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                      expiresAt?: string | undefined
                      replyTo?: unknown | undefined
                    }
                  | undefined
                url: string
                mimeType: string
                size: number
                checksum?: string | undefined
                pageCount?: number | undefined
                preview?:
                  | {
                      id: string
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      createdBy?: string | undefined
                      updatedBy?: string | undefined
                      version?: number | undefined
                      etag?: string | undefined
                      type: 'image'
                      sender: { id: string; name: string; avatar?: string | undefined }
                      recipient: { id: string; name: string; avatar?: string | undefined }
                      metadata?:
                        | {
                            priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                            expiresAt?: string | undefined
                            replyTo?: unknown | undefined
                          }
                        | undefined
                      url: string
                      mimeType: string
                      size: number
                      checksum?: string | undefined
                      dimensions?: { width: number; height: number } | undefined
                      alt?: string | undefined
                    }
                  | undefined
              }
            | {
                id: string
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?: string | undefined
                updatedBy?: string | undefined
                version?: number | undefined
                etag?: string | undefined
                type: 'composite'
                sender: { id: string; name: string; avatar?: string | undefined }
                recipient: { id: string; name: string; avatar?: string | undefined }
                metadata?:
                  | {
                      priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                      expiresAt?: string | undefined
                      replyTo?: unknown | undefined
                    }
                  | undefined
                parts: unknown[]
              }
        }
        output: {
          deliveryStatus?:
            | {
                sent?: boolean | undefined
                delivered?: boolean | undefined
                read?: boolean | undefined
                timestamps?:
                  | {
                      sentAt?: string | undefined
                      deliveredAt?: string | undefined
                      readAt?: string | undefined
                    }
                  | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/events': {
      $post: {
        input: {
          json: {
            eventType: string
            payload:
              | {
                  timestamp?: string | undefined
                  source?: string | undefined
                  correlationId?: string | undefined
                  userId: string
                  userAction?: 'login' | 'logout' | 'register' | 'update' | 'delete' | undefined
                  previousState?:
                    | {
                        status?: string | undefined
                        roles?: string[] | undefined
                        preferences?: { [x: string]: unknown } | undefined
                      }
                    | undefined
                  newState?:
                    | {
                        status?: string | undefined
                        roles?: string[] | undefined
                        preferences?: { [x: string]: unknown } | undefined
                      }
                    | undefined
                }
              | {
                  timestamp?: string | undefined
                  source?: string | undefined
                  correlationId?: string | undefined
                  orderId: string
                  orderAction?: 'created' | 'updated' | 'cancelled' | 'completed' | undefined
                  items?:
                    | { productId: string; quantity: number; price?: number | undefined }[]
                    | undefined
                }
              | {
                  timestamp?: string | undefined
                  source?: string | undefined
                  correlationId?: string | undefined
                  component: string
                  severity: 'info' | 'warning' | 'error' | 'critical'
                  metrics?: { [x: string]: number } | undefined
                }
              | {
                  timestamp?: string | undefined
                  source?: string | undefined
                  correlationId?: string | undefined
                  customType?: string | undefined
                  data?: { [x: string]: unknown } | undefined
                }
            context?:
              | {
                  userAgent?: string | undefined
                  referrer?: string | undefined
                  sessionId?: string | undefined
                }
              | {
                  deviceId?: string | undefined
                  platform?: 'ios' | 'android' | undefined
                  appVersion?: string | undefined
                }
              | {
                  apiKey?: string | undefined
                  clientId?: string | undefined
                  ipAddress?: string | undefined
                }
              | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/configs': {
      $get: {
        input: {}
        output: {
          id: string
          createdAt?: string | undefined
          updatedAt?: string | undefined
          createdBy?: string | undefined
          updatedBy?: string | undefined
          version?: number | undefined
          etag?: string | undefined
          settings: {
            general?:
              | {
                  enabled?: boolean | undefined
                  description?: string | undefined
                  environment?: string | undefined
                  debug?: boolean | undefined
                  logLevel?: string | undefined
                }
              | undefined
            features?:
              | { enabled?: boolean | undefined; description?: string | undefined }
              | undefined
            limits?: { enabled?: boolean | undefined; description?: string | undefined } | undefined
          }
          overrides?:
            | { [x: string]: string | number | boolean | unknown[] | { [x: string]: unknown } }
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $put: {
        input: {
          json: {
            settings?:
              | {
                  general?:
                    | {
                        enabled?: boolean | undefined
                        description?: string | undefined
                        environment?: string | undefined
                        debug?: boolean | undefined
                        logLevel?: string | undefined
                      }
                    | undefined
                  features?:
                    | { enabled?: boolean | undefined; description?: string | undefined }
                    | undefined
                  limits?:
                    | { enabled?: boolean | undefined; description?: string | undefined }
                    | undefined
                }
              | undefined
            overrides?:
              | { [x: string]: string | number | boolean | unknown[] | { [x: string]: unknown } }
              | undefined
            version?: number | undefined
            etag?: string | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/resources': {
      $post: {
        input: {
          json:
            | {
                id: string
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?: string | undefined
                updatedBy?: string | undefined
                version?: number | undefined
                etag?: string | undefined
                name: string
                description?: string | undefined
                tags?: string[] | undefined
                resourceType: 'compute'
                status: {
                  state:
                    | 'pending'
                    | 'provisioning'
                    | 'running'
                    | 'stopped'
                    | 'failed'
                    | 'terminated'
                  health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                  lastChecked?: string | undefined
                }
                dependencies?:
                  | { resourceId: string; type: 'hard' | 'soft'; resource?: unknown | undefined }[]
                  | undefined
                cost?:
                  | {
                      hourly?: number | undefined
                      monthly?: number | undefined
                      currency?: string | undefined
                    }
                  | undefined
                cpu: { cores: number; architecture?: string | undefined }
                memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                storage?:
                  | {
                      id: string
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      createdBy?: string | undefined
                      updatedBy?: string | undefined
                      version?: number | undefined
                      etag?: string | undefined
                      name: string
                      description?: string | undefined
                      tags?: string[] | undefined
                      resourceType: 'storage'
                      status: {
                        state:
                          | 'pending'
                          | 'provisioning'
                          | 'running'
                          | 'stopped'
                          | 'failed'
                          | 'terminated'
                        health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                        lastChecked?: string | undefined
                      }
                      dependencies?:
                        | {
                            resourceId: string
                            type: 'hard' | 'soft'
                            resource?: unknown | undefined
                          }[]
                        | undefined
                      cost?:
                        | {
                            hourly?: number | undefined
                            monthly?: number | undefined
                            currency?: string | undefined
                          }
                        | undefined
                      size: number
                      storageType: 'ssd' | 'hdd' | 'nvme'
                      iops?: number | undefined
                      attachedTo?: unknown | undefined
                    }[]
                  | undefined
              }
            | {
                id: string
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?: string | undefined
                updatedBy?: string | undefined
                version?: number | undefined
                etag?: string | undefined
                name: string
                description?: string | undefined
                tags?: string[] | undefined
                resourceType: 'storage'
                status: {
                  state:
                    | 'pending'
                    | 'provisioning'
                    | 'running'
                    | 'stopped'
                    | 'failed'
                    | 'terminated'
                  health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                  lastChecked?: string | undefined
                }
                dependencies?:
                  | { resourceId: string; type: 'hard' | 'soft'; resource?: unknown | undefined }[]
                  | undefined
                cost?:
                  | {
                      hourly?: number | undefined
                      monthly?: number | undefined
                      currency?: string | undefined
                    }
                  | undefined
                size: number
                storageType: 'ssd' | 'hdd' | 'nvme'
                iops?: number | undefined
                attachedTo?:
                  | {
                      id: string
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      createdBy?: string | undefined
                      updatedBy?: string | undefined
                      version?: number | undefined
                      etag?: string | undefined
                      name: string
                      description?: string | undefined
                      tags?: string[] | undefined
                      resourceType: 'compute'
                      status: {
                        state:
                          | 'pending'
                          | 'provisioning'
                          | 'running'
                          | 'stopped'
                          | 'failed'
                          | 'terminated'
                        health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                        lastChecked?: string | undefined
                      }
                      dependencies?:
                        | {
                            resourceId: string
                            type: 'hard' | 'soft'
                            resource?: unknown | undefined
                          }[]
                        | undefined
                      cost?:
                        | {
                            hourly?: number | undefined
                            monthly?: number | undefined
                            currency?: string | undefined
                          }
                        | undefined
                      cpu: { cores: number; architecture?: string | undefined }
                      memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                      storage?: unknown[] | undefined
                    }
                  | undefined
              }
            | {
                id: string
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?: string | undefined
                updatedBy?: string | undefined
                version?: number | undefined
                etag?: string | undefined
                name: string
                description?: string | undefined
                tags?: string[] | undefined
                resourceType: 'network'
                status: {
                  state:
                    | 'pending'
                    | 'provisioning'
                    | 'running'
                    | 'stopped'
                    | 'failed'
                    | 'terminated'
                  health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                  lastChecked?: string | undefined
                }
                dependencies?:
                  | { resourceId: string; type: 'hard' | 'soft'; resource?: unknown | undefined }[]
                  | undefined
                cost?:
                  | {
                      hourly?: number | undefined
                      monthly?: number | undefined
                      currency?: string | undefined
                    }
                  | undefined
                cidr: string
                subnets?: unknown[] | undefined
                parentNetwork?: unknown | undefined
                connectedResources?:
                  | (
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'compute'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?:
                            | {
                                resourceId: string
                                type: 'hard' | 'soft'
                                resource?: unknown | undefined
                              }[]
                            | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          cpu: { cores: number; architecture?: string | undefined }
                          memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                          storage?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'storage'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | 'unknown'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?:
                                  | {
                                      resourceId: string
                                      type: 'hard' | 'soft'
                                      resource?: unknown | undefined
                                    }[]
                                  | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                size: number
                                storageType: 'ssd' | 'hdd' | 'nvme'
                                iops?: number | undefined
                                attachedTo?: unknown | undefined
                              }[]
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'storage'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?:
                            | {
                                resourceId: string
                                type: 'hard' | 'soft'
                                resource?: unknown | undefined
                              }[]
                            | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          size: number
                          storageType: 'ssd' | 'hdd' | 'nvme'
                          iops?: number | undefined
                          attachedTo?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'compute'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | 'unknown'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?:
                                  | {
                                      resourceId: string
                                      type: 'hard' | 'soft'
                                      resource?: unknown | undefined
                                    }[]
                                  | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cpu: { cores: number; architecture?: string | undefined }
                                memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                storage?: unknown[] | undefined
                              }
                            | undefined
                        }
                    )[]
                  | undefined
              }
            | {
                id: string
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?: string | undefined
                updatedBy?: string | undefined
                version?: number | undefined
                etag?: string | undefined
                name: string
                description?: string | undefined
                tags?: string[] | undefined
                resourceType: 'composite'
                status: {
                  state:
                    | 'pending'
                    | 'provisioning'
                    | 'running'
                    | 'stopped'
                    | 'failed'
                    | 'terminated'
                  health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                  lastChecked?: string | undefined
                }
                dependencies?:
                  | { resourceId: string; type: 'hard' | 'soft'; resource?: unknown | undefined }[]
                  | undefined
                cost?:
                  | {
                      hourly?: number | undefined
                      monthly?: number | undefined
                      currency?: string | undefined
                    }
                  | undefined
                components: unknown[]
                template?:
                  | {
                      name?: string | undefined
                      version?: string | undefined
                      parameters?:
                        | {
                            [x: string]:
                              | string
                              | number
                              | boolean
                              | unknown[]
                              | { [x: string]: unknown }
                          }
                        | undefined
                    }
                  | undefined
              }
        }
        output:
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              name: string
              description?: string | undefined
              tags?: string[] | undefined
              resourceType: 'compute'
              status: {
                state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
                health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                lastChecked?: string | undefined
              }
              dependencies?:
                | { resourceId: string; type: 'hard' | 'soft'; resource?: unknown | undefined }[]
                | undefined
              cost?:
                | {
                    hourly?: number | undefined
                    monthly?: number | undefined
                    currency?: string | undefined
                  }
                | undefined
              cpu: { cores: number; architecture?: string | undefined }
              memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
              storage?:
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    name: string
                    description?: string | undefined
                    tags?: string[] | undefined
                    resourceType: 'storage'
                    status: {
                      state:
                        | 'pending'
                        | 'provisioning'
                        | 'running'
                        | 'stopped'
                        | 'failed'
                        | 'terminated'
                      health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                      lastChecked?: string | undefined
                    }
                    dependencies?:
                      | {
                          resourceId: string
                          type: 'hard' | 'soft'
                          resource?: unknown | undefined
                        }[]
                      | undefined
                    cost?:
                      | {
                          hourly?: number | undefined
                          monthly?: number | undefined
                          currency?: string | undefined
                        }
                      | undefined
                    size: number
                    storageType: 'ssd' | 'hdd' | 'nvme'
                    iops?: number | undefined
                    attachedTo?: unknown | undefined
                  }[]
                | undefined
            }
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              name: string
              description?: string | undefined
              tags?: string[] | undefined
              resourceType: 'storage'
              status: {
                state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
                health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                lastChecked?: string | undefined
              }
              dependencies?:
                | { resourceId: string; type: 'hard' | 'soft'; resource?: unknown | undefined }[]
                | undefined
              cost?:
                | {
                    hourly?: number | undefined
                    monthly?: number | undefined
                    currency?: string | undefined
                  }
                | undefined
              size: number
              storageType: 'ssd' | 'hdd' | 'nvme'
              iops?: number | undefined
              attachedTo?:
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    name: string
                    description?: string | undefined
                    tags?: string[] | undefined
                    resourceType: 'compute'
                    status: {
                      state:
                        | 'pending'
                        | 'provisioning'
                        | 'running'
                        | 'stopped'
                        | 'failed'
                        | 'terminated'
                      health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                      lastChecked?: string | undefined
                    }
                    dependencies?:
                      | {
                          resourceId: string
                          type: 'hard' | 'soft'
                          resource?: unknown | undefined
                        }[]
                      | undefined
                    cost?:
                      | {
                          hourly?: number | undefined
                          monthly?: number | undefined
                          currency?: string | undefined
                        }
                      | undefined
                    cpu: { cores: number; architecture?: string | undefined }
                    memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                    storage?: unknown[] | undefined
                  }
                | undefined
            }
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              name: string
              description?: string | undefined
              tags?: string[] | undefined
              resourceType: 'network'
              status: {
                state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
                health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                lastChecked?: string | undefined
              }
              dependencies?:
                | { resourceId: string; type: 'hard' | 'soft'; resource?: unknown | undefined }[]
                | undefined
              cost?:
                | {
                    hourly?: number | undefined
                    monthly?: number | undefined
                    currency?: string | undefined
                  }
                | undefined
              cidr: string
              subnets?: unknown[] | undefined
              parentNetwork?: unknown | undefined
              connectedResources?:
                | (
                    | {
                        id: string
                        createdAt?: string | undefined
                        updatedAt?: string | undefined
                        createdBy?: string | undefined
                        updatedBy?: string | undefined
                        version?: number | undefined
                        etag?: string | undefined
                        name: string
                        description?: string | undefined
                        tags?: string[] | undefined
                        resourceType: 'compute'
                        status: {
                          state:
                            | 'pending'
                            | 'provisioning'
                            | 'running'
                            | 'stopped'
                            | 'failed'
                            | 'terminated'
                          health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                          lastChecked?: string | undefined
                        }
                        dependencies?:
                          | {
                              resourceId: string
                              type: 'hard' | 'soft'
                              resource?: unknown | undefined
                            }[]
                          | undefined
                        cost?:
                          | {
                              hourly?: number | undefined
                              monthly?: number | undefined
                              currency?: string | undefined
                            }
                          | undefined
                        cpu: { cores: number; architecture?: string | undefined }
                        memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                        storage?:
                          | {
                              id: string
                              createdAt?: string | undefined
                              updatedAt?: string | undefined
                              createdBy?: string | undefined
                              updatedBy?: string | undefined
                              version?: number | undefined
                              etag?: string | undefined
                              name: string
                              description?: string | undefined
                              tags?: string[] | undefined
                              resourceType: 'storage'
                              status: {
                                state:
                                  | 'pending'
                                  | 'provisioning'
                                  | 'running'
                                  | 'stopped'
                                  | 'failed'
                                  | 'terminated'
                                health?:
                                  | 'healthy'
                                  | 'degraded'
                                  | 'unhealthy'
                                  | 'unknown'
                                  | undefined
                                lastChecked?: string | undefined
                              }
                              dependencies?:
                                | {
                                    resourceId: string
                                    type: 'hard' | 'soft'
                                    resource?: unknown | undefined
                                  }[]
                                | undefined
                              cost?:
                                | {
                                    hourly?: number | undefined
                                    monthly?: number | undefined
                                    currency?: string | undefined
                                  }
                                | undefined
                              size: number
                              storageType: 'ssd' | 'hdd' | 'nvme'
                              iops?: number | undefined
                              attachedTo?: unknown | undefined
                            }[]
                          | undefined
                      }
                    | {
                        id: string
                        createdAt?: string | undefined
                        updatedAt?: string | undefined
                        createdBy?: string | undefined
                        updatedBy?: string | undefined
                        version?: number | undefined
                        etag?: string | undefined
                        name: string
                        description?: string | undefined
                        tags?: string[] | undefined
                        resourceType: 'storage'
                        status: {
                          state:
                            | 'pending'
                            | 'provisioning'
                            | 'running'
                            | 'stopped'
                            | 'failed'
                            | 'terminated'
                          health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                          lastChecked?: string | undefined
                        }
                        dependencies?:
                          | {
                              resourceId: string
                              type: 'hard' | 'soft'
                              resource?: unknown | undefined
                            }[]
                          | undefined
                        cost?:
                          | {
                              hourly?: number | undefined
                              monthly?: number | undefined
                              currency?: string | undefined
                            }
                          | undefined
                        size: number
                        storageType: 'ssd' | 'hdd' | 'nvme'
                        iops?: number | undefined
                        attachedTo?:
                          | {
                              id: string
                              createdAt?: string | undefined
                              updatedAt?: string | undefined
                              createdBy?: string | undefined
                              updatedBy?: string | undefined
                              version?: number | undefined
                              etag?: string | undefined
                              name: string
                              description?: string | undefined
                              tags?: string[] | undefined
                              resourceType: 'compute'
                              status: {
                                state:
                                  | 'pending'
                                  | 'provisioning'
                                  | 'running'
                                  | 'stopped'
                                  | 'failed'
                                  | 'terminated'
                                health?:
                                  | 'healthy'
                                  | 'degraded'
                                  | 'unhealthy'
                                  | 'unknown'
                                  | undefined
                                lastChecked?: string | undefined
                              }
                              dependencies?:
                                | {
                                    resourceId: string
                                    type: 'hard' | 'soft'
                                    resource?: unknown | undefined
                                  }[]
                                | undefined
                              cost?:
                                | {
                                    hourly?: number | undefined
                                    monthly?: number | undefined
                                    currency?: string | undefined
                                  }
                                | undefined
                              cpu: { cores: number; architecture?: string | undefined }
                              memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                              storage?: unknown[] | undefined
                            }
                          | undefined
                      }
                  )[]
                | undefined
            }
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              name: string
              description?: string | undefined
              tags?: string[] | undefined
              resourceType: 'composite'
              status: {
                state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
                health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                lastChecked?: string | undefined
              }
              dependencies?:
                | { resourceId: string; type: 'hard' | 'soft'; resource?: unknown | undefined }[]
                | undefined
              cost?:
                | {
                    hourly?: number | undefined
                    monthly?: number | undefined
                    currency?: string | undefined
                  }
                | undefined
              components: unknown[]
              template?:
                | {
                    name?: string | undefined
                    version?: string | undefined
                    parameters?:
                      | {
                          [x: string]:
                            | string
                            | number
                            | boolean
                            | unknown[]
                            | { [x: string]: unknown }
                        }
                      | undefined
                  }
                | undefined
            }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/validations': {
      $post: {
        input: {
          json: {
            target:
              | {
                  id: string
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  createdBy?: string | undefined
                  updatedBy?: string | undefined
                  version?: number | undefined
                  etag?: string | undefined
                  name: string
                  description?: string | undefined
                  tags?: string[] | undefined
                  resourceType: 'compute'
                  status: {
                    state:
                      | 'pending'
                      | 'provisioning'
                      | 'running'
                      | 'stopped'
                      | 'failed'
                      | 'terminated'
                    health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                    lastChecked?: string | undefined
                  }
                  dependencies?:
                    | {
                        resourceId: string
                        type: 'hard' | 'soft'
                        resource?: unknown | undefined
                      }[]
                    | undefined
                  cost?:
                    | {
                        hourly?: number | undefined
                        monthly?: number | undefined
                        currency?: string | undefined
                      }
                    | undefined
                  cpu: { cores: number; architecture?: string | undefined }
                  memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                  storage?:
                    | {
                        id: string
                        createdAt?: string | undefined
                        updatedAt?: string | undefined
                        createdBy?: string | undefined
                        updatedBy?: string | undefined
                        version?: number | undefined
                        etag?: string | undefined
                        name: string
                        description?: string | undefined
                        tags?: string[] | undefined
                        resourceType: 'storage'
                        status: {
                          state:
                            | 'pending'
                            | 'provisioning'
                            | 'running'
                            | 'stopped'
                            | 'failed'
                            | 'terminated'
                          health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                          lastChecked?: string | undefined
                        }
                        dependencies?:
                          | {
                              resourceId: string
                              type: 'hard' | 'soft'
                              resource?: unknown | undefined
                            }[]
                          | undefined
                        cost?:
                          | {
                              hourly?: number | undefined
                              monthly?: number | undefined
                              currency?: string | undefined
                            }
                          | undefined
                        size: number
                        storageType: 'ssd' | 'hdd' | 'nvme'
                        iops?: number | undefined
                        attachedTo?: unknown | undefined
                      }[]
                    | undefined
                }
              | {
                  id: string
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  createdBy?: string | undefined
                  updatedBy?: string | undefined
                  version?: number | undefined
                  etag?: string | undefined
                  name: string
                  description?: string | undefined
                  tags?: string[] | undefined
                  resourceType: 'storage'
                  status: {
                    state:
                      | 'pending'
                      | 'provisioning'
                      | 'running'
                      | 'stopped'
                      | 'failed'
                      | 'terminated'
                    health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                    lastChecked?: string | undefined
                  }
                  dependencies?:
                    | {
                        resourceId: string
                        type: 'hard' | 'soft'
                        resource?: unknown | undefined
                      }[]
                    | undefined
                  cost?:
                    | {
                        hourly?: number | undefined
                        monthly?: number | undefined
                        currency?: string | undefined
                      }
                    | undefined
                  size: number
                  storageType: 'ssd' | 'hdd' | 'nvme'
                  iops?: number | undefined
                  attachedTo?:
                    | {
                        id: string
                        createdAt?: string | undefined
                        updatedAt?: string | undefined
                        createdBy?: string | undefined
                        updatedBy?: string | undefined
                        version?: number | undefined
                        etag?: string | undefined
                        name: string
                        description?: string | undefined
                        tags?: string[] | undefined
                        resourceType: 'compute'
                        status: {
                          state:
                            | 'pending'
                            | 'provisioning'
                            | 'running'
                            | 'stopped'
                            | 'failed'
                            | 'terminated'
                          health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                          lastChecked?: string | undefined
                        }
                        dependencies?:
                          | {
                              resourceId: string
                              type: 'hard' | 'soft'
                              resource?: unknown | undefined
                            }[]
                          | undefined
                        cost?:
                          | {
                              hourly?: number | undefined
                              monthly?: number | undefined
                              currency?: string | undefined
                            }
                          | undefined
                        cpu: { cores: number; architecture?: string | undefined }
                        memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                        storage?: unknown[] | undefined
                      }
                    | undefined
                }
              | {
                  id: string
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  createdBy?: string | undefined
                  updatedBy?: string | undefined
                  version?: number | undefined
                  etag?: string | undefined
                  name: string
                  description?: string | undefined
                  tags?: string[] | undefined
                  resourceType: 'network'
                  status: {
                    state:
                      | 'pending'
                      | 'provisioning'
                      | 'running'
                      | 'stopped'
                      | 'failed'
                      | 'terminated'
                    health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                    lastChecked?: string | undefined
                  }
                  dependencies?:
                    | {
                        resourceId: string
                        type: 'hard' | 'soft'
                        resource?: unknown | undefined
                      }[]
                    | undefined
                  cost?:
                    | {
                        hourly?: number | undefined
                        monthly?: number | undefined
                        currency?: string | undefined
                      }
                    | undefined
                  cidr: string
                  subnets?: unknown[] | undefined
                  parentNetwork?: unknown | undefined
                  connectedResources?:
                    | (
                        | {
                            id: string
                            createdAt?: string | undefined
                            updatedAt?: string | undefined
                            createdBy?: string | undefined
                            updatedBy?: string | undefined
                            version?: number | undefined
                            etag?: string | undefined
                            name: string
                            description?: string | undefined
                            tags?: string[] | undefined
                            resourceType: 'compute'
                            status: {
                              state:
                                | 'pending'
                                | 'provisioning'
                                | 'running'
                                | 'stopped'
                                | 'failed'
                                | 'terminated'
                              health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                              lastChecked?: string | undefined
                            }
                            dependencies?:
                              | {
                                  resourceId: string
                                  type: 'hard' | 'soft'
                                  resource?: unknown | undefined
                                }[]
                              | undefined
                            cost?:
                              | {
                                  hourly?: number | undefined
                                  monthly?: number | undefined
                                  currency?: string | undefined
                                }
                              | undefined
                            cpu: { cores: number; architecture?: string | undefined }
                            memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                            storage?:
                              | {
                                  id: string
                                  createdAt?: string | undefined
                                  updatedAt?: string | undefined
                                  createdBy?: string | undefined
                                  updatedBy?: string | undefined
                                  version?: number | undefined
                                  etag?: string | undefined
                                  name: string
                                  description?: string | undefined
                                  tags?: string[] | undefined
                                  resourceType: 'storage'
                                  status: {
                                    state:
                                      | 'pending'
                                      | 'provisioning'
                                      | 'running'
                                      | 'stopped'
                                      | 'failed'
                                      | 'terminated'
                                    health?:
                                      | 'healthy'
                                      | 'degraded'
                                      | 'unhealthy'
                                      | 'unknown'
                                      | undefined
                                    lastChecked?: string | undefined
                                  }
                                  dependencies?:
                                    | {
                                        resourceId: string
                                        type: 'hard' | 'soft'
                                        resource?: unknown | undefined
                                      }[]
                                    | undefined
                                  cost?:
                                    | {
                                        hourly?: number | undefined
                                        monthly?: number | undefined
                                        currency?: string | undefined
                                      }
                                    | undefined
                                  size: number
                                  storageType: 'ssd' | 'hdd' | 'nvme'
                                  iops?: number | undefined
                                  attachedTo?: unknown | undefined
                                }[]
                              | undefined
                          }
                        | {
                            id: string
                            createdAt?: string | undefined
                            updatedAt?: string | undefined
                            createdBy?: string | undefined
                            updatedBy?: string | undefined
                            version?: number | undefined
                            etag?: string | undefined
                            name: string
                            description?: string | undefined
                            tags?: string[] | undefined
                            resourceType: 'storage'
                            status: {
                              state:
                                | 'pending'
                                | 'provisioning'
                                | 'running'
                                | 'stopped'
                                | 'failed'
                                | 'terminated'
                              health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                              lastChecked?: string | undefined
                            }
                            dependencies?:
                              | {
                                  resourceId: string
                                  type: 'hard' | 'soft'
                                  resource?: unknown | undefined
                                }[]
                              | undefined
                            cost?:
                              | {
                                  hourly?: number | undefined
                                  monthly?: number | undefined
                                  currency?: string | undefined
                                }
                              | undefined
                            size: number
                            storageType: 'ssd' | 'hdd' | 'nvme'
                            iops?: number | undefined
                            attachedTo?:
                              | {
                                  id: string
                                  createdAt?: string | undefined
                                  updatedAt?: string | undefined
                                  createdBy?: string | undefined
                                  updatedBy?: string | undefined
                                  version?: number | undefined
                                  etag?: string | undefined
                                  name: string
                                  description?: string | undefined
                                  tags?: string[] | undefined
                                  resourceType: 'compute'
                                  status: {
                                    state:
                                      | 'pending'
                                      | 'provisioning'
                                      | 'running'
                                      | 'stopped'
                                      | 'failed'
                                      | 'terminated'
                                    health?:
                                      | 'healthy'
                                      | 'degraded'
                                      | 'unhealthy'
                                      | 'unknown'
                                      | undefined
                                    lastChecked?: string | undefined
                                  }
                                  dependencies?:
                                    | {
                                        resourceId: string
                                        type: 'hard' | 'soft'
                                        resource?: unknown | undefined
                                      }[]
                                    | undefined
                                  cost?:
                                    | {
                                        hourly?: number | undefined
                                        monthly?: number | undefined
                                        currency?: string | undefined
                                      }
                                    | undefined
                                  cpu: { cores: number; architecture?: string | undefined }
                                  memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                  storage?: unknown[] | undefined
                                }
                              | undefined
                          }
                      )[]
                    | undefined
                }
              | {
                  id: string
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  createdBy?: string | undefined
                  updatedBy?: string | undefined
                  version?: number | undefined
                  etag?: string | undefined
                  name: string
                  description?: string | undefined
                  tags?: string[] | undefined
                  resourceType: 'composite'
                  status: {
                    state:
                      | 'pending'
                      | 'provisioning'
                      | 'running'
                      | 'stopped'
                      | 'failed'
                      | 'terminated'
                    health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown' | undefined
                    lastChecked?: string | undefined
                  }
                  dependencies?:
                    | {
                        resourceId: string
                        type: 'hard' | 'soft'
                        resource?: unknown | undefined
                      }[]
                    | undefined
                  cost?:
                    | {
                        hourly?: number | undefined
                        monthly?: number | undefined
                        currency?: string | undefined
                      }
                    | undefined
                  components: unknown[]
                  template?:
                    | {
                        name?: string | undefined
                        version?: string | undefined
                        parameters?:
                          | {
                              [x: string]:
                                | string
                                | number
                                | boolean
                                | unknown[]
                                | { [x: string]: unknown }
                            }
                          | undefined
                      }
                    | undefined
                }
              | {
                  id: string
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  createdBy?: string | undefined
                  updatedBy?: string | undefined
                  version?: number | undefined
                  etag?: string | undefined
                  settings: {
                    general?:
                      | {
                          enabled?: boolean | undefined
                          description?: string | undefined
                          environment?: string | undefined
                          debug?: boolean | undefined
                          logLevel?: string | undefined
                        }
                      | undefined
                    features?:
                      | { enabled?: boolean | undefined; description?: string | undefined }
                      | undefined
                    limits?:
                      | { enabled?: boolean | undefined; description?: string | undefined }
                      | undefined
                  }
                  overrides?:
                    | {
                        [x: string]:
                          | string
                          | number
                          | boolean
                          | unknown[]
                          | { [x: string]: unknown }
                      }
                    | undefined
                }
              | {
                  id: string
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  createdBy?: string | undefined
                  updatedBy?: string | undefined
                  version?: number | undefined
                  etag?: string | undefined
                  type: 'text'
                  sender: { id: string; name: string; avatar?: string | undefined }
                  recipient: { id: string; name: string; avatar?: string | undefined }
                  metadata?:
                    | {
                        priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                        expiresAt?: string | undefined
                        replyTo?: unknown | undefined
                      }
                    | undefined
                  content: string
                  formatting?:
                    | {
                        bold?: { start: number; end: number }[] | undefined
                        italic?: { start: number; end: number }[] | undefined
                        links?: { start: number; end: number; url: string }[] | undefined
                      }
                    | undefined
                }
              | {
                  id: string
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  createdBy?: string | undefined
                  updatedBy?: string | undefined
                  version?: number | undefined
                  etag?: string | undefined
                  type: 'image'
                  sender: { id: string; name: string; avatar?: string | undefined }
                  recipient: { id: string; name: string; avatar?: string | undefined }
                  metadata?:
                    | {
                        priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                        expiresAt?: string | undefined
                        replyTo?: unknown | undefined
                      }
                    | undefined
                  url: string
                  mimeType: string
                  size: number
                  checksum?: string | undefined
                  dimensions?: { width: number; height: number } | undefined
                  alt?: string | undefined
                }
              | {
                  id: string
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  createdBy?: string | undefined
                  updatedBy?: string | undefined
                  version?: number | undefined
                  etag?: string | undefined
                  type: 'video'
                  sender: { id: string; name: string; avatar?: string | undefined }
                  recipient: { id: string; name: string; avatar?: string | undefined }
                  metadata?:
                    | {
                        priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                        expiresAt?: string | undefined
                        replyTo?: unknown | undefined
                      }
                    | undefined
                  url: string
                  mimeType: string
                  size: number
                  checksum?: string | undefined
                  duration?: number | undefined
                  thumbnail?:
                    | {
                        id: string
                        createdAt?: string | undefined
                        updatedAt?: string | undefined
                        createdBy?: string | undefined
                        updatedBy?: string | undefined
                        version?: number | undefined
                        etag?: string | undefined
                        type: 'image'
                        sender: { id: string; name: string; avatar?: string | undefined }
                        recipient: { id: string; name: string; avatar?: string | undefined }
                        metadata?:
                          | {
                              priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                              expiresAt?: string | undefined
                              replyTo?: unknown | undefined
                            }
                          | undefined
                        url: string
                        mimeType: string
                        size: number
                        checksum?: string | undefined
                        dimensions?: { width: number; height: number } | undefined
                        alt?: string | undefined
                      }
                    | undefined
                }
              | {
                  id: string
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  createdBy?: string | undefined
                  updatedBy?: string | undefined
                  version?: number | undefined
                  etag?: string | undefined
                  type: 'document'
                  sender: { id: string; name: string; avatar?: string | undefined }
                  recipient: { id: string; name: string; avatar?: string | undefined }
                  metadata?:
                    | {
                        priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                        expiresAt?: string | undefined
                        replyTo?: unknown | undefined
                      }
                    | undefined
                  url: string
                  mimeType: string
                  size: number
                  checksum?: string | undefined
                  pageCount?: number | undefined
                  preview?:
                    | {
                        id: string
                        createdAt?: string | undefined
                        updatedAt?: string | undefined
                        createdBy?: string | undefined
                        updatedBy?: string | undefined
                        version?: number | undefined
                        etag?: string | undefined
                        type: 'image'
                        sender: { id: string; name: string; avatar?: string | undefined }
                        recipient: { id: string; name: string; avatar?: string | undefined }
                        metadata?:
                          | {
                              priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                              expiresAt?: string | undefined
                              replyTo?: unknown | undefined
                            }
                          | undefined
                        url: string
                        mimeType: string
                        size: number
                        checksum?: string | undefined
                        dimensions?: { width: number; height: number } | undefined
                        alt?: string | undefined
                      }
                    | undefined
                }
              | {
                  id: string
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  createdBy?: string | undefined
                  updatedBy?: string | undefined
                  version?: number | undefined
                  etag?: string | undefined
                  type: 'composite'
                  sender: { id: string; name: string; avatar?: string | undefined }
                  recipient: { id: string; name: string; avatar?: string | undefined }
                  metadata?:
                    | {
                        priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                        expiresAt?: string | undefined
                        replyTo?: unknown | undefined
                      }
                    | undefined
                  parts: unknown[]
                }
            rules: { ruleType: string; severity?: 'error' | 'warning' | 'info' | undefined }[]
          }
        }
        output: {
          valid: boolean
          issues: {
            path: string
            message: string
            severity: 'error' | 'warning' | 'info'
            code?: string | undefined
          }[]
          metadata?: { [x: string]: unknown } | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
