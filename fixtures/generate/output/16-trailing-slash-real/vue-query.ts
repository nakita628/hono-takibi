import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query cache key for GET /api/reverseGeocode/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApiReverseGeocodeIndexQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.api.reverseGeocode.index.$get>>,
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
 * Returns Vue Query query options for GET /api/reverseGeocode/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiReverseGeocodeIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.api.reverseGeocode.index.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseGeocodeIndex(toValue(args), {
        ...options,
        init: { ...options?.init, signal },
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
  args: MaybeRefOrGetter<InferRequestType<typeof client.api.reverseGeocode.index.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApiReverseGeocodeIndexQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query infinite query cache key for GET /api/reverseGeocode/
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetApiReverseGeocodeIndexInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.api.reverseGeocode.index.$get>>,
) {
  return ['api', 'GET', '/api/reverseGeocode/', args, 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /api/reverseGeocode/
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetApiReverseGeocodeIndexInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.api.reverseGeocode.index.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApiReverseGeocodeIndexInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseGeocodeIndex(toValue(args), {
        ...options,
        init: { ...options?.init, signal },
      })
    },
  }
}

/**
 * GET /api/reverseGeocode/
 *
 * Reverse geocode lookup
 */
export function useInfiniteGetApiReverseGeocodeIndex(
  args: MaybeRefOrGetter<InferRequestType<typeof client.api.reverseGeocode.index.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetApiReverseGeocodeIndexInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
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
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: getPostApiV2PublicBookingAccountRegisterOauthIndexMutationKey(),
    async mutationFn(
      args: InferRequestType<
        typeof client.api.v2.public.booking.account.register.oauth.index.$post
      >,
    ) {
      return postApiV2PublicBookingAccountRegisterOauthIndex(args, options)
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
    InferRequestType<typeof client.api.v2.public.booking.account.register.oauth.index.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...getPostApiV2PublicBookingAccountRegisterOauthIndexMutationOptions(clientOptions),
    ...mutationOptions,
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
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: getPostApiV2PublicBookingAccountRegisterEmailMutationKey(),
    async mutationFn(
      args: InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>,
    ) {
      return postApiV2PublicBookingAccountRegisterEmail(args, options)
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
    InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...getPostApiV2PublicBookingAccountRegisterEmailMutationOptions(clientOptions),
    ...mutationOptions,
  })
}
