import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostVendorExtensionsCompositionMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.composition.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.composition.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/composition', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.composition.$post>) {
      return parseResponse(client.vendorExtensions.composition.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsComposition<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.composition.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.composition.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsCompositionMutationOptions<TError>(clientOptions),
  })
}
