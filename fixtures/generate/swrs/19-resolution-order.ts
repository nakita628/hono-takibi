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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEntitiesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.entities.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /entities
 */
export function getGetEntitiesKey() {
  return ['/entities'] as const
}

/**
 * POST /process
 */
export function usePostProcess(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.process.$post>,
    Error,
    string,
    InferRequestType<typeof client.process.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /process',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.process.$post> }) =>
      parseResponse(client.process.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /graph
 */
export function useGetGraph(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGraphKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.graph.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /graph
 */
export function getGetGraphKey() {
  return ['/graph'] as const
}

/**
 * POST /transform
 */
export function usePostTransform(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.transform.$post>,
    Error,
    string,
    InferRequestType<typeof client.transform.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /transform',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.transform.$post> }) =>
      parseResponse(client.transform.$post(arg, options?.client)),
    mutationOptions,
  )
}
