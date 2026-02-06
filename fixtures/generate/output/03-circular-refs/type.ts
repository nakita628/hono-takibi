declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/tree': {
      $get: {
        input: {}
        output: { id: number; value: string; children?: unknown[] | undefined }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { json: { id: number; value: string; children?: unknown[] | undefined } }
        output: { id: number; value: string; children?: unknown[] | undefined }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/graph': {
      $get: {
        input: {}
        output: {
          id: number
          ref?:
            | { id: number; ref?: { id: number; ref?: unknown | undefined } | undefined }
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
