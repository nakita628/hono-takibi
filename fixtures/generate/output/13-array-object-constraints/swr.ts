import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Key prefix for /config
 */
export function getConfigKey() {
  return ['config'] as const
}

/**
 * Key prefix for /payment
 */
export function getPaymentKey() {
  return ['payment'] as const
}

/**
 * Key prefix for /settings
 */
export function getSettingsKey() {
  return ['settings'] as const
}

/**
 * Key prefix for /tags
 */
export function getTagsKey() {
  return ['tags'] as const
}

/**
 * GET /tags query key
 */
export function getGetTagsKey() {
  return ['tags', '/tags'] as const
}

/**
 * GET /tags
 */
export async function getTags(options?: ClientRequestOptions) {
  return await parseResponse(client.tags.$get(undefined, options))
}

/**
 * GET /tags
 */
export function useGetTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTagsKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getTags(clientOptions), restSwrOptions) }
}

/**
 * GET /tags
 */
export function useImmutableGetTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTagsKey()) : null
  return { swrKey, ...useSWRImmutable(swrKey, async () => getTags(clientOptions), restSwrOptions) }
}

/**
 * GET /tags infinite query key
 */
export function getGetTagsInfiniteKey() {
  return ['tags', '/tags', 'infinite'] as const
}

/**
 * GET /tags
 */
export function useInfiniteGetTags(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getTags>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetTagsInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getTags(clientOptions), restSwrOptions)
}

/**
 * POST /tags
 */
export async function postTags(
  args: InferRequestType<typeof client.tags.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tags.$post(args, options))
}

/**
 * POST /tags
 */
export function usePostTags(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postTags>>,
    Error,
    Key,
    InferRequestType<typeof client.tags.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['tags', '/tags'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.tags.$post> }) =>
        postTags(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * GET /settings query key
 */
export function getGetSettingsKey(args: InferRequestType<typeof client.settings.$get>) {
  return ['settings', '/settings', args] as const
}

/**
 * GET /settings
 */
export async function getSettings(
  args: InferRequestType<typeof client.settings.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.settings.$get(args, options))
}

/**
 * GET /settings
 */
export function useGetSettings(
  args: InferRequestType<typeof client.settings.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSettingsKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getSettings(args, clientOptions), restSwrOptions) }
}

/**
 * GET /settings
 */
export function useImmutableGetSettings(
  args: InferRequestType<typeof client.settings.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSettingsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getSettings(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /settings infinite query key
 */
export function getGetSettingsInfiniteKey(args: InferRequestType<typeof client.settings.$get>) {
  return ['settings', '/settings', args, 'infinite'] as const
}

/**
 * GET /settings
 */
export function useInfiniteGetSettings(
  args: InferRequestType<typeof client.settings.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getSettings>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetSettingsInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getSettings(args, clientOptions), restSwrOptions)
}

/**
 * PUT /settings
 */
export async function putSettings(
  args: InferRequestType<typeof client.settings.$put>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.settings.$put(args, options))
}

/**
 * PUT /settings
 */
export function usePutSettings(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof putSettings>>,
    Error,
    Key,
    InferRequestType<typeof client.settings.$put>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['settings', '/settings'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.settings.$put> }) =>
        putSettings(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * POST /config
 */
export async function postConfig(
  args: InferRequestType<typeof client.config.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.config.$post(args, options))
}

/**
 * POST /config
 */
export function usePostConfig(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postConfig>>,
    Error,
    Key,
    InferRequestType<typeof client.config.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['config', '/config'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.config.$post> }) =>
        postConfig(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * POST /payment
 */
export async function postPayment(
  args: InferRequestType<typeof client.payment.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.payment.$post(args, options))
}

/**
 * POST /payment
 */
export function usePostPayment(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postPayment>>,
    Error,
    Key,
    InferRequestType<typeof client.payment.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['payment', '/payment'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.payment.$post> }) =>
        postPayment(arg, clientOptions),
      restMutationOptions,
    ),
  }
}
