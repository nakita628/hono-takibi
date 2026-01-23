import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
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
export function createPostAuthRegister(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.auth.register.$post> | undefined,
      Error,
      InferRequestType<typeof client.auth.register.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.auth.register.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.register.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.auth.register.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /auth/login
 *
 * ログイン
 *
 * メールアドレスとパスワードで認証し、JWTトークンを取得します
 */
export function createPostAuthLogin(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.auth.login.$post> | undefined,
      Error,
      InferRequestType<typeof client.auth.login.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.auth.login.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.login.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.auth.login.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /auth/refresh
 *
 * トークンリフレッシュ
 *
 * リフレッシュトークンを使用して新しいアクセストークンを取得します
 */
export function createPostAuthRefresh(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.auth.refresh.$post> | undefined,
      Error,
      InferRequestType<typeof client.auth.refresh.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.auth.refresh.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.refresh.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.auth.refresh.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /auth/logout
 *
 * ログアウト
 */
export function createPostAuthLogout(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.auth.logout.$post> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.auth.logout.$post> | undefined,
    Error,
    void
  >(
    {
      ...options?.mutation,
      mutationFn: async () => parseResponse(client.auth.logout.$post(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /auth/password/forgot
 *
 * パスワードリセット要求
 *
 * パスワードリセット用のメールを送信します
 */
export function createPostAuthPasswordForgot(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.auth.password.forgot.$post> | undefined,
      Error,
      InferRequestType<typeof client.auth.password.forgot.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.auth.password.forgot.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.password.forgot.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.auth.password.forgot.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /auth/password/reset
 *
 * パスワードリセット実行
 */
export function createPostAuthPasswordReset(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.auth.password.reset.$post> | undefined,
      Error,
      InferRequestType<typeof client.auth.password.reset.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.auth.password.reset.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.password.reset.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.auth.password.reset.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /users
 *
 * ユーザー一覧取得
 *
 * ページネーション付きでユーザー一覧を取得します（管理者のみ）
 */
export function createGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.users.$get>,
      Error,
      InferResponseType<typeof client.users.$get>,
      readonly ['/users', InferRequestType<typeof client.users.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['/users', args] as const
}

/**
 * GET /users/{userId}
 *
 * ユーザー詳細取得
 */
export function createGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)[':userId']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':userId']['$get']>,
      readonly ['/users/:userId', InferRequestType<(typeof client.users)[':userId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', args] as const
}

/**
 * DELETE /users/{userId}
 *
 * ユーザー削除
 */
export function createDeleteUsersUserId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.users)[':userId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':userId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.users)[':userId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.users[':userId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /users/{userId}
 *
 * ユーザー情報更新
 */
export function createPatchUsersUserId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':userId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.users[':userId'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /users/me
 *
 * 現在のユーザー情報取得
 */
export function createGetUsersMe(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.users.me.$get>,
      Error,
      InferResponseType<typeof client.users.me.$get>,
      readonly ['/users/me']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users.me.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/me
 */
export function getGetUsersMeQueryKey() {
  return ['/users/me'] as const
}

/**
 * PATCH /users/me
 *
 * 現在のユーザー情報更新
 */
export function createPatchUsersMe(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.users.me.$patch> | undefined,
      Error,
      InferRequestType<typeof client.users.me.$patch>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.users.me.$patch> | undefined,
    Error,
    InferRequestType<typeof client.users.me.$patch>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.users.me.$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /users/me/password
 *
 * パスワード変更
 */
export function createPutUsersMePassword(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.users.me.password.$put> | undefined,
      Error,
      InferRequestType<typeof client.users.me.password.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.users.me.password.$put> | undefined,
    Error,
    InferRequestType<typeof client.users.me.password.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.users.me.password.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /users/me/avatar
 *
 * アバター画像アップロード
 */
export function createPutUsersMeAvatar(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.users.me.avatar.$put> | undefined,
      Error,
      InferRequestType<typeof client.users.me.avatar.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.users.me.avatar.$put> | undefined,
    Error,
    InferRequestType<typeof client.users.me.avatar.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.users.me.avatar.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /users/me/avatar
 *
 * アバター画像削除
 */
export function createDeleteUsersMeAvatar(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.users.me.avatar.$delete> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.users.me.avatar.$delete> | undefined,
    Error,
    void
  >(
    {
      ...options?.mutation,
      mutationFn: async () =>
        parseResponse(client.users.me.avatar.$delete(undefined, options?.client)),
    },
    queryClient,
  )
}
