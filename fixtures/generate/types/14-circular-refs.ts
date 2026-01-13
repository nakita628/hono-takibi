declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/trees': {
      $get: {
        input: {}
        output: {
          id: string
          value: string
          parent?: unknown | undefined
          children?: unknown[] | undefined
          metadata?: { [x: string]: unknown } | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: {
          json: {
            id: string
            value: string
            parent?: unknown | undefined
            children?: unknown[] | undefined
            metadata?: { [x: string]: unknown } | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  } & {
    '/graphs': {
      $get: {
        input: {}
        output: {
          id?: string | undefined
          nodes: {
            id: string
            data?: { [x: string]: unknown } | undefined
            edges?:
              | {
                  id?: string | undefined
                  source: unknown
                  target: unknown
                  weight?: number | undefined
                  metadata?:
                    | { label?: string | undefined; relatedEdges?: unknown[] | undefined }
                    | undefined
                }[]
              | undefined
            graph?: unknown | undefined
          }[]
          metadata?:
            | {
                name?: string | undefined
                rootNode?:
                  | {
                      id: string
                      data?: { [x: string]: unknown } | undefined
                      edges?:
                        | {
                            id?: string | undefined
                            source: unknown
                            target: unknown
                            weight?: number | undefined
                            metadata?:
                              | { label?: string | undefined; relatedEdges?: unknown[] | undefined }
                              | undefined
                          }[]
                        | undefined
                      graph?: unknown | undefined
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
          prev?: unknown | undefined
          next?: unknown | undefined
          list?:
            | {
                head?: unknown | undefined
                tail?: unknown | undefined
                length?: number | undefined
              }
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
                user?: unknown | undefined
                settings?:
                  | {
                      privacy?: string | undefined
                      notifications?: boolean | undefined
                      profile?: unknown | undefined
                    }
                  | undefined
              }
            | undefined
          followers?: unknown[] | undefined
          following?: unknown[] | undefined
          posts?:
            | {
                id: string
                content: string
                author: unknown
                likes?: unknown[] | undefined
                reposts?: unknown[] | undefined
                replyTo?: unknown | undefined
                replies?: unknown[] | undefined
                mentions?: unknown[] | undefined
              }[]
            | undefined
          blockedUsers?: unknown[] | undefined
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
                            ownedFiles?: unknown[] | undefined
                            homeDirectory?: unknown | undefined
                          }
                        | undefined
                      permissions?: unknown | undefined
                      entry?: unknown | undefined
                    }[]
                  | undefined
              }
            | undefined
          owner?:
            | {
                id?: string | undefined
                name?: string | undefined
                ownedFiles?: unknown[] | undefined
                homeDirectory?: unknown | undefined
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
                recentComments?: unknown[] | undefined
              }
            | undefined
          parent?: unknown | undefined
          replies?: unknown[] | undefined
          thread?:
            | {
                id?: string | undefined
                rootComment?: unknown | undefined
                allComments?: unknown[] | undefined
              }
            | undefined
          quotedComment?: unknown | undefined
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
              operator: '+' | '-' | '*' | '/' | '==' | '!=' | '<' | '>' | '&&' | '||'
              left: unknown
              right: unknown
            }
          | { type: 'unary'; operator: '-' | '!' | '~'; operand: unknown }
          | { type: 'conditional'; condition: unknown; consequent: unknown; alternate: unknown }
          | { type: 'call'; callee: unknown; arguments: unknown[] }
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
          parent?: unknown | undefined
          children?: unknown[] | undefined
          ancestors?: unknown[] | undefined
          descendants?: unknown[] | undefined
          relatedCategories?: { [x: string]: unknown } | undefined
          products?:
            | {
                id?: string | undefined
                name?: string | undefined
                primaryCategory?: unknown | undefined
                secondaryCategories?: unknown[] | undefined
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
                sourceState?: unknown | undefined
                targetState: unknown
                guard?:
                  | { condition?: string | undefined; relatedTransitions?: unknown[] | undefined }
                  | undefined
                actions?:
                  | {
                      type?: string | undefined
                      config?: { [x: string]: unknown } | undefined
                      nextAction?: unknown | undefined
                      fallbackAction?: unknown | undefined
                      triggerTransition?: unknown | undefined
                    }[]
                  | undefined
              }[]
            | undefined
          entryActions?:
            | {
                type?: string | undefined
                config?: { [x: string]: unknown } | undefined
                nextAction?: unknown | undefined
                fallbackAction?: unknown | undefined
                triggerTransition?:
                  | {
                      event: string
                      sourceState?: unknown | undefined
                      targetState: unknown
                      guard?:
                        | {
                            condition?: string | undefined
                            relatedTransitions?: unknown[] | undefined
                          }
                        | undefined
                      actions?: unknown[] | undefined
                    }
                  | undefined
              }[]
            | undefined
          exitActions?:
            | {
                type?: string | undefined
                config?: { [x: string]: unknown } | undefined
                nextAction?: unknown | undefined
                fallbackAction?: unknown | undefined
                triggerTransition?:
                  | {
                      event: string
                      sourceState?: unknown | undefined
                      targetState: unknown
                      guard?:
                        | {
                            condition?: string | undefined
                            relatedTransitions?: unknown[] | undefined
                          }
                        | undefined
                      actions?: unknown[] | undefined
                    }
                  | undefined
              }[]
            | undefined
          parentState?: unknown | undefined
          childStates?: unknown[] | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
