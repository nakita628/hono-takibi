type DeepReadonly<T> = T extends (infer R)[]
  ? readonly DeepReadonly<R>[]
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T
declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  DeepReadonly<
    {
      '/hono': { $get: { input: {}; output: { hono: 'Hono' }; outputFormat: 'json'; status: 200 } }
    } & {
      '/honox': {
        $get: { input: {}; output: { honoX: 'HonoX' }; outputFormat: 'json'; status: 200 }
      }
    } & {
      '/zod-openapi-hono': {
        $get: {
          input: {}
          output: { 'zod-openapi-hono': 'ZodOpenAPIHono' }
          outputFormat: 'json'
          status: 200
        }
      }
    }
  >,
  '/'
>
export default routes
