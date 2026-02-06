declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/tags': {
      $get: {
        input: {}
        output: { tags: string[]; ids: number[]; labels: string[] }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: {
          json: {
            metadata: { key?: string | undefined; value?: string | undefined }
            config?: { name?: string | undefined } | undefined
            limited?: { a?: string | undefined; b?: string | undefined } | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  },
  '/'
>
export default routes
