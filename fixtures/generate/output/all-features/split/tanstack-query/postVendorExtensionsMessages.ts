import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostVendorExtensionsMessagesMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.messages.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.messages.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/messages', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.messages.$post>) {
      return parseResponse(client.vendorExtensions.messages.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsMessages<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.messages.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.messages.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsMessagesMutationOptions<TError>(clientOptions),
  })
}
