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

/** Key prefix for /api */
export function getApiKey() {
  return ['api'] as const
}

/** GET /api/reverseGeocode/ query key */
export function getApiReverseGeocodeIndexQueryKey(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
) {
  return ['api', '/api/reverseGeocode/', args] as const
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
 * GET /api/reverseGeocode/ query options
 */
export function getApiReverseGeocodeIndexQueryOptions(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getApiReverseGeocodeIndexQueryKey(args),
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
export function createApiReverseGeocodeIndex(
  args: () => InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getApiReverseGeocodeIndexQueryOptions(args(), clientOptions), ...query }
  })
}

/** GET /api/reverseGeocode/ infinite query key */
export function getApiReverseGeocodeIndexInfiniteQueryKey(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
) {
  return ['api', '/api/reverseGeocode/', args, 'infinite'] as const
}

/**
 * GET /api/reverseGeocode/ infinite query options
 */
export function getApiReverseGeocodeIndexInfiniteQueryOptions(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getApiReverseGeocodeIndexInfiniteQueryKey(args),
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
export function createInfiniteApiReverseGeocodeIndex(
  args: () => InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getApiReverseGeocodeIndexInfiniteQueryOptions(args(), clientOptions), ...query }
  })
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

/** POST /api/v2/public/booking/account/register/oauth/ */
export function getPostApiV2PublicBookingAccountRegisterOauthIndexMutationOptions(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['api', '/api/v2/public/booking/account/register/oauth/'] as const,
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

/** POST /api/v2/public/booking/account/register/email */
export function getPostApiV2PublicBookingAccountRegisterEmailMutationOptions(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['api', '/api/v2/public/booking/account/register/email'] as const,
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
