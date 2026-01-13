declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/entities': {
      $get:
        | {
            input: {
              query: {
                filter?:
                  | {
                      field?: string | undefined
                      operator?:
                        | 'eq'
                        | 'ne'
                        | 'gt'
                        | 'gte'
                        | 'lt'
                        | 'lte'
                        | 'in'
                        | 'nin'
                        | 'contains'
                        | 'startsWith'
                        | 'endsWith'
                        | undefined
                      value?: string | number | boolean | string[] | undefined
                      and?: unknown[] | undefined
                      or?: unknown[] | undefined
                    }
                  | undefined
                page?:
                  | {
                      page?: number | undefined
                      perPage?: number | undefined
                      cursor?: string | undefined
                    }
                  | undefined
                sort?:
                  | { field?: string | undefined; direction?: 'asc' | 'desc' | undefined }[]
                  | undefined
              }
            }
            output: {
              data: {
                id: string
                type: 'user' | 'organization' | 'project' | 'resource'
                attributes: {
                  name?: string | undefined
                  description?: string | undefined
                  status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                  tags?: { key: string; value: string }[] | undefined
                  customFields?:
                    | {
                        [x: string]: string | number | boolean | string[] | { [x: string]: unknown }
                      }
                    | undefined
                }
                relationships?:
                  | {
                      parent?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      children?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      owner?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      members?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
                meta?:
                  | {
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      version?: number | undefined
                      etag?: string | undefined
                      permissions?:
                        | {
                            canRead?: boolean | undefined
                            canWrite?: boolean | undefined
                            canDelete?: boolean | undefined
                            canShare?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                links?:
                  | {
                      self?: string | undefined
                      collection?: string | undefined
                      related?: { [x: string]: string } | undefined
                    }
                  | undefined
              }[]
              included?:
                | {
                    id: string
                    type: 'user' | 'organization' | 'project' | 'resource'
                    attributes: {
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?:
                        | {
                            [x: string]:
                              | string
                              | number
                              | boolean
                              | string[]
                              | { [x: string]: unknown }
                          }
                        | undefined
                    }
                    relationships?:
                      | {
                          parent?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          children?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }[]
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          owner?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          members?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }[]
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    meta?:
                      | {
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          permissions?:
                            | {
                                canRead?: boolean | undefined
                                canWrite?: boolean | undefined
                                canDelete?: boolean | undefined
                                canShare?: boolean | undefined
                              }
                            | undefined
                        }
                      | undefined
                    links?:
                      | {
                          self?: string | undefined
                          collection?: string | undefined
                          related?: { [x: string]: string } | undefined
                        }
                      | undefined
                  }[]
                | undefined
              meta?:
                | {
                    total?: number | undefined
                    page?: number | undefined
                    perPage?: number | undefined
                    totalPages?: number | undefined
                  }
                | undefined
              links?:
                | {
                    self?: string | undefined
                    first?: string | undefined
                    last?: string | undefined
                    prev?: string | undefined
                    next?: string | undefined
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                filter?:
                  | {
                      field?: string | undefined
                      operator?:
                        | 'eq'
                        | 'ne'
                        | 'gt'
                        | 'gte'
                        | 'lt'
                        | 'lte'
                        | 'in'
                        | 'nin'
                        | 'contains'
                        | 'startsWith'
                        | 'endsWith'
                        | undefined
                      value?: string | number | boolean | string[] | undefined
                      and?: unknown[] | undefined
                      or?: unknown[] | undefined
                    }
                  | undefined
                page?:
                  | {
                      page?: number | undefined
                      perPage?: number | undefined
                      cursor?: string | undefined
                    }
                  | undefined
                sort?:
                  | { field?: string | undefined; direction?: 'asc' | 'desc' | undefined }[]
                  | undefined
              }
            }
            output: {
              errors: {
                id?: string | undefined
                status: string
                code: string
                title: string
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?: { [x: string]: unknown } | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              query: {
                filter?:
                  | {
                      field?: string | undefined
                      operator?:
                        | 'eq'
                        | 'ne'
                        | 'gt'
                        | 'gte'
                        | 'lt'
                        | 'lte'
                        | 'in'
                        | 'nin'
                        | 'contains'
                        | 'startsWith'
                        | 'endsWith'
                        | undefined
                      value?: string | number | boolean | string[] | undefined
                      and?: unknown[] | undefined
                      or?: unknown[] | undefined
                    }
                  | undefined
                page?:
                  | {
                      page?: number | undefined
                      perPage?: number | undefined
                      cursor?: string | undefined
                    }
                  | undefined
                sort?:
                  | { field?: string | undefined; direction?: 'asc' | 'desc' | undefined }[]
                  | undefined
              }
            }
            output: {
              errors: {
                id?: string | undefined
                status: string
                code: string
                title: string
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?: { [x: string]: unknown } | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 401
          }
      $post:
        | {
            input: { header: { 'Idempotency-Key'?: string | undefined } } & {
              json: {
                type: 'user' | 'organization' | 'project' | 'resource'
                attributes: {
                  name?: string | undefined
                  description?: string | undefined
                  status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                  tags?: { key: string; value: string }[] | undefined
                  customFields?:
                    | {
                        [x: string]: string | number | boolean | string[] | { [x: string]: unknown }
                      }
                    | undefined
                }
                relationships?:
                  | {
                      parent?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      children?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      owner?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      members?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            }
            output: {
              data: {
                id: string
                type: 'user' | 'organization' | 'project' | 'resource'
                attributes: {
                  name?: string | undefined
                  description?: string | undefined
                  status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                  tags?: { key: string; value: string }[] | undefined
                  customFields?:
                    | {
                        [x: string]: string | number | boolean | string[] | { [x: string]: unknown }
                      }
                    | undefined
                }
                relationships?:
                  | {
                      parent?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      children?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      owner?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      members?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
                meta?:
                  | {
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      version?: number | undefined
                      etag?: string | undefined
                      permissions?:
                        | {
                            canRead?: boolean | undefined
                            canWrite?: boolean | undefined
                            canDelete?: boolean | undefined
                            canShare?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                links?:
                  | {
                      self?: string | undefined
                      collection?: string | undefined
                      related?: { [x: string]: string } | undefined
                    }
                  | undefined
              }
              included?:
                | {
                    id: string
                    type: 'user' | 'organization' | 'project' | 'resource'
                    attributes: {
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?:
                        | {
                            [x: string]:
                              | string
                              | number
                              | boolean
                              | string[]
                              | { [x: string]: unknown }
                          }
                        | undefined
                    }
                    relationships?:
                      | {
                          parent?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          children?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }[]
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          owner?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          members?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }[]
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    meta?:
                      | {
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          permissions?:
                            | {
                                canRead?: boolean | undefined
                                canWrite?: boolean | undefined
                                canDelete?: boolean | undefined
                                canShare?: boolean | undefined
                              }
                            | undefined
                        }
                      | undefined
                    links?:
                      | {
                          self?: string | undefined
                          collection?: string | undefined
                          related?: { [x: string]: string } | undefined
                        }
                      | undefined
                  }[]
                | undefined
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { header: { 'Idempotency-Key'?: string | undefined } } & {
              json: {
                type: 'user' | 'organization' | 'project' | 'resource'
                attributes: {
                  name?: string | undefined
                  description?: string | undefined
                  status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                  tags?: { key: string; value: string }[] | undefined
                  customFields?:
                    | {
                        [x: string]: string | number | boolean | string[] | { [x: string]: unknown }
                      }
                    | undefined
                }
                relationships?:
                  | {
                      parent?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      children?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      owner?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      members?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            }
            output: {
              errors: {
                id?: string | undefined
                status: string
                code: string
                title: string
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?: { [x: string]: unknown } | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { header: { 'Idempotency-Key'?: string | undefined } } & {
              json: {
                type: 'user' | 'organization' | 'project' | 'resource'
                attributes: {
                  name?: string | undefined
                  description?: string | undefined
                  status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                  tags?: { key: string; value: string }[] | undefined
                  customFields?:
                    | {
                        [x: string]: string | number | boolean | string[] | { [x: string]: unknown }
                      }
                    | undefined
                }
                relationships?:
                  | {
                      parent?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      children?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      owner?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      members?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            }
            output: {
              errors: {
                id?: string | undefined
                status: string
                code: string
                title: string
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?: { [x: string]: unknown } | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 409
          }
    }
  } & {
    '/entities/:entityId': {
      $get:
        | {
            input: { param: { entityId: string } } & {
              query: { include?: ('parent' | 'children' | 'owner' | 'members')[] | undefined }
            } & { header: { 'If-None-Match'?: string | undefined } }
            output: {
              data: {
                id: string
                type: 'user' | 'organization' | 'project' | 'resource'
                attributes: {
                  name?: string | undefined
                  description?: string | undefined
                  status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                  tags?: { key: string; value: string }[] | undefined
                  customFields?:
                    | {
                        [x: string]: string | number | boolean | string[] | { [x: string]: unknown }
                      }
                    | undefined
                }
                relationships?:
                  | {
                      parent?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      children?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      owner?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      members?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
                meta?:
                  | {
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      version?: number | undefined
                      etag?: string | undefined
                      permissions?:
                        | {
                            canRead?: boolean | undefined
                            canWrite?: boolean | undefined
                            canDelete?: boolean | undefined
                            canShare?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                links?:
                  | {
                      self?: string | undefined
                      collection?: string | undefined
                      related?: { [x: string]: string } | undefined
                    }
                  | undefined
              }
              included?:
                | {
                    id: string
                    type: 'user' | 'organization' | 'project' | 'resource'
                    attributes: {
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?:
                        | {
                            [x: string]:
                              | string
                              | number
                              | boolean
                              | string[]
                              | { [x: string]: unknown }
                          }
                        | undefined
                    }
                    relationships?:
                      | {
                          parent?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          children?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }[]
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          owner?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          members?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }[]
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    meta?:
                      | {
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          permissions?:
                            | {
                                canRead?: boolean | undefined
                                canWrite?: boolean | undefined
                                canDelete?: boolean | undefined
                                canShare?: boolean | undefined
                              }
                            | undefined
                        }
                      | undefined
                    links?:
                      | {
                          self?: string | undefined
                          collection?: string | undefined
                          related?: { [x: string]: string } | undefined
                        }
                      | undefined
                  }[]
                | undefined
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { entityId: string } } & {
              query: { include?: ('parent' | 'children' | 'owner' | 'members')[] | undefined }
            } & { header: { 'If-None-Match'?: string | undefined } }
            output: {}
            outputFormat: string
            status: 304
          }
        | {
            input: { param: { entityId: string } } & {
              query: { include?: ('parent' | 'children' | 'owner' | 'members')[] | undefined }
            } & { header: { 'If-None-Match'?: string | undefined } }
            output: {
              errors: {
                id?: string | undefined
                status: string
                code: string
                title: string
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?: { [x: string]: unknown } | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 404
          }
      $put:
        | {
            input: { param: { entityId: string } } & {
              header: { 'If-Match'?: string | undefined }
            } & {
              json: {
                attributes?:
                  | {
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?:
                        | {
                            [x: string]:
                              | string
                              | number
                              | boolean
                              | string[]
                              | { [x: string]: unknown }
                          }
                        | undefined
                    }
                  | undefined
                relationships?:
                  | {
                      parent?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      children?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      owner?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      members?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            }
            output: {
              data: {
                id: string
                type: 'user' | 'organization' | 'project' | 'resource'
                attributes: {
                  name?: string | undefined
                  description?: string | undefined
                  status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                  tags?: { key: string; value: string }[] | undefined
                  customFields?:
                    | {
                        [x: string]: string | number | boolean | string[] | { [x: string]: unknown }
                      }
                    | undefined
                }
                relationships?:
                  | {
                      parent?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      children?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      owner?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      members?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
                meta?:
                  | {
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      version?: number | undefined
                      etag?: string | undefined
                      permissions?:
                        | {
                            canRead?: boolean | undefined
                            canWrite?: boolean | undefined
                            canDelete?: boolean | undefined
                            canShare?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                links?:
                  | {
                      self?: string | undefined
                      collection?: string | undefined
                      related?: { [x: string]: string } | undefined
                    }
                  | undefined
              }
              included?:
                | {
                    id: string
                    type: 'user' | 'organization' | 'project' | 'resource'
                    attributes: {
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?:
                        | {
                            [x: string]:
                              | string
                              | number
                              | boolean
                              | string[]
                              | { [x: string]: unknown }
                          }
                        | undefined
                    }
                    relationships?:
                      | {
                          parent?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          children?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }[]
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          owner?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                          members?:
                            | {
                                data?:
                                  | {
                                      type: 'user' | 'organization' | 'project' | 'resource'
                                      id: string
                                    }[]
                                  | undefined
                                links?:
                                  | { self?: string | undefined; related?: string | undefined }
                                  | undefined
                                meta?:
                                  | { count?: number | undefined; createdAt?: string | undefined }
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    meta?:
                      | {
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          permissions?:
                            | {
                                canRead?: boolean | undefined
                                canWrite?: boolean | undefined
                                canDelete?: boolean | undefined
                                canShare?: boolean | undefined
                              }
                            | undefined
                        }
                      | undefined
                    links?:
                      | {
                          self?: string | undefined
                          collection?: string | undefined
                          related?: { [x: string]: string } | undefined
                        }
                      | undefined
                  }[]
                | undefined
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { entityId: string } } & {
              header: { 'If-Match'?: string | undefined }
            } & {
              json: {
                attributes?:
                  | {
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?:
                        | {
                            [x: string]:
                              | string
                              | number
                              | boolean
                              | string[]
                              | { [x: string]: unknown }
                          }
                        | undefined
                    }
                  | undefined
                relationships?:
                  | {
                      parent?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      children?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      owner?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      members?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            }
            output: {
              errors: {
                id?: string | undefined
                status: string
                code: string
                title: string
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?: { [x: string]: unknown } | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { entityId: string } } & {
              header: { 'If-Match'?: string | undefined }
            } & {
              json: {
                attributes?:
                  | {
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?:
                        | {
                            [x: string]:
                              | string
                              | number
                              | boolean
                              | string[]
                              | { [x: string]: unknown }
                          }
                        | undefined
                    }
                  | undefined
                relationships?:
                  | {
                      parent?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      children?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      owner?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      members?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            }
            output: {
              errors: {
                id?: string | undefined
                status: string
                code: string
                title: string
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?: { [x: string]: unknown } | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 409
          }
        | {
            input: { param: { entityId: string } } & {
              header: { 'If-Match'?: string | undefined }
            } & {
              json: {
                attributes?:
                  | {
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?:
                        | {
                            [x: string]:
                              | string
                              | number
                              | boolean
                              | string[]
                              | { [x: string]: unknown }
                          }
                        | undefined
                    }
                  | undefined
                relationships?:
                  | {
                      parent?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      children?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      owner?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                      members?:
                        | {
                            data?:
                              | {
                                  type: 'user' | 'organization' | 'project' | 'resource'
                                  id: string
                                }[]
                              | undefined
                            links?:
                              | { self?: string | undefined; related?: string | undefined }
                              | undefined
                            meta?:
                              | { count?: number | undefined; createdAt?: string | undefined }
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            }
            output: {
              errors: {
                id?: string | undefined
                status: string
                code: string
                title: string
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?: { [x: string]: unknown } | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 412
          }
      $delete:
        | {
            input: { param: { entityId: string } } & { header: { 'If-Match'?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { param: { entityId: string } } & { header: { 'If-Match'?: string | undefined } }
            output: {
              errors: {
                id?: string | undefined
                status: string
                code: string
                title: string
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?: { [x: string]: unknown } | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/entities/:entityId/relationships': {
      $get: {
        input: { param: { entityId: string } }
        output: {
          data?:
            | { type: 'user' | 'organization' | 'project' | 'resource'; id: string }[]
            | undefined
          links?: { self?: string | undefined; related?: string | undefined } | undefined
          meta?: { count?: number | undefined; createdAt?: string | undefined } | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { entityId: string } } & {
          json: {
            type: string
            targetId: string
            meta?: { count?: number | undefined; createdAt?: string | undefined } | undefined
          }
        }
        output: {
          data?: { type: 'user' | 'organization' | 'project' | 'resource'; id: string } | undefined
          links?: { self?: string | undefined; related?: string | undefined } | undefined
          meta?: { count?: number | undefined; createdAt?: string | undefined } | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/batch': {
      $post:
        | {
            input: {
              json: {
                operations: {
                  id?: string | undefined
                  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
                  path: string
                  headers?: { [x: string]: string } | undefined
                  body?:
                    | {
                        type: 'user' | 'organization' | 'project' | 'resource'
                        attributes: {
                          name?: string | undefined
                          description?: string | undefined
                          status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                          tags?: { key: string; value: string }[] | undefined
                          customFields?:
                            | {
                                [x: string]:
                                  | string
                                  | number
                                  | boolean
                                  | string[]
                                  | { [x: string]: unknown }
                              }
                            | undefined
                        }
                        relationships?:
                          | {
                              parent?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              children?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              owner?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              members?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                      }
                    | {
                        attributes?:
                          | {
                              name?: string | undefined
                              description?: string | undefined
                              status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                              tags?: { key: string; value: string }[] | undefined
                              customFields?:
                                | {
                                    [x: string]:
                                      | string
                                      | number
                                      | boolean
                                      | string[]
                                      | { [x: string]: unknown }
                                  }
                                | undefined
                            }
                          | undefined
                        relationships?:
                          | {
                              parent?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              children?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              owner?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              members?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                      }
                    | undefined
                }[]
              }
            }
            output: {
              responses: {
                id: string
                status: number
                headers?: { [x: string]: string } | undefined
                body?:
                  | {
                      data: {
                        id: string
                        type: 'user' | 'organization' | 'project' | 'resource'
                        attributes: {
                          name?: string | undefined
                          description?: string | undefined
                          status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                          tags?: { key: string; value: string }[] | undefined
                          customFields?:
                            | {
                                [x: string]:
                                  | string
                                  | number
                                  | boolean
                                  | string[]
                                  | { [x: string]: unknown }
                              }
                            | undefined
                        }
                        relationships?:
                          | {
                              parent?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              children?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              owner?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              members?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        meta?:
                          | {
                              createdAt?: string | undefined
                              updatedAt?: string | undefined
                              version?: number | undefined
                              etag?: string | undefined
                              permissions?:
                                | {
                                    canRead?: boolean | undefined
                                    canWrite?: boolean | undefined
                                    canDelete?: boolean | undefined
                                    canShare?: boolean | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        links?:
                          | {
                              self?: string | undefined
                              collection?: string | undefined
                              related?: { [x: string]: string } | undefined
                            }
                          | undefined
                      }
                      included?:
                        | {
                            id: string
                            type: 'user' | 'organization' | 'project' | 'resource'
                            attributes: {
                              name?: string | undefined
                              description?: string | undefined
                              status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                              tags?: { key: string; value: string }[] | undefined
                              customFields?:
                                | {
                                    [x: string]:
                                      | string
                                      | number
                                      | boolean
                                      | string[]
                                      | { [x: string]: unknown }
                                  }
                                | undefined
                            }
                            relationships?:
                              | {
                                  parent?:
                                    | {
                                        data?:
                                          | {
                                              type: 'user' | 'organization' | 'project' | 'resource'
                                              id: string
                                            }
                                          | undefined
                                        links?:
                                          | {
                                              self?: string | undefined
                                              related?: string | undefined
                                            }
                                          | undefined
                                        meta?:
                                          | {
                                              count?: number | undefined
                                              createdAt?: string | undefined
                                            }
                                          | undefined
                                      }
                                    | undefined
                                  children?:
                                    | {
                                        data?:
                                          | {
                                              type: 'user' | 'organization' | 'project' | 'resource'
                                              id: string
                                            }[]
                                          | undefined
                                        links?:
                                          | {
                                              self?: string | undefined
                                              related?: string | undefined
                                            }
                                          | undefined
                                        meta?:
                                          | {
                                              count?: number | undefined
                                              createdAt?: string | undefined
                                            }
                                          | undefined
                                      }
                                    | undefined
                                  owner?:
                                    | {
                                        data?:
                                          | {
                                              type: 'user' | 'organization' | 'project' | 'resource'
                                              id: string
                                            }
                                          | undefined
                                        links?:
                                          | {
                                              self?: string | undefined
                                              related?: string | undefined
                                            }
                                          | undefined
                                        meta?:
                                          | {
                                              count?: number | undefined
                                              createdAt?: string | undefined
                                            }
                                          | undefined
                                      }
                                    | undefined
                                  members?:
                                    | {
                                        data?:
                                          | {
                                              type: 'user' | 'organization' | 'project' | 'resource'
                                              id: string
                                            }[]
                                          | undefined
                                        links?:
                                          | {
                                              self?: string | undefined
                                              related?: string | undefined
                                            }
                                          | undefined
                                        meta?:
                                          | {
                                              count?: number | undefined
                                              createdAt?: string | undefined
                                            }
                                          | undefined
                                      }
                                    | undefined
                                }
                              | undefined
                            meta?:
                              | {
                                  createdAt?: string | undefined
                                  updatedAt?: string | undefined
                                  version?: number | undefined
                                  etag?: string | undefined
                                  permissions?:
                                    | {
                                        canRead?: boolean | undefined
                                        canWrite?: boolean | undefined
                                        canDelete?: boolean | undefined
                                        canShare?: boolean | undefined
                                      }
                                    | undefined
                                }
                              | undefined
                            links?:
                              | {
                                  self?: string | undefined
                                  collection?: string | undefined
                                  related?: { [x: string]: string } | undefined
                                }
                              | undefined
                          }[]
                        | undefined
                      meta?:
                        | { requestId?: string | undefined; processingTime?: number | undefined }
                        | undefined
                    }
                  | {
                      errors: {
                        id?: string | undefined
                        status: string
                        code: string
                        title: string
                        detail?: string | undefined
                        source?:
                          | {
                              pointer?: string | undefined
                              parameter?: string | undefined
                              header?: string | undefined
                            }
                          | undefined
                        meta?: { [x: string]: unknown } | undefined
                      }[]
                      meta?:
                        | { requestId?: string | undefined; processingTime?: number | undefined }
                        | undefined
                    }
                  | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                operations: {
                  id?: string | undefined
                  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
                  path: string
                  headers?: { [x: string]: string } | undefined
                  body?:
                    | {
                        type: 'user' | 'organization' | 'project' | 'resource'
                        attributes: {
                          name?: string | undefined
                          description?: string | undefined
                          status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                          tags?: { key: string; value: string }[] | undefined
                          customFields?:
                            | {
                                [x: string]:
                                  | string
                                  | number
                                  | boolean
                                  | string[]
                                  | { [x: string]: unknown }
                              }
                            | undefined
                        }
                        relationships?:
                          | {
                              parent?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              children?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              owner?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              members?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                      }
                    | {
                        attributes?:
                          | {
                              name?: string | undefined
                              description?: string | undefined
                              status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                              tags?: { key: string; value: string }[] | undefined
                              customFields?:
                                | {
                                    [x: string]:
                                      | string
                                      | number
                                      | boolean
                                      | string[]
                                      | { [x: string]: unknown }
                                  }
                                | undefined
                            }
                          | undefined
                        relationships?:
                          | {
                              parent?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              children?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              owner?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              members?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                      }
                    | undefined
                }[]
              }
            }
            output: {
              responses: {
                id: string
                status: number
                headers?: { [x: string]: string } | undefined
                body?:
                  | {
                      data: {
                        id: string
                        type: 'user' | 'organization' | 'project' | 'resource'
                        attributes: {
                          name?: string | undefined
                          description?: string | undefined
                          status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                          tags?: { key: string; value: string }[] | undefined
                          customFields?:
                            | {
                                [x: string]:
                                  | string
                                  | number
                                  | boolean
                                  | string[]
                                  | { [x: string]: unknown }
                              }
                            | undefined
                        }
                        relationships?:
                          | {
                              parent?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              children?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              owner?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                              members?:
                                | {
                                    data?:
                                      | {
                                          type: 'user' | 'organization' | 'project' | 'resource'
                                          id: string
                                        }[]
                                      | undefined
                                    links?:
                                      | { self?: string | undefined; related?: string | undefined }
                                      | undefined
                                    meta?:
                                      | {
                                          count?: number | undefined
                                          createdAt?: string | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        meta?:
                          | {
                              createdAt?: string | undefined
                              updatedAt?: string | undefined
                              version?: number | undefined
                              etag?: string | undefined
                              permissions?:
                                | {
                                    canRead?: boolean | undefined
                                    canWrite?: boolean | undefined
                                    canDelete?: boolean | undefined
                                    canShare?: boolean | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        links?:
                          | {
                              self?: string | undefined
                              collection?: string | undefined
                              related?: { [x: string]: string } | undefined
                            }
                          | undefined
                      }
                      included?:
                        | {
                            id: string
                            type: 'user' | 'organization' | 'project' | 'resource'
                            attributes: {
                              name?: string | undefined
                              description?: string | undefined
                              status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                              tags?: { key: string; value: string }[] | undefined
                              customFields?:
                                | {
                                    [x: string]:
                                      | string
                                      | number
                                      | boolean
                                      | string[]
                                      | { [x: string]: unknown }
                                  }
                                | undefined
                            }
                            relationships?:
                              | {
                                  parent?:
                                    | {
                                        data?:
                                          | {
                                              type: 'user' | 'organization' | 'project' | 'resource'
                                              id: string
                                            }
                                          | undefined
                                        links?:
                                          | {
                                              self?: string | undefined
                                              related?: string | undefined
                                            }
                                          | undefined
                                        meta?:
                                          | {
                                              count?: number | undefined
                                              createdAt?: string | undefined
                                            }
                                          | undefined
                                      }
                                    | undefined
                                  children?:
                                    | {
                                        data?:
                                          | {
                                              type: 'user' | 'organization' | 'project' | 'resource'
                                              id: string
                                            }[]
                                          | undefined
                                        links?:
                                          | {
                                              self?: string | undefined
                                              related?: string | undefined
                                            }
                                          | undefined
                                        meta?:
                                          | {
                                              count?: number | undefined
                                              createdAt?: string | undefined
                                            }
                                          | undefined
                                      }
                                    | undefined
                                  owner?:
                                    | {
                                        data?:
                                          | {
                                              type: 'user' | 'organization' | 'project' | 'resource'
                                              id: string
                                            }
                                          | undefined
                                        links?:
                                          | {
                                              self?: string | undefined
                                              related?: string | undefined
                                            }
                                          | undefined
                                        meta?:
                                          | {
                                              count?: number | undefined
                                              createdAt?: string | undefined
                                            }
                                          | undefined
                                      }
                                    | undefined
                                  members?:
                                    | {
                                        data?:
                                          | {
                                              type: 'user' | 'organization' | 'project' | 'resource'
                                              id: string
                                            }[]
                                          | undefined
                                        links?:
                                          | {
                                              self?: string | undefined
                                              related?: string | undefined
                                            }
                                          | undefined
                                        meta?:
                                          | {
                                              count?: number | undefined
                                              createdAt?: string | undefined
                                            }
                                          | undefined
                                      }
                                    | undefined
                                }
                              | undefined
                            meta?:
                              | {
                                  createdAt?: string | undefined
                                  updatedAt?: string | undefined
                                  version?: number | undefined
                                  etag?: string | undefined
                                  permissions?:
                                    | {
                                        canRead?: boolean | undefined
                                        canWrite?: boolean | undefined
                                        canDelete?: boolean | undefined
                                        canShare?: boolean | undefined
                                      }
                                    | undefined
                                }
                              | undefined
                            links?:
                              | {
                                  self?: string | undefined
                                  collection?: string | undefined
                                  related?: { [x: string]: string } | undefined
                                }
                              | undefined
                          }[]
                        | undefined
                      meta?:
                        | { requestId?: string | undefined; processingTime?: number | undefined }
                        | undefined
                    }
                  | {
                      errors: {
                        id?: string | undefined
                        status: string
                        code: string
                        title: string
                        detail?: string | undefined
                        source?:
                          | {
                              pointer?: string | undefined
                              parameter?: string | undefined
                              header?: string | undefined
                            }
                          | undefined
                        meta?: { [x: string]: unknown } | undefined
                      }[]
                      meta?:
                        | { requestId?: string | undefined; processingTime?: number | undefined }
                        | undefined
                    }
                  | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 207
          }
    }
  },
  '/'
>
export default routes
