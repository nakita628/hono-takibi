import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getApiKey() {
  return ['api'] as const
}

export function getGetApiReverseGeocodeIndexKey(
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

export function useGetApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseGeocodeIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getApiReverseGeocodeIndex(args, clientOptions), restSwrOptions),
  }
}

export function useImmutableGetApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseGeocodeIndexKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => getApiReverseGeocodeIndex(args, clientOptions),
      restSwrOptions,
    ),
  }
}

export function getGetApiReverseGeocodeIndexInfiniteKey(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
) {
  return ['api', '/api/reverseGeocode/', args, 'infinite'] as const
}

export function useInfiniteGetApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getApiReverseGeocodeIndex>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetApiReverseGeocodeIndexInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => getApiReverseGeocodeIndex(args, clientOptions),
    restSwrOptions,
  )
}

export async function postApiV2PublicBookingAccountRegisterOauthIndex(
  args: InferRequestType<typeof client.api.v2.public.booking.account.register.oauth.index.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.api.v2.public.booking.account.register.oauth.index.$post(args, options),
  )
}

export function usePostApiV2PublicBookingAccountRegisterOauthIndex(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterOauthIndex>>,
    Error,
    Key,
    InferRequestType<typeof client.api.v2.public.booking.account.register.oauth.index.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['api', '/api/v2/public/booking/account/register/oauth/', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            typeof client.api.v2.public.booking.account.register.oauth.index.$post
          >
        },
      ) => postApiV2PublicBookingAccountRegisterOauthIndex(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export async function postApiV2PublicBookingAccountRegisterEmail(
  args: InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.api.v2.public.booking.account.register.email.$post(args, options),
  )
}

export function usePostApiV2PublicBookingAccountRegisterEmail(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postApiV2PublicBookingAccountRegisterEmail>>,
    Error,
    Key,
    InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['api', '/api/v2/public/booking/account/register/email', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>
        },
      ) => postApiV2PublicBookingAccountRegisterEmail(arg, clientOptions),
      restMutationOptions,
    ),
  }
}
