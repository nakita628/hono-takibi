declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/validate': {
      $post: {
        input: {
          json: {
            extremeStrings?:
              | {
                  emptyOnly?: string | undefined
                  singleChar?: string | undefined
                  veryLong?: string | undefined
                  conflictingPatternFormat?: string | undefined
                  multiPattern?: string | undefined
                  unicodePattern?: string | undefined
                  complexRegex?: string | undefined
                  emptyPattern?: string | undefined
                  impossiblePattern?: string | undefined
                  allFormats?:
                    | {
                        dateTime?: string | undefined
                        date?: string | undefined
                        time?: string | undefined
                        duration?: string | undefined
                        email?: string | undefined
                        idnEmail?: string | undefined
                        hostname?: string | undefined
                        idnHostname?: string | undefined
                        ipv4?: string | undefined
                        ipv6?: string | undefined
                        uri?: string | undefined
                        uriReference?: string | undefined
                        iri?: string | undefined
                        iriReference?: string | undefined
                        uriTemplate?: string | undefined
                        jsonPointer?: string | undefined
                        relativeJsonPointer?: string | undefined
                        regex?: string | undefined
                        uuid?: string | undefined
                        byte?: string | undefined
                        binary?:
                          | import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
                          | undefined
                        password?: string | undefined
                      }
                    | undefined
                }
              | undefined
            extremeNumbers?:
              | {
                  zeroOnly?: number | undefined
                  negativeZero?: number | undefined
                  tinyRange?: number | undefined
                  hugePositive?: number | undefined
                  hugeNegative?: number | undefined
                  preciseMultiple?: number | undefined
                  conflictingMultiple?: number | undefined
                  integerDecimalMultiple?: number | undefined
                  exclusiveEdge?: number | undefined
                  bothExclusive?: number | undefined
                  int32Bounded?: number | undefined
                  int64Bounded?: bigint | undefined
                  floatEdge?: number | undefined
                  doubleEdge?: number | undefined
                }
              | undefined
            extremeArrays?:
              | {
                  emptyOnly?: any[] | undefined
                  singleOnly?: string[] | undefined
                  hugeArray?: string[] | undefined
                  uniqueBooleans?: boolean[] | undefined
                  uniqueEnum?: ('a' | 'b' | 'c')[] | undefined
                  deeplyNested?: string[][][][] | undefined
                  uniqueNested?: number[][] | undefined
                  largeTuple?: any[] | undefined
                  tupleWithAdditional?: boolean[] | undefined
                  containsConstraint?: any[] | undefined
                }
              | undefined
            extremeObjects?:
              | {
                  emptyOnly?: Record<string, never> | undefined
                  singleProperty?: Record<string, string> | undefined
                  manyRequired?:
                    | {
                        prop1: string
                        prop2: string
                        prop3: string
                        prop4: string
                        prop5: string
                        prop6: string
                        prop7: string
                        prop8: string
                        prop9: string
                        prop10: string
                        prop11: string
                        prop12: string
                        prop13: string
                        prop14: string
                        prop15: string
                        prop16: string
                        prop17: string
                        prop18: string
                        prop19: string
                        prop20: string
                      }
                    | undefined
                  patternProperties?: Record<string, never> | undefined
                  dependentRequired?:
                    | {
                        billing_address?: string | undefined
                        shipping_address?: string | undefined
                        use_same_address?: boolean | undefined
                      }
                    | undefined
                  dependentSchemas?:
                    | { credit_card?: string | undefined; billing_address?: string | undefined }
                    | undefined
                  propertyNames?: Record<string, string> | undefined
                  unevaluatedProps?: { known?: string | undefined } | undefined
                }
              | undefined
            extremeCompositions?: unknown
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
