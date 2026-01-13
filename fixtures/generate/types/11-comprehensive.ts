import type { OpenAPIHono } from '@hono/zod-openapi'

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K]
}

declare const routes: OpenAPIHono<
  Env,
  RemoveIndexSignature<
    {
      '/products': {
        $get:
          | {
              input: {
                query: {
                  page?: number | undefined
                  limit?: number | undefined
                  q?: string | undefined
                  category?:
                    | 'electronics'
                    | 'clothing'
                    | 'books'
                    | 'home'
                    | 'sports'
                    | 'toys'
                    | undefined
                }
              } & { header: { 'Accept-Language'?: string | undefined } }
              output: {
                items: {
                  id: string
                  name: string
                  price: { amount: number; currency: string }
                  category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                  sku?: string | undefined
                  description?: string | undefined
                  tags?: string[] | undefined
                  inventory?: number | undefined
                  images?: string[] | undefined
                  metadata?: { [x: string]: string } | undefined
                  status?: 'draft' | 'active' | 'archived' | undefined
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                }[]
                pagination: {
                  page: number
                  limit: number
                  total: never
                  totalPages: number
                  hasNext?: boolean | undefined
                  hasPrevious?: boolean | undefined
                }
              }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: {
                query: {
                  page?: number | undefined
                  limit?: number | undefined
                  q?: string | undefined
                  category?:
                    | 'electronics'
                    | 'clothing'
                    | 'books'
                    | 'home'
                    | 'sports'
                    | 'toys'
                    | undefined
                }
              } & { header: { 'Accept-Language'?: string | undefined } }
              output: {
                code: string
                message: string
                target?: string | undefined
                details?:
                  | {
                      code?: string | undefined
                      message?: string | undefined
                      target?: string | undefined
                    }[]
                  | undefined
                traceId?: string | undefined
              }
              outputFormat: 'json'
              status: 400
            }
          | {
              input: {
                query: {
                  page?: number | undefined
                  limit?: number | undefined
                  q?: string | undefined
                  category?:
                    | 'electronics'
                    | 'clothing'
                    | 'books'
                    | 'home'
                    | 'sports'
                    | 'toys'
                    | undefined
                }
              } & { header: { 'Accept-Language'?: string | undefined } }
              output: {
                code: string
                message: string
                target?: string | undefined
                details?:
                  | {
                      code?: string | undefined
                      message?: string | undefined
                      target?: string | undefined
                    }[]
                  | undefined
                traceId?: string | undefined
              }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: {
                query: {
                  page?: number | undefined
                  limit?: number | undefined
                  q?: string | undefined
                  category?:
                    | 'electronics'
                    | 'clothing'
                    | 'books'
                    | 'home'
                    | 'sports'
                    | 'toys'
                    | undefined
                }
              } & { header: { 'Accept-Language'?: string | undefined } }
              output: {
                code: string
                message: string
                target?: string | undefined
                details?:
                  | {
                      code?: string | undefined
                      message?: string | undefined
                      target?: string | undefined
                    }[]
                  | undefined
                traceId?: string | undefined
              }
              outputFormat: 'json'
              status: 429
            }
          | {
              input: {
                query: {
                  page?: number | undefined
                  limit?: number | undefined
                  q?: string | undefined
                  category?:
                    | 'electronics'
                    | 'clothing'
                    | 'books'
                    | 'home'
                    | 'sports'
                    | 'toys'
                    | undefined
                }
              } & { header: { 'Accept-Language'?: string | undefined } }
              output: {
                code: string
                message: string
                target?: string | undefined
                details?:
                  | {
                      code?: string | undefined
                      message?: string | undefined
                      target?: string | undefined
                    }[]
                  | undefined
                traceId?: string | undefined
              }
              outputFormat: 'json'
              status: 500
            }
      }
    } & {
      [x: string]: {
        $get:
          | { input: {}; output: {}; outputFormat: string; status: 200 }
          | { input: {}; output: {}; outputFormat: string; status: 100 }
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 429 }
          | { input: {}; output: {}; outputFormat: string; status: 500 }
          | { input: {}; output: {}; outputFormat: string; status: 201 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
          | { input: {}; output: {}; outputFormat: string; status: 409 }
          | { input: {}; output: {}; outputFormat: string; status: 304 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 412 }
          | { input: {}; output: {}; outputFormat: string; status: 204 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: 101 }
          | { input: {}; output: {}; outputFormat: string; status: 102 }
          | { input: {}; output: {}; outputFormat: string; status: 103 }
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
          | { input: {}; output: {}; outputFormat: string; status: 305 }
          | { input: {}; output: {}; outputFormat: string; status: 306 }
          | { input: {}; output: {}; outputFormat: string; status: 307 }
          | { input: {}; output: {}; outputFormat: string; status: 308 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 405 }
          | { input: {}; output: {}; outputFormat: string; status: 406 }
          | { input: {}; output: {}; outputFormat: string; status: 407 }
          | { input: {}; output: {}; outputFormat: string; status: 408 }
          | { input: {}; output: {}; outputFormat: string; status: 410 }
          | { input: {}; output: {}; outputFormat: string; status: 411 }
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
          | { input: {}; output: {}; outputFormat: string; status: 431 }
          | { input: {}; output: {}; outputFormat: string; status: 451 }
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
          | { input: {}; output: {}; outputFormat: string; status: 100 }
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 429 }
          | { input: {}; output: {}; outputFormat: string; status: 500 }
          | { input: {}; output: {}; outputFormat: string; status: 201 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
          | { input: {}; output: {}; outputFormat: string; status: 409 }
          | { input: {}; output: {}; outputFormat: string; status: 304 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 412 }
          | { input: {}; output: {}; outputFormat: string; status: 204 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: 101 }
          | { input: {}; output: {}; outputFormat: string; status: 102 }
          | { input: {}; output: {}; outputFormat: string; status: 103 }
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
          | { input: {}; output: {}; outputFormat: string; status: 305 }
          | { input: {}; output: {}; outputFormat: string; status: 306 }
          | { input: {}; output: {}; outputFormat: string; status: 307 }
          | { input: {}; output: {}; outputFormat: string; status: 308 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 405 }
          | { input: {}; output: {}; outputFormat: string; status: 406 }
          | { input: {}; output: {}; outputFormat: string; status: 407 }
          | { input: {}; output: {}; outputFormat: string; status: 408 }
          | { input: {}; output: {}; outputFormat: string; status: 410 }
          | { input: {}; output: {}; outputFormat: string; status: 411 }
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
          | { input: {}; output: {}; outputFormat: string; status: 431 }
          | { input: {}; output: {}; outputFormat: string; status: 451 }
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
          | { input: {}; output: {}; outputFormat: string; status: 100 }
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 429 }
          | { input: {}; output: {}; outputFormat: string; status: 500 }
          | { input: {}; output: {}; outputFormat: string; status: 201 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
          | { input: {}; output: {}; outputFormat: string; status: 409 }
          | { input: {}; output: {}; outputFormat: string; status: 304 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 412 }
          | { input: {}; output: {}; outputFormat: string; status: 204 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: 101 }
          | { input: {}; output: {}; outputFormat: string; status: 102 }
          | { input: {}; output: {}; outputFormat: string; status: 103 }
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
          | { input: {}; output: {}; outputFormat: string; status: 305 }
          | { input: {}; output: {}; outputFormat: string; status: 306 }
          | { input: {}; output: {}; outputFormat: string; status: 307 }
          | { input: {}; output: {}; outputFormat: string; status: 308 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 405 }
          | { input: {}; output: {}; outputFormat: string; status: 406 }
          | { input: {}; output: {}; outputFormat: string; status: 407 }
          | { input: {}; output: {}; outputFormat: string; status: 408 }
          | { input: {}; output: {}; outputFormat: string; status: 410 }
          | { input: {}; output: {}; outputFormat: string; status: 411 }
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
          | { input: {}; output: {}; outputFormat: string; status: 431 }
          | { input: {}; output: {}; outputFormat: string; status: 451 }
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
          | { input: {}; output: {}; outputFormat: string; status: 100 }
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 429 }
          | { input: {}; output: {}; outputFormat: string; status: 500 }
          | { input: {}; output: {}; outputFormat: string; status: 201 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
          | { input: {}; output: {}; outputFormat: string; status: 409 }
          | { input: {}; output: {}; outputFormat: string; status: 304 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 412 }
          | { input: {}; output: {}; outputFormat: string; status: 204 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: 101 }
          | { input: {}; output: {}; outputFormat: string; status: 102 }
          | { input: {}; output: {}; outputFormat: string; status: 103 }
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
          | { input: {}; output: {}; outputFormat: string; status: 305 }
          | { input: {}; output: {}; outputFormat: string; status: 306 }
          | { input: {}; output: {}; outputFormat: string; status: 307 }
          | { input: {}; output: {}; outputFormat: string; status: 308 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 405 }
          | { input: {}; output: {}; outputFormat: string; status: 406 }
          | { input: {}; output: {}; outputFormat: string; status: 407 }
          | { input: {}; output: {}; outputFormat: string; status: 408 }
          | { input: {}; output: {}; outputFormat: string; status: 410 }
          | { input: {}; output: {}; outputFormat: string; status: 411 }
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
          | { input: {}; output: {}; outputFormat: string; status: 431 }
          | { input: {}; output: {}; outputFormat: string; status: 451 }
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
          | { input: {}; output: {}; outputFormat: string; status: 100 }
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 429 }
          | { input: {}; output: {}; outputFormat: string; status: 500 }
          | { input: {}; output: {}; outputFormat: string; status: 201 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
          | { input: {}; output: {}; outputFormat: string; status: 409 }
          | { input: {}; output: {}; outputFormat: string; status: 304 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 412 }
          | { input: {}; output: {}; outputFormat: string; status: 204 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: 101 }
          | { input: {}; output: {}; outputFormat: string; status: 102 }
          | { input: {}; output: {}; outputFormat: string; status: 103 }
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
          | { input: {}; output: {}; outputFormat: string; status: 305 }
          | { input: {}; output: {}; outputFormat: string; status: 306 }
          | { input: {}; output: {}; outputFormat: string; status: 307 }
          | { input: {}; output: {}; outputFormat: string; status: 308 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 405 }
          | { input: {}; output: {}; outputFormat: string; status: 406 }
          | { input: {}; output: {}; outputFormat: string; status: 407 }
          | { input: {}; output: {}; outputFormat: string; status: 408 }
          | { input: {}; output: {}; outputFormat: string; status: 410 }
          | { input: {}; output: {}; outputFormat: string; status: 411 }
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
          | { input: {}; output: {}; outputFormat: string; status: 431 }
          | { input: {}; output: {}; outputFormat: string; status: 451 }
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
          | { input: {}; output: {}; outputFormat: string; status: 100 }
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 429 }
          | { input: {}; output: {}; outputFormat: string; status: 500 }
          | { input: {}; output: {}; outputFormat: string; status: 201 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
          | { input: {}; output: {}; outputFormat: string; status: 409 }
          | { input: {}; output: {}; outputFormat: string; status: 304 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 412 }
          | { input: {}; output: {}; outputFormat: string; status: 204 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: 101 }
          | { input: {}; output: {}; outputFormat: string; status: 102 }
          | { input: {}; output: {}; outputFormat: string; status: 103 }
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
          | { input: {}; output: {}; outputFormat: string; status: 305 }
          | { input: {}; output: {}; outputFormat: string; status: 306 }
          | { input: {}; output: {}; outputFormat: string; status: 307 }
          | { input: {}; output: {}; outputFormat: string; status: 308 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 405 }
          | { input: {}; output: {}; outputFormat: string; status: 406 }
          | { input: {}; output: {}; outputFormat: string; status: 407 }
          | { input: {}; output: {}; outputFormat: string; status: 408 }
          | { input: {}; output: {}; outputFormat: string; status: 410 }
          | { input: {}; output: {}; outputFormat: string; status: 411 }
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
          | { input: {}; output: {}; outputFormat: string; status: 431 }
          | { input: {}; output: {}; outputFormat: string; status: 451 }
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
          | { input: {}; output: {}; outputFormat: string; status: 100 }
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 429 }
          | { input: {}; output: {}; outputFormat: string; status: 500 }
          | { input: {}; output: {}; outputFormat: string; status: 201 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
          | { input: {}; output: {}; outputFormat: string; status: 409 }
          | { input: {}; output: {}; outputFormat: string; status: 304 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 412 }
          | { input: {}; output: {}; outputFormat: string; status: 204 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: 101 }
          | { input: {}; output: {}; outputFormat: string; status: 102 }
          | { input: {}; output: {}; outputFormat: string; status: 103 }
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
          | { input: {}; output: {}; outputFormat: string; status: 305 }
          | { input: {}; output: {}; outputFormat: string; status: 306 }
          | { input: {}; output: {}; outputFormat: string; status: 307 }
          | { input: {}; output: {}; outputFormat: string; status: 308 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 405 }
          | { input: {}; output: {}; outputFormat: string; status: 406 }
          | { input: {}; output: {}; outputFormat: string; status: 407 }
          | { input: {}; output: {}; outputFormat: string; status: 408 }
          | { input: {}; output: {}; outputFormat: string; status: 410 }
          | { input: {}; output: {}; outputFormat: string; status: 411 }
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
          | { input: {}; output: {}; outputFormat: string; status: 431 }
          | { input: {}; output: {}; outputFormat: string; status: 451 }
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
          | { input: {}; output: {}; outputFormat: string; status: 100 }
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 429 }
          | { input: {}; output: {}; outputFormat: string; status: 500 }
          | { input: {}; output: {}; outputFormat: string; status: 201 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
          | { input: {}; output: {}; outputFormat: string; status: 409 }
          | { input: {}; output: {}; outputFormat: string; status: 304 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 412 }
          | { input: {}; output: {}; outputFormat: string; status: 204 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: 101 }
          | { input: {}; output: {}; outputFormat: string; status: 102 }
          | { input: {}; output: {}; outputFormat: string; status: 103 }
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
          | { input: {}; output: {}; outputFormat: string; status: 305 }
          | { input: {}; output: {}; outputFormat: string; status: 306 }
          | { input: {}; output: {}; outputFormat: string; status: 307 }
          | { input: {}; output: {}; outputFormat: string; status: 308 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 405 }
          | { input: {}; output: {}; outputFormat: string; status: 406 }
          | { input: {}; output: {}; outputFormat: string; status: 407 }
          | { input: {}; output: {}; outputFormat: string; status: 408 }
          | { input: {}; output: {}; outputFormat: string; status: 410 }
          | { input: {}; output: {}; outputFormat: string; status: 411 }
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
          | { input: {}; output: {}; outputFormat: string; status: 431 }
          | { input: {}; output: {}; outputFormat: string; status: 451 }
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
      '/products/:productId': {
        $get:
          | {
              input: { param: { productId: string } } & {
                header: { 'If-None-Match'?: string | undefined }
              }
              output: {}
              outputFormat: string
              status: 304
            }
          | {
              input: { param: { productId: string } } & {
                header: { 'If-None-Match'?: string | undefined }
              }
              output: {
                id: string
                name: string
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                sku?: string | undefined
                description?: string | undefined
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
                metadata?: { [x: string]: string } | undefined
                status?: 'draft' | 'active' | 'archived' | undefined
                createdAt?: string | undefined
                updatedAt?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: { param: { productId: string } } & {
                header: { 'If-None-Match'?: string | undefined }
              }
              output: {
                code: string
                message: string
                target?: string | undefined
                details?:
                  | {
                      code?: string | undefined
                      message?: string | undefined
                      target?: string | undefined
                    }[]
                  | undefined
                traceId?: string | undefined
              }
              outputFormat: 'json'
              status: 404
            }
      }
    } & {
      '/products/:productId': {
        $put:
          | {
              input: { param: { productId: string } } & {
                header: { 'If-Match'?: string | undefined }
              } & {
                json: {
                  name: string
                  price: { amount: number; currency: string }
                  category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                  sku?: string | undefined
                  description?: string | undefined
                  tags?: string[] | undefined
                  inventory?: number | undefined
                  images?: string[] | undefined
                } & { status?: 'draft' | 'active' | 'archived' | undefined }
              }
              output: {
                id: string
                name: string
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                sku?: string | undefined
                description?: string | undefined
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
                metadata?: { [x: string]: string } | undefined
                status?: 'draft' | 'active' | 'archived' | undefined
                createdAt?: string | undefined
                updatedAt?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: { param: { productId: string } } & {
                header: { 'If-Match'?: string | undefined }
              } & {
                json: {
                  name: string
                  price: { amount: number; currency: string }
                  category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                  sku?: string | undefined
                  description?: string | undefined
                  tags?: string[] | undefined
                  inventory?: number | undefined
                  images?: string[] | undefined
                } & { status?: 'draft' | 'active' | 'archived' | undefined }
              }
              output: {
                code: string
                message: string
                target?: string | undefined
                details?:
                  | {
                      code?: string | undefined
                      message?: string | undefined
                      target?: string | undefined
                    }[]
                  | undefined
                traceId?: string | undefined
              }
              outputFormat: 'json'
              status: 404
            }
          | {
              input: { param: { productId: string } } & {
                header: { 'If-Match'?: string | undefined }
              } & {
                json: {
                  name: string
                  price: { amount: number; currency: string }
                  category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                  sku?: string | undefined
                  description?: string | undefined
                  tags?: string[] | undefined
                  inventory?: number | undefined
                  images?: string[] | undefined
                } & { status?: 'draft' | 'active' | 'archived' | undefined }
              }
              output: {
                code: string
                message: string
                target?: string | undefined
                details?:
                  | {
                      code?: string | undefined
                      message?: string | undefined
                      target?: string | undefined
                    }[]
                  | undefined
                traceId?: string | undefined
              }
              outputFormat: 'json'
              status: 409
            }
          | {
              input: { param: { productId: string } } & {
                header: { 'If-Match'?: string | undefined }
              } & {
                json: {
                  name: string
                  price: { amount: number; currency: string }
                  category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                  sku?: string | undefined
                  description?: string | undefined
                  tags?: string[] | undefined
                  inventory?: number | undefined
                  images?: string[] | undefined
                } & { status?: 'draft' | 'active' | 'archived' | undefined }
              }
              output: {
                code: string
                message: string
                target?: string | undefined
                details?:
                  | {
                      code?: string | undefined
                      message?: string | undefined
                      target?: string | undefined
                    }[]
                  | undefined
                traceId?: string | undefined
              }
              outputFormat: 'json'
              status: 412
            }
      }
    } & {
      '/products/:productId': {
        $delete:
          | {
              input: { param: { productId: string } } & {
                header: { 'If-Match'?: string | undefined }
              }
              output: {}
              outputFormat: string
              status: 204
            }
          | {
              input: { param: { productId: string } } & {
                header: { 'If-Match'?: string | undefined }
              }
              output: {
                code: string
                message: string
                target?: string | undefined
                details?:
                  | {
                      code?: string | undefined
                      message?: string | undefined
                      target?: string | undefined
                    }[]
                  | undefined
                traceId?: string | undefined
              }
              outputFormat: 'json'
              status: 404
            }
          | {
              input: { param: { productId: string } } & {
                header: { 'If-Match'?: string | undefined }
              }
              output: {
                code: string
                message: string
                target?: string | undefined
                details?:
                  | {
                      code?: string | undefined
                      message?: string | undefined
                      target?: string | undefined
                    }[]
                  | undefined
                traceId?: string | undefined
              }
              outputFormat: 'json'
              status: 412
            }
      }
    } & {
      '/orders': {
        $post: {
          input: {
            json: {
              items: { productId: string; quantity: number }[]
              shippingAddress: {
                street: string
                city: string
                country: string
                state?: string | undefined
                postalCode?: string | undefined
              }
              billingAddress?:
                | {
                    street: string
                    city: string
                    country: string
                    state?: string | undefined
                    postalCode?: string | undefined
                  }
                | undefined
              callbackUrl?: string | undefined
            }
          }
          output: {
            id: string
            customerId: string
            items: {
              productId: string
              quantity: number
              price: { amount: number; currency: string }
              productName?: string | undefined
            }[]
            status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
            total: { amount: number; currency: string }
            shippingAddress?:
              | {
                  street: string
                  city: string
                  country: string
                  state?: string | undefined
                  postalCode?: string | undefined
                }
              | undefined
            billingAddress?:
              | {
                  street: string
                  city: string
                  country: string
                  state?: string | undefined
                  postalCode?: string | undefined
                }
              | undefined
            createdAt?: string | undefined
            updatedAt?: string | undefined
          }
          outputFormat: 'json'
          status: 201
        }
      }
    } & {
      '/webhooks': {
        $post: {
          input: { json: { url: string; events: string[]; secret?: string | undefined } }
          output: {
            id: string
            url: string
            events: (
              | 'product.created'
              | 'product.updated'
              | 'product.deleted'
              | 'order.created'
              | 'order.updated'
              | 'order.shipped'
              | 'order.delivered'
            )[]
            secret?: string | undefined
            status?: 'active' | 'inactive' | undefined
          }
          outputFormat: 'json'
          status: 201
        }
      }
    }
  >,
  '/'
>
export default routes
