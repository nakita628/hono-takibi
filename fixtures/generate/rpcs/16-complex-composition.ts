import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export async function postMessages(
  args: {
    json:
      | ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
          createdBy?: string
          updatedBy?: string
        }) & { version?: number; etag?: string }) & {
          type: string
          sender: { id: string } & { name: string; avatar?: string }
          recipient: { id: string } & { name: string; avatar?: string }
          metadata?: {
            priority?: 'low' | 'normal' | 'high' | 'urgent'
            expiresAt?: string
            replyTo?: unknown
          }
        }) & {
          type?: 'text'
          content: string
          formatting?: {
            bold?: { start: number; end: number }[]
            italic?: { start: number; end: number }[]
            links?: ({ start: number; end: number } & { url: string })[]
          }
        })
      | ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
          createdBy?: string
          updatedBy?: string
        }) & { version?: number; etag?: string }) & {
          type: string
          sender: { id: string } & { name: string; avatar?: string }
          recipient: { id: string } & { name: string; avatar?: string }
          metadata?: {
            priority?: 'low' | 'normal' | 'high' | 'urgent'
            expiresAt?: string
            replyTo?: unknown
          }
        }) & { url: string; mimeType: string; size: number; checksum?: string } & {
          type?: 'image'
          dimensions?: { width: number; height: number }
          alt?: string
        })
      | ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
          createdBy?: string
          updatedBy?: string
        }) & { version?: number; etag?: string }) & {
          type: string
          sender: { id: string } & { name: string; avatar?: string }
          recipient: { id: string } & { name: string; avatar?: string }
          metadata?: {
            priority?: 'low' | 'normal' | 'high' | 'urgent'
            expiresAt?: string
            replyTo?: unknown
          }
        }) & { url: string; mimeType: string; size: number; checksum?: string } & {
          type?: 'video'
          duration?: number
          thumbnail?: (({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            type: string
            sender: { id: string } & { name: string; avatar?: string }
            recipient: { id: string } & { name: string; avatar?: string }
            metadata?: {
              priority?: 'low' | 'normal' | 'high' | 'urgent'
              expiresAt?: string
              replyTo?: unknown
            }
          }) & { url: string; mimeType: string; size: number; checksum?: string } & {
            type?: 'image'
            dimensions?: { width: number; height: number }
            alt?: string
          }
        })
      | ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
          createdBy?: string
          updatedBy?: string
        }) & { version?: number; etag?: string }) & {
          type: string
          sender: { id: string } & { name: string; avatar?: string }
          recipient: { id: string } & { name: string; avatar?: string }
          metadata?: {
            priority?: 'low' | 'normal' | 'high' | 'urgent'
            expiresAt?: string
            replyTo?: unknown
          }
        }) & { url: string; mimeType: string; size: number; checksum?: string } & {
          type?: 'document'
          pageCount?: number
          preview?: (({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            type: string
            sender: { id: string } & { name: string; avatar?: string }
            recipient: { id: string } & { name: string; avatar?: string }
            metadata?: {
              priority?: 'low' | 'normal' | 'high' | 'urgent'
              expiresAt?: string
              replyTo?: unknown
            }
          }) & { url: string; mimeType: string; size: number; checksum?: string } & {
            type?: 'image'
            dimensions?: { width: number; height: number }
            alt?: string
          }
        })
      | ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
          createdBy?: string
          updatedBy?: string
        }) & { version?: number; etag?: string }) & {
          type: string
          sender: { id: string } & { name: string; avatar?: string }
          recipient: { id: string } & { name: string; avatar?: string }
          metadata?: {
            priority?: 'low' | 'normal' | 'high' | 'urgent'
            expiresAt?: string
            replyTo?: unknown
          }
        }) & { type?: 'composite'; parts: unknown[] })
  },
  options?: ClientRequestOptions,
) {
  return await client.messages.$post(args, options)
}

/**
 * POST /events
 */
