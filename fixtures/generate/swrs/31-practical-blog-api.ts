import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/31-practical-blog-api'

/**
 * Generates SWR cache key for GET /posts
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetPostsKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['/posts', args] as const
}

/**
 * GET /posts
 *
 * 記事一覧取得
 */
export function useGetPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetPostsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /posts
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostPostsMutationKey() {
  return ['/posts'] as const
}

/**
 * POST /posts
 *
 * 記事作成
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPostsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.posts.$post> }) =>
        parseResponse(client.posts.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/{postId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetPostsPostIdKey(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return [`/posts/${args.param.postId}`, args] as const
}

/**
 * GET /posts/{postId}
 *
 * 記事詳細取得
 */
export function useGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetPostsPostIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts[':postId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /posts/{postId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutPostsPostIdMutationKey() {
  return ['/posts/:postId'] as const
}

/**
 * PUT /posts/{postId}
 *
 * 記事更新
 */
export function usePutPostsPostId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':postId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPostsPostIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['$put']> },
      ) => parseResponse(client.posts[':postId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /posts/{postId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeletePostsPostIdMutationKey() {
  return ['/posts/:postId'] as const
}

/**
 * DELETE /posts/{postId}
 *
 * 記事削除
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeletePostsPostIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['$delete']> },
      ) => parseResponse(client.posts[':postId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/slug/{slug}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetPostsSlugSlugKey(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
) {
  return [`/posts/slug/${args.param.slug}`, args] as const
}

/**
 * GET /posts/slug/{slug}
 *
 * スラッグで記事取得
 */
export function useGetPostsSlugSlug(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetPostsSlugSlugKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts.slug[':slug'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /posts/{postId}/publish
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostPostsPostIdPublishMutationKey() {
  return ['/posts/:postId/publish'] as const
}

/**
 * POST /posts/{postId}/publish
 *
 * 記事公開
 */
export function usePostPostsPostIdPublish(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['publish']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPostsPostIdPublishMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['publish']['$post']> },
      ) => parseResponse(client.posts[':postId'].publish.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /posts/{postId}/unpublish
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostPostsPostIdUnpublishMutationKey() {
  return ['/posts/:postId/unpublish'] as const
}

/**
 * POST /posts/{postId}/unpublish
 *
 * 記事非公開化
 */
export function usePostPostsPostIdUnpublish(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['unpublish']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPostsPostIdUnpublishMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']> },
      ) => parseResponse(client.posts[':postId'].unpublish.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/{postId}/comments
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetPostsPostIdCommentsKey(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
) {
  return [`/posts/${args.param.postId}/comments`, args] as const
}

/**
 * GET /posts/{postId}/comments
 *
 * 記事のコメント一覧取得
 */
export function useGetPostsPostIdComments(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetPostsPostIdCommentsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts[':postId'].comments.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /posts/{postId}/comments
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostPostsPostIdCommentsMutationKey() {
  return ['/posts/:postId/comments'] as const
}

/**
 * POST /posts/{postId}/comments
 *
 * コメント投稿
 */
export function usePostPostsPostIdComments(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['comments']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPostsPostIdCommentsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':postId']['comments']['$post']> },
      ) => parseResponse(client.posts[':postId'].comments.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /comments/{commentId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteCommentsCommentIdMutationKey() {
  return ['/comments/:commentId'] as const
}

/**
 * DELETE /comments/{commentId}
 *
 * コメント削除
 */
export function useDeleteCommentsCommentId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comments)[':commentId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.comments)[':commentId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteCommentsCommentIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.comments)[':commentId']['$delete']> },
      ) => parseResponse(client.comments[':commentId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /comments/{commentId}/approve
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostCommentsCommentIdApproveMutationKey() {
  return ['/comments/:commentId/approve'] as const
}

/**
 * POST /comments/{commentId}/approve
 *
 * コメント承認
 */
export function usePostCommentsCommentIdApprove(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comments)[':commentId']['approve']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostCommentsCommentIdApproveMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']> },
      ) => parseResponse(client.comments[':commentId'].approve.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /categories
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetCategoriesKey() {
  return ['/categories'] as const
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export function useGetCategories(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetCategoriesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.categories.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /categories
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostCategoriesMutationKey() {
  return ['/categories'] as const
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export function usePostCategories(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.categories.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.categories.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostCategoriesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.categories.$post> }) =>
        parseResponse(client.categories.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /categories/{categoryId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetCategoriesCategoryIdKey(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
) {
  return [`/categories/${args.param.categoryId}`, args] as const
}

/**
 * GET /categories/{categoryId}
 *
 * カテゴリ詳細取得
 */
export function useGetCategoriesCategoryId(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetCategoriesCategoryIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.categories[':categoryId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /categories/{categoryId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutCategoriesCategoryIdMutationKey() {
  return ['/categories/:categoryId'] as const
}

/**
 * PUT /categories/{categoryId}
 *
 * カテゴリ更新
 */
export function usePutCategoriesCategoryId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.categories)[':categoryId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.categories)[':categoryId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutCategoriesCategoryIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.categories)[':categoryId']['$put']> },
      ) => parseResponse(client.categories[':categoryId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /categories/{categoryId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteCategoriesCategoryIdMutationKey() {
  return ['/categories/:categoryId'] as const
}

/**
 * DELETE /categories/{categoryId}
 *
 * カテゴリ削除
 */
export function useDeleteCategoriesCategoryId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.categories)[':categoryId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.categories)[':categoryId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteCategoriesCategoryIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.categories)[':categoryId']['$delete']> },
      ) => parseResponse(client.categories[':categoryId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tags
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetTagsKey(args: InferRequestType<typeof client.tags.$get>) {
  return ['/tags', args] as const
}

/**
 * GET /tags
 *
 * タグ一覧取得
 */
export function useGetTags(
  args: InferRequestType<typeof client.tags.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTagsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.tags.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /tags
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostTagsMutationKey() {
  return ['/tags'] as const
}

/**
 * POST /tags
 *
 * タグ作成
 */
export function usePostTags(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tags.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.tags.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostTagsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.tags.$post> }) =>
        parseResponse(client.tags.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /media
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMediaKey(args: InferRequestType<typeof client.media.$get>) {
  return ['/media', args] as const
}

/**
 * GET /media
 *
 * メディア一覧取得
 */
export function useGetMedia(
  args: InferRequestType<typeof client.media.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMediaKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.media.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /media
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostMediaMutationKey() {
  return ['/media'] as const
}

/**
 * POST /media
 *
 * メディアアップロード
 */
export function usePostMedia(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.media.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.media.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMediaMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.media.$post> }) =>
        parseResponse(client.media.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /media/{mediaId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMediaMediaIdKey(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
) {
  return [`/media/${args.param.mediaId}`, args] as const
}

/**
 * GET /media/{mediaId}
 *
 * メディア詳細取得
 */
export function useGetMediaMediaId(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMediaMediaIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.media[':mediaId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /media/{mediaId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutMediaMediaIdMutationKey() {
  return ['/media/:mediaId'] as const
}

/**
 * PUT /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePutMediaMediaId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.media)[':mediaId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.media)[':mediaId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMediaMediaIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.media)[':mediaId']['$put']> },
      ) => parseResponse(client.media[':mediaId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /media/{mediaId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteMediaMediaIdMutationKey() {
  return ['/media/:mediaId'] as const
}

/**
 * DELETE /media/{mediaId}
 *
 * メディア削除
 */
export function useDeleteMediaMediaId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.media)[':mediaId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.media)[':mediaId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMediaMediaIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.media)[':mediaId']['$delete']> },
      ) => parseResponse(client.media[':mediaId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /authors
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetAuthorsKey() {
  return ['/authors'] as const
}

/**
 * GET /authors
 *
 * 著者一覧取得
 */
export function useGetAuthors(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAuthorsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.authors.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /authors/{authorId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetAuthorsAuthorIdKey(
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
) {
  return [`/authors/${args.param.authorId}`, args] as const
}

/**
 * GET /authors/{authorId}
 *
 * 著者詳細取得
 */
export function useGetAuthorsAuthorId(
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAuthorsAuthorIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.authors[':authorId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
