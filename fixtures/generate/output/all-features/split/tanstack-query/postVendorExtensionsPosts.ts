import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostVendorExtensionsPostsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.posts.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.posts.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/posts', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.posts.$post>) {
      return parseResponse(client.vendorExtensions.posts.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsPosts<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.posts.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.posts.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsPostsMutationOptions<TError>(clientOptions),
  })
}
