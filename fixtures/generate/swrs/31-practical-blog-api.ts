import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/31-practical-blog-api'

/**
 * GET /posts
 *
 * 記事一覧取得
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
 * 記事作成
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
 * 記事詳細取得
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
 * PUT /posts/{postId}
 *
 * 記事更新
 */
export function usePutPostsPostId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['$put']>
  >(
    'PUT /posts/:postId',
    async (_, { arg }) => parseResponse(client.posts[':postId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /posts/{postId}
 *
 * 記事削除
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
 * GET /posts/slug/{slug}
 *
 * スラッグで記事取得
 */
export function useGetPostsSlugSlug(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.posts.slug)[':slug']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/posts/slug/:slug', args] as const) : null
  return useSWR<InferResponseType<(typeof client.posts.slug)[':slug']['$get']>, Error>(
    key,
    async () => parseResponse(client.posts.slug[':slug'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /posts/slug/{slug}
 */
export function getGetPostsSlugSlugKey(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
) {
  return ['GET', '/posts/slug/:slug', args] as const
}

/**
 * POST /posts/{postId}/publish
 *
 * 記事公開
 */
export function usePostPostsPostIdPublish(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['publish']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['publish']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>
  >(
    'POST /posts/:postId/publish',
    async (_, { arg }) =>
      parseResponse(client.posts[':postId'].publish.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /posts/{postId}/unpublish
 *
 * 記事非公開化
 */
export function usePostPostsPostIdUnpublish(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['unpublish']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['unpublish']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>
  >(
    'POST /posts/:postId/unpublish',
    async (_, { arg }) =>
      parseResponse(client.posts[':postId'].unpublish.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /posts/{postId}/comments
 *
 * 記事のコメント一覧取得
 */
export function useGetPostsPostIdComments(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.posts)[':postId']['comments']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/posts/:postId/comments', args] as const) : null
  return useSWR<InferResponseType<(typeof client.posts)[':postId']['comments']['$get']>, Error>(
    key,
    async () => parseResponse(client.posts[':postId'].comments.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /posts/{postId}/comments
 */
export function getGetPostsPostIdCommentsKey(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
) {
  return ['GET', '/posts/:postId/comments', args] as const
}

/**
 * POST /posts/{postId}/comments
 *
 * コメント投稿
 */
export function usePostPostsPostIdComments(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':postId']['comments']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':postId']['comments']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>
  >(
    'POST /posts/:postId/comments',
    async (_, { arg }) =>
      parseResponse(client.posts[':postId'].comments.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /comments/{commentId}
 *
 * コメント削除
 */
export function useDeleteCommentsCommentId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.comments)[':commentId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.comments)[':commentId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.comments)[':commentId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.comments)[':commentId']['$delete']>
  >(
    'DELETE /comments/:commentId',
    async (_, { arg }) =>
      parseResponse(client.comments[':commentId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /comments/{commentId}/approve
 *
 * コメント承認
 */
export function usePostCommentsCommentIdApprove(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.comments)[':commentId']['approve']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.comments)[':commentId']['approve']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>
  >(
    'POST /comments/:commentId/approve',
    async (_, { arg }) =>
      parseResponse(client.comments[':commentId'].approve.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export function useGetCategories(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.categories.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/categories'] as const) : null
  return useSWR<InferResponseType<typeof client.categories.$get>, Error>(
    key,
    async () => parseResponse(client.categories.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /categories
 */
export function getGetCategoriesKey() {
  return ['GET', '/categories'] as const
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export function usePostCategories(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.categories.$post>,
    Error,
    string,
    InferRequestType<typeof client.categories.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.categories.$post>,
    Error,
    string,
    InferRequestType<typeof client.categories.$post>
  >(
    'POST /categories',
    async (_, { arg }) => parseResponse(client.categories.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /categories/{categoryId}
 *
 * カテゴリ詳細取得
 */
export function useGetCategoriesCategoryId(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.categories)[':categoryId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/categories/:categoryId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.categories)[':categoryId']['$get']>, Error>(
    key,
    async () => parseResponse(client.categories[':categoryId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /categories/{categoryId}
 */
export function getGetCategoriesCategoryIdKey(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
) {
  return ['GET', '/categories/:categoryId', args] as const
}

/**
 * PUT /categories/{categoryId}
 *
 * カテゴリ更新
 */
export function usePutCategoriesCategoryId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.categories)[':categoryId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.categories)[':categoryId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.categories)[':categoryId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.categories)[':categoryId']['$put']>
  >(
    'PUT /categories/:categoryId',
    async (_, { arg }) =>
      parseResponse(client.categories[':categoryId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /categories/{categoryId}
 *
 * カテゴリ削除
 */
export function useDeleteCategoriesCategoryId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.categories)[':categoryId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.categories)[':categoryId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.categories)[':categoryId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.categories)[':categoryId']['$delete']>
  >(
    'DELETE /categories/:categoryId',
    async (_, { arg }) =>
      parseResponse(client.categories[':categoryId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /tags
 *
 * タグ一覧取得
 */
export function useGetTags(
  args: InferRequestType<typeof client.tags.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.tags.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/tags', args] as const) : null
  return useSWR<InferResponseType<typeof client.tags.$get>, Error>(
    key,
    async () => parseResponse(client.tags.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /tags
 */
export function getGetTagsKey(args: InferRequestType<typeof client.tags.$get>) {
  return ['GET', '/tags', args] as const
}

/**
 * POST /tags
 *
 * タグ作成
 */
export function usePostTags(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.tags.$post>,
    Error,
    string,
    InferRequestType<typeof client.tags.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.tags.$post>,
    Error,
    string,
    InferRequestType<typeof client.tags.$post>
  >(
    'POST /tags',
    async (_, { arg }) => parseResponse(client.tags.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /media
 *
 * メディア一覧取得
 */
export function useGetMedia(
  args: InferRequestType<typeof client.media.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.media.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/media', args] as const) : null
  return useSWR<InferResponseType<typeof client.media.$get>, Error>(
    key,
    async () => parseResponse(client.media.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /media
 */
export function getGetMediaKey(args: InferRequestType<typeof client.media.$get>) {
  return ['GET', '/media', args] as const
}

/**
 * POST /media
 *
 * メディアアップロード
 */
export function usePostMedia(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.media.$post>,
    Error,
    string,
    InferRequestType<typeof client.media.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.media.$post>,
    Error,
    string,
    InferRequestType<typeof client.media.$post>
  >(
    'POST /media',
    async (_, { arg }) => parseResponse(client.media.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /media/{mediaId}
 *
 * メディア詳細取得
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
 * PUT /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePutMediaMediaId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.media)[':mediaId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.media)[':mediaId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.media)[':mediaId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.media)[':mediaId']['$put']>
  >(
    'PUT /media/:mediaId',
    async (_, { arg }) => parseResponse(client.media[':mediaId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /media/{mediaId}
 *
 * メディア削除
 */
export function useDeleteMediaMediaId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.media)[':mediaId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.media)[':mediaId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.media)[':mediaId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.media)[':mediaId']['$delete']>
  >(
    'DELETE /media/:mediaId',
    async (_, { arg }) => parseResponse(client.media[':mediaId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /authors
 *
 * 著者一覧取得
 */
export function useGetAuthors(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.authors.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/authors'] as const) : null
  return useSWR<InferResponseType<typeof client.authors.$get>, Error>(
    key,
    async () => parseResponse(client.authors.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /authors
 */
export function getGetAuthorsKey() {
  return ['GET', '/authors'] as const
}

/**
 * GET /authors/{authorId}
 *
 * 著者詳細取得
 */
export function useGetAuthorsAuthorId(
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.authors)[':authorId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/authors/:authorId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.authors)[':authorId']['$get']>, Error>(
    key,
    async () => parseResponse(client.authors[':authorId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /authors/{authorId}
 */
export function getGetAuthorsAuthorIdKey(
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
) {
  return ['GET', '/authors/:authorId', args] as const
}
