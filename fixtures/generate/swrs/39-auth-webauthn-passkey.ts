import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/39-auth-webauthn-passkey'

/**
 * POST /webauthn/register/options
 *
 * 登録オプション取得
 *
 * パスキー登録のためのPublicKeyCredentialCreationOptionsを生成
 */
export function usePostWebauthnRegisterOptions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.register.options.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.webauthn.register.options.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostWebauthnRegisterOptionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.webauthn.register.options.$post> },
      ) => parseResponse(client.webauthn.register.options.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webauthn/register/options
 * Uses $url() for type-safe key generation
 */
export function getPostWebauthnRegisterOptionsMutationKey() {
  return `POST ${client.webauthn.register.options.$url().pathname}`
}

/**
 * POST /webauthn/register/verify
 *
 * 登録検証
 *
 * クライアントから送信された認証情報を検証し、パスキーを登録
 */
export function usePostWebauthnRegisterVerify(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.register.verify.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.webauthn.register.verify.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostWebauthnRegisterVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.webauthn.register.verify.$post> },
      ) => parseResponse(client.webauthn.register.verify.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webauthn/register/verify
 * Uses $url() for type-safe key generation
 */
export function getPostWebauthnRegisterVerifyMutationKey() {
  return `POST ${client.webauthn.register.verify.$url().pathname}`
}

/**
 * POST /webauthn/authenticate/options
 *
 * 認証オプション取得
 *
 * パスキー認証のためのPublicKeyCredentialRequestOptionsを生成
 */
export function usePostWebauthnAuthenticateOptions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.authenticate.options.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.webauthn.authenticate.options.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostWebauthnAuthenticateOptionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.webauthn.authenticate.options.$post> },
      ) => parseResponse(client.webauthn.authenticate.options.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webauthn/authenticate/options
 * Uses $url() for type-safe key generation
 */
export function getPostWebauthnAuthenticateOptionsMutationKey() {
  return `POST ${client.webauthn.authenticate.options.$url().pathname}`
}

/**
 * POST /webauthn/authenticate/verify
 *
 * 認証検証
 *
 * クライアントから送信された認証レスポンスを検証
 */
export function usePostWebauthnAuthenticateVerify(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.authenticate.verify.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.webauthn.authenticate.verify.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostWebauthnAuthenticateVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.webauthn.authenticate.verify.$post> },
      ) => parseResponse(client.webauthn.authenticate.verify.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webauthn/authenticate/verify
 * Uses $url() for type-safe key generation
 */
export function getPostWebauthnAuthenticateVerifyMutationKey() {
  return `POST ${client.webauthn.authenticate.verify.$url().pathname}`
}

/**
 * GET /webauthn/credentials
 *
 * 認証情報一覧取得
 *
 * ユーザーに登録されているパスキー一覧を取得
 */
export function useGetWebauthnCredentials(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWebauthnCredentialsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webauthn.credentials.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webauthn/credentials
 * Uses $url() for type-safe key generation
 */
export function getGetWebauthnCredentialsKey() {
  return client.webauthn.credentials.$url().pathname
}

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export function useGetWebauthnCredentialsCredentialId(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetWebauthnCredentialsCredentialIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.webauthn.credentials[':credentialId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webauthn/credentials/{credentialId}
 * Uses $url() for type-safe key generation
 */
export function getGetWebauthnCredentialsCredentialIdKey(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
) {
  return client.webauthn.credentials[':credentialId'].$url(args).pathname
}

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export function useDeleteWebauthnCredentialsCredentialId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteWebauthnCredentialsCredentialIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
        },
      ) => parseResponse(client.webauthn.credentials[':credentialId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webauthn/credentials/{credentialId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteWebauthnCredentialsCredentialIdMutationKey() {
  return `DELETE ${client.webauthn.credentials[':credentialId'].$url().pathname}`
}

/**
 * PATCH /webauthn/credentials/{credentialId}
 *
 * 認証情報更新
 *
 * パスキーの名前などを更新
 */
export function usePatchWebauthnCredentialsCredentialId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPatchWebauthnCredentialsCredentialIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
        },
      ) => parseResponse(client.webauthn.credentials[':credentialId'].$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /webauthn/credentials/{credentialId}
 * Uses $url() for type-safe key generation
 */
export function getPatchWebauthnCredentialsCredentialIdMutationKey() {
  return `PATCH ${client.webauthn.credentials[':credentialId'].$url().pathname}`
}

/**
 * GET /webauthn/settings
 *
 * WebAuthn設定取得
 *
 * リライングパーティの設定情報を取得
 */
export function useGetWebauthnSettings(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWebauthnSettingsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webauthn.settings.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webauthn/settings
 * Uses $url() for type-safe key generation
 */
export function getGetWebauthnSettingsKey() {
  return client.webauthn.settings.$url().pathname
}

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export function useGetWebauthnSettingsRp(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWebauthnSettingsRpKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webauthn.settings.rp.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webauthn/settings/rp
 * Uses $url() for type-safe key generation
 */
export function getGetWebauthnSettingsRpKey() {
  return client.webauthn.settings.rp.$url().pathname
}

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export function usePutWebauthnSettingsRp(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.settings.rp.$put>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.webauthn.settings.rp.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutWebauthnSettingsRpMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.webauthn.settings.rp.$put> }) =>
        parseResponse(client.webauthn.settings.rp.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /webauthn/settings/rp
 * Uses $url() for type-safe key generation
 */
export function getPutWebauthnSettingsRpMutationKey() {
  return `PUT ${client.webauthn.settings.rp.$url().pathname}`
}

/**
 * GET /webauthn/authenticators
 *
 * サポートされる認証器一覧
 *
 * 許可されている認証器のAAGUID一覧
 */
export function useGetWebauthnAuthenticators(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWebauthnAuthenticatorsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webauthn.authenticators.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webauthn/authenticators
 * Uses $url() for type-safe key generation
 */
export function getGetWebauthnAuthenticatorsKey() {
  return client.webauthn.authenticators.$url().pathname
}
