import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostTrailingSlashRealApiV2PublicBookingAccountRegisterEmailMutationOptions<
  TError = unknown,
>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
            >
          >
        >
      >
    >,
    TError,
    InferRequestType<
      typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
    >
  >({
    mutationKey: [
      'trailingSlashReal',
      '/trailingSlashReal/api/v2/public/booking/account/register/email',
      'POST',
    ] as const,
    async mutationFn(
      args: InferRequestType<
        typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
      >,
    ) {
      return parseResponse(
        client.trailingSlashReal.api.v2.public.booking.account.register.email.$post(args, options),
      )
    },
  })
}

export function usePostTrailingSlashRealApiV2PublicBookingAccountRegisterEmail<
  TError = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
            >
          >
        >
      >
    >,
    TError,
    InferRequestType<
      typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
    >
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostTrailingSlashRealApiV2PublicBookingAccountRegisterEmailMutationOptions<TError>(
      clientOptions,
    ),
  })
}
