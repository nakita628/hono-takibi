import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/19-resolution-order'

/**
 * GET /entities
 */
export function useGetEntities(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.entities.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEntitiesKey() : null)
  const query = useSWR<InferResponseType<typeof client.entities.$get>, Error>(
    swrKey,
    async () => parseResponse(client.entities.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /entities
 */
export function getGetEntitiesKey() {
  return ['GET', '/entities'] as const
}

/**
 * POST /process
 */
export function usePostProcess(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.process.$post>,
    Error,
    string,
    InferRequestType<typeof client.process.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.process.$post>,
    Error,
    string,
    InferRequestType<typeof client.process.$post>
  >(
    'POST /process',
    async (_, { arg }) => parseResponse(client.process.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /graph
 */
export function useGetGraph(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.graph.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGraphKey() : null)
  const query = useSWR<InferResponseType<typeof client.graph.$get>, Error>(
    swrKey,
    async () => parseResponse(client.graph.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /graph
 */
export function getGetGraphKey() {
  return ['GET', '/graph'] as const
}

/**
 * POST /transform
 */
export function usePostTransform(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.transform.$post>,
    Error,
    string,
    InferRequestType<typeof client.transform.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.transform.$post>,
    Error,
    string,
    InferRequestType<typeof client.transform.$post>
  >(
    'POST /transform',
    async (_, { arg }) => parseResponse(client.transform.$post(arg, options?.client)),
    options?.swr,
  )
}
