declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  { '/public': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/single-auth': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/any-auth': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/all-auth': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/complex-auth': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/scoped-oauth': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/mixed-level-security': {
      $get: { input: {}; output: {}; outputFormat: string; status: 200 }
      $post: { input: {}; output: {}; outputFormat: string; status: 201 }
      $put: { input: {}; output: {}; outputFormat: string; status: 200 }
      $delete: { input: {}; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/override-global': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/optional-enhanced': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/multi-tenant': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } },
  '/'
>
export default routes
