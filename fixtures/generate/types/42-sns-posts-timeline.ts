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
      '/posts': {
        $get: {
          input: {
            query: {
              cursor?: string | undefined
              limit?: number | undefined
              userId?: string | undefined
              hashtag?: string | undefined
              mediaOnly?: string | undefined
            }
          }
          output: {
            data: {
              id: string
              author: {
                id: string
                username: string
                displayName: string
                avatarUrl?: string | undefined
                isVerified?: boolean | undefined
                isFollowing?: boolean | undefined
                isFollowedBy?: boolean | undefined
              }
              text: string
              media?:
                | {
                    id: string
                    type: 'image' | 'gif' | 'video'
                    url: string
                    previewUrl?: string | undefined
                    alt?: string | undefined
                    width?: number | undefined
                    height?: number | undefined
                    duration?: number | undefined
                    blurhash?: string | undefined
                  }[]
                | undefined
              poll?:
                | {
                    id: string
                    options: {
                      id: string
                      text: string
                      voteCount: number
                      percentage?: number | undefined
                    }[]
                    totalVotes: number
                    expiresAt: string
                    isExpired?: boolean | undefined
                    viewerVote?: string | undefined
                  }
                | undefined
              quotedPost?: any | undefined
              replyTo?:
                | {
                    postId?: string | undefined
                    author?:
                      | {
                          id: string
                          username: string
                          displayName: string
                          avatarUrl?: string | undefined
                          isVerified?: boolean | undefined
                          isFollowing?: boolean | undefined
                          isFollowedBy?: boolean | undefined
                        }
                      | undefined
                  }
                | undefined
              repostOf?: any | undefined
              hashtags?: string[] | undefined
              mentions?:
                | {
                    id: string
                    username: string
                    displayName: string
                    avatarUrl?: string | undefined
                    isVerified?: boolean | undefined
                    isFollowing?: boolean | undefined
                    isFollowedBy?: boolean | undefined
                  }[]
                | undefined
              urls?:
                | {
                    url: string
                    expandedUrl: string
                    displayUrl: string
                    start?: number | undefined
                    end?: number | undefined
                  }[]
                | undefined
              card?:
                | {
                    url: string
                    title: string
                    description?: string | undefined
                    image?: string | undefined
                    siteName?: string | undefined
                    type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                  }
                | undefined
              visibility?: 'public' | 'followers' | 'mentioned' | undefined
              replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
              metrics: {
                likeCount: number
                repostCount: number
                replyCount: number
                quoteCount: number
                viewCount: number
                bookmarkCount?: number | undefined
              }
              viewer?:
                | {
                    liked?: boolean | undefined
                    reposted?: boolean | undefined
                    bookmarked?: boolean | undefined
                  }
                | undefined
              language?: string | undefined
              source?: string | undefined
              createdAt: string
              editedAt?: string | undefined
              editHistory?:
                | { text?: string | undefined; editedAt?: string | undefined }[]
                | undefined
            }[]
            nextCursor?: string | undefined
            previousCursor?: string | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/posts': {
        $post:
          | {
              input: {
                json: {
                  text: string
                  mediaIds?: string[] | undefined
                  poll?: { options: string[]; duration: number } | undefined
                  visibility?: 'public' | 'followers' | 'mentioned' | undefined
                  replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                  quotedPostId?: string | undefined
                }
              }
              output: {
                id: string
                author: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isFollowing?: boolean | undefined
                  isFollowedBy?: boolean | undefined
                }
                text: string
                media?:
                  | {
                      id: string
                      type: 'image' | 'gif' | 'video'
                      url: string
                      previewUrl?: string | undefined
                      alt?: string | undefined
                      width?: number | undefined
                      height?: number | undefined
                      duration?: number | undefined
                      blurhash?: string | undefined
                    }[]
                  | undefined
                poll?:
                  | {
                      id: string
                      options: {
                        id: string
                        text: string
                        voteCount: number
                        percentage?: number | undefined
                      }[]
                      totalVotes: number
                      expiresAt: string
                      isExpired?: boolean | undefined
                      viewerVote?: string | undefined
                    }
                  | undefined
                quotedPost?: any | undefined
                replyTo?:
                  | {
                      postId?: string | undefined
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                            isFollowing?: boolean | undefined
                            isFollowedBy?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                repostOf?: any | undefined
                hashtags?: string[] | undefined
                mentions?:
                  | {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }[]
                  | undefined
                urls?:
                  | {
                      url: string
                      expandedUrl: string
                      displayUrl: string
                      start?: number | undefined
                      end?: number | undefined
                    }[]
                  | undefined
                card?:
                  | {
                      url: string
                      title: string
                      description?: string | undefined
                      image?: string | undefined
                      siteName?: string | undefined
                      type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                    }
                  | undefined
                visibility?: 'public' | 'followers' | 'mentioned' | undefined
                replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                metrics: {
                  likeCount: number
                  repostCount: number
                  replyCount: number
                  quoteCount: number
                  viewCount: number
                  bookmarkCount?: number | undefined
                }
                viewer?:
                  | {
                      liked?: boolean | undefined
                      reposted?: boolean | undefined
                      bookmarked?: boolean | undefined
                    }
                  | undefined
                language?: string | undefined
                source?: string | undefined
                createdAt: string
                editedAt?: string | undefined
                editHistory?:
                  | { text?: string | undefined; editedAt?: string | undefined }[]
                  | undefined
              }
              outputFormat: 'json'
              status: 201
            }
          | {
              input: {
                json: {
                  text: string
                  mediaIds?: string[] | undefined
                  poll?: { options: string[]; duration: number } | undefined
                  visibility?: 'public' | 'followers' | 'mentioned' | undefined
                  replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                  quotedPostId?: string | undefined
                }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 400
            }
          | {
              input: {
                json: {
                  text: string
                  mediaIds?: string[] | undefined
                  poll?: { options: string[]; duration: number } | undefined
                  visibility?: 'public' | 'followers' | 'mentioned' | undefined
                  replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                  quotedPostId?: string | undefined
                }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
      }
    } & {
      '/posts/:postId': {
        $get:
          | {
              input: { param: { postId: string } }
              output: {
                id: string
                author: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isFollowing?: boolean | undefined
                  isFollowedBy?: boolean | undefined
                }
                text: string
                media?:
                  | {
                      id: string
                      type: 'image' | 'gif' | 'video'
                      url: string
                      previewUrl?: string | undefined
                      alt?: string | undefined
                      width?: number | undefined
                      height?: number | undefined
                      duration?: number | undefined
                      blurhash?: string | undefined
                    }[]
                  | undefined
                poll?:
                  | {
                      id: string
                      options: {
                        id: string
                        text: string
                        voteCount: number
                        percentage?: number | undefined
                      }[]
                      totalVotes: number
                      expiresAt: string
                      isExpired?: boolean | undefined
                      viewerVote?: string | undefined
                    }
                  | undefined
                quotedPost?: any | undefined
                replyTo?:
                  | {
                      postId?: string | undefined
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                            isFollowing?: boolean | undefined
                            isFollowedBy?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                repostOf?: any | undefined
                hashtags?: string[] | undefined
                mentions?:
                  | {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }[]
                  | undefined
                urls?:
                  | {
                      url: string
                      expandedUrl: string
                      displayUrl: string
                      start?: number | undefined
                      end?: number | undefined
                    }[]
                  | undefined
                card?:
                  | {
                      url: string
                      title: string
                      description?: string | undefined
                      image?: string | undefined
                      siteName?: string | undefined
                      type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                    }
                  | undefined
                visibility?: 'public' | 'followers' | 'mentioned' | undefined
                replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                metrics: {
                  likeCount: number
                  repostCount: number
                  replyCount: number
                  quoteCount: number
                  viewCount: number
                  bookmarkCount?: number | undefined
                }
                viewer?:
                  | {
                      liked?: boolean | undefined
                      reposted?: boolean | undefined
                      bookmarked?: boolean | undefined
                    }
                  | undefined
                language?: string | undefined
                source?: string | undefined
                createdAt: string
                editedAt?: string | undefined
                editHistory?:
                  | { text?: string | undefined; editedAt?: string | undefined }[]
                  | undefined
              }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: { param: { postId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 404
            }
      }
    } & {
      '/posts/:postId': {
        $delete:
          | {
              input: { param: { postId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | { input: { param: { postId: string } }; output: {}; outputFormat: string; status: 204 }
          | {
              input: { param: { postId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 403
            }
      }
    } & {
      '/posts/:postId/thread': {
        $get:
          | {
              input: { param: { postId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 404
            }
          | {
              input: { param: { postId: string } }
              output: {
                post: {
                  id: string
                  author: {
                    id: string
                    username: string
                    displayName: string
                    avatarUrl?: string | undefined
                    isVerified?: boolean | undefined
                    isFollowing?: boolean | undefined
                    isFollowedBy?: boolean | undefined
                  }
                  text: string
                  media?:
                    | {
                        id: string
                        type: 'image' | 'gif' | 'video'
                        url: string
                        previewUrl?: string | undefined
                        alt?: string | undefined
                        width?: number | undefined
                        height?: number | undefined
                        duration?: number | undefined
                        blurhash?: string | undefined
                      }[]
                    | undefined
                  poll?:
                    | {
                        id: string
                        options: {
                          id: string
                          text: string
                          voteCount: number
                          percentage?: number | undefined
                        }[]
                        totalVotes: number
                        expiresAt: string
                        isExpired?: boolean | undefined
                        viewerVote?: string | undefined
                      }
                    | undefined
                  quotedPost?: any | undefined
                  replyTo?:
                    | {
                        postId?: string | undefined
                        author?:
                          | {
                              id: string
                              username: string
                              displayName: string
                              avatarUrl?: string | undefined
                              isVerified?: boolean | undefined
                              isFollowing?: boolean | undefined
                              isFollowedBy?: boolean | undefined
                            }
                          | undefined
                      }
                    | undefined
                  repostOf?: any | undefined
                  hashtags?: string[] | undefined
                  mentions?:
                    | {
                        id: string
                        username: string
                        displayName: string
                        avatarUrl?: string | undefined
                        isVerified?: boolean | undefined
                        isFollowing?: boolean | undefined
                        isFollowedBy?: boolean | undefined
                      }[]
                    | undefined
                  urls?:
                    | {
                        url: string
                        expandedUrl: string
                        displayUrl: string
                        start?: number | undefined
                        end?: number | undefined
                      }[]
                    | undefined
                  card?:
                    | {
                        url: string
                        title: string
                        description?: string | undefined
                        image?: string | undefined
                        siteName?: string | undefined
                        type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                      }
                    | undefined
                  visibility?: 'public' | 'followers' | 'mentioned' | undefined
                  replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                  metrics: {
                    likeCount: number
                    repostCount: number
                    replyCount: number
                    quoteCount: number
                    viewCount: number
                    bookmarkCount?: number | undefined
                  }
                  viewer?:
                    | {
                        liked?: boolean | undefined
                        reposted?: boolean | undefined
                        bookmarked?: boolean | undefined
                      }
                    | undefined
                  language?: string | undefined
                  source?: string | undefined
                  createdAt: string
                  editedAt?: string | undefined
                  editHistory?:
                    | { text?: string | undefined; editedAt?: string | undefined }[]
                    | undefined
                }
                ancestors?:
                  | {
                      id: string
                      author: {
                        id: string
                        username: string
                        displayName: string
                        avatarUrl?: string | undefined
                        isVerified?: boolean | undefined
                        isFollowing?: boolean | undefined
                        isFollowedBy?: boolean | undefined
                      }
                      text: string
                      media?:
                        | {
                            id: string
                            type: 'image' | 'gif' | 'video'
                            url: string
                            previewUrl?: string | undefined
                            alt?: string | undefined
                            width?: number | undefined
                            height?: number | undefined
                            duration?: number | undefined
                            blurhash?: string | undefined
                          }[]
                        | undefined
                      poll?:
                        | {
                            id: string
                            options: {
                              id: string
                              text: string
                              voteCount: number
                              percentage?: number | undefined
                            }[]
                            totalVotes: number
                            expiresAt: string
                            isExpired?: boolean | undefined
                            viewerVote?: string | undefined
                          }
                        | undefined
                      quotedPost?: any | undefined
                      replyTo?:
                        | {
                            postId?: string | undefined
                            author?:
                              | {
                                  id: string
                                  username: string
                                  displayName: string
                                  avatarUrl?: string | undefined
                                  isVerified?: boolean | undefined
                                  isFollowing?: boolean | undefined
                                  isFollowedBy?: boolean | undefined
                                }
                              | undefined
                          }
                        | undefined
                      repostOf?: any | undefined
                      hashtags?: string[] | undefined
                      mentions?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                            isFollowing?: boolean | undefined
                            isFollowedBy?: boolean | undefined
                          }[]
                        | undefined
                      urls?:
                        | {
                            url: string
                            expandedUrl: string
                            displayUrl: string
                            start?: number | undefined
                            end?: number | undefined
                          }[]
                        | undefined
                      card?:
                        | {
                            url: string
                            title: string
                            description?: string | undefined
                            image?: string | undefined
                            siteName?: string | undefined
                            type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                          }
                        | undefined
                      visibility?: 'public' | 'followers' | 'mentioned' | undefined
                      replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                      metrics: {
                        likeCount: number
                        repostCount: number
                        replyCount: number
                        quoteCount: number
                        viewCount: number
                        bookmarkCount?: number | undefined
                      }
                      viewer?:
                        | {
                            liked?: boolean | undefined
                            reposted?: boolean | undefined
                            bookmarked?: boolean | undefined
                          }
                        | undefined
                      language?: string | undefined
                      source?: string | undefined
                      createdAt: string
                      editedAt?: string | undefined
                      editHistory?:
                        | { text?: string | undefined; editedAt?: string | undefined }[]
                        | undefined
                    }[]
                  | undefined
                replies?: any[] | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/posts/:postId/context': {
        $get: {
          input: { param: { postId: string } }
          output: {
            ancestors?:
              | {
                  id: string
                  author: {
                    id: string
                    username: string
                    displayName: string
                    avatarUrl?: string | undefined
                    isVerified?: boolean | undefined
                    isFollowing?: boolean | undefined
                    isFollowedBy?: boolean | undefined
                  }
                  text: string
                  media?:
                    | {
                        id: string
                        type: 'image' | 'gif' | 'video'
                        url: string
                        previewUrl?: string | undefined
                        alt?: string | undefined
                        width?: number | undefined
                        height?: number | undefined
                        duration?: number | undefined
                        blurhash?: string | undefined
                      }[]
                    | undefined
                  poll?:
                    | {
                        id: string
                        options: {
                          id: string
                          text: string
                          voteCount: number
                          percentage?: number | undefined
                        }[]
                        totalVotes: number
                        expiresAt: string
                        isExpired?: boolean | undefined
                        viewerVote?: string | undefined
                      }
                    | undefined
                  quotedPost?: any | undefined
                  replyTo?:
                    | {
                        postId?: string | undefined
                        author?:
                          | {
                              id: string
                              username: string
                              displayName: string
                              avatarUrl?: string | undefined
                              isVerified?: boolean | undefined
                              isFollowing?: boolean | undefined
                              isFollowedBy?: boolean | undefined
                            }
                          | undefined
                      }
                    | undefined
                  repostOf?: any | undefined
                  hashtags?: string[] | undefined
                  mentions?:
                    | {
                        id: string
                        username: string
                        displayName: string
                        avatarUrl?: string | undefined
                        isVerified?: boolean | undefined
                        isFollowing?: boolean | undefined
                        isFollowedBy?: boolean | undefined
                      }[]
                    | undefined
                  urls?:
                    | {
                        url: string
                        expandedUrl: string
                        displayUrl: string
                        start?: number | undefined
                        end?: number | undefined
                      }[]
                    | undefined
                  card?:
                    | {
                        url: string
                        title: string
                        description?: string | undefined
                        image?: string | undefined
                        siteName?: string | undefined
                        type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                      }
                    | undefined
                  visibility?: 'public' | 'followers' | 'mentioned' | undefined
                  replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                  metrics: {
                    likeCount: number
                    repostCount: number
                    replyCount: number
                    quoteCount: number
                    viewCount: number
                    bookmarkCount?: number | undefined
                  }
                  viewer?:
                    | {
                        liked?: boolean | undefined
                        reposted?: boolean | undefined
                        bookmarked?: boolean | undefined
                      }
                    | undefined
                  language?: string | undefined
                  source?: string | undefined
                  createdAt: string
                  editedAt?: string | undefined
                  editHistory?:
                    | { text?: string | undefined; editedAt?: string | undefined }[]
                    | undefined
                }[]
              | undefined
            post?:
              | {
                  id: string
                  author: {
                    id: string
                    username: string
                    displayName: string
                    avatarUrl?: string | undefined
                    isVerified?: boolean | undefined
                    isFollowing?: boolean | undefined
                    isFollowedBy?: boolean | undefined
                  }
                  text: string
                  media?:
                    | {
                        id: string
                        type: 'image' | 'gif' | 'video'
                        url: string
                        previewUrl?: string | undefined
                        alt?: string | undefined
                        width?: number | undefined
                        height?: number | undefined
                        duration?: number | undefined
                        blurhash?: string | undefined
                      }[]
                    | undefined
                  poll?:
                    | {
                        id: string
                        options: {
                          id: string
                          text: string
                          voteCount: number
                          percentage?: number | undefined
                        }[]
                        totalVotes: number
                        expiresAt: string
                        isExpired?: boolean | undefined
                        viewerVote?: string | undefined
                      }
                    | undefined
                  quotedPost?: any | undefined
                  replyTo?:
                    | {
                        postId?: string | undefined
                        author?:
                          | {
                              id: string
                              username: string
                              displayName: string
                              avatarUrl?: string | undefined
                              isVerified?: boolean | undefined
                              isFollowing?: boolean | undefined
                              isFollowedBy?: boolean | undefined
                            }
                          | undefined
                      }
                    | undefined
                  repostOf?: any | undefined
                  hashtags?: string[] | undefined
                  mentions?:
                    | {
                        id: string
                        username: string
                        displayName: string
                        avatarUrl?: string | undefined
                        isVerified?: boolean | undefined
                        isFollowing?: boolean | undefined
                        isFollowedBy?: boolean | undefined
                      }[]
                    | undefined
                  urls?:
                    | {
                        url: string
                        expandedUrl: string
                        displayUrl: string
                        start?: number | undefined
                        end?: number | undefined
                      }[]
                    | undefined
                  card?:
                    | {
                        url: string
                        title: string
                        description?: string | undefined
                        image?: string | undefined
                        siteName?: string | undefined
                        type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                      }
                    | undefined
                  visibility?: 'public' | 'followers' | 'mentioned' | undefined
                  replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                  metrics: {
                    likeCount: number
                    repostCount: number
                    replyCount: number
                    quoteCount: number
                    viewCount: number
                    bookmarkCount?: number | undefined
                  }
                  viewer?:
                    | {
                        liked?: boolean | undefined
                        reposted?: boolean | undefined
                        bookmarked?: boolean | undefined
                      }
                    | undefined
                  language?: string | undefined
                  source?: string | undefined
                  createdAt: string
                  editedAt?: string | undefined
                  editHistory?:
                    | { text?: string | undefined; editedAt?: string | undefined }[]
                    | undefined
                }
              | undefined
            descendants?:
              | {
                  id: string
                  author: {
                    id: string
                    username: string
                    displayName: string
                    avatarUrl?: string | undefined
                    isVerified?: boolean | undefined
                    isFollowing?: boolean | undefined
                    isFollowedBy?: boolean | undefined
                  }
                  text: string
                  media?:
                    | {
                        id: string
                        type: 'image' | 'gif' | 'video'
                        url: string
                        previewUrl?: string | undefined
                        alt?: string | undefined
                        width?: number | undefined
                        height?: number | undefined
                        duration?: number | undefined
                        blurhash?: string | undefined
                      }[]
                    | undefined
                  poll?:
                    | {
                        id: string
                        options: {
                          id: string
                          text: string
                          voteCount: number
                          percentage?: number | undefined
                        }[]
                        totalVotes: number
                        expiresAt: string
                        isExpired?: boolean | undefined
                        viewerVote?: string | undefined
                      }
                    | undefined
                  quotedPost?: any | undefined
                  replyTo?:
                    | {
                        postId?: string | undefined
                        author?:
                          | {
                              id: string
                              username: string
                              displayName: string
                              avatarUrl?: string | undefined
                              isVerified?: boolean | undefined
                              isFollowing?: boolean | undefined
                              isFollowedBy?: boolean | undefined
                            }
                          | undefined
                      }
                    | undefined
                  repostOf?: any | undefined
                  hashtags?: string[] | undefined
                  mentions?:
                    | {
                        id: string
                        username: string
                        displayName: string
                        avatarUrl?: string | undefined
                        isVerified?: boolean | undefined
                        isFollowing?: boolean | undefined
                        isFollowedBy?: boolean | undefined
                      }[]
                    | undefined
                  urls?:
                    | {
                        url: string
                        expandedUrl: string
                        displayUrl: string
                        start?: number | undefined
                        end?: number | undefined
                      }[]
                    | undefined
                  card?:
                    | {
                        url: string
                        title: string
                        description?: string | undefined
                        image?: string | undefined
                        siteName?: string | undefined
                        type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                      }
                    | undefined
                  visibility?: 'public' | 'followers' | 'mentioned' | undefined
                  replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                  metrics: {
                    likeCount: number
                    repostCount: number
                    replyCount: number
                    quoteCount: number
                    viewCount: number
                    bookmarkCount?: number | undefined
                  }
                  viewer?:
                    | {
                        liked?: boolean | undefined
                        reposted?: boolean | undefined
                        bookmarked?: boolean | undefined
                      }
                    | undefined
                  language?: string | undefined
                  source?: string | undefined
                  createdAt: string
                  editedAt?: string | undefined
                  editHistory?:
                    | { text?: string | undefined; editedAt?: string | undefined }[]
                    | undefined
                }[]
              | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/timeline/home': {
        $get:
          | {
              input: {
                query: {
                  cursor?: string | undefined
                  limit?: number | undefined
                  includeReplies?: string | undefined
                  includeReposts?: string | undefined
                }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: {
                query: {
                  cursor?: string | undefined
                  limit?: number | undefined
                  includeReplies?: string | undefined
                  includeReposts?: string | undefined
                }
              }
              output: {
                data: {
                  type: 'post' | 'repost' | 'reply' | 'quote' | 'promoted'
                  post: {
                    id: string
                    author: {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }
                    text: string
                    media?:
                      | {
                          id: string
                          type: 'image' | 'gif' | 'video'
                          url: string
                          previewUrl?: string | undefined
                          alt?: string | undefined
                          width?: number | undefined
                          height?: number | undefined
                          duration?: number | undefined
                          blurhash?: string | undefined
                        }[]
                      | undefined
                    poll?:
                      | {
                          id: string
                          options: {
                            id: string
                            text: string
                            voteCount: number
                            percentage?: number | undefined
                          }[]
                          totalVotes: number
                          expiresAt: string
                          isExpired?: boolean | undefined
                          viewerVote?: string | undefined
                        }
                      | undefined
                    quotedPost?: any | undefined
                    replyTo?:
                      | {
                          postId?: string | undefined
                          author?:
                            | {
                                id: string
                                username: string
                                displayName: string
                                avatarUrl?: string | undefined
                                isVerified?: boolean | undefined
                                isFollowing?: boolean | undefined
                                isFollowedBy?: boolean | undefined
                              }
                            | undefined
                        }
                      | undefined
                    repostOf?: any | undefined
                    hashtags?: string[] | undefined
                    mentions?:
                      | {
                          id: string
                          username: string
                          displayName: string
                          avatarUrl?: string | undefined
                          isVerified?: boolean | undefined
                          isFollowing?: boolean | undefined
                          isFollowedBy?: boolean | undefined
                        }[]
                      | undefined
                    urls?:
                      | {
                          url: string
                          expandedUrl: string
                          displayUrl: string
                          start?: number | undefined
                          end?: number | undefined
                        }[]
                      | undefined
                    card?:
                      | {
                          url: string
                          title: string
                          description?: string | undefined
                          image?: string | undefined
                          siteName?: string | undefined
                          type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                        }
                      | undefined
                    visibility?: 'public' | 'followers' | 'mentioned' | undefined
                    replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                    metrics: {
                      likeCount: number
                      repostCount: number
                      replyCount: number
                      quoteCount: number
                      viewCount: number
                      bookmarkCount?: number | undefined
                    }
                    viewer?:
                      | {
                          liked?: boolean | undefined
                          reposted?: boolean | undefined
                          bookmarked?: boolean | undefined
                        }
                      | undefined
                    language?: string | undefined
                    source?: string | undefined
                    createdAt: string
                    editedAt?: string | undefined
                    editHistory?:
                      | { text?: string | undefined; editedAt?: string | undefined }[]
                      | undefined
                  }
                  repostedBy?:
                    | {
                        id: string
                        username: string
                        displayName: string
                        avatarUrl?: string | undefined
                        isVerified?: boolean | undefined
                        isFollowing?: boolean | undefined
                        isFollowedBy?: boolean | undefined
                      }
                    | undefined
                  reason?: string | undefined
                }[]
                nextCursor?: string | undefined
                previousCursor?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/timeline/for-you': {
        $get:
          | {
              input: { query: { cursor?: string | undefined; limit?: number | undefined } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { query: { cursor?: string | undefined; limit?: number | undefined } }
              output: {
                data: {
                  type: 'post' | 'repost' | 'reply' | 'quote' | 'promoted'
                  post: {
                    id: string
                    author: {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }
                    text: string
                    media?:
                      | {
                          id: string
                          type: 'image' | 'gif' | 'video'
                          url: string
                          previewUrl?: string | undefined
                          alt?: string | undefined
                          width?: number | undefined
                          height?: number | undefined
                          duration?: number | undefined
                          blurhash?: string | undefined
                        }[]
                      | undefined
                    poll?:
                      | {
                          id: string
                          options: {
                            id: string
                            text: string
                            voteCount: number
                            percentage?: number | undefined
                          }[]
                          totalVotes: number
                          expiresAt: string
                          isExpired?: boolean | undefined
                          viewerVote?: string | undefined
                        }
                      | undefined
                    quotedPost?: any | undefined
                    replyTo?:
                      | {
                          postId?: string | undefined
                          author?:
                            | {
                                id: string
                                username: string
                                displayName: string
                                avatarUrl?: string | undefined
                                isVerified?: boolean | undefined
                                isFollowing?: boolean | undefined
                                isFollowedBy?: boolean | undefined
                              }
                            | undefined
                        }
                      | undefined
                    repostOf?: any | undefined
                    hashtags?: string[] | undefined
                    mentions?:
                      | {
                          id: string
                          username: string
                          displayName: string
                          avatarUrl?: string | undefined
                          isVerified?: boolean | undefined
                          isFollowing?: boolean | undefined
                          isFollowedBy?: boolean | undefined
                        }[]
                      | undefined
                    urls?:
                      | {
                          url: string
                          expandedUrl: string
                          displayUrl: string
                          start?: number | undefined
                          end?: number | undefined
                        }[]
                      | undefined
                    card?:
                      | {
                          url: string
                          title: string
                          description?: string | undefined
                          image?: string | undefined
                          siteName?: string | undefined
                          type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                        }
                      | undefined
                    visibility?: 'public' | 'followers' | 'mentioned' | undefined
                    replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                    metrics: {
                      likeCount: number
                      repostCount: number
                      replyCount: number
                      quoteCount: number
                      viewCount: number
                      bookmarkCount?: number | undefined
                    }
                    viewer?:
                      | {
                          liked?: boolean | undefined
                          reposted?: boolean | undefined
                          bookmarked?: boolean | undefined
                        }
                      | undefined
                    language?: string | undefined
                    source?: string | undefined
                    createdAt: string
                    editedAt?: string | undefined
                    editHistory?:
                      | { text?: string | undefined; editedAt?: string | undefined }[]
                      | undefined
                  }
                  repostedBy?:
                    | {
                        id: string
                        username: string
                        displayName: string
                        avatarUrl?: string | undefined
                        isVerified?: boolean | undefined
                        isFollowing?: boolean | undefined
                        isFollowedBy?: boolean | undefined
                      }
                    | undefined
                  reason?: string | undefined
                }[]
                nextCursor?: string | undefined
                previousCursor?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/timeline/user/:userId': {
        $get:
          | {
              input: { param: { userId: string } } & {
                query: {
                  cursor?: string | undefined
                  limit?: number | undefined
                  includeReplies?: string | undefined
                  includeReposts?: string | undefined
                  mediaOnly?: string | undefined
                }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 404
            }
          | {
              input: { param: { userId: string } } & {
                query: {
                  cursor?: string | undefined
                  limit?: number | undefined
                  includeReplies?: string | undefined
                  includeReposts?: string | undefined
                  mediaOnly?: string | undefined
                }
              }
              output: {
                data: {
                  type: 'post' | 'repost' | 'reply' | 'quote' | 'promoted'
                  post: {
                    id: string
                    author: {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }
                    text: string
                    media?:
                      | {
                          id: string
                          type: 'image' | 'gif' | 'video'
                          url: string
                          previewUrl?: string | undefined
                          alt?: string | undefined
                          width?: number | undefined
                          height?: number | undefined
                          duration?: number | undefined
                          blurhash?: string | undefined
                        }[]
                      | undefined
                    poll?:
                      | {
                          id: string
                          options: {
                            id: string
                            text: string
                            voteCount: number
                            percentage?: number | undefined
                          }[]
                          totalVotes: number
                          expiresAt: string
                          isExpired?: boolean | undefined
                          viewerVote?: string | undefined
                        }
                      | undefined
                    quotedPost?: any | undefined
                    replyTo?:
                      | {
                          postId?: string | undefined
                          author?:
                            | {
                                id: string
                                username: string
                                displayName: string
                                avatarUrl?: string | undefined
                                isVerified?: boolean | undefined
                                isFollowing?: boolean | undefined
                                isFollowedBy?: boolean | undefined
                              }
                            | undefined
                        }
                      | undefined
                    repostOf?: any | undefined
                    hashtags?: string[] | undefined
                    mentions?:
                      | {
                          id: string
                          username: string
                          displayName: string
                          avatarUrl?: string | undefined
                          isVerified?: boolean | undefined
                          isFollowing?: boolean | undefined
                          isFollowedBy?: boolean | undefined
                        }[]
                      | undefined
                    urls?:
                      | {
                          url: string
                          expandedUrl: string
                          displayUrl: string
                          start?: number | undefined
                          end?: number | undefined
                        }[]
                      | undefined
                    card?:
                      | {
                          url: string
                          title: string
                          description?: string | undefined
                          image?: string | undefined
                          siteName?: string | undefined
                          type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                        }
                      | undefined
                    visibility?: 'public' | 'followers' | 'mentioned' | undefined
                    replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                    metrics: {
                      likeCount: number
                      repostCount: number
                      replyCount: number
                      quoteCount: number
                      viewCount: number
                      bookmarkCount?: number | undefined
                    }
                    viewer?:
                      | {
                          liked?: boolean | undefined
                          reposted?: boolean | undefined
                          bookmarked?: boolean | undefined
                        }
                      | undefined
                    language?: string | undefined
                    source?: string | undefined
                    createdAt: string
                    editedAt?: string | undefined
                    editHistory?:
                      | { text?: string | undefined; editedAt?: string | undefined }[]
                      | undefined
                  }
                  repostedBy?:
                    | {
                        id: string
                        username: string
                        displayName: string
                        avatarUrl?: string | undefined
                        isVerified?: boolean | undefined
                        isFollowing?: boolean | undefined
                        isFollowedBy?: boolean | undefined
                      }
                    | undefined
                  reason?: string | undefined
                }[]
                nextCursor?: string | undefined
                previousCursor?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/timeline/hashtag/:hashtag': {
        $get: {
          input: { param: { hashtag: string } } & {
            query: { cursor?: string | undefined; limit?: number | undefined }
          }
          output: {
            data: {
              type: 'post' | 'repost' | 'reply' | 'quote' | 'promoted'
              post: {
                id: string
                author: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isFollowing?: boolean | undefined
                  isFollowedBy?: boolean | undefined
                }
                text: string
                media?:
                  | {
                      id: string
                      type: 'image' | 'gif' | 'video'
                      url: string
                      previewUrl?: string | undefined
                      alt?: string | undefined
                      width?: number | undefined
                      height?: number | undefined
                      duration?: number | undefined
                      blurhash?: string | undefined
                    }[]
                  | undefined
                poll?:
                  | {
                      id: string
                      options: {
                        id: string
                        text: string
                        voteCount: number
                        percentage?: number | undefined
                      }[]
                      totalVotes: number
                      expiresAt: string
                      isExpired?: boolean | undefined
                      viewerVote?: string | undefined
                    }
                  | undefined
                quotedPost?: any | undefined
                replyTo?:
                  | {
                      postId?: string | undefined
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                            isFollowing?: boolean | undefined
                            isFollowedBy?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                repostOf?: any | undefined
                hashtags?: string[] | undefined
                mentions?:
                  | {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }[]
                  | undefined
                urls?:
                  | {
                      url: string
                      expandedUrl: string
                      displayUrl: string
                      start?: number | undefined
                      end?: number | undefined
                    }[]
                  | undefined
                card?:
                  | {
                      url: string
                      title: string
                      description?: string | undefined
                      image?: string | undefined
                      siteName?: string | undefined
                      type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                    }
                  | undefined
                visibility?: 'public' | 'followers' | 'mentioned' | undefined
                replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                metrics: {
                  likeCount: number
                  repostCount: number
                  replyCount: number
                  quoteCount: number
                  viewCount: number
                  bookmarkCount?: number | undefined
                }
                viewer?:
                  | {
                      liked?: boolean | undefined
                      reposted?: boolean | undefined
                      bookmarked?: boolean | undefined
                    }
                  | undefined
                language?: string | undefined
                source?: string | undefined
                createdAt: string
                editedAt?: string | undefined
                editHistory?:
                  | { text?: string | undefined; editedAt?: string | undefined }[]
                  | undefined
              }
              repostedBy?:
                | {
                    id: string
                    username: string
                    displayName: string
                    avatarUrl?: string | undefined
                    isVerified?: boolean | undefined
                    isFollowing?: boolean | undefined
                    isFollowedBy?: boolean | undefined
                  }
                | undefined
              reason?: string | undefined
            }[]
            nextCursor?: string | undefined
            previousCursor?: string | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/posts/:postId/like': {
        $post:
          | {
              input: { param: { postId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { postId: string } }
              output: {
                id: string
                author: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isFollowing?: boolean | undefined
                  isFollowedBy?: boolean | undefined
                }
                text: string
                media?:
                  | {
                      id: string
                      type: 'image' | 'gif' | 'video'
                      url: string
                      previewUrl?: string | undefined
                      alt?: string | undefined
                      width?: number | undefined
                      height?: number | undefined
                      duration?: number | undefined
                      blurhash?: string | undefined
                    }[]
                  | undefined
                poll?:
                  | {
                      id: string
                      options: {
                        id: string
                        text: string
                        voteCount: number
                        percentage?: number | undefined
                      }[]
                      totalVotes: number
                      expiresAt: string
                      isExpired?: boolean | undefined
                      viewerVote?: string | undefined
                    }
                  | undefined
                quotedPost?: any | undefined
                replyTo?:
                  | {
                      postId?: string | undefined
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                            isFollowing?: boolean | undefined
                            isFollowedBy?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                repostOf?: any | undefined
                hashtags?: string[] | undefined
                mentions?:
                  | {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }[]
                  | undefined
                urls?:
                  | {
                      url: string
                      expandedUrl: string
                      displayUrl: string
                      start?: number | undefined
                      end?: number | undefined
                    }[]
                  | undefined
                card?:
                  | {
                      url: string
                      title: string
                      description?: string | undefined
                      image?: string | undefined
                      siteName?: string | undefined
                      type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                    }
                  | undefined
                visibility?: 'public' | 'followers' | 'mentioned' | undefined
                replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                metrics: {
                  likeCount: number
                  repostCount: number
                  replyCount: number
                  quoteCount: number
                  viewCount: number
                  bookmarkCount?: number | undefined
                }
                viewer?:
                  | {
                      liked?: boolean | undefined
                      reposted?: boolean | undefined
                      bookmarked?: boolean | undefined
                    }
                  | undefined
                language?: string | undefined
                source?: string | undefined
                createdAt: string
                editedAt?: string | undefined
                editHistory?:
                  | { text?: string | undefined; editedAt?: string | undefined }[]
                  | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/posts/:postId/like': {
        $delete:
          | {
              input: { param: { postId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { postId: string } }
              output: {
                id: string
                author: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isFollowing?: boolean | undefined
                  isFollowedBy?: boolean | undefined
                }
                text: string
                media?:
                  | {
                      id: string
                      type: 'image' | 'gif' | 'video'
                      url: string
                      previewUrl?: string | undefined
                      alt?: string | undefined
                      width?: number | undefined
                      height?: number | undefined
                      duration?: number | undefined
                      blurhash?: string | undefined
                    }[]
                  | undefined
                poll?:
                  | {
                      id: string
                      options: {
                        id: string
                        text: string
                        voteCount: number
                        percentage?: number | undefined
                      }[]
                      totalVotes: number
                      expiresAt: string
                      isExpired?: boolean | undefined
                      viewerVote?: string | undefined
                    }
                  | undefined
                quotedPost?: any | undefined
                replyTo?:
                  | {
                      postId?: string | undefined
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                            isFollowing?: boolean | undefined
                            isFollowedBy?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                repostOf?: any | undefined
                hashtags?: string[] | undefined
                mentions?:
                  | {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }[]
                  | undefined
                urls?:
                  | {
                      url: string
                      expandedUrl: string
                      displayUrl: string
                      start?: number | undefined
                      end?: number | undefined
                    }[]
                  | undefined
                card?:
                  | {
                      url: string
                      title: string
                      description?: string | undefined
                      image?: string | undefined
                      siteName?: string | undefined
                      type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                    }
                  | undefined
                visibility?: 'public' | 'followers' | 'mentioned' | undefined
                replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                metrics: {
                  likeCount: number
                  repostCount: number
                  replyCount: number
                  quoteCount: number
                  viewCount: number
                  bookmarkCount?: number | undefined
                }
                viewer?:
                  | {
                      liked?: boolean | undefined
                      reposted?: boolean | undefined
                      bookmarked?: boolean | undefined
                    }
                  | undefined
                language?: string | undefined
                source?: string | undefined
                createdAt: string
                editedAt?: string | undefined
                editHistory?:
                  | { text?: string | undefined; editedAt?: string | undefined }[]
                  | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/posts/:postId/repost': {
        $post:
          | {
              input: { param: { postId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { postId: string } }
              output: {
                id: string
                author: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isFollowing?: boolean | undefined
                  isFollowedBy?: boolean | undefined
                }
                text: string
                media?:
                  | {
                      id: string
                      type: 'image' | 'gif' | 'video'
                      url: string
                      previewUrl?: string | undefined
                      alt?: string | undefined
                      width?: number | undefined
                      height?: number | undefined
                      duration?: number | undefined
                      blurhash?: string | undefined
                    }[]
                  | undefined
                poll?:
                  | {
                      id: string
                      options: {
                        id: string
                        text: string
                        voteCount: number
                        percentage?: number | undefined
                      }[]
                      totalVotes: number
                      expiresAt: string
                      isExpired?: boolean | undefined
                      viewerVote?: string | undefined
                    }
                  | undefined
                quotedPost?: any | undefined
                replyTo?:
                  | {
                      postId?: string | undefined
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                            isFollowing?: boolean | undefined
                            isFollowedBy?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                repostOf?: any | undefined
                hashtags?: string[] | undefined
                mentions?:
                  | {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }[]
                  | undefined
                urls?:
                  | {
                      url: string
                      expandedUrl: string
                      displayUrl: string
                      start?: number | undefined
                      end?: number | undefined
                    }[]
                  | undefined
                card?:
                  | {
                      url: string
                      title: string
                      description?: string | undefined
                      image?: string | undefined
                      siteName?: string | undefined
                      type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                    }
                  | undefined
                visibility?: 'public' | 'followers' | 'mentioned' | undefined
                replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                metrics: {
                  likeCount: number
                  repostCount: number
                  replyCount: number
                  quoteCount: number
                  viewCount: number
                  bookmarkCount?: number | undefined
                }
                viewer?:
                  | {
                      liked?: boolean | undefined
                      reposted?: boolean | undefined
                      bookmarked?: boolean | undefined
                    }
                  | undefined
                language?: string | undefined
                source?: string | undefined
                createdAt: string
                editedAt?: string | undefined
                editHistory?:
                  | { text?: string | undefined; editedAt?: string | undefined }[]
                  | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/posts/:postId/repost': {
        $delete:
          | {
              input: { param: { postId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { postId: string } }
              output: {
                id: string
                author: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isFollowing?: boolean | undefined
                  isFollowedBy?: boolean | undefined
                }
                text: string
                media?:
                  | {
                      id: string
                      type: 'image' | 'gif' | 'video'
                      url: string
                      previewUrl?: string | undefined
                      alt?: string | undefined
                      width?: number | undefined
                      height?: number | undefined
                      duration?: number | undefined
                      blurhash?: string | undefined
                    }[]
                  | undefined
                poll?:
                  | {
                      id: string
                      options: {
                        id: string
                        text: string
                        voteCount: number
                        percentage?: number | undefined
                      }[]
                      totalVotes: number
                      expiresAt: string
                      isExpired?: boolean | undefined
                      viewerVote?: string | undefined
                    }
                  | undefined
                quotedPost?: any | undefined
                replyTo?:
                  | {
                      postId?: string | undefined
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                            isFollowing?: boolean | undefined
                            isFollowedBy?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                repostOf?: any | undefined
                hashtags?: string[] | undefined
                mentions?:
                  | {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }[]
                  | undefined
                urls?:
                  | {
                      url: string
                      expandedUrl: string
                      displayUrl: string
                      start?: number | undefined
                      end?: number | undefined
                    }[]
                  | undefined
                card?:
                  | {
                      url: string
                      title: string
                      description?: string | undefined
                      image?: string | undefined
                      siteName?: string | undefined
                      type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                    }
                  | undefined
                visibility?: 'public' | 'followers' | 'mentioned' | undefined
                replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                metrics: {
                  likeCount: number
                  repostCount: number
                  replyCount: number
                  quoteCount: number
                  viewCount: number
                  bookmarkCount?: number | undefined
                }
                viewer?:
                  | {
                      liked?: boolean | undefined
                      reposted?: boolean | undefined
                      bookmarked?: boolean | undefined
                    }
                  | undefined
                language?: string | undefined
                source?: string | undefined
                createdAt: string
                editedAt?: string | undefined
                editHistory?:
                  | { text?: string | undefined; editedAt?: string | undefined }[]
                  | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/posts/:postId/quote': {
        $post:
          | {
              input: { param: { postId: string } } & {
                json: { text: string; mediaIds?: string[] | undefined }
              }
              output: {
                id: string
                author: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isFollowing?: boolean | undefined
                  isFollowedBy?: boolean | undefined
                }
                text: string
                media?:
                  | {
                      id: string
                      type: 'image' | 'gif' | 'video'
                      url: string
                      previewUrl?: string | undefined
                      alt?: string | undefined
                      width?: number | undefined
                      height?: number | undefined
                      duration?: number | undefined
                      blurhash?: string | undefined
                    }[]
                  | undefined
                poll?:
                  | {
                      id: string
                      options: {
                        id: string
                        text: string
                        voteCount: number
                        percentage?: number | undefined
                      }[]
                      totalVotes: number
                      expiresAt: string
                      isExpired?: boolean | undefined
                      viewerVote?: string | undefined
                    }
                  | undefined
                quotedPost?: any | undefined
                replyTo?:
                  | {
                      postId?: string | undefined
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                            isFollowing?: boolean | undefined
                            isFollowedBy?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                repostOf?: any | undefined
                hashtags?: string[] | undefined
                mentions?:
                  | {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }[]
                  | undefined
                urls?:
                  | {
                      url: string
                      expandedUrl: string
                      displayUrl: string
                      start?: number | undefined
                      end?: number | undefined
                    }[]
                  | undefined
                card?:
                  | {
                      url: string
                      title: string
                      description?: string | undefined
                      image?: string | undefined
                      siteName?: string | undefined
                      type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                    }
                  | undefined
                visibility?: 'public' | 'followers' | 'mentioned' | undefined
                replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                metrics: {
                  likeCount: number
                  repostCount: number
                  replyCount: number
                  quoteCount: number
                  viewCount: number
                  bookmarkCount?: number | undefined
                }
                viewer?:
                  | {
                      liked?: boolean | undefined
                      reposted?: boolean | undefined
                      bookmarked?: boolean | undefined
                    }
                  | undefined
                language?: string | undefined
                source?: string | undefined
                createdAt: string
                editedAt?: string | undefined
                editHistory?:
                  | { text?: string | undefined; editedAt?: string | undefined }[]
                  | undefined
              }
              outputFormat: 'json'
              status: 201
            }
          | {
              input: { param: { postId: string } } & {
                json: { text: string; mediaIds?: string[] | undefined }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
      }
    } & {
      '/posts/:postId/bookmark': {
        $post:
          | {
              input: { param: { postId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | { input: { param: { postId: string } }; output: {}; outputFormat: string; status: 200 }
      }
    } & {
      '/posts/:postId/bookmark': {
        $delete:
          | {
              input: { param: { postId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | { input: { param: { postId: string } }; output: {}; outputFormat: string; status: 200 }
      }
    } & {
      '/bookmarks': {
        $get:
          | {
              input: { query: { cursor?: string | undefined; limit?: number | undefined } }
              output: {
                data: {
                  id: string
                  author: {
                    id: string
                    username: string
                    displayName: string
                    avatarUrl?: string | undefined
                    isVerified?: boolean | undefined
                    isFollowing?: boolean | undefined
                    isFollowedBy?: boolean | undefined
                  }
                  text: string
                  media?:
                    | {
                        id: string
                        type: 'image' | 'gif' | 'video'
                        url: string
                        previewUrl?: string | undefined
                        alt?: string | undefined
                        width?: number | undefined
                        height?: number | undefined
                        duration?: number | undefined
                        blurhash?: string | undefined
                      }[]
                    | undefined
                  poll?:
                    | {
                        id: string
                        options: {
                          id: string
                          text: string
                          voteCount: number
                          percentage?: number | undefined
                        }[]
                        totalVotes: number
                        expiresAt: string
                        isExpired?: boolean | undefined
                        viewerVote?: string | undefined
                      }
                    | undefined
                  quotedPost?: any | undefined
                  replyTo?:
                    | {
                        postId?: string | undefined
                        author?:
                          | {
                              id: string
                              username: string
                              displayName: string
                              avatarUrl?: string | undefined
                              isVerified?: boolean | undefined
                              isFollowing?: boolean | undefined
                              isFollowedBy?: boolean | undefined
                            }
                          | undefined
                      }
                    | undefined
                  repostOf?: any | undefined
                  hashtags?: string[] | undefined
                  mentions?:
                    | {
                        id: string
                        username: string
                        displayName: string
                        avatarUrl?: string | undefined
                        isVerified?: boolean | undefined
                        isFollowing?: boolean | undefined
                        isFollowedBy?: boolean | undefined
                      }[]
                    | undefined
                  urls?:
                    | {
                        url: string
                        expandedUrl: string
                        displayUrl: string
                        start?: number | undefined
                        end?: number | undefined
                      }[]
                    | undefined
                  card?:
                    | {
                        url: string
                        title: string
                        description?: string | undefined
                        image?: string | undefined
                        siteName?: string | undefined
                        type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                      }
                    | undefined
                  visibility?: 'public' | 'followers' | 'mentioned' | undefined
                  replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                  metrics: {
                    likeCount: number
                    repostCount: number
                    replyCount: number
                    quoteCount: number
                    viewCount: number
                    bookmarkCount?: number | undefined
                  }
                  viewer?:
                    | {
                        liked?: boolean | undefined
                        reposted?: boolean | undefined
                        bookmarked?: boolean | undefined
                      }
                    | undefined
                  language?: string | undefined
                  source?: string | undefined
                  createdAt: string
                  editedAt?: string | undefined
                  editHistory?:
                    | { text?: string | undefined; editedAt?: string | undefined }[]
                    | undefined
                }[]
                nextCursor?: string | undefined
                previousCursor?: string | undefined
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
      '/posts/:postId/likes': {
        $get: {
          input: { param: { postId: string } } & {
            query: { cursor?: string | undefined; limit?: number | undefined }
          }
          output: {
            data: {
              id: string
              username: string
              displayName: string
              avatarUrl?: string | undefined
              isVerified?: boolean | undefined
              isFollowing?: boolean | undefined
              isFollowedBy?: boolean | undefined
            }[]
            nextCursor?: string | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/posts/:postId/reposts': {
        $get: {
          input: { param: { postId: string } } & {
            query: { cursor?: string | undefined; limit?: number | undefined }
          }
          output: {
            data: {
              id: string
              username: string
              displayName: string
              avatarUrl?: string | undefined
              isVerified?: boolean | undefined
              isFollowing?: boolean | undefined
              isFollowedBy?: boolean | undefined
            }[]
            nextCursor?: string | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/posts/:postId/quotes': {
        $get: {
          input: { param: { postId: string } } & {
            query: { cursor?: string | undefined; limit?: number | undefined }
          }
          output: {
            data: {
              id: string
              author: {
                id: string
                username: string
                displayName: string
                avatarUrl?: string | undefined
                isVerified?: boolean | undefined
                isFollowing?: boolean | undefined
                isFollowedBy?: boolean | undefined
              }
              text: string
              media?:
                | {
                    id: string
                    type: 'image' | 'gif' | 'video'
                    url: string
                    previewUrl?: string | undefined
                    alt?: string | undefined
                    width?: number | undefined
                    height?: number | undefined
                    duration?: number | undefined
                    blurhash?: string | undefined
                  }[]
                | undefined
              poll?:
                | {
                    id: string
                    options: {
                      id: string
                      text: string
                      voteCount: number
                      percentage?: number | undefined
                    }[]
                    totalVotes: number
                    expiresAt: string
                    isExpired?: boolean | undefined
                    viewerVote?: string | undefined
                  }
                | undefined
              quotedPost?: any | undefined
              replyTo?:
                | {
                    postId?: string | undefined
                    author?:
                      | {
                          id: string
                          username: string
                          displayName: string
                          avatarUrl?: string | undefined
                          isVerified?: boolean | undefined
                          isFollowing?: boolean | undefined
                          isFollowedBy?: boolean | undefined
                        }
                      | undefined
                  }
                | undefined
              repostOf?: any | undefined
              hashtags?: string[] | undefined
              mentions?:
                | {
                    id: string
                    username: string
                    displayName: string
                    avatarUrl?: string | undefined
                    isVerified?: boolean | undefined
                    isFollowing?: boolean | undefined
                    isFollowedBy?: boolean | undefined
                  }[]
                | undefined
              urls?:
                | {
                    url: string
                    expandedUrl: string
                    displayUrl: string
                    start?: number | undefined
                    end?: number | undefined
                  }[]
                | undefined
              card?:
                | {
                    url: string
                    title: string
                    description?: string | undefined
                    image?: string | undefined
                    siteName?: string | undefined
                    type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                  }
                | undefined
              visibility?: 'public' | 'followers' | 'mentioned' | undefined
              replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
              metrics: {
                likeCount: number
                repostCount: number
                replyCount: number
                quoteCount: number
                viewCount: number
                bookmarkCount?: number | undefined
              }
              viewer?:
                | {
                    liked?: boolean | undefined
                    reposted?: boolean | undefined
                    bookmarked?: boolean | undefined
                  }
                | undefined
              language?: string | undefined
              source?: string | undefined
              createdAt: string
              editedAt?: string | undefined
              editHistory?:
                | { text?: string | undefined; editedAt?: string | undefined }[]
                | undefined
            }[]
            nextCursor?: string | undefined
            previousCursor?: string | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/posts/:postId/replies': {
        $get: {
          input: { param: { postId: string } } & {
            query: {
              cursor?: string | undefined
              limit?: number | undefined
              sort?: 'recent' | 'popular' | 'relevant' | undefined
            }
          }
          output: {
            data: {
              id: string
              author: {
                id: string
                username: string
                displayName: string
                avatarUrl?: string | undefined
                isVerified?: boolean | undefined
                isFollowing?: boolean | undefined
                isFollowedBy?: boolean | undefined
              }
              text: string
              media?:
                | {
                    id: string
                    type: 'image' | 'gif' | 'video'
                    url: string
                    previewUrl?: string | undefined
                    alt?: string | undefined
                    width?: number | undefined
                    height?: number | undefined
                    duration?: number | undefined
                    blurhash?: string | undefined
                  }[]
                | undefined
              poll?:
                | {
                    id: string
                    options: {
                      id: string
                      text: string
                      voteCount: number
                      percentage?: number | undefined
                    }[]
                    totalVotes: number
                    expiresAt: string
                    isExpired?: boolean | undefined
                    viewerVote?: string | undefined
                  }
                | undefined
              quotedPost?: any | undefined
              replyTo?:
                | {
                    postId?: string | undefined
                    author?:
                      | {
                          id: string
                          username: string
                          displayName: string
                          avatarUrl?: string | undefined
                          isVerified?: boolean | undefined
                          isFollowing?: boolean | undefined
                          isFollowedBy?: boolean | undefined
                        }
                      | undefined
                  }
                | undefined
              repostOf?: any | undefined
              hashtags?: string[] | undefined
              mentions?:
                | {
                    id: string
                    username: string
                    displayName: string
                    avatarUrl?: string | undefined
                    isVerified?: boolean | undefined
                    isFollowing?: boolean | undefined
                    isFollowedBy?: boolean | undefined
                  }[]
                | undefined
              urls?:
                | {
                    url: string
                    expandedUrl: string
                    displayUrl: string
                    start?: number | undefined
                    end?: number | undefined
                  }[]
                | undefined
              card?:
                | {
                    url: string
                    title: string
                    description?: string | undefined
                    image?: string | undefined
                    siteName?: string | undefined
                    type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                  }
                | undefined
              visibility?: 'public' | 'followers' | 'mentioned' | undefined
              replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
              metrics: {
                likeCount: number
                repostCount: number
                replyCount: number
                quoteCount: number
                viewCount: number
                bookmarkCount?: number | undefined
              }
              viewer?:
                | {
                    liked?: boolean | undefined
                    reposted?: boolean | undefined
                    bookmarked?: boolean | undefined
                  }
                | undefined
              language?: string | undefined
              source?: string | undefined
              createdAt: string
              editedAt?: string | undefined
              editHistory?:
                | { text?: string | undefined; editedAt?: string | undefined }[]
                | undefined
            }[]
            nextCursor?: string | undefined
            previousCursor?: string | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/posts/:postId/replies': {
        $post:
          | {
              input: { param: { postId: string } } & {
                json: {
                  text: string
                  mediaIds?: string[] | undefined
                  poll?: { options: string[]; duration: number } | undefined
                  visibility?: 'public' | 'followers' | 'mentioned' | undefined
                  replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                  quotedPostId?: string | undefined
                }
              }
              output: {
                id: string
                author: {
                  id: string
                  username: string
                  displayName: string
                  avatarUrl?: string | undefined
                  isVerified?: boolean | undefined
                  isFollowing?: boolean | undefined
                  isFollowedBy?: boolean | undefined
                }
                text: string
                media?:
                  | {
                      id: string
                      type: 'image' | 'gif' | 'video'
                      url: string
                      previewUrl?: string | undefined
                      alt?: string | undefined
                      width?: number | undefined
                      height?: number | undefined
                      duration?: number | undefined
                      blurhash?: string | undefined
                    }[]
                  | undefined
                poll?:
                  | {
                      id: string
                      options: {
                        id: string
                        text: string
                        voteCount: number
                        percentage?: number | undefined
                      }[]
                      totalVotes: number
                      expiresAt: string
                      isExpired?: boolean | undefined
                      viewerVote?: string | undefined
                    }
                  | undefined
                quotedPost?: any | undefined
                replyTo?:
                  | {
                      postId?: string | undefined
                      author?:
                        | {
                            id: string
                            username: string
                            displayName: string
                            avatarUrl?: string | undefined
                            isVerified?: boolean | undefined
                            isFollowing?: boolean | undefined
                            isFollowedBy?: boolean | undefined
                          }
                        | undefined
                    }
                  | undefined
                repostOf?: any | undefined
                hashtags?: string[] | undefined
                mentions?:
                  | {
                      id: string
                      username: string
                      displayName: string
                      avatarUrl?: string | undefined
                      isVerified?: boolean | undefined
                      isFollowing?: boolean | undefined
                      isFollowedBy?: boolean | undefined
                    }[]
                  | undefined
                urls?:
                  | {
                      url: string
                      expandedUrl: string
                      displayUrl: string
                      start?: number | undefined
                      end?: number | undefined
                    }[]
                  | undefined
                card?:
                  | {
                      url: string
                      title: string
                      description?: string | undefined
                      image?: string | undefined
                      siteName?: string | undefined
                      type?: 'video' | 'link' | 'photo' | 'rich' | undefined
                    }
                  | undefined
                visibility?: 'public' | 'followers' | 'mentioned' | undefined
                replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                metrics: {
                  likeCount: number
                  repostCount: number
                  replyCount: number
                  quoteCount: number
                  viewCount: number
                  bookmarkCount?: number | undefined
                }
                viewer?:
                  | {
                      liked?: boolean | undefined
                      reposted?: boolean | undefined
                      bookmarked?: boolean | undefined
                    }
                  | undefined
                language?: string | undefined
                source?: string | undefined
                createdAt: string
                editedAt?: string | undefined
                editHistory?:
                  | { text?: string | undefined; editedAt?: string | undefined }[]
                  | undefined
              }
              outputFormat: 'json'
              status: 201
            }
          | {
              input: { param: { postId: string } } & {
                json: {
                  text: string
                  mediaIds?: string[] | undefined
                  poll?: { options: string[]; duration: number } | undefined
                  visibility?: 'public' | 'followers' | 'mentioned' | undefined
                  replySettings?: 'followers' | 'mentioned' | 'everyone' | undefined
                  quotedPostId?: string | undefined
                }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
      }
    } & {
      '/media/upload': {
        $post:
          | {
              input: { form: { file: File; alt?: string | undefined } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 400
            }
          | {
              input: { form: { file: File; alt?: string | undefined } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { form: { file: File; alt?: string | undefined } }
              output: {
                id: string
                type: 'image' | 'gif' | 'video'
                url: string
                previewUrl?: string | undefined
                alt?: string | undefined
                width?: number | undefined
                height?: number | undefined
                duration?: number | undefined
                blurhash?: string | undefined
              }
              outputFormat: 'json'
              status: 201
            }
          | {
              input: { form: { file: File; alt?: string | undefined } }
              output: {}
              outputFormat: string
              status: 413
            }
      }
    } & {
      '/media/:mediaId': {
        $get:
          | {
              input: { param: { mediaId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 404
            }
          | {
              input: { param: { mediaId: string } }
              output: {
                id: string
                type: 'image' | 'gif' | 'video'
                url: string
                previewUrl?: string | undefined
                alt?: string | undefined
                width?: number | undefined
                height?: number | undefined
                duration?: number | undefined
                blurhash?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/media/:mediaId': {
        $patch:
          | {
              input: { param: { mediaId: string } } & { json: { alt?: string | undefined } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { mediaId: string } } & { json: { alt?: string | undefined } }
              output: {
                id: string
                type: 'image' | 'gif' | 'video'
                url: string
                previewUrl?: string | undefined
                alt?: string | undefined
                width?: number | undefined
                height?: number | undefined
                duration?: number | undefined
                blurhash?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    }
  >,
  '/'
>
export default routes
