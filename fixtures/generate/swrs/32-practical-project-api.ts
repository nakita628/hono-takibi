import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
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
 */
export function getGetProjectsKey(args?: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', ...(args ? [args] : [])] as const
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
    string,
    InferRequestType<typeof client.projects.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /projects',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.projects.$post> }) =>
      parseResponse(client.projects.$post(arg, clientOptions)),
    mutationOptions,
  )
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
 */
export function getGetProjectsProjectIdKey(
  args?: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
) {
  return ['/projects/:projectId', ...(args ? [args] : [])] as const
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
    string,
    InferRequestType<(typeof client.projects)[':projectId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /projects/:projectId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.projects)[':projectId']['$put']> },
    ) => parseResponse(client.projects[':projectId'].$put(arg, clientOptions)),
    mutationOptions,
  )
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
    string,
    InferRequestType<(typeof client.projects)[':projectId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /projects/:projectId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.projects)[':projectId']['$delete']> },
    ) => parseResponse(client.projects[':projectId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
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
 */
export function getGetProjectsProjectIdMembersKey(
  args?: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
) {
  return ['/projects/:projectId/members', ...(args ? [args] : [])] as const
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
    string,
    InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /projects/:projectId/members',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']> },
    ) => parseResponse(client.projects[':projectId'].members.$post(arg, clientOptions)),
    mutationOptions,
  )
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
 */
export function getGetProjectsProjectIdTasksKey(
  args?: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
) {
  return ['/projects/:projectId/tasks', ...(args ? [args] : [])] as const
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
    string,
    InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /projects/:projectId/tasks',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']> },
    ) => parseResponse(client.projects[':projectId'].tasks.$post(arg, clientOptions)),
    mutationOptions,
  )
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
 */
export function getGetTasksTaskIdKey(
  args?: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
) {
  return ['/tasks/:taskId', ...(args ? [args] : [])] as const
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
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /tasks/:taskId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['$put']> },
    ) => parseResponse(client.tasks[':taskId'].$put(arg, clientOptions)),
    mutationOptions,
  )
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
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /tasks/:taskId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['$delete']> },
    ) => parseResponse(client.tasks[':taskId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
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
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /tasks/:taskId/status',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']> },
    ) => parseResponse(client.tasks[':taskId'].status.$patch(arg, clientOptions)),
    mutationOptions,
  )
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
 */
export function getGetTasksTaskIdCommentsKey(
  args?: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
) {
  return ['/tasks/:taskId/comments', ...(args ? [args] : [])] as const
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
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /tasks/:taskId/comments',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']> },
    ) => parseResponse(client.tasks[':taskId'].comments.$post(arg, clientOptions)),
    mutationOptions,
  )
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
 */
export function getGetTasksTaskIdTimeEntriesKey(
  args?: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
) {
  return ['/tasks/:taskId/time-entries', ...(args ? [args] : [])] as const
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
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /tasks/:taskId/time-entries',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']> },
    ) => parseResponse(client.tasks[':taskId']['time-entries'].$post(arg, clientOptions)),
    mutationOptions,
  )
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
 */
export function getGetProjectsProjectIdMilestonesKey(
  args?: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
) {
  return ['/projects/:projectId/milestones', ...(args ? [args] : [])] as const
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
    string,
    InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /projects/:projectId/milestones',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']> },
    ) => parseResponse(client.projects[':projectId'].milestones.$post(arg, clientOptions)),
    mutationOptions,
  )
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
 */
export function getGetTeamsKey() {
  return ['/teams'] as const
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
    string,
    InferRequestType<typeof client.teams.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /teams',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.teams.$post> }) =>
      parseResponse(client.teams.$post(arg, clientOptions)),
    mutationOptions,
  )
}
