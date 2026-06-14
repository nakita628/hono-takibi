import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostComplexSchemasExpressionsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.expressions.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.expressions.$post>
  >({
    mutationKey: ['complexSchemas', '/complexSchemas/expressions', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.expressions.$post>) {
      return parseResponse(client.complexSchemas.expressions.$post(args, options))
    },
  })
}

export function usePostComplexSchemasExpressions<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.expressions.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.expressions.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComplexSchemasExpressionsMutationOptions<TError>(clientOptions),
  })
}
