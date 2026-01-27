import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/28-reserved-words'

/**
 * Generates Svelte Query cache key for GET /class
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetClassQueryKey() {
  return ['class', '/class'] as const
}

/**
 * Returns Svelte Query query options for GET /class
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetClassQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetClassQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.class.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /class
 */
export function createGetClass(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.class.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetClassQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /interface
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetInterfaceQueryKey() {
  return ['interface', '/interface'] as const
}

/**
 * Returns Svelte Query query options for GET /interface
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetInterfaceQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetInterfaceQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.interface.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /interface
 */
export function createGetInterface(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.interface.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetInterfaceQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /type
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetTypeQueryKey() {
  return ['type', '/type'] as const
}

/**
 * Returns Svelte Query query options for GET /type
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTypeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTypeQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.type.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /type
 */
export function createGetType(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.type.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTypeQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /function
 */
export function createPostFunction(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.function.$post>>>>>,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.function.$post(undefined, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /return
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetReturnQueryKey() {
  return ['return', '/return'] as const
}

/**
 * Returns Svelte Query query options for GET /return
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetReturnQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetReturnQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.return.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /return
 */
export function createGetReturn(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.return.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetReturnQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /import
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetImportQueryKey() {
  return ['import', '/import'] as const
}

/**
 * Returns Svelte Query query options for GET /import
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetImportQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetImportQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.import.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /import
 */
export function createGetImport(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.import.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetImportQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /export
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetExportQueryKey() {
  return ['export', '/export'] as const
}

/**
 * Returns Svelte Query query options for GET /export
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExportQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetExportQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.export.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /export
 */
export function createGetExport(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.export.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetExportQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /default
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetDefaultQueryKey() {
  return ['default', '/default'] as const
}

/**
 * Returns Svelte Query query options for GET /default
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDefaultQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetDefaultQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.default.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /default
 */
export function createGetDefault(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.default.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDefaultQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /new
 */
export function createPostNew(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.new.$post>>>>>,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.new.$post(undefined, clientOptions)),
  }))
}

/**
 * DELETE /delete
 */
export function createDeleteDelete(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.delete.$delete>>>>>,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.delete.$delete(undefined, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /void
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetVoidQueryKey() {
  return ['void', '/void'] as const
}

/**
 * Returns Svelte Query query options for GET /void
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetVoidQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetVoidQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.void.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /void
 */
export function createGetVoid(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.void.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetVoidQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /null
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetNullQueryKey() {
  return ['null', '/null'] as const
}

/**
 * Returns Svelte Query query options for GET /null
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNullQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNullQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.null.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /null
 */
export function createGetNull(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.null.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNullQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /true
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetTrueQueryKey() {
  return ['true', '/true'] as const
}

/**
 * Returns Svelte Query query options for GET /true
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrueQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTrueQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.true.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /true
 */
export function createGetTrue(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.true.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTrueQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /false
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetFalseQueryKey() {
  return ['false', '/false'] as const
}

/**
 * Returns Svelte Query query options for GET /false
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFalseQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetFalseQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.false.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /false
 */
export function createGetFalse(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.false.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFalseQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /if
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetIfQueryKey() {
  return ['if', '/if'] as const
}

/**
 * Returns Svelte Query query options for GET /if
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetIfQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetIfQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.if.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /if
 */
export function createGetIf(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.if.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetIfQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /else
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetElseQueryKey() {
  return ['else', '/else'] as const
}

/**
 * Returns Svelte Query query options for GET /else
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetElseQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetElseQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.else.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /else
 */
export function createGetElse(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.else.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetElseQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /for
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetForQueryKey() {
  return ['for', '/for'] as const
}

/**
 * Returns Svelte Query query options for GET /for
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetForQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetForQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.for.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /for
 */
export function createGetFor(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.for.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetForQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /while
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetWhileQueryKey() {
  return ['while', '/while'] as const
}

/**
 * Returns Svelte Query query options for GET /while
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWhileQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetWhileQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.while.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /while
 */
export function createGetWhile(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.while.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetWhileQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /switch
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSwitchQueryKey() {
  return ['switch', '/switch'] as const
}

/**
 * Returns Svelte Query query options for GET /switch
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSwitchQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSwitchQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.switch.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /switch
 */
export function createGetSwitch(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.switch.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSwitchQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /case
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetCaseQueryKey() {
  return ['case', '/case'] as const
}

/**
 * Returns Svelte Query query options for GET /case
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCaseQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCaseQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.case.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /case
 */
export function createGetCase(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.case.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetCaseQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /break
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetBreakQueryKey() {
  return ['break', '/break'] as const
}

/**
 * Returns Svelte Query query options for GET /break
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBreakQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetBreakQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.break.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /break
 */
export function createGetBreak(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.break.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetBreakQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /continue
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetContinueQueryKey() {
  return ['continue', '/continue'] as const
}

/**
 * Returns Svelte Query query options for GET /continue
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetContinueQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetContinueQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.continue.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /continue
 */
export function createGetContinue(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.continue.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetContinueQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /try
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetTryQueryKey() {
  return ['try', '/try'] as const
}

/**
 * Returns Svelte Query query options for GET /try
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTryQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTryQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.try.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /try
 */
export function createGetTry(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.try.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTryQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /catch
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetCatchQueryKey() {
  return ['catch', '/catch'] as const
}

/**
 * Returns Svelte Query query options for GET /catch
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCatchQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCatchQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.catch.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /catch
 */
export function createGetCatch(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.catch.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetCatchQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /finally
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetFinallyQueryKey() {
  return ['finally', '/finally'] as const
}

/**
 * Returns Svelte Query query options for GET /finally
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFinallyQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetFinallyQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.finally.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /finally
 */
export function createGetFinally(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.finally.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFinallyQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /throw
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetThrowQueryKey() {
  return ['throw', '/throw'] as const
}

/**
 * Returns Svelte Query query options for GET /throw
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetThrowQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetThrowQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.throw.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /throw
 */
export function createGetThrow(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.throw.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetThrowQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /async
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetAsyncQueryKey() {
  return ['async', '/async'] as const
}

/**
 * Returns Svelte Query query options for GET /async
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAsyncQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAsyncQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.async.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /async
 */
export function createGetAsync(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.async.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAsyncQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /await
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetAwaitQueryKey() {
  return ['await', '/await'] as const
}

/**
 * Returns Svelte Query query options for GET /await
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAwaitQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAwaitQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.await.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /await
 */
export function createGetAwait(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.await.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAwaitQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /yield
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetYieldQueryKey() {
  return ['yield', '/yield'] as const
}

/**
 * Returns Svelte Query query options for GET /yield
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetYieldQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetYieldQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.yield.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /yield
 */
export function createGetYield(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.yield.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetYieldQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /static
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetStaticQueryKey() {
  return ['static', '/static'] as const
}

/**
 * Returns Svelte Query query options for GET /static
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStaticQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStaticQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.static.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /static
 */
export function createGetStatic(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.static.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetStaticQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /public
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetPublicQueryKey() {
  return ['public', '/public'] as const
}

/**
 * Returns Svelte Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPublicQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPublicQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.public.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /public
 */
export function createGetPublic(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPublicQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /private
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetPrivateQueryKey() {
  return ['private', '/private'] as const
}

/**
 * Returns Svelte Query query options for GET /private
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPrivateQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPrivateQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.private.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /private
 */
export function createGetPrivate(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.private.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPrivateQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /protected
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetProtectedQueryKey() {
  return ['protected', '/protected'] as const
}

/**
 * Returns Svelte Query query options for GET /protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProtectedQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetProtectedQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.protected.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /protected
 */
export function createGetProtected(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.protected.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetProtectedQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /abstract
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetAbstractQueryKey() {
  return ['abstract', '/abstract'] as const
}

/**
 * Returns Svelte Query query options for GET /abstract
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAbstractQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAbstractQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.abstract.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /abstract
 */
export function createGetAbstract(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.abstract.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAbstractQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /final
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetFinalQueryKey() {
  return ['final', '/final'] as const
}

/**
 * Returns Svelte Query query options for GET /final
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFinalQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetFinalQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.final.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /final
 */
export function createGetFinal(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.final.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFinalQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /extends
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetExtendsQueryKey() {
  return ['extends', '/extends'] as const
}

/**
 * Returns Svelte Query query options for GET /extends
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExtendsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetExtendsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.extends.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /extends
 */
export function createGetExtends(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.extends.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetExtendsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /implements
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetImplementsQueryKey() {
  return ['implements', '/implements'] as const
}

/**
 * Returns Svelte Query query options for GET /implements
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetImplementsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetImplementsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.implements.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /implements
 */
export function createGetImplements(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.implements.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetImplementsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /package
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetPackageQueryKey() {
  return ['package', '/package'] as const
}

/**
 * Returns Svelte Query query options for GET /package
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPackageQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPackageQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.package.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /package
 */
export function createGetPackage(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.package.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPackageQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /enum
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetEnumQueryKey() {
  return ['enum', '/enum'] as const
}

/**
 * Returns Svelte Query query options for GET /enum
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEnumQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetEnumQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.enum.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /enum
 */
export function createGetEnum(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.enum.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetEnumQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /const
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetConstQueryKey() {
  return ['const', '/const'] as const
}

/**
 * Returns Svelte Query query options for GET /const
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetConstQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetConstQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.const.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /const
 */
export function createGetConst(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.const.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetConstQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /let
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetLetQueryKey() {
  return ['let', '/let'] as const
}

/**
 * Returns Svelte Query query options for GET /let
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLetQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetLetQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.let.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /let
 */
export function createGetLet(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.let.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetLetQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /var
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetVarQueryKey() {
  return ['var', '/var'] as const
}

/**
 * Returns Svelte Query query options for GET /var
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetVarQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetVarQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.var.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /var
 */
export function createGetVar(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.var.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetVarQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /this
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetThisQueryKey() {
  return ['this', '/this'] as const
}

/**
 * Returns Svelte Query query options for GET /this
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetThisQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetThisQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.this.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /this
 */
export function createGetThis(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.this.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetThisQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /super
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSuperQueryKey() {
  return ['super', '/super'] as const
}

/**
 * Returns Svelte Query query options for GET /super
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSuperQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSuperQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.super.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /super
 */
export function createGetSuper(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.super.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSuperQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /self
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSelfQueryKey() {
  return ['self', '/self'] as const
}

/**
 * Returns Svelte Query query options for GET /self
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSelfQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSelfQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.self.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /self
 */
export function createGetSelf(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.self.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSelfQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /constructor
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetConstructorQueryKey() {
  return ['constructor', '/constructor'] as const
}

/**
 * Returns Svelte Query query options for GET /constructor
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetConstructorQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetConstructorQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.constructor.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /constructor
 */
export function createGetConstructor(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.constructor.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetConstructorQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /prototype
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetPrototypeQueryKey() {
  return ['prototype', '/prototype'] as const
}

/**
 * Returns Svelte Query query options for GET /prototype
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPrototypeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPrototypeQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.prototype.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /prototype
 */
export function createGetPrototype(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.prototype.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPrototypeQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /toString
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetToStringQueryKey() {
  return ['toString', '/toString'] as const
}

/**
 * Returns Svelte Query query options for GET /toString
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetToStringQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetToStringQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.toString.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /toString
 */
export function createGetToString(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.toString.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetToStringQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /valueOf
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetValueOfQueryKey() {
  return ['valueOf', '/valueOf'] as const
}

/**
 * Returns Svelte Query query options for GET /valueOf
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetValueOfQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetValueOfQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.valueOf.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /valueOf
 */
export function createGetValueOf(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.valueOf.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetValueOfQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /hasOwnProperty
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetHasOwnPropertyQueryKey() {
  return ['hasOwnProperty', '/hasOwnProperty'] as const
}

/**
 * Returns Svelte Query query options for GET /hasOwnProperty
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetHasOwnPropertyQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetHasOwnPropertyQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.hasOwnProperty.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /hasOwnProperty
 */
export function createGetHasOwnProperty(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hasOwnProperty.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetHasOwnPropertyQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /name-collisions
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetNameCollisionsQueryKey() {
  return ['name-collisions', '/name-collisions'] as const
}

/**
 * Returns Svelte Query query options for GET /name-collisions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNameCollisionsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNameCollisionsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['name-collisions'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /name-collisions
 */
export function createGetNameCollisions(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['name-collisions']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNameCollisionsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
