import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostCallbacksFieldOrdersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.orders.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksField.orders.$post>
  >({
    mutationKey: ['callbacksField', '/callbacksField/orders', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksField.orders.$post>) {
      return parseResponse(client.callbacksField.orders.$post(args, options))
    },
  })
}

export function usePostCallbacksFieldOrders<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.orders.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksField.orders.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCallbacksFieldOrdersMutationOptions<TError>(clientOptions),
  })
}
