import type {
  CreateMutationOptions,
  CreateQueryOptions,
  QueryFunctionContext,
} from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/32-practical-project-api'

/**
 * Generates Svelte Query cache key for GET /projects
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProjectsQueryKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['projects', 'GET', '/projects', args] as const
}

/**
 * Returns Svelte Query query options for GET /projects
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsQueryOptions = (
  args: InferRequestType<typeof client.projects.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProjectsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.projects.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /projects
 *
 * プロジェクト一覧取得
 */
export function createGetProjects(
  args: InferRequestType<typeof client.projects.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.projects.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetProjectsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /projects
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProjectsMutationKey() {
  return ['projects', 'POST', '/projects'] as const
}

/**
 * Returns Svelte Query mutation options for POST /projects
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostProjectsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostProjectsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.projects.$post>) =>
    parseResponse(client.projects.$post(args, clientOptions)),
})

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export function createPostProjects(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.projects.$post>>>>>,
      Error,
      InferRequestType<typeof client.projects.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostProjectsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /projects/{projectId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProjectsProjectIdQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
) {
  return ['projects', 'GET', '/projects/:projectId', args] as const
}

/**
 * Returns Svelte Query query options for GET /projects/{projectId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsProjectIdQueryOptions = (
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProjectsProjectIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.projects[':projectId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /projects/{projectId}
 *
 * プロジェクト詳細取得
 */
export function createGetProjectsProjectId(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.projects)[':projectId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetProjectsProjectIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /projects/{projectId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutProjectsProjectIdMutationKey() {
  return ['projects', 'PUT', '/projects/:projectId'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /projects/{projectId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutProjectsProjectIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutProjectsProjectIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.projects)[':projectId']['$put']>) =>
    parseResponse(client.projects[':projectId'].$put(args, clientOptions)),
})

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export function createPutProjectsProjectId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.projects)[':projectId']['$put']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutProjectsProjectIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /projects/{projectId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteProjectsProjectIdMutationKey() {
  return ['projects', 'DELETE', '/projects/:projectId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /projects/{projectId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteProjectsProjectIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteProjectsProjectIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.projects)[':projectId']['$delete']>) =>
    parseResponse(client.projects[':projectId'].$delete(args, clientOptions)),
})

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export function createDeleteProjectsProjectId(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.projects)[':projectId']['$delete']>>
            >
          >
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteProjectsProjectIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /projects/{projectId}/members
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProjectsProjectIdMembersQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
) {
  return ['projects', 'GET', '/projects/:projectId/members', args] as const
}

/**
 * Returns Svelte Query query options for GET /projects/{projectId}/members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsProjectIdMembersQueryOptions = (
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProjectsProjectIdMembersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.projects[':projectId'].members.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /projects/{projectId}/members
 *
 * プロジェクトメンバー一覧
 */
export function createGetProjectsProjectIdMembers(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.projects)[':projectId']['members']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetProjectsProjectIdMembersQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /projects/{projectId}/members
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProjectsProjectIdMembersMutationKey() {
  return ['projects', 'POST', '/projects/:projectId/members'] as const
}

/**
 * Returns Svelte Query mutation options for POST /projects/{projectId}/members
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostProjectsProjectIdMembersMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostProjectsProjectIdMembersMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
  ) => parseResponse(client.projects[':projectId'].members.$post(args, clientOptions)),
})

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export function createPostProjectsProjectIdMembers(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.projects)[':projectId']['members']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostProjectsProjectIdMembersMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /projects/{projectId}/tasks
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProjectsProjectIdTasksQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
) {
  return ['projects', 'GET', '/projects/:projectId/tasks', args] as const
}

/**
 * Returns Svelte Query query options for GET /projects/{projectId}/tasks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsProjectIdTasksQueryOptions = (
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProjectsProjectIdTasksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.projects[':projectId'].tasks.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /projects/{projectId}/tasks
 *
 * プロジェクトのタスク一覧
 */
export function createGetProjectsProjectIdTasks(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.projects)[':projectId']['tasks']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetProjectsProjectIdTasksQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /projects/{projectId}/tasks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProjectsProjectIdTasksMutationKey() {
  return ['projects', 'POST', '/projects/:projectId/tasks'] as const
}

/**
 * Returns Svelte Query mutation options for POST /projects/{projectId}/tasks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostProjectsProjectIdTasksMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostProjectsProjectIdTasksMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
  ) => parseResponse(client.projects[':projectId'].tasks.$post(args, clientOptions)),
})

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export function createPostProjectsProjectIdTasks(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.projects)[':projectId']['tasks']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostProjectsProjectIdTasksMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /tasks/{taskId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTasksTaskIdQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
) {
  return ['tasks', 'GET', '/tasks/:taskId', args] as const
}

/**
 * Returns Svelte Query query options for GET /tasks/{taskId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTasksTaskIdQueryOptions = (
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTasksTaskIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.tasks[':taskId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /tasks/{taskId}
 *
 * タスク詳細取得
 */
