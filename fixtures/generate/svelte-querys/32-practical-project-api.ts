import { createMutation, createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/32-practical-project-api'

/**
 * GET /projects
 *
 * プロジェクト一覧取得
 */
export function createGetProjects(
  args: InferRequestType<typeof client.projects.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetProjectsQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /projects
 */
export function getGetProjectsQueryKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', args] as const
}

/**
 * Returns Svelte Query query options for GET /projects
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsQueryOptions = (
  args: InferRequestType<typeof client.projects.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetProjectsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.projects.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export function createPostProjects(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.projects.$post>>>>
      >,
      variables: InferRequestType<typeof client.projects.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.projects.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.projects.$post>>>>
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.projects.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.projects.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.projects.$post>) =>
      parseResponse(client.projects.$post(args, clientOptions)),
  }))
}

/**
 * GET /projects/{projectId}
 *
 * プロジェクト詳細取得
 */
export function createGetProjectsProjectId(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetProjectsProjectIdQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /projects/{projectId}
 */
export function getGetProjectsProjectIdQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
) {
  return ['/projects/:projectId', args] as const
}

/**
 * Returns Svelte Query query options for GET /projects/{projectId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsProjectIdQueryOptions = (
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetProjectsProjectIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.projects[':projectId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export function createPutProjectsProjectId(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.projects)[':projectId']['$put']>>>
        >
      >,
      variables: InferRequestType<(typeof client.projects)[':projectId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.projects)[':projectId']['$put']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.projects)[':projectId']['$put']>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.projects)[':projectId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.projects)[':projectId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.projects)[':projectId']['$put']>) =>
      parseResponse(client.projects[':projectId'].$put(args, clientOptions)),
  }))
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export function createDeleteProjectsProjectId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.projects)[':projectId']['$delete']>>
              >
            >
          >
        | undefined,
      variables: InferRequestType<(typeof client.projects)[':projectId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.projects)[':projectId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.projects)[':projectId']['$delete']>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.projects)[':projectId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.projects)[':projectId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.projects)[':projectId']['$delete']>) =>
      parseResponse(client.projects[':projectId'].$delete(args, clientOptions)),
  }))
}

/**
 * GET /projects/{projectId}/members
 *
 * プロジェクトメンバー一覧
 */
export function createGetProjectsProjectIdMembers(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetProjectsProjectIdMembersQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /projects/{projectId}/members
 */
export function getGetProjectsProjectIdMembersQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
) {
  return ['/projects/:projectId/members', args] as const
}

/**
 * Returns Svelte Query query options for GET /projects/{projectId}/members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsProjectIdMembersQueryOptions = (
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetProjectsProjectIdMembersQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.projects[':projectId'].members.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export function createPostProjectsProjectIdMembers(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.projects)[':projectId']['members']['$post']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.projects)[':projectId']['members']['$post']>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
    ) => parseResponse(client.projects[':projectId'].members.$post(args, clientOptions)),
  }))
}

/**
 * GET /projects/{projectId}/tasks
 *
 * プロジェクトのタスク一覧
 */
export function createGetProjectsProjectIdTasks(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetProjectsProjectIdTasksQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /projects/{projectId}/tasks
 */
export function getGetProjectsProjectIdTasksQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
) {
  return ['/projects/:projectId/tasks', args] as const
}

/**
 * Returns Svelte Query query options for GET /projects/{projectId}/tasks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsProjectIdTasksQueryOptions = (
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetProjectsProjectIdTasksQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.projects[':projectId'].tasks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export function createPostProjectsProjectIdTasks(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.projects)[':projectId']['tasks']['$post']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.projects)[':projectId']['tasks']['$post']>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
    ) => parseResponse(client.projects[':projectId'].tasks.$post(args, clientOptions)),
  }))
}

/**
 * GET /tasks/{taskId}
 *
 * タスク詳細取得
 */
export function createGetTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetTasksTaskIdQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /tasks/{taskId}
 */
export function getGetTasksTaskIdQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
) {
  return ['/tasks/:taskId', args] as const
}

