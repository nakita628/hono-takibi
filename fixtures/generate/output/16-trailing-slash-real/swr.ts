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
 * Generates SWR cache key for GET /api/reverseGeocode/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApiReverseGeocodeIndexKey(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
) {
  return ['api', 'GET', '/api/reverseGeocode/', args] as const
}

/**
 * GET /api/reverseGeocode/
 *
 * Reverse geocode lookup
 */
export async function getApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.api.reverseGeocode.index.$get(args, options))
}

/**
 * GET /api/reverseGeocode/
 *
 * Reverse geocode lookup
 */
export function useGetApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseGeocodeIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getApiReverseGeocodeIndex(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /api/reverseGeocode/
 *
 * Reverse geocode lookup
 */
export function useImmutableGetApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseGeocodeIndexKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => getApiReverseGeocodeIndex(args, clientOptions),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR infinite query cache key for GET /api/reverseGeocode/
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetApiReverseGeocodeIndexInfiniteKey(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
) {
  return ['api', 'GET', '/api/reverseGeocode/', args, 'infinite'] as const
}

/**
 * GET /api/reverseGeocode/
 *
 * Reverse geocode lookup
 */
export function useInfiniteGetApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetApiReverseGeocodeIndexInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => getApiReverseGeocodeIndex(args, clientOptions),
    restSwrOptions,
  )
}

/**
 * Generates SWR mutation key for POST /api/v2/public/booking/account/register/oauth/
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApiV2PublicBookingAccountRegisterOauthIndexMutationKey() {
  return ['api', 'POST', '/api/v2/public/booking/account/register/oauth/'] as const
}

/**
 * POST /api/v2/public/booking/account/register/oauth/
 */
export async function postApiV2PublicBookingAccountRegisterOauthIndex(
  args: InferRequestType<typeof client.api.v2.public.booking.account.register.oauth.index.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.api.v2.public.booking.account.register.oauth.index.$post(args, options),
  )
}

/**
 * POST /api/v2/public/booking/account/register/oauth/
 */
export function usePostApiV2PublicBookingAccountRegisterOauthIndex(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterOauthIndex>>,
    Error,
    Key,
    InferRequestType<typeof client.api.v2.public.booking.account.register.oauth.index.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApiV2PublicBookingAccountRegisterOauthIndexMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            typeof client.api.v2.public.booking.account.register.oauth.index.$post
          >
        },
      ) => postApiV2PublicBookingAccountRegisterOauthIndex(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /api/v2/public/booking/account/register/email
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApiV2PublicBookingAccountRegisterEmailMutationKey() {
  return ['api', 'POST', '/api/v2/public/booking/account/register/email'] as const
}

/**
 * POST /api/v2/public/booking/account/register/email
 *
 * Send registration URL via email
 */
export async function postApiV2PublicBookingAccountRegisterEmail(
  args: InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.api.v2.public.booking.account.register.email.$post(args, options),
  )
}

/**
 * POST /api/v2/public/booking/account/register/email
 *
 * Send registration URL via email
 */
export function usePostApiV2PublicBookingAccountRegisterEmail(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterEmail>>,
    Error,
    Key,
    InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApiV2PublicBookingAccountRegisterEmailMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>
        },
      ) => postApiV2PublicBookingAccountRegisterEmail(arg, clientOptions),
      restMutationOptions,
    ),
  }
}
