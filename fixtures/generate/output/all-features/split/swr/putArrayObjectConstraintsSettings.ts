import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function usePutArrayObjectConstraintsSettings<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$put>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.arrayObjectConstraints.settings.$put>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['arrayObjectConstraints', '/arrayObjectConstraints/settings', 'PUT'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.arrayObjectConstraints.settings.$put> },
      ) => parseResponse(client.arrayObjectConstraints.settings.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
