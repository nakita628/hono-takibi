declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/nullable': {
      $post: {
        input: {
          json: {
            name: string
            nickname?: (string | null) | undefined
            age?: (number | null) | undefined
            tags?: (string[] | null) | undefined
          }
        }
        output: {
          name: string
          nickname?: (string | null) | undefined
          age?: (number | null) | undefined
          tags?: (string[] | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/discriminated': {
      $post: {
        input: {
          json:
            | { kind: 'circle'; radius: number }
            | { kind: 'rectangle'; width: number; height: number }
        }
        output:
          | { kind: 'circle'; radius: number }
          | { kind: 'rectangle'; width: number; height: number }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/composed': {
      $get: {
        input: {}
        output: {
          id: number
          createdAt: string
          name: string
          description?: string | undefined
          extra?: boolean | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/deep-nested': {
      $get: {
        input: {}
        output: { level2: { level3: { value: string } } }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/additional-props': {
      $get: { input: {}; output: { [x: string]: string }; outputFormat: 'json'; status: 200 }
    }
  },
  '/'
>
export default routes
