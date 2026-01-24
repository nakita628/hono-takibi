import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
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
export function createGetPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /posts
 */
export function getGetPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['/posts', args] as const
}

/**
 * POST /posts
 *
 * 投稿作成
 */
export function createPostPosts(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.posts.$post>) =>
        parseResponse(client.posts.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /posts/{postId}
 *
 * 投稿詳細取得
 */
export function createGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /posts/{postId}
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
export function createDeletePostsPostId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['$delete']>) =>
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
export function createGetPostsPostIdThread(
  args: InferRequestType<(typeof client.posts)[':postId']['thread']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /posts/{postId}/thread
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
export function createGetPostsPostIdContext(
  args: InferRequestType<(typeof client.posts)[':postId']['context']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /posts/{postId}/context
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
export function createGetTimelineHome(
  args: InferRequestType<typeof client.timeline.home.$get>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /timeline/home
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
export function createGetTimelineForYou(
  args: InferRequestType<(typeof client.timeline)['for-you']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /timeline/for-you
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
export function createGetTimelineUserUserId(
  args: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /timeline/user/{userId}
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
export function createGetTimelineHashtagHashtag(
  args: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /timeline/hashtag/{hashtag}
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
export function createPostPostsPostIdLike(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.posts)[':postId']['like']['$post']>,
      ) => parseResponse(client.posts[':postId'].like.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export function createDeletePostsPostIdLike(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>,
      ) => parseResponse(client.posts[':postId'].like.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export function createPostPostsPostIdRepost(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>,
      ) => parseResponse(client.posts[':postId'].repost.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export function createDeletePostsPostIdRepost(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>,
      ) => parseResponse(client.posts[':postId'].repost.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export function createPostPostsPostIdQuote(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>,
      ) => parseResponse(client.posts[':postId'].quote.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export function createPostPostsPostIdBookmark(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>,
      ) => parseResponse(client.posts[':postId'].bookmark.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export function createDeletePostsPostIdBookmark(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
      ) => parseResponse(client.posts[':postId'].bookmark.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /bookmarks
 *
 * ブックマーク一覧取得
 */
export function createGetBookmarks(
  args: InferRequestType<typeof client.bookmarks.$get>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /bookmarks
 */
export function getGetBookmarksQueryKey(args: InferRequestType<typeof client.bookmarks.$get>) {
  return ['/bookmarks', args] as const
}

/**
 * GET /posts/{postId}/likes
 *
 * いいねしたユーザー一覧
 */
export function createGetPostsPostIdLikes(
  args: InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /posts/{postId}/likes
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
export function createGetPostsPostIdReposts(
  args: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /posts/{postId}/reposts
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
export function createGetPostsPostIdQuotes(
  args: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /posts/{postId}/quotes
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
export function createGetPostsPostIdReplies(
  args: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /posts/{postId}/replies
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
export function createPostPostsPostIdReplies(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>,
      ) => parseResponse(client.posts[':postId'].replies.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export function createPostMediaUpload(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.media.upload.$post>) =>
        parseResponse(client.media.upload.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /media/{mediaId}
 *
 * メディア情報取得
 */
export function createGetMediaMediaId(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /media/{mediaId}
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
export function createPatchMediaMediaId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.media)[':mediaId']['$patch']>) =>
        parseResponse(client.media[':mediaId'].$patch(args, options?.client)),
    },
    queryClient,
  )
}
