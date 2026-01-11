declare const routes: import(
  '/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index',
  { with: { 'resolution-mode': 'import' } }
).OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/string': {
      $get: {
        input: {}
        output: {
          max_string: string
          min_string: string
          length_string: string
          email_string: string
          url_string: string
          uuid_string: string
          nanoid_string: string
          cuid_string: string
          ulid_string: string
          regex_string: string
          includes_string: string
          startsWith_string: string
          endsWith_string: string
          datetime_string: string
          ip_string: string
          cidr_string: string
          trim_string: string
          toLowerCase_string: string
          toUpperCase_string: string
          date_string: string
          time_string: string
          duration_string: string
          base64_string: string
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
