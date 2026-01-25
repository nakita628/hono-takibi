import { useQuery, useMutation } from '@tanstack/react-query'
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
      select?: (
        data: InferResponseType<typeof client.documents.$get>,
      ) => InferResponseType<typeof client.documents.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetDocumentsQueryKey(args),
    queryFn: async () => parseResponse(client.documents.$get(args, clientOptions)),
    ...queryOptions,
  })
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
    mutationFn: async (args: InferRequestType<typeof client.documents.$post>) =>
      parseResponse(client.documents.$post(args, clientOptions)),
    ...mutationOptions,
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
      select?: (
        data: InferResponseType<(typeof client.documents)[':documentId']['$get']>,
      ) => InferResponseType<(typeof client.documents)[':documentId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetDocumentsDocumentIdQueryKey(args),
    queryFn: async () => parseResponse(client.documents[':documentId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /documents/{documentId
 */
export function getGetDocumentsDocumentIdQueryKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
) {
  return ['/documents/:documentId', args] as const
}

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
    mutationFn: async (args: InferRequestType<(typeof client.documents)[':documentId']['$put']>) =>
      parseResponse(client.documents[':documentId'].$put(args, clientOptions)),
    ...mutationOptions,
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
      select?: (
        data: InferResponseType<(typeof client.documents)[':documentId']['versions']['$get']>,
      ) => InferResponseType<(typeof client.documents)[':documentId']['versions']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetDocumentsDocumentIdVersionsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.documents[':documentId'].versions.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /documents/{documentId/versions
 */
export function getGetDocumentsDocumentIdVersionsQueryKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
) {
  return ['/documents/:documentId/versions', args] as const
}

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
    mutationFn: async (
      args: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>,
    ) => parseResponse(client.documents[':documentId'].share.$post(args, clientOptions)),
    ...mutationOptions,
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
      select?: (
        data: InferResponseType<(typeof client.users)[':userId']['documents']['$get']>,
      ) => InferResponseType<(typeof client.users)[':userId']['documents']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersUserIdDocumentsQueryKey(args),
    queryFn: async () => parseResponse(client.users[':userId'].documents.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/{userId/documents
 */
export function getGetUsersUserIdDocumentsQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
) {
  return ['/users/:userId/documents', args] as const
}

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
    mutationFn: async (args: InferRequestType<typeof client.compare.$post>) =>
      parseResponse(client.compare.$post(args, clientOptions)),
    ...mutationOptions,
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
    select?: (
      data: InferResponseType<typeof client.templates.$get>,
    ) => InferResponseType<typeof client.templates.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTemplatesQueryKey(),
    queryFn: async () => parseResponse(client.templates.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
    mutationFn: async (args: InferRequestType<typeof client.templates.$post>) =>
      parseResponse(client.templates.$post(args, clientOptions)),
    ...mutationOptions,
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
    mutationFn: async (args: InferRequestType<typeof client.workflows.$post>) =>
      parseResponse(client.workflows.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
