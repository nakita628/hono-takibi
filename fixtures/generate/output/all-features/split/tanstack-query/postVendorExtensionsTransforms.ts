import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostVendorExtensionsTransformsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.transforms.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.transforms.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/transforms', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.transforms.$post>) {
      return parseResponse(client.vendorExtensions.transforms.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsTransforms<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.transforms.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.transforms.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsTransformsMutationOptions<TError>(clientOptions),
  })
}
