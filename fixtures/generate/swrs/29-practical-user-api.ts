import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/29-practical-user-api'

/**
 * POST /auth/register
 *
 * 新規ユーザー登録
 *
 * メールアドレスとパスワードで新規ユーザーを登録します
 */
export function usePostAuthRegister(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.auth.register.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.register.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.auth.register.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.register.$post>
  >(
    'POST /auth/register',
    async (_, { arg }) => parseResponse(client.auth.register.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /auth/login
 *
 * ログイン
 *
 * メールアドレスとパスワードで認証し、JWTトークンを取得します
 */
export function usePostAuthLogin(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.auth.login.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.login.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.auth.login.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.login.$post>
  >(
    'POST /auth/login',
    async (_, { arg }) => parseResponse(client.auth.login.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /auth/refresh
 *
 * トークンリフレッシュ
 *
 * リフレッシュトークンを使用して新しいアクセストークンを取得します
 */
export function usePostAuthRefresh(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.auth.refresh.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.refresh.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.auth.refresh.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.refresh.$post>
  >(
    'POST /auth/refresh',
    async (_, { arg }) => parseResponse(client.auth.refresh.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /auth/logout
 *
 * ログアウト
 */
export function usePostAuthLogout(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.auth.logout.$post>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<InferResponseType<typeof client.auth.logout.$post>, Error, string, void>(
    'POST /auth/logout',
    async () => parseResponse(client.auth.logout.$post(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * POST /auth/password/forgot
 *
 * パスワードリセット要求
 *
 * パスワードリセット用のメールを送信します
 */
export function usePostAuthPasswordForgot(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.auth.password.forgot.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.password.forgot.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.auth.password.forgot.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.password.forgot.$post>
  >(
    'POST /auth/password/forgot',
    async (_, { arg }) => parseResponse(client.auth.password.forgot.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /auth/password/reset
 *
 * パスワードリセット実行
 */
export function usePostAuthPasswordReset(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.auth.password.reset.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.password.reset.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.auth.password.reset.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.password.reset.$post>
  >(
    'POST /auth/password/reset',
    async (_, { arg }) => parseResponse(client.auth.password.reset.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /users
 *
 * ユーザー一覧取得
 *
 * ページネーション付きでユーザー一覧を取得します（管理者のみ）
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.users.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.users.$get>, Error>(
    swrKey,
    async () => parseResponse(client.users.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users
 */
export function getGetUsersKey(args?: InferRequestType<typeof client.users.$get>) {
  return ['/users', ...(args ? [args] : [])] as const
}

/**
 * GET /users/{userId}
 *
 * ユーザー詳細取得
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.users)[':userId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.users)[':userId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/{userId}
 */
export function getGetUsersUserIdKey(
  args?: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /users/{userId}
 *
 * ユーザー削除
 */
export function useDeleteUsersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  >(
    'DELETE /users/:userId',
    async (_, { arg }) => parseResponse(client.users[':userId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /users/{userId}
 *
 * ユーザー情報更新
 */
export function usePatchUsersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >(
    'PATCH /users/:userId',
    async (_, { arg }) => parseResponse(client.users[':userId'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /users/me
 *
 * 現在のユーザー情報取得
 */
export function useGetUsersMe(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.users.me.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersMeKey() : null)
  const query = useSWR<InferResponseType<typeof client.users.me.$get>, Error>(
    swrKey,
    async () => parseResponse(client.users.me.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/me
 */
export function getGetUsersMeKey() {
  return ['/users/me'] as const
}

/**
 * PATCH /users/me
 *
 * 現在のユーザー情報更新
 */
export function usePatchUsersMe(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.me.$patch>,
    Error,
    string,
    InferRequestType<typeof client.users.me.$patch>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.users.me.$patch>,
    Error,
    string,
    InferRequestType<typeof client.users.me.$patch>
  >(
    'PATCH /users/me',
    async (_, { arg }) => parseResponse(client.users.me.$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /users/me/password
 *
 * パスワード変更
 */
export function usePutUsersMePassword(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.me.password.$put>,
    Error,
    string,
    InferRequestType<typeof client.users.me.password.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.users.me.password.$put>,
    Error,
    string,
    InferRequestType<typeof client.users.me.password.$put>
  >(
    'PUT /users/me/password',
    async (_, { arg }) => parseResponse(client.users.me.password.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /users/me/avatar
 *
 * アバター画像アップロード
 */
export function usePutUsersMeAvatar(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.me.avatar.$put>,
    Error,
    string,
    InferRequestType<typeof client.users.me.avatar.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.users.me.avatar.$put>,
    Error,
    string,
    InferRequestType<typeof client.users.me.avatar.$put>
  >(
    'PUT /users/me/avatar',
    async (_, { arg }) => parseResponse(client.users.me.avatar.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /users/me/avatar
 *
 * アバター画像削除
 */
export function useDeleteUsersMeAvatar(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.me.avatar.$delete>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.users.me.avatar.$delete>,
    Error,
    string,
    void
  >(
    'DELETE /users/me/avatar',
    async () => parseResponse(client.users.me.avatar.$delete(undefined, options?.client)),
    options?.swr,
  )
}
