import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getDeleteCallbacksLinksSubscriptionsIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>
  >({
    mutationKey: ['callbacksLinks', '/callbacksLinks/subscriptions/:id', 'DELETE'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>,
    ) {
      return parseResponse(client.callbacksLinks.subscriptions[':id'].$delete(args, options))
    },
  })
}

export function useDeleteCallbacksLinksSubscriptionsId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteCallbacksLinksSubscriptionsIdMutationOptions<TError>(clientOptions),
  })
}
