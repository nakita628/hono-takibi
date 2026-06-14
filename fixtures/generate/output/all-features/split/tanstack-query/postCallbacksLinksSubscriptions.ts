import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostCallbacksLinksSubscriptionsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksLinks.subscriptions.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksLinks.subscriptions.$post>
  >({
    mutationKey: ['callbacksLinks', '/callbacksLinks/subscriptions', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksLinks.subscriptions.$post>) {
      return parseResponse(client.callbacksLinks.subscriptions.$post(args, options))
    },
  })
}

export function usePostCallbacksLinksSubscriptions<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksLinks.subscriptions.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksLinks.subscriptions.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCallbacksLinksSubscriptionsMutationOptions<TError>(clientOptions),
  })
}
