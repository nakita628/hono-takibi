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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.polymorphic.$post>,
    Error,
    string,
    InferRequestType<typeof client.polymorphic.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /polymorphic',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.polymorphic.$post> }) =>
      parseResponse(client.polymorphic.$post(arg, clientOptions)),
    mutationOptions,
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
export function usePutMultiStep(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['multi-step']['$put']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client)['multi-step']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /multi-step',
    async (_: string, { arg }: { arg: InferRequestType<(typeof client)['multi-step']['$put']> }) =>
      parseResponse(client['multi-step'].$put(arg, clientOptions)),
    mutationOptions,
  )
}
