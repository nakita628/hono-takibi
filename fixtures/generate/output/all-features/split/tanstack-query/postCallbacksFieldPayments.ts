import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostCallbacksFieldPaymentsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.payments.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksField.payments.$post>
  >({
    mutationKey: ['callbacksField', '/callbacksField/payments', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksField.payments.$post>) {
      return parseResponse(client.callbacksField.payments.$post(args, options))
    },
  })
}

export function usePostCallbacksFieldPayments<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.payments.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksField.payments.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCallbacksFieldPaymentsMutationOptions<TError>(clientOptions),
  })
}
