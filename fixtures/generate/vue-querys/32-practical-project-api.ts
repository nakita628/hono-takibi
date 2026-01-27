import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/32-practical-project-api'

/**
 * Generates Vue Query cache key for GET /projects
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetProjectsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.projects.$get>>,
) {
  return ['projects', '/projects', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /projects
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
export function useGetProjects(
  args: InferRequestType<typeof client.projects.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.projects.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProjectsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /projects
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostProjectsMutationKey() {
  return ['POST', '/projects'] as const
}

/**
 * Returns Vue Query mutation options for POST /projects
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
export function usePostProjects(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.projects.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.projects.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.projects.$post>) =>
      parseResponse(client.projects.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetProjectsProjectIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.projects)[':projectId']['$get']>>,
) {
  return ['projects', '/projects/:projectId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /projects/{projectId}
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
export function useGetProjectsProjectId(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.projects)[':projectId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProjectsProjectIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /projects/{projectId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutProjectsProjectIdMutationKey() {
  return ['PUT', '/projects/:projectId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /projects/{projectId}
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
export function usePutProjectsProjectId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.projects)[':projectId']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.projects)[':projectId']['$put']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.projects)[':projectId']['$put']>) =>
      parseResponse(client.projects[':projectId'].$put(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /projects/{projectId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteProjectsProjectIdMutationKey() {
  return ['DELETE', '/projects/:projectId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /projects/{projectId}
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
export function useDeleteProjectsProjectId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.projects)[':projectId']['$delete']>) =>
      parseResponse(client.projects[':projectId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}/members
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetProjectsProjectIdMembersQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>>,
) {
  return ['projects', '/projects/:projectId/members', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /projects/{projectId}/members
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
export function useGetProjectsProjectIdMembers(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.projects)[':projectId']['members']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProjectsProjectIdMembersQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /projects/{projectId}/members
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostProjectsProjectIdMembersMutationKey() {
  return ['POST', '/projects/:projectId/members'] as const
}

/**
 * Returns Vue Query mutation options for POST /projects/{projectId}/members
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
export function usePostProjectsProjectIdMembers(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.projects)[':projectId']['members']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
    ) => parseResponse(client.projects[':projectId'].members.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}/tasks
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetProjectsProjectIdTasksQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>>,
) {
  return ['projects', '/projects/:projectId/tasks', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /projects/{projectId}/tasks
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
export function useGetProjectsProjectIdTasks(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.projects)[':projectId']['tasks']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProjectsProjectIdTasksQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /projects/{projectId}/tasks
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostProjectsProjectIdTasksMutationKey() {
  return ['POST', '/projects/:projectId/tasks'] as const
}

/**
 * Returns Vue Query mutation options for POST /projects/{projectId}/tasks
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
export function usePostProjectsProjectIdTasks(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.projects)[':projectId']['tasks']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
    ) => parseResponse(client.projects[':projectId'].tasks.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /tasks/{taskId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTasksTaskIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.tasks)[':taskId']['$get']>>,
) {
  return ['tasks', '/tasks/:taskId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /tasks/{taskId}
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
export function useGetTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTasksTaskIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /tasks/{taskId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutTasksTaskIdMutationKey() {
  return ['PUT', '/tasks/:taskId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /tasks/{taskId}
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
export function usePutTasksTaskId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$put']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.tasks)[':taskId']['$put']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.tasks)[':taskId']['$put']>) =>
      parseResponse(client.tasks[':taskId'].$put(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /tasks/{taskId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteTasksTaskIdMutationKey() {
  return ['DELETE', '/tasks/:taskId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /tasks/{taskId}
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
export function useDeleteTasksTaskId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$delete']>>>
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.tasks)[':taskId']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>) =>
      parseResponse(client.tasks[':taskId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for PATCH /tasks/{taskId}/status
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPatchTasksTaskIdStatusMutationKey() {
  return ['PATCH', '/tasks/:taskId/status'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /tasks/{taskId}/status
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
export function usePatchTasksTaskIdStatus(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.tasks)[':taskId']['status']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
    ) => parseResponse(client.tasks[':taskId'].status.$patch(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /tasks/{taskId}/comments
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTasksTaskIdCommentsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>>,
) {
  return ['tasks', '/tasks/:taskId/comments', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /tasks/{taskId}/comments
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
export function useGetTasksTaskIdComments(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.tasks)[':taskId']['comments']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTasksTaskIdCommentsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /tasks/{taskId}/comments
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostTasksTaskIdCommentsMutationKey() {
  return ['POST', '/tasks/:taskId/comments'] as const
}

/**
 * Returns Vue Query mutation options for POST /tasks/{taskId}/comments
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
export function usePostTasksTaskIdComments(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.tasks)[':taskId']['comments']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
    ) => parseResponse(client.tasks[':taskId'].comments.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /tasks/{taskId}/time-entries
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTasksTaskIdTimeEntriesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>>,
) {
  return ['tasks', '/tasks/:taskId/time-entries', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /tasks/{taskId}/time-entries
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
export function useGetTasksTaskIdTimeEntries(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.tasks)[':taskId']['time-entries']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTasksTaskIdTimeEntriesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /tasks/{taskId}/time-entries
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostTasksTaskIdTimeEntriesMutationKey() {
  return ['POST', '/tasks/:taskId/time-entries'] as const
}

/**
 * Returns Vue Query mutation options for POST /tasks/{taskId}/time-entries
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
export function usePostTasksTaskIdTimeEntries(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.tasks)[':taskId']['time-entries']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
    ) => parseResponse(client.tasks[':taskId']['time-entries'].$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}/milestones
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetProjectsProjectIdMilestonesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>>,
) {
  return ['projects', '/projects/:projectId/milestones', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /projects/{projectId}/milestones
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
export function useGetProjectsProjectIdMilestones(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.projects)[':projectId']['milestones']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProjectsProjectIdMilestonesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /projects/{projectId}/milestones
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostProjectsProjectIdMilestonesMutationKey() {
  return ['POST', '/projects/:projectId/milestones'] as const
}

/**
 * Returns Vue Query mutation options for POST /projects/{projectId}/milestones
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
export function usePostProjectsProjectIdMilestones(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.projects)[':projectId']['milestones']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
    ) => parseResponse(client.projects[':projectId'].milestones.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /teams
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetTeamsQueryKey() {
  return ['teams', '/teams'] as const
}

/**
 * Returns Vue Query query options for GET /teams
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
export function useGetTeams(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.teams.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTeamsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /teams
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostTeamsMutationKey() {
  return ['POST', '/teams'] as const
}

/**
 * Returns Vue Query mutation options for POST /teams
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
export function usePostTeams(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.teams.$post>>>>>,
        Error,
        InferRequestType<typeof client.teams.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.teams.$post>) =>
      parseResponse(client.teams.$post(args, clientOptions)),
  })
}
