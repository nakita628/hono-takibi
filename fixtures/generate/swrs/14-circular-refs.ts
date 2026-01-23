import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/14-circular-refs'

/**
 * GET /trees
 */
export function useGetTrees(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.trees.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTreesKey() : null)
  const query = useSWR<InferResponseType<typeof client.trees.$get>, Error>(
    swrKey,
    async () => parseResponse(client.trees.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /trees
 */
export function getGetTreesKey() {
  return ['/trees'] as const
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
  swr?: SWRConfiguration<InferResponseType<typeof client.graphs.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGraphsKey() : null)
  const query = useSWR<InferResponseType<typeof client.graphs.$get>, Error>(
    swrKey,
    async () => parseResponse(client.graphs.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /graphs
 */
export function getGetGraphsKey() {
  return ['/graphs'] as const
}

/**
 * GET /linked-lists
 */
export function useGetLinkedLists(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['linked-lists']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetLinkedListsKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['linked-lists']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['linked-lists'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /linked-lists
 */
export function getGetLinkedListsKey() {
  return ['/linked-lists'] as const
}

/**
 * GET /social-network
 */
export function useGetSocialNetwork(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['social-network']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSocialNetworkKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['social-network']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['social-network'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /social-network
 */
export function getGetSocialNetworkKey() {
  return ['/social-network'] as const
}

/**
 * GET /file-system
 */
export function useGetFileSystem(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['file-system']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFileSystemKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['file-system']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['file-system'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /file-system
 */
export function getGetFileSystemKey() {
  return ['/file-system'] as const
}

/**
 * GET /comments
 */
export function useGetComments(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.comments.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCommentsKey() : null)
  const query = useSWR<InferResponseType<typeof client.comments.$get>, Error>(
    swrKey,
    async () => parseResponse(client.comments.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /comments
 */
export function getGetCommentsKey() {
  return ['/comments'] as const
}

/**
 * GET /polymorphic
 */
export function useGetPolymorphic(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.polymorphic.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPolymorphicKey() : null)
  const query = useSWR<InferResponseType<typeof client.polymorphic.$get>, Error>(
    swrKey,
    async () => parseResponse(client.polymorphic.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /polymorphic
 */
export function getGetPolymorphicKey() {
  return ['/polymorphic'] as const
}

/**
 * GET /categories
 */
export function useGetCategories(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.categories.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCategoriesKey() : null)
  const query = useSWR<InferResponseType<typeof client.categories.$get>, Error>(
    swrKey,
    async () => parseResponse(client.categories.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /categories
 */
export function getGetCategoriesKey() {
  return ['/categories'] as const
}

/**
 * GET /workflow
 */
export function useGetWorkflow(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.workflow.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWorkflowKey() : null)
  const query = useSWR<InferResponseType<typeof client.workflow.$get>, Error>(
    swrKey,
    async () => parseResponse(client.workflow.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /workflow
 */
export function getGetWorkflowKey() {
  return ['/workflow'] as const
}
