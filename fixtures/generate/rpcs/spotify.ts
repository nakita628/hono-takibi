import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/spotify'

/**
 * GET /albums
 *
 * Get Several Albums
 *
 * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 */
export async function getAlbums(
  args: InferRequestType<typeof client.albums.$get>,
  options?: ClientRequestOptions,
) {
  return await client.albums.$get(args, options)
}

/**
 * GET /albums/{id}
 *
 * Get Album
 *
 * Get Spotify catalog information for a single album.
 */
export async function getAlbumsId(
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.albums[':id'].$get(args, options)
}

/**
 * GET /albums/{id}/tracks
 *
 * Get Album Tracks
 *
 * Get Spotify catalog information about an album’s tracks.
 * Optional parameters can be used to limit the number of tracks returned.
 */
export async function getAlbumsIdTracks(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.albums[':id'].tracks.$get(args, options)
}

/**
 * GET /artists
 *
 * Get Several Artists
 *
 * Get Spotify catalog information for several artists based on their Spotify IDs.
 */
export async function getArtists(
  args: InferRequestType<typeof client.artists.$get>,
  options?: ClientRequestOptions,
) {
  return await client.artists.$get(args, options)
}

/**
 * GET /artists/{id}
 *
 * Get Artist
 *
 * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 */
export async function getArtistsId(
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.artists[':id'].$get(args, options)
}

/**
 * GET /artists/{id}/albums
 *
 * Get Artist's Albums
 *
 * Get Spotify catalog information about an artist's albums.
 */
export async function getArtistsIdAlbums(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.artists[':id'].albums.$get(args, options)
}

/**
 * GET /artists/{id}/related-artists
 *
 * Get Artist's Related Artists
 *
 * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).
 */
export async function getArtistsIdRelatedArtists(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.artists[':id']['related-artists'].$get(args, options)
}

/**
 * GET /artists/{id}/top-tracks
 *
 * Get Artist's Top Tracks
 *
 * Get Spotify catalog information about an artist's top tracks by country.
 */
export async function getArtistsIdTopTracks(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.artists[':id']['top-tracks'].$get(args, options)
}

/**
 * GET /audio-analysis/{id}
 *
 * Get Track's Audio Analysis
 *
 * Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.
 */
export async function getAudioAnalysisId(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['audio-analysis'][':id'].$get(args, options)
}

/**
 * GET /audio-features
 *
 * Get Tracks' Audio Features
 *
 * Get audio features for multiple tracks based on their Spotify IDs.
 */
export async function getAudioFeatures(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['audio-features'].$get(args, options)
}

/**
 * GET /audio-features/{id}
 *
 * Get Track's Audio Features
 *
 * Get audio feature information for a single track identified by its unique
 * Spotify ID.
 */
export async function getAudioFeaturesId(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['audio-features'][':id'].$get(args, options)
}

/**
 * GET /audiobooks
 *
 * Get Several Audiobooks
 *
 * Get Spotify catalog information for several audiobooks identified by their Spotify IDs.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export async function getAudiobooks(
  args: InferRequestType<typeof client.audiobooks.$get>,
  options?: ClientRequestOptions,
) {
  return await client.audiobooks.$get(args, options)
}

/**
 * GET /audiobooks/{id}
 *
 * Get an Audiobook
 *
 * Get Spotify catalog information for a single audiobook.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export async function getAudiobooksId(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.audiobooks[':id'].$get(args, options)
}

/**
 * GET /audiobooks/{id}/chapters
 *
 * Get Audiobook Chapters
 *
 * Get Spotify catalog information about an audiobook's chapters.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export async function getAudiobooksIdChapters(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.audiobooks[':id'].chapters.$get(args, options)
}

/**
 * GET /browse/categories
 *
 * Get Several Browse Categories
 *
 * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
export async function getBrowseCategories(
  args: InferRequestType<typeof client.browse.categories.$get>,
  options?: ClientRequestOptions,
) {
  return await client.browse.categories.$get(args, options)
}

/**
 * GET /browse/categories/{category_id}
 *
 * Get Single Browse Category
 *
 * Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
export async function getBrowseCategoriesCategoryId(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.browse.categories[':category_id'].$get(args, options)
}

/**
 * GET /browse/categories/{category_id}/playlists
 *
 * Get Category's Playlists
 *
 * Get a list of Spotify playlists tagged with a particular category.
 */
