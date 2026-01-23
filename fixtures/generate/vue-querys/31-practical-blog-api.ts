import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/31-practical-blog-api'

/**
 * GET /posts
 *
 * 記事一覧取得
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
 * 記事作成
 */
export function usePostPosts(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.posts.$post> | undefined,
    Error,
    InferRequestType<typeof client.posts.$post>
  >({ mutationFn: async (args) => parseResponse(client.posts.$post(args, clientOptions)) })
}

/**
 * GET /posts/{postId}
 *
 * 記事詳細取得
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
 * PUT /posts/{postId}
 *
 * 記事更新
 */
export function usePutPostsPostId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['$put']>
  >({
    mutationFn: async (args) => parseResponse(client.posts[':postId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /posts/{postId}
 *
 * 記事削除
 */
export function useDeletePostsPostId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['$delete']>
  >({
    mutationFn: async (args) => parseResponse(client.posts[':postId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /posts/slug/{slug}
 *
 * スラッグで記事取得
 */
export function useGetPostsSlugSlug(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPostsSlugSlugQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.posts.slug[':slug'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /posts/slug/{slug}
 */
export function getGetPostsSlugSlugQueryKey(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
) {
  return ['/posts/slug/:slug', args] as const
}

/**
 * POST /posts/{postId}/publish
 *
 * 記事公開
 */
export function usePostPostsPostIdPublish(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['publish']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.posts[':postId'].publish.$post(args, clientOptions)),
  })
}

/**
 * POST /posts/{postId}/unpublish
 *
 * 記事非公開化
 */
export function usePostPostsPostIdUnpublish(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['unpublish']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.posts[':postId'].unpublish.$post(args, clientOptions)),
  })
}

/**
 * GET /posts/{postId}/comments
 *
 * 記事のコメント一覧取得
 */
export function useGetPostsPostIdComments(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPostsPostIdCommentsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.posts[':postId'].comments.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/comments
 */
export function getGetPostsPostIdCommentsQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
) {
  return ['/posts/:postId/comments', args] as const
}

/**
 * POST /posts/{postId}/comments
 *
 * コメント投稿
 */
export function usePostPostsPostIdComments(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['comments']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.posts[':postId'].comments.$post(args, clientOptions)),
  })
}

/**
 * DELETE /comments/{commentId}
 *
 * コメント削除
 */
export function useDeleteCommentsCommentId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.comments)[':commentId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.comments)[':commentId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.comments[':commentId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /comments/{commentId}/approve
 *
 * コメント承認
 */
export function usePostCommentsCommentIdApprove(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.comments)[':commentId']['approve']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.comments[':commentId'].approve.$post(args, clientOptions)),
  })
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export function useGetCategories(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetCategoriesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.categories.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['/categories'] as const
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export function usePostCategories(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.categories.$post> | undefined,
    Error,
    InferRequestType<typeof client.categories.$post>
  >({ mutationFn: async (args) => parseResponse(client.categories.$post(args, clientOptions)) })
}

/**
 * GET /categories/{categoryId}
 *
 * カテゴリ詳細取得
 */
export function useGetCategoriesCategoryId(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetCategoriesCategoryIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.categories[':categoryId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /categories/{categoryId}
 */
export function getGetCategoriesCategoryIdQueryKey(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
) {
  return ['/categories/:categoryId', args] as const
}

/**
 * PUT /categories/{categoryId}
 *
 * カテゴリ更新
 */
export function usePutCategoriesCategoryId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.categories)[':categoryId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.categories)[':categoryId']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.categories[':categoryId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /categories/{categoryId}
 *
 * カテゴリ削除
 */
export function useDeleteCategoriesCategoryId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.categories)[':categoryId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.categories)[':categoryId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.categories[':categoryId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /tags
 *
 * タグ一覧取得
 */
export function useGetTags(
  args: InferRequestType<typeof client.tags.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTagsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.tags.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /tags
 */
export function getGetTagsQueryKey(args: InferRequestType<typeof client.tags.$get>) {
  return ['/tags', args] as const
}

/**
 * POST /tags
 *
 * タグ作成
 */
export function usePostTags(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.tags.$post> | undefined,
    Error,
    InferRequestType<typeof client.tags.$post>
  >({ mutationFn: async (args) => parseResponse(client.tags.$post(args, clientOptions)) })
}

/**
 * GET /media
 *
 * メディア一覧取得
 */
export function useGetMedia(
  args: InferRequestType<typeof client.media.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetMediaQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.media.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /media
 */
export function getGetMediaQueryKey(args: InferRequestType<typeof client.media.$get>) {
  return ['/media', args] as const
}

/**
 * POST /media
 *
 * メディアアップロード
 */
export function usePostMedia(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.media.$post> | undefined,
    Error,
    InferRequestType<typeof client.media.$post>
  >({ mutationFn: async (args) => parseResponse(client.media.$post(args, clientOptions)) })
}

/**
 * GET /media/{mediaId}
 *
 * メディア詳細取得
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
 * PUT /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePutMediaMediaId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.media)[':mediaId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.media)[':mediaId']['$put']>
  >({
    mutationFn: async (args) => parseResponse(client.media[':mediaId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /media/{mediaId}
 *
 * メディア削除
 */
export function useDeleteMediaMediaId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.media)[':mediaId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.media)[':mediaId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.media[':mediaId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /authors
 *
 * 著者一覧取得
 */
export function useGetAuthors(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetAuthorsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.authors.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /authors
 */
export function getGetAuthorsQueryKey() {
  return ['/authors'] as const
}

/**
 * GET /authors/{authorId}
 *
 * 著者詳細取得
 */
export function useGetAuthorsAuthorId(
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetAuthorsAuthorIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.authors[':authorId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /authors/{authorId}
 */
export function getGetAuthorsAuthorIdQueryKey(
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
) {
  return ['/authors/:authorId', args] as const
}
