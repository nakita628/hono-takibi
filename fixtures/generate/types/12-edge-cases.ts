declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/all-methods': {
      $get: { input: {}; output: {}; outputFormat: string; status: 200 }
      $post: { input: {}; output: {}; outputFormat: string; status: 200 }
      $put: { input: {}; output: {}; outputFormat: string; status: 200 }
      $delete: { input: {}; output: {}; outputFormat: string; status: 200 }
      $patch: { input: {}; output: {}; outputFormat: string; status: 200 }
      $options: { input: {}; output: {}; outputFormat: string; status: 200 }
      $head: { input: {}; output: {}; outputFormat: string; status: 200 }
      $trace: { input: {}; output: {}; outputFormat: string; status: 200 }
    }
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
            output: { data?: { [x: string]: unknown } | undefined }
            outputFormat: 'json'
            status: 200
          }
        | { input: {}; output: { data?: string | undefined }; outputFormat: 'text'; status: 200 }
        | { input: {}; output: string; outputFormat: 'text'; status: 200 }
        | { input: {}; output: string; outputFormat: 'text'; status: 200 }
        | { input: {}; output: File; outputFormat: 'text'; status: 200 }
        | { input: {}; output: File; outputFormat: 'text'; status: 200 }
      $post: {
        input: {
          json:
            | { data?: { [x: string]: unknown } | undefined }
            | { field1?: string | undefined; field2?: string | undefined }
        } & {
          form:
            | { file?: File | undefined; metadata?: string | undefined }
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
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
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
        | { input: {}; output: {}; outputFormat: string; status: 200 }
    }
  } & { '/deprecated': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/no-operation-id': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/empty-body': {
      $post: {
        input: { json: { [x: string]: unknown } }
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
          children?: unknown[] | undefined
          parent?: unknown | undefined
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
