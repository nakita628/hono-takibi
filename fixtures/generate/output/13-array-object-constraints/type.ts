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
  } & {
    '/settings': {
      $get: {
        input: { query: { filter?: string | undefined } }
        output: { [x: string]: string }
        outputFormat: 'json'
        status: 200
      }
      $put: { input: { json: { avatar: string } }; output: {}; outputFormat: string; status: 200 }
    }
  } & {
    '/config': {
      $post: {
        input: {
          json: {
            data: { [x: string]: string }
            headers?: { [x: string]: unknown } | undefined
            keys?: { [x: string]: string } | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  } & {
    '/payment': {
      $post: {
        input: {
          json: {
            creditCard?: string | undefined
            billingAddress?: string | undefined
            email?: string | undefined
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
