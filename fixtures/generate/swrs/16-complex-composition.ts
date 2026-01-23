import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export function usePostMessages(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.messages.$post>,
    Error,
    string,
    InferRequestType<typeof client.messages.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.messages.$post>,
    Error,
    string,
    InferRequestType<typeof client.messages.$post>
  >(
    'POST /messages',
    async (_, { arg }) => parseResponse(client.messages.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /events
 */
export function usePostEvents(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.events.$post>,
    Error,
    string,
    InferRequestType<typeof client.events.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.events.$post>,
    Error,
    string,
    InferRequestType<typeof client.events.$post>
  >(
    'POST /events',
    async (_, { arg }) => parseResponse(client.events.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /configs
 */
export function useGetConfigs(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.configs.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/configs'] as const) : null
  return useSWR<InferResponseType<typeof client.configs.$get>, Error>(
    key,
    async () => parseResponse(client.configs.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /configs
 */
export function getGetConfigsKey() {
  return ['GET', '/configs'] as const
}

/**
 * PUT /configs
 */
export function usePutConfigs(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.configs.$put>,
    Error,
    string,
    InferRequestType<typeof client.configs.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.configs.$put>,
    Error,
    string,
    InferRequestType<typeof client.configs.$put>
  >(
    'PUT /configs',
    async (_, { arg }) => parseResponse(client.configs.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /resources
 */
export function usePostResources(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.resources.$post>,
    Error,
    string,
    InferRequestType<typeof client.resources.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.resources.$post>,
    Error,
    string,
    InferRequestType<typeof client.resources.$post>
  >(
    'POST /resources',
    async (_, { arg }) => parseResponse(client.resources.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /validations
 */
export function usePostValidations(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.validations.$post>,
    Error,
    string,
    InferRequestType<typeof client.validations.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.validations.$post>,
    Error,
    string,
    InferRequestType<typeof client.validations.$post>
  >(
    'POST /validations',
    async (_, { arg }) => parseResponse(client.validations.$post(arg, options?.client)),
    options?.swr,
  )
}
