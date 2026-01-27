import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/43-sns-users-relationships'

/**
 * GET /users/{userId}
 *
 * ユーザー情報取得
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', args] as const
}

/**
 * GET /users/by/username/{username}
 *
 * ユーザー名でユーザー取得
 */
export function useGetUsersByUsernameUsername(
  args: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersByUsernameUsernameKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.by.username[':username'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/by/username/{username}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetUsersByUsernameUsernameKey(
  args: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
) {
  return ['/users/by/username/:username', args] as const
}

/**
 * GET /users/search
 *
 * ユーザー検索
 */
export function useGetUsersSearch(
  args: InferRequestType<typeof client.users.search.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersSearchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.search.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/search
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetUsersSearchKey(args: InferRequestType<typeof client.users.search.$get>) {
  return ['/users/search', args] as const
}

/**
 * GET /users/lookup
 *
 * 複数ユーザー一括取得
 */
export function useGetUsersLookup(
  args: InferRequestType<typeof client.users.lookup.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersLookupKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.lookup.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/lookup
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetUsersLookupKey(args: InferRequestType<typeof client.users.lookup.$get>) {
  return ['/users/lookup', args] as const
}

/**
 * GET /me
 *
 * 現在のユーザー情報取得
 */
export function useGetMe(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetMeKey() {
  return ['/me'] as const
}

/**
 * PATCH /me
 *
 * プロフィール更新
 */
export function usePatchMe(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.$patch>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.me.$patch>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.$patch> }) =>
        parseResponse(client.me.$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /me
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPatchMeMutationKey() {
  return 'PATCH /me'
}

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export function usePostMeAvatar(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.avatar.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.me.avatar.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMeAvatarMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.avatar.$post> }) =>
        parseResponse(client.me.avatar.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /me/avatar
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostMeAvatarMutationKey() {
  return 'POST /me/avatar'
}

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export function useDeleteMeAvatar(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.avatar.$delete>>>>
      >
    | undefined,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeAvatarMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.me.avatar.$delete(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /me/avatar
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteMeAvatarMutationKey() {
  return 'DELETE /me/avatar'
}

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export function usePostMeBanner(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.banner.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.me.banner.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMeBannerMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.banner.$post> }) =>
        parseResponse(client.me.banner.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /me/banner
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostMeBannerMutationKey() {
  return 'POST /me/banner'
}

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export function useDeleteMeBanner(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.banner.$delete>>>>
      >
    | undefined,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeBannerMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.me.banner.$delete(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /me/banner
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteMeBannerMutationKey() {
  return 'DELETE /me/banner'
}

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export function usePostUsersUserIdFollow(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.users)[':userId']['follow']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['follow']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersUserIdFollowMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['follow']['$post']> },
      ) => parseResponse(client.users[':userId'].follow.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /users/{userId}/follow
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostUsersUserIdFollowMutationKey() {
  return 'POST /users/:userId/follow'
}

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export function useDeleteUsersUserIdFollow(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.users)[':userId']['follow']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUsersUserIdFollowMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']> },
      ) => parseResponse(client.users[':userId'].follow.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /users/{userId}/follow
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteUsersUserIdFollowMutationKey() {
  return 'DELETE /users/:userId/follow'
}

/**
 * GET /users/{userId}/followers
 *
 * フォロワー一覧取得
 */
export function useGetUsersUserIdFollowers(
  args: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersUserIdFollowersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].followers.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}/followers
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetUsersUserIdFollowersKey(
  args: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
) {
  return ['/users/:userId/followers', args] as const
}

/**
 * GET /users/{userId}/following
 *
 * フォロー中一覧取得
 */
export function useGetUsersUserIdFollowing(
  args: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersUserIdFollowingKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].following.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}/following
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetUsersUserIdFollowingKey(
  args: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
) {
  return ['/users/:userId/following', args] as const
}

/**
 * POST /users/{userId}/followers/remove
 *
 * フォロワー削除
 *
 * 自分のフォロワーから削除
 */
export function usePostUsersUserIdFollowersRemove(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.users)[':userId']['followers']['remove']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersUserIdFollowersRemoveMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>
        },
      ) => parseResponse(client.users[':userId'].followers.remove.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /users/{userId}/followers/remove
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostUsersUserIdFollowersRemoveMutationKey() {
  return 'POST /users/:userId/followers/remove'
}

/**
 * GET /relationships
 *
 * 関係性一括取得
 */
export function useGetRelationships(
  args: InferRequestType<typeof client.relationships.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetRelationshipsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.relationships.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /relationships
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetRelationshipsKey(args: InferRequestType<typeof client.relationships.$get>) {
  return ['/relationships', args] as const
}

/**
 * GET /follow-requests
 *
 * フォローリクエスト一覧
 *
 * 非公開アカウントへのフォローリクエスト
 */
export function useGetFollowRequests(
  args: InferRequestType<(typeof client)['follow-requests']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetFollowRequestsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['follow-requests'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /follow-requests
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetFollowRequestsKey(
  args: InferRequestType<(typeof client)['follow-requests']['$get']>,
) {
  return ['/follow-requests', args] as const
}

/**
 * POST /follow-requests/{userId}/accept
 *
 * フォローリクエスト承認
 */
export function usePostFollowRequestsUserIdAccept(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['follow-requests'][':userId']['accept']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFollowRequestsUserIdAcceptMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>
        },
      ) => parseResponse(client['follow-requests'][':userId'].accept.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /follow-requests/{userId}/accept
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFollowRequestsUserIdAcceptMutationKey() {
  return 'POST /follow-requests/:userId/accept'
}

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export function usePostFollowRequestsUserIdReject(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['follow-requests'][':userId']['reject']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFollowRequestsUserIdRejectMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>
        },
      ) => parseResponse(client['follow-requests'][':userId'].reject.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /follow-requests/{userId}/reject
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFollowRequestsUserIdRejectMutationKey() {
  return 'POST /follow-requests/:userId/reject'
}

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export function usePostUsersUserIdBlock(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.users)[':userId']['block']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['block']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersUserIdBlockMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['block']['$post']> },
      ) => parseResponse(client.users[':userId'].block.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /users/{userId}/block
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostUsersUserIdBlockMutationKey() {
  return 'POST /users/:userId/block'
}

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export function useDeleteUsersUserIdBlock(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.users)[':userId']['block']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['block']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUsersUserIdBlockMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['block']['$delete']> },
      ) => parseResponse(client.users[':userId'].block.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /users/{userId}/block
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteUsersUserIdBlockMutationKey() {
  return 'DELETE /users/:userId/block'
}

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export function usePostUsersUserIdMute(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['mute']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['mute']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersUserIdMuteMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['mute']['$post']> },
      ) => parseResponse(client.users[':userId'].mute.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /users/{userId}/mute
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostUsersUserIdMuteMutationKey() {
  return 'POST /users/:userId/mute'
}

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export function useDeleteUsersUserIdMute(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.users)[':userId']['mute']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUsersUserIdMuteMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']> },
      ) => parseResponse(client.users[':userId'].mute.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /users/{userId}/mute
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteUsersUserIdMuteMutationKey() {
  return 'DELETE /users/:userId/mute'
}

/**
 * GET /blocks
 *
 * ブロックユーザー一覧
 */
export function useGetBlocks(
  args: InferRequestType<typeof client.blocks.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetBlocksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.blocks.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /blocks
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetBlocksKey(args: InferRequestType<typeof client.blocks.$get>) {
  return ['/blocks', args] as const
}

/**
 * GET /mutes
 *
 * ミュートユーザー一覧
 */
export function useGetMutes(
  args: InferRequestType<typeof client.mutes.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMutesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.mutes.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /mutes
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetMutesKey(args: InferRequestType<typeof client.mutes.$get>) {
  return ['/mutes', args] as const
}

/**
 * GET /lists
 *
 * リスト一覧取得
 */
export function useGetLists(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetListsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lists.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /lists
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetListsKey() {
  return ['/lists'] as const
}

/**
 * POST /lists
 *
 * リスト作成
 */
export function usePostLists(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.lists.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.lists.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostListsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.lists.$post> }) =>
        parseResponse(client.lists.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lists
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostListsMutationKey() {
  return 'POST /lists'
}

/**
 * GET /lists/{listId}
 *
 * リスト詳細取得
 */
export function useGetListsListId(
  args: InferRequestType<(typeof client.lists)[':listId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetListsListIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lists[':listId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /lists/{listId}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetListsListIdKey(
  args: InferRequestType<(typeof client.lists)[':listId']['$get']>,
) {
  return ['/lists/:listId', args] as const
}

/**
 * PUT /lists/{listId}
 *
 * リスト更新
 */
export function usePutListsListId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.lists)[':listId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.lists)[':listId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutListsListIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.lists)[':listId']['$put']> },
      ) => parseResponse(client.lists[':listId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /lists/{listId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPutListsListIdMutationKey() {
  return 'PUT /lists/:listId'
}

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export function useDeleteListsListId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.lists)[':listId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.lists)[':listId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteListsListIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.lists)[':listId']['$delete']> },
      ) => parseResponse(client.lists[':listId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /lists/{listId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteListsListIdMutationKey() {
  return 'DELETE /lists/:listId'
}

/**
 * GET /lists/{listId}/members
 *
 * リストメンバー一覧
 */
export function useGetListsListIdMembers(
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetListsListIdMembersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lists[':listId'].members.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /lists/{listId}/members
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetListsListIdMembersKey(
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
) {
  return ['/lists/:listId/members', args] as const
}

/**
 * POST /lists/{listId}/members
 *
 * リストにメンバー追加
 */
export function usePostListsListIdMembers(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lists)[':listId']['members']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.lists)[':listId']['members']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostListsListIdMembersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.lists)[':listId']['members']['$post']> },
      ) => parseResponse(client.lists[':listId'].members.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lists/{listId}/members
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostListsListIdMembersMutationKey() {
  return 'POST /lists/:listId/members'
}

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export function useDeleteListsListIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteListsListIdMembersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
        },
      ) => parseResponse(client.lists[':listId'].members[':userId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /lists/{listId}/members/{userId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteListsListIdMembersUserIdMutationKey() {
  return 'DELETE /lists/:listId/members/:userId'
}

/**
 * GET /lists/{listId}/timeline
 *
 * リストタイムライン取得
 */
export function useGetListsListIdTimeline(
  args: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetListsListIdTimelineKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lists[':listId'].timeline.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /lists/{listId}/timeline
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetListsListIdTimelineKey(
  args: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
) {
  return ['/lists/:listId/timeline', args] as const
}

/**
 * GET /users/{userId}/lists
 *
 * ユーザーが所属するリスト一覧
 */
export function useGetUsersUserIdLists(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersUserIdListsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].lists.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}/lists
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetUsersUserIdListsKey(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
) {
  return ['/users/:userId/lists', args] as const
}
