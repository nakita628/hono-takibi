import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function usePutParametersMergeItemsItemId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$put']>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['parametersMerge', '/parametersMerge/items/:itemId', 'PUT'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']> },
      ) => parseResponse(client.parametersMerge.items[':itemId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
