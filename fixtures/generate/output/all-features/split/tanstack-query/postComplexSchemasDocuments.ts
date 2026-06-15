import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostComplexSchemasDocumentsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.documents.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.documents.$post>
  >({
    mutationKey: ['complexSchemas', '/complexSchemas/documents', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.documents.$post>) {
      return parseResponse(client.complexSchemas.documents.$post(args, options))
    },
  })
}

export function usePostComplexSchemasDocuments<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.documents.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.documents.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComplexSchemasDocumentsMutationOptions<TError>(clientOptions),
  })
}