export async function postEvents(
  args: {
    json: {
      eventType: string
      payload:
        | ({ timestamp?: string; source?: string; correlationId?: string } & {
            userId: string
            userAction?: 'login' | 'logout' | 'register' | 'update' | 'delete'
            previousState?: { status?: string; roles?: string[]; preferences?: {} }
            newState?: { status?: string; roles?: string[]; preferences?: {} }
          })
        | ({ timestamp?: string; source?: string; correlationId?: string } & {
            orderId: string
            orderAction?: 'created' | 'updated' | 'cancelled' | 'completed'
            items?: { productId: string; quantity: number; price?: number }[]
          })
        | ({ timestamp?: string; source?: string; correlationId?: string } & {
            component: string
            severity: 'info' | 'warning' | 'error' | 'critical'
            metrics?: { [key: string]: number }
          })
        | ({ timestamp?: string; source?: string; correlationId?: string } & {
            customType?: string
            data?: { [key: string]: unknown }
          })
      context?:
        | { userAgent?: string; referrer?: string; sessionId?: string }
        | { deviceId?: string; platform?: 'ios' | 'android'; appVersion?: string }
        | { apiKey?: string; clientId?: string; ipAddress?: string }
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.events.$post(args, options)
}

/**
 * GET /configs
 */
export async function getConfigs(options?: ClientRequestOptions) {
  return await client.configs.$get(undefined, options)
}

/**
 * PUT /configs
 */
export async function putConfigs(
  args: {
    json: {
      settings?: {
        general?: { enabled?: boolean; description?: string } & {
          environment?: string
          debug?: boolean
          logLevel?: string
        }
        features?: { enabled?: boolean; description?: string } & {
          [key: string]:
            | boolean
            | {
                enabled: boolean
                conditions?: (
                  | { type: 'user'; userIds: string[] }
                  | { type: 'time'; startTime?: string; endTime?: string }
                  | { type: 'geo'; regions: string[] }
                )[]
                rolloutPercentage?: number
              }
        }
        limits?: { enabled?: boolean; description?: string } & {
          [key: string]: { limit: number; window: number; burstLimit?: number }
        }
      }
      overrides?: {
        [key: string]: string | number | boolean | unknown[] | { [key: string]: unknown }
      }
    } & { version?: number; etag?: string }
  },
  options?: ClientRequestOptions,
) {
  return await client.configs.$put(args, options)
}

/**
 * POST /resources
 */
export async function postResources(
  args: {
    json:
      | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
          createdBy?: string
          updatedBy?: string
        }) & { version?: number; etag?: string }) & {
          name: string
          description?: string
          tags?: string[]
        }) & {
          resourceType: string
          status: {
            state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
            health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
            lastChecked?: string
          }
          dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
          cost?: { hourly?: number; monthly?: number; currency?: string }
        }) & {
          resourceType?: 'compute'
          cpu: { cores: number; architecture?: string }
          memory: { size: number; unit?: 'MB' | 'GB' | 'TB' }
          storage?: (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            name: string
            description?: string
            tags?: string[]
          }) & {
            resourceType: string
            status: {
              state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
              health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
              lastChecked?: string
            }
            dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
            cost?: { hourly?: number; monthly?: number; currency?: string }
          }) & {
            resourceType?: 'storage'
            size: number
            storageType: 'ssd' | 'hdd' | 'nvme'
            iops?: number
            attachedTo?: unknown
          })[]
        })
      | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
          createdBy?: string
          updatedBy?: string
        }) & { version?: number; etag?: string }) & {
          name: string
          description?: string
          tags?: string[]
        }) & {
          resourceType: string
          status: {
            state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
            health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
            lastChecked?: string
          }
          dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
          cost?: { hourly?: number; monthly?: number; currency?: string }
        }) & {
          resourceType?: 'storage'
          size: number
          storageType: 'ssd' | 'hdd' | 'nvme'
          iops?: number
          attachedTo?: ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            name: string
            description?: string
            tags?: string[]
          }) & {
            resourceType: string
            status: {
              state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
              health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
              lastChecked?: string
            }
            dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
            cost?: { hourly?: number; monthly?: number; currency?: string }
          }) & {
            resourceType?: 'compute'
            cpu: { cores: number; architecture?: string }
            memory: { size: number; unit?: 'MB' | 'GB' | 'TB' }
            storage?: unknown[]
          }
        })
      | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
          createdBy?: string
          updatedBy?: string
        }) & { version?: number; etag?: string }) & {
          name: string
          description?: string
          tags?: string[]
        }) & {
          resourceType: string
          status: {
            state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
            health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
            lastChecked?: string
          }
          dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
          cost?: { hourly?: number; monthly?: number; currency?: string }
        }) & {
          resourceType?: 'network'
          cidr: string
          subnets?: unknown[]
          parentNetwork?: unknown
          connectedResources?: (
            | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
                createdBy?: string
                updatedBy?: string
              }) & { version?: number; etag?: string }) & {
                name: string
                description?: string
                tags?: string[]
              }) & {
                resourceType: string
                status: {
                  state:
                    | 'pending'
                    | 'provisioning'
                    | 'running'
                    | 'stopped'
                    | 'failed'
                    | 'terminated'
                  health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
                  lastChecked?: string
                }
                dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
                cost?: { hourly?: number; monthly?: number; currency?: string }
              }) & {
                resourceType?: 'compute'
                cpu: { cores: number; architecture?: string }
                memory: { size: number; unit?: 'MB' | 'GB' | 'TB' }
                storage?: (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
                  createdBy?: string
                  updatedBy?: string
                }) & { version?: number; etag?: string }) & {
                  name: string
                  description?: string
                  tags?: string[]
                }) & {
                  resourceType: string
                  status: {
                    state:
                      | 'pending'
                      | 'provisioning'
                      | 'running'
                      | 'stopped'
                      | 'failed'
                      | 'terminated'
                    health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
                    lastChecked?: string
                  }
                  dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
                  cost?: { hourly?: number; monthly?: number; currency?: string }
                }) & {
                  resourceType?: 'storage'
                  size: number
                  storageType: 'ssd' | 'hdd' | 'nvme'
                  iops?: number
                  attachedTo?: unknown
                })[]
              })
            | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
                createdBy?: string
                updatedBy?: string
              }) & { version?: number; etag?: string }) & {
                name: string
                description?: string
                tags?: string[]
              }) & {
                resourceType: string
                status: {
                  state:
                    | 'pending'
                    | 'provisioning'
                    | 'running'
                    | 'stopped'
                    | 'failed'
                    | 'terminated'
                  health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
                  lastChecked?: string
                }
                dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
                cost?: { hourly?: number; monthly?: number; currency?: string }
              }) & {
                resourceType?: 'storage'
                size: number
                storageType: 'ssd' | 'hdd' | 'nvme'
                iops?: number
                attachedTo?: ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
                  createdBy?: string
                  updatedBy?: string
                }) & { version?: number; etag?: string }) & {
                  name: string
                  description?: string
                  tags?: string[]
                }) & {
                  resourceType: string
                  status: {
                    state:
                      | 'pending'
                      | 'provisioning'
                      | 'running'
                      | 'stopped'
                      | 'failed'
                      | 'terminated'
                    health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
                    lastChecked?: string
                  }
                  dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
                  cost?: { hourly?: number; monthly?: number; currency?: string }
                }) & {
                  resourceType?: 'compute'
                  cpu: { cores: number; architecture?: string }
                  memory: { size: number; unit?: 'MB' | 'GB' | 'TB' }
                  storage?: unknown[]
                }
              })
          )[]
        })
      | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
          createdBy?: string
          updatedBy?: string
        }) & { version?: number; etag?: string }) & {
          name: string
          description?: string
          tags?: string[]
        }) & {
          resourceType: string
          status: {
            state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
            health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
            lastChecked?: string
          }
          dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
          cost?: { hourly?: number; monthly?: number; currency?: string }
        }) & {
          resourceType?: 'composite'
          components: unknown[]
          template?: {
            name?: string
            version?: string
            parameters?: {
              [key: string]: string | number | boolean | unknown[] | { [key: string]: unknown }
            }
          }
        })
  },
  options?: ClientRequestOptions,
) {
  return await client.resources.$post(args, options)
}

