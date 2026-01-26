import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAlbumsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.albums.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /albums
 */
export function getGetAlbumsKey(args?: InferRequestType<typeof client.albums.$get>) {
  return ['/albums', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAlbumsIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.albums[':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /albums/{id}
 */
export function getGetAlbumsIdKey(args?: InferRequestType<(typeof client.albums)[':id']['$get']>) {
  return ['/albums/:id', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAlbumsIdTracksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.albums[':id'].tracks.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /albums/{id}/tracks
 */
export function getGetAlbumsIdTracksKey(
  args?: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
) {
  return ['/albums/:id/tracks', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetArtistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.artists.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /artists
 */
export function getGetArtistsKey(args?: InferRequestType<typeof client.artists.$get>) {
  return ['/artists', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetArtistsIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.artists[':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /artists/{id}
 */
export function getGetArtistsIdKey(
  args?: InferRequestType<(typeof client.artists)[':id']['$get']>,
) {
  return ['/artists/:id', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetArtistsIdAlbumsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.artists[':id'].albums.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /artists/{id}/albums
 */
export function getGetArtistsIdAlbumsKey(
  args?: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
) {
  return ['/artists/:id/albums', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetArtistsIdRelatedArtistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.artists[':id']['related-artists'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /artists/{id}/related-artists
 */
export function getGetArtistsIdRelatedArtistsKey(
  args?: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
) {
  return ['/artists/:id/related-artists', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetArtistsIdTopTracksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.artists[':id']['top-tracks'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /artists/{id}/top-tracks
 */
export function getGetArtistsIdTopTracksKey(
  args?: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
) {
  return ['/artists/:id/top-tracks', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAudioAnalysisIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['audio-analysis'][':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audio-analysis/{id}
 */
export function getGetAudioAnalysisIdKey(
  args?: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
) {
  return ['/audio-analysis/:id', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAudioFeaturesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['audio-features'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audio-features
 */
export function getGetAudioFeaturesKey(
  args?: InferRequestType<(typeof client)['audio-features']['$get']>,
) {
  return ['/audio-features', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAudioFeaturesIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['audio-features'][':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audio-features/{id}
 */
export function getGetAudioFeaturesIdKey(
  args?: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
) {
  return ['/audio-features/:id', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAudiobooksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.audiobooks.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audiobooks
 */
export function getGetAudiobooksKey(args?: InferRequestType<typeof client.audiobooks.$get>) {
  return ['/audiobooks', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAudiobooksIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.audiobooks[':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audiobooks/{id}
 */
export function getGetAudiobooksIdKey(
  args?: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
) {
  return ['/audiobooks/:id', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAudiobooksIdChaptersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.audiobooks[':id'].chapters.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audiobooks/{id}/chapters
 */
export function getGetAudiobooksIdChaptersKey(
  args?: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
) {
  return ['/audiobooks/:id/chapters', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetBrowseCategoriesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.browse.categories.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /browse/categories
 */
export function getGetBrowseCategoriesKey(
  args?: InferRequestType<typeof client.browse.categories.$get>,
) {
  return ['/browse/categories', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetBrowseCategoriesCategoryIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.browse.categories[':category_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /browse/categories/{category_id}
 */
export function getGetBrowseCategoriesCategoryIdKey(
  args?: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
) {
  return ['/browse/categories/:category_id', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetBrowseCategoriesCategoryIdPlaylistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.browse.categories[':category_id'].playlists.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /browse/categories/{category_id}/playlists
 */
export function getGetBrowseCategoriesCategoryIdPlaylistsKey(
  args?: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
) {
  return ['/browse/categories/:category_id/playlists', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetBrowseFeaturedPlaylistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.browse['featured-playlists'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /browse/featured-playlists
 */
export function getGetBrowseFeaturedPlaylistsKey(
  args?: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
) {
  return ['/browse/featured-playlists', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetBrowseNewReleasesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.browse['new-releases'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /browse/new-releases
 */
export function getGetBrowseNewReleasesKey(
  args?: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
) {
  return ['/browse/new-releases', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetChaptersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.chapters.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /chapters
 */
export function getGetChaptersKey(args?: InferRequestType<typeof client.chapters.$get>) {
  return ['/chapters', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetChaptersIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.chapters[':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /chapters/{id}
 */
export function getGetChaptersIdKey(
  args?: InferRequestType<(typeof client.chapters)[':id']['$get']>,
) {
  return ['/chapters/:id', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEpisodesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.episodes.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /episodes
 */
export function getGetEpisodesKey(args?: InferRequestType<typeof client.episodes.$get>) {
  return ['/episodes', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEpisodesIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.episodes[':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /episodes/{id}
 */
export function getGetEpisodesIdKey(
  args?: InferRequestType<(typeof client.episodes)[':id']['$get']>,
) {
  return ['/episodes/:id', ...(args ? [args] : [])] as const
}

/**
 * GET /markets
 *
 * Get Available Markets
 *
 * Get the list of markets where Spotify is available.
 */
export function useGetMarkets(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMarketsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.markets.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /markets
 */
export function getGetMarketsKey() {
  return ['/markets'] as const
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me
 */
export function getGetMeKey() {
  return ['/me'] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeAlbumsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.albums.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/albums
 */
export function getGetMeAlbumsKey(args?: InferRequestType<typeof client.me.albums.$get>) {
  return ['/me/albums', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/albums
 *
 * Save Albums for Current User
 *
 * Save one or more albums to the current user's 'Your Music' library.
 */
export function usePutMeAlbums(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.albums.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.albums.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/albums',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.albums.$put> }) =>
      parseResponse(client.me.albums.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /me/albums
 *
 * Remove Users' Saved Albums
 *
 * Remove one or more albums from the current user's 'Your Music' library.
 */
export function useDeleteMeAlbums(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.albums.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.albums.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /me/albums',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.albums.$delete> }) =>
      parseResponse(client.me.albums.$delete(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeAlbumsContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.albums.contains.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/albums/contains
 */
export function getGetMeAlbumsContainsKey(
  args?: InferRequestType<typeof client.me.albums.contains.$get>,
) {
  return ['/me/albums/contains', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeAudiobooksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.audiobooks.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/audiobooks
 */
export function getGetMeAudiobooksKey(args?: InferRequestType<typeof client.me.audiobooks.$get>) {
  return ['/me/audiobooks', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/audiobooks
 *
 * Save Audiobooks for Current User
 *
 * Save one or more audiobooks to the current Spotify user's library.
 */
export function usePutMeAudiobooks(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.audiobooks.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.audiobooks.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/audiobooks',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.audiobooks.$put> }) =>
      parseResponse(client.me.audiobooks.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /me/audiobooks
 *
 * Remove User's Saved Audiobooks
 *
 * Remove one or more audiobooks from the Spotify user's library.
 */
export function useDeleteMeAudiobooks(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.audiobooks.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.audiobooks.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /me/audiobooks',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.audiobooks.$delete> }) =>
      parseResponse(client.me.audiobooks.$delete(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeAudiobooksContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.audiobooks.contains.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/audiobooks/contains
 */
export function getGetMeAudiobooksContainsKey(
  args?: InferRequestType<typeof client.me.audiobooks.contains.$get>,
) {
  return ['/me/audiobooks/contains', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeEpisodesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.episodes.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/episodes
 */
export function getGetMeEpisodesKey(args?: InferRequestType<typeof client.me.episodes.$get>) {
  return ['/me/episodes', ...(args ? [args] : [])] as const
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.episodes.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.episodes.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/episodes',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.episodes.$put> }) =>
      parseResponse(client.me.episodes.$put(arg, clientOptions)),
    mutationOptions,
  )
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.episodes.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.episodes.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /me/episodes',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.episodes.$delete> }) =>
      parseResponse(client.me.episodes.$delete(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeEpisodesContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.episodes.contains.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/episodes/contains
 */
export function getGetMeEpisodesContainsKey(
  args?: InferRequestType<typeof client.me.episodes.contains.$get>,
) {
  return ['/me/episodes/contains', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeFollowingKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.following.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/following
 */
export function getGetMeFollowingKey(args?: InferRequestType<typeof client.me.following.$get>) {
  return ['/me/following', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/following
 *
 * Follow Artists or Users
 *
 * Add the current user as a follower of one or more artists or other Spotify users.
 */
export function usePutMeFollowing(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.following.$put> | undefined,
    Error,
    string,
    InferRequestType<typeof client.me.following.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/following',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.following.$put> }) =>
      parseResponse(client.me.following.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /me/following
 *
 * Unfollow Artists or Users
 *
 * Remove the current user as a follower of one or more artists or other Spotify users.
 */
export function useDeleteMeFollowing(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.following.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.following.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /me/following',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.following.$delete> }) =>
      parseResponse(client.me.following.$delete(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeFollowingContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.following.contains.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/following/contains
 */
export function getGetMeFollowingContainsKey(
  args?: InferRequestType<typeof client.me.following.contains.$get>,
) {
  return ['/me/following/contains', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMePlayerKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.player.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/player
 */
export function getGetMePlayerKey(args?: InferRequestType<typeof client.me.player.$get>) {
  return ['/me/player', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/player
 *
 * Transfer Playback
 *
 * Transfer playback to a new device and determine if it should start playing.
 */
export function usePutMePlayer(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.$put> | undefined,
    Error,
    string,
    InferRequestType<typeof client.me.player.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/player',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.player.$put> }) =>
      parseResponse(client.me.player.$put(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMePlayerCurrentlyPlayingKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.player['currently-playing'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/player/currently-playing
 */
export function getGetMePlayerCurrentlyPlayingKey(
  args?: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
) {
  return ['/me/player/currently-playing', ...(args ? [args] : [])] as const
}

/**
 * GET /me/player/devices
 *
 * Get Available Devices
 *
 * Get information about a user’s available devices.
 */
export function useGetMePlayerDevices(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMePlayerDevicesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.player.devices.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/player/devices
 */
export function getGetMePlayerDevicesKey() {
  return ['/me/player/devices'] as const
}

/**
 * POST /me/player/next
 *
 * Skip To Next
 *
 * Skips to next track in the user’s queue.
 */
export function usePostMePlayerNext(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.next.$post> | undefined,
    Error,
    string,
    InferRequestType<typeof client.me.player.next.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /me/player/next',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.player.next.$post> }) =>
      parseResponse(client.me.player.next.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * PUT /me/player/pause
 *
 * Pause Playback
 *
 * Pause playback on the user's account.
 */
export function usePutMePlayerPause(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.pause.$put> | undefined,
    Error,
    string,
    InferRequestType<typeof client.me.player.pause.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/player/pause',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.player.pause.$put> }) =>
      parseResponse(client.me.player.pause.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * PUT /me/player/play
 *
 * Start/Resume Playback
 *
 * Start a new context or resume current playback on the user's active device.
 */
export function usePutMePlayerPlay(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.play.$put> | undefined,
    Error,
    string,
    InferRequestType<typeof client.me.player.play.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/player/play',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.player.play.$put> }) =>
      parseResponse(client.me.player.play.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /me/player/previous
 *
 * Skip To Previous
 *
 * Skips to previous track in the user’s queue.
 */
export function usePostMePlayerPrevious(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.previous.$post> | undefined,
    Error,
    string,
    InferRequestType<typeof client.me.player.previous.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /me/player/previous',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.player.previous.$post> }) =>
      parseResponse(client.me.player.previous.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /me/player/queue
 *
 * Get the User's Queue
 *
 * Get the list of objects that make up the user's queue.
 */
export function useGetMePlayerQueue(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMePlayerQueueKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.player.queue.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/player/queue
 */
export function getGetMePlayerQueueKey() {
  return ['/me/player/queue'] as const
}

/**
 * POST /me/player/queue
 *
 * Add Item to Playback Queue
 *
 * Add an item to the end of the user's current playback queue.
 */
export function usePostMePlayerQueue(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.queue.$post> | undefined,
    Error,
    string,
    InferRequestType<typeof client.me.player.queue.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /me/player/queue',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.player.queue.$post> }) =>
      parseResponse(client.me.player.queue.$post(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMePlayerRecentlyPlayedKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.player['recently-played'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/player/recently-played
 */
export function getGetMePlayerRecentlyPlayedKey(
  args?: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
) {
  return ['/me/player/recently-played', ...(args ? [args] : [])] as const
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.repeat.$put> | undefined,
    Error,
    string,
    InferRequestType<typeof client.me.player.repeat.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/player/repeat',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.player.repeat.$put> }) =>
      parseResponse(client.me.player.repeat.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * PUT /me/player/seek
 *
 * Seek To Position
 *
 * Seeks to the given position in the user’s currently playing track.
 */
export function usePutMePlayerSeek(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.seek.$put> | undefined,
    Error,
    string,
    InferRequestType<typeof client.me.player.seek.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/player/seek',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.player.seek.$put> }) =>
      parseResponse(client.me.player.seek.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * PUT /me/player/shuffle
 *
 * Toggle Playback Shuffle
 *
 * Toggle shuffle on or off for user’s playback.
 */
export function usePutMePlayerShuffle(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.shuffle.$put> | undefined,
    Error,
    string,
    InferRequestType<typeof client.me.player.shuffle.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/player/shuffle',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.player.shuffle.$put> }) =>
      parseResponse(client.me.player.shuffle.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * PUT /me/player/volume
 *
 * Set Playback Volume
 *
 * Set the volume for the user’s current playback device.
 */
export function usePutMePlayerVolume(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.volume.$put> | undefined,
    Error,
    string,
    InferRequestType<typeof client.me.player.volume.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/player/volume',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.player.volume.$put> }) =>
      parseResponse(client.me.player.volume.$put(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMePlaylistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.playlists.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/playlists
 */
export function getGetMePlaylistsKey(args?: InferRequestType<typeof client.me.playlists.$get>) {
  return ['/me/playlists', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeShowsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.shows.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/shows
 */
export function getGetMeShowsKey(args?: InferRequestType<typeof client.me.shows.$get>) {
  return ['/me/shows', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/shows
 *
 * Save Shows for Current User
 *
 * Save one or more shows to current Spotify user's library.
 */
export function usePutMeShows(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.shows.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.shows.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/shows',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.shows.$put> }) =>
      parseResponse(client.me.shows.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /me/shows
 *
 * Remove User's Saved Shows
 *
 * Delete one or more shows from current Spotify user's library.
 */
export function useDeleteMeShows(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.shows.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.shows.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /me/shows',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.shows.$delete> }) =>
      parseResponse(client.me.shows.$delete(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeShowsContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.shows.contains.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/shows/contains
 */
export function getGetMeShowsContainsKey(
  args?: InferRequestType<typeof client.me.shows.contains.$get>,
) {
  return ['/me/shows/contains', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeTopTypeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.top[':type'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/top/{type}
 */
export function getGetMeTopTypeKey(
  args?: InferRequestType<(typeof client.me.top)[':type']['$get']>,
) {
  return ['/me/top/:type', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeTracksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.tracks.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/tracks
 */
export function getGetMeTracksKey(args?: InferRequestType<typeof client.me.tracks.$get>) {
  return ['/me/tracks', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/tracks
 *
 * Save Tracks for Current User
 *
 * Save one or more tracks to the current user's 'Your Music' library.
 */
export function usePutMeTracks(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.tracks.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.tracks.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /me/tracks',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.tracks.$put> }) =>
      parseResponse(client.me.tracks.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /me/tracks
 *
 * Remove User's Saved Tracks
 *
 * Remove one or more tracks from the current user's 'Your Music' library.
 */
export function useDeleteMeTracks(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.tracks.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.tracks.$delete>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /me/tracks',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.me.tracks.$delete> }) =>
      parseResponse(client.me.tracks.$delete(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMeTracksContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.tracks.contains.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/tracks/contains
 */
export function getGetMeTracksContainsKey(
  args?: InferRequestType<typeof client.me.tracks.contains.$get>,
) {
  return ['/me/tracks/contains', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPlaylistsPlaylistIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.playlists[':playlist_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}
 */
export function getGetPlaylistsPlaylistIdKey(
  args?: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
) {
  return ['/playlists/:playlist_id', ...(args ? [args] : [])] as const
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /playlists/:playlist_id',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.playlists)[':playlist_id']['$put']> },
    ) => parseResponse(client.playlists[':playlist_id'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * PUT /playlists/{playlist_id}/followers
 *
 * Follow Playlist
 *
 * Add the current user as a follower of a playlist.
 */
export function usePutPlaylistsPlaylistIdFollowers(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /playlists/:playlist_id/followers',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']> },
    ) => parseResponse(client.playlists[':playlist_id'].followers.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /playlists/{playlist_id}/followers
 *
 * Unfollow Playlist
 *
 * Remove the current user as a follower of a playlist.
 */
export function useDeletePlaylistsPlaylistIdFollowers(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /playlists/:playlist_id/followers',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
      },
    ) => parseResponse(client.playlists[':playlist_id'].followers.$delete(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetPlaylistsPlaylistIdFollowersContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.playlists[':playlist_id'].followers.contains.$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}/followers/contains
 */
export function getGetPlaylistsPlaylistIdFollowersContainsKey(
  args?: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
) {
  return ['/playlists/:playlist_id/followers/contains', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPlaylistsPlaylistIdImagesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.playlists[':playlist_id'].images.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}/images
 */
export function getGetPlaylistsPlaylistIdImagesKey(
  args?: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
) {
  return ['/playlists/:playlist_id/images', ...(args ? [args] : [])] as const
}

/**
 * PUT /playlists/{playlist_id}/images
 *
 * Add Custom Playlist Cover Image
 *
 * Replace the image used to represent a specific playlist.
 */
export function usePutPlaylistsPlaylistIdImages(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /playlists/:playlist_id/images',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']> },
    ) => parseResponse(client.playlists[':playlist_id'].images.$put(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPlaylistsPlaylistIdTracksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.playlists[':playlist_id'].tracks.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}/tracks
 */
export function getGetPlaylistsPlaylistIdTracksKey(
  args?: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
) {
  return ['/playlists/:playlist_id/tracks', ...(args ? [args] : [])] as const
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /playlists/:playlist_id/tracks',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']> },
    ) => parseResponse(client.playlists[':playlist_id'].tracks.$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /playlists/{playlist_id}/tracks
 *
 * Add Items to Playlist
 *
 * Add one or more items to a user's playlist.
 */
export function usePostPlaylistsPlaylistIdTracks(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /playlists/:playlist_id/tracks',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']> },
    ) => parseResponse(client.playlists[':playlist_id'].tracks.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /playlists/{playlist_id}/tracks
 *
 * Remove Playlist Items
 *
 * Remove one or more items from a user's playlist.
 */
export function useDeletePlaylistsPlaylistIdTracks(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /playlists/:playlist_id/tracks',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']> },
    ) => parseResponse(client.playlists[':playlist_id'].tracks.$delete(arg, clientOptions)),
    mutationOptions,
  )
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetRecommendationsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.recommendations.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /recommendations
 */
export function getGetRecommendationsKey(
  args?: InferRequestType<typeof client.recommendations.$get>,
) {
  return ['/recommendations', ...(args ? [args] : [])] as const
}

/**
 * GET /recommendations/available-genre-seeds
 *
 * Get Available Genre Seeds
 *
 * Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).
 */
export function useGetRecommendationsAvailableGenreSeeds(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetRecommendationsAvailableGenreSeedsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.recommendations['available-genre-seeds'].$get(undefined, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /recommendations/available-genre-seeds
 */
export function getGetRecommendationsAvailableGenreSeedsKey() {
  return ['/recommendations/available-genre-seeds'] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSearchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.search.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search
 */
export function getGetSearchKey(args?: InferRequestType<typeof client.search.$get>) {
  return ['/search', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetShowsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.shows.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /shows
 */
export function getGetShowsKey(args?: InferRequestType<typeof client.shows.$get>) {
  return ['/shows', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetShowsIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.shows[':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /shows/{id}
 */
export function getGetShowsIdKey(args?: InferRequestType<(typeof client.shows)[':id']['$get']>) {
  return ['/shows/:id', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetShowsIdEpisodesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.shows[':id'].episodes.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /shows/{id}/episodes
 */
export function getGetShowsIdEpisodesKey(
  args?: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
) {
  return ['/shows/:id/episodes', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTracksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.tracks.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tracks
 */
export function getGetTracksKey(args?: InferRequestType<typeof client.tracks.$get>) {
  return ['/tracks', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTracksIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.tracks[':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tracks/{id}
 */
export function getGetTracksIdKey(args?: InferRequestType<(typeof client.tracks)[':id']['$get']>) {
  return ['/tracks/:id', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{user_id}
 */
export function getGetUsersUserIdKey(
  args?: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['/users/:user_id', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdPlaylistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':user_id'].playlists.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{user_id}/playlists
 */
export function getGetUsersUserIdPlaylistsKey(
  args?: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
) {
  return ['/users/:user_id/playlists', ...(args ? [args] : [])] as const
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':user_id']['playlists']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users/:user_id/playlists',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']> },
    ) => parseResponse(client.users[':user_id'].playlists.$post(arg, clientOptions)),
    mutationOptions,
  )
}
