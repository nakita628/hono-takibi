import type {
  CreateMutationOptions,
  CreateQueryOptions,
  QueryFunctionContext,
} from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * Generates Svelte Query cache key for GET /documents
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetDocumentsQueryKey(args: InferRequestType<typeof client.documents.$get>) {
  return ['documents', 'GET', '/documents', args] as const
}

/**
 * Returns Svelte Query query options for GET /documents
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
export function createGetDocuments(
  args: InferRequestType<typeof client.documents.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDocumentsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /documents
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDocumentsMutationKey() {
  return ['documents', 'POST', '/documents'] as const
}

/**
 * Returns Svelte Query mutation options for POST /documents
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDocumentsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostDocumentsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.documents.$post>) =>
    parseResponse(client.documents.$post(args, clientOptions)),
})

/**
 * POST /documents
 */
export function createPostDocuments(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$post>>>>>,
      Error,
      InferRequestType<typeof client.documents.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostDocumentsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /documents/{documentId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetDocumentsDocumentIdQueryKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
) {
  return ['documents', 'GET', '/documents/:documentId', args] as const
}

/**
 * Returns Svelte Query query options for GET /documents/{documentId}
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
export function createGetDocumentsDocumentId(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.documents)[':documentId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDocumentsDocumentIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /documents/{documentId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutDocumentsDocumentIdMutationKey() {
  return ['documents', 'PUT', '/documents/:documentId'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /documents/{documentId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutDocumentsDocumentIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutDocumentsDocumentIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.documents)[':documentId']['$put']>) =>
    parseResponse(client.documents[':documentId'].$put(args, clientOptions)),
})

/**
 * PUT /documents/{documentId}
 */
export function createPutDocumentsDocumentId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.documents)[':documentId']['$put']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.documents)[':documentId']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutDocumentsDocumentIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /documents/{documentId}/versions
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetDocumentsDocumentIdVersionsQueryKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
) {
  return ['documents', 'GET', '/documents/:documentId/versions', args] as const
}

/**
 * Returns Svelte Query query options for GET /documents/{documentId}/versions
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
export function createGetDocumentsDocumentIdVersions(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.documents)[':documentId']['versions']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDocumentsDocumentIdVersionsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /documents/{documentId}/share
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDocumentsDocumentIdShareMutationKey() {
  return ['documents', 'POST', '/documents/:documentId/share'] as const
}

/**
 * Returns Svelte Query mutation options for POST /documents/{documentId}/share
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDocumentsDocumentIdShareMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostDocumentsDocumentIdShareMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>,
  ) => parseResponse(client.documents[':documentId'].share.$post(args, clientOptions)),
})

/**
 * POST /documents/{documentId}/share
 */
export function createPostDocumentsDocumentIdShare(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.documents)[':documentId']['share']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostDocumentsDocumentIdShareMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}/documents
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdDocumentsQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
) {
  return ['users', 'GET', '/users/:userId/documents', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{userId}/documents
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
export function createGetUsersUserIdDocuments(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['documents']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdDocumentsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /compare
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostCompareMutationKey() {
  return ['compare', 'POST', '/compare'] as const
}

/**
 * Returns Svelte Query mutation options for POST /compare
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostCompareMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostCompareMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.compare.$post>) =>
    parseResponse(client.compare.$post(args, clientOptions)),
})

/**
 * POST /compare
 */
export function createPostCompare(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.compare.$post>>>>>,
      Error,
      InferRequestType<typeof client.compare.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostCompareMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /templates
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTemplatesQueryKey() {
  return ['templates', 'GET', '/templates'] as const
}

/**
 * Returns Svelte Query query options for GET /templates
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
export function createGetTemplates(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTemplatesQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /templates
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTemplatesMutationKey() {
  return ['templates', 'POST', '/templates'] as const
}

/**
 * Returns Svelte Query mutation options for POST /templates
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTemplatesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostTemplatesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.templates.$post>) =>
    parseResponse(client.templates.$post(args, clientOptions)),
})

/**
 * POST /templates
 */
export function createPostTemplates(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$post>>>>>,
      Error,
      InferRequestType<typeof client.templates.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostTemplatesMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /workflows
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWorkflowsMutationKey() {
  return ['workflows', 'POST', '/workflows'] as const
}

/**
 * Returns Svelte Query mutation options for POST /workflows
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWorkflowsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostWorkflowsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.workflows.$post>) =>
    parseResponse(client.workflows.$post(args, clientOptions)),
})

/**
 * POST /workflows
 */
export function createPostWorkflows(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.workflows.$post>>>>>,
      Error,
      InferRequestType<typeof client.workflows.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostWorkflowsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