export async function getBrowseCategoriesCategoryIdPlaylists(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.browse.categories[':category_id'].playlists.$get(args, options)
}

/**
 * GET /browse/featured-playlists
 *
 * Get Featured Playlists
 *
 * Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
 */
export async function getBrowseFeaturedPlaylists(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.browse['featured-playlists'].$get(args, options)
}

/**
 * GET /browse/new-releases
 *
 * Get New Releases
 *
 * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
 */
export async function getBrowseNewReleases(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.browse['new-releases'].$get(args, options)
}

/**
 * GET /chapters
 *
 * Get Several Chapters
 *
 * Get Spotify catalog information for several chapters identified by their Spotify IDs.<br />
 * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export async function getChapters(
  args: InferRequestType<typeof client.chapters.$get>,
  options?: ClientRequestOptions,
) {
  return await client.chapters.$get(args, options)
}

/**
 * GET /chapters/{id}
 *
 * Get a Chapter
 *
 * Get Spotify catalog information for a single chapter.<br />
 * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export async function getChaptersId(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.chapters[':id'].$get(args, options)
}

/**
 * GET /episodes
 *
 * Get Several Episodes
 *
 * Get Spotify catalog information for several episodes based on their Spotify IDs.
 */
export async function getEpisodes(
  args: InferRequestType<typeof client.episodes.$get>,
  options?: ClientRequestOptions,
) {
  return await client.episodes.$get(args, options)
}

/**
 * GET /episodes/{id}
 *
 * Get Episode
 *
 * Get Spotify catalog information for a single episode identified by its
 * unique Spotify ID.
 */
export async function getEpisodesId(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.episodes[':id'].$get(args, options)
}

/**
 * GET /markets
 *
 * Get Available Markets
 *
 * Get the list of markets where Spotify is available.
 */
export async function getMarkets(options?: ClientRequestOptions) {
  return await client.markets.$get(undefined, options)
}

/**
 * GET /me
 *
 * Get Current User's Profile
 *
 * Get detailed profile information about the current user (including the
 * current user's username).
 */
export async function getMe(options?: ClientRequestOptions) {
  return await client.me.$get(undefined, options)
}

/**
 * GET /me/albums
 *
 * Get User's Saved Albums
 *
 * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
 */
export async function getMeAlbums(
  args: InferRequestType<typeof client.me.albums.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.albums.$get(args, options)
}

/**
 * PUT /me/albums
 *
 * Save Albums for Current User
 *
 * Save one or more albums to the current user's 'Your Music' library.
 */
export async function putMeAlbums(
  args: InferRequestType<typeof client.me.albums.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.albums.$put(args, options)
}

/**
 * DELETE /me/albums
 *
 * Remove Users' Saved Albums
 *
 * Remove one or more albums from the current user's 'Your Music' library.
 */
export async function deleteMeAlbums(
  args: InferRequestType<typeof client.me.albums.$delete>,
  options?: ClientRequestOptions,
) {
  return await client.me.albums.$delete(args, options)
}

/**
 * GET /me/albums/contains
 *
 * Check User's Saved Albums
 *
 * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
 */
export async function getMeAlbumsContains(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.albums.contains.$get(args, options)
}

/**
 * GET /me/audiobooks
 *
 * Get User's Saved Audiobooks
 *
 * Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
 */
export async function getMeAudiobooks(
  args: InferRequestType<typeof client.me.audiobooks.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.audiobooks.$get(args, options)
}

/**
 * PUT /me/audiobooks
 *
 * Save Audiobooks for Current User
 *
 * Save one or more audiobooks to the current Spotify user's library.
 */
