declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  { '/public': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/protected': {
      $get:
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
    }
  } & { '/admin': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/oauth-resource': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/multi-auth': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } },
  '/'
>
export default routes
