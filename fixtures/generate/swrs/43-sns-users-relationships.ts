import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
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
export function usePatchMe(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PATCH /me',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.$patch> }) =>
      parseResponse(client.me.$patch(arg, options?.client)),
  )
}

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export function usePostMeAvatar(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /me/avatar',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.avatar.$post> }) =>
      parseResponse(client.me.avatar.$post(arg, options?.client)),
  )
}

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export function useDeleteMeAvatar(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation('DELETE /me/avatar', async () =>
    parseResponse(client.me.avatar.$delete(undefined, options?.client)),
  )
}

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export function usePostMeBanner(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /me/banner',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.banner.$post> }) =>
      parseResponse(client.me.banner.$post(arg, options?.client)),
  )
}

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export function useDeleteMeBanner(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation('DELETE /me/banner', async () =>
    parseResponse(client.me.banner.$delete(undefined, options?.client)),
  )
}

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export function usePostUsersUserIdFollow(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /users/:userId/follow',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['follow']['$post']> },
    ) => parseResponse(client.users[':userId'].follow.$post(arg, options?.client)),
  )
}

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export function useDeleteUsersUserIdFollow(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /users/:userId/follow',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']> },
    ) => parseResponse(client.users[':userId'].follow.$delete(arg, options?.client)),
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
export function usePostUsersUserIdFollowersRemove(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /users/:userId/followers/remove',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>
      },
    ) => parseResponse(client.users[':userId'].followers.remove.$post(arg, options?.client)),
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
export function usePostFollowRequestsUserIdAccept(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /follow-requests/:userId/accept',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>
      },
    ) => parseResponse(client['follow-requests'][':userId'].accept.$post(arg, options?.client)),
  )
}

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export function usePostFollowRequestsUserIdReject(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /follow-requests/:userId/reject',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>
      },
    ) => parseResponse(client['follow-requests'][':userId'].reject.$post(arg, options?.client)),
  )
}

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export function usePostUsersUserIdBlock(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /users/:userId/block',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['block']['$post']> },
    ) => parseResponse(client.users[':userId'].block.$post(arg, options?.client)),
  )
}

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export function useDeleteUsersUserIdBlock(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /users/:userId/block',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['block']['$delete']> },
    ) => parseResponse(client.users[':userId'].block.$delete(arg, options?.client)),
  )
}

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export function usePostUsersUserIdMute(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /users/:userId/mute',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['mute']['$post']> },
    ) => parseResponse(client.users[':userId'].mute.$post(arg, options?.client)),
  )
}

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export function useDeleteUsersUserIdMute(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /users/:userId/mute',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']> },
    ) => parseResponse(client.users[':userId'].mute.$delete(arg, options?.client)),
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
export function usePostLists(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /lists',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.lists.$post> }) =>
      parseResponse(client.lists.$post(arg, options?.client)),
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
export function usePutListsListId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /lists/:listId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.lists)[':listId']['$put']> },
    ) => parseResponse(client.lists[':listId'].$put(arg, options?.client)),
  )
}

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export function useDeleteListsListId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /lists/:listId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.lists)[':listId']['$delete']> },
    ) => parseResponse(client.lists[':listId'].$delete(arg, options?.client)),
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
export function usePostListsListIdMembers(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /lists/:listId/members',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.lists)[':listId']['members']['$post']> },
    ) => parseResponse(client.lists[':listId'].members.$post(arg, options?.client)),
  )
}

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export function useDeleteListsListIdMembersUserId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /lists/:listId/members/:userId',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
      },
    ) => parseResponse(client.lists[':listId'].members[':userId'].$delete(arg, options?.client)),
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
