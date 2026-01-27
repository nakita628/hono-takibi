import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * Generates Vue Query cache key for GET /documents
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetDocumentsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.documents.$get>>,
) {
  return ['documents', '/documents', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /documents
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDocumentsQueryOptions = (
  args: InferRequestType<typeof client.documents.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDocumentsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.documents.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /documents
 */
export function useGetDocuments(
  args: InferRequestType<typeof client.documents.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetDocumentsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /documents
 */
export function usePostDocuments(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.documents.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.documents.$post>) =>
      parseResponse(client.documents.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /documents/{documentId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetDocumentsDocumentIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.documents)[':documentId']['$get']>>,
) {
  return ['documents', '/documents/:documentId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /documents/{documentId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDocumentsDocumentIdQueryOptions = (
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDocumentsDocumentIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.documents[':documentId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /documents/{documentId}
 */
export function useGetDocumentsDocumentId(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.documents)[':documentId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetDocumentsDocumentIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /documents/{documentId}
 */
export function usePutDocumentsDocumentId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.documents)[':documentId']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.documents)[':documentId']['$put']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.documents)[':documentId']['$put']>) =>
      parseResponse(client.documents[':documentId'].$put(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /documents/{documentId}/versions
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetDocumentsDocumentIdVersionsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>>,
) {
  return ['documents', '/documents/:documentId/versions', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /documents/{documentId}/versions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDocumentsDocumentIdVersionsQueryOptions = (
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDocumentsDocumentIdVersionsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.documents[':documentId'].versions.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /documents/{documentId}/versions
 */
export function useGetDocumentsDocumentIdVersions(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.documents)[':documentId']['versions']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetDocumentsDocumentIdVersionsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /documents/{documentId}/share
 */
export function usePostDocumentsDocumentIdShare(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.documents)[':documentId']['share']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>,
    ) => parseResponse(client.documents[':documentId'].share.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}/documents
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersUserIdDocumentsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.users)[':userId']['documents']['$get']>>,
) {
  return ['users', '/users/:userId/documents', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/{userId}/documents
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdDocumentsQueryOptions = (
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdDocumentsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':userId'].documents.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{userId}/documents
 */
export function useGetUsersUserIdDocuments(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.users)[':userId']['documents']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdDocumentsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /compare
 */
export function usePostCompare(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.compare.$post>>>>>,
        Error,
        InferRequestType<typeof client.compare.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.compare.$post>) =>
      parseResponse(client.compare.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /templates
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetTemplatesQueryKey() {
  return ['templates', '/templates'] as const
}

/**
 * Returns Vue Query query options for GET /templates
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTemplatesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTemplatesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.templates.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /templates
 */
export function useGetTemplates(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTemplatesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /templates
 */
export function usePostTemplates(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.templates.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.templates.$post>) =>
      parseResponse(client.templates.$post(args, clientOptions)),
  })
}

/**
 * POST /workflows
 */
export function usePostWorkflows(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.workflows.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.workflows.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.workflows.$post>) =>
      parseResponse(client.workflows.$post(args, clientOptions)),
  })
}
