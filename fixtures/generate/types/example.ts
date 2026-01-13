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
  RemoveIndexSignature<{
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
  }>,
  '/'
>
export default routes
