import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.posts.$get>,
      Error,
      InferResponseType<typeof client.posts.$get>,
      readonly ['/posts', InferRequestType<typeof client.posts.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.posts.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePostPosts(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.posts.$post> | undefined,
      Error,
      InferRequestType<typeof client.posts.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.posts.$post> | undefined,
    Error,
    InferRequestType<typeof client.posts.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.posts.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /posts/{postId}
 *
 * 投稿詳細取得
 */
export function useGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.posts)[':postId']['$get']>,
      Error,
      InferResponseType<(typeof client.posts)[':postId']['$get']>,
      readonly ['/posts/:postId', InferRequestType<(typeof client.posts)[':postId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsPostIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.posts[':postId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function useDeletePostsPostId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].$delete(args, options?.client)),
    },
    queryClient,
  )
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.posts)[':postId']['thread']['$get']>,
      Error,
      InferResponseType<(typeof client.posts)[':postId']['thread']['$get']>,
      readonly [
        '/posts/:postId/thread',
        InferRequestType<(typeof client.posts)[':postId']['thread']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsPostIdThreadQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.posts[':postId'].thread.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.posts)[':postId']['context']['$get']>,
      Error,
      InferResponseType<(typeof client.posts)[':postId']['context']['$get']>,
      readonly [
        '/posts/:postId/context',
        InferRequestType<(typeof client.posts)[':postId']['context']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsPostIdContextQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.posts[':postId'].context.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.timeline.home.$get>,
      Error,
      InferResponseType<typeof client.timeline.home.$get>,
      readonly ['/timeline/home', InferRequestType<typeof client.timeline.home.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTimelineHomeQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.timeline.home.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.timeline)['for-you']['$get']>,
      Error,
      InferResponseType<(typeof client.timeline)['for-you']['$get']>,
      readonly ['/timeline/for-you', InferRequestType<(typeof client.timeline)['for-you']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTimelineForYouQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.timeline['for-you'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.timeline.user)[':userId']['$get']>,
      Error,
      InferResponseType<(typeof client.timeline.user)[':userId']['$get']>,
      readonly [
        '/timeline/user/:userId',
        InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTimelineUserUserIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.timeline.user[':userId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
      Error,
      InferResponseType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
      readonly [
        '/timeline/hashtag/:hashtag',
        InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTimelineHashtagHashtagQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.timeline.hashtag[':hashtag'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePostPostsPostIdLike(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['like']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['like']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['like']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['like']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].like.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export function useDeletePostsPostIdLike(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['like']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['like']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].like.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export function usePostPostsPostIdRepost(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['repost']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['repost']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].repost.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export function useDeletePostsPostIdRepost(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['repost']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['repost']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].repost.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export function usePostPostsPostIdQuote(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['quote']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['quote']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].quote.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export function usePostPostsPostIdBookmark(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['bookmark']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['bookmark']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].bookmark.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export function useDeletePostsPostIdBookmark(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['bookmark']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['bookmark']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].bookmark.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /bookmarks
 *
 * ブックマーク一覧取得
 */
export function useGetBookmarks(
  args: InferRequestType<typeof client.bookmarks.$get>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.bookmarks.$get>,
      Error,
      InferResponseType<typeof client.bookmarks.$get>,
      readonly ['/bookmarks', InferRequestType<typeof client.bookmarks.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetBookmarksQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.bookmarks.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.posts)[':postId']['likes']['$get']>,
      Error,
      InferResponseType<(typeof client.posts)[':postId']['likes']['$get']>,
      readonly [
        '/posts/:postId/likes',
        InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsPostIdLikesQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.posts[':postId'].likes.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.posts)[':postId']['reposts']['$get']>,
      Error,
      InferResponseType<(typeof client.posts)[':postId']['reposts']['$get']>,
      readonly [
        '/posts/:postId/reposts',
        InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsPostIdRepostsQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.posts[':postId'].reposts.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.posts)[':postId']['quotes']['$get']>,
      Error,
      InferResponseType<(typeof client.posts)[':postId']['quotes']['$get']>,
      readonly [
        '/posts/:postId/quotes',
        InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsPostIdQuotesQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.posts[':postId'].quotes.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.posts)[':postId']['replies']['$get']>,
      Error,
      InferResponseType<(typeof client.posts)[':postId']['replies']['$get']>,
      readonly [
        '/posts/:postId/replies',
        InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsPostIdRepliesQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.posts[':postId'].replies.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePostPostsPostIdReplies(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['replies']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['replies']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].replies.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export function usePostMediaUpload(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.media.upload.$post> | undefined,
      Error,
      InferRequestType<typeof client.media.upload.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.media.upload.$post> | undefined,
    Error,
    InferRequestType<typeof client.media.upload.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.media.upload.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /media/{mediaId}
 *
 * メディア情報取得
 */
export function useGetMediaMediaId(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.media)[':mediaId']['$get']>,
      Error,
      InferResponseType<(typeof client.media)[':mediaId']['$get']>,
      readonly ['/media/:mediaId', InferRequestType<(typeof client.media)[':mediaId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMediaMediaIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.media[':mediaId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePatchMediaMediaId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.media)[':mediaId']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.media)[':mediaId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.media)[':mediaId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.media)[':mediaId']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.media[':mediaId'].$patch(args, options?.client)),
    },
    queryClient,
  )
}
