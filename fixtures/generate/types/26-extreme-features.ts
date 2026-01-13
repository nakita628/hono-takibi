declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  { '/stream': { $get: { input: {}; output: string; outputFormat: 'text'; status: 200 } } } & {
    '/graphql': {
      $post: {
        input: {
          json:
            | string
            | {
                query?: string | undefined
                variables?: { [x: string]: unknown } | undefined
                operationName?: string | undefined
              }
        }
        output: {
          data?: { [x: string]: unknown } | undefined
          errors?: { [x: string]: unknown }[] | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/grpc-gateway': {
      $post: { input: { json: File }; output: File; outputFormat: 'text'; status: 200 }
    }
  } & {
    '/deprecated-endpoint': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  },
  '/'
>
export default routes
