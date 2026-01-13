import type { OpenAPIHono } from '@hono/zod-openapi'

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K]
}

declare const routes: OpenAPIHono<
  Env,
  RemoveIndexSignature<
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
      '/mixed': {
        $post: { input: { json: unknown }; output: {}; outputFormat: string; status: 200 }
      }
    }
  >,
  '/'
>
export default routes
