declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  { '/all-methods': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/all-methods': { $post: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/all-methods': { $put: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/all-methods': { $delete: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/all-methods': { $patch: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/all-methods': { $options: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/all-methods': { $head: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/all-methods': { $trace: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/users/:userId/posts/:postId/comments/:commentId': {
      $get: {
        input: { param: { userId: string; postId: number; commentId: string } }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/params-test/:pathParam': {
      $get: {
        input: { param: { pathParam: string } } & { query: { queryParam?: string | undefined } } & {
          header: { 'X-Header-Param'?: string | undefined }
        } & { cookie: { session_id?: string | undefined } }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & { '/no-content': { $post: { input: {}; output: {}; outputFormat: string; status: 204 } } } & {
    '/multi-content': {
      $get:
        | {
            input: {}
            output: Response
            outputFormat: 'json'
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').StatusCode
          }
        | {
            input: {}
            output:
              | string
              | { data?: {} | undefined }
              | { data?: string | undefined }
              | {
                  readonly type: string
                  readonly size: number
                  readonly lastModified: number
                  readonly name: string
                  readonly webkitRelativePath: string
                  slice: never
                }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output:
              | string
              | { data?: Record<string, never> | undefined }
              | { data?: string | undefined }
              | import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
            outputFormat: 'text'
            status: 200
          }
    }
  } & {
    '/multi-content': {
      $post: {
        input: {
          form:
            | { data?: Record<string, never> | undefined }
            | {
                file?:
                  | import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
                  | undefined
                metadata?: string | undefined
              }
            | { field1?: string | undefined; field2?: string | undefined }
        } & {
          json:
            | { data?: Record<string, never> | undefined }
            | {
                file?:
                  | import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
                  | undefined
                metadata?: string | undefined
              }
            | { field1?: string | undefined; field2?: string | undefined }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  } & {
    '/response-ranges': {
      $get:
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status:
              | 100
              | 101
              | 102
              | 103
              | 203
              | 205
              | 206
              | 207
              | 208
              | 226
              | 300
              | 303
              | 305
              | 306
              | 307
              | 308
              | 402
              | 406
              | 407
              | 408
              | 411
              | 413
              | 414
              | 416
              | 417
              | 418
              | 421
              | 423
              | 424
              | 425
              | 426
              | 428
              | 431
              | 451
              | 501
              | 505
              | 506
              | 507
              | 508
              | 510
              | 511
              | -1
          }
    }
  } & { '/deprecated': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/no-operation-id': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/empty-body': {
      $post: {
        input: { json: Record<string, never> }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/circular': {
      $get: {
        input: {}
        output: {
          value?: string | undefined
          children?: any[] | undefined
          parent?: any | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/deep-nesting': {
      $get: {
        input: {}
        output: {
          level1?:
            | {
                level2?:
                  | {
                      level3?:
                        | {
                            level4?:
                              | { level5?: { value?: string | undefined } | undefined }
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
    '/array-params': {
      $get: {
        input: {
          query: {
            ids?: string[] | undefined
            tags?: string[] | undefined
            values?: number[] | undefined
            coords?: number[] | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/object-param': {
      $get: {
        input: {
          query: {
            filter?:
              | {
                  name?: string | undefined
                  minPrice?: number | undefined
                  maxPrice?: number | undefined
                }
              | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  },
  '/'
>
export default routes
