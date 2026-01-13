declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/polymorphic': {
      $post: {
        input: {
          json:
            | { type: string; livesLeft?: number | undefined }
            | { type: string; barkLevel?: 'quiet' | 'normal' | 'loud' | undefined }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/search': {
      $get: {
        input: {
          query: {
            q: string
            filter?: string | string[] | undefined
            exclude?: { [x: string]: unknown } | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/multi-step': {
      $put: {
        input: {
          json: {
            id: string
            metadata?: ({ [x: string]: string } | null) | undefined
            step?: number | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  },
  '/'
>
export default routes
