import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/14-circular-refs'

/**
 * GET /trees
 */
export function useGetTrees(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTreesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.trees.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.trees.$post>,
    Error,
    string,
    InferRequestType<typeof client.trees.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /trees',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.trees.$post> }) =>
      parseResponse(client.trees.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /graphs
 */
export function useGetGraphs(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGraphsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.graphs.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetLinkedListsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['linked-lists'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSocialNetworkKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['social-network'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFileSystemKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['file-system'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCommentsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.comments.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPolymorphicKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.polymorphic.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCategoriesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.categories.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWorkflowKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.workflow.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /workflow
 */
export function getGetWorkflowKey() {
  return ['/workflow'] as const
}
