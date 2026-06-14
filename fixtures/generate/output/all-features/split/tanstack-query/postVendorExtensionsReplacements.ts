import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostVendorExtensionsReplacementsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.replacements.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.replacements.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/replacements', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.replacements.$post>) {
      return parseResponse(client.vendorExtensions.replacements.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsReplacements<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.replacements.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.replacements.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsReplacementsMutationOptions<TError>(clientOptions),
  })
}
