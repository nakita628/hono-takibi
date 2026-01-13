declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
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
                        binary?: File | undefined
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
                  emptyOnly?: { [x: string]: unknown }[] | undefined
                  singleOnly?: string[] | undefined
                  hugeArray?: string[] | undefined
                  uniqueBooleans?: boolean[] | undefined
                  uniqueEnum?: ('a' | 'b' | 'c')[] | undefined
                  deeplyNested?: string[][][][] | undefined
                  uniqueNested?: number[][] | undefined
                  largeTuple?: unknown[] | undefined
                  tupleWithAdditional?: boolean[] | undefined
                  containsConstraint?: unknown[] | undefined
                }
              | undefined
            extremeObjects?:
              | {
                  emptyOnly?: {} | undefined
                  singleProperty?: { [x: string]: string } | undefined
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
                  patternProperties?: {} | undefined
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
                  propertyNames?: { [x: string]: string } | undefined
                  unevaluatedProps?: { known?: string | undefined } | undefined
                }
              | undefined
            extremeCompositions?:
              | {
                  manyOneOf?:
                    | 'type1'
                    | 'type2'
                    | 'type3'
                    | 'type4'
                    | 'type5'
                    | 'type6'
                    | 'type7'
                    | 'type8'
                    | 'type9'
                    | 'type10'
                    | number
                    | boolean
                    | string[]
                    | { [x: string]: unknown }
                    | ({ [x: string]: unknown } | null)
                    | undefined
                  deeplyNestedComposition?: { e?: string | undefined } | undefined
                  complexNot?: { value?: string | undefined } | undefined
                  conditionalChain?: { [x: string]: unknown } | undefined
                  conflictingAllOf?: { shared?: string | undefined } | undefined
                  recursiveConstrained?:
                    | { value?: string | undefined; children?: unknown[] | undefined }
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
  },
  '/'
>
export default routes
