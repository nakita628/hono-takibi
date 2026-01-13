declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/users/:userId': {
      $get:
        | {
            input: { param: { userId: string } }
            output: {
              id: string
              username: string
              displayName: string
              bio?: string | undefined
              location?: string | undefined
              website?: string | undefined
              avatarUrl?: string | undefined
              bannerUrl?: string | undefined
              isVerified?: boolean | undefined
              isProtected?: boolean | undefined
              birthDate?: string | undefined
              pinnedPostId?: string | undefined
              metrics?:
                | {
                    followersCount?: number | undefined
                    followingCount?: number | undefined
                    postsCount?: number | undefined
                    likesCount?: number | undefined
                    listedCount?: number | undefined
                  }
                | undefined
              relationship?:
                | {
                    userId: string
                    following?: boolean | undefined
                    followedBy?: boolean | undefined
                    blocking?: boolean | undefined
                    blockedBy?: boolean | undefined
                    muting?: boolean | undefined
                    mutingNotifications?: boolean | undefined
                    followRequestSent?: boolean | undefined
                    followRequestReceived?: boolean | undefined
                  }
                | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/users/by/username/:username': {
      $get:
        | {
            input: { param: { username: string } }
            output: {
              id: string
              username: string
              displayName: string
              bio?: string | undefined
              location?: string | undefined
              website?: string | undefined
              avatarUrl?: string | undefined
              bannerUrl?: string | undefined
              isVerified?: boolean | undefined
              isProtected?: boolean | undefined
              birthDate?: string | undefined
              pinnedPostId?: string | undefined
              metrics?:
                | {
                    followersCount?: number | undefined
                    followingCount?: number | undefined
                    postsCount?: number | undefined
                    likesCount?: number | undefined
                    listedCount?: number | undefined
                  }
                | undefined
              relationship?:
                | {
                    userId: string
                    following?: boolean | undefined
                    followedBy?: boolean | undefined
                    blocking?: boolean | undefined
                    blockedBy?: boolean | undefined
                    muting?: boolean | undefined
                    mutingNotifications?: boolean | undefined
                    followRequestSent?: boolean | undefined
                    followRequestReceived?: boolean | undefined
                  }
                | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { username: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/users/search': {
      $get: {
        input: { query: { q: string; cursor?: string | undefined; limit?: number | undefined } }
        output: {
          data: {
            id: string
            username: string
            displayName: string
            bio?: string | undefined
            location?: string | undefined
            website?: string | undefined
            avatarUrl?: string | undefined
            bannerUrl?: string | undefined
            isVerified?: boolean | undefined
            isProtected?: boolean | undefined
            birthDate?: string | undefined
            pinnedPostId?: string | undefined
            metrics?:
              | {
                  followersCount?: number | undefined
                  followingCount?: number | undefined
                  postsCount?: number | undefined
                  likesCount?: number | undefined
                  listedCount?: number | undefined
                }
              | undefined
            relationship?:
              | {
                  userId: string
                  following?: boolean | undefined
                  followedBy?: boolean | undefined
                  blocking?: boolean | undefined
                  blockedBy?: boolean | undefined
                  muting?: boolean | undefined
                  mutingNotifications?: boolean | undefined
                  followRequestSent?: boolean | undefined
                  followRequestReceived?: boolean | undefined
                }
              | undefined
            createdAt: string
          }[]
          nextCursor?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/users/lookup': {
      $get: {
        input: { query: { ids?: string | undefined; usernames?: string | undefined } }
        output: {
          id: string
          username: string
          displayName: string
          bio?: string | undefined
          location?: string | undefined
          website?: string | undefined
          avatarUrl?: string | undefined
          bannerUrl?: string | undefined
          isVerified?: boolean | undefined
          isProtected?: boolean | undefined
          birthDate?: string | undefined
          pinnedPostId?: string | undefined
          metrics?:
            | {
                followersCount?: number | undefined
                followingCount?: number | undefined
                postsCount?: number | undefined
                likesCount?: number | undefined
                listedCount?: number | undefined
              }
            | undefined
          relationship?:
            | {
                userId: string
                following?: boolean | undefined
                followedBy?: boolean | undefined
                blocking?: boolean | undefined
                blockedBy?: boolean | undefined
                muting?: boolean | undefined
                mutingNotifications?: boolean | undefined
                followRequestSent?: boolean | undefined
                followRequestReceived?: boolean | undefined
              }
            | undefined
          createdAt: string
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/me': {
      $get:
        | {
            input: {}
            output: {
              id: string
              username: string
              displayName: string
              bio?: string | undefined
              location?: string | undefined
              website?: string | undefined
              avatarUrl?: string | undefined
              bannerUrl?: string | undefined
              isVerified?: boolean | undefined
              isProtected?: boolean | undefined
              birthDate?: string | undefined
              pinnedPostId?: string | undefined
              metrics?:
                | {
                    followersCount?: number | undefined
                    followingCount?: number | undefined
                    postsCount?: number | undefined
                    likesCount?: number | undefined
                    listedCount?: number | undefined
                  }
                | undefined
              relationship?:
                | {
                    userId: string
                    following?: boolean | undefined
                    followedBy?: boolean | undefined
                    blocking?: boolean | undefined
                    blockedBy?: boolean | undefined
                    muting?: boolean | undefined
                    mutingNotifications?: boolean | undefined
                    followRequestSent?: boolean | undefined
                    followRequestReceived?: boolean | undefined
                  }
                | undefined
              createdAt: string
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
      $patch:
        | {
            input: {
              json: {
                displayName?: string | undefined
                bio?: string | undefined
                location?: string | undefined
                website?: string | undefined
                birthDate?: string | undefined
                isProtected?: boolean | undefined
                pinnedPostId?: string | undefined
              }
            }
            output: {
              id: string
              username: string
              displayName: string
              bio?: string | undefined
              location?: string | undefined
              website?: string | undefined
              avatarUrl?: string | undefined
              bannerUrl?: string | undefined
              isVerified?: boolean | undefined
              isProtected?: boolean | undefined
              birthDate?: string | undefined
              pinnedPostId?: string | undefined
              metrics?:
                | {
                    followersCount?: number | undefined
                    followingCount?: number | undefined
                    postsCount?: number | undefined
                    likesCount?: number | undefined
                    listedCount?: number | undefined
                  }
                | undefined
              relationship?:
                | {
                    userId: string
                    following?: boolean | undefined
                    followedBy?: boolean | undefined
                    blocking?: boolean | undefined
                    blockedBy?: boolean | undefined
                    muting?: boolean | undefined
                    mutingNotifications?: boolean | undefined
                    followRequestSent?: boolean | undefined
                    followRequestReceived?: boolean | undefined
                  }
                | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                displayName?: string | undefined
                bio?: string | undefined
                location?: string | undefined
                website?: string | undefined
                birthDate?: string | undefined
                isProtected?: boolean | undefined
                pinnedPostId?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                displayName?: string | undefined
                bio?: string | undefined
                location?: string | undefined
                website?: string | undefined
                birthDate?: string | undefined
                isProtected?: boolean | undefined
                pinnedPostId?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/me/avatar': {
      $post:
        | {
            input: { form: { image: File } }
            output: { avatarUrl?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { form: { image: File } }
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
    '/me/banner': {
      $post:
        | {
            input: { form: { image: File } }
            output: { bannerUrl?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { form: { image: File } }
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
    '/users/:userId/follow': {
      $post:
        | {
            input: { param: { userId: string } }
            output: {
              userId: string
              following?: boolean | undefined
              followedBy?: boolean | undefined
              blocking?: boolean | undefined
              blockedBy?: boolean | undefined
              muting?: boolean | undefined
              mutingNotifications?: boolean | undefined
              followRequestSent?: boolean | undefined
              followRequestReceived?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | {
            input: { param: { userId: string } }
            output: {
              userId: string
              following?: boolean | undefined
              followedBy?: boolean | undefined
              blocking?: boolean | undefined
              blockedBy?: boolean | undefined
              muting?: boolean | undefined
              mutingNotifications?: boolean | undefined
              followRequestSent?: boolean | undefined
              followRequestReceived?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/users/:userId/followers': {
      $get:
        | {
            input: { param: { userId: string } } & {
              query: { cursor?: string | undefined; limit?: number | undefined }
            }
            output: {
              data: {
                id: string
                username: string
                displayName: string
                bio?: string | undefined
                location?: string | undefined
                website?: string | undefined
                avatarUrl?: string | undefined
                bannerUrl?: string | undefined
                isVerified?: boolean | undefined
                isProtected?: boolean | undefined
                birthDate?: string | undefined
                pinnedPostId?: string | undefined
                metrics?:
                  | {
                      followersCount?: number | undefined
                      followingCount?: number | undefined
                      postsCount?: number | undefined
                      likesCount?: number | undefined
                      listedCount?: number | undefined
                    }
                  | undefined
                relationship?:
                  | {
                      userId: string
                      following?: boolean | undefined
                      followedBy?: boolean | undefined
                      blocking?: boolean | undefined
                      blockedBy?: boolean | undefined
                      muting?: boolean | undefined
                      mutingNotifications?: boolean | undefined
                      followRequestSent?: boolean | undefined
                      followRequestReceived?: boolean | undefined
                    }
                  | undefined
                createdAt: string
              }[]
              nextCursor?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: string } } & {
              query: { cursor?: string | undefined; limit?: number | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/users/:userId/following': {
      $get:
        | {
            input: { param: { userId: string } } & {
              query: { cursor?: string | undefined; limit?: number | undefined }
            }
            output: {
              data: {
                id: string
                username: string
                displayName: string
                bio?: string | undefined
                location?: string | undefined
                website?: string | undefined
                avatarUrl?: string | undefined
                bannerUrl?: string | undefined
                isVerified?: boolean | undefined
                isProtected?: boolean | undefined
                birthDate?: string | undefined
                pinnedPostId?: string | undefined
                metrics?:
                  | {
                      followersCount?: number | undefined
                      followingCount?: number | undefined
                      postsCount?: number | undefined
                      likesCount?: number | undefined
                      listedCount?: number | undefined
                    }
                  | undefined
                relationship?:
                  | {
                      userId: string
                      following?: boolean | undefined
                      followedBy?: boolean | undefined
                      blocking?: boolean | undefined
                      blockedBy?: boolean | undefined
                      muting?: boolean | undefined
                      mutingNotifications?: boolean | undefined
                      followRequestSent?: boolean | undefined
                      followRequestReceived?: boolean | undefined
                    }
                  | undefined
                createdAt: string
              }[]
              nextCursor?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: string } } & {
              query: { cursor?: string | undefined; limit?: number | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/users/:userId/followers/remove': {
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
    '/relationships': {
      $get:
        | {
            input: { query: { userIds: string } }
            output: {
              userId: string
              following?: boolean | undefined
              followedBy?: boolean | undefined
              blocking?: boolean | undefined
              blockedBy?: boolean | undefined
              muting?: boolean | undefined
              mutingNotifications?: boolean | undefined
              followRequestSent?: boolean | undefined
              followRequestReceived?: boolean | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { userIds: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/follow-requests': {
      $get:
        | {
            input: { query: { cursor?: string | undefined; limit?: number | undefined } }
            output: {
              data: {
                id: string
                username: string
                displayName: string
                bio?: string | undefined
                location?: string | undefined
                website?: string | undefined
                avatarUrl?: string | undefined
                bannerUrl?: string | undefined
                isVerified?: boolean | undefined
                isProtected?: boolean | undefined
                birthDate?: string | undefined
                pinnedPostId?: string | undefined
                metrics?:
                  | {
                      followersCount?: number | undefined
                      followingCount?: number | undefined
                      postsCount?: number | undefined
                      likesCount?: number | undefined
                      listedCount?: number | undefined
                    }
                  | undefined
                relationship?:
                  | {
                      userId: string
                      following?: boolean | undefined
                      followedBy?: boolean | undefined
                      blocking?: boolean | undefined
                      blockedBy?: boolean | undefined
                      muting?: boolean | undefined
                      mutingNotifications?: boolean | undefined
                      followRequestSent?: boolean | undefined
                      followRequestReceived?: boolean | undefined
                    }
                  | undefined
                createdAt: string
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
    }
  } & {
    '/follow-requests/:userId/accept': {
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
    '/follow-requests/:userId/reject': {
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
    '/users/:userId/block': {
      $post:
        | {
            input: { param: { userId: string } }
            output: {
              userId: string
              following?: boolean | undefined
              followedBy?: boolean | undefined
              blocking?: boolean | undefined
              blockedBy?: boolean | undefined
              muting?: boolean | undefined
              mutingNotifications?: boolean | undefined
              followRequestSent?: boolean | undefined
              followRequestReceived?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | {
            input: { param: { userId: string } }
            output: {
              userId: string
              following?: boolean | undefined
              followedBy?: boolean | undefined
              blocking?: boolean | undefined
              blockedBy?: boolean | undefined
              muting?: boolean | undefined
              mutingNotifications?: boolean | undefined
              followRequestSent?: boolean | undefined
              followRequestReceived?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/users/:userId/mute': {
      $post:
        | {
            input: { param: { userId: string } } & {
              json: { duration?: number | undefined; notifications?: boolean | undefined }
            }
            output: {
              userId: string
              following?: boolean | undefined
              followedBy?: boolean | undefined
              blocking?: boolean | undefined
              blockedBy?: boolean | undefined
              muting?: boolean | undefined
              mutingNotifications?: boolean | undefined
              followRequestSent?: boolean | undefined
              followRequestReceived?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: string } } & {
              json: { duration?: number | undefined; notifications?: boolean | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | {
            input: { param: { userId: string } }
            output: {
              userId: string
              following?: boolean | undefined
              followedBy?: boolean | undefined
              blocking?: boolean | undefined
              blockedBy?: boolean | undefined
              muting?: boolean | undefined
              mutingNotifications?: boolean | undefined
              followRequestSent?: boolean | undefined
              followRequestReceived?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/blocks': {
      $get:
        | {
            input: { query: { cursor?: string | undefined; limit?: number | undefined } }
            output: {
              data: {
                id: string
                username: string
                displayName: string
                bio?: string | undefined
                location?: string | undefined
                website?: string | undefined
                avatarUrl?: string | undefined
                bannerUrl?: string | undefined
                isVerified?: boolean | undefined
                isProtected?: boolean | undefined
                birthDate?: string | undefined
                pinnedPostId?: string | undefined
                metrics?:
                  | {
                      followersCount?: number | undefined
                      followingCount?: number | undefined
                      postsCount?: number | undefined
                      likesCount?: number | undefined
                      listedCount?: number | undefined
                    }
                  | undefined
                relationship?:
                  | {
                      userId: string
                      following?: boolean | undefined
                      followedBy?: boolean | undefined
                      blocking?: boolean | undefined
                      blockedBy?: boolean | undefined
                      muting?: boolean | undefined
                      mutingNotifications?: boolean | undefined
                      followRequestSent?: boolean | undefined
                      followRequestReceived?: boolean | undefined
                    }
                  | undefined
                createdAt: string
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
    }
  } & {
    '/mutes': {
      $get:
        | {
            input: { query: { cursor?: string | undefined; limit?: number | undefined } }
            output: {
              data: {
                id: string
                username: string
                displayName: string
                bio?: string | undefined
                location?: string | undefined
                website?: string | undefined
                avatarUrl?: string | undefined
                bannerUrl?: string | undefined
                isVerified?: boolean | undefined
                isProtected?: boolean | undefined
                birthDate?: string | undefined
                pinnedPostId?: string | undefined
                metrics?:
                  | {
                      followersCount?: number | undefined
                      followingCount?: number | undefined
                      postsCount?: number | undefined
                      likesCount?: number | undefined
                      listedCount?: number | undefined
                    }
                  | undefined
                relationship?:
                  | {
                      userId: string
                      following?: boolean | undefined
                      followedBy?: boolean | undefined
                      blocking?: boolean | undefined
                      blockedBy?: boolean | undefined
                      muting?: boolean | undefined
                      mutingNotifications?: boolean | undefined
                      followRequestSent?: boolean | undefined
                      followRequestReceived?: boolean | undefined
                    }
                  | undefined
                createdAt: string
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
    }
  } & {
    '/lists': {
      $get:
        | {
            input: {}
            output: {
              id: string
              name: string
              description?: string | undefined
              isPrivate?: boolean | undefined
              owner: {
                id: string
                username: string
                displayName: string
                avatarUrl?: string | undefined
                isVerified?: boolean | undefined
                isProtected?: boolean | undefined
              }
              memberCount: number
              followerCount?: number | undefined
              isFollowing?: boolean | undefined
              isMember?: boolean | undefined
              createdAt: string
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
      $post:
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                isPrivate?: boolean | undefined
              }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              isPrivate?: boolean | undefined
              owner: {
                id: string
                username: string
                displayName: string
                avatarUrl?: string | undefined
                isVerified?: boolean | undefined
                isProtected?: boolean | undefined
              }
              memberCount: number
              followerCount?: number | undefined
              isFollowing?: boolean | undefined
              isMember?: boolean | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                isPrivate?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/lists/:listId': {
      $get:
        | {
            input: { param: { listId: string } }
            output: {
              id: string
              name: string
              description?: string | undefined
              isPrivate?: boolean | undefined
              owner: {
                id: string
                username: string
                displayName: string
                avatarUrl?: string | undefined
                isVerified?: boolean | undefined
                isProtected?: boolean | undefined
              }
              memberCount: number
              followerCount?: number | undefined
              isFollowing?: boolean | undefined
              isMember?: boolean | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { listId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
      $put:
        | {
            input: { param: { listId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                isPrivate?: boolean | undefined
              }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              isPrivate?: boolean | undefined
              owner: {
                id: string
                username: string
                displayName: string
                avatarUrl?: string | undefined
                isVerified?: boolean | undefined
                isProtected?: boolean | undefined
              }
              memberCount: number
              followerCount?: number | undefined
              isFollowing?: boolean | undefined
              isMember?: boolean | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { listId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                isPrivate?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | { input: { param: { listId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { listId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/lists/:listId/members': {
      $get: {
        input: { param: { listId: string } } & {
          query: { cursor?: string | undefined; limit?: number | undefined }
        }
        output: {
          data: {
            id: string
            username: string
            displayName: string
            bio?: string | undefined
            location?: string | undefined
            website?: string | undefined
            avatarUrl?: string | undefined
            bannerUrl?: string | undefined
            isVerified?: boolean | undefined
            isProtected?: boolean | undefined
            birthDate?: string | undefined
            pinnedPostId?: string | undefined
            metrics?:
              | {
                  followersCount?: number | undefined
                  followingCount?: number | undefined
                  postsCount?: number | undefined
                  likesCount?: number | undefined
                  listedCount?: number | undefined
                }
              | undefined
            relationship?:
              | {
                  userId: string
                  following?: boolean | undefined
                  followedBy?: boolean | undefined
                  blocking?: boolean | undefined
                  blockedBy?: boolean | undefined
                  muting?: boolean | undefined
                  mutingNotifications?: boolean | undefined
                  followRequestSent?: boolean | undefined
                  followRequestReceived?: boolean | undefined
                }
              | undefined
            createdAt: string
          }[]
          nextCursor?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post:
        | {
            input: { param: { listId: string } } & { json: { userId: string } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { param: { listId: string } } & { json: { userId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/lists/:listId/members/:userId': {
      $delete:
        | {
            input: { param: { listId: string; userId: string } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { param: { listId: string; userId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/lists/:listId/timeline': {
      $get:
        | {
            input: { param: { listId: string } } & {
              query: { cursor?: string | undefined; limit?: number | undefined }
            }
            output: { data: { id?: string | undefined }[]; nextCursor?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { listId: string } } & {
              query: { cursor?: string | undefined; limit?: number | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/users/:userId/lists': {
      $get: {
        input: { param: { userId: string } } & {
          query: { cursor?: string | undefined; limit?: number | undefined }
        }
        output: {
          id: string
          name: string
          description?: string | undefined
          isPrivate?: boolean | undefined
          owner: {
            id: string
            username: string
            displayName: string
            avatarUrl?: string | undefined
            isVerified?: boolean | undefined
            isProtected?: boolean | undefined
          }
          memberCount: number
          followerCount?: number | undefined
          isFollowing?: boolean | undefined
          isMember?: boolean | undefined
          createdAt: string
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
