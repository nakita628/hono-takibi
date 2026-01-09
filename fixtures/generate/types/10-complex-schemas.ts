declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/events': {
      $post: { input: { json: unknown }; output: {}; outputFormat: string; status: 201 }
    }
  } & {
    '/notifications': {
      $post: {
        input: {
          json: {
            recipient:
              | { type: 'email'; email: string; name?: string | undefined }
              | { type: 'sms'; phoneNumber: string }
              | {
                  type: 'push'
                  deviceToken: string
                  platform?: 'ios' | 'android' | 'web' | undefined
                }
              | {
                  type: 'multi'
                  recipients: (
                    | { type: 'email'; email: string; name?: string | undefined }
                    | { type: 'sms'; phoneNumber: string }
                    | {
                        type: 'push'
                        deviceToken: string
                        platform?: 'ios' | 'android' | 'web' | undefined
                      }
                  )[]
                }
            content: {
              title: string
              body: string
              imageUrl?: string | undefined
              actionUrl?: string | undefined
            }
            priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/shapes': {
      $post: {
        input: {
          json:
            | { type: 'circle'; radius: number; center?: { x: number; y: number } | undefined }
            | {
                type: 'rectangle'
                width: number
                height: number
                topLeft?: { x: number; y: number } | undefined
              }
            | { type: 'triangle'; vertices: { x: number; y: number }[] }
            | { type: 'polygon'; vertices: { x: number; y: number }[] }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  } & {
    '/documents': {
      $post: { input: { json: unknown }; output: {}; outputFormat: string; status: 201 }
    }
  } & {
    '/mixed': { $post: { input: { json: unknown }; output: {}; outputFormat: string; status: 200 } }
  },
  '/'
>
export default routes
