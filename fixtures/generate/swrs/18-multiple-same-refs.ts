import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
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
 */
export function getGetDocumentsKey(args?: InferRequestType<typeof client.documents.$get>) {
  return ['/documents', ...(args ? [args] : [])] as const
}

/**
 * POST /documents
 */
export function usePostDocuments(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /documents',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.documents.$post> }) =>
      parseResponse(client.documents.$post(arg, options?.client)),
  )
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
 */
export function getGetDocumentsDocumentIdKey(
  args?: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
) {
  return ['/documents/:documentId', ...(args ? [args] : [])] as const
}

/**
 * PUT /documents/{documentId}
 */
export function usePutDocumentsDocumentId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /documents/:documentId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.documents)[':documentId']['$put']> },
    ) => parseResponse(client.documents[':documentId'].$put(arg, options?.client)),
  )
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
 */
export function getGetDocumentsDocumentIdVersionsKey(
  args?: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
) {
  return ['/documents/:documentId/versions', ...(args ? [args] : [])] as const
}

/**
 * POST /documents/{documentId}/share
 */
export function usePostDocumentsDocumentIdShare(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /documents/:documentId/share',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.documents)[':documentId']['share']['$post']> },
    ) => parseResponse(client.documents[':documentId'].share.$post(arg, options?.client)),
  )
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
 */
export function getGetUsersUserIdDocumentsKey(
  args?: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
) {
  return ['/users/:userId/documents', ...(args ? [args] : [])] as const
}

/**
 * POST /compare
 */
export function usePostCompare(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /compare',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.compare.$post> }) =>
      parseResponse(client.compare.$post(arg, options?.client)),
  )
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
 */
export function getGetTemplatesKey() {
  return ['/templates'] as const
}

/**
 * POST /templates
 */
export function usePostTemplates(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /templates',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.templates.$post> }) =>
      parseResponse(client.templates.$post(arg, options?.client)),
  )
}

/**
 * POST /workflows
 */
export function usePostWorkflows(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /workflows',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.workflows.$post> }) =>
      parseResponse(client.workflows.$post(arg, options?.client)),
  )
}
