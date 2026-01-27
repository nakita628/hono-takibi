import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/spotify'

/**
 * Generates TanStack Query cache key for GET /albums
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAlbumsQueryKey(args: InferRequestType<typeof client.albums.$get>) {
  return ['albums', '/albums', args] as const
}

/**
 * Returns TanStack Query query options for GET /albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAlbumsQueryOptions = (
  args: InferRequestType<typeof client.albums.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAlbumsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.albums.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /albums
 *
 * Get Several Albums
 *
 * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 */
export function useGetAlbums(
  args: InferRequestType<typeof client.albums.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.albums.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAlbumsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /albums/{id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAlbumsIdQueryKey(
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
) {
  return ['albums', '/albums/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /albums/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAlbumsIdQueryOptions = (
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAlbumsIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.albums[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /albums/{id}
 *
 * Get Album
 *
 * Get Spotify catalog information for a single album.
 */
export function useGetAlbumsId(
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.albums)[':id']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAlbumsIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /albums/{id}/tracks
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAlbumsIdTracksQueryKey(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
) {
  return ['albums', '/albums/:id/tracks', args] as const
}

/**
 * Returns TanStack Query query options for GET /albums/{id}/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAlbumsIdTracksQueryOptions = (
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAlbumsIdTracksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.albums[':id'].tracks.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /albums/{id}/tracks
 *
 * Get Album Tracks
 *
 * Get Spotify catalog information about an album’s tracks.
 * Optional parameters can be used to limit the number of tracks returned.
 */
export function useGetAlbumsIdTracks(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.albums)[':id']['tracks']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAlbumsIdTracksQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /artists
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetArtistsQueryKey(args: InferRequestType<typeof client.artists.$get>) {
  return ['artists', '/artists', args] as const
}

/**
 * Returns TanStack Query query options for GET /artists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsQueryOptions = (
  args: InferRequestType<typeof client.artists.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetArtistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.artists.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /artists
 *
 * Get Several Artists
 *
 * Get Spotify catalog information for several artists based on their Spotify IDs.
 */
export function useGetArtists(
  args: InferRequestType<typeof client.artists.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.artists.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetArtistsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /artists/{id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetArtistsIdQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
) {
  return ['artists', '/artists/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /artists/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetArtistsIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.artists[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /artists/{id}
 *
 * Get Artist
 *
 * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 */
export function useGetArtistsId(
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.artists)[':id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetArtistsIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /artists/{id}/albums
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetArtistsIdAlbumsQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
) {
  return ['artists', '/artists/:id/albums', args] as const
}

/**
 * Returns TanStack Query query options for GET /artists/{id}/albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdAlbumsQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetArtistsIdAlbumsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.artists[':id'].albums.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /artists/{id}/albums
 *
 * Get Artist's Albums
 *
 * Get Spotify catalog information about an artist's albums.
 */
export function useGetArtistsIdAlbums(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.artists)[':id']['albums']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetArtistsIdAlbumsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /artists/{id}/related-artists
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetArtistsIdRelatedArtistsQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
) {
  return ['artists', '/artists/:id/related-artists', args] as const
}

/**
 * Returns TanStack Query query options for GET /artists/{id}/related-artists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdRelatedArtistsQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetArtistsIdRelatedArtistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.artists[':id']['related-artists'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /artists/{id}/related-artists
 *
 * Get Artist's Related Artists
 *
 * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).
 */
export function useGetArtistsIdRelatedArtists(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.artists)[':id']['related-artists']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetArtistsIdRelatedArtistsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /artists/{id}/top-tracks
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetArtistsIdTopTracksQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
) {
  return ['artists', '/artists/:id/top-tracks', args] as const
}

/**
 * Returns TanStack Query query options for GET /artists/{id}/top-tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdTopTracksQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetArtistsIdTopTracksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.artists[':id']['top-tracks'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /artists/{id}/top-tracks
 *
 * Get Artist's Top Tracks
 *
 * Get Spotify catalog information about an artist's top tracks by country.
 */
export function useGetArtistsIdTopTracks(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.artists)[':id']['top-tracks']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetArtistsIdTopTracksQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /audio-analysis/{id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAudioAnalysisIdQueryKey(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
) {
  return ['audio-analysis', '/audio-analysis/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /audio-analysis/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudioAnalysisIdQueryOptions = (
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudioAnalysisIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['audio-analysis'][':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /audio-analysis/{id}
 *
 * Get Track's Audio Analysis
 *
 * Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.
 */
export function useGetAudioAnalysisId(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['audio-analysis'][':id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAudioAnalysisIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /audio-features
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAudioFeaturesQueryKey(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
) {
  return ['audio-features', '/audio-features', args] as const
}

/**
 * Returns TanStack Query query options for GET /audio-features
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudioFeaturesQueryOptions = (
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudioFeaturesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['audio-features'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /audio-features
 *
 * Get Tracks' Audio Features
 *
 * Get audio features for multiple tracks based on their Spotify IDs.
 */
export function useGetAudioFeatures(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['audio-features']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAudioFeaturesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /audio-features/{id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAudioFeaturesIdQueryKey(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
) {
  return ['audio-features', '/audio-features/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /audio-features/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudioFeaturesIdQueryOptions = (
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudioFeaturesIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['audio-features'][':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /audio-features/{id}
 *
 * Get Track's Audio Features
 *
 * Get audio feature information for a single track identified by its unique
 * Spotify ID.
 */
export function useGetAudioFeaturesId(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['audio-features'][':id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAudioFeaturesIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /audiobooks
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAudiobooksQueryKey(args: InferRequestType<typeof client.audiobooks.$get>) {
  return ['audiobooks', '/audiobooks', args] as const
}

/**
 * Returns TanStack Query query options for GET /audiobooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudiobooksQueryOptions = (
  args: InferRequestType<typeof client.audiobooks.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudiobooksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.audiobooks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /audiobooks
 *
 * Get Several Audiobooks
 *
 * Get Spotify catalog information for several audiobooks identified by their Spotify IDs.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function useGetAudiobooks(
  args: InferRequestType<typeof client.audiobooks.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.audiobooks.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAudiobooksQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /audiobooks/{id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAudiobooksIdQueryKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
) {
  return ['audiobooks', '/audiobooks/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /audiobooks/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudiobooksIdQueryOptions = (
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudiobooksIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.audiobooks[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /audiobooks/{id}
 *
 * Get an Audiobook
 *
 * Get Spotify catalog information for a single audiobook.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function useGetAudiobooksId(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.audiobooks)[':id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAudiobooksIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /audiobooks/{id}/chapters
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAudiobooksIdChaptersQueryKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
) {
  return ['audiobooks', '/audiobooks/:id/chapters', args] as const
}

/**
 * Returns TanStack Query query options for GET /audiobooks/{id}/chapters
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudiobooksIdChaptersQueryOptions = (
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudiobooksIdChaptersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.audiobooks[':id'].chapters.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /audiobooks/{id}/chapters
 *
 * Get Audiobook Chapters
 *
 * Get Spotify catalog information about an audiobook's chapters.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function useGetAudiobooksIdChapters(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.audiobooks)[':id']['chapters']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAudiobooksIdChaptersQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /browse/categories
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetBrowseCategoriesQueryKey(
  args: InferRequestType<typeof client.browse.categories.$get>,
) {
  return ['browse', '/browse/categories', args] as const
}

/**
 * Returns TanStack Query query options for GET /browse/categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseCategoriesQueryOptions = (
  args: InferRequestType<typeof client.browse.categories.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBrowseCategoriesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.browse.categories.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /browse/categories
 *
 * Get Several Browse Categories
 *
 * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
export function useGetBrowseCategories(
  args: InferRequestType<typeof client.browse.categories.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.browse.categories.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetBrowseCategoriesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /browse/categories/{category_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetBrowseCategoriesCategoryIdQueryKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
) {
  return ['browse', '/browse/categories/:category_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /browse/categories/{category_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseCategoriesCategoryIdQueryOptions = (
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBrowseCategoriesCategoryIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.browse.categories[':category_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /browse/categories/{category_id}
 *
 * Get Single Browse Category
 *
 * Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
export function useGetBrowseCategoriesCategoryId(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.browse.categories)[':category_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetBrowseCategoriesCategoryIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /browse/categories/{category_id}/playlists
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetBrowseCategoriesCategoryIdPlaylistsQueryKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
) {
  return ['browse', '/browse/categories/:category_id/playlists', args] as const
}

/**
 * Returns TanStack Query query options for GET /browse/categories/{category_id}/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseCategoriesCategoryIdPlaylistsQueryOptions = (
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBrowseCategoriesCategoryIdPlaylistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.browse.categories[':category_id'].playlists.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /browse/categories/{category_id}/playlists
 *
 * Get Category's Playlists
 *
 * Get a list of Spotify playlists tagged with a particular category.
 */
export function useGetBrowseCategoriesCategoryIdPlaylists(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetBrowseCategoriesCategoryIdPlaylistsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /browse/featured-playlists
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetBrowseFeaturedPlaylistsQueryKey(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
) {
  return ['browse', '/browse/featured-playlists', args] as const
}

/**
 * Returns TanStack Query query options for GET /browse/featured-playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseFeaturedPlaylistsQueryOptions = (
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBrowseFeaturedPlaylistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.browse['featured-playlists'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /browse/featured-playlists
 *
 * Get Featured Playlists
 *
 * Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
 */
export function useGetBrowseFeaturedPlaylists(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.browse)['featured-playlists']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetBrowseFeaturedPlaylistsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /browse/new-releases
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetBrowseNewReleasesQueryKey(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
) {
  return ['browse', '/browse/new-releases', args] as const
}

/**
 * Returns TanStack Query query options for GET /browse/new-releases
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseNewReleasesQueryOptions = (
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBrowseNewReleasesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.browse['new-releases'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /browse/new-releases
 *
 * Get New Releases
 *
 * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
 */
export function useGetBrowseNewReleases(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.browse)['new-releases']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetBrowseNewReleasesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /chapters
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChaptersQueryKey(args: InferRequestType<typeof client.chapters.$get>) {
  return ['chapters', '/chapters', args] as const
}

/**
 * Returns TanStack Query query options for GET /chapters
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChaptersQueryOptions = (
  args: InferRequestType<typeof client.chapters.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChaptersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.chapters.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /chapters
 *
 * Get Several Chapters
 *
 * Get Spotify catalog information for several chapters identified by their Spotify IDs.<br />
 * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function useGetChapters(
  args: InferRequestType<typeof client.chapters.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.chapters.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChaptersQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /chapters/{id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChaptersIdQueryKey(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
) {
  return ['chapters', '/chapters/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /chapters/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChaptersIdQueryOptions = (
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChaptersIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.chapters[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /chapters/{id}
 *
 * Get a Chapter
 *
 * Get Spotify catalog information for a single chapter.<br />
 * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function useGetChaptersId(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.chapters)[':id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChaptersIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /episodes
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetEpisodesQueryKey(args: InferRequestType<typeof client.episodes.$get>) {
  return ['episodes', '/episodes', args] as const
}

/**
 * Returns TanStack Query query options for GET /episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEpisodesQueryOptions = (
  args: InferRequestType<typeof client.episodes.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEpisodesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.episodes.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /episodes
 *
 * Get Several Episodes
 *
 * Get Spotify catalog information for several episodes based on their Spotify IDs.
 */
export function useGetEpisodes(
  args: InferRequestType<typeof client.episodes.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.episodes.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEpisodesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /episodes/{id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetEpisodesIdQueryKey(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
) {
  return ['episodes', '/episodes/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /episodes/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEpisodesIdQueryOptions = (
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEpisodesIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.episodes[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /episodes/{id}
 *
 * Get Episode
 *
 * Get Spotify catalog information for a single episode identified by its
 * unique Spotify ID.
 */
export function useGetEpisodesId(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.episodes)[':id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEpisodesIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /markets
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetMarketsQueryKey() {
  return ['markets', '/markets'] as const
}

/**
 * Returns TanStack Query query options for GET /markets
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMarketsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMarketsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.markets.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /markets
 *
 * Get Available Markets
 *
 * Get the list of markets where Spotify is available.
 */
export function useGetMarkets(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.markets.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMarketsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /me
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetMeQueryKey() {
  return ['me', '/me'] as const
}

/**
 * Returns TanStack Query query options for GET /me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMeQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me
 *
 * Get Current User's Profile
 *
 * Get detailed profile information about the current user (including the
 * current user's username).
 */
export function useGetMe(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /me/albums
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeAlbumsQueryKey(args: InferRequestType<typeof client.me.albums.$get>) {
  return ['me', '/me/albums', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAlbumsQueryOptions = (
  args: InferRequestType<typeof client.me.albums.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeAlbumsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.albums.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me/albums
 *
 * Get User's Saved Albums
 *
 * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
 */
export function useGetMeAlbums(
  args: InferRequestType<typeof client.me.albums.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.albums.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeAlbumsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /me/albums
 *
 * Save Albums for Current User
 *
 * Save one or more albums to the current user's 'Your Music' library.
 */
export function usePutMeAlbums(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.albums.$put>>>>>,
    Error,
    InferRequestType<typeof client.me.albums.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.albums.$put>) =>
      parseResponse(client.me.albums.$put(args, clientOptions)),
  })
}

/**
 * DELETE /me/albums
 *
 * Remove Users' Saved Albums
 *
 * Remove one or more albums from the current user's 'Your Music' library.
 */
export function useDeleteMeAlbums(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.albums.$delete>>>>>,
    Error,
    InferRequestType<typeof client.me.albums.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.albums.$delete>) =>
      parseResponse(client.me.albums.$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /me/albums/contains
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeAlbumsContainsQueryKey(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
) {
  return ['me', '/me/albums/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/albums/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAlbumsContainsQueryOptions = (
  args: InferRequestType<typeof client.me.albums.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeAlbumsContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.albums.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/albums/contains
 *
 * Check User's Saved Albums
 *
 * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
 */
export function useGetMeAlbumsContains(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.albums.contains.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeAlbumsContainsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /me/audiobooks
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeAudiobooksQueryKey(
  args: InferRequestType<typeof client.me.audiobooks.$get>,
) {
  return ['me', '/me/audiobooks', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/audiobooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAudiobooksQueryOptions = (
  args: InferRequestType<typeof client.me.audiobooks.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeAudiobooksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.audiobooks.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/audiobooks
 *
 * Get User's Saved Audiobooks
 *
 * Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
 */
export function useGetMeAudiobooks(
  args: InferRequestType<typeof client.me.audiobooks.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.audiobooks.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeAudiobooksQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /me/audiobooks
 *
 * Save Audiobooks for Current User
 *
 * Save one or more audiobooks to the current Spotify user's library.
 */
export function usePutMeAudiobooks(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.audiobooks.$put>>>>
    >,
    Error,
    InferRequestType<typeof client.me.audiobooks.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.audiobooks.$put>) =>
      parseResponse(client.me.audiobooks.$put(args, clientOptions)),
  })
}

/**
 * DELETE /me/audiobooks
 *
 * Remove User's Saved Audiobooks
 *
 * Remove one or more audiobooks from the Spotify user's library.
 */
export function useDeleteMeAudiobooks(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.audiobooks.$delete>>>>
    >,
    Error,
    InferRequestType<typeof client.me.audiobooks.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.audiobooks.$delete>) =>
      parseResponse(client.me.audiobooks.$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /me/audiobooks/contains
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeAudiobooksContainsQueryKey(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
) {
  return ['me', '/me/audiobooks/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/audiobooks/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAudiobooksContainsQueryOptions = (
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeAudiobooksContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.audiobooks.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/audiobooks/contains
 *
 * Check User's Saved Audiobooks
 *
 * Check if one or more audiobooks are already saved in the current Spotify user's library.
 */
export function useGetMeAudiobooksContains(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.me.audiobooks.contains.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeAudiobooksContainsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /me/episodes
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeEpisodesQueryKey(args: InferRequestType<typeof client.me.episodes.$get>) {
  return ['me', '/me/episodes', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeEpisodesQueryOptions = (
  args: InferRequestType<typeof client.me.episodes.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeEpisodesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.episodes.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me/episodes
 *
 * Get User's Saved Episodes
 *
 * Get a list of the episodes saved in the current Spotify user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function useGetMeEpisodes(
  args: InferRequestType<typeof client.me.episodes.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.episodes.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeEpisodesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /me/episodes
 *
 * Save Episodes for Current User
 *
 * Save one or more episodes to the current user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function usePutMeEpisodes(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.episodes.$put>>>>>,
    Error,
    InferRequestType<typeof client.me.episodes.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.episodes.$put>) =>
      parseResponse(client.me.episodes.$put(args, clientOptions)),
  })
}

/**
 * DELETE /me/episodes
 *
 * Remove User's Saved Episodes
 *
 * Remove one or more episodes from the current user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function useDeleteMeEpisodes(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.episodes.$delete>>>>
    >,
    Error,
    InferRequestType<typeof client.me.episodes.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.episodes.$delete>) =>
      parseResponse(client.me.episodes.$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /me/episodes/contains
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeEpisodesContainsQueryKey(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
) {
  return ['me', '/me/episodes/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/episodes/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeEpisodesContainsQueryOptions = (
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeEpisodesContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.episodes.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/episodes/contains
 *
 * Check User's Saved Episodes
 *
 * Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer)..
 */
export function useGetMeEpisodesContains(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.me.episodes.contains.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeEpisodesContainsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /me/following
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeFollowingQueryKey(args: InferRequestType<typeof client.me.following.$get>) {
  return ['me', '/me/following', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/following
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeFollowingQueryOptions = (
  args: InferRequestType<typeof client.me.following.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeFollowingQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.following.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/following
 *
 * Get Followed Artists
 *
 * Get the current user's followed artists.
 */
export function useGetMeFollowing(
  args: InferRequestType<typeof client.me.following.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.following.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeFollowingQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /me/following
 *
 * Follow Artists or Users
 *
 * Add the current user as a follower of one or more artists or other Spotify users.
 */
export function usePutMeFollowing(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.following.$put>>>>
      >
    | undefined,
    Error,
    InferRequestType<typeof client.me.following.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.following.$put>) =>
      parseResponse(client.me.following.$put(args, clientOptions)),
  })
}

/**
 * DELETE /me/following
 *
 * Unfollow Artists or Users
 *
 * Remove the current user as a follower of one or more artists or other Spotify users.
 */
export function useDeleteMeFollowing(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.following.$delete>>>>
    >,
    Error,
    InferRequestType<typeof client.me.following.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.following.$delete>) =>
      parseResponse(client.me.following.$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /me/following/contains
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeFollowingContainsQueryKey(
  args: InferRequestType<typeof client.me.following.contains.$get>,
) {
  return ['me', '/me/following/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/following/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeFollowingContainsQueryOptions = (
  args: InferRequestType<typeof client.me.following.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeFollowingContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.following.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/following/contains
 *
 * Check If User Follows Artists or Users
 *
 * Check to see if the current user is following one or more artists or other Spotify users.
 */
export function useGetMeFollowingContains(
  args: InferRequestType<typeof client.me.following.contains.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.me.following.contains.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeFollowingContainsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /me/player
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMePlayerQueryKey(args: InferRequestType<typeof client.me.player.$get>) {
  return ['me', '/me/player', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/player
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerQueryOptions = (
  args: InferRequestType<typeof client.me.player.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMePlayerQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.player.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me/player
 *
 * Get Playback State
 *
 * Get information about the user’s current playback state, including track or episode, progress, and active device.
 */
export function useGetMePlayer(
  args: InferRequestType<typeof client.me.player.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMePlayerQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /me/player
 *
 * Transfer Playback
 *
 * Transfer playback to a new device and determine if it should start playing.
 */
export function usePutMePlayer(options?: {
  mutation?: UseMutationOptions<
    | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.$put>>>>>
    | undefined,
    Error,
    InferRequestType<typeof client.me.player.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.$put>) =>
      parseResponse(client.me.player.$put(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /me/player/currently-playing
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMePlayerCurrentlyPlayingQueryKey(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
) {
  return ['me', '/me/player/currently-playing', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/player/currently-playing
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerCurrentlyPlayingQueryOptions = (
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMePlayerCurrentlyPlayingQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.player['currently-playing'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/player/currently-playing
 *
 * Get Currently Playing Track
 *
 * Get the object currently being played on the user's Spotify account.
 */
export function useGetMePlayerCurrentlyPlaying(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.me.player)['currently-playing']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMePlayerCurrentlyPlayingQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /me/player/devices
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetMePlayerDevicesQueryKey() {
  return ['me', '/me/player/devices'] as const
}

/**
 * Returns TanStack Query query options for GET /me/player/devices
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerDevicesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMePlayerDevicesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.player.devices.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/player/devices
 *
 * Get Available Devices
 *
 * Get information about a user’s available devices.
 */
export function useGetMePlayerDevices(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.devices.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMePlayerDevicesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /me/player/next
 *
 * Skip To Next
 *
 * Skips to next track in the user’s queue.
 */
export function usePostMePlayerNext(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.next.$post>>>>
      >
    | undefined,
    Error,
    InferRequestType<typeof client.me.player.next.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.next.$post>) =>
      parseResponse(client.me.player.next.$post(args, clientOptions)),
  })
}

/**
 * PUT /me/player/pause
 *
 * Pause Playback
 *
 * Pause playback on the user's account.
 */
export function usePutMePlayerPause(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.pause.$put>>>>
      >
    | undefined,
    Error,
    InferRequestType<typeof client.me.player.pause.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.pause.$put>) =>
      parseResponse(client.me.player.pause.$put(args, clientOptions)),
  })
}

/**
 * PUT /me/player/play
 *
 * Start/Resume Playback
 *
 * Start a new context or resume current playback on the user's active device.
 */
export function usePutMePlayerPlay(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.play.$put>>>>
      >
    | undefined,
    Error,
    InferRequestType<typeof client.me.player.play.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.play.$put>) =>
      parseResponse(client.me.player.play.$put(args, clientOptions)),
  })
}

/**
 * POST /me/player/previous
 *
 * Skip To Previous
 *
 * Skips to previous track in the user’s queue.
 */
export function usePostMePlayerPrevious(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.me.player.previous.$post>>>
        >
      >
    | undefined,
    Error,
    InferRequestType<typeof client.me.player.previous.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.previous.$post>) =>
      parseResponse(client.me.player.previous.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /me/player/queue
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetMePlayerQueueQueryKey() {
  return ['me', '/me/player/queue'] as const
}

/**
 * Returns TanStack Query query options for GET /me/player/queue
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerQueueQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMePlayerQueueQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.player.queue.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/player/queue
 *
 * Get the User's Queue
 *
 * Get the list of objects that make up the user's queue.
 */
export function useGetMePlayerQueue(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.queue.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMePlayerQueueQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /me/player/queue
 *
 * Add Item to Playback Queue
 *
 * Add an item to the end of the user's current playback queue.
 */
export function usePostMePlayerQueue(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.queue.$post>>>>
      >
    | undefined,
    Error,
    InferRequestType<typeof client.me.player.queue.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.queue.$post>) =>
      parseResponse(client.me.player.queue.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /me/player/recently-played
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMePlayerRecentlyPlayedQueryKey(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
) {
  return ['me', '/me/player/recently-played', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/player/recently-played
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerRecentlyPlayedQueryOptions = (
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMePlayerRecentlyPlayedQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.player['recently-played'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/player/recently-played
 *
 * Get Recently Played Tracks
 *
 * Get tracks from the current user's recently played tracks.
 * _**Note**: Currently doesn't support podcast episodes._
 */
export function useGetMePlayerRecentlyPlayed(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.me.player)['recently-played']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMePlayerRecentlyPlayedQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /me/player/repeat
 *
 * Set Repeat Mode
 *
 * Set the repeat mode for the user's playback. Options are repeat-track,
 * repeat-context, and off.
 */
export function usePutMePlayerRepeat(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.repeat.$put>>>>
      >
    | undefined,
    Error,
    InferRequestType<typeof client.me.player.repeat.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.repeat.$put>) =>
      parseResponse(client.me.player.repeat.$put(args, clientOptions)),
  })
}

/**
 * PUT /me/player/seek
 *
 * Seek To Position
 *
 * Seeks to the given position in the user’s currently playing track.
 */
export function usePutMePlayerSeek(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.seek.$put>>>>
      >
    | undefined,
    Error,
    InferRequestType<typeof client.me.player.seek.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.seek.$put>) =>
      parseResponse(client.me.player.seek.$put(args, clientOptions)),
  })
}

/**
 * PUT /me/player/shuffle
 *
 * Toggle Playback Shuffle
 *
 * Toggle shuffle on or off for user’s playback.
 */
export function usePutMePlayerShuffle(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.shuffle.$put>>>>
      >
    | undefined,
    Error,
    InferRequestType<typeof client.me.player.shuffle.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.shuffle.$put>) =>
      parseResponse(client.me.player.shuffle.$put(args, clientOptions)),
  })
}

/**
 * PUT /me/player/volume
 *
 * Set Playback Volume
 *
 * Set the volume for the user’s current playback device.
 */
export function usePutMePlayerVolume(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.volume.$put>>>>
      >
    | undefined,
    Error,
    InferRequestType<typeof client.me.player.volume.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.volume.$put>) =>
      parseResponse(client.me.player.volume.$put(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /me/playlists
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMePlaylistsQueryKey(args: InferRequestType<typeof client.me.playlists.$get>) {
  return ['me', '/me/playlists', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlaylistsQueryOptions = (
  args: InferRequestType<typeof client.me.playlists.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMePlaylistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.playlists.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/playlists
 *
 * Get Current User's Playlists
 *
 * Get a list of the playlists owned or followed by the current Spotify
 * user.
 */
export function useGetMePlaylists(
  args: InferRequestType<typeof client.me.playlists.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.playlists.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMePlaylistsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /me/shows
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeShowsQueryKey(args: InferRequestType<typeof client.me.shows.$get>) {
  return ['me', '/me/shows', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/shows
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeShowsQueryOptions = (
  args: InferRequestType<typeof client.me.shows.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeShowsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.shows.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me/shows
 *
 * Get User's Saved Shows
 *
 * Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
 */
export function useGetMeShows(
  args: InferRequestType<typeof client.me.shows.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.shows.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeShowsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /me/shows
 *
 * Save Shows for Current User
 *
 * Save one or more shows to current Spotify user's library.
 */
export function usePutMeShows(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.shows.$put>>>>>,
    Error,
    InferRequestType<typeof client.me.shows.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.shows.$put>) =>
      parseResponse(client.me.shows.$put(args, clientOptions)),
  })
}

/**
 * DELETE /me/shows
 *
 * Remove User's Saved Shows
 *
 * Delete one or more shows from current Spotify user's library.
 */
export function useDeleteMeShows(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.shows.$delete>>>>>,
    Error,
    InferRequestType<typeof client.me.shows.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.shows.$delete>) =>
      parseResponse(client.me.shows.$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /me/shows/contains
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeShowsContainsQueryKey(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
) {
  return ['me', '/me/shows/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/shows/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeShowsContainsQueryOptions = (
  args: InferRequestType<typeof client.me.shows.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeShowsContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.shows.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/shows/contains
 *
 * Check User's Saved Shows
 *
 * Check if one or more shows is already saved in the current Spotify user's library.
 */
export function useGetMeShowsContains(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.shows.contains.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeShowsContainsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /me/top/{type}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeTopTypeQueryKey(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
) {
  return ['me', '/me/top/:type', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/top/{type}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeTopTypeQueryOptions = (
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeTopTypeQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.top[':type'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/top/{type}
 *
 * Get User's Top Items
 *
 * Get the current user's top artists or tracks based on calculated affinity.
 */
export function useGetMeTopType(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.me.top)[':type']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeTopTypeQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /me/tracks
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeTracksQueryKey(args: InferRequestType<typeof client.me.tracks.$get>) {
  return ['me', '/me/tracks', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeTracksQueryOptions = (
  args: InferRequestType<typeof client.me.tracks.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeTracksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.tracks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me/tracks
 *
 * Get User's Saved Tracks
 *
 * Get a list of the songs saved in the current Spotify user's 'Your Music' library.
 */
export function useGetMeTracks(
  args: InferRequestType<typeof client.me.tracks.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.tracks.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeTracksQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /me/tracks
 *
 * Save Tracks for Current User
 *
 * Save one or more tracks to the current user's 'Your Music' library.
 */
export function usePutMeTracks(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.tracks.$put>>>>>,
    Error,
    InferRequestType<typeof client.me.tracks.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.tracks.$put>) =>
      parseResponse(client.me.tracks.$put(args, clientOptions)),
  })
}

/**
 * DELETE /me/tracks
 *
 * Remove User's Saved Tracks
 *
 * Remove one or more tracks from the current user's 'Your Music' library.
 */
export function useDeleteMeTracks(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.tracks.$delete>>>>>,
    Error,
    InferRequestType<typeof client.me.tracks.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.tracks.$delete>) =>
      parseResponse(client.me.tracks.$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /me/tracks/contains
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMeTracksContainsQueryKey(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
) {
  return ['me', '/me/tracks/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/tracks/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeTracksContainsQueryOptions = (
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeTracksContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.tracks.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/tracks/contains
 *
 * Check User's Saved Tracks
 *
 * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
 */
export function useGetMeTracksContains(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.tracks.contains.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeTracksContainsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /playlists/{playlist_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPlaylistsPlaylistIdQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
) {
  return ['playlists', '/playlists/:playlist_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /playlists/{playlist_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdQueryOptions = (
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPlaylistsPlaylistIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.playlists[':playlist_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /playlists/{playlist_id}
 *
 * Get Playlist
 *
 * Get a playlist owned by a Spotify user.
 */
export function useGetPlaylistsPlaylistId(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPlaylistsPlaylistIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /playlists/{playlist_id}
 *
 * Change Playlist Details
 *
 * Change a playlist's name and public/private state. (The user must, of
 * course, own the playlist.)
 */
export function usePutPlaylistsPlaylistId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>) =>
      parseResponse(client.playlists[':playlist_id'].$put(args, clientOptions)),
  })
}

/**
 * PUT /playlists/{playlist_id}/followers
 *
 * Follow Playlist
 *
 * Add the current user as a follower of a playlist.
 */
export function usePutPlaylistsPlaylistIdFollowers(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['followers']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
    ) => parseResponse(client.playlists[':playlist_id'].followers.$put(args, clientOptions)),
  })
}

/**
 * DELETE /playlists/{playlist_id}/followers
 *
 * Unfollow Playlist
 *
 * Remove the current user as a follower of a playlist.
 */
export function useDeletePlaylistsPlaylistIdFollowers(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>,
    ) => parseResponse(client.playlists[':playlist_id'].followers.$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /playlists/{playlist_id}/followers/contains
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPlaylistsPlaylistIdFollowersContainsQueryKey(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
) {
  return ['playlists', '/playlists/:playlist_id/followers/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /playlists/{playlist_id}/followers/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdFollowersContainsQueryOptions = (
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPlaylistsPlaylistIdFollowersContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.playlists[':playlist_id'].followers.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /playlists/{playlist_id}/followers/contains
 *
 * Check if Users Follow Playlist
 *
 * Check to see if one or more Spotify users are following a specified playlist.
 */
export function useGetPlaylistsPlaylistIdFollowersContains(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.playlists)[':playlist_id']['followers']['contains']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetPlaylistsPlaylistIdFollowersContainsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /playlists/{playlist_id}/images
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPlaylistsPlaylistIdImagesQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
) {
  return ['playlists', '/playlists/:playlist_id/images', args] as const
}

/**
 * Returns TanStack Query query options for GET /playlists/{playlist_id}/images
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdImagesQueryOptions = (
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPlaylistsPlaylistIdImagesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.playlists[':playlist_id'].images.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /playlists/{playlist_id}/images
 *
 * Get Playlist Cover Image
 *
 * Get the current image associated with a specific playlist.
 */
export function useGetPlaylistsPlaylistIdImages(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['images']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPlaylistsPlaylistIdImagesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /playlists/{playlist_id}/images
 *
 * Add Custom Playlist Cover Image
 *
 * Replace the image used to represent a specific playlist.
 */
export function usePutPlaylistsPlaylistIdImages(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['images']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
    ) => parseResponse(client.playlists[':playlist_id'].images.$put(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /playlists/{playlist_id}/tracks
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPlaylistsPlaylistIdTracksQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
) {
  return ['playlists', '/playlists/:playlist_id/tracks', args] as const
}

/**
 * Returns TanStack Query query options for GET /playlists/{playlist_id}/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdTracksQueryOptions = (
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPlaylistsPlaylistIdTracksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.playlists[':playlist_id'].tracks.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /playlists/{playlist_id}/tracks
 *
 * Get Playlist Items
 *
 * Get full details of the items of a playlist owned by a Spotify user.
 */
export function useGetPlaylistsPlaylistIdTracks(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPlaylistsPlaylistIdTracksQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /playlists/{playlist_id}/tracks
 *
 * Update Playlist Items
 *
 * Either reorder or replace items in a playlist depending on the request's parameters.
 * To reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.
 * To replace items, include `uris` as either a query parameter or in the request's body.
 * Replacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.
 * <br/>
 * **Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.
 * These operations can't be applied together in a single request.
 */
export function usePutPlaylistsPlaylistIdTracks(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
    ) => parseResponse(client.playlists[':playlist_id'].tracks.$put(args, clientOptions)),
  })
}

/**
 * POST /playlists/{playlist_id}/tracks
 *
 * Add Items to Playlist
 *
 * Add one or more items to a user's playlist.
 */
export function usePostPlaylistsPlaylistIdTracks(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
    ) => parseResponse(client.playlists[':playlist_id'].tracks.$post(args, clientOptions)),
  })
}

/**
 * DELETE /playlists/{playlist_id}/tracks
 *
 * Remove Playlist Items
 *
 * Remove one or more items from a user's playlist.
 */
export function useDeletePlaylistsPlaylistIdTracks(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
    ) => parseResponse(client.playlists[':playlist_id'].tracks.$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /recommendations
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetRecommendationsQueryKey(
  args: InferRequestType<typeof client.recommendations.$get>,
) {
  return ['recommendations', '/recommendations', args] as const
}

/**
 * Returns TanStack Query query options for GET /recommendations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetRecommendationsQueryOptions = (
  args: InferRequestType<typeof client.recommendations.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetRecommendationsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.recommendations.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /recommendations
 *
 * Get Recommendations
 *
 * Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.
 *
 * For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.
 */
export function useGetRecommendations(
  args: InferRequestType<typeof client.recommendations.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.recommendations.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetRecommendationsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /recommendations/available-genre-seeds
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetRecommendationsAvailableGenreSeedsQueryKey() {
  return ['recommendations', '/recommendations/available-genre-seeds'] as const
}

/**
 * Returns TanStack Query query options for GET /recommendations/available-genre-seeds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetRecommendationsAvailableGenreSeedsQueryOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetRecommendationsAvailableGenreSeedsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.recommendations['available-genre-seeds'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /recommendations/available-genre-seeds
 *
 * Get Available Genre Seeds
 *
 * Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).
 */
export function useGetRecommendationsAvailableGenreSeeds(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['$get']>>
        >
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetRecommendationsAvailableGenreSeedsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /search
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSearchQueryKey(args: InferRequestType<typeof client.search.$get>) {
  return ['search', '/search', args] as const
}

/**
 * Returns TanStack Query query options for GET /search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchQueryOptions = (
  args: InferRequestType<typeof client.search.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /search
 *
 * Search for Item
 *
 * Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks
 * that match a keyword string.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function useGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSearchQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /shows
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetShowsQueryKey(args: InferRequestType<typeof client.shows.$get>) {
  return ['shows', '/shows', args] as const
}

/**
 * Returns TanStack Query query options for GET /shows
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetShowsQueryOptions = (
  args: InferRequestType<typeof client.shows.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetShowsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.shows.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /shows
 *
 * Get Several Shows
 *
 * Get Spotify catalog information for several shows based on their Spotify IDs.
 */
export function useGetShows(
  args: InferRequestType<typeof client.shows.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.shows.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetShowsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /shows/{id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetShowsIdQueryKey(
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
) {
  return ['shows', '/shows/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /shows/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetShowsIdQueryOptions = (
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetShowsIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.shows[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /shows/{id}
 *
 * Get Show
 *
 * Get Spotify catalog information for a single show identified by its
 * unique Spotify ID.
 */
export function useGetShowsId(
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.shows)[':id']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetShowsIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /shows/{id}/episodes
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetShowsIdEpisodesQueryKey(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
) {
  return ['shows', '/shows/:id/episodes', args] as const
}

/**
 * Returns TanStack Query query options for GET /shows/{id}/episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetShowsIdEpisodesQueryOptions = (
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetShowsIdEpisodesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.shows[':id'].episodes.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /shows/{id}/episodes
 *
 * Get Show Episodes
 *
 * Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.
 */
export function useGetShowsIdEpisodes(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.shows)[':id']['episodes']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetShowsIdEpisodesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /tracks
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTracksQueryKey(args: InferRequestType<typeof client.tracks.$get>) {
  return ['tracks', '/tracks', args] as const
}

/**
 * Returns TanStack Query query options for GET /tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTracksQueryOptions = (
  args: InferRequestType<typeof client.tracks.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTracksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.tracks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /tracks
 *
 * Get Several Tracks
 *
 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
 */
export function useGetTracks(
  args: InferRequestType<typeof client.tracks.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tracks.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTracksQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /tracks/{id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTracksIdQueryKey(
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
) {
  return ['tracks', '/tracks/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /tracks/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTracksIdQueryOptions = (
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTracksIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.tracks[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /tracks/{id}
 *
 * Get Track
 *
 * Get Spotify catalog information for a single track identified by its
 * unique Spotify ID.
 */
export function useGetTracksId(
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.tracks)[':id']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTracksIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /users/{user_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['users', '/users/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{user_id}
 *
 * Get User's Profile
 *
 * Get public profile information about a Spotify user.
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':user_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /users/{user_id}/playlists
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersUserIdPlaylistsQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
) {
  return ['users', '/users/:user_id/playlists', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/{user_id}/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdPlaylistsQueryOptions = (
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdPlaylistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':user_id'].playlists.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{user_id}/playlists
 *
 * Get User's Playlists
 *
 * Get a list of the playlists owned or followed by a Spotify user.
 */
export function useGetUsersUserIdPlaylists(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':user_id']['playlists']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdPlaylistsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /users/{user_id}/playlists
 *
 * Create Playlist
 *
 * Create a playlist for a Spotify user. (The playlist will be empty until
 * you [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)
 */
export function usePostUsersUserIdPlaylists(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.users)[':user_id']['playlists']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>,
    ) => parseResponse(client.users[':user_id'].playlists.$post(args, clientOptions)),
  })
}
