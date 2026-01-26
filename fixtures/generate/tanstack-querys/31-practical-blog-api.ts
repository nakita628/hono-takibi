import { useQuery, useMutation, queryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPostsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /posts
 */
export function getGetPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['/posts', args] as const
}

/**
 * Returns TanStack Query query options for GET /posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsQueryOptions = (
  args: InferRequestType<typeof client.posts.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /posts
 *
 * 記事作成
 */
export function usePostPosts(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.posts.$post>,
      variables: InferRequestType<typeof client.posts.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.posts.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.posts.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.posts.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.posts.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /posts/{postId}
 *
 * 記事詳細取得
 */
export function useGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPostsPostIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /posts/{postId}
 */
export function getGetPostsPostIdQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return ['/posts/:postId', args] as const
}

/**
 * Returns TanStack Query query options for GET /posts/{postId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsPostIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts[':postId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /posts/{postId}
 *
 * 記事更新
 */
export function usePutPostsPostId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['$put']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.posts)[':postId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.posts)[':postId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['$delete']> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.posts)[':postId']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /posts/slug/{slug}
 *
 * スラッグで記事取得
 */
export function useGetPostsSlugSlug(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPostsSlugSlugQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /posts/slug/{slug}
 */
export function getGetPostsSlugSlugQueryKey(
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
) {
  return ['/posts/slug/:slug', args] as const
}

/**
 * Returns TanStack Query query options for GET /posts/slug/{slug}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsSlugSlugQueryOptions = (
  args: InferRequestType<(typeof client.posts.slug)[':slug']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsSlugSlugQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts.slug[':slug'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /posts/{postId}/publish
 *
 * 記事公開
 */
export function usePostPostsPostIdPublish(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['publish']['$post']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['publish']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.posts)[':postId']['publish']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['unpublish']['$post']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['unpublish']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.posts)[':postId']['unpublish']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /posts/{postId}/comments
 *
 * 記事のコメント一覧取得
 */
export function useGetPostsPostIdComments(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetPostsPostIdCommentsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/{postId}/comments
 */
export function getGetPostsPostIdCommentsQueryKey(
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
) {
  return ['/posts/:postId/comments', args] as const
}

/**
 * Returns TanStack Query query options for GET /posts/{postId}/comments
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsPostIdCommentsQueryOptions = (
  args: InferRequestType<(typeof client.posts)[':postId']['comments']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsPostIdCommentsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts[':postId'].comments.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /posts/{postId}/comments
 *
 * コメント投稿
 */
export function usePostPostsPostIdComments(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':postId']['comments']['$post']>,
      variables: InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':postId']['comments']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.posts)[':postId']['comments']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.comments)[':commentId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.comments)[':commentId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.comments)[':commentId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.comments)[':commentId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.comments)[':commentId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.comments)[':commentId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.comments)[':commentId']['approve']['$post']>,
      variables: InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.comments)[':commentId']['approve']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.comments)[':commentId']['approve']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export function useGetCategories(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetCategoriesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['/categories'] as const
}

/**
 * Returns TanStack Query query options for GET /categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCategoriesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetCategoriesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.categories.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export function usePostCategories(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.categories.$post>,
      variables: InferRequestType<typeof client.categories.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.categories.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.categories.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.categories.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.categories.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /categories/{categoryId}
 *
 * カテゴリ詳細取得
 */
export function useGetCategoriesCategoryId(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetCategoriesCategoryIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /categories/{categoryId}
 */
export function getGetCategoriesCategoryIdQueryKey(
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
) {
  return ['/categories/:categoryId', args] as const
}

/**
 * Returns TanStack Query query options for GET /categories/{categoryId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCategoriesCategoryIdQueryOptions = (
  args: InferRequestType<(typeof client.categories)[':categoryId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetCategoriesCategoryIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.categories[':categoryId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /categories/{categoryId}
 *
 * カテゴリ更新
 */
export function usePutCategoriesCategoryId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.categories)[':categoryId']['$put']>,
      variables: InferRequestType<(typeof client.categories)[':categoryId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.categories)[':categoryId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.categories)[':categoryId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.categories)[':categoryId']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.categories)[':categoryId']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.categories)[':categoryId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.categories)[':categoryId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.categories)[':categoryId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.categories)[':categoryId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.categories)[':categoryId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.categories)[':categoryId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /tags
 *
 * タグ一覧取得
 */
export function useGetTags(
  args: InferRequestType<typeof client.tags.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetTagsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /tags
 */
export function getGetTagsQueryKey(args: InferRequestType<typeof client.tags.$get>) {
  return ['/tags', args] as const
}

/**
 * Returns TanStack Query query options for GET /tags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTagsQueryOptions = (
  args: InferRequestType<typeof client.tags.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTagsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.tags.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /tags
 *
 * タグ作成
 */
export function usePostTags(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.tags.$post>,
      variables: InferRequestType<typeof client.tags.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.tags.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.tags.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.tags.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.tags.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /media
 *
 * メディア一覧取得
 */
export function useGetMedia(
  args: InferRequestType<typeof client.media.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetMediaQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /media
 */
export function getGetMediaQueryKey(args: InferRequestType<typeof client.media.$get>) {
  return ['/media', args] as const
}

/**
 * Returns TanStack Query query options for GET /media
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMediaQueryOptions = (
  args: InferRequestType<typeof client.media.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMediaQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.media.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /media
 *
 * メディアアップロード
 */
export function usePostMedia(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.media.$post>,
      variables: InferRequestType<typeof client.media.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.media.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.media.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.media.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.media.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /media/{mediaId}
 *
 * メディア詳細取得
 */
export function useGetMediaMediaId(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetMediaMediaIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /media/{mediaId}
 */
export function getGetMediaMediaIdQueryKey(
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
) {
  return ['/media/:mediaId', args] as const
}

/**
 * Returns TanStack Query query options for GET /media/{mediaId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMediaMediaIdQueryOptions = (
  args: InferRequestType<(typeof client.media)[':mediaId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMediaMediaIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.media[':mediaId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /media/{mediaId}
 *
 * メディア情報更新
 */
export function usePutMediaMediaId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.media)[':mediaId']['$put']>,
      variables: InferRequestType<(typeof client.media)[':mediaId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.media)[':mediaId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.media)[':mediaId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.media)[':mediaId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.media)[':mediaId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.media)[':mediaId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.media)[':mediaId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.media)[':mediaId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.media)[':mediaId']['$delete']> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.media)[':mediaId']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.media)[':mediaId']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /authors
 *
 * 著者一覧取得
 */
export function useGetAuthors(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAuthorsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /authors
 */
export function getGetAuthorsQueryKey() {
  return ['/authors'] as const
}

/**
 * Returns TanStack Query query options for GET /authors
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAuthorsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetAuthorsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.authors.$get(undefined, {
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAuthorsAuthorIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /authors/{authorId}
 */
export function getGetAuthorsAuthorIdQueryKey(
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
) {
  return ['/authors/:authorId', args] as const
}

/**
 * Returns TanStack Query query options for GET /authors/{authorId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAuthorsAuthorIdQueryOptions = (
  args: InferRequestType<(typeof client.authors)[':authorId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAuthorsAuthorIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.authors[':authorId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
