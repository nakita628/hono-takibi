import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostVendorExtensionsUsersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.users.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.users.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.users.$post>) {
      return parseResponse(client.vendorExtensions.users.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.users.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsUsersMutationOptions<TError>(clientOptions),
  })
}
