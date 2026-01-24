import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * GET /documents
 */
export function createGetDocuments(
  args: InferRequestType<typeof client.documents.$get>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /documents
 */
export function getGetDocumentsQueryKey(args: InferRequestType<typeof client.documents.$get>) {
  return ['/documents', args] as const
}

/**
 * POST /documents
 */
export function createPostDocuments(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.documents.$post>) =>
        parseResponse(client.documents.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /documents/{documentId}
 */
export function createGetDocumentsDocumentId(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
export function createPutDocumentsDocumentId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.documents)[':documentId']['$put']>,
      ) => parseResponse(client.documents[':documentId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /documents/{documentId}/versions
 */
export function createGetDocumentsDocumentIdVersions(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
export function createPostDocumentsDocumentIdShare(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>,
      ) => parseResponse(client.documents[':documentId'].share.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /users/{userId}/documents
 */
export function createGetUsersUserIdDocuments(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
export function createPostCompare(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.compare.$post>) =>
        parseResponse(client.compare.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /templates
 */
export function createGetTemplates(
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /templates
 */
export function getGetTemplatesQueryKey() {
  return ['/templates'] as const
}

/**
 * POST /templates
 */
export function createPostTemplates(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.templates.$post>) =>
        parseResponse(client.templates.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /workflows
 */
export function createPostWorkflows(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.workflows.$post>) =>
        parseResponse(client.workflows.$post(args, options?.client)),
    },
    queryClient,
  )
}
