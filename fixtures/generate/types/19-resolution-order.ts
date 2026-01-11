declare const routes: import(
  '/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index',
  { with: { 'resolution-mode': 'import' } }
).OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/entities': {
      $get: {
        input: {}
        output: {
          id: string
          type: 'service' | 'database' | 'cache' | 'queue' | 'gateway'
          details: {
            name?: string | undefined
            description?: string | undefined
            version?: string | undefined
            status?: 'deprecated' | 'active' | 'inactive' | 'maintenance' | undefined
            health?:
              | {
                  status: 'unknown' | 'healthy' | 'degraded' | 'unhealthy'
                  checks?:
                    | {
                        name: string
                        status: 'pass' | 'fail' | 'warn'
                        message?: string | undefined
                        metrics?:
                          | {
                              [x: string]: {
                                value?: number | undefined
                                unit?: string | undefined
                                definition?:
                                  | {
                                      name: string
                                      type: 'summary' | 'counter' | 'gauge' | 'histogram'
                                      unit?: string | undefined
                                      labels?:
                                        | {
                                            name: string
                                            description?: string | undefined
                                            required?: boolean | undefined
                                          }[]
                                        | undefined
                                      thresholds?:
                                        | {
                                            level?:
                                              | 'critical'
                                              | 'high'
                                              | 'medium'
                                              | 'low'
                                              | undefined
                                            operator?:
                                              | 'lt'
                                              | 'lte'
                                              | 'gt'
                                              | 'gte'
                                              | 'eq'
                                              | 'ne'
                                              | undefined
                                            value?: number | undefined
                                          }[]
                                        | undefined
                                    }
                                  | undefined
                                timestamp?: string | undefined
                              }
                            }
                          | undefined
                      }[]
                    | undefined
                  lastChecked?: string | undefined
                }
              | undefined
            tags?: { key: string; value: string }[] | undefined
          }
          config?:
            | {
                settings?: { [x: string]: any } | undefined
                secrets?:
                  | { name: string; source: string; version?: string | undefined }[]
                  | undefined
                environment?:
                  | {
                      name?: string | undefined
                      variables?: { [x: string]: string } | undefined
                      secrets?:
                        | { name: string; source: string; version?: string | undefined }[]
                        | undefined
                    }
                  | undefined
              }
            | undefined
          parent?:
            | {
                id: string
                type: 'service' | 'database' | 'cache' | 'queue' | 'gateway'
                metadata?:
                  | {
                      createdAt?: string | undefined
                      createdBy?: string | undefined
                      annotations?:
                        | {
                            [x: string]: {
                              value?: string | undefined
                              author?: string | undefined
                              timestamp?: string | undefined
                            }
                          }
                        | undefined
                    }
                  | undefined
              }
            | undefined
          children?:
            | {
                id: string
                type: 'service' | 'database' | 'cache' | 'queue' | 'gateway'
                metadata?:
                  | {
                      createdAt?: string | undefined
                      createdBy?: string | undefined
                      annotations?:
                        | {
                            [x: string]: {
                              value?: string | undefined
                              author?: string | undefined
                              timestamp?: string | undefined
                            }
                          }
                        | undefined
                    }
                  | undefined
              }[]
            | undefined
          dependencies?:
            | {
                id: string
                type: 'service' | 'database' | 'cache' | 'queue' | 'gateway'
                metadata?:
                  | {
                      createdAt?: string | undefined
                      createdBy?: string | undefined
                      annotations?:
                        | {
                            [x: string]: {
                              value?: string | undefined
                              author?: string | undefined
                              timestamp?: string | undefined
                            }
                          }
                        | undefined
                    }
                  | undefined
                dependencyType?: 'optional' | 'hard' | 'soft' | undefined
                criticality?: 'critical' | 'high' | 'medium' | 'low' | undefined
              }[]
            | undefined
          metrics?:
            | {
                [x: string]: {
                  value?: number | undefined
                  unit?: string | undefined
                  definition?:
                    | {
                        name: string
                        type: 'summary' | 'counter' | 'gauge' | 'histogram'
                        unit?: string | undefined
                        labels?:
                          | {
                              name: string
                              description?: string | undefined
                              required?: boolean | undefined
                            }[]
                          | undefined
                        thresholds?:
                          | {
                              level?: 'critical' | 'high' | 'medium' | 'low' | undefined
                              operator?: 'lt' | 'lte' | 'gt' | 'gte' | 'eq' | 'ne' | undefined
                              value?: number | undefined
                            }[]
                          | undefined
                      }
                    | undefined
                  timestamp?: string | undefined
                }
              }
            | undefined
          aggregations?:
            | {
                metric?:
                  | {
                      name: string
                      type: 'summary' | 'counter' | 'gauge' | 'histogram'
                      unit?: string | undefined
                      labels?:
                        | {
                            name: string
                            description?: string | undefined
                            required?: boolean | undefined
                          }[]
                        | undefined
                      thresholds?:
                        | {
                            level?: 'critical' | 'high' | 'medium' | 'low' | undefined
                            operator?: 'lt' | 'lte' | 'gt' | 'gte' | 'eq' | 'ne' | undefined
                            value?: number | undefined
                          }[]
                        | undefined
                    }
                  | undefined
                function?:
                  | 'sum'
                  | 'avg'
                  | 'min'
                  | 'max'
                  | 'count'
                  | 'p50'
                  | 'p95'
                  | 'p99'
                  | undefined
                dimensions?: { name: string; values?: string[] | undefined }[] | undefined
              }[]
            | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/process': {
      $post: {
        input: {
          json: {
            input: {
              data?:
                | { schema?: unknown; records?: Record<string, never>[] | undefined }
                | {
                    format?: string | undefined
                    content?: string | undefined
                    encoding?: string | undefined
                  }
                | {
                    topic?: string | undefined
                    partition?: number | undefined
                    offset?: number | undefined
                  }
                | undefined
              source?:
                | {
                    type?: string | undefined
                    connection?:
                      | {
                          host?: string | undefined
                          port?: number | undefined
                          database?: string | undefined
                          options?: unknown
                        }
                      | undefined
                    credentials?:
                      | {
                          type?: 'basic' | 'token' | 'oauth' | 'certificate' | undefined
                          secrets?:
                            | { name: string; source: string; version?: string | undefined }[]
                            | undefined
                        }
                      | undefined
                  }
                | undefined
              validation?:
                | {
                    schema?: unknown
                    rules?:
                      | {
                          name?: string | undefined
                          condition?: unknown
                          action?:
                            | {
                                type?: 'transform' | 'default' | 'warn' | 'reject' | undefined
                                message?: string | undefined
                                transform?:
                                  | {
                                      type?: string | undefined
                                      expression?: string | undefined
                                      mapping?: Record<string, string> | undefined
                                    }
                                  | undefined
                              }
                            | undefined
                        }[]
                      | undefined
                  }
                | undefined
            }
            pipeline: {
              stages: {
                name: string
                type: string
                config?: Record<string, unknown> | undefined
                transform?:
                  | {
                      type?: string | undefined
                      expression?: string | undefined
                      mapping?: Record<string, string> | undefined
                    }
                  | undefined
                output?:
                  | {
                      format?: string | undefined
                      schema?: unknown
                      destination?:
                        | {
                            type?: string | undefined
                            connection?:
                              | {
                                  host?: string | undefined
                                  port?: number | undefined
                                  database?: string | undefined
                                  options?: unknown
                                }
                              | undefined
                            credentials?:
                              | {
                                  type?: 'basic' | 'token' | 'oauth' | 'certificate' | undefined
                                  secrets?:
                                    | {
                                        name: string
                                        source: string
                                        version?: string | undefined
                                      }[]
                                    | undefined
                                }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
              }[]
              name?: string | undefined
            }
            options?:
              | {
                  parallel?: boolean | undefined
                  batchSize?: number | undefined
                  timeout?: number | undefined
                  retryPolicy?:
                    | {
                        maxRetries?: number | undefined
                        backoff?: 'fixed' | 'exponential' | 'linear' | undefined
                        initialDelay?: number | undefined
                        maxDelay?: number | undefined
                      }
                    | undefined
                }
              | undefined
          }
        }
        output: {
          status?: string | undefined
          output?:
            | {
                format?: string | undefined
                schema?:
                  | {
                      name?: string | undefined
                      fields?:
                        | {
                            name: string
                            type: string
                            nullable?: boolean | undefined
                            default?: any
                            validation?:
                              | {
                                  required?: boolean | undefined
                                  pattern?: string | undefined
                                  min?: number | undefined
                                  max?: number | undefined
                                  enum?: string[] | undefined
                                }
                              | undefined
                          }[]
                        | undefined
                      nested?: { [x: string]: any } | undefined
                    }
                  | undefined
                destination?:
                  | {
                      type?: string | undefined
                      connection?:
                        | {
                            host?: string | undefined
                            port?: number | undefined
                            database?: string | undefined
                            options?: any
                          }
                        | undefined
                      credentials?:
                        | {
                            type?: 'basic' | 'token' | 'oauth' | 'certificate' | undefined
                            secrets?:
                              | { name: string; source: string; version?: string | undefined }[]
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            | undefined
          metrics?:
            | {
                [x: string]: {
                  value?: number | undefined
                  unit?: string | undefined
                  definition?:
                    | {
                        name: string
                        type: 'summary' | 'counter' | 'gauge' | 'histogram'
                        unit?: string | undefined
                        labels?:
                          | {
                              name: string
                              description?: string | undefined
                              required?: boolean | undefined
                            }[]
                          | undefined
                        thresholds?:
                          | {
                              level?: 'critical' | 'high' | 'medium' | 'low' | undefined
                              operator?: 'lt' | 'lte' | 'gt' | 'gte' | 'eq' | 'ne' | undefined
                              value?: number | undefined
                            }[]
                          | undefined
                      }
                    | undefined
                  timestamp?: string | undefined
                }
              }
            | undefined
          errors?:
            | {
                stage?: string | undefined
                message?: string | undefined
                details?: {} | undefined
              }[]
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/graph': {
      $get: {
        input: {}
        output: {
          nodes: {
            id: string
            entity?:
              | {
                  id: string
                  type: 'service' | 'database' | 'cache' | 'queue' | 'gateway'
                  details: {
                    name?: string | undefined
                    description?: string | undefined
                    version?: string | undefined
                    status?: 'deprecated' | 'active' | 'inactive' | 'maintenance' | undefined
                    health?:
                      | {
                          status: 'unknown' | 'healthy' | 'degraded' | 'unhealthy'
                          checks?:
                            | {
                                name: string
                                status: 'pass' | 'fail' | 'warn'
                                message?: string | undefined
                                metrics?:
                                  | {
                                      [x: string]: {
                                        value?: number | undefined
                                        unit?: string | undefined
                                        definition?:
                                          | {
                                              name: string
                                              type: 'summary' | 'counter' | 'gauge' | 'histogram'
                                              unit?: string | undefined
                                              labels?:
                                                | {
                                                    name: string
                                                    description?: string | undefined
                                                    required?: boolean | undefined
                                                  }[]
                                                | undefined
                                              thresholds?:
                                                | {
                                                    level?:
                                                      | 'critical'
                                                      | 'high'
                                                      | 'medium'
                                                      | 'low'
                                                      | undefined
                                                    operator?:
                                                      | 'lt'
                                                      | 'lte'
                                                      | 'gt'
                                                      | 'gte'
                                                      | 'eq'
                                                      | 'ne'
                                                      | undefined
                                                    value?: number | undefined
                                                  }[]
                                                | undefined
                                            }
                                          | undefined
                                        timestamp?: string | undefined
                                      }
                                    }
                                  | undefined
                              }[]
                            | undefined
                          lastChecked?: string | undefined
                        }
                      | undefined
                    tags?: { key: string; value: string }[] | undefined
                  }
                  config?:
                    | {
                        settings?: { [x: string]: any } | undefined
                        secrets?:
                          | { name: string; source: string; version?: string | undefined }[]
                          | undefined
                        environment?:
                          | {
                              name?: string | undefined
                              variables?: { [x: string]: string } | undefined
                              secrets?:
                                | { name: string; source: string; version?: string | undefined }[]
                                | undefined
                            }
                          | undefined
                      }
                    | undefined
                  parent?:
                    | {
                        id: string
                        type: 'service' | 'database' | 'cache' | 'queue' | 'gateway'
                        metadata?:
                          | {
                              createdAt?: string | undefined
                              createdBy?: string | undefined
                              annotations?:
                                | {
                                    [x: string]: {
                                      value?: string | undefined
                                      author?: string | undefined
                                      timestamp?: string | undefined
                                    }
                                  }
                                | undefined
                            }
                          | undefined
                      }
                    | undefined
                  children?:
                    | {
                        id: string
                        type: 'service' | 'database' | 'cache' | 'queue' | 'gateway'
                        metadata?:
                          | {
                              createdAt?: string | undefined
                              createdBy?: string | undefined
                              annotations?:
                                | {
                                    [x: string]: {
                                      value?: string | undefined
                                      author?: string | undefined
                                      timestamp?: string | undefined
                                    }
                                  }
                                | undefined
                            }
                          | undefined
                      }[]
                    | undefined
                  dependencies?:
                    | {
                        id: string
                        type: 'service' | 'database' | 'cache' | 'queue' | 'gateway'
                        metadata?:
                          | {
                              createdAt?: string | undefined
                              createdBy?: string | undefined
                              annotations?:
                                | {
                                    [x: string]: {
                                      value?: string | undefined
                                      author?: string | undefined
                                      timestamp?: string | undefined
                                    }
                                  }
                                | undefined
                            }
                          | undefined
                        dependencyType?: 'optional' | 'hard' | 'soft' | undefined
                        criticality?: 'critical' | 'high' | 'medium' | 'low' | undefined
                      }[]
                    | undefined
                  metrics?:
                    | {
                        [x: string]: {
                          value?: number | undefined
                          unit?: string | undefined
                          definition?:
                            | {
                                name: string
                                type: 'summary' | 'counter' | 'gauge' | 'histogram'
                                unit?: string | undefined
                                labels?:
                                  | {
                                      name: string
                                      description?: string | undefined
                                      required?: boolean | undefined
                                    }[]
                                  | undefined
                                thresholds?:
                                  | {
                                      level?: 'critical' | 'high' | 'medium' | 'low' | undefined
                                      operator?:
                                        | 'lt'
                                        | 'lte'
                                        | 'gt'
                                        | 'gte'
                                        | 'eq'
                                        | 'ne'
                                        | undefined
                                      value?: number | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                          timestamp?: string | undefined
                        }
                      }
                    | undefined
                  aggregations?:
                    | {
                        metric?:
                          | {
                              name: string
                              type: 'summary' | 'counter' | 'gauge' | 'histogram'
                              unit?: string | undefined
                              labels?:
                                | {
                                    name: string
                                    description?: string | undefined
                                    required?: boolean | undefined
                                  }[]
                                | undefined
                              thresholds?:
                                | {
                                    level?: 'critical' | 'high' | 'medium' | 'low' | undefined
                                    operator?: 'lt' | 'lte' | 'gt' | 'gte' | 'eq' | 'ne' | undefined
                                    value?: number | undefined
                                  }[]
                                | undefined
                            }
                          | undefined
                        function?:
                          | 'sum'
                          | 'avg'
                          | 'min'
                          | 'max'
                          | 'count'
                          | 'p50'
                          | 'p95'
                          | 'p99'
                          | undefined
                        dimensions?: { name: string; values?: string[] | undefined }[] | undefined
                      }[]
                    | undefined
                }
              | undefined
            position?: { x?: number | undefined; y?: number | undefined } | undefined
            style?:
              | {
                  color?: string | undefined
                  shape?: string | undefined
                  size?: number | undefined
                }
              | undefined
          }[]
          edges: {
            source: string
            target: string
            id?: string | undefined
            dependency?:
              | {
                  id: string
                  type: 'service' | 'database' | 'cache' | 'queue' | 'gateway'
                  metadata?:
                    | {
                        createdAt?: string | undefined
                        createdBy?: string | undefined
                        annotations?:
                          | {
                              [x: string]: {
                                value?: string | undefined
                                author?: string | undefined
                                timestamp?: string | undefined
                              }
                            }
                          | undefined
                      }
                    | undefined
                  dependencyType?: 'optional' | 'hard' | 'soft' | undefined
                  criticality?: 'critical' | 'high' | 'medium' | 'low' | undefined
                }
              | undefined
            style?:
              | {
                  color?: string | undefined
                  width?: number | undefined
                  style?: 'solid' | 'dashed' | 'dotted' | undefined
                  animated?: boolean | undefined
                }
              | undefined
          }[]
          metadata?:
            | {
                layout?: string | undefined
                zoom?: number | undefined
                viewport?:
                  | {
                      x?: number | undefined
                      y?: number | undefined
                      width?: number | undefined
                      height?: number | undefined
                    }
                  | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/transform': {
      $post: {
        input: {
          json: {
            transforms: {
              type: string
              config?:
                | (Record<string, unknown> & {
                    errorHandling?:
                      | {
                          type?: 'transform' | 'default' | 'warn' | 'reject' | undefined
                          message?: string | undefined
                          transform?:
                            | {
                                type?: string | undefined
                                expression?: string | undefined
                                mapping?: Record<string, string> | undefined
                              }
                            | undefined
                        }
                      | undefined
                  })
                | undefined
              transform?:
                | {
                    type?: string | undefined
                    expression?: string | undefined
                    mapping?: Record<string, string> | undefined
                  }
                | undefined
            }[]
            input?:
              | {
                  data?:
                    | { schema?: unknown; records?: Record<string, never>[] | undefined }
                    | {
                        format?: string | undefined
                        content?: string | undefined
                        encoding?: string | undefined
                      }
                    | {
                        topic?: string | undefined
                        partition?: number | undefined
                        offset?: number | undefined
                      }
                    | undefined
                  source?:
                    | {
                        type?: string | undefined
                        connection?:
                          | {
                              host?: string | undefined
                              port?: number | undefined
                              database?: string | undefined
                              options?: unknown
                            }
                          | undefined
                        credentials?:
                          | {
                              type?: 'basic' | 'token' | 'oauth' | 'certificate' | undefined
                              secrets?:
                                | { name: string; source: string; version?: string | undefined }[]
                                | undefined
                            }
                          | undefined
                      }
                    | undefined
                  validation?:
                    | {
                        schema?: unknown
                        rules?:
                          | {
                              name?: string | undefined
                              condition?: unknown
                              action?:
                                | {
                                    type?: 'transform' | 'default' | 'warn' | 'reject' | undefined
                                    message?: string | undefined
                                    transform?:
                                      | {
                                          type?: string | undefined
                                          expression?: string | undefined
                                          mapping?: Record<string, string> | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                            }[]
                          | undefined
                      }
                    | undefined
                }
              | undefined
          }
        }
        output: {
          status?: string | undefined
          output?:
            | {
                format?: string | undefined
                schema?:
                  | {
                      name?: string | undefined
                      fields?:
                        | {
                            name: string
                            type: string
                            nullable?: boolean | undefined
                            default?: any
                            validation?:
                              | {
                                  required?: boolean | undefined
                                  pattern?: string | undefined
                                  min?: number | undefined
                                  max?: number | undefined
                                  enum?: string[] | undefined
                                }
                              | undefined
                          }[]
                        | undefined
                      nested?: { [x: string]: any } | undefined
                    }
                  | undefined
                destination?:
                  | {
                      type?: string | undefined
                      connection?:
                        | {
                            host?: string | undefined
                            port?: number | undefined
                            database?: string | undefined
                            options?: any
                          }
                        | undefined
                      credentials?:
                        | {
                            type?: 'basic' | 'token' | 'oauth' | 'certificate' | undefined
                            secrets?:
                              | { name: string; source: string; version?: string | undefined }[]
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            | undefined
          metrics?:
            | {
                [x: string]: {
                  value?: number | undefined
                  unit?: string | undefined
                  definition?:
                    | {
                        name: string
                        type: 'summary' | 'counter' | 'gauge' | 'histogram'
                        unit?: string | undefined
                        labels?:
                          | {
                              name: string
                              description?: string | undefined
                              required?: boolean | undefined
                            }[]
                          | undefined
                        thresholds?:
                          | {
                              level?: 'critical' | 'high' | 'medium' | 'low' | undefined
                              operator?: 'lt' | 'lte' | 'gt' | 'gte' | 'eq' | 'ne' | undefined
                              value?: number | undefined
                            }[]
                          | undefined
                      }
                    | undefined
                  timestamp?: string | undefined
                }
              }
            | undefined
          errors?:
            | {
                stage?: string | undefined
                message?: string | undefined
                details?: {} | undefined
              }[]
            | undefined
          transformations?:
            | {
                step?: string | undefined
                inputCount?: number | undefined
                outputCount?: number | undefined
                duration?: number | undefined
              }[]
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
