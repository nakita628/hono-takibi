import type { OpenAPIHono } from '@hono/zod-openapi'

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K]
}

declare const routes: OpenAPIHono<
  Env,
  RemoveIndexSignature<
    {
      '/users/:userId': {
        $get:
          | {
              input: { param: { userId: string } }
              output: {
                id: string
                username: string
                displayName: string
                createdAt: string
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
                createdAt: string
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
              createdAt: string
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
            createdAt: string
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
                createdAt: string
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
      '/me': {
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
                createdAt: string
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
              status: 401
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
      }
    } & {
      '/me/avatar': {
        $post:
          | {
              input: { form: { image: File } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { form: { image: File } }
              output: { avatarUrl?: string | undefined }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/me/avatar': {
        $delete:
          | {
              input: {}
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | { input: {}; output: {}; outputFormat: string; status: 204 }
      }
    } & {
      '/me/banner': {
        $post:
          | {
              input: { form: { image: File } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { form: { image: File } }
              output: { bannerUrl?: string | undefined }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/me/banner': {
        $delete:
          | {
              input: {}
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | { input: {}; output: {}; outputFormat: string; status: 204 }
      }
    } & {
      '/users/:userId/follow': {
        $post:
          | {
              input: { param: { userId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
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
      }
    } & {
      '/users/:userId/follow': {
        $delete:
          | {
              input: { param: { userId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
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
      }
    } & {
      '/users/:userId/followers': {
        $get:
          | {
              input: { param: { userId: string } } & {
                query: { cursor?: string | undefined; limit?: number | undefined }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 404
            }
          | {
              input: { param: { userId: string } } & {
                query: { cursor?: string | undefined; limit?: number | undefined }
              }
              output: {
                data: {
                  id: string
                  username: string
                  displayName: string
                  createdAt: string
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
                }[]
                nextCursor?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/users/:userId/following': {
        $get:
          | {
              input: { param: { userId: string } } & {
                query: { cursor?: string | undefined; limit?: number | undefined }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 404
            }
          | {
              input: { param: { userId: string } } & {
                query: { cursor?: string | undefined; limit?: number | undefined }
              }
              output: {
                data: {
                  id: string
                  username: string
                  displayName: string
                  createdAt: string
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
                }[]
                nextCursor?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/users/:userId/followers/remove': {
        $post:
          | {
              input: { param: { userId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | { input: { param: { userId: string } }; output: {}; outputFormat: string; status: 200 }
      }
    } & {
      '/relationships': {
        $get:
          | {
              input: { query: { userIds: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
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
                  createdAt: string
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
          | {
              input: { param: { userId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | { input: { param: { userId: string } }; output: {}; outputFormat: string; status: 200 }
      }
    } & {
      '/follow-requests/:userId/reject': {
        $post:
          | {
              input: { param: { userId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | { input: { param: { userId: string } }; output: {}; outputFormat: string; status: 200 }
      }
    } & {
      '/users/:userId/block': {
        $post:
          | {
              input: { param: { userId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
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
      }
    } & {
      '/users/:userId/block': {
        $delete:
          | {
              input: { param: { userId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
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
      }
    } & {
      '/users/:userId/mute': {
        $post:
          | {
              input: { param: { userId: string } } & {
                json: { duration?: number | undefined; notifications?: boolean | undefined }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
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
      }
    } & {
      '/users/:userId/mute': {
        $delete:
          | {
              input: { param: { userId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
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
                  createdAt: string
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
                  createdAt: string
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
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: {}
              output: {
                id: string
                name: string
                owner: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isProtected?: boolean | undefined
                }
                memberCount: number
                createdAt: string
                description?: string | undefined
                isPrivate?: boolean | undefined
                followerCount?: number | undefined
                isFollowing?: boolean | undefined
                isMember?: boolean | undefined
              }[]
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/lists': {
        $post:
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
                owner: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isProtected?: boolean | undefined
                }
                memberCount: number
                createdAt: string
                description?: string | undefined
                isPrivate?: boolean | undefined
                followerCount?: number | undefined
                isFollowing?: boolean | undefined
                isMember?: boolean | undefined
              }
              outputFormat: 'json'
              status: 201
            }
      }
    } & {
      '/lists/:listId': {
        $get:
          | {
              input: { param: { listId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 404
            }
          | {
              input: { param: { listId: string } }
              output: {
                id: string
                name: string
                owner: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isProtected?: boolean | undefined
                }
                memberCount: number
                createdAt: string
                description?: string | undefined
                isPrivate?: boolean | undefined
                followerCount?: number | undefined
                isFollowing?: boolean | undefined
                isMember?: boolean | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/lists/:listId': {
        $put:
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
                owner: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isProtected?: boolean | undefined
                }
                memberCount: number
                createdAt: string
                description?: string | undefined
                isPrivate?: boolean | undefined
                followerCount?: number | undefined
                isFollowing?: boolean | undefined
                isMember?: boolean | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/lists/:listId': {
        $delete:
          | {
              input: { param: { listId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | { input: { param: { listId: string } }; output: {}; outputFormat: string; status: 204 }
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
              createdAt: string
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
            }[]
            nextCursor?: string | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/lists/:listId/members': {
        $post:
          | {
              input: { param: { listId: string } } & { json: { userId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { listId: string } } & { json: { userId: string } }
              output: {}
              outputFormat: string
              status: 200
            }
      }
    } & {
      '/lists/:listId/members/:userId': {
        $delete:
          | {
              input: { param: { listId: string; userId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { listId: string; userId: string } }
              output: {}
              outputFormat: string
              status: 204
            }
      }
    } & {
      '/lists/:listId/timeline': {
        $get:
          | {
              input: { param: { listId: string } } & {
                query: { cursor?: string | undefined; limit?: number | undefined }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { listId: string } } & {
                query: { cursor?: string | undefined; limit?: number | undefined }
              }
              output: { data: { id?: string | undefined }[]; nextCursor?: string | undefined }
              outputFormat: 'json'
              status: 200
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
            owner: {
              id: string
              username: string
              displayName: string
              avatarUrl?: string | undefined
              isVerified?: boolean | undefined
              isProtected?: boolean | undefined
            }
            memberCount: number
            createdAt: string
            description?: string | undefined
            isPrivate?: boolean | undefined
            followerCount?: number | undefined
            isFollowing?: boolean | undefined
            isMember?: boolean | undefined
          }[]
          outputFormat: 'json'
          status: 200
        }
      }
    }
  >,
  '/'
>
export default routes
