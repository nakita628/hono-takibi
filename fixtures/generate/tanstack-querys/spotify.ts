import { useQuery, useMutation } from '@tanstack/react-query'
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
export function useGetAlbums(
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
      placeholderData?:
        | InferResponseType<typeof client.albums.$get>
        | (() => InferResponseType<typeof client.albums.$get>)
      initialData?:
        | InferResponseType<typeof client.albums.$get>
        | (() => InferResponseType<typeof client.albums.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAlbumsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.albums.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /albums
 */
export function getGetAlbumsQueryKey(args: InferRequestType<typeof client.albums.$get>) {
  return ['/albums', args] as const
}

/**
 * Returns TanStack Query query options for GET /albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAlbumsQueryOptions(
  args: InferRequestType<typeof client.albums.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetAlbumsQueryKey(args),
    queryFn: async () => parseResponse(client.albums.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.albums)[':id']['$get']>
        | (() => InferResponseType<(typeof client.albums)[':id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.albums)[':id']['$get']>
        | (() => InferResponseType<(typeof client.albums)[':id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAlbumsIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.albums[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /albums/{id}
 */
export function getGetAlbumsIdQueryKey(
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
) {
  return ['/albums/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /albums/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAlbumsIdQueryOptions(
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetAlbumsIdQueryKey(args),
    queryFn: async () => parseResponse(client.albums[':id'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.albums)[':id']['tracks']['$get']>
        | (() => InferResponseType<(typeof client.albums)[':id']['tracks']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.albums)[':id']['tracks']['$get']>
        | (() => InferResponseType<(typeof client.albums)[':id']['tracks']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAlbumsIdTracksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.albums[':id'].tracks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /albums/{id}/tracks
 */
export function getGetAlbumsIdTracksQueryKey(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
) {
  return ['/albums/:id/tracks', args] as const
}

/**
 * Returns TanStack Query query options for GET /albums/{id}/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAlbumsIdTracksQueryOptions(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetAlbumsIdTracksQueryKey(args),
    queryFn: async () => parseResponse(client.albums[':id'].tracks.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.artists.$get>
        | (() => InferResponseType<typeof client.artists.$get>)
      initialData?:
        | InferResponseType<typeof client.artists.$get>
        | (() => InferResponseType<typeof client.artists.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetArtistsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.artists.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /artists
 */
export function getGetArtistsQueryKey(args: InferRequestType<typeof client.artists.$get>) {
  return ['/artists', args] as const
}

/**
 * Returns TanStack Query query options for GET /artists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetArtistsQueryOptions(
  args: InferRequestType<typeof client.artists.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetArtistsQueryKey(args),
    queryFn: async () => parseResponse(client.artists.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.artists)[':id']['$get']>
        | (() => InferResponseType<(typeof client.artists)[':id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.artists)[':id']['$get']>
        | (() => InferResponseType<(typeof client.artists)[':id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetArtistsIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.artists[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /artists/{id}
 */
export function getGetArtistsIdQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
) {
  return ['/artists/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /artists/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetArtistsIdQueryOptions(
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetArtistsIdQueryKey(args),
    queryFn: async () => parseResponse(client.artists[':id'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.artists)[':id']['albums']['$get']>
        | (() => InferResponseType<(typeof client.artists)[':id']['albums']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.artists)[':id']['albums']['$get']>
        | (() => InferResponseType<(typeof client.artists)[':id']['albums']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetArtistsIdAlbumsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.artists[':id'].albums.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /artists/{id}/albums
 */
export function getGetArtistsIdAlbumsQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
) {
  return ['/artists/:id/albums', args] as const
}

/**
 * Returns TanStack Query query options for GET /artists/{id}/albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetArtistsIdAlbumsQueryOptions(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetArtistsIdAlbumsQueryKey(args),
    queryFn: async () => parseResponse(client.artists[':id'].albums.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.artists)[':id']['related-artists']['$get']>
        | (() => InferResponseType<(typeof client.artists)[':id']['related-artists']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.artists)[':id']['related-artists']['$get']>
        | (() => InferResponseType<(typeof client.artists)[':id']['related-artists']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetArtistsIdRelatedArtistsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.artists[':id']['related-artists'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /artists/{id}/related-artists
 */
export function getGetArtistsIdRelatedArtistsQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
) {
  return ['/artists/:id/related-artists', args] as const
}

/**
 * Returns TanStack Query query options for GET /artists/{id}/related-artists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetArtistsIdRelatedArtistsQueryOptions(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetArtistsIdRelatedArtistsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.artists[':id']['related-artists'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.artists)[':id']['top-tracks']['$get']>
        | (() => InferResponseType<(typeof client.artists)[':id']['top-tracks']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.artists)[':id']['top-tracks']['$get']>
        | (() => InferResponseType<(typeof client.artists)[':id']['top-tracks']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetArtistsIdTopTracksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.artists[':id']['top-tracks'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /artists/{id}/top-tracks
 */
export function getGetArtistsIdTopTracksQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
) {
  return ['/artists/:id/top-tracks', args] as const
}

/**
 * Returns TanStack Query query options for GET /artists/{id}/top-tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetArtistsIdTopTracksQueryOptions(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetArtistsIdTopTracksQueryKey(args),
    queryFn: async () =>
      parseResponse(client.artists[':id']['top-tracks'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client)['audio-analysis'][':id']['$get']>
        | (() => InferResponseType<(typeof client)['audio-analysis'][':id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['audio-analysis'][':id']['$get']>
        | (() => InferResponseType<(typeof client)['audio-analysis'][':id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAudioAnalysisIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['audio-analysis'][':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /audio-analysis/{id}
 */
export function getGetAudioAnalysisIdQueryKey(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
) {
  return ['/audio-analysis/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /audio-analysis/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAudioAnalysisIdQueryOptions(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetAudioAnalysisIdQueryKey(args),
    queryFn: async () => parseResponse(client['audio-analysis'][':id'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client)['audio-features']['$get']>
        | (() => InferResponseType<(typeof client)['audio-features']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['audio-features']['$get']>
        | (() => InferResponseType<(typeof client)['audio-features']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAudioFeaturesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['audio-features'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /audio-features
 */
export function getGetAudioFeaturesQueryKey(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
) {
  return ['/audio-features', args] as const
}

/**
 * Returns TanStack Query query options for GET /audio-features
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAudioFeaturesQueryOptions(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetAudioFeaturesQueryKey(args),
    queryFn: async () => parseResponse(client['audio-features'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client)['audio-features'][':id']['$get']>
        | (() => InferResponseType<(typeof client)['audio-features'][':id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['audio-features'][':id']['$get']>
        | (() => InferResponseType<(typeof client)['audio-features'][':id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAudioFeaturesIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['audio-features'][':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /audio-features/{id}
 */
export function getGetAudioFeaturesIdQueryKey(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
) {
  return ['/audio-features/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /audio-features/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAudioFeaturesIdQueryOptions(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetAudioFeaturesIdQueryKey(args),
    queryFn: async () => parseResponse(client['audio-features'][':id'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.audiobooks.$get>
        | (() => InferResponseType<typeof client.audiobooks.$get>)
      initialData?:
        | InferResponseType<typeof client.audiobooks.$get>
        | (() => InferResponseType<typeof client.audiobooks.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAudiobooksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.audiobooks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /audiobooks
 */
export function getGetAudiobooksQueryKey(args: InferRequestType<typeof client.audiobooks.$get>) {
  return ['/audiobooks', args] as const
}

/**
 * Returns TanStack Query query options for GET /audiobooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAudiobooksQueryOptions(
  args: InferRequestType<typeof client.audiobooks.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetAudiobooksQueryKey(args),
    queryFn: async () => parseResponse(client.audiobooks.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.audiobooks)[':id']['$get']>
        | (() => InferResponseType<(typeof client.audiobooks)[':id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.audiobooks)[':id']['$get']>
        | (() => InferResponseType<(typeof client.audiobooks)[':id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAudiobooksIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.audiobooks[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /audiobooks/{id}
 */
export function getGetAudiobooksIdQueryKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
) {
  return ['/audiobooks/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /audiobooks/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAudiobooksIdQueryOptions(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetAudiobooksIdQueryKey(args),
    queryFn: async () => parseResponse(client.audiobooks[':id'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.audiobooks)[':id']['chapters']['$get']>
        | (() => InferResponseType<(typeof client.audiobooks)[':id']['chapters']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.audiobooks)[':id']['chapters']['$get']>
        | (() => InferResponseType<(typeof client.audiobooks)[':id']['chapters']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAudiobooksIdChaptersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.audiobooks[':id'].chapters.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /audiobooks/{id}/chapters
 */
export function getGetAudiobooksIdChaptersQueryKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
) {
  return ['/audiobooks/:id/chapters', args] as const
}

/**
 * Returns TanStack Query query options for GET /audiobooks/{id}/chapters
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAudiobooksIdChaptersQueryOptions(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetAudiobooksIdChaptersQueryKey(args),
    queryFn: async () => parseResponse(client.audiobooks[':id'].chapters.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.browse.categories.$get>
        | (() => InferResponseType<typeof client.browse.categories.$get>)
      initialData?:
        | InferResponseType<typeof client.browse.categories.$get>
        | (() => InferResponseType<typeof client.browse.categories.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetBrowseCategoriesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.browse.categories.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /browse/categories
 */
export function getGetBrowseCategoriesQueryKey(
  args: InferRequestType<typeof client.browse.categories.$get>,
) {
  return ['/browse/categories', args] as const
}

/**
 * Returns TanStack Query query options for GET /browse/categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBrowseCategoriesQueryOptions(
  args: InferRequestType<typeof client.browse.categories.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetBrowseCategoriesQueryKey(args),
    queryFn: async () => parseResponse(client.browse.categories.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.browse.categories)[':category_id']['$get']>
        | (() => InferResponseType<(typeof client.browse.categories)[':category_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.browse.categories)[':category_id']['$get']>
        | (() => InferResponseType<(typeof client.browse.categories)[':category_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetBrowseCategoriesCategoryIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.browse.categories[':category_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /browse/categories/{category_id}
 */
export function getGetBrowseCategoriesCategoryIdQueryKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
) {
  return ['/browse/categories/:category_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /browse/categories/{category_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBrowseCategoriesCategoryIdQueryOptions(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetBrowseCategoriesCategoryIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.browse.categories[':category_id'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>
        | (() => InferResponseType<
            (typeof client.browse.categories)[':category_id']['playlists']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>
        | (() => InferResponseType<
            (typeof client.browse.categories)[':category_id']['playlists']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetBrowseCategoriesCategoryIdPlaylistsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.browse.categories[':category_id'].playlists.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /browse/categories/{category_id}/playlists
 */
export function getGetBrowseCategoriesCategoryIdPlaylistsQueryKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
) {
  return ['/browse/categories/:category_id/playlists', args] as const
}

/**
 * Returns TanStack Query query options for GET /browse/categories/{category_id}/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBrowseCategoriesCategoryIdPlaylistsQueryOptions(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetBrowseCategoriesCategoryIdPlaylistsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.browse.categories[':category_id'].playlists.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.browse)['featured-playlists']['$get']>
        | (() => InferResponseType<(typeof client.browse)['featured-playlists']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.browse)['featured-playlists']['$get']>
        | (() => InferResponseType<(typeof client.browse)['featured-playlists']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetBrowseFeaturedPlaylistsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.browse['featured-playlists'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /browse/featured-playlists
 */
export function getGetBrowseFeaturedPlaylistsQueryKey(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
) {
  return ['/browse/featured-playlists', args] as const
}

/**
 * Returns TanStack Query query options for GET /browse/featured-playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBrowseFeaturedPlaylistsQueryOptions(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetBrowseFeaturedPlaylistsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.browse['featured-playlists'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.browse)['new-releases']['$get']>
        | (() => InferResponseType<(typeof client.browse)['new-releases']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.browse)['new-releases']['$get']>
        | (() => InferResponseType<(typeof client.browse)['new-releases']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetBrowseNewReleasesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.browse['new-releases'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /browse/new-releases
 */
export function getGetBrowseNewReleasesQueryKey(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
) {
  return ['/browse/new-releases', args] as const
}

/**
 * Returns TanStack Query query options for GET /browse/new-releases
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBrowseNewReleasesQueryOptions(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetBrowseNewReleasesQueryKey(args),
    queryFn: async () => parseResponse(client.browse['new-releases'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.chapters.$get>
        | (() => InferResponseType<typeof client.chapters.$get>)
      initialData?:
        | InferResponseType<typeof client.chapters.$get>
        | (() => InferResponseType<typeof client.chapters.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChaptersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.chapters.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /chapters
 */
export function getGetChaptersQueryKey(args: InferRequestType<typeof client.chapters.$get>) {
  return ['/chapters', args] as const
}

/**
 * Returns TanStack Query query options for GET /chapters
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChaptersQueryOptions(
  args: InferRequestType<typeof client.chapters.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChaptersQueryKey(args),
    queryFn: async () => parseResponse(client.chapters.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.chapters)[':id']['$get']>
        | (() => InferResponseType<(typeof client.chapters)[':id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.chapters)[':id']['$get']>
        | (() => InferResponseType<(typeof client.chapters)[':id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChaptersIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.chapters[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /chapters/{id}
 */
export function getGetChaptersIdQueryKey(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
) {
  return ['/chapters/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /chapters/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChaptersIdQueryOptions(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChaptersIdQueryKey(args),
    queryFn: async () => parseResponse(client.chapters[':id'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.episodes.$get>
        | (() => InferResponseType<typeof client.episodes.$get>)
      initialData?:
        | InferResponseType<typeof client.episodes.$get>
        | (() => InferResponseType<typeof client.episodes.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetEpisodesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.episodes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /episodes
 */
export function getGetEpisodesQueryKey(args: InferRequestType<typeof client.episodes.$get>) {
  return ['/episodes', args] as const
}

/**
 * Returns TanStack Query query options for GET /episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetEpisodesQueryOptions(
  args: InferRequestType<typeof client.episodes.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetEpisodesQueryKey(args),
    queryFn: async () => parseResponse(client.episodes.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.episodes)[':id']['$get']>
        | (() => InferResponseType<(typeof client.episodes)[':id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.episodes)[':id']['$get']>
        | (() => InferResponseType<(typeof client.episodes)[':id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetEpisodesIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.episodes[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /episodes/{id}
 */
export function getGetEpisodesIdQueryKey(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
) {
  return ['/episodes/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /episodes/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetEpisodesIdQueryOptions(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetEpisodesIdQueryKey(args),
    queryFn: async () => parseResponse(client.episodes[':id'].$get(args, clientOptions)),
  }
}

/**
 * GET /markets
 *
 * Get Available Markets
 *
 * Get the list of markets where Spotify is available.
 */
export function useGetMarkets(options?: {
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
      | InferResponseType<typeof client.markets.$get>
      | (() => InferResponseType<typeof client.markets.$get>)
    initialData?:
      | InferResponseType<typeof client.markets.$get>
      | (() => InferResponseType<typeof client.markets.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMarketsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.markets.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /markets
 */
export function getGetMarketsQueryKey() {
  return ['/markets'] as const
}

/**
 * Returns TanStack Query query options for GET /markets
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMarketsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetMarketsQueryKey(),
    queryFn: async () => parseResponse(client.markets.$get(undefined, clientOptions)),
  }
}

/**
 * GET /me
 *
 * Get Current User's Profile
 *
 * Get detailed profile information about the current user (including the
 * current user's username).
 */
export function useGetMe(options?: {
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
      | InferResponseType<typeof client.me.$get>
      | (() => InferResponseType<typeof client.me.$get>)
    initialData?:
      | InferResponseType<typeof client.me.$get>
      | (() => InferResponseType<typeof client.me.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me
 */
export function getGetMeQueryKey() {
  return ['/me'] as const
}

/**
 * Returns TanStack Query query options for GET /me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetMeQueryKey(),
    queryFn: async () => parseResponse(client.me.$get(undefined, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.me.albums.$get>
        | (() => InferResponseType<typeof client.me.albums.$get>)
      initialData?:
        | InferResponseType<typeof client.me.albums.$get>
        | (() => InferResponseType<typeof client.me.albums.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeAlbumsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.albums.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/albums
 */
export function getGetMeAlbumsQueryKey(args: InferRequestType<typeof client.me.albums.$get>) {
  return ['/me/albums', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeAlbumsQueryOptions(
  args: InferRequestType<typeof client.me.albums.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeAlbumsQueryKey(args),
    queryFn: async () => parseResponse(client.me.albums.$get(args, clientOptions)),
  }
}

/**
 * PUT /me/albums
 *
 * Save Albums for Current User
 *
 * Save one or more albums to the current user's 'Your Music' library.
 */
export function usePutMeAlbums(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.albums.$put>) =>
      parseResponse(client.me.albums.$put(args, clientOptions)),
    ...mutationOptions,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.albums.$delete>) =>
      parseResponse(client.me.albums.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

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
        | InferResponseType<typeof client.me.albums.contains.$get>
        | (() => InferResponseType<typeof client.me.albums.contains.$get>)
      initialData?:
        | InferResponseType<typeof client.me.albums.contains.$get>
        | (() => InferResponseType<typeof client.me.albums.contains.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeAlbumsContainsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.albums.contains.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/albums/contains
 */
export function getGetMeAlbumsContainsQueryKey(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
) {
  return ['/me/albums/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/albums/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeAlbumsContainsQueryOptions(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeAlbumsContainsQueryKey(args),
    queryFn: async () => parseResponse(client.me.albums.contains.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.me.audiobooks.$get>
        | (() => InferResponseType<typeof client.me.audiobooks.$get>)
      initialData?:
        | InferResponseType<typeof client.me.audiobooks.$get>
        | (() => InferResponseType<typeof client.me.audiobooks.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeAudiobooksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.audiobooks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/audiobooks
 */
export function getGetMeAudiobooksQueryKey(
  args: InferRequestType<typeof client.me.audiobooks.$get>,
) {
  return ['/me/audiobooks', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/audiobooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeAudiobooksQueryOptions(
  args: InferRequestType<typeof client.me.audiobooks.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeAudiobooksQueryKey(args),
    queryFn: async () => parseResponse(client.me.audiobooks.$get(args, clientOptions)),
  }
}

/**
 * PUT /me/audiobooks
 *
 * Save Audiobooks for Current User
 *
 * Save one or more audiobooks to the current Spotify user's library.
 */
export function usePutMeAudiobooks(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.audiobooks.$put>) =>
      parseResponse(client.me.audiobooks.$put(args, clientOptions)),
    ...mutationOptions,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.audiobooks.$delete>) =>
      parseResponse(client.me.audiobooks.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

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
        | InferResponseType<typeof client.me.audiobooks.contains.$get>
        | (() => InferResponseType<typeof client.me.audiobooks.contains.$get>)
      initialData?:
        | InferResponseType<typeof client.me.audiobooks.contains.$get>
        | (() => InferResponseType<typeof client.me.audiobooks.contains.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeAudiobooksContainsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.audiobooks.contains.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/audiobooks/contains
 */
export function getGetMeAudiobooksContainsQueryKey(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
) {
  return ['/me/audiobooks/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/audiobooks/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeAudiobooksContainsQueryOptions(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeAudiobooksContainsQueryKey(args),
    queryFn: async () => parseResponse(client.me.audiobooks.contains.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.me.episodes.$get>
        | (() => InferResponseType<typeof client.me.episodes.$get>)
      initialData?:
        | InferResponseType<typeof client.me.episodes.$get>
        | (() => InferResponseType<typeof client.me.episodes.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeEpisodesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.episodes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/episodes
 */
export function getGetMeEpisodesQueryKey(args: InferRequestType<typeof client.me.episodes.$get>) {
  return ['/me/episodes', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeEpisodesQueryOptions(
  args: InferRequestType<typeof client.me.episodes.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeEpisodesQueryKey(args),
    queryFn: async () => parseResponse(client.me.episodes.$get(args, clientOptions)),
  }
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.episodes.$put>) =>
      parseResponse(client.me.episodes.$put(args, clientOptions)),
    ...mutationOptions,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.episodes.$delete>) =>
      parseResponse(client.me.episodes.$delete(args, clientOptions)),
    ...mutationOptions,
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
export function useGetMeEpisodesContains(
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
      placeholderData?:
        | InferResponseType<typeof client.me.episodes.contains.$get>
        | (() => InferResponseType<typeof client.me.episodes.contains.$get>)
      initialData?:
        | InferResponseType<typeof client.me.episodes.contains.$get>
        | (() => InferResponseType<typeof client.me.episodes.contains.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeEpisodesContainsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.episodes.contains.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/episodes/contains
 */
export function getGetMeEpisodesContainsQueryKey(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
) {
  return ['/me/episodes/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/episodes/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeEpisodesContainsQueryOptions(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeEpisodesContainsQueryKey(args),
    queryFn: async () => parseResponse(client.me.episodes.contains.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.me.following.$get>
        | (() => InferResponseType<typeof client.me.following.$get>)
      initialData?:
        | InferResponseType<typeof client.me.following.$get>
        | (() => InferResponseType<typeof client.me.following.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeFollowingQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.following.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/following
 */
export function getGetMeFollowingQueryKey(args: InferRequestType<typeof client.me.following.$get>) {
  return ['/me/following', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/following
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeFollowingQueryOptions(
  args: InferRequestType<typeof client.me.following.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeFollowingQueryKey(args),
    queryFn: async () => parseResponse(client.me.following.$get(args, clientOptions)),
  }
}

/**
 * PUT /me/following
 *
 * Follow Artists or Users
 *
 * Add the current user as a follower of one or more artists or other Spotify users.
 */
export function usePutMeFollowing(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.following.$put> | undefined,
      variables: InferRequestType<typeof client.me.following.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.following.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.following.$put> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.following.$put>) =>
      parseResponse(client.me.following.$put(args, clientOptions)),
    ...mutationOptions,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.following.$delete>) =>
      parseResponse(client.me.following.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

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
        | InferResponseType<typeof client.me.following.contains.$get>
        | (() => InferResponseType<typeof client.me.following.contains.$get>)
      initialData?:
        | InferResponseType<typeof client.me.following.contains.$get>
        | (() => InferResponseType<typeof client.me.following.contains.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeFollowingContainsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.following.contains.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/following/contains
 */
export function getGetMeFollowingContainsQueryKey(
  args: InferRequestType<typeof client.me.following.contains.$get>,
) {
  return ['/me/following/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/following/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeFollowingContainsQueryOptions(
  args: InferRequestType<typeof client.me.following.contains.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeFollowingContainsQueryKey(args),
    queryFn: async () => parseResponse(client.me.following.contains.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.me.player.$get>
        | (() => InferResponseType<typeof client.me.player.$get>)
      initialData?:
        | InferResponseType<typeof client.me.player.$get>
        | (() => InferResponseType<typeof client.me.player.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMePlayerQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.player.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/player
 */
export function getGetMePlayerQueryKey(args: InferRequestType<typeof client.me.player.$get>) {
  return ['/me/player', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/player
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMePlayerQueryOptions(
  args: InferRequestType<typeof client.me.player.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMePlayerQueryKey(args),
    queryFn: async () => parseResponse(client.me.player.$get(args, clientOptions)),
  }
}

/**
 * PUT /me/player
 *
 * Transfer Playback
 *
 * Transfer playback to a new device and determine if it should start playing.
 */
export function usePutMePlayer(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.$put> | undefined,
      variables: InferRequestType<typeof client.me.player.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.player.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.$put> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.player.$put>) =>
      parseResponse(client.me.player.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

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
        | InferResponseType<(typeof client.me.player)['currently-playing']['$get']>
        | (() => InferResponseType<(typeof client.me.player)['currently-playing']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.me.player)['currently-playing']['$get']>
        | (() => InferResponseType<(typeof client.me.player)['currently-playing']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMePlayerCurrentlyPlayingQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.player['currently-playing'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/player/currently-playing
 */
export function getGetMePlayerCurrentlyPlayingQueryKey(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
) {
  return ['/me/player/currently-playing', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/player/currently-playing
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMePlayerCurrentlyPlayingQueryOptions(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMePlayerCurrentlyPlayingQueryKey(args),
    queryFn: async () =>
      parseResponse(client.me.player['currently-playing'].$get(args, clientOptions)),
  }
}

/**
 * GET /me/player/devices
 *
 * Get Available Devices
 *
 * Get information about a user’s available devices.
 */
export function useGetMePlayerDevices(options?: {
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
      | InferResponseType<typeof client.me.player.devices.$get>
      | (() => InferResponseType<typeof client.me.player.devices.$get>)
    initialData?:
      | InferResponseType<typeof client.me.player.devices.$get>
      | (() => InferResponseType<typeof client.me.player.devices.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMePlayerDevicesQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.player.devices.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/player/devices
 */
export function getGetMePlayerDevicesQueryKey() {
  return ['/me/player/devices'] as const
}

/**
 * Returns TanStack Query query options for GET /me/player/devices
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMePlayerDevicesQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetMePlayerDevicesQueryKey(),
    queryFn: async () => parseResponse(client.me.player.devices.$get(undefined, clientOptions)),
  }
}

/**
 * POST /me/player/next
 *
 * Skip To Next
 *
 * Skips to next track in the user’s queue.
 */
export function usePostMePlayerNext(options?: {
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
      data: InferResponseType<typeof client.me.player.next.$post> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.player.next.$post>) =>
      parseResponse(client.me.player.next.$post(args, clientOptions)),
    ...mutationOptions,
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
      data: InferResponseType<typeof client.me.player.pause.$put> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.player.pause.$put>) =>
      parseResponse(client.me.player.pause.$put(args, clientOptions)),
    ...mutationOptions,
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.play.$put> | undefined,
      variables: InferRequestType<typeof client.me.player.play.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.player.play.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.play.$put> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.player.play.$put>) =>
      parseResponse(client.me.player.play.$put(args, clientOptions)),
    ...mutationOptions,
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
      data: InferResponseType<typeof client.me.player.previous.$post> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.player.previous.$post>) =>
      parseResponse(client.me.player.previous.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /me/player/queue
 *
 * Get the User's Queue
 *
 * Get the list of objects that make up the user's queue.
 */
export function useGetMePlayerQueue(options?: {
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
      | InferResponseType<typeof client.me.player.queue.$get>
      | (() => InferResponseType<typeof client.me.player.queue.$get>)
    initialData?:
      | InferResponseType<typeof client.me.player.queue.$get>
      | (() => InferResponseType<typeof client.me.player.queue.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMePlayerQueueQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.player.queue.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/player/queue
 */
export function getGetMePlayerQueueQueryKey() {
  return ['/me/player/queue'] as const
}

/**
 * Returns TanStack Query query options for GET /me/player/queue
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMePlayerQueueQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetMePlayerQueueQueryKey(),
    queryFn: async () => parseResponse(client.me.player.queue.$get(undefined, clientOptions)),
  }
}

/**
 * POST /me/player/queue
 *
 * Add Item to Playback Queue
 *
 * Add an item to the end of the user's current playback queue.
 */
export function usePostMePlayerQueue(options?: {
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
      data: InferResponseType<typeof client.me.player.queue.$post> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.player.queue.$post>) =>
      parseResponse(client.me.player.queue.$post(args, clientOptions)),
    ...mutationOptions,
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
export function useGetMePlayerRecentlyPlayed(
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
      placeholderData?:
        | InferResponseType<(typeof client.me.player)['recently-played']['$get']>
        | (() => InferResponseType<(typeof client.me.player)['recently-played']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.me.player)['recently-played']['$get']>
        | (() => InferResponseType<(typeof client.me.player)['recently-played']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMePlayerRecentlyPlayedQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.player['recently-played'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/player/recently-played
 */
export function getGetMePlayerRecentlyPlayedQueryKey(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
) {
  return ['/me/player/recently-played', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/player/recently-played
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMePlayerRecentlyPlayedQueryOptions(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMePlayerRecentlyPlayedQueryKey(args),
    queryFn: async () =>
      parseResponse(client.me.player['recently-played'].$get(args, clientOptions)),
  }
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
      data: InferResponseType<typeof client.me.player.repeat.$put> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.player.repeat.$put>) =>
      parseResponse(client.me.player.repeat.$put(args, clientOptions)),
    ...mutationOptions,
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.player.seek.$put> | undefined,
      variables: InferRequestType<typeof client.me.player.seek.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.player.seek.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.player.seek.$put> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.player.seek.$put>) =>
      parseResponse(client.me.player.seek.$put(args, clientOptions)),
    ...mutationOptions,
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
      data: InferResponseType<typeof client.me.player.shuffle.$put> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.player.shuffle.$put>) =>
      parseResponse(client.me.player.shuffle.$put(args, clientOptions)),
    ...mutationOptions,
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
      data: InferResponseType<typeof client.me.player.volume.$put> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.player.volume.$put>) =>
      parseResponse(client.me.player.volume.$put(args, clientOptions)),
    ...mutationOptions,
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
export function useGetMePlaylists(
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
      placeholderData?:
        | InferResponseType<typeof client.me.playlists.$get>
        | (() => InferResponseType<typeof client.me.playlists.$get>)
      initialData?:
        | InferResponseType<typeof client.me.playlists.$get>
        | (() => InferResponseType<typeof client.me.playlists.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMePlaylistsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.playlists.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/playlists
 */
export function getGetMePlaylistsQueryKey(args: InferRequestType<typeof client.me.playlists.$get>) {
  return ['/me/playlists', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMePlaylistsQueryOptions(
  args: InferRequestType<typeof client.me.playlists.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMePlaylistsQueryKey(args),
    queryFn: async () => parseResponse(client.me.playlists.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.me.shows.$get>
        | (() => InferResponseType<typeof client.me.shows.$get>)
      initialData?:
        | InferResponseType<typeof client.me.shows.$get>
        | (() => InferResponseType<typeof client.me.shows.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeShowsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.shows.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/shows
 */
export function getGetMeShowsQueryKey(args: InferRequestType<typeof client.me.shows.$get>) {
  return ['/me/shows', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/shows
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeShowsQueryOptions(
  args: InferRequestType<typeof client.me.shows.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeShowsQueryKey(args),
    queryFn: async () => parseResponse(client.me.shows.$get(args, clientOptions)),
  }
}

/**
 * PUT /me/shows
 *
 * Save Shows for Current User
 *
 * Save one or more shows to current Spotify user's library.
 */
export function usePutMeShows(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.shows.$put>) =>
      parseResponse(client.me.shows.$put(args, clientOptions)),
    ...mutationOptions,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.shows.$delete>) =>
      parseResponse(client.me.shows.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

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
        | InferResponseType<typeof client.me.shows.contains.$get>
        | (() => InferResponseType<typeof client.me.shows.contains.$get>)
      initialData?:
        | InferResponseType<typeof client.me.shows.contains.$get>
        | (() => InferResponseType<typeof client.me.shows.contains.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeShowsContainsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.shows.contains.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/shows/contains
 */
export function getGetMeShowsContainsQueryKey(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
) {
  return ['/me/shows/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/shows/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeShowsContainsQueryOptions(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeShowsContainsQueryKey(args),
    queryFn: async () => parseResponse(client.me.shows.contains.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.me.top)[':type']['$get']>
        | (() => InferResponseType<(typeof client.me.top)[':type']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.me.top)[':type']['$get']>
        | (() => InferResponseType<(typeof client.me.top)[':type']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeTopTypeQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.top[':type'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/top/{type}
 */
export function getGetMeTopTypeQueryKey(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
) {
  return ['/me/top/:type', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/top/{type}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeTopTypeQueryOptions(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeTopTypeQueryKey(args),
    queryFn: async () => parseResponse(client.me.top[':type'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.me.tracks.$get>
        | (() => InferResponseType<typeof client.me.tracks.$get>)
      initialData?:
        | InferResponseType<typeof client.me.tracks.$get>
        | (() => InferResponseType<typeof client.me.tracks.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeTracksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.tracks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/tracks
 */
export function getGetMeTracksQueryKey(args: InferRequestType<typeof client.me.tracks.$get>) {
  return ['/me/tracks', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeTracksQueryOptions(
  args: InferRequestType<typeof client.me.tracks.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeTracksQueryKey(args),
    queryFn: async () => parseResponse(client.me.tracks.$get(args, clientOptions)),
  }
}

/**
 * PUT /me/tracks
 *
 * Save Tracks for Current User
 *
 * Save one or more tracks to the current user's 'Your Music' library.
 */
export function usePutMeTracks(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.tracks.$put>) =>
      parseResponse(client.me.tracks.$put(args, clientOptions)),
    ...mutationOptions,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.tracks.$delete>) =>
      parseResponse(client.me.tracks.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

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
        | InferResponseType<typeof client.me.tracks.contains.$get>
        | (() => InferResponseType<typeof client.me.tracks.contains.$get>)
      initialData?:
        | InferResponseType<typeof client.me.tracks.contains.$get>
        | (() => InferResponseType<typeof client.me.tracks.contains.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMeTracksContainsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.tracks.contains.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /me/tracks/contains
 */
export function getGetMeTracksContainsQueryKey(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
) {
  return ['/me/tracks/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /me/tracks/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeTracksContainsQueryOptions(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMeTracksContainsQueryKey(args),
    queryFn: async () => parseResponse(client.me.tracks.contains.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.playlists)[':playlist_id']['$get']>
        | (() => InferResponseType<(typeof client.playlists)[':playlist_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.playlists)[':playlist_id']['$get']>
        | (() => InferResponseType<(typeof client.playlists)[':playlist_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPlaylistsPlaylistIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.playlists[':playlist_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /playlists/{playlist_id}
 */
export function getGetPlaylistsPlaylistIdQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
) {
  return ['/playlists/:playlist_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /playlists/{playlist_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPlaylistsPlaylistIdQueryOptions(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPlaylistsPlaylistIdQueryKey(args),
    queryFn: async () => parseResponse(client.playlists[':playlist_id'].$get(args, clientOptions)),
  }
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>) =>
      parseResponse(client.playlists[':playlist_id'].$put(args, clientOptions)),
    ...mutationOptions,
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
    ) => parseResponse(client.playlists[':playlist_id'].followers.$put(args, clientOptions)),
    ...mutationOptions,
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>,
    ) => parseResponse(client.playlists[':playlist_id'].followers.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

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
        | InferResponseType<
            (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
          >
        | (() => InferResponseType<
            (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
          >
        | (() => InferResponseType<
            (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPlaylistsPlaylistIdFollowersContainsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.playlists[':playlist_id'].followers.contains.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /playlists/{playlist_id}/followers/contains
 */
export function getGetPlaylistsPlaylistIdFollowersContainsQueryKey(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
) {
  return ['/playlists/:playlist_id/followers/contains', args] as const
}

/**
 * Returns TanStack Query query options for GET /playlists/{playlist_id}/followers/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPlaylistsPlaylistIdFollowersContainsQueryOptions(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPlaylistsPlaylistIdFollowersContainsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.playlists[':playlist_id'].followers.contains.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$get']>
        | (() => InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$get']>
        | (() => InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPlaylistsPlaylistIdImagesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.playlists[':playlist_id'].images.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /playlists/{playlist_id}/images
 */
export function getGetPlaylistsPlaylistIdImagesQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
) {
  return ['/playlists/:playlist_id/images', args] as const
}

/**
 * Returns TanStack Query query options for GET /playlists/{playlist_id}/images
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPlaylistsPlaylistIdImagesQueryOptions(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPlaylistsPlaylistIdImagesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.playlists[':playlist_id'].images.$get(args, clientOptions)),
  }
}

/**
 * PUT /playlists/{playlist_id}/images
 *
 * Add Custom Playlist Cover Image
 *
 * Replace the image used to represent a specific playlist.
 */
export function usePutPlaylistsPlaylistIdImages(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
    ) => parseResponse(client.playlists[':playlist_id'].images.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

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
        | InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>
        | (() => InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>
        | (() => InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPlaylistsPlaylistIdTracksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.playlists[':playlist_id'].tracks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /playlists/{playlist_id}/tracks
 */
export function getGetPlaylistsPlaylistIdTracksQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
) {
  return ['/playlists/:playlist_id/tracks', args] as const
}

/**
 * Returns TanStack Query query options for GET /playlists/{playlist_id}/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPlaylistsPlaylistIdTracksQueryOptions(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPlaylistsPlaylistIdTracksQueryKey(args),
    queryFn: async () =>
      parseResponse(client.playlists[':playlist_id'].tracks.$get(args, clientOptions)),
  }
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
    ) => parseResponse(client.playlists[':playlist_id'].tracks.$put(args, clientOptions)),
    ...mutationOptions,
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
    ) => parseResponse(client.playlists[':playlist_id'].tracks.$post(args, clientOptions)),
    ...mutationOptions,
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
    ) => parseResponse(client.playlists[':playlist_id'].tracks.$delete(args, clientOptions)),
    ...mutationOptions,
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
export function useGetRecommendations(
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
      placeholderData?:
        | InferResponseType<typeof client.recommendations.$get>
        | (() => InferResponseType<typeof client.recommendations.$get>)
      initialData?:
        | InferResponseType<typeof client.recommendations.$get>
        | (() => InferResponseType<typeof client.recommendations.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetRecommendationsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.recommendations.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /recommendations
 */
export function getGetRecommendationsQueryKey(
  args: InferRequestType<typeof client.recommendations.$get>,
) {
  return ['/recommendations', args] as const
}

/**
 * Returns TanStack Query query options for GET /recommendations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetRecommendationsQueryOptions(
  args: InferRequestType<typeof client.recommendations.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetRecommendationsQueryKey(args),
    queryFn: async () => parseResponse(client.recommendations.$get(args, clientOptions)),
  }
}

/**
 * GET /recommendations/available-genre-seeds
 *
 * Get Available Genre Seeds
 *
 * Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).
 */
export function useGetRecommendationsAvailableGenreSeeds(options?: {
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
      | InferResponseType<(typeof client.recommendations)['available-genre-seeds']['$get']>
      | (() => InferResponseType<(typeof client.recommendations)['available-genre-seeds']['$get']>)
    initialData?:
      | InferResponseType<(typeof client.recommendations)['available-genre-seeds']['$get']>
      | (() => InferResponseType<(typeof client.recommendations)['available-genre-seeds']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetRecommendationsAvailableGenreSeedsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.recommendations['available-genre-seeds'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /recommendations/available-genre-seeds
 */
export function getGetRecommendationsAvailableGenreSeedsQueryKey() {
  return ['/recommendations/available-genre-seeds'] as const
}

/**
 * Returns TanStack Query query options for GET /recommendations/available-genre-seeds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetRecommendationsAvailableGenreSeedsQueryOptions(
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetRecommendationsAvailableGenreSeedsQueryKey(),
    queryFn: async () =>
      parseResponse(client.recommendations['available-genre-seeds'].$get(undefined, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.search.$get>
        | (() => InferResponseType<typeof client.search.$get>)
      initialData?:
        | InferResponseType<typeof client.search.$get>
        | (() => InferResponseType<typeof client.search.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSearchQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.search.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /search
 */
export function getGetSearchQueryKey(args: InferRequestType<typeof client.search.$get>) {
  return ['/search', args] as const
}

/**
 * Returns TanStack Query query options for GET /search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSearchQueryOptions(
  args: InferRequestType<typeof client.search.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSearchQueryKey(args),
    queryFn: async () => parseResponse(client.search.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.shows.$get>
        | (() => InferResponseType<typeof client.shows.$get>)
      initialData?:
        | InferResponseType<typeof client.shows.$get>
        | (() => InferResponseType<typeof client.shows.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetShowsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.shows.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /shows
 */
export function getGetShowsQueryKey(args: InferRequestType<typeof client.shows.$get>) {
  return ['/shows', args] as const
}

/**
 * Returns TanStack Query query options for GET /shows
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetShowsQueryOptions(
  args: InferRequestType<typeof client.shows.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetShowsQueryKey(args),
    queryFn: async () => parseResponse(client.shows.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.shows)[':id']['$get']>
        | (() => InferResponseType<(typeof client.shows)[':id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.shows)[':id']['$get']>
        | (() => InferResponseType<(typeof client.shows)[':id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetShowsIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.shows[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /shows/{id}
 */
export function getGetShowsIdQueryKey(
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
) {
  return ['/shows/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /shows/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetShowsIdQueryOptions(
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetShowsIdQueryKey(args),
    queryFn: async () => parseResponse(client.shows[':id'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.shows)[':id']['episodes']['$get']>
        | (() => InferResponseType<(typeof client.shows)[':id']['episodes']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.shows)[':id']['episodes']['$get']>
        | (() => InferResponseType<(typeof client.shows)[':id']['episodes']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetShowsIdEpisodesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.shows[':id'].episodes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /shows/{id}/episodes
 */
export function getGetShowsIdEpisodesQueryKey(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
) {
  return ['/shows/:id/episodes', args] as const
}

/**
 * Returns TanStack Query query options for GET /shows/{id}/episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetShowsIdEpisodesQueryOptions(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetShowsIdEpisodesQueryKey(args),
    queryFn: async () => parseResponse(client.shows[':id'].episodes.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<typeof client.tracks.$get>
        | (() => InferResponseType<typeof client.tracks.$get>)
      initialData?:
        | InferResponseType<typeof client.tracks.$get>
        | (() => InferResponseType<typeof client.tracks.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTracksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.tracks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /tracks
 */
export function getGetTracksQueryKey(args: InferRequestType<typeof client.tracks.$get>) {
  return ['/tracks', args] as const
}

/**
 * Returns TanStack Query query options for GET /tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTracksQueryOptions(
  args: InferRequestType<typeof client.tracks.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetTracksQueryKey(args),
    queryFn: async () => parseResponse(client.tracks.$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.tracks)[':id']['$get']>
        | (() => InferResponseType<(typeof client.tracks)[':id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.tracks)[':id']['$get']>
        | (() => InferResponseType<(typeof client.tracks)[':id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTracksIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.tracks[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /tracks/{id}
 */
export function getGetTracksIdQueryKey(
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
) {
  return ['/tracks/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /tracks/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTracksIdQueryOptions(
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetTracksIdQueryKey(args),
    queryFn: async () => parseResponse(client.tracks[':id'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.users)[':user_id']['$get']>
        | (() => InferResponseType<(typeof client.users)[':user_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.users)[':user_id']['$get']>
        | (() => InferResponseType<(typeof client.users)[':user_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users[':user_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/{user_id}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['/users/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersUserIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
  }
}

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
        | InferResponseType<(typeof client.users)[':user_id']['playlists']['$get']>
        | (() => InferResponseType<(typeof client.users)[':user_id']['playlists']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.users)[':user_id']['playlists']['$get']>
        | (() => InferResponseType<(typeof client.users)[':user_id']['playlists']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersUserIdPlaylistsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users[':user_id'].playlists.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/{user_id}/playlists
 */
export function getGetUsersUserIdPlaylistsQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
) {
  return ['/users/:user_id/playlists', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/{user_id}/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersUserIdPlaylistsQueryOptions(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersUserIdPlaylistsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.users[':user_id'].playlists.$get(args, clientOptions)),
  }
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>,
    ) => parseResponse(client.users[':user_id'].playlists.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
