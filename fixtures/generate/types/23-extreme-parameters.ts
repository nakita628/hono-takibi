declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/a/:p1/b/:p2/c/:p3/d/:p4/e/:p5/f/:p6/g/:p7/h/:p8/i/:p9/j/:p10': {
      $get: {
        input: {
          param: {
            p1: string
            p2: number
            p3: string
            p4: string
            p5: number
            p6: boolean
            p7: 'a' | 'b' | 'c'
            p8: bigint
            p9: string
            p10: string
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/query-styles': {
      $get: {
        input: {
          query: {
            formExplode?: string[] | undefined
            formNoExplode?: string[] | undefined
            spaceDelimited?: number[] | undefined
            pipeDelimited?: string[] | undefined
            deepObject?:
              | {
                  level1?: { level2?: { value?: string | undefined } | undefined } | undefined
                  array?: string[] | undefined
                }
              | undefined
            formObject?: { key1?: string | undefined; key2?: number | undefined } | undefined
            formObjectNoExplode?: { a?: string | undefined; b?: string | undefined } | undefined
            allowEmpty?: string | undefined
            allowReserved?: string | undefined
            complexDeep?:
              | {
                  filters?:
                    | {
                        status?: string[] | undefined
                        dateRange?:
                          | { from?: string | undefined; to?: string | undefined }
                          | undefined
                      }
                    | undefined
                  pagination?: { page?: number | undefined; limit?: number | undefined } | undefined
                  sort?:
                    | { field?: string | undefined; order?: 'asc' | 'desc' | undefined }[]
                    | undefined
                }
              | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/path-styles/:simple/:label/:matrix': {
      $get: {
        input: {
          param: {
            simple: string[]
            label: string[]
            matrix: { x?: number | undefined; y?: number | undefined }
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/header-styles': {
      $get: {
        input: {
          header: {
            'X-Simple-Array'?: string[] | undefined
            'X-Simple-Array-Exploded'?: string[] | undefined
            'X-Object-Header'?: { key1?: string | undefined; key2?: string | undefined } | undefined
            'X-Custom-1'?: string | undefined
            'X-Custom-2'?: number | undefined
            'X-Custom-3'?: boolean | undefined
            'X-Custom-4'?: number | undefined
            'X-Custom-5'?: string | undefined
            Accept?: string | undefined
            'Accept-Language'?: string | undefined
            'Accept-Encoding'?: string | undefined
            'Cache-Control'?: string | undefined
            'If-Match'?: string | undefined
            'If-None-Match'?: string | undefined
            'If-Modified-Since'?: string | undefined
            'If-Unmodified-Since'?: string | undefined
            Authorization?: string | undefined
            'X-Request-ID'?: string | undefined
            'X-Correlation-ID'?: string | undefined
            'X-Forwarded-For'?: string | undefined
            'X-Real-IP'?: string | undefined
            'User-Agent'?: string | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/cookie-styles': {
      $get: {
        input: {
          cookie: {
            session_id?: string | undefined
            preferences?: { theme?: string | undefined; language?: string | undefined } | undefined
            user_id?: string | undefined
            access_token?: string | undefined
            refresh_token?: string | undefined
            consent?: boolean | undefined
            tracking_id?: string | undefined
            cart_id?: string | undefined
            visited?: string[] | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/many-query-params': {
      $get: {
        input: {
          query: {
            q?: string | undefined
            page?: number | undefined
            limit?: number | undefined
            offset?: number | undefined
            sort?: string | undefined
            order?: 'asc' | 'desc' | undefined
            fields?: string[] | undefined
            include?: string[] | undefined
            exclude?: string[] | undefined
            filter?: Record<string, never> | undefined
            status?: string[] | undefined
            type?: string | undefined
            category?: string | undefined
            tags?: string[] | undefined
            minPrice?: unknown
            maxPrice?: unknown
            minDate?: string | undefined
            maxDate?: string | undefined
            active?: string | undefined
            verified?: string | undefined
            featured?: string | undefined
            promoted?: string | undefined
            archived?: string | undefined
            deleted?: string | undefined
            createdBy?: string | undefined
            updatedBy?: string | undefined
            ownerId?: string | undefined
            groupId?: string | undefined
            teamId?: string | undefined
            projectId?: string | undefined
            workspaceId?: string | undefined
            organizationId?: string | undefined
            locale?: string | undefined
            timezone?: string | undefined
            currency?: string | undefined
            format?: string | undefined
            version?: string | undefined
            beta?: string | undefined
            debug?: string | undefined
            trace?: string | undefined
            verbose?: string | undefined
            callback?: string | undefined
            jsonp?: string | undefined
            envelope?: string | undefined
            pretty?: string | undefined
            compress?: string | undefined
            cache?: string | undefined
            timeout?: number | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/parameter-content': {
      $get: {
        input: {
          query: {
            jsonFilter?:
              | {
                  field?: string | undefined
                  operator?: string | undefined
                  value?: string | undefined
                }
              | undefined
            complexQuery?:
              | {
                  filters?:
                    | { field?: string | undefined; op?: string | undefined; val?: any }[]
                    | undefined
                  logic?: 'and' | 'or' | undefined
                }
              | undefined
          }
        } & {
          header: {
            'X-Metadata'?:
              | {
                  requestId?: string | undefined
                  timestamp?: string | undefined
                  source?: string | undefined
                }
              | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/deprecated-params': {
      $get: {
        input: {
          query: {
            oldParam?: string | undefined
            legacyFilter?: string | undefined
            newParam?: string | undefined
          }
        } & { header: { 'X-Legacy-Header'?: string | undefined } }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/examples-params': {
      $get: {
        input: {
          query: {
            status?: 'active' | 'inactive' | 'pending' | undefined
            ids?: string[] | undefined
            filter?: { status?: string | undefined; date?: string | undefined } | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  },
  '/'
>
export default routes
