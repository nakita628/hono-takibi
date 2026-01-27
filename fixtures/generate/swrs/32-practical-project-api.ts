import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/32-practical-project-api'

/**
 * GET /projects
 *
 * プロジェクト一覧取得
 */
export function useGetProjects(
  args: InferRequestType<typeof client.projects.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProjectsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /projects
 * Uses $url() for type-safe key generation
 */
export function getGetProjectsKey(args: InferRequestType<typeof client.projects.$get>) {
  return client.projects.$url(args).pathname
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export function usePostProjects(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.projects.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.projects.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostProjectsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.projects.$post> }) =>
        parseResponse(client.projects.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /projects
 * Uses $url() for type-safe key generation
 */
export function getPostProjectsMutationKey() {
  return `POST ${client.projects.$url().pathname}`
}

/**
 * GET /projects/{projectId}
 *
 * プロジェクト詳細取得
 */
export function useGetProjectsProjectId(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProjectsProjectIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects[':projectId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /projects/{projectId}
 * Uses $url() for type-safe key generation
 */
export function getGetProjectsProjectIdKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
) {
  return client.projects[':projectId'].$url(args).pathname
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export function usePutProjectsProjectId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.projects)[':projectId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.projects)[':projectId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutProjectsProjectIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.projects)[':projectId']['$put']> },
      ) => parseResponse(client.projects[':projectId'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /projects/{projectId}
 * Uses $url() for type-safe key generation
 */
export function getPutProjectsProjectIdMutationKey() {
  return `PUT ${client.projects[':projectId'].$url().pathname}`
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export function useDeleteProjectsProjectId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.projects)[':projectId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.projects)[':projectId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteProjectsProjectIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.projects)[':projectId']['$delete']> },
      ) => parseResponse(client.projects[':projectId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /projects/{projectId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteProjectsProjectIdMutationKey() {
  return `DELETE ${client.projects[':projectId'].$url().pathname}`
}

/**
 * GET /projects/{projectId}/members
 *
 * プロジェクトメンバー一覧
 */
export function useGetProjectsProjectIdMembers(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProjectsProjectIdMembersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects[':projectId'].members.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /projects/{projectId}/members
 * Uses $url() for type-safe key generation
 */
export function getGetProjectsProjectIdMembersKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
) {
  return client.projects[':projectId'].members.$url(args).pathname
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export function usePostProjectsProjectIdMembers(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.projects)[':projectId']['members']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostProjectsProjectIdMembersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']> },
      ) => parseResponse(client.projects[':projectId'].members.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /projects/{projectId}/members
 * Uses $url() for type-safe key generation
 */
export function getPostProjectsProjectIdMembersMutationKey() {
  return `POST ${client.projects[':projectId'].members.$url().pathname}`
}

/**
 * GET /projects/{projectId}/tasks
 *
 * プロジェクトのタスク一覧
 */
export function useGetProjectsProjectIdTasks(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProjectsProjectIdTasksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects[':projectId'].tasks.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /projects/{projectId}/tasks
 * Uses $url() for type-safe key generation
 */
export function getGetProjectsProjectIdTasksKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
) {
  return client.projects[':projectId'].tasks.$url(args).pathname
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export function usePostProjectsProjectIdTasks(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.projects)[':projectId']['tasks']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostProjectsProjectIdTasksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']> },
      ) => parseResponse(client.projects[':projectId'].tasks.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /projects/{projectId}/tasks
 * Uses $url() for type-safe key generation
 */
export function getPostProjectsProjectIdTasksMutationKey() {
  return `POST ${client.projects[':projectId'].tasks.$url().pathname}`
}

/**
 * GET /tasks/{taskId}
 *
 * タスク詳細取得
 */
export function useGetTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTasksTaskIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.tasks[':taskId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tasks/{taskId}
 * Uses $url() for type-safe key generation
 */
export function getGetTasksTaskIdKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
) {
  return client.tasks[':taskId'].$url(args).pathname
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export function usePutTasksTaskId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.tasks)[':taskId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutTasksTaskIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['$put']> },
      ) => parseResponse(client.tasks[':taskId'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /tasks/{taskId}
 * Uses $url() for type-safe key generation
 */
export function getPutTasksTaskIdMutationKey() {
  return `PUT ${client.tasks[':taskId'].$url().pathname}`
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export function useDeleteTasksTaskId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.tasks)[':taskId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteTasksTaskIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['$delete']> },
      ) => parseResponse(client.tasks[':taskId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /tasks/{taskId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteTasksTaskIdMutationKey() {
  return `DELETE ${client.tasks[':taskId'].$url().pathname}`
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export function usePatchTasksTaskIdStatus(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.tasks)[':taskId']['status']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPatchTasksTaskIdStatusMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']> },
      ) => parseResponse(client.tasks[':taskId'].status.$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /tasks/{taskId}/status
 * Uses $url() for type-safe key generation
 */
export function getPatchTasksTaskIdStatusMutationKey() {
  return `PATCH ${client.tasks[':taskId'].status.$url().pathname}`
}

/**
 * GET /tasks/{taskId}/comments
 *
 * タスクコメント一覧
 */
export function useGetTasksTaskIdComments(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTasksTaskIdCommentsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.tasks[':taskId'].comments.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tasks/{taskId}/comments
 * Uses $url() for type-safe key generation
 */
export function getGetTasksTaskIdCommentsKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
) {
  return client.tasks[':taskId'].comments.$url(args).pathname
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export function usePostTasksTaskIdComments(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.tasks)[':taskId']['comments']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostTasksTaskIdCommentsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']> },
      ) => parseResponse(client.tasks[':taskId'].comments.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /tasks/{taskId}/comments
 * Uses $url() for type-safe key generation
 */
export function getPostTasksTaskIdCommentsMutationKey() {
  return `POST ${client.tasks[':taskId'].comments.$url().pathname}`
}

/**
 * GET /tasks/{taskId}/time-entries
 *
 * 時間記録一覧
 */
export function useGetTasksTaskIdTimeEntries(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTasksTaskIdTimeEntriesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.tasks[':taskId']['time-entries'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tasks/{taskId}/time-entries
 * Uses $url() for type-safe key generation
 */
export function getGetTasksTaskIdTimeEntriesKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
) {
  return client.tasks[':taskId']['time-entries'].$url(args).pathname
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export function usePostTasksTaskIdTimeEntries(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.tasks)[':taskId']['time-entries']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostTasksTaskIdTimeEntriesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']> },
      ) => parseResponse(client.tasks[':taskId']['time-entries'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /tasks/{taskId}/time-entries
 * Uses $url() for type-safe key generation
 */
export function getPostTasksTaskIdTimeEntriesMutationKey() {
  return `POST ${client.tasks[':taskId']['time-entries'].$url().pathname}`
}

/**
 * GET /projects/{projectId}/milestones
 *
 * マイルストーン一覧
 */
export function useGetProjectsProjectIdMilestones(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetProjectsProjectIdMilestonesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects[':projectId'].milestones.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /projects/{projectId}/milestones
 * Uses $url() for type-safe key generation
 */
export function getGetProjectsProjectIdMilestonesKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
) {
  return client.projects[':projectId'].milestones.$url(args).pathname
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export function usePostProjectsProjectIdMilestones(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.projects)[':projectId']['milestones']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostProjectsProjectIdMilestonesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']> },
      ) => parseResponse(client.projects[':projectId'].milestones.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /projects/{projectId}/milestones
 * Uses $url() for type-safe key generation
 */
export function getPostProjectsProjectIdMilestonesMutationKey() {
  return `POST ${client.projects[':projectId'].milestones.$url().pathname}`
}

/**
 * GET /teams
 *
 * チーム一覧取得
 */
export function useGetTeams(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTeamsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.teams.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /teams
 * Uses $url() for type-safe key generation
 */
export function getGetTeamsKey() {
  return client.teams.$url().pathname
}

/**
 * POST /teams
 *
 * チーム作成
 */
export function usePostTeams(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.teams.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.teams.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostTeamsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.teams.$post> }) =>
        parseResponse(client.teams.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /teams
 * Uses $url() for type-safe key generation
 */
export function getPostTeamsMutationKey() {
  return `POST ${client.teams.$url().pathname}`
}
