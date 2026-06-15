import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostComplexSchemasShapesMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.shapes.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.shapes.$post>
  >({
    mutationKey: ['complexSchemas', '/complexSchemas/shapes', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.shapes.$post>) {
      return parseResponse(client.complexSchemas.shapes.$post(args, options))
    },
  })
}

export function usePostComplexSchemasShapes<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.shapes.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.shapes.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComplexSchemasShapesMutationOptions<TError>(clientOptions),
  })
}
