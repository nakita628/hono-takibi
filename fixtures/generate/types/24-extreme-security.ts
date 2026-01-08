declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  { '/public': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/single-auth': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    [x: string]: {
      $get:
        | { input: {}; output: {}; outputFormat: string; status: 200 }
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
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
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
        | { input: {}; output: {}; outputFormat: string; status: 401 }
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
        | { input: {}; output: {}; outputFormat: string; status: 200 }
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
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
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
        | { input: {}; output: {}; outputFormat: string; status: 401 }
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
        | { input: {}; output: {}; outputFormat: string; status: 200 }
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
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
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
        | { input: {}; output: {}; outputFormat: string; status: 401 }
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
        | { input: {}; output: {}; outputFormat: string; status: 200 }
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
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
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
        | { input: {}; output: {}; outputFormat: string; status: 401 }
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
        | { input: {}; output: {}; outputFormat: string; status: 200 }
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
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
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
        | { input: {}; output: {}; outputFormat: string; status: 401 }
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
        | { input: {}; output: {}; outputFormat: string; status: 200 }
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
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
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
        | { input: {}; output: {}; outputFormat: string; status: 401 }
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
        | { input: {}; output: {}; outputFormat: string; status: 200 }
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
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
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
        | { input: {}; output: {}; outputFormat: string; status: 401 }
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
        | { input: {}; output: {}; outputFormat: string; status: 200 }
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
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
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
        | { input: {}; output: {}; outputFormat: string; status: 401 }
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
  } & { '/all-auth': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/scoped-oauth': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/mixed-level-security': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/mixed-level-security': { $post: { input: {}; output: {}; outputFormat: string; status: 201 } }
  } & {
    '/mixed-level-security': { $put: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/mixed-level-security': {
      $delete: { input: {}; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/override-global': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  },
  '/'
>
export default routes
