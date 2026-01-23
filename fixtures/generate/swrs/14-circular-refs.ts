import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * GET /trees
 */
export function useGetTrees(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.trees.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/trees'] as const) : null
  return useSWR<InferResponseType<typeof client.trees.$get>, Error>(
    key,
    async () => parseResponse(client.trees.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /trees
 */
export function getGetTreesKey() {
  return ['GET', '/trees'] as const
}

/**
 * POST /trees
 */
export function usePostTrees(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.trees.$post>,
    Error,
    string,
    InferRequestType<typeof client.trees.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.trees.$post>,
    Error,
    string,
    InferRequestType<typeof client.trees.$post>
  >(
    'POST /trees',
    async (_, { arg }) => parseResponse(client.trees.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /graphs
 */
export function useGetGraphs(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.graphs.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/graphs'] as const) : null
  return useSWR<InferResponseType<typeof client.graphs.$get>, Error>(
    key,
    async () => parseResponse(client.graphs.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /graphs
 */
export function getGetGraphsKey() {
  return ['GET', '/graphs'] as const
}

/**
 * GET /linked-lists
 */
export function useGetLinkedLists(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['linked-lists']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/linked-lists'] as const) : null
  return useSWR<InferResponseType<(typeof client)['linked-lists']['$get']>, Error>(
    key,
    async () => parseResponse(client['linked-lists'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /linked-lists
 */
export function getGetLinkedListsKey() {
  return ['GET', '/linked-lists'] as const
}

/**
 * GET /social-network
 */
export function useGetSocialNetwork(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['social-network']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/social-network'] as const) : null
  return useSWR<InferResponseType<(typeof client)['social-network']['$get']>, Error>(
    key,
    async () => parseResponse(client['social-network'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /social-network
 */
export function getGetSocialNetworkKey() {
  return ['GET', '/social-network'] as const
}

/**
 * GET /file-system
 */
export function useGetFileSystem(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['file-system']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/file-system'] as const) : null
  return useSWR<InferResponseType<(typeof client)['file-system']['$get']>, Error>(
    key,
    async () => parseResponse(client['file-system'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /file-system
 */
export function getGetFileSystemKey() {
  return ['GET', '/file-system'] as const
}

/**
 * GET /comments
 */
export function useGetComments(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.comments.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/comments'] as const) : null
  return useSWR<InferResponseType<typeof client.comments.$get>, Error>(
    key,
    async () => parseResponse(client.comments.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /comments
 */
export function getGetCommentsKey() {
  return ['GET', '/comments'] as const
}

/**
 * GET /polymorphic
 */
export function useGetPolymorphic(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.polymorphic.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/polymorphic'] as const) : null
  return useSWR<InferResponseType<typeof client.polymorphic.$get>, Error>(
    key,
    async () => parseResponse(client.polymorphic.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /polymorphic
 */
export function getGetPolymorphicKey() {
  return ['GET', '/polymorphic'] as const
}

/**
 * GET /categories
 */
export function useGetCategories(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.categories.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/categories'] as const) : null
  return useSWR<InferResponseType<typeof client.categories.$get>, Error>(
    key,
    async () => parseResponse(client.categories.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /categories
 */
export function getGetCategoriesKey() {
  return ['GET', '/categories'] as const
}

/**
 * GET /workflow
 */
export function useGetWorkflow(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.workflow.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/workflow'] as const) : null
  return useSWR<InferResponseType<typeof client.workflow.$get>, Error>(
    key,
    async () => parseResponse(client.workflow.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /workflow
 */
export function getGetWorkflowKey() {
  return ['GET', '/workflow'] as const
}
