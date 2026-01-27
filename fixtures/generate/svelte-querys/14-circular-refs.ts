import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * Generates Svelte Query cache key for GET /trees
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetTreesQueryKey() {
  return ['trees', '/trees'] as const
}

/**
 * Returns Svelte Query query options for GET /trees
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTreesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTreesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.trees.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /trees
 */
export function createGetTrees(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trees.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTreesQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /trees
 */
export function createPostTrees(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trees.$post>>>>>,
    Error,
    InferRequestType<typeof client.trees.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.trees.$post>) =>
      parseResponse(client.trees.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /graphs
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetGraphsQueryKey() {
  return ['graphs', '/graphs'] as const
}

/**
 * Returns Svelte Query query options for GET /graphs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGraphsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetGraphsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.graphs.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /graphs
 */
export function createGetGraphs(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.graphs.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetGraphsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /linked-lists
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetLinkedListsQueryKey() {
  return ['linked-lists', '/linked-lists'] as const
}

/**
 * Returns Svelte Query query options for GET /linked-lists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLinkedListsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetLinkedListsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['linked-lists'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /linked-lists
 */
export function createGetLinkedLists(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['linked-lists']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetLinkedListsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /social-network
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSocialNetworkQueryKey() {
  return ['social-network', '/social-network'] as const
}

/**
 * Returns Svelte Query query options for GET /social-network
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSocialNetworkQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSocialNetworkQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['social-network'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /social-network
 */
export function createGetSocialNetwork(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['social-network']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSocialNetworkQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /file-system
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetFileSystemQueryKey() {
  return ['file-system', '/file-system'] as const
}

/**
 * Returns Svelte Query query options for GET /file-system
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFileSystemQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetFileSystemQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['file-system'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /file-system
 */
export function createGetFileSystem(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['file-system']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFileSystemQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /comments
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetCommentsQueryKey() {
  return ['comments', '/comments'] as const
}

/**
 * Returns Svelte Query query options for GET /comments
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCommentsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCommentsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.comments.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /comments
 */
export function createGetComments(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comments.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetCommentsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /polymorphic
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetPolymorphicQueryKey() {
  return ['polymorphic', '/polymorphic'] as const
}

/**
 * Returns Svelte Query query options for GET /polymorphic
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPolymorphicQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPolymorphicQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.polymorphic.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /polymorphic
 */
export function createGetPolymorphic(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.polymorphic.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPolymorphicQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /categories
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetCategoriesQueryKey() {
  return ['categories', '/categories'] as const
}

/**
 * Returns Svelte Query query options for GET /categories
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
 */
export function createGetCategories(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.categories.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetCategoriesQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /workflow
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetWorkflowQueryKey() {
  return ['workflow', '/workflow'] as const
}

/**
 * Returns Svelte Query query options for GET /workflow
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWorkflowQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetWorkflowQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.workflow.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /workflow
 */
export function createGetWorkflow(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.workflow.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetWorkflowQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
