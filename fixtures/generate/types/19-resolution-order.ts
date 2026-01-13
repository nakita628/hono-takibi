declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
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
            status?: 'active' | 'inactive' | 'maintenance' | 'deprecated' | undefined
            health?:
              | {
                  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
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
                                      type: 'counter' | 'gauge' | 'histogram' | 'summary'
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
                settings?:
                  | {
                      [x: string]: string | number | boolean | unknown[] | { [x: string]: unknown }
                    }
                  | undefined
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
                dependencyType?: 'hard' | 'soft' | 'optional' | undefined
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
                        type: 'counter' | 'gauge' | 'histogram' | 'summary'
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
                      type: 'counter' | 'gauge' | 'histogram' | 'summary'
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
                | {
                    schema?:
                      | {
                          name?: string | undefined
                          fields?:
                            | {
                                name: string
                                type: string
                                nullable?: boolean | undefined
                                default?:
                                  | string
                                  | number
                                  | boolean
                                  | unknown[]
                                  | { [x: string]: unknown }
                                  | undefined
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
                          nested?: { [x: string]: unknown } | undefined
                        }
                      | undefined
                    records?: { [x: string]: unknown }[] | undefined
                  }
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
                          options?:
                            | string
                            | number
                            | boolean
                            | unknown[]
                            | { [x: string]: unknown }
                            | undefined
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
                    schema?:
                      | {
                          name?: string | undefined
                          fields?:
                            | {
                                name: string
                                type: string
                                nullable?: boolean | undefined
                                default?:
                                  | string
                                  | number
                                  | boolean
                                  | unknown[]
                                  | { [x: string]: unknown }
                                  | undefined
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
                          nested?: { [x: string]: unknown } | undefined
                        }
                      | undefined
                    rules?:
                      | {
                          name?: string | undefined
                          condition?:
                            | { field: string; operator: string; value: { [x: string]: unknown } }
                            | {
                                and?: unknown[] | undefined
                                or?: unknown[] | undefined
                                not?: unknown | undefined
                              }
                            | undefined
                          action?:
                            | {
                                type?: 'reject' | 'warn' | 'transform' | 'default' | undefined
                                message?: string | undefined
                                transform?:
                                  | {
                                      type?: string | undefined
                                      expression?: string | undefined
                                      mapping?: { [x: string]: string } | undefined
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
              name?: string | undefined
              stages: {
                name: string
                type: string
                config?:
                  | {
                      [x: string]: string | number | boolean | unknown[] | { [x: string]: unknown }
                    }
                  | undefined
                transform?:
                  | {
                      type?: string | undefined
                      expression?: string | undefined
                      mapping?: { [x: string]: string } | undefined
                    }
                  | undefined
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
                                  default?:
                                    | string
                                    | number
                                    | boolean
                                    | unknown[]
                                    | { [x: string]: unknown }
                                    | undefined
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
                            nested?: { [x: string]: unknown } | undefined
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
                                  options?:
                                    | string
                                    | number
                                    | boolean
                                    | unknown[]
                                    | { [x: string]: unknown }
                                    | undefined
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
                            default?:
                              | string
                              | number
                              | boolean
                              | unknown[]
                              | { [x: string]: unknown }
                              | undefined
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
                      nested?: { [x: string]: unknown } | undefined
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
                            options?:
                              | string
                              | number
                              | boolean
                              | unknown[]
                              | { [x: string]: unknown }
                              | undefined
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
                        type: 'counter' | 'gauge' | 'histogram' | 'summary'
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
                details?: { [x: string]: unknown } | undefined
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
                    status?: 'active' | 'inactive' | 'maintenance' | 'deprecated' | undefined
                    health?:
                      | {
                          status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
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
                                              type: 'counter' | 'gauge' | 'histogram' | 'summary'
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
                        settings?:
                          | {
                              [x: string]:
                                | string
                                | number
                                | boolean
                                | unknown[]
                                | { [x: string]: unknown }
                            }
                          | undefined
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
                        dependencyType?: 'hard' | 'soft' | 'optional' | undefined
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
                                type: 'counter' | 'gauge' | 'histogram' | 'summary'
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
                              type: 'counter' | 'gauge' | 'histogram' | 'summary'
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
            id?: string | undefined
            source: string
            target: string
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
                  dependencyType?: 'hard' | 'soft' | 'optional' | undefined
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
                | {
                    errorHandling?:
                      | {
                          type?: 'reject' | 'warn' | 'transform' | 'default' | undefined
                          message?: string | undefined
                          transform?:
                            | {
                                type?: string | undefined
                                expression?: string | undefined
                                mapping?: { [x: string]: string } | undefined
                              }
                            | undefined
                        }
                      | undefined
                  }
                | undefined
              transform?:
                | {
                    type?: string | undefined
                    expression?: string | undefined
                    mapping?: { [x: string]: string } | undefined
                  }
                | undefined
            }[]
            input?:
              | {
                  data?:
                    | {
                        schema?:
                          | {
                              name?: string | undefined
                              fields?:
                                | {
                                    name: string
                                    type: string
                                    nullable?: boolean | undefined
                                    default?:
                                      | string
                                      | number
                                      | boolean
                                      | unknown[]
                                      | { [x: string]: unknown }
                                      | undefined
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
                              nested?: { [x: string]: unknown } | undefined
                            }
                          | undefined
                        records?: { [x: string]: unknown }[] | undefined
                      }
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
                              options?:
                                | string
                                | number
                                | boolean
                                | unknown[]
                                | { [x: string]: unknown }
                                | undefined
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
                        schema?:
                          | {
                              name?: string | undefined
                              fields?:
                                | {
                                    name: string
                                    type: string
                                    nullable?: boolean | undefined
                                    default?:
                                      | string
                                      | number
                                      | boolean
                                      | unknown[]
                                      | { [x: string]: unknown }
                                      | undefined
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
                              nested?: { [x: string]: unknown } | undefined
                            }
                          | undefined
                        rules?:
                          | {
                              name?: string | undefined
                              condition?:
                                | {
                                    field: string
                                    operator: string
                                    value: { [x: string]: unknown }
                                  }
                                | {
                                    and?: unknown[] | undefined
                                    or?: unknown[] | undefined
                                    not?: unknown | undefined
                                  }
                                | undefined
                              action?:
                                | {
                                    type?: 'reject' | 'warn' | 'transform' | 'default' | undefined
                                    message?: string | undefined
                                    transform?:
                                      | {
                                          type?: string | undefined
                                          expression?: string | undefined
                                          mapping?: { [x: string]: string } | undefined
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
                            default?:
                              | string
                              | number
                              | boolean
                              | unknown[]
                              | { [x: string]: unknown }
                              | undefined
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
                      nested?: { [x: string]: unknown } | undefined
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
                            options?:
                              | string
                              | number
                              | boolean
                              | unknown[]
                              | { [x: string]: unknown }
                              | undefined
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
                        type: 'counter' | 'gauge' | 'histogram' | 'summary'
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
                details?: { [x: string]: unknown } | undefined
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
