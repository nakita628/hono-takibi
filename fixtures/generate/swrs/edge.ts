import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function usePostPolymorphic(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.polymorphic.$post>,
    Error,
    string,
    InferRequestType<typeof client.polymorphic.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.polymorphic.$post>,
    Error,
    string,
    InferRequestType<typeof client.polymorphic.$post>
  >(
    'POST /polymorphic',
    async (_, { arg }) => parseResponse(client.polymorphic.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<typeof client.search.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSearchKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.search.$get>, Error>(
    swrKey,
    async () => parseResponse(client.search.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /search
 */
export function getGetSearchKey(args: InferRequestType<typeof client.search.$get>) {
  return ['GET', '/search', args] as const
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export function usePutMultiStep(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['multi-step']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client)['multi-step']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['multi-step']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client)['multi-step']['$put']>
  >(
    'PUT /multi-step',
    async (_, { arg }) => parseResponse(client['multi-step'].$put(arg, options?.client)),
    options?.swr,
  )
}
