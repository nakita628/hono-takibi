declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/validate': {
      $post: {
        input: {
          json: {
            notSpecificValue?: { [x: string]: unknown } | undefined
            notString?: { [x: string]: unknown } | undefined
            notNumber?: { [x: string]: unknown } | undefined
            notNull?: { [x: string]: unknown } | undefined
            notArray?: { [x: string]: unknown } | undefined
            notObject?: { [x: string]: unknown } | undefined
            notInList?: { [x: string]: unknown } | undefined
            notBoolean?: { [x: string]: unknown } | undefined
            notInteger?: { [x: string]: unknown } | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  },
  '/'
>
export default routes
