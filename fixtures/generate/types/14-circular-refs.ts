declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/trees': {
      $get: {
        input: {}
        output: {
          id: string
          value: string
          parent?: any | undefined
          children?: any[] | undefined
          metadata?: { [x: string]: any } | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/trees': { $post: { input: { json: unknown }; output: {}; outputFormat: string; status: 201 } }
  } & {
    '/graphs': {
      $get: {
        input: {}
        output: {
          id?: string | undefined
          nodes: {
            id: string
            data?:
              | {
                  [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                }
              | undefined
            edges?:
              | {
                  id?: string | undefined
                  source: any
                  target: any
                  weight?: number | undefined
                  metadata?:
                    | { label?: string | undefined; relatedEdges?: any[] | undefined }
                    | undefined
                }[]
              | undefined
            graph?: any | undefined
          }[]
          metadata?:
            | {
                name?: string | undefined
                rootNode?:
                  | {
                      id: string
                      data?:
                        | {
                            [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                          }
                        | undefined
                      edges?:
                        | {
                            id?: string | undefined
                            source: any
                            target: any
                            weight?: number | undefined
                            metadata?:
                              | { label?: string | undefined; relatedEdges?: any[] | undefined }
                              | undefined
                          }[]
                        | undefined
                      graph?: any | undefined
                    }
                  | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/linked-lists': {
      $get: {
        input: {}
        output: {
          value: string
          prev?: any | undefined
          next?: any | undefined
          list?:
            | { head?: any | undefined; tail?: any | undefined; length?: number | undefined }
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/social-network': {
      $get: {
        input: {}
        output: {
          id: string
          username: string
          profile?:
            | {
                bio?: string | undefined
                avatar?: string | undefined
                user?: any | undefined
                settings?:
                  | {
                      privacy?: string | undefined
                      notifications?: boolean | undefined
                      profile?: any | undefined
                    }
                  | undefined
              }
            | undefined
          followers?: any[] | undefined
          following?: any[] | undefined
          posts?:
            | {
                id: string
                content: string
                author: any
                likes?: any[] | undefined
                reposts?: any[] | undefined
                replyTo?: any | undefined
                replies?: any[] | undefined
                mentions?: any[] | undefined
              }[]
            | undefined
          blockedUsers?: any[] | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/file-system': {
      $get: {
        input: {}
        output: {
          name: string
          type: 'file' | 'directory' | 'symlink'
          permissions?:
            | {
                read?: boolean | undefined
                write?: boolean | undefined
                execute?: boolean | undefined
                acl?:
                  | {
                      principal?:
                        | {
                            id?: string | undefined
                            name?: string | undefined
                            ownedFiles?: any[] | undefined
                            homeDirectory?: any | undefined
                          }
                        | undefined
                      permissions?: any | undefined
                      entry?: any | undefined
                    }[]
                  | undefined
              }
            | undefined
          owner?:
            | {
                id?: string | undefined
                name?: string | undefined
                ownedFiles?: any[] | undefined
                homeDirectory?: any | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/comments': {
      $get: {
        input: {}
        output: {
          id: string
          content: string
          author?:
            | {
                id?: string | undefined
                name?: string | undefined
                recentComments?: any[] | undefined
              }
            | undefined
          parent?: any | undefined
          replies?: any[] | undefined
          thread?:
            | {
                id?: string | undefined
                rootComment?: any | undefined
                allComments?: any[] | undefined
              }
            | undefined
          quotedComment?: any | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/polymorphic': {
      $get: {
        input: {}
        output:
          | { type: 'literal'; value: string | number | boolean }
          | {
              type: 'binary'
              operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
              left:
                | { type: 'literal'; value: string | number | boolean }
                | any
                | {
                    type: 'unary'
                    operator: '-' | '!' | '~'
                    operand:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | any
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          )[]
                        }
                  }
                | {
                    type: 'conditional'
                    condition:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                    consequent:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                    alternate:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                  }
                | {
                    type: 'call'
                    callee:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | any
                    arguments: (
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | any
                    )[]
                  }
              right:
                | { type: 'literal'; value: string | number | boolean }
                | any
                | {
                    type: 'unary'
                    operator: '-' | '!' | '~'
                    operand:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | any
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          )[]
                        }
                  }
                | {
                    type: 'conditional'
                    condition:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                    consequent:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                    alternate:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                  }
                | {
                    type: 'call'
                    callee:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | any
                    arguments: (
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | any
                    )[]
                  }
            }
          | {
              type: 'unary'
              operator: '-' | '!' | '~'
              operand:
                | { type: 'literal'; value: string | number | boolean }
                | {
                    type: 'binary'
                    operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                    left:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | any
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          )[]
                        }
                    right:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | any
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          )[]
                        }
                  }
                | any
                | {
                    type: 'conditional'
                    condition:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          )[]
                        }
                    consequent:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          )[]
                        }
                    alternate:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          )[]
                        }
                  }
                | {
                    type: 'call'
                    callee:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | any
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                    arguments: (
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | any
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                    )[]
                  }
            }
          | {
              type: 'conditional'
              condition:
                | { type: 'literal'; value: string | number | boolean }
                | {
                    type: 'binary'
                    operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                    left:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                    right:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                  }
                | {
                    type: 'unary'
                    operator: '-' | '!' | '~'
                    operand:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          )[]
                        }
                  }
                | any
                | {
                    type: 'call'
                    callee:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                    arguments: (
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                    )[]
                  }
              consequent:
                | { type: 'literal'; value: string | number | boolean }
                | {
                    type: 'binary'
                    operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                    left:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                    right:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                  }
                | {
                    type: 'unary'
                    operator: '-' | '!' | '~'
                    operand:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          )[]
                        }
                  }
                | any
                | {
                    type: 'call'
                    callee:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                    arguments: (
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                    )[]
                  }
              alternate:
                | { type: 'literal'; value: string | number | boolean }
                | {
                    type: 'binary'
                    operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                    left:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                    right:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          )[]
                        }
                  }
                | {
                    type: 'unary'
                    operator: '-' | '!' | '~'
                    operand:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | any
                            | {
                                type: 'call'
                                callee:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                arguments: (
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                )[]
                              }
                        }
                      | any
                      | any
                      | {
                          type: 'call'
                          callee:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          arguments: (
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          )[]
                        }
                  }
                | any
                | {
                    type: 'call'
                    callee:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                    arguments: (
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                    )[]
                  }
            }
          | {
              type: 'call'
              callee:
                | { type: 'literal'; value: string | number | boolean }
                | {
                    type: 'binary'
                    operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                    left:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | any
                    right:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | any
                  }
                | {
                    type: 'unary'
                    operator: '-' | '!' | '~'
                    operand:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | any
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                  }
                | {
                    type: 'conditional'
                    condition:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                    consequent:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                    alternate:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                  }
                | any
              arguments: (
                | { type: 'literal'; value: string | number | boolean }
                | {
                    type: 'binary'
                    operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                    left:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | any
                    right:
                      | { type: 'literal'; value: string | number | boolean }
                      | any
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | any
                  }
                | {
                    type: 'unary'
                    operator: '-' | '!' | '~'
                    operand:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | any
                            | {
                                type: 'conditional'
                                condition:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                consequent:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                alternate:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                        }
                      | any
                      | {
                          type: 'conditional'
                          condition:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          consequent:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                          alternate:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                  }
                | {
                    type: 'conditional'
                    condition:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                    consequent:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                    alternate:
                      | { type: 'literal'; value: string | number | boolean }
                      | {
                          type: 'binary'
                          operator: '/' | '+' | '-' | '*' | '==' | '!=' | '<' | '>' | '&&' | '||'
                          left:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                          right:
                            | { type: 'literal'; value: string | number | boolean }
                            | any
                            | {
                                type: 'unary'
                                operator: '-' | '!' | '~'
                                operand:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                        }
                      | {
                          type: 'unary'
                          operator: '-' | '!' | '~'
                          operand:
                            | { type: 'literal'; value: string | number | boolean }
                            | {
                                type: 'binary'
                                operator:
                                  | '/'
                                  | '+'
                                  | '-'
                                  | '*'
                                  | '=='
                                  | '!='
                                  | '<'
                                  | '>'
                                  | '&&'
                                  | '||'
                                left:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                                right:
                                  | { type: 'literal'; value: string | number | boolean }
                                  | any
                                  | any
                                  | any
                                  | any
                              }
                            | any
                            | any
                            | any
                        }
                      | any
                      | any
                  }
                | any
              )[]
            }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/categories': {
      $get: {
        input: {}
        output: {
          id: string
          name: string
          parent?: any | undefined
          children?: any[] | undefined
          ancestors?: any[] | undefined
          descendants?: any[] | undefined
          relatedCategories?: { [x: string]: any } | undefined
          products?:
            | {
                id?: string | undefined
                name?: string | undefined
                primaryCategory?: any | undefined
                secondaryCategories?: any[] | undefined
              }[]
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/workflow': {
      $get: {
        input: {}
        output: {
          id: string
          name: string
          description?: string | undefined
          transitions?:
            | {
                event: string
                sourceState?: any | undefined
                targetState: any
                guard?:
                  | { condition?: string | undefined; relatedTransitions?: any[] | undefined }
                  | undefined
                actions?:
                  | {
                      type?: string | undefined
                      config?:
                        | {
                            [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                          }
                        | undefined
                      nextAction?: any | undefined
                      fallbackAction?: any | undefined
                      triggerTransition?: any | undefined
                    }[]
                  | undefined
              }[]
            | undefined
          entryActions?:
            | {
                type?: string | undefined
                config?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
                nextAction?: any | undefined
                fallbackAction?: any | undefined
                triggerTransition?:
                  | {
                      event: string
                      sourceState?: any | undefined
                      targetState: any
                      guard?:
                        | { condition?: string | undefined; relatedTransitions?: any[] | undefined }
                        | undefined
                      actions?: any[] | undefined
                    }
                  | undefined
              }[]
            | undefined
          exitActions?:
            | {
                type?: string | undefined
                config?:
                  | {
                      [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                    }
                  | undefined
                nextAction?: any | undefined
                fallbackAction?: any | undefined
                triggerTransition?:
                  | {
                      event: string
                      sourceState?: any | undefined
                      targetState: any
                      guard?:
                        | { condition?: string | undefined; relatedTransitions?: any[] | undefined }
                        | undefined
                      actions?: any[] | undefined
                    }
                  | undefined
              }[]
            | undefined
          parentState?: any | undefined
          childStates?: any[] | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
