import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
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
 * Returns Svelte Query query options for GET /api/reverseGeocode/
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
export function createGetApiReverseGeocodeIndex(
  args: Parameters<typeof getApiReverseGeocodeIndex>[0],
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetApiReverseGeocodeIndexQueryOptions(args, opts?.client), ...opts?.query }
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
export function createPostApiV2PublicBookingAccountRegisterOauthIndex(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterOauthIndex>>,
      Error,
      Parameters<typeof postApiV2PublicBookingAccountRegisterOauthIndex>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return {
      ...getPostApiV2PublicBookingAccountRegisterOauthIndexMutationOptions(opts?.client),
      ...opts?.mutation,
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
export function createPostApiV2PublicBookingAccountRegisterEmail(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterEmail>>,
      Error,
      Parameters<typeof postApiV2PublicBookingAccountRegisterEmail>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return {
      ...getPostApiV2PublicBookingAccountRegisterEmailMutationOptions(opts?.client),
      ...opts?.mutation,
    }
  })
}
