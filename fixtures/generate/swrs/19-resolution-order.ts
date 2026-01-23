import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/19-resolution-order'

/**
 * GET /entities
 */
export function useGetEntities(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.entities.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/entities'] as const) : null
  return useSWR<InferResponseType<typeof client.entities.$get>, Error>(
    key,
    async () => parseResponse(client.entities.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.graph.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/graph'] as const) : null
  return useSWR<InferResponseType<typeof client.graph.$get>, Error>(
    key,
    async () => parseResponse(client.graph.$get(undefined, options?.client)),
    options?.swr,
  )
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
