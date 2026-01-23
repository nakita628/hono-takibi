import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * GET /documents
 */
export function useGetDocuments(
  args: InferRequestType<typeof client.documents.$get>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.documents.$get>,
      Error,
      InferResponseType<typeof client.documents.$get>,
      readonly ['/documents', InferRequestType<typeof client.documents.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDocumentsQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.documents.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /documents
 */
export function getGetDocumentsQueryKey(args: InferRequestType<typeof client.documents.$get>) {
  return ['/documents', args] as const
}

/**
 * POST /documents
 */
export function usePostDocuments(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.documents.$post> | undefined,
      Error,
      InferRequestType<typeof client.documents.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.documents.$post> | undefined,
    Error,
    InferRequestType<typeof client.documents.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.documents.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /documents/{documentId}
 */
export function useGetDocumentsDocumentId(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.documents)[':documentId']['$get']>,
      Error,
      InferResponseType<(typeof client.documents)[':documentId']['$get']>,
      readonly [
        '/documents/:documentId',
        InferRequestType<(typeof client.documents)[':documentId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDocumentsDocumentIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.documents[':documentId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /documents/{documentId}
 */
export function getGetDocumentsDocumentIdQueryKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
) {
  return ['/documents/:documentId', args] as const
}

/**
 * PUT /documents/{documentId}
 */
export function usePutDocumentsDocumentId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.documents)[':documentId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.documents)[':documentId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.documents)[':documentId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.documents)[':documentId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.documents[':documentId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /documents/{documentId}/versions
 */
export function useGetDocumentsDocumentIdVersions(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.documents)[':documentId']['versions']['$get']>,
      Error,
      InferResponseType<(typeof client.documents)[':documentId']['versions']['$get']>,
      readonly [
        '/documents/:documentId/versions',
        InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDocumentsDocumentIdVersionsQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.documents[':documentId'].versions.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /documents/{documentId}/versions
 */
export function getGetDocumentsDocumentIdVersionsQueryKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
) {
  return ['/documents/:documentId/versions', args] as const
}

/**
 * POST /documents/{documentId}/share
 */
export function usePostDocumentsDocumentIdShare(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.documents)[':documentId']['share']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.documents)[':documentId']['share']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.documents[':documentId'].share.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /users/{userId}/documents
 */
export function useGetUsersUserIdDocuments(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.users)[':userId']['documents']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':userId']['documents']['$get']>,
      readonly [
        '/users/:userId/documents',
        InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdDocumentsQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.users[':userId'].documents.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/{userId}/documents
 */
export function getGetUsersUserIdDocumentsQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
) {
  return ['/users/:userId/documents', args] as const
}

/**
 * POST /compare
 */
export function usePostCompare(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.compare.$post> | undefined,
      Error,
      InferRequestType<typeof client.compare.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.compare.$post> | undefined,
    Error,
    InferRequestType<typeof client.compare.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.compare.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /templates
 */
export function useGetTemplates(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.templates.$get>,
      Error,
      InferResponseType<typeof client.templates.$get>,
      readonly ['/templates']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTemplatesQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.templates.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /templates
 */
export function getGetTemplatesQueryKey() {
  return ['/templates'] as const
}

/**
 * POST /templates
 */
export function usePostTemplates(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.templates.$post> | undefined,
      Error,
      InferRequestType<typeof client.templates.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.templates.$post> | undefined,
    Error,
    InferRequestType<typeof client.templates.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.templates.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /workflows
 */
export function usePostWorkflows(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.workflows.$post> | undefined,
      Error,
      InferRequestType<typeof client.workflows.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.workflows.$post> | undefined,
    Error,
    InferRequestType<typeof client.workflows.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.workflows.$post(args, options?.client)),
    },
    queryClient,
  )
}
