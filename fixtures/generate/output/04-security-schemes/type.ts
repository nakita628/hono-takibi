declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/public': {
      $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/bearer-protected': {
      $get: { input: {}; output: { data: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/api-key-protected': {
      $get: { input: {}; output: { data: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/basic-protected': {
      $get: { input: {}; output: { data: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/oauth-protected': {
      $get: { input: {}; output: { data: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/multi-auth': {
      $get: { input: {}; output: { data: string }; outputFormat: 'json'; status: 200 }
    }
  },
  '/'
>
export default routes
