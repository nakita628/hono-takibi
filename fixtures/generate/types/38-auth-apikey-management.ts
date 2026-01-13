declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/api-keys': {
      $get:
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                status?: 'active' | 'revoked' | 'expired' | undefined
                environment?: 'production' | 'staging' | 'development' | 'test' | undefined
              }
            }
            output: {
              data: {
                id: string
                name: string
                description?: string | undefined
                prefix: string
                maskedKey?: string | undefined
                status: 'active' | 'revoked' | 'expired'
                environment: 'production' | 'staging' | 'development' | 'test'
                scopes?: string[] | undefined
                expiresAt?: string | undefined
                lastUsedAt?: string | undefined
                createdAt: string
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                status?: 'active' | 'revoked' | 'expired' | undefined
                environment?: 'production' | 'staging' | 'development' | 'test' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $post:
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                environment: 'production' | 'staging' | 'development' | 'test'
                scopes?: string[] | undefined
                expiresAt?: string | undefined
              }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              prefix: string
              maskedKey?: string | undefined
              status: 'active' | 'revoked' | 'expired'
              environment: 'production' | 'staging' | 'development' | 'test'
              scopes?: string[] | undefined
              expiresAt?: string | undefined
              lastUsedAt?: string | undefined
              createdAt: string
              secretKey: string
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                environment: 'production' | 'staging' | 'development' | 'test'
                scopes?: string[] | undefined
                expiresAt?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                environment: 'production' | 'staging' | 'development' | 'test'
                scopes?: string[] | undefined
                expiresAt?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/api-keys/:keyId': {
      $get:
        | {
            input: { param: { keyId: string } }
            output: {
              id: string
              name: string
              description?: string | undefined
              prefix: string
              maskedKey?: string | undefined
              status: 'active' | 'revoked' | 'expired'
              environment: 'production' | 'staging' | 'development' | 'test'
              scopes?: string[] | undefined
              expiresAt?: string | undefined
              lastUsedAt?: string | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { keyId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { keyId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
      $patch:
        | {
            input: { param: { keyId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                scopes?: string[] | undefined
              }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              prefix: string
              maskedKey?: string | undefined
              status: 'active' | 'revoked' | 'expired'
              environment: 'production' | 'staging' | 'development' | 'test'
              scopes?: string[] | undefined
              expiresAt?: string | undefined
              lastUsedAt?: string | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { keyId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                scopes?: string[] | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | { input: { param: { keyId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { keyId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/api-keys/:keyId/revoke': {
      $post:
        | {
            input: { param: { keyId: string } } & { json: { reason?: string | undefined } }
            output: {
              id: string
              name: string
              description?: string | undefined
              prefix: string
              maskedKey?: string | undefined
              status: 'active' | 'revoked' | 'expired'
              environment: 'production' | 'staging' | 'development' | 'test'
              scopes?: string[] | undefined
              expiresAt?: string | undefined
              lastUsedAt?: string | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { keyId: string } } & { json: { reason?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/api-keys/:keyId/rotate': {
      $post:
        | {
            input: { param: { keyId: string } } & {
              json: { gracePeriodHours?: number | undefined }
            }
            output: {
              newKey: {
                id: string
                name: string
                description?: string | undefined
                prefix: string
                maskedKey?: string | undefined
                status: 'active' | 'revoked' | 'expired'
                environment: 'production' | 'staging' | 'development' | 'test'
                scopes?: string[] | undefined
                expiresAt?: string | undefined
                lastUsedAt?: string | undefined
                createdAt: string
                secretKey: string
              }
              oldKeyExpiresAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { keyId: string } } & {
              json: { gracePeriodHours?: number | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/api-keys/:keyId/usage': {
      $get:
        | {
            input: { param: { keyId: string } } & {
              query: {
                from: string
                to: string
                granularity?: 'hour' | 'day' | 'week' | 'month' | undefined
              }
            }
            output: {
              from: string
              to: string
              dataPoints: {
                timestamp?: string | undefined
                requests?: number | undefined
                successCount?: number | undefined
                errorCount?: number | undefined
              }[]
              summary: { totalRequests?: number | undefined; successRate?: number | undefined }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { keyId: string } } & {
              query: {
                from: string
                to: string
                granularity?: 'hour' | 'day' | 'week' | 'month' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/api-keys/:keyId/rate-limit/current': {
      $get:
        | {
            input: { param: { keyId: string } }
            output: {
              limit: number
              remaining: number
              resetAt: string
              currentUsage?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { keyId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/api-keys/verify': {
      $post:
        | {
            input: { json: { apiKey: string; requiredScopes?: string[] | undefined } }
            output: {
              valid: boolean
              keyId?: string | undefined
              environment?: string | undefined
              scopes?: string[] | undefined
              missingScopes?: string[] | undefined
              reason?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { apiKey: string; requiredScopes?: string[] | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/scopes': {
      $get:
        | {
            input: {}
            output: { name: string; description: string; category?: string | undefined }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  },
  '/'
>
export default routes
