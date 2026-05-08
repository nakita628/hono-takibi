import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getApiKey() {
  return ['api'] as const
}

export function getApiReverseGeocodeIndexQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.api.reverseGeocode.index.$get>>,
) {
  return ['api', '/api/reverseGeocode/', args] as const
}

export function getApiReverseGeocodeIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.api.reverseGeocode.index.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.api.reverseGeocode.index.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useApiReverseGeocodeIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.api.reverseGeocode.index.$get>>>
    >
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.api.reverseGeocode.index.$get>>,
  options?: {
    query?: UseQueryOptions<
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
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.api.reverseGeocode.index.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
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

export function usePostApiV2PublicBookingAccountRegisterOauthIndex<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
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
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostApiV2PublicBookingAccountRegisterOauthIndexMutationOptions<TError>(clientOptions),
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

export function usePostApiV2PublicBookingAccountRegisterEmail<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
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
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostApiV2PublicBookingAccountRegisterEmailMutationOptions<TError>(clientOptions),
  })
}
