import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/32-practical-project-api'

/**
 * Generates SWR cache key for GET /projects
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetProjectsKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', args] as const
}

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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetProjectsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /projects
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostProjectsMutationKey() {
  return ['/projects'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostProjectsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.projects.$post> }) =>
        parseResponse(client.projects.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /projects/{projectId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetProjectsProjectIdKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
) {
  return [`/projects/${args.param.projectId}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetProjectsProjectIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects[':projectId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /projects/{projectId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutProjectsProjectIdMutationKey() {
  return ['/projects/:projectId'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutProjectsProjectIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.projects)[':projectId']['$put']> },
      ) => parseResponse(client.projects[':projectId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /projects/{projectId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteProjectsProjectIdMutationKey() {
  return ['/projects/:projectId'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteProjectsProjectIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.projects)[':projectId']['$delete']> },
      ) => parseResponse(client.projects[':projectId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /projects/{projectId}/members
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetProjectsProjectIdMembersKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
) {
  return [`/projects/${args.param.projectId}/members`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetProjectsProjectIdMembersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects[':projectId'].members.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /projects/{projectId}/members
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostProjectsProjectIdMembersMutationKey() {
  return ['/projects/:projectId/members'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostProjectsProjectIdMembersMutationKey()
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
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /projects/{projectId}/tasks
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetProjectsProjectIdTasksKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
) {
  return [`/projects/${args.param.projectId}/tasks`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetProjectsProjectIdTasksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects[':projectId'].tasks.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /projects/{projectId}/tasks
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostProjectsProjectIdTasksMutationKey() {
  return ['/projects/:projectId/tasks'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostProjectsProjectIdTasksMutationKey()
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
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tasks/{taskId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetTasksTaskIdKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
) {
  return [`/tasks/${args.param.taskId}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTasksTaskIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.tasks[':taskId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /tasks/{taskId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutTasksTaskIdMutationKey() {
  return ['/tasks/:taskId'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutTasksTaskIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['$put']> },
      ) => parseResponse(client.tasks[':taskId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /tasks/{taskId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteTasksTaskIdMutationKey() {
  return ['/tasks/:taskId'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteTasksTaskIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['$delete']> },
      ) => parseResponse(client.tasks[':taskId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /tasks/{taskId}/status
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchTasksTaskIdStatusMutationKey() {
  return ['/tasks/:taskId/status'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchTasksTaskIdStatusMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']> },
      ) => parseResponse(client.tasks[':taskId'].status.$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tasks/{taskId}/comments
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetTasksTaskIdCommentsKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
) {
  return [`/tasks/${args.param.taskId}/comments`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTasksTaskIdCommentsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.tasks[':taskId'].comments.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /tasks/{taskId}/comments
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostTasksTaskIdCommentsMutationKey() {
  return ['/tasks/:taskId/comments'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostTasksTaskIdCommentsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']> },
      ) => parseResponse(client.tasks[':taskId'].comments.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tasks/{taskId}/time-entries
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetTasksTaskIdTimeEntriesKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
) {
  return [`/tasks/${args.param.taskId}/time-entries`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTasksTaskIdTimeEntriesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.tasks[':taskId']['time-entries'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /tasks/{taskId}/time-entries
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostTasksTaskIdTimeEntriesMutationKey() {
  return ['/tasks/:taskId/time-entries'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostTasksTaskIdTimeEntriesMutationKey()
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
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /projects/{projectId}/milestones
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetProjectsProjectIdMilestonesKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
) {
  return [`/projects/${args.param.projectId}/milestones`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetProjectsProjectIdMilestonesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects[':projectId'].milestones.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /projects/{projectId}/milestones
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostProjectsProjectIdMilestonesMutationKey() {
  return ['/projects/:projectId/milestones'] as const
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostProjectsProjectIdMilestonesMutationKey()
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
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /teams
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetTeamsKey() {
  return ['/teams'] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTeamsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.teams.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /teams
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostTeamsMutationKey() {
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
    Key,
    InferRequestType<typeof client.teams.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostTeamsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.teams.$post> }) =>
        parseResponse(client.teams.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
