import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * GET /documents
 */
export function useGetDocuments(
  args: InferRequestType<typeof client.documents.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetDocumentsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.documents.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /documents
 */
export function getGetDocumentsQueryKey(args: InferRequestType<typeof client.documents.$get>) {
  return ['/documents', args] as const
}

/**
 * POST /documents
 */
export function usePostDocuments(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.documents.$post>) =>
      parseResponse(client.documents.$post(args, clientOptions)),
  })
}

/**
 * GET /documents/{documentId}
 */
export function useGetDocumentsDocumentId(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetDocumentsDocumentIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.documents[':documentId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /documents/{documentId}
 */
export function getGetDocumentsDocumentIdQueryKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['$get']>,
) {
  return ['/documents/:documentId', args] as const
}

/**
 * PUT /documents/{documentId}
 */
export function usePutDocumentsDocumentId(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.documents)[':documentId']['$put']>) =>
      parseResponse(client.documents[':documentId'].$put(args, clientOptions)),
  })
}

/**
 * GET /documents/{documentId}/versions
 */
export function useGetDocumentsDocumentIdVersions(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetDocumentsDocumentIdVersionsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.documents[':documentId'].versions.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /documents/{documentId}/versions
 */
export function getGetDocumentsDocumentIdVersionsQueryKey(
  args: InferRequestType<(typeof client.documents)[':documentId']['versions']['$get']>,
) {
  return ['/documents/:documentId/versions', args] as const
}

/**
 * POST /documents/{documentId}/share
 */
export function usePostDocumentsDocumentIdShare(clientOptions?: ClientRequestOptions) {
  return useMutation({
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersUserIdDocumentsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users[':userId'].documents.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}/documents
 */
export function getGetUsersUserIdDocumentsQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['documents']['$get']>,
) {
  return ['/users/:userId/documents', args] as const
}

/**
 * POST /compare
 */
export function usePostCompare(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.compare.$post>) =>
      parseResponse(client.compare.$post(args, clientOptions)),
  })
}

/**
 * GET /templates
 */
export function useGetTemplates(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetTemplatesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.templates.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /templates
 */
export function getGetTemplatesQueryKey() {
  return ['/templates'] as const
}

/**
 * POST /templates
 */
export function usePostTemplates(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.templates.$post>) =>
      parseResponse(client.templates.$post(args, clientOptions)),
  })
}

/**
 * POST /workflows
 */
export function usePostWorkflows(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.workflows.$post>) =>
      parseResponse(client.workflows.$post(args, clientOptions)),
  })
}
