declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/albums': {
      $get:
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: {
              albums: {
                album_type: 'album' | 'single' | 'compilation'
                available_markets: string[]
                copyrights?: { text?: string | undefined; type?: string | undefined }[] | undefined
                external_ids?:
                  | {
                      ean?: string | undefined
                      isrc?: string | undefined
                      upc?: string | undefined
                    }
                  | undefined
                external_urls: { spotify?: string | undefined }
                genres?: string[] | undefined
                href: string
                id: string
                images: { height: number | null; url: string; width: number | null }[]
                label?: string | undefined
                name: string
                popularity?: number | undefined
                release_date: string
                release_date_precision: 'year' | 'month' | 'day'
                restrictions?:
                  | { reason?: 'market' | 'product' | 'explicit' | undefined }
                  | undefined
                total_tracks: number
                type: 'album'
                uri: string
                artists?:
                  | {
                      external_urls?: { spotify?: string | undefined } | undefined
                      followers?:
                        | { href?: (string | null) | undefined; total?: number | undefined }
                        | undefined
                      genres?: string[] | undefined
                      href?: string | undefined
                      id?: string | undefined
                      images?:
                        | { height: number | null; url: string; width: number | null }[]
                        | undefined
                      name?: string | undefined
                      popularity?: number | undefined
                      type?: 'artist' | undefined
                      uri?: string | undefined
                    }[]
                  | undefined
                tracks?:
                  | {
                      href: string
                      limit: number
                      next: string | null
                      offset: number
                      previous: string | null
                      total: number
                      items?:
                        | {
                            artists?:
                              | {
                                  external_urls?: { spotify?: string | undefined } | undefined
                                  href?: string | undefined
                                  id?: string | undefined
                                  name?: string | undefined
                                  type?: 'artist' | undefined
                                  uri?: string | undefined
                                }[]
                              | undefined
                            available_markets?: string[] | undefined
                            disc_number?: number | undefined
                            duration_ms?: number | undefined
                            explicit?: boolean | undefined
                            external_urls?: { spotify?: string | undefined } | undefined
                            href?: string | undefined
                            id?: string | undefined
                            is_local?: boolean | undefined
                            is_playable?: boolean | undefined
                            linked_from?:
                              | {
                                  external_urls?: { spotify?: string | undefined } | undefined
                                  href?: string | undefined
                                  id?: string | undefined
                                  type?: string | undefined
                                  uri?: string | undefined
                                }
                              | undefined
                            name?: string | undefined
                            preview_url?: string | undefined
                            restrictions?: { reason?: string | undefined } | undefined
                            track_number?: number | undefined
                            type?: string | undefined
                            uri?: string | undefined
                          }[]
                        | undefined
                    }
                  | undefined
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/albums/:id': {
      $get:
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: {
              album_type: 'album' | 'single' | 'compilation'
              available_markets: string[]
              copyrights?: { text?: string | undefined; type?: string | undefined }[] | undefined
              external_ids?:
                | { ean?: string | undefined; isrc?: string | undefined; upc?: string | undefined }
                | undefined
              external_urls: { spotify?: string | undefined }
              genres?: string[] | undefined
              href: string
              id: string
              images: { height: number | null; url: string; width: number | null }[]
              label?: string | undefined
              name: string
              popularity?: number | undefined
              release_date: string
              release_date_precision: 'year' | 'month' | 'day'
              restrictions?: { reason?: 'market' | 'product' | 'explicit' | undefined } | undefined
              total_tracks: number
              type: 'album'
              uri: string
              artists?:
                | {
                    external_urls?: { spotify?: string | undefined } | undefined
                    followers?:
                      | { href?: (string | null) | undefined; total?: number | undefined }
                      | undefined
                    genres?: string[] | undefined
                    href?: string | undefined
                    id?: string | undefined
                    images?:
                      | { height: number | null; url: string; width: number | null }[]
                      | undefined
                    name?: string | undefined
                    popularity?: number | undefined
                    type?: 'artist' | undefined
                    uri?: string | undefined
                  }[]
                | undefined
              tracks?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          artists?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                href?: string | undefined
                                id?: string | undefined
                                name?: string | undefined
                                type?: 'artist' | undefined
                                uri?: string | undefined
                              }[]
                            | undefined
                          available_markets?: string[] | undefined
                          disc_number?: number | undefined
                          duration_ms?: number | undefined
                          explicit?: boolean | undefined
                          external_urls?: { spotify?: string | undefined } | undefined
                          href?: string | undefined
                          id?: string | undefined
                          is_local?: boolean | undefined
                          is_playable?: boolean | undefined
                          linked_from?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                href?: string | undefined
                                id?: string | undefined
                                type?: string | undefined
                                uri?: string | undefined
                              }
                            | undefined
                          name?: string | undefined
                          preview_url?: string | undefined
                          restrictions?: { reason?: string | undefined } | undefined
                          track_number?: number | undefined
                          type?: string | undefined
                          uri?: string | undefined
                        }[]
                      | undefined
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/albums/:id/tracks': {
      $get:
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    artists?:
                      | {
                          external_urls?: { spotify?: string | undefined } | undefined
                          href?: string | undefined
                          id?: string | undefined
                          name?: string | undefined
                          type?: 'artist' | undefined
                          uri?: string | undefined
                        }[]
                      | undefined
                    available_markets?: string[] | undefined
                    disc_number?: number | undefined
                    duration_ms?: number | undefined
                    explicit?: boolean | undefined
                    external_urls?: { spotify?: string | undefined } | undefined
                    href?: string | undefined
                    id?: string | undefined
                    is_local?: boolean | undefined
                    is_playable?: boolean | undefined
                    linked_from?:
                      | {
                          external_urls?: { spotify?: string | undefined } | undefined
                          href?: string | undefined
                          id?: string | undefined
                          type?: string | undefined
                          uri?: string | undefined
                        }
                      | undefined
                    name?: string | undefined
                    preview_url?: string | undefined
                    restrictions?: { reason?: string | undefined } | undefined
                    track_number?: number | undefined
                    type?: string | undefined
                    uri?: string | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/artists': {
      $get:
        | {
            input: { query: { ids: string } }
            output: {
              artists: {
                external_urls?: { spotify?: string | undefined } | undefined
                followers?:
                  | { href?: (string | null) | undefined; total?: number | undefined }
                  | undefined
                genres?: string[] | undefined
                href?: string | undefined
                id?: string | undefined
                images?: { height: number | null; url: string; width: number | null }[] | undefined
                name?: string | undefined
                popularity?: number | undefined
                type?: 'artist' | undefined
                uri?: string | undefined
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/artists/:id': {
      $get:
        | {
            input: { param: { id: string } }
            output: {
              external_urls?: { spotify?: string | undefined } | undefined
              followers?:
                | { href?: (string | null) | undefined; total?: number | undefined }
                | undefined
              genres?: string[] | undefined
              href?: string | undefined
              id?: string | undefined
              images?: { height: number | null; url: string; width: number | null }[] | undefined
              name?: string | undefined
              popularity?: number | undefined
              type?: 'artist' | undefined
              uri?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/artists/:id/albums': {
      $get:
        | {
            input: { param: { id: string } } & {
              query: {
                include_groups?: string | undefined
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    album_type: 'album' | 'single' | 'compilation'
                    available_markets: string[]
                    copyrights?:
                      | { text?: string | undefined; type?: string | undefined }[]
                      | undefined
                    external_ids?:
                      | {
                          ean?: string | undefined
                          isrc?: string | undefined
                          upc?: string | undefined
                        }
                      | undefined
                    external_urls: { spotify?: string | undefined }
                    genres?: string[] | undefined
                    href: string
                    id: string
                    images: { height: number | null; url: string; width: number | null }[]
                    label?: string | undefined
                    name: string
                    popularity?: number | undefined
                    release_date: string
                    release_date_precision: 'year' | 'month' | 'day'
                    restrictions?:
                      | { reason?: 'market' | 'product' | 'explicit' | undefined }
                      | undefined
                    total_tracks: number
                    type: 'album'
                    uri: string
                    album_group?: 'album' | 'single' | 'compilation' | 'appears_on' | undefined
                    artists: {
                      external_urls?: { spotify?: string | undefined } | undefined
                      href?: string | undefined
                      id?: string | undefined
                      name?: string | undefined
                      type?: 'artist' | undefined
                      uri?: string | undefined
                    }[]
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & {
              query: {
                include_groups?: string | undefined
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } } & {
              query: {
                include_groups?: string | undefined
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } } & {
              query: {
                include_groups?: string | undefined
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/artists/:id/related-artists': {
      $get:
        | {
            input: { param: { id: string } }
            output: {
              artists: {
                external_urls?: { spotify?: string | undefined } | undefined
                followers?:
                  | { href?: (string | null) | undefined; total?: number | undefined }
                  | undefined
                genres?: string[] | undefined
                href?: string | undefined
                id?: string | undefined
                images?: { height: number | null; url: string; width: number | null }[] | undefined
                name?: string | undefined
                popularity?: number | undefined
                type?: 'artist' | undefined
                uri?: string | undefined
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/artists/:id/top-tracks': {
      $get:
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: {
              tracks: {
                album?:
                  | {
                      album_type: 'album' | 'single' | 'compilation'
                      available_markets: string[]
                      copyrights?:
                        | { text?: string | undefined; type?: string | undefined }[]
                        | undefined
                      external_ids?:
                        | {
                            ean?: string | undefined
                            isrc?: string | undefined
                            upc?: string | undefined
                          }
                        | undefined
                      external_urls: { spotify?: string | undefined }
                      genres?: string[] | undefined
                      href: string
                      id: string
                      images: { height: number | null; url: string; width: number | null }[]
                      label?: string | undefined
                      name: string
                      popularity?: number | undefined
                      release_date: string
                      release_date_precision: 'year' | 'month' | 'day'
                      restrictions?:
                        | { reason?: 'market' | 'product' | 'explicit' | undefined }
                        | undefined
                      total_tracks: number
                      type: 'album'
                      uri: string
                      album_group?: 'album' | 'single' | 'compilation' | 'appears_on' | undefined
                      artists: {
                        external_urls?: { spotify?: string | undefined } | undefined
                        href?: string | undefined
                        id?: string | undefined
                        name?: string | undefined
                        type?: 'artist' | undefined
                        uri?: string | undefined
                      }[]
                    }
                  | undefined
                artists?:
                  | {
                      external_urls?: { spotify?: string | undefined } | undefined
                      followers?:
                        | { href?: (string | null) | undefined; total?: number | undefined }
                        | undefined
                      genres?: string[] | undefined
                      href?: string | undefined
                      id?: string | undefined
                      images?:
                        | { height: number | null; url: string; width: number | null }[]
                        | undefined
                      name?: string | undefined
                      popularity?: number | undefined
                      type?: 'artist' | undefined
                      uri?: string | undefined
                    }[]
                  | undefined
                available_markets?: string[] | undefined
                disc_number?: number | undefined
                duration_ms?: number | undefined
                explicit?: boolean | undefined
                external_ids?:
                  | {
                      ean?: string | undefined
                      isrc?: string | undefined
                      upc?: string | undefined
                    }
                  | undefined
                external_urls?: { spotify?: string | undefined } | undefined
                href?: string | undefined
                id?: string | undefined
                is_local?: boolean | undefined
                is_playable?: boolean | undefined
                linked_from?: { [x: string]: unknown } | undefined
                name?: string | undefined
                popularity?: number | undefined
                preview_url?: string | undefined
                restrictions?: { reason?: string | undefined } | undefined
                track_number?: number | undefined
                type?: 'track' | undefined
                uri?: string | undefined
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/audio-analysis/:id': {
      $get:
        | {
            input: { param: { id: string } }
            output: {
              bars?:
                | {
                    confidence?: number | undefined
                    duration?: number | undefined
                    start?: number | undefined
                  }[]
                | undefined
              beats?:
                | {
                    confidence?: number | undefined
                    duration?: number | undefined
                    start?: number | undefined
                  }[]
                | undefined
              meta?:
                | {
                    analysis_time?: number | undefined
                    analyzer_version?: string | undefined
                    detailed_status?: string | undefined
                    input_process?: string | undefined
                    platform?: string | undefined
                    status_code?: number | undefined
                    timestamp?: number | undefined
                  }
                | undefined
              sections?:
                | {
                    confidence?: number | undefined
                    duration?: number | undefined
                    key?: number | undefined
                    key_confidence?: number | undefined
                    loudness?: number | undefined
                    mode?: -1 | 0 | 1 | undefined
                    mode_confidence?: number | undefined
                    start?: number | undefined
                    tempo?: number | undefined
                    tempo_confidence?: number | undefined
                    time_signature?: number | undefined
                    time_signature_confidence?: number | undefined
                  }[]
                | undefined
              segments?:
                | {
                    confidence?: number | undefined
                    duration?: number | undefined
                    loudness_end?: number | undefined
                    loudness_max?: number | undefined
                    loudness_max_time?: number | undefined
                    loudness_start?: number | undefined
                    pitches?: number[] | undefined
                    start?: number | undefined
                    timbre?: number[] | undefined
                  }[]
                | undefined
              tatums?:
                | {
                    confidence?: number | undefined
                    duration?: number | undefined
                    start?: number | undefined
                  }[]
                | undefined
              track?:
                | {
                    analysis_channels?: number | undefined
                    analysis_sample_rate?: number | undefined
                    code_version?: number | undefined
                    codestring?: string | undefined
                    duration?: number | undefined
                    echoprint_version?: number | undefined
                    echoprintstring?: string | undefined
                    end_of_fade_in?: number | undefined
                    key?: number | undefined
                    key_confidence?: number | undefined
                    loudness?: number | undefined
                    mode?: number | undefined
                    mode_confidence?: number | undefined
                    num_samples?: number | undefined
                    offset_seconds?: number | undefined
                    rhythm_version?: number | undefined
                    rhythmstring?: string | undefined
                    sample_md5?: string | undefined
                    start_of_fade_out?: number | undefined
                    synch_version?: number | undefined
                    synchstring?: string | undefined
                    tempo?: number | undefined
                    tempo_confidence?: number | undefined
                    time_signature?: number | undefined
                    time_signature_confidence?: number | undefined
                    window_seconds?: number | undefined
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/audio-features': {
      $get:
        | {
            input: { query: { ids: string } }
            output: {
              audio_features: {
                acousticness?: number | undefined
                analysis_url?: string | undefined
                danceability?: number | undefined
                duration_ms?: number | undefined
                energy?: number | undefined
                id?: string | undefined
                instrumentalness?: number | undefined
                key?: number | undefined
                liveness?: number | undefined
                loudness?: number | undefined
                mode?: number | undefined
                speechiness?: number | undefined
                tempo?: number | undefined
                time_signature?: number | undefined
                track_href?: string | undefined
                type?: 'audio_features' | undefined
                uri?: string | undefined
                valence?: number | undefined
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/audio-features/:id': {
      $get:
        | {
            input: { param: { id: string } }
            output: {
              acousticness?: number | undefined
              analysis_url?: string | undefined
              danceability?: number | undefined
              duration_ms?: number | undefined
              energy?: number | undefined
              id?: string | undefined
              instrumentalness?: number | undefined
              key?: number | undefined
              liveness?: number | undefined
              loudness?: number | undefined
              mode?: number | undefined
              speechiness?: number | undefined
              tempo?: number | undefined
              time_signature?: number | undefined
              track_href?: string | undefined
              type?: 'audio_features' | undefined
              uri?: string | undefined
              valence?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/audiobooks': {
      $get:
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: {
              audiobooks: {
                authors: { name?: string | undefined }[]
                available_markets: string[]
                copyrights: { text?: string | undefined; type?: string | undefined }[]
                description: string
                edition?: string | undefined
                explicit: boolean
                external_urls: { spotify?: string | undefined }
                href: string
                html_description: string
                id: string
                images: { height: number | null; url: string; width: number | null }[]
                languages: string[]
                media_type: string
                name: string
                narrators: { name?: string | undefined }[]
                publisher: string
                total_chapters: number
                type: 'audiobook'
                uri: string
                chapters: {
                  href: string
                  limit: number
                  next: string | null
                  offset: number
                  previous: string | null
                  total: number
                  items?:
                    | {
                        audio_preview_url: string
                        available_markets?: string[] | undefined
                        chapter_number: number
                        description: string
                        duration_ms: number
                        explicit: boolean
                        external_urls: { spotify?: string | undefined }
                        href: string
                        html_description: string
                        id: string
                        images: { height: number | null; url: string; width: number | null }[]
                        is_playable: boolean
                        languages: string[]
                        name: string
                        release_date: string
                        release_date_precision: 'year' | 'month' | 'day'
                        restrictions?: { reason?: string | undefined } | undefined
                        resume_point: {
                          fully_played?: boolean | undefined
                          resume_position_ms?: number | undefined
                        }
                        type: 'episode'
                        uri: string
                      }[]
                    | undefined
                }
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/audiobooks/:id': {
      $get:
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: {
              authors: { name?: string | undefined }[]
              available_markets: string[]
              copyrights: { text?: string | undefined; type?: string | undefined }[]
              description: string
              edition?: string | undefined
              explicit: boolean
              external_urls: { spotify?: string | undefined }
              href: string
              html_description: string
              id: string
              images: { height: number | null; url: string; width: number | null }[]
              languages: string[]
              media_type: string
              name: string
              narrators: { name?: string | undefined }[]
              publisher: string
              total_chapters: number
              type: 'audiobook'
              uri: string
              chapters: {
                href: string
                limit: number
                next: string | null
                offset: number
                previous: string | null
                total: number
                items?:
                  | {
                      audio_preview_url: string
                      available_markets?: string[] | undefined
                      chapter_number: number
                      description: string
                      duration_ms: number
                      explicit: boolean
                      external_urls: { spotify?: string | undefined }
                      href: string
                      html_description: string
                      id: string
                      images: { height: number | null; url: string; width: number | null }[]
                      is_playable: boolean
                      languages: string[]
                      name: string
                      release_date: string
                      release_date_precision: 'year' | 'month' | 'day'
                      restrictions?: { reason?: string | undefined } | undefined
                      resume_point: {
                        fully_played?: boolean | undefined
                        resume_position_ms?: number | undefined
                      }
                      type: 'episode'
                      uri: string
                    }[]
                  | undefined
              }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/audiobooks/:id/chapters': {
      $get:
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    audio_preview_url: string
                    available_markets?: string[] | undefined
                    chapter_number: number
                    description: string
                    duration_ms: number
                    explicit: boolean
                    external_urls: { spotify?: string | undefined }
                    href: string
                    html_description: string
                    id: string
                    images: { height: number | null; url: string; width: number | null }[]
                    is_playable: boolean
                    languages: string[]
                    name: string
                    release_date: string
                    release_date_precision: 'year' | 'month' | 'day'
                    restrictions?: { reason?: string | undefined } | undefined
                    resume_point: {
                      fully_played?: boolean | undefined
                      resume_position_ms?: number | undefined
                    }
                    type: 'episode'
                    uri: string
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/browse/categories': {
      $get:
        | {
            input: {
              query: {
                country?: string | undefined
                locale?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: {
              categories: {
                href: string
                limit: number
                next: string | null
                offset: number
                previous: string | null
                total: number
              }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                country?: string | undefined
                locale?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                country?: string | undefined
                locale?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                country?: string | undefined
                locale?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/browse/categories/:category_id': {
      $get:
        | {
            input: { param: { category_id: string } } & {
              query: { country?: string | undefined; locale?: string | undefined }
            }
            output: {
              href: string
              icons: { height: number | null; url: string; width: number | null }[]
              id: string
              name: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { category_id: string } } & {
              query: { country?: string | undefined; locale?: string | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { category_id: string } } & {
              query: { country?: string | undefined; locale?: string | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { category_id: string } } & {
              query: { country?: string | undefined; locale?: string | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/browse/categories/:category_id/playlists': {
      $get:
        | {
            input: { param: { category_id: string } } & {
              query: {
                country?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: {
              message?: string | undefined
              playlists?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          collaborative?: boolean | undefined
                          description?: string | undefined
                          external_urls?: { spotify?: string | undefined } | undefined
                          href?: string | undefined
                          id?: string | undefined
                          images?:
                            | { height: number | null; url: string; width: number | null }[]
                            | undefined
                          name?: string | undefined
                          owner?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                followers?:
                                  | {
                                      href?: (string | null) | undefined
                                      total?: number | undefined
                                    }
                                  | undefined
                                href?: string | undefined
                                id?: string | undefined
                                type?: 'user' | undefined
                                uri?: string | undefined
                                display_name?: (string | null) | undefined
                              }
                            | undefined
                          public?: boolean | undefined
                          snapshot_id?: string | undefined
                          tracks?:
                            | { href?: string | undefined; total?: number | undefined }
                            | undefined
                          type?: string | undefined
                          uri?: string | undefined
                        }[]
                      | undefined
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { category_id: string } } & {
              query: {
                country?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { category_id: string } } & {
              query: {
                country?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { category_id: string } } & {
              query: {
                country?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/browse/featured-playlists': {
      $get:
        | {
            input: {
              query: {
                country?: string | undefined
                locale?: string | undefined
                timestamp?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: {
              message?: string | undefined
              playlists?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          collaborative?: boolean | undefined
                          description?: string | undefined
                          external_urls?: { spotify?: string | undefined } | undefined
                          href?: string | undefined
                          id?: string | undefined
                          images?:
                            | { height: number | null; url: string; width: number | null }[]
                            | undefined
                          name?: string | undefined
                          owner?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                followers?:
                                  | {
                                      href?: (string | null) | undefined
                                      total?: number | undefined
                                    }
                                  | undefined
                                href?: string | undefined
                                id?: string | undefined
                                type?: 'user' | undefined
                                uri?: string | undefined
                                display_name?: (string | null) | undefined
                              }
                            | undefined
                          public?: boolean | undefined
                          snapshot_id?: string | undefined
                          tracks?:
                            | { href?: string | undefined; total?: number | undefined }
                            | undefined
                          type?: string | undefined
                          uri?: string | undefined
                        }[]
                      | undefined
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                country?: string | undefined
                locale?: string | undefined
                timestamp?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                country?: string | undefined
                locale?: string | undefined
                timestamp?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                country?: string | undefined
                locale?: string | undefined
                timestamp?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/browse/new-releases': {
      $get:
        | {
            input: {
              query: {
                country?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: {
              albums: {
                href: string
                limit: number
                next: string | null
                offset: number
                previous: string | null
                total: number
                items?:
                  | {
                      album_type: 'album' | 'single' | 'compilation'
                      available_markets: string[]
                      copyrights?:
                        | { text?: string | undefined; type?: string | undefined }[]
                        | undefined
                      external_ids?:
                        | {
                            ean?: string | undefined
                            isrc?: string | undefined
                            upc?: string | undefined
                          }
                        | undefined
                      external_urls: { spotify?: string | undefined }
                      genres?: string[] | undefined
                      href: string
                      id: string
                      images: { height: number | null; url: string; width: number | null }[]
                      label?: string | undefined
                      name: string
                      popularity?: number | undefined
                      release_date: string
                      release_date_precision: 'year' | 'month' | 'day'
                      restrictions?:
                        | { reason?: 'market' | 'product' | 'explicit' | undefined }
                        | undefined
                      total_tracks: number
                      type: 'album'
                      uri: string
                      album_group?: 'album' | 'single' | 'compilation' | 'appears_on' | undefined
                      artists: {
                        external_urls?: { spotify?: string | undefined } | undefined
                        href?: string | undefined
                        id?: string | undefined
                        name?: string | undefined
                        type?: 'artist' | undefined
                        uri?: string | undefined
                      }[]
                    }[]
                  | undefined
              }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                country?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                country?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                country?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/chapters': {
      $get:
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: {
              chapters: {
                audio_preview_url: string
                available_markets?: string[] | undefined
                chapter_number: number
                description: string
                duration_ms: number
                explicit: boolean
                external_urls: { spotify?: string | undefined }
                href: string
                html_description: string
                id: string
                images: { height: number | null; url: string; width: number | null }[]
                is_playable: boolean
                languages: string[]
                name: string
                release_date: string
                release_date_precision: 'year' | 'month' | 'day'
                restrictions?: { reason?: string | undefined } | undefined
                resume_point: {
                  fully_played?: boolean | undefined
                  resume_position_ms?: number | undefined
                }
                type: 'episode'
                uri: string
                audiobook: {
                  authors: { name?: string | undefined }[]
                  available_markets: string[]
                  copyrights: { text?: string | undefined; type?: string | undefined }[]
                  description: string
                  edition?: string | undefined
                  explicit: boolean
                  external_urls: { spotify?: string | undefined }
                  href: string
                  html_description: string
                  id: string
                  images: { height: number | null; url: string; width: number | null }[]
                  languages: string[]
                  media_type: string
                  name: string
                  narrators: { name?: string | undefined }[]
                  publisher: string
                  total_chapters: number
                  type: 'audiobook'
                  uri: string
                }
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/chapters/:id': {
      $get:
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: {
              audio_preview_url: string
              available_markets?: string[] | undefined
              chapter_number: number
              description: string
              duration_ms: number
              explicit: boolean
              external_urls: { spotify?: string | undefined }
              href: string
              html_description: string
              id: string
              images: { height: number | null; url: string; width: number | null }[]
              is_playable: boolean
              languages: string[]
              name: string
              release_date: string
              release_date_precision: 'year' | 'month' | 'day'
              restrictions?: { reason?: string | undefined } | undefined
              resume_point: {
                fully_played?: boolean | undefined
                resume_position_ms?: number | undefined
              }
              type: 'episode'
              uri: string
              audiobook: {
                authors: { name?: string | undefined }[]
                available_markets: string[]
                copyrights: { text?: string | undefined; type?: string | undefined }[]
                description: string
                edition?: string | undefined
                explicit: boolean
                external_urls: { spotify?: string | undefined }
                href: string
                html_description: string
                id: string
                images: { height: number | null; url: string; width: number | null }[]
                languages: string[]
                media_type: string
                name: string
                narrators: { name?: string | undefined }[]
                publisher: string
                total_chapters: number
                type: 'audiobook'
                uri: string
              }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/episodes': {
      $get:
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: {
              episodes: {
                audio_preview_url: string
                description: string
                duration_ms: number
                explicit: boolean
                external_urls: { spotify?: string | undefined }
                href: string
                html_description: string
                id: string
                images: { height: number | null; url: string; width: number | null }[]
                is_externally_hosted: boolean
                is_playable: boolean
                language?: string | undefined
                languages: string[]
                name: string
                release_date: string
                release_date_precision: 'year' | 'month' | 'day'
                restrictions?: { reason?: string | undefined } | undefined
                resume_point: {
                  fully_played?: boolean | undefined
                  resume_position_ms?: number | undefined
                }
                type: 'episode'
                uri: string
                show: {
                  available_markets: string[]
                  copyrights: { text?: string | undefined; type?: string | undefined }[]
                  description: string
                  explicit: boolean
                  external_urls: { spotify?: string | undefined }
                  href: string
                  html_description: string
                  id: string
                  images: { height: number | null; url: string; width: number | null }[]
                  is_externally_hosted: boolean
                  languages: string[]
                  media_type: string
                  name: string
                  publisher: string
                  total_episodes: number
                  type: 'show'
                  uri: string
                }
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/episodes/:id': {
      $get:
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: {
              audio_preview_url: string
              description: string
              duration_ms: number
              explicit: boolean
              external_urls: { spotify?: string | undefined }
              href: string
              html_description: string
              id: string
              images: { height: number | null; url: string; width: number | null }[]
              is_externally_hosted: boolean
              is_playable: boolean
              language?: string | undefined
              languages: string[]
              name: string
              release_date: string
              release_date_precision: 'year' | 'month' | 'day'
              restrictions?: { reason?: string | undefined } | undefined
              resume_point: {
                fully_played?: boolean | undefined
                resume_position_ms?: number | undefined
              }
              type: 'episode'
              uri: string
              show: {
                available_markets: string[]
                copyrights: { text?: string | undefined; type?: string | undefined }[]
                description: string
                explicit: boolean
                external_urls: { spotify?: string | undefined }
                href: string
                html_description: string
                id: string
                images: { height: number | null; url: string; width: number | null }[]
                is_externally_hosted: boolean
                languages: string[]
                media_type: string
                name: string
                publisher: string
                total_episodes: number
                type: 'show'
                uri: string
              }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/markets': {
      $get:
        | {
            input: {}
            output: { markets?: string[] | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me': {
      $get:
        | {
            input: {}
            output: {
              country?: string | undefined
              display_name?: string | undefined
              email?: string | undefined
              explicit_content?:
                | { filter_enabled?: boolean | undefined; filter_locked?: boolean | undefined }
                | undefined
              external_urls?: { spotify?: string | undefined } | undefined
              followers?:
                | { href?: (string | null) | undefined; total?: number | undefined }
                | undefined
              href?: string | undefined
              id?: string | undefined
              images?: { height: number | null; url: string; width: number | null }[] | undefined
              product?: string | undefined
              type?: string | undefined
              uri?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/albums': {
      $delete:
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $get:
        | {
            input: {
              query: {
                limit?: number | undefined
                offset?: number | undefined
                market?: string | undefined
              }
            }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    added_at?: string | undefined
                    album?:
                      | {
                          album_type: 'album' | 'single' | 'compilation'
                          available_markets: string[]
                          copyrights?:
                            | { text?: string | undefined; type?: string | undefined }[]
                            | undefined
                          external_ids?:
                            | {
                                ean?: string | undefined
                                isrc?: string | undefined
                                upc?: string | undefined
                              }
                            | undefined
                          external_urls: { spotify?: string | undefined }
                          genres?: string[] | undefined
                          href: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          label?: string | undefined
                          name: string
                          popularity?: number | undefined
                          release_date: string
                          release_date_precision: 'year' | 'month' | 'day'
                          restrictions?:
                            | { reason?: 'market' | 'product' | 'explicit' | undefined }
                            | undefined
                          total_tracks: number
                          type: 'album'
                          uri: string
                          artists?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                followers?:
                                  | {
                                      href?: (string | null) | undefined
                                      total?: number | undefined
                                    }
                                  | undefined
                                genres?: string[] | undefined
                                href?: string | undefined
                                id?: string | undefined
                                images?:
                                  | { height: number | null; url: string; width: number | null }[]
                                  | undefined
                                name?: string | undefined
                                popularity?: number | undefined
                                type?: 'artist' | undefined
                                uri?: string | undefined
                              }[]
                            | undefined
                          tracks?:
                            | {
                                href: string
                                limit: number
                                next: string | null
                                offset: number
                                previous: string | null
                                total: number
                                items?:
                                  | {
                                      artists?:
                                        | {
                                            external_urls?:
                                              | { spotify?: string | undefined }
                                              | undefined
                                            href?: string | undefined
                                            id?: string | undefined
                                            name?: string | undefined
                                            type?: 'artist' | undefined
                                            uri?: string | undefined
                                          }[]
                                        | undefined
                                      available_markets?: string[] | undefined
                                      disc_number?: number | undefined
                                      duration_ms?: number | undefined
                                      explicit?: boolean | undefined
                                      external_urls?: { spotify?: string | undefined } | undefined
                                      href?: string | undefined
                                      id?: string | undefined
                                      is_local?: boolean | undefined
                                      is_playable?: boolean | undefined
                                      linked_from?:
                                        | {
                                            external_urls?:
                                              | { spotify?: string | undefined }
                                              | undefined
                                            href?: string | undefined
                                            id?: string | undefined
                                            type?: string | undefined
                                            uri?: string | undefined
                                          }
                                        | undefined
                                      name?: string | undefined
                                      preview_url?: string | undefined
                                      restrictions?: { reason?: string | undefined } | undefined
                                      track_number?: number | undefined
                                      type?: string | undefined
                                      uri?: string | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                limit?: number | undefined
                offset?: number | undefined
                market?: string | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                limit?: number | undefined
                offset?: number | undefined
                market?: string | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                limit?: number | undefined
                offset?: number | undefined
                market?: string | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $put:
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/albums/contains': {
      $get:
        | {
            input: { query: { ids: string } }
            output: boolean[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/audiobooks': {
      $delete:
        | { input: { query: { ids: string } }; output: {}; outputFormat: string; status: 200 }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $get:
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    authors: { name?: string | undefined }[]
                    available_markets: string[]
                    copyrights: { text?: string | undefined; type?: string | undefined }[]
                    description: string
                    edition?: string | undefined
                    explicit: boolean
                    external_urls: { spotify?: string | undefined }
                    href: string
                    html_description: string
                    id: string
                    images: { height: number | null; url: string; width: number | null }[]
                    languages: string[]
                    media_type: string
                    name: string
                    narrators: { name?: string | undefined }[]
                    publisher: string
                    total_chapters: number
                    type: 'audiobook'
                    uri: string
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $put:
        | { input: { query: { ids: string } }; output: {}; outputFormat: string; status: 200 }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/audiobooks/contains': {
      $get:
        | {
            input: { query: { ids: string } }
            output: boolean[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/episodes': {
      $delete:
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $get:
        | {
            input: {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    added_at?: string | undefined
                    episode?:
                      | {
                          audio_preview_url: string
                          description: string
                          duration_ms: number
                          explicit: boolean
                          external_urls: { spotify?: string | undefined }
                          href: string
                          html_description: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          is_externally_hosted: boolean
                          is_playable: boolean
                          language?: string | undefined
                          languages: string[]
                          name: string
                          release_date: string
                          release_date_precision: 'year' | 'month' | 'day'
                          restrictions?: { reason?: string | undefined } | undefined
                          resume_point: {
                            fully_played?: boolean | undefined
                            resume_position_ms?: number | undefined
                          }
                          type: 'episode'
                          uri: string
                          show: {
                            available_markets: string[]
                            copyrights: { text?: string | undefined; type?: string | undefined }[]
                            description: string
                            explicit: boolean
                            external_urls: { spotify?: string | undefined }
                            href: string
                            html_description: string
                            id: string
                            images: { height: number | null; url: string; width: number | null }[]
                            is_externally_hosted: boolean
                            languages: string[]
                            media_type: string
                            name: string
                            publisher: string
                            total_episodes: number
                            type: 'show'
                            uri: string
                          }
                        }
                      | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $put:
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/episodes/contains': {
      $get:
        | {
            input: { query: { ids: string } }
            output: boolean[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/following': {
      $delete:
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } } & {
              json: { ids?: string[] | undefined }
            }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } } & {
              json: { ids?: string[] | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } } & {
              json: { ids?: string[] | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } } & {
              json: { ids?: string[] | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $get:
        | {
            input: {
              query: { type: 'artist'; after?: string | undefined; limit?: number | undefined }
            }
            output: {
              artists: {
                cursors?: { after?: string | undefined; before?: string | undefined } | undefined
                href?: string | undefined
                limit?: number | undefined
                next?: string | undefined
                total?: number | undefined
                items?:
                  | {
                      external_urls?: { spotify?: string | undefined } | undefined
                      followers?:
                        | { href?: (string | null) | undefined; total?: number | undefined }
                        | undefined
                      genres?: string[] | undefined
                      href?: string | undefined
                      id?: string | undefined
                      images?:
                        | { height: number | null; url: string; width: number | null }[]
                        | undefined
                      name?: string | undefined
                      popularity?: number | undefined
                      type?: 'artist' | undefined
                      uri?: string | undefined
                    }[]
                  | undefined
              }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: { type: 'artist'; after?: string | undefined; limit?: number | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: { type: 'artist'; after?: string | undefined; limit?: number | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: { type: 'artist'; after?: string | undefined; limit?: number | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $put:
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } } & { json: { ids: string[] } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } } & { json: { ids: string[] } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } } & { json: { ids: string[] } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } } & { json: { ids: string[] } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/following/contains': {
      $get:
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } }
            output: boolean[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { type: 'artist' | 'user'; ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player': {
      $get:
        | {
            input: { query: { market?: string | undefined; additional_types?: string | undefined } }
            output: {
              actions?:
                | {
                    interrupting_playback?: boolean | undefined
                    pausing?: boolean | undefined
                    resuming?: boolean | undefined
                    seeking?: boolean | undefined
                    skipping_next?: boolean | undefined
                    skipping_prev?: boolean | undefined
                    toggling_repeat_context?: boolean | undefined
                    toggling_repeat_track?: boolean | undefined
                    toggling_shuffle?: boolean | undefined
                    transferring_playback?: boolean | undefined
                  }
                | undefined
              context?:
                | {
                    external_urls?: { spotify?: string | undefined } | undefined
                    href?: string | undefined
                    type?: string | undefined
                    uri?: string | undefined
                  }
                | undefined
              currently_playing_type?: string | undefined
              device?:
                | {
                    id?: (string | null) | undefined
                    is_active?: boolean | undefined
                    is_private_session?: boolean | undefined
                    is_restricted?: boolean | undefined
                    name?: string | undefined
                    type?: string | undefined
                    volume_percent?: (number | null) | undefined
                  }
                | undefined
              is_playing?: boolean | undefined
              item?:
                | {
                    album?:
                      | {
                          album_type: 'album' | 'single' | 'compilation'
                          available_markets: string[]
                          copyrights?:
                            | { text?: string | undefined; type?: string | undefined }[]
                            | undefined
                          external_ids?:
                            | {
                                ean?: string | undefined
                                isrc?: string | undefined
                                upc?: string | undefined
                              }
                            | undefined
                          external_urls: { spotify?: string | undefined }
                          genres?: string[] | undefined
                          href: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          label?: string | undefined
                          name: string
                          popularity?: number | undefined
                          release_date: string
                          release_date_precision: 'year' | 'month' | 'day'
                          restrictions?:
                            | { reason?: 'market' | 'product' | 'explicit' | undefined }
                            | undefined
                          total_tracks: number
                          type: 'album'
                          uri: string
                          album_group?:
                            | 'album'
                            | 'single'
                            | 'compilation'
                            | 'appears_on'
                            | undefined
                          artists: {
                            external_urls?: { spotify?: string | undefined } | undefined
                            href?: string | undefined
                            id?: string | undefined
                            name?: string | undefined
                            type?: 'artist' | undefined
                            uri?: string | undefined
                          }[]
                        }
                      | undefined
                    artists?:
                      | {
                          external_urls?: { spotify?: string | undefined } | undefined
                          followers?:
                            | { href?: (string | null) | undefined; total?: number | undefined }
                            | undefined
                          genres?: string[] | undefined
                          href?: string | undefined
                          id?: string | undefined
                          images?:
                            | { height: number | null; url: string; width: number | null }[]
                            | undefined
                          name?: string | undefined
                          popularity?: number | undefined
                          type?: 'artist' | undefined
                          uri?: string | undefined
                        }[]
                      | undefined
                    available_markets?: string[] | undefined
                    disc_number?: number | undefined
                    duration_ms?: number | undefined
                    explicit?: boolean | undefined
                    external_ids?:
                      | {
                          ean?: string | undefined
                          isrc?: string | undefined
                          upc?: string | undefined
                        }
                      | undefined
                    external_urls?: { spotify?: string | undefined } | undefined
                    href?: string | undefined
                    id?: string | undefined
                    is_local?: boolean | undefined
                    is_playable?: boolean | undefined
                    linked_from?: { [x: string]: unknown } | undefined
                    name?: string | undefined
                    popularity?: number | undefined
                    preview_url?: string | undefined
                    restrictions?: { reason?: string | undefined } | undefined
                    track_number?: number | undefined
                    type?: 'track' | undefined
                    uri?: string | undefined
                  }
                | {
                    audio_preview_url: string
                    description: string
                    duration_ms: number
                    explicit: boolean
                    external_urls: { spotify?: string | undefined }
                    href: string
                    html_description: string
                    id: string
                    images: { height: number | null; url: string; width: number | null }[]
                    is_externally_hosted: boolean
                    is_playable: boolean
                    language?: string | undefined
                    languages: string[]
                    name: string
                    release_date: string
                    release_date_precision: 'year' | 'month' | 'day'
                    restrictions?: { reason?: string | undefined } | undefined
                    resume_point: {
                      fully_played?: boolean | undefined
                      resume_position_ms?: number | undefined
                    }
                    type: 'episode'
                    uri: string
                    show: {
                      available_markets: string[]
                      copyrights: { text?: string | undefined; type?: string | undefined }[]
                      description: string
                      explicit: boolean
                      external_urls: { spotify?: string | undefined }
                      href: string
                      html_description: string
                      id: string
                      images: { height: number | null; url: string; width: number | null }[]
                      is_externally_hosted: boolean
                      languages: string[]
                      media_type: string
                      name: string
                      publisher: string
                      total_episodes: number
                      type: 'show'
                      uri: string
                    }
                  }
                | undefined
              progress_ms?: number | undefined
              repeat_state?: string | undefined
              shuffle_state?: boolean | undefined
              timestamp?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { market?: string | undefined; additional_types?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { market?: string | undefined; additional_types?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { market?: string | undefined; additional_types?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { market?: string | undefined; additional_types?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $put:
        | {
            input: { json: { device_ids: string[]; play?: boolean | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { json: { device_ids: string[]; play?: boolean | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { device_ids: string[]; play?: boolean | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { json: { device_ids: string[]; play?: boolean | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/currently-playing': {
      $get:
        | {
            input: { query: { market?: string | undefined; additional_types?: string | undefined } }
            output: {
              actions?:
                | {
                    interrupting_playback?: boolean | undefined
                    pausing?: boolean | undefined
                    resuming?: boolean | undefined
                    seeking?: boolean | undefined
                    skipping_next?: boolean | undefined
                    skipping_prev?: boolean | undefined
                    toggling_repeat_context?: boolean | undefined
                    toggling_repeat_track?: boolean | undefined
                    toggling_shuffle?: boolean | undefined
                    transferring_playback?: boolean | undefined
                  }
                | undefined
              context?:
                | {
                    external_urls?: { spotify?: string | undefined } | undefined
                    href?: string | undefined
                    type?: string | undefined
                    uri?: string | undefined
                  }
                | undefined
              currently_playing_type?: string | undefined
              device?:
                | {
                    id?: (string | null) | undefined
                    is_active?: boolean | undefined
                    is_private_session?: boolean | undefined
                    is_restricted?: boolean | undefined
                    name?: string | undefined
                    type?: string | undefined
                    volume_percent?: (number | null) | undefined
                  }
                | undefined
              is_playing?: boolean | undefined
              item?:
                | {
                    album?:
                      | {
                          album_type: 'album' | 'single' | 'compilation'
                          available_markets: string[]
                          copyrights?:
                            | { text?: string | undefined; type?: string | undefined }[]
                            | undefined
                          external_ids?:
                            | {
                                ean?: string | undefined
                                isrc?: string | undefined
                                upc?: string | undefined
                              }
                            | undefined
                          external_urls: { spotify?: string | undefined }
                          genres?: string[] | undefined
                          href: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          label?: string | undefined
                          name: string
                          popularity?: number | undefined
                          release_date: string
                          release_date_precision: 'year' | 'month' | 'day'
                          restrictions?:
                            | { reason?: 'market' | 'product' | 'explicit' | undefined }
                            | undefined
                          total_tracks: number
                          type: 'album'
                          uri: string
                          album_group?:
                            | 'album'
                            | 'single'
                            | 'compilation'
                            | 'appears_on'
                            | undefined
                          artists: {
                            external_urls?: { spotify?: string | undefined } | undefined
                            href?: string | undefined
                            id?: string | undefined
                            name?: string | undefined
                            type?: 'artist' | undefined
                            uri?: string | undefined
                          }[]
                        }
                      | undefined
                    artists?:
                      | {
                          external_urls?: { spotify?: string | undefined } | undefined
                          followers?:
                            | { href?: (string | null) | undefined; total?: number | undefined }
                            | undefined
                          genres?: string[] | undefined
                          href?: string | undefined
                          id?: string | undefined
                          images?:
                            | { height: number | null; url: string; width: number | null }[]
                            | undefined
                          name?: string | undefined
                          popularity?: number | undefined
                          type?: 'artist' | undefined
                          uri?: string | undefined
                        }[]
                      | undefined
                    available_markets?: string[] | undefined
                    disc_number?: number | undefined
                    duration_ms?: number | undefined
                    explicit?: boolean | undefined
                    external_ids?:
                      | {
                          ean?: string | undefined
                          isrc?: string | undefined
                          upc?: string | undefined
                        }
                      | undefined
                    external_urls?: { spotify?: string | undefined } | undefined
                    href?: string | undefined
                    id?: string | undefined
                    is_local?: boolean | undefined
                    is_playable?: boolean | undefined
                    linked_from?: { [x: string]: unknown } | undefined
                    name?: string | undefined
                    popularity?: number | undefined
                    preview_url?: string | undefined
                    restrictions?: { reason?: string | undefined } | undefined
                    track_number?: number | undefined
                    type?: 'track' | undefined
                    uri?: string | undefined
                  }
                | {
                    audio_preview_url: string
                    description: string
                    duration_ms: number
                    explicit: boolean
                    external_urls: { spotify?: string | undefined }
                    href: string
                    html_description: string
                    id: string
                    images: { height: number | null; url: string; width: number | null }[]
                    is_externally_hosted: boolean
                    is_playable: boolean
                    language?: string | undefined
                    languages: string[]
                    name: string
                    release_date: string
                    release_date_precision: 'year' | 'month' | 'day'
                    restrictions?: { reason?: string | undefined } | undefined
                    resume_point: {
                      fully_played?: boolean | undefined
                      resume_position_ms?: number | undefined
                    }
                    type: 'episode'
                    uri: string
                    show: {
                      available_markets: string[]
                      copyrights: { text?: string | undefined; type?: string | undefined }[]
                      description: string
                      explicit: boolean
                      external_urls: { spotify?: string | undefined }
                      href: string
                      html_description: string
                      id: string
                      images: { height: number | null; url: string; width: number | null }[]
                      is_externally_hosted: boolean
                      languages: string[]
                      media_type: string
                      name: string
                      publisher: string
                      total_episodes: number
                      type: 'show'
                      uri: string
                    }
                  }
                | undefined
              progress_ms?: number | undefined
              repeat_state?: string | undefined
              shuffle_state?: boolean | undefined
              timestamp?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { market?: string | undefined; additional_types?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { market?: string | undefined; additional_types?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { market?: string | undefined; additional_types?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/devices': {
      $get:
        | {
            input: {}
            output: {
              devices: {
                id?: (string | null) | undefined
                is_active?: boolean | undefined
                is_private_session?: boolean | undefined
                is_restricted?: boolean | undefined
                name?: string | undefined
                type?: string | undefined
                volume_percent?: (number | null) | undefined
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/next': {
      $post:
        | {
            input: { query: { device_id?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/pause': {
      $put:
        | {
            input: { query: { device_id?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/play': {
      $put:
        | {
            input: { query: { device_id?: string | undefined } } & {
              json: {
                context_uri?: string | undefined
                offset?: { [x: string]: unknown } | undefined
                position_ms?: number | undefined
                uris?: string[] | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { device_id?: string | undefined } } & {
              json: {
                context_uri?: string | undefined
                offset?: { [x: string]: unknown } | undefined
                position_ms?: number | undefined
                uris?: string[] | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { device_id?: string | undefined } } & {
              json: {
                context_uri?: string | undefined
                offset?: { [x: string]: unknown } | undefined
                position_ms?: number | undefined
                uris?: string[] | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { device_id?: string | undefined } } & {
              json: {
                context_uri?: string | undefined
                offset?: { [x: string]: unknown } | undefined
                position_ms?: number | undefined
                uris?: string[] | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/previous': {
      $post:
        | {
            input: { query: { device_id?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/queue': {
      $get:
        | {
            input: {}
            output: {
              currently_playing?:
                | {
                    album?:
                      | {
                          album_type: 'album' | 'single' | 'compilation'
                          available_markets: string[]
                          copyrights?:
                            | { text?: string | undefined; type?: string | undefined }[]
                            | undefined
                          external_ids?:
                            | {
                                ean?: string | undefined
                                isrc?: string | undefined
                                upc?: string | undefined
                              }
                            | undefined
                          external_urls: { spotify?: string | undefined }
                          genres?: string[] | undefined
                          href: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          label?: string | undefined
                          name: string
                          popularity?: number | undefined
                          release_date: string
                          release_date_precision: 'year' | 'month' | 'day'
                          restrictions?:
                            | { reason?: 'market' | 'product' | 'explicit' | undefined }
                            | undefined
                          total_tracks: number
                          type: 'album'
                          uri: string
                          album_group?:
                            | 'album'
                            | 'single'
                            | 'compilation'
                            | 'appears_on'
                            | undefined
                          artists: {
                            external_urls?: { spotify?: string | undefined } | undefined
                            href?: string | undefined
                            id?: string | undefined
                            name?: string | undefined
                            type?: 'artist' | undefined
                            uri?: string | undefined
                          }[]
                        }
                      | undefined
                    artists?:
                      | {
                          external_urls?: { spotify?: string | undefined } | undefined
                          followers?:
                            | { href?: (string | null) | undefined; total?: number | undefined }
                            | undefined
                          genres?: string[] | undefined
                          href?: string | undefined
                          id?: string | undefined
                          images?:
                            | { height: number | null; url: string; width: number | null }[]
                            | undefined
                          name?: string | undefined
                          popularity?: number | undefined
                          type?: 'artist' | undefined
                          uri?: string | undefined
                        }[]
                      | undefined
                    available_markets?: string[] | undefined
                    disc_number?: number | undefined
                    duration_ms?: number | undefined
                    explicit?: boolean | undefined
                    external_ids?:
                      | {
                          ean?: string | undefined
                          isrc?: string | undefined
                          upc?: string | undefined
                        }
                      | undefined
                    external_urls?: { spotify?: string | undefined } | undefined
                    href?: string | undefined
                    id?: string | undefined
                    is_local?: boolean | undefined
                    is_playable?: boolean | undefined
                    linked_from?: { [x: string]: unknown } | undefined
                    name?: string | undefined
                    popularity?: number | undefined
                    preview_url?: string | undefined
                    restrictions?: { reason?: string | undefined } | undefined
                    track_number?: number | undefined
                    type?: 'track' | undefined
                    uri?: string | undefined
                  }
                | {
                    audio_preview_url: string
                    description: string
                    duration_ms: number
                    explicit: boolean
                    external_urls: { spotify?: string | undefined }
                    href: string
                    html_description: string
                    id: string
                    images: { height: number | null; url: string; width: number | null }[]
                    is_externally_hosted: boolean
                    is_playable: boolean
                    language?: string | undefined
                    languages: string[]
                    name: string
                    release_date: string
                    release_date_precision: 'year' | 'month' | 'day'
                    restrictions?: { reason?: string | undefined } | undefined
                    resume_point: {
                      fully_played?: boolean | undefined
                      resume_position_ms?: number | undefined
                    }
                    type: 'episode'
                    uri: string
                    show: {
                      available_markets: string[]
                      copyrights: { text?: string | undefined; type?: string | undefined }[]
                      description: string
                      explicit: boolean
                      external_urls: { spotify?: string | undefined }
                      href: string
                      html_description: string
                      id: string
                      images: { height: number | null; url: string; width: number | null }[]
                      is_externally_hosted: boolean
                      languages: string[]
                      media_type: string
                      name: string
                      publisher: string
                      total_episodes: number
                      type: 'show'
                      uri: string
                    }
                  }
                | undefined
              queue?:
                | (
                    | {
                        album?:
                          | {
                              album_type: 'album' | 'single' | 'compilation'
                              available_markets: string[]
                              copyrights?:
                                | { text?: string | undefined; type?: string | undefined }[]
                                | undefined
                              external_ids?:
                                | {
                                    ean?: string | undefined
                                    isrc?: string | undefined
                                    upc?: string | undefined
                                  }
                                | undefined
                              external_urls: { spotify?: string | undefined }
                              genres?: string[] | undefined
                              href: string
                              id: string
                              images: { height: number | null; url: string; width: number | null }[]
                              label?: string | undefined
                              name: string
                              popularity?: number | undefined
                              release_date: string
                              release_date_precision: 'year' | 'month' | 'day'
                              restrictions?:
                                | { reason?: 'market' | 'product' | 'explicit' | undefined }
                                | undefined
                              total_tracks: number
                              type: 'album'
                              uri: string
                              album_group?:
                                | 'album'
                                | 'single'
                                | 'compilation'
                                | 'appears_on'
                                | undefined
                              artists: {
                                external_urls?: { spotify?: string | undefined } | undefined
                                href?: string | undefined
                                id?: string | undefined
                                name?: string | undefined
                                type?: 'artist' | undefined
                                uri?: string | undefined
                              }[]
                            }
                          | undefined
                        artists?:
                          | {
                              external_urls?: { spotify?: string | undefined } | undefined
                              followers?:
                                | { href?: (string | null) | undefined; total?: number | undefined }
                                | undefined
                              genres?: string[] | undefined
                              href?: string | undefined
                              id?: string | undefined
                              images?:
                                | { height: number | null; url: string; width: number | null }[]
                                | undefined
                              name?: string | undefined
                              popularity?: number | undefined
                              type?: 'artist' | undefined
                              uri?: string | undefined
                            }[]
                          | undefined
                        available_markets?: string[] | undefined
                        disc_number?: number | undefined
                        duration_ms?: number | undefined
                        explicit?: boolean | undefined
                        external_ids?:
                          | {
                              ean?: string | undefined
                              isrc?: string | undefined
                              upc?: string | undefined
                            }
                          | undefined
                        external_urls?: { spotify?: string | undefined } | undefined
                        href?: string | undefined
                        id?: string | undefined
                        is_local?: boolean | undefined
                        is_playable?: boolean | undefined
                        linked_from?: { [x: string]: unknown } | undefined
                        name?: string | undefined
                        popularity?: number | undefined
                        preview_url?: string | undefined
                        restrictions?: { reason?: string | undefined } | undefined
                        track_number?: number | undefined
                        type?: 'track' | undefined
                        uri?: string | undefined
                      }
                    | {
                        audio_preview_url: string
                        description: string
                        duration_ms: number
                        explicit: boolean
                        external_urls: { spotify?: string | undefined }
                        href: string
                        html_description: string
                        id: string
                        images: { height: number | null; url: string; width: number | null }[]
                        is_externally_hosted: boolean
                        is_playable: boolean
                        language?: string | undefined
                        languages: string[]
                        name: string
                        release_date: string
                        release_date_precision: 'year' | 'month' | 'day'
                        restrictions?: { reason?: string | undefined } | undefined
                        resume_point: {
                          fully_played?: boolean | undefined
                          resume_position_ms?: number | undefined
                        }
                        type: 'episode'
                        uri: string
                        show: {
                          available_markets: string[]
                          copyrights: { text?: string | undefined; type?: string | undefined }[]
                          description: string
                          explicit: boolean
                          external_urls: { spotify?: string | undefined }
                          href: string
                          html_description: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          is_externally_hosted: boolean
                          languages: string[]
                          media_type: string
                          name: string
                          publisher: string
                          total_episodes: number
                          type: 'show'
                          uri: string
                        }
                      }
                  )[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $post:
        | {
            input: { query: { uri: string; device_id?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { uri: string; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { uri: string; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { uri: string; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/recently-played': {
      $get:
        | {
            input: {
              query: {
                limit?: number | undefined
                after?: number | undefined
                before?: number | undefined
              }
            }
            output: {
              cursors?: { after?: string | undefined; before?: string | undefined } | undefined
              href?: string | undefined
              limit?: number | undefined
              next?: string | undefined
              total?: number | undefined
              items?:
                | {
                    context?:
                      | {
                          external_urls?: { spotify?: string | undefined } | undefined
                          href?: string | undefined
                          type?: string | undefined
                          uri?: string | undefined
                        }
                      | undefined
                    played_at?: string | undefined
                    track?:
                      | {
                          album?:
                            | {
                                album_type: 'album' | 'single' | 'compilation'
                                available_markets: string[]
                                copyrights?:
                                  | { text?: string | undefined; type?: string | undefined }[]
                                  | undefined
                                external_ids?:
                                  | {
                                      ean?: string | undefined
                                      isrc?: string | undefined
                                      upc?: string | undefined
                                    }
                                  | undefined
                                external_urls: { spotify?: string | undefined }
                                genres?: string[] | undefined
                                href: string
                                id: string
                                images: {
                                  height: number | null
                                  url: string
                                  width: number | null
                                }[]
                                label?: string | undefined
                                name: string
                                popularity?: number | undefined
                                release_date: string
                                release_date_precision: 'year' | 'month' | 'day'
                                restrictions?:
                                  | { reason?: 'market' | 'product' | 'explicit' | undefined }
                                  | undefined
                                total_tracks: number
                                type: 'album'
                                uri: string
                                album_group?:
                                  | 'album'
                                  | 'single'
                                  | 'compilation'
                                  | 'appears_on'
                                  | undefined
                                artists: {
                                  external_urls?: { spotify?: string | undefined } | undefined
                                  href?: string | undefined
                                  id?: string | undefined
                                  name?: string | undefined
                                  type?: 'artist' | undefined
                                  uri?: string | undefined
                                }[]
                              }
                            | undefined
                          artists?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                followers?:
                                  | {
                                      href?: (string | null) | undefined
                                      total?: number | undefined
                                    }
                                  | undefined
                                genres?: string[] | undefined
                                href?: string | undefined
                                id?: string | undefined
                                images?:
                                  | { height: number | null; url: string; width: number | null }[]
                                  | undefined
                                name?: string | undefined
                                popularity?: number | undefined
                                type?: 'artist' | undefined
                                uri?: string | undefined
                              }[]
                            | undefined
                          available_markets?: string[] | undefined
                          disc_number?: number | undefined
                          duration_ms?: number | undefined
                          explicit?: boolean | undefined
                          external_ids?:
                            | {
                                ean?: string | undefined
                                isrc?: string | undefined
                                upc?: string | undefined
                              }
                            | undefined
                          external_urls?: { spotify?: string | undefined } | undefined
                          href?: string | undefined
                          id?: string | undefined
                          is_local?: boolean | undefined
                          is_playable?: boolean | undefined
                          linked_from?: { [x: string]: unknown } | undefined
                          name?: string | undefined
                          popularity?: number | undefined
                          preview_url?: string | undefined
                          restrictions?: { reason?: string | undefined } | undefined
                          track_number?: number | undefined
                          type?: 'track' | undefined
                          uri?: string | undefined
                        }
                      | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                limit?: number | undefined
                after?: number | undefined
                before?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                limit?: number | undefined
                after?: number | undefined
                before?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                limit?: number | undefined
                after?: number | undefined
                before?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/repeat': {
      $put:
        | {
            input: { query: { state: string; device_id?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { state: string; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { state: string; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { state: string; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/seek': {
      $put:
        | {
            input: { query: { position_ms: number; device_id?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { position_ms: number; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { position_ms: number; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { position_ms: number; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/shuffle': {
      $put:
        | {
            input: { query: { state: boolean; device_id?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { state: boolean; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { state: boolean; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { state: boolean; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/player/volume': {
      $put:
        | {
            input: { query: { volume_percent: number; device_id?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { query: { volume_percent: number; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { volume_percent: number; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { volume_percent: number; device_id?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/playlists': {
      $get:
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    collaborative?: boolean | undefined
                    description?: string | undefined
                    external_urls?: { spotify?: string | undefined } | undefined
                    href?: string | undefined
                    id?: string | undefined
                    images?:
                      | { height: number | null; url: string; width: number | null }[]
                      | undefined
                    name?: string | undefined
                    owner?:
                      | {
                          external_urls?: { spotify?: string | undefined } | undefined
                          followers?:
                            | { href?: (string | null) | undefined; total?: number | undefined }
                            | undefined
                          href?: string | undefined
                          id?: string | undefined
                          type?: 'user' | undefined
                          uri?: string | undefined
                          display_name?: (string | null) | undefined
                        }
                      | undefined
                    public?: boolean | undefined
                    snapshot_id?: string | undefined
                    tracks?: { href?: string | undefined; total?: number | undefined } | undefined
                    type?: string | undefined
                    uri?: string | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/shows': {
      $delete:
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string; market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $get:
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    added_at?: string | undefined
                    show?:
                      | {
                          available_markets: string[]
                          copyrights: { text?: string | undefined; type?: string | undefined }[]
                          description: string
                          explicit: boolean
                          external_urls: { spotify?: string | undefined }
                          href: string
                          html_description: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          is_externally_hosted: boolean
                          languages: string[]
                          media_type: string
                          name: string
                          publisher: string
                          total_episodes: number
                          type: 'show'
                          uri: string
                        }
                      | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $put:
        | { input: { query: { ids: string } }; output: {}; outputFormat: string; status: 200 }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/shows/contains': {
      $get:
        | {
            input: { query: { ids: string } }
            output: boolean[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/top/:type': {
      $get:
        | {
            input: { param: { type: 'artists' | 'tracks' } } & {
              query: {
                time_range?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | (
                    | {
                        external_urls?: { spotify?: string | undefined } | undefined
                        followers?:
                          | { href?: (string | null) | undefined; total?: number | undefined }
                          | undefined
                        genres?: string[] | undefined
                        href?: string | undefined
                        id?: string | undefined
                        images?:
                          | { height: number | null; url: string; width: number | null }[]
                          | undefined
                        name?: string | undefined
                        popularity?: number | undefined
                        type?: 'artist' | undefined
                        uri?: string | undefined
                      }
                    | {
                        album?:
                          | {
                              album_type: 'album' | 'single' | 'compilation'
                              available_markets: string[]
                              copyrights?:
                                | { text?: string | undefined; type?: string | undefined }[]
                                | undefined
                              external_ids?:
                                | {
                                    ean?: string | undefined
                                    isrc?: string | undefined
                                    upc?: string | undefined
                                  }
                                | undefined
                              external_urls: { spotify?: string | undefined }
                              genres?: string[] | undefined
                              href: string
                              id: string
                              images: { height: number | null; url: string; width: number | null }[]
                              label?: string | undefined
                              name: string
                              popularity?: number | undefined
                              release_date: string
                              release_date_precision: 'year' | 'month' | 'day'
                              restrictions?:
                                | { reason?: 'market' | 'product' | 'explicit' | undefined }
                                | undefined
                              total_tracks: number
                              type: 'album'
                              uri: string
                              album_group?:
                                | 'album'
                                | 'single'
                                | 'compilation'
                                | 'appears_on'
                                | undefined
                              artists: {
                                external_urls?: { spotify?: string | undefined } | undefined
                                href?: string | undefined
                                id?: string | undefined
                                name?: string | undefined
                                type?: 'artist' | undefined
                                uri?: string | undefined
                              }[]
                            }
                          | undefined
                        artists?:
                          | {
                              external_urls?: { spotify?: string | undefined } | undefined
                              followers?:
                                | { href?: (string | null) | undefined; total?: number | undefined }
                                | undefined
                              genres?: string[] | undefined
                              href?: string | undefined
                              id?: string | undefined
                              images?:
                                | { height: number | null; url: string; width: number | null }[]
                                | undefined
                              name?: string | undefined
                              popularity?: number | undefined
                              type?: 'artist' | undefined
                              uri?: string | undefined
                            }[]
                          | undefined
                        available_markets?: string[] | undefined
                        disc_number?: number | undefined
                        duration_ms?: number | undefined
                        explicit?: boolean | undefined
                        external_ids?:
                          | {
                              ean?: string | undefined
                              isrc?: string | undefined
                              upc?: string | undefined
                            }
                          | undefined
                        external_urls?: { spotify?: string | undefined } | undefined
                        href?: string | undefined
                        id?: string | undefined
                        is_local?: boolean | undefined
                        is_playable?: boolean | undefined
                        linked_from?: { [x: string]: unknown } | undefined
                        name?: string | undefined
                        popularity?: number | undefined
                        preview_url?: string | undefined
                        restrictions?: { reason?: string | undefined } | undefined
                        track_number?: number | undefined
                        type?: 'track' | undefined
                        uri?: string | undefined
                      }
                  )[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { type: 'artists' | 'tracks' } } & {
              query: {
                time_range?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { type: 'artists' | 'tracks' } } & {
              query: {
                time_range?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { type: 'artists' | 'tracks' } } & {
              query: {
                time_range?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/tracks': {
      $delete:
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $get:
        | {
            input: {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    added_at?: string | undefined
                    track?:
                      | {
                          album?:
                            | {
                                album_type: 'album' | 'single' | 'compilation'
                                available_markets: string[]
                                copyrights?:
                                  | { text?: string | undefined; type?: string | undefined }[]
                                  | undefined
                                external_ids?:
                                  | {
                                      ean?: string | undefined
                                      isrc?: string | undefined
                                      upc?: string | undefined
                                    }
                                  | undefined
                                external_urls: { spotify?: string | undefined }
                                genres?: string[] | undefined
                                href: string
                                id: string
                                images: {
                                  height: number | null
                                  url: string
                                  width: number | null
                                }[]
                                label?: string | undefined
                                name: string
                                popularity?: number | undefined
                                release_date: string
                                release_date_precision: 'year' | 'month' | 'day'
                                restrictions?:
                                  | { reason?: 'market' | 'product' | 'explicit' | undefined }
                                  | undefined
                                total_tracks: number
                                type: 'album'
                                uri: string
                                album_group?:
                                  | 'album'
                                  | 'single'
                                  | 'compilation'
                                  | 'appears_on'
                                  | undefined
                                artists: {
                                  external_urls?: { spotify?: string | undefined } | undefined
                                  href?: string | undefined
                                  id?: string | undefined
                                  name?: string | undefined
                                  type?: 'artist' | undefined
                                  uri?: string | undefined
                                }[]
                              }
                            | undefined
                          artists?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                followers?:
                                  | {
                                      href?: (string | null) | undefined
                                      total?: number | undefined
                                    }
                                  | undefined
                                genres?: string[] | undefined
                                href?: string | undefined
                                id?: string | undefined
                                images?:
                                  | { height: number | null; url: string; width: number | null }[]
                                  | undefined
                                name?: string | undefined
                                popularity?: number | undefined
                                type?: 'artist' | undefined
                                uri?: string | undefined
                              }[]
                            | undefined
                          available_markets?: string[] | undefined
                          disc_number?: number | undefined
                          duration_ms?: number | undefined
                          explicit?: boolean | undefined
                          external_ids?:
                            | {
                                ean?: string | undefined
                                isrc?: string | undefined
                                upc?: string | undefined
                              }
                            | undefined
                          external_urls?: { spotify?: string | undefined } | undefined
                          href?: string | undefined
                          id?: string | undefined
                          is_local?: boolean | undefined
                          is_playable?: boolean | undefined
                          linked_from?: { [x: string]: unknown } | undefined
                          name?: string | undefined
                          popularity?: number | undefined
                          preview_url?: string | undefined
                          restrictions?: { reason?: string | undefined } | undefined
                          track_number?: number | undefined
                          type?: 'track' | undefined
                          uri?: string | undefined
                        }
                      | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $put:
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } } & { json: { ids?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/me/tracks/contains': {
      $get:
        | {
            input: { query: { ids: string } }
            output: boolean[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/playlists/:playlist_id': {
      $get:
        | {
            input: { param: { playlist_id: string } } & {
              query: {
                market?: string | undefined
                fields?: string | undefined
                additional_types?: string | undefined
              }
            }
            output: {
              collaborative?: boolean | undefined
              description?: (string | null) | undefined
              external_urls?: { spotify?: string | undefined } | undefined
              followers?:
                | { href?: (string | null) | undefined; total?: number | undefined }
                | undefined
              href?: string | undefined
              id?: string | undefined
              images?: { height: number | null; url: string; width: number | null }[] | undefined
              name?: string | undefined
              owner?:
                | {
                    external_urls?: { spotify?: string | undefined } | undefined
                    followers?:
                      | { href?: (string | null) | undefined; total?: number | undefined }
                      | undefined
                    href?: string | undefined
                    id?: string | undefined
                    type?: 'user' | undefined
                    uri?: string | undefined
                    display_name?: (string | null) | undefined
                  }
                | undefined
              public?: boolean | undefined
              snapshot_id?: string | undefined
              tracks?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          added_at?: string | undefined
                          added_by?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                followers?:
                                  | {
                                      href?: (string | null) | undefined
                                      total?: number | undefined
                                    }
                                  | undefined
                                href?: string | undefined
                                id?: string | undefined
                                type?: 'user' | undefined
                                uri?: string | undefined
                              }
                            | undefined
                          is_local?: boolean | undefined
                          track?:
                            | {
                                album?:
                                  | {
                                      album_type: 'album' | 'single' | 'compilation'
                                      available_markets: string[]
                                      copyrights?:
                                        | { text?: string | undefined; type?: string | undefined }[]
                                        | undefined
                                      external_ids?:
                                        | {
                                            ean?: string | undefined
                                            isrc?: string | undefined
                                            upc?: string | undefined
                                          }
                                        | undefined
                                      external_urls: { spotify?: string | undefined }
                                      genres?: string[] | undefined
                                      href: string
                                      id: string
                                      images: {
                                        height: number | null
                                        url: string
                                        width: number | null
                                      }[]
                                      label?: string | undefined
                                      name: string
                                      popularity?: number | undefined
                                      release_date: string
                                      release_date_precision: 'year' | 'month' | 'day'
                                      restrictions?:
                                        | { reason?: 'market' | 'product' | 'explicit' | undefined }
                                        | undefined
                                      total_tracks: number
                                      type: 'album'
                                      uri: string
                                      album_group?:
                                        | 'album'
                                        | 'single'
                                        | 'compilation'
                                        | 'appears_on'
                                        | undefined
                                      artists: {
                                        external_urls?: { spotify?: string | undefined } | undefined
                                        href?: string | undefined
                                        id?: string | undefined
                                        name?: string | undefined
                                        type?: 'artist' | undefined
                                        uri?: string | undefined
                                      }[]
                                    }
                                  | undefined
                                artists?:
                                  | {
                                      external_urls?: { spotify?: string | undefined } | undefined
                                      followers?:
                                        | {
                                            href?: (string | null) | undefined
                                            total?: number | undefined
                                          }
                                        | undefined
                                      genres?: string[] | undefined
                                      href?: string | undefined
                                      id?: string | undefined
                                      images?:
                                        | {
                                            height: number | null
                                            url: string
                                            width: number | null
                                          }[]
                                        | undefined
                                      name?: string | undefined
                                      popularity?: number | undefined
                                      type?: 'artist' | undefined
                                      uri?: string | undefined
                                    }[]
                                  | undefined
                                available_markets?: string[] | undefined
                                disc_number?: number | undefined
                                duration_ms?: number | undefined
                                explicit?: boolean | undefined
                                external_ids?:
                                  | {
                                      ean?: string | undefined
                                      isrc?: string | undefined
                                      upc?: string | undefined
                                    }
                                  | undefined
                                external_urls?: { spotify?: string | undefined } | undefined
                                href?: string | undefined
                                id?: string | undefined
                                is_local?: boolean | undefined
                                is_playable?: boolean | undefined
                                linked_from?: { [x: string]: unknown } | undefined
                                name?: string | undefined
                                popularity?: number | undefined
                                preview_url?: string | undefined
                                restrictions?: { reason?: string | undefined } | undefined
                                track_number?: number | undefined
                                type?: 'track' | undefined
                                uri?: string | undefined
                              }
                            | {
                                audio_preview_url: string
                                description: string
                                duration_ms: number
                                explicit: boolean
                                external_urls: { spotify?: string | undefined }
                                href: string
                                html_description: string
                                id: string
                                images: {
                                  height: number | null
                                  url: string
                                  width: number | null
                                }[]
                                is_externally_hosted: boolean
                                is_playable: boolean
                                language?: string | undefined
                                languages: string[]
                                name: string
                                release_date: string
                                release_date_precision: 'year' | 'month' | 'day'
                                restrictions?: { reason?: string | undefined } | undefined
                                resume_point: {
                                  fully_played?: boolean | undefined
                                  resume_position_ms?: number | undefined
                                }
                                type: 'episode'
                                uri: string
                                show: {
                                  available_markets: string[]
                                  copyrights: {
                                    text?: string | undefined
                                    type?: string | undefined
                                  }[]
                                  description: string
                                  explicit: boolean
                                  external_urls: { spotify?: string | undefined }
                                  href: string
                                  html_description: string
                                  id: string
                                  images: {
                                    height: number | null
                                    url: string
                                    width: number | null
                                  }[]
                                  is_externally_hosted: boolean
                                  languages: string[]
                                  media_type: string
                                  name: string
                                  publisher: string
                                  total_episodes: number
                                  type: 'show'
                                  uri: string
                                }
                              }
                            | undefined
                        }[]
                      | undefined
                  }
                | undefined
              type?: string | undefined
              uri?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { playlist_id: string } } & {
              query: {
                market?: string | undefined
                fields?: string | undefined
                additional_types?: string | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { playlist_id: string } } & {
              query: {
                market?: string | undefined
                fields?: string | undefined
                additional_types?: string | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { playlist_id: string } } & {
              query: {
                market?: string | undefined
                fields?: string | undefined
                additional_types?: string | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $put:
        | {
            input: { param: { playlist_id: string } } & {
              json: {
                collaborative?: boolean | undefined
                description?: string | undefined
                name?: string | undefined
                public?: boolean | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { param: { playlist_id: string } } & {
              json: {
                collaborative?: boolean | undefined
                description?: string | undefined
                name?: string | undefined
                public?: boolean | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { playlist_id: string } } & {
              json: {
                collaborative?: boolean | undefined
                description?: string | undefined
                name?: string | undefined
                public?: boolean | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { playlist_id: string } } & {
              json: {
                collaborative?: boolean | undefined
                description?: string | undefined
                name?: string | undefined
                public?: boolean | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/playlists/:playlist_id/followers': {
      $delete:
        | {
            input: { param: { playlist_id: string } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { param: { playlist_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { playlist_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { playlist_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $put:
        | {
            input: { param: { playlist_id: string } } & { json: { public?: boolean | undefined } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { param: { playlist_id: string } } & { json: { public?: boolean | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { playlist_id: string } } & { json: { public?: boolean | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { playlist_id: string } } & { json: { public?: boolean | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/playlists/:playlist_id/followers/contains': {
      $get:
        | {
            input: { param: { playlist_id: string } } & { query: { ids: string } }
            output: boolean[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { playlist_id: string } } & { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { playlist_id: string } } & { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { playlist_id: string } } & { query: { ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/playlists/:playlist_id/images': {
      $get:
        | {
            input: { param: { playlist_id: string } }
            output: { height: number | null; url: string; width: number | null }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { playlist_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { playlist_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { playlist_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $put:
        | {
            input: { param: { playlist_id: string } }
            output: {}
            outputFormat: string
            status: 202
          }
        | {
            input: { param: { playlist_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { playlist_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { playlist_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/playlists/:playlist_id/tracks': {
      $delete:
        | {
            input: { param: { playlist_id: string } } & {
              json: { snapshot_id?: string | undefined; tracks: { uri?: string | undefined }[] }
            }
            output: { snapshot_id?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { playlist_id: string } } & {
              json: { snapshot_id?: string | undefined; tracks: { uri?: string | undefined }[] }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { playlist_id: string } } & {
              json: { snapshot_id?: string | undefined; tracks: { uri?: string | undefined }[] }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { playlist_id: string } } & {
              json: { snapshot_id?: string | undefined; tracks: { uri?: string | undefined }[] }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $get:
        | {
            input: { param: { playlist_id: string } } & {
              query: {
                market?: string | undefined
                fields?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
                additional_types?: string | undefined
              }
            }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    added_at?: string | undefined
                    added_by?:
                      | {
                          external_urls?: { spotify?: string | undefined } | undefined
                          followers?:
                            | { href?: (string | null) | undefined; total?: number | undefined }
                            | undefined
                          href?: string | undefined
                          id?: string | undefined
                          type?: 'user' | undefined
                          uri?: string | undefined
                        }
                      | undefined
                    is_local?: boolean | undefined
                    track?:
                      | {
                          album?:
                            | {
                                album_type: 'album' | 'single' | 'compilation'
                                available_markets: string[]
                                copyrights?:
                                  | { text?: string | undefined; type?: string | undefined }[]
                                  | undefined
                                external_ids?:
                                  | {
                                      ean?: string | undefined
                                      isrc?: string | undefined
                                      upc?: string | undefined
                                    }
                                  | undefined
                                external_urls: { spotify?: string | undefined }
                                genres?: string[] | undefined
                                href: string
                                id: string
                                images: {
                                  height: number | null
                                  url: string
                                  width: number | null
                                }[]
                                label?: string | undefined
                                name: string
                                popularity?: number | undefined
                                release_date: string
                                release_date_precision: 'year' | 'month' | 'day'
                                restrictions?:
                                  | { reason?: 'market' | 'product' | 'explicit' | undefined }
                                  | undefined
                                total_tracks: number
                                type: 'album'
                                uri: string
                                album_group?:
                                  | 'album'
                                  | 'single'
                                  | 'compilation'
                                  | 'appears_on'
                                  | undefined
                                artists: {
                                  external_urls?: { spotify?: string | undefined } | undefined
                                  href?: string | undefined
                                  id?: string | undefined
                                  name?: string | undefined
                                  type?: 'artist' | undefined
                                  uri?: string | undefined
                                }[]
                              }
                            | undefined
                          artists?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                followers?:
                                  | {
                                      href?: (string | null) | undefined
                                      total?: number | undefined
                                    }
                                  | undefined
                                genres?: string[] | undefined
                                href?: string | undefined
                                id?: string | undefined
                                images?:
                                  | { height: number | null; url: string; width: number | null }[]
                                  | undefined
                                name?: string | undefined
                                popularity?: number | undefined
                                type?: 'artist' | undefined
                                uri?: string | undefined
                              }[]
                            | undefined
                          available_markets?: string[] | undefined
                          disc_number?: number | undefined
                          duration_ms?: number | undefined
                          explicit?: boolean | undefined
                          external_ids?:
                            | {
                                ean?: string | undefined
                                isrc?: string | undefined
                                upc?: string | undefined
                              }
                            | undefined
                          external_urls?: { spotify?: string | undefined } | undefined
                          href?: string | undefined
                          id?: string | undefined
                          is_local?: boolean | undefined
                          is_playable?: boolean | undefined
                          linked_from?: { [x: string]: unknown } | undefined
                          name?: string | undefined
                          popularity?: number | undefined
                          preview_url?: string | undefined
                          restrictions?: { reason?: string | undefined } | undefined
                          track_number?: number | undefined
                          type?: 'track' | undefined
                          uri?: string | undefined
                        }
                      | {
                          audio_preview_url: string
                          description: string
                          duration_ms: number
                          explicit: boolean
                          external_urls: { spotify?: string | undefined }
                          href: string
                          html_description: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          is_externally_hosted: boolean
                          is_playable: boolean
                          language?: string | undefined
                          languages: string[]
                          name: string
                          release_date: string
                          release_date_precision: 'year' | 'month' | 'day'
                          restrictions?: { reason?: string | undefined } | undefined
                          resume_point: {
                            fully_played?: boolean | undefined
                            resume_position_ms?: number | undefined
                          }
                          type: 'episode'
                          uri: string
                          show: {
                            available_markets: string[]
                            copyrights: { text?: string | undefined; type?: string | undefined }[]
                            description: string
                            explicit: boolean
                            external_urls: { spotify?: string | undefined }
                            href: string
                            html_description: string
                            id: string
                            images: { height: number | null; url: string; width: number | null }[]
                            is_externally_hosted: boolean
                            languages: string[]
                            media_type: string
                            name: string
                            publisher: string
                            total_episodes: number
                            type: 'show'
                            uri: string
                          }
                        }
                      | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { playlist_id: string } } & {
              query: {
                market?: string | undefined
                fields?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
                additional_types?: string | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { playlist_id: string } } & {
              query: {
                market?: string | undefined
                fields?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
                additional_types?: string | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { playlist_id: string } } & {
              query: {
                market?: string | undefined
                fields?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
                additional_types?: string | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $post:
        | {
            input: { param: { playlist_id: string } } & {
              query: { position?: number | undefined; uris?: string | undefined }
            } & { json: { position?: number | undefined; uris?: string[] | undefined } }
            output: { snapshot_id?: string | undefined }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { param: { playlist_id: string } } & {
              query: { position?: number | undefined; uris?: string | undefined }
            } & { json: { position?: number | undefined; uris?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { playlist_id: string } } & {
              query: { position?: number | undefined; uris?: string | undefined }
            } & { json: { position?: number | undefined; uris?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { playlist_id: string } } & {
              query: { position?: number | undefined; uris?: string | undefined }
            } & { json: { position?: number | undefined; uris?: string[] | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $put:
        | {
            input: { param: { playlist_id: string } } & { query: { uris?: string | undefined } } & {
              json: {
                insert_before?: number | undefined
                range_length?: number | undefined
                range_start?: number | undefined
                snapshot_id?: string | undefined
                uris?: string[] | undefined
              }
            }
            output: { snapshot_id?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { playlist_id: string } } & { query: { uris?: string | undefined } } & {
              json: {
                insert_before?: number | undefined
                range_length?: number | undefined
                range_start?: number | undefined
                snapshot_id?: string | undefined
                uris?: string[] | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { playlist_id: string } } & { query: { uris?: string | undefined } } & {
              json: {
                insert_before?: number | undefined
                range_length?: number | undefined
                range_start?: number | undefined
                snapshot_id?: string | undefined
                uris?: string[] | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { playlist_id: string } } & { query: { uris?: string | undefined } } & {
              json: {
                insert_before?: number | undefined
                range_length?: number | undefined
                range_start?: number | undefined
                snapshot_id?: string | undefined
                uris?: string[] | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/recommendations': {
      $get:
        | {
            input: {
              query: {
                limit?: number | undefined
                market?: string | undefined
                seed_artists: string
                seed_genres: string
                seed_tracks: string
                min_acousticness?: number | undefined
                max_acousticness?: number | undefined
                target_acousticness?: number | undefined
                min_danceability?: number | undefined
                max_danceability?: number | undefined
                target_danceability?: number | undefined
                min_duration_ms?: number | undefined
                max_duration_ms?: number | undefined
                target_duration_ms?: number | undefined
                min_energy?: number | undefined
                max_energy?: number | undefined
                target_energy?: number | undefined
                min_instrumentalness?: number | undefined
                max_instrumentalness?: number | undefined
                target_instrumentalness?: number | undefined
                min_key?: number | undefined
                max_key?: number | undefined
                target_key?: number | undefined
                min_liveness?: number | undefined
                max_liveness?: number | undefined
                target_liveness?: number | undefined
                min_loudness?: number | undefined
                max_loudness?: number | undefined
                target_loudness?: number | undefined
                min_mode?: number | undefined
                max_mode?: number | undefined
                target_mode?: number | undefined
                min_popularity?: number | undefined
                max_popularity?: number | undefined
                target_popularity?: number | undefined
                min_speechiness?: number | undefined
                max_speechiness?: number | undefined
                target_speechiness?: number | undefined
                min_tempo?: number | undefined
                max_tempo?: number | undefined
                target_tempo?: number | undefined
                min_time_signature?: number | undefined
                max_time_signature?: number | undefined
                target_time_signature?: number | undefined
                min_valence?: number | undefined
                max_valence?: number | undefined
                target_valence?: number | undefined
              }
            }
            output: {
              seeds: {
                afterFilteringSize?: number | undefined
                afterRelinkingSize?: number | undefined
                href?: string | undefined
                id?: string | undefined
                initialPoolSize?: number | undefined
                type?: string | undefined
              }[]
              tracks: {
                album?:
                  | {
                      album_type: 'album' | 'single' | 'compilation'
                      available_markets: string[]
                      copyrights?:
                        | { text?: string | undefined; type?: string | undefined }[]
                        | undefined
                      external_ids?:
                        | {
                            ean?: string | undefined
                            isrc?: string | undefined
                            upc?: string | undefined
                          }
                        | undefined
                      external_urls: { spotify?: string | undefined }
                      genres?: string[] | undefined
                      href: string
                      id: string
                      images: { height: number | null; url: string; width: number | null }[]
                      label?: string | undefined
                      name: string
                      popularity?: number | undefined
                      release_date: string
                      release_date_precision: 'year' | 'month' | 'day'
                      restrictions?:
                        | { reason?: 'market' | 'product' | 'explicit' | undefined }
                        | undefined
                      total_tracks: number
                      type: 'album'
                      uri: string
                      album_group?: 'album' | 'single' | 'compilation' | 'appears_on' | undefined
                      artists: {
                        external_urls?: { spotify?: string | undefined } | undefined
                        href?: string | undefined
                        id?: string | undefined
                        name?: string | undefined
                        type?: 'artist' | undefined
                        uri?: string | undefined
                      }[]
                    }
                  | undefined
                artists?:
                  | {
                      external_urls?: { spotify?: string | undefined } | undefined
                      followers?:
                        | { href?: (string | null) | undefined; total?: number | undefined }
                        | undefined
                      genres?: string[] | undefined
                      href?: string | undefined
                      id?: string | undefined
                      images?:
                        | { height: number | null; url: string; width: number | null }[]
                        | undefined
                      name?: string | undefined
                      popularity?: number | undefined
                      type?: 'artist' | undefined
                      uri?: string | undefined
                    }[]
                  | undefined
                available_markets?: string[] | undefined
                disc_number?: number | undefined
                duration_ms?: number | undefined
                explicit?: boolean | undefined
                external_ids?:
                  | {
                      ean?: string | undefined
                      isrc?: string | undefined
                      upc?: string | undefined
                    }
                  | undefined
                external_urls?: { spotify?: string | undefined } | undefined
                href?: string | undefined
                id?: string | undefined
                is_local?: boolean | undefined
                is_playable?: boolean | undefined
                linked_from?: { [x: string]: unknown } | undefined
                name?: string | undefined
                popularity?: number | undefined
                preview_url?: string | undefined
                restrictions?: { reason?: string | undefined } | undefined
                track_number?: number | undefined
                type?: 'track' | undefined
                uri?: string | undefined
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                limit?: number | undefined
                market?: string | undefined
                seed_artists: string
                seed_genres: string
                seed_tracks: string
                min_acousticness?: number | undefined
                max_acousticness?: number | undefined
                target_acousticness?: number | undefined
                min_danceability?: number | undefined
                max_danceability?: number | undefined
                target_danceability?: number | undefined
                min_duration_ms?: number | undefined
                max_duration_ms?: number | undefined
                target_duration_ms?: number | undefined
                min_energy?: number | undefined
                max_energy?: number | undefined
                target_energy?: number | undefined
                min_instrumentalness?: number | undefined
                max_instrumentalness?: number | undefined
                target_instrumentalness?: number | undefined
                min_key?: number | undefined
                max_key?: number | undefined
                target_key?: number | undefined
                min_liveness?: number | undefined
                max_liveness?: number | undefined
                target_liveness?: number | undefined
                min_loudness?: number | undefined
                max_loudness?: number | undefined
                target_loudness?: number | undefined
                min_mode?: number | undefined
                max_mode?: number | undefined
                target_mode?: number | undefined
                min_popularity?: number | undefined
                max_popularity?: number | undefined
                target_popularity?: number | undefined
                min_speechiness?: number | undefined
                max_speechiness?: number | undefined
                target_speechiness?: number | undefined
                min_tempo?: number | undefined
                max_tempo?: number | undefined
                target_tempo?: number | undefined
                min_time_signature?: number | undefined
                max_time_signature?: number | undefined
                target_time_signature?: number | undefined
                min_valence?: number | undefined
                max_valence?: number | undefined
                target_valence?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                limit?: number | undefined
                market?: string | undefined
                seed_artists: string
                seed_genres: string
                seed_tracks: string
                min_acousticness?: number | undefined
                max_acousticness?: number | undefined
                target_acousticness?: number | undefined
                min_danceability?: number | undefined
                max_danceability?: number | undefined
                target_danceability?: number | undefined
                min_duration_ms?: number | undefined
                max_duration_ms?: number | undefined
                target_duration_ms?: number | undefined
                min_energy?: number | undefined
                max_energy?: number | undefined
                target_energy?: number | undefined
                min_instrumentalness?: number | undefined
                max_instrumentalness?: number | undefined
                target_instrumentalness?: number | undefined
                min_key?: number | undefined
                max_key?: number | undefined
                target_key?: number | undefined
                min_liveness?: number | undefined
                max_liveness?: number | undefined
                target_liveness?: number | undefined
                min_loudness?: number | undefined
                max_loudness?: number | undefined
                target_loudness?: number | undefined
                min_mode?: number | undefined
                max_mode?: number | undefined
                target_mode?: number | undefined
                min_popularity?: number | undefined
                max_popularity?: number | undefined
                target_popularity?: number | undefined
                min_speechiness?: number | undefined
                max_speechiness?: number | undefined
                target_speechiness?: number | undefined
                min_tempo?: number | undefined
                max_tempo?: number | undefined
                target_tempo?: number | undefined
                min_time_signature?: number | undefined
                max_time_signature?: number | undefined
                target_time_signature?: number | undefined
                min_valence?: number | undefined
                max_valence?: number | undefined
                target_valence?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                limit?: number | undefined
                market?: string | undefined
                seed_artists: string
                seed_genres: string
                seed_tracks: string
                min_acousticness?: number | undefined
                max_acousticness?: number | undefined
                target_acousticness?: number | undefined
                min_danceability?: number | undefined
                max_danceability?: number | undefined
                target_danceability?: number | undefined
                min_duration_ms?: number | undefined
                max_duration_ms?: number | undefined
                target_duration_ms?: number | undefined
                min_energy?: number | undefined
                max_energy?: number | undefined
                target_energy?: number | undefined
                min_instrumentalness?: number | undefined
                max_instrumentalness?: number | undefined
                target_instrumentalness?: number | undefined
                min_key?: number | undefined
                max_key?: number | undefined
                target_key?: number | undefined
                min_liveness?: number | undefined
                max_liveness?: number | undefined
                target_liveness?: number | undefined
                min_loudness?: number | undefined
                max_loudness?: number | undefined
                target_loudness?: number | undefined
                min_mode?: number | undefined
                max_mode?: number | undefined
                target_mode?: number | undefined
                min_popularity?: number | undefined
                max_popularity?: number | undefined
                target_popularity?: number | undefined
                min_speechiness?: number | undefined
                max_speechiness?: number | undefined
                target_speechiness?: number | undefined
                min_tempo?: number | undefined
                max_tempo?: number | undefined
                target_tempo?: number | undefined
                min_time_signature?: number | undefined
                max_time_signature?: number | undefined
                target_time_signature?: number | undefined
                min_valence?: number | undefined
                max_valence?: number | undefined
                target_valence?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/recommendations/available-genre-seeds': {
      $get:
        | { input: {}; output: { genres: string[] }; outputFormat: 'json'; status: 200 }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {}
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/search': {
      $get:
        | {
            input: {
              query: {
                q: string
                type: (
                  | 'album'
                  | 'artist'
                  | 'playlist'
                  | 'track'
                  | 'show'
                  | 'episode'
                  | 'audiobook'
                )[]
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
                include_external?: 'audio' | undefined
              }
            }
            output: {
              albums?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          album_type: 'album' | 'single' | 'compilation'
                          available_markets: string[]
                          copyrights?:
                            | { text?: string | undefined; type?: string | undefined }[]
                            | undefined
                          external_ids?:
                            | {
                                ean?: string | undefined
                                isrc?: string | undefined
                                upc?: string | undefined
                              }
                            | undefined
                          external_urls: { spotify?: string | undefined }
                          genres?: string[] | undefined
                          href: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          label?: string | undefined
                          name: string
                          popularity?: number | undefined
                          release_date: string
                          release_date_precision: 'year' | 'month' | 'day'
                          restrictions?:
                            | { reason?: 'market' | 'product' | 'explicit' | undefined }
                            | undefined
                          total_tracks: number
                          type: 'album'
                          uri: string
                          album_group?:
                            | 'album'
                            | 'single'
                            | 'compilation'
                            | 'appears_on'
                            | undefined
                          artists: {
                            external_urls?: { spotify?: string | undefined } | undefined
                            href?: string | undefined
                            id?: string | undefined
                            name?: string | undefined
                            type?: 'artist' | undefined
                            uri?: string | undefined
                          }[]
                        }[]
                      | undefined
                  }
                | undefined
              artists?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          external_urls?: { spotify?: string | undefined } | undefined
                          followers?:
                            | { href?: (string | null) | undefined; total?: number | undefined }
                            | undefined
                          genres?: string[] | undefined
                          href?: string | undefined
                          id?: string | undefined
                          images?:
                            | { height: number | null; url: string; width: number | null }[]
                            | undefined
                          name?: string | undefined
                          popularity?: number | undefined
                          type?: 'artist' | undefined
                          uri?: string | undefined
                        }[]
                      | undefined
                  }
                | undefined
              audiobooks?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          authors: { name?: string | undefined }[]
                          available_markets: string[]
                          copyrights: { text?: string | undefined; type?: string | undefined }[]
                          description: string
                          edition?: string | undefined
                          explicit: boolean
                          external_urls: { spotify?: string | undefined }
                          href: string
                          html_description: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          languages: string[]
                          media_type: string
                          name: string
                          narrators: { name?: string | undefined }[]
                          publisher: string
                          total_chapters: number
                          type: 'audiobook'
                          uri: string
                        }[]
                      | undefined
                  }
                | undefined
              episodes?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          audio_preview_url: string
                          description: string
                          duration_ms: number
                          explicit: boolean
                          external_urls: { spotify?: string | undefined }
                          href: string
                          html_description: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          is_externally_hosted: boolean
                          is_playable: boolean
                          language?: string | undefined
                          languages: string[]
                          name: string
                          release_date: string
                          release_date_precision: 'year' | 'month' | 'day'
                          restrictions?: { reason?: string | undefined } | undefined
                          resume_point: {
                            fully_played?: boolean | undefined
                            resume_position_ms?: number | undefined
                          }
                          type: 'episode'
                          uri: string
                        }[]
                      | undefined
                  }
                | undefined
              playlists?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          collaborative?: boolean | undefined
                          description?: string | undefined
                          external_urls?: { spotify?: string | undefined } | undefined
                          href?: string | undefined
                          id?: string | undefined
                          images?:
                            | { height: number | null; url: string; width: number | null }[]
                            | undefined
                          name?: string | undefined
                          owner?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                followers?:
                                  | {
                                      href?: (string | null) | undefined
                                      total?: number | undefined
                                    }
                                  | undefined
                                href?: string | undefined
                                id?: string | undefined
                                type?: 'user' | undefined
                                uri?: string | undefined
                                display_name?: (string | null) | undefined
                              }
                            | undefined
                          public?: boolean | undefined
                          snapshot_id?: string | undefined
                          tracks?:
                            | { href?: string | undefined; total?: number | undefined }
                            | undefined
                          type?: string | undefined
                          uri?: string | undefined
                        }[]
                      | undefined
                  }
                | undefined
              shows?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          available_markets: string[]
                          copyrights: { text?: string | undefined; type?: string | undefined }[]
                          description: string
                          explicit: boolean
                          external_urls: { spotify?: string | undefined }
                          href: string
                          html_description: string
                          id: string
                          images: { height: number | null; url: string; width: number | null }[]
                          is_externally_hosted: boolean
                          languages: string[]
                          media_type: string
                          name: string
                          publisher: string
                          total_episodes: number
                          type: 'show'
                          uri: string
                        }[]
                      | undefined
                  }
                | undefined
              tracks?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          album?:
                            | {
                                album_type: 'album' | 'single' | 'compilation'
                                available_markets: string[]
                                copyrights?:
                                  | { text?: string | undefined; type?: string | undefined }[]
                                  | undefined
                                external_ids?:
                                  | {
                                      ean?: string | undefined
                                      isrc?: string | undefined
                                      upc?: string | undefined
                                    }
                                  | undefined
                                external_urls: { spotify?: string | undefined }
                                genres?: string[] | undefined
                                href: string
                                id: string
                                images: {
                                  height: number | null
                                  url: string
                                  width: number | null
                                }[]
                                label?: string | undefined
                                name: string
                                popularity?: number | undefined
                                release_date: string
                                release_date_precision: 'year' | 'month' | 'day'
                                restrictions?:
                                  | { reason?: 'market' | 'product' | 'explicit' | undefined }
                                  | undefined
                                total_tracks: number
                                type: 'album'
                                uri: string
                                album_group?:
                                  | 'album'
                                  | 'single'
                                  | 'compilation'
                                  | 'appears_on'
                                  | undefined
                                artists: {
                                  external_urls?: { spotify?: string | undefined } | undefined
                                  href?: string | undefined
                                  id?: string | undefined
                                  name?: string | undefined
                                  type?: 'artist' | undefined
                                  uri?: string | undefined
                                }[]
                              }
                            | undefined
                          artists?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                followers?:
                                  | {
                                      href?: (string | null) | undefined
                                      total?: number | undefined
                                    }
                                  | undefined
                                genres?: string[] | undefined
                                href?: string | undefined
                                id?: string | undefined
                                images?:
                                  | { height: number | null; url: string; width: number | null }[]
                                  | undefined
                                name?: string | undefined
                                popularity?: number | undefined
                                type?: 'artist' | undefined
                                uri?: string | undefined
                              }[]
                            | undefined
                          available_markets?: string[] | undefined
                          disc_number?: number | undefined
                          duration_ms?: number | undefined
                          explicit?: boolean | undefined
                          external_ids?:
                            | {
                                ean?: string | undefined
                                isrc?: string | undefined
                                upc?: string | undefined
                              }
                            | undefined
                          external_urls?: { spotify?: string | undefined } | undefined
                          href?: string | undefined
                          id?: string | undefined
                          is_local?: boolean | undefined
                          is_playable?: boolean | undefined
                          linked_from?: { [x: string]: unknown } | undefined
                          name?: string | undefined
                          popularity?: number | undefined
                          preview_url?: string | undefined
                          restrictions?: { reason?: string | undefined } | undefined
                          track_number?: number | undefined
                          type?: 'track' | undefined
                          uri?: string | undefined
                        }[]
                      | undefined
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                q: string
                type: (
                  | 'album'
                  | 'artist'
                  | 'playlist'
                  | 'track'
                  | 'show'
                  | 'episode'
                  | 'audiobook'
                )[]
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
                include_external?: 'audio' | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                q: string
                type: (
                  | 'album'
                  | 'artist'
                  | 'playlist'
                  | 'track'
                  | 'show'
                  | 'episode'
                  | 'audiobook'
                )[]
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
                include_external?: 'audio' | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                q: string
                type: (
                  | 'album'
                  | 'artist'
                  | 'playlist'
                  | 'track'
                  | 'show'
                  | 'episode'
                  | 'audiobook'
                )[]
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
                include_external?: 'audio' | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/shows': {
      $get:
        | {
            input: { query: { market?: string | undefined; ids: string } }
            output: {
              shows: {
                available_markets: string[]
                copyrights: { text?: string | undefined; type?: string | undefined }[]
                description: string
                explicit: boolean
                external_urls: { spotify?: string | undefined }
                href: string
                html_description: string
                id: string
                images: { height: number | null; url: string; width: number | null }[]
                is_externally_hosted: boolean
                languages: string[]
                media_type: string
                name: string
                publisher: string
                total_episodes: number
                type: 'show'
                uri: string
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { market?: string | undefined; ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { market?: string | undefined; ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { market?: string | undefined; ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/shows/:id': {
      $get:
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: {
              available_markets: string[]
              copyrights: { text?: string | undefined; type?: string | undefined }[]
              description: string
              explicit: boolean
              external_urls: { spotify?: string | undefined }
              href: string
              html_description: string
              id: string
              images: { height: number | null; url: string; width: number | null }[]
              is_externally_hosted: boolean
              languages: string[]
              media_type: string
              name: string
              publisher: string
              total_episodes: number
              type: 'show'
              uri: string
              episodes: {
                href: string
                limit: number
                next: string | null
                offset: number
                previous: string | null
                total: number
                items?:
                  | {
                      audio_preview_url: string
                      description: string
                      duration_ms: number
                      explicit: boolean
                      external_urls: { spotify?: string | undefined }
                      href: string
                      html_description: string
                      id: string
                      images: { height: number | null; url: string; width: number | null }[]
                      is_externally_hosted: boolean
                      is_playable: boolean
                      language?: string | undefined
                      languages: string[]
                      name: string
                      release_date: string
                      release_date_precision: 'year' | 'month' | 'day'
                      restrictions?: { reason?: string | undefined } | undefined
                      resume_point: {
                        fully_played?: boolean | undefined
                        resume_position_ms?: number | undefined
                      }
                      type: 'episode'
                      uri: string
                    }[]
                  | undefined
              }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/shows/:id/episodes': {
      $get:
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    audio_preview_url: string
                    description: string
                    duration_ms: number
                    explicit: boolean
                    external_urls: { spotify?: string | undefined }
                    href: string
                    html_description: string
                    id: string
                    images: { height: number | null; url: string; width: number | null }[]
                    is_externally_hosted: boolean
                    is_playable: boolean
                    language?: string | undefined
                    languages: string[]
                    name: string
                    release_date: string
                    release_date_precision: 'year' | 'month' | 'day'
                    restrictions?: { reason?: string | undefined } | undefined
                    resume_point: {
                      fully_played?: boolean | undefined
                      resume_position_ms?: number | undefined
                    }
                    type: 'episode'
                    uri: string
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } } & {
              query: {
                market?: string | undefined
                limit?: number | undefined
                offset?: number | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/tracks': {
      $get:
        | {
            input: { query: { market?: string | undefined; ids: string } }
            output: {
              tracks: {
                album?:
                  | {
                      album_type: 'album' | 'single' | 'compilation'
                      available_markets: string[]
                      copyrights?:
                        | { text?: string | undefined; type?: string | undefined }[]
                        | undefined
                      external_ids?:
                        | {
                            ean?: string | undefined
                            isrc?: string | undefined
                            upc?: string | undefined
                          }
                        | undefined
                      external_urls: { spotify?: string | undefined }
                      genres?: string[] | undefined
                      href: string
                      id: string
                      images: { height: number | null; url: string; width: number | null }[]
                      label?: string | undefined
                      name: string
                      popularity?: number | undefined
                      release_date: string
                      release_date_precision: 'year' | 'month' | 'day'
                      restrictions?:
                        | { reason?: 'market' | 'product' | 'explicit' | undefined }
                        | undefined
                      total_tracks: number
                      type: 'album'
                      uri: string
                      album_group?: 'album' | 'single' | 'compilation' | 'appears_on' | undefined
                      artists: {
                        external_urls?: { spotify?: string | undefined } | undefined
                        href?: string | undefined
                        id?: string | undefined
                        name?: string | undefined
                        type?: 'artist' | undefined
                        uri?: string | undefined
                      }[]
                    }
                  | undefined
                artists?:
                  | {
                      external_urls?: { spotify?: string | undefined } | undefined
                      followers?:
                        | { href?: (string | null) | undefined; total?: number | undefined }
                        | undefined
                      genres?: string[] | undefined
                      href?: string | undefined
                      id?: string | undefined
                      images?:
                        | { height: number | null; url: string; width: number | null }[]
                        | undefined
                      name?: string | undefined
                      popularity?: number | undefined
                      type?: 'artist' | undefined
                      uri?: string | undefined
                    }[]
                  | undefined
                available_markets?: string[] | undefined
                disc_number?: number | undefined
                duration_ms?: number | undefined
                explicit?: boolean | undefined
                external_ids?:
                  | {
                      ean?: string | undefined
                      isrc?: string | undefined
                      upc?: string | undefined
                    }
                  | undefined
                external_urls?: { spotify?: string | undefined } | undefined
                href?: string | undefined
                id?: string | undefined
                is_local?: boolean | undefined
                is_playable?: boolean | undefined
                linked_from?: { [x: string]: unknown } | undefined
                name?: string | undefined
                popularity?: number | undefined
                preview_url?: string | undefined
                restrictions?: { reason?: string | undefined } | undefined
                track_number?: number | undefined
                type?: 'track' | undefined
                uri?: string | undefined
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { market?: string | undefined; ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { market?: string | undefined; ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { market?: string | undefined; ids: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/tracks/:id': {
      $get:
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: {
              album?:
                | {
                    album_type: 'album' | 'single' | 'compilation'
                    available_markets: string[]
                    copyrights?:
                      | { text?: string | undefined; type?: string | undefined }[]
                      | undefined
                    external_ids?:
                      | {
                          ean?: string | undefined
                          isrc?: string | undefined
                          upc?: string | undefined
                        }
                      | undefined
                    external_urls: { spotify?: string | undefined }
                    genres?: string[] | undefined
                    href: string
                    id: string
                    images: { height: number | null; url: string; width: number | null }[]
                    label?: string | undefined
                    name: string
                    popularity?: number | undefined
                    release_date: string
                    release_date_precision: 'year' | 'month' | 'day'
                    restrictions?:
                      | { reason?: 'market' | 'product' | 'explicit' | undefined }
                      | undefined
                    total_tracks: number
                    type: 'album'
                    uri: string
                    album_group?: 'album' | 'single' | 'compilation' | 'appears_on' | undefined
                    artists: {
                      external_urls?: { spotify?: string | undefined } | undefined
                      href?: string | undefined
                      id?: string | undefined
                      name?: string | undefined
                      type?: 'artist' | undefined
                      uri?: string | undefined
                    }[]
                  }
                | undefined
              artists?:
                | {
                    external_urls?: { spotify?: string | undefined } | undefined
                    followers?:
                      | { href?: (string | null) | undefined; total?: number | undefined }
                      | undefined
                    genres?: string[] | undefined
                    href?: string | undefined
                    id?: string | undefined
                    images?:
                      | { height: number | null; url: string; width: number | null }[]
                      | undefined
                    name?: string | undefined
                    popularity?: number | undefined
                    type?: 'artist' | undefined
                    uri?: string | undefined
                  }[]
                | undefined
              available_markets?: string[] | undefined
              disc_number?: number | undefined
              duration_ms?: number | undefined
              explicit?: boolean | undefined
              external_ids?:
                | { ean?: string | undefined; isrc?: string | undefined; upc?: string | undefined }
                | undefined
              external_urls?: { spotify?: string | undefined } | undefined
              href?: string | undefined
              id?: string | undefined
              is_local?: boolean | undefined
              is_playable?: boolean | undefined
              linked_from?: { [x: string]: unknown } | undefined
              name?: string | undefined
              popularity?: number | undefined
              preview_url?: string | undefined
              restrictions?: { reason?: string | undefined } | undefined
              track_number?: number | undefined
              type?: 'track' | undefined
              uri?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { id: string } } & { query: { market?: string | undefined } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/users/:user_id': {
      $get:
        | {
            input: { param: { user_id: string } }
            output: {
              display_name?: (string | null) | undefined
              external_urls?: { spotify?: string | undefined } | undefined
              followers?:
                | { href?: (string | null) | undefined; total?: number | undefined }
                | undefined
              href?: string | undefined
              id?: string | undefined
              images?: { height: number | null; url: string; width: number | null }[] | undefined
              type?: 'user' | undefined
              uri?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { user_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { user_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { user_id: string } }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  } & {
    '/users/:user_id/playlists': {
      $get:
        | {
            input: { param: { user_id: string } } & {
              query: { limit?: number | undefined; offset?: number | undefined }
            }
            output: {
              href: string
              limit: number
              next: string | null
              offset: number
              previous: string | null
              total: number
              items?:
                | {
                    collaborative?: boolean | undefined
                    description?: string | undefined
                    external_urls?: { spotify?: string | undefined } | undefined
                    href?: string | undefined
                    id?: string | undefined
                    images?:
                      | { height: number | null; url: string; width: number | null }[]
                      | undefined
                    name?: string | undefined
                    owner?:
                      | {
                          external_urls?: { spotify?: string | undefined } | undefined
                          followers?:
                            | { href?: (string | null) | undefined; total?: number | undefined }
                            | undefined
                          href?: string | undefined
                          id?: string | undefined
                          type?: 'user' | undefined
                          uri?: string | undefined
                          display_name?: (string | null) | undefined
                        }
                      | undefined
                    public?: boolean | undefined
                    snapshot_id?: string | undefined
                    tracks?: { href?: string | undefined; total?: number | undefined } | undefined
                    type?: string | undefined
                    uri?: string | undefined
                  }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { user_id: string } } & {
              query: { limit?: number | undefined; offset?: number | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { user_id: string } } & {
              query: { limit?: number | undefined; offset?: number | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { user_id: string } } & {
              query: { limit?: number | undefined; offset?: number | undefined }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
      $post:
        | {
            input: { param: { user_id: string } } & {
              json: {
                collaborative?: boolean | undefined
                description?: string | undefined
                name: string
                public?: boolean | undefined
              }
            }
            output: {
              collaborative?: boolean | undefined
              description?: (string | null) | undefined
              external_urls?: { spotify?: string | undefined } | undefined
              followers?:
                | { href?: (string | null) | undefined; total?: number | undefined }
                | undefined
              href?: string | undefined
              id?: string | undefined
              images?: { height: number | null; url: string; width: number | null }[] | undefined
              name?: string | undefined
              owner?:
                | {
                    external_urls?: { spotify?: string | undefined } | undefined
                    followers?:
                      | { href?: (string | null) | undefined; total?: number | undefined }
                      | undefined
                    href?: string | undefined
                    id?: string | undefined
                    type?: 'user' | undefined
                    uri?: string | undefined
                    display_name?: (string | null) | undefined
                  }
                | undefined
              public?: boolean | undefined
              snapshot_id?: string | undefined
              tracks?:
                | {
                    href: string
                    limit: number
                    next: string | null
                    offset: number
                    previous: string | null
                    total: number
                    items?:
                      | {
                          added_at?: string | undefined
                          added_by?:
                            | {
                                external_urls?: { spotify?: string | undefined } | undefined
                                followers?:
                                  | {
                                      href?: (string | null) | undefined
                                      total?: number | undefined
                                    }
                                  | undefined
                                href?: string | undefined
                                id?: string | undefined
                                type?: 'user' | undefined
                                uri?: string | undefined
                              }
                            | undefined
                          is_local?: boolean | undefined
                          track?:
                            | {
                                album?:
                                  | {
                                      album_type: 'album' | 'single' | 'compilation'
                                      available_markets: string[]
                                      copyrights?:
                                        | { text?: string | undefined; type?: string | undefined }[]
                                        | undefined
                                      external_ids?:
                                        | {
                                            ean?: string | undefined
                                            isrc?: string | undefined
                                            upc?: string | undefined
                                          }
                                        | undefined
                                      external_urls: { spotify?: string | undefined }
                                      genres?: string[] | undefined
                                      href: string
                                      id: string
                                      images: {
                                        height: number | null
                                        url: string
                                        width: number | null
                                      }[]
                                      label?: string | undefined
                                      name: string
                                      popularity?: number | undefined
                                      release_date: string
                                      release_date_precision: 'year' | 'month' | 'day'
                                      restrictions?:
                                        | { reason?: 'market' | 'product' | 'explicit' | undefined }
                                        | undefined
                                      total_tracks: number
                                      type: 'album'
                                      uri: string
                                      album_group?:
                                        | 'album'
                                        | 'single'
                                        | 'compilation'
                                        | 'appears_on'
                                        | undefined
                                      artists: {
                                        external_urls?: { spotify?: string | undefined } | undefined
                                        href?: string | undefined
                                        id?: string | undefined
                                        name?: string | undefined
                                        type?: 'artist' | undefined
                                        uri?: string | undefined
                                      }[]
                                    }
                                  | undefined
                                artists?:
                                  | {
                                      external_urls?: { spotify?: string | undefined } | undefined
                                      followers?:
                                        | {
                                            href?: (string | null) | undefined
                                            total?: number | undefined
                                          }
                                        | undefined
                                      genres?: string[] | undefined
                                      href?: string | undefined
                                      id?: string | undefined
                                      images?:
                                        | {
                                            height: number | null
                                            url: string
                                            width: number | null
                                          }[]
                                        | undefined
                                      name?: string | undefined
                                      popularity?: number | undefined
                                      type?: 'artist' | undefined
                                      uri?: string | undefined
                                    }[]
                                  | undefined
                                available_markets?: string[] | undefined
                                disc_number?: number | undefined
                                duration_ms?: number | undefined
                                explicit?: boolean | undefined
                                external_ids?:
                                  | {
                                      ean?: string | undefined
                                      isrc?: string | undefined
                                      upc?: string | undefined
                                    }
                                  | undefined
                                external_urls?: { spotify?: string | undefined } | undefined
                                href?: string | undefined
                                id?: string | undefined
                                is_local?: boolean | undefined
                                is_playable?: boolean | undefined
                                linked_from?: { [x: string]: unknown } | undefined
                                name?: string | undefined
                                popularity?: number | undefined
                                preview_url?: string | undefined
                                restrictions?: { reason?: string | undefined } | undefined
                                track_number?: number | undefined
                                type?: 'track' | undefined
                                uri?: string | undefined
                              }
                            | {
                                audio_preview_url: string
                                description: string
                                duration_ms: number
                                explicit: boolean
                                external_urls: { spotify?: string | undefined }
                                href: string
                                html_description: string
                                id: string
                                images: {
                                  height: number | null
                                  url: string
                                  width: number | null
                                }[]
                                is_externally_hosted: boolean
                                is_playable: boolean
                                language?: string | undefined
                                languages: string[]
                                name: string
                                release_date: string
                                release_date_precision: 'year' | 'month' | 'day'
                                restrictions?: { reason?: string | undefined } | undefined
                                resume_point: {
                                  fully_played?: boolean | undefined
                                  resume_position_ms?: number | undefined
                                }
                                type: 'episode'
                                uri: string
                                show: {
                                  available_markets: string[]
                                  copyrights: {
                                    text?: string | undefined
                                    type?: string | undefined
                                  }[]
                                  description: string
                                  explicit: boolean
                                  external_urls: { spotify?: string | undefined }
                                  href: string
                                  html_description: string
                                  id: string
                                  images: {
                                    height: number | null
                                    url: string
                                    width: number | null
                                  }[]
                                  is_externally_hosted: boolean
                                  languages: string[]
                                  media_type: string
                                  name: string
                                  publisher: string
                                  total_episodes: number
                                  type: 'show'
                                  uri: string
                                }
                              }
                            | undefined
                        }[]
                      | undefined
                  }
                | undefined
              type?: string | undefined
              uri?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { param: { user_id: string } } & {
              json: {
                collaborative?: boolean | undefined
                description?: string | undefined
                name: string
                public?: boolean | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { user_id: string } } & {
              json: {
                collaborative?: boolean | undefined
                description?: string | undefined
                name: string
                public?: boolean | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { user_id: string } } & {
              json: {
                collaborative?: boolean | undefined
                description?: string | undefined
                name: string
                public?: boolean | undefined
              }
            }
            output: { error: { message: string; status: number } }
            outputFormat: 'json'
            status: 429
          }
    }
  },
  '/'
>
export default routes
