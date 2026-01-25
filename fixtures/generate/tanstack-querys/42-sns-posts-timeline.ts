import { useQuery, useMutation } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/42-sns-posts-timeline'

/**
 * GET /posts
 *
 * 投稿一覧取得
 *
 * 公開投稿の一覧を取得（検索・フィルタ用）
 */
export function useGetPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<typeof client.posts.$get>,
      ) => InferResponseType<typeof client.posts.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsQueryKey(args),
    queryFn: async () => parseResponse(client.posts.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /posts
 */
export function getGetPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['/posts', args] as const
}

/**
 * POST /posts
 *
 * 投稿作成
 */
export function usePostPosts(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.posts.$post>,
      variables: InferRequestType<typeof client.posts.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.posts.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.posts.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.posts.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.posts.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.posts.$post>) =>
      parseResponse(client.posts.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /posts/{postId}
 *
 * 投稿詳細取得
 */
export function useGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.posts)[':postId']['$get']>,
      ) => InferResponseType<(typeof client.posts)[':postId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdQueryKey(args),
    queryFn: async () => parseResponse(client.posts[':postId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/{postId}
 */
export function getGetPostsPostIdQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return ['/posts/:postId', args] as const
}

/**
 * DELETE /posts/{postId}
 *
 * 投稿削除
 */
export function useDeletePostsPostId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.posts)[':postId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.posts)[':postId']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['$delete']>) =>
      parseResponse(client.posts[':postId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /posts/{postId}/thread
 *
 * スレッド取得
 *
 * 投稿とその返信スレッドを取得
 */
export function useGetPostsPostIdThread(
  args: InferRequestType<(typeof client.posts)[':postId']['thread']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.posts)[':postId']['thread']['$get']>,
      ) => InferResponseType<(typeof client.posts)[':postId']['thread']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdThreadQueryKey(args),
    queryFn: async () => parseResponse(client.posts[':postId'].thread.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/{postId}/thread
 */
export function getGetPostsPostIdThreadQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['thread']['$get']>,
) {
  return ['/posts/:postId/thread', args] as const
}

/**
 * GET /posts/{postId}/context
 *
 * 投稿コンテキスト取得
 *
 * 親投稿と返信を含むコンテキストを取得
 */
export function useGetPostsPostIdContext(
  args: InferRequestType<(typeof client.posts)[':postId']['context']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.posts)[':postId']['context']['$get']>,
      ) => InferResponseType<(typeof client.posts)[':postId']['context']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdContextQueryKey(args),
    queryFn: async () => parseResponse(client.posts[':postId'].context.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/{postId}/context
 */
export function getGetPostsPostIdContextQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['context']['$get']>,
) {
  return ['/posts/:postId/context', args] as const
}

/**
 * GET /timeline/home
 *
 * ホームタイムライン取得
 *
 * フォローしているユーザーの投稿を時系列で取得
 */
export function useGetTimelineHome(
  args: InferRequestType<typeof client.timeline.home.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<typeof client.timeline.home.$get>,
      ) => InferResponseType<typeof client.timeline.home.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTimelineHomeQueryKey(args),
    queryFn: async () => parseResponse(client.timeline.home.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /timeline/home
 */
export function getGetTimelineHomeQueryKey(
  args: InferRequestType<typeof client.timeline.home.$get>,
) {
  return ['/timeline/home', args] as const
}

/**
 * GET /timeline/for-you
 *
 * おすすめタイムライン取得
 *
 * アルゴリズムによるおすすめ投稿
 */
export function useGetTimelineForYou(
  args: InferRequestType<(typeof client.timeline)['for-you']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.timeline)['for-you']['$get']>,
      ) => InferResponseType<(typeof client.timeline)['for-you']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTimelineForYouQueryKey(args),
    queryFn: async () => parseResponse(client.timeline['for-you'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /timeline/for-you
 */
export function getGetTimelineForYouQueryKey(
  args: InferRequestType<(typeof client.timeline)['for-you']['$get']>,
) {
  return ['/timeline/for-you', args] as const
}

/**
 * GET /timeline/user/{userId}
 *
 * ユーザータイムライン取得
 */
export function useGetTimelineUserUserId(
  args: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.timeline.user)[':userId']['$get']>,
      ) => InferResponseType<(typeof client.timeline.user)[':userId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTimelineUserUserIdQueryKey(args),
    queryFn: async () => parseResponse(client.timeline.user[':userId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /timeline/user/{userId}
 */
export function getGetTimelineUserUserIdQueryKey(
  args: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
) {
  return ['/timeline/user/:userId', args] as const
}

/**
 * GET /timeline/hashtag/{hashtag}
 *
 * ハッシュタグタイムライン取得
 */
export function useGetTimelineHashtagHashtag(
  args: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
      ) => InferResponseType<(typeof client.timeline.hashtag)[':hashtag']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTimelineHashtagHashtagQueryKey(args),
    queryFn: async () =>
      parseResponse(client.timeline.hashtag[':hashtag'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /timeline/hashtag/{hashtag}
 */
export function getGetTimelineHashtagHashtagQueryKey(
  args: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
) {
  return ['/timeline/hashtag/:hashtag', args] as const
}

/**
 * POST /posts/{postId}/like
 *
 * いいね
 */
export function usePostPostsPostIdLike(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['like']['$post']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['like']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['like']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['like']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['like']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.posts)[':postId']['like']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['like']['$post']>) =>
      parseResponse(client.posts[':postId'].like.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export function useDeletePostsPostIdLike(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['like']['$delete']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['like']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>,
    ) => parseResponse(client.posts[':postId'].like.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export function usePostPostsPostIdRepost(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['repost']['$post']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['repost']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>,
    ) => parseResponse(client.posts[':postId'].repost.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export function useDeletePostsPostIdRepost(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['repost']['$delete']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['repost']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>,
    ) => parseResponse(client.posts[':postId'].repost.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export function usePostPostsPostIdQuote(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['quote']['$post']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['quote']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>,
    ) => parseResponse(client.posts[':postId'].quote.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export function usePostPostsPostIdBookmark(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['bookmark']['$post']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['bookmark']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>,
    ) => parseResponse(client.posts[':postId'].bookmark.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export function useDeletePostsPostIdBookmark(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['bookmark']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
    ) => parseResponse(client.posts[':postId'].bookmark.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /bookmarks
 *
 * ブックマーク一覧取得
 */
export function useGetBookmarks(
  args: InferRequestType<typeof client.bookmarks.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<typeof client.bookmarks.$get>,
      ) => InferResponseType<typeof client.bookmarks.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetBookmarksQueryKey(args),
    queryFn: async () => parseResponse(client.bookmarks.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /bookmarks
 */
export function getGetBookmarksQueryKey(args: InferRequestType<typeof client.bookmarks.$get>) {
  return ['/bookmarks', args] as const
}

/**
 * GET /posts/{postId}/likes
 *
 * いいねしたユーザー一覧
 */
export function useGetPostsPostIdLikes(
  args: InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.posts)[':postId']['likes']['$get']>,
      ) => InferResponseType<(typeof client.posts)[':postId']['likes']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdLikesQueryKey(args),
    queryFn: async () => parseResponse(client.posts[':postId'].likes.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/{postId}/likes
 */
export function getGetPostsPostIdLikesQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
) {
  return ['/posts/:postId/likes', args] as const
}

/**
 * GET /posts/{postId}/reposts
 *
 * リポストしたユーザー一覧
 */
export function useGetPostsPostIdReposts(
  args: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.posts)[':postId']['reposts']['$get']>,
      ) => InferResponseType<(typeof client.posts)[':postId']['reposts']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdRepostsQueryKey(args),
    queryFn: async () => parseResponse(client.posts[':postId'].reposts.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/{postId}/reposts
 */
export function getGetPostsPostIdRepostsQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
) {
  return ['/posts/:postId/reposts', args] as const
}

/**
 * GET /posts/{postId}/quotes
 *
 * 引用投稿一覧
 */
export function useGetPostsPostIdQuotes(
  args: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.posts)[':postId']['quotes']['$get']>,
      ) => InferResponseType<(typeof client.posts)[':postId']['quotes']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdQuotesQueryKey(args),
    queryFn: async () => parseResponse(client.posts[':postId'].quotes.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/{postId}/quotes
 */
export function getGetPostsPostIdQuotesQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
) {
  return ['/posts/:postId/quotes', args] as const
}

/**
 * GET /posts/{postId}/replies
 *
 * 返信一覧取得
 */
export function useGetPostsPostIdReplies(
  args: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.posts)[':postId']['replies']['$get']>,
      ) => InferResponseType<(typeof client.posts)[':postId']['replies']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdRepliesQueryKey(args),
    queryFn: async () => parseResponse(client.posts[':postId'].replies.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/{postId}/replies
 */
export function getGetPostsPostIdRepliesQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
) {
  return ['/posts/:postId/replies', args] as const
}

/**
 * POST /posts/{postId}/replies
 *
 * 返信投稿
 */
export function usePostPostsPostIdReplies(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['replies']['$post']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['replies']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>,
    ) => parseResponse(client.posts[':postId'].replies.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export function usePostMediaUpload(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.media.upload.$post>,
      variables: InferRequestType<typeof client.media.upload.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.media.upload.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.media.upload.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.media.upload.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.media.upload.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.media.upload.$post>) =>
      parseResponse(client.media.upload.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /media/{mediaId}
 *
 * メディア情報取得
 */
export function useGetMediaMediaId(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.media)[':mediaId']['$get']>,
      ) => InferResponseType<(typeof client.media)[':mediaId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMediaMediaIdQueryKey(args),
    queryFn: async () => parseResponse(client.media[':mediaId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /media/{mediaId}
 */
export function getGetMediaMediaIdQueryKey(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
) {
  return ['/media/:mediaId', args] as const
}

/**
 * PATCH /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePatchMediaMediaId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.media)[':mediaId']['$patch']>,
      variables: InferRequestType<(typeof client.media)[':mediaId']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.media)[':mediaId']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.media)[':mediaId']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.media)[':mediaId']['$patch']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.media)[':mediaId']['$patch']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.media)[':mediaId']['$patch']>) =>
      parseResponse(client.media[':mediaId'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}