/**
 * POST /validations
 */
export async function postValidations(
  args: {
    json: {
      target:
        | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            name: string
            description?: string
            tags?: string[]
          }) & {
            resourceType: string
            status: {
              state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
              health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
              lastChecked?: string
            }
            dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
            cost?: { hourly?: number; monthly?: number; currency?: string }
          }) & {
            resourceType?: 'compute'
            cpu: { cores: number; architecture?: string }
            memory: { size: number; unit?: 'MB' | 'GB' | 'TB' }
            storage?: (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
              createdBy?: string
              updatedBy?: string
            }) & { version?: number; etag?: string }) & {
              name: string
              description?: string
              tags?: string[]
            }) & {
              resourceType: string
              status: {
                state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
                health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
                lastChecked?: string
              }
              dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
              cost?: { hourly?: number; monthly?: number; currency?: string }
            }) & {
              resourceType?: 'storage'
              size: number
              storageType: 'ssd' | 'hdd' | 'nvme'
              iops?: number
              attachedTo?: unknown
            })[]
          })
        | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            name: string
            description?: string
            tags?: string[]
          }) & {
            resourceType: string
            status: {
              state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
              health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
              lastChecked?: string
            }
            dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
            cost?: { hourly?: number; monthly?: number; currency?: string }
          }) & {
            resourceType?: 'storage'
            size: number
            storageType: 'ssd' | 'hdd' | 'nvme'
            iops?: number
            attachedTo?: ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
              createdBy?: string
              updatedBy?: string
            }) & { version?: number; etag?: string }) & {
              name: string
              description?: string
              tags?: string[]
            }) & {
              resourceType: string
              status: {
                state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
                health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
                lastChecked?: string
              }
              dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
              cost?: { hourly?: number; monthly?: number; currency?: string }
            }) & {
              resourceType?: 'compute'
              cpu: { cores: number; architecture?: string }
              memory: { size: number; unit?: 'MB' | 'GB' | 'TB' }
              storage?: unknown[]
            }
          })
        | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            name: string
            description?: string
            tags?: string[]
          }) & {
            resourceType: string
            status: {
              state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
              health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
              lastChecked?: string
            }
            dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
            cost?: { hourly?: number; monthly?: number; currency?: string }
          }) & {
            resourceType?: 'network'
            cidr: string
            subnets?: unknown[]
            parentNetwork?: unknown
            connectedResources?: (
              | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
                  createdBy?: string
                  updatedBy?: string
                }) & { version?: number; etag?: string }) & {
                  name: string
                  description?: string
                  tags?: string[]
                }) & {
                  resourceType: string
                  status: {
                    state:
                      | 'pending'
                      | 'provisioning'
                      | 'running'
                      | 'stopped'
                      | 'failed'
                      | 'terminated'
                    health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
                    lastChecked?: string
                  }
                  dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
                  cost?: { hourly?: number; monthly?: number; currency?: string }
                }) & {
                  resourceType?: 'compute'
                  cpu: { cores: number; architecture?: string }
                  memory: { size: number; unit?: 'MB' | 'GB' | 'TB' }
                  storage?: (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
                    createdBy?: string
                    updatedBy?: string
                  }) & { version?: number; etag?: string }) & {
                    name: string
                    description?: string
                    tags?: string[]
                  }) & {
                    resourceType: string
                    status: {
                      state:
                        | 'pending'
                        | 'provisioning'
                        | 'running'
                        | 'stopped'
                        | 'failed'
                        | 'terminated'
                      health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
                      lastChecked?: string
                    }
                    dependencies?: {
                      resourceId: string
                      type: 'hard' | 'soft'
                      resource?: unknown
                    }[]
                    cost?: { hourly?: number; monthly?: number; currency?: string }
                  }) & {
                    resourceType?: 'storage'
                    size: number
                    storageType: 'ssd' | 'hdd' | 'nvme'
                    iops?: number
                    attachedTo?: unknown
                  })[]
                })
              | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
                  createdBy?: string
                  updatedBy?: string
                }) & { version?: number; etag?: string }) & {
                  name: string
                  description?: string
                  tags?: string[]
                }) & {
                  resourceType: string
                  status: {
                    state:
                      | 'pending'
                      | 'provisioning'
                      | 'running'
                      | 'stopped'
                      | 'failed'
                      | 'terminated'
                    health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
                    lastChecked?: string
                  }
                  dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
                  cost?: { hourly?: number; monthly?: number; currency?: string }
                }) & {
                  resourceType?: 'storage'
                  size: number
                  storageType: 'ssd' | 'hdd' | 'nvme'
                  iops?: number
                  attachedTo?: ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
                    createdBy?: string
                    updatedBy?: string
                  }) & { version?: number; etag?: string }) & {
                    name: string
                    description?: string
                    tags?: string[]
                  }) & {
                    resourceType: string
                    status: {
                      state:
                        | 'pending'
                        | 'provisioning'
                        | 'running'
                        | 'stopped'
                        | 'failed'
                        | 'terminated'
                      health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
                      lastChecked?: string
                    }
                    dependencies?: {
                      resourceId: string
                      type: 'hard' | 'soft'
                      resource?: unknown
                    }[]
                    cost?: { hourly?: number; monthly?: number; currency?: string }
                  }) & {
                    resourceType?: 'compute'
                    cpu: { cores: number; architecture?: string }
                    memory: { size: number; unit?: 'MB' | 'GB' | 'TB' }
                    storage?: unknown[]
                  }
                })
            )[]
          })
        | (((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            name: string
            description?: string
            tags?: string[]
          }) & {
            resourceType: string
            status: {
              state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
              health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
              lastChecked?: string
            }
            dependencies?: { resourceId: string; type: 'hard' | 'soft'; resource?: unknown }[]
            cost?: { hourly?: number; monthly?: number; currency?: string }
          }) & {
            resourceType?: 'composite'
            components: unknown[]
            template?: {
              name?: string
              version?: string
              parameters?: {
                [key: string]: string | number | boolean | unknown[] | { [key: string]: unknown }
              }
            }
          })
        | (({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            settings: {
              general?: { enabled?: boolean; description?: string } & {
                environment?: string
                debug?: boolean
                logLevel?: string
              }
              features?: { enabled?: boolean; description?: string } & {
                [key: string]:
                  | boolean
                  | {
                      enabled: boolean
                      conditions?: (
                        | { type: 'user'; userIds: string[] }
                        | { type: 'time'; startTime?: string; endTime?: string }
                        | { type: 'geo'; regions: string[] }
                      )[]
                      rolloutPercentage?: number
                    }
              }
              limits?: { enabled?: boolean; description?: string } & {
                [key: string]: { limit: number; window: number; burstLimit?: number }
              }
            }
            overrides?: {
              [key: string]: string | number | boolean | unknown[] | { [key: string]: unknown }
            }
          })
        | ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            type: string
            sender: { id: string } & { name: string; avatar?: string }
            recipient: { id: string } & { name: string; avatar?: string }
            metadata?: {
              priority?: 'low' | 'normal' | 'high' | 'urgent'
              expiresAt?: string
              replyTo?: unknown
            }
          }) & {
            type?: 'text'
            content: string
            formatting?: {
              bold?: { start: number; end: number }[]
              italic?: { start: number; end: number }[]
              links?: ({ start: number; end: number } & { url: string })[]
            }
          })
        | ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            type: string
            sender: { id: string } & { name: string; avatar?: string }
            recipient: { id: string } & { name: string; avatar?: string }
            metadata?: {
              priority?: 'low' | 'normal' | 'high' | 'urgent'
              expiresAt?: string
              replyTo?: unknown
            }
          }) & { url: string; mimeType: string; size: number; checksum?: string } & {
            type?: 'image'
            dimensions?: { width: number; height: number }
            alt?: string
          })
        | ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            type: string
            sender: { id: string } & { name: string; avatar?: string }
            recipient: { id: string } & { name: string; avatar?: string }
            metadata?: {
              priority?: 'low' | 'normal' | 'high' | 'urgent'
              expiresAt?: string
              replyTo?: unknown
            }
          }) & { url: string; mimeType: string; size: number; checksum?: string } & {
            type?: 'video'
            duration?: number
            thumbnail?: (({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
              createdBy?: string
              updatedBy?: string
            }) & { version?: number; etag?: string }) & {
              type: string
              sender: { id: string } & { name: string; avatar?: string }
              recipient: { id: string } & { name: string; avatar?: string }
              metadata?: {
                priority?: 'low' | 'normal' | 'high' | 'urgent'
                expiresAt?: string
                replyTo?: unknown
              }
            }) & { url: string; mimeType: string; size: number; checksum?: string } & {
              type?: 'image'
              dimensions?: { width: number; height: number }
              alt?: string
            }
          })
        | ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            type: string
            sender: { id: string } & { name: string; avatar?: string }
            recipient: { id: string } & { name: string; avatar?: string }
            metadata?: {
              priority?: 'low' | 'normal' | 'high' | 'urgent'
              expiresAt?: string
              replyTo?: unknown
            }
          }) & { url: string; mimeType: string; size: number; checksum?: string } & {
            type?: 'document'
            pageCount?: number
            preview?: (({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
              createdBy?: string
              updatedBy?: string
            }) & { version?: number; etag?: string }) & {
              type: string
              sender: { id: string } & { name: string; avatar?: string }
              recipient: { id: string } & { name: string; avatar?: string }
              metadata?: {
                priority?: 'low' | 'normal' | 'high' | 'urgent'
                expiresAt?: string
                replyTo?: unknown
              }
            }) & { url: string; mimeType: string; size: number; checksum?: string } & {
              type?: 'image'
              dimensions?: { width: number; height: number }
              alt?: string
            }
          })
        | ((({ id: string } & ({ createdAt?: string; updatedAt?: string } & {
            createdBy?: string
            updatedBy?: string
          }) & { version?: number; etag?: string }) & {
            type: string
            sender: { id: string } & { name: string; avatar?: string }
            recipient: { id: string } & { name: string; avatar?: string }
            metadata?: {
              priority?: 'low' | 'normal' | 'high' | 'urgent'
              expiresAt?: string
              replyTo?: unknown
            }
          }) & { type?: 'composite'; parts: unknown[] })
      rules: (
        | ({ ruleType: string; severity?: 'error' | 'warning' | 'info' } & {
            ruleType?: 'schema'
            schema: {}
          })
        | { ruleType?: 'business'; expression: string; parameters?: {} }
        | { ruleType?: 'custom'; handler: string; config?: {} }
      )[]
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.validations.$post(args, options)
}