export function createGetTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTasksTaskIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /tasks/{taskId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutTasksTaskIdMutationKey() {
  return ['tasks', 'PUT', '/tasks/:taskId'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /tasks/{taskId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutTasksTaskIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutTasksTaskIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.tasks)[':taskId']['$put']>) =>
    parseResponse(client.tasks[':taskId'].$put(args, clientOptions)),
})

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export function createPutTasksTaskId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$put']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutTasksTaskIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /tasks/{taskId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteTasksTaskIdMutationKey() {
  return ['tasks', 'DELETE', '/tasks/:taskId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /tasks/{taskId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteTasksTaskIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteTasksTaskIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>) =>
    parseResponse(client.tasks[':taskId'].$delete(args, clientOptions)),
})

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export function createDeleteTasksTaskId(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$delete']>>>
          >
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteTasksTaskIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PATCH /tasks/{taskId}/status
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchTasksTaskIdStatusMutationKey() {
  return ['tasks', 'PATCH', '/tasks/:taskId/status'] as const
}

/**
 * Returns Svelte Query mutation options for PATCH /tasks/{taskId}/status
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchTasksTaskIdStatusMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchTasksTaskIdStatusMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
  ) => parseResponse(client.tasks[':taskId'].status.$patch(args, clientOptions)),
})

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export function createPatchTasksTaskIdStatus(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.tasks)[':taskId']['status']['$patch']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPatchTasksTaskIdStatusMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /tasks/{taskId}/comments
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTasksTaskIdCommentsQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
) {
  return ['tasks', 'GET', '/tasks/:taskId/comments', args] as const
}

/**
 * Returns Svelte Query query options for GET /tasks/{taskId}/comments
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTasksTaskIdCommentsQueryOptions = (
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTasksTaskIdCommentsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.tasks[':taskId'].comments.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /tasks/{taskId}/comments
 *
 * タスクコメント一覧
 */
export function createGetTasksTaskIdComments(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.tasks)[':taskId']['comments']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTasksTaskIdCommentsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /tasks/{taskId}/comments
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTasksTaskIdCommentsMutationKey() {
  return ['tasks', 'POST', '/tasks/:taskId/comments'] as const
}

/**
 * Returns Svelte Query mutation options for POST /tasks/{taskId}/comments
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTasksTaskIdCommentsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostTasksTaskIdCommentsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
  ) => parseResponse(client.tasks[':taskId'].comments.$post(args, clientOptions)),
})

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export function createPostTasksTaskIdComments(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.tasks)[':taskId']['comments']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostTasksTaskIdCommentsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /tasks/{taskId}/time-entries
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTasksTaskIdTimeEntriesQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
) {
  return ['tasks', 'GET', '/tasks/:taskId/time-entries', args] as const
}

/**
 * Returns Svelte Query query options for GET /tasks/{taskId}/time-entries
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTasksTaskIdTimeEntriesQueryOptions = (
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTasksTaskIdTimeEntriesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.tasks[':taskId']['time-entries'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /tasks/{taskId}/time-entries
 *
 * 時間記録一覧
 */
export function createGetTasksTaskIdTimeEntries(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.tasks)[':taskId']['time-entries']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTasksTaskIdTimeEntriesQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /tasks/{taskId}/time-entries
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTasksTaskIdTimeEntriesMutationKey() {
  return ['tasks', 'POST', '/tasks/:taskId/time-entries'] as const
}

/**
 * Returns Svelte Query mutation options for POST /tasks/{taskId}/time-entries
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTasksTaskIdTimeEntriesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostTasksTaskIdTimeEntriesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
  ) => parseResponse(client.tasks[':taskId']['time-entries'].$post(args, clientOptions)),
})

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export function createPostTasksTaskIdTimeEntries(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.tasks)[':taskId']['time-entries']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostTasksTaskIdTimeEntriesMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /projects/{projectId}/milestones
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProjectsProjectIdMilestonesQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
) {
  return ['projects', 'GET', '/projects/:projectId/milestones', args] as const
}

/**
 * Returns Svelte Query query options for GET /projects/{projectId}/milestones
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsProjectIdMilestonesQueryOptions = (
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProjectsProjectIdMilestonesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.projects[':projectId'].milestones.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /projects/{projectId}/milestones
 *
 * マイルストーン一覧
 */
export function createGetProjectsProjectIdMilestones(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.projects)[':projectId']['milestones']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetProjectsProjectIdMilestonesQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /projects/{projectId}/milestones
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProjectsProjectIdMilestonesMutationKey() {
  return ['projects', 'POST', '/projects/:projectId/milestones'] as const
}

/**
 * Returns Svelte Query mutation options for POST /projects/{projectId}/milestones
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostProjectsProjectIdMilestonesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostProjectsProjectIdMilestonesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
  ) => parseResponse(client.projects[':projectId'].milestones.$post(args, clientOptions)),
})

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export function createPostProjectsProjectIdMilestones(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.projects)[':projectId']['milestones']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostProjectsProjectIdMilestonesMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /teams
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTeamsQueryKey() {
  return ['teams', 'GET', '/teams'] as const
}

/**
 * Returns Svelte Query query options for GET /teams
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTeamsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTeamsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.teams.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /teams
 *
 * チーム一覧取得
 */
export function createGetTeams(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.teams.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTeamsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /teams
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTeamsMutationKey() {
  return ['teams', 'POST', '/teams'] as const
}

/**
 * Returns Svelte Query mutation options for POST /teams
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTeamsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostTeamsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.teams.$post>) =>
    parseResponse(client.teams.$post(args, clientOptions)),
})

/**
 * POST /teams
 *
 * チーム作成
 */
export function createPostTeams(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.teams.$post>>>>>,
      Error,
      InferRequestType<typeof client.teams.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostTeamsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
