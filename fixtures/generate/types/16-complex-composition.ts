declare const routes: import(
  '/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index',
  { with: { 'resolution-mode': 'import' } }
).OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/messages': {
      $post: {
        input: { json: unknown }
        output:
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              type: 'text'
              sender: { id: string; name: string; avatar?: string | undefined }
              recipient: { id: string; name: string; avatar?: string | undefined }
              metadata?:
                | {
                    priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                    expiresAt?: string | undefined
                    replyTo?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'text'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          content: string
                          formatting?:
                            | {
                                bold?: { start: number; end: number }[] | undefined
                                italic?: { start: number; end: number }[] | undefined
                                links?: { start: number; end: number; url: string }[] | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'image'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          dimensions?: { width: number; height: number } | undefined
                          alt?: string | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'video'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          duration?: number | undefined
                          thumbnail?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'document'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          pageCount?: number | undefined
                          preview?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'composite'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          parts: (
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'text'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                content: string
                                formatting?:
                                  | {
                                      bold?: { start: number; end: number }[] | undefined
                                      italic?: { start: number; end: number }[] | undefined
                                      links?:
                                        | { start: number; end: number; url: string }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'video'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                duration?: number | undefined
                                thumbnail?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'document'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                pageCount?: number | undefined
                                preview?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | any
                          )[]
                        }
                      | undefined
                  }
                | undefined
              content: string
              formatting?:
                | {
                    bold?: { start: number; end: number }[] | undefined
                    italic?: { start: number; end: number }[] | undefined
                    links?: { start: number; end: number; url: string }[] | undefined
                  }
                | undefined
              deliveryStatus?:
                | {
                    sent?: boolean | undefined
                    delivered?: boolean | undefined
                    read?: boolean | undefined
                    timestamps?:
                      | {
                          sentAt?: string | undefined
                          deliveredAt?: string | undefined
                          readAt?: string | undefined
                        }
                      | undefined
                  }
                | undefined
            }
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              type: 'image'
              sender: { id: string; name: string; avatar?: string | undefined }
              recipient: { id: string; name: string; avatar?: string | undefined }
              metadata?:
                | {
                    priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                    expiresAt?: string | undefined
                    replyTo?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'text'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          content: string
                          formatting?:
                            | {
                                bold?: { start: number; end: number }[] | undefined
                                italic?: { start: number; end: number }[] | undefined
                                links?: { start: number; end: number; url: string }[] | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'image'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          dimensions?: { width: number; height: number } | undefined
                          alt?: string | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'video'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          duration?: number | undefined
                          thumbnail?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'document'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          pageCount?: number | undefined
                          preview?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'composite'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          parts: (
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'text'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                content: string
                                formatting?:
                                  | {
                                      bold?: { start: number; end: number }[] | undefined
                                      italic?: { start: number; end: number }[] | undefined
                                      links?:
                                        | { start: number; end: number; url: string }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'video'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                duration?: number | undefined
                                thumbnail?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'document'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                pageCount?: number | undefined
                                preview?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | any
                          )[]
                        }
                      | undefined
                  }
                | undefined
              url: string
              mimeType: string
              size: number
              checksum?: string | undefined
              dimensions?: { width: number; height: number } | undefined
              alt?: string | undefined
              deliveryStatus?:
                | {
                    sent?: boolean | undefined
                    delivered?: boolean | undefined
                    read?: boolean | undefined
                    timestamps?:
                      | {
                          sentAt?: string | undefined
                          deliveredAt?: string | undefined
                          readAt?: string | undefined
                        }
                      | undefined
                  }
                | undefined
            }
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              type: 'video'
              sender: { id: string; name: string; avatar?: string | undefined }
              recipient: { id: string; name: string; avatar?: string | undefined }
              metadata?:
                | {
                    priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                    expiresAt?: string | undefined
                    replyTo?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'text'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          content: string
                          formatting?:
                            | {
                                bold?: { start: number; end: number }[] | undefined
                                italic?: { start: number; end: number }[] | undefined
                                links?: { start: number; end: number; url: string }[] | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'image'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          dimensions?: { width: number; height: number } | undefined
                          alt?: string | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'video'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          duration?: number | undefined
                          thumbnail?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'document'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          pageCount?: number | undefined
                          preview?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'composite'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          parts: (
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'text'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                content: string
                                formatting?:
                                  | {
                                      bold?: { start: number; end: number }[] | undefined
                                      italic?: { start: number; end: number }[] | undefined
                                      links?:
                                        | { start: number; end: number; url: string }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'video'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                duration?: number | undefined
                                thumbnail?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'document'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                pageCount?: number | undefined
                                preview?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | any
                          )[]
                        }
                      | undefined
                  }
                | undefined
              url: string
              mimeType: string
              size: number
              checksum?: string | undefined
              duration?: number | undefined
              thumbnail?:
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    type: 'image'
                    sender: { id: string; name: string; avatar?: string | undefined }
                    recipient: { id: string; name: string; avatar?: string | undefined }
                    metadata?:
                      | {
                          priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                          expiresAt?: string | undefined
                          replyTo?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'text'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                content: string
                                formatting?:
                                  | {
                                      bold?: { start: number; end: number }[] | undefined
                                      italic?: { start: number; end: number }[] | undefined
                                      links?:
                                        | { start: number; end: number; url: string }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'video'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                duration?: number | undefined
                                thumbnail?: any | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'document'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                pageCount?: number | undefined
                                preview?: any | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'composite'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                parts: (
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'text'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      content: string
                                      formatting?:
                                        | {
                                            bold?: { start: number; end: number }[] | undefined
                                            italic?: { start: number; end: number }[] | undefined
                                            links?:
                                              | { start: number; end: number; url: string }[]
                                              | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'video'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      duration?: number | undefined
                                      thumbnail?: any | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'document'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      pageCount?: number | undefined
                                      preview?: any | undefined
                                    }
                                  | any
                                )[]
                              }
                            | undefined
                        }
                      | undefined
                    url: string
                    mimeType: string
                    size: number
                    checksum?: string | undefined
                    dimensions?: { width: number; height: number } | undefined
                    alt?: string | undefined
                  }
                | undefined
              deliveryStatus?:
                | {
                    sent?: boolean | undefined
                    delivered?: boolean | undefined
                    read?: boolean | undefined
                    timestamps?:
                      | {
                          sentAt?: string | undefined
                          deliveredAt?: string | undefined
                          readAt?: string | undefined
                        }
                      | undefined
                  }
                | undefined
            }
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              type: 'document'
              sender: { id: string; name: string; avatar?: string | undefined }
              recipient: { id: string; name: string; avatar?: string | undefined }
              metadata?:
                | {
                    priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                    expiresAt?: string | undefined
                    replyTo?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'text'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          content: string
                          formatting?:
                            | {
                                bold?: { start: number; end: number }[] | undefined
                                italic?: { start: number; end: number }[] | undefined
                                links?: { start: number; end: number; url: string }[] | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'image'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          dimensions?: { width: number; height: number } | undefined
                          alt?: string | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'video'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          duration?: number | undefined
                          thumbnail?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'document'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          pageCount?: number | undefined
                          preview?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'composite'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          parts: (
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'text'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                content: string
                                formatting?:
                                  | {
                                      bold?: { start: number; end: number }[] | undefined
                                      italic?: { start: number; end: number }[] | undefined
                                      links?:
                                        | { start: number; end: number; url: string }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'video'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                duration?: number | undefined
                                thumbnail?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'document'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                pageCount?: number | undefined
                                preview?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | any
                          )[]
                        }
                      | undefined
                  }
                | undefined
              url: string
              mimeType: string
              size: number
              checksum?: string | undefined
              pageCount?: number | undefined
              preview?:
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    type: 'image'
                    sender: { id: string; name: string; avatar?: string | undefined }
                    recipient: { id: string; name: string; avatar?: string | undefined }
                    metadata?:
                      | {
                          priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                          expiresAt?: string | undefined
                          replyTo?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'text'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                content: string
                                formatting?:
                                  | {
                                      bold?: { start: number; end: number }[] | undefined
                                      italic?: { start: number; end: number }[] | undefined
                                      links?:
                                        | { start: number; end: number; url: string }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'video'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                duration?: number | undefined
                                thumbnail?: any | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'document'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                pageCount?: number | undefined
                                preview?: any | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'composite'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                parts: (
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'text'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      content: string
                                      formatting?:
                                        | {
                                            bold?: { start: number; end: number }[] | undefined
                                            italic?: { start: number; end: number }[] | undefined
                                            links?:
                                              | { start: number; end: number; url: string }[]
                                              | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'video'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      duration?: number | undefined
                                      thumbnail?: any | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'document'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      pageCount?: number | undefined
                                      preview?: any | undefined
                                    }
                                  | any
                                )[]
                              }
                            | undefined
                        }
                      | undefined
                    url: string
                    mimeType: string
                    size: number
                    checksum?: string | undefined
                    dimensions?: { width: number; height: number } | undefined
                    alt?: string | undefined
                  }
                | undefined
              deliveryStatus?:
                | {
                    sent?: boolean | undefined
                    delivered?: boolean | undefined
                    read?: boolean | undefined
                    timestamps?:
                      | {
                          sentAt?: string | undefined
                          deliveredAt?: string | undefined
                          readAt?: string | undefined
                        }
                      | undefined
                  }
                | undefined
            }
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              type: 'composite'
              sender: { id: string; name: string; avatar?: string | undefined }
              recipient: { id: string; name: string; avatar?: string | undefined }
              metadata?:
                | {
                    priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                    expiresAt?: string | undefined
                    replyTo?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'text'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          content: string
                          formatting?:
                            | {
                                bold?: { start: number; end: number }[] | undefined
                                italic?: { start: number; end: number }[] | undefined
                                links?: { start: number; end: number; url: string }[] | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'image'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          dimensions?: { width: number; height: number } | undefined
                          alt?: string | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'video'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          duration?: number | undefined
                          thumbnail?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'document'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          pageCount?: number | undefined
                          preview?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'composite'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?: any | undefined
                          parts: (
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'text'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                content: string
                                formatting?:
                                  | {
                                      bold?: { start: number; end: number }[] | undefined
                                      italic?: { start: number; end: number }[] | undefined
                                      links?:
                                        | { start: number; end: number; url: string }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'video'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                duration?: number | undefined
                                thumbnail?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'document'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                pageCount?: number | undefined
                                preview?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | any
                          )[]
                        }
                      | undefined
                  }
                | undefined
              parts: (
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    type: 'text'
                    sender: { id: string; name: string; avatar?: string | undefined }
                    recipient: { id: string; name: string; avatar?: string | undefined }
                    metadata?:
                      | {
                          priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                          expiresAt?: string | undefined
                          replyTo?:
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'video'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                duration?: number | undefined
                                thumbnail?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'document'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                pageCount?: number | undefined
                                preview?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'composite'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                parts: (
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'video'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      duration?: number | undefined
                                      thumbnail?:
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'image'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            dimensions?:
                                              | { width: number; height: number }
                                              | undefined
                                            alt?: string | undefined
                                          }
                                        | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'document'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      pageCount?: number | undefined
                                      preview?:
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'image'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            dimensions?:
                                              | { width: number; height: number }
                                              | undefined
                                            alt?: string | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                )[]
                              }
                            | undefined
                        }
                      | undefined
                    content: string
                    formatting?:
                      | {
                          bold?: { start: number; end: number }[] | undefined
                          italic?: { start: number; end: number }[] | undefined
                          links?: { start: number; end: number; url: string }[] | undefined
                        }
                      | undefined
                  }
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    type: 'image'
                    sender: { id: string; name: string; avatar?: string | undefined }
                    recipient: { id: string; name: string; avatar?: string | undefined }
                    metadata?:
                      | {
                          priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                          expiresAt?: string | undefined
                          replyTo?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'text'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                content: string
                                formatting?:
                                  | {
                                      bold?: { start: number; end: number }[] | undefined
                                      italic?: { start: number; end: number }[] | undefined
                                      links?:
                                        | { start: number; end: number; url: string }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'video'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                duration?: number | undefined
                                thumbnail?: any | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'document'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                pageCount?: number | undefined
                                preview?: any | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'composite'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                parts: (
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'text'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      content: string
                                      formatting?:
                                        | {
                                            bold?: { start: number; end: number }[] | undefined
                                            italic?: { start: number; end: number }[] | undefined
                                            links?:
                                              | { start: number; end: number; url: string }[]
                                              | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'video'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      duration?: number | undefined
                                      thumbnail?: any | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'document'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      pageCount?: number | undefined
                                      preview?: any | undefined
                                    }
                                  | any
                                )[]
                              }
                            | undefined
                        }
                      | undefined
                    url: string
                    mimeType: string
                    size: number
                    checksum?: string | undefined
                    dimensions?: { width: number; height: number } | undefined
                    alt?: string | undefined
                  }
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    type: 'video'
                    sender: { id: string; name: string; avatar?: string | undefined }
                    recipient: { id: string; name: string; avatar?: string | undefined }
                    metadata?:
                      | {
                          priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                          expiresAt?: string | undefined
                          replyTo?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'text'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                content: string
                                formatting?:
                                  | {
                                      bold?: { start: number; end: number }[] | undefined
                                      italic?: { start: number; end: number }[] | undefined
                                      links?:
                                        | { start: number; end: number; url: string }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'document'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                pageCount?: number | undefined
                                preview?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'composite'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                parts: (
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'text'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      content: string
                                      formatting?:
                                        | {
                                            bold?: { start: number; end: number }[] | undefined
                                            italic?: { start: number; end: number }[] | undefined
                                            links?:
                                              | { start: number; end: number; url: string }[]
                                              | undefined
                                          }
                                        | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'document'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      pageCount?: number | undefined
                                      preview?:
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'image'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            dimensions?:
                                              | { width: number; height: number }
                                              | undefined
                                            alt?: string | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                )[]
                              }
                            | undefined
                        }
                      | undefined
                    url: string
                    mimeType: string
                    size: number
                    checksum?: string | undefined
                    duration?: number | undefined
                    thumbnail?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'image'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?:
                            | {
                                priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                                expiresAt?: string | undefined
                                replyTo?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'text'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      content: string
                                      formatting?:
                                        | {
                                            bold?: { start: number; end: number }[] | undefined
                                            italic?: { start: number; end: number }[] | undefined
                                            links?:
                                              | { start: number; end: number; url: string }[]
                                              | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'document'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      pageCount?: number | undefined
                                      preview?: any | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'composite'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      parts: (
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'text'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            content: string
                                            formatting?:
                                              | {
                                                  bold?:
                                                    | { start: number; end: number }[]
                                                    | undefined
                                                  italic?:
                                                    | { start: number; end: number }[]
                                                    | undefined
                                                  links?:
                                                    | { start: number; end: number; url: string }[]
                                                    | undefined
                                                }
                                              | undefined
                                          }
                                        | any
                                        | any
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'document'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            pageCount?: number | undefined
                                            preview?: any | undefined
                                          }
                                        | any
                                      )[]
                                    }
                                  | undefined
                              }
                            | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          dimensions?: { width: number; height: number } | undefined
                          alt?: string | undefined
                        }
                      | undefined
                  }
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    type: 'document'
                    sender: { id: string; name: string; avatar?: string | undefined }
                    recipient: { id: string; name: string; avatar?: string | undefined }
                    metadata?:
                      | {
                          priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                          expiresAt?: string | undefined
                          replyTo?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'text'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                content: string
                                formatting?:
                                  | {
                                      bold?: { start: number; end: number }[] | undefined
                                      italic?: { start: number; end: number }[] | undefined
                                      links?:
                                        | { start: number; end: number; url: string }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'video'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                duration?: number | undefined
                                thumbnail?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'composite'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                parts: (
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'text'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      content: string
                                      formatting?:
                                        | {
                                            bold?: { start: number; end: number }[] | undefined
                                            italic?: { start: number; end: number }[] | undefined
                                            links?:
                                              | { start: number; end: number; url: string }[]
                                              | undefined
                                          }
                                        | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'video'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      duration?: number | undefined
                                      thumbnail?:
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'image'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            dimensions?:
                                              | { width: number; height: number }
                                              | undefined
                                            alt?: string | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                  | any
                                )[]
                              }
                            | undefined
                        }
                      | undefined
                    url: string
                    mimeType: string
                    size: number
                    checksum?: string | undefined
                    pageCount?: number | undefined
                    preview?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'image'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?:
                            | {
                                priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                                expiresAt?: string | undefined
                                replyTo?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'text'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      content: string
                                      formatting?:
                                        | {
                                            bold?: { start: number; end: number }[] | undefined
                                            italic?: { start: number; end: number }[] | undefined
                                            links?:
                                              | { start: number; end: number; url: string }[]
                                              | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'video'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      duration?: number | undefined
                                      thumbnail?: any | undefined
                                    }
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'composite'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      parts: (
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'text'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            content: string
                                            formatting?:
                                              | {
                                                  bold?:
                                                    | { start: number; end: number }[]
                                                    | undefined
                                                  italic?:
                                                    | { start: number; end: number }[]
                                                    | undefined
                                                  links?:
                                                    | { start: number; end: number; url: string }[]
                                                    | undefined
                                                }
                                              | undefined
                                          }
                                        | any
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'video'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            duration?: number | undefined
                                            thumbnail?: any | undefined
                                          }
                                        | any
                                        | any
                                      )[]
                                    }
                                  | undefined
                              }
                            | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          dimensions?: { width: number; height: number } | undefined
                          alt?: string | undefined
                        }
                      | undefined
                  }
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    type: 'composite'
                    sender: { id: string; name: string; avatar?: string | undefined }
                    recipient: { id: string; name: string; avatar?: string | undefined }
                    metadata?:
                      | {
                          priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                          expiresAt?: string | undefined
                          replyTo?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'text'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                content: string
                                formatting?:
                                  | {
                                      bold?: { start: number; end: number }[] | undefined
                                      italic?: { start: number; end: number }[] | undefined
                                      links?:
                                        | { start: number; end: number; url: string }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'video'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                duration?: number | undefined
                                thumbnail?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'document'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?: any | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                pageCount?: number | undefined
                                preview?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | undefined
                              }
                            | any
                            | undefined
                        }
                      | undefined
                    parts: (
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'text'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?:
                            | {
                                priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                                expiresAt?: string | undefined
                                replyTo?:
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'video'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      duration?: number | undefined
                                      thumbnail?:
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'image'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            dimensions?:
                                              | { width: number; height: number }
                                              | undefined
                                            alt?: string | undefined
                                          }
                                        | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'document'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      pageCount?: number | undefined
                                      preview?:
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'image'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            dimensions?:
                                              | { width: number; height: number }
                                              | undefined
                                            alt?: string | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                  | undefined
                              }
                            | undefined
                          content: string
                          formatting?:
                            | {
                                bold?: { start: number; end: number }[] | undefined
                                italic?: { start: number; end: number }[] | undefined
                                links?: { start: number; end: number; url: string }[] | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'image'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?:
                            | {
                                priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                                expiresAt?: string | undefined
                                replyTo?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'text'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      content: string
                                      formatting?:
                                        | {
                                            bold?: { start: number; end: number }[] | undefined
                                            italic?: { start: number; end: number }[] | undefined
                                            links?:
                                              | { start: number; end: number; url: string }[]
                                              | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'video'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      duration?: number | undefined
                                      thumbnail?: any | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'document'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      pageCount?: number | undefined
                                      preview?: any | undefined
                                    }
                                  | any
                                  | undefined
                              }
                            | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          dimensions?: { width: number; height: number } | undefined
                          alt?: string | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'video'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?:
                            | {
                                priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                                expiresAt?: string | undefined
                                replyTo?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'text'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      content: string
                                      formatting?:
                                        | {
                                            bold?: { start: number; end: number }[] | undefined
                                            italic?: { start: number; end: number }[] | undefined
                                            links?:
                                              | { start: number; end: number; url: string }[]
                                              | undefined
                                          }
                                        | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'document'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      pageCount?: number | undefined
                                      preview?:
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'image'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            dimensions?:
                                              | { width: number; height: number }
                                              | undefined
                                            alt?: string | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                  | undefined
                              }
                            | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          duration?: number | undefined
                          thumbnail?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?:
                                  | {
                                      priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                                      expiresAt?: string | undefined
                                      replyTo?:
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'text'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            content: string
                                            formatting?:
                                              | {
                                                  bold?:
                                                    | { start: number; end: number }[]
                                                    | undefined
                                                  italic?:
                                                    | { start: number; end: number }[]
                                                    | undefined
                                                  links?:
                                                    | { start: number; end: number; url: string }[]
                                                    | undefined
                                                }
                                              | undefined
                                          }
                                        | any
                                        | any
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'document'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            pageCount?: number | undefined
                                            preview?: any | undefined
                                          }
                                        | any
                                        | undefined
                                    }
                                  | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          type: 'document'
                          sender: { id: string; name: string; avatar?: string | undefined }
                          recipient: { id: string; name: string; avatar?: string | undefined }
                          metadata?:
                            | {
                                priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                                expiresAt?: string | undefined
                                replyTo?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'text'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      content: string
                                      formatting?:
                                        | {
                                            bold?: { start: number; end: number }[] | undefined
                                            italic?: { start: number; end: number }[] | undefined
                                            links?:
                                              | { start: number; end: number; url: string }[]
                                              | undefined
                                          }
                                        | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'image'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      dimensions?: { width: number; height: number } | undefined
                                      alt?: string | undefined
                                    }
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      type: 'video'
                                      sender: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      recipient: {
                                        id: string
                                        name: string
                                        avatar?: string | undefined
                                      }
                                      metadata?: any | undefined
                                      url: string
                                      mimeType: string
                                      size: number
                                      checksum?: string | undefined
                                      duration?: number | undefined
                                      thumbnail?:
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'image'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            dimensions?:
                                              | { width: number; height: number }
                                              | undefined
                                            alt?: string | undefined
                                          }
                                        | undefined
                                    }
                                  | any
                                  | any
                                  | undefined
                              }
                            | undefined
                          url: string
                          mimeType: string
                          size: number
                          checksum?: string | undefined
                          pageCount?: number | undefined
                          preview?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                type: 'image'
                                sender: { id: string; name: string; avatar?: string | undefined }
                                recipient: { id: string; name: string; avatar?: string | undefined }
                                metadata?:
                                  | {
                                      priority?: 'low' | 'normal' | 'high' | 'urgent' | undefined
                                      expiresAt?: string | undefined
                                      replyTo?:
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'text'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            content: string
                                            formatting?:
                                              | {
                                                  bold?:
                                                    | { start: number; end: number }[]
                                                    | undefined
                                                  italic?:
                                                    | { start: number; end: number }[]
                                                    | undefined
                                                  links?:
                                                    | { start: number; end: number; url: string }[]
                                                    | undefined
                                                }
                                              | undefined
                                          }
                                        | any
                                        | {
                                            id: string
                                            createdAt?: string | undefined
                                            updatedAt?: string | undefined
                                            createdBy?: string | undefined
                                            updatedBy?: string | undefined
                                            version?: number | undefined
                                            etag?: string | undefined
                                            type: 'video'
                                            sender: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            recipient: {
                                              id: string
                                              name: string
                                              avatar?: string | undefined
                                            }
                                            metadata?: any | undefined
                                            url: string
                                            mimeType: string
                                            size: number
                                            checksum?: string | undefined
                                            duration?: number | undefined
                                            thumbnail?: any | undefined
                                          }
                                        | any
                                        | any
                                        | undefined
                                    }
                                  | undefined
                                url: string
                                mimeType: string
                                size: number
                                checksum?: string | undefined
                                dimensions?: { width: number; height: number } | undefined
                                alt?: string | undefined
                              }
                            | undefined
                        }
                      | any
                    )[]
                  }
              )[]
              deliveryStatus?:
                | {
                    sent?: boolean | undefined
                    delivered?: boolean | undefined
                    read?: boolean | undefined
                    timestamps?:
                      | {
                          sentAt?: string | undefined
                          deliveredAt?: string | undefined
                          readAt?: string | undefined
                        }
                      | undefined
                  }
                | undefined
            }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/events': {
      $post: {
        input: {
          json: {
            eventType: string
            payload: unknown
            context?:
              | {
                  userAgent?: string | undefined
                  referrer?: string | undefined
                  sessionId?: string | undefined
                }
              | {
                  deviceId?: string | undefined
                  platform?: 'ios' | 'android' | undefined
                  appVersion?: string | undefined
                }
              | {
                  apiKey?: string | undefined
                  clientId?: string | undefined
                  ipAddress?: string | undefined
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
    '/configs': {
      $get: {
        input: {}
        output: {
          id: string
          createdAt?: string | undefined
          updatedAt?: string | undefined
          createdBy?: string | undefined
          updatedBy?: string | undefined
          version?: number | undefined
          etag?: string | undefined
          settings: {
            [x: string]: { enabled?: boolean | undefined; description?: string | undefined }
          }
          overrides?: { [x: string]: any } | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/configs': {
      $put: {
        input: {
          json: {
            settings?:
              | Record<string, { enabled?: boolean | undefined; description?: string | undefined }>
              | undefined
            overrides?: Record<string, unknown> | undefined
          } & { version?: number | undefined; etag?: string | undefined }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/resources': {
      $post: {
        input: { json: unknown }
        output:
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              name: string
              description?: string | undefined
              tags?: string[] | undefined
              resourceType: 'compute'
              status: {
                state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
                health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                lastChecked?: string | undefined
              }
              dependencies?:
                | {
                    resourceId: string
                    type: 'hard' | 'soft'
                    resource?:
                      | any
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'storage'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          size: number
                          storageType: 'ssd' | 'hdd' | 'nvme'
                          iops?: number | undefined
                          attachedTo?: any | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'network'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          cidr: string
                          subnets?: any[] | undefined
                          parentNetwork?: any | undefined
                          connectedResources?:
                            | (
                                | any
                                | {
                                    id: string
                                    createdAt?: string | undefined
                                    updatedAt?: string | undefined
                                    createdBy?: string | undefined
                                    updatedBy?: string | undefined
                                    version?: number | undefined
                                    etag?: string | undefined
                                    name: string
                                    description?: string | undefined
                                    tags?: string[] | undefined
                                    resourceType: 'storage'
                                    status: {
                                      state:
                                        | 'pending'
                                        | 'provisioning'
                                        | 'running'
                                        | 'stopped'
                                        | 'failed'
                                        | 'terminated'
                                      health?:
                                        | 'unknown'
                                        | 'healthy'
                                        | 'degraded'
                                        | 'unhealthy'
                                        | undefined
                                      lastChecked?: string | undefined
                                    }
                                    dependencies?: any[] | undefined
                                    cost?:
                                      | {
                                          hourly?: number | undefined
                                          monthly?: number | undefined
                                          currency?: string | undefined
                                        }
                                      | undefined
                                    size: number
                                    storageType: 'ssd' | 'hdd' | 'nvme'
                                    iops?: number | undefined
                                    attachedTo?: any | undefined
                                  }
                              )[]
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'composite'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          components: (
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'storage'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                size: number
                                storageType: 'ssd' | 'hdd' | 'nvme'
                                iops?: number | undefined
                                attachedTo?: any | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'network'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cidr: string
                                subnets?: any[] | undefined
                                parentNetwork?: any | undefined
                                connectedResources?:
                                  | (
                                      | any
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'storage'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          size: number
                                          storageType: 'ssd' | 'hdd' | 'nvme'
                                          iops?: number | undefined
                                          attachedTo?: any | undefined
                                        }
                                    )[]
                                  | undefined
                              }
                            | any
                          )[]
                          template?:
                            | {
                                name?: string | undefined
                                version?: string | undefined
                                parameters?: { [x: string]: any } | undefined
                              }
                            | undefined
                        }
                      | undefined
                  }[]
                | undefined
              cost?:
                | {
                    hourly?: number | undefined
                    monthly?: number | undefined
                    currency?: string | undefined
                  }
                | undefined
              cpu: { cores: number; architecture?: string | undefined }
              memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
              storage?:
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    name: string
                    description?: string | undefined
                    tags?: string[] | undefined
                    resourceType: 'storage'
                    status: {
                      state:
                        | 'pending'
                        | 'provisioning'
                        | 'running'
                        | 'stopped'
                        | 'failed'
                        | 'terminated'
                      health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                      lastChecked?: string | undefined
                    }
                    dependencies?:
                      | {
                          resourceId: string
                          type: 'hard' | 'soft'
                          resource?:
                            | any
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'network'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cidr: string
                                subnets?: any[] | undefined
                                parentNetwork?: any | undefined
                                connectedResources?: (any | any)[] | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'composite'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                components: (
                                  | any
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      name: string
                                      description?: string | undefined
                                      tags?: string[] | undefined
                                      resourceType: 'network'
                                      status: {
                                        state:
                                          | 'pending'
                                          | 'provisioning'
                                          | 'running'
                                          | 'stopped'
                                          | 'failed'
                                          | 'terminated'
                                        health?:
                                          | 'unknown'
                                          | 'healthy'
                                          | 'degraded'
                                          | 'unhealthy'
                                          | undefined
                                        lastChecked?: string | undefined
                                      }
                                      dependencies?: any[] | undefined
                                      cost?:
                                        | {
                                            hourly?: number | undefined
                                            monthly?: number | undefined
                                            currency?: string | undefined
                                          }
                                        | undefined
                                      cidr: string
                                      subnets?: any[] | undefined
                                      parentNetwork?: any | undefined
                                      connectedResources?: (any | any)[] | undefined
                                    }
                                  | any
                                )[]
                                template?:
                                  | {
                                      name?: string | undefined
                                      version?: string | undefined
                                      parameters?: { [x: string]: any } | undefined
                                    }
                                  | undefined
                              }
                            | undefined
                        }[]
                      | undefined
                    cost?:
                      | {
                          hourly?: number | undefined
                          monthly?: number | undefined
                          currency?: string | undefined
                        }
                      | undefined
                    size: number
                    storageType: 'ssd' | 'hdd' | 'nvme'
                    iops?: number | undefined
                    attachedTo?: any | undefined
                  }[]
                | undefined
            }
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              name: string
              description?: string | undefined
              tags?: string[] | undefined
              resourceType: 'storage'
              status: {
                state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
                health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                lastChecked?: string | undefined
              }
              dependencies?:
                | {
                    resourceId: string
                    type: 'hard' | 'soft'
                    resource?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'compute'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          cpu: { cores: number; architecture?: string | undefined }
                          memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                          storage?: any[] | undefined
                        }
                      | any
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'network'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          cidr: string
                          subnets?: any[] | undefined
                          parentNetwork?: any | undefined
                          connectedResources?:
                            | (
                                | {
                                    id: string
                                    createdAt?: string | undefined
                                    updatedAt?: string | undefined
                                    createdBy?: string | undefined
                                    updatedBy?: string | undefined
                                    version?: number | undefined
                                    etag?: string | undefined
                                    name: string
                                    description?: string | undefined
                                    tags?: string[] | undefined
                                    resourceType: 'compute'
                                    status: {
                                      state:
                                        | 'pending'
                                        | 'provisioning'
                                        | 'running'
                                        | 'stopped'
                                        | 'failed'
                                        | 'terminated'
                                      health?:
                                        | 'unknown'
                                        | 'healthy'
                                        | 'degraded'
                                        | 'unhealthy'
                                        | undefined
                                      lastChecked?: string | undefined
                                    }
                                    dependencies?: any[] | undefined
                                    cost?:
                                      | {
                                          hourly?: number | undefined
                                          monthly?: number | undefined
                                          currency?: string | undefined
                                        }
                                      | undefined
                                    cpu: { cores: number; architecture?: string | undefined }
                                    memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                    storage?: any[] | undefined
                                  }
                                | any
                              )[]
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'composite'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          components: (
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'compute'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cpu: { cores: number; architecture?: string | undefined }
                                memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                storage?: any[] | undefined
                              }
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'network'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cidr: string
                                subnets?: any[] | undefined
                                parentNetwork?: any | undefined
                                connectedResources?:
                                  | (
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'compute'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          cpu: { cores: number; architecture?: string | undefined }
                                          memory: {
                                            size: number
                                            unit?: 'MB' | 'GB' | 'TB' | undefined
                                          }
                                          storage?: any[] | undefined
                                        }
                                      | any
                                    )[]
                                  | undefined
                              }
                            | any
                          )[]
                          template?:
                            | {
                                name?: string | undefined
                                version?: string | undefined
                                parameters?: { [x: string]: any } | undefined
                              }
                            | undefined
                        }
                      | undefined
                  }[]
                | undefined
              cost?:
                | {
                    hourly?: number | undefined
                    monthly?: number | undefined
                    currency?: string | undefined
                  }
                | undefined
              size: number
              storageType: 'ssd' | 'hdd' | 'nvme'
              iops?: number | undefined
              attachedTo?:
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    name: string
                    description?: string | undefined
                    tags?: string[] | undefined
                    resourceType: 'compute'
                    status: {
                      state:
                        | 'pending'
                        | 'provisioning'
                        | 'running'
                        | 'stopped'
                        | 'failed'
                        | 'terminated'
                      health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                      lastChecked?: string | undefined
                    }
                    dependencies?:
                      | {
                          resourceId: string
                          type: 'hard' | 'soft'
                          resource?:
                            | any
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'network'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cidr: string
                                subnets?: any[] | undefined
                                parentNetwork?: any | undefined
                                connectedResources?: (any | any)[] | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'composite'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                components: (
                                  | any
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      name: string
                                      description?: string | undefined
                                      tags?: string[] | undefined
                                      resourceType: 'network'
                                      status: {
                                        state:
                                          | 'pending'
                                          | 'provisioning'
                                          | 'running'
                                          | 'stopped'
                                          | 'failed'
                                          | 'terminated'
                                        health?:
                                          | 'unknown'
                                          | 'healthy'
                                          | 'degraded'
                                          | 'unhealthy'
                                          | undefined
                                        lastChecked?: string | undefined
                                      }
                                      dependencies?: any[] | undefined
                                      cost?:
                                        | {
                                            hourly?: number | undefined
                                            monthly?: number | undefined
                                            currency?: string | undefined
                                          }
                                        | undefined
                                      cidr: string
                                      subnets?: any[] | undefined
                                      parentNetwork?: any | undefined
                                      connectedResources?: (any | any)[] | undefined
                                    }
                                  | any
                                )[]
                                template?:
                                  | {
                                      name?: string | undefined
                                      version?: string | undefined
                                      parameters?: { [x: string]: any } | undefined
                                    }
                                  | undefined
                              }
                            | undefined
                        }[]
                      | undefined
                    cost?:
                      | {
                          hourly?: number | undefined
                          monthly?: number | undefined
                          currency?: string | undefined
                        }
                      | undefined
                    cpu: { cores: number; architecture?: string | undefined }
                    memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                    storage?: any[] | undefined
                  }
                | undefined
            }
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              name: string
              description?: string | undefined
              tags?: string[] | undefined
              resourceType: 'network'
              status: {
                state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
                health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                lastChecked?: string | undefined
              }
              dependencies?:
                | {
                    resourceId: string
                    type: 'hard' | 'soft'
                    resource?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'compute'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          cpu: { cores: number; architecture?: string | undefined }
                          memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                          storage?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'storage'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                size: number
                                storageType: 'ssd' | 'hdd' | 'nvme'
                                iops?: number | undefined
                                attachedTo?: any | undefined
                              }[]
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'storage'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          size: number
                          storageType: 'ssd' | 'hdd' | 'nvme'
                          iops?: number | undefined
                          attachedTo?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'compute'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cpu: { cores: number; architecture?: string | undefined }
                                memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                storage?: any[] | undefined
                              }
                            | undefined
                        }
                      | any
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'composite'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          components: (
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'compute'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cpu: { cores: number; architecture?: string | undefined }
                                memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                storage?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      name: string
                                      description?: string | undefined
                                      tags?: string[] | undefined
                                      resourceType: 'storage'
                                      status: {
                                        state:
                                          | 'pending'
                                          | 'provisioning'
                                          | 'running'
                                          | 'stopped'
                                          | 'failed'
                                          | 'terminated'
                                        health?:
                                          | 'unknown'
                                          | 'healthy'
                                          | 'degraded'
                                          | 'unhealthy'
                                          | undefined
                                        lastChecked?: string | undefined
                                      }
                                      dependencies?: any[] | undefined
                                      cost?:
                                        | {
                                            hourly?: number | undefined
                                            monthly?: number | undefined
                                            currency?: string | undefined
                                          }
                                        | undefined
                                      size: number
                                      storageType: 'ssd' | 'hdd' | 'nvme'
                                      iops?: number | undefined
                                      attachedTo?: any | undefined
                                    }[]
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'storage'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                size: number
                                storageType: 'ssd' | 'hdd' | 'nvme'
                                iops?: number | undefined
                                attachedTo?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      name: string
                                      description?: string | undefined
                                      tags?: string[] | undefined
                                      resourceType: 'compute'
                                      status: {
                                        state:
                                          | 'pending'
                                          | 'provisioning'
                                          | 'running'
                                          | 'stopped'
                                          | 'failed'
                                          | 'terminated'
                                        health?:
                                          | 'unknown'
                                          | 'healthy'
                                          | 'degraded'
                                          | 'unhealthy'
                                          | undefined
                                        lastChecked?: string | undefined
                                      }
                                      dependencies?: any[] | undefined
                                      cost?:
                                        | {
                                            hourly?: number | undefined
                                            monthly?: number | undefined
                                            currency?: string | undefined
                                          }
                                        | undefined
                                      cpu: { cores: number; architecture?: string | undefined }
                                      memory: {
                                        size: number
                                        unit?: 'MB' | 'GB' | 'TB' | undefined
                                      }
                                      storage?: any[] | undefined
                                    }
                                  | undefined
                              }
                            | any
                            | any
                          )[]
                          template?:
                            | {
                                name?: string | undefined
                                version?: string | undefined
                                parameters?: { [x: string]: any } | undefined
                              }
                            | undefined
                        }
                      | undefined
                  }[]
                | undefined
              cost?:
                | {
                    hourly?: number | undefined
                    monthly?: number | undefined
                    currency?: string | undefined
                  }
                | undefined
              cidr: string
              subnets?: any[] | undefined
              parentNetwork?: any | undefined
              connectedResources?:
                | (
                    | {
                        id: string
                        createdAt?: string | undefined
                        updatedAt?: string | undefined
                        createdBy?: string | undefined
                        updatedBy?: string | undefined
                        version?: number | undefined
                        etag?: string | undefined
                        name: string
                        description?: string | undefined
                        tags?: string[] | undefined
                        resourceType: 'compute'
                        status: {
                          state:
                            | 'pending'
                            | 'provisioning'
                            | 'running'
                            | 'stopped'
                            | 'failed'
                            | 'terminated'
                          health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                          lastChecked?: string | undefined
                        }
                        dependencies?:
                          | {
                              resourceId: string
                              type: 'hard' | 'soft'
                              resource?:
                                | any
                                | {
                                    id: string
                                    createdAt?: string | undefined
                                    updatedAt?: string | undefined
                                    createdBy?: string | undefined
                                    updatedBy?: string | undefined
                                    version?: number | undefined
                                    etag?: string | undefined
                                    name: string
                                    description?: string | undefined
                                    tags?: string[] | undefined
                                    resourceType: 'storage'
                                    status: {
                                      state:
                                        | 'pending'
                                        | 'provisioning'
                                        | 'running'
                                        | 'stopped'
                                        | 'failed'
                                        | 'terminated'
                                      health?:
                                        | 'unknown'
                                        | 'healthy'
                                        | 'degraded'
                                        | 'unhealthy'
                                        | undefined
                                      lastChecked?: string | undefined
                                    }
                                    dependencies?: any[] | undefined
                                    cost?:
                                      | {
                                          hourly?: number | undefined
                                          monthly?: number | undefined
                                          currency?: string | undefined
                                        }
                                      | undefined
                                    size: number
                                    storageType: 'ssd' | 'hdd' | 'nvme'
                                    iops?: number | undefined
                                    attachedTo?: any | undefined
                                  }
                                | any
                                | {
                                    id: string
                                    createdAt?: string | undefined
                                    updatedAt?: string | undefined
                                    createdBy?: string | undefined
                                    updatedBy?: string | undefined
                                    version?: number | undefined
                                    etag?: string | undefined
                                    name: string
                                    description?: string | undefined
                                    tags?: string[] | undefined
                                    resourceType: 'composite'
                                    status: {
                                      state:
                                        | 'pending'
                                        | 'provisioning'
                                        | 'running'
                                        | 'stopped'
                                        | 'failed'
                                        | 'terminated'
                                      health?:
                                        | 'unknown'
                                        | 'healthy'
                                        | 'degraded'
                                        | 'unhealthy'
                                        | undefined
                                      lastChecked?: string | undefined
                                    }
                                    dependencies?: any[] | undefined
                                    cost?:
                                      | {
                                          hourly?: number | undefined
                                          monthly?: number | undefined
                                          currency?: string | undefined
                                        }
                                      | undefined
                                    components: (
                                      | any
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'storage'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          size: number
                                          storageType: 'ssd' | 'hdd' | 'nvme'
                                          iops?: number | undefined
                                          attachedTo?: any | undefined
                                        }
                                      | any
                                      | any
                                    )[]
                                    template?:
                                      | {
                                          name?: string | undefined
                                          version?: string | undefined
                                          parameters?: { [x: string]: any } | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                            }[]
                          | undefined
                        cost?:
                          | {
                              hourly?: number | undefined
                              monthly?: number | undefined
                              currency?: string | undefined
                            }
                          | undefined
                        cpu: { cores: number; architecture?: string | undefined }
                        memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                        storage?:
                          | {
                              id: string
                              createdAt?: string | undefined
                              updatedAt?: string | undefined
                              createdBy?: string | undefined
                              updatedBy?: string | undefined
                              version?: number | undefined
                              etag?: string | undefined
                              name: string
                              description?: string | undefined
                              tags?: string[] | undefined
                              resourceType: 'storage'
                              status: {
                                state:
                                  | 'pending'
                                  | 'provisioning'
                                  | 'running'
                                  | 'stopped'
                                  | 'failed'
                                  | 'terminated'
                                health?:
                                  | 'unknown'
                                  | 'healthy'
                                  | 'degraded'
                                  | 'unhealthy'
                                  | undefined
                                lastChecked?: string | undefined
                              }
                              dependencies?:
                                | {
                                    resourceId: string
                                    type: 'hard' | 'soft'
                                    resource?:
                                      | any
                                      | any
                                      | any
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'composite'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          components: (any | any | any | any)[]
                                          template?:
                                            | {
                                                name?: string | undefined
                                                version?: string | undefined
                                                parameters?: { [x: string]: any } | undefined
                                              }
                                            | undefined
                                        }
                                      | undefined
                                  }[]
                                | undefined
                              cost?:
                                | {
                                    hourly?: number | undefined
                                    monthly?: number | undefined
                                    currency?: string | undefined
                                  }
                                | undefined
                              size: number
                              storageType: 'ssd' | 'hdd' | 'nvme'
                              iops?: number | undefined
                              attachedTo?: any | undefined
                            }[]
                          | undefined
                      }
                    | {
                        id: string
                        createdAt?: string | undefined
                        updatedAt?: string | undefined
                        createdBy?: string | undefined
                        updatedBy?: string | undefined
                        version?: number | undefined
                        etag?: string | undefined
                        name: string
                        description?: string | undefined
                        tags?: string[] | undefined
                        resourceType: 'storage'
                        status: {
                          state:
                            | 'pending'
                            | 'provisioning'
                            | 'running'
                            | 'stopped'
                            | 'failed'
                            | 'terminated'
                          health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                          lastChecked?: string | undefined
                        }
                        dependencies?:
                          | {
                              resourceId: string
                              type: 'hard' | 'soft'
                              resource?:
                                | {
                                    id: string
                                    createdAt?: string | undefined
                                    updatedAt?: string | undefined
                                    createdBy?: string | undefined
                                    updatedBy?: string | undefined
                                    version?: number | undefined
                                    etag?: string | undefined
                                    name: string
                                    description?: string | undefined
                                    tags?: string[] | undefined
                                    resourceType: 'compute'
                                    status: {
                                      state:
                                        | 'pending'
                                        | 'provisioning'
                                        | 'running'
                                        | 'stopped'
                                        | 'failed'
                                        | 'terminated'
                                      health?:
                                        | 'unknown'
                                        | 'healthy'
                                        | 'degraded'
                                        | 'unhealthy'
                                        | undefined
                                      lastChecked?: string | undefined
                                    }
                                    dependencies?: any[] | undefined
                                    cost?:
                                      | {
                                          hourly?: number | undefined
                                          monthly?: number | undefined
                                          currency?: string | undefined
                                        }
                                      | undefined
                                    cpu: { cores: number; architecture?: string | undefined }
                                    memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                    storage?: any[] | undefined
                                  }
                                | any
                                | any
                                | {
                                    id: string
                                    createdAt?: string | undefined
                                    updatedAt?: string | undefined
                                    createdBy?: string | undefined
                                    updatedBy?: string | undefined
                                    version?: number | undefined
                                    etag?: string | undefined
                                    name: string
                                    description?: string | undefined
                                    tags?: string[] | undefined
                                    resourceType: 'composite'
                                    status: {
                                      state:
                                        | 'pending'
                                        | 'provisioning'
                                        | 'running'
                                        | 'stopped'
                                        | 'failed'
                                        | 'terminated'
                                      health?:
                                        | 'unknown'
                                        | 'healthy'
                                        | 'degraded'
                                        | 'unhealthy'
                                        | undefined
                                      lastChecked?: string | undefined
                                    }
                                    dependencies?: any[] | undefined
                                    cost?:
                                      | {
                                          hourly?: number | undefined
                                          monthly?: number | undefined
                                          currency?: string | undefined
                                        }
                                      | undefined
                                    components: (
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'compute'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          cpu: { cores: number; architecture?: string | undefined }
                                          memory: {
                                            size: number
                                            unit?: 'MB' | 'GB' | 'TB' | undefined
                                          }
                                          storage?: any[] | undefined
                                        }
                                      | any
                                      | any
                                      | any
                                    )[]
                                    template?:
                                      | {
                                          name?: string | undefined
                                          version?: string | undefined
                                          parameters?: { [x: string]: any } | undefined
                                        }
                                      | undefined
                                  }
                                | undefined
                            }[]
                          | undefined
                        cost?:
                          | {
                              hourly?: number | undefined
                              monthly?: number | undefined
                              currency?: string | undefined
                            }
                          | undefined
                        size: number
                        storageType: 'ssd' | 'hdd' | 'nvme'
                        iops?: number | undefined
                        attachedTo?:
                          | {
                              id: string
                              createdAt?: string | undefined
                              updatedAt?: string | undefined
                              createdBy?: string | undefined
                              updatedBy?: string | undefined
                              version?: number | undefined
                              etag?: string | undefined
                              name: string
                              description?: string | undefined
                              tags?: string[] | undefined
                              resourceType: 'compute'
                              status: {
                                state:
                                  | 'pending'
                                  | 'provisioning'
                                  | 'running'
                                  | 'stopped'
                                  | 'failed'
                                  | 'terminated'
                                health?:
                                  | 'unknown'
                                  | 'healthy'
                                  | 'degraded'
                                  | 'unhealthy'
                                  | undefined
                                lastChecked?: string | undefined
                              }
                              dependencies?:
                                | {
                                    resourceId: string
                                    type: 'hard' | 'soft'
                                    resource?:
                                      | any
                                      | any
                                      | any
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'composite'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          components: (any | any | any | any)[]
                                          template?:
                                            | {
                                                name?: string | undefined
                                                version?: string | undefined
                                                parameters?: { [x: string]: any } | undefined
                                              }
                                            | undefined
                                        }
                                      | undefined
                                  }[]
                                | undefined
                              cost?:
                                | {
                                    hourly?: number | undefined
                                    monthly?: number | undefined
                                    currency?: string | undefined
                                  }
                                | undefined
                              cpu: { cores: number; architecture?: string | undefined }
                              memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                              storage?: any[] | undefined
                            }
                          | undefined
                      }
                  )[]
                | undefined
            }
          | {
              id: string
              createdAt?: string | undefined
              updatedAt?: string | undefined
              createdBy?: string | undefined
              updatedBy?: string | undefined
              version?: number | undefined
              etag?: string | undefined
              name: string
              description?: string | undefined
              tags?: string[] | undefined
              resourceType: 'composite'
              status: {
                state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
                health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                lastChecked?: string | undefined
              }
              dependencies?:
                | {
                    resourceId: string
                    type: 'hard' | 'soft'
                    resource?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'compute'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          cpu: { cores: number; architecture?: string | undefined }
                          memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                          storage?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'storage'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                size: number
                                storageType: 'ssd' | 'hdd' | 'nvme'
                                iops?: number | undefined
                                attachedTo?: any | undefined
                              }[]
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'storage'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          size: number
                          storageType: 'ssd' | 'hdd' | 'nvme'
                          iops?: number | undefined
                          attachedTo?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'compute'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cpu: { cores: number; architecture?: string | undefined }
                                memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                storage?: any[] | undefined
                              }
                            | undefined
                        }
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'network'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?: any[] | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          cidr: string
                          subnets?: any[] | undefined
                          parentNetwork?: any | undefined
                          connectedResources?:
                            | (
                                | {
                                    id: string
                                    createdAt?: string | undefined
                                    updatedAt?: string | undefined
                                    createdBy?: string | undefined
                                    updatedBy?: string | undefined
                                    version?: number | undefined
                                    etag?: string | undefined
                                    name: string
                                    description?: string | undefined
                                    tags?: string[] | undefined
                                    resourceType: 'compute'
                                    status: {
                                      state:
                                        | 'pending'
                                        | 'provisioning'
                                        | 'running'
                                        | 'stopped'
                                        | 'failed'
                                        | 'terminated'
                                      health?:
                                        | 'unknown'
                                        | 'healthy'
                                        | 'degraded'
                                        | 'unhealthy'
                                        | undefined
                                      lastChecked?: string | undefined
                                    }
                                    dependencies?: any[] | undefined
                                    cost?:
                                      | {
                                          hourly?: number | undefined
                                          monthly?: number | undefined
                                          currency?: string | undefined
                                        }
                                      | undefined
                                    cpu: { cores: number; architecture?: string | undefined }
                                    memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                    storage?:
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'storage'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          size: number
                                          storageType: 'ssd' | 'hdd' | 'nvme'
                                          iops?: number | undefined
                                          attachedTo?: any | undefined
                                        }[]
                                      | undefined
                                  }
                                | {
                                    id: string
                                    createdAt?: string | undefined
                                    updatedAt?: string | undefined
                                    createdBy?: string | undefined
                                    updatedBy?: string | undefined
                                    version?: number | undefined
                                    etag?: string | undefined
                                    name: string
                                    description?: string | undefined
                                    tags?: string[] | undefined
                                    resourceType: 'storage'
                                    status: {
                                      state:
                                        | 'pending'
                                        | 'provisioning'
                                        | 'running'
                                        | 'stopped'
                                        | 'failed'
                                        | 'terminated'
                                      health?:
                                        | 'unknown'
                                        | 'healthy'
                                        | 'degraded'
                                        | 'unhealthy'
                                        | undefined
                                      lastChecked?: string | undefined
                                    }
                                    dependencies?: any[] | undefined
                                    cost?:
                                      | {
                                          hourly?: number | undefined
                                          monthly?: number | undefined
                                          currency?: string | undefined
                                        }
                                      | undefined
                                    size: number
                                    storageType: 'ssd' | 'hdd' | 'nvme'
                                    iops?: number | undefined
                                    attachedTo?:
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'compute'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          cpu: { cores: number; architecture?: string | undefined }
                                          memory: {
                                            size: number
                                            unit?: 'MB' | 'GB' | 'TB' | undefined
                                          }
                                          storage?: any[] | undefined
                                        }
                                      | undefined
                                  }
                              )[]
                            | undefined
                        }
                      | any
                      | undefined
                  }[]
                | undefined
              cost?:
                | {
                    hourly?: number | undefined
                    monthly?: number | undefined
                    currency?: string | undefined
                  }
                | undefined
              components: (
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    name: string
                    description?: string | undefined
                    tags?: string[] | undefined
                    resourceType: 'compute'
                    status: {
                      state:
                        | 'pending'
                        | 'provisioning'
                        | 'running'
                        | 'stopped'
                        | 'failed'
                        | 'terminated'
                      health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                      lastChecked?: string | undefined
                    }
                    dependencies?:
                      | {
                          resourceId: string
                          type: 'hard' | 'soft'
                          resource?:
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'storage'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                size: number
                                storageType: 'ssd' | 'hdd' | 'nvme'
                                iops?: number | undefined
                                attachedTo?: any | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'network'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cidr: string
                                subnets?: any[] | undefined
                                parentNetwork?: any | undefined
                                connectedResources?:
                                  | (
                                      | any
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'storage'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          size: number
                                          storageType: 'ssd' | 'hdd' | 'nvme'
                                          iops?: number | undefined
                                          attachedTo?: any | undefined
                                        }
                                    )[]
                                  | undefined
                              }
                            | any
                            | undefined
                        }[]
                      | undefined
                    cost?:
                      | {
                          hourly?: number | undefined
                          monthly?: number | undefined
                          currency?: string | undefined
                        }
                      | undefined
                    cpu: { cores: number; architecture?: string | undefined }
                    memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                    storage?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'storage'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?:
                            | {
                                resourceId: string
                                type: 'hard' | 'soft'
                                resource?:
                                  | any
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      name: string
                                      description?: string | undefined
                                      tags?: string[] | undefined
                                      resourceType: 'network'
                                      status: {
                                        state:
                                          | 'pending'
                                          | 'provisioning'
                                          | 'running'
                                          | 'stopped'
                                          | 'failed'
                                          | 'terminated'
                                        health?:
                                          | 'unknown'
                                          | 'healthy'
                                          | 'degraded'
                                          | 'unhealthy'
                                          | undefined
                                        lastChecked?: string | undefined
                                      }
                                      dependencies?: any[] | undefined
                                      cost?:
                                        | {
                                            hourly?: number | undefined
                                            monthly?: number | undefined
                                            currency?: string | undefined
                                          }
                                        | undefined
                                      cidr: string
                                      subnets?: any[] | undefined
                                      parentNetwork?: any | undefined
                                      connectedResources?: (any | any)[] | undefined
                                    }
                                  | any
                                  | undefined
                              }[]
                            | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          size: number
                          storageType: 'ssd' | 'hdd' | 'nvme'
                          iops?: number | undefined
                          attachedTo?: any | undefined
                        }[]
                      | undefined
                  }
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    name: string
                    description?: string | undefined
                    tags?: string[] | undefined
                    resourceType: 'storage'
                    status: {
                      state:
                        | 'pending'
                        | 'provisioning'
                        | 'running'
                        | 'stopped'
                        | 'failed'
                        | 'terminated'
                      health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                      lastChecked?: string | undefined
                    }
                    dependencies?:
                      | {
                          resourceId: string
                          type: 'hard' | 'soft'
                          resource?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'compute'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cpu: { cores: number; architecture?: string | undefined }
                                memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                storage?: any[] | undefined
                              }
                            | any
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'network'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cidr: string
                                subnets?: any[] | undefined
                                parentNetwork?: any | undefined
                                connectedResources?:
                                  | (
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'compute'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          cpu: { cores: number; architecture?: string | undefined }
                                          memory: {
                                            size: number
                                            unit?: 'MB' | 'GB' | 'TB' | undefined
                                          }
                                          storage?: any[] | undefined
                                        }
                                      | any
                                    )[]
                                  | undefined
                              }
                            | any
                            | undefined
                        }[]
                      | undefined
                    cost?:
                      | {
                          hourly?: number | undefined
                          monthly?: number | undefined
                          currency?: string | undefined
                        }
                      | undefined
                    size: number
                    storageType: 'ssd' | 'hdd' | 'nvme'
                    iops?: number | undefined
                    attachedTo?:
                      | {
                          id: string
                          createdAt?: string | undefined
                          updatedAt?: string | undefined
                          createdBy?: string | undefined
                          updatedBy?: string | undefined
                          version?: number | undefined
                          etag?: string | undefined
                          name: string
                          description?: string | undefined
                          tags?: string[] | undefined
                          resourceType: 'compute'
                          status: {
                            state:
                              | 'pending'
                              | 'provisioning'
                              | 'running'
                              | 'stopped'
                              | 'failed'
                              | 'terminated'
                            health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                            lastChecked?: string | undefined
                          }
                          dependencies?:
                            | {
                                resourceId: string
                                type: 'hard' | 'soft'
                                resource?:
                                  | any
                                  | any
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      name: string
                                      description?: string | undefined
                                      tags?: string[] | undefined
                                      resourceType: 'network'
                                      status: {
                                        state:
                                          | 'pending'
                                          | 'provisioning'
                                          | 'running'
                                          | 'stopped'
                                          | 'failed'
                                          | 'terminated'
                                        health?:
                                          | 'unknown'
                                          | 'healthy'
                                          | 'degraded'
                                          | 'unhealthy'
                                          | undefined
                                        lastChecked?: string | undefined
                                      }
                                      dependencies?: any[] | undefined
                                      cost?:
                                        | {
                                            hourly?: number | undefined
                                            monthly?: number | undefined
                                            currency?: string | undefined
                                          }
                                        | undefined
                                      cidr: string
                                      subnets?: any[] | undefined
                                      parentNetwork?: any | undefined
                                      connectedResources?: (any | any)[] | undefined
                                    }
                                  | any
                                  | undefined
                              }[]
                            | undefined
                          cost?:
                            | {
                                hourly?: number | undefined
                                monthly?: number | undefined
                                currency?: string | undefined
                              }
                            | undefined
                          cpu: { cores: number; architecture?: string | undefined }
                          memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                          storage?: any[] | undefined
                        }
                      | undefined
                  }
                | {
                    id: string
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?: string | undefined
                    updatedBy?: string | undefined
                    version?: number | undefined
                    etag?: string | undefined
                    name: string
                    description?: string | undefined
                    tags?: string[] | undefined
                    resourceType: 'network'
                    status: {
                      state:
                        | 'pending'
                        | 'provisioning'
                        | 'running'
                        | 'stopped'
                        | 'failed'
                        | 'terminated'
                      health?: 'unknown' | 'healthy' | 'degraded' | 'unhealthy' | undefined
                      lastChecked?: string | undefined
                    }
                    dependencies?:
                      | {
                          resourceId: string
                          type: 'hard' | 'soft'
                          resource?:
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'compute'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                cpu: { cores: number; architecture?: string | undefined }
                                memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                storage?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      name: string
                                      description?: string | undefined
                                      tags?: string[] | undefined
                                      resourceType: 'storage'
                                      status: {
                                        state:
                                          | 'pending'
                                          | 'provisioning'
                                          | 'running'
                                          | 'stopped'
                                          | 'failed'
                                          | 'terminated'
                                        health?:
                                          | 'unknown'
                                          | 'healthy'
                                          | 'degraded'
                                          | 'unhealthy'
                                          | undefined
                                        lastChecked?: string | undefined
                                      }
                                      dependencies?: any[] | undefined
                                      cost?:
                                        | {
                                            hourly?: number | undefined
                                            monthly?: number | undefined
                                            currency?: string | undefined
                                          }
                                        | undefined
                                      size: number
                                      storageType: 'ssd' | 'hdd' | 'nvme'
                                      iops?: number | undefined
                                      attachedTo?: any | undefined
                                    }[]
                                  | undefined
                              }
                            | {
                                id: string
                                createdAt?: string | undefined
                                updatedAt?: string | undefined
                                createdBy?: string | undefined
                                updatedBy?: string | undefined
                                version?: number | undefined
                                etag?: string | undefined
                                name: string
                                description?: string | undefined
                                tags?: string[] | undefined
                                resourceType: 'storage'
                                status: {
                                  state:
                                    | 'pending'
                                    | 'provisioning'
                                    | 'running'
                                    | 'stopped'
                                    | 'failed'
                                    | 'terminated'
                                  health?:
                                    | 'unknown'
                                    | 'healthy'
                                    | 'degraded'
                                    | 'unhealthy'
                                    | undefined
                                  lastChecked?: string | undefined
                                }
                                dependencies?: any[] | undefined
                                cost?:
                                  | {
                                      hourly?: number | undefined
                                      monthly?: number | undefined
                                      currency?: string | undefined
                                    }
                                  | undefined
                                size: number
                                storageType: 'ssd' | 'hdd' | 'nvme'
                                iops?: number | undefined
                                attachedTo?:
                                  | {
                                      id: string
                                      createdAt?: string | undefined
                                      updatedAt?: string | undefined
                                      createdBy?: string | undefined
                                      updatedBy?: string | undefined
                                      version?: number | undefined
                                      etag?: string | undefined
                                      name: string
                                      description?: string | undefined
                                      tags?: string[] | undefined
                                      resourceType: 'compute'
                                      status: {
                                        state:
                                          | 'pending'
                                          | 'provisioning'
                                          | 'running'
                                          | 'stopped'
                                          | 'failed'
                                          | 'terminated'
                                        health?:
                                          | 'unknown'
                                          | 'healthy'
                                          | 'degraded'
                                          | 'unhealthy'
                                          | undefined
                                        lastChecked?: string | undefined
                                      }
                                      dependencies?: any[] | undefined
                                      cost?:
                                        | {
                                            hourly?: number | undefined
                                            monthly?: number | undefined
                                            currency?: string | undefined
                                          }
                                        | undefined
                                      cpu: { cores: number; architecture?: string | undefined }
                                      memory: {
                                        size: number
                                        unit?: 'MB' | 'GB' | 'TB' | undefined
                                      }
                                      storage?: any[] | undefined
                                    }
                                  | undefined
                              }
                            | any
                            | any
                            | undefined
                        }[]
                      | undefined
                    cost?:
                      | {
                          hourly?: number | undefined
                          monthly?: number | undefined
                          currency?: string | undefined
                        }
                      | undefined
                    cidr: string
                    subnets?: any[] | undefined
                    parentNetwork?: any | undefined
                    connectedResources?:
                      | (
                          | {
                              id: string
                              createdAt?: string | undefined
                              updatedAt?: string | undefined
                              createdBy?: string | undefined
                              updatedBy?: string | undefined
                              version?: number | undefined
                              etag?: string | undefined
                              name: string
                              description?: string | undefined
                              tags?: string[] | undefined
                              resourceType: 'compute'
                              status: {
                                state:
                                  | 'pending'
                                  | 'provisioning'
                                  | 'running'
                                  | 'stopped'
                                  | 'failed'
                                  | 'terminated'
                                health?:
                                  | 'unknown'
                                  | 'healthy'
                                  | 'degraded'
                                  | 'unhealthy'
                                  | undefined
                                lastChecked?: string | undefined
                              }
                              dependencies?:
                                | {
                                    resourceId: string
                                    type: 'hard' | 'soft'
                                    resource?:
                                      | any
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'storage'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          size: number
                                          storageType: 'ssd' | 'hdd' | 'nvme'
                                          iops?: number | undefined
                                          attachedTo?: any | undefined
                                        }
                                      | any
                                      | any
                                      | undefined
                                  }[]
                                | undefined
                              cost?:
                                | {
                                    hourly?: number | undefined
                                    monthly?: number | undefined
                                    currency?: string | undefined
                                  }
                                | undefined
                              cpu: { cores: number; architecture?: string | undefined }
                              memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                              storage?:
                                | {
                                    id: string
                                    createdAt?: string | undefined
                                    updatedAt?: string | undefined
                                    createdBy?: string | undefined
                                    updatedBy?: string | undefined
                                    version?: number | undefined
                                    etag?: string | undefined
                                    name: string
                                    description?: string | undefined
                                    tags?: string[] | undefined
                                    resourceType: 'storage'
                                    status: {
                                      state:
                                        | 'pending'
                                        | 'provisioning'
                                        | 'running'
                                        | 'stopped'
                                        | 'failed'
                                        | 'terminated'
                                      health?:
                                        | 'unknown'
                                        | 'healthy'
                                        | 'degraded'
                                        | 'unhealthy'
                                        | undefined
                                      lastChecked?: string | undefined
                                    }
                                    dependencies?:
                                      | {
                                          resourceId: string
                                          type: 'hard' | 'soft'
                                          resource?: any | any | any | any | undefined
                                        }[]
                                      | undefined
                                    cost?:
                                      | {
                                          hourly?: number | undefined
                                          monthly?: number | undefined
                                          currency?: string | undefined
                                        }
                                      | undefined
                                    size: number
                                    storageType: 'ssd' | 'hdd' | 'nvme'
                                    iops?: number | undefined
                                    attachedTo?: any | undefined
                                  }[]
                                | undefined
                            }
                          | {
                              id: string
                              createdAt?: string | undefined
                              updatedAt?: string | undefined
                              createdBy?: string | undefined
                              updatedBy?: string | undefined
                              version?: number | undefined
                              etag?: string | undefined
                              name: string
                              description?: string | undefined
                              tags?: string[] | undefined
                              resourceType: 'storage'
                              status: {
                                state:
                                  | 'pending'
                                  | 'provisioning'
                                  | 'running'
                                  | 'stopped'
                                  | 'failed'
                                  | 'terminated'
                                health?:
                                  | 'unknown'
                                  | 'healthy'
                                  | 'degraded'
                                  | 'unhealthy'
                                  | undefined
                                lastChecked?: string | undefined
                              }
                              dependencies?:
                                | {
                                    resourceId: string
                                    type: 'hard' | 'soft'
                                    resource?:
                                      | {
                                          id: string
                                          createdAt?: string | undefined
                                          updatedAt?: string | undefined
                                          createdBy?: string | undefined
                                          updatedBy?: string | undefined
                                          version?: number | undefined
                                          etag?: string | undefined
                                          name: string
                                          description?: string | undefined
                                          tags?: string[] | undefined
                                          resourceType: 'compute'
                                          status: {
                                            state:
                                              | 'pending'
                                              | 'provisioning'
                                              | 'running'
                                              | 'stopped'
                                              | 'failed'
                                              | 'terminated'
                                            health?:
                                              | 'unknown'
                                              | 'healthy'
                                              | 'degraded'
                                              | 'unhealthy'
                                              | undefined
                                            lastChecked?: string | undefined
                                          }
                                          dependencies?: any[] | undefined
                                          cost?:
                                            | {
                                                hourly?: number | undefined
                                                monthly?: number | undefined
                                                currency?: string | undefined
                                              }
                                            | undefined
                                          cpu: { cores: number; architecture?: string | undefined }
                                          memory: {
                                            size: number
                                            unit?: 'MB' | 'GB' | 'TB' | undefined
                                          }
                                          storage?: any[] | undefined
                                        }
                                      | any
                                      | any
                                      | any
                                      | undefined
                                  }[]
                                | undefined
                              cost?:
                                | {
                                    hourly?: number | undefined
                                    monthly?: number | undefined
                                    currency?: string | undefined
                                  }
                                | undefined
                              size: number
                              storageType: 'ssd' | 'hdd' | 'nvme'
                              iops?: number | undefined
                              attachedTo?:
                                | {
                                    id: string
                                    createdAt?: string | undefined
                                    updatedAt?: string | undefined
                                    createdBy?: string | undefined
                                    updatedBy?: string | undefined
                                    version?: number | undefined
                                    etag?: string | undefined
                                    name: string
                                    description?: string | undefined
                                    tags?: string[] | undefined
                                    resourceType: 'compute'
                                    status: {
                                      state:
                                        | 'pending'
                                        | 'provisioning'
                                        | 'running'
                                        | 'stopped'
                                        | 'failed'
                                        | 'terminated'
                                      health?:
                                        | 'unknown'
                                        | 'healthy'
                                        | 'degraded'
                                        | 'unhealthy'
                                        | undefined
                                      lastChecked?: string | undefined
                                    }
                                    dependencies?:
                                      | {
                                          resourceId: string
                                          type: 'hard' | 'soft'
                                          resource?: any | any | any | any | undefined
                                        }[]
                                      | undefined
                                    cost?:
                                      | {
                                          hourly?: number | undefined
                                          monthly?: number | undefined
                                          currency?: string | undefined
                                        }
                                      | undefined
                                    cpu: { cores: number; architecture?: string | undefined }
                                    memory: { size: number; unit?: 'MB' | 'GB' | 'TB' | undefined }
                                    storage?: any[] | undefined
                                  }
                                | undefined
                            }
                        )[]
                      | undefined
                  }
                | any
              )[]
              template?:
                | {
                    name?: string | undefined
                    version?: string | undefined
                    parameters?: { [x: string]: any } | undefined
                  }
                | undefined
            }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/validations': {
      $post: {
        input: { json: { target: unknown; rules: unknown[] } }
        output: {
          valid: boolean
          issues: (
            | {
                path: string
                message: string
                severity: 'error' | 'info' | 'warning'
                code?: string | undefined
                keyword?: string | undefined
                expected?: {} | undefined
                actual?: {} | undefined
              }
            | {
                path: string
                message: string
                severity: 'error' | 'info' | 'warning'
                code?: string | undefined
                rule?: string | undefined
                context?: {} | undefined
              }
          )[]
          metadata?: {} | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
