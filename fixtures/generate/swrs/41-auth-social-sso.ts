import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/41-auth-social-sso'

/**
 * GET /social/authorize/{provider}
 *
 * ソーシャル認証開始
 *
 * ソーシャルプロバイダーの認証画面にリダイレクト
 */
export function useGetSocialAuthorizeProvider(
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSocialAuthorizeProviderKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.social.authorize[':provider'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /social/authorize/{provider}
 * Uses $url() for type-safe key generation
 */
export function getGetSocialAuthorizeProviderKey(
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
) {
  return client.social.authorize[':provider'].$url(args).pathname
}

/**
 * GET /social/callback/{provider}
 *
 * ソーシャル認証コールバック
 *
 * プロバイダーからのコールバックを処理
 */
export function useGetSocialCallbackProvider(
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSocialCallbackProviderKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.social.callback[':provider'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /social/callback/{provider}
 * Uses $url() for type-safe key generation
 */
export function getGetSocialCallbackProviderKey(
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
) {
  return client.social.callback[':provider'].$url(args).pathname
}

/**
 * POST /social/token
 *
 * ソーシャルトークン交換
 *
 * 認可コードをアクセストークンに交換
 */
export function usePostSocialToken(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.social.token.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.social.token.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostSocialTokenMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.social.token.$post> }) =>
        parseResponse(client.social.token.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /social/token
 * Uses $url() for type-safe key generation
 */
export function getPostSocialTokenMutationKey() {
  return `POST ${client.social.token.$url().pathname}`
}

/**
 * POST /social/token/native
 *
 * ネイティブトークン検証
 *
 * モバイルアプリから直接取得したトークンを検証
 */
export function usePostSocialTokenNative(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.social.token.native.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.social.token.native.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostSocialTokenNativeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.social.token.native.$post> }) =>
        parseResponse(client.social.token.native.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /social/token/native
 * Uses $url() for type-safe key generation
 */
export function getPostSocialTokenNativeMutationKey() {
  return `POST ${client.social.token.native.$url().pathname}`
}

/**
 * GET /providers
 *
 * 有効なプロバイダー一覧
 */
export function useGetProviders(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProvidersKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.providers.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /providers
 * Uses $url() for type-safe key generation
 */
export function getGetProvidersKey() {
  return client.providers.$url().pathname
}

/**
 * GET /providers/admin
 *
 * 全プロバイダー一覧（管理用）
 */
export function useGetProvidersAdmin(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProvidersAdminKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.providers.admin.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /providers/admin
 * Uses $url() for type-safe key generation
 */
export function getGetProvidersAdminKey() {
  return client.providers.admin.$url().pathname
}

/**
 * POST /providers/admin
 *
 * プロバイダー追加
 */
export function usePostProvidersAdmin(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.providers.admin.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.providers.admin.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostProvidersAdminMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.providers.admin.$post> }) =>
        parseResponse(client.providers.admin.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /providers/admin
 * Uses $url() for type-safe key generation
 */
export function getPostProvidersAdminMutationKey() {
  return `POST ${client.providers.admin.$url().pathname}`
}

/**
 * GET /providers/{providerId}
 *
 * プロバイダー詳細取得
 */
export function useGetProvidersProviderId(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProvidersProviderIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.providers[':providerId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /providers/{providerId}
 * Uses $url() for type-safe key generation
 */
export function getGetProvidersProviderIdKey(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
) {
  return client.providers[':providerId'].$url(args).pathname
}

/**
 * PUT /providers/{providerId}
 *
 * プロバイダー更新
 */
export function usePutProvidersProviderId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.providers)[':providerId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.providers)[':providerId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutProvidersProviderIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.providers)[':providerId']['$put']> },
      ) => parseResponse(client.providers[':providerId'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /providers/{providerId}
 * Uses $url() for type-safe key generation
 */
export function getPutProvidersProviderIdMutationKey() {
  return `PUT ${client.providers[':providerId'].$url().pathname}`
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export function useDeleteProvidersProviderId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.providers)[':providerId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.providers)[':providerId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteProvidersProviderIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.providers)[':providerId']['$delete']> },
      ) => parseResponse(client.providers[':providerId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /providers/{providerId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteProvidersProviderIdMutationKey() {
  return `DELETE ${client.providers[':providerId'].$url().pathname}`
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export function usePostProvidersProviderIdTest(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.providers)[':providerId']['test']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostProvidersProviderIdTestMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']> },
      ) => parseResponse(client.providers[':providerId'].test.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /providers/{providerId}/test
 * Uses $url() for type-safe key generation
 */
export function getPostProvidersProviderIdTestMutationKey() {
  return `POST ${client.providers[':providerId'].test.$url().pathname}`
}

/**
 * GET /account/linked
 *
 * 連携アカウント一覧
 */
export function useGetAccountLinked(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAccountLinkedKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.account.linked.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /account/linked
 * Uses $url() for type-safe key generation
 */
export function getGetAccountLinkedKey() {
  return client.account.linked.$url().pathname
}

/**
 * POST /account/link/{provider}
 *
 * アカウント連携
 *
 * 既存アカウントにソーシャルアカウントを連携
 */
export function usePostAccountLinkProvider(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.account.link)[':provider']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.account.link)[':provider']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostAccountLinkProviderMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.account.link)[':provider']['$post']> },
      ) => parseResponse(client.account.link[':provider'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /account/link/{provider}
 * Uses $url() for type-safe key generation
 */
export function getPostAccountLinkProviderMutationKey() {
  return `POST ${client.account.link[':provider'].$url().pathname}`
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export function useDeleteAccountLinkProvider(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.account.link)[':provider']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.account.link)[':provider']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteAccountLinkProviderMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.account.link)[':provider']['$delete']> },
      ) => parseResponse(client.account.link[':provider'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /account/link/{provider}
 * Uses $url() for type-safe key generation
 */
export function getDeleteAccountLinkProviderMutationKey() {
  return `DELETE ${client.account.link[':provider'].$url().pathname}`
}

/**
 * GET /enterprise/sso
 *
 * エンタープライズSSO設定一覧
 */
export function useGetEnterpriseSso(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.enterprise.sso.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /enterprise/sso
 * Uses $url() for type-safe key generation
 */
export function getGetEnterpriseSsoKey() {
  return client.enterprise.sso.$url().pathname
}

/**
 * POST /enterprise/sso
 *
 * エンタープライズSSO設定作成
 */
export function usePostEnterpriseSso(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.enterprise.sso.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.enterprise.sso.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostEnterpriseSsoMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.enterprise.sso.$post> }) =>
        parseResponse(client.enterprise.sso.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /enterprise/sso
 * Uses $url() for type-safe key generation
 */
export function getPostEnterpriseSsoMutationKey() {
  return `POST ${client.enterprise.sso.$url().pathname}`
}

/**
 * GET /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定詳細
 */
export function useGetEnterpriseSsoConfigId(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoConfigIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.enterprise.sso[':configId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /enterprise/sso/{configId}
 * Uses $url() for type-safe key generation
 */
export function getGetEnterpriseSsoConfigIdKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
) {
  return client.enterprise.sso[':configId'].$url(args).pathname
}

/**
 * PUT /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定更新
 */
export function usePutEnterpriseSsoConfigId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.enterprise.sso)[':configId']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutEnterpriseSsoConfigIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']> },
      ) => parseResponse(client.enterprise.sso[':configId'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /enterprise/sso/{configId}
 * Uses $url() for type-safe key generation
 */
export function getPutEnterpriseSsoConfigIdMutationKey() {
  return `PUT ${client.enterprise.sso[':configId'].$url().pathname}`
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export function useDeleteEnterpriseSsoConfigId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.enterprise.sso)[':configId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteEnterpriseSsoConfigIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']> },
      ) => parseResponse(client.enterprise.sso[':configId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /enterprise/sso/{configId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteEnterpriseSsoConfigIdMutationKey() {
  return `DELETE ${client.enterprise.sso[':configId'].$url().pathname}`
}

/**
 * GET /enterprise/sso/domain-lookup
 *
 * ドメインからSSO設定を検索
 */
export function useGetEnterpriseSsoDomainLookup(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoDomainLookupKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.enterprise.sso['domain-lookup'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /enterprise/sso/domain-lookup
 * Uses $url() for type-safe key generation
 */
export function getGetEnterpriseSsoDomainLookupKey(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
) {
  return client.enterprise.sso['domain-lookup'].$url(args).pathname
}

/**
 * GET /enterprise/sso/{configId}/metadata
 *
 * SPメタデータ取得
 *
 * SAML SP メタデータを XML 形式で取得
 */
export function useGetEnterpriseSsoConfigIdMetadata(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetEnterpriseSsoConfigIdMetadataKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.enterprise.sso[':configId'].metadata.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /enterprise/sso/{configId}/metadata
 * Uses $url() for type-safe key generation
 */
export function getGetEnterpriseSsoConfigIdMetadataKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
) {
  return client.enterprise.sso[':configId'].metadata.$url(args).pathname
}
