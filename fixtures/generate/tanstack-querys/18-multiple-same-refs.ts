import { useQuery, useMutation, queryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * GET /documents
 */
export function useGetDocuments(
  args: InferRequestType<typeof client.documents.$get>,
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
  return useQuery({ ...getGetDocumentsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /documents
 */
export function getGetDocumentsQueryKey(args: InferRequestType<typeof client.documents.$get>) {
  return ['/documents', args] as const
}

/**
 * Returns TanStack Query query options for GET /documents
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDocumentsQueryOptions = (
  args: InferRequestType<typeof client.documents.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetDocumentsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.documents.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /documents
 */
export function usePostDocuments(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.documents.$post>,
      variables: InferRequestType<typeof client.documents.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.documents.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.documents.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.documents.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.documents.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /documents/{documentId}
 */
export function useGetDocumentsDocumentId(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
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
    ...getGetDocumentsDocumentIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
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
 * Returns TanStack Query query options for GET /documents/{documentId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDocumentsDocumentIdQueryOptions = (
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetDocumentsDocumentIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.documents[':documentId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /documents/{documentId}
 */
export function usePutDocumentsDocumentId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.documents)[':documentId']['$put']>,
      variables: InferRequestType<(typeof client.documents)[':documentId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.documents)[':documentId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.documents)[':documentId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.documents)[':documentId']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.documents)[':documentId']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /documents/{documentId}/versions
 */
export function useGetDocumentsDocumentIdVersions(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
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
    ...getGetDocumentsDocumentIdVersionsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
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
 * Returns TanStack Query query options for GET /documents/{documentId}/versions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDocumentsDocumentIdVersionsQueryOptions = (
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetDocumentsDocumentIdVersionsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.documents[':documentId'].versions.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /documents/{documentId}/share
 */
export function usePostDocumentsDocumentIdShare(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.documents)[':documentId']['share']['$post']>,
      variables: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.documents)[':documentId']['share']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>,
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
      args: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>,
    ) => parseResponse(client.documents[':documentId'].share.$post(args, clientOptions)),
  })
}

/**
 * GET /users/{userId}/documents
 */
export function useGetUsersUserIdDocuments(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
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
    ...getGetUsersUserIdDocumentsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
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
 * Returns TanStack Query query options for GET /users/{userId}/documents
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdDocumentsQueryOptions = (
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetUsersUserIdDocumentsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.users[':userId'].documents.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /compare
 */
export function usePostCompare(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.compare.$post>,
      variables: InferRequestType<typeof client.compare.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.compare.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.compare.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.compare.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.compare.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * GET /templates
 */
export function useGetTemplates(options?: {
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
  return useQuery({ ...getGetTemplatesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /templates
 */
export function getGetTemplatesQueryKey() {
  return ['/templates'] as const
}

/**
 * Returns TanStack Query query options for GET /templates
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTemplatesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetTemplatesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.templates.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /templates
 */
export function usePostTemplates(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.templates.$post>,
      variables: InferRequestType<typeof client.templates.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.templates.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.templates.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.templates.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.templates.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.workflows.$post>,
      variables: InferRequestType<typeof client.workflows.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.workflows.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.workflows.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.workflows.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.workflows.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.workflows.$post>) =>
      parseResponse(client.workflows.$post(args, clientOptions)),
  })
}
