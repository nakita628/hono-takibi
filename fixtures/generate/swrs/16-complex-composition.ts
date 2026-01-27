import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/16-complex-composition'

/**
 * Generates SWR mutation key for POST /messages
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMessagesMutationKey() {
  return ['messages', 'POST', '/messages'] as const
}

/**
 * POST /messages
 */
export function usePostMessages(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.messages.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMessagesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.messages.$post> }) =>
        parseResponse(client.messages.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /events
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEventsMutationKey() {
  return ['events', 'POST', '/events'] as const
}

/**
 * POST /events
 */
export function usePostEvents(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.events.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.events.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEventsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.events.$post> }) =>
        parseResponse(client.events.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /configs
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetConfigsKey() {
  return ['configs', 'GET', '/configs'] as const
}

/**
 * GET /configs
 */
export function useGetConfigs(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetConfigsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.configs.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /configs
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutConfigsMutationKey() {
  return ['configs', 'PUT', '/configs'] as const
}

/**
 * PUT /configs
 */
export function usePutConfigs(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.configs.$put>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.configs.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutConfigsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.configs.$put> }) =>
        parseResponse(client.configs.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /resources
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostResourcesMutationKey() {
  return ['resources', 'POST', '/resources'] as const
}

/**
 * POST /resources
 */
export function usePostResources(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.resources.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.resources.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostResourcesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.resources.$post> }) =>
        parseResponse(client.resources.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /validations
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostValidationsMutationKey() {
  return ['validations', 'POST', '/validations'] as const
}

/**
 * POST /validations
 */
export function usePostValidations(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.validations.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.validations.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostValidationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.validations.$post> }) =>
        parseResponse(client.validations.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
