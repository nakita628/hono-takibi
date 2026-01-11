declare const routes: import(
  '/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index',
  { with: { 'resolution-mode': 'import' } }
).OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/notifications': {
      $get:
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                read?: string | undefined
                type?: 'error' | 'info' | 'success' | 'warning' | 'system' | undefined
              }
            }
            output: {
              data: {
                id: string
                title: string
                type: 'error' | 'info' | 'success' | 'warning' | 'system'
                read: boolean
                createdAt: string
                body?: string | undefined
                data?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
                actionUrl?: string | undefined
                imageUrl?: string | undefined
                readAt?: string | undefined
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                read?: string | undefined
                type?: 'error' | 'info' | 'success' | 'warning' | 'system' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/notifications/:notificationId': {
      $get:
        | {
            input: { param: { notificationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { notificationId: string } }
            output: {
              id: string
              title: string
              type: 'error' | 'info' | 'success' | 'warning' | 'system'
              read: boolean
              createdAt: string
              body?: string | undefined
              data?:
                | {
                    [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                  }
                | undefined
              actionUrl?: string | undefined
              imageUrl?: string | undefined
              readAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { notificationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/notifications/:notificationId': {
      $delete:
        | {
            input: { param: { notificationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { notificationId: string } }
            output: {}
            outputFormat: string
            status: 204
          }
    }
  } & {
    '/notifications/:notificationId/read': {
      $post:
        | {
            input: { param: { notificationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { notificationId: string } }
            output: {
              id: string
              title: string
              type: 'error' | 'info' | 'success' | 'warning' | 'system'
              read: boolean
              createdAt: string
              body?: string | undefined
              data?:
                | {
                    [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                  }
                | undefined
              actionUrl?: string | undefined
              imageUrl?: string | undefined
              readAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/notifications/read-all': {
      $post:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: { updatedCount?: number | undefined }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/notifications/unread-count': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: {}; output: { count?: number | undefined }; outputFormat: 'json'; status: 200 }
    }
  } & {
    [x: string]: {
      $get:
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $post:
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $put:
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $delete:
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $patch:
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $head:
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $options:
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $trace:
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
    }
  } & {
    '/templates': {
      $get:
        | {
            input: {
              query: {
                channel?: 'push' | 'email' | 'sms' | 'in_app' | undefined
                search?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                channel?: 'push' | 'email' | 'sms' | 'in_app' | undefined
                search?: string | undefined
              }
            }
            output: {
              id: string
              name: string
              channel: 'push' | 'email' | 'sms' | 'in_app'
              createdAt: string
              description?: string | undefined
              subject?: string | undefined
              body?: string | undefined
              html?: string | undefined
              variables?:
                | {
                    name?: string | undefined
                    required?: boolean | undefined
                    default?: string | undefined
                  }[]
                | undefined
              active?: boolean | undefined
              updatedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/templates': {
      $post:
        | {
            input: {
              json: {
                name: string
                channel: 'push' | 'email' | 'sms' | 'in_app'
                body: string
                description?: string | undefined
                subject?: string | undefined
                html?: string | undefined
                variables?:
                  | { name: string; required?: boolean | undefined; default?: string | undefined }[]
                  | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                name: string
                channel: 'push' | 'email' | 'sms' | 'in_app'
                body: string
                description?: string | undefined
                subject?: string | undefined
                html?: string | undefined
                variables?:
                  | { name: string; required?: boolean | undefined; default?: string | undefined }[]
                  | undefined
              }
            }
            output: {
              id: string
              name: string
              channel: 'push' | 'email' | 'sms' | 'in_app'
              createdAt: string
              description?: string | undefined
              subject?: string | undefined
              body?: string | undefined
              html?: string | undefined
              variables?:
                | {
                    name?: string | undefined
                    required?: boolean | undefined
                    default?: string | undefined
                  }[]
                | undefined
              active?: boolean | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                name: string
                channel: 'push' | 'email' | 'sms' | 'in_app'
                body: string
                description?: string | undefined
                subject?: string | undefined
                html?: string | undefined
                variables?:
                  | { name: string; required?: boolean | undefined; default?: string | undefined }[]
                  | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/templates/:templateId': {
      $get:
        | {
            input: { param: { templateId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { templateId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { templateId: string } }
            output: {
              id: string
              name: string
              channel: 'push' | 'email' | 'sms' | 'in_app'
              createdAt: string
              description?: string | undefined
              subject?: string | undefined
              body?: string | undefined
              html?: string | undefined
              variables?:
                | {
                    name?: string | undefined
                    required?: boolean | undefined
                    default?: string | undefined
                  }[]
                | undefined
              active?: boolean | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/templates/:templateId': {
      $put:
        | {
            input: { param: { templateId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                subject?: string | undefined
                body?: string | undefined
                html?: string | undefined
                variables?:
                  | { name: string; required?: boolean | undefined; default?: string | undefined }[]
                  | undefined
                active?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { templateId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                subject?: string | undefined
                body?: string | undefined
                html?: string | undefined
                variables?:
                  | { name: string; required?: boolean | undefined; default?: string | undefined }[]
                  | undefined
                active?: boolean | undefined
              }
            }
            output: {
              id: string
              name: string
              channel: 'push' | 'email' | 'sms' | 'in_app'
              createdAt: string
              description?: string | undefined
              subject?: string | undefined
              body?: string | undefined
              html?: string | undefined
              variables?:
                | {
                    name?: string | undefined
                    required?: boolean | undefined
                    default?: string | undefined
                  }[]
                | undefined
              active?: boolean | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/templates/:templateId': {
      $delete:
        | {
            input: { param: { templateId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { templateId: string } }
            output: {}
            outputFormat: string
            status: 204
          }
    }
  } & {
    '/templates/:templateId/preview': {
      $post:
        | {
            input: { param: { templateId: string } } & {
              json: { variables?: Record<string, string> | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { templateId: string } } & {
              json: { variables?: Record<string, string> | undefined }
            }
            output: {
              subject?: string | undefined
              body?: string | undefined
              html?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/channels/preferences': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              email?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              sms?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              push?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              inApp?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
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
    '/channels/preferences': {
      $put:
        | {
            input: {
              json: {
                email?:
                  | {
                      enabled?: boolean | undefined
                      categories?: Record<string, boolean> | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                sms?:
                  | {
                      enabled?: boolean | undefined
                      categories?: Record<string, boolean> | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                push?:
                  | {
                      enabled?: boolean | undefined
                      categories?: Record<string, boolean> | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                inApp?:
                  | {
                      enabled?: boolean | undefined
                      categories?: Record<string, boolean> | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                email?:
                  | {
                      enabled?: boolean | undefined
                      categories?: Record<string, boolean> | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                sms?:
                  | {
                      enabled?: boolean | undefined
                      categories?: Record<string, boolean> | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                push?:
                  | {
                      enabled?: boolean | undefined
                      categories?: Record<string, boolean> | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                inApp?:
                  | {
                      enabled?: boolean | undefined
                      categories?: Record<string, boolean> | undefined
                      quietHours?:
                        | {
                            enabled?: boolean | undefined
                            start?: string | undefined
                            end?: string | undefined
                            timezone?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
              }
            }
            output: {
              email?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              sms?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              push?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              inApp?:
                | {
                    enabled?: boolean | undefined
                    categories?: { [x: string]: boolean } | undefined
                    quietHours?:
                      | {
                          enabled?: boolean | undefined
                          start?: string | undefined
                          end?: string | undefined
                          timezone?: string | undefined
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
    '/channels/devices': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              id: string
              platform: 'ios' | 'android' | 'web'
              token: string
              createdAt: string
              name?: string | undefined
              model?: string | undefined
              osVersion?: string | undefined
              appVersion?: string | undefined
              lastActiveAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/channels/devices': {
      $post:
        | {
            input: {
              json: {
                platform: 'ios' | 'android' | 'web'
                token: string
                name?: string | undefined
                model?: string | undefined
                osVersion?: string | undefined
                appVersion?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                platform: 'ios' | 'android' | 'web'
                token: string
                name?: string | undefined
                model?: string | undefined
                osVersion?: string | undefined
                appVersion?: string | undefined
              }
            }
            output: {
              id: string
              platform: 'ios' | 'android' | 'web'
              token: string
              createdAt: string
              name?: string | undefined
              model?: string | undefined
              osVersion?: string | undefined
              appVersion?: string | undefined
              lastActiveAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/channels/devices/:deviceId': {
      $delete:
        | {
            input: { param: { deviceId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { deviceId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/webhooks': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              id: string
              url: string
              events: (
                | 'message.sent'
                | 'message.delivered'
                | 'message.failed'
                | 'message.opened'
                | 'message.clicked'
                | 'message.bounced'
              )[]
              active: boolean
              createdAt: string
              name?: string | undefined
              secret?: string | undefined
              headers?: { [x: string]: string } | undefined
              updatedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/webhooks': {
      $post:
        | {
            input: {
              json: {
                url: string
                events: (
                  | 'message.sent'
                  | 'message.delivered'
                  | 'message.failed'
                  | 'message.opened'
                  | 'message.clicked'
                  | 'message.bounced'
                )[]
                name?: string | undefined
                headers?: Record<string, string> | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                url: string
                events: (
                  | 'message.sent'
                  | 'message.delivered'
                  | 'message.failed'
                  | 'message.opened'
                  | 'message.clicked'
                  | 'message.bounced'
                )[]
                name?: string | undefined
                headers?: Record<string, string> | undefined
              }
            }
            output: {
              id: string
              url: string
              events: (
                | 'message.sent'
                | 'message.delivered'
                | 'message.failed'
                | 'message.opened'
                | 'message.clicked'
                | 'message.bounced'
              )[]
              active: boolean
              createdAt: string
              name?: string | undefined
              secret?: string | undefined
              headers?: { [x: string]: string } | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/webhooks/:webhookId': {
      $get:
        | {
            input: { param: { webhookId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { webhookId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { webhookId: string } }
            output: {
              id: string
              url: string
              events: (
                | 'message.sent'
                | 'message.delivered'
                | 'message.failed'
                | 'message.opened'
                | 'message.clicked'
                | 'message.bounced'
              )[]
              active: boolean
              createdAt: string
              name?: string | undefined
              secret?: string | undefined
              headers?: { [x: string]: string } | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/webhooks/:webhookId': {
      $put:
        | {
            input: { param: { webhookId: string } } & {
              json: {
                name?: string | undefined
                url?: string | undefined
                events?:
                  | (
                      | 'message.sent'
                      | 'message.delivered'
                      | 'message.failed'
                      | 'message.opened'
                      | 'message.clicked'
                      | 'message.bounced'
                    )[]
                  | undefined
                active?: boolean | undefined
                headers?: Record<string, string> | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { webhookId: string } } & {
              json: {
                name?: string | undefined
                url?: string | undefined
                events?:
                  | (
                      | 'message.sent'
                      | 'message.delivered'
                      | 'message.failed'
                      | 'message.opened'
                      | 'message.clicked'
                      | 'message.bounced'
                    )[]
                  | undefined
                active?: boolean | undefined
                headers?: Record<string, string> | undefined
              }
            }
            output: {
              id: string
              url: string
              events: (
                | 'message.sent'
                | 'message.delivered'
                | 'message.failed'
                | 'message.opened'
                | 'message.clicked'
                | 'message.bounced'
              )[]
              active: boolean
              createdAt: string
              name?: string | undefined
              secret?: string | undefined
              headers?: { [x: string]: string } | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/webhooks/:webhookId': {
      $delete:
        | {
            input: { param: { webhookId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { webhookId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/webhooks/:webhookId/test': {
      $post:
        | {
            input: { param: { webhookId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { webhookId: string } }
            output: {
              success?: boolean | undefined
              statusCode?: number | undefined
              responseTime?: number | undefined
              error?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  },
  '/'
>
export default routes
