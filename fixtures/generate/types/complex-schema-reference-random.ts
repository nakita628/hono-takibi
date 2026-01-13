declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/test': {
      $get: {
        input: {}
        output: {
          flatRefs?:
            | {
                A?: { name?: string | undefined } | undefined
                B?: { id?: string | undefined } | undefined
                C?: { value?: number | undefined } | undefined
                D?: { description?: string | undefined } | undefined
                E?: { flag?: boolean | undefined } | undefined
                F?: { title?: string | undefined } | undefined
                G?: { summary?: string | undefined } | undefined
                H?: { info?: string | undefined } | undefined
                I?: { data?: string | undefined } | undefined
                J?: { code?: string | undefined } | undefined
                K?: { key?: string | undefined } | undefined
                L?: { label?: string | undefined } | undefined
                M?: { meta?: string | undefined } | undefined
                N?: { number?: number | undefined } | undefined
                O?: { option?: string | undefined } | undefined
                P?: { price?: number | undefined } | undefined
                Q?: { quantity?: number | undefined } | undefined
                R?: { rating?: number | undefined } | undefined
                S?: { status?: string | undefined } | undefined
                T?: { time?: string | undefined } | undefined
                U?: { unit?: string | undefined } | undefined
                V?: { volume?: number | undefined } | undefined
                W?: { weight?: number | undefined } | undefined
                X?: { xFactor?: string | undefined } | undefined
                Y?: { yield?: string | undefined } | undefined
                Z?: { zone?: string | undefined } | undefined
              }
            | undefined
          nestedRefs?:
            | {
                group1?:
                  | {
                      A?: { name?: string | undefined } | undefined
                      M?: { meta?: string | undefined } | undefined
                      Z?: { zone?: string | undefined } | undefined
                    }
                  | undefined
                group2?:
                  | {
                      B?: { id?: string | undefined } | undefined
                      N?: { number?: number | undefined } | undefined
                      Y?: { yield?: string | undefined } | undefined
                    }
                  | undefined
              }
            | undefined
          chainRefs?:
            | {
                A?:
                  | {
                      name?: string | undefined
                      B?:
                        | {
                            id?: string | undefined
                            C?:
                              | {
                                  value?: number | undefined
                                  D?:
                                    | {
                                        description?: string | undefined
                                        E?:
                                          | {
                                              flag?: boolean | undefined
                                              F?:
                                                | {
                                                    title?: string | undefined
                                                    G?:
                                                      | {
                                                          summary?: string | undefined
                                                          H?:
                                                            | {
                                                                info?: string | undefined
                                                                I?:
                                                                  | {
                                                                      data?: string | undefined
                                                                      J?:
                                                                        | {
                                                                            code?:
                                                                              | string
                                                                              | undefined
                                                                            K?:
                                                                              | {
                                                                                  key?:
                                                                                    | string
                                                                                    | undefined
                                                                                  L?:
                                                                                    | {
                                                                                        label?:
                                                                                          | string
                                                                                          | undefined
                                                                                        M?:
                                                                                          | {
                                                                                              meta?:
                                                                                                | string
                                                                                                | undefined
                                                                                              N?:
                                                                                                | {
                                                                                                    number?:
                                                                                                      | number
                                                                                                      | undefined
                                                                                                    O?:
                                                                                                      | {
                                                                                                          option?:
                                                                                                            | string
                                                                                                            | undefined
                                                                                                          P?:
                                                                                                            | {
                                                                                                                price?:
                                                                                                                  | number
                                                                                                                  | undefined
                                                                                                                Q?:
                                                                                                                  | {
                                                                                                                      quantity?:
                                                                                                                        | number
                                                                                                                        | undefined
                                                                                                                      R?:
                                                                                                                        | {
                                                                                                                            rating?:
                                                                                                                              | number
                                                                                                                              | undefined
                                                                                                                            S?:
                                                                                                                              | {
                                                                                                                                  status?:
                                                                                                                                    | string
                                                                                                                                    | undefined
                                                                                                                                  T?:
                                                                                                                                    | {
                                                                                                                                        time?:
                                                                                                                                          | string
                                                                                                                                          | undefined
                                                                                                                                        U?:
                                                                                                                                          | {
                                                                                                                                              unit?:
                                                                                                                                                | string
                                                                                                                                                | undefined
                                                                                                                                              V?:
                                                                                                                                                | {
                                                                                                                                                    volume?:
                                                                                                                                                      | number
                                                                                                                                                      | undefined
                                                                                                                                                    W?:
                                                                                                                                                      | {
                                                                                                                                                          weight?:
                                                                                                                                                            | number
                                                                                                                                                            | undefined
                                                                                                                                                          X?:
                                                                                                                                                            | {
                                                                                                                                                                xFactor?:
                                                                                                                                                                  | string
                                                                                                                                                                  | undefined
                                                                                                                                                                Y?:
                                                                                                                                                                  | {
                                                                                                                                                                      yield?:
                                                                                                                                                                        | string
                                                                                                                                                                        | undefined
                                                                                                                                                                      Z?:
                                                                                                                                                                        | {
                                                                                                                                                                            zone?:
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
          oneOfRefs?:
            | { value?: number | undefined }
            | { D?: { description?: string | undefined } | undefined }
            | undefined
          anyOfRefs?:
            | { flag?: boolean | undefined }
            | { A?: { name?: string | undefined } | undefined }
            | undefined
          allOfRefs?:
            | { name?: string | undefined; B?: { id?: string | undefined } | undefined }
            | undefined
          arrayRefs?: { unit?: string | undefined }[] | undefined
          chainRefsExtended?:
            | {
                V?:
                  | {
                      volume?: number | undefined
                      W?:
                        | {
                            weight?: number | undefined
                            X?:
                              | {
                                  xFactor?: string | undefined
                                  Y?:
                                    | {
                                        yield?: string | undefined
                                        Z?: { zone?: string | undefined } | undefined
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
          mixedComplex?:
            | {
                data?:
                  | (
                      | { meta?: string | undefined }
                      | { N?: { number?: number | undefined } | undefined }
                    )[]
                  | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
