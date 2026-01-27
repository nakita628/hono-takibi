import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
 * Uses $url() for type-safe key generation
 */
export function getGetPostsKey(args: InferRequestType<typeof client.posts.$get>) {
  return client.posts.$url(args).pathname
}

/**
 * POST /posts
 *
 * 投稿作成
 */
export function usePostPosts(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.posts.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPostsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.posts.$post> }) =>
        parseResponse(client.posts.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /posts
 * Uses $url() for type-safe key generation
 */
export function getPostPostsMutationKey() {
  return `POST ${client.posts.$url().pathname}`
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
 * Generates SWR cache key for GET /posts/{postId}
 * Uses $url() for type-safe key generation
 */
export function getGetPostsPostIdKey(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return client.posts[':postId'].$url(args).pathname
}

/**
 * DELETE /posts/{postId}
 *
 * 投稿削除
 */
export function useDeletePostsPostId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':postId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeletePostsPostIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['$delete']> },
      ) => parseResponse(client.posts[':postId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /posts/{postId}
 * Uses $url() for type-safe key generation
 */
export function getDeletePostsPostIdMutationKey() {
  return `DELETE ${client.posts[':postId'].$url().pathname}`
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
 * Generates SWR cache key for GET /posts/{postId}/thread
 * Uses $url() for type-safe key generation
 */
export function getGetPostsPostIdThreadKey(
  args: InferRequestType<(typeof client.posts)[':postId']['thread']['$get']>,
) {
  return client.posts[':postId'].thread.$url(args).pathname
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
 * Generates SWR cache key for GET /posts/{postId}/context
 * Uses $url() for type-safe key generation
 */
export function getGetPostsPostIdContextKey(
  args: InferRequestType<(typeof client.posts)[':postId']['context']['$get']>,
) {
  return client.posts[':postId'].context.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetTimelineHomeKey(args: InferRequestType<typeof client.timeline.home.$get>) {
  return client.timeline.home.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetTimelineForYouKey(
  args: InferRequestType<(typeof client.timeline)['for-you']['$get']>,
) {
  return client.timeline['for-you'].$url(args).pathname
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
 * Generates SWR cache key for GET /timeline/user/{userId}
 * Uses $url() for type-safe key generation
 */
export function getGetTimelineUserUserIdKey(
  args: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
) {
  return client.timeline.user[':userId'].$url(args).pathname
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
 * Generates SWR cache key for GET /timeline/hashtag/{hashtag}
 * Uses $url() for type-safe key generation
 */
export function getGetTimelineHashtagHashtagKey(
  args: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
) {
  return client.timeline.hashtag[':hashtag'].$url(args).pathname
}

/**
 * POST /posts/{postId}/like
 *
 * いいね
 */
export function usePostPostsPostIdLike(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':postId']['like']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['like']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPostsPostIdLikeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['like']['$post']> },
      ) => parseResponse(client.posts[':postId'].like.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /posts/{postId}/like
 * Uses $url() for type-safe key generation
 */
export function getPostPostsPostIdLikeMutationKey() {
  return `POST ${client.posts[':postId'].like.$url().pathname}`
}

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export function useDeletePostsPostIdLike(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['like']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeletePostsPostIdLikeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['like']['$delete']> },
      ) => parseResponse(client.posts[':postId'].like.$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /posts/{postId}/like
 * Uses $url() for type-safe key generation
 */
export function getDeletePostsPostIdLikeMutationKey() {
  return `DELETE ${client.posts[':postId'].like.$url().pathname}`
}

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export function usePostPostsPostIdRepost(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['repost']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPostsPostIdRepostMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['repost']['$post']> },
      ) => parseResponse(client.posts[':postId'].repost.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /posts/{postId}/repost
 * Uses $url() for type-safe key generation
 */
export function getPostPostsPostIdRepostMutationKey() {
  return `POST ${client.posts[':postId'].repost.$url().pathname}`
}

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export function useDeletePostsPostIdRepost(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['repost']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeletePostsPostIdRepostMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']> },
      ) => parseResponse(client.posts[':postId'].repost.$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /posts/{postId}/repost
 * Uses $url() for type-safe key generation
 */
export function getDeletePostsPostIdRepostMutationKey() {
  return `DELETE ${client.posts[':postId'].repost.$url().pathname}`
}

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export function usePostPostsPostIdQuote(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['quote']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPostsPostIdQuoteMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['quote']['$post']> },
      ) => parseResponse(client.posts[':postId'].quote.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /posts/{postId}/quote
 * Uses $url() for type-safe key generation
 */
export function getPostPostsPostIdQuoteMutationKey() {
  return `POST ${client.posts[':postId'].quote.$url().pathname}`
}

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export function usePostPostsPostIdBookmark(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['bookmark']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPostsPostIdBookmarkMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']> },
      ) => parseResponse(client.posts[':postId'].bookmark.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /posts/{postId}/bookmark
 * Uses $url() for type-safe key generation
 */
export function getPostPostsPostIdBookmarkMutationKey() {
  return `POST ${client.posts[':postId'].bookmark.$url().pathname}`
}

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export function useDeletePostsPostIdBookmark(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['bookmark']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeletePostsPostIdBookmarkMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']> },
      ) => parseResponse(client.posts[':postId'].bookmark.$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /posts/{postId}/bookmark
 * Uses $url() for type-safe key generation
 */
export function getDeletePostsPostIdBookmarkMutationKey() {
  return `DELETE ${client.posts[':postId'].bookmark.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetBookmarksKey(args: InferRequestType<typeof client.bookmarks.$get>) {
  return client.bookmarks.$url(args).pathname
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
 * Generates SWR cache key for GET /posts/{postId}/likes
 * Uses $url() for type-safe key generation
 */
export function getGetPostsPostIdLikesKey(
  args: InferRequestType<(typeof client.posts)[':postId']['likes']['$get']>,
) {
  return client.posts[':postId'].likes.$url(args).pathname
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
 * Generates SWR cache key for GET /posts/{postId}/reposts
 * Uses $url() for type-safe key generation
 */
export function getGetPostsPostIdRepostsKey(
  args: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
) {
  return client.posts[':postId'].reposts.$url(args).pathname
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
 * Generates SWR cache key for GET /posts/{postId}/quotes
 * Uses $url() for type-safe key generation
 */
export function getGetPostsPostIdQuotesKey(
  args: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
) {
  return client.posts[':postId'].quotes.$url(args).pathname
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
 * Generates SWR cache key for GET /posts/{postId}/replies
 * Uses $url() for type-safe key generation
 */
export function getGetPostsPostIdRepliesKey(
  args: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
) {
  return client.posts[':postId'].replies.$url(args).pathname
}

/**
 * POST /posts/{postId}/replies
 *
 * 返信投稿
 */
export function usePostPostsPostIdReplies(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['replies']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPostsPostIdRepliesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['replies']['$post']> },
      ) => parseResponse(client.posts[':postId'].replies.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /posts/{postId}/replies
 * Uses $url() for type-safe key generation
 */
export function getPostPostsPostIdRepliesMutationKey() {
  return `POST ${client.posts[':postId'].replies.$url().pathname}`
}

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export function usePostMediaUpload(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.media.upload.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.media.upload.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostMediaUploadMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.media.upload.$post> }) =>
        parseResponse(client.media.upload.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /media/upload
 * Uses $url() for type-safe key generation
 */
export function getPostMediaUploadMutationKey() {
  return `POST ${client.media.upload.$url().pathname}`
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
 * Generates SWR cache key for GET /media/{mediaId}
 * Uses $url() for type-safe key generation
 */
export function getGetMediaMediaIdKey(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
) {
  return client.media[':mediaId'].$url(args).pathname
}

/**
 * PATCH /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePatchMediaMediaId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.media)[':mediaId']['$patch']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.media)[':mediaId']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPatchMediaMediaIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.media)[':mediaId']['$patch']> },
      ) => parseResponse(client.media[':mediaId'].$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /media/{mediaId}
 * Uses $url() for type-safe key generation
 */
export function getPatchMediaMediaIdMutationKey() {
  return `PATCH ${client.media[':mediaId'].$url().pathname}`
}
