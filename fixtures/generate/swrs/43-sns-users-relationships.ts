import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersByUsernameUsernameKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.by.username[':username'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersSearchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.search.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersLookupKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.lookup.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.$patch>,
    Error,
    string,
    InferRequestType<typeof client.me.$patch>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /me',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.$patch> }) =>
      parseResponse(client.me.$patch(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export function usePostMeAvatar(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.avatar.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.avatar.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /me/avatar',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.avatar.$post> }) =>
      parseResponse(client.me.avatar.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export function useDeleteMeAvatar(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.avatar.$delete> | undefined,
    Error,
    string,
    undefined
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /me/avatar',
    async () => parseResponse(client.me.avatar.$delete(undefined, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export function usePostMeBanner(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.banner.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.banner.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /me/banner',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.banner.$post> }) =>
      parseResponse(client.me.banner.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export function useDeleteMeBanner(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.banner.$delete> | undefined,
    Error,
    string,
    undefined
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /me/banner',
    async () => parseResponse(client.me.banner.$delete(undefined, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export function usePostUsersUserIdFollow(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['follow']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['follow']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users/:userId/follow',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['follow']['$post']> },
    ) => parseResponse(client.users[':userId'].follow.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export function useDeleteUsersUserIdFollow(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['follow']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /users/:userId/follow',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']> },
    ) => parseResponse(client.users[':userId'].follow.$delete(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdFollowersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].followers.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdFollowingKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].following.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users/:userId/followers/remove',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>
      },
    ) => parseResponse(client.users[':userId'].followers.remove.$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetRelationshipsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.relationships.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFollowRequestsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['follow-requests'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /follow-requests/:userId/accept',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>
      },
    ) => parseResponse(client['follow-requests'][':userId'].accept.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export function usePostFollowRequestsUserIdReject(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /follow-requests/:userId/reject',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>
      },
    ) => parseResponse(client['follow-requests'][':userId'].reject.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export function usePostUsersUserIdBlock(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['block']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['block']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users/:userId/block',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['block']['$post']> },
    ) => parseResponse(client.users[':userId'].block.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export function useDeleteUsersUserIdBlock(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['block']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['block']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /users/:userId/block',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['block']['$delete']> },
    ) => parseResponse(client.users[':userId'].block.$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export function usePostUsersUserIdMute(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['mute']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['mute']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users/:userId/mute',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['mute']['$post']> },
    ) => parseResponse(client.users[':userId'].mute.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export function useDeleteUsersUserIdMute(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['mute']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /users/:userId/mute',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']> },
    ) => parseResponse(client.users[':userId'].mute.$delete(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetBlocksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.blocks.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMutesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.mutes.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetListsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lists.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.lists.$post>,
    Error,
    string,
    InferRequestType<typeof client.lists.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /lists',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.lists.$post> }) =>
      parseResponse(client.lists.$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetListsListIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lists[':listId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lists)[':listId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /lists/:listId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.lists)[':listId']['$put']> },
    ) => parseResponse(client.lists[':listId'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export function useDeleteListsListId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lists)[':listId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /lists/:listId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.lists)[':listId']['$delete']> },
    ) => parseResponse(client.lists[':listId'].$delete(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetListsListIdMembersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lists[':listId'].members.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lists)[':listId']['members']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['members']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /lists/:listId/members',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.lists)[':listId']['members']['$post']> },
    ) => parseResponse(client.lists[':listId'].members.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export function useDeleteListsListIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /lists/:listId/members/:userId',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
      },
    ) => parseResponse(client.lists[':listId'].members[':userId'].$delete(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetListsListIdTimelineKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lists[':listId'].timeline.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdListsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].lists.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}/lists
 */
export function getGetUsersUserIdListsKey(
  args?: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
) {
  return ['/users/:userId/lists', ...(args ? [args] : [])] as const
}
