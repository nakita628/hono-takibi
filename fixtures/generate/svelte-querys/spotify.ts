import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/spotify'

/**
 * GET /albums
 *
 * Get Several Albums
 *
 * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 */
export function createGetAlbums(
  args: InferRequestType<typeof client.albums.$get>,
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
  return createQuery({ ...getGetAlbumsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /albums
 */
export function getGetAlbumsQueryKey(args: InferRequestType<typeof client.albums.$get>) {
  return ['/albums', args] as const
}

/**
 * Returns Svelte Query query options for GET /albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAlbumsQueryOptions = (
  args: InferRequestType<typeof client.albums.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAlbumsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.albums.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /albums/{id}
 *
 * Get Album
 *
 * Get Spotify catalog information for a single album.
 */
export function createGetAlbumsId(
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
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
  return createQuery({ ...getGetAlbumsIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /albums/{id}
 */
export function getGetAlbumsIdQueryKey(
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
) {
  return ['/albums/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /albums/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAlbumsIdQueryOptions = (
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAlbumsIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.albums[':id'].$get(args, {
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
export function createGetAlbumsIdTracks(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
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
  return createQuery({ ...getGetAlbumsIdTracksQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /albums/{id}/tracks
 */
export function getGetAlbumsIdTracksQueryKey(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
) {
  return ['/albums/:id/tracks', args] as const
}

/**
 * Returns Svelte Query query options for GET /albums/{id}/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAlbumsIdTracksQueryOptions = (
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAlbumsIdTracksQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.albums[':id'].tracks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /artists
 *
 * Get Several Artists
 *
 * Get Spotify catalog information for several artists based on their Spotify IDs.
 */
export function createGetArtists(
  args: InferRequestType<typeof client.artists.$get>,
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
  return createQuery({ ...getGetArtistsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /artists
 */
export function getGetArtistsQueryKey(args: InferRequestType<typeof client.artists.$get>) {
  return ['/artists', args] as const
}

/**
 * Returns Svelte Query query options for GET /artists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsQueryOptions = (
  args: InferRequestType<typeof client.artists.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetArtistsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.artists.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /artists/{id}
 *
 * Get Artist
 *
 * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 */
export function createGetArtistsId(
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
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
  return createQuery({ ...getGetArtistsIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}
 */
export function getGetArtistsIdQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
) {
  return ['/artists/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /artists/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetArtistsIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.artists[':id'].$get(args, {
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
export function createGetArtistsIdAlbums(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
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
  return createQuery({ ...getGetArtistsIdAlbumsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}/albums
 */
export function getGetArtistsIdAlbumsQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
) {
  return ['/artists/:id/albums', args] as const
}

/**
 * Returns Svelte Query query options for GET /artists/{id}/albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdAlbumsQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetArtistsIdAlbumsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.artists[':id'].albums.$get(args, {
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
export function createGetArtistsIdRelatedArtists(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
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
  return createQuery({
    ...getGetArtistsIdRelatedArtistsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}/related-artists
 */
export function getGetArtistsIdRelatedArtistsQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
) {
  return ['/artists/:id/related-artists', args] as const
}

/**
 * Returns Svelte Query query options for GET /artists/{id}/related-artists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdRelatedArtistsQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetArtistsIdRelatedArtistsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.artists[':id']['related-artists'].$get(args, {
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
export function createGetArtistsIdTopTracks(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
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
  return createQuery({
    ...getGetArtistsIdTopTracksQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}/top-tracks
 */
export function getGetArtistsIdTopTracksQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
) {
  return ['/artists/:id/top-tracks', args] as const
}

/**
 * Returns Svelte Query query options for GET /artists/{id}/top-tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdTopTracksQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetArtistsIdTopTracksQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.artists[':id']['top-tracks'].$get(args, {
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
export function createGetAudioAnalysisId(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
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
  return createQuery({ ...getGetAudioAnalysisIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /audio-analysis/{id}
 */
export function getGetAudioAnalysisIdQueryKey(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
) {
  return ['/audio-analysis/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /audio-analysis/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudioAnalysisIdQueryOptions = (
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAudioAnalysisIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['audio-analysis'][':id'].$get(args, {
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
export function createGetAudioFeatures(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
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
  return createQuery({ ...getGetAudioFeaturesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /audio-features
 */
export function getGetAudioFeaturesQueryKey(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
) {
  return ['/audio-features', args] as const
}

/**
 * Returns Svelte Query query options for GET /audio-features
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudioFeaturesQueryOptions = (
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAudioFeaturesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['audio-features'].$get(args, {
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
export function createGetAudioFeaturesId(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
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
  return createQuery({ ...getGetAudioFeaturesIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /audio-features/{id}
 */
export function getGetAudioFeaturesIdQueryKey(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
) {
  return ['/audio-features/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /audio-features/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudioFeaturesIdQueryOptions = (
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAudioFeaturesIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['audio-features'][':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
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
export function createGetAudiobooks(
  args: InferRequestType<typeof client.audiobooks.$get>,
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
  return createQuery({ ...getGetAudiobooksQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /audiobooks
 */
export function getGetAudiobooksQueryKey(args: InferRequestType<typeof client.audiobooks.$get>) {
  return ['/audiobooks', args] as const
}

/**
 * Returns Svelte Query query options for GET /audiobooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudiobooksQueryOptions = (
  args: InferRequestType<typeof client.audiobooks.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAudiobooksQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.audiobooks.$get(args, {
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
export function createGetAudiobooksId(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
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
  return createQuery({ ...getGetAudiobooksIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /audiobooks/{id}
 */
export function getGetAudiobooksIdQueryKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
) {
  return ['/audiobooks/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /audiobooks/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudiobooksIdQueryOptions = (
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAudiobooksIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.audiobooks[':id'].$get(args, {
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
export function createGetAudiobooksIdChapters(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
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
  return createQuery({
    ...getGetAudiobooksIdChaptersQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /audiobooks/{id}/chapters
 */
export function getGetAudiobooksIdChaptersQueryKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
) {
  return ['/audiobooks/:id/chapters', args] as const
}

/**
 * Returns Svelte Query query options for GET /audiobooks/{id}/chapters
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudiobooksIdChaptersQueryOptions = (
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAudiobooksIdChaptersQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.audiobooks[':id'].chapters.$get(args, {
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
export function createGetBrowseCategories(
  args: InferRequestType<typeof client.browse.categories.$get>,
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
  return createQuery({
    ...getGetBrowseCategoriesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /browse/categories
 */
export function getGetBrowseCategoriesQueryKey(
  args: InferRequestType<typeof client.browse.categories.$get>,
) {
  return ['/browse/categories', args] as const
}

/**
 * Returns Svelte Query query options for GET /browse/categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseCategoriesQueryOptions = (
  args: InferRequestType<typeof client.browse.categories.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetBrowseCategoriesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.browse.categories.$get(args, {
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
export function createGetBrowseCategoriesCategoryId(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
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
  return createQuery({
    ...getGetBrowseCategoriesCategoryIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /browse/categories/{category_id}
 */
export function getGetBrowseCategoriesCategoryIdQueryKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
) {
  return ['/browse/categories/:category_id', args] as const
}

/**
 * Returns Svelte Query query options for GET /browse/categories/{category_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseCategoriesCategoryIdQueryOptions = (
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetBrowseCategoriesCategoryIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.browse.categories[':category_id'].$get(args, {
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
export function createGetBrowseCategoriesCategoryIdPlaylists(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
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
  return createQuery({
    ...getGetBrowseCategoriesCategoryIdPlaylistsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /browse/categories/{category_id}/playlists
 */
export function getGetBrowseCategoriesCategoryIdPlaylistsQueryKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
) {
  return ['/browse/categories/:category_id/playlists', args] as const
}

/**
 * Returns Svelte Query query options for GET /browse/categories/{category_id}/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseCategoriesCategoryIdPlaylistsQueryOptions = (
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetBrowseCategoriesCategoryIdPlaylistsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.browse.categories[':category_id'].playlists.$get(args, {
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
export function createGetBrowseFeaturedPlaylists(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
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
  return createQuery({
    ...getGetBrowseFeaturedPlaylistsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /browse/featured-playlists
 */
export function getGetBrowseFeaturedPlaylistsQueryKey(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
) {
  return ['/browse/featured-playlists', args] as const
}

/**
 * Returns Svelte Query query options for GET /browse/featured-playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseFeaturedPlaylistsQueryOptions = (
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetBrowseFeaturedPlaylistsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.browse['featured-playlists'].$get(args, {
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
export function createGetBrowseNewReleases(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
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
  return createQuery({
    ...getGetBrowseNewReleasesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /browse/new-releases
 */
export function getGetBrowseNewReleasesQueryKey(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
) {
  return ['/browse/new-releases', args] as const
}

/**
 * Returns Svelte Query query options for GET /browse/new-releases
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseNewReleasesQueryOptions = (
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetBrowseNewReleasesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.browse['new-releases'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
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
export function createGetChapters(
  args: InferRequestType<typeof client.chapters.$get>,
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
  return createQuery({ ...getGetChaptersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /chapters
 */
export function getGetChaptersQueryKey(args: InferRequestType<typeof client.chapters.$get>) {
  return ['/chapters', args] as const
}

/**
 * Returns Svelte Query query options for GET /chapters
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChaptersQueryOptions = (
  args: InferRequestType<typeof client.chapters.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChaptersQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.chapters.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
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
export function createGetChaptersId(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
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
  return createQuery({ ...getGetChaptersIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /chapters/{id}
 */
export function getGetChaptersIdQueryKey(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
) {
  return ['/chapters/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /chapters/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChaptersIdQueryOptions = (
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChaptersIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.chapters[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /episodes
 *
 * Get Several Episodes
 *
 * Get Spotify catalog information for several episodes based on their Spotify IDs.
 */
export function createGetEpisodes(
  args: InferRequestType<typeof client.episodes.$get>,
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
  return createQuery({ ...getGetEpisodesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /episodes
 */
export function getGetEpisodesQueryKey(args: InferRequestType<typeof client.episodes.$get>) {
  return ['/episodes', args] as const
}

/**
 * Returns Svelte Query query options for GET /episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEpisodesQueryOptions = (
  args: InferRequestType<typeof client.episodes.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetEpisodesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.episodes.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
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
export function createGetEpisodesId(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
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
  return createQuery({ ...getGetEpisodesIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /episodes/{id}
 */
export function getGetEpisodesIdQueryKey(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
) {
  return ['/episodes/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /episodes/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEpisodesIdQueryOptions = (
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetEpisodesIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.episodes[':id'].$get(args, {
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
export function createGetMarkets(options?: {
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
  return createQuery({ ...getGetMarketsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /markets
 */
export function getGetMarketsQueryKey() {
  return ['/markets'] as const
}

/**
 * Returns Svelte Query query options for GET /markets
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMarketsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetMarketsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.markets.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
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
export function createGetMe(options?: {
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
  return createQuery({ ...getGetMeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me
 */
export function getGetMeQueryKey() {
  return ['/me'] as const
}

/**
 * Returns Svelte Query query options for GET /me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetMeQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /me/albums
 *
 * Get User's Saved Albums
 *
 * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeAlbums(
  args: InferRequestType<typeof client.me.albums.$get>,
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
  return createQuery({ ...getGetMeAlbumsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/albums
 */
export function getGetMeAlbumsQueryKey(args: InferRequestType<typeof client.me.albums.$get>) {
  return ['/me/albums', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAlbumsQueryOptions = (
  args: InferRequestType<typeof client.me.albums.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeAlbumsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.albums.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * PUT /me/albums
 *
 * Save Albums for Current User
 *
 * Save one or more albums to the current user's 'Your Music' library.
 */
export function createPutMeAlbums(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.albums.$put>,
      variables: InferRequestType<typeof client.me.albums.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.albums.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.albums.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.albums.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.albums.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createDeleteMeAlbums(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.albums.$delete>,
      variables: InferRequestType<typeof client.me.albums.$delete>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.albums.$delete>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.albums.$delete> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.albums.$delete>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.albums.$delete>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.albums.$delete>) =>
      parseResponse(client.me.albums.$delete(args, clientOptions)),
  })
}

/**
 * GET /me/albums/contains
 *
 * Check User's Saved Albums
 *
 * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeAlbumsContains(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
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
  return createQuery({
    ...getGetMeAlbumsContainsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /me/albums/contains
 */
export function getGetMeAlbumsContainsQueryKey(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
) {
  return ['/me/albums/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/albums/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAlbumsContainsQueryOptions = (
  args: InferRequestType<typeof client.me.albums.contains.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeAlbumsContainsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.albums.contains.$get(args, {
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
export function createGetMeAudiobooks(
  args: InferRequestType<typeof client.me.audiobooks.$get>,
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
  return createQuery({ ...getGetMeAudiobooksQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/audiobooks
 */
export function getGetMeAudiobooksQueryKey(
  args: InferRequestType<typeof client.me.audiobooks.$get>,
) {
  return ['/me/audiobooks', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/audiobooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAudiobooksQueryOptions = (
  args: InferRequestType<typeof client.me.audiobooks.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeAudiobooksQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.audiobooks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /me/audiobooks
 *
 * Save Audiobooks for Current User
 *
 * Save one or more audiobooks to the current Spotify user's library.
 */
export function createPutMeAudiobooks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.audiobooks.$put>,
      variables: InferRequestType<typeof client.me.audiobooks.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.audiobooks.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.audiobooks.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.audiobooks.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.audiobooks.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createDeleteMeAudiobooks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.audiobooks.$delete>,
      variables: InferRequestType<typeof client.me.audiobooks.$delete>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.me.audiobooks.$delete>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.audiobooks.$delete> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.audiobooks.$delete>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.audiobooks.$delete>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.audiobooks.$delete>) =>
      parseResponse(client.me.audiobooks.$delete(args, clientOptions)),
  })
}

/**
 * GET /me/audiobooks/contains
 *
 * Check User's Saved Audiobooks
 *
 * Check if one or more audiobooks are already saved in the current Spotify user's library.
 */
export function createGetMeAudiobooksContains(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
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
  return createQuery({
    ...getGetMeAudiobooksContainsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /me/audiobooks/contains
 */
export function getGetMeAudiobooksContainsQueryKey(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
) {
  return ['/me/audiobooks/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/audiobooks/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAudiobooksContainsQueryOptions = (
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeAudiobooksContainsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.audiobooks.contains.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
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
export function createGetMeEpisodes(
  args: InferRequestType<typeof client.me.episodes.$get>,
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
  return createQuery({ ...getGetMeEpisodesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/episodes
 */
export function getGetMeEpisodesQueryKey(args: InferRequestType<typeof client.me.episodes.$get>) {
  return ['/me/episodes', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeEpisodesQueryOptions = (
  args: InferRequestType<typeof client.me.episodes.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeEpisodesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.episodes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /me/episodes
 *
 * Save Episodes for Current User
 *
 * Save one or more episodes to the current user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function createPutMeEpisodes(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.episodes.$put>,
      variables: InferRequestType<typeof client.me.episodes.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.episodes.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.episodes.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.episodes.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.episodes.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createDeleteMeEpisodes(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.episodes.$delete>,
      variables: InferRequestType<typeof client.me.episodes.$delete>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.episodes.$delete>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.episodes.$delete> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.episodes.$delete>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.episodes.$delete>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.episodes.$delete>) =>
      parseResponse(client.me.episodes.$delete(args, clientOptions)),
  })
}

/**
 * GET /me/episodes/contains
 *
 * Check User's Saved Episodes
 *
 * Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer)..
 */
export function createGetMeEpisodesContains(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
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
  return createQuery({
    ...getGetMeEpisodesContainsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /me/episodes/contains
 */
export function getGetMeEpisodesContainsQueryKey(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
) {
  return ['/me/episodes/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/episodes/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeEpisodesContainsQueryOptions = (
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeEpisodesContainsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.episodes.contains.$get(args, {
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
export function createGetMeFollowing(
  args: InferRequestType<typeof client.me.following.$get>,
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
  return createQuery({ ...getGetMeFollowingQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/following
 */
export function getGetMeFollowingQueryKey(args: InferRequestType<typeof client.me.following.$get>) {
  return ['/me/following', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/following
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeFollowingQueryOptions = (
  args: InferRequestType<typeof client.me.following.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeFollowingQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.following.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /me/following
 *
 * Follow Artists or Users
 *
 * Add the current user as a follower of one or more artists or other Spotify users.
 */
export function createPutMeFollowing(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.following.$put> | undefined,
      variables: InferRequestType<typeof client.me.following.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.following.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.following.$put> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.following.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.following.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createDeleteMeFollowing(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.following.$delete>,
      variables: InferRequestType<typeof client.me.following.$delete>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.me.following.$delete>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.following.$delete> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.following.$delete>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.following.$delete>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.following.$delete>) =>
      parseResponse(client.me.following.$delete(args, clientOptions)),
  })
}

/**
 * GET /me/following/contains
 *
 * Check If User Follows Artists or Users
 *
 * Check to see if the current user is following one or more artists or other Spotify users.
 */
export function createGetMeFollowingContains(
  args: InferRequestType<typeof client.me.following.contains.$get>,
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
  return createQuery({
    ...getGetMeFollowingContainsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /me/following/contains
 */
export function getGetMeFollowingContainsQueryKey(
  args: InferRequestType<typeof client.me.following.contains.$get>,
) {
  return ['/me/following/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/following/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeFollowingContainsQueryOptions = (
  args: InferRequestType<typeof client.me.following.contains.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeFollowingContainsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.following.contains.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /me/player
 *
 * Get Playback State
 *
 * Get information about the user’s current playback state, including track or episode, progress, and active device.
 */
export function createGetMePlayer(
  args: InferRequestType<typeof client.me.player.$get>,
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
  return createQuery({ ...getGetMePlayerQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/player
 */
export function getGetMePlayerQueryKey(args: InferRequestType<typeof client.me.player.$get>) {
  return ['/me/player', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/player
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerQueryOptions = (
  args: InferRequestType<typeof client.me.player.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMePlayerQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.player.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * PUT /me/player
 *
 * Transfer Playback
 *
 * Transfer playback to a new device and determine if it should start playing.
 */
export function createPutMePlayer(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.$put> | undefined,
      variables: InferRequestType<typeof client.me.player.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.player.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.$put> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.player.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.player.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.$put>) =>
      parseResponse(client.me.player.$put(args, clientOptions)),
  })
}

/**
 * GET /me/player/currently-playing
 *
 * Get Currently Playing Track
 *
 * Get the object currently being played on the user's Spotify account.
 */
export function createGetMePlayerCurrentlyPlaying(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
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
  return createQuery({
    ...getGetMePlayerCurrentlyPlayingQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /me/player/currently-playing
 */
export function getGetMePlayerCurrentlyPlayingQueryKey(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
) {
  return ['/me/player/currently-playing', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/player/currently-playing
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerCurrentlyPlayingQueryOptions = (
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMePlayerCurrentlyPlayingQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.player['currently-playing'].$get(args, {
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
export function createGetMePlayerDevices(options?: {
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
  return createQuery({ ...getGetMePlayerDevicesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/player/devices
 */
export function getGetMePlayerDevicesQueryKey() {
  return ['/me/player/devices'] as const
}

/**
 * Returns Svelte Query query options for GET /me/player/devices
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerDevicesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetMePlayerDevicesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.player.devices.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /me/player/next
 *
 * Skip To Next
 *
 * Skips to next track in the user’s queue.
 */
export function createPostMePlayerNext(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.next.$post> | undefined,
      variables: InferRequestType<typeof client.me.player.next.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.me.player.next.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.next.$post> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.player.next.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.player.next.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createPutMePlayerPause(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.pause.$put> | undefined,
      variables: InferRequestType<typeof client.me.player.pause.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.me.player.pause.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.pause.$put> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.player.pause.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.player.pause.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createPutMePlayerPlay(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.play.$put> | undefined,
      variables: InferRequestType<typeof client.me.player.play.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.player.play.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.play.$put> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.player.play.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.player.play.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createPostMePlayerPrevious(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.previous.$post> | undefined,
      variables: InferRequestType<typeof client.me.player.previous.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.me.player.previous.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.previous.$post> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.player.previous.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.player.previous.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.previous.$post>) =>
      parseResponse(client.me.player.previous.$post(args, clientOptions)),
  })
}

/**
 * GET /me/player/queue
 *
 * Get the User's Queue
 *
 * Get the list of objects that make up the user's queue.
 */
export function createGetMePlayerQueue(options?: {
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
  return createQuery({ ...getGetMePlayerQueueQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/player/queue
 */
export function getGetMePlayerQueueQueryKey() {
  return ['/me/player/queue'] as const
}

/**
 * Returns Svelte Query query options for GET /me/player/queue
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerQueueQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetMePlayerQueueQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.player.queue.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /me/player/queue
 *
 * Add Item to Playback Queue
 *
 * Add an item to the end of the user's current playback queue.
 */
export function createPostMePlayerQueue(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.queue.$post> | undefined,
      variables: InferRequestType<typeof client.me.player.queue.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.me.player.queue.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.queue.$post> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.player.queue.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.player.queue.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.queue.$post>) =>
      parseResponse(client.me.player.queue.$post(args, clientOptions)),
  })
}

/**
 * GET /me/player/recently-played
 *
 * Get Recently Played Tracks
 *
 * Get tracks from the current user's recently played tracks.
 * _**Note**: Currently doesn't support podcast episodes._
 */
export function createGetMePlayerRecentlyPlayed(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
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
  return createQuery({
    ...getGetMePlayerRecentlyPlayedQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /me/player/recently-played
 */
export function getGetMePlayerRecentlyPlayedQueryKey(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
) {
  return ['/me/player/recently-played', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/player/recently-played
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerRecentlyPlayedQueryOptions = (
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMePlayerRecentlyPlayedQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.player['recently-played'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /me/player/repeat
 *
 * Set Repeat Mode
 *
 * Set the repeat mode for the user's playback. Options are repeat-track,
 * repeat-context, and off.
 */
export function createPutMePlayerRepeat(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.repeat.$put> | undefined,
      variables: InferRequestType<typeof client.me.player.repeat.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.me.player.repeat.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.repeat.$put> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.player.repeat.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.player.repeat.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createPutMePlayerSeek(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.seek.$put> | undefined,
      variables: InferRequestType<typeof client.me.player.seek.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.player.seek.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.seek.$put> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.player.seek.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.player.seek.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createPutMePlayerShuffle(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.shuffle.$put> | undefined,
      variables: InferRequestType<typeof client.me.player.shuffle.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.me.player.shuffle.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.shuffle.$put> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.player.shuffle.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.player.shuffle.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createPutMePlayerVolume(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.volume.$put> | undefined,
      variables: InferRequestType<typeof client.me.player.volume.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.me.player.volume.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.volume.$put> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.player.volume.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.player.volume.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.player.volume.$put>) =>
      parseResponse(client.me.player.volume.$put(args, clientOptions)),
  })
}

/**
 * GET /me/playlists
 *
 * Get Current User's Playlists
 *
 * Get a list of the playlists owned or followed by the current Spotify
 * user.
 */
export function createGetMePlaylists(
  args: InferRequestType<typeof client.me.playlists.$get>,
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
  return createQuery({ ...getGetMePlaylistsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/playlists
 */
export function getGetMePlaylistsQueryKey(args: InferRequestType<typeof client.me.playlists.$get>) {
  return ['/me/playlists', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlaylistsQueryOptions = (
  args: InferRequestType<typeof client.me.playlists.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMePlaylistsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.playlists.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /me/shows
 *
 * Get User's Saved Shows
 *
 * Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
 */
export function createGetMeShows(
  args: InferRequestType<typeof client.me.shows.$get>,
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
  return createQuery({ ...getGetMeShowsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/shows
 */
export function getGetMeShowsQueryKey(args: InferRequestType<typeof client.me.shows.$get>) {
  return ['/me/shows', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/shows
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeShowsQueryOptions = (
  args: InferRequestType<typeof client.me.shows.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeShowsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.shows.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * PUT /me/shows
 *
 * Save Shows for Current User
 *
 * Save one or more shows to current Spotify user's library.
 */
export function createPutMeShows(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.shows.$put>,
      variables: InferRequestType<typeof client.me.shows.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.shows.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.shows.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.shows.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.shows.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createDeleteMeShows(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.shows.$delete>,
      variables: InferRequestType<typeof client.me.shows.$delete>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.shows.$delete>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.shows.$delete> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.shows.$delete>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.shows.$delete>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.shows.$delete>) =>
      parseResponse(client.me.shows.$delete(args, clientOptions)),
  })
}

/**
 * GET /me/shows/contains
 *
 * Check User's Saved Shows
 *
 * Check if one or more shows is already saved in the current Spotify user's library.
 */
export function createGetMeShowsContains(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
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
  return createQuery({ ...getGetMeShowsContainsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/shows/contains
 */
export function getGetMeShowsContainsQueryKey(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
) {
  return ['/me/shows/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/shows/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeShowsContainsQueryOptions = (
  args: InferRequestType<typeof client.me.shows.contains.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeShowsContainsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.shows.contains.$get(args, {
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
export function createGetMeTopType(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
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
  return createQuery({ ...getGetMeTopTypeQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/top/{type}
 */
export function getGetMeTopTypeQueryKey(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
) {
  return ['/me/top/:type', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/top/{type}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeTopTypeQueryOptions = (
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeTopTypeQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.top[':type'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /me/tracks
 *
 * Get User's Saved Tracks
 *
 * Get a list of the songs saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeTracks(
  args: InferRequestType<typeof client.me.tracks.$get>,
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
  return createQuery({ ...getGetMeTracksQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /me/tracks
 */
export function getGetMeTracksQueryKey(args: InferRequestType<typeof client.me.tracks.$get>) {
  return ['/me/tracks', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeTracksQueryOptions = (
  args: InferRequestType<typeof client.me.tracks.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeTracksQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.tracks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * PUT /me/tracks
 *
 * Save Tracks for Current User
 *
 * Save one or more tracks to the current user's 'Your Music' library.
 */
export function createPutMeTracks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.tracks.$put>,
      variables: InferRequestType<typeof client.me.tracks.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.tracks.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.tracks.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.tracks.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.tracks.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createDeleteMeTracks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.tracks.$delete>,
      variables: InferRequestType<typeof client.me.tracks.$delete>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.tracks.$delete>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.tracks.$delete> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.tracks.$delete>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.tracks.$delete>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.tracks.$delete>) =>
      parseResponse(client.me.tracks.$delete(args, clientOptions)),
  })
}

/**
 * GET /me/tracks/contains
 *
 * Check User's Saved Tracks
 *
 * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeTracksContains(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
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
  return createQuery({
    ...getGetMeTracksContainsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /me/tracks/contains
 */
export function getGetMeTracksContainsQueryKey(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
) {
  return ['/me/tracks/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/tracks/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeTracksContainsQueryOptions = (
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMeTracksContainsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.me.tracks.contains.$get(args, {
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
export function createGetPlaylistsPlaylistId(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
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
  return createQuery({
    ...getGetPlaylistsPlaylistIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}
 */
export function getGetPlaylistsPlaylistIdQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
) {
  return ['/playlists/:playlist_id', args] as const
}

/**
 * Returns Svelte Query query options for GET /playlists/{playlist_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdQueryOptions = (
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPlaylistsPlaylistIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.playlists[':playlist_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /playlists/{playlist_id}
 *
 * Change Playlist Details
 *
 * Change a playlist's name and public/private state. (The user must, of
 * course, own the playlist.)
 */
export function createPutPlaylistsPlaylistId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.playlists)[':playlist_id']['$put']>,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.playlists)[':playlist_id']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createPutPlaylistsPlaylistIdFollowers(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createDeletePlaylistsPlaylistIdFollowers(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>,
      variables: InferRequestType<
        (typeof client.playlists)[':playlist_id']['followers']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.playlists)[':playlist_id']['followers']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.playlists)[':playlist_id']['followers']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.playlists)[':playlist_id']['followers']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>,
    ) => parseResponse(client.playlists[':playlist_id'].followers.$delete(args, clientOptions)),
  })
}

/**
 * GET /playlists/{playlist_id}/followers/contains
 *
 * Check if Users Follow Playlist
 *
 * Check to see if one or more Spotify users are following a specified playlist.
 */
export function createGetPlaylistsPlaylistIdFollowersContains(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
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
  return createQuery({
    ...getGetPlaylistsPlaylistIdFollowersContainsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}/followers/contains
 */
export function getGetPlaylistsPlaylistIdFollowersContainsQueryKey(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
) {
  return ['/playlists/:playlist_id/followers/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /playlists/{playlist_id}/followers/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdFollowersContainsQueryOptions = (
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPlaylistsPlaylistIdFollowersContainsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.playlists[':playlist_id'].followers.contains.$get(args, {
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
export function createGetPlaylistsPlaylistIdImages(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
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
  return createQuery({
    ...getGetPlaylistsPlaylistIdImagesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}/images
 */
export function getGetPlaylistsPlaylistIdImagesQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
) {
  return ['/playlists/:playlist_id/images', args] as const
}

/**
 * Returns Svelte Query query options for GET /playlists/{playlist_id}/images
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdImagesQueryOptions = (
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPlaylistsPlaylistIdImagesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.playlists[':playlist_id'].images.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /playlists/{playlist_id}/images
 *
 * Add Custom Playlist Cover Image
 *
 * Replace the image used to represent a specific playlist.
 */
export function createPutPlaylistsPlaylistIdImages(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
    ) => parseResponse(client.playlists[':playlist_id'].images.$put(args, clientOptions)),
  })
}

/**
 * GET /playlists/{playlist_id}/tracks
 *
 * Get Playlist Items
 *
 * Get full details of the items of a playlist owned by a Spotify user.
 */
export function createGetPlaylistsPlaylistIdTracks(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
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
  return createQuery({
    ...getGetPlaylistsPlaylistIdTracksQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}/tracks
 */
export function getGetPlaylistsPlaylistIdTracksQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
) {
  return ['/playlists/:playlist_id/tracks', args] as const
}

/**
 * Returns Svelte Query query options for GET /playlists/{playlist_id}/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdTracksQueryOptions = (
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPlaylistsPlaylistIdTracksQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.playlists[':playlist_id'].tracks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
export function createPutPlaylistsPlaylistIdTracks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createPostPlaylistsPlaylistIdTracks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createDeletePlaylistsPlaylistIdTracks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
    ) => parseResponse(client.playlists[':playlist_id'].tracks.$delete(args, clientOptions)),
  })
}

/**
 * GET /recommendations
 *
 * Get Recommendations
 *
 * Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.
 *
 * For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.
 */
export function createGetRecommendations(
  args: InferRequestType<typeof client.recommendations.$get>,
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
  return createQuery({ ...getGetRecommendationsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /recommendations
 */
export function getGetRecommendationsQueryKey(
  args: InferRequestType<typeof client.recommendations.$get>,
) {
  return ['/recommendations', args] as const
}

/**
 * Returns Svelte Query query options for GET /recommendations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetRecommendationsQueryOptions = (
  args: InferRequestType<typeof client.recommendations.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetRecommendationsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.recommendations.$get(args, {
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
export function createGetRecommendationsAvailableGenreSeeds(options?: {
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
  return createQuery({
    ...getGetRecommendationsAvailableGenreSeedsQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /recommendations/available-genre-seeds
 */
export function getGetRecommendationsAvailableGenreSeedsQueryKey() {
  return ['/recommendations/available-genre-seeds'] as const
}

/**
 * Returns Svelte Query query options for GET /recommendations/available-genre-seeds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetRecommendationsAvailableGenreSeedsQueryOptions = (
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetRecommendationsAvailableGenreSeedsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.recommendations['available-genre-seeds'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
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
export function createGetSearch(
  args: InferRequestType<typeof client.search.$get>,
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
  return createQuery({ ...getGetSearchQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /search
 */
export function getGetSearchQueryKey(args: InferRequestType<typeof client.search.$get>) {
  return ['/search', args] as const
}

/**
 * Returns Svelte Query query options for GET /search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchQueryOptions = (
  args: InferRequestType<typeof client.search.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSearchQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.search.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /shows
 *
 * Get Several Shows
 *
 * Get Spotify catalog information for several shows based on their Spotify IDs.
 */
export function createGetShows(
  args: InferRequestType<typeof client.shows.$get>,
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
  return createQuery({ ...getGetShowsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /shows
 */
export function getGetShowsQueryKey(args: InferRequestType<typeof client.shows.$get>) {
  return ['/shows', args] as const
}

/**
 * Returns Svelte Query query options for GET /shows
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetShowsQueryOptions = (
  args: InferRequestType<typeof client.shows.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetShowsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.shows.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
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
export function createGetShowsId(
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
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
  return createQuery({ ...getGetShowsIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /shows/{id}
 */
export function getGetShowsIdQueryKey(
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
) {
  return ['/shows/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /shows/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetShowsIdQueryOptions = (
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetShowsIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.shows[':id'].$get(args, {
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
export function createGetShowsIdEpisodes(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
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
  return createQuery({ ...getGetShowsIdEpisodesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /shows/{id}/episodes
 */
export function getGetShowsIdEpisodesQueryKey(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
) {
  return ['/shows/:id/episodes', args] as const
}

/**
 * Returns Svelte Query query options for GET /shows/{id}/episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetShowsIdEpisodesQueryOptions = (
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetShowsIdEpisodesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.shows[':id'].episodes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /tracks
 *
 * Get Several Tracks
 *
 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
 */
export function createGetTracks(
  args: InferRequestType<typeof client.tracks.$get>,
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
  return createQuery({ ...getGetTracksQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /tracks
 */
export function getGetTracksQueryKey(args: InferRequestType<typeof client.tracks.$get>) {
  return ['/tracks', args] as const
}

/**
 * Returns Svelte Query query options for GET /tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTracksQueryOptions = (
  args: InferRequestType<typeof client.tracks.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTracksQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.tracks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
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
export function createGetTracksId(
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
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
  return createQuery({ ...getGetTracksIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /tracks/{id}
 */
export function getGetTracksIdQueryKey(
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
) {
  return ['/tracks/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /tracks/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTracksIdQueryOptions = (
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTracksIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.tracks[':id'].$get(args, {
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
export function createGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
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
  return createQuery({ ...getGetUsersUserIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /users/{user_id}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['/users/:user_id', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.users[':user_id'].$get(args, {
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
export function createGetUsersUserIdPlaylists(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
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
  return createQuery({
    ...getGetUsersUserIdPlaylistsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{user_id}/playlists
 */
export function getGetUsersUserIdPlaylistsQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
) {
  return ['/users/:user_id/playlists', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{user_id}/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdPlaylistsQueryOptions = (
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetUsersUserIdPlaylistsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.users[':user_id'].playlists.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /users/{user_id}/playlists
 *
 * Create Playlist
 *
 * Create a playlist for a Spotify user. (The playlist will be empty until
 * you [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)
 */
export function createPostUsersUserIdPlaylists(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':user_id']['playlists']['$post']>,
      variables: InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':user_id']['playlists']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>,
    ) => parseResponse(client.users[':user_id'].playlists.$post(args, clientOptions)),
  })
}
