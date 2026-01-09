import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/19-resolution-order'

/**
 * GET /entities
 */
export async function getEntities(args?: { options?: ClientRequestOptions }) {
  return await client.entities.$get(args)
}

/**
 * POST /process
 */
export async function postProcess(args: {
  json: {
    input: {
      data?:
        | {
            schema?: {
              name?: string
              fields?: {
                name: string
                type: string
                nullable?: boolean
                default?: string | number | boolean | unknown[] | { [key: string]: unknown }
                validation?: {
                  required?: boolean
                  pattern?: string
                  min?: number
                  max?: number
                  enum?: string[]
                }
              }[]
              nested?: { [key: string]: unknown }
            }
            records?: {}[]
          }
        | { format?: string; content?: string; encoding?: string }
        | { topic?: string; partition?: number; offset?: number }
      source?: {
        type?: string
        connection?: {
          host?: string
          port?: number
          database?: string
          options?: string | number | boolean | unknown[] | { [key: string]: unknown }
        }
        credentials?: {
          type?: 'basic' | 'token' | 'oauth' | 'certificate'
          secrets?: { name: string; source: string; version?: string }[]
        }
      }
      validation?: {
        schema?: {
          name?: string
          fields?: {
            name: string
            type: string
            nullable?: boolean
            default?: string | number | boolean | unknown[] | { [key: string]: unknown }
            validation?: {
              required?: boolean
              pattern?: string
              min?: number
              max?: number
              enum?: string[]
            }
          }[]
          nested?: { [key: string]: unknown }
        }
        rules?: {
          name?: string
          condition?:
            | { field: string; operator: string; value: unknown }
            | { and?: unknown[]; or?: unknown[]; not?: unknown }
          action?: {
            type?: 'reject' | 'warn' | 'transform' | 'default'
            message?: string
            transform?: { type?: string; expression?: string; mapping?: { [key: string]: string } }
          }
        }[]
      }
    }
    pipeline: {
      name?: string
      stages: {
        name: string
        type: string
        config?: {
          [key: string]: string | number | boolean | unknown[] | { [key: string]: unknown }
        }
        transform?: { type?: string; expression?: string; mapping?: { [key: string]: string } }
        output?: {
          format?: string
          schema?: {
            name?: string
            fields?: {
              name: string
              type: string
              nullable?: boolean
              default?: string | number | boolean | unknown[] | { [key: string]: unknown }
              validation?: {
                required?: boolean
                pattern?: string
                min?: number
                max?: number
                enum?: string[]
              }
            }[]
            nested?: { [key: string]: unknown }
          }
          destination?: {
            type?: string
            connection?: {
              host?: string
              port?: number
              database?: string
              options?: string | number | boolean | unknown[] | { [key: string]: unknown }
            }
            credentials?: {
              type?: 'basic' | 'token' | 'oauth' | 'certificate'
              secrets?: { name: string; source: string; version?: string }[]
            }
          }
        }
      }[]
    }
    options?: {
      parallel?: boolean
      batchSize?: number
      timeout?: number
      retryPolicy?: {
        maxRetries?: number
        backoff?: 'fixed' | 'exponential' | 'linear'
        initialDelay?: number
        maxDelay?: number
      }
    }
  }
  options?: ClientRequestOptions
}) {
  return await client.process.$post(args)
}

/**
 * GET /graph
 */
export async function getGraph(args?: { options?: ClientRequestOptions }) {
  return await client.graph.$get(args)
}

/**
 * POST /transform
 */
export async function postTransform(args: {
  json: {
    transforms: {
      type: string
      config?: {
        [key: string]: string | number | boolean | unknown[] | { [key: string]: unknown }
      } & {
        errorHandling?: {
          type?: 'reject' | 'warn' | 'transform' | 'default'
          message?: string
          transform?: { type?: string; expression?: string; mapping?: { [key: string]: string } }
        }
      }
      transform?: { type?: string; expression?: string; mapping?: { [key: string]: string } }
    }[]
    input?: {
      data?:
        | {
            schema?: {
              name?: string
              fields?: {
                name: string
                type: string
                nullable?: boolean
                default?: string | number | boolean | unknown[] | { [key: string]: unknown }
                validation?: {
                  required?: boolean
                  pattern?: string
                  min?: number
                  max?: number
                  enum?: string[]
                }
              }[]
              nested?: { [key: string]: unknown }
            }
            records?: {}[]
          }
        | { format?: string; content?: string; encoding?: string }
        | { topic?: string; partition?: number; offset?: number }
      source?: {
        type?: string
        connection?: {
          host?: string
          port?: number
          database?: string
          options?: string | number | boolean | unknown[] | { [key: string]: unknown }
        }
        credentials?: {
          type?: 'basic' | 'token' | 'oauth' | 'certificate'
          secrets?: { name: string; source: string; version?: string }[]
        }
      }
      validation?: {
        schema?: {
          name?: string
          fields?: {
            name: string
            type: string
            nullable?: boolean
            default?: string | number | boolean | unknown[] | { [key: string]: unknown }
            validation?: {
              required?: boolean
              pattern?: string
              min?: number
              max?: number
              enum?: string[]
            }
          }[]
          nested?: { [key: string]: unknown }
        }
        rules?: {
          name?: string
          condition?:
            | { field: string; operator: string; value: unknown }
            | { and?: unknown[]; or?: unknown[]; not?: unknown }
          action?: {
            type?: 'reject' | 'warn' | 'transform' | 'default'
            message?: string
            transform?: { type?: string; expression?: string; mapping?: { [key: string]: string } }
          }
        }[]
      }
    }
  }
  options?: ClientRequestOptions
}) {
  return await client.transform.$post(args)
}
