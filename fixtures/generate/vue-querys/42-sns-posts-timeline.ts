import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/42-sns-posts-timeline'

/**
 * Generates Vue Query cache key for GET /posts
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsQueryKey(args: MaybeRef<InferRequestType<typeof client.posts.$get>>) {
  return ['posts', 'GET', '/posts', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsQueryOptions = (
  args: InferRequestType<typeof client.posts.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPostsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.posts.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /posts
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsMutationKey() {
  return ['posts', 'POST', '/posts'] as const
}

/**
 * Returns Vue Query mutation options for POST /posts
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPostsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPostsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.posts.$post>) =>
    parseResponse(client.posts.$post(args, clientOptions)),
})

/**
 * POST /posts
 *
 * 投稿作成
 */
export function usePostPosts(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$post>>>>>,
        Error,
        InferRequestType<typeof client.posts.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostPostsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsPostIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.posts)[':postId']['$get']>>,
) {
  return ['posts', 'GET', '/posts/:postId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPostsPostIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.posts[':postId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /posts/{postId}
 *
 * 投稿詳細取得
 */
export function useGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':postId']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsPostIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /posts/{postId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePostsPostIdMutationKey() {
  return ['posts', 'DELETE', '/posts/:postId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /posts/{postId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeletePostsPostIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeletePostsPostIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['$delete']>) =>
    parseResponse(client.posts[':postId'].$delete(args, clientOptions)),
})

/**
 * DELETE /posts/{postId}
 *
 * 投稿削除
 */
export function useDeletePostsPostId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':postId']['$delete']>>>
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.posts)[':postId']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeletePostsPostIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/thread
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsPostIdThreadQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.posts)[':postId']['thread']['$get']>>,
) {
  return ['posts', 'GET', '/posts/:postId/thread', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/thread
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdThreadQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['thread']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPostsPostIdThreadQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.posts[':postId'].thread.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.posts)[':postId']['thread']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsPostIdThreadQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/context
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsPostIdContextQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.posts)[':postId']['context']['$get']>>,
) {
  return ['posts', 'GET', '/posts/:postId/context', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/context
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdContextQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['context']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPostsPostIdContextQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.posts[':postId'].context.$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.posts)[':postId']['context']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsPostIdContextQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /timeline/home
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTimelineHomeQueryKey(
  args: MaybeRef<InferRequestType<typeof client.timeline.home.$get>>,
) {
  return ['timeline', 'GET', '/timeline/home', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /timeline/home
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTimelineHomeQueryOptions = (
  args: InferRequestType<typeof client.timeline.home.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTimelineHomeQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.timeline.home.$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.timeline.home.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTimelineHomeQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /timeline/for-you
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTimelineForYouQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.timeline)['for-you']['$get']>>,
) {
  return ['timeline', 'GET', '/timeline/for-you', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /timeline/for-you
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTimelineForYouQueryOptions = (
  args: InferRequestType<(typeof client.timeline)['for-you']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTimelineForYouQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.timeline['for-you'].$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.timeline)['for-you']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTimelineForYouQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /timeline/user/{userId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTimelineUserUserIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.timeline.user)[':userId']['$get']>>,
) {
  return ['timeline', 'GET', '/timeline/user/:userId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /timeline/user/{userId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTimelineUserUserIdQueryOptions = (
  args: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTimelineUserUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.timeline.user[':userId'].$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.timeline.user)[':userId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTimelineUserUserIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /timeline/hashtag/{hashtag}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTimelineHashtagHashtagQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>>,
) {
  return ['timeline', 'GET', '/timeline/hashtag/:hashtag', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /timeline/hashtag/{hashtag}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTimelineHashtagHashtagQueryOptions = (
  args: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTimelineHashtagHashtagQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.timeline.hashtag[':hashtag'].$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.timeline.hashtag)[':hashtag']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTimelineHashtagHashtagQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /posts/{postId}/like
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsPostIdLikeMutationKey() {
  return ['posts', 'POST', '/posts/:postId/like'] as const
}

/**
 * Returns Vue Query mutation options for POST /posts/{postId}/like
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPostsPostIdLikeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPostsPostIdLikeMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['like']['$post']>) =>
    parseResponse(client.posts[':postId'].like.$post(args, clientOptions)),
})

/**
 * POST /posts/{postId}/like
 *
 * いいね
 */
export function usePostPostsPostIdLike(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.posts)[':postId']['like']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.posts)[':postId']['like']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPostsPostIdLikeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /posts/{postId}/like
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePostsPostIdLikeMutationKey() {
  return ['posts', 'DELETE', '/posts/:postId/like'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /posts/{postId}/like
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeletePostsPostIdLikeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeletePostsPostIdLikeMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>) =>
    parseResponse(client.posts[':postId'].like.$delete(args, clientOptions)),
})

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export function useDeletePostsPostIdLike(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.posts)[':postId']['like']['$delete']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeletePostsPostIdLikeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /posts/{postId}/repost
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsPostIdRepostMutationKey() {
  return ['posts', 'POST', '/posts/:postId/repost'] as const
}

/**
 * Returns Vue Query mutation options for POST /posts/{postId}/repost
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPostsPostIdRepostMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPostsPostIdRepostMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>) =>
    parseResponse(client.posts[':postId'].repost.$post(args, clientOptions)),
})

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export function usePostPostsPostIdRepost(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.posts)[':postId']['repost']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPostsPostIdRepostMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /posts/{postId}/repost
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePostsPostIdRepostMutationKey() {
  return ['posts', 'DELETE', '/posts/:postId/repost'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /posts/{postId}/repost
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeletePostsPostIdRepostMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeletePostsPostIdRepostMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>,
  ) => parseResponse(client.posts[':postId'].repost.$delete(args, clientOptions)),
})

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export function useDeletePostsPostIdRepost(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.posts)[':postId']['repost']['$delete']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeletePostsPostIdRepostMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /posts/{postId}/quote
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsPostIdQuoteMutationKey() {
  return ['posts', 'POST', '/posts/:postId/quote'] as const
}

/**
 * Returns Vue Query mutation options for POST /posts/{postId}/quote
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPostsPostIdQuoteMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPostsPostIdQuoteMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>) =>
    parseResponse(client.posts[':postId'].quote.$post(args, clientOptions)),
})

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export function usePostPostsPostIdQuote(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.posts)[':postId']['quote']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPostsPostIdQuoteMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /posts/{postId}/bookmark
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsPostIdBookmarkMutationKey() {
  return ['posts', 'POST', '/posts/:postId/bookmark'] as const
}

/**
 * Returns Vue Query mutation options for POST /posts/{postId}/bookmark
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPostsPostIdBookmarkMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostPostsPostIdBookmarkMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>,
  ) => parseResponse(client.posts[':postId'].bookmark.$post(args, clientOptions)),
})

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export function usePostPostsPostIdBookmark(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.posts)[':postId']['bookmark']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPostsPostIdBookmarkMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /posts/{postId}/bookmark
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePostsPostIdBookmarkMutationKey() {
  return ['posts', 'DELETE', '/posts/:postId/bookmark'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /posts/{postId}/bookmark
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeletePostsPostIdBookmarkMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeletePostsPostIdBookmarkMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
  ) => parseResponse(client.posts[':postId'].bookmark.$delete(args, clientOptions)),
})

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export function useDeletePostsPostIdBookmark(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.posts)[':postId']['bookmark']['$delete']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeletePostsPostIdBookmarkMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /bookmarks
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetBookmarksQueryKey(
  args: MaybeRef<InferRequestType<typeof client.bookmarks.$get>>,
) {
  return ['bookmarks', 'GET', '/bookmarks', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /bookmarks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBookmarksQueryOptions = (
  args: InferRequestType<typeof client.bookmarks.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBookmarksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.bookmarks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /bookmarks
 *
 * ブックマーク一覧取得
 */
export function useGetBookmarks(
  args: InferRequestType<typeof client.bookmarks.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.bookmarks.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetBookmarksQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/likes
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsPostIdLikesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>>,
) {
  return ['posts', 'GET', '/posts/:postId/likes', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/likes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdLikesQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPostsPostIdLikesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.posts[':postId'].likes.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.posts)[':postId']['likes']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsPostIdLikesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/reposts
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsPostIdRepostsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>>,
) {
  return ['posts', 'GET', '/posts/:postId/reposts', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/reposts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdRepostsQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPostsPostIdRepostsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.posts[':postId'].reposts.$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.posts)[':postId']['reposts']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsPostIdRepostsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/quotes
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsPostIdQuotesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>>,
) {
  return ['posts', 'GET', '/posts/:postId/quotes', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/quotes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdQuotesQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPostsPostIdQuotesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.posts[':postId'].quotes.$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.posts)[':postId']['quotes']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsPostIdQuotesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/replies
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsPostIdRepliesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>>,
) {
  return ['posts', 'GET', '/posts/:postId/replies', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /posts/{postId}/replies
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdRepliesQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPostsPostIdRepliesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.posts[':postId'].replies.$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.posts)[':postId']['replies']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsPostIdRepliesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /posts/{postId}/replies
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsPostIdRepliesMutationKey() {
  return ['posts', 'POST', '/posts/:postId/replies'] as const
}

/**
 * Returns Vue Query mutation options for POST /posts/{postId}/replies
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPostsPostIdRepliesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPostsPostIdRepliesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>,
  ) => parseResponse(client.posts[':postId'].replies.$post(args, clientOptions)),
})

/**
 * POST /posts/{postId}/replies
 *
 * 返信投稿
 */
export function usePostPostsPostIdReplies(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.posts)[':postId']['replies']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPostsPostIdRepliesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /media/upload
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMediaUploadMutationKey() {
  return ['media', 'POST', '/media/upload'] as const
}

/**
 * Returns Vue Query mutation options for POST /media/upload
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMediaUploadMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMediaUploadMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.media.upload.$post>) =>
    parseResponse(client.media.upload.$post(args, clientOptions)),
})

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export function usePostMediaUpload(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.media.upload.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.media.upload.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostMediaUploadMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /media/{mediaId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMediaMediaIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.media)[':mediaId']['$get']>>,
) {
  return ['media', 'GET', '/media/:mediaId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /media/{mediaId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMediaMediaIdQueryOptions = (
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMediaMediaIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.media[':mediaId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /media/{mediaId}
 *
 * メディア情報取得
 */
export function useGetMediaMediaId(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.media)[':mediaId']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMediaMediaIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PATCH /media/{mediaId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchMediaMediaIdMutationKey() {
  return ['media', 'PATCH', '/media/:mediaId'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /media/{mediaId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchMediaMediaIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchMediaMediaIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.media)[':mediaId']['$patch']>) =>
    parseResponse(client.media[':mediaId'].$patch(args, clientOptions)),
})

/**
 * PATCH /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePatchMediaMediaId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.media)[':mediaId']['$patch']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.media)[':mediaId']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchMediaMediaIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
