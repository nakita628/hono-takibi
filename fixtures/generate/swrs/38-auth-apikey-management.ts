import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/38-auth-apikey-management'

/**
 * GET /api-keys
 *
 * APIキー一覧取得
 */
export function useGetApiKeys(
  args: InferRequestType<(typeof client)['api-keys']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetApiKeysKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['api-keys'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetApiKeysKey(args: InferRequestType<(typeof client)['api-keys']['$get']>) {
  return ['/api-keys', args] as const
}

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export function usePostApiKeys(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['api-keys']['$post']>>>>
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['api-keys']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApiKeysMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)['api-keys']['$post']> }) =>
        parseResponse(client['api-keys'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /api-keys
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostApiKeysMutationKey() {
  return 'POST /api-keys'
}

/**
 * GET /api-keys/{keyId}
 *
 * APIキー詳細取得
 */
export function useGetApiKeysKeyId(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetApiKeysKeyIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['api-keys'][':keyId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetApiKeysKeyIdKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
) {
  return ['/api-keys/:keyId', args] as const
}

/**
 * DELETE /api-keys/{keyId}
 *
 * APIキー削除
 */
export function useDeleteApiKeysKeyId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteApiKeysKeyIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']> },
      ) => parseResponse(client['api-keys'][':keyId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /api-keys/{keyId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteApiKeysKeyIdMutationKey() {
  return 'DELETE /api-keys/:keyId'
}

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export function usePatchApiKeysKeyId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['$patch']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchApiKeysKeyIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']> },
      ) => parseResponse(client['api-keys'][':keyId'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /api-keys/{keyId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPatchApiKeysKeyIdMutationKey() {
  return 'PATCH /api-keys/:keyId'
}

/**
 * POST /api-keys/{keyId}/revoke
 *
 * APIキー無効化
 */
export function usePostApiKeysKeyIdRevoke(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApiKeysKeyIdRevokeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']> },
      ) => parseResponse(client['api-keys'][':keyId'].revoke.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /api-keys/{keyId}/revoke
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostApiKeysKeyIdRevokeMutationKey() {
  return 'POST /api-keys/:keyId/revoke'
}

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export function usePostApiKeysKeyIdRotate(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApiKeysKeyIdRotateMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']> },
      ) => parseResponse(client['api-keys'][':keyId'].rotate.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /api-keys/{keyId}/rotate
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostApiKeysKeyIdRotateMutationKey() {
  return 'POST /api-keys/:keyId/rotate'
}

/**
 * GET /api-keys/{keyId}/usage
 *
 * APIキー使用量取得
 */
export function useGetApiKeysKeyIdUsage(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetApiKeysKeyIdUsageKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['api-keys'][':keyId'].usage.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}/usage
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetApiKeysKeyIdUsageKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
) {
  return ['/api-keys/:keyId/usage', args] as const
}

/**
 * GET /api-keys/{keyId}/rate-limit/current
 *
 * 現在のレート制限状況取得
 */
export function useGetApiKeysKeyIdRateLimitCurrent(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetApiKeysKeyIdRateLimitCurrentKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['api-keys'][':keyId']['rate-limit'].current.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}/rate-limit/current
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetApiKeysKeyIdRateLimitCurrentKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
) {
  return ['/api-keys/:keyId/rate-limit/current', args] as const
}

/**
 * POST /api-keys/verify
 *
 * APIキー検証
 */
export function usePostApiKeysVerify(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['api-keys']['verify']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['api-keys']['verify']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApiKeysVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['api-keys']['verify']['$post']> },
      ) => parseResponse(client['api-keys'].verify.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /api-keys/verify
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostApiKeysVerifyMutationKey() {
  return 'POST /api-keys/verify'
}

/**
 * GET /scopes
 *
 * 利用可能なスコープ一覧
 */
export function useGetScopes(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetScopesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.scopes.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /scopes
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetScopesKey() {
  return ['/scopes'] as const
}
