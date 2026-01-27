import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/31-practical-blog-api'

/**
 * Generates TanStack Query cache key for GET /posts
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['posts', '/posts', args] as const
}

/**
 * Returns TanStack Query query options for GET /posts
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
 * 記事一覧取得
 */
export function useGetPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /posts
 *
 * 記事作成
 */
export function usePostPosts(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$post>>>>>,
    Error,
    InferRequestType<typeof client.posts.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.posts.$post>) =>
      parseResponse(client.posts.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/{postId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPostsPostIdQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return ['posts', '/posts/:postId', args] as const
}

/**
 * Returns TanStack Query query options for GET /posts/{postId}
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
 * 記事詳細取得
 */
export function useGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':postId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsPostIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /posts/{postId}
 *
 * 記事更新
 */
export function usePutPostsPostId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':postId']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['$put']>) =>
      parseResponse(client.posts[':postId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /posts/{postId}
 *
 * 記事削除
 */
export function useDeletePostsPostId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':postId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.posts)[':postId']['$delete']>) =>
      parseResponse(client.posts[':postId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/slug/{slug}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPostsSlugSlugQueryKey(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
) {
  return ['posts', '/posts/slug/:slug', args] as const
}

/**
 * Returns TanStack Query query options for GET /posts/slug/{slug}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsSlugSlugQueryOptions = (
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPostsSlugSlugQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.posts.slug[':slug'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /posts/slug/{slug}
 *
 * スラッグで記事取得
 */
export function useGetPostsSlugSlug(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.posts.slug)[':slug']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsSlugSlugQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /posts/{postId}/publish
 *
 * 記事公開
 */
export function usePostPostsPostIdPublish(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['publish']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>,
    ) => parseResponse(client.posts[':postId'].publish.$post(args, clientOptions)),
  })
}

/**
 * POST /posts/{postId}/unpublish
 *
 * 記事非公開化
 */
export function usePostPostsPostIdUnpublish(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['unpublish']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>,
    ) => parseResponse(client.posts[':postId'].unpublish.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/{postId}/comments
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPostsPostIdCommentsQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
) {
  return ['posts', '/posts/:postId/comments', args] as const
}

/**
 * Returns TanStack Query query options for GET /posts/{postId}/comments
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdCommentsQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPostsPostIdCommentsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.posts[':postId'].comments.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /posts/{postId}/comments
 *
 * 記事のコメント一覧取得
 */
export function useGetPostsPostIdComments(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.posts)[':postId']['comments']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsPostIdCommentsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /posts/{postId}/comments
 *
 * コメント投稿
 */
export function usePostPostsPostIdComments(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.posts)[':postId']['comments']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>,
    ) => parseResponse(client.posts[':postId'].comments.$post(args, clientOptions)),
  })
}

/**
 * DELETE /comments/{commentId}
 *
 * コメント削除
 */
export function useDeleteCommentsCommentId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comments)[':commentId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.comments)[':commentId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.comments)[':commentId']['$delete']>) =>
      parseResponse(client.comments[':commentId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /comments/{commentId}/approve
 *
 * コメント承認
 */
export function usePostCommentsCommentIdApprove(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comments)[':commentId']['approve']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>,
    ) => parseResponse(client.comments[':commentId'].approve.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /categories
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetCategoriesQueryKey() {
  return ['categories', '/categories'] as const
}

/**
 * Returns TanStack Query query options for GET /categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCategoriesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCategoriesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.categories.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export function useGetCategories(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.categories.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCategoriesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export function usePostCategories(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.categories.$post>>>>>,
    Error,
    InferRequestType<typeof client.categories.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.categories.$post>) =>
      parseResponse(client.categories.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /categories/{categoryId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetCategoriesCategoryIdQueryKey(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
) {
  return ['categories', '/categories/:categoryId', args] as const
}

/**
 * Returns TanStack Query query options for GET /categories/{categoryId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCategoriesCategoryIdQueryOptions = (
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetCategoriesCategoryIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.categories[':categoryId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /categories/{categoryId}
 *
 * カテゴリ詳細取得
 */
export function useGetCategoriesCategoryId(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.categories)[':categoryId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCategoriesCategoryIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /categories/{categoryId}
 *
 * カテゴリ更新
 */
export function usePutCategoriesCategoryId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.categories)[':categoryId']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.categories)[':categoryId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.categories)[':categoryId']['$put']>) =>
      parseResponse(client.categories[':categoryId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /categories/{categoryId}
 *
 * カテゴリ削除
 */
export function useDeleteCategoriesCategoryId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.categories)[':categoryId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.categories)[':categoryId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.categories)[':categoryId']['$delete']>,
    ) => parseResponse(client.categories[':categoryId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /tags
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTagsQueryKey(args: InferRequestType<typeof client.tags.$get>) {
  return ['tags', '/tags', args] as const
}

/**
 * Returns TanStack Query query options for GET /tags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTagsQueryOptions = (
  args: InferRequestType<typeof client.tags.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTagsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.tags.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /tags
 *
 * タグ一覧取得
 */
export function useGetTags(
  args: InferRequestType<typeof client.tags.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tags.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTagsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /tags
 *
 * タグ作成
 */
export function usePostTags(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tags.$post>>>>>,
    Error,
    InferRequestType<typeof client.tags.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.tags.$post>) =>
      parseResponse(client.tags.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /media
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMediaQueryKey(args: InferRequestType<typeof client.media.$get>) {
  return ['media', '/media', args] as const
}

/**
 * Returns TanStack Query query options for GET /media
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMediaQueryOptions = (
  args: InferRequestType<typeof client.media.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMediaQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.media.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /media
 *
 * メディア一覧取得
 */
export function useGetMedia(
  args: InferRequestType<typeof client.media.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.media.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMediaQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /media
 *
 * メディアアップロード
 */
export function usePostMedia(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.media.$post>>>>>,
    Error,
    InferRequestType<typeof client.media.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.media.$post>) =>
      parseResponse(client.media.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /media/{mediaId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMediaMediaIdQueryKey(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
) {
  return ['media', '/media/:mediaId', args] as const
}

/**
 * Returns TanStack Query query options for GET /media/{mediaId}
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
 * メディア詳細取得
 */
export function useGetMediaMediaId(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.media)[':mediaId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMediaMediaIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePutMediaMediaId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.media)[':mediaId']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.media)[':mediaId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.media)[':mediaId']['$put']>) =>
      parseResponse(client.media[':mediaId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /media/{mediaId}
 *
 * メディア削除
 */
export function useDeleteMediaMediaId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.media)[':mediaId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.media)[':mediaId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.media)[':mediaId']['$delete']>) =>
      parseResponse(client.media[':mediaId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /authors
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetAuthorsQueryKey() {
  return ['authors', '/authors'] as const
}

/**
 * Returns TanStack Query query options for GET /authors
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAuthorsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAuthorsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.authors.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /authors
 *
 * 著者一覧取得
 */
export function useGetAuthors(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.authors.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAuthorsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /authors/{authorId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAuthorsAuthorIdQueryKey(
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
) {
  return ['authors', '/authors/:authorId', args] as const
}

/**
 * Returns TanStack Query query options for GET /authors/{authorId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAuthorsAuthorIdQueryOptions = (
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAuthorsAuthorIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.authors[':authorId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /authors/{authorId}
 *
 * 著者詳細取得
 */
export function useGetAuthorsAuthorId(
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.authors)[':authorId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAuthorsAuthorIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
