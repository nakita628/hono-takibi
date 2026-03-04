import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query cache key for GET /api/reverseGeocode/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApiReverseGeocodeIndexQueryKey(
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
 * Returns Svelte Query query options for GET /api/reverseGeocode/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiReverseGeocodeIndexQueryOptions(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseGeocodeIndex(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /api/reverseGeocode/
 *
 * Reverse geocode lookup
 */
export function createGetApiReverseGeocodeIndex(
  args: () => InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetApiReverseGeocodeIndexQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /api/reverseGeocode/
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetApiReverseGeocodeIndexInfiniteQueryKey(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
) {
  return ['api', 'GET', '/api/reverseGeocode/', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /api/reverseGeocode/
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetApiReverseGeocodeIndexInfiniteQueryOptions(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApiReverseGeocodeIndexInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseGeocodeIndex(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /api/reverseGeocode/
 *
 * Reverse geocode lookup
 */
export function createInfiniteGetApiReverseGeocodeIndex(
  args: () => InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetApiReverseGeocodeIndexInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /api/v2/public/booking/account/register/oauth/
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
 * Returns Svelte Query mutation options for POST /api/v2/public/booking/account/register/oauth/
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
export function createPostApiV2PublicBookingAccountRegisterOauthIndex(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterOauthIndex>>,
      Error,
      InferRequestType<typeof client.api.v2.public.booking.account.register.oauth.index.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return {
      ...getPostApiV2PublicBookingAccountRegisterOauthIndexMutationOptions(clientOptions),
      ...mutation,
    }
  })
}

/**
 * Generates Svelte Query mutation key for POST /api/v2/public/booking/account/register/email
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
 * Returns Svelte Query mutation options for POST /api/v2/public/booking/account/register/email
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
export function createPostApiV2PublicBookingAccountRegisterEmail(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterEmail>>,
      Error,
      InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return {
      ...getPostApiV2PublicBookingAccountRegisterEmailMutationOptions(clientOptions),
      ...mutation,
    }
  })
}
