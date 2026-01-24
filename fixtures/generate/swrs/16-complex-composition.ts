import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export function usePostMessages(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /messages',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.messages.$post> }) =>
      parseResponse(client.messages.$post(arg, options?.client)),
  )
}

/**
 * POST /events
 */
export function usePostEvents(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /events',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.events.$post> }) =>
      parseResponse(client.events.$post(arg, options?.client)),
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
export function usePutConfigs(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /configs',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.configs.$put> }) =>
      parseResponse(client.configs.$put(arg, options?.client)),
  )
}

/**
 * POST /resources
 */
export function usePostResources(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /resources',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.resources.$post> }) =>
      parseResponse(client.resources.$post(arg, options?.client)),
  )
}

/**
 * POST /validations
 */
export function usePostValidations(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /validations',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.validations.$post> }) =>
      parseResponse(client.validations.$post(arg, options?.client)),
  )
}
