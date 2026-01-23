import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
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
export function usePostAuthRegister(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.auth.register.$post> | undefined,
      Error,
      InferRequestType<typeof client.auth.register.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePostAuthLogin(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.auth.login.$post> | undefined,
      Error,
      InferRequestType<typeof client.auth.login.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePostAuthRefresh(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.auth.refresh.$post> | undefined,
      Error,
      InferRequestType<typeof client.auth.refresh.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePostAuthLogout(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.auth.logout.$post> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<InferResponseType<typeof client.auth.logout.$post> | undefined, Error, void>(
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
export function usePostAuthPasswordForgot(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.auth.password.forgot.$post> | undefined,
      Error,
      InferRequestType<typeof client.auth.password.forgot.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePostAuthPasswordReset(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.auth.password.reset.$post> | undefined,
      Error,
      InferRequestType<typeof client.auth.password.reset.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.users.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.users.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users
 */
export function getGetUsersQueryKey(args?: InferRequestType<typeof client.users.$get>) {
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.users)[':userId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/{userId}
 */
export function getGetUsersUserIdQueryKey(
  args?: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /users/{userId}
 *
 * ユーザー削除
 */
export function useDeleteUsersUserId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.users)[':userId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':userId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePatchUsersUserId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':userId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useGetUsersMe(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.users.me.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.users.me.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/me
 */
export function getGetUsersMeQueryKey() {
  return ['/users/me'] as const
}

/**
 * PATCH /users/me
 *
 * 現在のユーザー情報更新
 */
export function usePatchUsersMe(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.users.me.$patch> | undefined,
      Error,
      InferRequestType<typeof client.users.me.$patch>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePutUsersMePassword(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.users.me.password.$put> | undefined,
      Error,
      InferRequestType<typeof client.users.me.password.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePutUsersMeAvatar(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.users.me.avatar.$put> | undefined,
      Error,
      InferRequestType<typeof client.users.me.avatar.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useDeleteUsersMeAvatar(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.users.me.avatar.$delete> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