export async function putMeAudiobooks(
  args: InferRequestType<typeof client.me.audiobooks.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.audiobooks.$put(args, options)
}

/**
 * DELETE /me/audiobooks
 *
 * Remove User's Saved Audiobooks
 *
 * Remove one or more audiobooks from the Spotify user's library.
 */
export async function deleteMeAudiobooks(
  args: InferRequestType<typeof client.me.audiobooks.$delete>,
  options?: ClientRequestOptions,
) {
  return await client.me.audiobooks.$delete(args, options)
}

/**
 * GET /me/audiobooks/contains
 *
 * Check User's Saved Audiobooks
 *
 * Check if one or more audiobooks are already saved in the current Spotify user's library.
 */
export async function getMeAudiobooksContains(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.audiobooks.contains.$get(args, options)
}

/**
 * GET /me/episodes
 *
 * Get User's Saved Episodes
 *
 * Get a list of the episodes saved in the current Spotify user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export async function getMeEpisodes(
  args: InferRequestType<typeof client.me.episodes.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.episodes.$get(args, options)
}

/**
 * PUT /me/episodes
 *
 * Save Episodes for Current User
 *
 * Save one or more episodes to the current user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export async function putMeEpisodes(
  args: InferRequestType<typeof client.me.episodes.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.episodes.$put(args, options)
}

/**
 * DELETE /me/episodes
 *
 * Remove User's Saved Episodes
 *
 * Remove one or more episodes from the current user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export async function deleteMeEpisodes(
  args: InferRequestType<typeof client.me.episodes.$delete>,
  options?: ClientRequestOptions,
) {
  return await client.me.episodes.$delete(args, options)
}

/**
 * GET /me/episodes/contains
 *
 * Check User's Saved Episodes
 *
 * Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer)..
 */
export async function getMeEpisodesContains(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.episodes.contains.$get(args, options)
}

/**
 * GET /me/following
 *
 * Get Followed Artists
 *
 * Get the current user's followed artists.
 */
export async function getMeFollowing(
  args: InferRequestType<typeof client.me.following.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.following.$get(args, options)
}

/**
 * PUT /me/following
 *
 * Follow Artists or Users
 *
 * Add the current user as a follower of one or more artists or other Spotify users.
 */
export async function putMeFollowing(
  args: InferRequestType<typeof client.me.following.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.following.$put(args, options)
}

/**
 * DELETE /me/following
 *
 * Unfollow Artists or Users
 *
 * Remove the current user as a follower of one or more artists or other Spotify users.
 */
export async function deleteMeFollowing(
  args: InferRequestType<typeof client.me.following.$delete>,
  options?: ClientRequestOptions,
) {
  return await client.me.following.$delete(args, options)
}

/**
 * GET /me/following/contains
 *
 * Check If User Follows Artists or Users
 *
 * Check to see if the current user is following one or more artists or other Spotify users.
 */
export async function getMeFollowingContains(
  args: InferRequestType<typeof client.me.following.contains.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.following.contains.$get(args, options)
}

/**
 * GET /me/player
 *
 * Get Playback State
 *
 * Get information about the user’s current playback state, including track or episode, progress, and active device.
 */
export async function getMePlayer(
  args: InferRequestType<typeof client.me.player.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.player.$get(args, options)
}

/**
 * PUT /me/player
 *
 * Transfer Playback
 *
 * Transfer playback to a new device and determine if it should start playing.
 */
export async function putMePlayer(
  args: InferRequestType<typeof client.me.player.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.player.$put(args, options)
}

/**
 * GET /me/player/currently-playing
 *
 * Get Currently Playing Track
 *
 * Get the object currently being played on the user's Spotify account.
 */
export async function getMePlayerCurrentlyPlaying(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.me.player['currently-playing'].$get(args, options)
}

/**
 * GET /me/player/devices
 *
 * Get Available Devices
 *
 * Get information about a user’s available devices.
 */
