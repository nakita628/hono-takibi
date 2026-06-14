import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostVendorExtensionsCustomMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.custom.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.custom.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/custom', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.custom.$post>) {
      return parseResponse(client.vendorExtensions.custom.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsCustom<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.custom.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.custom.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsCustomMutationOptions<TError>(clientOptions),
  })
}
