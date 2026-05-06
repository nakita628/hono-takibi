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

export async function getApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.api.reverseGeocode.index.$get(args, options))
}

export function getApiReverseGeocodeIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.api.reverseGeocode.index.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }) {
      return getApiReverseGeocodeIndex(toValue(args), {
        ...options,
        init: { ...options?.init, signal },
      })
    },
  }
}

export function useApiReverseGeocodeIndex<
  TData = Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.api.reverseGeocode.index.$get>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>,
      ReturnType<typeof getApiReverseGeocodeIndexQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }) {
      return getApiReverseGeocodeIndex(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
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

export function usePostApiV2PublicBookingAccountRegisterOauthIndex<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterOauthIndex>>,
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

export function usePostApiV2PublicBookingAccountRegisterEmail<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterEmail>>,
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
