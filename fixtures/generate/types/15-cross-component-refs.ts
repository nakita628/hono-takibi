declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/entities': {
      $get:
        | {
            input: {
              query: {
                filter?: unknown
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
                  [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                          | { [x: string]: string | number | boolean | string[] | any }
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
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                              | { [x: string]: string | number | boolean | string[] | any }
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
                filter?: unknown
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
                status: string
                code: string
                title: string
                id?: string | undefined
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
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
                filter?: unknown
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
                status: string
                code: string
                title: string
                id?: string | undefined
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/entities': {
      $post:
        | {
            input: { header: { 'Idempotency-Key'?: string | undefined } } & {
              json: {
                type: 'user' | 'organization' | 'project' | 'resource'
                attributes: {
                  [x: string]: unknown
                  name?: string | undefined
                  description?: string | undefined
                  status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                  tags?: { key: string; value: string }[] | undefined
                  customFields?: Record<string, unknown> | undefined
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
                status: string
                code: string
                title: string
                id?: string | undefined
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
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
                  [x: string]: unknown
                  name?: string | undefined
                  description?: string | undefined
                  status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                  tags?: { key: string; value: string }[] | undefined
                  customFields?: Record<string, unknown> | undefined
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
                  [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                          | { [x: string]: string | number | boolean | string[] | any }
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
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                              | { [x: string]: string | number | boolean | string[] | any }
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
                  [x: string]: unknown
                  name?: string | undefined
                  description?: string | undefined
                  status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                  tags?: { key: string; value: string }[] | undefined
                  customFields?: Record<string, unknown> | undefined
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
                status: string
                code: string
                title: string
                id?: string | undefined
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
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
                  [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                          | { [x: string]: string | number | boolean | string[] | any }
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
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                              | { [x: string]: string | number | boolean | string[] | any }
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
                status: string
                code: string
                title: string
                id?: string | undefined
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
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
    '/entities/:entityId': {
      $put:
        | {
            input: { param: { entityId: string } } & {
              header: { 'If-Match'?: string | undefined }
            } & {
              json: {
                attributes?:
                  | {
                      [x: string]: unknown
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?: Record<string, unknown> | undefined
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
                status: string
                code: string
                title: string
                id?: string | undefined
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
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
                      [x: string]: unknown
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?: Record<string, unknown> | undefined
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
                  [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                          | { [x: string]: string | number | boolean | string[] | any }
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
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                              | { [x: string]: string | number | boolean | string[] | any }
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
                      [x: string]: unknown
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?: Record<string, unknown> | undefined
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
                status: string
                code: string
                title: string
                id?: string | undefined
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
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
                      [x: string]: unknown
                      name?: string | undefined
                      description?: string | undefined
                      status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                      tags?: { key: string; value: string }[] | undefined
                      customFields?: Record<string, unknown> | undefined
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
                status: string
                code: string
                title: string
                id?: string | undefined
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 412
          }
    }
  } & {
    '/entities/:entityId': {
      $delete:
        | {
            input: { param: { entityId: string } } & { header: { 'If-Match'?: string | undefined } }
            output: {
              errors: {
                status: string
                code: string
                title: string
                id?: string | undefined
                detail?: string | undefined
                source?:
                  | {
                      pointer?: string | undefined
                      parameter?: string | undefined
                      header?: string | undefined
                    }
                  | undefined
                meta?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
              }[]
              meta?:
                | { requestId?: string | undefined; processingTime?: number | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { entityId: string } } & { header: { 'If-Match'?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
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
    }
  } & {
    '/entities/:entityId/relationships': {
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
                  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
                  path: string
                  id?: string | undefined
                  headers?: Record<string, string> | undefined
                  body?:
                    | {
                        type: 'user' | 'organization' | 'project' | 'resource'
                        attributes: {
                          [x: string]: unknown
                          name?: string | undefined
                          description?: string | undefined
                          status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                          tags?: { key: string; value: string }[] | undefined
                          customFields?: Record<string, unknown> | undefined
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
                              [x: string]: unknown
                              name?: string | undefined
                              description?: string | undefined
                              status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                              tags?: { key: string; value: string }[] | undefined
                              customFields?: Record<string, unknown> | undefined
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
                      errors: {
                        status: string
                        code: string
                        title: string
                        id?: string | undefined
                        detail?: string | undefined
                        source?:
                          | {
                              pointer?: string | undefined
                              parameter?: string | undefined
                              header?: string | undefined
                            }
                          | undefined
                        meta?:
                          | {
                              [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                            }
                          | undefined
                      }[]
                      meta?:
                        | { requestId?: string | undefined; processingTime?: number | undefined }
                        | undefined
                    }
                  | {
                      data: {
                        id: string
                        type: 'user' | 'organization' | 'project' | 'resource'
                        attributes: {
                          [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                                  | { [x: string]: string | number | boolean | string[] | any }
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
                              [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                                      | { [x: string]: string | number | boolean | string[] | any }
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
                  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
                  path: string
                  id?: string | undefined
                  headers?: Record<string, string> | undefined
                  body?:
                    | {
                        type: 'user' | 'organization' | 'project' | 'resource'
                        attributes: {
                          [x: string]: unknown
                          name?: string | undefined
                          description?: string | undefined
                          status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                          tags?: { key: string; value: string }[] | undefined
                          customFields?: Record<string, unknown> | undefined
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
                              [x: string]: unknown
                              name?: string | undefined
                              description?: string | undefined
                              status?: 'active' | 'inactive' | 'pending' | 'archived' | undefined
                              tags?: { key: string; value: string }[] | undefined
                              customFields?: Record<string, unknown> | undefined
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
                      errors: {
                        status: string
                        code: string
                        title: string
                        id?: string | undefined
                        detail?: string | undefined
                        source?:
                          | {
                              pointer?: string | undefined
                              parameter?: string | undefined
                              header?: string | undefined
                            }
                          | undefined
                        meta?:
                          | {
                              [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                            }
                          | undefined
                      }[]
                      meta?:
                        | { requestId?: string | undefined; processingTime?: number | undefined }
                        | undefined
                    }
                  | {
                      data: {
                        id: string
                        type: 'user' | 'organization' | 'project' | 'resource'
                        attributes: {
                          [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                                  | { [x: string]: string | number | boolean | string[] | any }
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
                              [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
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
                                      | { [x: string]: string | number | boolean | string[] | any }
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
