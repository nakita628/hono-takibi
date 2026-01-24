import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function usePostPolymorphic(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /polymorphic',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.polymorphic.$post> }) =>
      parseResponse(client.polymorphic.$post(arg, options?.client)),
  )
}

/**
 * GET /search
 *
 * Search with complex query
 */
export function useGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSearchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.search.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search
 */
export function getGetSearchKey(args?: InferRequestType<typeof client.search.$get>) {
  return ['/search', ...(args ? [args] : [])] as const
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export function usePutMultiStep(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /multi-step',
    async (_: string, { arg }: { arg: InferRequestType<(typeof client)['multi-step']['$put']> }) =>
      parseResponse(client['multi-step'].$put(arg, options?.client)),
  )
}
