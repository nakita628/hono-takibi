import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
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
    swr?: SWRConfiguration<InferResponseType<typeof client.projects.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/projects', args] as const) : null
  return useSWR<InferResponseType<typeof client.projects.$get>, Error>(
    key,
    async () => parseResponse(client.projects.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /projects
 */
export function getGetProjectsKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['GET', '/projects', args] as const
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export function usePostProjects(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.projects.$post>,
    Error,
    string,
    InferRequestType<typeof client.projects.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.projects.$post>,
    Error,
    string,
    InferRequestType<typeof client.projects.$post>
  >(
    'POST /projects',
    async (_, { arg }) => parseResponse(client.projects.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.projects)[':projectId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/projects/:projectId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.projects)[':projectId']['$get']>, Error>(
    key,
    async () => parseResponse(client.projects[':projectId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /projects/{projectId}
 */
export function getGetProjectsProjectIdKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
) {
  return ['GET', '/projects/:projectId', args] as const
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export function usePutProjectsProjectId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.projects)[':projectId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.projects)[':projectId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.projects)[':projectId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.projects)[':projectId']['$put']>
  >(
    'PUT /projects/:projectId',
    async (_, { arg }) => parseResponse(client.projects[':projectId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export function useDeleteProjectsProjectId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.projects)[':projectId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.projects)[':projectId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.projects)[':projectId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.projects)[':projectId']['$delete']>
  >(
    'DELETE /projects/:projectId',
    async (_, { arg }) =>
      parseResponse(client.projects[':projectId'].$delete(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.projects)[':projectId']['members']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/projects/:projectId/members', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.projects)[':projectId']['members']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.projects[':projectId'].members.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /projects/{projectId}/members
 */
export function getGetProjectsProjectIdMembersKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
) {
  return ['GET', '/projects/:projectId/members', args] as const
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export function usePostProjectsProjectIdMembers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.projects)[':projectId']['members']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.projects)[':projectId']['members']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>
  >(
    'POST /projects/:projectId/members',
    async (_, { arg }) =>
      parseResponse(client.projects[':projectId'].members.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.projects)[':projectId']['tasks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/projects/:projectId/tasks', args] as const) : null
  return useSWR<InferResponseType<(typeof client.projects)[':projectId']['tasks']['$get']>, Error>(
    key,
    async () => parseResponse(client.projects[':projectId'].tasks.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /projects/{projectId}/tasks
 */
export function getGetProjectsProjectIdTasksKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
) {
  return ['GET', '/projects/:projectId/tasks', args] as const
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export function usePostProjectsProjectIdTasks(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.projects)[':projectId']['tasks']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.projects)[':projectId']['tasks']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>
  >(
    'POST /projects/:projectId/tasks',
    async (_, { arg }) =>
      parseResponse(client.projects[':projectId'].tasks.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.tasks)[':taskId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/tasks/:taskId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.tasks)[':taskId']['$get']>, Error>(
    key,
    async () => parseResponse(client.tasks[':taskId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /tasks/{taskId}
 */
export function getGetTasksTaskIdKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
) {
  return ['GET', '/tasks/:taskId', args] as const
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export function usePutTasksTaskId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.tasks)[':taskId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['$put']>
  >(
    'PUT /tasks/:taskId',
    async (_, { arg }) => parseResponse(client.tasks[':taskId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export function useDeleteTasksTaskId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.tasks)[':taskId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['$delete']>
  >(
    'DELETE /tasks/:taskId',
    async (_, { arg }) => parseResponse(client.tasks[':taskId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export function usePatchTasksTaskIdStatus(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.tasks)[':taskId']['status']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['status']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>
  >(
    'PATCH /tasks/:taskId/status',
    async (_, { arg }) =>
      parseResponse(client.tasks[':taskId'].status.$patch(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.tasks)[':taskId']['comments']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/tasks/:taskId/comments', args] as const) : null
  return useSWR<InferResponseType<(typeof client.tasks)[':taskId']['comments']['$get']>, Error>(
    key,
    async () => parseResponse(client.tasks[':taskId'].comments.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /tasks/{taskId}/comments
 */
export function getGetTasksTaskIdCommentsKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
) {
  return ['GET', '/tasks/:taskId/comments', args] as const
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export function usePostTasksTaskIdComments(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.tasks)[':taskId']['comments']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['comments']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>
  >(
    'POST /tasks/:taskId/comments',
    async (_, { arg }) =>
      parseResponse(client.tasks[':taskId'].comments.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/tasks/:taskId/time-entries', args] as const) : null
  return useSWR<InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$get']>, Error>(
    key,
    async () => parseResponse(client.tasks[':taskId']['time-entries'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /tasks/{taskId}/time-entries
 */
export function getGetTasksTaskIdTimeEntriesKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
) {
  return ['GET', '/tasks/:taskId/time-entries', args] as const
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export function usePostTasksTaskIdTimeEntries(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>
  >(
    'POST /tasks/:taskId/time-entries',
    async (_, { arg }) =>
      parseResponse(client.tasks[':taskId']['time-entries'].$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.projects)[':projectId']['milestones']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/projects/:projectId/milestones', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.projects)[':projectId']['milestones']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.projects[':projectId'].milestones.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /projects/{projectId}/milestones
 */
export function getGetProjectsProjectIdMilestonesKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
) {
  return ['GET', '/projects/:projectId/milestones', args] as const
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export function usePostProjectsProjectIdMilestones(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.projects)[':projectId']['milestones']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.projects)[':projectId']['milestones']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>
  >(
    'POST /projects/:projectId/milestones',
    async (_, { arg }) =>
      parseResponse(client.projects[':projectId'].milestones.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /teams
 *
 * チーム一覧取得
 */
export function useGetTeams(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.teams.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/teams'] as const) : null
  return useSWR<InferResponseType<typeof client.teams.$get>, Error>(
    key,
    async () => parseResponse(client.teams.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /teams
 */
export function getGetTeamsKey() {
  return ['GET', '/teams'] as const
}

/**
 * POST /teams
 *
 * チーム作成
 */
export function usePostTeams(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.teams.$post>,
    Error,
    string,
    InferRequestType<typeof client.teams.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.teams.$post>,
    Error,
    string,
    InferRequestType<typeof client.teams.$post>
  >(
    'POST /teams',
    async (_, { arg }) => parseResponse(client.teams.$post(arg, options?.client)),
    options?.swr,
  )
}