/**
 * Returns Svelte Query query options for GET /tasks/{taskId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTasksTaskIdQueryOptions = (
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTasksTaskIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.tasks[':taskId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export function createPutTasksTaskId(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$put']>>>
        >
      >,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['$put']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$put']>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.tasks)[':taskId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.tasks)[':taskId']['$put']>) =>
      parseResponse(client.tasks[':taskId'].$put(args, clientOptions)),
  }))
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export function createDeleteTasksTaskId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$delete']>>>
            >
          >
        | undefined,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.tasks)[':taskId']['$delete']>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>) =>
      parseResponse(client.tasks[':taskId'].$delete(args, clientOptions)),
  }))
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export function createPatchTasksTaskIdStatus(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.tasks)[':taskId']['status']['$patch']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.tasks)[':taskId']['status']['$patch']>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
    ) => parseResponse(client.tasks[':taskId'].status.$patch(args, clientOptions)),
  }))
}

/**
 * GET /tasks/{taskId}/comments
 *
 * タスクコメント一覧
 */
export function createGetTasksTaskIdComments(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetTasksTaskIdCommentsQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /tasks/{taskId}/comments
 */
export function getGetTasksTaskIdCommentsQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
) {
  return ['/tasks/:taskId/comments', args] as const
}

/**
 * Returns Svelte Query query options for GET /tasks/{taskId}/comments
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTasksTaskIdCommentsQueryOptions = (
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTasksTaskIdCommentsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.tasks[':taskId'].comments.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export function createPostTasksTaskIdComments(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.tasks)[':taskId']['comments']['$post']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.tasks)[':taskId']['comments']['$post']>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
    ) => parseResponse(client.tasks[':taskId'].comments.$post(args, clientOptions)),
  }))
}

/**
 * GET /tasks/{taskId}/time-entries
 *
 * 時間記録一覧
 */
export function createGetTasksTaskIdTimeEntries(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetTasksTaskIdTimeEntriesQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /tasks/{taskId}/time-entries
 */
export function getGetTasksTaskIdTimeEntriesQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
) {
  return ['/tasks/:taskId/time-entries', args] as const
}

/**
 * Returns Svelte Query query options for GET /tasks/{taskId}/time-entries
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTasksTaskIdTimeEntriesQueryOptions = (
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTasksTaskIdTimeEntriesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.tasks[':taskId']['time-entries'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export function createPostTasksTaskIdTimeEntries(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.tasks)[':taskId']['time-entries']['$post']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.tasks)[':taskId']['time-entries']['$post']>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
    ) => parseResponse(client.tasks[':taskId']['time-entries'].$post(args, clientOptions)),
  }))
}

/**
 * GET /projects/{projectId}/milestones
 *
 * マイルストーン一覧
 */
export function createGetProjectsProjectIdMilestones(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetProjectsProjectIdMilestonesQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /projects/{projectId}/milestones
 */
export function getGetProjectsProjectIdMilestonesQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
) {
  return ['/projects/:projectId/milestones', args] as const
}

/**
 * Returns Svelte Query query options for GET /projects/{projectId}/milestones
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsProjectIdMilestonesQueryOptions = (
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetProjectsProjectIdMilestonesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.projects[':projectId'].milestones.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export function createPostProjectsProjectIdMilestones(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.projects)[':projectId']['milestones']['$post']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.projects)[':projectId']['milestones']['$post']>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
    ) => parseResponse(client.projects[':projectId'].milestones.$post(args, clientOptions)),
  }))
}

/**
 * GET /teams
 *
 * チーム一覧取得
 */
export function createGetTeams(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({ ...getGetTeamsQueryOptions(clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /teams
 */
export function getGetTeamsQueryKey() {
  return ['/teams'] as const
}

/**
 * Returns Svelte Query query options for GET /teams
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTeamsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetTeamsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.teams.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /teams
 *
 * チーム作成
 */
export function createPostTeams(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.teams.$post>>>>
      >,
      variables: InferRequestType<typeof client.teams.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.teams.$post>) => void
    onSettled?: (
      data:
        | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.teams.$post>>>>>
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.teams.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.teams.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.teams.$post>) =>
      parseResponse(client.teams.$post(args, clientOptions)),
  }))
}
