import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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
    swr?: SWRConfiguration<InferResponseType<typeof client.posts.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/posts', args] as const) : null
  return useSWR<InferResponseType<typeof client.posts.$get>, Error>(
    key,
    async () => parseResponse(client.posts.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /posts
 */
export function getGetPostsKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['GET', '/posts', args] as const
}

/**
 * POST /posts
 *
 * 投稿作成
 */
export function usePostPosts(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.posts.$post>,
    Error,
    string,
    InferRequestType<typeof client.posts.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.posts.$post>,
    Error,
    string,
    InferRequestType<typeof client.posts.$post>
  >(
    'POST /posts',
    async (_, { arg }) => parseResponse(client.posts.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.posts)[':postId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/posts/:postId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.posts)[':postId']['$get']>, Error>(
    key,
    async () => parseResponse(client.posts[':postId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /posts/{postId}
 */
export function getGetPostsPostIdKey(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return ['GET', '/posts/:postId', args] as const
}

/**
 * DELETE /posts/{postId}
 *
 * 投稿削除
 */
export function useDeletePostsPostId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['$delete']>
  >(
    'DELETE /posts/:postId',
    async (_, { arg }) => parseResponse(client.posts[':postId'].$delete(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.posts)[':postId']['thread']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/posts/:postId/thread', args] as const) : null
  return useSWR<InferResponseType<(typeof client.posts)[':postId']['thread']['$get']>, Error>(
    key,
    async () => parseResponse(client.posts[':postId'].thread.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /posts/{postId}/thread
 */
export function getGetPostsPostIdThreadKey(
  args: InferRequestType<(typeof client.posts)[':postId']['thread']['$get']>,
) {
  return ['GET', '/posts/:postId/thread', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.posts)[':postId']['context']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/posts/:postId/context', args] as const) : null
  return useSWR<InferResponseType<(typeof client.posts)[':postId']['context']['$get']>, Error>(
    key,
    async () => parseResponse(client.posts[':postId'].context.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /posts/{postId}/context
 */
export function getGetPostsPostIdContextKey(
  args: InferRequestType<(typeof client.posts)[':postId']['context']['$get']>,
) {
  return ['GET', '/posts/:postId/context', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.timeline.home.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/timeline/home', args] as const) : null
  return useSWR<InferResponseType<typeof client.timeline.home.$get>, Error>(
    key,
    async () => parseResponse(client.timeline.home.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /timeline/home
 */
export function getGetTimelineHomeKey(args: InferRequestType<typeof client.timeline.home.$get>) {
  return ['GET', '/timeline/home', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.timeline)['for-you']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/timeline/for-you', args] as const) : null
  return useSWR<InferResponseType<(typeof client.timeline)['for-you']['$get']>, Error>(
    key,
    async () => parseResponse(client.timeline['for-you'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /timeline/for-you
 */
export function getGetTimelineForYouKey(
  args: InferRequestType<(typeof client.timeline)['for-you']['$get']>,
) {
  return ['GET', '/timeline/for-you', args] as const
}

/**
 * GET /timeline/user/{userId}
 *
 * ユーザータイムライン取得
 */
export function useGetTimelineUserUserId(
  args: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.timeline.user)[':userId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/timeline/user/:userId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.timeline.user)[':userId']['$get']>, Error>(
    key,
    async () => parseResponse(client.timeline.user[':userId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /timeline/user/{userId}
 */
export function getGetTimelineUserUserIdKey(
  args: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
) {
  return ['GET', '/timeline/user/:userId', args] as const
}

/**
 * GET /timeline/hashtag/{hashtag}
 *
 * ハッシュタグタイムライン取得
 */
export function useGetTimelineHashtagHashtag(
  args: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/timeline/hashtag/:hashtag', args] as const) : null
  return useSWR<InferResponseType<(typeof client.timeline.hashtag)[':hashtag']['$get']>, Error>(
    key,
    async () => parseResponse(client.timeline.hashtag[':hashtag'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /timeline/hashtag/{hashtag}
 */
export function getGetTimelineHashtagHashtagKey(
  args: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
) {
  return ['GET', '/timeline/hashtag/:hashtag', args] as const
}

/**
 * POST /posts/{postId}/like
 *
 * いいね
 */
export function usePostPostsPostIdLike(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['like']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['like']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['like']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['like']['$post']>
  >(
    'POST /posts/:postId/like',
    async (_, { arg }) => parseResponse(client.posts[':postId'].like.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export function useDeletePostsPostIdLike(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['like']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['like']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>
  >(
    'DELETE /posts/:postId/like',
    async (_, { arg }) => parseResponse(client.posts[':postId'].like.$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export function usePostPostsPostIdRepost(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['repost']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['repost']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>
  >(
    'POST /posts/:postId/repost',
    async (_, { arg }) => parseResponse(client.posts[':postId'].repost.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export function useDeletePostsPostIdRepost(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['repost']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['repost']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>
  >(
    'DELETE /posts/:postId/repost',
    async (_, { arg }) =>
      parseResponse(client.posts[':postId'].repost.$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export function usePostPostsPostIdQuote(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['quote']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['quote']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>
  >(
    'POST /posts/:postId/quote',
    async (_, { arg }) => parseResponse(client.posts[':postId'].quote.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export function usePostPostsPostIdBookmark(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['bookmark']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['bookmark']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>
  >(
    'POST /posts/:postId/bookmark',
    async (_, { arg }) =>
      parseResponse(client.posts[':postId'].bookmark.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export function useDeletePostsPostIdBookmark(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>
  >(
    'DELETE /posts/:postId/bookmark',
    async (_, { arg }) =>
      parseResponse(client.posts[':postId'].bookmark.$delete(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<typeof client.bookmarks.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/bookmarks', args] as const) : null
  return useSWR<InferResponseType<typeof client.bookmarks.$get>, Error>(
    key,
    async () => parseResponse(client.bookmarks.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /bookmarks
 */
export function getGetBookmarksKey(args: InferRequestType<typeof client.bookmarks.$get>) {
  return ['GET', '/bookmarks', args] as const
}

/**
 * GET /posts/{postId}/likes
 *
 * いいねしたユーザー一覧
 */
export function useGetPostsPostIdLikes(
  args: InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.posts)[':postId']['likes']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/posts/:postId/likes', args] as const) : null
  return useSWR<InferResponseType<(typeof client.posts)[':postId']['likes']['$get']>, Error>(
    key,
    async () => parseResponse(client.posts[':postId'].likes.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /posts/{postId}/likes
 */
export function getGetPostsPostIdLikesKey(
  args: InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
) {
  return ['GET', '/posts/:postId/likes', args] as const
}

/**
 * GET /posts/{postId}/reposts
 *
 * リポストしたユーザー一覧
 */
export function useGetPostsPostIdReposts(
  args: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.posts)[':postId']['reposts']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/posts/:postId/reposts', args] as const) : null
  return useSWR<InferResponseType<(typeof client.posts)[':postId']['reposts']['$get']>, Error>(
    key,
    async () => parseResponse(client.posts[':postId'].reposts.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /posts/{postId}/reposts
 */
export function getGetPostsPostIdRepostsKey(
  args: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
) {
  return ['GET', '/posts/:postId/reposts', args] as const
}

/**
 * GET /posts/{postId}/quotes
 *
 * 引用投稿一覧
 */
export function useGetPostsPostIdQuotes(
  args: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.posts)[':postId']['quotes']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/posts/:postId/quotes', args] as const) : null
  return useSWR<InferResponseType<(typeof client.posts)[':postId']['quotes']['$get']>, Error>(
    key,
    async () => parseResponse(client.posts[':postId'].quotes.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /posts/{postId}/quotes
 */
export function getGetPostsPostIdQuotesKey(
  args: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
) {
  return ['GET', '/posts/:postId/quotes', args] as const
}

/**
 * GET /posts/{postId}/replies
 *
 * 返信一覧取得
 */
export function useGetPostsPostIdReplies(
  args: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.posts)[':postId']['replies']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/posts/:postId/replies', args] as const) : null
  return useSWR<InferResponseType<(typeof client.posts)[':postId']['replies']['$get']>, Error>(
    key,
    async () => parseResponse(client.posts[':postId'].replies.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /posts/{postId}/replies
 */
export function getGetPostsPostIdRepliesKey(
  args: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
) {
  return ['GET', '/posts/:postId/replies', args] as const
}

/**
 * POST /posts/{postId}/replies
 *
 * 返信投稿
 */
export function usePostPostsPostIdReplies(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['replies']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['replies']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>
  >(
    'POST /posts/:postId/replies',
    async (_, { arg }) =>
      parseResponse(client.posts[':postId'].replies.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export function usePostMediaUpload(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.media.upload.$post>,
    Error,
    string,
    InferRequestType<typeof client.media.upload.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.media.upload.$post>,
    Error,
    string,
    InferRequestType<typeof client.media.upload.$post>
  >(
    'POST /media/upload',
    async (_, { arg }) => parseResponse(client.media.upload.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.media)[':mediaId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/media/:mediaId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.media)[':mediaId']['$get']>, Error>(
    key,
    async () => parseResponse(client.media[':mediaId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /media/{mediaId}
 */
export function getGetMediaMediaIdKey(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
) {
  return ['GET', '/media/:mediaId', args] as const
}

/**
 * PATCH /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePatchMediaMediaId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.media)[':mediaId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.media)[':mediaId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.media)[':mediaId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.media)[':mediaId']['$patch']>
  >(
    'PATCH /media/:mediaId',
    async (_, { arg }) => parseResponse(client.media[':mediaId'].$patch(arg, options?.client)),
    options?.swr,
  )
}
