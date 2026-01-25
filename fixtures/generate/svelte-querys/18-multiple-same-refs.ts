import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * GET /documents
 */
export function createGetDocuments(
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
  return createQuery({
    queryKey: getGetDocumentsQueryKey(args),
    queryFn: async () => parseResponse(client.documents.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /documents
 */
export function getGetDocumentsQueryKey(args: InferRequestType<typeof client.documents.$get>) {
  return ['/documents', args] as const
}

/**
 * POST /documents
 */
export function createPostDocuments(options?: {
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
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.documents.$post>) =>
      parseResponse(client.documents.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /documents/{documentId}
 */
export function createGetDocumentsDocumentId(
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
  return createQuery({
    queryKey: getGetDocumentsDocumentIdQueryKey(args),
    queryFn: async () => parseResponse(client.documents[':documentId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /documents/{documentId}
 */
export function getGetDocumentsDocumentIdQueryKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
) {
  return ['/documents/:documentId', args] as const
}

/**
 * PUT /documents/{documentId}
 */
export function createPutDocumentsDocumentId(options?: {
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
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.documents)[':documentId']['$put']>) =>
      parseResponse(client.documents[':documentId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /documents/{documentId}/versions
 */
export function createGetDocumentsDocumentIdVersions(
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
  return createQuery({
    queryKey: getGetDocumentsDocumentIdVersionsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.documents[':documentId'].versions.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /documents/{documentId}/versions
 */
export function getGetDocumentsDocumentIdVersionsQueryKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
) {
  return ['/documents/:documentId/versions', args] as const
}

/**
 * POST /documents/{documentId}/share
 */
export function createPostDocumentsDocumentIdShare(options?: {
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
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>,
    ) => parseResponse(client.documents[':documentId'].share.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/{userId}/documents
 */
export function createGetUsersUserIdDocuments(
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
  return createQuery({
    queryKey: getGetUsersUserIdDocumentsQueryKey(args),
    queryFn: async () => parseResponse(client.users[':userId'].documents.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}/documents
 */
export function getGetUsersUserIdDocumentsQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
) {
  return ['/users/:userId/documents', args] as const
}

/**
 * POST /compare
 */
export function createPostCompare(options?: {
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
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.compare.$post>) =>
      parseResponse(client.compare.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /templates
 */
export function createGetTemplates(options?: {
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
  return createQuery({
    queryKey: getGetTemplatesQueryKey(),
    queryFn: async () => parseResponse(client.templates.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /templates
 */
export function getGetTemplatesQueryKey() {
  return ['/templates'] as const
}

/**
 * POST /templates
 */
export function createPostTemplates(options?: {
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
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.templates.$post>) =>
      parseResponse(client.templates.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /workflows
 */
export function createPostWorkflows(options?: {
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
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.workflows.$post>) =>
      parseResponse(client.workflows.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
