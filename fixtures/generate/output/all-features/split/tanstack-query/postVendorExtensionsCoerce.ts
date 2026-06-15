import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostVendorExtensionsCoerceMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.coerce.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.coerce.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/coerce', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.coerce.$post>) {
      return parseResponse(client.vendorExtensions.coerce.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsCoerce<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.coerce.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.coerce.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsCoerceMutationOptions<TError>(clientOptions),
  })
}
