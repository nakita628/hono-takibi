import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
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
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.posts.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.posts.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /posts
 */
export function getGetPostsQueryKey(args?: InferRequestType<typeof client.posts.$get>) {
  return ['/posts', ...(args ? [args] : [])] as const
}

/**
 * POST /posts
 *
 * 記事作成
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
 * 記事詳細取得
 */
export function useGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.posts)[':postId']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsPostIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.posts[':postId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}
 */
export function getGetPostsPostIdQueryKey(
  args?: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return ['/posts/:postId', ...(args ? [args] : [])] as const
}

/**
 * PUT /posts/{postId}
 *
 * 記事更新
 */
export function usePutPostsPostId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /posts/{postId}
 *
 * 記事削除
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
 * GET /posts/slug/{slug}
 *
 * スラッグで記事取得
 */
export function useGetPostsSlugSlug(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.posts.slug)[':slug']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsSlugSlugQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.posts.slug[':slug'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /posts/slug/{slug}
 */
export function getGetPostsSlugSlugQueryKey(
  args?: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
) {
  return ['/posts/slug/:slug', ...(args ? [args] : [])] as const
}

/**
 * POST /posts/{postId}/publish
 *
 * 記事公開
 */
export function usePostPostsPostIdPublish(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['publish']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['publish']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].publish.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /posts/{postId}/unpublish
 *
 * 記事非公開化
 */
export function usePostPostsPostIdUnpublish(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['unpublish']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['unpublish']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].unpublish.$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.posts)[':postId']['comments']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsPostIdCommentsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.posts[':postId'].comments.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /posts/{postId}/comments
 */
export function getGetPostsPostIdCommentsQueryKey(
  args?: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
) {
  return ['/posts/:postId/comments', ...(args ? [args] : [])] as const
}

/**
 * POST /posts/{postId}/comments
 *
 * コメント投稿
 */
export function usePostPostsPostIdComments(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':postId']['comments']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':postId']['comments']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.posts[':postId'].comments.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /comments/{commentId}
 *
 * コメント削除
 */
export function useDeleteCommentsCommentId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.comments)[':commentId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.comments)[':commentId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.comments)[':commentId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.comments)[':commentId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.comments[':commentId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /comments/{commentId}/approve
 *
 * コメント承認
 */
export function usePostCommentsCommentIdApprove(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.comments)[':commentId']['approve']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.comments)[':commentId']['approve']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.comments[':commentId'].approve.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export function useGetCategories(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.categories.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCategoriesQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.categories.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
export function usePostCategories(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.categories.$post> | undefined,
      Error,
      InferRequestType<typeof client.categories.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.categories.$post> | undefined,
    Error,
    InferRequestType<typeof client.categories.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.categories.$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.categories)[':categoryId']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCategoriesCategoryIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.categories[':categoryId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /categories/{categoryId}
 */
export function getGetCategoriesCategoryIdQueryKey(
  args?: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
) {
  return ['/categories/:categoryId', ...(args ? [args] : [])] as const
}

/**
 * PUT /categories/{categoryId}
 *
 * カテゴリ更新
 */
export function usePutCategoriesCategoryId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.categories)[':categoryId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.categories)[':categoryId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.categories)[':categoryId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.categories)[':categoryId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.categories[':categoryId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /categories/{categoryId}
 *
 * カテゴリ削除
 */
export function useDeleteCategoriesCategoryId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.categories)[':categoryId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.categories)[':categoryId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.categories)[':categoryId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.categories)[':categoryId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.categories[':categoryId'].$delete(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.tags.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTagsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.tags.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /tags
 */
export function getGetTagsQueryKey(args?: InferRequestType<typeof client.tags.$get>) {
  return ['/tags', ...(args ? [args] : [])] as const
}

/**
 * POST /tags
 *
 * タグ作成
 */
export function usePostTags(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.tags.$post> | undefined,
      Error,
      InferRequestType<typeof client.tags.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.tags.$post> | undefined,
    Error,
    InferRequestType<typeof client.tags.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.tags.$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.media.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMediaQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.media.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /media
 */
export function getGetMediaQueryKey(args?: InferRequestType<typeof client.media.$get>) {
  return ['/media', ...(args ? [args] : [])] as const
}

/**
 * POST /media
 *
 * メディアアップロード
 */
export function usePostMedia(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.media.$post> | undefined,
      Error,
      InferRequestType<typeof client.media.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.media.$post> | undefined,
    Error,
    InferRequestType<typeof client.media.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.media.$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.media)[':mediaId']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMediaMediaIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.media[':mediaId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /media/{mediaId}
 */
export function getGetMediaMediaIdQueryKey(
  args?: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
) {
  return ['/media/:mediaId', ...(args ? [args] : [])] as const
}

/**
 * PUT /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePutMediaMediaId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.media)[':mediaId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.media)[':mediaId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.media)[':mediaId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.media)[':mediaId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.media[':mediaId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /media/{mediaId}
 *
 * メディア削除
 */
export function useDeleteMediaMediaId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.media)[':mediaId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.media)[':mediaId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.media)[':mediaId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.media)[':mediaId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.media[':mediaId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /authors
 *
 * 著者一覧取得
 */
export function useGetAuthors(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.authors.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAuthorsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.authors.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
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
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.authors)[':authorId']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAuthorsAuthorIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.authors[':authorId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /authors/{authorId}
 */
export function getGetAuthorsAuthorIdQueryKey(
  args?: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
) {
  return ['/authors/:authorId', ...(args ? [args] : [])] as const
}
