declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/sample': {
      $get: {
        input: {}
        output: {
          int32Value: number
          int64Value: bigint
          bigIntValue: bigint
          float32Value: number
          float64Value: number
          decimalValue?: number | undefined
          jwtValue: string
          uuidV7Value?: string | undefined
          base64UrlValue?: string | undefined
          durationValue?: string | undefined
          shortCode?: string | undefined
          nullableInt32Value?: (number | null) | undefined
          nullableShortCode?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
