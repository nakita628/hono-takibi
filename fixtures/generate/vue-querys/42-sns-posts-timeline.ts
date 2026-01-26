import { queryOptions, useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
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
      placeholderData?:
        | InferResponseType<typeof client.posts.$get>
        | (() => InferResponseType<typeof client.posts.$get>)
      initialData?:
        | InferResponseType<typeof client.posts.$get>
        | (() => InferResponseType<typeof client.posts.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.posts.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /posts
 */
export function getGetPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['/posts', args] as const
}

/**
 * Returns Vue Query query options for GET /posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsQueryOptions = (
  args: InferRequestType<typeof client.posts.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<(typeof client.posts)[':postId']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.posts)[':postId']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.posts[':postId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}
 */
export function getGetPostsPostIdQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return ['/posts/:postId', args] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsPostIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts[':postId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<(typeof client.posts)[':postId']['thread']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['thread']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.posts)[':postId']['thread']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['thread']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdThreadQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.posts[':postId'].thread.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/thread
 */
export function getGetPostsPostIdThreadQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['thread']['$get']>,
) {
  return ['/posts/:postId/thread', args] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/thread
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdThreadQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['thread']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsPostIdThreadQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts[':postId'].thread.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<(typeof client.posts)[':postId']['context']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['context']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.posts)[':postId']['context']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['context']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdContextQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.posts[':postId'].context.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/context
 */
export function getGetPostsPostIdContextQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['context']['$get']>,
) {
  return ['/posts/:postId/context', args] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/context
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdContextQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['context']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsPostIdContextQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts[':postId'].context.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<typeof client.timeline.home.$get>
        | (() => InferResponseType<typeof client.timeline.home.$get>)
      initialData?:
        | InferResponseType<typeof client.timeline.home.$get>
        | (() => InferResponseType<typeof client.timeline.home.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTimelineHomeQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.timeline.home.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /timeline/home
 */
export function getGetTimelineHomeQueryKey(
  args: InferRequestType<typeof client.timeline.home.$get>,
) {
  return ['/timeline/home', args] as const
}

/**
 * Returns Vue Query query options for GET /timeline/home
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTimelineHomeQueryOptions = (
  args: InferRequestType<typeof client.timeline.home.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTimelineHomeQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.timeline.home.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<(typeof client.timeline)['for-you']['$get']>
        | (() => InferResponseType<(typeof client.timeline)['for-you']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.timeline)['for-you']['$get']>
        | (() => InferResponseType<(typeof client.timeline)['for-you']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTimelineForYouQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.timeline['for-you'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /timeline/for-you
 */
export function getGetTimelineForYouQueryKey(
  args: InferRequestType<(typeof client.timeline)['for-you']['$get']>,
) {
  return ['/timeline/for-you', args] as const
}

/**
 * Returns Vue Query query options for GET /timeline/for-you
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTimelineForYouQueryOptions = (
  args: InferRequestType<(typeof client.timeline)['for-you']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTimelineForYouQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.timeline['for-you'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<(typeof client.timeline.user)[':userId']['$get']>
        | (() => InferResponseType<(typeof client.timeline.user)[':userId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.timeline.user)[':userId']['$get']>
        | (() => InferResponseType<(typeof client.timeline.user)[':userId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTimelineUserUserIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.timeline.user[':userId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /timeline/user/{userId}
 */
export function getGetTimelineUserUserIdQueryKey(
  args: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
) {
  return ['/timeline/user/:userId', args] as const
}

/**
 * Returns Vue Query query options for GET /timeline/user/{userId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTimelineUserUserIdQueryOptions = (
  args: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTimelineUserUserIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.timeline.user[':userId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<(typeof client.timeline.hashtag)[':hashtag']['$get']>
        | (() => InferResponseType<(typeof client.timeline.hashtag)[':hashtag']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.timeline.hashtag)[':hashtag']['$get']>
        | (() => InferResponseType<(typeof client.timeline.hashtag)[':hashtag']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTimelineHashtagHashtagQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.timeline.hashtag[':hashtag'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /timeline/hashtag/{hashtag}
 */
export function getGetTimelineHashtagHashtagQueryKey(
  args: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
) {
  return ['/timeline/hashtag/:hashtag', args] as const
}

/**
 * Returns Vue Query query options for GET /timeline/hashtag/{hashtag}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTimelineHashtagHashtagQueryOptions = (
  args: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTimelineHashtagHashtagQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.timeline.hashtag[':hashtag'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<typeof client.bookmarks.$get>
        | (() => InferResponseType<typeof client.bookmarks.$get>)
      initialData?:
        | InferResponseType<typeof client.bookmarks.$get>
        | (() => InferResponseType<typeof client.bookmarks.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetBookmarksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.bookmarks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /bookmarks
 */
export function getGetBookmarksQueryKey(args: InferRequestType<typeof client.bookmarks.$get>) {
  return ['/bookmarks', args] as const
}

/**
 * Returns Vue Query query options for GET /bookmarks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBookmarksQueryOptions = (
  args: InferRequestType<typeof client.bookmarks.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetBookmarksQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.bookmarks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<(typeof client.posts)[':postId']['likes']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['likes']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.posts)[':postId']['likes']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['likes']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdLikesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.posts[':postId'].likes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/likes
 */
export function getGetPostsPostIdLikesQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
) {
  return ['/posts/:postId/likes', args] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/likes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdLikesQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsPostIdLikesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts[':postId'].likes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<(typeof client.posts)[':postId']['reposts']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['reposts']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.posts)[':postId']['reposts']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['reposts']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdRepostsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.posts[':postId'].reposts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/reposts
 */
export function getGetPostsPostIdRepostsQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
) {
  return ['/posts/:postId/reposts', args] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/reposts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdRepostsQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsPostIdRepostsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts[':postId'].reposts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<(typeof client.posts)[':postId']['quotes']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['quotes']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.posts)[':postId']['quotes']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['quotes']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdQuotesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.posts[':postId'].quotes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/quotes
 */
export function getGetPostsPostIdQuotesQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
) {
  return ['/posts/:postId/quotes', args] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/quotes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdQuotesQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsPostIdQuotesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts[':postId'].quotes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<(typeof client.posts)[':postId']['replies']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['replies']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.posts)[':postId']['replies']['$get']>
        | (() => InferResponseType<(typeof client.posts)[':postId']['replies']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPostsPostIdRepliesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.posts[':postId'].replies.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/replies
 */
export function getGetPostsPostIdRepliesQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
) {
  return ['/posts/:postId/replies', args] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/replies
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdRepliesQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsPostIdRepliesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts[':postId'].replies.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      placeholderData?:
        | InferResponseType<(typeof client.media)[':mediaId']['$get']>
        | (() => InferResponseType<(typeof client.media)[':mediaId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.media)[':mediaId']['$get']>
        | (() => InferResponseType<(typeof client.media)[':mediaId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMediaMediaIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.media[':mediaId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /media/{mediaId}
 */
export function getGetMediaMediaIdQueryKey(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
) {
  return ['/media/:mediaId', args] as const
}

/**
 * Returns Vue Query query options for GET /media/{mediaId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMediaMediaIdQueryOptions = (
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMediaMediaIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.media[':mediaId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
