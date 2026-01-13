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
      '/pet': {
        $put:
          | {
              input: {
                form: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              } & {
                json: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | {
              input: {
                form: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              } & {
                json: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              }
              output: {
                name: string
                photoUrls: string[]
                id?: undefined
                category?: { id?: undefined; name?: string | undefined } | undefined
                tags?: { id?: undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: {
                form: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              } & {
                json: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              }
              output: {}
              outputFormat: string
              status: 400
            }
          | {
              input: {
                form: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              } & {
                json: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              }
              output: {}
              outputFormat: string
              status: 404
            }
          | {
              input: {
                form: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              } & {
                json: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              }
              output: {}
              outputFormat: string
              status: 422
            }
      }
    } & {
      '/pet': {
        $post:
          | {
              input: {
                form: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              } & {
                json: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | {
              input: {
                form: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              } & {
                json: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              }
              output: {
                name: string
                photoUrls: string[]
                id?: undefined
                category?: { id?: undefined; name?: string | undefined } | undefined
                tags?: { id?: undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: {
                form: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              } & {
                json: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              }
              output: {}
              outputFormat: string
              status: 400
            }
          | {
              input: {
                form: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              } & {
                json: {
                  name: string
                  photoUrls: string[]
                  id?: bigint | undefined
                  category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                  tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                  status?: 'available' | 'pending' | 'sold' | undefined
                }
              }
              output: {}
              outputFormat: string
              status: 422
            }
      }
    } & {
      '/pet/findByStatus': {
        $get:
          | {
              input: { query: { status?: 'available' | 'pending' | 'sold' | undefined } }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | {
              input: { query: { status?: 'available' | 'pending' | 'sold' | undefined } }
              output: {}
              outputFormat: string
              status: 400
            }
          | {
              input: { query: { status?: 'available' | 'pending' | 'sold' | undefined } }
              output: {
                name: string
                photoUrls: string[]
                id?: undefined
                category?: { id?: undefined; name?: string | undefined } | undefined
                tags?: { id?: undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }[]
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/pet/findByTags': {
        $get:
          | {
              input: { query: { tags?: string[] | undefined } }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | {
              input: { query: { tags?: string[] | undefined } }
              output: {}
              outputFormat: string
              status: 400
            }
          | {
              input: { query: { tags?: string[] | undefined } }
              output: {
                name: string
                photoUrls: string[]
                id?: undefined
                category?: { id?: undefined; name?: string | undefined } | undefined
                tags?: { id?: undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }[]
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      [x: string]: {
        $put:
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 422 }
          | { input: {}; output: {}; outputFormat: string; status: 200 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
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
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
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
        $get:
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 422 }
          | { input: {}; output: {}; outputFormat: string; status: 200 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
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
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
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
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 422 }
          | { input: {}; output: {}; outputFormat: string; status: 200 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
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
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
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
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 422 }
          | { input: {}; output: {}; outputFormat: string; status: 200 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
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
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
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
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 422 }
          | { input: {}; output: {}; outputFormat: string; status: 200 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
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
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
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
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 422 }
          | { input: {}; output: {}; outputFormat: string; status: 200 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
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
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
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
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 422 }
          | { input: {}; output: {}; outputFormat: string; status: 200 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
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
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
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
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 422 }
          | { input: {}; output: {}; outputFormat: string; status: 200 }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
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
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
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
      '/pet/:petId': {
        $post: {
          input: { param: { petId: bigint } } & {
            query: { name?: string | undefined; status?: string | undefined }
          }
          output: {}
          outputFormat: string
          status: 400
        }
      }
    } & {
      '/pet/:petId': {
        $delete: {
          input: { param: { petId: bigint } } & { header: { api_key?: string | undefined } }
          output: {}
          outputFormat: string
          status: 400
        }
      }
    } & {
      '/pet/:petId/uploadImage': {
        $post: {
          input: { param: { petId: bigint } } & {
            query: { additionalMetadata?: string | undefined }
          }
          output: {
            code?: number | undefined
            type?: string | undefined
            message?: string | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/store/inventory': {
        $get: { input: {}; output: { [x: string]: number }; outputFormat: 'json'; status: 200 }
      }
    } & {
      '/store/order': {
        $post:
          | {
              input: {
                form: {
                  id?: bigint | undefined
                  petId?: bigint | undefined
                  quantity?: number | undefined
                  shipDate?: string | undefined
                  status?: 'placed' | 'approved' | 'delivered' | undefined
                  complete?: boolean | undefined
                }
              } & {
                json: {
                  id?: bigint | undefined
                  petId?: bigint | undefined
                  quantity?: number | undefined
                  shipDate?: string | undefined
                  status?: 'placed' | 'approved' | 'delivered' | undefined
                  complete?: boolean | undefined
                }
              }
              output: {}
              outputFormat: string
              status: 400
            }
          | {
              input: {
                form: {
                  id?: bigint | undefined
                  petId?: bigint | undefined
                  quantity?: number | undefined
                  shipDate?: string | undefined
                  status?: 'placed' | 'approved' | 'delivered' | undefined
                  complete?: boolean | undefined
                }
              } & {
                json: {
                  id?: bigint | undefined
                  petId?: bigint | undefined
                  quantity?: number | undefined
                  shipDate?: string | undefined
                  status?: 'placed' | 'approved' | 'delivered' | undefined
                  complete?: boolean | undefined
                }
              }
              output: {}
              outputFormat: string
              status: 422
            }
          | {
              input: {
                form: {
                  id?: bigint | undefined
                  petId?: bigint | undefined
                  quantity?: number | undefined
                  shipDate?: string | undefined
                  status?: 'placed' | 'approved' | 'delivered' | undefined
                  complete?: boolean | undefined
                }
              } & {
                json: {
                  id?: bigint | undefined
                  petId?: bigint | undefined
                  quantity?: number | undefined
                  shipDate?: string | undefined
                  status?: 'placed' | 'approved' | 'delivered' | undefined
                  complete?: boolean | undefined
                }
              }
              output: {
                id?: undefined
                petId?: undefined
                quantity?: number | undefined
                shipDate?: string | undefined
                status?: 'placed' | 'approved' | 'delivered' | undefined
                complete?: boolean | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/store/order/:orderId': {
        $get:
          | {
              input: { param: { orderId: bigint } }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | { input: { param: { orderId: bigint } }; output: {}; outputFormat: string; status: 400 }
          | { input: { param: { orderId: bigint } }; output: {}; outputFormat: string; status: 404 }
          | {
              input: { param: { orderId: bigint } }
              output: {
                id?: undefined
                petId?: undefined
                quantity?: number | undefined
                shipDate?: string | undefined
                status?: 'placed' | 'approved' | 'delivered' | undefined
                complete?: boolean | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/store/order/:orderId': {
        $delete:
          | { input: { param: { orderId: bigint } }; output: {}; outputFormat: string; status: 400 }
          | { input: { param: { orderId: bigint } }; output: {}; outputFormat: string; status: 404 }
      }
    } & {
      '/user': {
        $post:
          | {
              input: {
                form: {
                  id?: bigint | undefined
                  username?: string | undefined
                  firstName?: string | undefined
                  lastName?: string | undefined
                  email?: string | undefined
                  password?: string | undefined
                  phone?: string | undefined
                  userStatus?: number | undefined
                }
              } & {
                json: {
                  id?: bigint | undefined
                  username?: string | undefined
                  firstName?: string | undefined
                  lastName?: string | undefined
                  email?: string | undefined
                  password?: string | undefined
                  phone?: string | undefined
                  userStatus?: number | undefined
                }
              }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | {
              input: {
                form: {
                  id?: bigint | undefined
                  username?: string | undefined
                  firstName?: string | undefined
                  lastName?: string | undefined
                  email?: string | undefined
                  password?: string | undefined
                  phone?: string | undefined
                  userStatus?: number | undefined
                }
              } & {
                json: {
                  id?: bigint | undefined
                  username?: string | undefined
                  firstName?: string | undefined
                  lastName?: string | undefined
                  email?: string | undefined
                  password?: string | undefined
                  phone?: string | undefined
                  userStatus?: number | undefined
                }
              }
              output: {
                id?: undefined
                username?: string | undefined
                firstName?: string | undefined
                lastName?: string | undefined
                email?: string | undefined
                password?: string | undefined
                phone?: string | undefined
                userStatus?: number | undefined
              }
              outputFormat: 'json'
              status:
                | 200
                | 400
                | 404
                | 422
                | 100
                | 101
                | 102
                | 103
                | 201
                | 202
                | 203
                | 204
                | 205
                | 206
                | 207
                | 208
                | 226
                | 300
                | 301
                | 302
                | 303
                | 304
                | 305
                | 306
                | 307
                | 308
                | 401
                | 402
                | 403
                | 405
                | 406
                | 407
                | 408
                | 409
                | 410
                | 411
                | 412
                | 413
                | 414
                | 415
                | 416
                | 417
                | 418
                | 421
                | 423
                | 424
                | 425
                | 426
                | 428
                | 429
                | 431
                | 451
                | 500
                | 501
                | 502
                | 503
                | 504
                | 505
                | 506
                | 507
                | 508
                | 510
                | 511
                | -1
            }
      }
    } & {
      '/user/createWithList': {
        $post:
          | {
              input: {
                json: {
                  id?: bigint | undefined
                  username?: string | undefined
                  firstName?: string | undefined
                  lastName?: string | undefined
                  email?: string | undefined
                  password?: string | undefined
                  phone?: string | undefined
                  userStatus?: number | undefined
                }[]
              }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | {
              input: {
                json: {
                  id?: bigint | undefined
                  username?: string | undefined
                  firstName?: string | undefined
                  lastName?: string | undefined
                  email?: string | undefined
                  password?: string | undefined
                  phone?: string | undefined
                  userStatus?: number | undefined
                }[]
              }
              output: {
                id?: undefined
                username?: string | undefined
                firstName?: string | undefined
                lastName?: string | undefined
                email?: string | undefined
                password?: string | undefined
                phone?: string | undefined
                userStatus?: number | undefined
              }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: {
                json: {
                  id?: bigint | undefined
                  username?: string | undefined
                  firstName?: string | undefined
                  lastName?: string | undefined
                  email?: string | undefined
                  password?: string | undefined
                  phone?: string | undefined
                  userStatus?: number | undefined
                }[]
              }
              output: {}
              outputFormat: string
              status:
                | 400
                | 404
                | 422
                | 100
                | 101
                | 102
                | 103
                | 201
                | 202
                | 203
                | 204
                | 205
                | 206
                | 207
                | 208
                | 226
                | 300
                | 301
                | 302
                | 303
                | 304
                | 305
                | 306
                | 307
                | 308
                | 401
                | 402
                | 403
                | 405
                | 406
                | 407
                | 408
                | 409
                | 410
                | 411
                | 412
                | 413
                | 414
                | 415
                | 416
                | 417
                | 418
                | 421
                | 423
                | 424
                | 425
                | 426
                | 428
                | 429
                | 431
                | 451
                | 500
                | 501
                | 502
                | 503
                | 504
                | 505
                | 506
                | 507
                | 508
                | 510
                | 511
                | -1
            }
      }
    } & {
      '/user/login': {
        $get:
          | {
              input: { query: { username?: string | undefined; password?: string | undefined } }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | {
              input: { query: { username?: string | undefined; password?: string | undefined } }
              output: {}
              outputFormat: string
              status: 400
            }
          | {
              input: { query: { username?: string | undefined; password?: string | undefined } }
              output: string
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/user/logout': {
        $get: {
          input: {}
          output: {}
          outputFormat: string
          status:
            | 200
            | 400
            | 404
            | 422
            | 100
            | 101
            | 102
            | 103
            | 201
            | 202
            | 203
            | 204
            | 205
            | 206
            | 207
            | 208
            | 226
            | 300
            | 301
            | 302
            | 303
            | 304
            | 305
            | 306
            | 307
            | 308
            | 401
            | 402
            | 403
            | 405
            | 406
            | 407
            | 408
            | 409
            | 410
            | 411
            | 412
            | 413
            | 414
            | 415
            | 416
            | 417
            | 418
            | 421
            | 423
            | 424
            | 425
            | 426
            | 428
            | 429
            | 431
            | 451
            | 500
            | 501
            | 502
            | 503
            | 504
            | 505
            | 506
            | 507
            | 508
            | 510
            | 511
            | -1
        }
      }
    } & {
      '/user/:username': {
        $get:
          | {
              input: { param: { username: string } }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | {
              input: { param: { username: string } }
              output: {}
              outputFormat: string
              status: 400
            }
          | {
              input: { param: { username: string } }
              output: {}
              outputFormat: string
              status: 404
            }
          | {
              input: { param: { username: string } }
              output: {
                id?: undefined
                username?: string | undefined
                firstName?: string | undefined
                lastName?: string | undefined
                email?: string | undefined
                password?: string | undefined
                phone?: string | undefined
                userStatus?: number | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/user/:username': {
        $put: {
          input: { param: { username: string } } & {
            form: {
              id?: bigint | undefined
              username?: string | undefined
              firstName?: string | undefined
              lastName?: string | undefined
              email?: string | undefined
              password?: string | undefined
              phone?: string | undefined
              userStatus?: number | undefined
            }
          } & {
            json: {
              id?: bigint | undefined
              username?: string | undefined
              firstName?: string | undefined
              lastName?: string | undefined
              email?: string | undefined
              password?: string | undefined
              phone?: string | undefined
              userStatus?: number | undefined
            }
          }
          output: {}
          outputFormat: string
          status:
            | 200
            | 400
            | 404
            | 422
            | 100
            | 101
            | 102
            | 103
            | 201
            | 202
            | 203
            | 204
            | 205
            | 206
            | 207
            | 208
            | 226
            | 300
            | 301
            | 302
            | 303
            | 304
            | 305
            | 306
            | 307
            | 308
            | 401
            | 402
            | 403
            | 405
            | 406
            | 407
            | 408
            | 409
            | 410
            | 411
            | 412
            | 413
            | 414
            | 415
            | 416
            | 417
            | 418
            | 421
            | 423
            | 424
            | 425
            | 426
            | 428
            | 429
            | 431
            | 451
            | 500
            | 501
            | 502
            | 503
            | 504
            | 505
            | 506
            | 507
            | 508
            | 510
            | 511
            | -1
        }
      }
    } & {
      '/user/:username': {
        $delete:
          | {
              input: { param: { username: string } }
              output: {}
              outputFormat: string
              status: 400
            }
          | {
              input: { param: { username: string } }
              output: {}
              outputFormat: string
              status: 404
            }
      }
    }
  >,
  '/'
>
export default routes
