import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function usePostPolymorphic(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.polymorphic.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.polymorphic.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPolymorphicMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.polymorphic.$post> }) =>
        parseResponse(client.polymorphic.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /polymorphic
 * Uses $url() for type-safe key generation
 */
export function getPostPolymorphicMutationKey() {
  return `POST ${client.polymorphic.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetSearchKey(args: InferRequestType<typeof client.search.$get>) {
  return client.search.$url(args).pathname
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export function usePutMultiStep(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-step']['$put']>>>>
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client)['multi-step']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutMultiStepMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)['multi-step']['$put']> }) =>
        parseResponse(client['multi-step'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /multi-step
 * Uses $url() for type-safe key generation
 */
export function getPutMultiStepMutationKey() {
  return `PUT ${client['multi-step'].$url().pathname}`
}
