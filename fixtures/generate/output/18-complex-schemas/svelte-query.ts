import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getConfigsKey() {
  return ['configs'] as const
}

export function getDocumentsKey() {
  return ['documents'] as const
}

export function getExpressionsKey() {
  return ['expressions'] as const
}

export function getNestedCircularKey() {
  return ['nested-circular'] as const
}

export function getNullableUnionKey() {
  return ['nullable-union'] as const
}

export function getShapesKey() {
  return ['shapes'] as const
}

export function getPostExpressionsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['expressions', '/expressions', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.expressions.$post>) {
      return parseResponse(client.expressions.$post(args, options))
    },
  }
}

export function createPostExpressions<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.expressions.$post>>>>
      >,
      TError,
      InferRequestType<typeof client.expressions.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostExpressionsMutationOptions(clientOptions) }
  })
}

export function getPostShapesMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['shapes', '/shapes', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.shapes.$post>) {
      return parseResponse(client.shapes.$post(args, options))
    },
  }
}

export function createPostShapes<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.shapes.$post>>>>>,
      TError,
      InferRequestType<typeof client.shapes.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostShapesMutationOptions(clientOptions) }
  })
}

export function getPostDocumentsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['documents', '/documents', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.documents.$post>) {
      return parseResponse(client.documents.$post(args, options))
    },
  }
}

export function createPostDocuments<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$post>>>>>,
      TError,
      InferRequestType<typeof client.documents.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostDocumentsMutationOptions(clientOptions) }
  })
}

export function getPostConfigsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['configs', '/configs', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.configs.$post>) {
      return parseResponse(client.configs.$post(args, options))
    },
  }
}

export function createPostConfigs<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.configs.$post>>>>>,
      TError,
      InferRequestType<typeof client.configs.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostConfigsMutationOptions(clientOptions) }
  })
}

export function getNullableUnionQueryKey() {
  return ['nullable-union', '/nullable-union'] as const
}

export function getNullableUnionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNullableUnionQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['nullable-union'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function createNullableUnion<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['nullable-union']['$get']>>>>
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['nullable-union']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNullableUnionQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['nullable-union'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getNestedCircularQueryKey() {
  return ['nested-circular', '/nested-circular'] as const
}

export function getNestedCircularQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNestedCircularQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['nested-circular'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function createNestedCircular<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['nested-circular']['$get']>>>
    >
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['nested-circular']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNestedCircularQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['nested-circular'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}
