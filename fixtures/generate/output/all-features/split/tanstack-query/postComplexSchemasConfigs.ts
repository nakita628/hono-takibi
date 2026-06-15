import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostComplexSchemasConfigsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.configs.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.configs.$post>
  >({
    mutationKey: ['complexSchemas', '/complexSchemas/configs', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.configs.$post>) {
      return parseResponse(client.complexSchemas.configs.$post(args, options))
    },
  })
}

export function usePostComplexSchemasConfigs<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.configs.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.configs.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComplexSchemasConfigsMutationOptions<TError>(clientOptions),
  })
}
