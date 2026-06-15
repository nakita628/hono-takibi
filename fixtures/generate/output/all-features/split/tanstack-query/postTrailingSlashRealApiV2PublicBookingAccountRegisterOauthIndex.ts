import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndexMutationOptions<
  TError = unknown,
>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
            >
          >
        >
      >
    >,
    TError,
    InferRequestType<
      typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
    >
  >({
    mutationKey: [
      'trailingSlashReal',
      '/trailingSlashReal/api/v2/public/booking/account/register/oauth/',
      'POST',
    ] as const,
    async mutationFn(
      args: InferRequestType<
        typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
      >,
    ) {
      return parseResponse(
        client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post(
          args,
          options,
        ),
      )
    },
  })
}

export function usePostTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndex<
  TError = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
            >
          >
        >
      >
    >,
    TError,
    InferRequestType<
      typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
    >
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndexMutationOptions<TError>(
      clientOptions,
    ),
  })
}
