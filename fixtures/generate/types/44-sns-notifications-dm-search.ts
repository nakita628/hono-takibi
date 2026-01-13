declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/notifications': {
      $get:
        | {
            input: {
              query: {
                cursor?: string | undefined
                limit?: number | undefined
                types?: string | undefined
                filter?: 'all' | 'mentions' | 'verified' | undefined
              }
            }
            output: {
              data: {
                id: string
                type:
                  | 'like'
                  | 'repost'
                  | 'quote'
                  | 'reply'
                  | 'mention'
                  | 'follow'
                  | 'follow_request'
                  | 'poll_ended'
                  | 'post_you_liked'
                  | 'new_posts_from'
                actor?:
                  | {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                    }
                  | undefined
                actors?:
                  | {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                    }[]
                  | undefined
                post?:
                  | {
                      id: string
                      text: string
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                targetPost?:
                  | {
                      id: string
                      text: string
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                isRead?: boolean | undefined
                createdAt: string
              }[]
              nextCursor?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                cursor?: string | undefined
                limit?: number | undefined
                types?: string | undefined
                filter?: 'all' | 'mentions' | 'verified' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/notifications/unread-count': {
      $get:
        | {
            input: {}
            output: { count?: number | undefined; mentionsCount?: number | undefined }
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
  } & {
    '/notifications/mark-read': {
      $post:
        | {
            input: { json: { notificationIds?: string[] | undefined; maxId?: string | undefined } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { json: { notificationIds?: string[] | undefined; maxId?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/notifications/settings': {
      $get:
        | {
            input: {}
            output: {
              likes?: boolean | undefined
              reposts?: boolean | undefined
              quotes?: boolean | undefined
              replies?: boolean | undefined
              mentions?: boolean | undefined
              follows?: boolean | undefined
              directMessages?: boolean | undefined
              emailNotifications?:
                | {
                    enabled?: boolean | undefined
                    digest?: 'daily' | 'weekly' | 'never' | undefined
                  }
                | undefined
              pushNotifications?: boolean | undefined
              filterQuality?: 'all' | 'filtered' | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $put:
        | {
            input: {
              json: {
                likes?: boolean | undefined
                reposts?: boolean | undefined
                quotes?: boolean | undefined
                replies?: boolean | undefined
                mentions?: boolean | undefined
                follows?: boolean | undefined
                directMessages?: boolean | undefined
                emailNotifications?:
                  | {
                      enabled?: boolean | undefined
                      digest?: 'daily' | 'weekly' | 'never' | undefined
                    }
                  | undefined
                pushNotifications?: boolean | undefined
                filterQuality?: 'all' | 'filtered' | undefined
              }
            }
            output: {
              likes?: boolean | undefined
              reposts?: boolean | undefined
              quotes?: boolean | undefined
              replies?: boolean | undefined
              mentions?: boolean | undefined
              follows?: boolean | undefined
              directMessages?: boolean | undefined
              emailNotifications?:
                | {
                    enabled?: boolean | undefined
                    digest?: 'daily' | 'weekly' | 'never' | undefined
                  }
                | undefined
              pushNotifications?: boolean | undefined
              filterQuality?: 'all' | 'filtered' | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                likes?: boolean | undefined
                reposts?: boolean | undefined
                quotes?: boolean | undefined
                replies?: boolean | undefined
                mentions?: boolean | undefined
                follows?: boolean | undefined
                directMessages?: boolean | undefined
                emailNotifications?:
                  | {
                      enabled?: boolean | undefined
                      digest?: 'daily' | 'weekly' | 'never' | undefined
                    }
                  | undefined
                pushNotifications?: boolean | undefined
                filterQuality?: 'all' | 'filtered' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/dm/conversations': {
      $get:
        | {
            input: { query: { cursor?: string | undefined; limit?: number | undefined } }
            output: {
              data: {
                id: string
                type: 'one_to_one' | 'group'
                name?: string | undefined
                participants: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                }[]
                lastMessage?:
                  | {
                      id: string
                      conversationId: string
                      sender: {
                        id: string
                        username: string
                        displayName: string
                        avatarUrl?: string | undefined
                        isVerified?: boolean | undefined
                      }
                      text?: string | undefined
                      media?:
                        | {
                            id: string
                            type: 'image' | 'gif' | 'video'
                            url: string
                            previewUrl?: string | undefined
                          }[]
                        | undefined
                      sharedPost?:
                        | {
                            id: string
                            text: string
                            author?:
                              | {
                                  id: string
                                  username: string
                                  displayName: string
                                  avatarUrl?: string | undefined
                                  isVerified?: boolean | undefined
                                }
                              | undefined
                          }
                        | undefined
                      reactions?:
                        | {
                            emoji?: string | undefined
                            users?:
                              | {
                                  id: string
                                  username: string
                                  displayName: string
                                  avatarUrl?: string | undefined
                                  isVerified?: boolean | undefined
                                }[]
                              | undefined
                          }[]
                        | undefined
                      readBy?: string[] | undefined
                      createdAt: string
                    }
                  | undefined
                unreadCount?: number | undefined
                isMuted?: boolean | undefined
                createdAt: string
                updatedAt?: string | undefined
              }[]
              nextCursor?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { cursor?: string | undefined; limit?: number | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $post:
        | {
            input: { json: { participantIds: string[]; name?: string | undefined } }
            output: {
              id: string
              type: 'one_to_one' | 'group'
              name?: string | undefined
              participants: {
                id: string
                username: string
                displayName: string
                avatarUrl?: string | undefined
                isVerified?: boolean | undefined
              }[]
              lastMessage?:
                | {
                    id: string
                    conversationId: string
                    sender: {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                    }
                    text?: string | undefined
                    media?:
                      | {
                          id: string
                          type: 'image' | 'gif' | 'video'
                          url: string
                          previewUrl?: string | undefined
                        }[]
                      | undefined
                    sharedPost?:
                      | {
                          id: string
                          text: string
                          author?:
                            | {
                                id: string
                                username: string
                                displayName: string
                                avatarUrl?: string | undefined
                                isVerified?: boolean | undefined
                              }
                            | undefined
                        }
                      | undefined
                    reactions?:
                      | {
                          emoji?: string | undefined
                          users?:
                            | {
                                id: string
                                username: string
                                displayName: string
                                avatarUrl?: string | undefined
                                isVerified?: boolean | undefined
                              }[]
                            | undefined
                        }[]
                      | undefined
                    readBy?: string[] | undefined
                    createdAt: string
                  }
                | undefined
              unreadCount?: number | undefined
              isMuted?: boolean | undefined
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { json: { participantIds: string[]; name?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/dm/conversations/:conversationId': {
      $get:
        | {
            input: { param: { conversationId: string } }
            output: {
              id: string
              type: 'one_to_one' | 'group'
              name?: string | undefined
              participants: {
                id: string
                username: string
                displayName: string
                avatarUrl?: string | undefined
                isVerified?: boolean | undefined
              }[]
              lastMessage?:
                | {
                    id: string
                    conversationId: string
                    sender: {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                    }
                    text?: string | undefined
                    media?:
                      | {
                          id: string
                          type: 'image' | 'gif' | 'video'
                          url: string
                          previewUrl?: string | undefined
                        }[]
                      | undefined
                    sharedPost?:
                      | {
                          id: string
                          text: string
                          author?:
                            | {
                                id: string
                                username: string
                                displayName: string
                                avatarUrl?: string | undefined
                                isVerified?: boolean | undefined
                              }
                            | undefined
                        }
                      | undefined
                    reactions?:
                      | {
                          emoji?: string | undefined
                          users?:
                            | {
                                id: string
                                username: string
                                displayName: string
                                avatarUrl?: string | undefined
                                isVerified?: boolean | undefined
                              }[]
                            | undefined
                        }[]
                      | undefined
                    readBy?: string[] | undefined
                    createdAt: string
                  }
                | undefined
              unreadCount?: number | undefined
              isMuted?: boolean | undefined
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { conversationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { conversationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
      $delete:
        | {
            input: { param: { conversationId: string } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { param: { conversationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/dm/conversations/:conversationId/messages': {
      $get:
        | {
            input: { param: { conversationId: string } } & {
              query: { cursor?: string | undefined; limit?: number | undefined }
            }
            output: {
              data: {
                id: string
                conversationId: string
                sender: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                }
                text?: string | undefined
                media?:
                  | {
                      id: string
                      type: 'image' | 'gif' | 'video'
                      url: string
                      previewUrl?: string | undefined
                    }[]
                  | undefined
                sharedPost?:
                  | {
                      id: string
                      text: string
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                reactions?:
                  | {
                      emoji?: string | undefined
                      users?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                          }[]
                        | undefined
                    }[]
                  | undefined
                readBy?: string[] | undefined
                createdAt: string
              }[]
              nextCursor?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { conversationId: string } } & {
              query: { cursor?: string | undefined; limit?: number | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $post:
        | {
            input: { param: { conversationId: string } } & {
              json: {
                text?: string | undefined
                mediaIds?: string[] | undefined
                sharedPostId?: string | undefined
              }
            }
            output: {
              id: string
              conversationId: string
              sender: {
                id: string
                username: string
                displayName: string
                avatarUrl?: string | undefined
                isVerified?: boolean | undefined
              }
              text?: string | undefined
              media?:
                | {
                    id: string
                    type: 'image' | 'gif' | 'video'
                    url: string
                    previewUrl?: string | undefined
                  }[]
                | undefined
              sharedPost?:
                | {
                    id: string
                    text: string
                    author?:
                      | {
                          id: string
                          username: string
                          displayName: string
                          avatarUrl?: string | undefined
                          isVerified?: boolean | undefined
                        }
                      | undefined
                  }
                | undefined
              reactions?:
                | {
                    emoji?: string | undefined
                    users?:
                      | {
                          id: string
                          username: string
                          displayName: string
                          avatarUrl?: string | undefined
                          isVerified?: boolean | undefined
                        }[]
                      | undefined
                  }[]
                | undefined
              readBy?: string[] | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { param: { conversationId: string } } & {
              json: {
                text?: string | undefined
                mediaIds?: string[] | undefined
                sharedPostId?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/dm/conversations/:conversationId/read': {
      $post:
        | {
            input: { param: { conversationId: string } } & {
              json: { lastReadMessageId?: string | undefined }
            }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { param: { conversationId: string } } & {
              json: { lastReadMessageId?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/dm/conversations/:conversationId/typing': {
      $post:
        | {
            input: { param: { conversationId: string } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { param: { conversationId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/dm/messages/:messageId': {
      $delete:
        | { input: { param: { messageId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { messageId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/dm/messages/:messageId/reactions': {
      $post:
        | {
            input: { param: { messageId: string } } & { json: { emoji: string } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { param: { messageId: string } } & { json: { emoji: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | {
            input: { param: { messageId: string } } & { query: { emoji: string } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { param: { messageId: string } } & { query: { emoji: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/dm/unread-count': {
      $get:
        | {
            input: {}
            output: {
              count?: number | undefined
              conversationCounts?: { [x: string]: number } | undefined
            }
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
  } & {
    '/search/posts': {
      $get: {
        input: {
          query: {
            q: string
            cursor?: string | undefined
            limit?: number | undefined
            filter?: 'latest' | 'top' | 'photos' | 'videos' | undefined
            from?: string | undefined
            to?: string | undefined
            since?: string | undefined
            until?: string | undefined
            lang?: string | undefined
          }
        }
        output: {
          data: {
            id: string
            text: string
            author?:
              | {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                }
              | undefined
          }[]
          nextCursor?: string | undefined
          totalCount?: number | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/search/users': {
      $get: {
        input: { query: { q: string; cursor?: string | undefined; limit?: number | undefined } }
        output: {
          data: {
            id: string
            username: string
            displayName: string
            avatarUrl?: string | undefined
            isVerified?: boolean | undefined
          }[]
          nextCursor?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/search/hashtags': {
      $get: {
        input: { query: { q: string; limit?: number | undefined } }
        output: {
          name: string
          postCount: number
          trend?: { rank?: number | undefined; trendingIn?: string | undefined } | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/search/recent': {
      $get:
        | {
            input: {}
            output: { query?: string | undefined; searchedAt?: string | undefined }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/trends': {
      $get: {
        input: { query: { woeid?: number | undefined; limit?: number | undefined } }
        output: {
          name: string
          category?: 'hashtag' | 'topic' | 'event' | undefined
          postCount: number
          description?: string | undefined
          url?: string | undefined
          promoted?: boolean | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/trends/locations': {
      $get: {
        input: {}
        output: {
          woeid: number
          name: string
          country: string
          countryCode?: string | undefined
          parentId?: number | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/suggestions/users': {
      $get:
        | {
            input: { query: { limit?: number | undefined } }
            output: {
              user: {
                id: string
                username: string
                displayName: string
                avatarUrl?: string | undefined
                isVerified?: boolean | undefined
              }
              reason: 'followed_by_friends' | 'similar_interests' | 'popular' | 'new_to_platform'
              mutualFollowers?:
                | {
                    id: string
                    username: string
                    displayName: string
                    avatarUrl?: string | undefined
                    isVerified?: boolean | undefined
                  }[]
                | undefined
              mutualFollowersCount?: number | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { limit?: number | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/suggestions/users/:userId/hide': {
      $post:
        | { input: { param: { userId: string } }; output: {}; outputFormat: string; status: 200 }
        | {
            input: { param: { userId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/suggestions/topics': {
      $get:
        | {
            input: {}
            output: {
              id: string
              name: string
              description?: string | undefined
              icon?: string | undefined
              followerCount?: number | undefined
              isFollowing?: boolean | undefined
              category?: string | undefined
            }[]
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
  } & {
    '/topics/:topicId/follow': {
      $post:
        | { input: { param: { topicId: string } }; output: {}; outputFormat: string; status: 200 }
        | {
            input: { param: { topicId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | { input: { param: { topicId: string } }; output: {}; outputFormat: string; status: 200 }
        | {
            input: { param: { topicId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  },
  '/'
>
export default routes
