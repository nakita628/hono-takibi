import { useQuery, useMutation } from '@tanstack/vue-query'
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPostsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.posts.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /posts
 */
export function getGetPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['/posts', args] as const
}

/**
 * POST /posts
 *
 * 投稿作成
 */
export function usePostPosts(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.posts.$post>) =>
      parseResponse(client.posts.$post(args, clientOptions)),
  })
}

/**
 * GET /posts/{postId}
 *
 * 投稿詳細取得
 */
export function useGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPostsPostIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.posts[':postId'].$get(args, clientOptions)),
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
 * DELETE /posts/{postId}
 *
 * 投稿削除
 */
export function useDeletePostsPostId(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['$delete']>) =>
      parseResponse(client.posts[':postId'].$delete(args, clientOptions)),
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPostsPostIdThreadQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.posts[':postId'].thread.$get(args, clientOptions)),
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
 * GET /posts/{postId}/context
 *
 * 投稿コンテキスト取得
 *
 * 親投稿と返信を含むコンテキストを取得
 */
export function useGetPostsPostIdContext(
  args: InferRequestType<(typeof client.posts)[':postId']['context']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPostsPostIdContextQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.posts[':postId'].context.$get(args, clientOptions)),
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
 * GET /timeline/home
 *
 * ホームタイムライン取得
 *
 * フォローしているユーザーの投稿を時系列で取得
 */
export function useGetTimelineHome(
  args: InferRequestType<typeof client.timeline.home.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTimelineHomeQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.timeline.home.$get(args, clientOptions)),
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
 * GET /timeline/for-you
 *
 * おすすめタイムライン取得
 *
 * アルゴリズムによるおすすめ投稿
 */
export function useGetTimelineForYou(
  args: InferRequestType<(typeof client.timeline)['for-you']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTimelineForYouQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.timeline['for-you'].$get(args, clientOptions)),
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
 * GET /timeline/user/{userId}
 *
 * ユーザータイムライン取得
 */
export function useGetTimelineUserUserId(
  args: InferRequestType<(typeof client.timeline.user)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTimelineUserUserIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.timeline.user[':userId'].$get(args, clientOptions)),
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
 * GET /timeline/hashtag/{hashtag}
 *
 * ハッシュタグタイムライン取得
 */
export function useGetTimelineHashtagHashtag(
  args: InferRequestType<(typeof client.timeline.hashtag)[':hashtag']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTimelineHashtagHashtagQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.timeline.hashtag[':hashtag'].$get(args, clientOptions)),
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
 * POST /posts/{postId}/like
 *
 * いいね
 */
export function usePostPostsPostIdLike(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['like']['$post']>) =>
      parseResponse(client.posts[':postId'].like.$post(args, clientOptions)),
  })
}

/**
 * DELETE /posts/{postId}/like
 *
 * いいね解除
 */
export function useDeletePostsPostIdLike(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['like']['$delete']>,
    ) => parseResponse(client.posts[':postId'].like.$delete(args, clientOptions)),
  })
}

/**
 * POST /posts/{postId}/repost
 *
 * リポスト
 */
export function usePostPostsPostIdRepost(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['repost']['$post']>,
    ) => parseResponse(client.posts[':postId'].repost.$post(args, clientOptions)),
  })
}

/**
 * DELETE /posts/{postId}/repost
 *
 * リポスト解除
 */
export function useDeletePostsPostIdRepost(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['repost']['$delete']>,
    ) => parseResponse(client.posts[':postId'].repost.$delete(args, clientOptions)),
  })
}

/**
 * POST /posts/{postId}/quote
 *
 * 引用投稿
 */
export function usePostPostsPostIdQuote(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['quote']['$post']>,
    ) => parseResponse(client.posts[':postId'].quote.$post(args, clientOptions)),
  })
}

/**
 * POST /posts/{postId}/bookmark
 *
 * ブックマーク追加
 */
export function usePostPostsPostIdBookmark(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$post']>,
    ) => parseResponse(client.posts[':postId'].bookmark.$post(args, clientOptions)),
  })
}

/**
 * DELETE /posts/{postId}/bookmark
 *
 * ブックマーク解除
 */
export function useDeletePostsPostIdBookmark(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['bookmark']['$delete']>,
    ) => parseResponse(client.posts[':postId'].bookmark.$delete(args, clientOptions)),
  })
}

/**
 * GET /bookmarks
 *
 * ブックマーク一覧取得
 */
export function useGetBookmarks(
  args: InferRequestType<typeof client.bookmarks.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetBookmarksQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.bookmarks.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /bookmarks
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPostsPostIdLikesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.posts[':postId'].likes.$get(args, clientOptions)),
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
 * GET /posts/{postId}/reposts
 *
 * リポストしたユーザー一覧
 */
export function useGetPostsPostIdReposts(
  args: InferRequestType<(typeof client.posts)[':postId']['reposts']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPostsPostIdRepostsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.posts[':postId'].reposts.$get(args, clientOptions)),
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
 * GET /posts/{postId}/quotes
 *
 * 引用投稿一覧
 */
export function useGetPostsPostIdQuotes(
  args: InferRequestType<(typeof client.posts)[':postId']['quotes']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPostsPostIdQuotesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.posts[':postId'].quotes.$get(args, clientOptions)),
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
 * GET /posts/{postId}/replies
 *
 * 返信一覧取得
 */
export function useGetPostsPostIdReplies(
  args: InferRequestType<(typeof client.posts)[':postId']['replies']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPostsPostIdRepliesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.posts[':postId'].replies.$get(args, clientOptions)),
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
 * POST /posts/{postId}/replies
 *
 * 返信投稿
 */
export function usePostPostsPostIdReplies(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['replies']['$post']>,
    ) => parseResponse(client.posts[':postId'].replies.$post(args, clientOptions)),
  })
}

/**
 * POST /media/upload
 *
 * メディアアップロード
 */
export function usePostMediaUpload(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.media.upload.$post>) =>
      parseResponse(client.media.upload.$post(args, clientOptions)),
  })
}

/**
 * GET /media/{mediaId}
 *
 * メディア情報取得
 */
export function useGetMediaMediaId(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetMediaMediaIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.media[':mediaId'].$get(args, clientOptions)),
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
 * PATCH /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePatchMediaMediaId(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.media)[':mediaId']['$patch']>) =>
      parseResponse(client.media[':mediaId'].$patch(args, clientOptions)),
  })
}
