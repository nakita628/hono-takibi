import { createQuery, createMutation, queryOptions } from '@tanstack/solid-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/solid-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getApiKey() {
  return ['api'] as const
}

export function getApiReverseGeocodeIndexQueryKey(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
) {
  return ['api', '/api/reverseGeocode/', args] as const
}

export async function getApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.api.reverseGeocode.index.$get(args, options))
}

export function getApiReverseGeocodeIndexQueryOptions(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }) {
      return getApiReverseGeocodeIndex(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createApiReverseGeocodeIndex<
  TData = Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>,
  TError = unknown,
>(
  args: () => InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getApiReverseGeocodeIndexQueryKey(args()),
      queryFn({ signal }) {
        return getApiReverseGeocodeIndex(args(), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        })
      },
    }
  })
}

export async function postApiV2PublicBookingAccountRegisterOauthIndex(
  args: InferRequestType<typeof client.api.v2.public.booking.account.register.oauth.index.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.api.v2.public.booking.account.register.oauth.index.$post(args, options),
  )
}

export function getPostApiV2PublicBookingAccountRegisterOauthIndexMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['api', '/api/v2/public/booking/account/register/oauth/', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<
        typeof client.api.v2.public.booking.account.register.oauth.index.$post
      >,
    ) {
      return postApiV2PublicBookingAccountRegisterOauthIndex(args, options)
    },
  }
}

export function createPostApiV2PublicBookingAccountRegisterOauthIndex<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterOauthIndex>>,
      TError,
      InferRequestType<typeof client.api.v2.public.booking.account.register.oauth.index.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return {
      ...mutation,
      ...getPostApiV2PublicBookingAccountRegisterOauthIndexMutationOptions<TError>(clientOptions),
    }
  })
}

export async function postApiV2PublicBookingAccountRegisterEmail(
  args: InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.api.v2.public.booking.account.register.email.$post(args, options),
  )
}

export function getPostApiV2PublicBookingAccountRegisterEmailMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['api', '/api/v2/public/booking/account/register/email', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>,
    ) {
      return postApiV2PublicBookingAccountRegisterEmail(args, options)
    },
  }
}

export function createPostApiV2PublicBookingAccountRegisterEmail<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterEmail>>,
      TError,
      InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return {
      ...mutation,
      ...getPostApiV2PublicBookingAccountRegisterEmailMutationOptions<TError>(clientOptions),
    }
  })
}
