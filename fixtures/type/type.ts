declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.1.5_hono@4.10.8_zod@4.1.13/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.10.8/node_modules/hono/dist/types/types').Env,
  {
    '/hono': { $get: { input: {}; output: { hono: 'Hono' }; outputFormat: 'json'; status: 200 } }
  } & {
    '/honox': { $get: { input: {}; output: { honoX: 'HonoX' }; outputFormat: 'json'; status: 200 } }
  } & {
    '/zod-openapi-hono': {
      $get: {
        input: {}
        output: { 'zod-openapi-hono': 'ZodOpenAPIHono' }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
