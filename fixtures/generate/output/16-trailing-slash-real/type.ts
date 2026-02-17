declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/api/reverseGeocode/': {
      $get: {
        input: {
          query: {
            callback?: string | undefined
            search_type?: '0' | '1' | '2' | undefined
            lat?: number | undefined
            lon?: number | undefined
            polygon?: string | undefined
            radius?: number | undefined
            include_shape?: boolean | undefined
            include_count?: boolean | undefined
            limit?: number | undefined
            offset?: number | undefined
          }
        }
        output: {
          status: 'success' | 'zero results' | 'error'
          results: { region: string; city: string; code: string; lat: string; lon: string }[]
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/api/v2/public/booking/account/register/oauth/': {
      $post:
        | {
            input: {
              json: { account: { [x: string]: unknown }; profile: { [x: string]: unknown } }
            }
            output: { message: string; provisionalId?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: { account: { [x: string]: unknown }; profile: { [x: string]: unknown } }
            }
            output: { message: string; provisionalId?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/api/v2/public/booking/account/register/email': {
      $post: {
        input: { json: { email: string } }
        output: { message: string }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
