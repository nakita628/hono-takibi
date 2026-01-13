declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/pathological': {
      $post: {
        input: {
          json: {
            contradictions?:
              | {
                  impossibleLength?: string | undefined
                  impossibleRange?: number | undefined
                  noValidInteger?: number | undefined
                  impossibleArray?: string[] | undefined
                  impossibleObject?: { [x: string]: unknown } | undefined
                  missingRequired?: { existingProperty?: string | undefined } | undefined
                  constEnumConflict?: 'other1' | 'other2' | undefined
                  typeConflictAllOf?: {} | undefined
                  formatTypeMismatch?: number | undefined
                  multipleConst?: {} | undefined
                }
              | undefined
            impossible?:
              | {
                  alwaysFalse?: { [x: string]: unknown } | undefined
                  emptyOneOf?: { [x: string]: unknown } | undefined
                  emptyAnyOf?: { [x: string]: unknown } | undefined
                  impossibleAllOf?: {} | undefined
                  emptyEnum?: string | undefined
                  impossiblePattern?: string | undefined
                  integerDecimal?: number | undefined
                  closedEmpty?: {} | undefined
                }
              | undefined
            ambiguous?:
              | {
                  noType?: { [x: string]: unknown } | undefined
                  empty?: { [x: string]: unknown } | undefined
                  justFalse?: { [x: string]: unknown } | undefined
                  justTrue?: { [x: string]: unknown } | undefined
                  deepAny?: { [x: string]: unknown } | undefined
                  overlappingOneOf?:
                    | { a?: string | undefined }
                    | { a?: string | undefined; b?: string | undefined }
                    | { [x: string]: unknown }
                    | undefined
                  ambiguousAnyOf?: number | number | 1 | 2 | 3 | 2 | undefined
                  ambiguousDiscriminator?:
                    | { type?: 'a' | 'b' | undefined }
                    | { type?: 'b' | 'c' | undefined }
                    | undefined
                }
              | undefined
            edgeCases?:
              | {
                  deepNesting?:
                    | {
                        l1?:
                          | {
                              l2?:
                                | {
                                    l3?:
                                      | {
                                          l4?:
                                            | {
                                                l5?:
                                                  | {
                                                      l6?:
                                                        | {
                                                            l7?:
                                                              | {
                                                                  l8?:
                                                                    | {
                                                                        l9?:
                                                                          | {
                                                                              l10?:
                                                                                | string
                                                                                | undefined
                                                                            }
                                                                          | undefined
                                                                      }
                                                                    | undefined
                                                                }
                                                              | undefined
                                                          }
                                                        | undefined
                                                    }
                                                  | undefined
                                              }
                                            | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                      }
                    | undefined
                  wideObject?:
                    | {
                        p001?: string | undefined
                        p002?: string | undefined
                        p003?: string | undefined
                        p004?: string | undefined
                        p005?: string | undefined
                        p006?: string | undefined
                        p007?: string | undefined
                        p008?: string | undefined
                        p009?: string | undefined
                        p010?: string | undefined
                        p011?: string | undefined
                        p012?: string | undefined
                        p013?: string | undefined
                        p014?: string | undefined
                        p015?: string | undefined
                        p016?: string | undefined
                        p017?: string | undefined
                        p018?: string | undefined
                        p019?: string | undefined
                        p020?: string | undefined
                        p021?: string | undefined
                        p022?: string | undefined
                        p023?: string | undefined
                        p024?: string | undefined
                        p025?: string | undefined
                        p026?: string | undefined
                        p027?: string | undefined
                        p028?: string | undefined
                        p029?: string | undefined
                        p030?: string | undefined
                        p031?: string | undefined
                        p032?: string | undefined
                        p033?: string | undefined
                        p034?: string | undefined
                        p035?: string | undefined
                        p036?: string | undefined
                        p037?: string | undefined
                        p038?: string | undefined
                        p039?: string | undefined
                        p040?: string | undefined
                        p041?: string | undefined
                        p042?: string | undefined
                        p043?: string | undefined
                        p044?: string | undefined
                        p045?: string | undefined
                        p046?: string | undefined
                        p047?: string | undefined
                        p048?: string | undefined
                        p049?: string | undefined
                        p050?: string | undefined
                      }
                    | undefined
                  manyRequired?:
                    | {
                        r01: string
                        r02: string
                        r03: string
                        r04: string
                        r05: string
                        r06: string
                        r07: string
                        r08: string
                        r09: string
                        r10: string
                        r11: string
                        r12: string
                        r13: string
                        r14: string
                        r15: string
                        r16: string
                        r17: string
                        r18: string
                        r19: string
                        r20: string
                      }
                    | undefined
                  onlyFalse?: false | undefined
                  onlyTrue?: true | undefined
                  onlyNull?: ({ [x: string]: unknown } | null) | undefined
                  exactlyOne?: { [x: string]: string } | undefined
                  exactlyOneItem?: { id: string }[] | undefined
                }
              | undefined
            recursive?:
              | {
                  mutuallyRecursive?:
                    | {
                        value?: string | undefined
                        refB?:
                          | {
                              value?: number | undefined
                              refC?:
                                | { value?: boolean | undefined; refA?: unknown | undefined }
                                | undefined
                            }
                          | undefined
                      }
                    | undefined
                  constrainedRecursive?:
                    | {
                        value: string
                        children?: unknown[] | undefined
                        parent?: unknown | undefined
                        siblings?: unknown[] | undefined
                      }
                    | undefined
                  recursiveInAllOf?:
                    | { value?: string | undefined; child?: unknown | undefined }
                    | undefined
                  recursiveInOneOf?: string | { nested?: unknown | undefined } | undefined
                  recursiveMap?: { [x: string]: unknown } | undefined
                  recursiveArray?: unknown[][] | undefined
                }
              | undefined
            composition?:
              | {
                  nestedAllOf?:
                    | {
                        a?: string | undefined
                        b?: string | undefined
                        c?: string | undefined
                        d?: string | undefined
                      }
                    | undefined
                  nestedOneOf?: 'deep1' | 'deep2' | 1 | 2 | undefined
                  nestedAnyOf?:
                    | string
                    | number
                    | boolean
                    | ({ [x: string]: unknown } | null)
                    | undefined
                  allMixed?: {} | undefined
                  conditionalInAllOf?: { type?: string | undefined } | undefined
                  multiDiscriminator?:
                    | { kind: 'typeA'; valueA?: string | undefined }
                    | { kind: 'typeB'; valueB?: number | undefined }
                    | { kind: 'typeC'; valueC?: boolean | undefined }
                    | undefined
                  conflictingRequired?:
                    | { fieldA: string; fieldB: string; fieldC: string }
                    | undefined
                  overlappingSchemas?:
                    | { a: string; b: string }
                    | { a: string; c: string }
                    | { b: string; c: string }
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
