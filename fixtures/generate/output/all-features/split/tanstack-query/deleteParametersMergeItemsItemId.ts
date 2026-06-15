import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getDeleteParametersMergeItemsItemIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$delete']>
  >({
    mutationKey: ['parametersMerge', '/parametersMerge/items/:itemId', 'DELETE'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$delete']>,
    ) {
      return parseResponse(client.parametersMerge.items[':itemId'].$delete(args, options))
    },
  })
}

export function useDeleteParametersMergeItemsItemId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteParametersMergeItemsItemIdMutationOptions<TError>(clientOptions),
  })
}
