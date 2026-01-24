import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/29-practical-user-api'

/**
 * POST /auth/register
 *
 * 新規ユーザー登録
 *
 * メールアドレスとパスワードで新規ユーザーを登録します
 */
export function usePostAuthRegister(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /auth/register',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.auth.register.$post> }) =>
      parseResponse(client.auth.register.$post(arg, options?.client)),
  )
}

/**
 * POST /auth/login
 *
 * ログイン
 *
 * メールアドレスとパスワードで認証し、JWTトークンを取得します
 */
export function usePostAuthLogin(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /auth/login',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.auth.login.$post> }) =>
      parseResponse(client.auth.login.$post(arg, options?.client)),
  )
}

/**
 * POST /auth/refresh
 *
 * トークンリフレッシュ
 *
 * リフレッシュトークンを使用して新しいアクセストークンを取得します
 */
export function usePostAuthRefresh(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /auth/refresh',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.auth.refresh.$post> }) =>
      parseResponse(client.auth.refresh.$post(arg, options?.client)),
  )
}

/**
 * POST /auth/logout
 *
 * ログアウト
 */
export function usePostAuthLogout(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation('POST /auth/logout', async () =>
    parseResponse(client.auth.logout.$post(undefined, options?.client)),
  )
}

/**
 * POST /auth/password/forgot
 *
 * パスワードリセット要求
 *
 * パスワードリセット用のメールを送信します
 */
export function usePostAuthPasswordForgot(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /auth/password/forgot',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.auth.password.forgot.$post> },
    ) => parseResponse(client.auth.password.forgot.$post(arg, options?.client)),
  )
}

/**
 * POST /auth/password/reset
 *
 * パスワードリセット実行
 */
export function usePostAuthPasswordReset(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /auth/password/reset',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.auth.password.reset.$post> },
    ) => parseResponse(client.auth.password.reset.$post(arg, options?.client)),
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
export function useDeleteUsersUserId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /users/:userId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$delete']> },
    ) => parseResponse(client.users[':userId'].$delete(arg, options?.client)),
  )
}

/**
 * PATCH /users/{userId}
 *
 * ユーザー情報更新
 */
export function usePatchUsersUserId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PATCH /users/:userId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$patch']> },
    ) => parseResponse(client.users[':userId'].$patch(arg, options?.client)),
  )
}

/**
 * GET /users/me
 *
 * 現在のユーザー情報取得
 */
export function useGetUsersMe(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.me.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
export function usePatchUsersMe(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PATCH /users/me',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.users.me.$patch> }) =>
      parseResponse(client.users.me.$patch(arg, options?.client)),
  )
}

/**
 * PUT /users/me/password
 *
 * パスワード変更
 */
export function usePutUsersMePassword(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /users/me/password',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.users.me.password.$put> }) =>
      parseResponse(client.users.me.password.$put(arg, options?.client)),
  )
}

/**
 * PUT /users/me/avatar
 *
 * アバター画像アップロード
 */
export function usePutUsersMeAvatar(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /users/me/avatar',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.users.me.avatar.$put> }) =>
      parseResponse(client.users.me.avatar.$put(arg, options?.client)),
  )
}

/**
 * DELETE /users/me/avatar
 *
 * アバター画像削除
 */
export function useDeleteUsersMeAvatar(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation('DELETE /users/me/avatar', async () =>
    parseResponse(client.users.me.avatar.$delete(undefined, options?.client)),
  )
}
