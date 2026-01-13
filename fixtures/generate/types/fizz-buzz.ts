declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/fizzbuzz': {
      $get:
        | {
            input: { query: { number: number; details?: boolean | undefined } }
            output: { result: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { number: number; details?: boolean | undefined } }
            output: { error?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  },
  '/'
>
export default routes
