import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPostsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts
 */
export function getGetPostsKey(args?: InferRequestType<typeof client.posts.$get>) {
  return ['/posts', ...(args ? [args] : [])] as const
}

/**
 * POST /posts
 *
 * 投稿作成
 */
export function usePostPosts(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.posts.$post>,
    Error,
    string,
    InferRequestType<typeof client.posts.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /posts',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.posts.$post> }) =>
      parseResponse(client.posts.$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPostsPostIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts[':postId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/{postId
 */
export function getGetPostsPostIdKey(
  args?: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return ['/posts/:postId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /posts/{postId}
 *
 * 投稿削除
 */
export function useDeletePostsPostId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /posts/:postId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['$delete']> },
    ) => parseResponse(client.posts[':postId'].$delete(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPostsPostIdThreadKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts[':postId'].thread.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/{postId/thread
 */
export function getGetPostsPostIdThreadKey(
  args?: InferRequestType<(typeof client.posts)[':postId']['thread']['$get']>,
) {
  return ['/posts/:postId/thread', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPostsPostIdContextKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts[':postId'].context.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/{postId/context
 */
export function getGetPostsPostIdContextKey(
  args?: InferRequestType<(typeof client.posts)[':postId']['context']['$get']>,
) {
  return ['/posts/:postId/context', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTimelineHomeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.timeline.home.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /timeline/home
 */
export function getGetTimelineHomeKey(args?: InferRequestType<typeof client.timeline.home.$get>) {
  return ['/timeline/home', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTimelineForYouKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.timeline['for-you'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /timeline/for-you
 */
export function getGetTimelineForYouKey(
  args?: InferRequestType<(typeof client.timeline)['for-you']['$get']>,
) {
  return ['/timeline/for-you', ...(args ? [args] : [])] as const
}

/**
 * GET /timeline/user/{userId}
 *
 * ユーザータイムライン取得
 */
export function useGetTimelineUserUserId(
  args: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTimelineUserUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.timeline.user[':userId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /timeline/user/{userId
 */
export function getGetTimelineUserUserIdKey(
  args?: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
) {
  return ['/timeline/user/:userId', ...(args ? [args] : [])] as const
}

/**
 * GET /timeline/hashtag/{hashtag}
 *
 * ハッシュタグタイムライン取得
 */
export function useGetTimelineHashtagHashtag(
  args: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTimelineHashtagHashtagKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.timeline.hashtag[':hashtag'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /timeline/hashtag/{hashtag
 */
export function getGetTimelineHashtagHashtagKey(
  args?: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
) {
  return ['/timeline/hashtag/:hashtag', ...(args ? [args] : [])] as const
}

/**
 * POST /posts/{postId}/like
 *
 * いいね
 */
export function usePostPostsPostIdLike(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['like']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['like']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /posts/:postId/like',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['like']['$post']> },
    ) => parseResponse(client.posts[':postId'].like.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export function useDeletePostsPostIdLike(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['like']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /posts/:postId/like',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['like']['$delete']> },
    ) => parseResponse(client.posts[':postId'].like.$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export function usePostPostsPostIdRepost(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['repost']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /posts/:postId/repost',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['repost']['$post']> },
    ) => parseResponse(client.posts[':postId'].repost.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export function useDeletePostsPostIdRepost(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['repost']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /posts/:postId/repost',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']> },
    ) => parseResponse(client.posts[':postId'].repost.$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export function usePostPostsPostIdQuote(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['quote']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /posts/:postId/quote',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['quote']['$post']> },
    ) => parseResponse(client.posts[':postId'].quote.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export function usePostPostsPostIdBookmark(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['bookmark']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /posts/:postId/bookmark',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']> },
    ) => parseResponse(client.posts[':postId'].bookmark.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export function useDeletePostsPostIdBookmark(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /posts/:postId/bookmark',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']> },
    ) => parseResponse(client.posts[':postId'].bookmark.$delete(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetBookmarksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.bookmarks.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /bookmarks
 */
export function getGetBookmarksKey(args?: InferRequestType<typeof client.bookmarks.$get>) {
  return ['/bookmarks', ...(args ? [args] : [])] as const
}

/**
 * GET /posts/{postId}/likes
 *
 * いいねしたユーザー一覧
 */
export function useGetPostsPostIdLikes(
  args: InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPostsPostIdLikesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts[':postId'].likes.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/{postId/likes
 */
export function getGetPostsPostIdLikesKey(
  args?: InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
) {
  return ['/posts/:postId/likes', ...(args ? [args] : [])] as const
}

/**
 * GET /posts/{postId}/reposts
 *
 * リポストしたユーザー一覧
 */
export function useGetPostsPostIdReposts(
  args: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPostsPostIdRepostsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts[':postId'].reposts.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/{postId/reposts
 */
export function getGetPostsPostIdRepostsKey(
  args?: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
) {
  return ['/posts/:postId/reposts', ...(args ? [args] : [])] as const
}

/**
 * GET /posts/{postId}/quotes
 *
 * 引用投稿一覧
 */
export function useGetPostsPostIdQuotes(
  args: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPostsPostIdQuotesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts[':postId'].quotes.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/{postId/quotes
 */
export function getGetPostsPostIdQuotesKey(
  args?: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
) {
  return ['/posts/:postId/quotes', ...(args ? [args] : [])] as const
}

/**
 * GET /posts/{postId}/replies
 *
 * 返信一覧取得
 */
export function useGetPostsPostIdReplies(
  args: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPostsPostIdRepliesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts[':postId'].replies.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/{postId/replies
 */
export function getGetPostsPostIdRepliesKey(
  args?: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
) {
  return ['/posts/:postId/replies', ...(args ? [args] : [])] as const
}

/**
 * POST /posts/{postId}/replies
 *
 * 返信投稿
 */
export function usePostPostsPostIdReplies(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['replies']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /posts/:postId/replies',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['replies']['$post']> },
    ) => parseResponse(client.posts[':postId'].replies.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export function usePostMediaUpload(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.media.upload.$post>,
    Error,
    string,
    InferRequestType<typeof client.media.upload.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /media/upload',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.media.upload.$post> }) =>
      parseResponse(client.media.upload.$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMediaMediaIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.media[':mediaId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /media/{mediaId
 */
export function getGetMediaMediaIdKey(
  args?: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
) {
  return ['/media/:mediaId', ...(args ? [args] : [])] as const
}

/**
 * PATCH /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePatchMediaMediaId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.media)[':mediaId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.media)[':mediaId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /media/:mediaId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.media)[':mediaId']['$patch']> },
    ) => parseResponse(client.media[':mediaId'].$patch(arg, options?.client)),
    mutationOptions,
  )
}
