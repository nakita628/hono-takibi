declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/test': {
      $get:
        | {
            input: {
              query: {
                refParam?: { id: string; name: string; value?: number | undefined } | undefined
              }
            }
            output: {
              data?:
                | {
                    data?:
                      | {
                          data?:
                            | {
                                data?:
                                  | {
                                      data?:
                                        | {
                                            data?:
                                              | {
                                                  data?:
                                                    | {
                                                        data?:
                                                          | {
                                                              data?:
                                                                | {
                                                                    data?:
                                                                      | {
                                                                          data?: any | undefined
                                                                          meta?: string | undefined
                                                                        }
                                                                      | undefined
                                                                    meta?: string | undefined
                                                                  }
                                                                | undefined
                                                              meta?: string | undefined
                                                            }
                                                          | undefined
                                                        meta?: string | undefined
                                                      }
                                                    | undefined
                                                  meta?: string | undefined
                                                }
                                              | undefined
                                            meta?: string | undefined
                                          }
                                        | undefined
                                      meta?: string | undefined
                                    }
                                  | undefined
                                meta?: string | undefined
                              }
                            | undefined
                          meta?: string | undefined
                        }
                      | undefined
                    meta?: string | undefined
                  }
                | undefined
              meta?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                refParam?: { id: string; name: string; value?: number | undefined } | undefined
              }
            }
            output: { id: string; name: string; value?: number | undefined }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              query: {
                refParam?: { id: string; name: string; value?: number | undefined } | undefined
              }
            }
            output: {
              error?: string | undefined
              details?: { shared?: string | undefined; timestamp?: string | undefined } | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              query: {
                refParam?: { id: string; name: string; value?: number | undefined } | undefined
              }
            }
            output: {
              error?: string | undefined
              details?: { shared?: string | undefined; timestamp?: string | undefined } | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                refParam?: { id: string; name: string; value?: number | undefined } | undefined
              }
            }
            output: {
              error?: string | undefined
              details?: { shared?: string | undefined; timestamp?: string | undefined } | undefined
            }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                refParam?: { id: string; name: string; value?: number | undefined } | undefined
              }
            }
            output: {
              error?: string | undefined
              details?: { shared?: string | undefined; timestamp?: string | undefined } | undefined
            }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: {
              query: {
                refParam?: { id: string; name: string; value?: number | undefined } | undefined
              }
            }
            output: {
              error?: string | undefined
              details?: { shared?: string | undefined; timestamp?: string | undefined } | undefined
            }
            outputFormat: 'json'
            status: 500
          }
    }
  } & {
    '/empty-refs': {
      $get:
        | {
            input: {}
            output: Response
            outputFormat: 'json'
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').StatusCode
          }
        | { input: {}; output: {}; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/unicode-refs': {
      $get: {
        input: {}
        output: { 名前?: string | undefined; 値?: number | undefined; 子要素?: any[] | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/special-chars': {
      $get: {
        input: {}
        output: { field_one?: string | undefined; field_two?: string | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/numeric-start': {
      $get: {
        input: {}
        output: {
          enabled?: boolean | undefined
          method?: 'sms' | 'email' | 'authenticator' | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/ref-in-allof': {
      $get: {
        input: {}
        output: {
          id?: string | undefined
          ext1?: string | undefined
          ext2?: string | undefined
          ext3?: string | undefined
          inline?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/deeply-nested': {
      $get: {
        input: {}
        output: {
          wrapped?:
            | {
                wrapped?:
                  | {
                      wrapped?:
                        | {
                            wrapped?:
                              | { content?: { value?: string | undefined } | undefined }
                              | undefined
                          }
                        | undefined
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
    '/same-name-diff-context': {
      $get: {
        input: {}
        output: {
          item?: { id: string; name: string; value?: number | undefined } | undefined
          itemRef?:
            | {
                itemId: string
                item?: { id: string; name: string; value?: number | undefined } | undefined
              }
            | undefined
          itemList?:
            | {
                items: { id: string; name: string; value?: number | undefined }[]
                total?: number | undefined
              }
            | undefined
          itemMap?:
            | { [x: string]: { id: string; name: string; value?: number | undefined } }
            | undefined
          itemTree?:
            | {
                item?: { id: string; name: string; value?: number | undefined } | undefined
                children?: any[] | undefined
              }
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
