import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDocumentsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.documents.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /documents
 * Uses $url() for type-safe key generation
 */
export function getGetDocumentsKey(args: InferRequestType<typeof client.documents.$get>) {
  return client.documents.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostDocumentsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.documents.$post> }) =>
        parseResponse(client.documents.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /documents
 * Uses $url() for type-safe key generation
 */
export function getPostDocumentsMutationKey() {
  return `POST ${client.documents.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDocumentsDocumentIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.documents[':documentId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /documents/{documentId}
 * Uses $url() for type-safe key generation
 */
export function getGetDocumentsDocumentIdKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
) {
  return client.documents[':documentId'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutDocumentsDocumentIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.documents)[':documentId']['$put']> },
      ) => parseResponse(client.documents[':documentId'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /documents/{documentId}
 * Uses $url() for type-safe key generation
 */
export function getPutDocumentsDocumentIdMutationKey() {
  return `PUT ${client.documents[':documentId'].$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetDocumentsDocumentIdVersionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.documents[':documentId'].versions.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /documents/{documentId}/versions
 * Uses $url() for type-safe key generation
 */
export function getGetDocumentsDocumentIdVersionsKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
) {
  return client.documents[':documentId'].versions.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostDocumentsDocumentIdShareMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /documents/{documentId}/share
 * Uses $url() for type-safe key generation
 */
export function getPostDocumentsDocumentIdShareMutationKey() {
  return `POST ${client.documents[':documentId'].share.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdDocumentsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].documents.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}/documents
 * Uses $url() for type-safe key generation
 */
export function getGetUsersUserIdDocumentsKey(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
) {
  return client.users[':userId'].documents.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostCompareMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.compare.$post> }) =>
        parseResponse(client.compare.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /compare
 * Uses $url() for type-safe key generation
 */
export function getPostCompareMutationKey() {
  return `POST ${client.compare.$url().pathname}`
}

/**
 * GET /templates
 */
export function useGetTemplates(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTemplatesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.templates.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /templates
 * Uses $url() for type-safe key generation
 */
export function getGetTemplatesKey() {
  return client.templates.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostTemplatesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.templates.$post> }) =>
        parseResponse(client.templates.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /templates
 * Uses $url() for type-safe key generation
 */
export function getPostTemplatesMutationKey() {
  return `POST ${client.templates.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostWorkflowsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.workflows.$post> }) =>
        parseResponse(client.workflows.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /workflows
 * Uses $url() for type-safe key generation
 */
export function getPostWorkflowsMutationKey() {
  return `POST ${client.workflows.$url().pathname}`
}
