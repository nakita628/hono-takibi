declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/number': {
      $get: {
        input: {}
        output: {
          gt5_number: number
          gte5_number: number
          lt5_number: number
          lte5_number: number
          int_number: number
          positive_number: number
          nonnegative_number: number
          negative_number: number
          nonpositive_number: number
          multipleOf5_number: number
          finite_number: number
          safe_number: number
          message_number: number
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
