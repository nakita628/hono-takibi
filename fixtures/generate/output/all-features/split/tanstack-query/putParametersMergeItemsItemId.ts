import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPutParametersMergeItemsItemIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']>
  >({
    mutationKey: ['parametersMerge', '/parametersMerge/items/:itemId', 'PUT'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']>,
    ) {
      return parseResponse(client.parametersMerge.items[':itemId'].$put(args, options))
    },
  })
}

export function usePutParametersMergeItemsItemId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutParametersMergeItemsItemIdMutationOptions<TError>(clientOptions),
  })
}