export async function getMePlayerDevices(options?: ClientRequestOptions) {
  return await client.me.player.devices.$get(undefined, options)
}

/**
 * POST /me/player/next
 *
 * Skip To Next
 *
 * Skips to next track in the user’s queue.
 */
export async function postMePlayerNext(
  args: InferRequestType<typeof client.me.player.next.$post>,
  options?: ClientRequestOptions,
) {
  return await client.me.player.next.$post(args, options)
}

/**
 * PUT /me/player/pause
 *
 * Pause Playback
 *
 * Pause playback on the user's account.
 */
export async function putMePlayerPause(
  args: InferRequestType<typeof client.me.player.pause.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.player.pause.$put(args, options)
}

/**
 * PUT /me/player/play
 *
 * Start/Resume Playback
 *
 * Start a new context or resume current playback on the user's active device.
 */
export async function putMePlayerPlay(
  args: InferRequestType<typeof client.me.player.play.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.player.play.$put(args, options)
}

/**
 * POST /me/player/previous
 *
 * Skip To Previous
 *
 * Skips to previous track in the user’s queue.
 */
export async function postMePlayerPrevious(
  args: InferRequestType<typeof client.me.player.previous.$post>,
  options?: ClientRequestOptions,
) {
  return await client.me.player.previous.$post(args, options)
}

/**
 * GET /me/player/queue
 *
 * Get the User's Queue
 *
 * Get the list of objects that make up the user's queue.
 */
export async function getMePlayerQueue(options?: ClientRequestOptions) {
  return await client.me.player.queue.$get(undefined, options)
}

/**
 * POST /me/player/queue
 *
 * Add Item to Playback Queue
 *
 * Add an item to the end of the user's current playback queue.
 */
export async function postMePlayerQueue(
  args: InferRequestType<typeof client.me.player.queue.$post>,
  options?: ClientRequestOptions,
) {
  return await client.me.player.queue.$post(args, options)
}

/**
 * GET /me/player/recently-played
 *
 * Get Recently Played Tracks
 *
 * Get tracks from the current user's recently played tracks.
 * _**Note**: Currently doesn't support podcast episodes._
 */
export async function getMePlayerRecentlyPlayed(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.me.player['recently-played'].$get(args, options)
}

/**
 * PUT /me/player/repeat
 *
 * Set Repeat Mode
 *
 * Set the repeat mode for the user's playback. Options are repeat-track,
 * repeat-context, and off.
 */
export async function putMePlayerRepeat(
  args: InferRequestType<typeof client.me.player.repeat.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.player.repeat.$put(args, options)
}

/**
 * PUT /me/player/seek
 *
 * Seek To Position
 *
 * Seeks to the given position in the user’s currently playing track.
 */
export async function putMePlayerSeek(
  args: InferRequestType<typeof client.me.player.seek.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.player.seek.$put(args, options)
}

/**
 * PUT /me/player/shuffle
 *
 * Toggle Playback Shuffle
 *
 * Toggle shuffle on or off for user’s playback.
 */
export async function putMePlayerShuffle(
  args: InferRequestType<typeof client.me.player.shuffle.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.player.shuffle.$put(args, options)
}

/**
 * PUT /me/player/volume
 *
 * Set Playback Volume
 *
 * Set the volume for the user’s current playback device.
 */
export async function putMePlayerVolume(
  args: InferRequestType<typeof client.me.player.volume.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.player.volume.$put(args, options)
}

/**
 * GET /me/playlists
 *
 * Get Current User's Playlists
 *
 * Get a list of the playlists owned or followed by the current Spotify
 * user.
 */
export async function getMePlaylists(
  args: InferRequestType<typeof client.me.playlists.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.playlists.$get(args, options)
}

/**
 * GET /me/shows
 *
 * Get User's Saved Shows
 *
 * Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
 */
export async function getMeShows(
  args: InferRequestType<typeof client.me.shows.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.shows.$get(args, options)
}

