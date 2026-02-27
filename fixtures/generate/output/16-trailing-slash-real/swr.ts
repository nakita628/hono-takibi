import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
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
  args: Parameters<typeof getApiReverseGeocodeIndex>[0],
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
  args: Parameters<typeof getApiReverseGeocodeIndex>[0],
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetApiReverseGeocodeIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getApiReverseGeocodeIndex(args, clientOptions), restSwrOptions),
  }
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
    Parameters<typeof postApiV2PublicBookingAccountRegisterOauthIndex>[0]
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApiV2PublicBookingAccountRegisterOauthIndexMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: Parameters<typeof postApiV2PublicBookingAccountRegisterOauthIndex>[0] },
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
    Parameters<typeof postApiV2PublicBookingAccountRegisterEmail>[0]
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApiV2PublicBookingAccountRegisterEmailMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: Parameters<typeof postApiV2PublicBookingAccountRegisterEmail>[0] },
      ) => postApiV2PublicBookingAccountRegisterEmail(arg, clientOptions),
      restMutationOptions,
    ),
  }
}
