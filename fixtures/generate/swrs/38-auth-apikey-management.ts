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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiKeysKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['api-keys'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys
 * Uses $url() for type-safe key generation
 */
export function getGetApiKeysKey(args: InferRequestType<(typeof client)['api-keys']['$get']>) {
  return client['api-keys'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostApiKeysMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)['api-keys']['$post']> }) =>
        parseResponse(client['api-keys'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /api-keys
 * Uses $url() for type-safe key generation
 */
export function getPostApiKeysMutationKey() {
  return `POST ${client['api-keys'].$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiKeysKeyIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['api-keys'][':keyId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}
 * Uses $url() for type-safe key generation
 */
export function getGetApiKeysKeyIdKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
) {
  return client['api-keys'][':keyId'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteApiKeysKeyIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']> },
      ) => parseResponse(client['api-keys'][':keyId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /api-keys/{keyId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteApiKeysKeyIdMutationKey() {
  return `DELETE ${client['api-keys'][':keyId'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchApiKeysKeyIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']> },
      ) => parseResponse(client['api-keys'][':keyId'].$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /api-keys/{keyId}
 * Uses $url() for type-safe key generation
 */
export function getPatchApiKeysKeyIdMutationKey() {
  return `PATCH ${client['api-keys'][':keyId'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostApiKeysKeyIdRevokeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /api-keys/{keyId}/revoke
 * Uses $url() for type-safe key generation
 */
export function getPostApiKeysKeyIdRevokeMutationKey() {
  return `POST ${client['api-keys'][':keyId'].revoke.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostApiKeysKeyIdRotateMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /api-keys/{keyId}/rotate
 * Uses $url() for type-safe key generation
 */
export function getPostApiKeysKeyIdRotateMutationKey() {
  return `POST ${client['api-keys'][':keyId'].rotate.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiKeysKeyIdUsageKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['api-keys'][':keyId'].usage.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}/usage
 * Uses $url() for type-safe key generation
 */
export function getGetApiKeysKeyIdUsageKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
) {
  return client['api-keys'][':keyId'].usage.$url(args).pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetApiKeysKeyIdRateLimitCurrentKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['api-keys'][':keyId']['rate-limit'].current.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}/rate-limit/current
 * Uses $url() for type-safe key generation
 */
export function getGetApiKeysKeyIdRateLimitCurrentKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
) {
  return client['api-keys'][':keyId']['rate-limit'].current.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostApiKeysVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['api-keys']['verify']['$post']> },
      ) => parseResponse(client['api-keys'].verify.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /api-keys/verify
 * Uses $url() for type-safe key generation
 */
export function getPostApiKeysVerifyMutationKey() {
  return `POST ${client['api-keys'].verify.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetScopesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.scopes.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /scopes
 * Uses $url() for type-safe key generation
 */
export function getGetScopesKey() {
  return client.scopes.$url().pathname
}