/**
 * PUT /me/shows
 *
 * Save Shows for Current User
 *
 * Save one or more shows to current Spotify user's library.
 */
export async function putMeShows(
  args: InferRequestType<typeof client.me.shows.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.shows.$put(args, options)
}

/**
 * DELETE /me/shows
 *
 * Remove User's Saved Shows
 *
 * Delete one or more shows from current Spotify user's library.
 */
export async function deleteMeShows(
  args: InferRequestType<typeof client.me.shows.$delete>,
  options?: ClientRequestOptions,
) {
  return await client.me.shows.$delete(args, options)
}

/**
 * GET /me/shows/contains
 *
 * Check User's Saved Shows
 *
 * Check if one or more shows is already saved in the current Spotify user's library.
 */
export async function getMeShowsContains(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.shows.contains.$get(args, options)
}

/**
 * GET /me/top/{type}
 *
 * Get User's Top Items
 *
 * Get the current user's top artists or tracks based on calculated affinity.
 */
export async function getMeTopType(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.me.top[':type'].$get(args, options)
}

/**
 * GET /me/tracks
 *
 * Get User's Saved Tracks
 *
 * Get a list of the songs saved in the current Spotify user's 'Your Music' library.
 */
export async function getMeTracks(
  args: InferRequestType<typeof client.me.tracks.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.tracks.$get(args, options)
}

/**
 * PUT /me/tracks
 *
 * Save Tracks for Current User
 *
 * Save one or more tracks to the current user's 'Your Music' library.
 */
export async function putMeTracks(
  args: InferRequestType<typeof client.me.tracks.$put>,
  options?: ClientRequestOptions,
) {
  return await client.me.tracks.$put(args, options)
}

/**
 * DELETE /me/tracks
 *
 * Remove User's Saved Tracks
 *
 * Remove one or more tracks from the current user's 'Your Music' library.
 */
export async function deleteMeTracks(
  args: InferRequestType<typeof client.me.tracks.$delete>,
  options?: ClientRequestOptions,
) {
  return await client.me.tracks.$delete(args, options)
}

/**
 * GET /me/tracks/contains
 *
 * Check User's Saved Tracks
 *
 * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
 */
export async function getMeTracksContains(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
  options?: ClientRequestOptions,
) {
  return await client.me.tracks.contains.$get(args, options)
}

/**
 * GET /playlists/{playlist_id}
 *
 * Get Playlist
 *
 * Get a playlist owned by a Spotify user.
 */
export async function getPlaylistsPlaylistId(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.playlists[':playlist_id'].$get(args, options)
}

/**
 * PUT /playlists/{playlist_id}
 *
 * Change Playlist Details
 *
 * Change a playlist's name and public/private state. (The user must, of
 * course, own the playlist.)
 */
export async function putPlaylistsPlaylistId(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.playlists[':playlist_id'].$put(args, options)
}

/**
 * PUT /playlists/{playlist_id}/followers
 *
 * Follow Playlist
 *
 * Add the current user as a follower of a playlist.
 */
export async function putPlaylistsPlaylistIdFollowers(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.playlists[':playlist_id'].followers.$put(args, options)
}

/**
 * DELETE /playlists/{playlist_id}/followers
 *
 * Unfollow Playlist
 *
 * Remove the current user as a follower of a playlist.
 */
export async function deletePlaylistsPlaylistIdFollowers(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.playlists[':playlist_id'].followers.$delete(args, options)
}

/**
 * GET /playlists/{playlist_id}/followers/contains
 *
 * Check if Users Follow Playlist
 *
 * Check to see if one or more Spotify users are following a specified playlist.
 */
export async function getPlaylistsPlaylistIdFollowersContains(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await client.playlists[':playlist_id'].followers.contains.$get(args, options)
}

/**
 * GET /playlists/{playlist_id}/images
 *
 * Get Playlist Cover Image
 *
 * Get the current image associated with a specific playlist.
 */
