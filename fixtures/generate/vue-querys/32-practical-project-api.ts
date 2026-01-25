import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
  return useQuery({
    queryKey: getGetProjectsQueryKey(args),
    queryFn: async () => parseResponse(client.projects.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /projects
 */
export function getGetProjectsQueryKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', args] as const
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export function usePostProjects(options?: {
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
  return useMutation({
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
export function useGetProjectsProjectId(
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
  return useQuery({
    queryKey: getGetProjectsProjectIdQueryKey(args),
    queryFn: async () => parseResponse(client.projects[':projectId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}
 */
export function getGetProjectsProjectIdQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
) {
  return ['/projects/:projectId', args] as const
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export function usePutProjectsProjectId(options?: {
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
  return useMutation({
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
export function useDeleteProjectsProjectId(options?: {
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
  return useMutation({
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
export function useGetProjectsProjectIdMembers(
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
  return useQuery({
    queryKey: getGetProjectsProjectIdMembersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.projects[':projectId'].members.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}/members
 */
export function getGetProjectsProjectIdMembersQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
) {
  return ['/projects/:projectId/members', args] as const
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export function usePostProjectsProjectIdMembers(options?: {
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
  return useMutation({
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
export function useGetProjectsProjectIdTasks(
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
  return useQuery({
    queryKey: getGetProjectsProjectIdTasksQueryKey(args),
    queryFn: async () =>
      parseResponse(client.projects[':projectId'].tasks.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}/tasks
 */
export function getGetProjectsProjectIdTasksQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
) {
  return ['/projects/:projectId/tasks', args] as const
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export function usePostProjectsProjectIdTasks(options?: {
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
  return useMutation({
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
export function useGetTasksTaskId(
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
  return useQuery({
    queryKey: getGetTasksTaskIdQueryKey(args),
    queryFn: async () => parseResponse(client.tasks[':taskId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /tasks/{taskId}
 */
export function getGetTasksTaskIdQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
) {
  return ['/tasks/:taskId', args] as const
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export function usePutTasksTaskId(options?: {
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
  return useMutation({
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
export function useDeleteTasksTaskId(options?: {
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
  return useMutation({
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
export function usePatchTasksTaskIdStatus(options?: {
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
  return useMutation({
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
export function useGetTasksTaskIdComments(
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
  return useQuery({
    queryKey: getGetTasksTaskIdCommentsQueryKey(args),
    queryFn: async () => parseResponse(client.tasks[':taskId'].comments.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /tasks/{taskId}/comments
 */
export function getGetTasksTaskIdCommentsQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
) {
  return ['/tasks/:taskId/comments', args] as const
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export function usePostTasksTaskIdComments(options?: {
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
  return useMutation({
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
export function useGetTasksTaskIdTimeEntries(
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
  return useQuery({
    queryKey: getGetTasksTaskIdTimeEntriesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.tasks[':taskId']['time-entries'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /tasks/{taskId}/time-entries
 */
export function getGetTasksTaskIdTimeEntriesQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
) {
  return ['/tasks/:taskId/time-entries', args] as const
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export function usePostTasksTaskIdTimeEntries(options?: {
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
  return useMutation({
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
export function useGetProjectsProjectIdMilestones(
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
  return useQuery({
    queryKey: getGetProjectsProjectIdMilestonesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.projects[':projectId'].milestones.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}/milestones
 */
export function getGetProjectsProjectIdMilestonesQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
) {
  return ['/projects/:projectId/milestones', args] as const
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export function usePostProjectsProjectIdMilestones(options?: {
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
  return useMutation({
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
export function useGetTeams(options?: {
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
  return useQuery({
    queryKey: getGetTeamsQueryKey(),
    queryFn: async () => parseResponse(client.teams.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /teams
 */
export function getGetTeamsQueryKey() {
  return ['/teams'] as const
}

/**
 * POST /teams
 *
 * チーム作成
 */
export function usePostTeams(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.teams.$post>) =>
      parseResponse(client.teams.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
