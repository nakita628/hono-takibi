import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export function useGetFiles(
  args: InferRequestType<typeof client.files.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.files.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.files.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /files
 */
export function getGetFilesQueryKey(args: InferRequestType<typeof client.files.$get>) {
  return ['GET', '/files', args] as const
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export function usePostFilesUpload(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.files.upload.$post> | undefined,
      Error,
      InferRequestType<typeof client.files.upload.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.files.upload.$post> | undefined,
    Error,
    InferRequestType<typeof client.files.upload.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.files.upload.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export function usePostFilesUploadMultipartInit(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.files.upload.multipart.init.$post> | undefined,
      Error,
      InferRequestType<typeof client.files.upload.multipart.init.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.files.upload.multipart.init.$post> | undefined,
    Error,
    InferRequestType<typeof client.files.upload.multipart.init.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files.upload.multipart.init.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export function usePostFilesUploadMultipartUploadIdPart(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files.upload.multipart[':uploadId'].part.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export function usePostFilesUploadMultipartUploadIdComplete(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.files.upload.multipart[':uploadId'].complete.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export function useGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.files)[':fileId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.files[':fileId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}
 */
export function getGetFilesFileIdQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['GET', '/files/:fileId', args] as const
}

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export function useDeleteFilesFileId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export function usePatchFilesFileId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export function useGetFilesFileIdDownload(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.files)[':fileId']['download']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdDownloadQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.files[':fileId'].download.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}/download
 */
export function getGetFilesFileIdDownloadQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
) {
  return ['GET', '/files/:fileId/download', args] as const
}

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export function useGetFilesFileIdDownloadUrl(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.files)[':fileId']['download-url']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdDownloadUrlQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.files[':fileId']['download-url'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}/download-url
 */
export function getGetFilesFileIdDownloadUrlQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
) {
  return ['GET', '/files/:fileId/download-url', args] as const
}

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export function usePostFilesFileIdCopy(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['copy']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['copy']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].copy.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export function usePostFilesFileIdMove(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['move']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['move']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].move.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export function useGetFilesFileIdThumbnail(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdThumbnailQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.files[':fileId'].thumbnail.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}/thumbnail
 */
export function getGetFilesFileIdThumbnailQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
) {
  return ['GET', '/files/:fileId/thumbnail', args] as const
}

/**
 * POST /folders
 *
 * フォルダ作成
 */
export function usePostFolders(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.folders.$post> | undefined,
      Error,
      InferRequestType<typeof client.folders.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.folders.$post> | undefined,
    Error,
    InferRequestType<typeof client.folders.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.folders.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export function useGetFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.folders)[':folderId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFoldersFolderIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.folders[':folderId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /folders/{folderId}
 */
export function getGetFoldersFolderIdQueryKey(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
) {
  return ['GET', '/folders/:folderId', args] as const
}

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export function useDeleteFoldersFolderId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.folders)[':folderId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.folders)[':folderId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.folders)[':folderId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.folders)[':folderId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.folders[':folderId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export function usePatchFoldersFolderId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.folders)[':folderId']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.folders)[':folderId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.folders)[':folderId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.folders)[':folderId']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.folders[':folderId'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export function useGetFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.files)[':fileId']['share']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdShareQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.files[':fileId'].share.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}/share
 */
export function getGetFilesFileIdShareQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
) {
  return ['GET', '/files/:fileId/share', args] as const
}

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export function usePostFilesFileIdShare(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['share']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].share.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export function useDeleteFilesFileIdShare(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['share']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].share.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export function usePostFilesFileIdShareLink(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['share']['link']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['link']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].share.link.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export function useGetFilesFileIdVersions(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.files)[':fileId']['versions']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdVersionsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.files[':fileId'].versions.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}/versions
 */
export function getGetFilesFileIdVersionsQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
) {
  return ['GET', '/files/:fileId/versions', args] as const
}

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export function usePostFilesFileIdVersionsVersionIdRestore(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.files[':fileId'].versions[':versionId'].restore.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export function useGetTrash(
  args: InferRequestType<typeof client.trash.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.trash.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTrashQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.trash.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /trash
 */
export function getGetTrashQueryKey(args: InferRequestType<typeof client.trash.$get>) {
  return ['GET', '/trash', args] as const
}

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export function useDeleteTrash(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.trash.$delete> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<InferResponseType<typeof client.trash.$delete> | undefined, Error, void>(
    {
      ...options?.mutation,
      mutationFn: async () => parseResponse(client.trash.$delete(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export function usePostTrashFileIdRestore(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.trash)[':fileId']['restore']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.trash)[':fileId']['restore']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.trash[':fileId'].restore.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export function useGetStorageUsage(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.storage.usage.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStorageUsageQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.storage.usage.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /storage/usage
 */
export function getGetStorageUsageQueryKey() {
  return ['GET', '/storage/usage'] as const
}
