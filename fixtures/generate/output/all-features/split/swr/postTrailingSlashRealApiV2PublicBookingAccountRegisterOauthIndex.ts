import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function usePostTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndex<
  TError = unknown,
>(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
    >
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    ([
      'trailingSlashReal',
      '/trailingSlashReal/api/v2/public/booking/account/register/oauth/',
      'POST',
    ] as const)
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
            typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
          >
        },
      ) =>
        parseResponse(
          client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post(
            arg,
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}
