import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/43-sns-users-relationships'

/**
 * GET /users/{userId}
 *
 * ユーザー情報取得
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
 * GET /users/by/username/{username}
 *
 * ユーザー名でユーザー取得
 */
export function useGetUsersByUsernameUsername(
  args: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.users.by.username)[':username']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersByUsernameUsernameKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.users.by.username)[':username']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.users.by.username[':username'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/by/username/{username}
 */
export function getGetUsersByUsernameUsernameKey(
  args?: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
) {
  return ['/users/by/username/:username', ...(args ? [args] : [])] as const
}

/**
 * GET /users/search
 *
 * ユーザー検索
 */
export function useGetUsersSearch(
  args: InferRequestType<typeof client.users.search.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.users.search.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersSearchKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.users.search.$get>, Error>(
    swrKey,
    async () => parseResponse(client.users.search.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/search
 */
export function getGetUsersSearchKey(args?: InferRequestType<typeof client.users.search.$get>) {
  return ['/users/search', ...(args ? [args] : [])] as const
}

/**
 * GET /users/lookup
 *
 * 複数ユーザー一括取得
 */
export function useGetUsersLookup(
  args: InferRequestType<typeof client.users.lookup.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.users.lookup.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersLookupKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.users.lookup.$get>, Error>(
    swrKey,
    async () => parseResponse(client.users.lookup.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/lookup
 */
export function getGetUsersLookupKey(args?: InferRequestType<typeof client.users.lookup.$get>) {
  return ['/users/lookup', ...(args ? [args] : [])] as const
}

/**
 * GET /me
 *
 * 現在のユーザー情報取得
 */
export function useGetMe(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.me.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeKey() : null)
  const query = useSWR<InferResponseType<typeof client.me.$get>, Error>(
    swrKey,
    async () => parseResponse(client.me.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /me
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
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.$patch>,
    Error,
    string,
    InferRequestType<typeof client.me.$patch>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.$patch>,
    Error,
    string,
    InferRequestType<typeof client.me.$patch>
  >(
    'PATCH /me',
    async (_, { arg }) => parseResponse(client.me.$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export function usePostMeAvatar(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.avatar.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.avatar.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.avatar.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.avatar.$post>
  >(
    'POST /me/avatar',
    async (_, { arg }) => parseResponse(client.me.avatar.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export function useDeleteMeAvatar(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.avatar.$delete>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<InferResponseType<typeof client.me.avatar.$delete>, Error, string, void>(
    'DELETE /me/avatar',
    async () => parseResponse(client.me.avatar.$delete(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export function usePostMeBanner(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.banner.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.banner.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.banner.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.banner.$post>
  >(
    'POST /me/banner',
    async (_, { arg }) => parseResponse(client.me.banner.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export function useDeleteMeBanner(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.banner.$delete>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<InferResponseType<typeof client.me.banner.$delete>, Error, string, void>(
    'DELETE /me/banner',
    async () => parseResponse(client.me.banner.$delete(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export function usePostUsersUserIdFollow(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['follow']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['follow']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['follow']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['follow']['$post']>
  >(
    'POST /users/:userId/follow',
    async (_, { arg }) => parseResponse(client.users[':userId'].follow.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export function useDeleteUsersUserIdFollow(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['follow']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['follow']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>
  >(
    'DELETE /users/:userId/follow',
    async (_, { arg }) =>
      parseResponse(client.users[':userId'].follow.$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /users/{userId}/followers
 *
 * フォロワー一覧取得
 */
export function useGetUsersUserIdFollowers(
  args: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.users)[':userId']['followers']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdFollowersKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.users)[':userId']['followers']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.users[':userId'].followers.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/{userId}/followers
 */
export function getGetUsersUserIdFollowersKey(
  args?: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
) {
  return ['/users/:userId/followers', ...(args ? [args] : [])] as const
}

/**
 * GET /users/{userId}/following
 *
 * フォロー中一覧取得
 */
export function useGetUsersUserIdFollowing(
  args: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.users)[':userId']['following']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdFollowingKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.users)[':userId']['following']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.users[':userId'].following.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/{userId}/following
 */
export function getGetUsersUserIdFollowingKey(
  args?: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
) {
  return ['/users/:userId/following', ...(args ? [args] : [])] as const
}

/**
 * POST /users/{userId}/followers/remove
 *
 * フォロワー削除
 *
 * 自分のフォロワーから削除
 */
export function usePostUsersUserIdFollowersRemove(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>
  >(
    'POST /users/:userId/followers/remove',
    async (_, { arg }) =>
      parseResponse(client.users[':userId'].followers.remove.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /relationships
 *
 * 関係性一括取得
 */
export function useGetRelationships(
  args: InferRequestType<typeof client.relationships.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.relationships.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetRelationshipsKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.relationships.$get>, Error>(
    swrKey,
    async () => parseResponse(client.relationships.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /relationships
 */
export function getGetRelationshipsKey(args?: InferRequestType<typeof client.relationships.$get>) {
  return ['/relationships', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client)['follow-requests']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFollowRequestsKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client)['follow-requests']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['follow-requests'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /follow-requests
 */
export function getGetFollowRequestsKey(
  args?: InferRequestType<(typeof client)['follow-requests']['$get']>,
) {
  return ['/follow-requests', ...(args ? [args] : [])] as const
}

/**
 * POST /follow-requests/{userId}/accept
 *
 * フォローリクエスト承認
 */
export function usePostFollowRequestsUserIdAccept(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>
  >(
    'POST /follow-requests/:userId/accept',
    async (_, { arg }) =>
      parseResponse(client['follow-requests'][':userId'].accept.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export function usePostFollowRequestsUserIdReject(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>
  >(
    'POST /follow-requests/:userId/reject',
    async (_, { arg }) =>
      parseResponse(client['follow-requests'][':userId'].reject.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export function usePostUsersUserIdBlock(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['block']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['block']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['block']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['block']['$post']>
  >(
    'POST /users/:userId/block',
    async (_, { arg }) => parseResponse(client.users[':userId'].block.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export function useDeleteUsersUserIdBlock(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['block']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['block']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['block']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['block']['$delete']>
  >(
    'DELETE /users/:userId/block',
    async (_, { arg }) =>
      parseResponse(client.users[':userId'].block.$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export function usePostUsersUserIdMute(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['mute']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['mute']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['mute']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['mute']['$post']>
  >(
    'POST /users/:userId/mute',
    async (_, { arg }) => parseResponse(client.users[':userId'].mute.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export function useDeleteUsersUserIdMute(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['mute']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['mute']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>
  >(
    'DELETE /users/:userId/mute',
    async (_, { arg }) => parseResponse(client.users[':userId'].mute.$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /blocks
 *
 * ブロックユーザー一覧
 */
export function useGetBlocks(
  args: InferRequestType<typeof client.blocks.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.blocks.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetBlocksKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.blocks.$get>, Error>(
    swrKey,
    async () => parseResponse(client.blocks.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /blocks
 */
export function getGetBlocksKey(args?: InferRequestType<typeof client.blocks.$get>) {
  return ['/blocks', ...(args ? [args] : [])] as const
}

/**
 * GET /mutes
 *
 * ミュートユーザー一覧
 */
export function useGetMutes(
  args: InferRequestType<typeof client.mutes.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.mutes.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMutesKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.mutes.$get>, Error>(
    swrKey,
    async () => parseResponse(client.mutes.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /mutes
 */
export function getGetMutesKey(args?: InferRequestType<typeof client.mutes.$get>) {
  return ['/mutes', ...(args ? [args] : [])] as const
}

/**
 * GET /lists
 *
 * リスト一覧取得
 */
export function useGetLists(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.lists.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetListsKey() : null)
  const query = useSWR<InferResponseType<typeof client.lists.$get>, Error>(
    swrKey,
    async () => parseResponse(client.lists.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /lists
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
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.lists.$post>,
    Error,
    string,
    InferRequestType<typeof client.lists.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.lists.$post>,
    Error,
    string,
    InferRequestType<typeof client.lists.$post>
  >(
    'POST /lists',
    async (_, { arg }) => parseResponse(client.lists.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /lists/{listId}
 *
 * リスト詳細取得
 */
export function useGetListsListId(
  args: InferRequestType<(typeof client.lists)[':listId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.lists)[':listId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetListsListIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.lists)[':listId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.lists[':listId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /lists/{listId}
 */
export function getGetListsListIdKey(
  args?: InferRequestType<(typeof client.lists)[':listId']['$get']>,
) {
  return ['/lists/:listId', ...(args ? [args] : [])] as const
}

/**
 * PUT /lists/{listId}
 *
 * リスト更新
 */
export function usePutListsListId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lists)[':listId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lists)[':listId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['$put']>
  >(
    'PUT /lists/:listId',
    async (_, { arg }) => parseResponse(client.lists[':listId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export function useDeleteListsListId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lists)[':listId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lists)[':listId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['$delete']>
  >(
    'DELETE /lists/:listId',
    async (_, { arg }) => parseResponse(client.lists[':listId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /lists/{listId}/members
 *
 * リストメンバー一覧
 */
export function useGetListsListIdMembers(
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.lists)[':listId']['members']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetListsListIdMembersKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.lists)[':listId']['members']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.lists[':listId'].members.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /lists/{listId}/members
 */
export function getGetListsListIdMembersKey(
  args?: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
) {
  return ['/lists/:listId/members', ...(args ? [args] : [])] as const
}

/**
 * POST /lists/{listId}/members
 *
 * リストにメンバー追加
 */
export function usePostListsListIdMembers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lists)[':listId']['members']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['members']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lists)[':listId']['members']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['members']['$post']>
  >(
    'POST /lists/:listId/members',
    async (_, { arg }) =>
      parseResponse(client.lists[':listId'].members.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export function useDeleteListsListIdMembersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
  >(
    'DELETE /lists/:listId/members/:userId',
    async (_, { arg }) =>
      parseResponse(client.lists[':listId'].members[':userId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /lists/{listId}/timeline
 *
 * リストタイムライン取得
 */
export function useGetListsListIdTimeline(
  args: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.lists)[':listId']['timeline']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetListsListIdTimelineKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.lists)[':listId']['timeline']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.lists[':listId'].timeline.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /lists/{listId}/timeline
 */
export function getGetListsListIdTimelineKey(
  args?: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
) {
  return ['/lists/:listId/timeline', ...(args ? [args] : [])] as const
}

/**
 * GET /users/{userId}/lists
 *
 * ユーザーが所属するリスト一覧
 */
export function useGetUsersUserIdLists(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.users)[':userId']['lists']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdListsKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.users)[':userId']['lists']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.users[':userId'].lists.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/{userId}/lists
 */
export function getGetUsersUserIdListsKey(
  args?: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
) {
  return ['/users/:userId/lists', ...(args ? [args] : [])] as const
}
