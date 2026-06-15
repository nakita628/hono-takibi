import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPutArrayObjectConstraintsSettingsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$put>>
        >
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.settings.$put>
  >({
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/settings', 'PUT'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.settings.$put>) {
      return parseResponse(client.arrayObjectConstraints.settings.$put(args, options))
    },
  })
}

export function usePutArrayObjectConstraintsSettings<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$put>>
        >
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.settings.$put>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutArrayObjectConstraintsSettingsMutationOptions<TError>(clientOptions),
  })
}