export async function getPlaylistsPlaylistIdImages(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.playlists[':playlist_id'].images.$get(args, options)
}

/**
 * PUT /playlists/{playlist_id}/images
 *
 * Add Custom Playlist Cover Image
 *
 * Replace the image used to represent a specific playlist.
 */
export async function putPlaylistsPlaylistIdImages(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.playlists[':playlist_id'].images.$put(args, options)
}

/**
 * GET /playlists/{playlist_id}/tracks
 *
 * Get Playlist Items
 *
 * Get full details of the items of a playlist owned by a Spotify user.
 */
export async function getPlaylistsPlaylistIdTracks(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.playlists[':playlist_id'].tracks.$get(args, options)
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
export async function putPlaylistsPlaylistIdTracks(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.playlists[':playlist_id'].tracks.$put(args, options)
}

/**
 * POST /playlists/{playlist_id}/tracks
 *
 * Add Items to Playlist
 *
 * Add one or more items to a user's playlist.
 */
export async function postPlaylistsPlaylistIdTracks(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.playlists[':playlist_id'].tracks.$post(args, options)
}

/**
 * DELETE /playlists/{playlist_id}/tracks
 *
 * Remove Playlist Items
 *
 * Remove one or more items from a user's playlist.
 */
export async function deletePlaylistsPlaylistIdTracks(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.playlists[':playlist_id'].tracks.$delete(args, options)
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
export async function getRecommendations(
  args: InferRequestType<typeof client.recommendations.$get>,
  options?: ClientRequestOptions,
) {
  return await client.recommendations.$get(args, options)
}

/**
 * GET /recommendations/available-genre-seeds
 *
 * Get Available Genre Seeds
 *
 * Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).
 */
export async function getRecommendationsAvailableGenreSeeds(options?: ClientRequestOptions) {
  return await client.recommendations['available-genre-seeds'].$get(undefined, options)
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
export async function getSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: ClientRequestOptions,
) {
  return await client.search.$get(args, options)
}

/**
 * GET /shows
 *
 * Get Several Shows
 *
 * Get Spotify catalog information for several shows based on their Spotify IDs.
 */
export async function getShows(
  args: InferRequestType<typeof client.shows.$get>,
  options?: ClientRequestOptions,
) {
  return await client.shows.$get(args, options)
}

/**
 * GET /shows/{id}
 *
 * Get Show
 *
 * Get Spotify catalog information for a single show identified by its
 * unique Spotify ID.
 */
export async function getShowsId(
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.shows[':id'].$get(args, options)
}

/**
 * GET /shows/{id}/episodes
 *
 * Get Show Episodes
 *
 * Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.
 */
export async function getShowsIdEpisodes(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.shows[':id'].episodes.$get(args, options)
}

/**
 * GET /tracks
 *
 * Get Several Tracks
 *
 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
 */
export async function getTracks(
  args: InferRequestType<typeof client.tracks.$get>,
  options?: ClientRequestOptions,
) {
  return await client.tracks.$get(args, options)
}

/**
 * GET /tracks/{id}
 *
 * Get Track
 *
 * Get Spotify catalog information for a single track identified by its
 * unique Spotify ID.
 */
export async function getTracksId(
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.tracks[':id'].$get(args, options)
}

/**
 * GET /users/{user_id}
 *
 * Get User's Profile
 *
 * Get public profile information about a Spotify user.
 */
export async function getUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':user_id'].$get(args, options)
}

/**
 * GET /users/{user_id}/playlists
 *
 * Get User's Playlists
 *
 * Get a list of the playlists owned or followed by a Spotify user.
 */
export async function getUsersUserIdPlaylists(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':user_id'].playlists.$get(args, options)
}

/**
 * POST /users/{user_id}/playlists
 *
 * Create Playlist
 *
 * Create a playlist for a Spotify user. (The playlist will be empty until
 * you [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)
 */
export async function postUsersUserIdPlaylists(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':user_id'].playlists.$post(args, options)
}
