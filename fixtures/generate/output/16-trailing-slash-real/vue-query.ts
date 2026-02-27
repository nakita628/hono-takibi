import { useQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query cache key for GET /api/reverseGeocode/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApiReverseGeocodeIndexQueryKey(
  args: MaybeRef<Parameters<typeof getApiReverseGeocodeIndex>[0]>,
) {
  return ['api', 'GET', '/api/reverseGeocode/', unref(args)] as const
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
 * Returns Vue Query query options for GET /api/reverseGeocode/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiReverseGeocodeIndexQueryOptions(
  args: Parameters<typeof getApiReverseGeocodeIndex>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseGeocodeIndex(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

/**
 * GET /api/reverseGeocode/
 *
 * Reverse geocode lookup
 */
export function useGetApiReverseGeocodeIndex(
  args: Parameters<typeof getApiReverseGeocodeIndex>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApiReverseGeocodeIndexQueryOptions(args, clientOptions),
    ...queryOpts,
  })
}

/**
 * Generates Vue Query mutation key for POST /api/v2/public/booking/account/register/oauth/
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
 * Returns Vue Query mutation options for POST /api/v2/public/booking/account/register/oauth/
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostApiV2PublicBookingAccountRegisterOauthIndexMutationOptions(
  clientOptions?: ClientRequestOptions,
) {
  return {
    mutationKey: getPostApiV2PublicBookingAccountRegisterOauthIndexMutationKey(),
    async mutationFn(args: Parameters<typeof postApiV2PublicBookingAccountRegisterOauthIndex>[0]) {
      return postApiV2PublicBookingAccountRegisterOauthIndex(args, clientOptions)
    },
  }
}

/**
 * POST /api/v2/public/booking/account/register/oauth/
 */
export function usePostApiV2PublicBookingAccountRegisterOauthIndex(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterOauthIndex>>,
    Error,
    Parameters<typeof postApiV2PublicBookingAccountRegisterOauthIndex>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({
    ...getPostApiV2PublicBookingAccountRegisterOauthIndexMutationOptions(clientOptions),
    ...mutationOpts,
  })
}

/**
 * Generates Vue Query mutation key for POST /api/v2/public/booking/account/register/email
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
 * Returns Vue Query mutation options for POST /api/v2/public/booking/account/register/email
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostApiV2PublicBookingAccountRegisterEmailMutationOptions(
  clientOptions?: ClientRequestOptions,
) {
  return {
    mutationKey: getPostApiV2PublicBookingAccountRegisterEmailMutationKey(),
    async mutationFn(args: Parameters<typeof postApiV2PublicBookingAccountRegisterEmail>[0]) {
      return postApiV2PublicBookingAccountRegisterEmail(args, clientOptions)
    },
  }
}

/**
 * POST /api/v2/public/booking/account/register/email
 *
 * Send registration URL via email
 */
export function usePostApiV2PublicBookingAccountRegisterEmail(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterEmail>>,
    Error,
    Parameters<typeof postApiV2PublicBookingAccountRegisterEmail>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({
    ...getPostApiV2PublicBookingAccountRegisterEmailMutationOptions(clientOptions),
    ...mutationOpts,
  })
}
