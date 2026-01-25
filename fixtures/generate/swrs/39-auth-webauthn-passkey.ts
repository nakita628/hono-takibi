import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
    InferResponseType<typeof client.webauthn.register.options.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.register.options.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webauthn/register/options',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.webauthn.register.options.$post> },
    ) => parseResponse(client.webauthn.register.options.$post(arg, options?.client)),
    mutationOptions,
  )
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
    InferResponseType<typeof client.webauthn.register.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.register.verify.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webauthn/register/verify',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.webauthn.register.verify.$post> },
    ) => parseResponse(client.webauthn.register.verify.$post(arg, options?.client)),
    mutationOptions,
  )
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
    InferResponseType<typeof client.webauthn.authenticate.options.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.authenticate.options.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webauthn/authenticate/options',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.webauthn.authenticate.options.$post> },
    ) => parseResponse(client.webauthn.authenticate.options.$post(arg, options?.client)),
    mutationOptions,
  )
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
    InferResponseType<typeof client.webauthn.authenticate.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.authenticate.verify.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webauthn/authenticate/verify',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.webauthn.authenticate.verify.$post> },
    ) => parseResponse(client.webauthn.authenticate.verify.$post(arg, options?.client)),
    mutationOptions,
  )
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
 */
export function getGetWebauthnCredentialsKey() {
  return ['/webauthn/credentials'] as const
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
 * Generates SWR cache key for GET /webauthn/credentials/{credentialId
 */
export function getGetWebauthnCredentialsCredentialIdKey(
  args?: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
) {
  return ['/webauthn/credentials/:credentialId', ...(args ? [args] : [])] as const
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
    InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /webauthn/credentials/:credentialId',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
      },
    ) => parseResponse(client.webauthn.credentials[':credentialId'].$delete(arg, options?.client)),
    mutationOptions,
  )
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
    InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /webauthn/credentials/:credentialId',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']> },
    ) => parseResponse(client.webauthn.credentials[':credentialId'].$patch(arg, options?.client)),
    mutationOptions,
  )
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
 */
export function getGetWebauthnSettingsKey() {
  return ['/webauthn/settings'] as const
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
 */
export function getGetWebauthnSettingsRpKey() {
  return ['/webauthn/settings/rp'] as const
}

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export function usePutWebauthnSettingsRp(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.webauthn.settings.rp.$put>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.settings.rp.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /webauthn/settings/rp',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.webauthn.settings.rp.$put> },
    ) => parseResponse(client.webauthn.settings.rp.$put(arg, options?.client)),
    mutationOptions,
  )
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
 */
export function getGetWebauthnAuthenticatorsKey() {
  return ['/webauthn/authenticators'] as const
}
