import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * Generates SWR cache key for GET /documents
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetDocumentsKey(args: InferRequestType<typeof client.documents.$get>) {
  return ['/documents', args] as const
}

/**
 * GET /documents
 */
export function useGetDocuments(
  args: InferRequestType<typeof client.documents.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetDocumentsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.documents.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /documents
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostDocumentsMutationKey() {
  return ['/documents'] as const
}

/**
 * POST /documents
 */
export function usePostDocuments(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.documents.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostDocumentsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.documents.$post> }) =>
        parseResponse(client.documents.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /documents/{documentId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetDocumentsDocumentIdKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
) {
  return [`/documents/${args.param.documentId}`, args] as const
}

/**
 * GET /documents/{documentId}
 */
export function useGetDocumentsDocumentId(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetDocumentsDocumentIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.documents[':documentId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /documents/{documentId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutDocumentsDocumentIdMutationKey() {
  return ['/documents/:documentId'] as const
}

/**
 * PUT /documents/{documentId}
 */
export function usePutDocumentsDocumentId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.documents)[':documentId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.documents)[':documentId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutDocumentsDocumentIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.documents)[':documentId']['$put']> },
      ) => parseResponse(client.documents[':documentId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /documents/{documentId}/versions
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetDocumentsDocumentIdVersionsKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
) {
  return [`/documents/${args.param.documentId}/versions`, args] as const
}

/**
 * GET /documents/{documentId}/versions
 */
export function useGetDocumentsDocumentIdVersions(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetDocumentsDocumentIdVersionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.documents[':documentId'].versions.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /documents/{documentId}/share
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostDocumentsDocumentIdShareMutationKey() {
  return ['/documents/:documentId/share'] as const
}

/**
 * POST /documents/{documentId}/share
 */
export function usePostDocumentsDocumentIdShare(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.documents)[':documentId']['share']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostDocumentsDocumentIdShareMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']> },
      ) => parseResponse(client.documents[':documentId'].share.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}/documents
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersUserIdDocumentsKey(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
) {
  return [`/users/${args.param.userId}/documents`, args] as const
}

/**
 * GET /users/{userId}/documents
 */
export function useGetUsersUserIdDocuments(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersUserIdDocumentsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].documents.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /compare
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostCompareMutationKey() {
  return ['/compare'] as const
}

/**
 * POST /compare
 */
export function usePostCompare(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.compare.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.compare.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostCompareMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.compare.$post> }) =>
        parseResponse(client.compare.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /templates
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetTemplatesKey() {
  return ['/templates'] as const
}

/**
 * GET /templates
 */
export function useGetTemplates(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTemplatesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.templates.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /templates
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostTemplatesMutationKey() {
  return ['/templates'] as const
}

/**
 * POST /templates
 */
export function usePostTemplates(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.templates.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.templates.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostTemplatesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.templates.$post> }) =>
        parseResponse(client.templates.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /workflows
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostWorkflowsMutationKey() {
  return ['/workflows'] as const
}

/**
 * POST /workflows
 */
export function usePostWorkflows(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.workflows.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.workflows.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWorkflowsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.workflows.$post> }) =>
        parseResponse(client.workflows.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
