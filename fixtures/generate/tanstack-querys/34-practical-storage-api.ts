import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * Generates TanStack Query cache key for GET /files
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesQueryKey(args: InferRequestType<typeof client.files.$get>) {
  return ['files', '/files', args] as const
}

/**
 * Returns TanStack Query query options for GET /files
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesQueryOptions = (
  args: InferRequestType<typeof client.files.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export function useGetFiles(
  args: InferRequestType<typeof client.files.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.files.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /files/upload
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFilesUploadMutationKey() {
  return ['POST', '/files/upload'] as const
}

/**
 * Returns TanStack Query mutation options for POST /files/upload
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesUploadMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostFilesUploadMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.files.upload.$post>) =>
    parseResponse(client.files.upload.$post(args, clientOptions)),
})

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export function usePostFilesUpload(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.files.upload.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.files.upload.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.files.upload.$post>) =>
      parseResponse(client.files.upload.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /files/upload/multipart/init
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFilesUploadMultipartInitMutationKey() {
  return ['POST', '/files/upload/multipart/init'] as const
}

/**
 * Returns TanStack Query mutation options for POST /files/upload/multipart/init
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesUploadMultipartInitMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFilesUploadMultipartInitMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.files.upload.multipart.init.$post>) =>
    parseResponse(client.files.upload.multipart.init.$post(args, clientOptions)),
})

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export function usePostFilesUploadMultipartInit(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.files.upload.multipart.init.$post>>>
      >
    >,
    Error,
    InferRequestType<typeof client.files.upload.multipart.init.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.files.upload.multipart.init.$post>) =>
      parseResponse(client.files.upload.multipart.init.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /files/upload/multipart/{uploadId}/part
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFilesUploadMultipartUploadIdPartMutationKey() {
  return ['POST', '/files/upload/multipart/:uploadId/part'] as const
}

/**
 * Returns TanStack Query mutation options for POST /files/upload/multipart/{uploadId}/part
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesUploadMultipartUploadIdPartMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFilesUploadMultipartUploadIdPartMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>,
  ) => parseResponse(client.files.upload.multipart[':uploadId'].part.$post(args, clientOptions)),
})

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export function usePostFilesUploadMultipartUploadIdPart(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>,
    ) => parseResponse(client.files.upload.multipart[':uploadId'].part.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /files/upload/multipart/{uploadId}/complete
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFilesUploadMultipartUploadIdCompleteMutationKey() {
  return ['POST', '/files/upload/multipart/:uploadId/complete'] as const
}

/**
 * Returns TanStack Query mutation options for POST /files/upload/multipart/{uploadId}/complete
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesUploadMultipartUploadIdCompleteMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFilesUploadMultipartUploadIdCompleteMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
    >,
  ) =>
    parseResponse(client.files.upload.multipart[':uploadId'].complete.$post(args, clientOptions)),
})

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export function usePostFilesUploadMultipartUploadIdComplete(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
          >
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
      >,
    ) =>
      parseResponse(client.files.upload.multipart[':uploadId'].complete.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['files', '/files/:fileId', args] as const
}

/**
 * Returns TanStack Query query options for GET /files/{fileId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export function useGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for DELETE /files/{fileId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteFilesFileIdMutationKey() {
  return ['DELETE', '/files/:fileId'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /files/{fileId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteFilesFileIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteFilesFileIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$delete']>) =>
    parseResponse(client.files[':fileId'].$delete(args, clientOptions)),
})

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export function useDeleteFilesFileId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$delete']>) =>
      parseResponse(client.files[':fileId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for PATCH /files/{fileId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPatchFilesFileIdMutationKey() {
  return ['PATCH', '/files/:fileId'] as const
}

/**
 * Returns TanStack Query mutation options for PATCH /files/{fileId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchFilesFileIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchFilesFileIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$patch']>) =>
    parseResponse(client.files[':fileId'].$patch(args, clientOptions)),
})

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export function usePatchFilesFileId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$patch']>) =>
      parseResponse(client.files[':fileId'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}/download
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdDownloadQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
) {
  return ['files', '/files/:fileId/download', args] as const
}

/**
 * Returns TanStack Query query options for GET /files/{fileId}/download
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdDownloadQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdDownloadQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId'].download.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export function useGetFilesFileIdDownload(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['download']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdDownloadQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}/download-url
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdDownloadUrlQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
) {
  return ['files', '/files/:fileId/download-url', args] as const
}

/**
 * Returns TanStack Query query options for GET /files/{fileId}/download-url
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdDownloadUrlQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdDownloadUrlQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId']['download-url'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export function useGetFilesFileIdDownloadUrl(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['download-url']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdDownloadUrlQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /files/{fileId}/copy
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFilesFileIdCopyMutationKey() {
  return ['POST', '/files/:fileId/copy'] as const
}

/**
 * Returns TanStack Query mutation options for POST /files/{fileId}/copy
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesFileIdCopyMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostFilesFileIdCopyMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>) =>
    parseResponse(client.files[':fileId'].copy.$post(args, clientOptions)),
})

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export function usePostFilesFileIdCopy(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['copy']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>) =>
      parseResponse(client.files[':fileId'].copy.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /files/{fileId}/move
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFilesFileIdMoveMutationKey() {
  return ['POST', '/files/:fileId/move'] as const
}

/**
 * Returns TanStack Query mutation options for POST /files/{fileId}/move
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesFileIdMoveMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostFilesFileIdMoveMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['move']['$post']>) =>
    parseResponse(client.files[':fileId'].move.$post(args, clientOptions)),
})

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export function usePostFilesFileIdMove(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['move']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['move']['$post']>) =>
      parseResponse(client.files[':fileId'].move.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}/thumbnail
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdThumbnailQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
) {
  return ['files', '/files/:fileId/thumbnail', args] as const
}

/**
 * Returns TanStack Query query options for GET /files/{fileId}/thumbnail
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdThumbnailQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdThumbnailQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId'].thumbnail.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export function useGetFilesFileIdThumbnail(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['thumbnail']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdThumbnailQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /folders
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFoldersMutationKey() {
  return ['POST', '/folders'] as const
}

/**
 * Returns TanStack Query mutation options for POST /folders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFoldersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostFoldersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.folders.$post>) =>
    parseResponse(client.folders.$post(args, clientOptions)),
})

/**
 * POST /folders
 *
 * フォルダ作成
 */
