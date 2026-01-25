import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
      placeholderData?:
        | InferResponseType<typeof client.projects.$get>
        | (() => InferResponseType<typeof client.projects.$get>)
      initialData?:
        | InferResponseType<typeof client.projects.$get>
        | (() => InferResponseType<typeof client.projects.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProjectsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.projects.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
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
export function getGetProjectsQueryOptions(
  args: InferRequestType<typeof client.projects.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetProjectsQueryKey(args),
    queryFn: async () => parseResponse(client.projects.$get(args, clientOptions)),
  }
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export function createPostProjects(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.projects.$post>,
      variables: InferRequestType<typeof client.projects.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.projects.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.projects.$post> | undefined,
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
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.projects.$post>) =>
      parseResponse(client.projects.$post(args, clientOptions)),
    ...mutationOptions,
  })
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
      placeholderData?:
        | InferResponseType<(typeof client.projects)[':projectId']['$get']>
        | (() => InferResponseType<(typeof client.projects)[':projectId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.projects)[':projectId']['$get']>
        | (() => InferResponseType<(typeof client.projects)[':projectId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProjectsProjectIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.projects[':projectId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
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
export function getGetProjectsProjectIdQueryOptions(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetProjectsProjectIdQueryKey(args),
    queryFn: async () => parseResponse(client.projects[':projectId'].$get(args, clientOptions)),
  }
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export function createPutProjectsProjectId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.projects)[':projectId']['$put']>,
      variables: InferRequestType<(typeof client.projects)[':projectId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.projects)[':projectId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.projects)[':projectId']['$put']> | undefined,
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
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.projects)[':projectId']['$put']>) =>
      parseResponse(client.projects[':projectId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export function createDeleteProjectsProjectId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.projects)[':projectId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.projects)[':projectId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.projects)[':projectId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.projects)[':projectId']['$delete']> | undefined,
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
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.projects)[':projectId']['$delete']>) =>
      parseResponse(client.projects[':projectId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
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
      placeholderData?:
        | InferResponseType<(typeof client.projects)[':projectId']['members']['$get']>
        | (() => InferResponseType<(typeof client.projects)[':projectId']['members']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.projects)[':projectId']['members']['$get']>
        | (() => InferResponseType<(typeof client.projects)[':projectId']['members']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProjectsProjectIdMembersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.projects[':projectId'].members.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
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
export function getGetProjectsProjectIdMembersQueryOptions(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetProjectsProjectIdMembersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.projects[':projectId'].members.$get(args, clientOptions)),
  }
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export function createPostProjectsProjectIdMembers(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.projects)[':projectId']['members']['$post']>,
      variables: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.projects)[':projectId']['members']['$post']>
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
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
    ) => parseResponse(client.projects[':projectId'].members.$post(args, clientOptions)),
    ...mutationOptions,
  })
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
      placeholderData?:
        | InferResponseType<(typeof client.projects)[':projectId']['tasks']['$get']>
        | (() => InferResponseType<(typeof client.projects)[':projectId']['tasks']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.projects)[':projectId']['tasks']['$get']>
        | (() => InferResponseType<(typeof client.projects)[':projectId']['tasks']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProjectsProjectIdTasksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.projects[':projectId'].tasks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
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
export function getGetProjectsProjectIdTasksQueryOptions(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetProjectsProjectIdTasksQueryKey(args),
    queryFn: async () =>
      parseResponse(client.projects[':projectId'].tasks.$get(args, clientOptions)),
  }
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export function createPostProjectsProjectIdTasks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.projects)[':projectId']['tasks']['$post']>,
      variables: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.projects)[':projectId']['tasks']['$post']> | undefined,
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
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
    ) => parseResponse(client.projects[':projectId'].tasks.$post(args, clientOptions)),
    ...mutationOptions,
  })
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
      placeholderData?:
        | InferResponseType<(typeof client.tasks)[':taskId']['$get']>
        | (() => InferResponseType<(typeof client.tasks)[':taskId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.tasks)[':taskId']['$get']>
        | (() => InferResponseType<(typeof client.tasks)[':taskId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTasksTaskIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.tasks[':taskId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
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
export function getGetTasksTaskIdQueryOptions(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetTasksTaskIdQueryKey(args),
    queryFn: async () => parseResponse(client.tasks[':taskId'].$get(args, clientOptions)),
  }
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export function createPutTasksTaskId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.tasks)[':taskId']['$put']>,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.tasks)[':taskId']['$put']> | undefined,
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
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.tasks)[':taskId']['$put']>) =>
      parseResponse(client.tasks[':taskId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export function createDeleteTasksTaskId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.tasks)[':taskId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.tasks)[':taskId']['$delete']> | undefined,
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
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>) =>
      parseResponse(client.tasks[':taskId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export function createPatchTasksTaskIdStatus(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.tasks)[':taskId']['status']['$patch']>,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.tasks)[':taskId']['status']['$patch']> | undefined,
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
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
    ) => parseResponse(client.tasks[':taskId'].status.$patch(args, clientOptions)),
    ...mutationOptions,
  })
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
      placeholderData?:
        | InferResponseType<(typeof client.tasks)[':taskId']['comments']['$get']>
        | (() => InferResponseType<(typeof client.tasks)[':taskId']['comments']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.tasks)[':taskId']['comments']['$get']>
        | (() => InferResponseType<(typeof client.tasks)[':taskId']['comments']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTasksTaskIdCommentsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.tasks[':taskId'].comments.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
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
export function getGetTasksTaskIdCommentsQueryOptions(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetTasksTaskIdCommentsQueryKey(args),
    queryFn: async () => parseResponse(client.tasks[':taskId'].comments.$get(args, clientOptions)),
  }
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export function createPostTasksTaskIdComments(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.tasks)[':taskId']['comments']['$post']>,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.tasks)[':taskId']['comments']['$post']> | undefined,
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
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
    ) => parseResponse(client.tasks[':taskId'].comments.$post(args, clientOptions)),
    ...mutationOptions,
  })
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
      placeholderData?:
        | InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$get']>
        | (() => InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$get']>
        | (() => InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTasksTaskIdTimeEntriesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.tasks[':taskId']['time-entries'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
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
export function getGetTasksTaskIdTimeEntriesQueryOptions(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetTasksTaskIdTimeEntriesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.tasks[':taskId']['time-entries'].$get(args, clientOptions)),
  }
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export function createPostTasksTaskIdTimeEntries(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$post']>
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
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
    ) => parseResponse(client.tasks[':taskId']['time-entries'].$post(args, clientOptions)),
    ...mutationOptions,
  })
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
      placeholderData?:
        | InferResponseType<(typeof client.projects)[':projectId']['milestones']['$get']>
        | (() => InferResponseType<(typeof client.projects)[':projectId']['milestones']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.projects)[':projectId']['milestones']['$get']>
        | (() => InferResponseType<(typeof client.projects)[':projectId']['milestones']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProjectsProjectIdMilestonesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.projects[':projectId'].milestones.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
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
export function getGetProjectsProjectIdMilestonesQueryOptions(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetProjectsProjectIdMilestonesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.projects[':projectId'].milestones.$get(args, clientOptions)),
  }
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export function createPostProjectsProjectIdMilestones(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.projects)[':projectId']['milestones']['$post']>,
      variables: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.projects)[':projectId']['milestones']['$post']>
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
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
    ) => parseResponse(client.projects[':projectId'].milestones.$post(args, clientOptions)),
    ...mutationOptions,
  })
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
    placeholderData?:
      | InferResponseType<typeof client.teams.$get>
      | (() => InferResponseType<typeof client.teams.$get>)
    initialData?:
      | InferResponseType<typeof client.teams.$get>
      | (() => InferResponseType<typeof client.teams.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTeamsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.teams.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
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
export function getGetTeamsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetTeamsQueryKey(),
    queryFn: async () => parseResponse(client.teams.$get(undefined, clientOptions)),
  }
}

/**
 * POST /teams
 *
 * チーム作成
 */
export function createPostTeams(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.teams.$post>,
      variables: InferRequestType<typeof client.teams.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.teams.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.teams.$post> | undefined,
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
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.teams.$post>) =>
      parseResponse(client.teams.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
