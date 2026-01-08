import { client } from '../clients/19-resolution-order'

/**
 * GET /entities
 */
export async function getEntities() {
  return await client.entities.$get()
}

/**
 * POST /process
 */
export async function postProcess(body: {
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
      config?: { [key: string]: string | number | boolean | unknown[] | { [key: string]: unknown } }
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
}) {
  return await client.process.$post({ json: body })
}

/**
 * GET /graph
 */
export async function getGraph() {
  return await client.graph.$get()
}

/**
 * POST /transform
 */
export async function postTransform(body: {
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
}) {
  return await client.transform.$post({ json: body })
}
