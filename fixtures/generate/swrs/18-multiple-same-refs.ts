import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * GET /documents
 */
export function useGetDocuments(
  args: InferRequestType<typeof client.documents.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.documents.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDocumentsKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.documents.$get>, Error>(
    swrKey,
    async () => parseResponse(client.documents.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /documents
 */
export function getGetDocumentsKey(args?: InferRequestType<typeof client.documents.$get>) {
  return ['/documents', ...(args ? [args] : [])] as const
}

/**
 * POST /documents
 */
export function usePostDocuments(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.documents.$post>,
    Error,
    string,
    InferRequestType<typeof client.documents.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.documents.$post>,
    Error,
    string,
    InferRequestType<typeof client.documents.$post>
  >(
    'POST /documents',
    async (_, { arg }) => parseResponse(client.documents.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /documents/{documentId}
 */
export function useGetDocumentsDocumentId(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.documents)[':documentId']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDocumentsDocumentIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.documents)[':documentId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.documents[':documentId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /documents/{documentId}
 */
export function getGetDocumentsDocumentIdKey(
  args?: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
) {
  return ['/documents/:documentId', ...(args ? [args] : [])] as const
}

/**
 * PUT /documents/{documentId}
 */
export function usePutDocumentsDocumentId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.documents)[':documentId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.documents)[':documentId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.documents)[':documentId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.documents)[':documentId']['$put']>
  >(
    'PUT /documents/:documentId',
    async (_, { arg }) => parseResponse(client.documents[':documentId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /documents/{documentId}/versions
 */
export function useGetDocumentsDocumentIdVersions(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.documents)[':documentId']['versions']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetDocumentsDocumentIdVersionsKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.documents)[':documentId']['versions']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.documents[':documentId'].versions.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /documents/{documentId}/versions
 */
export function getGetDocumentsDocumentIdVersionsKey(
  args?: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
) {
  return ['/documents/:documentId/versions', ...(args ? [args] : [])] as const
}

/**
 * POST /documents/{documentId}/share
 */
export function usePostDocumentsDocumentIdShare(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.documents)[':documentId']['share']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.documents)[':documentId']['share']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.documents)[':documentId']['share']['$post']>
  >(
    'POST /documents/:documentId/share',
    async (_, { arg }) =>
      parseResponse(client.documents[':documentId'].share.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /users/{userId}/documents
 */
export function useGetUsersUserIdDocuments(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.users)[':userId']['documents']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdDocumentsKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.users)[':userId']['documents']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.users[':userId'].documents.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/{userId}/documents
 */
export function getGetUsersUserIdDocumentsKey(
  args?: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
) {
  return ['/users/:userId/documents', ...(args ? [args] : [])] as const
}

/**
 * POST /compare
 */
export function usePostCompare(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.compare.$post>,
    Error,
    string,
    InferRequestType<typeof client.compare.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.compare.$post>,
    Error,
    string,
    InferRequestType<typeof client.compare.$post>
  >(
    'POST /compare',
    async (_, { arg }) => parseResponse(client.compare.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /templates
 */
export function useGetTemplates(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.templates.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTemplatesKey() : null)
  const query = useSWR<InferResponseType<typeof client.templates.$get>, Error>(
    swrKey,
    async () => parseResponse(client.templates.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /templates
 */
export function getGetTemplatesKey() {
  return ['/templates'] as const
}

/**
 * POST /templates
 */
export function usePostTemplates(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.templates.$post>,
    Error,
    string,
    InferRequestType<typeof client.templates.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.templates.$post>,
    Error,
    string,
    InferRequestType<typeof client.templates.$post>
  >(
    'POST /templates',
    async (_, { arg }) => parseResponse(client.templates.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /workflows
 */
export function usePostWorkflows(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.workflows.$post>,
    Error,
    string,
    InferRequestType<typeof client.workflows.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.workflows.$post>,
    Error,
    string,
    InferRequestType<typeof client.workflows.$post>
  >(
    'POST /workflows',
    async (_, { arg }) => parseResponse(client.workflows.$post(arg, options?.client)),
    options?.swr,
  )
}
