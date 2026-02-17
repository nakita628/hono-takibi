import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
 * Returns Svelte Query query options for GET /api/reverseGeocode/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiReverseGeocodeIndexQueryOptions(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.api.reverseGeocode.index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /api/reverseGeocode/
 *
 * Reverse geocode lookup
 */
export function createGetApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.api.reverseGeocode.index.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetApiReverseGeocodeIndexQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
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
 * Returns Svelte Query mutation options for POST /api/v2/public/booking/account/register/oauth/
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostApiV2PublicBookingAccountRegisterOauthIndexMutationOptions(
  clientOptions?: ClientRequestOptions,
) {
  return {
    mutationKey: getPostApiV2PublicBookingAccountRegisterOauthIndexMutationKey(),
    async mutationFn(
      args: InferRequestType<
        typeof client.api.v2.public.booking.account.register.oauth.index.$post
      >,
    ) {
      return parseResponse(
        client.api.v2.public.booking.account.register.oauth.index.$post(args, clientOptions),
      )
    },
  }
}

/**
 * POST /api/v2/public/booking/account/register/oauth/
 */
export function createPostApiV2PublicBookingAccountRegisterOauthIndex(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<typeof client.api.v2.public.booking.account.register.oauth.index.$post>
            >
          >
        >
      >,
      Error,
      InferRequestType<typeof client.api.v2.public.booking.account.register.oauth.index.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostApiV2PublicBookingAccountRegisterOauthIndexMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
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
 * Returns Svelte Query mutation options for POST /api/v2/public/booking/account/register/email
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostApiV2PublicBookingAccountRegisterEmailMutationOptions(
  clientOptions?: ClientRequestOptions,
) {
  return {
    mutationKey: getPostApiV2PublicBookingAccountRegisterEmailMutationKey(),
    async mutationFn(
      args: InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>,
    ) {
      return parseResponse(
        client.api.v2.public.booking.account.register.email.$post(args, clientOptions),
      )
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
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.api.v2.public.booking.account.register.email.$post>>
          >
        >
      >,
      Error,
      InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostApiV2PublicBookingAccountRegisterEmailMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
