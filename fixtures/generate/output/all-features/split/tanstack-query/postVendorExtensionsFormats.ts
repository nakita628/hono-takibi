import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostVendorExtensionsFormatsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.formats.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.formats.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/formats', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.formats.$post>) {
      return parseResponse(client.vendorExtensions.formats.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsFormats<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.formats.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.formats.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsFormatsMutationOptions<TError>(clientOptions),
  })
}
