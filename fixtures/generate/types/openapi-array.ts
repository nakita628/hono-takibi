declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/array': {
      $get: {
        input: {}
        output: {
          string_array: string[]
          equivalent: string[]
          string_optional_array: string[]
          string_array_optional?: string[] | undefined
          nonempty: string[]
          min5: string[]
          max5: string[]
          length5: string[]
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
