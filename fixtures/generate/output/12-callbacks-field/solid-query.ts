import { createQuery, createMutation, queryOptions } from '@tanstack/solid-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/solid-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getItemsKey() {
  return ['items'] as const
}

export function getOrdersKey() {
  return ['orders'] as const
}

export function getPaymentsKey() {
  return ['payments'] as const
}

export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$post(args, options))
}

export function getPostOrdersMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['orders', '/orders', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.orders.$post>) {
      return postOrders(args, options)
    },
  }
}

export function createPostOrders<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postOrders>>,
      TError,
      InferRequestType<typeof client.orders.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostOrdersMutationOptions<TError>(clientOptions) }
  })
}

export async function postPayments(
  args: InferRequestType<typeof client.payments.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.payments.$post(args, options))
}

export function getPostPaymentsMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['payments', '/payments', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.payments.$post>) {
      return postPayments(args, options)
    },
  }
}

export function createPostPayments<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPayments>>,
      TError,
      InferRequestType<typeof client.payments.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostPaymentsMutationOptions<TError>(clientOptions) }
  })
}

export function getItemsQueryKey() {
  return ['items', '/items'] as const
}

export async function getItems(options?: ClientRequestOptions) {
  return await parseResponse(client.items.$get(undefined, options))
}

export function getItemsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createItems<TData = Awaited<ReturnType<typeof getItems>>, TError = unknown>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getItems>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getItemsQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getItems({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}
