import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * GET /trees
 */
export function useGetTrees(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetTreesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.trees.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /trees
 */
export function getGetTreesQueryKey() {
  return ['/trees'] as const
}

/**
 * POST /trees
 */
export function usePostTrees(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.trees.$post>) =>
      parseResponse(client.trees.$post(args, clientOptions)),
  })
}

/**
 * GET /graphs
 */
export function useGetGraphs(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetGraphsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.graphs.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /graphs
 */
export function getGetGraphsQueryKey() {
  return ['/graphs'] as const
}

/**
 * GET /linked-lists
 */
export function useGetLinkedLists(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetLinkedListsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['linked-lists'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /linked-lists
 */
export function getGetLinkedListsQueryKey() {
  return ['/linked-lists'] as const
}

/**
 * GET /social-network
 */
export function useGetSocialNetwork(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSocialNetworkQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['social-network'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /social-network
 */
export function getGetSocialNetworkQueryKey() {
  return ['/social-network'] as const
}

/**
 * GET /file-system
 */
export function useGetFileSystem(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetFileSystemQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['file-system'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /file-system
 */
export function getGetFileSystemQueryKey() {
  return ['/file-system'] as const
}

/**
 * GET /comments
 */
export function useGetComments(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetCommentsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.comments.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /comments
 */
export function getGetCommentsQueryKey() {
  return ['/comments'] as const
}

/**
 * GET /polymorphic
 */
export function useGetPolymorphic(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetPolymorphicQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.polymorphic.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /polymorphic
 */
export function getGetPolymorphicQueryKey() {
  return ['/polymorphic'] as const
}

/**
 * GET /categories
 */
export function useGetCategories(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetCategoriesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.categories.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['/categories'] as const
}

/**
 * GET /workflow
 */
export function useGetWorkflow(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetWorkflowQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.workflow.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /workflow
 */
export function getGetWorkflowQueryKey() {
  return ['/workflow'] as const
}
