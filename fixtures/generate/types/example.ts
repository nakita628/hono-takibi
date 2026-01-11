declare const routes: import(
  '/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index',
  { with: { 'resolution-mode': 'import' } }
).OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/sample': {
      $get: {
        input: {}
        output: {
          int32Value: number
          int64Value: never
          bigIntValue: never
          float32Value: number
          float64Value: number
          jwtValue: string
          decimalValue?: number | undefined
          uuidV7Value?: string | undefined
          base64UrlValue?: string | undefined
          durationValue?: string | undefined
          shortCode?: string | undefined
          nullableInt32Value?: number | null | undefined
          nullableShortCode?: string | null | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
