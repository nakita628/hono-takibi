import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
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

export function getApiReverseGeocodeIndexQueryOptions(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.api.reverseGeocode.index.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function createApiReverseGeocodeIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.api.reverseGeocode.index.$get>>>
    >
  >,
  TError = unknown,
>(
  args: () => InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.api.reverseGeocode.index.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getApiReverseGeocodeIndexQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.api.reverseGeocode.index.$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
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
      return parseResponse(
        client.api.v2.public.booking.account.register.oauth.index.$post(args, options),
      )
    },
  }
}

export function createPostApiV2PublicBookingAccountRegisterOauthIndex<TError = unknown>(
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

export function getPostApiV2PublicBookingAccountRegisterEmailMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['api', '/api/v2/public/booking/account/register/email', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>,
    ) {
      return parseResponse(client.api.v2.public.booking.account.register.email.$post(args, options))
    },
  }
}

export function createPostApiV2PublicBookingAccountRegisterEmail<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.api.v2.public.booking.account.register.email.$post>>
          >
        >
      >,
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