export function usePostFolders(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.folders.$post>>>>>,
    Error,
    InferRequestType<typeof client.folders.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.folders.$post>) =>
      parseResponse(client.folders.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /folders/{folderId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFoldersFolderIdQueryKey(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
) {
  return ['folders', '/folders/:folderId', args] as const
}

/**
 * Returns TanStack Query query options for GET /folders/{folderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFoldersFolderIdQueryOptions = (
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFoldersFolderIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.folders[':folderId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export function useGetFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.folders)[':folderId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFoldersFolderIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for DELETE /folders/{folderId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteFoldersFolderIdMutationKey() {
  return ['DELETE', '/folders/:folderId'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /folders/{folderId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteFoldersFolderIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteFoldersFolderIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$delete']>) =>
    parseResponse(client.folders[':folderId'].$delete(args, clientOptions)),
})

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export function useDeleteFoldersFolderId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.folders)[':folderId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.folders)[':folderId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$delete']>) =>
      parseResponse(client.folders[':folderId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for PATCH /folders/{folderId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPatchFoldersFolderIdMutationKey() {
  return ['PATCH', '/folders/:folderId'] as const
}

/**
 * Returns TanStack Query mutation options for PATCH /folders/{folderId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchFoldersFolderIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchFoldersFolderIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$patch']>) =>
    parseResponse(client.folders[':folderId'].$patch(args, clientOptions)),
})

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export function usePatchFoldersFolderId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.folders)[':folderId']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.folders)[':folderId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$patch']>) =>
      parseResponse(client.folders[':folderId'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}/share
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdShareQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
) {
  return ['files', '/files/:fileId/share', args] as const
}

/**
 * Returns TanStack Query query options for GET /files/{fileId}/share
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdShareQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdShareQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId'].share.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export function useGetFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdShareQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /files/{fileId}/share
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFilesFileIdShareMutationKey() {
  return ['POST', '/files/:fileId/share'] as const
}

/**
 * Returns TanStack Query mutation options for POST /files/{fileId}/share
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesFileIdShareMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostFilesFileIdShareMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['share']['$post']>) =>
    parseResponse(client.files[':fileId'].share.$post(args, clientOptions)),
})

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export function usePostFilesFileIdShare(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['$post']>,
    ) => parseResponse(client.files[':fileId'].share.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for DELETE /files/{fileId}/share
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteFilesFileIdShareMutationKey() {
  return ['DELETE', '/files/:fileId/share'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /files/{fileId}/share
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteFilesFileIdShareMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteFilesFileIdShareMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>,
  ) => parseResponse(client.files[':fileId'].share.$delete(args, clientOptions)),
})

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export function useDeleteFilesFileIdShare(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>,
    ) => parseResponse(client.files[':fileId'].share.$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /files/{fileId}/share/link
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFilesFileIdShareLinkMutationKey() {
  return ['POST', '/files/:fileId/share/link'] as const
}

/**
 * Returns TanStack Query mutation options for POST /files/{fileId}/share/link
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesFileIdShareLinkMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFilesFileIdShareLinkMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>,
  ) => parseResponse(client.files[':fileId'].share.link.$post(args, clientOptions)),
})

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export function usePostFilesFileIdShareLink(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.files)[':fileId']['share']['link']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>,
    ) => parseResponse(client.files[':fileId'].share.link.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}/versions
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFilesFileIdVersionsQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
) {
  return ['files', '/files/:fileId/versions', args] as const
}

/**
 * Returns TanStack Query query options for GET /files/{fileId}/versions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdVersionsQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdVersionsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId'].versions.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export function useGetFilesFileIdVersions(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['versions']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdVersionsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /files/{fileId}/versions/{versionId}/restore
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFilesFileIdVersionsVersionIdRestoreMutationKey() {
  return ['POST', '/files/:fileId/versions/:versionId/restore'] as const
}

/**
 * Returns TanStack Query mutation options for POST /files/{fileId}/versions/{versionId}/restore
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFilesFileIdVersionsVersionIdRestoreMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFilesFileIdVersionsVersionIdRestoreMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
    >,
  ) =>
    parseResponse(
      client.files[':fileId'].versions[':versionId'].restore.$post(args, clientOptions),
    ),
})

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export function usePostFilesFileIdVersionsVersionIdRestore(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >,
    ) =>
      parseResponse(
        client.files[':fileId'].versions[':versionId'].restore.$post(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /trash
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTrashQueryKey(args: InferRequestType<typeof client.trash.$get>) {
  return ['trash', '/trash', args] as const
}

/**
 * Returns TanStack Query query options for GET /trash
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrashQueryOptions = (
  args: InferRequestType<typeof client.trash.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTrashQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.trash.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export function useGetTrash(
  args: InferRequestType<typeof client.trash.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trash.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTrashQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for DELETE /trash
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteTrashMutationKey() {
  return ['DELETE', '/trash'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /trash
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteTrashMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteTrashMutationKey(),
  mutationFn: async () => parseResponse(client.trash.$delete(undefined, clientOptions)),
})

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export function useDeleteTrash(options?: {
  mutation?: UseMutationOptions<
    | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trash.$delete>>>>>
    | undefined,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.trash.$delete(undefined, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /trash/{fileId}/restore
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostTrashFileIdRestoreMutationKey() {
  return ['POST', '/trash/:fileId/restore'] as const
}

/**
 * Returns TanStack Query mutation options for POST /trash/{fileId}/restore
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTrashFileIdRestoreMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostTrashFileIdRestoreMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>,
  ) => parseResponse(client.trash[':fileId'].restore.$post(args, clientOptions)),
})

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export function usePostTrashFileIdRestore(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.trash)[':fileId']['restore']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>,
    ) => parseResponse(client.trash[':fileId'].restore.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /storage/usage
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetStorageUsageQueryKey() {
  return ['storage', '/storage/usage'] as const
}

/**
 * Returns TanStack Query query options for GET /storage/usage
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStorageUsageQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStorageUsageQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.storage.usage.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export function useGetStorageUsage(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.storage.usage.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStorageUsageQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
