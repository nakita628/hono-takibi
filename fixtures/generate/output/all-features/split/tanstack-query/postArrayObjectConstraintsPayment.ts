import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostArrayObjectConstraintsPaymentMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.arrayObjectConstraints.payment.$post>>
        >
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.payment.$post>
  >({
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/payment', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.payment.$post>) {
      return parseResponse(client.arrayObjectConstraints.payment.$post(args, options))
    },
  })
}

export function usePostArrayObjectConstraintsPayment<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.arrayObjectConstraints.payment.$post>>
        >
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.payment.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostArrayObjectConstraintsPaymentMutationOptions<TError>(clientOptions),
  })
}
