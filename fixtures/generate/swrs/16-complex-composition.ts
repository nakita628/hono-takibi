import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export function usePostMessages(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.messages.$post>,
    Error,
    string,
    InferRequestType<typeof client.messages.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /messages',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.messages.$post> }) =>
      parseResponse(client.messages.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /events
 */
export function usePostEvents(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.events.$post>,
    Error,
    string,
    InferRequestType<typeof client.events.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /events',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.events.$post> }) =>
      parseResponse(client.events.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /configs
 */
export function useGetConfigs(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetConfigsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.configs.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /configs
 */
export function getGetConfigsKey() {
  return ['/configs'] as const
}

/**
 * PUT /configs
 */
export function usePutConfigs(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.configs.$put>,
    Error,
    string,
    InferRequestType<typeof client.configs.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /configs',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.configs.$put> }) =>
      parseResponse(client.configs.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /resources
 */
export function usePostResources(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.resources.$post>,
    Error,
    string,
    InferRequestType<typeof client.resources.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /resources',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.resources.$post> }) =>
      parseResponse(client.resources.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /validations
 */
export function usePostValidations(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.validations.$post>,
    Error,
    string,
    InferRequestType<typeof client.validations.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /validations',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.validations.$post> }) =>
      parseResponse(client.validations.$post(arg, clientOptions)),
    mutationOptions,
  )
}
